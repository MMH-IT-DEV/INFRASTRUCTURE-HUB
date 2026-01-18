export interface Activity {
    id: string;
    agent: 'lead' | 'code' | 'mini' | 'database';
    agentEmoji: string;
    project: string;
    ask: string;
    done: string;
    next: string;
    status: 'ready' | 'waiting' | 'question' | 'blocked';
    statusEmoji: string;
    timestamp: string;
    duration: string;
}

export const activityData: Activity[] = [
    {
        id: '1',
        agent: 'lead',
        agentEmoji: '🤖',
        project: 'GMP Customer Data',
        ask: 'Update script with research findings',
        done: 'Created v2.0 script - enhanced 7 of 9 cards',
        next: 'User to test in Google Apps Script',
        status: 'ready',
        statusEmoji: '✅',
        timestamp: '2026-01-17T14:30:00',
        duration: '126s'
    },
    {
        id: '2',
        agent: 'lead',
        agentEmoji: '🤖',
        project: 'GMP Customer Data',
        ask: 'Should we connect gaps to existing cards?',
        done: 'Mapped all 5 gaps to existing cards',
        next: 'Awaiting approval to update script',
        status: 'waiting',
        statusEmoji: '⏳',
        timestamp: '2026-01-17T14:25:00',
        duration: '28s'
    },
    {
        id: '3',
        agent: 'lead',
        agentEmoji: '🤖',
        project: 'GMP Customer Data',
        ask: 'Verify compliance tracker completeness',
        done: 'Research found 2 missing cards',
        next: 'User to decide: keep 9 cards or expand to 11',
        status: 'question',
        statusEmoji: '❓',
        timestamp: '2026-01-17T14:20:00',
        duration: '24s'
    },
    {
        id: '4',
        agent: 'lead',
        agentEmoji: '🤖',
        project: 'Infrastructure Hub',
        ask: 'Create 3 new views instruction',
        done: 'Created Code Agent instruction for Skill Health, Queue, Activity Log',
        next: 'Send to Code Agent',
        status: 'ready',
        statusEmoji: '✅',
        timestamp: '2026-01-17T13:00:00',
        duration: '180s'
    },
    {
        id: '5',
        agent: 'code',
        agentEmoji: '💻',
        project: 'Infrastructure Hub',
        ask: 'Build Agent Connection view',
        done: 'Created connection map with agents and skills',
        next: 'None',
        status: 'ready',
        statusEmoji: '✅',
        timestamp: '2026-01-17T12:00:00',
        duration: '300s'
    },
    {
        id: '6',
        agent: 'mini',
        agentEmoji: '🔍',
        project: 'WASP Integration',
        ask: 'Test write endpoints',
        done: 'Verified transactions/item/remove works with array format',
        next: 'Test add and adjust endpoints',
        status: 'waiting',
        statusEmoji: '⏳',
        timestamp: '2026-01-16T16:00:00',
        duration: '45s'
    }
];

export function getActivityByProject(data: Activity[]) {
    const grouped: Record<string, Activity[]> = {};
    data.forEach(item => {
        if (!grouped[item.project]) grouped[item.project] = [];
        grouped[item.project].push(item);
    });
    return grouped;
}

export function getActivityByAgent(data: Activity[]) {
    const grouped: Record<string, Activity[]> = {};
    data.forEach(item => {
        if (!grouped[item.agent]) grouped[item.agent] = [];
        grouped[item.agent].push(item);
    });
    return grouped;
}

export function getActivityByStatus(data: Activity[], status: string) {
    return data.filter(item => item.status === status);
}
