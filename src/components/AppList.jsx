import { useEffect, useState } from "react";
import AppCard from "./AppCard";

export default function AppList({ onOpenReviews }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState("");

  const BASE = import.meta.env.VITE_BACKEND_URL || "";

  const fetchApps = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/apps", BASE);
      if (q) url.searchParams.set("q", q);
      if (platform) url.searchParams.set("platform", platform);
      const res = await fetch(url.toString());
      const data = await res.json();
      setApps(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="explore" className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Explore apps</h2>
          <div className="flex gap-2">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white text-sm focus:outline-none" />
            <select value={platform} onChange={(e)=>setPlatform(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white text-sm focus:outline-none">
              <option value="">All platforms</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="cli">CLI</option>
              <option value="library">Library</option>
            </select>
            <button onClick={fetchApps} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">Filter</button>
          </div>
        </div>

        {loading ? (
          <p className="text-blue-200">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {apps.map((a) => (
              <AppCard key={a.id} app={a} onOpenReviews={onOpenReviews} />
            ))}
            {apps.length === 0 && (
              <div className="col-span-full text-blue-200/80">No apps yet. Be the first to submit!</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
