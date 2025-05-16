"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { TopNavbar } from "@/components/top-navbar"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ClientAdminDashboard } from "@/components/client-admin/dashboard"
import { ClientAdminStations } from "@/components/client-admin/stations"
import { ClientAdminUsers } from "@/components/client-admin/users"
import { ClientAdminPricing } from "@/components/client-admin/pricing"
import { ClientAdminReports } from "@/components/client-admin/reports"
import { ClientAdminSettings } from "@/components/client-admin/settings"
import { IUCOpsNetworkMonitor } from "@/components/iuc-ops/network-monitor"
import { IUCOpsIncidentTracker } from "@/components/iuc-ops/incident-tracker"
import { IUCOpsRemoteActions } from "@/components/iuc-ops/remote-actions"
import { IUCOpsFirmwareUpdates } from "@/components/iuc-ops/firmware-updates"
import { DriverInterface } from "@/components/driver/interface"
import { ClientAdminPartners } from "@/components/client-admin/partners"
import { AIAvatar } from "@/components/ai/avatar"

export type UserRole = "client-admin" | "iuc-ops" | "driver"
export type SidebarItem =
  | "dashboard"
  | "stations"
  | "users"
  | "pricing"
  | "reports"
  | "settings"
  | "network-monitor"
  | "incident-tracker"
  | "remote-actions"
  | "firmware-updates"
  | "driver-interface"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [role, setRole] = useState<UserRole>("client-admin")
  const [activeItem, setActiveItem] = useState<SidebarItem>(
    role === "client-admin" ? "dashboard" : role === "iuc-ops" ? "network-monitor" : "driver-interface",
  )

  // Get the persona from query params
  useEffect(() => {
    const persona = searchParams.get("persona") as UserRole
    if (persona && ["client-admin", "iuc-ops", "driver"].includes(persona)) {
      setRole(persona)
      if (persona === "client-admin") {
        setActiveItem("dashboard")
      } else if (persona === "iuc-ops") {
        setActiveItem("network-monitor")
      } else {
        setActiveItem("driver-interface")
      }
    }
  }, [searchParams])

  // Update active item when role changes
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
    if (newRole === "client-admin") {
      setActiveItem("dashboard")
    } else if (newRole === "iuc-ops") {
      setActiveItem("network-monitor")
    } else {
      setActiveItem("driver-interface")
    }

    // Update the URL with the new role
    const url = new URL(window.location.href)
    url.searchParams.set("persona", newRole)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="flex h-screen flex-col">
      <TopNavbar role={role} onRoleChange={handleRoleChange} />
      <div className="flex flex-1 overflow-hidden">
        {role !== "driver" && <Sidebar role={role} activeItem={activeItem} onItemSelect={setActiveItem} />}
        <main className="flex-1 overflow-auto bg-gray-50 flex flex-col">
          <div className="flex-1 p-6">
            {/* Client Admin Views */}
            {role === "client-admin" && activeItem === "dashboard" && <ClientAdminDashboard />}
            {role === "client-admin" && activeItem === "stations" && <ClientAdminStations />}
            {role === "client-admin" && activeItem === "users" && <ClientAdminUsers />}
            {role === "client-admin" && activeItem === "pricing" && <ClientAdminPricing />}
            {role === "client-admin" && activeItem === "reports" && <ClientAdminReports />}
            {role === "client-admin" && activeItem === "settings" && <ClientAdminSettings />}
            {role === "client-admin" && activeItem === "partners" && <ClientAdminPartners />}

            {/* IUC Ops Views */}
            {role === "iuc-ops" && activeItem === "network-monitor" && <IUCOpsNetworkMonitor />}
            {role === "iuc-ops" && activeItem === "incident-tracker" && <IUCOpsIncidentTracker />}
            {role === "iuc-ops" && activeItem === "remote-actions" && <IUCOpsRemoteActions />}
            {role === "iuc-ops" && activeItem === "firmware-updates" && <IUCOpsFirmwareUpdates />}

            {/* Driver View */}
            {role === "driver" && <DriverInterface />}
          </div>
          {role !== "driver" && <Footer />}
        </main>
      </div>
      <AIAvatar />
    </div>
  )
}
