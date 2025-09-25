"use client"

import { Header } from "@/components/header"
import { RaffleFeed } from "@/components/raffle-feed"
import { MetricsSidebar } from "@/components/metrics-sidebar"
import { RaffleEntryNotification } from "@/components/raffle-entry-notification"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RaffleEntryNotification />

      <main className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-4 border-b border-border/30 pb-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3FC1C9] via-[#364F6B] to-[#3FC1C9] bg-clip-text text-transparent mb-2">
                Cross-Chain Raffles
              </h1>
              <p className="text-sm text-muted-foreground">
                Discover and participate in raffles across multiple blockchains
              </p>
            </div>

            <RaffleFeed />
          </div>

          <div className="hidden lg:block">
            <MetricsSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
