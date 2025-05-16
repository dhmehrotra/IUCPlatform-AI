"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Filter, MapPin, RotateCw, Download, Lock } from "lucide-react"

export function IUCOpsNetworkMonitor() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const stations = [
    {
      id: "STN-001",
      location: "Westside Corporate Park",
      health: "Good",
      status: "Online",
      lastPing: "2 min ago",
      model: "IUC-75kW",
      firmware: "v2.4.1",
      sessions: 12,
      uptime: 99.8,
      powerOutput: "75 kW",
    },
    {
      id: "STN-002",
      location: "Westside Corporate Park",
      health: "Good",
      status: "Online",
      lastPing: "1 min ago",
      model: "IUC-75kW",
      firmware: "v2.4.1",
      sessions: 8,
      uptime: 99.5,
      powerOutput: "75 kW",
    },
    {
      id: "STN-003",
      location: "Westside Corporate Park",
      health: "Good",
      status: "Online",
      lastPing: "Just now",
      model: "IUC-75kW",
      firmware: "v2.4.1",
      sessions: 15,
      uptime: 100,
      powerOutput: "75 kW",
    },
    {
      id: "STN-004",
      location: "Westside Corporate Park",
      health: "Critical",
      status: "Offline",
      lastPing: "4h ago",
      model: "IUC-75kW",
      firmware: "v2.4.0",
      sessions: 0,
      uptime: 85.2,
      powerOutput: "0 kW",
    },
    {
      id: "STN-005",
      location: "Downtown Plaza",
      health: "Good",
      status: "Online",
      lastPing: "5 min ago",
      model: "IUC-150kW",
      firmware: "v2.4.1",
      sessions: 22,
      uptime: 99.9,
      powerOutput: "150 kW",
    },
    {
      id: "STN-006",
      location: "Downtown Plaza",
      health: "Warning",
      status: "Online",
      lastPing: "3 min ago",
      model: "IUC-150kW",
      firmware: "v2.4.1",
      sessions: 10,
      uptime: 97.3,
      powerOutput: "120 kW",
    },
    {
      id: "STN-007",
      location: "Eastside Mall",
      health: "Good",
      status: "Online",
      lastPing: "Just now",
      model: "IUC-50kW",
      firmware: "v2.4.1",
      sessions: 7,
      uptime: 99.7,
      powerOutput: "50 kW",
    },
    {
      id: "STN-008",
      location: "Eastside Mall",
      health: "Warning",
      status: "Maintenance",
      lastPing: "10 min ago",
      model: "IUC-50kW",
      firmware: "v2.3.9",
      sessions: 0,
      uptime: 92.1,
      powerOutput: "0 kW",
    },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Network Monitor</h1>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Network Map</CardTitle>
              <CardDescription>Interactive map of all charging stations in the network</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                <span className="status-dot-success"></span>
                Online: 6
              </Badge>
              <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                <span className="status-dot-warning"></span>
                Warning: 1
              </Badge>
              <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
                <span className="status-dot-error"></span>
                Offline: 1
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-09%2012.58.35%20AM-K8f3zWBULg7CcrtZzF4GnGcdSJ1Wfw.png"
              alt="Map of United States showing charging station locations with blue markers"
              className="w-full h-[400px] object-cover"
            />

            {/* Animated pins for stations */}
            <div className="absolute left-[13%] top-[68%]">
              <MapPin className="h-6 w-6 text-destructive animate-pulse-slow" />
            </div>
            <div className="absolute left-[35%] top-[45%]">
              <MapPin className="h-6 w-6 text-warning animate-pulse-slow" />
            </div>
            <div className="absolute left-[65%] top-[35%]">
              <MapPin className="h-6 w-6 text-success" />
            </div>
            <div className="absolute left-[80%] top-[55%]">
              <MapPin className="h-6 w-6 text-success" />
            </div>

            <p className="text-muted-foreground text-center py-2 text-xs">Interactive map placeholder</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Charging Stations</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Station ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("health")}>
                  Health
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  Status
                </TableHead>
                <TableHead>Sessions (24h)</TableHead>
                <TableHead>Uptime %</TableHead>
                <TableHead>Power Output</TableHead>
                <TableHead>Last Ping</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id} className="transition-colors hover:bg-gray-50">
                  <TableCell className="font-medium text-primary">{station.id}</TableCell>
                  <TableCell>{station.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        station.health === "Good"
                          ? "bg-success/20 text-success border-success/30"
                          : station.health === "Warning"
                            ? "bg-warning/20 text-warning border-warning/30"
                            : "bg-destructive/20 text-destructive border-destructive/30"
                      }
                    >
                      <span
                        className={
                          station.health === "Good"
                            ? "status-dot-success"
                            : station.health === "Warning"
                              ? "status-dot-warning"
                              : "status-dot-error"
                        }
                      ></span>
                      {station.health}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        station.status === "Online"
                          ? "bg-success/20 text-success border-success/30"
                          : station.status === "Offline"
                            ? "bg-destructive/20 text-destructive border-destructive/30"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                      }
                    >
                      {station.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{station.sessions}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className={`h-full rounded-full ${
                            station.uptime > 98 ? "bg-success" : station.uptime > 95 ? "bg-warning" : "bg-destructive"
                          }`}
                          style={{ width: `${station.uptime}%` }}
                        ></div>
                      </div>
                      <span>{station.uptime}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{station.powerOutput}</TableCell>
                  <TableCell>{station.lastPing}</TableCell>
                  <TableCell>{station.firmware}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Restart Station">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Push Firmware">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Lock Port">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
