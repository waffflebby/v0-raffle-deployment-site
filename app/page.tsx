import { Header } from "@/components/header"
import { RaffleFeed } from "@/components/raffle-feed"
import { MetricsSidebar } from "@/components/metrics-sidebar"
import { RaffleEntryNotification } from "@/components/raffle-entry-notification"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RaffleEntryNotification />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 animate-pulse">
                Cross-Chain Raffles
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover and participate in raffles across Solana, Avalanche, and Ethereum
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
