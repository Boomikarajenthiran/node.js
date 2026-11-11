import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, Film, Image as ImageIcon, Heart, Cookie, BookOpen } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'My Memories', path: '/memories', icon: Heart },
    { name: 'Friends & Fun', path: '/friends', icon: Film },
    { name: 'Food & Sweets', path: '/sweets', icon: Cookie },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'About', path: '/about', icon: BookOpen },
  ]

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(251,191,36,0.2)] group-hover:scale-105 transition-transform">
            🪔
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-100 text-base sm:text-lg group-hover:text-amber-400 transition-colors">
              Holiday Memories
            </span>
            <span className="text-[10px] text-amber-400/80 tracking-wider uppercase font-medium -mt-0.5">
              Personal Diary
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.path
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-amber-400'}`} />
                <span>{link.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 px-4 py-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.path
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{link.name}</span>
              </NavLink>
            )
          })}
        </div>
      )}
    </header>
  )
}
