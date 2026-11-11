import React, { useState } from 'react'
import { X, Play } from 'lucide-react'

export default function ImageGallery({ items }) {
  const [activeItem, setActiveItem] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Photos', 'Videos']

  const filtered = items.filter(item => {
    if (filter === 'All') return true
    if (filter === 'Photos') return item.type !== 'video'
    if (filter === 'Videos') return item.type === 'video'
    return true
  })

  return (
    <div>
      {/* Minimal category filters */}
      <div className="flex gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-amber-400 text-neutral-950 font-semibold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveItem(item)}
            className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer shadow hover:shadow-lg transition-all"
          >
            <div className="aspect-[4/3] bg-neutral-800 relative overflow-hidden">
              {item.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <video src={item.src} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-neutral-200">{item.title}</p>
                <p className="text-xs text-neutral-400">{item.caption}</p>
              </div>
              <span className="text-xs text-amber-400">View</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-800/80 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-black flex items-center justify-center max-h-[70vh]">
              {activeItem.type === 'video' ? (
                <video src={activeItem.src} controls autoPlay className="max-h-[70vh] w-full" />
              ) : (
                <img src={activeItem.src} alt={activeItem.title} className="max-h-[70vh] w-auto object-contain" />
              )}
            </div>

            <div className="p-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-200">{activeItem.title}</h3>
                <p className="text-xs text-amber-400">{activeItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
