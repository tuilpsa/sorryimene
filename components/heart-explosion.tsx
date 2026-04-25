"use client"

import { useEffect, useState } from "react"

interface ExplodingHeart {
  id: number
  x: number
  y: number
  size: number
  rotation: number
}

export function HeartExplosion({ isActive }: { isActive: boolean }) {
  const [hearts, setHearts] = useState<ExplodingHeart[]>([])

  useEffect(() => {
    if (isActive) {
      const newHearts: ExplodingHeart[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
      }))
      setHearts(newHearts)

      const timeout = setTimeout(() => {
        setHearts([])
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isActive])

  if (!isActive || hearts.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-burst"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            transform: `rotate(${heart.rotation}deg)`,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}
