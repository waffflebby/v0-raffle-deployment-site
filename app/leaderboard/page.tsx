"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Crown, Medal, TrendingUp, Users, DollarSign } from "lucide-react"

const topCreators = [
  {
    rank: 1,
    username: "PepeKing",
    avatar: "/crypto-avatar.png",
    totalRaffles: 47,
    totalVolume: "125.8 ETH",
    successRate: 98.2,
    followers: 12500,
    chain: "ETH" as const,
  },
  {
    rank: 2,
    username: "BonkMaster",
    avatar: "/crypto-avatar.png",
    totalRaffles: 38,
    totalVolume: "2.1M BONK",
    successRate: 96.8,
    followers: 9800,
    chain: "SOL" as const,
  },
  {
    rank: 3,
    username: "DeFiWhale",
    avatar: "/crypto-avatar.png",
    totalRaffles: 29,
    totalVolume: "890 AVAX",
    successRate: 94.5,
    followers: 7600,
    chain: "AVAX" as const,
  },
  {
    rank: 4,
    username: "MonkeyKing",
    avatar: "/crypto-avatar.png",
    totalRaffles: 33,
    totalVolume: "78.4 SOL",
    successRate: 92.1,
    followers: 6900,
    chain: "SOL" as const,
  },
  {
    rank: 5,
    username: "DogeArmy",
    avatar: "/crypto-avatar.png",
    totalRaffles: 25,
    totalVolume: "45.2 ETH",
    successRate: 91.8,
    followers: 5400,
    chain: "ETH" as const,
  },
]

const chainColors = {
  SOL: "bg-purple-500",
  AVAX: "bg-red-500",
  ETH: "bg-blue-500",
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Trophy className="w-5 h-5 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-primary">{rank}</span>
  }
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top raffle creators across all chains</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Creators</p>
                <p className="text-xl font-bold text-foreground">2,847</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xl font-bold text-foreground">$4.2M</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                <p className="text-xl font-bold text-foreground">94.2%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-xl font-bold text-foreground">+28.5%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Creators */}
        <Card className="p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Top Creators</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                All Time
              </Button>
              <Button variant="ghost" size="sm">
                This Month
              </Button>
              <Button variant="ghost" size="sm">
                This Week
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {topCreators.map((creator) => (
              <div
                key={creator.rank}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:bg-muted/50 ${
                  creator.rank <= 3 ? "bg-gradient-to-r from-primary/5 to-secondary/5" : "bg-muted/20"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card card-shadow">
                  {getRankIcon(creator.rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden card-shadow">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.username}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">{creator.username}</h3>
                    <Badge className={`${chainColors[creator.chain]} text-white text-xs`}>{creator.chain}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Raffles</p>
                    <p className="font-bold text-foreground">{creator.totalRaffles}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-bold text-foreground">{creator.totalVolume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success</p>
                    <p className="font-bold text-green-600">{creator.successRate}%</p>
                  </div>
                </div>

                {/* Follow Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
