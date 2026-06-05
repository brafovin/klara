'use client'
import Link from 'next/link'
import { useUIStore } from '@/store/uiStore'

export default function HeroBanner() {
  const { language } = useUIStore()

  const content = {
    de: { headline: 'WM 2026', sub: 'Fan Shop', tagline: 'Dein Ausrüster für die Fußball-Weltmeisterschaft 2026', cta1: 'Jetzt shoppen', cta2: 'Trikots ansehen' },
    en: { headline: 'WC 2026', sub: 'Fan Shop', tagline: 'Your gear shop for the 2026 Football World Cup', cta1: 'Shop Now', cta2: 'View Jerseys' },
    es: { headline: 'CM 2026', sub: 'Tienda Fan', tagline: 'Tu tienda para la Copa del Mundo de Fútbol 2026', cta1: 'Comprar ahora', cta2: 'Ver camisetas' },
  }
  const t = content[language] || content.de

  const teams = [
    { flag: '🇩🇪', name: 'Deutschland', color: 'from-gray-900 to-gray-600' },
    { flag: '🇧🇷', name: 'Brasilien', color: 'from-yellow-500 to-green-600' },
    { flag: '🇦🇷', name: 'Argentinien', color: 'from-sky-400 to-sky-600' },
    { flag: '🇫🇷', name: 'Frankreich', color: 'from-blue-700 to-red-600' },
    { flag: '🇪🇸', name: 'Spanien', color: 'from-red-600 to-yellow-400' },
    { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England', color: 'from-red-600 to-white' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-primary-950 to-gray-900 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative balls */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`absolute rounded-full opacity-10 animate-pulse-slow`}
          style={{
            width: `${60 + i * 40}px`, height: `${60 + i * 40}px`,
            background: `radial-gradient(circle, #22c55e, #3b82f6)`,
            top: `${10 + i * 12}%`, left: `${5 + i * 15}%`,
            animationDelay: `${i * 0.5}s`
          }} />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-primary-300 text-sm font-medium">⚽ USA · Kanada · Mexiko 2026</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-3">
            <span className="text-white">{t.headline}</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-primary-400 mb-6">{t.sub}</h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">{t.tagline}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/shop"
              className="btn-primary text-base px-8 py-4 !rounded-2xl flex items-center gap-2">
              🛍️ {t.cta1}
            </Link>
            <Link href="/shop?category=trikots"
              className="border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-white/10 flex items-center gap-2">
              👕 {t.cta2}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { value: '200+', label: 'Produkte' },
              { value: '32', label: 'Teams' },
              { value: '50K+', label: 'Fans' },
              { value: '4.8⭐', label: 'Bewertung' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team flags row */}
        <div className="mt-16 flex flex-wrap gap-3">
          {teams.map(team => (
            <Link key={team.name} href={`/shop?team=${team.name.toLowerCase()}`}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-xl px-4 py-2.5 transition-all hover:-translate-y-0.5">
              <span className="text-xl">{team.flag}</span>
              <span className="text-sm font-medium text-gray-200">{team.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
