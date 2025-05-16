"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bot, AlertTriangle, Clock, Zap, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function AIPreferences() {
  const [preferences, setPreferences] = useState({
    smartPricing: true,
    nightCharging: true,
    firmwareAutopatch: false,
    explainActions: true,
    alertHighRisk: true,
    voiceCommands: false,
    predictiveMaintenance: true,
  })

  const handleToggle = (preference: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }))
  }

  return (
    <Card className="shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-blue-50/50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>AI Preferences</CardTitle>
        </div>
        <CardDescription>Configure how the AI Copilot works for you</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Automation Settings</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="smartPricing" className="font-medium">
                    Enable Smart Pricing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to dynamically adjust pricing based on demand
                  </p>
                </div>
              </div>
              <Switch
                id="smartPricing"
                checked={preferences.smartPricing}
                onCheckedChange={() => handleToggle("smartPricing")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="nightCharging" className="font-medium">
                    Enable Night Charging
                  </Label>
                  <p className="text-sm text-muted-foreground">Optimize charging schedules for off-peak hours</p>
                </div>
              </div>
              <Switch
                id="nightCharging"
                checked={preferences.nightCharging}
                onCheckedChange={() => handleToggle("nightCharging")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="firmwareAutopatch" className="font-medium">
                    Firmware Autopatch
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update firmware during low-usage periods
                  </p>
                </div>
              </div>
              <Switch
                id="firmwareAutopatch"
                checked={preferences.firmwareAutopatch}
                onCheckedChange={() => handleToggle("firmwareAutopatch")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="predictiveMaintenance" className="font-medium">
                    Predictive Maintenance
                  </Label>
                  <p className="text-sm text-muted-foreground">Schedule maintenance based on AI failure predictions</p>
                </div>
              </div>
              <Switch
                id="predictiveMaintenance"
                checked={preferences.predictiveMaintenance}
                onCheckedChange={() => handleToggle("predictiveMaintenance")}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Notification Settings</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="explainActions" className="font-medium">
                    Explain Actions in Feed
                  </Label>
                  <p className="text-sm text-muted-foreground">Show detailed explanations for AI actions</p>
                </div>
              </div>
              <Switch
                id="explainActions"
                checked={preferences.explainActions}
                onCheckedChange={() => handleToggle("explainActions")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="alertHighRisk" className="font-medium">
                    Alert on High-Risk Failures
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for critical issues</p>
                </div>
              </div>
              <Switch
                id="alertHighRisk"
                checked={preferences.alertHighRisk}
                onCheckedChange={() => handleToggle("alertHighRisk")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Label htmlFor="voiceCommands" className="font-medium">
                    Voice Commands
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable voice control for the AI Copilot</p>
                </div>
              </div>
              <Switch
                id="voiceCommands"
                checked={preferences.voiceCommands}
                onCheckedChange={() => handleToggle("voiceCommands")}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="rounded-xl">Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}
