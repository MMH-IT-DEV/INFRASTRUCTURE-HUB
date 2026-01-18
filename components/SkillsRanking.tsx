'use client';

import { useState } from 'react';
import { SkillNode } from '@/lib/skills-data';

interface SkillsRankingProps {
    nodes: SkillNode[];
}

export default function SkillsRanking({ nodes }: SkillsRankingProps) {
    const [activeTab, setActiveTab] = useState<'frequent' | 'distinctive'>('frequent');

    const getSortedSkills = () => {
        const skills = [...nodes].filter(n => n.type === 'skill');
        if (activeTab === 'frequent') {
            return skills.sort((a, b) => b.connections.length - a.connections.length);
        } else {
            // "Distinctive" could mean nodes with fewer connections but high "importance" (mocked here by description length)
            return skills.sort((a, b) => (b.description.length / (b.connections.length + 1)) - (a.description.length / (a.connections.length + 1)));
        }
    };

    const topSkills = getSortedSkills().slice(0, 10);
    const maxVal = Math.max(...topSkills.map(s => activeTab === 'frequent' ? s.connections.length : s.description.length / 5), 1);

    const leftColumn = topSkills.slice(0, 5);
    const rightColumn = topSkills.slice(5, 10);

    const renderRankingItem = (node: SkillNode, index: number, offset: number) => {
        const value = activeTab === 'frequent' ? node.connections.length : Math.round(node.description.length / 10);
        const percentage = Math.min(Math.round((value / maxVal) * 5.6) + 1, 5.6); // Anthropic uses small percentages like 5.6%

        return (
            <div key={node.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0 group cursor-pointer hover:bg-white/[0.01] px-2 -mx-2 transition-colors">
                <div className="flex items-start gap-4 flex-1">
                    <span className="text-[13px] text-[#8a8a85] w-4 font-light">{offset + index + 1}.</span>
                    <span className="text-[14px] text-[#faf9f5] font-light leading-snug group-hover:text-[#d97757] transition-colors">
                        {node.name}
                    </span>
                </div>

                <div className="text-right flex items-center gap-4">
                    <span className="text-[13px] font-light text-[#faf9f5]">
                        {(percentage).toFixed(1)}%
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-10 border-b border-white/[0.08]">
                <button
                    onClick={() => setActiveTab('frequent')}
                    className={`pb-4 text-[15px] font-medium transition-all relative ${activeTab === 'frequent' ? 'text-[#faf9f5]' : 'text-[#8a8a85] hover:text-[#faf9f5]'
                        }`}
                >
                    Most frequent
                    {activeTab === 'frequent' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#faf9f5]" />}
                </button>
                <button
                    onClick={() => setActiveTab('distinctive')}
                    className={`pb-4 text-[15px] font-medium transition-all relative ${activeTab === 'distinctive' ? 'text-[#faf9f5]' : 'text-[#8a8a85] hover:text-[#faf9f5]'
                        }`}
                >
                    Most distinctive
                    {activeTab === 'distinctive' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#faf9f5]" />}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
                <div className="flex flex-col">
                    <p className="text-[13px] text-[#8a8a85] italic mb-4 font-light">
                        The most common topics in Infrastructure Hub.
                    </p>
                    {leftColumn.map((node, i) => renderRankingItem(node, i, 0))}
                </div>
                <div className="flex flex-col pt-9">
                    {rightColumn.map((node, i) => renderRankingItem(node, i, 5))}
                </div>
            </div>
        </div>
    );
}
