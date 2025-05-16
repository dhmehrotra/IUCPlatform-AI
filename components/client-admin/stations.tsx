import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Calendar, EyeIcon, PowerOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bot } from "lucide-react"

export function ClientAdminStations() {
  const stations = [
    {
      id: "STN-001",
      location: "Main Parking Lot - Level 1",
      status: "Online",
      usage: "92%",
      lastFault: "None",
      powerOutput: "75 kW",
      health: "Good",
      aiRisk: "stable",
      aiAction: "Auto-optimized schedule",
      aiActionTime: "2h ago",
    },
    {
      id: "STN-002",
      location: "Main Parking Lot - Level 1",
      status: "Online",
      usage: "78%",
      lastFault: "None",
      powerOutput: "75 kW",
      health: "Good",
      aiRisk: "stable",
      aiAction: "Firmware auto-updated",
      aiActionTime: "Yesterday",
    },
    {
      id: "STN-003",
      location: "Visitor Parking - West",
      status: "Online",
      usage: "87%",
      lastFault: "None",
      powerOutput: "150 kW",
      health: "Good",
      aiRisk: "stable",
      aiAction: "Load balanced during peak",
      aiActionTime: "4h ago",
    },
    {
      id: "STN-004",
      location: "Employee Parking - North",
      status: "Offline",
      usage: "0%",
      lastFault: "Communication Error (4h ago)",
      powerOutput: "0 kW",
      health: "Critical",
      aiRisk: "high",
      aiAction: "Auto-diagnostic initiated",
      aiActionTime: "3h ago",
    },
    {
      id: "STN-005",
      location: "Visitor Parking - East",
      status: "Online",
      usage: "81%",
      lastFault: "None",
      powerOutput: "150 kW",
      health: "Good",
      aiRisk: "stable",
      aiAction: "Dynamic pricing applied",
      aiActionTime: "Today",
    },
    {
      id: "STN-006",
      location: "Employee Parking - South",
      status: "Maintenance",
      usage: "0%",
      lastFault: "Scheduled Maintenance",
      powerOutput: "0 kW",
      health: "Warning",
      aiRisk: "monitored",
      aiAction: "Maintenance auto-scheduled",
      aiActionTime: "Yesterday",
    },
    {
      id: "STN-007",
      location: "Executive Parking",
      status: "Online",
      usage: "45%",
      lastFault: "Connector Error (2d ago)",
      powerOutput: "50 kW",
      health: "Warning",
      aiRisk: "monitored",
      aiAction: "Delayed non-critical reboot",
      aiActionTime: "1d ago",
    },
  ]

  const getAIRiskIcon = (risk: string) => {
    switch (risk) {
      case "stable":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "monitored":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <CheckCircle className="h-4 w-4 text-success" />
    }
  }

  const getAIRiskBadge = (risk: string) => {
    switch (risk) {
      case "stable":
        return <Badge className="bg-success/20 text-success border-success/30">✅ Stable</Badge>
      case "monitored":
        return <Badge className="bg-warning/20 text-warning border-warning/30">⚠️ Monitored</Badge>
      case "high":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">🔴 High Risk</Badge>
      default:
        return <Badge className="bg-success/20 text-success border-success/30">✅ Stable</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Charging Stations</h1>
        <Button className="rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Add Station
        </Button>
      </div>

      <div className="rounded-xl border shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Station ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>AI Risk</TableHead>
              <TableHead>Power Output</TableHead>
              <TableHead>Usage %</TableHead>
              <TableHead>Last AI Action</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stations.map((station) => (
              <TableRow key={station.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{station.id}</TableCell>
                <TableCell>{station.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      station.status === "Online" ? "success" : station.status === "Offline" ? "destructive" : "outline"
                    }
                  >
                    {station.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
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
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>{getAIRiskBadge(station.aiRisk)}</div>
                      </TooltipTrigger>
                      <TooltipContent className="p-4 max-w-xs">
                        {station.aiRisk === "high" && (
                          <p className="text-sm">
                            Uptime risk rising due to 3 recent voltage drops. AI set to restart if repeat occurs.
                          </p>
                        )}
                        {station.aiRisk === "monitored" && (
                          <p className="text-sm">
                            Minor anomalies detected. AI is monitoring performance but no immediate action required.
                          </p>
                        )}
                        {station.aiRisk === "stable" && (
                          <p className="text-sm">All parameters within normal range. No issues detected.</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{station.powerOutput}</TableCell>
                <TableCell>{station.usage}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Bot className="h-3 w-3 text-primary" />
                    <span className="text-sm">{station.aiAction}</span>
                    <span className="text-xs text-muted-foreground">({station.aiActionTime})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="View Details">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Disable Station">
                      <PowerOff className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Schedule Maintenance">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
