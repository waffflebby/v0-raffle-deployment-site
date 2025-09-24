"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChainSelector, SUPPORTED_CHAINS } from "./chain-selector"
import { CrossChainBridge } from "./cross-chain-bridge"
import { Upload, Zap, Settings, Eye } from "lucide-react"

export function CreateRaffleForm() {
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prizeValue: "",
    maxEntries: "",
    entryPrice: "",
    duration: "7",
    image: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async () => {
    // Simulate raffle creation
    console.log("Creating raffle:", { ...formData, chain: selectedChain })
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Raffle Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                    <Input
                      placeholder="Enter raffle title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe your raffle and prize"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Prize Image</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {formData.image ? formData.image.name : "Click to upload image"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 floating-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Chain & Pricing</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Blockchain</label>
                    <ChainSelector
                      selectedChain={selectedChain}
                      onChainChange={setSelectedChain}
                      className="w-full justify-start"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Prize Value</label>
                      <Input
                        placeholder="1.0"
                        value={formData.prizeValue}
                        onChange={(e) => handleInputChange("prizeValue", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Entry Price</label>
                      <Input
                        placeholder="0.01"
                        value={formData.entryPrice}
                        onChange={(e) => handleInputChange("entryPrice", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Max Entries</label>
                      <Input
                        placeholder="1000"
                        value={formData.maxEntries}
                        onChange={(e) => handleInputChange("maxEntries", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Duration (days)</label>
                      <Input
                        placeholder="7"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bridge */}
            <div>
              <Card className="p-6 floating-card mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Cross-Chain Bridge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Bridge tokens to deploy your raffle on different chains
                </p>
                <CrossChainBridge />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6 floating-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Advanced Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Auto-refund on failure</p>
                  <p className="text-sm text-muted-foreground">Automatically refund entries if raffle fails</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Whitelist entries</p>
                  <p className="text-sm text-muted-foreground">Only allow specific addresses to enter</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Multi-winner mode</p>
                  <p className="text-sm text-muted-foreground">Select multiple winners for your raffle</p>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="p-6 floating-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Raffle Preview
            </h3>
            <div className="bg-secondary/5 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg mb-2">{formData.title || "Your Raffle Title"}</h4>
                  <p className="text-muted-foreground mb-4">
                    {formData.description || "Your raffle description will appear here"}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge className={`${selectedChain.color} text-white`}>{selectedChain.symbol}</Badge>
                    <span className="font-medium">
                      Prize: {formData.prizeValue || "0"} {selectedChain.symbol}
                    </span>
                    <span className="font-medium">
                      Entry: {formData.entryPrice || "0"} {selectedChain.symbol}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" size="lg">
          Save Draft
        </Button>
        <Button onClick={handleSubmit} size="lg" className="bg-primary hover:bg-primary/90">
          <Zap className="w-4 h-4 mr-2" />
          Deploy Raffle
        </Button>
      </div>
    </div>
  )
}
