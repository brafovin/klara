import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'WM 2026 Fan Shop – Offizielle Fanartikel & Trikots',
  description: 'Dein Online-Shop für Fanartikel zur Fußball-Weltmeisterschaft 2026. Trikots, T-Shirts, Hoodies und mehr für alle Teams.',
  keywords: 'WM 2026, Weltmeisterschaft, Fanartikel, Trikots, Fußball',
  openGraph: {
    title: 'WM 2026 Fan Shop',
    description: 'Offizielle Fanartikel zur Fußball-WM 2026',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WM 2026 Fan Shop' }]
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" toastOptions={{
            duration: 3000,
            style: { background: '#1f2937', color: '#fff', borderRadius: '12px' }
          }} />
        </Providers>
      </body>
    </html>
  )
}
