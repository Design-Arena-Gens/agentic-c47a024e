"use client";
import { useState } from 'react';
import { getPreferences, setPreferences } from '../lib/store';

export function ProfilePage() {
  const [name, setName] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('user:name') || 'Reader';
  });
  const [prefs, setPrefsState] = useState(() => getPreferences());

  const save = () => {
    localStorage.setItem('user:name', name);
    setPreferences(prefs);
    alert('Profile saved');
  };

  return (
    <section className="space-y-4" aria-labelledby="profile-heading">
      <h1 id="profile-heading" className="text-xl font-semibold">Your Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm">Display name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Daily digest time</label>
          <input type="time" value={prefs.digestTime} onChange={(e)=>setPrefsState(p=>({...p, digestTime: e.target.value}))} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Enable push notifications</label>
        <button onClick={async ()=>{
          const reg = await navigator.serviceWorker?.register('/sw.js');
          await reg?.pushManager.getSubscription();
          alert('Notifications ready (simulated)');
        }} className="px-3 py-2 rounded-md bg-primary-600 text-white">Enable</button>
      </div>
      <button onClick={save} className="px-4 py-2 rounded-md bg-primary-600 text-white">Save profile</button>
    </section>
  );
}
