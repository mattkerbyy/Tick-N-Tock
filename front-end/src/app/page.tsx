'use client'
import { useState, useEffect } from 'react'
import Game from '../components/Game'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WelcomeModal from '../components/WelcomeModal'

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // sessionStorage clears when all tabs of the site are closed
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')

    if (!hasSeenWelcome) {
      // First time in this session (Show the welcome modal)
      setShowWelcome(true)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    // Mark that user has seen the welcome modal in this session (This will reset when all tabs are closed)
    sessionStorage.setItem('hasSeenWelcome', 'true')

    // Focus the game board after modal closes
    setTimeout(() => {
      if ((window as any).focusGameBoard) {
        ;(window as any).focusGameBoard()
      }
    }, 100)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="w-full">
          <Game initialLoading={showWelcome} />
        </div>
      </main>

      <Footer />

      {/* WelcomeModal (Shows only on first visit) */}
      <WelcomeModal open={showWelcome} onClose={handleCloseWelcome} />
    </div>
  )
}
