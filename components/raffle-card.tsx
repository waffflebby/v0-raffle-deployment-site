"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RaffleCardProps {
  id: string
  title: string
  description: string
  image: string
  chain: "SOL" | "AVAX" | "ETH"
  prizeValue: string
  currentEntries: number
  maxEntries: number
  timeLeft: string
  entryPrice: string
  creator: string
  isLive: boolean
}

const chainColors = {
  SOL: "bg-[#3FC1C9]",
  AVAX: "bg-[#E84142]", // Changed AVAX from pink to red
  ETH: "bg-[#364F6B]",
}

const chainButtonColors = {
  SOL: "bg-[#3FC1C9] hover:bg-[#3FC1C9]/90",
  AVAX: "bg-[#E84142] hover:bg-[#E84142]/90",
  ETH: "bg-[#364F6B] hover:bg-[#364F6B]/90",
}

export function RaffleCard({
  id,
  title,
  description,
  image,
  chain,
  prizeValue,
  currentEntries,
  maxEntries,
  timeLeft,
  entryPrice,
  creator,
  isLive,
}: RaffleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const progressPercentage = (currentEntries / maxEntries) * 100

  return (
    <div
      className="group relative transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
          <img
            src={image || "/placeholder.svg?height=300&width=300&query=crypto raffle"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/crypto-raffle.jpg"
            }}
          />
        </div>

        {/* Chain Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${chainColors[chain]} text-white font-semibold text-xs px-2 py-1`}>{chain}</Badge>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 right-3">
            {/* Changed LIVE badge from pink to green for better balance */}
            <Badge className="bg-green-500 text-white font-semibold animate-pulse text-xs px-2 py-1">LIVE</Badge>
          </div>
        )}

        {/* Prize Value Overlay */}
        <div className="absolute bottom-6 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-white font-bold text-sm">{prizeValue}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-sm text-foreground line-clamp-1 mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground/60 font-normal">by {creator}</p>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{currentEntries.toLocaleString()} entries</span>
            <span>{progressPercentage.toFixed(1)}% filled</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{maxEntries.toLocaleString()} max</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{timeLeft}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Entry Price</p>
            <p className="font-bold text-foreground text-lg">{entryPrice}</p>
          </div>

          <div
            className={`transition-all duration-200 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
          >
            <Link href={`/raffle/${id}`}>
              <Button
                size="sm"
                className={`${chainButtonColors[chain]} text-white px-3 py-1.5 text-xs rounded-lg font-semibold`}
              >
                Enter
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
