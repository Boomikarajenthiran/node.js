import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Film, Heart, Sparkles, X, Cookie } from 'lucide-react'
import Hero from '../components/Hero'
import MemoryCard from '../components/MemoryCard'
import { personalMemories, personalVideos, diwaliSweets } from '../data/memoriesData'

export default function Home() {
  const [modalItem, setModalItem] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Hero Section */}
      <Hero />

      {/* 1. Personal Photo Album Section */}
      <section className="mt-8 pt-8 border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Authentic Holiday Photographs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
              My Holiday Memories ❤️
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Cherished scooter trips, outdoor viewpoints, and unforgettable squad moments.
            </p>
          </div>

          <Link
            to="/memories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full Album</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalMemories.map((m) => (
            <MemoryCard
              key={m.id}
              src={m.src}
              title={m.title}
              caption={m.caption}
              description={m.description}
              onSelect={(item) => setModalItem(item)}
            />
          ))}
        </div>
      </section>

      {/* 2. Personal Video Section (All 3 Videos Playable) */}
      <section className="mt-16 pt-12 border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>Memories in Motion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
              "Friends Make Every Moment Special!"
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Watch all 3 original holiday video clips with full playback controls.
            </p>
          </div>

          <Link
            to="/friends"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Friends & Fun Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 shadow-md flex items-center justify-center">
                  <video
                    controls
                    playsInline
                    className="w-full h-full object-contain rounded-xl"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <h3 className="text-base font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors mb-1.5 line-clamp-1">
                  {video.title}
                </h3>

                <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium mb-2">
                  {video.caption}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Traditional Food & Sweets Section */}
      <section className="mt-16 pt-12 border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Cookie className="w-3.5 h-3.5" />
              <span>Festive Delicacies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
              Diwali Food & Sweets 🍬
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Traditional homemade sweets and snacks enjoyed with friends and family.
            </p>
          </div>

          <Link
            to="/sweets"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore All Sweets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {diwaliSweets.map((s) => (
            <Link
              key={s.id}
              to="/sweets"
              className="group bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 rounded-xl p-3 text-center transition-all hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-800 mb-2.5">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                {s.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Personal Diary Closing Card */}
      <section className="mt-16 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-md">
        <p className="text-base sm:text-lg font-semibold text-amber-400 mb-2">
          "Every holiday gives me a new story, and every memory gives me a reason to smile!"
        </p>
        <p className="text-xs text-neutral-400">
          Personal Diwali Holiday Diary • Cherishing every moment
        </p>
      </section>

      {/* Lightbox Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-800/90 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img src={modalItem.src} alt={modalItem.title} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="p-4 border-t border-neutral-800">
              <h3 className="font-semibold text-neutral-100">{modalItem.title}</h3>
              <p className="text-xs text-amber-400 mt-0.5">{modalItem.caption}</p>
              <p className="text-xs text-neutral-400 mt-1">{modalItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
