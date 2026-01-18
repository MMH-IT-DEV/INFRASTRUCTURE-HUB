'use client';

import { SkillNode, nodeColors } from '@/lib/skills-data';

interface JobExplorerGridProps {
    nodes: SkillNode[];
}

export default function JobExplorerGrid({ nodes }: JobExplorerGridProps) {
    const skills = nodes.filter(n => n.type === 'skill');

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <h2 className="text-[48px] font-light tracking-tight text-[#faf9f5]">Global Usage</h2>
                <p className="text-[15px] text-[#8a8a85] font-light max-w-2xl leading-relaxed">
                    People use AI to automate certain parts of their jobs, like data entry. When exploring problems or ideas, Claude becomes a collaborative partner instead. Other tasks remain firmly in human hands.
                </p>
            </div>

            <div className="flex items-center gap-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8aaf6e]" />
                    <span className="text-[13px] text-[#8a8a85]">Mostly automated tasks</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#a89cc8]" />
                    <span className="text-[13px] text-[#8a8a85]">Mostly augmented tasks</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {skills.map(node => (
                    <div key={node.id} className="space-y-4 group cursor-pointer">
                        <h3 className="text-[14px] font-medium text-[#faf9f5] group-hover:text-[#d97757] transition-colors line-clamp-1">{node.name}</h3>
                        <p className="text-[11px] text-[#8a8a85] font-light uppercase tracking-wider">{node.status}</p>

                        {/* Waffle Chart Grid */}
                        <div className="grid grid-cols-10 gap-0.5">
                            {Array.from({ length: 40 }).map((_, i) => {
                                let color = 'bg-white/[0.04]';
                                if (i < 15) color = 'bg-[#8aaf6e]/80';
                                else if (i < 25) color = 'bg-[#a89cc8]/80';

                                return <div key={i} className={`h-4 w-full ${color}`} />;
                            })}
                        </div>

                        <span className="text-[11px] font-mono text-[#8a8a85]">0.{(node.connections.length * 15).toString().padStart(2, '0')}% usage</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
