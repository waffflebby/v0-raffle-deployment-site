"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Zap, Clock, Shield, AlertTriangle } from "lucide-react"
import { ChainSelector, SUPPORTED_CHAINS } from "./chain-selector"

export function CrossChainBridge() {
  const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0])
  const [toChain, setToChain] = useState(SUPPORTED_CHAINS[1])
  const [amount, setAmount] = useState("")
  const [isBridging, setIsBridging] = useState(false)

  const swapChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  const handleBridge = async () => {
    setIsBridging(true)
    // Simulate bridging process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsBridging(false)
    setAmount("")
  }

  const estimatedTime = "5-10 minutes"
  const bridgeFee = "0.001 ETH"

  return (
    <Card className="p-6 floating-card max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Cross-Chain Bridge</h3>
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
          <Shield className="w-3 h-3 mr-1" />
          Secure
        </Badge>
      </div>

      {/* From Chain */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">From</label>
          <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg border border-border">
            <ChainSelector
              selectedChain={fromChain}
              onChainChange={setFromChain}
              className="border-none bg-transparent"
            />
            <Input
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-none bg-transparent text-right font-medium text-lg"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapChains}
            className="rounded-full w-10 h-10 p-0 bg-background border-2"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Chain */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">To</label>
          <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg border border-border">
            <ChainSelector selectedChain={toChain} onChainChange={setToChain} className="border-none bg-transparent" />
            <div className="flex-1 text-right">
              <span className="text-lg font-medium text-muted-foreground">{amount ? `≈ ${amount}` : "0.0"}</span>
            </div>
          </div>
        </div>

        {/* Bridge Info */}
        {amount && (
          <div className="space-y-3 p-4 bg-secondary/5 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bridge Fee</span>
              <span className="font-medium">{bridgeFee}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Time</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span className="font-medium">{estimatedTime}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-yellow-600 bg-yellow-500/10 p-2 rounded">
              <AlertTriangle className="w-3 h-3" />
              <span>Cross-chain transactions are irreversible. Double-check details.</span>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        <Button
          onClick={handleBridge}
          disabled={!amount || isBridging || fromChain.id === toChain.id}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isBridging ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Bridging...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Bridge Tokens
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
