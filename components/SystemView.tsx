'use client';

import { useState } from 'react';
import { TabNav } from '@/components/TabNav';
import { InfoCard } from '@/components/InfoCard';
import { NetworkMap } from '@/components/NetworkMap';
import { SkillsGrid } from '@/components/SkillsGrid';
import { SkillsRanking } from '@/components/SkillsRanking';
import { SkillModal } from '@/components/SkillModal';

export default function SystemView() {
    const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
    const [vizMode, setVizMode] = useState<'network' | 'grid'>('network');
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    const handleSkillClick = (skillOrId: any) => {
        const id = typeof skillOrId === 'string' ? skillOrId : skillOrId.name;
        setSelectedSkill(id);
    };

    return (
        <div className="bg-[#1a1a18] min-h-screen p-12 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-[#3a3a38] pb-4">
                <h1 className="text-xl font-medium text-[#faf9f5]">Infrastructure Hub</h1>
                <span className="text-xs text-[#7a7974] font-mono">Jan 17, 2026</span>
            </div>

            <TabNav />

            {/* Main Content Area: Split 280px / 1fr */}
            <div className="flex gap-12 min-h-[500px]">

                {/* Left Sidebar (Info Cards) */}
                <div className="w-[280px] flex-shrink-0 space-y-6">
                    <InfoCard
                        title="Agent Network"
                        description="See which agents connect to which skills in the system."
                        legend={[
                            { color: '#d97757', label: 'Lead (7 connections)' },
                            { color: '#4a9eff', label: 'Code (3 connections)' },
                            { color: '#8aaf6e', label: 'Mini (3 connections)' },
                        ]}
                    />

                    <InfoCard
                        title="Skill Health"
                        description="Track freshness of skills. Stale skills need review."
                        legend={[
                            { color: '#8aaf6e', label: 'Healthy (<14 days)' },
                            { color: '#bb8b5d', label: 'Warning (14-30 days)' },
                            { color: '#ff7b6f', label: 'Critical (>30 days)' },
                        ]}
                    />

                    <InfoCard
                        title="Implementation Queue"
                        description="Track planned improvements and pending tasks."
                        stats={[
                            { value: 7, label: 'items pending' },
                            { value: 3, label: 'high priority' },
                        ]}
                    />
                </div>

                {/* Right Visualization Area */}
                <div className="flex-1 space-y-8">
                    {/* Network or Grid View */}
                    {vizMode === 'network' ? (
                        <NetworkMap
                            hoveredAgent={hoveredAgent}
                            onAgentHover={setHoveredAgent}
                            onSkillClick={handleSkillClick}
                            onViewToggle={() => setVizMode('grid')}
                        />
                    ) : (
                        <SkillsGrid
                            onSkillClick={handleSkillClick}
                            onViewToggle={() => setVizMode('network')}
                        />
                    )}

                    {/* Ranking List */}
                    <SkillsRanking onSkillClick={handleSkillClick} />
                </div>
            </div>

            {selectedSkill && (
                <SkillModal
                    skillId={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                />
            )}
        </div>
    );
}
