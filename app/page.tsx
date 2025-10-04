'use client'
import { useState, useEffect } from 'react'
import Game from '@/components/Game'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WelcomeModal from '@/components/WelcomeModal'

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Show WelcomeModal on every page load/refresh
    setShowWelcome(true)
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="w-full">
          <Game />
        </div>
      </main>

      <Footer />

      {/* WelcomeModal (Shows only on first visit) */}
      <WelcomeModal open={showWelcome} onClose={handleCloseWelcome} />
    </div>
  )
}
