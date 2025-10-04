import type { Metadata } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tick-n-tock.vercel.app'), // UPDATE ACTUAL DOMAIN ONCE DEPLOYED
  title: {
    default: 'Tick N Tock - Classic Tic-Tac-Toe Game Reimagined',
    template: '%s | Tick N Tock',
  },
  description:
    'Play Tick N Tock, the classic Tic-Tac-Toe game reimagined with modern design, smooth animations, and arcade sounds. Challenge your friends in this free online strategy game!',
  keywords: [
    'tic-tac-toe',
    'tick n tock',
    'online game',
    'strategy game',
    'board game',
    'puzzle game',
    'free game',
    'two player game',
    'noughts and crosses',
    'X and O game',
    'classic games',
    'arcade game',
    'web game',
    'multiplayer game',
  ],
  authors: [{ name: 'mattkerbyy' }],
  creator: 'mattkerbyy',
  publisher: 'mattkerbyy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tick-n-tock.vercel.app', // UPDATE ACTUAL DOMAIN ONCE DEPLOYED
    title: 'Tick N Tock - Classic Tic-Tac-Toe Game Reimagined',
    description:
      'Play Tick N Tock, the classic Tic-Tac-Toe game reimagined with modern design, smooth animations, and arcade sounds. Challenge your friends in this free online strategy game!',
    images: ['/opengraph-image.png'],
    siteName: 'Tick N Tock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tick N Tock - Classic Tic-Tac-Toe Game Reimagined',
    description:
      'Play Tick N Tock, the classic Tic-Tac-Toe game reimagined with modern design, smooth animations, and arcade sounds. Challenge your friends in this free online strategy game!',
    images: ['/opengraph-image.png'],
    creator: '@mattkerbyy_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.ico',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://tick-n-tock.vercel.app', // UPDATE ACTUAL DOMAIN ONCE DEPLOYED
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#020617"
          media="(prefers-color-scheme: dark)"
        />
          <meta name="msapplication-TileColor" content="#020617" />
          <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/apple-touch-167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-touch-152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-touch-120.png"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Tick N Tock - Classic Tic-Tac-Toe Game Reimagined',
              alternateName: 'Tick N Tock',
              description:
                'Play Tick N Tock, the classic Tic-Tac-Toe game reimagined with modern design, smooth animations, and arcade sounds. Challenge your friends in this free online strategy game!',
              url: 'https://tick-n-tock.vercel.app', // UPDATE ACTUAL DOMAIN ONCE DEPLOYED
              applicationCategory: 'GameApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              // aggregateRating: { // UPDATE ONCE ACTUAL RATING DATA IS AVAILABLE
              //   '@type': 'AggregateRating',
              //   ratingValue: '5.0',
              //   ratingCount: '1250',
              // },
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              permissions: 'No special permissions required',
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${pressStart2P.variable} font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
