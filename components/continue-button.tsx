"use client"

import { Heart } from "lucide-react"

interface ContinueButtonProps {
  onClick: () => void
  isVisible: boolean
}

export function ContinueButton({ onClick, isVisible }: ContinueButtonProps) {
  if (!isVisible) return null

  return (
    <button
      onClick={onClick}
      className="group mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white font-medium text-base transition-all duration-300 hover:scale-105 box-glow box-glow-hover animate-fade-in flex items-center gap-2 mx-auto"
    >
      <span>Next message</span>
      <Heart className="w-4 h-4 group-hover:animate-heartbeat text-pink-200" />
    </button>
  )
}
