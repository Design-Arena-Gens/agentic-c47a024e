"use client";
import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">NewsFlow</Link>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle color mode" className="px-3 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
