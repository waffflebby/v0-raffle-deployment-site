"use client"

import { useState } from "react"
import { Copy, ExternalLink, QrCode, TrendingUp, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/hooks/use-wallet"

interface ExchangeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExchangeModal({ open, onOpenChange }: ExchangeModalProps) {
  const { connectedWallets, activeWallet, switchWallet } = useWallet()
  const [selectedChain, setSelectedChain] = useState("solana")
  const [copied, setCopied] = useState(false)
  const [convertAmount, setConvertAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")

  // Mock deposit address - in real app this would be generated
  const depositAddress = "FcUNTW84VnlRCSaQenw4SLrZUMqwNCsXWRqjr2Gvq"

  const chains = [
    { id: "solana", name: "Solana", symbol: "SOL", color: "bg-purple-500", balance: "0.01" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "bg-blue-500", balance: "0.125" },
    { id: "base", name: "Base", symbol: "ETH", color: "bg-blue-600", balance: "0.089" },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", color: "bg-red-500", balance: "15.2" },
  ]

  const selectedChainData = chains.find((chain) => chain.id === selectedChain)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const solPrice = 214.15
  const convertedAmount = convertAmount ? (Number.parseFloat(convertAmount) * solPrice).toFixed(2) : "0"
  const buyAmountUSD = buyAmount ? (Number.parseFloat(buyAmount) * solPrice).toFixed(2) : "0"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-background border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <DialogTitle className="text-title text-base font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Exchange
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 h-8">
            <TabsTrigger value="convert" className="text-xs">
              Convert
            </TabsTrigger>
            <TabsTrigger value="deposit" className="text-xs">
              Deposit
            </TabsTrigger>
            <TabsTrigger value="buy" className="text-xs">
              Buy
            </TabsTrigger>
          </TabsList>

          <div className="h-[420px] overflow-y-auto">
            <TabsContent value="convert" className="space-y-4 mt-0 h-full">
              <div className="text-xs text-body mb-3">
                Exchange Native Solana for USDC on Hyperliquid. The minimum deposit is 6 USDC.
              </div>

              {/* Converting Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body">Converting</span>
                  <span className="text-xs text-body">
                    Balance: <span className="text-number">0.01</span>
                  </span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    className="border-0 bg-transparent text-lg font-medium text-title p-0 h-auto focus-visible:ring-0"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-title">SOL</span>
                  </div>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center">
                <div className="bg-muted rounded-full p-2">
                  <ArrowUpDown className="h-4 w-4 text-body" />
                </div>
              </div>

              {/* Gaining Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body">Gaining</span>
                  <span className="text-xs text-body">
                    Balance: <span className="text-number">0</span>
                  </span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="text-lg font-medium text-number">{convertedAmount}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-title">USDC</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-body text-right">1 SOL = {solPrice} USDC</div>

              <div className="mt-auto pt-4">
                <Button className="w-full h-9 text-sm">Confirm</Button>
              </div>
            </TabsContent>

            <TabsContent value="buy" className="space-y-4 mt-0 h-full flex flex-col">
              {/* Chain Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-title text-sm font-medium">Solana</span>
                </div>
                <div className="text-xs text-body">
                  Balance: <span className="text-number font-medium">0.01 SOL</span>
                </div>
              </div>

              {/* Buying Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body">Buying</span>
                  <span className="text-xs text-body">
                    SOL Price: <span className="text-number">{solPrice}</span>
                  </span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="border-0 bg-transparent text-lg font-medium text-title p-0 h-auto focus-visible:ring-0"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-title">SOL</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-red-400">Minimum: 20 USD</span>
                <span className="text-body">≈ {buyAmountUSD} USD</span>
              </div>

              <div className="flex justify-center py-4">
                <div className="flex items-center space-x-2 text-xs text-body">
                  <span>powered by</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium">MoonPay</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Button className="w-full h-9 text-sm">Buy</Button>
              </div>
            </TabsContent>

            <TabsContent value="deposit" className="space-y-3 mt-0 h-full flex flex-col">
              {/* Chain Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${selectedChainData?.color} rounded-full`}></div>
                    <span className="text-title text-sm font-medium">{selectedChainData?.name}</span>
                  </div>
                  <div className="text-xs text-body">
                    Balance:{" "}
                    <span className="text-number font-medium">
                      {selectedChainData?.balance} {selectedChainData?.symbol}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {chains.map((chain) => (
                    <Button
                      key={chain.id}
                      variant={selectedChain === chain.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedChain(chain.id)}
                      className="justify-start h-7 text-xs"
                    >
                      <div className={`w-2 h-2 ${chain.color} rounded-full mr-1`}></div>
                      {chain.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 space-y-2 flex-1">
                <p className="text-xs text-body">
                  Only deposit {selectedChainData?.symbol} through the {selectedChainData?.name} network for this
                  address.
                </p>

                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border">
                    <QrCode className="w-12 h-12 text-gray-400" />
                  </div>
                </div>

                {/* Deposit Address */}
                <div className="space-y-1">
                  <div className="text-xs font-medium text-title">Deposit Address</div>
                  <div className="bg-background rounded-lg p-2 border">
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-mono break-all text-body">{depositAddress}</code>
                      <Button variant="ghost" size="sm" onClick={copyAddress} className="ml-1 h-5 w-5 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Moonpay Link */}
                <div className="text-center">
                  <span className="text-xs text-body">
                    Don't have any {selectedChainData?.symbol}?{" "}
                    <Button variant="link" className="p-0 h-auto text-primary text-xs">
                      Buy through Moonpay
                      <ExternalLink className="w-2 h-2 ml-1" />
                    </Button>
                  </span>
                </div>
              </div>

              <Button onClick={copyAddress} className="w-full h-8 text-xs" disabled={copied}>
                {copied ? "Address Copied!" : "Copy Address"}
              </Button>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
