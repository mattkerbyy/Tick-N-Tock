'use client'
import React from 'react'
import { motion } from 'framer-motion'

type SquareProps = {
  value: 'X' | 'O' | null
  onClick: () => void
  highlighted?: boolean
  focused?: boolean
  disabled?: boolean
  isLastPlayed?: boolean
  index: number
}

export default function Square({
  value,
  onClick,
  highlighted,
  focused,
  disabled,
  isLastPlayed,
  index,
}: SquareProps) {
  const getHighlightColor = () => {
    if (highlighted)
      return 'bg-amber-200/70 dark:bg-amber-500/30 border-amber-400 dark:border-amber-500'
    if (isLastPlayed && value) {
      return value === 'X'
        ? 'bg-indigo-100/70 dark:bg-indigo-900/30 border-indigo-400 dark:border-indigo-500 ring-2 ring-indigo-400 dark:ring-indigo-500'
        : 'bg-rose-100/70 dark:bg-rose-900/30 border-rose-400 dark:border-rose-500 ring-2 ring-rose-400 dark:ring-rose-500'
    }
    return 'bg-white dark:bg-slate-900'
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={`Cell ${index + 1}${value ? `, ${value}` : ', empty'}`}
      aria-selected={focused}
      onClick={onClick}
      onPointerDown={(e: React.PointerEvent) => {
        if (e.pointerType) {
          e.preventDefault()
        }
      }}
      className={[
        'aspect-square w-full rounded-lg border text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel flex items-center justify-center select-none relative overflow-hidden touch-manipulation',
        'transition-all duration-200 ease-in-out',
        'border-slate-300 dark:border-slate-700',
        'hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600',
        'min-h-[60px] xs:min-h-[70px] sm:min-h-[80px] md:min-h-[90px]',
        getHighlightColor(),
        disabled ? 'cursor-not-allowed opacity-90' : 'cursor-pointer',
        focused ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : '',
      ].join(' ')}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {value && (
        <motion.span
          key={`${index}-${value}`}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.18,
            type: 'spring',
            stiffness: 500,
            damping: 20,
            mass: 0.6,
          }}
          className={`font-bold flex items-center justify-center w-full h-full absolute inset-0 game-symbol ${
            value === 'X'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          {value}
        </motion.span>
      )}

      {/* Hover glow effect */}
      {!disabled && !value && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 to-rose-200/20 dark:from-indigo-800/20 dark:to-rose-800/20 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
}
