'use client';

import { useState, useEffect } from 'react';
import { SkillNode, nodeColors, statusConfig, NodeStatus } from '@/lib/skills-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    X,
    Plus,
    Save,
    Download,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    FileText,
    Code2
} from 'lucide-react';
import { downloadSkill } from '@/lib/download-skill';
import { STORAGE_KEYS, loadData, saveData } from '@/lib/storage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DetailPanelProps {
    skill: SkillNode;
    onClose: () => void;
    onUpdate: (updatedSkill: SkillNode) => void;
}

export default function DetailPanel({ skill, onClose, onUpdate }: DetailPanelProps) {
    const [editedSkill, setEditedSkill] = useState<SkillNode>(skill);
    const [hasChanges, setHasChanges] = useState(false);
    const [isContentOpen, setIsContentOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setEditedSkill(skill);
        setHasChanges(false);
        setIsEditMode(false);
    }, [skill]);

    const handleChange = (field: keyof SkillNode, value: any) => {
        const updated = { ...editedSkill, [field]: value };
        setEditedSkill(updated);
        setHasChanges(JSON.stringify(updated) !== JSON.stringify(skill));
    };

    const handleSave = () => {
        const edits = loadData<Record<string, Partial<SkillNode>>>(STORAGE_KEYS.EDITS, {});
        edits[skill.id] = { ...editedSkill };
        saveData(STORAGE_KEYS.EDITS, edits);
        onUpdate(editedSkill);
        setHasChanges(false);
        setIsEditMode(false);
    };

    const handleReset = () => {
        setEditedSkill(skill);
        setHasChanges(false);
        setIsEditMode(false);
    };

    const addTrigger = () => {
        handleChange('triggers', [...editedSkill.triggers, 'New trigger']);
    };

    const removeTrigger = (index: number) => {
        handleChange('triggers', editedSkill.triggers.filter((_, i) => i !== index));
    };

    const updateTrigger = (index: number, value: string) => {
        const newTriggers = [...editedSkill.triggers];
        newTriggers[index] = value;
        handleChange('triggers', newTriggers);
    };

    return (
        <div className="w-[450px] flex flex-col bg-[#1a1a18] border-l border-white/5 text-[#faf9f5] shadow-2xl z-50">
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-white/5 bg-[#262624]/30">
                <div className="flex items-center gap-3">
                    <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: nodeColors[editedSkill.type] }}
                    />
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7974]">{editedSkill.type}</h2>
                    {hasChanges && <div className="w-1.5 h-1.5 rounded-full bg-[#d97757]" />}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider ${isEditMode ? 'text-[#d97757] bg-[#d97757]/10' : 'text-[#7a7974] hover:text-[#faf9f5]'}`}
                    >
                        {isEditMode ? 'PREVIEW' : 'EDIT'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-[#7a7974] hover:text-[#faf9f5]">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-8 space-y-10">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {isEditMode ? (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Name</Label>
                                    <Input
                                        value={editedSkill.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="bg-transparent border-white/10 focus-visible:ring-[#d97757] h-10 text-base font-semibold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Description</Label>
                                    <Textarea
                                        value={editedSkill.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="bg-transparent border-white/10 focus-visible:ring-[#d97757] min-h-[100px] text-sm leading-relaxed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Status</Label>
                                    <Select
                                        value={editedSkill.status}
                                        onValueChange={(v) => handleChange('status', v as NodeStatus)}
                                    >
                                        <SelectTrigger className="bg-transparent border-white/10 h-10 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#262624] border-white/10 text-[#faf9f5]">
                                            {Object.entries(statusConfig).map(([id, config]) => (
                                                <SelectItem key={id} value={id}>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                                                        {config.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h1 className="text-2xl font-bold tracking-tight text-[#faf9f5]">{editedSkill.name}</h1>
                                <p className="text-[15px] text-[#a8a8a4] leading-relaxed">{editedSkill.description}</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig[editedSkill.status].color }} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a7974]">
                                            {statusConfig[editedSkill.status].label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-[#5a5a58] uppercase tracking-widest">v1.2.4</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator className="bg-white/5" />

                    {/* Triggers */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Use Cases / Triggers</Label>
                            {isEditMode && (
                                <Button variant="ghost" size="sm" onClick={addTrigger} className="h-6 text-[10px] text-[#d97757]">
                                    <Plus className="w-3 h-3 mr-1" /> ADD
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2">
                            {editedSkill.triggers.map((trigger, i) => (
                                <div key={i} className="flex gap-2 group items-center">
                                    {isEditMode ? (
                                        <>
                                            <Input
                                                value={trigger}
                                                onChange={(e) => updateTrigger(i, e.target.value)}
                                                className="bg-transparent border-white/10 h-8 text-xs flex-1"
                                            />
                                            <Button variant="ghost" size="sm" onClick={() => removeTrigger(i)} className="h-8 w-8 p-0 text-[#7a7974] hover:text-red-400">
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                            <div className="w-1 h-1 rounded-full bg-[#d97757]" />
                                            <span className="text-sm text-[#7a7974]">{trigger}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-white/5" />

                    {/* Markdown Content */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-[10px] uppercase tracking-widest text-[#5a5a58] font-bold">Skill Documentation</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsContentOpen(!isContentOpen)}
                                className="h-6 text-[10px] text-[#7a7974]"
                            >
                                {isContentOpen ? 'COLLAPSE' : 'EXPAND'}
                            </Button>
                        </div>

                        {isEditMode ? (
                            <Textarea
                                value={editedSkill.content}
                                onChange={(e) => handleChange('content', e.target.value)}
                                className="bg-transparent border-white/10 min-h-[400px] text-xs font-mono leading-relaxed"
                                placeholder="# Skill Documentation..."
                            />
                        ) : (
                            <div className={`prose prose-invert prose-xs max-w-none ${!isContentOpen ? 'max-h-[300px] overflow-hidden' : ''}`}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-lg font-bold mt-6 mb-4 text-[#faf9f5] border-b border-white/5 pb-2 uppercase tracking-wider" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-sm font-bold mt-8 mb-4 text-[#d97757] uppercase tracking-widest" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-[14px] text-[#a8a8a4] leading-relaxed mb-4" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-none space-y-2 mb-6 p-0" {...props} />,
                                        li: ({ node, ...props }) => (
                                            <li className="flex items-start gap-3 text-[14px] text-[#7a7974]" {...props}>
                                                <div className="w-1 h-1 rounded-full bg-[#d97757] mt-2 shrink-0" />
                                                <span>{props.children}</span>
                                            </li>
                                        ),
                                        code: ({ node, inline, ...props }: any) => (
                                            inline
                                                ? <code className="bg-white/10 px-1 py-0.5 rounded text-[12px] font-mono text-[#faf9f5]" {...props} />
                                                : <pre className="bg-[#1a1a18] border border-white/5 p-4 rounded-lg overflow-x-auto my-4"><code className="text-[12px] font-mono text-[#a8a8a4]" {...props} /></pre>
                                        ),
                                        table: ({ node, ...props }) => <table className="w-full border-collapse my-6" {...props} />,
                                        th: ({ node, ...props }) => <th className="text-left text-[11px] uppercase tracking-wider text-[#5a5a58] p-2 border-b border-white/10" {...props} />,
                                        td: ({ node, ...props }) => <td className="text-xs text-[#7a7974] p-2 border-b border-white/5" {...props} />,
                                    }}
                                >
                                    {editedSkill.content}
                                </ReactMarkdown>
                                {!isContentOpen && editedSkill.content.length > 300 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a18] to-transparent pointer-events-none" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>

            {/* Persistent Footer Actions */}
            <div className="p-6 border-t border-white/5 bg-[#262624]/30 space-y-4">
                <div className="flex gap-3">
                    <Button
                        className={`flex-1 h-10 text-xs font-bold uppercase tracking-widest shadow-lg transition-all ${hasChanges
                                ? 'bg-[#d97757] text-white hover:bg-[#c96747] scale-[1.02]'
                                : 'bg-white/5 text-[#5a5a58] border border-white/5'
                            }`}
                        onClick={handleSave}
                        disabled={!hasChanges}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        COMMIT CHANGES
                    </Button>
                    <Button
                        variant="outline"
                        className="w-12 h-10 border-white/5 bg-white/5 text-[#faf9f5] hover:bg-white/10"
                        onClick={() => downloadSkill(editedSkill)}
                        title="Download .md package"
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        className="px-0 h-6 text-[10px] font-bold text-[#5a5a58] hover:text-[#faf9f5] uppercase tracking-wider"
                        onClick={handleReset}
                    >
                        <RotateCcw className="w-3 h-3 mr-2" />
                        Discard Changes
                    </Button>
                    <span className="text-[9px] text-[#3a3a38] uppercase font-mono">
                        ID: {editedSkill.id} • {editedSkill.lastUpdated}
                    </span>
                </div>
            </div>
        </div>
    );
}
