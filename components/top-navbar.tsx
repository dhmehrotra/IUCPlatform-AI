"use client"

import Image from "next/image"
import { useState } from "react"
import type { UserRole } from "@/types"
import { ChevronDown, Moon, Sun, User, Bot, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AIUpdatesContainer } from "./ai/ai-updates-container"

interface TopNavbarProps {
  role: UserRole
  onRoleChange: (role: UserRole) => void
}

export function TopNavbar({ role, onRoleChange }: TopNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAICopilot, setShowAICopilot] = useState(false)
  const searchParams = useSearchParams()
  const persona = (searchParams.get("persona") as UserRole) || "client-admin"

  const roleLabels = {
    "client-admin": "Client Admin",
    "iuc-ops": "IUC Ops",
    driver: "Driver View",
  }

  const roleColors = {
    "client-admin": "bg-blue-100 text-blue-800",
    "iuc-ops": "bg-purple-100 text-purple-800",
    driver: "bg-green-100 text-green-800",
  }

  const getAINotificationCount = () => {
    switch (persona) {
      case "client-admin":
        return 5
      case "iuc-ops":
        return 8
      case "driver":
        return 3
      default:
        return 0
    }
  }

  const getAIPreviewItems = () => {
    switch (persona) {
      case "client-admin":
        return [
          {
            message: "AI increased peak-hour pricing by $0.04/kWh across 3 sites",
            timestamp: "Today, 9:15 AM",
          },
          {
            message: "62% of energy consumption was auto-shifted to nighttime",
            timestamp: "Yesterday, 2:30 PM",
          },
          {
            message: "4 low-priority firmware updates auto-scheduled overnight",
            timestamp: "Yesterday, 11:45 PM",
          },
        ]
      case "iuc-ops":
        return [
          {
            message: "AI rebooted 3 chargers after detecting voltage anomalies",
            timestamp: "Today, 2:13 AM",
          },
          {
            message: "5 stations flagged as 'At Risk' due to error patterns",
            timestamp: "Yesterday, 8:45 PM",
          },
          {
            message: "AI completed 9 silent firmware updates last week",
            timestamp: "2 days ago",
          },
        ]
      case "driver":
        return [
          {
            message: "3 sessions auto-delayed to off-peak, saving $2.14 total",
            timestamp: "Today, 10:30 AM",
          },
          {
            message: "1 charger was avoided due to recent connector issues",
            timestamp: "Yesterday, 8:15 PM",
          },
          {
            message: "Average cost reduced by 15% from prior month",
            timestamp: "3 days ago",
          },
        ]
      default:
        return []
    }
  }

  const toggleDarkMode = () => {
    // In a real implementation, this would toggle dark mode
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Image
            src="/images/iuc-logo-blue.png"
            alt="IUC Platform Logo"
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </div>
        <div className="flex items-center space-x-4">
          {persona !== "driver" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 pl-3 pr-2 transition-all hover:border-primary"
                  onClick={() => setShowAICopilot(true)}
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span>AI Updates</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                      {getAINotificationCount()}
                    </Badge>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="bg-primary text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <h3 className="font-medium">AI Activity</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-white hover:text-white hover:bg-white/20"
                    onClick={() => setShowAICopilot(true)}
                  >
                    View All
                  </Button>
                </div>
                <div className="p-3 max-h-[300px] overflow-y-auto">
                  <div className="space-y-2">
                    {getAIPreviewItems().map((item, index) => (
                      <div key={index} className="p-2 hover:bg-gray-50 rounded-lg">
                        <p className="text-sm">{item.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-2 pl-3 pr-2 transition-all hover:border-primary"
              >
                <div className={`h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white`}>
                  <User size={16} />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${roleColors[role]}`}>{roleLabels[role]}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuItem onClick={() => onRoleChange("client-admin")} className="rounded-lg p-2 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                    <User size={16} />
                  </div>
                  <span>Client Admin</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange("iuc-ops")} className="rounded-lg p-2 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                    <User size={16} />
                  </div>
                  <span>IUC Ops</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange("driver")} className="rounded-lg p-2 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                    <User size={16} />
                  </div>
                  <span>Driver View</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* AI Copilot Dialog */}
      <Dialog open={showAICopilot} onOpenChange={setShowAICopilot}>
        <DialogContent className="max-w-4xl p-0 rounded-xl">
          <DialogHeader className="bg-primary text-white p-4 rounded-t-xl">
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Updates
            </DialogTitle>
          </DialogHeader>
          <AIUpdatesContainer />
        </DialogContent>
      </Dialog>
    </header>
  )
}
