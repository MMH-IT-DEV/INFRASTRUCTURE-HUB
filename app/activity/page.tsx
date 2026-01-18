'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { TabNav } from '@/components/TabNav';

export default function ActivityPage() {
    // Placeholder data
    const data = {
        daysActive: 3,
        daysTotal: 7,
        tokensUsed: 245000,
        tokensExpected: 500000,
        messagesCount: 47,
        limits: {
            daily: { used: 45000, limit: 100000, resetsIn: '8h' },
            weekly: { used: 245000, limit: 500000, resetsIn: '4d' },
            monthly: { used: 1200000, limit: 5000000, resetsIn: '21d' },
        }
    };

    const activities = [
        { agent: '🤖 Lead Agent', project: 'Infrastructure Hub', task: 'Created 2-tab architecture instruction', status: 'done', date: 'Today' },
        { agent: '🤖 Lead Agent', project: 'GMP Customer Data', task: 'Updated compliance tracker script', status: 'waiting', date: 'Today' },
        { agent: '💻 Code Agent', project: 'Infrastructure Hub', task: 'Implemented Overview page redesign', status: 'done', date: 'Yesterday' },
    ];

    return (
        <div className="bg-[#1a1a18] min-h-screen p-12 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-[#3a3a38] pb-4">
                <h1 className="text-xl font-medium text-[#faf9f5]">Infrastructure Hub</h1>
                <span className="text-xs text-[#7a7974] font-mono">Jan 17, 2026</span>
            </div>

            <TabNav />

            <div className="space-y-8">

                {/* Title */}
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-light text-[#faf9f5]">Activity</h1>
                    <ChevronDown className="w-6 h-6 text-[#7a7974]" />
                </div>

                <div className="bg-[#1e1e1c] border border-[#3a3a38] rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Days Active - Match Anthropic's "1/50" style */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-6">
                            <div className="flex items-baseline gap-1 min-w-[100px]">
                                <span className="text-3xl font-semibold text-[#faf9f5]">
                                    {data.daysActive}
                                </span>
                                <span className="text-3xl font-light text-[#7a7974] px-1">/</span>
                                <span className="text-3xl font-light text-[#7a7974]">
                                    {data.daysTotal}
                                </span>
                            </div>

                            {/* Day blocks - like Anthropic's state usage blocks */}
                            <div className="flex gap-0.5 flex-1 h-5 pt-1">
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-4 flex-1 rounded-sm ${i < Math.round((data.daysActive / data.daysTotal) * 50)
                                                ? 'bg-[#4a9eff]'
                                                : 'bg-[#3a3a38]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-[#7a7974]">Days active</p>
                    </div>

                    {/* Tokens Used - Match Anthropic's "Expected: 1 ─── 4.00" style */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-6">
                            <span className="text-3xl font-semibold text-[#faf9f5] min-w-[100px]">
                                {(data.tokensUsed / 1000).toFixed(0)}k
                            </span>

                            {/* Comparison bar */}
                            <div className="flex-1 flex items-center gap-3">
                                <span className="text-xs text-[#7a7974] whitespace-nowrap">
                                    Expected: {(data.tokensExpected / 1000).toFixed(0)}k
                                </span>
                                <div className="flex-1 h-4 bg-[#3a3a38]/30 rounded relative">
                                    {/* Expected marker */}
                                    <div
                                        className="absolute top-0 bottom-0 w-px bg-[#5a5a58] z-10"
                                        style={{ left: '50%' }}
                                    />
                                    {/* Actual bar */}
                                    <div
                                        className="h-full bg-[#8aaf6e] rounded opacity-90"
                                        style={{ width: `${(data.tokensUsed / data.tokensExpected) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-[#faf9f5]">
                                    {(data.tokensUsed / 1000).toFixed(0)}k
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-[#7a7974]">Tokens used</p>
                        <p className="text-xs text-[#5a5a58] pt-2">
                            Total # of messages this session: {data.messagesCount}
                        </p>
                    </div>
                </div>

                {/* Token Limits */}
                <div className="border-t border-[#3a3a38] pt-8">
                    <h2 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider mb-6">
                        Claude Pro Usage
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(data.limits).map(([period, limit]) => (
                            <div key={period} className="p-6 border border-[#3a3a38] rounded-lg bg-[#1e1e1c]">
                                <h3 className="text-base font-semibold text-[#faf9f5] capitalize mb-1">
                                    {period}
                                </h3>
                                <div className="mt-4 mb-3">
                                    <span className="text-2xl font-light text-[#faf9f5]">
                                        {(limit.used / 1000).toFixed(0)}k
                                    </span>
                                    <span className="text-sm text-[#5a5a58]">
                                        {' / '}{(limit.limit / 1000).toFixed(0)}k
                                    </span>
                                </div>
                                <div className="mt-3 h-1.5 bg-[#3a3a38] rounded-full">
                                    <div
                                        className="h-full bg-[#8aaf6e] rounded-full"
                                        style={{ width: `${(limit.used / limit.limit) * 100}%` }}
                                    />
                                </div>
                                <p className="mt-3 text-xs text-[#7a7974]">
                                    Resets in {limit.resetsIn}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-[#3a3a38] pt-8">
                    <h2 className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider mb-6">
                        Recent Activity
                    </h2>

                    {['Today', 'Yesterday'].map(date => {
                        const dayActivities = activities.filter(a => a.date === date);
                        if (!dayActivities.length) return null;

                        return (
                            <div key={date} className="mb-8">
                                <h3 className="text-sm text-[#7a7974] mb-3 border-b border-[#3a3a38]/50 inline-block pb-1">
                                    {date}
                                </h3>
                                <div className="space-y-3">
                                    {dayActivities.map((activity, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start justify-between p-4 bg-[#262624] rounded-lg border border-[#3a3a38]/50 hover:border-[#3a3a38] transition-colors"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-[#faf9f5]">
                                                    {activity.agent} — <span className="text-[#7a7974] font-normal">{activity.project}</span>
                                                </div>
                                                <p className="text-sm text-[#7a7974] mt-1 pl-6 border-l-2 border-[#3a3a38] ml-1">
                                                    {activity.task}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2.5 py-1 rounded font-medium ${activity.status === 'done'
                                                    ? 'bg-[#8aaf6e]/10 text-[#8aaf6e] border border-[#8aaf6e]/20'
                                                    : 'bg-[#bb8b5d]/10 text-[#bb8b5d] border border-[#bb8b5d]/20'
                                                }`}>
                                                {activity.status === 'done' ? '✅ Done' : '⏳ Wait'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
