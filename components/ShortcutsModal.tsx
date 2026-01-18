'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shortcut, defaultShortcuts } from '@/lib/shortcuts';
import { STORAGE_KEYS, loadData, saveData } from '@/lib/storage';

export default function ShortcutsModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        setShortcuts(loadData(STORAGE_KEYS.SHORTCUTS, defaultShortcuts));
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!editingId) return;
        e.preventDefault();
        e.stopPropagation();

        const newKey = e.key === ' ' ? 'Space' : e.key;
        const newShortcuts = shortcuts.map(s =>
            s.id === editingId ? { ...s, key: newKey } : s
        );

        setShortcuts(newShortcuts);
        saveData(STORAGE_KEYS.SHORTCUTS, newShortcuts);
        setEditingId(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#262624] border-[#3a3a38] text-[#faf9f5]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Keyboard Shortcuts</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-1">
                    {shortcuts.map((s) => (
                        <div
                            key={s.id}
                            className={`flex items-center justify-between p-2 rounded-md transition-colors ${editingId === s.id ? 'bg-[#3a3a38]' : 'hover:bg-[#2a2a28]'
                                }`}
                            onClick={() => setEditingId(s.id)}
                            onKeyDown={handleKeyDown}
                            tabIndex={editingId === s.id ? 0 : -1}
                        >
                            <span className="text-sm text-[#a8a8a4]">{s.description}</span>
                            <div className="flex items-center gap-2">
                                {editingId === s.id ? (
                                    <span className="text-xs text-[#d97757] animate-pulse">Press any key...</span>
                                ) : (
                                    <Kbd>{s.key}</Kbd>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="ghost"
                        className="text-xs text-[#7a7974] hover:text-[#faf9f5]"
                        onClick={() => {
                            setShortcuts(defaultShortcuts);
                            saveData(STORAGE_KEYS.SHORTCUTS, defaultShortcuts);
                        }}
                    >
                        Reset to Defaults
                    </Button>
                    <Button onClick={onClose} className="bg-[#d97757] hover:bg-[#c96747] text-white">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Kbd({ children }: { children: React.ReactNode }) {
    return (
        <kbd className="px-2 py-1 text-[10px] font-semibold text-[#faf9f5] bg-[#3a3a38] border border-[#4a4a48] rounded shadow-[0_2px_0_0_#1a1a18]">
            {children}
        </kbd>
    );
}
