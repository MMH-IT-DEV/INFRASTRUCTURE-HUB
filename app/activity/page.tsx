'use client';

import { useState } from 'react';
import { TabNav } from '@/components/TabNav';

export default function ActivityTab() {
    const [usageData] = useState({
        daysActive: 3,
        daysTotal: 7,
        tokensUsed: 245000,
        tokensLimit: 500000,
        messagesCount: 47,
        limits: {
            daily: { used: 45000, limit: 100000, resetsIn: '8h' },
            weekly: { used: 245000, limit: 500000, resetsIn: '4d' },
            monthly: { used: 1200000, limit: 5000000, resetsIn: '21d' },
        }
    });

    const activities = [
        { agent: '🤖', project: 'Infrastructure Hub', task: 'Created 2-tab architecture instruction', status: 'done', date: 'Today' },
        { agent: '🤖', project: 'GMP Customer Data', task: 'Updated compliance tracker script', status: 'waiting', date: 'Today' },
        { agent: '💻', project: 'Infrastructure Hub', task: 'Implemented Overview page redesign', status: 'done', date: 'Yesterday' },
    ];

    return (
        <div className="bg-[#1a1a18] min-h-screen p-12 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-[#3a3a38] pb-4">
                <h1 className="text-xl font-medium text-[#faf9f5]">Infrastructure Hub</h1>
                <span className="text-xs text-[#7a7974] font-mono">Last updated Jan 17, 2026</span>
            </div>

            <TabNav />

            <div className="space-y-12">
                {/* Usage Stats */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-light text-[#faf9f5]">Activity</h1>
                        <div className="text-xs font-mono text-[#5a5a58]">TRACKING ID: 994-A</div>
                    </div>

                    <div className="bg-[#1e1e1c] border border-[#3a3a38] rounded-lg p-8 space-y-8">
                        {/* Days Active */}
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-semibold text-[#faf9f5]">
                                    {usageData.daysActive} / {usageData.daysTotal}
                                </span>
                                <span className="text-sm text-[#7a7974]">Days active this week</span>
                            </div>
                            <div className="flex gap-1 h-8 opacity-80">
                                {Array.from({ length: usageData.daysTotal }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-sm ${i < usageData.daysActive
                                                ? 'bg-[repeating-linear-gradient(45deg,#3a3a38,#3a3a38_2px,#4a4a48_2px,#4a4a48_4px)]'
                                                : 'bg-[#262624]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tokens Used */}
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-semibold text-[#faf9f5]">
                                    {(usageData.tokensUsed / 1000).toFixed(0)}k
                                </span>
                                <span className="text-sm text-[#7a7974]">Tokens used</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-[#7a7974] whitespace-nowrap min-w-[100px]">
                                    Expected: {(usageData.tokensLimit / 1000).toFixed(0)}k
                                </span>
                                <div className="flex-1 h-1 bg-[#3a3a38] rounded-full relative">
                                    {/* Expected mark */}
                                    <div className="absolute left-[49%] top-[-4px] bottom-[-4px] w-0.5 bg-[#7a7974]" />
                                    <div
                                        className="h-full bg-[#faf9f5] rounded-full"
                                        style={{ width: `${(usageData.tokensUsed / usageData.tokensLimit) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-[#faf9f5] min-w-[50px] text-right">
                                    {(usageData.tokensUsed / 1000).toFixed(0)}k
                                </span>
                            </div>
                            <p className="text-xs text-[#5a5a58] pt-2 border-t border-[#3a3a38]/30">
                                Total # of messages this session: {usageData.messagesCount}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Token Limits */}
                <div className="space-y-4">
                    <h2 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider">
                        Claude Pro Usage
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(usageData.limits).map(([period, data]) => (
                            <div key={period} className="p-6 border border-[#3a3a38] rounded-lg bg-[#1e1e1c]">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-sm font-medium text-[#faf9f5] capitalize">
                                        {period}
                                    </h3>
                                </div>
                                <div className="text-xl font-light text-[#faf9f5] mb-4">
                                    {(data.used / 1000).toFixed(0)}k <span className="text-[#5a5a58] text-sm">/ {(data.limit / 1000).toFixed(0)}k</span>
                                </div>
                                <div className="h-1.5 bg-[#3a3a38] rounded-full mb-3">
                                    <div
                                        className="h-full bg-[#8aaf6e] rounded-full transition-all duration-500"
                                        style={{ width: `${(data.used / data.limit) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-[#7a7974]">
                                    Resets in: <span className="text-[#faf9f5]">{data.resetsIn}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                    <h2 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider">
                        Recent Activity
                    </h2>

                    <div className="space-y-8">
                        {['Today', 'Yesterday'].map(date => {
                            const dateActivities = activities.filter(a => a.date === date);
                            if (dateActivities.length === 0) return null;

                            return (
                                <div key={date}>
                                    <h3 className="text-sm font-medium text-[#7a7974] mb-3 border-b border-[#3a3a38] inline-block pb-1">{date}</h3>
                                    <div className="space-y-3">
                                        {dateActivities.map((activity, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-4 bg-[#262624] rounded border border-[#3a3a38]/50 hover:border-[#3a3a38] transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="text-xl pt-0.5">{activity.agent}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-[#faf9f5] mb-0.5">
                                                            {activity.project}
                                                        </div>
                                                        <p className="text-sm text-[#7a7974]">
                                                            {activity.task}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#1a1a18] border border-[#3a3a38]">
                                                    {activity.status === 'done' ? (
                                                        <>
                                                            <div className="w-2 h-2 rounded bg-[#8aaf6e]" />
                                                            <span className="text-xs text-[#8aaf6e] font-medium">Done</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-2 h-2 rounded bg-[#bb8b5d]" />
                                                            <span className="text-xs text-[#bb8b5d] font-medium">Wait</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
