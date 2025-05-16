"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Zap, DollarSign, Activity, TrendingUp, Bot, ArrowUpRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIActivityFeed } from "@/components/ai/activity-feed"

// Animation utility for counting up numbers
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(percentage * target))

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

export function ClientAdminDashboard() {
  const sessionsCount = useCountUp(112)
  const energyCount = useCountUp(1290)
  const revenueCount = useCountUp(964)
  const uptimeCount = useCountUp(98.5, 1500)
  const activeChargersCount = useCountUp(18)
  const todaySessionsCount = useCountUp(32)
  const todayRevenueCount = useCountUp(187)

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would be replaced with a real chart library in production
    if (chartRef.current) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      svg.setAttribute("viewBox", "0 0 800 300")
      svg.setAttribute("preserveAspectRatio", "none")

      // Create gradient
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient.setAttribute("id", "areaGradient")
      gradient.setAttribute("x1", "0%")
      gradient.setAttribute("y1", "0%")
      gradient.setAttribute("x2", "0%")
      gradient.setAttribute("y2", "100%")

      const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop1.setAttribute("offset", "0%")
      stop1.setAttribute("stop-color", "#1E5EFF")
      stop1.setAttribute("stop-opacity", "0.7")

      const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop2.setAttribute("offset", "100%")
      stop2.setAttribute("stop-color", "#1E5EFF")
      stop2.setAttribute("stop-opacity", "0.1")

      gradient.appendChild(stop1)
      gradient.appendChild(stop2)
      defs.appendChild(gradient)
      svg.appendChild(defs)

      // Create path for area chart
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute(
        "d",
        "M0,300 L0,150 C100,100 200,200 300,150 C400,100 500,50 600,100 C700,150 800,50 800,100 L800,300 Z",
      )
      path.setAttribute("class", "area-chart-gradient")
      path.setAttribute("stroke", "#1E5EFF")
      path.setAttribute("stroke-width", "2")

      // Create line for the top of the area
      const line = document.createElementNS("http://www.w3.org/2000/svg", "path")
      line.setAttribute("d", "M0,150 C100,100 200,200 300,150 C400,100 500,50 600,100 C700,150 800,50 800,100")
      line.setAttribute("fill", "none")
      line.setAttribute("stroke", "#1E5EFF")
      line.setAttribute("stroke-width", "3")

      svg.appendChild(path)
      svg.appendChild(line)

      // Add dots for data points
      const dataPoints = [
        { x: 0, y: 150 },
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 150 },
        { x: 400, y: 100 },
        { x: 500, y: 50 },
        { x: 600, y: 100 },
        { x: 700, y: 150 },
        { x: 800, y: 50 },
      ]

      dataPoints.forEach((point) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", point.x.toString())
        circle.setAttribute("cy", point.y.toString())
        circle.setAttribute("r", "4")
        circle.setAttribute("fill", "#1E5EFF")
        svg.appendChild(circle)
      })

      chartRef.current.innerHTML = ""
      chartRef.current.appendChild(svg)
    }
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Client Admin Dashboard</h1>

      {/* System Status Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-medium mb-4">Real-Time System Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50">
            <div className="bg-blue-100 p-2 rounded-full">
              <Battery className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">Sessions Today</p>
                <Badge className="bg-success/20 text-success border-success/30 text-xs">+6%</Badge>
              </div>
              <div className="flex items-center">
                <p className="text-xl font-bold">{todaySessionsCount}</p>
                <span className="text-xs text-success ml-2">41% auto-shifted to night hours</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50">
            <div className="bg-green-100 p-2 rounded-full">
              <Zap className="h-6 w-6 text-success" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">Active Chargers</p>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">AI Optimized</Badge>
              </div>
              <p className="text-xl font-bold">{activeChargersCount}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 rounded-lg bg-amber-50">
            <div className="bg-amber-100 p-2 rounded-full">
              <DollarSign className="h-6 w-6 text-warning" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">Revenue Today</p>
              </div>
              <div className="flex items-center">
                <p className="text-xl font-bold">${todayRevenueCount}</p>
                <span className="text-xs text-success ml-2">boosted by AI peak pricing</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6E6E6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1E5EFF"
                  strokeWidth="3"
                  strokeDasharray={`${uptimeCount}, 100`}
                  strokeLinecap="round"
                />
                <text x="18" y="20.5" textAnchor="middle" fontSize="10" fill="#1E5EFF" fontWeight="bold">
                  {uptimeCount}%
                </text>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">Uptime</p>
                <Badge className="bg-success/20 text-success border-success/30 text-xs">AI Monitored</Badge>
              </div>
              <p className="text-xl font-bold">{uptimeCount}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50/50">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <Battery className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{sessionsCount}</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-success" />
              <p className="text-xs text-success">+12% from last week</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <Bot className="mr-1 h-3 w-3 text-primary" />
              <span>41% auto-shifted to night hours</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-yellow-50/50">
            <CardTitle className="text-sm font-medium">Energy Delivered</CardTitle>
            <Zap className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{energyCount} kWh</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-success" />
              <p className="text-xs text-success">+8% from last week</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <Bot className="mr-1 h-3 w-3 text-primary" />
              <span>Optimized for 22% lower grid impact</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-50/50">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">${revenueCount.toFixed(2)}</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-success" />
              <p className="text-xs text-success">+5% from last week</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <Bot className="mr-1 h-3 w-3 text-primary" />
              <span>Boosted by AI peak pricing in 3 locations</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-purple-50/50">
            <CardTitle className="text-sm font-medium">Station Uptime</CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{uptimeCount.toFixed(1)}%</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-success" />
              <p className="text-xs text-success">+0.5% from last month</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <Bot className="mr-1 h-3 w-3 text-primary" />
              <span>2 potential failures prevented this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Weekly Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] rounded-md" ref={chartRef}>
              {/* Chart will be rendered here */}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>AI Actions This Week</CardTitle>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Bot className="mr-1 h-3 w-3" />
              12 actions
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Dynamic pricing adjusted",
                  details: "Increased rates during peak hours at Downtown Plaza",
                  time: "Today, 2:15 PM",
                  icon: "💰",
                },
                {
                  action: "Load balancing optimized",
                  details: "Redistributed power across 8 vehicles to reduce grid strain",
                  time: "Yesterday, 6:30 PM",
                  icon: "⚡",
                },
                {
                  action: "Maintenance scheduled",
                  details: "Detected anomaly in STN-006 connector",
                  time: "2 days ago",
                  icon: "🔧",
                },
                {
                  action: "Firmware update pushed",
                  details: "Updated 4 chargers to v2.5.1 during off-hours",
                  time: "3 days ago",
                  icon: "🔄",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{item.action}</div>
                    <div className="text-sm text-muted-foreground">{item.details}</div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full rounded-lg">
                View All AI Actions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIActivityFeed />
    </div>
  )
}
