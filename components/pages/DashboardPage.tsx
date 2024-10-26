"use client"

import { AdminDashboardComponent } from "components/dashboard/admin-dashboard"
import { Dashboard } from "components/dashboard/Dashboard"
import { useScreenDashboard } from "mods/hooks/useScreenDashboard"
import { useSearchParams } from "next/navigation"
import React from "react"
import type { GetScreenForAdminResponse, GetScreenForMemberResponse, Role } from "types/dashboard"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") as Role

  const { dataForMember, dataForAdmin, loading } = useScreenDashboard(role)

  if (loading) {
    return <div>ロード中...</div>
  }

  if (role === "member" && dataForMember) {
    return (
      <div>
        <Dashboard data={dataForMember} />
      </div>
    )
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else if ((role === "admin" || role === "owner") && dataForAdmin) {
    return (
      <div>
        <AdminDashboardComponent data={dataForAdmin} />
      </div>
    )
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return <div>データが取得できませんでした</div>
  }
}
