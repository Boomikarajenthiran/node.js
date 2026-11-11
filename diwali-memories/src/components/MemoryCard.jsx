import React from 'react'

export default function MemoryCard({ src, title, caption, description, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect({ src, title, caption, description })}
      className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      {/* Photo with hover zoom */}
      <div className="aspect-[4/3] overflow-hidden bg-neutral-800">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium whitespace-nowrap">
            {caption}
          </span>
        </div>
        {description && (
          <p className="text-xs text-neutral-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
