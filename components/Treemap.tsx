'use client';

import { useState } from 'react';

export interface TreemapItem {
    name: string;
    value: number;
    percentage: string;
    color: string;
    description?: string;
}

interface TreemapProps {
    title: string;
    subtitle?: string;
    data: TreemapItem[];
    groupByLabel?: string;
    onTileClick?: (name: string) => void;
    selectedTile?: string | null;
}

export function Treemap({ title, subtitle, data = [], groupByLabel, onTileClick, selectedTile }: TreemapProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Early return if no data
    if (!data || data.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="text-[17px] font-medium text-[#faf9f5]">{title}</h3>
                <div className="h-64 flex items-center justify-center text-[#7a7974] bg-white/[0.02] border border-white/[0.04] rounded">
                    No data available
                </div>
            </div>
        );
    }

    // Sort by value descending
    const sorted = [...(data || [])].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-[17px] font-medium text-[#faf9f5]">{title}</h3>
                    {subtitle && (
                        <div className="text-[12px] text-[#8a8a85] flex items-center gap-1.5 uppercase tracking-wider font-bold">
                            ⚡ {subtitle}
                        </div>
                    )}
                </div>
                {groupByLabel && (
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3a3a38]">
                        {groupByLabel}
                    </div>
                )}
            </div>

            {/* Treemap Grid */}
            <div className="grid grid-cols-12 gap-0.5 h-[340px] bg-white/[0.04] p-0.5 rounded overflow-hidden">
                {sorted.map((item, index) => {
                    // Calculate grid span based on value
                    const span = Math.max(2, Math.round((item.value / total) * 12));
                    const isHovered = hoveredItem === item.name;

                    return (
                        <div
                            key={item.name}
                            className={`rounded-sm p-3 cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${isHovered ? 'brightness-125 z-10' : ''
                                } ${selectedTile === item.name ? 'ring-2 ring-white/60 scale-[1.02] shadow-xl' : ''}`}
                            style={{
                                backgroundColor: item.color,
                                gridColumn: `span ${span}`
                            }}
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => onTileClick?.(item.name)}
                        >
                            <span className="text-[12px] font-bold text-[#141413] leading-tight line-clamp-2">
                                {item.name}
                            </span>
                            <span className="text-[11px] text-[#141413]/70 font-mono">
                                {item.percentage}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Description */}
            <div className="text-[11px] text-[#5a5a58] italic leading-relaxed">
                Size represents relative importance or volume. Colors indicate status, priority, or project category. Click a tile to drill into more granular data.
            </div>
        </div>
    );
}
