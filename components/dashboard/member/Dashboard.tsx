"use client"

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { User } from "lucide-react"
import type React from "react"
import type { GetScreenForMemberResponse } from "types/dashboard"
import { type StatCardProps, Stats } from "../StatCard"
import { CustomLineChart } from "./CustomLineChart"
import { DataHistoryTable } from "./DataHistoryTable"
import { ImageUploader } from "./ImageUploader"

interface Props {
  data: GetScreenForMemberResponse
}

export function Dashboard(props: Props) {
  const { data } = props

  const userIcon = <User className="h-4 w-4 text-muted-foreground" />
  const stats: StatCardProps[] = [
    {
      title: "現在の体重",
      value: `${data.current.weight.toFixed(1)} kg`,
      change: data.current.weight - data.previous.weight,
      icon: userIcon,
    },
    {
      title: "現在の筋肉量",
      value: `${data.current.muscle_weight.toFixed(1)} kg`,
      change: data.current.muscle_weight - data.previous.muscle_weight,
      icon: userIcon,
    },
    {
      title: "現在の体脂肪量",
      value: `${data.current.fat_weight.toFixed(1)}%`,
      change: data.current.fat_weight - data.previous.fat_weight,
      icon: userIcon,
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">InBody データダッシュボード</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Stats stats={stats} />
      </div>

      <CustomLineChart data={data} />

      <DataHistoryTable data={data} />

      <ImageUploader />
    </div>
  )
}
