import { Button, Input, Label } from "components/ui"
import { useCallback, useEffect, useState } from "react"
import type { ImageData } from "types/dashboard"

export const DateRangeSelector: React.FC<{
  data: ImageData[]
  onRangeChange: (startDate: string, endDate: string) => void
}> = ({ data, onRangeChange }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleChange = useCallback(() => {
    onRangeChange(startDate, endDate)
  }, [startDate, endDate])

  useEffect(() => {
    if (data && data.length > 0) {
      const newStartDate = data[0]?.created_at.split("T")[0]
      const newEndDate = data[data.length - 1]?.created_at.split("T")[0]
      setStartDate(newStartDate)
      setEndDate(newEndDate)
      handleChange()
    }
  }, [data, handleChange])

  return (
    <div className="flex flex-col space-y-2 w-full sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-end">
      <div className="flex flex-col space-y-1 flex-grow">
        <Label htmlFor="start-date">開始日</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={data[0]?.created_at}
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
          max={data[data.length - 1]?.created_at}
        />
      </div>
      <Button onClick={handleChange} className="w-full sm:w-auto">
        適用
      </Button>
    </div>
  )
}
