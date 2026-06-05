import HeroBanner from '@/components/home/HeroBanner'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CountdownTimer from '@/components/ui/CountdownTimer'
import Link from 'next/link'

const WM_FINAL_DATE = new Date('2026-07-19T18:00:00Z')

const categories = [
  { href: '/shop?category=trikots', emoji: '👕', label: 'Trikots', desc: 'Authentische Fan-Trikots', color: 'from-green-500 to-emerald-600' },
  { href: '/shop?category=hoodies', emoji: '🧥', label: 'Hoodies', desc: 'Gemütliche Fan-Hoodies', color: 'from-blue-500 to-indigo-600' },
  { href: '/shop?category=caps', emoji: '🧢', label: 'Caps', desc: 'Stylische Fan-Caps', color: 'from-orange-500 to-red-500' },
  { href: '/shop?category=limited', emoji: '🔥', label: 'Limited Edition', desc: 'Exklusive Editionen', color: 'from-purple-500 to-pink-500' },
  { href: '/shop?category=kinder', emoji: '🧒', label: 'Kinder', desc: 'Für die kleinen Fans', color: 'from-yellow-400 to-orange-500' },
  { href: '/shop?category=schals', emoji: '🧣', label: 'Schals & Caps', desc: 'Accessoires für Fans', color: 'from-teal-500 to-cyan-600' },
]

const teamCards = [
  { href: '/shop?team=deutschland', flag: '🇩🇪', name: 'Deutschland', bg: 'bg-gray-900', text: 'text-white' },
  { href: '/shop?team=brasilien', flag: '🇧🇷', name: 'Brasilien', bg: 'bg-yellow-400', text: 'text-green-800' },
  { href: '/shop?team=argentinien', flag: '🇦🇷', name: 'Argentinien', bg: 'bg-sky-400', text: 'text-sky-900' },
  { href: '/shop?team=frankreich', flag: '🇫🇷', name: 'Frankreich', bg: 'bg-blue-700', text: 'text-white' },
  { href: '/shop?team=spanien', flag: '🇪🇸', name: 'Spanien', bg: 'bg-red-600', text: 'text-yellow-300' },
  { href: '/shop?team=england', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England', bg: 'bg-red-700', text: 'text-white' },
]

export default function HomePage() {
  return (
    <>
      <HeroBanner />

      {/* Countdown */}
      <section className="bg-gray-50 dark:bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <CountdownTimer targetDate={WM_FINAL_DATE} label="WM-Finale 2026" />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Kategorien</p>
          <h2 className="section-title">Für jeden Fan das Richtige</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href}
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
              <div className="relative">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-lg">{cat.label}</h3>
                <p className="text-white/80 text-sm mt-1">{cat.desc}</p>
                <span className="mt-3 inline-block text-sm font-medium group-hover:translate-x-1 transition-transform">Entdecken →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProducts />

      {/* Teams */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Teams</p>
            <h2 className="section-title">Dein Team – Deine Farben</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {teamCards.map(team => (
              <Link key={team.name} href={team.href}
                className={`${team.bg} ${team.text} rounded-2xl p-5 text-center hover:scale-105 transition-transform shadow-md hover:shadow-lg`}>
                <div className="text-4xl mb-2">{team.flag}</div>
                <div className="font-bold text-sm">{team.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: '🚚', title: 'Kostenloser Versand', desc: 'Ab €50 Bestellwert' },
            { icon: '↩️', title: '30 Tage Rückgabe', desc: 'Einfach & unkompliziert' },
            { icon: '🔒', title: 'Sichere Zahlung', desc: 'Stripe, PayPal & mehr' },
            { icon: '💬', title: 'Kundensupport', desc: 'Mo–Fr 9–18 Uhr' },
          ].map(usp => (
            <div key={usp.title} className="card p-6 text-center">
              <div className="text-4xl mb-3">{usp.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{usp.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{usp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 p-10 md:p-16 text-white text-center relative">
          <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-around pointer-events-none select-none">
            ⚽ 🏆 ⚽
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black mb-4">10% Rabatt mit Code</h2>
            <div className="inline-block bg-white/20 border-2 border-white/50 rounded-2xl px-8 py-3 text-3xl font-black tracking-widest mb-6">
              WM2026
            </div>
            <p className="text-white/80 mb-8">Gültig ab €30 Bestellwert · Nur für kurze Zeit!</p>
            <Link href="/shop" className="bg-white text-primary-700 font-bold px-10 py-4 rounded-2xl hover:bg-primary-50 transition-colors inline-block text-lg">
              Jetzt sparen 🛍️
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
