export default function ShippingPage() {
  const cards = [
    {
      icon: '🚚', title: 'Versandoptionen',
      items: ['Standard (DE): 3–5 Werktage · €4,99', 'Kostenloser Versand ab €50', 'Express (DE): 1–2 Werktage · €9,99', 'International: 7–14 Werktage · ab €12,99']
    },
    {
      icon: '↩️', title: 'Rückgabe & Umtausch',
      items: ['30 Tage Rückgaberecht', 'Ware muss ungetragen sein', 'Kostenloser Rückversand (DE)', 'Erstattung innerhalb von 5 Werktagen']
    },
    {
      icon: '📦', title: 'Verpackung',
      items: ['Umweltfreundliche Verpackung', 'Sicheres Einschlagen der Ware', 'Recyclingfähige Materialien', 'Kleine Überraschung inklusive 🎁']
    },
    {
      icon: '📞', title: 'Versandprobleme?',
      items: ['support@wm2026shop.de', 'Tel: +49 89 12345678', 'Mo–Fr, 9–18 Uhr', 'Sendungsverfolgung per E-Mail']
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-8">Versand & Rückgabe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => (
          <div key={card.title} className="card p-6">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">{card.title}</h2>
            <ul className="space-y-2">
              {card.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-primary-500 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
