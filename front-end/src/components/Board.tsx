'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Square from './Square'
import WinnerLine from './WinnerLine'

type BoardProps = {
  squares: Array<'X' | 'O' | null>
  onPlay: (index: number) => void
  winningLine: number[] | null
  nextPlayer: 'X' | 'O'
  disabled?: boolean
  lastPlayedIndex?: number | null
  winner?: 'X' | 'O' | null
  loading?: boolean
}

const Board = React.forwardRef<HTMLDivElement, BoardProps>(function Board(
  {
    squares,
    onPlay,
    winningLine,
    nextPlayer,
    disabled,
    lastPlayedIndex,
    winner,
    loading = false,
  },
  forwardedRef,
) {
  // Keyboard navigation: track which cell (0-8) has focus
  // Null means no keyboard focus is active (User hasn't used keyboard yet or game ended)
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)

  // Merge forwarded ref with internal ref
  React.useImperativeHandle(forwardedRef, () => gridRef.current!, [])

  // Clear focus when game ends (winner or draw)
  React.useEffect(() => {
    if (disabled) {
      setFocusIndex(null)
    }
  }, [disabled])

  // Focus the current button whenever focusIndex changes (Only if not null)
  React.useEffect(() => {
    if (focusIndex !== null && !disabled && gridRef.current) {
      const buttons = gridRef.current.querySelectorAll('button')
      const targetButton = buttons?.[focusIndex] as
        | HTMLButtonElement
        | undefined
      targetButton?.focus()
    }
  }, [focusIndex, disabled, squares])

  // Global keyboard listener for board navigation
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only handle if game is active (Not disabled) and no input elements are focused
      if (disabled) return
      const activeElement = document.activeElement
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Initialize focus to last played index or 0 if user hasn't used keyboard yet
      const current =
        focusIndex !== null
          ? focusIndex
          : lastPlayedIndex !== null && lastPlayedIndex !== undefined
            ? lastPlayedIndex
            : 0
      const row = Math.floor(current / 3)
      const col = current % 3
      let newIndex = current
      let handled = false

      switch (e.key) {
        // Support WASD (Both lowercase and uppercase) for accessibility
        case 'w':
        case 'W':
        case 'ArrowUp':
          e.preventDefault()
          newIndex = ((row + 2) % 3) * 3 + col
          handled = true
          break
        case 's':
        case 'S':
        case 'ArrowDown':
          e.preventDefault()
          newIndex = ((row + 1) % 3) * 3 + col
          handled = true
          break
        case 'a':
        case 'A':
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = row * 3 + ((col + 2) % 3)
          handled = true
          break
        case 'd':
        case 'D':
        case 'ArrowRight':
          e.preventDefault()
          newIndex = row * 3 + ((col + 1) % 3)
          handled = true
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (!squares[current] && !disabled) {
            onPlay(current)
            // After placing a move, clear the focus ring
            // It will reappear when user presses a navigation key
            setFocusIndex(null)
          }
          handled = true
          break
      }

      // If a navigation key was pressed, update focus index
      if (
        handled &&
        (e.key === 'w' ||
          e.key === 'W' ||
          e.key === 'ArrowUp' ||
          e.key === 's' ||
          e.key === 'S' ||
          e.key === 'ArrowDown' ||
          e.key === 'a' ||
          e.key === 'A' ||
          e.key === 'ArrowLeft' ||
          e.key === 'd' ||
          e.key === 'D' ||
          e.key === 'ArrowRight')
      ) {
        setFocusIndex(newIndex)
      }
    }

    // Add listener to document
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [focusIndex, lastPlayedIndex, squares, disabled, onPlay])

  // Render lightweight skeleton when loading flag is set
  if (loading) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative w-full mx-auto"
      >
        <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 relative z-10 p-3 xs:p-4 sm:p-6 md:p-8 w-full mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`board-skel-${i}`}
              className="aspect-square w-full rounded-lg border bg-slate-100 dark:bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative w-full mx-auto"
    >
      <div
        ref={gridRef}
        role="grid"
        aria-label="Tick N Tock board"
        aria-disabled={disabled}
        className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 relative z-10 p-3 xs:p-4 sm:p-6 md:p-8 w-full mx-auto outline-none"
      >
        {squares.map((sq, i) => (
          <Square
            key={i}
            index={i}
            value={sq}
            onClick={() => onPlay(i)}
            highlighted={!!winningLine?.includes(i)}
            focused={focusIndex === i}
            disabled={disabled || !!sq}
            isLastPlayed={lastPlayedIndex === i}
          />
        ))}
      </div>

      {/* Winner line overlay */}
      <WinnerLine line={winningLine} winner={winner || null} />
    </motion.div>
  )
})

export default Board
