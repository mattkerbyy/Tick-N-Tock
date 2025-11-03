'use client'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b-2 border-slate-200/50 dark:border-slate-700/50 shadow-sm dark:shadow-slate-950/50"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            {/* Logo with X and O */}
            <div className="flex items-center gap-0.5">
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-xl sm:text-2xl font-pixel text-indigo-600 dark:text-indigo-400"
                style={{ textShadow: '0 0 8px rgba(99, 102, 241, 0.4)' }}
              >
                X
              </motion.span>
              <motion.span
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="text-xl sm:text-2xl font-pixel text-rose-600 dark:text-rose-400"
                style={{ textShadow: '0 0 8px rgba(251, 113, 133, 0.4)' }}
              >
                O
              </motion.span>
            </div>

            <h1 className="text-lg sm:text-xl lg:text-2xl font-pixel text-slate-900 dark:text-slate-100 tracking-wider">
              TICK N TOCK
            </h1>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
