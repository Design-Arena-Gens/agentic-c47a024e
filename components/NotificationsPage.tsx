"use client";
import { useEffect, useState } from 'react';

export function NotificationsPage() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const i = setInterval(() => {
      // Simulate breaking news push
      if (Math.random() < 0.1) {
        setMessages(m => [
          `Breaking: Market update at ${new Date().toLocaleTimeString()}`,
          ...m,
        ]);
      }
    }, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="space-y-4" aria-labelledby="notifications-heading">
      <h1 id="notifications-heading" className="text-xl font-semibold">Notifications</h1>
      <ul className="space-y-2">
        {messages.map((m, idx) => (
          <li key={idx} className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">{m}</li>
        ))}
      </ul>
      {!messages.length && <p className="text-sm text-gray-600 dark:text-gray-300">No notifications yet.</p>}
    </section>
  );
}
