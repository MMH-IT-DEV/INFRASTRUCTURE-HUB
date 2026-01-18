'use client';

import { SkillNode, nodeColors, statusConfig } from '@/lib/skills-data';

interface GroupedViewProps {
    nodes: SkillNode[];
    onSelectNode: (node: SkillNode) => void;
    selectedNodeId?: string;
}

export default function GroupedView({ nodes, onSelectNode, selectedNodeId }: GroupedViewProps) {
    const groups = [
        { label: 'Agents', type: 'agent' },
        { label: 'Skills', type: 'skill' },
        { label: 'References', type: 'reference' },
        { label: 'Platforms', type: 'platform' },
    ];

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-16">
            {groups.map(group => {
                const groupNodes = nodes.filter(n => n.type === group.type);
                if (groupNodes.length === 0) return null;

                return (
                    <div key={group.type} className="space-y-6">
                        {/* Anthropic Style Section Header */}
                        <div className="flex items-center gap-4">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a7974] whitespace-nowrap">
                                {group.label}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/10" />
                            <span className="text-[10px] font-mono text-[#5a5a58] bg-[#1a1a18] px-2 py-0.5 rounded border border-white/5">
                                {groupNodes.length.toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupNodes.map(node => {
                                const isSelected = selectedNodeId === node.id;
                                const status = statusConfig[node.status];

                                return (
                                    <div
                                        key={node.id}
                                        className={`group relative p-5 rounded-lg border transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'bg-[#d97757]/5 border-transparent border-l-[#d97757] border-l-2'
                                                : 'bg-[#262624]/40 border-white/5 hover:border-white/10 hover:bg-[#262624]/60'
                                            }`}
                                        style={{ borderLeftWidth: isSelected ? '4px' : '1px' }}
                                        onClick={() => onSelectNode(node)}
                                    >
                                        <div className="flex flex-col h-full gap-3">
                                            {/* Top Row: Type Dot + Badge */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: nodeColors[node.type] }}
                                                />
                                                {/* Anthropic Style Badge: Dot + Text */}
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                                                    <span className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider">
                                                        {status.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-1">
                                                <h3 className={`text-[15px] font-semibold tracking-tight transition-colors ${isSelected ? 'text-[#faf9f5]' : 'text-[#e2e2e0] group-hover:text-[#faf9f5]'
                                                    }`}>
                                                    {node.name}
                                                </h3>
                                                <p className="text-[13px] text-[#7a7974] leading-normal line-clamp-2">
                                                    {node.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
