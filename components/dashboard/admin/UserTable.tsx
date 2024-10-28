import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useMemo, useState } from "react"
import type { ImageDataForScreen } from "types/dashboard"
import { CustomTable } from "../CustomTable"

interface Props {
  data: ImageDataForScreen[]
}

export const UserTable = (props: Props) => {
  const { data } = props
  const [isExpanded, setIsExpanded] = useState(false)

  // 平均最終測定日を計算
  const averageLastMeasurement = useMemo(() => {
    const sum = data.reduce(
      (acc, record) => acc + new Date(record.created_at).getTime(),
      0,
    )
    return new Date(sum / data.length)
  }, [data])

  // 10日前の日付を計算
  const tenDaysAgo = new Date(
    averageLastMeasurement.getTime() - 10 * 24 * 60 * 60 * 1000,
  )

  const columns = [
    {
      key: 'user_name' as const,
      label: '名前',
      sortable: true,
    },
    {
      key: 'height' as const,
      label: '身長 (cm)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.height.toFixed(1),
    },
    {
      key: 'weight' as const,
      label: '体重 (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.weight.toFixed(1),
    },
    {
      key: 'muscle_weight' as const,
      label: '筋肉量 (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.muscle_weight.toFixed(1),
    },
    {
      key: 'fat_weight' as const,
      label: '体脂肪量 (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.fat_weight.toFixed(1),
    },
    {
      key: 'fat_percent' as const,
      label: '体脂肪率 (%)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.fat_percent.toFixed(1),
    },
    {
      key: 'body_water' as const,
      label: '体水分量 (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.body_water.toFixed(1),
    },
    {
      key: 'protein' as const,
      label: 'タンパク質 (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.protein.toFixed(1),
    },
    {
      key: 'mineral' as const,
      label: 'ミネラル (kg)',
      sortable: true,
      render: (item: ImageDataForScreen) => item.mineral.toFixed(1),
    },
    {
      key: 'point' as const,
      label: '得点',
      sortable: true,
    },
    {
      key: 'created_at' as const,
      label: '測定日',
      sortable: true,
      render: (item: ImageDataForScreen) => (
        <div className="flex items-center">
          {item.created_at.split('T')[0]}
          {new Date(item.created_at) < tenDaysAgo && (
            <Popover>
              <PopoverTrigger>
                <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
              </PopoverTrigger>
              <PopoverContent>
                最終測定日が平均より10日以上前です。測定を促してください。
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
    },
  ]

  // 行のクラス名を設定
  const rowClassName = (item: ImageDataForScreen) =>
    new Date(item.created_at) < tenDaysAgo ? 'bg-red-100' : ''

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>ユーザー一覧</CardTitle>
        <CardDescription>全ユーザーの最新測定データ</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-md border overflow-hidden ${isExpanded ? "" : "max-h-[400px] overflow-y-auto"}`}
        >
          <CustomTable
            columns={columns}
            data={data}
            enableSorting={true}
            rowClassName={rowClassName}
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