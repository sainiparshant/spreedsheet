

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import type { TaskData } from "../types"
import { StatusBadge } from "./StatusBadge"
import { PriorityBadge } from "./PriorityBadge"
import { ArrowUpDown } from "lucide-react"
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation"
import { GripVertical } from "lucide-react"

interface DataTableProps {
  data: TaskData[]
  onTableReady?: (table: any) => void
}

const columnHelper = createColumnHelper<TaskData>()

export const DataTable: React.FC<DataTableProps> = ({ data, onTableReady }) => {
  const statusOptions: FilterOption[] = [
    { value: "in-progress", label: "In Progress" },
    { value: "need to start", label: "Need to Start" },
    { value: "complete", label: "Complete" },
    { value: "blocked", label: "Blocked" },
  ]

  const priorityOptions: FilterOption[] = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ]

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "rowNumber",
        header: "",
        cell: ({ row }) => <div className="w-8 text-center text-sm text-gray-500 font-mono">{row.index + 1}</div>,
        size: 40,
      }),
      columnHelper.accessor("jobRequest", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Job Request</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-900 max-w-xs truncate">{getValue()}</div>,
        size: 250,
      }),
      columnHelper.accessor("submitted", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Submitted</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-600">{getValue()}</div>,
        size: 100,
      }),
      columnHelper.accessor("status", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Status</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
        size: 120,
      }),
      columnHelper.accessor("submitter", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Submitter</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-900">{getValue()}</div>,
        size: 120,
      }),
      columnHelper.accessor("url", {
        header: "URL",
        cell: ({ getValue }) => (
          <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer max-w-xs truncate">{getValue()}</div>
        ),
        size: 150,
      }),
      columnHelper.accessor("assigned", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Assigned</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-900">{getValue()}</div>,
        size: 120,
      }),
      columnHelper.accessor("priority", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Priority</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
        size: 100,
      }),
      columnHelper.accessor("dueDate", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Due Date</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-600">{getValue()}</div>,
        size: 100,
      }),
      columnHelper.accessor("estValue", {
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Est. Value</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: ({ getValue }) => <div className="text-sm text-gray-900 font-medium">{getValue()}</div>,
        size: 100,
      }),
    ],
    [],
  )


  const { focusedRow, focusedColumn, setFocus } = useKeyboardNavigation({
    rowCount: data.length,
    columnCount: columns.length,
    onCellFocus: (row, column) => {
      // Focus the specific cell
      const cellElement = document.querySelector(`[data-row="${row}"][data-column="${column}"]`) as HTMLElement
      cellElement?.focus()
    },
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  })

  useEffect(() => {
    if (onTableReady) {
      onTableReady(table)
    }
  }, [table, onTableReady])

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* table header */}

      <div className="bg-teal-50 border-b border-teal-200">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <span className="text-sm font-medium text-teal-800">Q3 Financial Overview</span>
            <span className="text-xs text-teal-600">Q3</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-teal-700">ABC</span>
            <span className="text-sm text-teal-700">Answer a question</span>
            <span className="text-sm text-teal-700">Extract</span>
            <button className="w-6 h-6 bg-teal-500 text-white rounded flex items-center justify-center text-sm font-bold hover:bg-teal-600">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="relative px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex flex-col space-y-2">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {/* Resize handle */}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className="absolute right-0 top-0 h-full w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <GripVertical className="w-3 h-3 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        )}
                      </div>

                      </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" data-keyboard-nav="true">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className={`hover:bg-gray-50 ${rowIndex < 5 ? "bg-white" : "bg-gray-25"}`}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={cell.id}
                    data-row={rowIndex}
                    data-column={cellIndex}
                    tabIndex={0}
                    onClick={() => setFocus(rowIndex, cellIndex)}
                    className={`px-4 py-3 whitespace-nowrap border-r border-gray-100 last:border-r-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-teal-50 ${
                      focusedRow === rowIndex && focusedColumn === cellIndex ? "ring-2 ring-teal-500 bg-teal-50" : ""
                    }`}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {/* Empty rows */}
            {Array.from({ length: 50 }, (_, index) => (
                <tr key={`empty-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap border-r border-gray-100 text-center text-sm text-gray-400">
                    {data.length + index + 1}
                  </td>
                  {Array.from({ length: columns.length - 1 }, (_, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 whitespace-nowrap border-r border-gray-100 last:border-r-0">
                      {cellIndex === 0 && index === 0 ? (
                        <div className="w-32 h-8 border border-gray-300 rounded bg-white"></div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}
