import React, { useState } from 'react'
import { Heart, Sparkles, Cookie } from 'lucide-react'
import { diwaliSweets } from '../data/memoriesData'

export default function FoodSweets() {
  const [favorites, setFavorites] = useState({})

  const toggleFav = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-amber-400 font-semibold mb-3">
          <Cookie className="w-3.5 h-3.5" />
          <span>Homemade Treats & Delicacies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 mb-3 tracking-tight">
          Diwali Food & <span className="text-amber-400">Sweets 🍬</span>
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Traditional Indian festival sweets and savory snacks that make holiday celebrations special.
        </p>
      </div>

      {/* Sweets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {diwaliSweets.map((sweet) => {
          const isFav = favorites[sweet.id]
          return (
            <div
              key={sweet.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Favorite button */}
                <button
                  onClick={() => toggleFav(sweet.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                    isFav 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'bg-neutral-900/70 text-neutral-300 hover:text-rose-400 border border-neutral-700'
                  }`}
                  aria-label="Favorite sweet"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-1">
                    {sweet.name}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    {sweet.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-neutral-800 text-[11px] text-amber-400 font-medium">
                  Festive Specialty
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sweet Sharing Note */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-md">
        <p className="text-sm text-neutral-300 font-medium leading-relaxed">
          "Sharing boxes of fresh ghee sweets and crispy snacks with visiting friends and relatives is the heartwarming essence of festival holidays."
        </p>
      </div>
    </div>
  )
}
