'use client'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import React from 'react'
import { useGameSounds } from '../hooks/useGameSounds'

// Sun icon component
const SunIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

// Moon icon component
const MoonIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
  const { playSound } = useGameSounds()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    // Ensure system theme is detected on first mount if no preference is stored
    if (!localStorage.getItem('theme-preference')) {
      // Let next-themes detect and apply system theme
      setTheme('system')
    }
  }, [setTheme])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 animate-pulse" />
    )
  }

  // Priority 1: Use resolvedTheme (Which respects device theme via enableSystem in ThemeProvider)
  // Priority 2: Fall back to light theme if nothing is detected
  const current = resolvedTheme || systemTheme || 'light'
  const isDark = current === 'dark'
  const next = isDark ? 'light' : 'dark'

  return (
    <motion.button
      type="button"
      onClick={() => {
        // Play sound based on what theme we're switching to
        playSound(next === 'light' ? 'theme-toggle-day' : 'theme-toggle-night')
        setTheme(next)
      }}
      aria-label={`Switch to ${next} mode`}
      className="relative w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`${
          isDark ? 'text-blue-400' : 'text-yellow-500'
        } group-hover:scale-110 transition-transform duration-200`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </motion.button>
  )
}
