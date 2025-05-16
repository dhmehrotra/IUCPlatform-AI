"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, CreditCard, QrCode, Clock, Battery, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AIUpdatesPanel } from "./ai-updates-panel"

// Circular progress component
function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color = "#1E5EFF",
  children,
}: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = value / max
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

export function DriverInterface() {
  const [step, setStep] = useState<"scan" | "details" | "charging" | "receipt">("scan")
  const [stationId, setStationId] = useState("")
  const [showReceipt, setShowReceipt] = useState(false)
  const [chargingData, setChargingData] = useState({
    kwhDelivered: 0,
    timeElapsed: 0,
    cost: 0,
    rate: 0.25,
  })
  const progressRef = useRef<HTMLDivElement>(null)

  const handleStationIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (stationId.trim() === "STN-005" || stationId.trim().toLowerCase() === "stn005") {
      setStep("details")
    }
  }

  const startCharging = () => {
    setStep("charging")
    // In a real app, this would connect to the charging station
  }

  const endCharging = () => {
    setStep("receipt")
    setShowReceipt(true)
  }

  // Simulate charging progress
  const simulateCharging = () => {
    if (step === "charging") {
      setChargingData((prev) => ({
        ...prev,
        kwhDelivered: Math.min(prev.kwhDelivered + 0.01, 50),
        timeElapsed: prev.timeElapsed + 1,
        cost: Math.min(prev.kwhDelivered + 0.01, 50) * prev.rate,
      }))
    }
  }

  // Update charging data every second
  useEffect(() => {
    if (step === "charging") {
      const interval = setInterval(simulateCharging, 1000)
      return () => clearInterval(interval)
    }
  }, [step])

  // Animate progress bar
  useEffect(() => {
    if (step === "charging" && progressRef.current) {
      progressRef.current.classList.add("animate-progress")
    }
  }, [step])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-5xl card-hover shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-blue-50/50 pb-6">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/iuc-logo-blue.png"
              alt="IUC Platform Logo"
              width={160}
              height={45}
              className="h-12 w-auto animate-float"
              priority
            />
          </div>
          <CardDescription className="text-lg font-medium text-gray-700">
            {step === "scan" && "Scan QR code or enter station ID to begin"}
            {step === "details" && "Station STN-005 - Downtown Plaza"}
            {step === "charging" && "Charging in progress"}
            {step === "receipt" && "Charging complete"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {step === "scan" && (
            <form onSubmit={handleStationIdSubmit} className="space-y-6">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-blue-50 rounded-2xl animate-pulse-slow">
                  <QrCode className="h-32 w-32 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="station-id" className="text-base">
                  Station ID
                </Label>
                <Input
                  id="station-id"
                  placeholder="Enter station ID (e.g. STN-005)"
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                  className="h-12 rounded-xl text-lg"
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-base">
                Continue
              </Button>
            </form>
          )}

          {step === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="flex justify-center mb-4">
                  <Zap className="h-16 w-16 text-primary animate-pulse-slow" />
                </div>

                <div className="rounded-xl border p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="font-medium">Downtown Plaza</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Plug Type</p>
                      <p className="font-medium">CCS Combo</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Power</p>
                      <p className="font-medium">150 kW</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Rate</p>
                      <p className="font-medium text-success">$0.25/kWh</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-6 bg-blue-50/50">
                  <p className="text-center mb-4 font-medium">Instructions</p>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                        1
                      </div>
                      <span>Connect charging cable to your vehicle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                        2
                      </div>
                      <span>Press "Start Charging" button</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                        3
                      </div>
                      <span>Wait for charging to begin</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="md:col-span-1">
                <AIUpdatesPanel stationId="STN-005" location="Downtown Plaza" />
              </div>
            </div>
          )}

          {step === "charging" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-8">
                <div className="flex items-center justify-center">
                  <Battery className="h-20 w-20 text-success animate-pulse" />
                </div>

                <div className="relative h-3 rounded-lg bg-gray-200 overflow-hidden">
                  <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-success rounded-lg"
                    style={{ width: "0%" }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <CircularProgress value={chargingData.kwhDelivered} max={50} color="#00C48C">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{chargingData.kwhDelivered.toFixed(2)}</div>
                        <div className="text-xs">kWh</div>
                      </div>
                    </CircularProgress>
                    <p className="mt-2 text-sm text-muted-foreground">Energy</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <CircularProgress value={chargingData.timeElapsed} max={3600} color="#1E5EFF">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {Math.floor(chargingData.timeElapsed / 60)}:
                          {(chargingData.timeElapsed % 60).toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs">min:sec</div>
                      </div>
                    </CircularProgress>
                    <p className="mt-2 text-sm text-muted-foreground">Time</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <CircularProgress value={chargingData.cost} max={50 * 0.25} color="#FFB020">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${chargingData.cost.toFixed(2)}</div>
                        <div className="text-xs">USD</div>
                      </div>
                    </CircularProgress>
                    <p className="mt-2 text-sm text-muted-foreground">Cost</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <AIUpdatesPanel stationId="STN-005" location="Downtown Plaza" />
              </div>
            </div>
          )}

          {step === "receipt" && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="bg-success/20 p-4 rounded-full">
                  <CheckCircle className="h-16 w-16 text-success" />
                </div>
              </div>

              <div className="rounded-xl border p-6 bg-gray-50">
                <h3 className="font-semibold mb-6 text-center text-lg">Charging Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Station ID:</span>
                    <span className="font-medium">STN-005</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Energy Delivered:</span>
                    <span className="font-medium">{chargingData.kwhDelivered.toFixed(2)} kWh</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {Math.floor(chargingData.timeElapsed / 60)}:
                      {(chargingData.timeElapsed % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium">${chargingData.rate.toFixed(2)}/kWh</span>
                  </div>
                  <div className="flex justify-between items-center py-3 mt-2 bg-blue-50/50 rounded-lg px-3">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg text-primary">${chargingData.cost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center p-4 bg-success/10 rounded-xl">
                <CreditCard className="h-6 w-6 text-success mr-2" />
                <p className="text-success font-medium">Payment Successful</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          {step === "details" && (
            <Button className="w-full h-12 rounded-xl text-base group relative overflow-hidden" onClick={startCharging}>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-0 bg-primary group-hover:translate-x-full group-hover:scale-102 group-hover:opacity-0"></span>
              <span className="relative flex items-center justify-center">
                <Zap className="mr-2 h-5 w-5" />
                Start Charging
              </span>
            </Button>
          )}

          {step === "charging" && (
            <Button className="w-full h-12 rounded-xl text-base" variant="destructive" onClick={endCharging}>
              End Charging Session
            </Button>
          )}

          {step === "receipt" && (
            <Button className="w-full h-12 rounded-xl text-base" variant="outline" onClick={() => setStep("scan")}>
              <Clock className="mr-2 h-5 w-5" />
              Start New Session
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Receipt Modal */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Charging Receipt</DialogTitle>
            <DialogDescription>Your charging session has been completed successfully.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="bg-success/20 p-3 rounded-full">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Station:</span>
                <span className="font-medium">STN-005 (Downtown Plaza)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Energy:</span>
                <span className="font-medium">{chargingData.kwhDelivered.toFixed(2)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">
                  {Math.floor(chargingData.timeElapsed / 60)}:
                  {(chargingData.timeElapsed % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate:</span>
                <span className="font-medium">${chargingData.rate.toFixed(2)}/kWh</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-primary">${chargingData.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-success/10 p-3 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-success mr-2" />
              <span className="text-success">Payment processed successfully</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setShowReceipt(false)}>
              Close
            </Button>
            <Button className="rounded-lg">
              <Clock className="mr-2 h-4 w-4" />
              Start New Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
