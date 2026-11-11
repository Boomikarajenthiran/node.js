import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-800 bg-neutral-950 py-10 text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Quote */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-lg">🪔</span>
            <span className="font-bold text-neutral-100">My Diwali Holiday Memories</span>
          </div>
          <p className="text-xs text-neutral-400">
            "Little Moments, Beautiful Memories, Endless Happiness!"
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <Link to="/" className="text-neutral-400 hover:text-amber-400 transition-colors">Home</Link>
          <Link to="/memories" className="text-neutral-400 hover:text-amber-400 transition-colors">My Memories</Link>
          <Link to="/friends" className="text-neutral-400 hover:text-amber-400 transition-colors">Friends & Fun</Link>
          <Link to="/sweets" className="text-neutral-400 hover:text-amber-400 transition-colors">Food & Sweets</Link>
          <Link to="/gallery" className="text-neutral-400 hover:text-amber-400 transition-colors">Gallery</Link>
          <Link to="/about" className="text-neutral-400 hover:text-amber-400 transition-colors">About</Link>
        </div>

        {/* Signature */}
        <div className="text-center md:text-right text-xs text-neutral-400">
          <p className="italic text-neutral-300">
            "Every holiday gives me a new story, and every memory gives me a reason to smile!"
          </p>
        </div>

      </div>
    </footer>
  )
}
