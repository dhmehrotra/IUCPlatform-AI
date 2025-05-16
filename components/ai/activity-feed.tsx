"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AIActivity {
  id: string
  message: string
  timestamp: string
  category: "pricing" | "energy" | "maintenance" | "firmware" | "general"
  impact: "high" | "medium" | "low"
  explanation?: string
}

export function AIActivityFeed() {
  const [activities] = useState<AIActivity[]>([
    {
      id: "act-1",
      message: "AI shifted 62% of energy usage to off-peak times this week",
      timestamp: "Today, 9:15 AM",
      category: "energy",
      impact: "high",
      explanation:
        "By analyzing historical charging patterns and grid demand, the AI automatically scheduled charging sessions during off-peak hours, resulting in cost savings and reduced grid strain.",
    },
    {
      id: "act-2",
      message: "Auto firmware update pushed to 4 chargers overnight",
      timestamp: "Yesterday, 2:30 AM",
      category: "firmware",
      impact: "medium",
      explanation:
        "The AI detected compatible chargers and safely deployed the latest firmware during low-usage hours to minimize disruption.",
    },
    {
      id: "act-3",
      message: "Dynamic pricing adjusted on 3 stations during peak congestion",
      timestamp: "Yesterday, 5:45 PM",
      category: "pricing",
      impact: "high",
      explanation:
        "Based on real-time usage data and historical patterns, prices were temporarily increased to optimize station availability and maximize revenue.",
    },
    {
      id: "act-4",
      message: "Preventative maintenance scheduled for STN-006 based on anomaly detection",
      timestamp: "2 days ago",
      category: "maintenance",
      impact: "medium",
      explanation:
        "The AI detected unusual voltage patterns that indicate potential future failure. A maintenance visit was automatically scheduled during low-usage hours.",
    },
    {
      id: "act-5",
      message: "Charging speed optimized for 8 vehicles to balance grid load",
      timestamp: "3 days ago",
      category: "energy",
      impact: "low",
      explanation:
        "During a period of high grid demand, the AI slightly adjusted charging speeds to reduce overall load while ensuring all vehicles would complete charging by their needed time.",
    },
  ])

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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-success/20 text-success border-success/30"
      case "medium":
        return "bg-primary/20 text-primary border-primary/30"
      case "low":
        return "bg-muted text-muted-foreground border-muted/30"
      default:
        return "bg-muted text-muted-foreground border-muted/30"
    }
  }

  return (
    <Card className="shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-blue-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>AI Activity Feed</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg">
            View All
          </Button>
        </div>
        <CardDescription>Recent actions taken by the AI Copilot</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">{getCategoryIcon(activity.category)}</div>
                <div className="flex-1">
                  <div className="font-medium">{activity.message}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.timestamp}
                    </div>
                    <Badge variant="outline" className={getImpactColor(activity.impact)}>
                      {activity.impact} impact
                    </Badge>
                    {activity.explanation && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Info className="h-3 w-3 mr-1" />
                              Why?
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm p-4">
                            <p>{activity.explanation}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
