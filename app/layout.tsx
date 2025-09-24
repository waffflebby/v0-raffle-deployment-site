import type React from "react"
import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

export const metadata = {
  title: "JustRaffleIt - Cross-Chain Raffle Platform",
  description:
    "Deploy and participate in cross-chain raffles for meme coins and NFTs on Solana, Avalanche, and Ethereum.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
