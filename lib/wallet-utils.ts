// EVM Wallet Integration Utilities
export interface EVMWallet {
  name: string
  icon: string
  installed: boolean
  connector: () => Promise<any>
}

export interface SolanaWallet {
  name: string
  icon: string
  installed: boolean
  connector: () => Promise<any>
}

// EVM Wallet Detection
export const detectEVMWallets = (): EVMWallet[] => {
  if (typeof window === "undefined") return []

  const wallets: EVMWallet[] = []

  // MetaMask
  if (window.ethereum?.isMetaMask) {
    wallets.push({
      name: "MetaMask",
      icon: "🦊",
      installed: true,
      connector: async () => window.ethereum,
    })
  }

  // Coinbase Wallet
  if (window.ethereum?.isCoinbaseWallet) {
    wallets.push({
      name: "Coinbase Wallet",
      icon: "🔵",
      installed: true,
      connector: async () => window.ethereum,
    })
  }

  // WalletConnect (always available)
  wallets.push({
    name: "WalletConnect",
    icon: "🔗",
    installed: true,
    connector: async () => {
      // In a real implementation, this would initialize WalletConnect
      throw new Error("WalletConnect not implemented yet")
    },
  })

  return wallets
}

// Solana Wallet Detection
export const detectSolanaWallets = (): SolanaWallet[] => {
  if (typeof window === "undefined") return []

  const wallets: SolanaWallet[] = []

  // Phantom
  if (window.solana?.isPhantom) {
    wallets.push({
      name: "Phantom",
      icon: "👻",
      installed: true,
      connector: async () => window.solana,
    })
  }

  // Solflare
  if (window.solflare?.isSolflare) {
    wallets.push({
      name: "Solflare",
      icon: "🔥",
      installed: true,
      connector: async () => window.solflare,
    })
  }

  return wallets
}

// EVM Connection Logic
export const connectEVMWallet = async (wallet: EVMWallet, chainId: string) => {
  try {
    const provider = await wallet.connector()

    // Request account access
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    })

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found")
    }

    // Get chain ID
    const currentChainId = await provider.request({
      method: "eth_chainId",
    })

    // Switch to correct chain if needed
    const targetChainId = getChainIdHex(chainId)
    if (currentChainId !== targetChainId) {
      await switchEVMChain(provider, chainId)
    }

    // Get balance
    const balance = await provider.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })

    const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)

    return {
      address: accounts[0],
      balance: `${balanceInEth.toFixed(4)} ${getChainSymbol(chainId)}`,
      provider,
    }
  } catch (error) {
    console.error("EVM wallet connection failed:", error)
    throw error
  }
}

// Solana Connection Logic
export const connectSolanaWallet = async (wallet: SolanaWallet) => {
  try {
    const provider = await wallet.connector()

    // Connect to wallet
    const response = await provider.connect()

    if (!response.publicKey) {
      throw new Error("Failed to connect to Solana wallet")
    }

    // Get balance (mock for now)
    const balance = Math.random() * 100 // In real implementation, fetch from RPC

    return {
      address: response.publicKey.toString(),
      balance: `${balance.toFixed(2)} SOL`,
      provider,
    }
  } catch (error) {
    console.error("Solana wallet connection failed:", error)
    throw error
  }
}

// Helper functions
const getChainIdHex = (chainId: string): string => {
  const chainIds: Record<string, string> = {
    ethereum: "0x1",
    base: "0x2105",
    avalanche: "0xa86a",
  }
  return chainIds[chainId] || "0x1"
}

const getChainSymbol = (chainId: string): string => {
  const symbols: Record<string, string> = {
    ethereum: "ETH",
    base: "ETH",
    avalanche: "AVAX",
  }
  return symbols[chainId] || "ETH"
}

const switchEVMChain = async (provider: any, chainId: string) => {
  const targetChainId = getChainIdHex(chainId)

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: targetChainId }],
    })
  } catch (switchError: any) {
    // Chain not added to wallet, try to add it
    if (switchError.code === 4902) {
      await addEVMChain(provider, chainId)
    } else {
      throw switchError
    }
  }
}

const addEVMChain = async (provider: any, chainId: string) => {
  const chainConfigs: Record<string, any> = {
    base: {
      chainId: "0x2105",
      chainName: "Base",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"],
    },
    avalanche: {
      chainId: "0xa86a",
      chainName: "Avalanche Network",
      nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://snowtrace.io"],
    },
  }

  const config = chainConfigs[chainId]
  if (config) {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [config],
    })
  }
}

// Type declarations for window objects
declare global {
  interface Window {
    ethereum?: any
    solana?: any
    solflare?: any
  }
}
