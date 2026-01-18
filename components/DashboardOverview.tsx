'use client';

import { useState } from 'react';
import { SkillNode } from '@/lib/skills-data';
import { skillHealthData } from '@/lib/skill-health-data';
import { queueData } from '@/lib/queue-data';
import { SkillModal } from './SkillModal';
import { AgentConnectionMap } from './AgentConnectionMap';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface DashboardOverviewProps {
    nodes: SkillNode[];
}

type ListMode = 'staleness' | 'connections';

// Mapping skill names to their connections based on the nodes data
function getAgentSkills(agentId: string, nodes: SkillNode[]) {
    const agentNode = nodes.find(n => n.id === agentId);
    if (!agentNode) return [];
    return agentNode.connections.map(connId => {
        const skillNode = nodes.find(n => n.id === connId);
        return skillNode ? skillNode.name : '';
    }).filter(name => name !== '');
}

export default function DashboardOverview({ nodes }: DashboardOverviewProps) {
    const [listMode, setListMode] = useState<ListMode>('staleness');
    const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    // Prepare data
    const skills = skillHealthData.map(s => ({
        name: s.name,
        daysOld: s.daysSinceUpdate,
        connections: s.connections,
        status: s.status
    }));

    const agents = [
        {
            name: 'Lead Agent',
            description: 'Plans, instructs, coordinates, decides',
            connections: nodes.find(n => n.id === 'lead-agent')?.connections.length || 0,
            role: 'PRIMARY AGENT',
            color: '#d97757',
            skills: getAgentSkills('lead-agent', nodes)
        },
        {
            name: 'Code Agent',
            description: 'Edits code, runs commands, starts servers',
            connections: nodes.find(n => n.id === 'code-agent')?.connections.length || 0,
            role: 'BUILDER',
            color: '#4a9eff',
            skills: getAgentSkills('code-agent', nodes)
        },
        {
            name: 'Mini Agent',
            description: 'Browses, screenshots, verifies UI',
            connections: nodes.find(n => n.id === 'mini-agent')?.connections.length || 0,
            role: 'VERIFIER',
            color: '#8aaf6e',
            skills: getAgentSkills('mini-agent', nodes)
        },
    ];

    const totalSkills = skills.length;
    const healthyCount = skills.filter(s => s.status === 'healthy').length;
    const avgAge = Math.round(skills.reduce((sum, s) => sum + s.daysOld, 0) / totalSkills);
    const todoQueueItems = queueData.filter(i => i.status !== 'done').length;
    const staleSkills = skills.filter(s => s.status === 'critical' || s.daysOld > 14);

    const sortedSkills = [...skills].sort((a, b) =>
        listMode === 'staleness'
            ? b.daysOld - a.daysOld
            : b.connections - a.connections
    );

    return (
        <div className="bg-[#1a1a18] min-h-screen">
            {/* Header / Subtitle */}
            <div className="border-b border-[#3a3a38] px-8 py-3 flex justify-between items-center bg-[#1a1a18]">
                <div className="text-[12px] text-[#7a7974] tracking-wide">
                    Infrastructure Hub — Understanding the multi-agent economy
                </div>
                <div className="text-[12px] text-[#7a7974] font-mono">
                    Jan 17, 2026
                </div>
            </div>

            <div className="p-12 max-w-[1600px] mx-auto">
                <div className="flex gap-20">
                    {/* LEFT PANEL (45%) */}
                    <div className="w-[45%] space-y-12">
                        {/* Title with Dropdown */}
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <h1 className="text-[64px] font-light leading-none tracking-tight text-[#faf9f5]">Overview</h1>
                            <ChevronDown className="w-8 h-8 text-[#7a7974] group-hover:text-[#faf9f5] transition-colors mt-2" />
                        </div>

                        <div className="space-y-10">
                            {/* Stat 1: Skills Healthy */}
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[32px] font-semibold text-[#faf9f5] tracking-tight">{healthyCount} / {totalSkills}</span>
                                    <span className="text-sm font-medium text-[#7a7974] uppercase tracking-widest">Skills healthy</span>
                                </div>
                                <div className="h-1.5 bg-[#3a3a38] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#8aaf6e] rounded-full transition-all duration-1000"
                                        style={{ width: `${(healthyCount / totalSkills) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Stat 2: Average Age with Comparison Bar */}
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[32px] font-semibold text-[#faf9f5] tracking-tight">{avgAge}</span>
                                    <span className="text-sm font-medium text-[#7a7974] uppercase tracking-widest">days average age</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a5a58] whitespace-nowrap min-w-[80px]">Expected: 7</span>
                                    <div className="flex-1 h-3 bg-[#3a3a38]/40 rounded relative overflow-hidden">
                                        {/* Expected marker line */}
                                        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-[#5a5a58] z-10" />
                                        {/* Actual value bar */}
                                        <div
                                            className="h-full bg-[#8aaf6e]/40 rounded transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (avgAge / 14) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-[11px] font-mono font-bold text-[#8aaf6e] min-w-[20px]">{avgAge.toFixed(2)}</span>
                                </div>
                                <div className="text-[10px] text-[#5a5a58] italic">
                                    Total # of system observations: 2,403
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-[#3a3a38]" />

                        {/* Tabs & List */}
                        <div className="space-y-8">
                            <div className="flex gap-10">
                                <button
                                    onClick={() => setListMode('staleness')}
                                    className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${listMode === 'staleness' ? 'text-[#faf9f5]' : 'text-[#5a5a58] hover:text-[#8a8a85]'
                                        }`}
                                >
                                    By Staleness
                                    {listMode === 'staleness' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#faf9f5]" />}
                                </button>
                                <button
                                    onClick={() => setListMode('connections')}
                                    className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${listMode === 'connections' ? 'text-[#faf9f5]' : 'text-[#5a5a58] hover:text-[#8a8a85]'
                                        }`}
                                >
                                    By Connections
                                    {listMode === 'connections' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#faf9f5]" />}
                                </button>
                            </div>

                            <p className="text-[13px] text-[#7a7974] italic">
                                Skills ranked by {listMode === 'staleness' ? 'days since last update' : 'total active connections'}
                            </p>

                            <div className="space-y-1">
                                {sortedSkills.map((skill, i) => (
                                    <button
                                        key={skill.name}
                                        onClick={() => setSelectedSkill(skill.name)}
                                        className="w-full flex justify-between items-center py-2 px-3 hover:bg-[#262624] rounded-sm -mx-3 transition-colors text-left group"
                                    >
                                        <span className={`text-[15px] font-light transition-colors ${skill.status === 'critical' ? 'text-[#ff7b6f]' : 'text-[#faf9f5] group-hover:text-[#d97757]'
                                            }`}>
                                            <span className="text-[#3a3a38] font-mono text-[12px] mr-4 inline-block w-4">{i + 1}.</span>
                                            {skill.name}
                                        </span>
                                        <span className={`text-[13px] font-mono ${skill.status === 'critical' ? 'text-[#ff7b6f]' : 'text-[#7a7974]'
                                            }`}>
                                            {listMode === 'staleness' ? `${skill.daysOld}d` : skill.connections}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL (55%) */}
                    <div className="w-[55%] space-y-8">
                        <div>
                            <h2 className="text-[20px] font-medium text-[#faf9f5]">Agent Network</h2>
                            <p className="text-[12px] text-[#7a7974] flex items-center gap-2 mt-2">
                                <span className="text-[#d97757] animate-pulse">⚡</span>
                                Hover agent card to highlight connection paths
                            </p>
                        </div>

                        <div className="bg-[#1e1e1c] rounded-lg border border-[#3a3a38] h-[550px] relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3a3a38_1px,transparent_1px)] [background-size:20px_20px]" />
                            <AgentConnectionMap
                                agents={agents}
                                skills={skills}
                                hoveredAgent={hoveredAgent}
                                onAgentHover={setHoveredAgent}
                                onSkillClick={setSelectedSkill}
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[12px] text-[#5a5a58] leading-relaxed italic">
                                Percentages and line weights represent the share of agent-led conversations associated with each task node. Click a tile to drill into forensic data.
                            </p>

                            {/* Stale Attention Box if needed */}
                            {staleSkills.length > 0 && (
                                <div className="flex items-center gap-4 p-4 border border-[#ff7b6f]/20 bg-[#ff7b6f]/5 rounded">
                                    <AlertCircle className="w-5 h-5 text-[#ff7b6f]" />
                                    <div>
                                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#ff7b6f]">System Alert: Maintenance Overdue</div>
                                        <div className="text-[12px] text-[#ff7b6f]/80 italic">
                                            {staleSkills.length} nodes currently exceed the 14-day freshness threshold.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Agent Summary Cards Section */}
                <div className="border-t border-[#3a3a38] pt-12 mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a7974]">Active Intelligence Nodes</div>
                        <div className="h-px flex-1 bg-[#3a3a38] mx-8 opacity-40" />
                        <div className="text-[12px] font-mono text-[#5a5a58]">03 NODES DETECTED</div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {agents.map(agent => (
                            <div
                                key={agent.name}
                                className={`p-8 border rounded-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${hoveredAgent === agent.name
                                        ? 'border-[#d97757]/40 bg-[#1d1d1b] scale-[1.02] shadow-2xl z-10'
                                        : 'border-[#3a3a38] bg-[#1a1a18] hover:border-[#4a4a48]'
                                    }`}
                                onMouseEnter={() => setHoveredAgent(agent.name)}
                                onMouseLeave={() => setHoveredAgent(null)}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300" style={{ backgroundColor: agent.color, opacity: hoveredAgent === agent.name ? 1 : 0.2 }} />

                                <div className="space-y-6 relative">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-[20px] font-light text-[#faf9f5] tracking-tight group-hover:text-white transition-colors">{agent.name}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-white/5 bg-white/[0.02] text-[#5a5a58] group-hover:text-[#8a8a85] transition-colors">
                                            {agent.role}
                                        </span>
                                    </div>

                                    <p className="text-[14px] text-[#7a7974] leading-relaxed italic line-clamp-2 transition-colors group-hover:text-[#a8a8a4]">
                                        {agent.description}
                                    </p>

                                    <div className="pt-2 flex items-center justify-between border-t border-white/[0.03]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: agent.color }} />
                                            <span className="text-[12px] font-mono font-bold text-[#faf9f5]">{agent.connections} CONNECTIONS</span>
                                        </div>
                                        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3a3a38] group-hover:text-[#faf9f5] transition-all">
                                            Inspect Handoffs →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedSkill && (
                <SkillModal
                    skillId={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                />
            )}
        </div>
    );
}
