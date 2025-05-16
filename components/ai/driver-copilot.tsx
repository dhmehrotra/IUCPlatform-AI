"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Clock, DollarSign, Zap, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DriverCopilot() {
  const chargingSessions = [
    {
      date: "May 13",
      station: "Downtown Plaza",
      action: "Charge delayed to 11pm",
      savings: "$0.48",
    },
    {
      date: "May 10",
      station: "Eastside Mall",
      action: "Rerouted from error-prone port",
      savings: "$0.65",
    },
    {
      date: "May 7",
      station: "Westside Corp",
      action: "Optimized charging speed",
      savings: "$0.32",
    },
    {
      date: "May 3",
      station: "Downtown Plaza",
      action: "Charge delayed to off-peak",
      savings: "$0.51",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Updates</h1>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">Last updated: Today, 10:30 AM</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Charging Delayed for Savings</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">3 sessions auto-delayed to off-peak, saving $2.14 total</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <DollarSign className="h-3 w-3" />
              <span>Average 22% cost reduction per session</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Session Health Monitoring</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">1 charger was avoided due to recent connector issues</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <span>Prevented potential charging interruption</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Usage Pattern Detected</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">You typically charge on Tuesdays at 8:30pm — we're optimizing for that</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <span>Your vehicle is always ready by your departure time</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Smart Energy Spend</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">Average cost reduced by 15% from prior month</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <DollarSign className="h-3 w-3" />
              <span>Saved approximately $4.82 this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Smart Charging Sessions</CardTitle>
          <CardDescription>Recent charging sessions optimized by AI</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>AI Action</TableHead>
                <TableHead>Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chargingSessions.map((session, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{session.date}</TableCell>
                  <TableCell>{session.station}</TableCell>
                  <TableCell>{session.action}</TableCell>
                  <TableCell className="text-success font-medium">{session.savings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="rounded-xl">View All Charging History</Button>
      </div>
    </div>
  )
}
