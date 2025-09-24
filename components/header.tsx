"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Menu, Home, Plus, BarChart3, Trophy } from "lucide-react"
import { UserMenu } from "./user-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#3FC1C9] via-[#364F6B] to-[#3FC1C9] bg-clip-text text-transparent font-orbitron">
              JustRaffleIt
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`nav-link text-sm font-medium hover:text-primary ${
                isActive("/") ? "active text-foreground" : "text-muted-foreground"
              }`}
            >
              Raffles
            </Link>
            <Link
              href="/create"
              className={`nav-link text-sm font-medium hover:text-primary ${
                isActive("/create") ? "active text-foreground" : "text-muted-foreground"
              }`}
            >
              Create
            </Link>
            <Link
              href="/dashboard"
              className={`nav-link text-sm font-medium hover:text-primary ${
                isActive("/dashboard") ? "active text-foreground" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className={`nav-link text-sm font-medium hover:text-primary ${
                isActive("/leaderboard") ? "active text-foreground" : "text-muted-foreground"
              }`}
            >
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-8 w-8 p-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <UserMenu />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Raffles
              </Link>
              <Link
                href="/create"
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/create")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Create
              </Link>
              <Link
                href="/dashboard"
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/leaderboard"
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/leaderboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div className="md:hidden mobile-nav">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          <Link href="/" className={`mobile-nav-item ${isActive("/") ? "active" : ""}`}>
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/create" className={`mobile-nav-item ${isActive("/create") ? "active" : ""}`}>
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Create</span>
          </Link>
          <Link href="/dashboard" className={`mobile-nav-item ${isActive("/dashboard") ? "active" : ""}`}>
            <BarChart3 className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link href="/leaderboard" className={`mobile-nav-item ${isActive("/leaderboard") ? "active" : ""}`}>
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Leaderboard</span>
          </Link>
        </div>
      </div>
    </>
  )
}
