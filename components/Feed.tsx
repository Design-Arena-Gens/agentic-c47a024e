"use client";
import { useEffect, useMemo, useState } from 'react';
import { getArticles, type Article } from '../lib/data';
import { getPreferences } from '../lib/store';
import { ArticleCard } from './ArticleCard';

export function Feed() {
  const [query, setQuery] = useState('');
  const [prefsVersion, setPrefsVersion] = useState(0);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user:preferences') setPrefsVersion((v) => v + 1);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const prefs = useMemo(() => getPreferences(), [prefsVersion]);

  const articles = useMemo(() => {
    let items = getArticles();
    if (prefs.topics.length) items = items.filter(a => a.topics.some(t => prefs.topics.includes(t)));
    if (prefs.sources.length) items = items.filter(a => prefs.sources.includes(a.source));
    if (query) items = items.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase()));
    return items;
  }, [prefs, query]);

  return (
    <section aria-labelledby="feed-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search news" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
      </div>
      <h1 id="feed-heading" className="sr-only">News Feed</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
