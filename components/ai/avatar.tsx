"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import type { UserRole } from "@/types"

interface AIChange {
  id: string
  action: string
  reason: string
  timestamp: string
  category: "pricing" | "energy" | "maintenance" | "firmware" | "general"
}

export function AIAvatar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const searchParams = useSearchParams()
  const persona = (searchParams.get("persona") as UserRole) || "client-admin"

  const getRecentChanges = () => {
    switch (persona) {
      case "client-admin":
        return [
          {
            id: "change-1",
            action: "Adjusted peak pricing to $0.29/kWh",
            reason: "High demand detected at Downtown Plaza between 4-6 PM",
            timestamp: "Today, 3:15 PM",
            category: "pricing",
          },
          {
            id: "change-2",
            action: "Scheduled maintenance for STN-006",
            reason: "Detected unusual voltage fluctuations in connector 2",
            timestamp: "Yesterday, 8:30 PM",
            category: "maintenance",
          },
          {
            id: "change-3",
            action: "Shifted 8 charging sessions to off-peak hours",
            reason: "Grid demand forecast showed potential strain",
            timestamp: "Yesterday, 5:45 PM",
            category: "energy",
          },
        ]
      case "iuc-ops":
        return [
          {
            id: "change-1",
            action: "Auto-rebooted STN-004",
            reason: "Detected communication error pattern that typically resolves with restart",
            timestamp: "Today, 2:13 AM",
            category: "maintenance",
          },
          {
            id: "change-2",
            action: "Pushed firmware update to 4 stations",
            reason: "Security patch required immediate deployment",
            timestamp: "Yesterday, 1:30 AM",
            category: "firmware",
          },
          {
            id: "change-3",
            action: "Flagged STN-006 for inspection",
            reason: "Anomalous power fluctuations detected in connector",
            timestamp: "Yesterday, 4:45 PM",
            category: "maintenance",
          },
        ]
      case "driver":
        return [
          {
            id: "change-1",
            action: "Delayed charging to 11:00 PM",
            reason: "Off-peak rates start at 10:00 PM, saving you $0.48",
            timestamp: "Today, 6:15 PM",
            category: "energy",
          },
          {
            id: "change-2",
            action: "Recommended Downtown Plaza station",
            reason: "Eastside Mall station has recent connector issues",
            timestamp: "Yesterday, 2:30 PM",
            category: "maintenance",
          },
          {
            id: "change-3",
            action: "Optimized charging speed",
            reason: "Balanced charging speed to reduce costs while ensuring full charge by morning",
            timestamp: "3 days ago",
            category: "energy",
          },
        ]
      default:
        return []
    }
  }

  const recentChanges = getRecentChanges()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pricing":
        return "💰"
      case "energy":
        return "⚡"
      case "maintenance":
        return "🔧"
      case "firmware":
        return "🔄"
      default:
        return "🤖"
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={`h-14 w-14 rounded-full shadow-lg ${isExpanded ? "bg-primary/90" : "bg-primary"} hover:bg-primary/90 transition-all duration-300`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 rounded-xl shadow-xl" align="end">
          <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-medium">AI Updates</h3>
            </div>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              {recentChanges.length} recent actions
            </Badge>
          </div>
          <div className="p-4 max-h-[300px] overflow-y-auto">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent AI-driven changes</h4>
            <div className="space-y-3">
              {recentChanges.map((change) => (
                <div key={change.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex gap-2">
                    <div className="text-xl">{getCategoryIcon(change.category)}</div>
                    <div>
                      <p className="font-medium text-sm">{change.action}</p>
                      <div className="mt-1 text-xs text-muted-foreground">{change.timestamp}</div>
                      <Separator className="my-2" />
                      <div className="flex items-start gap-1">
                        <span className="font-medium text-xs">Why:</span>
                        <p className="text-xs text-muted-foreground">{change.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-b-xl border-t">
            <Button variant="outline" size="sm" className="w-full rounded-lg">
              View All AI Updates
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
