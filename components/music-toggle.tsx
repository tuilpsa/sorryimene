"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/audio/love-song.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Try to autoplay
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        })
        .catch(() => {
          // Autoplay was prevented, wait for user interaction
          setIsPlaying(false)
        })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Handle first interaction to start music if autoplay failed
  useEffect(() => {
    if (hasInteracted) return

    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        }).catch(() => {})
      }
    }

    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("touchstart", handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [hasInteracted, isPlaying])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
      setHasInteracted(true)
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
