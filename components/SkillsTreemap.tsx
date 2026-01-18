'use client';

export function SkillsTreemap() {
    return (
        <div className="bg-[#1e1e1c] rounded-lg border border-[#3a3a38] h-[380px] p-4 w-full">
            <div className="grid grid-cols-6 grid-rows-4 gap-1 h-full w-full">
                {/* Row 1 - Large tiles */}
                <div className="col-span-2 row-span-2 bg-[#8aaf6e] rounded p-3 flex flex-col justify-between cursor-pointer hover:bg-[#8aaf6e]/90 transition-colors">
                    <span className="text-sm font-medium text-[#1a1a18]">workflow-knowledge</span>
                    <span className="text-xs text-[#1a1a18]/70">17%</span>
                </div>
                <div className="col-span-2 row-span-2 bg-[#a5c98e] rounded p-3 flex flex-col justify-between cursor-pointer hover:bg-[#a5c98e]/90 transition-colors">
                    <span className="text-sm font-medium text-[#1a1a18]">multi-agent-workflow</span>
                    <span className="text-xs text-[#1a1a18]/70">14%</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#b8d4a8] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#b8d4a8]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">project-planning</span>
                    <span className="text-xs text-[#1a1a18]/70">10%</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#c9dfbe] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#c9dfbe]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">platform-discovery</span>
                    <span className="text-xs text-[#1a1a18]/70">8%</span>
                </div>

                {/* Row 2 */}
                <div className="col-span-1 row-span-1 bg-[#dae9d3] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#dae9d3]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">knowledge-extraction</span>
                    <span className="text-xs text-[#1a1a18]/70">8%</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#8aaf6e] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#8aaf6e]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">infrastructure-hub</span>
                    <span className="text-xs text-[#1a1a18]/70">8%</span>
                </div>

                {/* Row 3-4 - Smaller tiles */}
                <div className="col-span-2 row-span-1 bg-[#a5c98e] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#a5c98e]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">reference-based-replication</span>
                    <span className="text-xs text-[#1a1a18]/70 ml-2">6%</span>
                </div>
                <div className="col-span-2 row-span-1 bg-[#b8d4a8] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#b8d4a8]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">session-handoff</span>
                    <span className="text-xs text-[#1a1a18]/70 ml-2">5%</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#ff7b6f] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#ff7b6f]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">design-system</span>
                    <span className="text-xs text-[#1a1a18]/70 ml-1">5%</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#c9dfbe] rounded p-2 flex flex-col justify-between cursor-pointer hover:bg-[#c9dfbe]/90 transition-colors">
                    <span className="text-xs font-medium text-[#1a1a18]">skill-mgmt</span>
                    <span className="text-xs text-[#1a1a18]/70 ml-1">4%</span>
                </div>

                {/* Bottom row */}
                <div className="col-span-3 row-span-1 bg-[#3a3a38] rounded p-2 flex items-center">
                    <span className="text-xs text-[#7a7974]">+ 2 more skills</span>
                </div>
                <div className="col-span-3 row-span-1 bg-[#3a3a38] rounded p-2 flex items-center justify-end">
                    <span className="text-xs text-[#7a7974]">Click tile for details</span>
                </div>
            </div>
        </div>
    );
}
