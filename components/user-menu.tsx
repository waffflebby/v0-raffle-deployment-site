"use client"

import { useState } from "react"
import { Settings, LogOut, ChevronDown, Wallet2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExchangeModal } from "./exchange-modal"
import { WalletSelectionModal } from "./wallet-selection-modal"
import { useWallet } from "@/hooks/use-wallet"

export function UserMenu() {
  const { connectedWallets, activeWallet, disconnectWallet } = useWallet()
  const [showExchange, setShowExchange] = useState(false)
  const [showWalletSelection, setShowWalletSelection] = useState(false)
  const [showWalletDetails, setShowWalletDetails] = useState(false)

  const isConnected = true // Mock as connected
  const totalBalance = "18.905" // Mock total balance across chains

  const chainHoldings = [
    { chain: "ETH", amount: "8.245", icon: "⟠", color: "text-blue-500" },
    { chain: "SOL", amount: "6.420", icon: "◎", color: "text-purple-500" },
    { chain: "AVAX", amount: "4.240", icon: "🔺", color: "text-red-500" },
  ]

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExchange(true)}
              className="h-8 px-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <Wallet2 className="h-3 w-3 sm:mr-2 text-gray-700" />
              <span className="hidden sm:inline text-xs font-medium text-gray-700">Exchange</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs px-2 py-1">
            <p>Exchange & Wallet</p>
          </TooltipContent>
        </Tooltip>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWalletDetails(!showWalletDetails)}
            className="h-8 px-2 hover:bg-gray-100 transition-colors flex items-center space-x-1"
          >
            <span className="text-sm font-semibold text-gray-900">${totalBalance}</span>
            {isConnected && <div className="w-2 h-2 bg-green-500 rounded-full" />}
            <ChevronDown
              className={`h-3 w-3 text-gray-500 transition-transform ${showWalletDetails ? "rotate-180" : ""}`}
            />
          </Button>

          {showWalletDetails && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Holdings by Chain</div>
                {chainHoldings.map((holding) => (
                  <div key={holding.chain} className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{holding.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{holding.chain}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${holding.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors">
                <Settings className="h-4 w-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs px-2 py-1">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          {isConnected && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => {
                    console.log("Disconnecting all wallets")
                  }}
                >
                  <LogOut className="h-4 w-4 text-gray-600 hover:text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs px-2 py-1">
                <p>Disconnect All</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <ExchangeModal open={showExchange} onOpenChange={setShowExchange} />
        <WalletSelectionModal open={showWalletSelection} onOpenChange={setShowWalletSelection} />
      </div>
    </TooltipProvider>
  )
}
