'use client';

interface LegendItem {
    color: string;
    label: string;
}

interface InfoCardProps {
    title: string;
    description: string;
    legend?: LegendItem[];
    stats?: { label: string; value: string | number }[];
}

export function InfoCard({ title, description, legend, stats }: InfoCardProps) {
    return (
        <div className="p-5 border border-[#3a3a38] rounded-lg bg-[#1e1e1c]">
            {/* Title - Bold, not too large */}
            <h3 className="text-base font-semibold text-[#faf9f5]">
                {title}
            </h3>

            {/* Description - Muted, good line height */}
            <p className="text-sm text-[#7a7974] mt-3 leading-relaxed">
                {description}
            </p>

            {/* Legend (if provided) */}
            {legend && legend.length > 0 && (
                <div className="mt-4 space-y-2">
                    {legend.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-[#a8a8a4]">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats (if provided) */}
            {stats && stats.length > 0 && (
                <div className="mt-4 space-y-1">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-sm text-[#a8a8a4]">
                            <span className="font-medium text-[#faf9f5]">{stat.value}</span>
                            {' '}{stat.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
