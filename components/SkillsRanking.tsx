'use client';

interface Skill {
    name: string;
    value: number;
}

const skills: Skill[] = [
    { name: 'workflow-knowledge', value: 8 },
    { name: 'multi-agent-workflow', value: 7 },
    { name: 'project-planning', value: 5 },
    { name: 'platform-discovery', value: 4 },
    { name: 'infrastructure-hub', value: 4 },
    { name: 'knowledge-extraction', value: 4 },
    { name: 'session-handoff', value: 3 },
    { name: 'reference-based-replication', value: 3 },
    { name: 'design-system', value: 2 },
    { name: 'skill-management', value: 2 },
];

interface SkillsRankingProps {
    onSkillClick: (name: string) => void;
}

export function SkillsRanking({ onSkillClick }: SkillsRankingProps) {
    const leftColumn = skills.slice(0, 5);
    const rightColumn = skills.slice(5, 10);

    return (
        <div className="border-t border-[#3a3a38] pt-6 mt-8">
            <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                {/* Left Column */}
                <div className="space-y-2">
                    {leftColumn.map((skill, i) => (
                        <button
                            key={skill.name}
                            onClick={() => onSkillClick(skill.name)}
                            className="w-full flex items-center justify-between py-1.5 hover:bg-[#262624] rounded px-2 -mx-2 transition-colors"
                        >
                            <span className="text-sm text-[#faf9f5]">
                                <span className="text-[#7a7974] mr-2">{i + 1}.</span>
                                {skill.name}
                            </span>
                            <span className="text-sm text-[#7a7974] tabular-nums">
                                {skill.value}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                    {rightColumn.map((skill, i) => (
                        <button
                            key={skill.name}
                            onClick={() => onSkillClick(skill.name)}
                            className="w-full flex items-center justify-between py-1.5 hover:bg-[#262624] rounded px-2 -mx-2 transition-colors"
                        >
                            <span className="text-sm text-[#faf9f5]">
                                <span className="text-[#7a7974] mr-2">{i + 6}.</span>
                                {skill.name}
                            </span>
                            <span className="text-sm text-[#7a7974] tabular-nums">
                                {skill.value}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
