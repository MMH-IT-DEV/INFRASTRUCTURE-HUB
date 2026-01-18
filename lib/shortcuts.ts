export type ShortcutAction = 'reset-layout' | 'open-shortcuts' | 'view-network' | 'view-tree' | 'view-grouped' | 'view-dashboard' | 'view-agents' | 'close-panel' | 'download-skill';

export interface Shortcut {
    id: string;
    key: string;
    action: ShortcutAction;
    description: string;
}

export const defaultShortcuts: Shortcut[] = [
    { id: '1', key: 'r', action: 'reset-layout', description: 'Reset layout' },
    { id: '2', key: '?', action: 'open-shortcuts', description: 'Open shortcuts modal' },
    { id: '3', key: '1', action: 'view-network', description: 'Network view' },
    { id: '4', key: '2', action: 'view-tree', description: 'Tree view' },
    { id: '5', key: '3', action: 'view-grouped', description: 'Grouped view' },
    { id: '8', key: '4', action: 'view-dashboard', description: 'Dashboard view' },
    { id: '9', key: '5', action: 'view-agents', description: 'Agent connection view' },
    { id: '6', key: 'Escape', action: 'close-panel', description: 'Close panel / Deselect' },
    { id: '7', key: 'd', action: 'download-skill', description: 'Download selected skill' },
];
