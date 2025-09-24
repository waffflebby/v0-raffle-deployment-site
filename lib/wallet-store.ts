"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ConnectedWallet {
  id: string
  address: string
  balance: string
  chainId: string
  walletName: string
  provider?: any
  isActive: boolean
}

interface WalletStore {
  connectedWallets: ConnectedWallet[]
  activeWallet: ConnectedWallet | null

  // Actions
  addWallet: (wallet: Omit<ConnectedWallet, "id" | "isActive">) => void
  removeWallet: (walletId: string) => void
  setActiveWallet: (walletId: string) => void
  updateWalletBalance: (walletId: string, balance: string) => void
  clearAllWallets: () => void
  getWalletsByChain: (chainId: string) => ConnectedWallet[]
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      connectedWallets: [],
      activeWallet: null,

      addWallet: (walletData) => {
        const walletId = `${walletData.chainId}-${walletData.address}`

        set((state) => {
          // Check if wallet already exists
          const existingWallet = state.connectedWallets.find((w) => w.id === walletId)
          if (existingWallet) {
            // Update existing wallet
            const updatedWallets = state.connectedWallets.map((w) =>
              w.id === walletId ? { ...w, ...walletData, isActive: true } : { ...w, isActive: false },
            )
            return {
              connectedWallets: updatedWallets,
              activeWallet: updatedWallets.find((w) => w.id === walletId) || null,
            }
          }

          // Add new wallet
          const newWallet: ConnectedWallet = {
            ...walletData,
            id: walletId,
            isActive: true,
          }

          const updatedWallets = state.connectedWallets.map((w) => ({ ...w, isActive: false }))
          updatedWallets.push(newWallet)

          return {
            connectedWallets: updatedWallets,
            activeWallet: newWallet,
          }
        })
      },

      removeWallet: (walletId) => {
        set((state) => {
          const updatedWallets = state.connectedWallets.filter((w) => w.id !== walletId)
          const wasActive = state.activeWallet?.id === walletId

          let newActiveWallet = state.activeWallet
          if (wasActive && updatedWallets.length > 0) {
            newActiveWallet = updatedWallets[0]
            updatedWallets[0].isActive = true
          } else if (wasActive) {
            newActiveWallet = null
          }

          return {
            connectedWallets: updatedWallets,
            activeWallet: newActiveWallet,
          }
        })
      },

      setActiveWallet: (walletId) => {
        set((state) => {
          const updatedWallets = state.connectedWallets.map((w) => ({
            ...w,
            isActive: w.id === walletId,
          }))

          const activeWallet = updatedWallets.find((w) => w.id === walletId) || null

          return {
            connectedWallets: updatedWallets,
            activeWallet,
          }
        })
      },

      updateWalletBalance: (walletId, balance) => {
        set((state) => {
          const updatedWallets = state.connectedWallets.map((w) => (w.id === walletId ? { ...w, balance } : w))

          const activeWallet =
            state.activeWallet?.id === walletId ? { ...state.activeWallet, balance } : state.activeWallet

          return {
            connectedWallets: updatedWallets,
            activeWallet,
          }
        })
      },

      clearAllWallets: () => {
        set({
          connectedWallets: [],
          activeWallet: null,
        })
      },

      getWalletsByChain: (chainId) => {
        return get().connectedWallets.filter((w) => w.chainId === chainId)
      },
    }),
    {
      name: "wallet-storage",
      // Don't persist provider objects
      partialize: (state) => ({
        connectedWallets: state.connectedWallets.map((w) => ({
          ...w,
          provider: undefined,
        })),
        activeWallet: state.activeWallet
          ? {
              ...state.activeWallet,
              provider: undefined,
            }
          : null,
      }),
    },
  ),
)
