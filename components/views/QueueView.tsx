'use client';

import { useState } from 'react';
import { StatPanel } from '../StatPanel';
import { queueData, QueueItem } from '@/lib/queue-data';
import { Plus, CheckCircle2, Trash2, Clock, Inbox, Zap, AlertCircle } from 'lucide-react';

export default function QueueView() {
    const [activeTab, setActiveTab] = useState('Active');
    const [selectedProject, setSelectedProject] = useState('All Projects');

    // Group projects for dropdown
    const projects = ['All Projects', ...Array.from(new Set(queueData.map(d => d.project).filter(Boolean))) as string[]];

    // Filter data based on tabs
    const filteredData = queueData.filter(item => {
        const matchesProject = selectedProject === 'All Projects' || item.project === selectedProject;
        if (!matchesProject) return false;

        if (activeTab === 'Active') return item.status !== 'done';
        if (activeTab === 'Completed') return item.status === 'done';
        return true;
    });

    const stats = {
        total: queueData.length,
        todo: queueData.filter(d => d.status === 'todo').length,
        inProgress: queueData.filter(d => d.status === 'in-progress').length,
        done: queueData.filter(d => d.status === 'done').length,
        highPriority: queueData.filter(d => d.priority === 'high' && d.status !== 'done').length
    };

    const listItems = filteredData.slice(0, 10).map((item, i) => ({
        rank: i + 1,
        name: item.title,
        value: item.priority.toUpperCase()
    }));

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Panel - Control Center */}
            <div className="w-[45%] p-16 overflow-y-auto border-r border-white/5 bg-[#141413]">
                <StatPanel
                    title={selectedProject}
                    titleOptions={projects}
                    onTitleChange={setSelectedProject}
                    stat1={{ value: stats.todo.toString(), label: 'ITEMS IN TODO' }}
                    progressValue={(stats.done / stats.total) * 100}
                    stat2={{ value: stats.highPriority.toString(), label: 'CRITICAL ITEMS' }}
                    stat2Progress={{ current: stats.inProgress, expected: 5 }}
                    tabs={['Active', 'Completed', 'All']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    listTitle="Pending Implementations"
                    listItems={listItems}
                />
            </div>

            {/* Right Panel - Interactive List */}
            <div className="flex-1 p-16 overflow-y-auto bg-[#1a1a18]">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[13px] text-[#5a5a58] font-light uppercase tracking-[0.2em]">Queue Workspace</h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-[12px] text-[#faf9f5] transition-all border border-white/10">
                            <Plus className="w-3.5 h-3.5" />
                            New Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-[#252523] border border-white/[0.04] p-6 rounded hover:border-white/[0.08] transition-all cursor-pointer relative"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            {item.status === 'done' ? (
                                                <CheckCircle2 className="w-5 h-5 text-[#8aaf6e]" />
                                            ) : item.status === 'in-progress' ? (
                                                <Zap className="w-5 h-5 text-[#d97757]" />
                                            ) : (
                                                <Clock className="w-5 h-5 text-[#7a7974]" />
                                            )}
                                            <h3 className="text-[16px] text-[#faf9f5] font-light tracking-wide">{item.title}</h3>
                                        </div>
                                        <p className="text-[13px] text-[#8a8a85] leading-relaxed max-w-xl">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${item.priority === 'high' ? 'border-[#ff7b6f]/30 text-[#ff7b6f] bg-[#ff7b6f]/5' :
                                                    item.priority === 'medium' ? 'border-[#bb8b5d]/30 text-[#bb8b5d] bg-[#bb8b5d]/5' :
                                                        'border-white/10 text-[#7a7974]'
                                                } uppercase tracking-widest font-bold`}>
                                                {item.priority}
                                            </span>
                                            <span className="text-[11px] text-[#5a5a58] font-mono uppercase tracking-widest">
                                                {item.category}
                                            </span>
                                            <span className="text-[11px] text-[#5a5a58] font-mono">
                                                {item.createdAt}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white/5 rounded text-[#7a7974] hover:text-[#faf9f5]">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white/5 rounded text-[#7a7974] hover:text-[#ff7b6f]">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredData.length === 0 && (
                        <div className="py-20 text-center space-y-4 border-2 border-dashed border-white/[0.02] rounded-xl">
                            <Inbox className="w-12 h-12 text-[#252523] mx-auto" />
                            <p className="text-[#5a5a58] text-[13px] font-light">No items found in this view</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
