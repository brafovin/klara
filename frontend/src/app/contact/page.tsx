'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const FAQs = [
  { q: 'Wie lange dauert die Lieferung?', a: 'Standard-Lieferung: 3-5 Werktage. Express: 1-2 Werktage. International: 7-14 Werktage.' },
  { q: 'Kann ich als Gast bestellen?', a: 'Ja! Du kannst ohne Konto bestellen. Gib einfach deine E-Mail-Adresse an.' },
  { q: 'Welche Zahlungsmethoden werden akzeptiert?', a: 'Wir akzeptieren Kreditkarte (Stripe), PayPal, Apple Pay und Google Pay.' },
  { q: 'Wie kann ich zurückgeben?', a: 'Innerhalb von 30 Tagen können ungetragene Artikel zurückgegeben werden. Kontaktiere unseren Support.' },
  { q: 'Sind die Produkte offiziell lizenziert?', a: 'Unsere Produkte sind generische Fan-Artikel und nicht offiziell lizenziert. Sie zeigen keine offiziellen WM-Logos.' },
  { q: 'Gibt es Größentabellen?', a: 'Ja, auf jeder Produktseite findest du eine Größentabelle mit genauen Angaben.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [open, setOpen] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Nachricht gesendet! Wir melden uns innerhalb von 24 Stunden.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title mb-3">Kontakt & Hilfe</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Wir helfen dir gerne weiter!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Form */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nachricht senden</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="input-field" placeholder="Max Mustermann" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-Mail</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="input-field" placeholder="max@beispiel.de" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Betreff</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                className="input-field" required>
                <option value="">Bitte wählen...</option>
                <option>Frage zu einer Bestellung</option>
                <option>Rückgabe / Reklamation</option>
                <option>Produktfrage</option>
                <option>Technisches Problem</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nachricht</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="input-field min-h-32 resize-none" placeholder="Wie können wir dir helfen?" required />
            </div>
            <button type="submit" className="btn-primary w-full">✉️ Nachricht senden</button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: '📧', title: 'E-Mail', info: 'support@wm2026shop.de', sub: 'Antwort innerhalb von 24h' },
            { icon: '📞', title: 'Telefon', info: '+49 (0) 89 12345678', sub: 'Mo–Fr, 9–18 Uhr' },
            { icon: '💬', title: 'Live-Chat', info: 'Im Shop verfügbar', sub: 'Mo–Fr, 9–18 Uhr' },
          ].map(item => (
            <div key={item.title} className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-primary-600 dark:text-primary-400">{item.info}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div id="faq">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Häufig gestellte Fragen</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                <span className={`text-primary-500 font-bold transition-transform ${open === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
