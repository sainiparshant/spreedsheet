"use client"

import { useEffect, useCallback, useState } from "react"
import type { KeyboardNavigationState } from "../types"

interface UseKeyboardNavigationProps {
  rowCount: number
  columnCount: number
  onCellFocus?: (row: number, column: number) => void
}

export const useKeyboardNavigation = ({ rowCount, columnCount, onCellFocus }: UseKeyboardNavigationProps) => {
  const [focusState, setFocusState] = useState<KeyboardNavigationState>({
    focusedRow: 0,
    focusedColumn: 0,
  })

  const moveFocus = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      setFocusState((prev) => {
        let newRow = prev.focusedRow
        let newColumn = prev.focusedColumn

        switch (direction) {
          case "up":
            newRow = Math.max(0, prev.focusedRow - 1)
            break
          case "down":
            newRow = Math.min(rowCount - 1, prev.focusedRow + 1)
            break
          case "left":
            newColumn = Math.max(0, prev.focusedColumn - 1)
            break
          case "right":
            newColumn = Math.min(columnCount - 1, prev.focusedColumn + 1)
            break
        }

        const newState = { focusedRow: newRow, focusedColumn: newColumn }
        onCellFocus?.(newRow, newColumn)
        return newState
      })
    },
    [rowCount, columnCount, onCellFocus],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Only handle arrow keys when focus is on the table
      if (!event.target || !(event.target as Element).closest('[data-keyboard-nav="true"]')) {
        return
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault()
          moveFocus("up")
          break
        case "ArrowDown":
          event.preventDefault()
          moveFocus("down")
          break
        case "ArrowLeft":
          event.preventDefault()
          moveFocus("left")
          break
        case "ArrowRight":
          event.preventDefault()
          moveFocus("right")
          break
        case "Home":
          event.preventDefault()
          setFocusState({ focusedRow: 0, focusedColumn: 0 })
          onCellFocus?.(0, 0)
          break
        case "End":
          event.preventDefault()
          setFocusState({
            focusedRow: rowCount - 1,
            focusedColumn: columnCount - 1,
          })
          onCellFocus?.(rowCount - 1, columnCount - 1)
          break
      }
    },
    [moveFocus, rowCount, columnCount, onCellFocus],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const setFocus = useCallback(
    (row: number, column: number) => {
      setFocusState({ focusedRow: row, focusedColumn: column })
      onCellFocus?.(row, column)
    },
    [onCellFocus],
  )

  return {
    focusedRow: focusState.focusedRow,
    focusedColumn: focusState.focusedColumn,
    setFocus,
    moveFocus,
  }
}
