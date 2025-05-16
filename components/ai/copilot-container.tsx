"use client"

import { useSearchParams } from "next/navigation"
import { ClientAdminAICopilot } from "./client-admin-copilot"
import { IUCOpsCopilot } from "./iuc-ops-copilot"
import { DriverCopilot } from "./driver-copilot"
import type { UserRole } from "@/types"

export function AICopilotContainer() {
  const searchParams = useSearchParams()
  const persona = (searchParams.get("persona") as UserRole) || "client-admin"

  return (
    <div className="p-6">
      {persona === "client-admin" && <ClientAdminAICopilot />}
      {persona === "iuc-ops" && <IUCOpsCopilot />}
      {persona === "driver" && <DriverCopilot />}
    </div>
  )
}
