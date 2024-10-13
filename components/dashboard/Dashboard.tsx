"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { User } from "lucide-react"
import { useImageData } from "mods/hooks/useImageData"
import type React from "react"
import { useState } from "react"
import { CustomLineChart } from "./CustomLineChart"
import { DataHistoryTable } from "./DataHistoryTable"
import { ImageUploader } from "./ImageUploader"

export function Dashboard({ role = "member" }) {
  const [selectedUser, setSelectedUser] = useState("自分")
  const { data } = useImageData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">InBody データダッシュボード</h1>

      {role === "admin" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ユーザー選択</CardTitle>
            <CardDescription>
              データを表示するユーザーを選択してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedUser} defaultValue={selectedUser}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="ユーザーを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="自分">自分</SelectItem>
                <SelectItem value="ユーザーA">ユーザーA</SelectItem>
                <SelectItem value="ユーザーB">ユーザーB</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">現在の体重</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data[data.length - 1]?.weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より{" "}
              {(
                data[data.length - 1]?.weight -
                data[data.length - 2]?.weight
              ).toFixed(1)}{" "}
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
              {data[data.length - 1]?.muscle_weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より{" "}
              {(
                data[data.length - 1]?.muscle_weight -
                data[data.length - 2]?.muscle_weight
              ).toFixed(1)}{" "}
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
              {data[data.length - 1]?.fat_weight.toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              前回より{" "}
              {(
                data[data.length - 1]?.fat_weight -
                data[data.length - 2]?.fat_weight
              ).toFixed(1)}{" "}
              kg 変化
            </p>
          </CardContent>
        </Card>
      </div>

      <CustomLineChart
        data={data}
        title="InBodyデータの推移"
        description="各種測定値の推移グラフ"
      />

      <DataHistoryTable data={data} />

      <ImageUploader />
    </div>
  )
}
