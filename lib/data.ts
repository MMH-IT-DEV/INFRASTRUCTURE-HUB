export type NodeType = 'agent' | 'skill' | 'reference' | 'platform';
export type NodeStatus = 'active' | 'new' | 'complete' | 'needs-discovery' | 'documented';

export interface Node {
    id: string;
    type: NodeType;
    label: string;
    description: string;
    status: NodeStatus;
    connections: string[];
}

export const nodes: Node[] = [
    // Agents
    {
        id: 'lead-agent',
        type: 'agent',
        label: 'Lead Agent',
        description: 'Claude.ai - Plans, instructs, decides',
        status: 'active',
        connections: ['code-agent', 'mini-agent', 'db-agent', 'multi-agent-workflow', 'project-planning', 'knowledge-extraction']
    },
    {
        id: 'code-agent',
        type: 'agent',
        label: 'Code Agent',
        description: 'Cursor/Windsurf - Edits code, runs commands',
        status: 'active',
        connections: ['lead-agent', 'multi-agent-workflow', 'reference-based-replication']
    },
    {
        id: 'mini-agent',
        type: 'agent',
        label: 'Mini Agent',
        description: 'Chrome Extension - Browses, screenshots, verifies',
        status: 'active',
        connections: ['lead-agent', 'multi-agent-workflow', 'platform-discovery']
    },
    {
        id: 'db-agent',
        type: 'agent',
        label: 'Database Agent',
        description: 'SQL - Queries, migrates, verifies schema',
        status: 'active',
        connections: ['lead-agent']
    },

    // Skills
    {
        id: 'workflow-knowledge',
        type: 'skill',
        label: 'workflow-knowledge',
        description: 'Universal patterns for all projects',
        status: 'active',
        connections: ['lead-agent', 'project-planning', 'knowledge-extraction']
    },
    {
        id: 'multi-agent-workflow',
        type: 'skill',
        label: 'multi-agent-workflow',
        description: 'Agent coordination rules and instruction formats',
        status: 'active',
        connections: ['lead-agent', 'code-agent', 'mini-agent']
    },
    {
        id: 'project-planning',
        type: 'skill',
        label: 'project-planning',
        description: 'Start projects with right questions',
        status: 'active',
        connections: ['lead-agent', 'workflow-knowledge', 'platform-discovery']
    },
    {
        id: 'platform-discovery',
        type: 'skill',
        label: 'platform-discovery',
        description: 'Explore external platforms before dev',
        status: 'active',
        connections: ['mini-agent', 'project-planning']
    },
    {
        id: 'reference-based-replication',
        type: 'skill',
        label: 'reference-based-replication',
        description: 'Build UI from gold standard reference',
        status: 'active',
        connections: ['code-agent', 'design-system']
    },
    {
        id: 'knowledge-extraction',
        type: 'skill',
        label: 'knowledge-extraction',
        description: 'Extract lessons, process intelligence',
        status: 'active',
        connections: ['lead-agent', 'workflow-knowledge']
    },
    {
        id: 'session-handoff',
        type: 'skill',
        label: 'session-handoff',
        description: 'Maintain context between sessions',
        status: 'active',
        connections: ['lead-agent']
    },
    {
        id: 'design-system',
        type: 'skill',
        label: 'design-system',
        description: 'UI colors, typography, components',
        status: 'new',
        connections: ['reference-based-replication']
    },
    {
        id: 'skill-management',
        type: 'skill',
        label: 'skill-management',
        description: 'How to create and update skills',
        status: 'new',
        connections: ['infrastructure-hub']
    },
    {
        id: 'infrastructure-hub',
        type: 'skill',
        label: 'infrastructure-hub',
        description: 'System overview - this app!',
        status: 'new',
        connections: ['skill-management']
    },

    // Project References
    {
        id: 'project-fedex',
        type: 'reference',
        label: 'FedEx Dispute Bot',
        description: 'Windows scheduled bot - Dec 2025',
        status: 'complete',
        connections: ['workflow-knowledge']
    },
    {
        id: 'project-tiktok',
        type: 'reference',
        label: 'TikTok UGC Bot',
        description: 'Video downloader - Jan 2026',
        status: 'complete',
        connections: ['workflow-knowledge']
    },

    // Platforms
    {
        id: 'wasp-api',
        type: 'platform',
        label: 'WASP InventoryCloud',
        description: 'Inventory management API',
        status: 'needs-discovery',
        connections: ['platform-discovery']
    },
    {
        id: 'katana-api',
        type: 'platform',
        label: 'Katana MRP',
        description: 'Manufacturing planning API',
        status: 'documented',
        connections: ['platform-discovery']
    }
];

export const nodeColors: Record<NodeType, string> = {
    agent: '#d97757',
    skill: '#4a9eff',
    reference: '#888888',
    platform: '#ff6b6b'
};

export const statusIndicators: Record<NodeStatus, { color: string; show: boolean }> = {
    active: { color: '', show: false },
    new: { color: '#4a9eff', show: true },
    complete: { color: '#8aaf6e', show: false },
    'needs-discovery': { color: '#ff6b6b', show: true },
    documented: { color: '#8aaf6e', show: false }
};
