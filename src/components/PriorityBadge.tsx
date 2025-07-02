import type React from "react"
import type { TaskData } from "../types"

interface PriorityBadgeProps {
  priority: TaskData["priority"]
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = (priority: TaskData["priority"]) => {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold"
      case "Medium":
        return "text-yellow-600 font-semibold"
      case "Low":
        return "text-blue-600 font-semibold"
      default:
        return "text-gray-600 font-semibold"
    }
  }

  return <span className={`text-sm ${getPriorityStyles(priority)}`}>{priority}</span>
}
