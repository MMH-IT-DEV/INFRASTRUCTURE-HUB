import { saveAs } from 'file-saver';
import { SkillNode } from './skills-data';

/**
 * Downloads a skill as a readable markdown file (.md)
 */
export async function downloadSkill(skill: SkillNode) {
    const frontmatter = `---
name: ${skill.id}
description: "${skill.description}"
status: ${skill.status}
lastUpdated: ${skill.lastUpdated}
triggers:
${skill.triggers.map(t => `  - ${t}`).join('\n')}
---

`;

    const fullContent = frontmatter + skill.content;
    const blob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });

    saveAs(blob, `${skill.id}.md`);
}

/**
 * Copies skill markdown content to clipboard
 */
export function copySkillContent(skill: SkillNode): string {
    const frontmatter = `---
name: ${skill.id}
description: "${skill.description}"
status: ${skill.status}
lastUpdated: ${skill.lastUpdated}
---

`;
    return frontmatter + skill.content;
}
