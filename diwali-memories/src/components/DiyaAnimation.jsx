import React from 'react'

export default function DiyaAnimation({ size = 'md', className = '', showGlow = true }) {
  const sizeMap = {
    sm: { w: 'w-7', h: 'h-7', flameH: 'h-4', flameW: 'w-2.5', glow: 'w-12 h-12' },
    md: { w: 'w-12', h: 'h-12', flameH: 'h-6', flameW: 'w-3.5', glow: 'w-20 h-20' },
    lg: { w: 'w-16', h: 'h-16', flameH: 'h-9', flameW: 'w-5', glow: 'w-28 h-28' },
    xl: { w: 'w-24', h: 'h-24', flameH: 'h-12', flameW: 'w-7', glow: 'w-40 h-40' },
  }

  const s = sizeMap[size] || sizeMap.md

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Golden Aura Glow */}
      {showGlow && (
        <div 
          className={`absolute -top-3 rounded-full bg-festive-gold/30 blur-xl animate-pulse-glow pointer-events-none ${s.glow}`} 
        />
      )}

      {/* Flame */}
      <div className="relative z-10 flex flex-col items-center -mb-1 animate-diya-flicker">
        <div 
          className={`${s.flameW} ${s.flameH} rounded-full bg-gradient-to-t from-festive-orange to-festive-gold-light shadow-[0_0_16px_#f59e0b]`}
          style={{
            borderRadius: '50% 50% 35% 35% / 80% 80% 20% 20%',
          }}
        >
          {/* Inner bright blue-white flame core */}
          <div 
            className="w-1.5 h-2 mx-auto mt-auto mb-0.5 rounded-full bg-amber-100 opacity-90 blur-[0.5px]"
          />
        </div>
      </div>

      {/* Traditional Brass / Clay Diya Base */}
      <svg 
        className={`${s.w} ${s.h} relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]`} 
        viewBox="0 0 100 65" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="diyaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#D97706" />
            <stop offset="70%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="diyaRimGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Diya Body */}
        <path 
          d="M6 25 C14 48 35 62 50 62 C65 62 86 48 94 25 C82 32 68 34 50 34 C32 34 18 32 6 25 Z" 
          fill="url(#diyaGoldGrad)" 
          stroke="#FCD34D" 
          strokeWidth="1.5"
        />

        {/* Diya Rim */}
        <ellipse 
          cx="50" 
          cy="26" 
          rx="44" 
          ry="9" 
          fill="url(#diyaRimGrad)" 
          stroke="#F59E0B" 
          strokeWidth="1"
        />

        {/* Traditional ornamental carvings */}
        <path 
          d="M26 38 C34 45 42 47 50 47 C58 47 66 45 74 38" 
          stroke="#FCD34D" 
          strokeWidth="1.5" 
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
        <circle cx="50" cy="54" r="2.5" fill="#FEF08A" />
        <circle cx="40" cy="52" r="2" fill="#F59E0B" />
        <circle cx="60" cy="52" r="2" fill="#F59E0B" />
      </svg>
    </div>
  )
}
