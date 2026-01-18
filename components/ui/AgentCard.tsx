'use client';

interface AgentCardProps {
    name: string;
    description: string;
    connections: number;
    role: string;
    isActive: boolean;
    onHover: (hovered: boolean) => void;
    onClick: () => void;
}

export default function AgentCard({
    name,
    description,
    connections,
    role,
    isActive,
    onHover,
    onClick
}: AgentCardProps) {
    return (
        <div
            className={`border rounded-lg p-5 transition-all cursor-pointer ${isActive
                    ? 'border-[#d97757] bg-[#d97757]/5 shadow-[0_0_20px_rgba(217,119,87,0.1)]'
                    : 'border-white/[0.06] bg-[#1a1a18] hover:border-white/[0.12] hover:bg-white/[0.02]'
                }`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onClick={onClick}
        >
            <h3 className={`font-semibold text-base mb-1 transition-colors ${isActive ? 'text-[#faf9f5]' : 'text-[#e2e2e1]'}`}>
                {name}
            </h3>
            <p className="text-sm text-[#8a8a85] mb-4 font-light leading-relaxed">
                {description}
            </p>

            <div className="space-y-2 text-[12px] font-medium uppercase tracking-wider">
                <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d97757] shadow-[0_0_4px_#d97757]"></span>
                    <span className="text-[#a8a8a4]">{connections} connections</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8aaf6e] shadow-[0_0_4px_#8aaf6e]"></span>
                    <span className="text-[#a8a8a4]">{role}</span>
                </div>
            </div>
        </div>
    );
}
