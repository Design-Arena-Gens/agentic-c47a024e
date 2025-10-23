"use client";
import { useEffect, useState } from 'react';
import { getPreferences, setPreferences, type UserPreferences } from '../lib/store';

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<UserPreferences>(getPreferences());

  useEffect(() => {
    setPreferences(prefs);
  }, [prefs]);

  const toggleTopic = (topic: string) => {
    setPrefs((p) => {
      const topics = new Set(p.topics);
      topics.has(topic) ? topics.delete(topic) : topics.add(topic);
      return { ...p, topics: Array.from(topics) };
    });
  };

  const toggleSource = (source: string) => {
    setPrefs((p) => {
      const sources = new Set(p.sources);
      sources.has(source) ? sources.delete(source) : sources.add(source);
      return { ...p, sources: Array.from(sources) };
    });
  };

  const topics = ['Politics','Tech','Science','Business','Sports','World','Culture'];
  const sources = ['Reuters','AP','BBC','The Verge','TechCrunch','NYTimes'];

  return (
    <aside aria-label="Settings" className={`hidden lg:block w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}> 
      <div className="p-4">
        <button className="lg:hidden mb-2" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="sidebar-panel">Settings</button>
        <div id="sidebar-panel" className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Topics</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map(t => (
                <button key={t} onClick={() => toggleTopic(t)} className={`px-3 py-1 rounded-full text-sm border ${prefs.topics.includes(t) ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`} aria-pressed={prefs.topics.includes(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sources</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {sources.map(s => (
                <button key={s} onClick={() => toggleSource(s)} className={`px-3 py-1 rounded-full text-sm border ${prefs.sources.includes(s) ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`} aria-pressed={prefs.sources.includes(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
