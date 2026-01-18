'use client';

interface DotIndicatorProps {
    count: number;
    max?: number;
    color?: string;
}

export default function DotIndicator({ count, max = 10, color = '#d97757' }: DotIndicatorProps) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: max }).map((_, i) => (
                <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                        backgroundColor: i < count ? color : 'rgba(255,255,255,0.1)',
                        boxShadow: i < count ? `0 0 4px ${color}44` : 'none'
                    }}
                />
            ))}
        </div>
    );
}
