import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl">Newsletter – Keine Aktion verpassen!</h3>
            <p className="text-primary-100 text-sm mt-1">10% Rabatt auf deine erste Bestellung</p>
          </div>
          <form className="flex gap-2 w-full max-w-md" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="deine@email.de"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button type="submit"
              className="px-5 py-2.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors whitespace-nowrap">
              Anmelden
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-sm">⚽</span>
            </div>
            <span className="font-black text-white">WM 2026 Fan Shop</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Dein Online-Shop für Fanartikel zur Fußball-Weltmeisterschaft 2026. Trikots, Shirts & mehr.
          </p>
          <div className="flex gap-3 mt-4">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-sm transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/shop?category=trikots', label: 'Trikots' },
              { href: '/shop?category=tshirts', label: 'T-Shirts' },
              { href: '/shop?category=hoodies', label: 'Hoodies' },
              { href: '/shop?category=jacken', label: 'Jacken' },
              { href: '/shop?category=limited', label: '🔥 Limited Edition' },
              { href: '/shop?category=kinder', label: 'Kinderbekleidung' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-400 transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Teams */}
        <div>
          <h4 className="text-white font-semibold mb-4">Teams</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/shop?team=deutschland', label: '🇩🇪 Deutschland' },
              { href: '/shop?team=brasilien', label: '🇧🇷 Brasilien' },
              { href: '/shop?team=argentinien', label: '🇦🇷 Argentinien' },
              { href: '/shop?team=frankreich', label: '🇫🇷 Frankreich' },
              { href: '/shop?team=spanien', label: '🇪🇸 Spanien' },
              { href: '/shop?team=england', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-400 transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Service</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/contact', label: 'Kontakt' },
              { href: '/contact#faq', label: 'FAQ' },
              { href: '/shipping', label: 'Versand & Rückgabe' },
              { href: '/legal/impressum', label: 'Impressum' },
              { href: '/legal/datenschutz', label: 'Datenschutz' },
              { href: '/legal/agb', label: 'AGB' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-400 transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} WM 2026 Fan Shop. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span>💳 Stripe</span>
            <span>🅿️ PayPal</span>
            <span>🍎 Apple Pay</span>
            <span>G Pay</span>
          </div>
          <p>Kein offizielles WM-Produkt. Generisches Fan-Merchandise.</p>
        </div>
      </div>
    </footer>
  )
}
