import { useEffect, useState } from "react";

export default function ReviewsPanel({ app, open, onClose }) {
  const BASE = import.meta.env.VITE_BACKEND_URL || "";
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ reviewer_name: "", rating: 5, pros: "", cons: "", suggestions: "", comment: "" });

  useEffect(() => {
    if (!open || !app) return;
    const load = async () => {
      try {
        const res = await fetch(new URL(`/api/apps/${app.id}/reviews`, BASE));
        const data = await res.json();
        setReviews(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [open, app]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(new URL(`/api/apps/${app.id}/reviews`, BASE), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, app_id: app.id }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setForm({ reviewer_name: "", rating: 5, pros: "", cons: "", suggestions: "", comment: "" });
      const refreshed = await (await fetch(new URL(`/api/apps/${app.id}/reviews`, BASE))).json();
      setReviews(refreshed);
    } catch (e) {
      alert(e.message);
    }
  };

  if (!open || !app) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Reviews — {app.title}</h3>
          <button className="text-blue-200" onClick={onClose}>Close</button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Write a review</h4>
            <form onSubmit={submit} className="space-y-2">
              <input required placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.reviewer_name} onChange={e=>setForm({...form,reviewer_name:e.target.value})} />
              <select value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white">
                {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
              </select>
              <input placeholder="Pros (what works well)" className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.pros} onChange={e=>setForm({...form,pros:e.target.value})} />
              <input placeholder="Cons (what needs work)" className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.cons} onChange={e=>setForm({...form,cons:e.target.value})} />
              <textarea rows={3} placeholder="Suggestions (actionable steps)" className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.suggestions} onChange={e=>setForm({...form,suggestions:e.target.value})} />
              <textarea rows={3} placeholder="General comment" className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})} />
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Submit review</button>
            </form>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Recent reviews</h4>
            <div className="space-y-3 max-h-96 overflow-auto pr-2">
              {reviews.map(r => (
                <div key={r.id} className="bg-slate-800/60 border border-white/10 rounded-xl p-3">
                  <div className="text-white font-medium">{r.reviewer_name} — {"⭐".repeat(r.rating)}</div>
                  {r.pros && <div className="text-green-300/90 text-sm">Pros: {r.pros}</div>}
                  {r.cons && <div className="text-red-300/90 text-sm">Cons: {r.cons}</div>}
                  {r.suggestions && <div className="text-yellow-300/90 text-sm">Suggestions: {r.suggestions}</div>}
                  {r.comment && <div className="text-blue-200/90 text-sm">{r.comment}</div>}
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="text-blue-200/80">No reviews yet. Be the first!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
