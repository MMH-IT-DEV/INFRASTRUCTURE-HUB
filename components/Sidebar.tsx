'use client';

import {
    ArrowRight,
    Download,
    Keyboard,
    LayoutDashboard,
    ListTree,
    LayoutGrid
} from 'lucide-react';
import { ViewType } from './ViewToggle';

interface SidebarProps {
    activeTab: ViewType;
    onTabChange: (tab: ViewType) => void;
    onDownloadAll: () => void;
    onOpenShortcuts: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onDownloadAll, onOpenShortcuts }: SidebarProps) {
    const navItems: { id: ViewType; label: string; icon: any }[] = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'tree', label: 'Queue', icon: ListTree },
        { id: 'grouped', label: 'Activity', icon: LayoutGrid },
    ];

    return (
        <div className="w-[260px] bg-[#1a1a18] flex flex-col h-full border-r border-white/5 shrink-0">
            {/* Logo area */}
            <div className="p-8 pb-4">
                <div className="text-[14px] font-bold text-[#faf9f5] tracking-tight flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#d97757]" />
                    INFRASTRUCTURE HUB
                </div>
            </div>

            {/* Navigation */}
            <nav className="pt-4 px-0 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full text-left px-8 py-3 text-[13px] transition-all flex items-center gap-3 ${activeTab === item.id
                                ? 'text-[#faf9f5] font-medium border-r-2 border-r-[#faf9f5] bg-white/[0.03]'
                                : 'text-[#8a8a85] hover:text-[#faf9f5] hover:bg-white/[0.01]'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* CTA Card */}
            <div className="px-5 mt-8">
                <div className="bg-[#252523] rounded p-5 group cursor-pointer border border-transparent hover:border-white/[0.05] transition-all">
                    <h3 className="text-[#faf9f5] font-semibold text-[12px] leading-snug mb-2">
                        System Health Monitor
                    </h3>
                    <p className="text-[#8a8a85] text-[10px] leading-relaxed mb-4">
                        Real-time tracking of multi-agent cognitive architecture.
                    </p>
                    <button className="flex items-center gap-1 text-[11px] text-[#8a8a85] group-hover:text-[#faf9f5] transition-all">
                        Deep Dive <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>
            </div>

            <div className="mt-auto p-8 space-y-4">
                <button
                    onClick={onDownloadAll}
                    className="flex items-center gap-3 text-[12px] text-[#8a8a85] hover:text-[#faf9f5] transition-all group"
                >
                    <Download className="w-3.5 h-3.5" />
                    Export Telemetry
                </button>
                <button
                    onClick={onOpenShortcuts}
                    className="flex items-center gap-3 text-[12px] text-[#8a8a85] hover:text-[#faf9f5] transition-all group"
                >
                    <Keyboard className="w-3.5 h-3.5" />
                    Shortcuts
                </button>
            </div>
        </div>
    );
}
