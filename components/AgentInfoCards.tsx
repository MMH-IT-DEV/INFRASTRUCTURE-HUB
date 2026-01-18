'use client';

interface Agent {
    name: string;
    description: string;
    connections: number;
    role: string;
    roleColor: string;
}

const agents: Agent[] = [
    {
        name: 'Lead Agent',
        description: 'Plans, instructs, coordinates, decides',
        connections: 7,
        role: 'PRIMARY AGENT',
        roleColor: '#d97757'
    },
    {
        name: 'Code Agent',
        description: 'Edits code, runs commands, starts servers',
        connections: 3,
        role: 'BUILDER',
        roleColor: '#4a9eff'
    },
    {
        name: 'Mini Agent',
        description: 'Browses, screenshots, verifies UI',
        connections: 3,
        role: 'VERIFIER',
        roleColor: '#8aaf6e'
    }
];

interface AgentInfoCardsProps {
    hoveredAgent: string | null;
    onAgentHover: (name: string | null) => void;
}

export function AgentInfoCards({ hoveredAgent, onAgentHover }: AgentInfoCardsProps) {
    return (
        <div className="space-y-4 w-full">
            {agents.map(agent => (
                <div
                    key={agent.name}
                    onMouseEnter={() => onAgentHover(agent.name)}
                    onMouseLeave={() => onAgentHover(null)}
                    className={`p-5 border rounded-lg cursor-pointer transition-all ${hoveredAgent === agent.name
                            ? 'border-[#5a5a58] bg-[#262624]'
                            : 'border-[#3a3a38] hover:border-[#4a4a48]'
                        }`}
                >
                    {/* Agent Name */}
                    <h3 className="text-base font-semibold text-[#faf9f5]">
                        {agent.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#7a7974] mt-2 leading-relaxed">
                        {agent.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: agent.roleColor }}
                            />
                            <span className="text-xs text-[#a8a8a4] uppercase tracking-wide">
                                {agent.connections} Connections
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#8aaf6e]" />
                            <span className="text-xs text-[#a8a8a4] uppercase tracking-wide">
                                {agent.role}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
