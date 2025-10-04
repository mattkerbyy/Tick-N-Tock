'use client'
import { motion } from 'framer-motion'
import { indexToCoord } from '@/lib/coords'

type HistoryEntry = {
  squares: Array<'X' | 'O' | null>
  lastMoveIndex: number | null
}

type MoveHistoryProps = {
  history: Array<HistoryEntry>
  currentMove: number
  // onJump is intentionally omitted to make the history read-only
}

export default function MoveHistory({
  history,
  currentMove,
}: MoveHistoryProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full mx-auto px-3 sm:px-4"
    >
      {/* Outer wrapper uses same horizontal padding as Board */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4 shadow-sm pointer-events-auto">
        <h2 className="font-pixel text-xs sm:text-sm mb-3 sm:mb-4 text-slate-800 dark:text-slate-200 tracking-wider">
          MOVE HISTORY
        </h2>

        <div className="max-h-48 sm:max-h-64 xl:max-h-80 overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5 sm:space-y-2">
            {history.map((h, move) => {
              const coord =
                h.lastMoveIndex != null ? indexToCoord(h.lastMoveIndex) : null
              const isCurrent = move === currentMove
              const movePlayer = move % 2 === 0 ? 'O' : 'X' // Previous player who made the move

              return (
                <motion.div
                  key={move}
                  className={[
                    'w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm',
                    'border font-mono',
                    // Neutral slate for normal entries; Amber highlight for current
                    isCurrent
                      ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 cursor-default'
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300',
                  ].join(' ')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: move * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-xs">
                      {move === 0 ? 'START' : `MOVE ${move}`}
                    </span>
                    {isCurrent && (
                      <span className="text-xs bg-amber-200 dark:bg-amber-800 px-1.5 py-0.5 rounded font-pixel">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {coord && (
                    <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                      <span
                        className={`font-bold text-sm sm:text-base ${
                          movePlayer === 'X'
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {movePlayer}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        → Row {coord.row + 1}, Col {coord.col + 1}
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
