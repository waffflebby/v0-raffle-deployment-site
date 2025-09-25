"use client"

import { useState } from "react"
import { Settings, LogOut, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { WalletConnectionModal } from "./wallet-connection-modal"

export function UserMenu() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showWalletDetails, setShowWalletDetails] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletData, setWalletData] = useState<any>(null)

  const userProfile = {
    username: "CryptoTrader_2024",
    walletAddress: "0x742d...8f3a",
    joinedDate: "Dec 2023",
    totalBalance: "18.905",
    connectedWallet: "MetaMask",
  }

  const chainHoldings = [
    {
      chain: "ETH",
      amount: "8.245",
      usdValue: "$12,450",
      icon: (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          Ξ
        </div>
      ),
    },
    {
      chain: "SOL",
      amount: "6.420",
      usdValue: "$4,280",
      icon: (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          ◎
        </div>
      ),
    },
    {
      chain: "AVAX",
      amount: "4.240",
      usdValue: "$2,175",
      icon: (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          ▲
        </div>
      ),
    },
  ]

  const handleWalletConnected = (data: any) => {
    setWalletData(data)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletData(null)
    setShowWalletDetails(false)
  }

  if (!isConnected) {
    return (
      <TooltipProvider>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowWalletModal(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium h-7 px-3 text-xs transition-colors"
          >
            <User className="h-3 w-3 mr-1" />
            <span>Login</span>
          </Button>

          <WalletConnectionModal
            open={showWalletModal}
            onOpenChange={setShowWalletModal}
            onWalletConnected={handleWalletConnected}
          />
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex items-center">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWalletDetails(!showWalletDetails)}
            className="h-9 px-3 hover:bg-muted/50 transition-colors flex items-center space-x-3 border border-border rounded-lg font-sans"
          >
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                {userProfile.username.charAt(0)}
              </div>

              <div className="flex flex-col items-start justify-center min-w-0">
                <div className="text-sm font-semibold text-title font-mono tabular-nums leading-none">
                  ${userProfile.totalBalance}
                </div>

                <div className="flex items-center space-x-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground font-medium tracking-wide">Connected</span>
                </div>
              </div>
            </div>

            <ChevronDown
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform ml-1 ${showWalletDetails ? "rotate-180" : ""}`}
            />
          </Button>

          {showWalletDetails && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {userProfile.username.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{userProfile.username}</h3>
                    <p className="text-xs text-gray-500 font-mono">{userProfile.walletAddress}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-green-600 font-medium">
                        Connected via {userProfile.connectedWallet}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Member since {userProfile.joinedDate}</div>
              </div>

              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Portfolio Holdings</span>
                  <span className="text-lg font-bold text-primary">${userProfile.totalBalance}</span>
                </div>
                <div className="space-y-2">
                  {chainHoldings.map((holding) => (
                    <div
                      key={holding.chain}
                      className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {holding.icon}
                        <div>
                          <span className="text-sm font-medium text-gray-700">{holding.chain}</span>
                          <p className="text-xs text-gray-500">{holding.amount} tokens</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{holding.usdValue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 justify-start h-9 px-3 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 justify-start h-9 px-3 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={handleDisconnect}
                  >
                    <LogOut className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">Disconnect</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <WalletConnectionModal
          open={showWalletModal}
          onOpenChange={setShowWalletModal}
          onWalletConnected={handleWalletConnected}
        />
      </div>
    </TooltipProvider>
  )
}
