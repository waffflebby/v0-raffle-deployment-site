"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, ExternalLink, LogOut, Settings, ChevronDown, Plus, Check } from "lucide-react"
import type { Chain } from "./chain-selector"
import { useWallet } from "@/hooks/use-wallet"
import { WalletSelectionModal } from "./wallet-selection-modal"
import { SUPPORTED_CHAINS } from "./chain-selector"

interface WalletConnectorProps {
  selectedChain: Chain
  onWalletStateChange?: (state: any) => void
}

export function WalletConnector({ selectedChain, onWalletStateChange }: WalletConnectorProps) {
  const {
    activeWallet,
    connectedWallets,
    isConnected,
    hasMultipleWallets,
    addWallet,
    switchToWallet,
    disconnectWallet,
    formatAddress,
  } = useWallet()

  const [showWalletModal, setShowWalletModal] = useState(false)

  const handleWalletConnected = (walletData: any) => {
    addWallet(walletData)
    onWalletStateChange?.({
      isConnected: true,
      address: walletData.address,
      balance: walletData.balance,
      chain: selectedChain,
    })
  }

  const handleSwitchWallet = (walletId: string) => {
    switchToWallet(walletId)
    const wallet = connectedWallets.find((w) => w.id === walletId)
    if (wallet) {
      onWalletStateChange?.({
        isConnected: true,
        address: wallet.address,
        balance: wallet.balance,
        chain: SUPPORTED_CHAINS.find((c) => c.id === wallet.chainId),
      })
    }
  }

  const handleDisconnectWallet = (walletId: string) => {
    disconnectWallet(walletId)
    if (activeWallet?.id === walletId) {
      onWalletStateChange?.({
        isConnected: false,
        address: null,
        balance: null,
        chain: null,
      })
    }
  }

  const copyAddress = () => {
    if (activeWallet?.address) {
      navigator.clipboard.writeText(activeWallet.address)
    }
  }

  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setShowWalletModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>

        <WalletSelectionModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          chainId={selectedChain.id}
          onWalletConnected={handleWalletConnected}
        />
      </>
    )
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Balance Display */}
        <div className="hidden sm:flex items-center space-x-2 border rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{activeWallet?.balance}</span>
        </div>

        {/* Wallet Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <div className={`w-3 h-3 rounded-full ${selectedChain.color}`} />
              <span className="font-medium">{formatAddress(activeWallet?.address || "")}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {/* Active Wallet Info */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full ${selectedChain.color} flex items-center justify-center text-white font-bold`}
                >
                  {selectedChain.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{activeWallet?.balance}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedChain.name} • {activeWallet?.walletName}
                  </p>
                </div>
              </div>
            </div>

            {/* Multiple Wallets Section */}
            {hasMultipleWallets && (
              <>
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Connected Wallets</p>
                  {connectedWallets.map((wallet) => {
                    const chain = SUPPORTED_CHAINS.find((c) => c.id === wallet.chainId)
                    return (
                      <DropdownMenuItem
                        key={wallet.id}
                        onClick={() => handleSwitchWallet(wallet.id)}
                        className="cursor-pointer flex items-center justify-between p-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${chain?.color}`} />
                          <div>
                            <p className="text-sm font-medium">{formatAddress(wallet.address)}</p>
                            <p className="text-xs text-muted-foreground">
                              {chain?.name} • {wallet.balance}
                            </p>
                          </div>
                        </div>
                        {wallet.isActive && <Check className="w-4 h-4 text-primary" />}
                      </DropdownMenuItem>
                    )
                  })}
                </div>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Add New Wallet */}
            <DropdownMenuItem onClick={() => setShowWalletModal(true)} className="cursor-pointer">
              <Plus className="w-4 h-4 mr-3" />
              Add Another Wallet
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Wallet Actions */}
            <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
              <Copy className="w-4 h-4 mr-3" />
              Copy Address
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink className="w-4 h-4 mr-3" />
              View on Explorer
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-3" />
              Wallet Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Disconnect Options */}
            {hasMultipleWallets && (
              <DropdownMenuItem
                onClick={() => activeWallet && handleDisconnectWallet(activeWallet.id)}
                className="cursor-pointer text-orange-600"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Disconnect This Wallet
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => connectedWallets.forEach((w) => handleDisconnectWallet(w.id))}
              className="cursor-pointer text-red-600"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Disconnect All Wallets
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <WalletSelectionModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        chainId={selectedChain.id}
        onWalletConnected={handleWalletConnected}
      />
    </>
  )
}
