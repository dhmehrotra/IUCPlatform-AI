"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientAdminAIPreferences } from "./ai-preferences"
import { Bot, User, Bell } from "lucide-react"

export function ClientAdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Westside Corporate Park",
    timezone: "America/Los_Angeles",
    address: "123 Corporate Drive, San Francisco, CA 94105",
    contactEmail: "admin@westsidecorp.com",
    contactPhone: "(415) 555-1234",
    notifications: {
      email: true,
      sms: false,
      stationOffline: true,
      lowUtilization: true,
      maintenanceRequired: true,
      sustainabilityReport: true,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Organization</span>
          </TabsTrigger>
          <TabsTrigger value="ai-preferences" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>AI Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card className="card-hover rounded-xl shadow-md overflow-hidden">
            <CardHeader className="bg-blue-50/50">
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure your organization's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="rounded-lg"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger id="timezone" className="rounded-lg">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                    <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="rounded-xl">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai-preferences">
          <ClientAdminAIPreferences />
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="card-hover rounded-xl shadow-md overflow-hidden">
            <CardHeader className="bg-blue-50/50">
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch
                    id="sms-notifications"
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4 text-sm font-medium">Notification Events</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="station-offline">Station Offline</Label>
                    <Switch
                      id="station-offline"
                      checked={settings.notifications.stationOffline}
                      onCheckedChange={(checked) => handleNotificationChange("stationOffline", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="low-utilization">Low Utilization</Label>
                    <Switch
                      id="low-utilization"
                      checked={settings.notifications.lowUtilization}
                      onCheckedChange={(checked) => handleNotificationChange("lowUtilization", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance-required">Maintenance Required</Label>
                    <Switch
                      id="maintenance-required"
                      checked={settings.notifications.maintenanceRequired}
                      onCheckedChange={(checked) => handleNotificationChange("maintenanceRequired", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sustainability-report">Receive monthly sustainability report (email)</Label>
                      <p className="text-xs text-gray-500">Monthly report on carbon offset and environmental impact</p>
                    </div>
                    <Switch
                      id="sustainability-report"
                      checked={settings.notifications.sustainabilityReport}
                      onCheckedChange={(checked) => handleNotificationChange("sustainabilityReport", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="rounded-xl">Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
