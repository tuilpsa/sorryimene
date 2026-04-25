"use client"

import { Heart, Clock } from "lucide-react"
import { useState } from "react"
import { HeartExplosion } from "./heart-explosion"

interface FinalSectionProps {
  isVisible: boolean
}

export function FinalSection({ isVisible }: FinalSectionProps) {
  const [response, setResponse] = useState<"yes" | "wait" | null>(null)
  const [showExplosion, setShowExplosion] = useState(false)

  if (!isVisible) return null

  const handleYes = () => {
    setResponse("yes")
    setShowExplosion(true)
    setTimeout(() => setShowExplosion(false), 2000)
  }

  const handleWait = () => {
    setResponse("wait")
  }

  return (
    <>
      <HeartExplosion isActive={showExplosion} />
      <div className="animate-fade-in-up mt-16 text-center">
        {response === null && (
          <>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-pulse-glow mb-12">
              Can you forgive me?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleYes}
                className="group px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white font-bold text-xl transition-all duration-300 hover:scale-110 box-glow box-glow-hover flex items-center gap-3"
              >
                <span>Yes</span>
                <Heart className="w-6 h-6 group-hover:animate-heartbeat fill-current" />
              </button>
              <button
                onClick={handleWait}
                className="group px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold text-xl transition-all duration-300 hover:scale-105 box-glow box-glow-hover flex items-center gap-3"
              >
                <span>I need time</span>
                <Clock className="w-6 h-6 group-hover:animate-pulse" />
              </button>
            </div>
          </>
        )}

        {response === "yes" && (
          <div className="animate-fade-in-up">
            <div className="text-6xl md:text-8xl mb-8 animate-heartbeat">❤️</div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 text-glow-strong mb-6">
              Thank you, my love!
            </h2>
            <p className="text-xl md:text-2xl text-pink-200 text-glow max-w-xl mx-auto">
              {"You've made me the happiest person in the world. I promise to love you forever and always. ❤️"}
            </p>
          </div>
        )}

        {response === "wait" && (
          <div className="animate-fade-in-up">
            <div className="text-6xl md:text-8xl mb-8 animate-float">💜</div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-glow-strong mb-6">
              {"I'll wait for you no matter what"}
            </h2>
            <p className="text-xl md:text-2xl text-purple-200 text-glow max-w-xl mx-auto">
              Take all the time you need. My love for you will never change. I will always be here waiting for you. 💜
            </p>
          </div>
        )}
      </div>
    </>
  )
}
