"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"

export interface Chain {
  id: string
  name: string
  symbol: string
  color: string
  icon: string
  rpcUrl: string
  blockExplorer: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    color: "bg-blue-500",
    icon: "⟠",
    rpcUrl: "https://mainnet.infura.io/v3/",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    id: "base",
    name: "Base",
    symbol: "ETH",
    color: "bg-blue-600",
    icon: "🔵",
    rpcUrl: "https://mainnet.base.org",
    blockExplorer: "https://basescan.org",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    color: "bg-red-500",
    icon: "▲",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorer: "https://snowtrace.io",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    color: "bg-purple-500",
    icon: "◎",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    blockExplorer: "https://solscan.io",
    nativeCurrency: {
      name: "Solana",
      symbol: "SOL",
      decimals: 9,
    },
  },
]

interface ChainSelectorProps {
  selectedChain: Chain
  onChainChange: (chain: Chain) => void
  className?: string
}

export function ChainSelector({ selectedChain, onChainChange, className }: ChainSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`flex items-center space-x-2 ${className}`}>
          <div className={`w-3 h-3 rounded-full ${selectedChain.color}`} />
          <span className="font-medium">{selectedChain.symbol}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_CHAINS.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => onChainChange(chain)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${chain.color}`} />
              <div>
                <p className="font-medium">{chain.name}</p>
                <p className="text-xs text-muted-foreground">{chain.symbol}</p>
              </div>
            </div>
            {selectedChain.id === chain.id && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
