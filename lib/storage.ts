import { SkillNode } from './skills-data';
import { Shortcut } from './shortcuts';

export const STORAGE_KEYS = {
    POSITIONS: 'infra-hub-positions',
    SHORTCUTS: 'infra-hub-shortcuts',
    EDITS: 'infra-hub-edits',
    VIEW: 'infra-hub-view',
};

export const loadData = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem(key);
    try {
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error('Error loading data from storage', e);
        return defaultValue;
    }
};

export const saveData = <T>(key: string, data: T) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
};

export const getMergedSkills = (baseSkills: SkillNode[]): SkillNode[] => {
    const edits = loadData<Record<string, Partial<SkillNode>>>(STORAGE_KEYS.EDITS, {});
    return baseSkills.map(skill => ({
        ...skill,
        ...(edits[skill.id] || {}),
    }));
};
