import { Header } from "@/components/header"
import { RaffleDetail } from "@/components/raffle-detail"
import { notFound } from "next/navigation"

// Mock data - in real app this would come from database
const mockRaffles = {
  "1": {
    id: "1",
    title: "Rare Pepe NFT Collection",
    description:
      "Win 1 of 10 rare Pepe NFTs from the legendary collection. These NFTs are part of the original Rare Pepe series and have significant historical value in the crypto art world.",
    longDescription:
      "This exclusive raffle features 10 hand-picked Rare Pepe NFTs from the legendary collection that started the NFT movement. Each NFT has been verified for authenticity and comes with full provenance documentation. The winner will receive one randomly selected NFT from the collection, with values ranging from 0.5 to 5 ETH based on rarity and historical significance.",
    image: "/rare-pepe-nft.jpg",
    chain: "ETH" as const,
    prizeValue: "2.5 ETH",
    currentEntries: 1247,
    maxEntries: 2000,
    timeLeft: "2d 14h",
    entryPrice: "0.01 ETH",
    creator: "PepeKing",
    creatorAddress: "0x1234...5678",
    isLive: true,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    rules: [
      "One entry per wallet address",
      "Winner will be selected using Chainlink VRF",
      "Prize will be transferred within 24 hours of raffle end",
      "No refunds after entry",
    ],
    prizes: [{ rank: 1, description: "Rare Pepe NFT", value: "2.5 ETH" }],
  },
}

export default function RafflePage({ params }: { params: { id: string } }) {
  const raffle = mockRaffles[params.id as keyof typeof mockRaffles]

  if (!raffle) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <RaffleDetail raffle={raffle} />
      </main>
    </div>
  )
}
