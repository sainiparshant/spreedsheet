"use client"

import type React from "react"
import { EyeOff, ArrowUpDown, Filter, Grid3X3, Download, Upload, Share, Plus, Search, Bell, User } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

interface ToolbarProps {
  table?: unknown
  onHideFields: () => void
  onSort: () => void
  onFilter: () => void
  onCellView: () => void
  onImport: () => void
  onExport: () => void
  onShare: () => void
  onNewAction: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onHideFields,
  onSort,
  onFilter,
  onCellView,
  onImport,
  onExport,
  onShare,
  onNewAction,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {/* Header with breadcrumb and user info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Workspace</span>
          <span>{">"}</span>
          <span>Folder 2</span>
          <span>{">"}</span>
          <span className="font-medium text-gray-900">Spreadsheet 3</span>
          <div className="w-4 h-4 bg-purple-500 rounded ml-2"></div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search within sheet" className="pl-10 w-64 h-8 text-sm" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-gray-500 text-xs">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600 mr-3">Tool bar</span>


          <Button variant="ghost" size="sm" onClick={onHideFields} className="text-gray-600 hover:text-gray-900">
            <EyeOff className="w-4 h-4 mr-1" />
            Hide Fields
          </Button>

          <Button variant="ghost" size="sm" onClick={onSort} className="text-gray-600 hover:text-gray-900">
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort
          </Button>

          <Button variant="ghost" size="sm" onClick={onFilter} className="text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>

          <Button variant="ghost" size="sm" onClick={onCellView} className="text-gray-600 hover:text-gray-900">
            <Grid3X3 className="w-4 h-4 mr-1" />
            Cell view
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={onImport} className="text-gray-600 hover:text-gray-900">
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>

          <Button variant="ghost" size="sm" onClick={onExport} className="text-gray-600 hover:text-gray-900">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>

          <Button variant="ghost" size="sm" onClick={onShare} className="text-gray-600 hover:text-gray-900">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>

          <Button onClick={onNewAction} className="bg-teal-600 hover:bg-teal-700 text-white" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            New Action
          </Button>
        </div>
      </div>
    </div>
  )
}
