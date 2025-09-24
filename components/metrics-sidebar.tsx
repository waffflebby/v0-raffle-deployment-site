"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Zap,
  DollarSign,
  Trophy,
  Activity,
  Target,
  ChevronUp,
  ChevronDown,
  Crown,
  Flame,
  Gift,
  Star,
  Medal,
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ComponentType<any>
  description?: string
}

function MetricCard({ title, value, change, positive, icon: Icon, description }: MetricCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div
          className={`flex items-center space-x-1 text-xs font-medium ${positive ? "text-green-600" : "text-red-600"}`}
        >
          {positive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-foreground">{value}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </div>
  )
}

interface TopRaffleProps {
  rank: number
  title: string
  creator: string
  entries: number
  value: string
  chain: "SOL" | "AVAX" | "ETH"
  isHot?: boolean
}

function TopRaffleItem({ rank, title, creator, entries, value, chain, isHot }: TopRaffleProps) {
  const chainColors = {
    SOL: "bg-purple-500",
    AVAX: "bg-red-500",
    ETH: "bg-blue-500",
  }

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold text-foreground">
        {rank === 1 ? <Crown className="w-3 h-3" /> : rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
          {isHot && <Flame className="w-3 h-3 text-orange-500" />}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">by {creator}</span>
          <Badge className={`${chainColors[chain]} text-white text-xs px-1 py-0`}>{chain}</Badge>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{entries} entries</p>
      </div>
    </div>
  )
}

export function MetricsSidebar() {
  const [liveStats, setLiveStats] = useState({
    totalVolume: "$2.4M",
    activeRaffles: "1,247",
    totalUsers: "45.2K",
    successRate: "94.8%",
    avgEntry: "$12.50",
    totalPrizes: "$890K",
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        activeRaffles: (
          Number.parseInt(prev.activeRaffles.replace(",", "")) + Math.floor(Math.random() * 3)
        ).toLocaleString(),
        totalUsers: `${(Number.parseFloat(prev.totalUsers.replace("K", "")) + 0.1).toFixed(1)}K`,
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const topRaffles = [
    {
      rank: 1,
      title: "Rare Pepe NFT Collection",
      creator: "PepeKing",
      entries: 1247,
      value: "2.5 ETH",
      chain: "ETH" as const,
      isHot: true,
    },
    {
      rank: 2,
      title: "BONK Meme Coin Giveaway",
      creator: "BonkMaster",
      entries: 856,
      value: "1M BONK",
      chain: "SOL" as const,
      isHot: true,
    },
    {
      rank: 3,
      title: "Doge Coin Mega Raffle",
      creator: "DogeArmy",
      entries: 1891,
      value: "10K DOGE",
      chain: "ETH" as const,
    },
    {
      rank: 4,
      title: "Solana Monkey Business",
      creator: "MonkeyKing",
      entries: 678,
      value: "15 SOL",
      chain: "SOL" as const,
    },
    {
      rank: 5,
      title: "AVAX DeFi Token Bundle",
      creator: "DeFiWhale",
      entries: 234,
      value: "$5,000",
      chain: "AVAX" as const,
    },
  ]

  const recentActivity = [
    { user: "0x1234...5678", action: "entered", raffle: "Rare Pepe NFT", time: "2m ago", amount: "0.01 ETH" },
    { user: "0x9abc...def0", action: "won", raffle: "BONK Giveaway", time: "5m ago", amount: "1M BONK" },
    { user: "0x5678...9abc", action: "created", raffle: "New Gaming NFT", time: "8m ago", amount: "10 AVAX" },
    { user: "0xdef0...1234", action: "entered", raffle: "Doge Mega Raffle", time: "12m ago", amount: "0.005 ETH" },
    { user: "0x2468...ace0", action: "entered", raffle: "SMB Collection", time: "15m ago", amount: "0.2 SOL" },
  ]

  const giveaways = [
    {
      title: "Weekly ETH Giveaway",
      prize: "1 ETH",
      entries: 2847,
      timeLeft: "2d 14h",
      chain: "ETH" as const,
    },
    {
      title: "SOL Community Prize",
      prize: "50 SOL",
      entries: 1234,
      timeLeft: "5d 8h",
      chain: "SOL" as const,
    },
    {
      title: "AVAX Bonus Round",
      prize: "$2,500",
      entries: 892,
      timeLeft: "1d 3h",
      chain: "AVAX" as const,
    },
  ]

  const leaderboard = [
    { rank: 1, user: "CryptoKing", wins: 47, totalWon: "$12,450" },
    { rank: 2, user: "RaffleQueen", wins: 39, totalWon: "$9,820" },
    { rank: 3, user: "LuckyWhale", wins: 31, totalWon: "$8,340" },
    { rank: 4, user: "DiamondHands", wins: 28, totalWon: "$7,120" },
    { rank: 5, user: "MoonShot", wins: 24, totalWon: "$6,890" },
  ]

  return (
    <div className="space-y-4 w-72">
      {/* Live Platform Stats */}
      <Card className="p-4 border-border border bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Platform Stats</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 font-medium">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg text-center border border-border">
            <DollarSign className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-bold text-sm text-foreground">{liveStats.totalVolume}</p>
          </div>
          <div className="p-2 rounded-lg text-center border border-border">
            <Zap className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="font-bold text-sm text-foreground">{liveStats.activeRaffles}</p>
          </div>
          <div className="p-2 rounded-lg text-center border border-border">
            <Users className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Users</p>
            <p className="font-bold text-sm text-foreground">{liveStats.totalUsers}</p>
          </div>
          <div className="p-2 rounded-lg text-center border border-border">
            <Target className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Success</p>
            <p className="font-bold text-sm text-foreground">{liveStats.successRate}</p>
          </div>
        </div>
      </Card>

      {/* Active Giveaways */}
      <Card className="p-4 border-border border bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Active Giveaways</h3>
          <Gift className="w-4 h-4 text-accent" />
        </div>
        <div className="space-y-2">
          {giveaways.map((giveaway, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{giveaway.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`bg-${giveaway.chain.toLowerCase()}-500 text-white text-xs px-1 py-0`}>
                    {giveaway.chain}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{giveaway.entries} entries</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">{giveaway.prize}</p>
                <p className="text-xs text-orange-500">{giveaway.timeLeft}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Raffles */}
      <Card className="p-4 border-border border bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Trending</h3>
          <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 text-xs">
            <Flame className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        </div>
        <div className="space-y-2">
          {topRaffles.slice(0, 3).map((raffle) => (
            <div
              key={raffle.rank}
              className="flex items-center space-x-2 p-2 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-foreground">
                {raffle.rank === 1 ? <Crown className="w-3 h-3" /> : raffle.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{raffle.title}</p>
                <p className="text-xs text-muted-foreground">{raffle.entries} entries</p>
              </div>
              <Badge className={`bg-${raffle.chain.toLowerCase()}-500 text-white text-xs px-1 py-0`}>
                {raffle.chain}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Winners */}
      <Card className="p-4 border-border border bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Top Winners</h3>
          <Medal className="w-4 h-4 text-accent" />
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 3).map((player) => (
            <div
              key={player.rank}
              className="flex items-center space-x-2 p-2 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-accent text-xs font-bold text-foreground">
                {player.rank === 1 ? <Crown className="w-3 h-3 text-yellow-500" /> : player.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{player.user}</p>
                <p className="text-xs text-muted-foreground">{player.wins} wins</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">{player.totalWon}</p>
                <Star className="w-3 h-3 text-yellow-500 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chain Distribution */}
      <Card className="p-4 border-border border bg-transparent">
        <h3 className="text-base font-semibold text-foreground mb-3">Chains</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium">ETH</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">45%</span>
              <div className="w-12 h-1 bg-accent/20 rounded-full mt-1">
                <div className="w-[45%] h-1 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span className="text-sm font-medium">SOL</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">35%</span>
              <div className="w-12 h-1 bg-accent/20 rounded-full mt-1">
                <div className="w-[35%] h-1 bg-purple-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm font-medium">AVAX</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">20%</span>
              <div className="w-12 h-1 bg-accent/20 rounded-full mt-1">
                <div className="w-[20%] h-1 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4 border-border border bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Activity</h3>
          <Activity className="w-4 h-4 text-accent" />
        </div>
        <div className="space-y-2">
          {recentActivity.slice(0, 4).map((activity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activity.action === "won"
                    ? "bg-green-500/10"
                    : activity.action === "created"
                      ? "bg-muted"
                      : "bg-muted"
                }`}
              >
                {activity.action === "won" ? (
                  <Trophy className="w-3 h-3 text-green-600" />
                ) : activity.action === "created" ? (
                  <Zap className="w-3 h-3 text-accent" />
                ) : (
                  <Target className="w-3 h-3 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {activity.user.slice(0, 6)}...{activity.user.slice(-4)} {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
