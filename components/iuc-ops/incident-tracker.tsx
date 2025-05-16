"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function IUCOpsIncidentTracker() {
  const [activeTab, setActiveTab] = useState("all")

  const incidents = [
    {
      id: "INC-1042",
      description: "Communication failure with charging station",
      priority: "High",
      site: "Westside Corporate Park",
      station: "STN-004",
      status: "Open",
      assignedTo: "Alex Johnson",
      created: "Today, 10:23 AM",
      type: "connection",
      emoji: "📡",
    },
    {
      id: "INC-1041",
      description: "Payment processing error",
      priority: "Medium",
      site: "Downtown Plaza",
      station: "STN-006",
      status: "In Progress",
      assignedTo: "Maria Garcia",
      created: "Today, 9:15 AM",
      type: "payment",
      emoji: "💳",
    },
    {
      id: "INC-1040",
      description: "Connector lock malfunction",
      priority: "Medium",
      site: "Eastside Mall",
      station: "STN-008",
      status: "In Progress",
      assignedTo: "James Wilson",
      created: "Yesterday, 4:30 PM",
      type: "hardware",
      emoji: "🔌",
    },
    {
      id: "INC-1039",
      description: "Display screen not responding",
      priority: "Low",
      site: "Downtown Plaza",
      station: "STN-005",
      status: "Resolved",
      assignedTo: "Sarah Chen",
      created: "Yesterday, 2:45 PM",
      type: "hardware",
      emoji: "🖥️",
    },
    {
      id: "INC-1038",
      description: "Overheating during fast charging",
      priority: "High",
      site: "Westside Corporate Park",
      station: "STN-002",
      status: "Resolved",
      assignedTo: "Alex Johnson",
      created: "2 days ago",
      type: "hardware",
      emoji: "🔥",
    },
    {
      id: "INC-1037",
      description: "Network connectivity intermittent",
      priority: "Medium",
      site: "Eastside Mall",
      station: "STN-007",
      status: "Resolved",
      assignedTo: "Maria Garcia",
      created: "2 days ago",
      type: "connection",
      emoji: "📡",
    },
  ]

  const filteredIncidents =
    activeTab === "all"
      ? incidents
      : incidents.filter((incident) => {
          if (activeTab === "open") return incident.status === "Open"
          if (activeTab === "critical") return incident.priority === "High"
          if (activeTab === "resolved") return incident.status === "Resolved"
          return true
        })

  const technicians = ["Alex Johnson", "Maria Garcia", "James Wilson", "Sarah Chen", "David Kim", "Lisa Patel"]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Incident Tracker</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Incident
          </Button>
        </div>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Active Incidents</CardTitle>
          <Tabs defaultValue="all" className="mt-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id} className="transition-colors hover:bg-gray-50">
                  <TableCell className="font-medium text-primary">{incident.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg" role="img" aria-label={incident.type}>
                        {incident.emoji}
                      </span>
                      <span>{incident.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        incident.priority === "High"
                          ? "bg-destructive/20 text-destructive border-destructive/30"
                          : incident.priority === "Medium"
                            ? "bg-warning/20 text-warning border-warning/30"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                      }
                    >
                      {incident.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.site}</TableCell>
                  <TableCell>{incident.station}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        incident.status === "Open"
                          ? "bg-destructive/20 text-destructive border-destructive/30"
                          : incident.status === "In Progress"
                            ? "bg-warning/20 text-warning border-warning/30"
                            : "bg-success/20 text-success border-success/30"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {incident.assignedTo
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                      <span>{incident.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>{incident.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={incident.assignedTo}>
                        <SelectTrigger className="w-[140px] h-8 text-xs rounded-lg">
                          <SelectValue placeholder="Assign Technician" />
                        </SelectTrigger>
                        <SelectContent>
                          {technicians.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                              {tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
