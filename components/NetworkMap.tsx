'use client';

interface NetworkMapProps {
    hoveredAgent: string | null;
    onAgentHover: (name: string | null) => void;
    onSkillClick: (name: string) => void;
    onViewToggle: () => void;
}

const agents = [
    { id: 'lead', label: 'LEAD', color: '#d97757', y: 60 },
    { id: 'code', label: 'CODE', color: '#4a9eff', y: 160 },
    { id: 'mini', label: 'MINI', color: '#8aaf6e', y: 260 },
];

const skills = [
    { id: 'workflow-knowledge', abbrev: 'WRK', x: 200, y: 30 },
    { id: 'multi-agent-workflow', abbrev: 'MUL', x: 320, y: 30 },
    { id: 'project-planning', abbrev: 'PRJ', x: 440, y: 30 },
    { id: 'platform-discovery', abbrev: 'PLT', x: 200, y: 90 },
    { id: 'knowledge-extraction', abbrev: 'KNW', x: 320, y: 90 },
    { id: 'reference-based-replication', abbrev: 'REF', x: 440, y: 90 },
    { id: 'session-handoff', abbrev: 'SES', x: 200, y: 150 },
    { id: 'design-system', abbrev: 'DES', x: 320, y: 150 },
    { id: 'skill-management', abbrev: 'SKL', x: 440, y: 150 },
    { id: 'infrastructure-hub', abbrev: 'INF', x: 260, y: 210 },
];

const connections = [
    { agent: 'lead', skills: ['workflow-knowledge', 'multi-agent-workflow', 'project-planning', 'platform-discovery', 'knowledge-extraction', 'session-handoff', 'skill-management'] },
    { agent: 'code', skills: ['reference-based-replication', 'design-system', 'infrastructure-hub'] },
    { agent: 'mini', skills: ['platform-discovery', 'multi-agent-workflow', 'session-handoff'] },
];

export function NetworkMap({ hoveredAgent, onAgentHover, onSkillClick, onViewToggle }: NetworkMapProps) {
    return (
        <div className="space-y-4">
            {/* Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-[#7a7974]">View:</span>
                    <button className="text-sm text-[#faf9f5] font-medium border-b border-[#faf9f5]">
                        Network
                    </button>
                    <span className="text-[#5a5a58]">●─○</span>
                    <button
                        onClick={onViewToggle}
                        className="text-sm text-[#7a7974] hover:text-[#faf9f5] transition-colors"
                    >
                        Grid
                    </button>
                </div>
            </div>

            {/* Map */}
            <div className="bg-[#1e1e1c] rounded-lg border border-[#3a3a38] h-[300px]">
                <svg className="w-full h-full" viewBox="0 0 500 280">
                    {/* Connection Lines */}
                    {connections.map(conn => {
                        const agent = agents.find(a => a.id === conn.agent);
                        if (!agent) return null;

                        return conn.skills.map(skillId => {
                            const skill = skills.find(s => s.id === skillId);
                            if (!skill) return null;

                            const isHighlighted = !hoveredAgent || hoveredAgent.toLowerCase().includes(conn.agent);

                            return (
                                <line
                                    key={`${conn.agent}-${skillId}`}
                                    x1={80}
                                    y1={agent.y}
                                    x2={skill.x}
                                    y2={skill.y + 15}
                                    stroke={agent.color}
                                    strokeWidth={isHighlighted ? 1.5 : 0.5}
                                    opacity={isHighlighted ? 0.5 : 0.1}
                                    className="transition-all duration-200"
                                />
                            );
                        });
                    })}

                    {/* Agent Labels + Dots */}
                    {agents.map(agent => {
                        const isHighlighted = !hoveredAgent || hoveredAgent.toLowerCase().includes(agent.id);

                        return (
                            <g
                                key={agent.id}
                                onMouseEnter={() => onAgentHover(agent.id)}
                                onMouseLeave={() => onAgentHover(null)}
                                className="cursor-pointer"
                            >
                                <text
                                    x={20}
                                    y={agent.y + 5}
                                    fill={isHighlighted ? '#faf9f5' : '#5a5a58'}
                                    fontSize={12}
                                    fontWeight={600}
                                    className="transition-all duration-200"
                                >
                                    {agent.label}
                                </text>
                                <circle
                                    cx={70}
                                    cy={agent.y}
                                    r={6}
                                    fill={agent.color}
                                    opacity={isHighlighted ? 1 : 0.3}
                                    className="transition-all duration-200"
                                />
                            </g>
                        );
                    })}

                    {/* Skill Nodes */}
                    {skills.map(skill => {
                        const connectedAgents = connections.filter(c => c.skills.includes(skill.id));
                        const isHighlighted = !hoveredAgent || connectedAgents.some(c => !hoveredAgent || hoveredAgent.toLowerCase().includes(c.agent));

                        return (
                            <g
                                key={skill.id}
                                onClick={() => onSkillClick(skill.id)}
                                className="cursor-pointer"
                            >
                                <circle
                                    cx={skill.x}
                                    cy={skill.y + 15}
                                    r={4}
                                    fill={isHighlighted ? '#7a7974' : '#3a3a38'}
                                    className="transition-all duration-200"
                                />
                                <text
                                    x={skill.x + 10}
                                    y={skill.y + 19}
                                    fill={isHighlighted ? '#a8a8a4' : '#4a4a48'}
                                    fontSize={10}
                                    className="transition-all duration-200"
                                >
                                    {skill.abbrev}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Footer hint */}
            <p className="text-xs text-[#5a5a58] flex items-center gap-1">
                <span>⚡</span>
                Hover agent to highlight connection paths
            </p>
        </div>
    );
}
