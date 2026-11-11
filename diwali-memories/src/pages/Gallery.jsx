import React, { useState } from 'react'
import { X } from 'lucide-react'
import { personalMemories, personalVideos } from '../data/memoriesData'

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Photo & Video Gallery 📸</h1>
        <p className="text-sm text-neutral-400">
          My complete personal holiday collection featuring original photos and videos.
        </p>
      </div>

      {/* Video Gallery Section with all 3 videos */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
              <span>Holiday Video Gallery</span>
              <span>🎥</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              All 3 original holiday video recordings with full playback controls.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
            3 Videos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* HTML5 video element with playback controls */}
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

                {/* Video Title and Caption */}
                <h3 className="text-base font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors mb-1.5">
                  {video.title}
                </h3>

                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium mb-2">
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

      {/* Photo Gallery Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <span>Personal Photographs</span>
            <span>📷</span>
          </h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 font-semibold">
            4 Photos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalMemories.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[4/3] bg-neutral-800 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-semibold text-sm text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {photo.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 whitespace-nowrap">
                    {photo.caption}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Photos */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-neutral-800 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img src={activePhoto.src} alt={activePhoto.title} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="p-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-200">{activePhoto.title}</h3>
                <p className="text-xs text-amber-400 mt-0.5">{activePhoto.caption}</p>
                <p className="text-xs text-neutral-400 mt-1">{activePhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
