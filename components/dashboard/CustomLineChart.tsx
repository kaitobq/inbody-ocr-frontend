import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui"
import { useState } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { DataGroups, ImageData } from "types/dashboard"
import { DateRangeSelector } from "./DateRangeSelector"

const dataGroups: DataGroups = {
  weight: {
    label: "体重関連 (kg)",
    keys: [
      "weight",
      "muscle_weight",
      "fat_weight",
      "body_water",
      "protein",
      "mineral",
    ],
  },
  percentage: {
    label: "体脂肪率 (%)",
    keys: ["fat_percent"],
  },
  height: {
    label: "身長 (cm)",
    keys: ["height"],
  },
  score: {
    label: "得点",
    keys: ["point"],
  },
}

const dataLabels = {
  height: "身長",
  weight: "体重",
  muscle_weight: "筋肉量",
  fat_weight: "体脂肪量",
  fat_percent: "体脂肪率",
  body_water: "体水分量",
  protein: "タンパク質量",
  mineral: "ミネラル量",
  point: "得点",
}

const dataColors = {
  height: "#8884d8",
  weight: "#82ca9d",
  muscle_weight: "#ffc658",
  fat_weight: "#ff8042",
  fat_percent: "#a4de6c",
  body_water: "#8dd1e1",
  protein: "#a4de6c",
  mineral: "#d0ed57",
  point: "#8884d8",
}

export const CustomLineChart: React.FC<{
  data: ImageData[]
  title: string
  description: string
}> = ({ data, title, description }) => {
  const [activeDataKeys, setActiveDataKeys] = useState<string[]>(
    dataGroups.weight.keys,
  )
  const [filteredData, setFilteredData] = useState(data)
  const [selectedGroup, setSelectedGroup] = useState("weight")

  const handleRangeChange = (start: string, end: string) => {
    const filtered = data.filter(
      (item) => item.created_at >= start && item.created_at <= end,
    )
    setFilteredData(filtered)
  }

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group)
    setActiveDataKeys(dataGroups[group].keys)
  }

  const handleDataKeyChange = (key: string, checked: boolean) => {
    setActiveDataKeys((prevKeys) =>
      checked ? [...prevKeys, key] : prevKeys.filter((k) => k !== key),
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-end mb-4">
          <DateRangeSelector data={data} onRangeChange={handleRangeChange} />
          <Select
            onValueChange={handleGroupChange}
            defaultValue={selectedGroup}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="データグループを選択" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dataGroups).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          {dataGroups[selectedGroup].keys.map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={activeDataKeys.includes(key)}
                onCheckedChange={(checked) =>
                  handleDataKeyChange(key, checked as boolean)
                }
              />
              <Label htmlFor={key}>
                {dataLabels[key as keyof typeof dataLabels]}
              </Label>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300} className="mt-4">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend
              onClick={() => {}} // ラベルクリックを無効化
              formatter={(value, entry) => {
                return <span style={{ color: entry.color }}>{value}</span>
              }}
            />
            {dataGroups[selectedGroup].keys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={dataColors[key as keyof typeof dataColors]}
                name={dataLabels[key as keyof typeof dataLabels]}
                hide={!activeDataKeys.includes(key)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
