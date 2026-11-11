import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Film, Heart, Sparkles, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 px-4 text-center max-w-4xl mx-auto">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-amber-400 font-semibold mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Personal Holiday Diary • 4 Photos & 3 Videos</span>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-neutral-100 tracking-tight mb-4 leading-tight">
        My Diwali Holiday <br className="hidden sm:inline" />
        <span className="text-amber-400 drop-shadow-[0_2px_12px_rgba(251,191,36,0.3)]">
          Memories 🪔
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-xl text-neutral-300 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
        "Little Moments, Beautiful Memories, Endless Happiness!"
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
        <Link
          to="/memories"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:scale-105"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Explore My Memories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/friends"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900/90 text-neutral-200 font-semibold hover:bg-neutral-800 hover:text-white transition-all shadow-sm"
        >
          <Film className="w-4 h-4 text-amber-400" />
          <span>Watch 3 Holiday Videos</span>
        </Link>
      </div>

      {/* 4 Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 hover:border-neutral-700 transition-colors">
          <p className="text-xl font-bold text-amber-400">4</p>
          <p className="text-xs font-semibold text-neutral-200">Original Photos</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Scooter, outing & squad</p>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 hover:border-neutral-700 transition-colors">
          <p className="text-xl font-bold text-amber-400">3</p>
          <p className="text-xs font-semibold text-neutral-200">Holiday Videos</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Full HTML5 playback</p>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 hover:border-neutral-700 transition-colors">
          <p className="text-xl font-bold text-amber-400">100%</p>
          <p className="text-xs font-semibold text-neutral-200">Real Memories</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Authentic moments</p>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 hover:border-neutral-700 transition-colors">
          <p className="text-xl font-bold text-amber-400">6</p>
          <p className="text-xs font-semibold text-neutral-200">Diwali Sweets</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Traditional flavors</p>
        </div>
      </div>
    </section>
  )
}
