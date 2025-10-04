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
}

export default function Board({
  squares,
  onPlay,
  winningLine,
  nextPlayer,
  disabled,
  lastPlayedIndex,
  winner,
}: BoardProps) {
  // Fixed top-left focus ring issue
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If no focus yet, initialize to 0 on first keyboard interaction
    const current = focusIndex ?? 0
    const row = Math.floor(current / 3)
    const col = current % 3
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setFocusIndex(((row + 2) % 3) * 3 + col)
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusIndex(((row + 1) % 3) * 3 + col)
        break
      case 'ArrowLeft':
        e.preventDefault()
        setFocusIndex(row * 3 + ((col + 2) % 3))
        break
      case 'ArrowRight':
        e.preventDefault()
        setFocusIndex(row * 3 + ((col + 1) % 3))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        // If focusIndex was null, use current (0)
        if (!squares[current] && !disabled) onPlay(current)
        break
    }
  }

  React.useEffect(() => {
    if (focusIndex === null) return
    const node = gridRef.current
    if (!node) return
    const child = node.querySelectorAll('button')[focusIndex] as
      | HTMLButtonElement
      | undefined
    child?.focus()
  }, [focusIndex])

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
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          // Only set focus index when the user actually focuses the grid (tab/click)
          if (focusIndex === null) setFocusIndex(0)
        }}
        className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 relative z-10 p-3 xs:p-4 sm:p-6 md:p-8 w-full mx-auto"
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
}
