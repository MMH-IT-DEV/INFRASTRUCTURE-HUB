'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { skillNodes as baseSkillNodes, SkillNode } from '@/lib/skills-data';
import { ViewType } from './ViewToggle';
import DashboardOverview from './DashboardOverview';
import QueueView from './views/QueueView';
import ActivityLogView from './views/ActivityLogView';
import MainShell from './MainShell';
import DetailPanel from './DetailPanel';
import ShortcutsModal from './ShortcutsModal';
import { defaultShortcuts } from '@/lib/shortcuts';
import { STORAGE_KEYS, loadData, saveData, getMergedSkills } from '@/lib/storage';

interface Position {
    x: number;
    y: number;
}

function getInitialPositions(nodes: SkillNode[]): Record<string, Position> {
    const positions: Record<string, Position> = {};
    const centerX = 450;
    const centerY = 300;

    const agents = nodes.filter(n => n.type === 'agent');
    const skills = nodes.filter(n => n.type === 'skill');

    agents.forEach((node, i) => {
        const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
        positions[node.id] = {
            x: centerX + Math.cos(angle) * 100,
            y: centerY + Math.sin(angle) * 100
        };
    });

    skills.forEach((node, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        positions[node.id] = {
            x: centerX + Math.cos(angle) * 250,
            y: centerY + Math.sin(angle) * 200
        };
    });

    return positions;
}

export default function NetworkView() {
    const [nodes, setNodes] = useState<SkillNode[]>(baseSkillNodes);
    const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
    const [viewMode, setViewMode] = useState<ViewType>('dashboard');
    const [positions, setPositions] = useState<Record<string, Position>>({});
    const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

    useEffect(() => {
        const mergedNodes = getMergedSkills(baseSkillNodes);
        setNodes(mergedNodes);
        const savedView = loadData<ViewType>(STORAGE_KEYS.VIEW, 'dashboard');
        // Ensure saved view is valid for the new 3-page architecture
        if (['dashboard', 'tree', 'grouped'].includes(savedView)) {
            setViewMode(savedView);
        } else {
            setViewMode('dashboard');
        }
        const savedPositions = loadData<Record<string, Position>>(STORAGE_KEYS.POSITIONS, getInitialPositions(mergedNodes));
        setPositions(savedPositions);
    }, []);

    useEffect(() => {
        if (Object.keys(positions).length > 0) saveData(STORAGE_KEYS.POSITIONS, positions);
    }, [positions]);

    useEffect(() => {
        saveData(STORAGE_KEYS.VIEW, viewMode);
    }, [viewMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.getAttribute('contenteditable') === 'true') return;
            const shortcuts = loadData(STORAGE_KEYS.SHORTCUTS, defaultShortcuts);
            const action = shortcuts.find(s => s.key.toLowerCase() === e.key.toLowerCase())?.action;
            if (action) {
                e.preventDefault();
                switch (action) {
                    case 'reset-layout': setPositions(getInitialPositions(nodes)); break;
                    case 'open-shortcuts': setIsShortcutsOpen(true); break;
                    case 'view-tree': setViewMode('tree'); break;
                    case 'view-grouped': setViewMode('grouped'); break;
                    case 'view-dashboard': setViewMode('dashboard'); break;
                    case 'close-panel': setSelectedNode(null); setIsShortcutsOpen(false); break;
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nodes, selectedNode]);

    const handleUpdateNode = (updatedNode: SkillNode) => {
        setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
        setSelectedNode(updatedNode);
    };

    const renderActiveView = () => {
        switch (viewMode) {
            case 'dashboard':
                return <DashboardOverview nodes={nodes} />;
            case 'tree':
                return <QueueView />;
            case 'grouped':
                return <ActivityLogView />;
            default:
                return null;
        }
    };

    return (
        <div className="h-screen bg-[#141413]">
            <MainShell
                nodes={nodes}
                activeTab={viewMode}
                onTabChange={setViewMode}
                onOpenShortcuts={() => setIsShortcutsOpen(true)}
            >
                {renderActiveView()}
            </MainShell>

            {selectedNode && (
                <DetailPanel
                    skill={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onUpdate={handleUpdateNode}
                />
            )}

            <ShortcutsModal
                isOpen={isShortcutsOpen}
                onClose={() => setIsShortcutsOpen(false)}
            />
        </div>
    );
}
