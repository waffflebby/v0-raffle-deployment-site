"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletConnected: (walletData: any) => void
}

const POPULAR_WALLETS = [
  {
    name: "Phantom",
    icon: "👻",
    status: "Multichain",
    statusColor: "bg-purple-500",
    chains: ["solana", "ethereum"],
    installed: true,
  },
  {
    name: "MetaMask",
    icon: "🦊",
    status: "",
    statusColor: "",
    chains: ["ethereum", "avalanche"],
    installed: true,
  },
  {
    name: "Coinbase",
    icon: "🔵",
    status: "Multichain",
    statusColor: "bg-blue-600",
    chains: ["ethereum", "avalanche"],
    installed: false,
  },
  {
    name: "Solflare",
    icon: "🔥",
    status: "Installed",
    statusColor: "bg-green-500",
    chains: ["solana"],
    installed: true,
  },
  {
    name: "Backpack",
    icon: "🎒",
    status: "",
    statusColor: "",
    chains: ["solana"],
    installed: false,
  },
]

const CHAIN_FILTERS = [
  { id: "all", name: "All chains", icon: "🌐" },
  { id: "solana", name: "Solana", icon: "◎" },
  { id: "ethereum", name: "Ethereum", icon: "⟠" },
  { id: "avalanche", name: "Avalanche", icon: "🔺" },
]

export function WalletConnectionModal({ open, onOpenChange, onWalletConnected }: WalletConnectionModalProps) {
  const [selectedChain, setSelectedChain] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [connecting, setConnecting] = useState<string | null>(null)

  const filteredWallets = POPULAR_WALLETS.filter((wallet) => {
    const matchesChain =
      selectedChain === "all" || wallet.chains.includes(selectedChain) || wallet.chains.includes("all")
    const matchesSearch = wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesChain && matchesSearch
  })

  const handleWalletConnect = async (wallet: any) => {
    setConnecting(wallet.name)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful connection
    onWalletConnected({
      address: "0x1234...5678",
      balance: "18.905",
      walletName: wallet.name,
      chainId: selectedChain === "all" ? "ethereum" : selectedChain,
    })

    setConnecting(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-lg font-medium text-title">Select your wallet</DialogTitle>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Chain Filters */}
        <div className="flex items-center space-x-2 pb-4">
          {CHAIN_FILTERS.map((chain) => (
            <Button
              key={chain.id}
              variant={selectedChain === chain.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedChain(chain.id)}
              className={`h-8 text-xs ${
                selectedChain === chain.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              <span className="mr-1">{chain.icon}</span>
              {chain.name}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search through ${POPULAR_WALLETS.length} wallets...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
          />
        </div>

        {/* Wallet List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredWallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full h-14 justify-between bg-card border-border hover:bg-muted text-foreground p-4"
              onClick={() => handleWalletConnect(wallet)}
              disabled={connecting !== null}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-lg">
                  {wallet.icon}
                </div>
                <span className="font-medium">{wallet.name}</span>
              </div>

              <div className="flex items-center space-x-2">
                {wallet.status && (
                  <Badge
                    variant="secondary"
                    className={`text-xs px-2 py-1 ${
                      wallet.status === "Recommended"
                        ? "bg-primary text-primary-foreground"
                        : wallet.status === "Installed"
                          ? "bg-secondary text-secondary-foreground"
                          : wallet.status === "Multichain"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {connecting === wallet.name ? "Connecting..." : wallet.status}
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 text-center text-xs text-muted-foreground">
          <p>If you have not logged in before, you will create a new JustRaffleIt account.</p>
          <p className="mt-1">
            By proceeding, you agree to our{" "}
            <Button variant="link" className="p-0 h-auto text-primary text-xs">
              Terms of Service
            </Button>{" "}
            &{" "}
            <Button variant="link" className="p-0 h-auto text-primary text-xs">
              Privacy Policy
            </Button>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
