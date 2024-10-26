import { Card, CardContent, CardHeader, CardTitle } from "components/ui"

interface StatCardProps {
  title: string
  value: string | number
  // change: number;
  icon: React.ReactNode
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {/* <p className="text-xs text-muted-foreground"> // api側の対応が必要
          前回比 {change > 0 ? '+' : ''}{change}
        </p> */}
    </CardContent>
  </Card>
)
