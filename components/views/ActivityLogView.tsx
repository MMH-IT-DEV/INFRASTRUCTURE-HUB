'use client';

import { useState } from 'react';
import { StatPanel } from '../StatPanel';
import { activityData, Activity } from '@/lib/activity-data';
import { Search, Filter, Terminal, ExternalLink, Calendar } from 'lucide-react';

export default function ActivityLogView() {
    const [selectedProject, setSelectedProject] = useState('All Projects');
    const [filterStatus, setFilterStatus] = useState('All');

    const projects = ['All Projects', ...Array.from(new Set(activityData.map(d => d.project).filter(Boolean))) as string[]];

    const filteredData = activityData.filter(item => {
        const matchesProject = selectedProject === 'All Projects' || item.project === selectedProject;
        const matchesStatus = filterStatus === 'All' || item.status === filterStatus.toLowerCase();
        return matchesProject && matchesStatus;
    });

    const stats = {
        total: activityData.length,
        ready: activityData.filter(d => d.status === 'ready').length,
        waiting: activityData.filter(d => d.status === 'waiting').length,
        questions: activityData.filter(d => d.status === 'question').length,
    };

    const listItems = filteredData.slice(0, 10).map((item, i) => ({
        rank: i + 1,
        name: item.ask,
        value: item.statusEmoji
    }));

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Panel - Control Center */}
            <div className="w-[45%] p-16 overflow-y-auto border-r border-white/5 bg-[#141413]">
                <StatPanel
                    title={selectedProject}
                    titleOptions={projects}
                    onTitleChange={setSelectedProject}
                    stat1={{ value: stats.total.toString(), label: 'TOTAL LOG ENTRIES' }}
                    progressValue={(stats.ready / stats.total) * 100}
                    stat2={{ value: stats.questions.toString(), label: 'OPEN QUESTIONS' }}
                    stat2Progress={{ current: stats.waiting, expected: 5 }}
                    tabs={['All', 'Ready', 'Waiting', 'Question']}
                    activeTab={filterStatus}
                    onTabChange={setFilterStatus}
                    listTitle="Recent Interactions"
                    listItems={listItems}
                />
            </div>

            {/* Right Panel - Interactive Log */}
            <div className="flex-1 p-16 overflow-y-auto bg-[#1a1a18]">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Terminal className="w-4 h-4 text-[#8a8a85]" />
                            <h2 className="text-[13px] text-[#faf9f5] font-light uppercase tracking-[0.2em]">Live Stream</h2>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-[#5a5a58] font-mono">
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#8aaf6e]" /> System Active</span>
                            <span className="flex items-center gap-1 underline underline-offset-4 decoration-white/10 cursor-pointer">Re-sync logs</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredData.map((activity) => (
                            <div
                                key={activity.id}
                                className="group relative pl-12 pb-12 last:pb-0 border-l border-white/[0.04]"
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-[#1a1a18] flex items-center justify-center ${activity.status === 'ready' ? 'bg-[#8aaf6e]' :
                                        activity.status === 'waiting' ? 'bg-[#bb8b5d]' :
                                            'bg-[#ff7b6f]'
                                    } transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10`} />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{activity.agentEmoji}</span>
                                            <div>
                                                <h3 className="text-[14px] text-[#faf9f5] font-medium tracking-tight">
                                                    {activity.agent.toUpperCase()} AGENT — <span className="text-[#8a8a85] font-light">{activity.project}</span>
                                                </h3>
                                                <p className="text-[11px] text-[#5a5a58] font-mono">
                                                    {new Date(activity.timestamp).toLocaleString()} • {activity.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded text-[#7a7974] hover:text-[#faf9f5]">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="bg-[#252523] border border-white/[0.04] p-5 rounded space-y-4 group-hover:border-white/[0.08] transition-all">
                                        <div className="space-y-1">
                                            <div className="text-[11px] text-[#5a5a58] uppercase tracking-[0.1em] font-bold">Instruction</div>
                                            <p className="text-[14px] text-[#faf9f5] font-light leading-relaxed">{activity.ask}</p>
                                        </div>

                                        <div className="space-y-1 bg-black/20 p-3 rounded border border-white/[0.02]">
                                            <div className="text-[11px] text-[#5a5a58] uppercase tracking-[0.1em] font-bold">Execution Output</div>
                                            <p className="text-[13px] text-[#8a8a85] font-light leading-relaxed">{activity.done}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'ready' ? 'bg-[#8aaf6e]' :
                                                        activity.status === 'waiting' ? 'bg-[#bb8b5d]' :
                                                            'bg-[#ff7b6f]'
                                                    }`} />
                                                <span className="text-[12px] text-[#faf9f5] font-light capitalize">{activity.status}</span>
                                            </div>
                                            <div className="text-[12px] text-[#8a8a85] font-light italic">
                                                Next: {activity.next}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
