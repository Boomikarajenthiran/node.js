import React, { useState } from 'react'
import { X, Heart, Sparkles, MapPin, Maximize2 } from 'lucide-react'
import { personalMemories } from '../data/memoriesData'

export default function MyMemories() {
  const [activePhoto, setActivePhoto] = useState(null)
  const [likes, setLikes] = useState({ pic1: 18, pic2: 24, pic3: 31, pic5: 22 })

  const toggleLike = (id, e) => {
    e.stopPropagation()
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-amber-400 font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
          <span>Authentic Photographs • Original Quality</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 mb-3 tracking-tight">
          My Holiday <span className="text-amber-400">Memories ❤️</span>
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Original snapshots from our personal holiday outings, scooter adventures, and unforgettable friendship gatherings.
        </p>
      </div>

      {/* Grid of 4 Uploaded Personal Photographs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personalMemories.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
          >
            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="eager"
              />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-950/85 backdrop-blur-md text-amber-400 border border-neutral-700 shadow-md">
                  0{idx + 1} • {photo.title}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-950 shadow-md">
                  {photo.caption}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-neutral-900/90 text-amber-400 text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  View Full Photo
                </span>
              </div>
            </div>

            {/* Description & Action Bar */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {photo.title}
                  </h3>
                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800/80 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-700 text-xs transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                    <span>{likes[photo.id]}</span>
                  </button>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-normal mb-3">
                  {photo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="text-amber-400 font-medium">✨ {photo.caption}</span>
                <span>Holiday Diary 2026</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800/90 text-neutral-300 hover:text-white border border-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[72vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-neutral-100">{activePhoto.title}</h3>
                <p className="text-xs text-amber-400 font-semibold">{activePhoto.caption}</p>
                <p className="text-xs text-neutral-400 mt-1">{activePhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
