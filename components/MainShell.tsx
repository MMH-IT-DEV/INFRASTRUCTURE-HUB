'use client';

import { SkillNode } from '@/lib/skills-data';
import Sidebar from './Sidebar';
import { ViewType } from './ViewToggle';
import { downloadSkill } from '@/lib/download-skill';

interface MainShellProps {
    nodes: SkillNode[];
    activeTab: ViewType;
    onTabChange: (tab: ViewType) => void;
    onOpenShortcuts: () => void;
    children: React.ReactNode;
}

export default function MainShell({ nodes, activeTab, onTabChange, onOpenShortcuts, children }: MainShellProps) {
    const handleDownloadAll = () => {
        if (nodes.length > 0) downloadSkill(nodes[0]);
    };

    return (
        <div className="flex h-screen bg-[#141413] text-[#faf9f5] overflow-hidden selection:bg-[#faf9f5]/10">
            {/* Global Sidebar */}
            <Sidebar
                activeTab={activeTab}
                onTabChange={onTabChange}
                onDownloadAll={handleDownloadAll}
                onOpenShortcuts={onOpenShortcuts}
            />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Global Header */}
                <header className="flex justify-between items-center px-12 py-5 border-b border-white/[0.04] bg-[#141413] sticky top-0 z-50 shrink-0">
                    <div className="flex items-center gap-2">
                        <h1 className="text-[17px] font-medium text-[#faf9f5]">Infrastructure Hub</h1>
                        <span className="text-[14px] text-[#8a8a85] font-light ml-4">Understanding the multi-agent economy</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[14px] text-[#8a8a85] font-light">Last updated Jan 15, 2026</span>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
