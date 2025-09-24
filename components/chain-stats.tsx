"use client"

import { TrendingUp, Users, Zap, DollarSign } from "lucide-react"

const stats = [
  {
    label: "Total Volume",
    value: "$2.4M",
    change: "+12.5%",
    icon: DollarSign,
    positive: true,
  },
  {
    label: "Active Raffles",
    value: "1,247",
    change: "+8.2%",
    icon: Zap,
    positive: true,
  },
  {
    label: "Total Users",
    value: "45.2K",
    change: "+15.7%",
    icon: Users,
    positive: true,
  },
  {
    label: "Success Rate",
    value: "94.8%",
    change: "+2.1%",
    icon: TrendingUp,
    positive: true,
  },
]

export function ChainStats() {
  return (
    <div className="bg-card rounded-xl p-6 floating-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Platform Stats</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
