import React from 'react'
import { motion } from 'framer-motion'

type ResultModalProps = {
  open: boolean
  winner: 'X' | 'O' | null
  isDraw: boolean
  onClose: () => void
}

export default function ResultModal({
  open,
  winner,
  isDraw,
  onClose,
}: ResultModalProps) {
  if (!open) return null

  const title = winner ? `${winner} WINS!` : 'DRAW!'
  const subtitle = winner ? 'VICTORY!' : 'TIE GAME'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer result-modal-container ${
        winner ? 'animate-screen-shake' : ''
      }`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Text overlay  */}
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
        {/* Main title with enhanced effects */}
        <motion.h1
          initial={{ scale: 0.3, y: 100, opacity: 0, rotateX: 90 }}
          animate={{
            scale: [0.3, 1.1, 1],
            y: [100, -20, 0],
            opacity: 1,
            rotateX: [90, -10, 0],
          }}
          transition={{
            duration: 0.8,
            ease: [0.68, -0.55, 0.265, 1.55],
            delay: 0.1,
            times: [0, 0.6, 1],
          }}
          className={`font-pixel text-6xl sm:text-8xl lg:text-9xl font-bold mb-4 tracking-wider drop-shadow-2xl ${
            winner
              ? winner === 'X'
                ? 'text-indigo-400 drop-shadow-[0_0_40px_rgba(99,102,241,1)] animate-pulse-glow-indigo'
                : 'text-rose-400 drop-shadow-[0_0_40px_rgba(244,63,94,1)] animate-pulse-glow-rose'
              : 'text-amber-400 drop-shadow-[0_0_40px_rgba(245,158,11,1)] animate-pulse-glow-amber'
          }`}
          style={{
            filter: winner
              ? 'brightness(1.2) saturate(1.3)'
              : 'brightness(1.1)',
            textShadow: winner
              ? winner === 'X'
                ? '0 0 20px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.4)'
                : '0 0 20px rgba(244,63,94,0.8), 0 0 40px rgba(244,63,94,0.6), 0 0 60px rgba(244,63,94,0.4)'
              : '0 0 20px rgba(245,158,11,0.8), 0 0 40px rgba(245,158,11,0.6)',
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle with stagger effect */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 0.8, 1],
            y: [30, -10, 5, 0],
            scale: [0.8, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            times: [0, 0.4, 0.7, 1],
          }}
          className={`font-pixel text-xl sm:text-2xl lg:text-3xl tracking-widest ${
            winner
              ? winner === 'X'
                ? 'text-indigo-300 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]'
                : 'text-rose-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]'
              : 'text-amber-300 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]'
          }`}
        >
          {subtitle}
        </motion.p>

        {/* Click to continue hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="text-white/70 text-sm sm:text-base mt-8 font-pixel tracking-wide"
        >
          CLICK TO CONTINUE
        </motion.p>
      </div>

      {/* Confetti and fireworks for winner */}
      {winner && (
        <>
          {/* Main confetti burst */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="confetti-container-fullscreen">
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={`confetti-${i}`}
                  className={`confetti-big confetti-big-${i % 8}`}
                />
              ))}
            </div>
          </div>

          {/* Fireworks particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="fireworks-container">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={`firework-${i}`}
                  className={`firework firework-${i % 5}`}
                />
              ))}
            </div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="sparkles-container">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={`sparkle-${i}`}
                  className={`sparkle sparkle-${i % 3}`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Draw effects */}
      {isDraw && (
        <>
          {/* Floating symbols */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="draw-symbols-container">
              {['X', 'O', 'X', 'O', 'X', 'O'].map((symbol, i) => (
                <motion.span
                  key={`symbol-${i}`}
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{
                    opacity: [0, 0.6, 0.4, 0.6, 0],
                    scale: [0, 0.8, 1, 0.8, 0],
                    y: [100, -200, -400, -600, -800],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className={`absolute font-pixel text-4xl font-bold ${
                    symbol === 'X' ? 'text-indigo-400/40' : 'text-rose-400/40'
                  }`}
                  style={{
                    left: `${20 + i * 12}%`,
                    top: '80%',
                  }}
                >
                  {symbol}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Gentle particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="draw-particles-container">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={`draw-particle draw-particle-${i % 6}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
