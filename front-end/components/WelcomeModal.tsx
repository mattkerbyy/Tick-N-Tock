'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameSounds } from '../hooks/useGameSounds'

type WelcomeModalProps = {
  open: boolean
  onClose: () => void
}

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [isExiting, setIsExiting] = React.useState(false)
  const [showStartButton, setShowStartButton] = React.useState(true)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const { playSound } = useGameSounds()

  // Initialize audio
  React.useEffect(() => {
    if (open && !audioRef.current) {
      audioRef.current = new Audio('/sounds/ArcadeGame.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [open])

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Play audio based on user interaction
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log('Audio play error:', err)
      })
    }

    // Hide start button
    setShowStartButton(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Don't close if start button is still showing
    if (showStartButton) return

    // Play game start sound effect
    playSound('welcome')

    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Start exit animation
    setIsExiting(true)

    // Close modal after animation completes
    setTimeout(() => {
      onClose()
      setIsExiting(false)
      setShowStartButton(true)
    }, 600)
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer result-modal-container"
        onClick={handleClick}
      >
        {/* Blurred backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

        {/* Welcome content */}
        <div
          className="relative z-10 text-center pointer-events-none select-none flex flex-col items-center justify-center w-full px-4"
          style={{
            maxWidth: '90vw',
            margin: '0 auto',
            left: 0,
            right: 0,
            position: 'relative',
          }}
        >
          {/* Main welcome title */}
          <motion.h1
            initial={{ scale: 0.3, y: 100, opacity: 0, rotateX: 90 }}
            animate={{
              scale: isExiting ? 0.3 : [0.3, 1.1, 1],
              y: isExiting ? -100 : [100, -20, 0],
              opacity: isExiting ? 0 : 1,
              rotateX: isExiting ? 90 : [90, -10, 0],
            }}
            transition={{
              duration: isExiting ? 0.5 : 0.8,
              ease: [0.68, -0.55, 0.265, 1.55],
              delay: isExiting ? 0 : 0.1,
              times: isExiting ? undefined : [0, 0.6, 1],
            }}
            className="font-pixel text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 tracking-wider text-cyan-400 drop-shadow-[0_0_40px_rgba(34,211,238,1)] animate-pulse-glow-cyan"
            style={{
              filter: 'brightness(1.3) saturate(1.4)',
              textShadow:
                '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.4)',
            }}
          >
            WELCOME TO
          </motion.h1>

          {/* Game title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isExiting ? 0 : [0, 1, 0.9, 1],
              scale: isExiting ? 0.5 : [0.5, 1.1, 0.95, 1],
            }}
            transition={{
              duration: isExiting ? 0.4 : 0.7,
              delay: isExiting ? 0 : 0.6,
              times: isExiting ? undefined : [0, 0.4, 0.7, 1],
            }}
            className="font-pixel text-5xl sm:text-7xl lg:text-9xl font-bold mb-6 tracking-wider drop-shadow-2xl text-white drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
            style={{
              filter: 'brightness(1.2)',
              textShadow:
                '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4)',
            }}
          >
            TICK N TOCK
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isExiting ? 0 : [0, 1, 0.8, 1],
              y: isExiting ? 50 : [30, -10, 5, 0],
            }}
            transition={{
              duration: isExiting ? 0.3 : 0.6,
              delay: isExiting ? 0 : 1,
              times: isExiting ? undefined : [0, 0.4, 0.7, 1],
            }}
            className="font-pixel text-lg sm:text-xl lg:text-2xl tracking-widest text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] mb-8"
          >
            A CLASSIC GAME REIMAGINED
          </motion.p>

          {/* Start button or close hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            className="flex flex-col items-center gap-4"
          >
            {showStartButton ? (
              <motion.button
                onClick={handleStartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="pointer-events-auto cursor-pointer relative bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-pixel text-lg sm:text-xl px-8 py-4 rounded-xl shadow-2xl border-2 border-cyan-300 overflow-hidden group"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {/* Glitch background layers */}
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-150 glitch-layer-1" />
                <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-150 glitch-layer-2" />

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'linear',
                  }}
                />

                {/* Button content with X and O */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400"
                    style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.8)' }}
                  >
                    X
                  </motion.span>

                  {/* Button text with glitch effect */}
                  <span
                    className="glitch-text tracking-wider"
                    data-text="GAME START"
                  >
                    GAME START
                  </span>

                  <motion.span
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400"
                    style={{ textShadow: '0 0 10px rgba(251, 113, 133, 0.8)' }}
                  >
                    O
                  </motion.span>
                </div>

                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-cyan-200"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.button>
            ) : (
              <>
                <motion.p
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-white/90 text-base sm:text-lg font-pixel tracking-wide"
                >
                  CLICK ANYWHERE TO START
                </motion.p>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-cyan-400 text-2xl"
                  style={{ textShadow: '0 0 12px rgba(34,211,238,0.6)' }}
                >
                  ↓
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="sparkles-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`welcome-sparkle-${i}`}
                className={`sparkle sparkle-${i % 3}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Floating symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['X', 'O', 'X', 'O'].map((symbol, i) => (
            <motion.span
              key={`welcome-symbol-${i}`}
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{
                opacity: [0, 0.3, 0.2, 0.3, 0],
                scale: [0, 0.8, 1, 0.8, 0],
                y: [100, -200, -400, -600, -800],
                rotate: [0, 180, 360, 540, 720],
              }}
              transition={{
                duration: 4,
                delay: 1 + i * 0.4,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className={`absolute font-pixel text-5xl font-bold ${
                symbol === 'X' ? 'text-indigo-400/30' : 'text-rose-400/30'
              }`}
              style={{
                left: `${15 + i * 20}%`,
                top: '90%',
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
