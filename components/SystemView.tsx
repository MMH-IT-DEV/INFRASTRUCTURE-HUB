'use client';

import { useState } from 'react';
import { TabNav } from '@/components/TabNav';
import { AgentInfoCards } from '@/components/AgentInfoCards';
import { NetworkMap } from '@/components/NetworkMap';
import { SkillsTreemap } from '@/components/SkillsTreemap';
import { queueData } from '@/lib/queue-data';
import { skillHealthData } from '@/lib/skill-health-data';
import { Plus } from 'lucide-react';

export default function SystemView() {
    const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
    const [vizMode, setVizMode] = useState<'network' | 'treemap'>('network');

    const skills = skillHealthData.map(s => ({
        name: s.name,
        daysOld: s.daysSinceUpdate,
        connections: s.connections,
        status: s.status
    }));

    // Sort logic from QueueView (simplified)
    const queue = queueData.slice(0, 5);

    return (
        <div className="bg-[#1a1a18] min-h-screen p-12 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-[#3a3a38] pb-4">
                <h1 className="text-xl font-medium text-[#faf9f5]">Infrastructure Hub</h1>
                <span className="text-xs text-[#7a7974] font-mono">Last updated Jan 17, 2026</span>
            </div>

            <TabNav />

            {/* Split Panel Layout */}
            <div className="flex gap-12 min-h-[500px]">
                {/* Left Panel: Info Cards */}
                <div className="flex-shrink-0">
                    <div className="text-xs font-semibold text-[#7a7974] mb-4 uppercase tracking-wider">Info Cards (Left)</div>
                    <AgentInfoCards
                        hoveredAgent={hoveredAgent}
                        onAgentHover={setHoveredAgent}
                    />
                </div>

                {/* Right Panel: Visualization */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider">Network/Treemap (Right)</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setVizMode('network')}
                                className={`text-xs px-2 py-1 rounded transition-colors ${vizMode === 'network' ? 'bg-[#faf9f5] text-[#1a1a18]' : 'text-[#7a7974] hover:text-[#faf9f5]'}`}
                            >
                                Network
                            </button>
                            <button
                                onClick={() => setVizMode('treemap')}
                                className={`text-xs px-2 py-1 rounded transition-colors ${vizMode === 'treemap' ? 'bg-[#faf9f5] text-[#1a1a18]' : 'text-[#7a7974] hover:text-[#faf9f5]'}`}
                            >
                                Treemap
                            </button>
                        </div>
                    </div>

                    {vizMode === 'network' ? (
                        <NetworkMap hoveredAgent={hoveredAgent} />
                    ) : (
                        <SkillsTreemap />
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#3a3a38] my-12" />

            {/* Bottom Sections */}
            <div className="space-y-12">
                {/* Skills List */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider">Skills By Connection</h3>
                        <span className="text-xs text-[#5a5a58] font-mono">10</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                        {skills.sort((a, b) => b.connections - a.connections).map((skill, i) => (
                            <div key={skill.name} className="flex justify-between py-1 border-b border-[#3a3a38]/30">
                                <span className="text-sm text-[#faf9f5]">
                                    <span className="text-[#3a3a38] font-mono text-xs mr-3">{i + 1}.</span>
                                    {skill.name}
                                </span>
                                <span className="text-sm text-[#7a7974] font-mono">{skill.connections}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Implementation Queue */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider">Implementation Queue</h3>
                        <span className="text-xs text-[#5a5a58] font-mono">{queueData.length}</span>
                    </div>
                    <div className="space-y-2">
                        {queue.map((item, i) => (
                            <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-[#262624] rounded">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#5a5a58] font-mono text-xs w-4">{i + 1}.</span>
                                    <span className="text-sm text-[#faf9f5]">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm ${item.priority === 'high' ? 'text-[#ff7b6f] bg-[#ff7b6f]/10' :
                                            item.priority === 'medium' ? 'text-[#bb8b5d] bg-[#bb8b5d]/10' :
                                                'text-[#5a5a58] bg-[#5a5a58]/10'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <span className="text-xs text-[#7a7974] font-medium min-w-[50px] text-right">
                                        {item.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7a7974] hover:text-[#faf9f5] transition-colors">
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            </div>
        </div>
    );
}
