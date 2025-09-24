"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Zap,
  ExternalLink,
  Share2,
  Heart,
  Trophy,
  Shield,
  Calendar,
  User,
  ChevronLeft,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface RaffleDetailProps {
  raffle: {
    id: string
    title: string
    description: string
    longDescription: string
    image: string
    chain: "SOL" | "AVAX" | "ETH"
    prizeValue: string
    currentEntries: number
    maxEntries: number
    timeLeft: string
    entryPrice: string
    creator: string
    creatorAddress: string
    isLive: boolean
    startDate: string
    endDate: string
    rules: string[]
    prizes: Array<{
      rank: number
      description: string
      value: string
    }>
  }
}

const chainColors = {
  SOL: "bg-purple-500",
  AVAX: "bg-red-500",
  ETH: "bg-blue-500",
}

const chainGradients = {
  SOL: "from-purple-500/20 to-purple-600/20",
  AVAX: "from-red-500/20 to-red-600/20",
  ETH: "from-blue-500/20 to-blue-600/20",
}

export function RaffleDetail({ raffle }: RaffleDetailProps) {
  const [entryCount, setEntryCount] = useState(1)
  const [isEntering, setIsEntering] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const router = useRouter()

  const progressPercentage = (raffle.currentEntries / raffle.maxEntries) * 100
  const totalCost = (Number.parseFloat(raffle.entryPrice.split(" ")[0]) * entryCount).toFixed(3)

  const handleEnterRaffle = async () => {
    setIsEntering(true)
    // Simulate entry process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setHasEntered(true)
    setIsEntering(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-secondary/50">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Raffles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <Card className="overflow-hidden floating-card">
            <div className="relative">
              <div
                className={`w-full h-96 bg-gradient-to-br ${chainGradients[raffle.chain]} flex items-center justify-center`}
              >
                <img
                  src={raffle.image || "/placeholder.svg"}
                  alt={raffle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-primary/60" />
                </div>
              </div>

              {/* Overlays */}
              <div className="absolute top-4 left-4">
                <Badge className={`${chainColors[raffle.chain]} text-white font-semibold`}>{raffle.chain}</Badge>
              </div>

              {raffle.isLive && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white font-semibold animate-pulse">LIVE</Badge>
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-bold text-lg">{raffle.prizeValue}</span>
              </div>
            </div>
          </Card>

          {/* Title and Description */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{raffle.title}</h1>
                <p className="text-muted-foreground">by {raffle.creator}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-foreground leading-relaxed">{raffle.longDescription}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="entries">Entries</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-primary" />
                  Prize Information
                </h3>
                <div className="space-y-3">
                  {raffle.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">#{prize.rank} Prize</p>
                        <p className="text-sm text-muted-foreground">{prize.description}</p>
                      </div>
                      <span className="font-bold text-primary">{prize.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{raffle.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">{raffle.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Remaining</span>
                    <span className="font-medium text-primary">{raffle.timeLeft}</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Raffle Rules
                </h3>
                <ul className="space-y-3">
                  {raffle.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="entries" className="space-y-4">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold mb-4">Recent Entries</h3>
                <div className="space-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full" />
                        <div>
                          <p className="font-medium text-foreground">
                            0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 4)}
                          </p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 60)} minutes ago</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 5) + 1} entries</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Entry Card */}
          <Card className="p-6 floating-card">
            <h3 className="text-lg font-semibold mb-4">Enter Raffle</h3>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{raffle.currentEntries.toLocaleString()} entries</span>
                <span>{progressPercentage.toFixed(1)}% filled</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full progress-fill transition-all duration-1000"
                  style={{ "--progress-width": `${progressPercentage}%` } as any}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-primary mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">Max Entries</p>
                <p className="font-bold text-foreground">{raffle.maxEntries.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-primary mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className="font-bold text-foreground">{raffle.timeLeft}</p>
              </div>
            </div>

            {/* Entry Controls */}
            {!hasEntered ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Number of Entries</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEntryCount(Math.max(1, entryCount - 1))}
                      disabled={entryCount <= 1}
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center font-medium">{entryCount}</span>
                    <Button variant="outline" size="sm" onClick={() => setEntryCount(entryCount + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Entry Price</span>
                    <span>{raffle.entryPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantity</span>
                    <span>{entryCount}</span>
                  </div>
                  <hr className="my-2 border-border" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {totalCost} {raffle.chain}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  onClick={handleEnterRaffle}
                  disabled={isEntering || !raffle.isLive}
                >
                  {isEntering ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Entering...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Enter Raffle
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center p-6 bg-green-500/10 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-green-600 mb-2">Entry Successful!</h4>
                <p className="text-sm text-muted-foreground">
                  You've entered with {entryCount} {entryCount === 1 ? "entry" : "entries"}
                </p>
              </div>
            )}
          </Card>

          {/* Creator Info */}
          <Card className="p-6 floating-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Creator
            </h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{raffle.creator}</p>
                <p className="text-xs text-muted-foreground">{raffle.creatorAddress}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <ExternalLink className="w-3 h-3 mr-2" />
              View Profile
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
