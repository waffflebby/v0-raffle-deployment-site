"use client"

import { useWalletStore } from "@/lib/wallet-store"
import { SUPPORTED_CHAINS } from "@/components/chain-selector"

export function useWallet() {
  const {
    connectedWallets,
    activeWallet,
    addWallet,
    removeWallet,
    setActiveWallet,
    updateWalletBalance,
    clearAllWallets,
    getWalletsByChain,
  } = useWalletStore()

  const isConnected = activeWallet !== null
  const hasMultipleWallets = connectedWallets.length > 1

  const getActiveChain = () => {
    if (!activeWallet) return null
    return SUPPORTED_CHAINS.find((chain) => chain.id === activeWallet.chainId) || null
  }

  const switchToWallet = (walletId: string) => {
    setActiveWallet(walletId)
  }

  const disconnectWallet = (walletId: string) => {
    removeWallet(walletId)
  }

  const disconnectAllWallets = () => {
    clearAllWallets()
  }

  const getWalletsForChain = (chainId: string) => {
    return getWalletsByChain(chainId)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    // State
    connectedWallets,
    activeWallet,
    isConnected,
    hasMultipleWallets,

    // Computed
    activeChain: getActiveChain(),

    // Actions
    addWallet,
    switchToWallet,
    disconnectWallet,
    disconnectAllWallets,
    updateWalletBalance,
    getWalletsForChain,
    formatAddress,
  }
}
