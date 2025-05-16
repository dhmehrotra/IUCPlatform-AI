"use client"

import { useSearchParams } from "next/navigation"
import { ClientAdminAIUpdates } from "./client-admin-ai-updates"
import { IUCOpsAIUpdates } from "./iuc-ops-ai-updates"
import { DriverCopilot } from "./driver-copilot"
import type { UserRole } from "@/types"

export function AIUpdatesContainer() {
  const searchParams = useSearchParams()
  const persona = (searchParams.get("persona") as UserRole) || "client-admin"

  return (
    <div className="p-6">
      {persona === "client-admin" && <ClientAdminAIUpdates />}
      {persona === "iuc-ops" && <IUCOpsAIUpdates />}
      {persona === "driver" && <DriverCopilot />}
    </div>
  )
}
