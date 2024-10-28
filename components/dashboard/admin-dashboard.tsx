"use client"

import { User, Users } from "lucide-react"
import type React from "react"
import type { GetScreenForAdminResponse } from "types/dashboard"
import { OrgDataChart } from "./OrgDataChart"
import { ScoreRanking } from "./ScoreRanking"
import { StatCard } from "./StatCard"
import { UserDataChart } from "./UserDataChart"
import { UserDistributionChart } from "./UserDistributionChart"
import { UserTable } from "./UserTable"

interface Props {
  data: GetScreenForAdminResponse // userTable用のデータをapi側で用意しておきたい
}

export function AdminDashboardComponent(props: Props) {
  const { data } = props

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">管理者ダッシュボード</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="平均体重"
          value={`${data.avg?.weight.toFixed(1)} kg`}
          icon={<User className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="平均筋肉量"
          value={`${data.avg?.muscle_weight.toFixed(1)} kg`}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="平均体脂肪率"
          value={`${data.avg?.fat_percent.toFixed(1)}%`}
          icon={<User className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="平均得点"
          value={data.avg?.point}
          icon={<User className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* <OrgDataChart data={data} /> */}
      <UserDistributionChart data={data.chart} />
      <UserTable data={data.current} />
      <ScoreRanking data={data.current} />
      <UserDataChart data={data.all_data} />
    </div>
  )
}
