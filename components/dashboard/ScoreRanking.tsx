import { Card, CardHeader, CardTitle, CardDescription, CardContent, TableHeader, TableRow, TableHead, TableBody, TableCell, Button, Table } from "components/ui";
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ImageDataForScreen } from "types/dashboard";

interface Props {
  data: ImageDataForScreen[]
  }
  
 export const ScoreRanking = ( props: Props ) => {
  const { data } = props

    // const [sortColumn, setSortColumn] = useState<keyof typeof data[0]>('point')
    // const [sortDirection, setSortDirection] = useState('desc')
    const [isExpanded, setIsExpanded] = useState(false)
  
    // const sortedData = [...data].sort((a, b) => {
    //   if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    //   if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    //   return 0
    // })
  
    // const handleSort = (column: keyof typeof data[0]) => {
    //   if (column === sortColumn) {
    //     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    //   } else {
    //     setSortColumn(column)
    //     setSortDirection('desc')
    //   }
    // }
  
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>得点ランキング</CardTitle>
          <CardDescription>全ユーザーの得点ランキング</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className={`rounded-md border overflow-hidden ${isExpanded ? '' : 'max-h-[400px] overflow-y-auto'}`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>順位</TableHead>
                  <TableHead className="cursor-pointer">
                    名前
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    得点
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    最終測定日
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((record, index) => (
                  <TableRow key={record.user_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{record.user_name}</TableCell>
                    <TableCell>{record.point}</TableCell>
                    <TableCell>{record.created_at.split("T")[0]}</TableCell>
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
  