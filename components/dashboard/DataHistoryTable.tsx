import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { ImageData } from "types/dashboard"

export const DataHistoryTable: React.FC<{ data: ImageData[] }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>データ履歴</CardTitle>
        <CardDescription>過去の測定結果一覧</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`overflow-x-auto ${isExpanded ? "" : "max-h-[400px]"} overflow-y-auto`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>身長 (cm)</TableHead>
                <TableHead>体重 (kg)</TableHead>
                <TableHead>筋肉量 (kg)</TableHead>
                <TableHead>体脂肪量 (kg)</TableHead>
                <TableHead>体脂肪率 (%)</TableHead>
                <TableHead>体水分量 (kg)</TableHead>
                <TableHead>タンパク質量 (kg)</TableHead>
                <TableHead>ミネラル量 (kg)</TableHead>
                <TableHead>得点</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <TableRow key={index}>
                  <TableCell>{item.created_at.split("T")[0]}</TableCell>
                  <TableCell>{item.height}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.muscle_weight}</TableCell>
                  <TableCell>{item.fat_weight}</TableCell>
                  <TableCell>{item.fat_percent}</TableCell>
                  <TableCell>{item.body_water}</TableCell>
                  <TableCell>{item.protein}</TableCell>
                  <TableCell>{item.mineral}</TableCell>
                  <TableCell>{item.point}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
