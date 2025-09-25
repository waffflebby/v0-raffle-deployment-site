"use client"

import Link from "next/link"
import { Activity, Bell } from "lucide-react"
import { UserMenu } from "./user-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

function MainNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className="flex items-center justify-center space-x-6 py-3 border-b border-border/30">
      <Link
        href="/"
        className={`text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-lg ${
          isActive("/") ? "bg-primary/10 text-primary" : "text-muted-foreground"
        }`}
      >
        Raffles
      </Link>
      <Link
        href="/create"
        className={`text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-lg ${
          isActive("/create") ? "bg-primary/10 text-primary" : "text-muted-foreground"
        }`}
      >
        Create
      </Link>
      <Link
        href="/dashboard"
        className={`text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-lg ${
          isActive("/dashboard") ? "bg-primary/10 text-primary" : "text-muted-foreground"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/leaderboard"
        className={`text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-lg ${
          isActive("/leaderboard") ? "bg-primary/10 text-primary" : "text-muted-foreground"
        }`}
      >
        Leaderboard
      </Link>
    </nav>
  )
}

export function Header() {
  const [notifications] = useState(3)

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

          {/* Right side - Notification Bell and User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-muted/50 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              )}
            </Button>
            <UserMenu />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <MainNavigation />
        </div>
      </header>
    </>
  )
}
