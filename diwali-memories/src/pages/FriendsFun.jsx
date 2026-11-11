import React from 'react'
import { personalMemories, personalVideos } from '../data/memoriesData'

export default function FriendsFun() {
  const friendshipPhotos = personalMemories.filter(m => m.category === 'Friendship')

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">
          Friends Make Every Moment Special!
        </h1>
        <p className="text-sm text-neutral-400">
          Cherished moments, candid laughter, road trips, and holiday videos with my squad.
        </p>
      </div>

      {/* 3 Videos Gallery Section */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
              <span>Personal Holiday Videos</span>
              <span>🎥</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Watch our original uploaded holiday videos with full playback controls.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
            3 Videos
          </span>
        </div>

        {/* 3 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Responsive HTML5 video player with controls */}
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

                {/* Video Info & Caption */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                </div>

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
      </div>

      {/* Friendship Photographs */}
      <div>
        <h2 className="text-xl font-bold text-neutral-100 mb-6">Friendship Moments 📸</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {friendshipPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all hover:-translate-y-1"
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
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-neutral-200">{photo.title}</h3>
                  <span className="text-xs text-amber-400">{photo.caption}</span>
                </div>
                <p className="text-xs text-neutral-400">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
