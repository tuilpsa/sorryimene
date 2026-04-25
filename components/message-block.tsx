"use client"

import { useEffect, useState, useRef } from "react"

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
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isVisible, message])

  if (!isVisible) return null

  return (
    <div className="animate-fade-in-up">
      <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-sm border border-pink-500/20 box-glow max-w-2xl mx-auto">
        <div className="absolute inset-0 rounded-2xl animate-shimmer opacity-30" />
        <p className="text-lg md:text-xl leading-relaxed text-pink-100 text-glow relative z-10">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-0.5 h-5 bg-pink-400 ml-1 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  )
}
