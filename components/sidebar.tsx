"use client"

import type { SidebarItem, UserRole } from "@/types"
import {
  BarChart3,
  Settings,
  Users,
  TagIcon as PriceTag,
  FileText,
  Zap,
  Map,
  AlertTriangle,
  Terminal,
  Download,
  Handshake,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  role: UserRole
  activeItem: SidebarItem
  onItemSelect: (item: SidebarItem) => void
}

export function Sidebar({ role, activeItem, onItemSelect }: SidebarProps) {
  const clientAdminItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "stations", label: "Stations", icon: Zap },
    { id: "users", label: "Users", icon: Users },
    { id: "pricing", label: "Pricing", icon: PriceTag },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "partners", label: "Partners", icon: Handshake },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const iucOpsItems = [
    { id: "network-monitor", label: "Network Monitor", icon: Map },
    { id: "incident-tracker", label: "Incident Tracker", icon: AlertTriangle },
    { id: "remote-actions", label: "Remote Actions", icon: Terminal },
    { id: "firmware-updates", label: "Firmware Updates", icon: Download },
  ]

  const items = role === "client-admin" ? clientAdminItems : iucOpsItems

  return (
    <div className="w-64 gradient-bg text-white flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="text-sm font-medium text-gray-400 uppercase mb-6 tracking-wider">
          {role === "client-admin" ? "Client Administration" : "IUC Operations"}
        </div>
        <nav className="space-y-1.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemSelect(item.id as SidebarItem)}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300",
                activeItem === item.id
                  ? "bg-primary/20 text-white active-nav-item pl-5"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white",
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", activeItem === item.id ? "text-primary" : "")} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
