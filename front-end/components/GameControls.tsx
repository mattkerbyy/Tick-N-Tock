'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

type GameControlsProps = {
  nextPlayer: 'X' | 'O'
  onReset: () => void
  gameStatus: string
  isGameOver: boolean
  loading?: boolean
}

export default function GameControls({
  nextPlayer,
  onReset,
  gameStatus,
  isGameOver,
  loading = false,
}: GameControlsProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Render skeleton when loading
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between w-full mb-1 xs:mb-1.5 sm:mb-2 px-3 xs:px-4 sm:px-6 md:px-8"
      >
        <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between w-full mb-1 xs:mb-1.5 sm:mb-2 px-3 xs:px-4 sm:px-6 md:px-8"
    >
      <div className="flex items-center gap-1 xs:gap-2">
        <motion.div
          key={gameStatus}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-base xs:text-lg sm:text-xl font-pixel text-slate-700 dark:text-slate-300"
        >
          {isGameOver ? (
            <span
              className={`${
                gameStatus.includes('Winner')
                  ? gameStatus.includes('X')
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-rose-600 dark:text-rose-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {gameStatus}
            </span>
          ) : (
            <span className="flex items-center gap-2 xs:gap-3">
              <span className="text-sm xs:text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Next:
              </span>
              <motion.span
                key={nextPlayer}
                initial={{ scale: 1.2, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`text-xl xs:text-2xl sm:text-3xl font-bold ${
                  nextPlayer === 'X'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {nextPlayer}
              </motion.span>
            </span>
          )}
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={onReset}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-3 xs:px-4 py-2 xs:py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-pixel text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-600 transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation min-h-[44px] min-w-[80px] overflow-hidden"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Base layer */}
        <motion.span
          className="relative block pointer-events-none"
          animate={isHovered ? { x: [0, -1, 1, 0], y: [0, 0.5, -0.5, 0] } : {}}
          transition={{
            duration: 0.15,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          RESET
        </motion.span>

        {/* Red glitch layer (When hovered) */}
        <motion.span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-rose-500 dark:text-rose-400 mix-blend-screen pointer-events-none"
          initial={{ opacity: 0, x: 0 }}
          animate={
            isHovered
              ? {
                  opacity: [0, 0.7, 0.7, 0],
                  x: [0, -2, 2, -1, 0],
                  clipPath: [
                    'inset(0 0 0 0)',
                    'inset(0 40% 0 0)',
                    'inset(0 0 0 40%)',
                    'inset(40% 0 0 0)',
                    'inset(0 0 0 0)',
                  ],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        >
          RESET
        </motion.span>

        {/* Blue glitch layer (When hovered) */}
        <motion.span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-cyan-500 dark:text-cyan-400 mix-blend-screen pointer-events-none"
          initial={{ opacity: 0, x: 0 }}
          animate={
            isHovered
              ? {
                  opacity: [0, 0.6, 0.6, 0],
                  x: [0, 2, -2, 1, 0],
                  clipPath: [
                    'inset(0 0 0 0)',
                    'inset(0 0 40% 0)',
                    'inset(40% 0 0 0)',
                    'inset(0 0 0 40%)',
                    'inset(0 0 0 0)',
                  ],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.35,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        >
          RESET
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
