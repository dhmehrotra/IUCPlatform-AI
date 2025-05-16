"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bot, TrendingUp, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ClientAdminPricing() {
  const [pricingConfig, setPricingConfig] = useState([
    {
      id: 1,
      timeOfDay: "Off-Peak (10 PM - 6 AM)",
      ratePerKwh: "0.15",
      idleFeePerHour: "2.00",
      aiSuggested: false,
    },
    {
      id: 2,
      timeOfDay: "Standard (6 AM - 4 PM)",
      ratePerKwh: "0.25",
      idleFeePerHour: "5.00",
      aiSuggested: false,
    },
    {
      id: 3,
      timeOfDay: "Peak (4 PM - 10 PM)",
      ratePerKwh: "0.29",
      idleFeePerHour: "7.50",
      aiSuggested: true,
      aiReason: "High demand detected at Downtown Plaza between 4-6 PM",
    },
    {
      id: 4,
      timeOfDay: "Weekend",
      ratePerKwh: "0.20",
      idleFeePerHour: "3.00",
      aiSuggested: false,
    },
  ])

  const [toggles, setToggles] = useState({
    idleFee: true,
    employeeDiscount: false,
    weekendRate: true,
    aiPricing: true,
    peakDetection: true,
    demandResponse: false,
  })

  const handleRateChange = (id: number, field: "ratePerKwh" | "idleFeePerHour", value: string) => {
    setPricingConfig(pricingConfig.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleToggleChange = (toggle: keyof typeof toggles) => {
    setToggles({ ...toggles, [toggle]: !toggles[toggle] })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pricing Configuration</h1>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          <Bot className="mr-1 h-3 w-3" />
          AI Managed
        </Badge>
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Charging Rates</CardTitle>
              <CardDescription>
                Configure your charging rates based on time of day. Changes will apply to new charging sessions.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 flex items-center">
              <Bot className="mr-1 h-3 w-3" />
              <span>AI updated peak rate to $0.29/kWh yesterday</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Time of Day</TableHead>
                <TableHead>Rate per kWh ($)</TableHead>
                <TableHead>Idle Fee per Hour ($)</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingConfig.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>{item.timeOfDay}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`rate-${item.id}`} className="sr-only">
                        Rate per kWh
                      </Label>
                      <span>$</span>
                      <Input
                        id={`rate-${item.id}`}
                        value={item.ratePerKwh}
                        onChange={(e) => handleRateChange(item.id, "ratePerKwh", e.target.value)}
                        className="w-20 rounded-lg"
                      />
                      {item.aiSuggested && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <Badge className="bg-primary/20 text-primary border-primary/30">
                                  <Bot className="mr-1 h-3 w-3" />
                                  AI Suggested
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="p-4 max-w-xs">
                              <p className="text-sm">{item.aiReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`idle-${item.id}`} className="sr-only">
                        Idle Fee per Hour
                      </Label>
                      <span>$</span>
                      <Input
                        id={`idle-${item.id}`}
                        value={item.idleFeePerHour}
                        onChange={(e) => handleRateChange(item.id, "idleFeePerHour", e.target.value)}
                        className="w-20 rounded-lg"
                        disabled={!toggles.idleFee}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.aiSuggested ? (
                      <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                    ) : (
                      <Badge variant="outline">Manual</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Enable Idle Fee</h3>
                <p className="text-sm text-gray-500">Charge users for time spent connected but not charging</p>
              </div>
              <Switch checked={toggles.idleFee} onCheckedChange={() => handleToggleChange("idleFee")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Employee Discount (20%)</h3>
                <p className="text-sm text-gray-500">Apply discount for registered employee accounts</p>
              </div>
              <Switch
                checked={toggles.employeeDiscount}
                onCheckedChange={() => handleToggleChange("employeeDiscount")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Weekend Rate</h3>
                <p className="text-sm text-gray-500">Apply special weekend pricing</p>
              </div>
              <Switch checked={toggles.weekendRate} onCheckedChange={() => handleToggleChange("weekendRate")} />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="rounded-xl">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-hover rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>AI-Suggested Price Curves</CardTitle>
            <CardDescription>Optimized pricing based on historical usage and demand patterns</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-price-curve-chart-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png"
                alt="AI-suggested price curves showing optimal pricing throughout the day"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium">AI Price Optimization</span>
                </div>
                <Switch checked={toggles.aiPricing} onCheckedChange={() => handleToggleChange("aiPricing")} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                When enabled, AI will automatically adjust pricing based on demand patterns and competitor rates
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Pricing Rules</CardTitle>
            <CardDescription>Set boundaries for AI-driven pricing adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-price">Maximum kWh Price ($)</Label>
                <Input id="max-price" defaultValue="0.45" className="rounded-lg" />
                <p className="text-xs text-muted-foreground">AI will never set prices higher than this amount</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="off-peak-window">Off-Peak Window</Label>
                <div className="flex items-center gap-2">
                  <Input id="off-peak-start" defaultValue="10:00 PM" className="rounded-lg" />
                  <span>to</span>
                  <Input id="off-peak-end" defaultValue="6:00 AM" className="rounded-lg" />
                </div>
                <p className="text-xs text-muted-foreground">Define your off-peak hours for reduced rates</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-revenue">Target Revenue Uplift (%)</Label>
                <Input id="target-revenue" defaultValue="15" className="rounded-lg" />
                <p className="text-xs text-muted-foreground">
                  AI will optimize pricing to achieve this revenue increase
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-warning mr-1" />
                    Peak Demand Detection
                  </h3>
                  <p className="text-xs text-muted-foreground">Automatically detect and respond to usage spikes</p>
                </div>
                <Switch checked={toggles.peakDetection} onCheckedChange={() => handleToggleChange("peakDetection")} />
              </div>

              <div className="flex items-center justify-between mt-2">
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 text-primary mr-1" />
                    Grid Demand Response
                  </h3>
                  <p className="text-xs text-muted-foreground">Adjust pricing based on utility grid conditions</p>
                </div>
                <Switch checked={toggles.demandResponse} onCheckedChange={() => handleToggleChange("demandResponse")} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex justify-end">
            <Button className="rounded-xl">Save Rules</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
