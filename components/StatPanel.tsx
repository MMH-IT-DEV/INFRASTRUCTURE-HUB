'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface StatPanelProps {
    title: string;
    titleOptions?: string[];
    onTitleChange?: (value: string) => void;
    stat1: { value: string; label: string };
    progressValue: number;
    stat2: { value: string; label: string };
    stat2Progress?: { current: number; expected: number };
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    listTitle: string;
    listItems: { rank: number; name: string; value: string }[];
}

export function StatPanel({
    title,
    titleOptions,
    onTitleChange,
    stat1,
    progressValue,
    stat2,
    stat2Progress,
    tabs,
    activeTab,
    onTabChange,
    listTitle,
    listItems
}: StatPanelProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="space-y-12">
            {/* Title Dropdown */}
            <div className="relative">
                <button
                    onClick={() => titleOptions && setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-[48px] font-light tracking-tight text-[#faf9f5] hover:text-[#d97757] transition-all"
                >
                    {title}
                    {titleOptions && <ChevronDown className="w-8 h-8 opacity-40" />}
                </button>

                {isDropdownOpen && titleOptions && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#252523] border border-white/5 rounded shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                        {titleOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => {
                                    onTitleChange?.(option);
                                    setIsDropdownOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${title === option ? 'bg-white/5 text-[#d97757]' : 'text-[#8a8a85] hover:bg-white/5 hover:text-[#faf9f5]'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Stat 1 */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-[28px] font-light text-[#faf9f5]">{stat1.value}</span>
                    <span className="text-[13px] text-[#8a8a85] font-light uppercase tracking-wider">{stat1.label}</span>
                </div>
                <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#8aaf6e]/60 transition-all duration-500"
                        style={{ width: `${progressValue}%` }}
                    />
                </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-[28px] font-light text-[#faf9f5]">{stat2.value}</span>
                    <span className="text-[13px] text-[#8a8a85] font-light uppercase tracking-wider">{stat2.label}</span>
                </div>
                {stat2Progress && (
                    <div className="relative h-8 w-full bg-white/[0.04] rounded flex items-center px-4 overflow-hidden">
                        <span className="text-[10px] text-[#8a8a85] uppercase tracking-widest absolute left-4">Expected: {stat2Progress.expected}</span>
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-[#d97757]/20 transition-all duration-500"
                            style={{ width: `${(stat2Progress.current / stat2Progress.expected) * 100}%` }}
                        />
                        <span className="absolute right-4 text-[13px] text-[#faf9f5] font-mono">{stat2Progress.current}</span>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="pt-2">
                <div className="flex gap-8 border-b border-white/[0.04]">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`pb-4 text-[15px] transition-all relative ${activeTab === tab
                                    ? 'text-[#faf9f5] font-medium'
                                    : 'text-[#7a7974] hover:text-[#faf9f5]'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#faf9f5]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Title */}
            <div className="text-[13px] text-[#5a5a58] font-light italic">
                {listTitle}
            </div>

            {/* List Items */}
            <div className="space-y-0 relative">
                {listItems.map(item => (
                    <div key={item.name} className="flex items-center justify-between py-3 border-b border-white/[0.04] group hover:bg-white/[0.01] px-2 -mx-2 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] text-[#3a3a38] font-mono min-w-[20px]">{item.rank}.</span>
                            <span className="text-[14px] text-[#faf9f5] font-light group-hover:text-[#d97757] transition-all truncate max-w-[280px]">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-[14px] font-mono text-[#8a8a85] group-hover:text-[#faf9f5] transition-colors">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
