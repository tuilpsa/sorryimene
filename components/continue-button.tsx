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
      className="group mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white font-medium text-lg transition-all duration-300 hover:scale-105 box-glow box-glow-hover animate-fade-in flex items-center gap-3 mx-auto"
    >
      <span>Continue...</span>
      <Heart className="w-5 h-5 group-hover:animate-heartbeat text-pink-200" />
    </button>
  )
}
