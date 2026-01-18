export type NodeType = 'agent' | 'skill' | 'reference' | 'platform';
export type NodeStatus = 'active' | 'needs-update' | 'stub' | 'missing' | 'complete' | 'needs-discovery' | 'documented';

export interface SkillNode {
    id: string;
    name: string;
    type: NodeType;
    description: string;
    content: string;
    status: NodeStatus;
    triggers: string[];
    connections: string[];
    lastUpdated: string;
}

export const skillNodes: SkillNode[] = [
    // ============ AGENTS ============
    {
        id: 'lead-agent',
        name: 'Lead Agent',
        type: 'agent',
        description: 'Claude.ai - Plans, instructs, coordinates, decides',
        content: `# Lead Agent (Claude.ai)

## Capabilities
- Create detailed instruction blocks
- Coordinate between agents
- Review reports and make decisions
- Plan project architecture

## Cannot Do
- Access browser or localhost
- Make direct code changes
- Run terminal commands

## Tools
- Claude.ai web interface
- Claude Projects for context`,
        status: 'active',
        triggers: ['Planning needed', 'Decision required', 'Instruction creation', 'Project coordination'],
        connections: ['code-agent', 'mini-agent', 'db-agent', 'multi-agent-workflow', 'project-planning', 'knowledge-extraction', 'session-handoff'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'code-agent',
        name: 'Code Agent',
        type: 'agent',
        description: 'Cursor/Windsurf - Edits code, runs commands',
        content: `# Code Agent (Cursor/Windsurf)

## Capabilities
- Edit code files
- Run terminal commands
- Start dev server (npm run dev)
- Read/write files
- Create documentation

## Cannot Do
- Open browser to view localhost
- Visual verification
- Take screenshots
- Run Git push (human does)

## Key Rule
Always include in instructions:
"DO NOT open localhost or launch browsers"`,
        status: 'active',
        triggers: ['Code changes needed', 'File edits', 'Terminal commands', 'Project setup'],
        connections: ['lead-agent', 'multi-agent-workflow', 'reference-based-replication'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'mini-agent',
        name: 'Mini Agent',
        type: 'agent',
        description: 'Chrome Extension - Browses, screenshots, verifies',
        content: `# Mini Agent (Claude for Chrome)

## Capabilities
- Open localhost in browser
- Navigate applications
- Take screenshots
- Verify UI changes
- Check console for errors
- Find specific data

## Cannot Do
- Edit code files
- Run terminal commands

## Command Style
Use direct language:
✅ "Go to [URL] now and..."
❌ "Here are instructions..."

## Critical Rule
Never let Mini Agent TYPE code - use clipboard paste only`,
        status: 'active',
        triggers: ['Visual verification', 'Screenshot needed', 'Browser testing', 'UI check'],
        connections: ['lead-agent', 'multi-agent-workflow', 'platform-discovery'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'db-agent',
        name: 'Database Agent',
        type: 'agent',
        description: 'SQL - Queries, migrates, verifies schema',
        content: `# Database Agent

## Capabilities
- Run SQL queries
- Verify schema
- Create migrations
- Check data integrity

## Cannot Do
- Access browser
- Make application code changes`,
        status: 'active',
        triggers: ['SQL query needed', 'Schema verification', 'Database migration'],
        connections: ['lead-agent'],
        lastUpdated: '2026-01-17'
    },

    // ============ SKILLS ============
    {
        id: 'workflow-knowledge',
        name: 'workflow-knowledge',
        type: 'skill',
        description: 'Universal patterns for all projects',
        content: `# Universal Workflow Knowledge

## Purpose
Universal knowledge base for all projects. Contains reusable patterns, agent rules, best practices, and lessons learned.

## Key Sections
- Agent Coordination Rules
- Build-First Pattern Discovery
- Security Patterns
- Windows Deployment Patterns
- Database Patterns
- UI Development Patterns
- Google Drive Patterns

## Auto-Activates
For any development work.

## Updated
After each project completion.`,
        status: 'active',
        triggers: ['Any development work', 'Need best practice', 'Looking for pattern'],
        connections: ['lead-agent', 'project-planning', 'knowledge-extraction'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'multi-agent-workflow',
        name: 'multi-agent-workflow',
        type: 'skill',
        description: 'Agent coordination rules and instruction formats',
        content: `# Multi-Agent Workflow

## Purpose
Agent coordination rules, instruction formats, and task routing.

## Key Sections
- Agent Capabilities Table
- Task Routing
- Instruction Template
- Mini Agent Instructions
- Notification Block Format
- Code Patterns

## Use For
Any multi-agent work.`,
        status: 'active',
        triggers: ['Writing agent instruction', 'Multi-agent coordination', 'Task routing decision'],
        connections: ['lead-agent', 'code-agent', 'mini-agent'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'project-planning',
        name: 'project-planning',
        type: 'skill',
        description: 'Start projects with right questions and sequence',
        content: `# Project Planning

## Purpose
Start new projects with right questions and optimal sequence.

## Planning Flow
INTAKE → PATTERN MATCH → QUESTIONS → VERIFY → PLAN

## Key Sections
- Project Intake Template
- Pattern Matching by Project Type
- Upfront Questions Checklist
- Mini Agent Verification
- Phase Template
- Gotcha Checklist

## Build-First Rule
Don't over-plan. Build minimal working version, then extract patterns.`,
        status: 'active',
        triggers: ['New project starting', 'Project kickoff', 'Planning phase'],
        connections: ['lead-agent', 'workflow-knowledge', 'platform-discovery'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'platform-discovery',
        name: 'platform-discovery',
        type: 'skill',
        description: 'Explore external platforms before development',
        content: `# Platform Discovery

## Purpose
Explore external platforms before development. Use when integrating with any existing system.

## Discovery Flow
DISCOVER → DOCUMENT → DECIDE → BUILD

## Key Sections
- Mini Agent Discovery Task Template
- Discovery Report Template
- Key Questions by Category
- Common Platform Discoveries

## Output
Real knowledge (not assumptions), documented capabilities, identified limitations.`,
        status: 'active',
        triggers: ['External platform integration', 'API work', 'New system integration'],
        connections: ['mini-agent', 'project-planning'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'reference-based-replication',
        name: 'reference-based-replication',
        type: 'skill',
        description: 'Build UI from gold standard reference',
        content: `# Reference-Based Replication

## Purpose
Build new pages from gold standard reference. Fix existing pages to match.

## Core Method
UNDERSTAND → DELETE → REPLICATE → VERIFY

## Key Sections
- Phase 1: Audit Template
- Phase 2-3: Delete & Replicate
- Phase 4: Verify
- Common Component Patterns
- Color Reference

## Use For
Building UI at scale with consistency.`,
        status: 'active',
        triggers: ['Building new UI page', 'Fixing UI to match reference', 'UI consistency work'],
        connections: ['code-agent', 'design-system'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'knowledge-extraction',
        name: 'knowledge-extraction',
        type: 'skill',
        description: 'Extract lessons, process intelligence, update patterns',
        content: `# Knowledge Extraction

## Purpose
Extract lessons from projects. Process intelligence reports. Update universal patterns.

## Three-Layer System
1. RAW EXTRACTION → [project]-extraction.md
2. PROJECT SKILL → [project-name].skill
3. UNIVERSAL SKILL → workflow-knowledge.skill

## Also Includes
Intelligence processing for evaluating collected AI intel.

## Use After
Project completion or when evaluating new information.`,
        status: 'active',
        triggers: ['Project complete', 'Processing intelligence', 'Updating patterns'],
        connections: ['lead-agent', 'workflow-knowledge'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'session-handoff',
        name: 'session-handoff',
        type: 'skill',
        description: 'Maintain context between Lead Agent sessions',
        content: `# Session Handoff

## Purpose
Maintain context between Lead Agent sessions.

## When to Use
- Context window getting long
- Ending session for the day
- Starting new chat for same project

## Key Sections
- Handoff Package Template
- Quick Handoff Format
- Resuming Instructions
- Slack History Search`,
        status: 'active',
        triggers: ['Ending session', 'Switching chats', 'Long conversation'],
        connections: ['lead-agent'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'design-system',
        name: 'design-system',
        type: 'skill',
        description: 'UI colors, typography, components (dark theme)',
        content: `# Universal Design System

## Purpose
Universal design system for all web projects. Dark theme based.

## Color Palette
- Page bg: #1a1a18
- Card bg: #262624
- Border: #3a3a38
- Text: #faf9f5
- Muted: #7a7974
- Accent: #d97757
- Success: #8aaf6e
- Warning: #bb8b5d
- Error: #ff7b6f

## Key Sections
- Color Palette (Backgrounds, Text, Semantic)
- Typography Scale
- Spacing
- Component Patterns
- Icons (Lucide React)`,
        status: 'active',
        triggers: ['Building UI', 'Need color value', 'Component styling'],
        connections: ['reference-based-replication'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'skill-management',
        name: 'skill-management',
        type: 'skill',
        description: 'How to create, name, and update skills',
        content: `# Skill Management

## Naming Convention
[category]-[purpose]
- workflow-* → processes
- project-* → completed projects
- (none) → core skills

## Skill Format
- Tables > paragraphs
- Code blocks > explanations
- 1-2 pages max

## Create vs Update Decision
Default: UPDATE existing skill
Only create if truly new domain.`,
        status: 'active',
        triggers: ['Creating new skill', 'Updating skill', 'Skill organization'],
        connections: ['infrastructure-hub'],
        lastUpdated: '2026-01-17'
    },
    {
        id: 'infrastructure-hub',
        name: 'infrastructure-hub',
        type: 'skill',
        description: 'System overview - this app!',
        content: `# Infrastructure Hub

## Purpose
Master overview of the multi-agent workflow system.
START HERE for any project.

## Shows
- All skills and how they connect
- When to use each skill
- Visual map of agentic infrastructure

## Views
- Network View (connections web)
- List View (searchable table)
- Workflow View (Plan → Build → Learn)`,
        status: 'active',
        triggers: ['Understanding system', 'Finding right skill', 'Onboarding'],
        connections: ['skill-management'],
        lastUpdated: '2026-01-17'
    },

    // ============ REFERENCES ============
    {
        id: 'project-fedex',
        name: 'FedEx Dispute Bot',
        type: 'reference',
        description: 'Windows scheduled bot - Dec 2025',
        content: `# FedEx Dispute Bot

## Completed
December 2025

## What Was Built
Automated bot that logs into FedEx Billing Online weekly, identifies invoices eligible for dispute, files disputes automatically, generates PDF reports.

## Tech Stack
- Python 3.12
- Playwright (browser automation)
- Flask/Jinja2 (PDF reports)
- Google Sheets API
- Windows Task Scheduler

## Key Learnings
- Task Scheduler needs LOCAL paths
- Shared folder for transfer only
- Clean project before deploy`,
        status: 'complete',
        triggers: ['Reference for Windows bots', 'Task Scheduler patterns', 'Playwright automation'],
        connections: ['workflow-knowledge'],
        lastUpdated: '2025-12-15'
    },
    {
        id: 'project-tiktok',
        name: 'TikTok UGC Bot',
        type: 'reference',
        description: 'Video downloader - Jan 2026',
        content: `# TikTok UGC Bot

## Completed
January 2026

## What Was Built
Automated system that reads TikTok URLs from Google Sheet, downloads via yt-dlp, uploads to organized Google Drive folders, updates sheet with status.

## Tech Stack
- Python
- yt-dlp
- Google Sheets API
- Google Drive API
- Windows Task Scheduler

## Key Learnings
- Shared Drive needs supportsAllDrives=True
- yt-dlp cookie authentication
- Apps Script for bulk Drive operations`,
        status: 'complete',
        triggers: ['Reference for download bots', 'Google Drive automation', 'yt-dlp patterns'],
        connections: ['workflow-knowledge'],
        lastUpdated: '2026-01-10'
    },

    // ============ PLATFORMS ============
    {
        id: 'wasp-api',
        name: 'WASP InventoryCloud',
        type: 'platform',
        description: 'Inventory management API',
        content: `# WASP InventoryCloud API

## Status
Partially discovered - needs more exploration

## Known Endpoints
- ic/item/infosearch (working)
- ic/item/inventorysearch (for stock levels)
- transactions/item/add, remove, adjust

## Key Discovery
- UI permissions ≠ API access
- Write endpoints need array format: [{"ItemNumber":"..."}]

## Needs Discovery
- Full endpoint documentation
- Rate limits
- All available fields`,
        status: 'needs-discovery',
        triggers: ['WASP integration', 'Inventory API work'],
        connections: ['platform-discovery'],
        lastUpdated: '2026-01-15'
    },
    {
        id: 'katana-api',
        name: 'Katana MRP',
        type: 'platform',
        description: 'Manufacturing planning API',
        content: `# Katana MRP API

## Status
Documented

## Used For
Manufacturing planning, inventory, orders

## Integration
Katana Replica project uses this API`,
        status: 'documented',
        triggers: ['Katana integration', 'MRP API work'],
        connections: ['platform-discovery'],
        lastUpdated: '2026-01-01'
    }
];

export const nodeColors: Record<NodeType, string> = {
    agent: '#d97757',
    skill: '#4a9eff',
    reference: '#888888',
    platform: '#ff6b6b'
};

export const statusConfig: Record<NodeStatus, { label: string; color: string; bgColor: string }> = {
    'active': { label: 'Active', color: '#8aaf6e', bgColor: 'rgba(138, 175, 110, 0.2)' },
    'needs-update': { label: 'Needs Update', color: '#bb8b5d', bgColor: 'rgba(187, 139, 93, 0.2)' },
    'stub': { label: 'Stub', color: '#7a7974', bgColor: 'rgba(122, 121, 116, 0.2)' },
    'missing': { label: 'Missing', color: '#ff7b6f', bgColor: 'rgba(255, 123, 111, 0.2)' },
    'complete': { label: 'Complete', color: '#8aaf6e', bgColor: 'rgba(138, 175, 110, 0.2)' },
    'needs-discovery': { label: 'Needs Discovery', color: '#ff6b6b', bgColor: 'rgba(255, 107, 107, 0.2)' },
    'documented': { label: 'Documented', color: '#8aaf6e', bgColor: 'rgba(138, 175, 110, 0.2)' }
};
