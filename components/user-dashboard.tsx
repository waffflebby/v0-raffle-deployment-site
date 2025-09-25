"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Clock,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Eye,
  Settings,
  Plus,
  Activity,
  Award,
  Coins,
} from "lucide-react"
import Link from "next/link"

interface UserRaffleProps {
  id: string
  title: string
  image: string
  chain: "SOL" | "AVAX" | "ETH"
  status: "active" | "won" | "lost" | "pending"
  entries: number
  totalEntries: number
  prizeValue: string
  timeLeft?: string
  endDate: string
  winChance: number
}

function UserRaffleCard({
  id,
  title,
  image,
  chain,
  status,
  entries,
  totalEntries,
  prizeValue,
  timeLeft,
  endDate,
  winChance,
}: UserRaffleProps) {
  const chainColors = {
    SOL: "bg-purple-500",
    AVAX: "bg-red-500",
    ETH: "bg-blue-500",
  }

  const statusColors = {
    active: "bg-blue-500/10 text-blue-600",
    won: "bg-green-500/10 text-green-600",
    lost: "bg-red-500/10 text-red-600",
    pending: "bg-yellow-500/10 text-yellow-600",
  }

  const statusLabels = {
    active: "Active",
    won: "Won",
    lost: "Lost",
    pending: "Drawing Soon",
  }

  return (
    <Card className="p-4 floating-card hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Image */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0 overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${chainColors[chain]} text-white text-xs px-2 py-0`}>{chain}</Badge>
                <Badge className={`${statusColors[status]} text-xs px-2 py-0`}>{statusLabels[status]}</Badge>
              </div>
            </div>
            <span className="text-sm font-bold text-primary">{prizeValue}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-3">
            <div>
              <span>Your Entries: </span>
              <span className="font-medium text-foreground">{entries}</span>
            </div>
            <div>
              <span>Win Chance: </span>
              <span className="font-medium text-foreground">{winChance.toFixed(2)}%</span>
            </div>
            <div>
              <span>Total Entries: </span>
              <span className="font-medium text-foreground">{totalEntries.toLocaleString()}</span>
            </div>
            <div>
              <span>{status === "active" ? "Ends" : "Ended"}: </span>
              <span className="font-medium text-foreground">{timeLeft || endDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link href={`/raffle/${id}`}>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            </Link>
            {status === "active" && (
              <Link href={`/raffle/${id}`}>
                <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Entry
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

interface CreatedRaffleProps {
  id: string
  title: string
  image: string
  chain: "SOL" | "AVAX" | "ETH"
  status: "active" | "completed" | "draft"
  currentEntries: number
  maxEntries: number
  totalRevenue: string
  timeLeft?: string
  views: number
}

function CreatedRaffleCard({
  id,
  title,
  image,
  chain,
  status,
  currentEntries,
  maxEntries,
  totalRevenue,
  timeLeft,
  views,
}: CreatedRaffleProps) {
  const chainColors = {
    SOL: "bg-purple-500",
    AVAX: "bg-red-500",
    ETH: "bg-blue-500",
  }

  const statusColors = {
    active: "bg-green-500/10 text-green-600",
    completed: "bg-gray-500/10 text-gray-600",
    draft: "bg-yellow-500/10 text-yellow-600",
  }

  const progressPercentage = (currentEntries / maxEntries) * 100

  return (
    <Card className="p-4 floating-card hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Image */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0 overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${chainColors[chain]} text-white text-xs px-2 py-0`}>{chain}</Badge>
                <Badge className={`${statusColors[status]} text-xs px-2 py-0`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600">{totalRevenue}</span>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>
                {currentEntries.toLocaleString()} / {maxEntries.toLocaleString()} entries
              </span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-3">
            <div>
              <span>Views: </span>
              <span className="font-medium text-foreground">{views.toLocaleString()}</span>
            </div>
            <div>
              <span>{status === "active" ? "Time Left" : "Status"}: </span>
              <span className="font-medium text-foreground">{timeLeft || status}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link href={`/raffle/${id}`}>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              <Settings className="w-3 h-3 mr-1" />
              Manage
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const userProfile = {
    username: "CryptoTrader_2024",
    walletAddress: "0x742d35a8f3a",
    joinedDate: "December 2023",
    avatar: "CT",
    bio: "Passionate crypto enthusiast and raffle strategist",
    location: "Global",
    totalPortfolio: "18.905",
    favoriteChain: "ETH",
    achievements: ["Early Adopter", "Lucky Winner", "Active Trader"],
    socialLinks: {
      twitter: "@cryptotrader2024",
      discord: "CryptoTrader#2024",
    },
  }

  // Mock user data
  const userStats = {
    totalEntered: 24,
    totalWon: 3,
    totalSpent: "2.45 ETH",
    totalWinnings: "8.2 ETH",
    winRate: 12.5,
    activeRaffles: 8,
    createdRaffles: 2,
    totalRevenue: "1.2 ETH",
  }

  const enteredRaffles: UserRaffleProps[] = [
    {
      id: "1",
      title: "Rare Pepe NFT Collection",
      image: "/rare-pepe-nft.jpg",
      chain: "ETH",
      status: "active",
      entries: 3,
      totalEntries: 1247,
      prizeValue: "2.5 ETH",
      timeLeft: "2d 14h",
      endDate: "Jan 20",
      winChance: 0.24,
    },
    {
      id: "2",
      title: "BONK Meme Coin Giveaway",
      image: "/bonk-meme-coin.jpg",
      chain: "SOL",
      status: "won",
      entries: 1,
      totalEntries: 856,
      prizeValue: "1M BONK",
      endDate: "Jan 18",
      winChance: 0.12,
    },
    {
      id: "3",
      title: "Avalanche Gaming NFT",
      image: "/avalanche-gaming-nft.jpg",
      chain: "AVAX",
      status: "pending",
      entries: 2,
      totalEntries: 432,
      prizeValue: "50 AVAX",
      timeLeft: "Drawing in 1h",
      endDate: "Jan 19",
      winChance: 0.46,
    },
    {
      id: "4",
      title: "Doge Coin Mega Raffle",
      image: "/dogecoin-meme.jpg",
      chain: "ETH",
      status: "lost",
      entries: 1,
      totalEntries: 1891,
      prizeValue: "10K DOGE",
      endDate: "Jan 17",
      winChance: 0.05,
    },
  ]

  const createdRaffles: CreatedRaffleProps[] = [
    {
      id: "c1",
      title: "My Custom NFT Raffle",
      image: "/placeholder.svg?key=custom1",
      chain: "ETH",
      status: "active",
      currentEntries: 156,
      maxEntries: 500,
      totalRevenue: "0.78 ETH",
      timeLeft: "3d 8h",
      views: 1247,
    },
    {
      id: "c2",
      title: "Solana Token Bundle",
      image: "/placeholder.svg?key=custom2",
      chain: "SOL",
      status: "completed",
      currentEntries: 300,
      maxEntries: 300,
      totalRevenue: "15 SOL",
      views: 892,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {userProfile.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{userProfile.username}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>📍 {userProfile.location}</span>
                <span>📅 Joined {userProfile.joinedDate}</span>
                <span>💎 Portfolio: ${userProfile.totalPortfolio}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{userProfile.bio}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Link href="/create">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Raffle
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Achievements</p>
              <div className="flex items-center space-x-2">
                {userProfile.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Social</p>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span>🐦 {userProfile.socialLinks.twitter}</span>
                <span>💬 {userProfile.socialLinks.discord}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Wallet</p>
            <p className="text-sm font-mono text-foreground">{userProfile.walletAddress}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 floating-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Entered</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalEntered}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600 font-medium">+12% this month</span>
            </div>
          </Card>

          <Card className="p-6 floating-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Won</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalWon}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Award className="w-3 h-3 text-primary mr-1" />
              <span className="text-xs text-primary font-medium">{userStats.winRate}% win rate</span>
            </div>
          </Card>

          <Card className="p-6 floating-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Winnings</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalWinnings}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <DollarSign className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600 font-medium">+340% profit</span>
            </div>
          </Card>

          <Card className="p-6 floating-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Raffles</p>
                <p className="text-2xl font-bold text-foreground">{userStats.activeRaffles}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Clock className="w-3 h-3 text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">2 ending soon</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="entered">Entered Raffles</TabsTrigger>
          <TabsTrigger value="created">Created Raffles</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Username</label>
                      <p className="text-foreground font-medium">{userProfile.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                      <p className="text-foreground font-mono text-sm">{userProfile.walletAddress}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bio</label>
                    <p className="text-foreground">{userProfile.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-foreground">{userProfile.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Favorite Chain</label>
                      <p className="text-foreground">{userProfile.favoriteChain}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { chain: "Ethereum", symbol: "ETH", amount: "8.245", value: "$12,450", percentage: 66 },
                    { chain: "Solana", symbol: "SOL", amount: "6.420", value: "$4,280", percentage: 23 },
                    { chain: "Avalanche", symbol: "AVAX", amount: "4.240", value: "$2,175", percentage: 11 },
                  ].map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            asset.symbol === "ETH"
                              ? "bg-blue-500"
                              : asset.symbol === "SOL"
                                ? "bg-purple-500"
                                : "bg-red-500"
                          }`}
                        >
                          {asset.symbol === "ETH" ? "Ξ" : asset.symbol === "SOL" ? "◎" : "▲"}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{asset.chain}</p>
                          <p className="text-sm text-muted-foreground">
                            {asset.amount} {asset.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{asset.value}</p>
                        <p className="text-sm text-muted-foreground">{asset.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Profile Stats */}
            <div className="space-y-6">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
                <div className="space-y-3">
                  {userProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Social Links</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🐦</span>
                    </div>
                    <span className="text-foreground">{userProfile.socialLinks.twitter}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">💬</span>
                    </div>
                    <span className="text-foreground">{userProfile.socialLinks.discord}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card className="p-6 floating-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Won", raffle: "BONK Giveaway", amount: "1M BONK", time: "2 hours ago", type: "win" },
                  { action: "Entered", raffle: "Rare Pepe NFT", amount: "0.01 ETH", time: "1 day ago", type: "entry" },
                  { action: "Created", raffle: "My Custom NFT", amount: "Setup", time: "3 days ago", type: "create" },
                  { action: "Lost", raffle: "Doge Mega Raffle", amount: "0.005 ETH", time: "5 days ago", type: "loss" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "win"
                          ? "bg-green-500/10"
                          : activity.type === "create"
                            ? "bg-blue-500/10"
                            : activity.type === "loss"
                              ? "bg-red-500/10"
                              : "bg-primary/10"
                      }`}
                    >
                      {activity.type === "win" ? (
                        <Trophy className="w-4 h-4 text-green-600" />
                      ) : activity.type === "create" ? (
                        <Plus className="w-4 h-4 text-blue-600" />
                      ) : activity.type === "loss" ? (
                        <Target className="w-4 h-4 text-red-600" />
                      ) : (
                        <Zap className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action} {activity.raffle}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <span className="text-xs font-medium text-primary">{activity.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 floating-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/create">
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-3" />
                    Create New Raffle
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Zap className="w-4 h-4 mr-3" />
                    Browse Active Raffles
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-3" />
                  View Leaderboard
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entered" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Your Raffle Entries</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{enteredRaffles.length} Total</Badge>
              <Badge className="bg-green-500/10 text-green-600">
                {enteredRaffles.filter((r) => r.status === "active").length} Active
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enteredRaffles.map((raffle) => (
              <UserRaffleCard key={raffle.id} {...raffle} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="created" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Your Created Raffles</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{createdRaffles.length} Total</Badge>
              <Badge className="bg-green-500/10 text-green-600">
                {createdRaffles.filter((r) => r.status === "active").length} Active
              </Badge>
              <Link href="/create">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="w-3 h-3 mr-1" />
                  Create New
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {createdRaffles.map((raffle) => (
              <CreatedRaffleCard key={raffle.id} {...raffle} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
