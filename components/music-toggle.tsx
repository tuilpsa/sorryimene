"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element with a romantic ambient sound
    audioRef.current = new Audio(
      "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
    )
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-pink-600/80 to-purple-600/80 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 box-glow box-glow-hover"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  )
}
