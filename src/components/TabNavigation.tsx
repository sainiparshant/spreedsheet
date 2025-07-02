"use client"

import type React from "react"
import type { TabData } from "../types"
import { Plus } from "lucide-react"
import { Button } from "./ui/Button"

interface TabNavigationProps {
  tabs: TabData[]
  activeTab: string
  onTabChange: (tabId: string) => void
  onAddTab: () => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange, onAddTab }) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-teal-50 text-teal-700 border-b-2 border-teal-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}

        <Button variant="ghost" size="sm" onClick={onAddTab} className="ml-2 text-gray-500 hover:text-gray-700">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
