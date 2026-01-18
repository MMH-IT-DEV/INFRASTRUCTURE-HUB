'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, ListTree, LayoutGrid } from 'lucide-react';

export type ViewType = 'dashboard' | 'tree' | 'grouped';

interface ViewToggleProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex bg-[#1a1a18] p-1 rounded-lg border border-[#3a3a38]">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('dashboard')}
                className={`h-7 px-3 text-[10px] uppercase font-bold tracking-wider transition-all ${currentView === 'dashboard'
                    ? 'bg-[#d97757] text-white hover:bg-[#d97757] hover:text-white shadow-sm'
                    : 'text-[#7a7974] hover:text-[#faf9f5]'
                    }`}
            >
                <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
                Overview
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('tree')}
                className={`h-7 px-3 text-[10px] uppercase font-bold tracking-wider transition-all ${currentView === 'tree'
                    ? 'bg-[#d97757] text-white hover:bg-[#d97757] hover:text-white shadow-sm'
                    : 'text-[#7a7974] hover:text-[#faf9f5]'
                    }`}
            >
                <ListTree className="w-3.5 h-3.5 mr-1.5" />
                Queue
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('grouped')}
                className={`h-7 px-3 text-[10px] uppercase font-bold tracking-wider transition-all ${currentView === 'grouped'
                    ? 'bg-[#d97757] text-white hover:bg-[#d97757] hover:text-white shadow-sm'
                    : 'text-[#7a7974] hover:text-[#faf9f5]'
                    }`}
            >
                <LayoutGrid className="w-3.5 h-3.5 mr-1.5" />
                Activity
            </Button>
        </div>
    );
}
