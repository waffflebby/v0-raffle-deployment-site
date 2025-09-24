"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface RaffleEntry {
  id: string
  username: string
  raffleName: string
  chain: "ETH" | "SOL" | "AVAX"
  timestamp: Date
}

const mockEntries: RaffleEntry[] = [
  {
    id: "1",
    username: "CryptoKing",
    raffleName: "Doge Coin Mega Raffle",
    chain: "ETH",
    timestamp: new Date(),
  },
  {
    id: "2",
    username: "DiamondHands",
    raffleName: "Solana NFT Bundle",
    chain: "SOL",
    timestamp: new Date(),
  },
  {
    id: "3",
    username: "AvalancheApe",
    raffleName: "AVAX Staking Rewards",
    chain: "AVAX",
    timestamp: new Date(),
  },
]

const chainColors = {
  ETH: "bg-blue-500",
  SOL: "bg-cyan-400",
  AVAX: "bg-red-500",
}

export function RaffleEntryNotification() {
  const [currentEntry, setCurrentEntry] = useState<RaffleEntry | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate real-time entries
    const interval = setInterval(() => {
      const randomEntry = mockEntries[Math.floor(Math.random() * mockEntries.length)]
      setCurrentEntry({
        ...randomEntry,
        id: Math.random().toString(),
        timestamp: new Date(),
      })
      setIsVisible(true)

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 4000)
    }, 8000) // New entry every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && currentEntry && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0],
          }}
          exit={{ x: -100, opacity: 0 }}
          transition={{
            duration: 0.5,
            scale: { repeat: 3, duration: 0.3 },
            rotate: { repeat: 3, duration: 0.2 },
          }}
          className="fixed top-20 left-6 z-50"
        >
          <div className="bg-card/95 backdrop-blur-sm border border-accent/30 rounded-lg px-4 py-3 shadow-lg max-w-sm mx-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${chainColors[currentEntry.chain]} animate-pulse`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-title truncate">
                    <span className="text-accent font-semibold">{currentEntry.username}</span> joined
                  </p>
                  <p className="text-xs text-body truncate">{currentEntry.raffleName}</p>
                </div>
                <div className="text-xs text-number">{currentEntry.chain}</div>
              </div>
              <button onClick={handleClose} className="text-body hover:text-title transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
