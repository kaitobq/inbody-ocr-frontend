import { Card, CardHeader, CardTitle, CardDescription, CardContent, TableHeader, TableRow, TableHead, TableBody, TableCell, Button, Table } from "components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { AlertTriangle, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";
import type { ImageDataForScreen } from "types/dashboard";

interface Props {
    data: ImageDataForScreen[]
  }
  
export const UserTable = (props: Props) => {
  const { data } = props
    const [sortColumn, setSortColumn] = useState<keyof typeof data[0] | null>(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [isExpanded, setIsExpanded] = useState(false)
  
    const sortedData = useMemo(() => {
      if (!sortColumn) return data
      return [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }, [data, sortColumn, sortDirection])
  
    const handleSort = (column: keyof typeof data[0]) => {
      if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortColumn(column)
        setSortDirection('asc')
      }
    }
  
    const averageLastMeasurement = useMemo(() => {
      const sum = data.reduce((acc, record) => acc + new Date(record.created_at).getTime(), 0)
      return new Date(sum / data.length)
    }, [data])
  
    const tenDaysAgo = new Date(averageLastMeasurement.getTime() - 10 * 24 * 60 * 60 * 1000)
  
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>ユーザー一覧</CardTitle>
          <CardDescription>全ユーザーの最新測定データ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`rounded-md border overflow-hidden ${isExpanded ? '' : 'max-h-[400px] overflow-y-auto'}`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('user_id')} className="cursor-pointer">
                    名前 {sortColumn === 'user_id' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('height')} className="cursor-pointer">
                    身長 (cm) {sortColumn === 'height' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('weight')} className="cursor-pointer">
                    体重 (kg) {sortColumn === 'weight' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('muscle_weight')} className="cursor-pointer">
                    筋肉量 (kg) {sortColumn === 'muscle_weight' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('fat_weight')} className="cursor-pointer">
                    体脂肪量 (kg) {sortColumn === 'fat_weight' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('fat_percent')} className="cursor-pointer">
                    体脂肪率 (%) {sortColumn === 'fat_percent' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('body_water')} className="cursor-pointer">
                    体水分量 (kg) {sortColumn === 'body_water' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('protein')} className="cursor-pointer">
                    タンパク質 (kg) {sortColumn === 'protein' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('mineral')} className="cursor-pointer">
                    ミネラル (kg) {sortColumn === 'mineral' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('point')} className="cursor-pointer">
                    得点 {sortColumn === 'point' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                  <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                    測定日 {sortColumn === 'created_at' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((record) => (
                  <TableRow key={record.user_id} className={new Date(record.created_at) < tenDaysAgo ? 'bg-red-100' : ''}>
                    <TableCell>{record.user_name}</TableCell>
                    <TableCell>{record.height.toFixed(1)}</TableCell>
                    <TableCell>{record.weight.toFixed(1)}</TableCell>
                    <TableCell>{record.muscle_weight.toFixed(1)}</TableCell>
                    <TableCell>{record.fat_weight.toFixed(1)}</TableCell>
                    <TableCell>{record.fat_percent.toFixed(1)}</TableCell>
                    <TableCell>{record.body_water.toFixed(1)}</TableCell>
                    <TableCell>{record.protein.toFixed(1)}</TableCell>
                    <TableCell>{record.mineral.toFixed(1)}</TableCell>
                    <TableCell>{record.point}</TableCell>
                    <TableCell className="flex items-center">
                      
                      {record.created_at.split("T")[0]}
                      {new Date(record.created_at) < tenDaysAgo && (
                        <Popover>
                          <PopoverTrigger>
                            <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                          </PopoverTrigger>
                          <PopoverContent>
                            最終測定日が平均より10日以上前です。測定を促してください。
                          </PopoverContent>
                        </Popover>
                      )}
                    </TableCell>
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
  