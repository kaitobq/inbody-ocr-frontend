import { Card, CardHeader, CardTitle, CardDescription, CardContent, SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from "components/ui";
import { useState, useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

interface OrgDataChartProps {
    data: Array<{
      created_at: string;
      weight: number;
      muscle_weight: number;
      fat_percent: number;
      point: number;
    }>;
  }
  
export const OrgDataChart: React.FC<OrgDataChartProps> = ({ data }) => {
    const [selectedMetric, setSelectedMetric] = useState<keyof typeof metricOptions>('weight')
    
    const metricOptions = {
      weight: '平均体重 (kg)',
      muscle_weight: '平均筋肉量 (kg)',
      fat_percent: '平均体脂肪率 (%)',
      point: '平均得点',
    }
    
    const chartData = useMemo(() => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const groupedData = data.reduce((acc: { [key: string]: any }, record) => {
        const date = record.created_at.split('T')[0]
        if (!acc[date]) {
          acc[date] = { date, count: 0 }
          // biome-ignore lint/complexity/noForEach: <explanation>
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          Object.keys(metricOptions).forEach(key => acc[date][key] = 0)
        }
        acc[date].count++
        // biome-ignore lint/complexity/noForEach: <explanation>
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (Object.keys(metricOptions) as Array<keyof typeof record>).forEach(key => acc[date][key] += record[key])
        return acc
      }, {})
      
      return Object.values(groupedData).map(day => ({
        ...day,
        weight: day.weight / day.count,
        muscle_weight: day.muscle_weight / day.count,
        fat_percent: day.fat_percent / day.count,
        point: day.point / day.count,
      }))
    }, [data])
    
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>組織全体のデータ推移</CardTitle>
          <CardDescription>日次の平均値推移</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedMetric(value as keyof typeof metricOptions)} defaultValue={selectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="指標を選択" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(metricOptions).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" name={metricOptions[selectedMetric]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }