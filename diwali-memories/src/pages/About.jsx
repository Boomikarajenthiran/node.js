import React from 'react'
import { Heart, Compass, Users, Sparkles, MapPin, Smile } from 'lucide-react'

export default function About() {
  const chapters = [
    {
      icon: Users,
      title: 'Time With Friends',
      text: 'Reconnecting with my closest friends, sharing laughter, and having endless conversations without checking the clock.'
    },
    {
      icon: Compass,
      title: 'Outings & Road Trips',
      text: 'Cruising on our scooters along breezy holiday roads and exploring quiet scenic viewpoints together.'
    },
    {
      icon: Smile,
      title: 'Beautiful Moments',
      text: 'Enjoying simple joys like roadside tea breaks, candid photo sessions, and cheering for each other.'
    },
    {
      icon: Sparkles,
      title: 'Creating Memories',
      text: 'Capturing unforgettable photos and videos that will always remind us of these carefree holidays.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-amber-400 font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
          <span>Personal Holiday Diary</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 mb-3 tracking-tight">
          My Happy Holiday <span className="text-amber-400">Experience ❤️</span>
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Reflections from a memorable holiday filled with adventures, friendships, and endless happiness.
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-12 space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <p>
          Holidays provide the perfect opportunity to pause our daily routines and spend quality time with genuine friends. This vacation was truly one for the books.
        </p>
        <p>
          We took our scooters out on windy roads, stopped by picturesque nature viewpoints, and laughed until our stomachs hurt. Every spontaneous turn led to a new candid moment, whether it was snapping silly selfies or filming videos of our banter.
        </p>
        <p>
          Along with the adventures, we celebrated the festive warmth with traditional sweets like melt-in-mouth laddus and crispy murukkus. Surrounded by loyal friends and loving family, every single day gave us a reason to celebrate.
        </p>
      </div>

      {/* Experience Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {chapters.map((ch, i) => {
          const Icon = ch.icon
          return (
            <div
              key={i}
              className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 shadow transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-neutral-100 text-sm sm:text-base">
                  {ch.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {ch.text}
              </p>
            </div>
          )
        })}
      </div>

      {/* Required Signature Ending Sentence */}
      <div className="bg-gradient-to-r from-amber-400/10 via-neutral-900 to-amber-400/10 border border-amber-400/30 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
        <p className="text-base sm:text-xl font-bold text-amber-400 leading-relaxed mb-2">
          "Every holiday gives me a new story, and every memory gives me a reason to smile!"
        </p>
        <p className="text-xs text-neutral-400">
          — Personal Holiday Diary 🪔✨
        </p>
      </div>
    </div>
  )
}
