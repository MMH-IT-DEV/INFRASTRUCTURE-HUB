'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = [
    { id: 'system', label: 'System', href: '/' },
    { id: 'activity', label: 'Activity', href: '/activity' },
];

export function TabNav() {
    const pathname = usePathname();

    return (
        <div className="flex gap-8 border-b border-[#3a3a38] mb-8">
            {tabs.map(tab => {
                const isActive = tab.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(tab.href);

                return (
                    <Link
                        key={tab.id}
                        href={tab.href}
                        className={`pb-3 text-sm font-medium transition-colors ${isActive
                                ? 'text-[#faf9f5] border-b-2 border-[#faf9f5]'
                                : 'text-[#7a7974] hover:text-[#faf9f5]'
                            }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}
