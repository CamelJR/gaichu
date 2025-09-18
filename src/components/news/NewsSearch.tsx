// src/components/news/NewsSearch.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParam(key: string, fallback = "") {
  const [sp, setSp] = useSearchParams();
  const value = sp.get(key) ?? fallback;
  const setValue = (v: string) => {
    const next = new URLSearchParams(sp);
    v ? next.set(key, v) : next.delete(key);
    setSp(next, { replace: true });
  };
  return [value, setValue] as const;
}

export function NewsSearch() {
  const [q, setQ] = useQueryParam("q", "");
  const [local, setLocal] = useState(q);

  useEffect(() => {
    const t = setTimeout(() => setQ(local), 300);
    return () => clearTimeout(t);
  }, [local]);

  useEffect(() => setLocal(q), [q]);

  return (
    <div className="sticky top-14 z-10 border-b border-zinc-800 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search news…"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
