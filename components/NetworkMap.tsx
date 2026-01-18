'use client';

interface NetworkMapProps {
    hoveredAgent: string | null;
}

const agentData = [
    { id: 'lead', name: 'LEAD', color: '#d97757', y: 80 },
    { id: 'code', name: 'CODE', color: '#4a9eff', y: 200 },
    { id: 'mini', name: 'MINI', color: '#8aaf6e', y: 320 },
];

const skillData = [
    { name: 'workflow-knowledge', x: 300, y: 40 },
    { name: 'multi-agent-workflow', x: 480, y: 40 },
    { name: 'project-planning', x: 300, y: 100 },
    { name: 'platform-discovery', x: 480, y: 100 },
    { name: 'reference-based-replication', x: 300, y: 160 },
    { name: 'knowledge-extraction', x: 480, y: 160 },
    { name: 'session-handoff', x: 300, y: 220 },
    { name: 'design-system', x: 480, y: 220 },
    { name: 'skill-management', x: 300, y: 280 },
    { name: 'infrastructure-hub', x: 480, y: 280 },
];

const connections = [
    { agent: 'lead', skills: ['workflow-knowledge', 'multi-agent-workflow', 'project-planning', 'platform-discovery', 'knowledge-extraction', 'session-handoff', 'skill-management'] },
    { agent: 'code', skills: ['reference-based-replication', 'design-system', 'infrastructure-hub'] },
    { agent: 'mini', skills: ['platform-discovery', 'multi-agent-workflow', 'session-handoff'] },
];

export function NetworkMap({ hoveredAgent }: NetworkMapProps) {
    return (
        <div className="bg-[#1e1e1c] rounded-lg border border-[#3a3a38] h-[380px] relative w-full overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet">
                {/* Connection Lines */}
                {connections.map(conn => {
                    const agent = agentData.find(a => a.id === conn.agent);
                    if (!agent) return null;

                    return conn.skills.map(skillName => {
                        const skill = skillData.find(s => s.name === skillName);
                        if (!skill) return null;

                        const isHighlighted = !hoveredAgent || hoveredAgent.toLowerCase().includes(conn.agent);

                        return (
                            <line
                                key={`${conn.agent}-${skillName}`}
                                x1={120}
                                y1={agent.y}
                                x2={skill.x - 10}
                                y2={skill.y + 10}
                                stroke={agent.color}
                                strokeWidth={isHighlighted ? 1.5 : 0.5}
                                opacity={isHighlighted ? 0.6 : 0.1}
                                className="transition-all duration-300"
                            />
                        );
                    });
                })}

                {/* Agent Nodes */}
                {agentData.map(agent => {
                    const isHighlighted = !hoveredAgent || hoveredAgent.toLowerCase().includes(agent.id);

                    return (
                        <g key={agent.id}>
                            {/* Agent label */}
                            <text
                                x={60}
                                y={agent.y + 5}
                                fill={isHighlighted ? '#faf9f5' : '#5a5a58'}
                                fontSize={12}
                                fontWeight={600}
                                textAnchor="end"
                                className="transition-all duration-300"
                            >
                                {agent.name}
                            </text>
                            {/* Agent dot */}
                            <circle
                                cx={80}
                                cy={agent.y}
                                r={8}
                                fill={agent.color}
                                opacity={isHighlighted ? 1 : 0.3}
                                className="transition-all duration-300"
                            />
                        </g>
                    );
                })}

                {/* Skill Nodes */}
                {skillData.map(skill => {
                    // Check if skill is connected to hovered agent
                    const connectedAgent = connections.find(c =>
                        c.skills.includes(skill.name) &&
                        (!hoveredAgent || hoveredAgent.toLowerCase().includes(c.agent))
                    );
                    const isHighlighted = !hoveredAgent || connectedAgent;

                    return (
                        <g key={skill.name} className="cursor-pointer">
                            <circle
                                cx={skill.x}
                                cy={skill.y + 10}
                                r={5}
                                fill={isHighlighted ? '#7a7974' : '#3a3a38'}
                                className="transition-all duration-300"
                            />
                            <text
                                x={skill.x + 12}
                                y={skill.y + 14}
                                fill={isHighlighted ? '#a8a8a4' : '#4a4a48'}
                                fontSize={11}
                                className="transition-all duration-300"
                            >
                                {skill.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
