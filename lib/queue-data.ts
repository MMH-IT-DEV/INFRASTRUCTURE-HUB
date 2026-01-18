export interface QueueItem {
    id: string;
    title: string;
    description: string;
    category: 'feature' | 'improvement' | 'fix' | 'infrastructure';
    priority: 'high' | 'medium' | 'low';
    status: 'todo' | 'in-progress' | 'done';
    project?: string;
    createdAt: string;
    completedAt?: string;
}

export const queueData: QueueItem[] = [
    {
        id: '1',
        title: 'Set up Code Agent notifications',
        description: 'Create notification system for Cursor/Windsurf',
        category: 'feature',
        priority: 'high',
        status: 'todo',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-17'
    },
    {
        id: '2',
        title: 'Set up Mini Agent notifications',
        description: 'Create notification system for Chrome extension',
        category: 'feature',
        priority: 'high',
        status: 'todo',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-17'
    },
    {
        id: '3',
        title: 'Add MCP server for skill updates',
        description: 'Allow agents to update skills directly',
        category: 'infrastructure',
        priority: 'medium',
        status: 'todo',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-17'
    },
    {
        id: '4',
        title: 'Skill Health view',
        description: 'Show last updated dates for skills',
        category: 'feature',
        priority: 'high',
        status: 'in-progress',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-17'
    },
    {
        id: '5',
        title: 'Activity Log view',
        description: 'Organize Slack notifications in hub',
        category: 'feature',
        priority: 'high',
        status: 'in-progress',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-17'
    },
    {
        id: '6',
        title: 'Cancel ShipStation trial',
        description: 'Before Jan 15 to avoid $30/month',
        category: 'fix',
        priority: 'high',
        status: 'todo',
        project: 'Operations',
        createdAt: '2026-01-10'
    },
    {
        id: '7',
        title: 'WASP write endpoint testing',
        description: 'Test array payload format for transactions',
        category: 'improvement',
        priority: 'medium',
        status: 'todo',
        project: 'WASP Integration',
        createdAt: '2026-01-15'
    },
    {
        id: '8',
        title: 'Consolidate workflow skills',
        description: 'Merged 15 skills to 12',
        category: 'improvement',
        priority: 'medium',
        status: 'done',
        project: 'Infrastructure Hub',
        createdAt: '2026-01-16',
        completedAt: '2026-01-16'
    }
];
