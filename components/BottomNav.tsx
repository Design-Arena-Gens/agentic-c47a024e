"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/search', label: 'Search', icon: '🔎' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/notifications', label: 'Alerts', icon: '🔔' },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900/90 dark:border-gray-800" role="navigation">
      <ul className="flex items-stretch justify-around px-2 py-1" style={{ paddingBottom: 'max(0.25rem, var(--safe-bottom))' }}>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link href={item.href} className={`flex flex-col items-center justify-center gap-1 py-2 text-sm font-medium ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                <span aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
