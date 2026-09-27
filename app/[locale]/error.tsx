'use client';

import {useEffect} from 'react';
import {useParams} from 'next/navigation';

export default function ErrorPage({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const params = useParams<{locale?: string}>();
  const hi = params?.locale === 'hi';
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="grid min-h-[28rem] place-items-center bg-surface px-5 py-20 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-industry-600">{hi ? 'त्रुटि' : 'Something went wrong'}</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy-800">{hi ? 'यह पृष्ठ अभी लोड नहीं हो सका' : 'This page could not be loaded'}</h1>
        <p className="mt-4 leading-7 text-slate-600">{hi ? 'कृपया फिर से प्रयास करें। समस्या बनी रहे तो बाद में वापस आएँ।' : 'Please try again. If the problem continues, return in a little while.'}</p>
        <button type="button" onClick={reset} className="mt-7 min-h-11 rounded-lg bg-accent-500 px-5 font-bold text-navy-950 hover:bg-accent-600">{hi ? 'फिर से प्रयास करें' : 'Try again'}</button>
      </div>
    </section>
  );
}
