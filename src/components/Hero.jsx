import { Rocket, Star, MessageSquare } from "lucide-react";

export default function Hero({ onOpenSubmit }) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_10%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_circle_at_90%_30%,rgba(147,51,234,0.15),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-200 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            Open platform for apps, reviews and collaboration
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Showcase your software. Get real feedback.
          </h1>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
            Upload your web, mobile, or desktop apps. Collect structured reviews and collaborate with a community that helps you improve.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={onOpenSubmit} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
              <Rocket className="w-5 h-5" /> Submit your app
            </button>
            <a href="#explore" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition">
              Explore apps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
