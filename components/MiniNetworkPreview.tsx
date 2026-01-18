'use client';

import { SkillNode, nodeColors } from '@/lib/skills-data';
import { Sparkles } from 'lucide-react';

interface MiniNetworkPreviewProps {
    nodes: SkillNode[];
    onOpenNetwork: () => void;
}

export default function MiniNetworkPreview({ nodes, onOpenNetwork }: MiniNetworkPreviewProps) {
    // Take a slice of nodes for a compact preview
    const previewNodes = nodes.slice(0, 12);

    return (
        <div
            className="relative h-[300px] w-full bg-[#1e1e1c] rounded-2xl border border-white/[0.06] overflow-hidden group cursor-pointer hover:border-white/[0.12] transition-all"
            onClick={onOpenNetwork}
        >
            {/* Abstract Grid background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#faf9f5 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Simplified floating nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    {previewNodes.map((node, i) => {
                        const angle = (i / previewNodes.length) * Math.PI * 2;
                        const radius = 80 + (i % 3) * 20;
                        const x = 50 + Math.cos(angle) * (radius / 5);
                        const y = 50 + Math.sin(angle) * (radius / 3.5);

                        return (
                            <div
                                key={node.id}
                                className="absolute w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-150"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    backgroundColor: nodeColors[node.type],
                                    boxShadow: `0 0 10px ${nodeColors[node.type]}44`
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#141413]/40">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/5 backdrop-blur-sm group-hover:bg-[#d97757]/10 group-hover:border-[#d97757]/20 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-[#d97757]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#faf9f5]">View Full Network map</span>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#3a3a38] font-bold"> Interactive System Visualization </span>
            </div>
        </div>
    );
}
