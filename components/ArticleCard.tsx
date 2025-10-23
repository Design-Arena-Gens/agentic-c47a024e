"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { type Article } from '../lib/data';
import { useInteractions } from '../lib/interactions';
import { Comments } from './Comments';

export function ArticleCard({ article }: { article: Article }) {
  const { score, saved, upvote, downvote, toggleSave, share } = useInteractions(article.id);
  const ariaLabel = useMemo(() => `${article.title} from ${article.source}`, [article]);

  return (
    <article className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden flex flex-col" aria-label={ariaLabel}>
      {article.image && (
        <div className="relative aspect-[16/9]">
          <Image src={article.image} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="flex-1 p-4 space-y-3">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold leading-snug">
            <Link href={article.url} target="_blank" className="hover:underline">{article.title}</Link>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{article.source} • {new Date(article.publishedAt).toLocaleString()}</p>
        </header>
        <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-4">{article.summary}</p>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={upvote} aria-label="Upvote" className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">👍</button>
          <button onClick={downvote} aria-label="Downvote" className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">👎</button>
          <span aria-live="polite" className="text-sm text-gray-600 dark:text-gray-300">Score: {score}</span>
          <button onClick={toggleSave} aria-pressed={saved} className={`ml-auto px-3 py-1 rounded-md border ${saved ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{saved ? 'Saved' : 'Save'}</button>
          <button onClick={() => share(article)} className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">Share</button>
        </div>
        <Comments articleId={article.id} />
      </div>
    </article>
  );
}
