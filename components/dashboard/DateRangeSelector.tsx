import { Button, Input, Label } from "components/ui"
import { useEffect, useState } from "react"

type HasCreatedAt = {
  created_at: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

type DataType = HasCreatedAt[]

interface Props {
  data: DataType
  onRangeChange: (startDate: string, endDate: string) => void
}

export const DateRangeSelector = ( props: Props ) => {
  const { data, onRangeChange } = props

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data && data.length > 0) {
      const newStartDate = data[0]?.created_at
      const newEndDate = data[data.length - 1]?.created_at
      setStartDate(newStartDate)
      setEndDate(newEndDate)

      onRangeChange(newStartDate, newEndDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = () => {
    onRangeChange(startDate, endDate)
  }

  console.log(data[0]?.created_at, startDate)

  return (
    <div className="flex flex-col space-y-2 w-full sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-end">
      <div className="flex flex-col space-y-1 flex-grow">
        <Label htmlFor="start-date">開始日</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={startDate}
          max={endDate}
        />
      </div>
      <div className="flex flex-col space-y-1 flex-grow">
        <Label htmlFor="end-date">終了日</Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
          max={endDate}
        />
      </div>
      <Button onClick={handleChange} className="w-full sm:w-auto">
        適用
      </Button>
    </div>
  )
}
