import { useState } from "react";

export default function SubmitAppModal({ open, onClose, onSubmitted }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    platform: "web",
    category: "",
    tags: "",
    repo_url: "",
    website_url: "",
    image_url: "",
    author_name: "",
    author_email: "",
  });
  const [loading, setLoading] = useState(false);

  const BASE = import.meta.env.VITE_BACKEND_URL || "";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const res = await fetch(new URL("/api/apps", BASE), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      await res.json();
      onSubmitted?.();
      onClose?.();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Submit your app</h3>
          <button className="text-blue-200" onClick={onClose}>Close</button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Title" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <select value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})} className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white">
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="cli">CLI</option>
            <option value="library">Library</option>
          </select>
          <input placeholder="Category" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
          <input placeholder="Tags (comma separated)" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} />
          <input placeholder="Website URL" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.website_url} onChange={e=>setForm({...form,website_url:e.target.value})} />
          <input placeholder="Repo URL" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.repo_url} onChange={e=>setForm({...form,repo_url:e.target.value})} />
          <input placeholder="Image URL" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
          <input required placeholder="Your name" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.author_name} onChange={e=>setForm({...form,author_name:e.target.value})} />
          <input required type="email" placeholder="Your email" className="px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.author_email} onChange={e=>setForm({...form,author_email:e.target.value})} />
          <textarea required rows={4} placeholder="Description" className="md:col-span-2 px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-white" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">{loading?"Submitting...":"Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
