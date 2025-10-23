"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { getComments, postComment, type CommentNode, subscribeComments } from '../lib/comments';

export function Comments({ articleId }: { articleId: string }) {
  const [nodes, setNodes] = useState<CommentNode[]>(getComments(articleId));
  const [text, setText] = useState('');
  const bcRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const unsub = subscribeComments(articleId, setNodes);
    if ('BroadcastChannel' in window) {
      bcRef.current = new BroadcastChannel('comments');
      bcRef.current.onmessage = (e) => {
        if (e.data?.articleId === articleId) {
          setNodes(getComments(articleId));
        }
      };
    }
    return () => {
      unsub();
      bcRef.current?.close();
    };
  }, [articleId]);

  const post = (parentId?: string) => {
    if (!text.trim()) return;
    postComment(articleId, text.trim(), parentId);
    setText('');
    bcRef.current?.postMessage({ articleId, type: 'comment' });
  };

  const renderNodes = (list: CommentNode[], level = 0) => (
    <ul className={`space-y-3 ${level > 0 ? 'ml-4 border-l pl-3 border-gray-200 dark:border-gray-700' : ''}`}>
      {list.map((n) => (
        <li key={n.id} className="text-sm">
          <div className="flex items-start gap-2">
            <span className="font-medium">{n.author}</span>
            <span className="text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
          </div>
          <p className="mt-1">{n.text}</p>
          <button onClick={() => post(n.id)} className="mt-1 text-primary-600 dark:text-primary-400">Reply</button>
          {n.children?.length ? renderNodes(n.children, level + 1) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Comments" className="mt-3">
      <div className="flex gap-2">
        <label htmlFor={`c-${articleId}`} className="sr-only">Add a comment</label>
        <input id={`c-${articleId}`} value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a comment" className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
        <button onClick={() => post()} className="px-3 py-2 rounded-md bg-primary-600 text-white">Post</button>
      </div>
      <div className="mt-3">
        {nodes.length ? renderNodes(nodes) : <p className="text-sm text-gray-600 dark:text-gray-300">No comments yet.</p>}
      </div>
    </section>
  );
}
