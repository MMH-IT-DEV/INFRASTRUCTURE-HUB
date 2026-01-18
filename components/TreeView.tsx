'use client';

import { useState } from 'react';
import { SkillNode, nodeColors } from '@/lib/skills-data';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface TreeViewProps {
    nodes: SkillNode[];
    onSelectNode: (node: SkillNode) => void;
    selectedNodeId?: string;
}

export default function TreeView({ nodes, onSelectNode, selectedNodeId }: TreeViewProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['lead-agent']));

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    const renderNode = (nodeId: string, depth: number = 0, path: string[] = []) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node || path.includes(nodeId)) return null;

        const isExpanded = expandedIds.has(nodeId);
        const hasChildren = node.connections.length > 0;
        const isSelected = selectedNodeId === nodeId;

        return (
            <div key={`${nodeId}-${depth}`} className="flex flex-col">
                <div
                    className={`group flex items-center gap-3 py-2 px-3 rounded-md cursor-pointer transition-all duration-200 border-l-2 ${isSelected
                            ? 'bg-[#d97757]/5 border-[#d97757] text-[#faf9f5]'
                            : 'hover:bg-white/5 border-transparent text-[#7a7974]'
                        }`}
                    style={{ marginLeft: `${depth * 24}px` }}
                    onClick={() => onSelectNode(node)}
                >
                    {hasChildren ? (
                        <div
                            onClick={(e) => toggleExpand(nodeId, e)}
                            className="p-1 hover:bg-white/10 rounded transition-colors text-[#5a5a58] hover:text-[#faf9f5]"
                        >
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </div>
                    ) : (
                        <div className="w-5.5" />
                    )}

                    <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: nodeColors[node.type] }}
                    />
                    <span className={`text-[14px] font-medium tracking-tight ${isSelected ? 'text-[#faf9f5]' : 'group-hover:text-[#faf9f5]'}`}>
                        {node.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#3a3a38] ml-2">
                        {node.type}
                    </span>
                    <span className="text-[11px] text-[#5a5a58] truncate opacity-0 group-hover:opacity-100 transition-opacity ml-4 italic">
                        {node.description}
                    </span>
                </div>

                {isExpanded && (
                    <div className="relative">
                        {/* Indentation Line */}
                        <div
                            className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-white/5"
                            style={{ marginLeft: `${depth * 24}px` }}
                        />
                        {node.connections.map(childId => renderNode(childId, depth + 1, [...path, nodeId]))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-10 max-w-4xl mx-auto space-y-1">
            <div className="mb-8 flex items-center gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5a5a58]">Hierarchy</h2>
                <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            {renderNode('lead-agent')}

            {/* Show other agents if they aren't in the tree starting from lead-agent */}
            <div className="mt-12 pt-6">
                <div className="mb-4 flex items-center gap-4">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5a5a58]">Stand-alone Components</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                {nodes
                    .filter(n => n.type === 'agent' && n.id !== 'lead-agent' && !expandedIds.has(n.id))
                    .map(agent => renderNode(agent.id))}
            </div>
        </div>
    );
}
