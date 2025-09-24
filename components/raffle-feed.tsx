"use client"

import { useState, useEffect, useCallback } from "react"
import { RaffleCard } from "./raffle-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for raffles
const mockRaffles = [
  {
    id: "1",
    title: "Rare Pepe NFT Collection",
    description: "Win 1 of 10 rare Pepe NFTs from the legendary collection",
    image: "/rare-pepe-nft.jpg",
    chain: "ETH" as const,
    prizeValue: "2.5 ETH",
    currentEntries: 1247,
    maxEntries: 2000,
    timeLeft: "2d 14h",
    entryPrice: "0.01 ETH",
    creator: "PepeKing",
    isLive: true,
  },
  {
    id: "2",
    title: "BONK Meme Coin Giveaway",
    description: "1M BONK tokens up for grabs in this epic raffle",
    image: "/bonk-meme-coin.jpg",
    chain: "SOL" as const,
    prizeValue: "1M BONK",
    currentEntries: 856,
    maxEntries: 1500,
    timeLeft: "1d 8h",
    entryPrice: "0.1 SOL",
    creator: "BonkMaster",
    isLive: true,
  },
  {
    id: "3",
    title: "Avalanche Gaming NFT",
    description: "Exclusive gaming NFT with utility in upcoming metaverse",
    image: "/avalanche-gaming-nft.jpg",
    chain: "AVAX" as const,
    prizeValue: "50 AVAX",
    currentEntries: 432,
    maxEntries: 1000,
    timeLeft: "5d 2h",
    entryPrice: "0.5 AVAX",
    creator: "GameDev",
    isLive: true,
  },
  {
    id: "4",
    title: "Doge Coin Mega Raffle",
    description: "Much wow! Win 10,000 DOGE in this community raffle",
    image: "/dogecoin-meme.jpg",
    chain: "ETH" as const,
    prizeValue: "10K DOGE",
    currentEntries: 1891,
    maxEntries: 2500,
    timeLeft: "3d 16h",
    entryPrice: "0.005 ETH",
    creator: "DogeArmy",
    isLive: false,
  },
  {
    id: "5",
    title: "Solana Monkey Business",
    description: "Rare SMB NFT with exclusive community access",
    image: "/solana-monkey-business-nft.jpg",
    chain: "SOL" as const,
    prizeValue: "15 SOL",
    currentEntries: 678,
    maxEntries: 1200,
    timeLeft: "4d 12h",
    entryPrice: "0.2 SOL",
    creator: "MonkeyKing",
    isLive: true,
  },
  {
    id: "6",
    title: "AVAX DeFi Token Bundle",
    description: "Portfolio of top AVAX DeFi tokens worth $5000",
    image: "/avalanche-defi-tokens.jpg",
    chain: "AVAX" as const,
    prizeValue: "$5,000",
    currentEntries: 234,
    maxEntries: 800,
    timeLeft: "6d 4h",
    entryPrice: "1 AVAX",
    creator: "DeFiWhale",
    isLive: true,
  },
]

const filterOptions = [
  { label: "All", value: "all" },
  { label: "ETH", value: "ETH" },
  { label: "SOL", value: "SOL" },
  { label: "AVAX", value: "AVAX" },
]

const sortOptions = [
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Ending Soon", value: "ending", icon: Clock },
  { label: "Most Entries", value: "entries", icon: Zap },
]

export function RaffleFeed() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChain, setSelectedChain] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [raffles, setRaffles] = useState(mockRaffles)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreRaffles = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add more mock raffles (in real app, this would be an API call)
    const newRaffles = mockRaffles.map((raffle, index) => ({
      ...raffle,
      id: `${raffle.id}-${raffles.length + index}`,
      currentEntries: Math.floor(Math.random() * raffle.maxEntries),
    }))

    setRaffles((prev) => [...prev, ...newRaffles])
    setLoading(false)

    // Stop loading more after 3 loads (in real app, check if API returns empty)
    if (raffles.length > 50) {
      setHasMore(false)
    }
  }, [loading, hasMore, raffles.length])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
      loadMoreRaffles()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMoreRaffles])

  const filteredRaffles = raffles.filter((raffle) => {
    const matchesSearch =
      raffle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      raffle.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChain = selectedChain === "all" || raffle.chain === selectedChain
    return matchesSearch && matchesChain
  })

  const sortedRaffles = filteredRaffles.sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.currentEntries - a.currentEntries
      case "ending":
        return a.timeLeft.localeCompare(b.timeLeft)
      case "entries":
        return b.currentEntries - a.currentEntries
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search raffles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-3 text-base bg-transparent border-2 border-border/50 focus:border-primary rounded-xl h-12 placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-muted/50 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Chain Filter - Mobile optimized */}
        <div className="flex items-center space-x-1 bg-muted/30 rounded-xl p-1 w-full sm:w-auto overflow-x-auto">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChain(option.value)}
              className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedChain === option.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Sort Options - Mobile optimized */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy(option.value)}
              className={`px-3 py-2 whitespace-nowrap ${sortBy === option.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <option.icon className="w-3 h-3 mr-1" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {sortedRaffles.length} raffles</p>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
            {sortedRaffles.filter((r) => r.isLive).length} Live
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedRaffles.map((raffle) => (
          <RaffleCard key={raffle.id} {...raffle} />
        ))}
      </div>

      {/* Loading indicator for infinite scroll */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* End of results */}
      {!hasMore && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've seen all available raffles!</p>
        </div>
      )}
    </div>
  )
}
