import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { ImageDataForScreen } from "types/dashboard"
import { CustomTable } from "../CustomTable"

interface Props {
  data: ImageDataForScreen[]
}

export const ScoreRanking = (props: Props) => {
  const { data } = props
  const [isExpanded, setIsExpanded] = useState(false)

  // 得点で降順ソート
  const sortedData = [...data].sort((a, b) => b.point - a.point)

  const columns = [
    {
      key: "rank" as const,
      label: "順位",
      render: (_item: ImageDataForScreen, index: number) => index + 1,
    },
    {
      key: "user_name" as const,
      label: "名前",
      sortable: true,
    },
    {
      key: "point" as const,
      label: "得点",
      sortable: true,
    },
    {
      key: "created_at" as const,
      label: "最終測定日",
      render: (item: ImageDataForScreen) => item.created_at.split("T")[0],
      sortable: true,
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>得点ランキング</CardTitle>
        <CardDescription>全ユーザーの得点ランキング</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className={`rounded-md border overflow-hidden ${
            isExpanded ? "" : "max-h-[400px] overflow-y-auto"
          }`}
        >
          <CustomTable
            columns={columns}
            data={sortedData}
            enableSorting={true}
            defaultSortColumn="point"
            defaultSortDirection="desc"
          />
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              折りたたむ
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              展開する
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
