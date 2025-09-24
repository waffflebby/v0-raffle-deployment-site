"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  detectEVMWallets,
  detectSolanaWallets,
  connectEVMWallet,
  connectSolanaWallet,
  type EVMWallet,
  type SolanaWallet,
} from "@/lib/wallet-utils"

interface WalletSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  chainId: string
  onWalletConnected: (walletData: any) => void
}

export function WalletSelectionModal({ isOpen, onClose, chainId, onWalletConnected }: WalletSelectionModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)

  const isSolana = chainId === "solana"
  const evmWallets = detectEVMWallets()
  const solanaWallets = detectSolanaWallets()

  const handleEVMWalletConnect = async (wallet: EVMWallet) => {
    setConnecting(wallet.name)
    try {
      const walletData = await connectEVMWallet(wallet, chainId)
      onWalletConnected({
        ...walletData,
        walletName: wallet.name,
        chainId,
      })
      onClose()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      // In a real app, show error toast
    } finally {
      setConnecting(null)
    }
  }

  const handleSolanaWalletConnect = async (wallet: SolanaWallet) => {
    setConnecting(wallet.name)
    try {
      const walletData = await connectSolanaWallet(wallet)
      onWalletConnected({
        ...walletData,
        walletName: wallet.name,
        chainId: "solana",
      })
      onClose()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      // In a real app, show error toast
    } finally {
      setConnecting(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect {isSolana ? "Solana" : "EVM"} Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {isSolana ? (
            <>
              {solanaWallets.length > 0 ? (
                solanaWallets.map((wallet) => (
                  <Button
                    key={wallet.name}
                    variant="outline"
                    className="w-full justify-start h-12 bg-transparent"
                    onClick={() => handleSolanaWalletConnect(wallet)}
                    disabled={connecting !== null}
                  >
                    {connecting === wallet.name ? (
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                    ) : (
                      <span className="mr-3 text-lg">{wallet.icon}</span>
                    )}
                    {wallet.name}
                    {connecting === wallet.name && " (Connecting...)"}
                  </Button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No Solana wallets detected.</p>
                  <p className="text-sm mt-2">Please install Phantom or Solflare wallet.</p>
                </div>
              )}
            </>
          ) : (
            <>
              {evmWallets.length > 0 ? (
                evmWallets.map((wallet) => (
                  <Button
                    key={wallet.name}
                    variant="outline"
                    className="w-full justify-start h-12 bg-transparent"
                    onClick={() => handleEVMWalletConnect(wallet)}
                    disabled={connecting !== null}
                  >
                    {connecting === wallet.name ? (
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                    ) : (
                      <span className="mr-3 text-lg">{wallet.icon}</span>
                    )}
                    {wallet.name}
                    {connecting === wallet.name && " (Connecting...)"}
                  </Button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No EVM wallets detected.</p>
                  <p className="text-sm mt-2">Please install MetaMask or Coinbase Wallet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
