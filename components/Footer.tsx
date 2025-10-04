'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t-2 border-slate-200 dark:border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {/* Version badge with icon */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 rounded-full border border-slate-300 dark:border-slate-700 backdrop-blur-sm">
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-pixel text-indigo-600 dark:text-indigo-400">
                  X
                </span>
                <span className="text-xs font-pixel text-rose-600 dark:text-rose-400">
                  O
                </span>
              </div>
              <span className="font-pixel text-xs text-slate-600 dark:text-slate-400">
                v1.0
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4 text-sm"
          >
            <motion.a
              href="https://github.com/mattkerbyy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium group"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </motion.a>

            <span className="text-slate-300 dark:text-slate-600">•</span>

            {/* Animated 'Built with ♥' (Per-letter jump and animated heart) */}
            <motion.span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500 font-pixel text-xs">
              <span className="flex items-center gap-1">
                {Array.from('Built with').map((ch, i) => (
                  <motion.span
                    key={`bw-${i}`}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [0, -6, 0], opacity: [0, 1, 1] }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.9,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 1.6,
                    }}
                    className="inline-block"
                    aria-hidden={ch === ' '}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>

              <motion.span
                initial={{ scale: 1, y: 0 }}
                animate={{
                  scale: [1, 1.25, 1],
                  y: [0, -8, 0],
                  rotate: [0, -8, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
                className="text-rose-600 dark:text-rose-400 inline-block ml-1"
                aria-hidden
              >
                ♥
              </motion.span>
            </motion.span>
          </motion.div>
        </div>

        {/* Copyright notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center"
        >
          <p className="text-xs text-slate-500 dark:text-slate-600">
            © {new Date().getFullYear()} Tick N Tock. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
