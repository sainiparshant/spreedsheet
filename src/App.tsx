"use client"

import { useState } from "react"
import { Toolbar } from "./components/Toolbar"
import { DataTable } from "./components/DataTable"
import { TabNavigation } from "./components/TabNavigation"
import { mockTasks } from "./data/mockData"
import type { TabData } from "./types"
import "./index.css"

const tabs: TabData[] = [
  { id: "all", label: "All Orders", count: 156 },
  { id: "pending", label: "Pending", count: 23 },
  { id: "reviewed", label: "Reviewed", count: 45 },
  { id: "arrived", label: "Arrived", count: 12 },
]

function App() {
  const [activeTab, setActiveTab] = useState("all")
  const [tableInstance, setTableInstance] = useState<unknown>(null)

  // Toolbar handlers
  const handleHideFields = () => {
    console.log("Hide fields clicked")
  }

  const handleSort = () => {
    console.log("Sort clicked")
  }

  const handleFilter = () => {
    console.log("Filter clicked")
  }

  const handleCellView = () => {
    console.log("Cell view clicked")
  }

  const handleImport = () => {
    console.log("Import clicked")
  }

  const handleExport = () => {
    console.log("Export clicked")
  }

  const handleShare = () => {
    console.log("Share clicked")
  }

  const handleNewAction = () => {
    console.log("New action clicked")
  }

  // Tab handlers
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    console.log(`Tab changed to: ${tabId}`)
  }

  const handleAddTab = () => {
    console.log("Add tab clicked")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-teal-600">Inscript Project</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Toolbar */}
        <Toolbar
          table={tableInstance}
          onHideFields={handleHideFields}
          onSort={handleSort}
          onFilter={handleFilter}
          onCellView={handleCellView}
          onImport={handleImport}
          onExport={handleExport}
          onShare={handleShare}
          onNewAction={handleNewAction}
        />

        {/* Data Table */}
        <div className="flex-1 p-4 overflow-hidden">
          <DataTable data={mockTasks} onTableReady={setTableInstance} />
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} onAddTab={handleAddTab} />
      </div>
    </div>
  )
}

export default App
