'use client';

import {
    ArrowRight,
    Download,
    Keyboard
} from 'lucide-react';
import { ViewType } from './ViewToggle';

interface SidebarProps {
    activeTab: ViewType;
    onTabChange: (tab: ViewType) => void;
    onDownloadAll: () => void;
    onOpenShortcuts: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onDownloadAll, onOpenShortcuts }: SidebarProps) {
    const navItems: { id: ViewType; label: string; href: string }[] = [
        { id: 'dashboard', label: 'System', href: '/' },
        { id: 'grouped', label: 'Activity', href: '/activity' },
    ];

    return (
        <div className="w-[260px] bg-[#1a1a18] flex flex-col h-full border-r border-white/5 shrink-0">
            {/* Navigation */}
            <nav className="pt-8 px-0 space-y-0">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full text-left px-8 py-3.5 text-[14px] transition-all border-b border-white/[0.04] ${activeTab === item.id
                            ? 'bg-white/[0.05] text-[#faf9f5] font-medium border-l-2 border-l-[#faf9f5]'
                            : 'text-[#8a8a85] hover:text-[#faf9f5] hover:bg-white/[0.02]'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* CTA Card - Anthropic Style */}
            <div className="px-5 mt-10">
                <div className="bg-[#252523] rounded p-6 group cursor-pointer border border-transparent hover:border-white/[0.05] transition-all">
                    <div className="w-8 h-10 border border-[#8a8a85]/40 rounded-sm flex items-center justify-center mb-6 group-hover:border-[#d97757] transition-all">
                        <div className="w-4 h-[1px] bg-[#8a8a85]/40 group-hover:bg-[#d97757]" />
                    </div>
                    <h3 className="text-[#faf9f5] font-semibold text-[13px] leading-snug mb-2">
                        Anthropic Economic<br />Index Report
                    </h3>
                    <p className="text-[#8a8a85] text-[11px] leading-relaxed mb-6">
                        See the analysis behind the numbers and what these patterns reveal about AI's economic impact.
                    </p>
                    <button className="flex items-center gap-1 text-[12px] text-[#8a8a85] group-hover:text-[#faf9f5] transition-all">
                        Read the report <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>
            </div>

            <div className="mt-auto p-8 space-y-4">
                <button
                    onClick={onDownloadAll}
                    className="flex items-center gap-3 text-[12px] text-[#8a8a85] hover:text-[#faf9f5] transition-all group"
                >
                    <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    Download dataset
                </button>
                <button
                    onClick={onOpenShortcuts}
                    className="flex items-center gap-3 text-[12px] text-[#8a8a85] hover:text-[#faf9f5] transition-all group"
                >
                    <Keyboard className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    Keyboard shortcuts
                </button>
            </div>
        </div>
    );
}
