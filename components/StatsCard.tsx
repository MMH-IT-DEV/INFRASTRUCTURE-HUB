'use client';

import { Card } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    children: React.ReactNode;
}

export default function StatsCard({ title, children }: StatsCardProps) {
    return (
        <Card className="bg-[#1e1e1c] border-white/[0.06] p-6 flex flex-col h-full hover:border-white/[0.1] transition-all">
            <h3 className="text-[#d97757] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                {title}
            </h3>
            <div className="flex-1 flex flex-col justify-center">
                {children}
            </div>
        </Card>
    );
}
