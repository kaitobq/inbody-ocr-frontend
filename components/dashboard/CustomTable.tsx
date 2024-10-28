import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui"
import { ArrowUpDown } from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"

interface ColumnDefinition<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  className?: string
  headerClassName?: string
  render?: (item: T, index: number) => React.ReactNode
}

interface CustomTableProps<T> {
  columns: ColumnDefinition<T>[]
  data: T[]
  enableSorting?: boolean
  rowClassName?: (item: T) => string
  defaultSortColumn?: keyof T | string
  defaultSortDirection?: "asc" | "desc"
}

export const CustomTable = <T extends object>({
  columns,
  data,
  enableSorting = false,
  rowClassName,
  defaultSortColumn,
  defaultSortDirection = "asc",
}: CustomTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | string | null>(
    defaultSortColumn || null,
  )
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection,
  )

  const sortedData = useMemo(() => {
    if (!enableSorting || !sortColumn) return data
    return [...data].sort((a, b) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const aValue = (a as any)[sortColumn]
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const bValue = (b as any)[sortColumn]
      if (aValue === bValue) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      return (aValue < bValue ? -1 : 1) * (sortDirection === "asc" ? 1 : -1)
    })
  }, [data, sortColumn, sortDirection, enableSorting])

  const handleSort = (columnKey: keyof T | string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={String(column.key)}
              className={`${column.headerClassName || ""} ${
                column.sortable ? "cursor-pointer" : ""
              }`}
              onClick={
                column.sortable ? () => handleSort(column.key) : undefined
              }
            >
              {column.label}
              {enableSorting &&
                column.sortable &&
                sortColumn === column.key && (
                  <ArrowUpDown className="inline ml-2 h-4 w-4" />
                )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={rowClassName ? rowClassName(item) : ""}
          >
            {columns.map((column) => (
              <TableCell key={String(column.key)} className={column.className}>
                {column.render
                  ? column.render(item, index)
                  : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    (item as any)[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
