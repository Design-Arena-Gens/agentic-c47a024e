"use client";
import { useMemo, useState } from 'react';
import { getArticles } from '../lib/data';
import { ArticleCard } from './ArticleCard';

export function SearchPage() {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const items = getArticles();
    if (!q) return items.slice(0, 12);
    return items.filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || a.summary.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <section className="space-y-4" aria-labelledby="search-heading">
      <h1 id="search-heading" className="text-xl font-semibold">Search</h1>
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Find articles" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {results.map(r => <ArticleCard key={r.id} article={r} />)}
      </div>
    </section>
  );
}
