'use client';

import { SkillNode } from '@/lib/skills-data';
import { useMemo } from 'react';

interface ConnectionWebProps {
    nodes: SkillNode[];
    activeAgentId: string | null;
    onSkillClick: (skill: SkillNode) => void;
}

export default function ConnectionWeb({ nodes, activeAgentId, onSkillClick }: ConnectionWebProps) {
    const agents = useMemo(() => nodes.filter(n => n.type === 'agent'), [nodes]);
    const skills = useMemo(() => nodes.filter(n => n.type === 'skill'), [nodes]);

    const connections = useMemo(() => {
        const conns: { from: string; to: string }[] = [];
        agents.forEach(agent => {
            agent.connections.forEach(targetId => {
                const skill = skills.find(s => s.id === targetId);
                if (skill) {
                    conns.push({ from: agent.id, to: skill.id });
                }
            });
        });
        return conns;
    }, [agents, skills]);

    // Define node positions
    const positions = useMemo(() => {
        const pos: Record<string, { x: number; y: number }> = {};

        // Position agents on the left
        agents.forEach((agent, i) => {
            pos[agent.id] = { x: 100, y: 100 + i * 150 };
        });

        // Position skills on the right, spread out
        skills.forEach((skill, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            pos[skill.id] = { x: 400 + col * 250, y: 50 + row * 80 };
        });

        return pos;
    }, [agents, skills]);

    return (
        <div className="relative w-full h-[600px] bg-[#141413] rounded-2xl border border-white/[0.04] overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: 'radial-gradient(#faf9f5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <svg width="100%" height="100%" viewBox="0 0 900 600" className="relative z-10">
                {/* Connection Lines */}
                {connections.map((conn, i) => {
                    const from = positions[conn.from];
                    const to = positions[conn.to];
                    if (!from || !to) return null;

                    const isActive = activeAgentId === conn.from;

                    return (
                        <line
                            key={i}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={isActive ? '#d97757' : 'rgba(255,255,255,0.15)'}
                            strokeWidth={isActive ? 2 : 1}
                            strokeOpacity={isActive ? 0.6 : 0.3}
                            className="transition-all duration-500"
                        />
                    );
                })}

                {/* Skill Nodes */}
                {skills.map(skill => {
                    const pos = positions[skill.id];
                    if (!pos) return null;

                    const isConnectedToActive = activeAgentId
                        ? agents.find(a => a.id === activeAgentId)?.connections.includes(skill.id)
                        : false;

                    return (
                        <g
                            key={skill.id}
                            transform={`translate(${pos.x}, ${pos.y})`}
                            className="cursor-pointer group"
                            onClick={() => onSkillClick(skill)}
                        >
                            <circle
                                r={6}
                                fill="#1a1a18"
                                stroke={isConnectedToActive ? '#4a9eff' : 'rgba(255,255,255,0.2)'}
                                strokeWidth={1.5}
                                className="transition-all duration-300 group-hover:r-8 group-hover:stroke-[#4a9eff]"
                            />
                            <circle
                                r={3}
                                fill={isConnectedToActive ? '#4a9eff' : 'rgba(255,255,255,0.1)'}
                                className="transition-all duration-300"
                            />
                            <text
                                x={12}
                                y={4}
                                className={`text-[11px] font-medium transition-colors ${isConnectedToActive ? 'fill-[#faf9f5]' : 'fill-[#5a5a58] group-hover:fill-[#8a8a85]'
                                    }`}
                            >
                                {skill.name}
                            </text>
                        </g>
                    );
                })}

                {/* Agent Nodes */}
                {agents.map(agent => {
                    const pos = positions[agent.id];
                    if (!pos) return null;

                    const isActive = activeAgentId === agent.id;

                    return (
                        <g
                            key={agent.id}
                            transform={`translate(${pos.x}, ${pos.y})`}
                            className="transition-all duration-500"
                        >
                            <circle
                                r={10}
                                fill="#1a1a18"
                                stroke={isActive ? '#d97757' : 'rgba(255,255,255,0.2)'}
                                strokeWidth={2}
                                className="transition-all duration-300"
                            />
                            <circle
                                r={5}
                                fill={isActive ? '#d97757' : 'rgba(255,255,255,0.2)'}
                                className="transition-all duration-300"
                            />
                            {isActive && (
                                <circle
                                    r={15}
                                    fill="none"
                                    stroke="#d97757"
                                    strokeWidth={1}
                                    strokeDasharray="2 4"
                                    className="animate-[spin_10s_linear_infinite]"
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#3a3a38] font-bold">
                    Agent Connection Map ✧ Infrastructure Hub
                </p>
            </div>
        </div>
    );
}
