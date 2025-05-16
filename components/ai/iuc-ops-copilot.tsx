"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, AlertTriangle, RefreshCw, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function IUCOpsCopilot() {
  const incidents = [
    {
      id: "INC-982",
      station: "STN-004",
      action: "Auto reboot",
      time: "2:13 AM",
      status: "Resolved",
    },
    {
      id: "INC-975",
      station: "STN-006",
      action: "Locked charger temporarily",
      time: "4:30 AM",
      status: "Active",
    },
    {
      id: "INC-968",
      station: "STN-002",
      action: "Adjusted power output",
      time: "Yesterday",
      status: "Resolved",
    },
    {
      id: "INC-964",
      station: "STN-007",
      action: "Firmware rollback",
      time: "2 days ago",
      status: "Resolved",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Ops Activity Log</h1>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">Last updated: Today, 8:45 AM</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Self-Healing Events</CardTitle>
              <RefreshCw className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">AI rebooted 3 chargers after detecting voltage anomalies</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <span>100% success rate on auto-recovery</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Risk Monitoring</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">5 stations flagged as 'At Risk' due to error pattern clustering</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-warning">
              <span>2 stations require manual inspection</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Firmware Pushes</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">AI completed 9 silent firmware updates last week</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <span>All updates completed during off-peak hours</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="bg-blue-50/50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Diagnostic Insights</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">AI recommended deeper inspection on STN-004</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <span>Potential hardware failure predicted within 14 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Incident History</CardTitle>
          <CardDescription>Recent incidents automatically handled by AI</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Action Taken by AI</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.station}</TableCell>
                  <TableCell>{incident.action}</TableCell>
                  <TableCell>{incident.time}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        incident.status === "Resolved"
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="rounded-xl">View All Incidents</Button>
      </div>
    </div>
  )
}
