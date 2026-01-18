'use client';

interface Skill {
    id: string;
    abbrev: string;  // 3-letter abbreviation
    name: string;
    connections: number;
    status: 'healthy' | 'warning' | 'critical';
}

const skills: Skill[] = [
    { id: 'workflow-knowledge', abbrev: 'WRK', name: 'workflow-knowledge', connections: 8, status: 'healthy' },
    { id: 'multi-agent-workflow', abbrev: 'MUL', name: 'multi-agent-workflow', connections: 7, status: 'healthy' },
    { id: 'project-planning', abbrev: 'PRJ', name: 'project-planning', connections: 5, status: 'healthy' },
    { id: 'platform-discovery', abbrev: 'PLT', name: 'platform-discovery', connections: 4, status: 'healthy' },
    { id: 'knowledge-extraction', abbrev: 'KNW', name: 'knowledge-extraction', connections: 4, status: 'healthy' },
    { id: 'reference-based', abbrev: 'REF', name: 'reference-based-replication', connections: 3, status: 'healthy' },
    { id: 'session-handoff', abbrev: 'SES', name: 'session-handoff', connections: 3, status: 'healthy' },
    { id: 'design-system', abbrev: 'DES', name: 'design-system', connections: 2, status: 'critical' },
    { id: 'skill-management', abbrev: 'SKL', name: 'skill-management', connections: 2, status: 'healthy' },
    { id: 'infrastructure-hub', abbrev: 'INF', name: 'infrastructure-hub', connections: 4, status: 'healthy' },
];

// Color based on connections (like Anthropic's usage intensity)
const getColor = (connections: number, status: string) => {
    if (status === 'critical') return '#ff7b6f';
    if (connections >= 7) return '#2d5a3d'; // Dark green - high
    if (connections >= 5) return '#3d7a4d'; // Medium-dark green
    if (connections >= 3) return '#5a9a6a'; // Medium green
    return '#8aaf6e'; // Light green - low
};

interface SkillsGridProps {
    onSkillClick: (skill: Skill) => void;
    onViewToggle: () => void;
}

export function SkillsGrid({ onSkillClick, onViewToggle }: SkillsGridProps) {
    return (
        <div className="space-y-4">
            {/* Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-[#7a7974]">View:</span>
                    <button
                        onClick={onViewToggle}
                        className="text-sm text-[#7a7974] hover:text-[#faf9f5] transition-colors"
                    >
                        Network
                    </button>
                    <span className="text-[#5a5a58]">○─●</span>
                    <button className="text-sm text-[#faf9f5] font-medium border-b border-[#faf9f5]">
                        Grid
                    </button>
                </div>
                <span className="text-xs text-[#5a5a58]">
                    Colored by agent connections
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-1">
                {skills.map(skill => (
                    <button
                        key={skill.id}
                        onClick={() => onSkillClick(skill)}
                        className="aspect-square flex items-center justify-center rounded text-xs font-semibold transition-all hover:scale-105 hover:z-10"
                        style={{
                            backgroundColor: getColor(skill.connections, skill.status),
                            color: skill.status === 'critical' ? '#1a1a18' : '#faf9f5'
                        }}
                        title={skill.name}
                    >
                        {skill.abbrev}
                    </button>
                ))}
            </div>

            {/* Footer hint */}
            <p className="text-xs text-[#5a5a58] flex items-center gap-1">
                <span>⚡</span>
                Click a tile to see skill details
            </p>
        </div>
    );
}
