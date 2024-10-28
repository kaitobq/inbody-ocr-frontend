"use client"

import { AdminDashboard } from "components/dashboard/admin/AdminDashboard"
import { Dashboard } from "components/dashboard/member/Dashboard"
import { useScreenDashboard } from "mods/hooks/useScreenDashboard"
import { useSearchParams } from "next/navigation"
import React from "react"
import type { Role } from "types/dashboard"

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
        <AdminDashboard data={dataForAdmin} />
      </div>
    )
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return <div>データが取得できませんでした</div>
  }
}
