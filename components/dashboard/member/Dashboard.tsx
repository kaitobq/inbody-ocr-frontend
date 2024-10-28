"use client"

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { User } from "lucide-react"
import type React from "react"
import type { GetScreenForMemberResponse } from "types/dashboard"
import { CustomLineChart } from "./CustomLineChart"
import { DataHistoryTable } from "./DataHistoryTable"
import { ImageUploader } from "./ImageUploader"

interface Props {
  data: GetScreenForMemberResponse
}

export function Dashboard(props: Props) {
  const { data } = props

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">InBody データダッシュボード</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">現在の体重</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.current?.weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より
              {(data?.current?.weight - data?.previous?.weight).toFixed(1)}
              kg 変化
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">現在の筋肉量</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.current?.muscle_weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より
              {(
                data?.current?.muscle_weight - data?.previous?.muscle_weight
              ).toFixed(1)}
              kg 変化
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              現在の体脂肪量
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.current?.fat_weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より
              {(data?.current?.fat_weight - data?.previous?.fat_weight).toFixed(
                1,
              )}
              kg 変化
            </p>
          </CardContent>
        </Card>
      </div>

      <CustomLineChart data={data} />

      <DataHistoryTable data={data} />

      <ImageUploader />
    </div>
  )
}
