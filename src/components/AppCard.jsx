import { Star } from "lucide-react";

export default function AppCard({ app, onOpenReviews }) {
  const rating = app.avg_rating ?? 0;
  return (
    <div className="group bg-slate-800/60 border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 transition">
      {app.image_url ? (
        <img src={app.image_url} alt={app.title} className="w-full h-40 object-cover rounded-lg mb-4" />
      ) : (
        <div className="w-full h-40 rounded-lg mb-4 bg-gradient-to-br from-blue-900/40 to-purple-900/30 border border-white/5" />
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{app.title}</h3>
          <p className="text-blue-200/80 text-sm line-clamp-2">{app.description}</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="px-2 py-1 text-xs rounded bg-white/10 text-blue-100">{app.platform}</span>
        {app.tags?.slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-1 text-xs rounded bg-white/10 text-blue-100">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {app.website_url && (
          <a className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm" href={app.website_url} target="_blank">Website</a>
        )}
        {app.repo_url && (
          <a className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm" href={app.repo_url} target="_blank">Repo</a>
        )}
        <button onClick={() => onOpenReviews(app)} className="ml-auto px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm">Reviews</button>
      </div>
    </div>
  );
}
