"use client"

import { useState } from "react"
import { Bell, ChevronDown, User, Trophy, BarChart3, Settings, LogOut, Plus, Wallet2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ExchangeModal } from "./exchange-modal"
import { WalletSelectionModal } from "./wallet-selection-modal"
import { useWallet } from "@/hooks/use-wallet"

export function UserMenu() {
  const { connectedWallets, activeWallet, disconnectWallet } = useWallet()
  const [notifications] = useState(20)
  const [showExchange, setShowExchange] = useState(false)
  const [showWalletSelection, setShowWalletSelection] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const isConnected = true // Mock as connected
  const totalBalance = "18.905" // Mock total balance across chains

  const mockConnectedWallets = [
    { address: "0x1234...5678", chain: "ethereum", balance: "0.125 ETH" },
    { address: "FcUN...Gvq", chain: "solana", balance: "2.45 SOL" },
    { address: "0xabcd...9876", chain: "base", balance: "0.089 ETH" },
    { address: "0xdef0...ace1", chain: "avalanche", balance: "15.2 AVAX" },
  ]

  const menuItems = [
    { id: "profile", icon: User, label: "Profile", color: "blue" },
    { id: "raffles", icon: Trophy, label: "My Raffles", color: "purple" },
    { id: "portfolio", icon: BarChart3, label: "Portfolio", color: "green" },
    { id: "settings", icon: Settings, label: "Settings", color: "gray" },
  ]

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0 hover:bg-gray-100 transition-colors">
              <Bell className="h-3 w-3 text-gray-600" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-medium bg-red-500 hover:bg-red-600"
                >
                  {notifications > 99 ? "99+" : notifications}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs px-2 py-1">
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-3 h-8 hover:bg-gray-100 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">${totalBalance}</span>
                {isConnected && <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />}
              </div>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-72 sm:w-80 p-0 border-gray-200 shadow-xl rounded-2xl bg-white">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-title text-base sm:text-lg font-bold mb-1">My Account</h3>
                <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-body">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connected & Active</span>
                </div>
              </div>
            </div>

            {isConnected ? (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="text-center">
                  <div className="text-xs text-body mb-1 sm:mb-2 font-medium uppercase tracking-wider">
                    Total Balance
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-title mb-1 sm:mb-2">${totalBalance}</div>
                  <div className="text-xs text-body">Across 4 connected chains</div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">3</div>
                    <div className="text-xs text-blue-700 font-medium">Active Raffles</div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">$1,247</div>
                    <div className="text-xs text-green-700 font-medium">Total Winnings</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-body font-medium uppercase tracking-wider mb-2 sm:mb-3">Navigation</div>
                  <div className="grid grid-cols-2 gap-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeSection === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(isActive ? null : item.id)}
                          className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 ${
                            isActive ? `bg-blue-50 border border-blue-200 text-blue-700` : "hover:bg-gray-50 text-body"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                          <span className={`text-xs font-medium ${isActive ? "text-blue-700" : "text-body"}`}>
                            {item.label}
                          </span>
                          {isActive && <div className="w-1 h-1 bg-blue-500 rounded-full"></div>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-title text-lg font-semibold mb-2">No Wallet Connected</h3>
                <p className="text-body text-sm mb-4">Connect your wallet to get started</p>
                <Button
                  onClick={() => setShowWalletSelection(true)}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            )}

            {isConnected && (
              <>
                <div className="border-t border-gray-100"></div>
                <div className="p-3 sm:p-4">
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 py-2 sm:py-3 justify-center rounded-xl transition-colors font-medium"
                    onClick={() => {
                      console.log("Disconnecting all wallets")
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-sm">Disconnect All</span>
                  </DropdownMenuItem>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modals */}
        <ExchangeModal open={showExchange} onOpenChange={setShowExchange} />
        <WalletSelectionModal open={showWalletSelection} onOpenChange={setShowWalletSelection} />
      </div>
    </TooltipProvider>
  )
}
