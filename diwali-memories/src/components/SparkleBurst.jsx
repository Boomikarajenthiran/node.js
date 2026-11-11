import React from 'react'
import confetti from 'canvas-confetti'
import { Sparkles } from 'lucide-react'

export default function SparkleBurst({ label = "Light Up Sparklers! ✨", className = "" }) {
  const triggerCelebration = () => {
    // Left firework burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#EC4899', '#FBBF24']
    })

    // Right firework burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#EC4899', '#FBBF24']
    })

    // Center golden stars
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        shapes: ['star'],
        colors: ['#FDE68A', '#F59E0B', '#D97706', '#EA580C']
      })
    }, 200)
  }

  return (
    <button
      onClick={triggerCelebration}
      className={`group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-festive-purple-dark font-bold bg-gradient-to-r from-festive-gold via-festive-gold-light to-festive-orange shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:shadow-[0_0_35px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-yellow-200 ${className}`}
    >
      <Sparkles className="w-5 h-5 text-festive-purple-dark animate-spin transition-transform duration-700 group-hover:rotate-180" />
      <span>{label}</span>
      <span className="text-lg">🪔</span>
    </button>
  )
}
