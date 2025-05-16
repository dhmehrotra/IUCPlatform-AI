"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Terminal, RefreshCw, Lock, Settings, CheckCircle, XCircle, Clock, ToggleLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function IUCOpsRemoteActions() {
  const [selectedStation, setSelectedStation] = useState<string>("")
  const [selectedAction, setSelectedAction] = useState<string>("")
  const [actionStatus, setActionStatus] = useState<{
    status: "idle" | "success" | "error"
    message: string
  }>({
    status: "idle",
    message: "",
  })

  const handleExecuteAction = () => {
    if (!selectedStation || !selectedAction) {
      setActionStatus({
        status: "error",
        message: "Please select both a station and an action to execute.",
      })
      return
    }

    // Simulate action execution
    setActionStatus({
      status: "success",
      message: `Successfully executed ${selectedAction} on ${selectedStation}.`,
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Remote Actions</h1>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Execute Remote Command</CardTitle>
          <CardDescription>Select a station and command to execute remotely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="station" className="text-base">
              Charging Station
            </Label>
            <Select value={selectedStation} onValueChange={setSelectedStation}>
              <SelectTrigger id="station" className="h-12 rounded-xl">
                <SelectValue placeholder="Select station" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="STN-001">STN-001 (Westside Corporate Park)</SelectItem>
                <SelectItem value="STN-002">STN-002 (Westside Corporate Park)</SelectItem>
                <SelectItem value="STN-003">STN-003 (Westside Corporate Park)</SelectItem>
                <SelectItem value="STN-004">STN-004 (Westside Corporate Park)</SelectItem>
                <SelectItem value="STN-005">STN-005 (Downtown Plaza)</SelectItem>
                <SelectItem value="STN-006">STN-006 (Downtown Plaza)</SelectItem>
                <SelectItem value="STN-007">STN-007 (Eastside Mall)</SelectItem>
                <SelectItem value="STN-008">STN-008 (Eastside Mall)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="actions" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="actions">Common Actions</TabsTrigger>
              <TabsTrigger value="firmware">Firmware</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="actions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("reboot")}
                  disabled={!selectedStation}
                >
                  <RefreshCw className="h-8 w-8 text-primary" />
                  <span>Restart Station</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("lock-connector")}
                  disabled={!selectedStation}
                >
                  <Lock className="h-8 w-8 text-warning" />
                  <span>Lock Connector</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("toggle-mode")}
                  disabled={!selectedStation}
                >
                  <ToggleLeft className="h-8 w-8 text-success" />
                  <span>Toggle Public/Private</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="firmware" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("push-firmware")}
                  disabled={!selectedStation}
                >
                  <Settings className="h-8 w-8 text-primary" />
                  <span>Push Firmware</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("diagnostics")}
                  disabled={!selectedStation}
                >
                  <Terminal className="h-8 w-8 text-destructive" />
                  <span>Run Diagnostics</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("push-config")}
                  disabled={!selectedStation}
                >
                  <Settings className="h-8 w-8 text-primary" />
                  <span>Push Configuration</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  onClick={() => setSelectedAction("reset-settings")}
                  disabled={!selectedStation}
                >
                  <RefreshCw className="h-8 w-8 text-warning" />
                  <span>Reset Settings</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base">
              Notes (Optional)
            </Label>
            <Textarea id="notes" placeholder="Add any notes about this action" className="min-h-[120px] rounded-xl" />
          </div>

          {actionStatus.status !== "idle" && (
            <Alert
              variant={actionStatus.status === "success" ? "default" : "destructive"}
              className={
                actionStatus.status === "success"
                  ? "bg-success/20 text-success border-success/30"
                  : "bg-destructive/20 text-destructive border-destructive/30"
              }
            >
              {actionStatus.status === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <AlertTitle>{actionStatus.status === "success" ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{actionStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button onClick={handleExecuteAction} className="rounded-xl h-12 w-full" size="lg">
            Execute Action
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Recent Actions</CardTitle>
          <CardDescription>History of recently executed remote actions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[
              {
                action: "Reboot Station",
                station: "STN-004",
                user: "Alex Johnson",
                timestamp: "Today, 11:42 AM",
                status: "Success",
              },
              {
                action: "Push Configuration",
                station: "STN-006",
                user: "Maria Garcia",
                timestamp: "Today, 10:15 AM",
                status: "Success",
              },
              {
                action: "Run Diagnostics",
                station: "STN-008",
                user: "James Wilson",
                timestamp: "Yesterday, 3:30 PM",
                status: "Failed",
              },
            ].map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-l-4 pl-4 py-4 rounded-r-lg transition-all hover:bg-gray-50"
                style={{
                  borderLeftColor: action.status === "Success" ? "var(--success)" : "var(--destructive)",
                }}
              >
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {action.action === "Reboot Station" && <RefreshCw className="h-4 w-4 text-primary" />}
                    {action.action === "Push Configuration" && <Settings className="h-4 w-4 text-primary" />}
                    {action.action === "Run Diagnostics" && <Terminal className="h-4 w-4 text-destructive" />}
                    {action.action}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="font-medium text-primary">{action.station}</span>
                    <span>•</span>
                    <span>{action.user}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={
                      action.status === "Success"
                        ? "text-success flex items-center gap-1"
                        : "text-destructive flex items-center gap-1"
                    }
                  >
                    {action.status === "Success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {action.status}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                    <Clock className="h-3 w-3" />
                    {action.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
