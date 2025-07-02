export interface TaskData {
  id: number
  jobRequest: string
  submitted: string
  status: "in-progress" | "need to start" | "complete" | "blocked"
  submitter: string
  url: string
  assigned: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  estValue: string
}

export interface TabData {
  id: string
  label: string
  count?: number
}


export interface KeyboardNavigationState {
  focusedRow: number
  focusedColumn: number
}
