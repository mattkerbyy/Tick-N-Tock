'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="theme-preference"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
