"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Clock, DollarSign, Zap, Calendar, CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

export function ClientAdminAIUpdates() {
  const [chatInput, setChatInput] = useState("")
  const [chatResponse, setChatResponse] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const aiActions = [
    {
      type: "Price Adjusted",
      site: "Westside Corp",
      date: "May 10",
      status: "Completed",
    },
    {
      type: "Charger Restarted",
      site: "Downtown Plaza",
      date: "May 9",
      status: "Completed",
    },
    {
      type: "Firmware Updated",
      site: "STN-005",
      date: "May 8",
      status: "Queued",
    },
    {
      type: "Load Balanced",
      site: "Executive Parking",
      date: "May 7",
      status: "Completed",
    },
    {
      type: "Price Adjusted",
      site: "Eastside Mall",
      date: "May 6",
      status: "Completed",
    },
  ]

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Store the user input
    const userInput = chatInput.trim()
    setChatInput("")
    setIsTyping(true)
    setChatResponse(null)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      if (userInput.toLowerCase().includes("pause") && userInput.toLowerCase().includes("firmware")) {
        response = "Understood — AI will skip firmware updates on weekends going forward."
      } else if (userInput.toLowerCase().includes("pricing") && userInput.toLowerCase().includes("westside")) {
        response =
          "Pricing at Westside was adjusted due to increased demand during peak hours (4-7 PM). This optimization is projected to increase revenue by 8.2%."
      } else if (userInput.toLowerCase().includes("optimize")) {
        response =
          "I'll optimize your charging stations for maximum revenue while maintaining high customer satisfaction."
      } else {
        response = "I've noted your request and will adjust my behavior accordingly."
      }

      setChatResponse(response)
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Summary for Site Hosts</h1>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">Last updated: Today, 9:15 AM</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pricing Optimization</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">AI increased peak-hour pricing by $0.04/kWh across 3 sites last week</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>Revenue increased by 8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Off-Peak Shift</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">62% of energy consumption was auto-shifted to nighttime charging windows</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>9.5% improvement from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">Average energy cost reduced by 11% this month</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <DollarSign className="h-3 w-3" />
              <span>Saved approximately $342 in energy costs</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Auto-Maintenance</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">4 low-priority firmware updates auto-scheduled overnight</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3" />
              <span>Zero customer impact during updates</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Recent AI Actions</CardTitle>
          <CardDescription>Automated actions taken by the AI across your sites</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action Type</TableHead>
                <TableHead>Affected Site</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiActions.map((action, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{action.type}</TableCell>
                  <TableCell>{action.site}</TableCell>
                  <TableCell>{action.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        action.status === "Completed"
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {action.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Adjust AI behavior or ask a question</CardTitle>
          <CardDescription>Communicate directly with the AI to customize its behavior</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleChatSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Pause firmware updates on weekends or Why did pricing change at Westside?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="rounded-md"
              />
              <Button type="submit" size="sm" className="rounded-md">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Try asking about recent actions or telling the system how to behave.
            </p>

            {(isTyping || chatResponse) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Response:</span>
                </div>
                {isTyping ? (
                  <div className="flex items-center gap-1 ml-6">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                ) : (
                  <p className="text-sm ml-6">{chatResponse}</p>
                )}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="rounded-xl">View All AI Activity</Button>
      </div>
    </div>
  )
}

// Import missing TrendingUp component
import { TrendingUp } from "lucide-react"
