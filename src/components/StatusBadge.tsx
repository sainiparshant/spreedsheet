import type React from "react"
import type { TaskData } from "../types"

interface StatusBadgeProps {
  status: TaskData["status"]
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: TaskData["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "need to start":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "complete":
        return "bg-green-100 text-green-800 border-green-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusStyles(status)}`}>{status}</span>
}
