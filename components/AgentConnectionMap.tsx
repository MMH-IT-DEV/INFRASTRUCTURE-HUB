'use client';

import React from 'react';

interface Agent {
    name: string;
    skills: string[];
    color: string;
}

interface Skill {
    name: string;
    daysOld: number;
    connections: number;
    status: string;
}

interface Props {
    agents: Agent[];
    skills: Skill[];
    hoveredAgent: string | null;
    onAgentHover: (name: string | null) => void;
    onSkillClick: (name: string) => void;
}

export function AgentConnectionMap({
    agents,
    skills,
    hoveredAgent,
    onAgentHover,
    onSkillClick
}: Props) {
    // Position calculations
    const agentPositions = [
        { x: 100, y: 120 },   // Lead
        { x: 100, y: 270 },   // Code
        { x: 100, y: 420 },   // Mini
    ];

    // Skill positions (staggered on right side)
    const skillPositions = skills.map((_, i) => ({
        x: 450 + (i % 2) * 180,
        y: 80 + Math.floor(i / 2) * 90
    }));

    return (
        <svg viewBox="0 0 800 550" className="w-full h-full">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Connection Lines */}
            {agents.map((agent, agentIndex) =>
                agent.skills.map(skillName => {
                    const skillIndex = skills.findIndex(s => s.name === skillName);
                    if (skillIndex === -1) return null;

                    const isHighlighted = hoveredAgent === agent.name;
                    const isOtherAgentHovered = hoveredAgent !== null && hoveredAgent !== agent.name;

                    return (
                        <line
                            key={`${agent.name}-${skillName}`}
                            x1={agentPositions[agentIndex].x}
                            y1={agentPositions[agentIndex].y}
                            x2={skillPositions[skillIndex].x}
                            y2={skillPositions[skillIndex].y}
                            stroke={agent.color}
                            strokeWidth={isHighlighted ? 2 : 1}
                            strokeOpacity={isHighlighted ? 0.8 : (isOtherAgentHovered ? 0.05 : 0.2)}
                            className="transition-all duration-300"
                        />
                    );
                })
            )}

            {/* Agent Nodes */}
            {agents.map((agent, index) => (
                <g
                    key={agent.name}
                    transform={`translate(${agentPositions[index].x}, ${agentPositions[index].y})`}
                    onMouseEnter={() => onAgentHover(agent.name)}
                    onMouseLeave={() => onAgentHover(null)}
                    className="cursor-pointer"
                >
                    <circle
                        cx="0"
                        cy="0"
                        r={hoveredAgent === agent.name ? 12 : 8}
                        fill={agent.color}
                        className="transition-all duration-300"
                        filter={hoveredAgent === agent.name ? "url(#glow)" : "none"}
                    />
                    <text
                        x="-15"
                        y="0"
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fill="#8a8a85"
                        className="text-[11px] font-bold uppercase tracking-widest pointer-events-none"
                    >
                        {agent.name.split(' ')[0]}
                    </text>
                </g>
            ))}

            {/* Skill Nodes */}
            {skills.map((skill, index) => {
                const connectedAgent = agents.find(a =>
                    a.skills.includes(skill.name) && a.name === hoveredAgent
                );
                const isHighlighted = connectedAgent !== undefined;
                const isOtherSkillDimmed = hoveredAgent !== null && !isHighlighted;

                return (
                    <g
                        key={skill.name}
                        transform={`translate(${skillPositions[index].x}, ${skillPositions[index].y})`}
                        onClick={() => onSkillClick(skill.name)}
                        className="cursor-pointer group"
                    >
                        <circle
                            cx="0"
                            cy="0"
                            r={isHighlighted ? 7 : 5}
                            fill={skill.status === 'critical' ? '#ff7b6f' : '#faf9f5'}
                            fillOpacity={isOtherSkillDimmed ? 0.1 : (isHighlighted ? 1 : 0.4)}
                            className="transition-all duration-300 group-hover:fill-[#d97757] group-hover:fill-opacity-100"
                        />
                        <text
                            x="15"
                            y="0"
                            alignmentBaseline="middle"
                            fill={isHighlighted ? "#faf9f5" : "#5a5a58"}
                            fillOpacity={isOtherSkillDimmed ? 0.1 : 1}
                            className={`text-[12px] transition-all duration-300 pointer-events-none ${isHighlighted ? 'font-medium' : 'font-light'}`}
                        >
                            {skill.name}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
