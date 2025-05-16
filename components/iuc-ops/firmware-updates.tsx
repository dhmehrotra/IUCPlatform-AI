"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Upload, CheckCircle, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IUCOpsFirmwareUpdates() {
  const [firmwareVersions, setFirmwareVersions] = useState([
    {
      id: 1,
      model: "IUC-50kW",
      version: "v2.4.1",
      releaseDate: "April 15, 2023",
      deploymentStatus: 75,
      releaseNotes: "Bug fixes and performance improvements",
    },
    {
      id: 2,
      model: "IUC-75kW",
      version: "v2.4.1",
      releaseDate: "April 15, 2023",
      deploymentStatus: 85,
      releaseNotes: "Bug fixes and performance improvements",
    },
    {
      id: 3,
      model: "IUC-150kW",
      version: "v2.4.1",
      releaseDate: "April 15, 2023",
      deploymentStatus: 60,
      releaseNotes: "Bug fixes and performance improvements",
    },
    {
      id: 4,
      model: "IUC-50kW",
      version: "v2.3.9",
      releaseDate: "March 1, 2023",
      deploymentStatus: 100,
      releaseNotes: "Added support for new payment methods",
    },
    {
      id: 5,
      model: "IUC-75kW",
      version: "v2.3.9",
      releaseDate: "March 1, 2023",
      deploymentStatus: 100,
      releaseNotes: "Added support for new payment methods",
    },
    {
      id: 6,
      model: "IUC-150kW",
      version: "v2.3.9",
      releaseDate: "March 1, 2023",
      deploymentStatus: 100,
      releaseNotes: "Added support for new payment methods",
    },
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Firmware Updates</h1>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Firmware Versions</CardTitle>
          <CardDescription>Manage firmware versions and schedule updates</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Deployment Status</TableHead>
                <TableHead>Release Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {firmwareVersions.map((firmware) => (
                <TableRow key={firmware.id} className="transition-colors hover:bg-gray-50">
                  <TableCell className="font-medium text-primary">{firmware.model}</TableCell>
                  <TableCell>{firmware.version}</TableCell>
                  <TableCell>{firmware.releaseDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={firmware.deploymentStatus}
                        className="w-[120px] h-2 rounded-full"
                        indicatorClassName={
                          firmware.deploymentStatus === 100
                            ? "bg-success"
                            : firmware.deploymentStatus > 50
                              ? "bg-primary"
                              : "bg-warning"
                        }
                      />
                      <span className="text-sm font-medium">{firmware.deploymentStatus}%</span>
                      {firmware.deploymentStatus === 100 && <CheckCircle className="h-4 w-4 text-success" />}
                    </div>
                  </TableCell>
                  <TableCell>{firmware.releaseNotes}</TableCell>
                  <TableCell className="text-right">
                    {firmware.deploymentStatus < 100 ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="rounded-lg">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-xl">
                          <DialogHeader>
                            <DialogTitle>Schedule Firmware Update</DialogTitle>
                            <DialogDescription>
                              Schedule a firmware update for {firmware.model} to version {firmware.version}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Select Stations</h4>
                              <Select>
                                <SelectTrigger className="w-full rounded-lg">
                                  <SelectValue placeholder="Select stations to update" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All {firmware.model} Stations</SelectItem>
                                  <SelectItem value="pending">Pending Stations Only</SelectItem>
                                  <SelectItem value="custom">Custom Selection</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Update Time</h4>
                              <Select defaultValue="off-peak">
                                <SelectTrigger className="w-full rounded-lg">
                                  <SelectValue placeholder="Select update time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="immediate">Immediate</SelectItem>
                                  <SelectItem value="off-peak">Off-Peak Hours (Recommended)</SelectItem>
                                  <SelectItem value="scheduled">Custom Schedule</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                              <AlertTriangle className="h-5 w-5 text-warning" />
                              <p className="text-sm text-muted-foreground">
                                Stations will be unavailable during the update process (approx. 5-10 minutes)
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" className="rounded-lg">
                              Cancel
                            </Button>
                            <Button className="rounded-lg">Schedule Update</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md">
        <CardHeader className="bg-blue-50/50">
          <CardTitle>Upload New Firmware</CardTitle>
          <CardDescription>Upload a new firmware version for deployment</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-40 bg-gray-50 transition-colors hover:bg-gray-100 cursor-pointer">
            <div className="text-center">
              <Upload className="mx-auto h-10 w-10 text-primary animate-pulse-slow" />
              <p className="mt-4 text-sm text-muted-foreground">Drag and drop firmware file or click to browse</p>
              <p className="mt-1 text-xs text-muted-foreground">Supports .bin, .hex, or .zip files up to 100MB</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Button variant="outline" className="rounded-lg">
            Cancel
          </Button>
          <Button className="rounded-lg">
            <Upload className="mr-2 h-4 w-4" />
            Upload Firmware
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
