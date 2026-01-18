export interface SkillHealth {
    id: string;
    name: string;
    lastUpdated: string; // ISO date
    daysSinceUpdate: number;
    connections: number;
    status: 'healthy' | 'stale' | 'critical';
    category: string;
}

export const skillHealthData: SkillHealth[] = [
    {
        id: '1',
        name: 'workflow-knowledge',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 8,
        status: 'healthy',
        category: 'Core'
    },
    {
        id: '2',
        name: 'multi-agent-workflow',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 7,
        status: 'healthy',
        category: 'Core'
    },
    {
        id: '3',
        name: 'project-planning',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 5,
        status: 'healthy',
        category: 'Planning'
    },
    {
        id: '4',
        name: 'platform-discovery',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 4,
        status: 'healthy',
        category: 'Planning'
    },
    {
        id: '5',
        name: 'reference-based-replication',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 3,
        status: 'healthy',
        category: 'Building'
    },
    {
        id: '6',
        name: 'knowledge-extraction',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 4,
        status: 'healthy',
        category: 'Learning'
    },
    {
        id: '7',
        name: 'session-handoff',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 3,
        status: 'healthy',
        category: 'Communication'
    },
    {
        id: '8',
        name: 'design-system',
        lastUpdated: '2025-12-16',
        daysSinceUpdate: 32,
        connections: 2,
        status: 'critical',
        category: 'Building'
    },
    {
        id: '9',
        name: 'skill-management',
        lastUpdated: '2026-01-16',
        daysSinceUpdate: 1,
        connections: 2,
        status: 'healthy',
        category: 'Meta'
    },
    {
        id: '10',
        name: 'infrastructure-hub',
        lastUpdated: '2026-01-17',
        daysSinceUpdate: 0,
        connections: 4,
        status: 'healthy',
        category: 'Meta'
    }
];
