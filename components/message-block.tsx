"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface MessageBlockProps {
  message: string
  isVisible: boolean
  onComplete?: () => void
}

export function MessageBlock({ message, isVisible, onComplete }: MessageBlockProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const hasStarted = useRef(false)
  const onCompleteRef = useRef(onComplete)
  
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (isVisible && !hasStarted.current) {
      hasStarted.current = true
      setIsTyping(true)
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedText(message.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTyping(false)
          onCompleteRef.current?.()
        }
      }, 25)
      return () => clearInterval(interval)
    }
  }, [isVisible, message])

  if (!isVisible) return null

  return (
    <div className="animate-fade-in-up flex items-start gap-3 max-w-2xl mx-auto">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/20">
          <Image
            src="/images/anes-profile.jpg"
            alt="Anes"
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {/* Message Content */}
      <div className="flex-1">
        {/* Name */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-pink-400 font-semibold text-sm">Anes your man</span>
          <span className="text-pink-500/50 text-xs">now</span>
        </div>
        
        {/* Chat Bubble */}
        <div className="relative p-4 rounded-2xl rounded-tl-sm bg-gradient-to-br from-purple-800/60 via-pink-800/40 to-purple-800/60 backdrop-blur-sm border border-pink-500/30 shadow-lg shadow-pink-500/10">
          <p className="text-base md:text-lg leading-relaxed text-pink-100">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 bg-pink-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
