'use client';

import { X, Download, Copy, ExternalLink, Activity, Clock, Network } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { skillHealthData } from '@/lib/skill-health-data';

interface SkillModalProps {
    skillId: string;
    onClose: () => void;
}

export function SkillModal({ skillId, onClose }: SkillModalProps) {
    const [copied, setCopied] = useState(false);

    // Find skill data from our health data library
    const skill = skillHealthData.find(s => s.name === skillId || s.id === skillId) || {
        name: skillId,
        description: 'Universal patterns from all projects. The master knowledge base.',
        status: 'healthy',
        lastUpdated: 'Jan 16, 2026',
        connections: 8,
        category: 'Core'
    };

    // Mock content for the preview
    const content = `---
name: ${skill.name}
description: "${skill.description}"
status: ${skill.status}
lastUpdated: ${skill.lastUpdated}
---

# ${skill.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

This skill represents a core architectural pattern within the multi-agent economy. It is used to coordinate complex operations between Lead, Code, and Mini agents.

## Usage Patterns
1. Intent recognition
2. Contextual handoff
3. Verification loops

## Implementation Details
The implementation follows the Infrastructure Hub standard v2.1. All connections are verified through the session-handoff protocol.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${skill.name}.skill`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#141413]/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-[#1a1a18] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#1d1d1b]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#d97757] rounded-full" />
                        <h2 className="text-2xl font-light tracking-tight text-[#faf9f5]">{skill.name}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={handleDownload} className="text-[#8a8a85] hover:text-[#faf9f5]">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleCopy} className="text-[#8a8a85] hover:text-[#faf9f5]">
                            <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose} className="text-[#8a8a85] hover:text-[#faf9f5]">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Meta Info */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Status</span>
                            <div className="flex items-center gap-2 text-[14px] text-[#faf9f5]">
                                <span className={`w-2 h-2 rounded-full ${skill.status === 'healthy' ? 'bg-[#8aaf6e]' :
                                        skill.status === 'stale' ? 'bg-[#bb8b5d]' : 'bg-[#ff7b6f]'
                                    }`} />
                                <span className="capitalize">{skill.status}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Last Updated</span>
                            <div className="flex items-center gap-2 text-[14px] text-[#faf9f5]">
                                <Clock className="w-3.5 h-3.5 text-[#8a8a85]" />
                                {skill.lastUpdated}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Connections</span>
                            <div className="flex items-center gap-2 text-[14px] text-[#faf9f5]">
                                <Network className="w-3.5 h-3.5 text-[#8a8a85]" />
                                {skill.connections} active nodes
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Description</span>
                        <p className="text-[15px] text-[#8a8a85] leading-relaxed">
                            {skill.description}
                        </p>
                    </div>

                    {/* Content Preview */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Content Preview</span>
                        <div className="bg-[#141413] rounded p-4 border border-white/5 font-mono text-[12px] text-[#7a7974] overflow-y-auto max-h-48 leading-relaxed">
                            {content}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-8 py-4 bg-[#1d1d1b] border-t border-white/5">
                    <div className="flex items-center gap-2">
                        {copied && (
                            <span className="text-[11px] text-[#8aaf6e] font-medium animate-in fade-in slide-in-from-left-2">
                                Copied to clipboard!
                            </span>
                        )}
                    </div>
                    <Button
                        onClick={onClose}
                        className="bg-[#faf9f5] text-[#141413] hover:bg-[#faf9f5]/90 text-sm font-medium px-6"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
