import { useState } from "react";
import Hero from "./components/Hero";
import AppList from "./components/AppList";
import SubmitAppModal from "./components/SubmitAppModal";
import ReviewsPanel from "./components/ReviewsPanel";

function App() {
  const [openSubmit, setOpenSubmit] = useState(false);
  const [reviewsFor, setReviewsFor] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
            <span className="text-white font-bold">DevShowcase</span>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20" onClick={()=>setOpenSubmit(true)}>Submit app</button>
            <a href="#explore" className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Explore</a>
          </div>
        </div>
      </header>

      <Hero onOpenSubmit={() => setOpenSubmit(true)} />

      <main>
        <AppList key={refreshKey} onOpenReviews={(app)=>setReviewsFor(app)} />
      </main>

      <footer className="mt-16 py-8 border-t border-white/10 text-center text-sm text-blue-300/70">
        Built for developers to learn from real feedback.
      </footer>

      <SubmitAppModal open={openSubmit} onClose={()=>setOpenSubmit(false)} onSubmitted={()=>setRefreshKey(k=>k+1)} />
      <ReviewsPanel app={reviewsFor} open={!!reviewsFor} onClose={()=>setReviewsFor(null)} />
    </div>
  );
}

export default App;
