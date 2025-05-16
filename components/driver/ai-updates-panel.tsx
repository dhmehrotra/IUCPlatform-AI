"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Info, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface AIUpdatesPanelProps {
  stationId: string
  location: string
}

export function AIUpdatesPanel({ stationId, location }: AIUpdatesPanelProps) {
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "system"; content: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const aiUpdates = [
    {
      id: 1,
      message: "Charging auto-scheduled for 11:00 PM off-peak window",
      icon: "⏱️",
      explanation:
        "Off-peak rates start at 10:00 PM. By delaying your charge, you'll save approximately $0.42 based on your vehicle's battery capacity.",
    },
    {
      id: 2,
      message: "You saved $0.42 by avoiding peak hours",
      icon: "💰",
      explanation:
        "Peak hours at this location are 4:00 PM - 10:00 PM with rates at $0.29/kWh. Off-peak rates are $0.15/kWh, saving you $0.14/kWh.",
    },
    {
      id: 3,
      message: "Next time, we'll suggest the Downtown Garage – 3% faster charge rate",
      icon: "⚡",
      explanation:
        "Downtown Garage chargers have been upgraded to 150kW with more consistent power delivery, resulting in slightly faster charging times for your vehicle model.",
    },
  ]

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message to chat history
    const userMessage = chatInput.trim()
    setChatHistory([...chatHistory, { role: "user", content: userMessage }])
    setChatInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      if (userMessage.toLowerCase().includes("start") && userMessage.toLowerCase().includes("immediately")) {
        response = "Got it — we'll start charging right away from now on."
      } else if (userMessage.toLowerCase().includes("remind") && userMessage.toLowerCase().includes("delayed")) {
        response = "I'll send you a notification if your charging session will be delayed for any reason."
      } else if (userMessage.toLowerCase().includes("turn off") && userMessage.toLowerCase().includes("scheduling")) {
        response = "AI scheduling has been turned off. Your charging will start immediately when you plug in."
      } else {
        response = "I understand. I've updated your preferences based on your request."
      }

      setChatHistory([...chatHistory, { role: "user", content: userMessage }, { role: "system", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="shadow-md rounded-xl overflow-hidden h-full flex flex-col">
      <CardHeader className="bg-blue-50/50 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI Updates</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-auto flex flex-col">
        <div className="space-y-3 mb-4">
          {aiUpdates.map((update) => (
            <div key={update.id} className="bg-blue-50/30 rounded-lg p-3">
              <div className="flex gap-2">
                <div className="text-xl mt-0.5">{update.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm">{update.message}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 rounded-full">
                            <Info className="h-3 w-3 text-muted-foreground" />
                            <span className="sr-only">Why?</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs p-3">
                          <p className="text-sm">{update.explanation}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="flex-1 overflow-auto mb-3">
          <div className="space-y-3">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <form onSubmit={handleChatSubmit} className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Adjust settings or ask a question"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="rounded-lg"
              />
              <Button type="submit" size="icon" className="rounded-lg">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              You can ask anything like "Why was my charge delayed?" or "Start earlier next time"
            </p>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
