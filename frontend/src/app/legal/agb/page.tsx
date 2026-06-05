export default function AGBPage() {
  const sections = [
    { title: '§1 Geltungsbereich', text: 'Diese AGB gelten für alle Bestellungen über den WM 2026 Fan Shop zwischen dem Kunden und der WM 2026 Fan Shop GmbH.' },
    { title: '§2 Vertragsschluss', text: 'Der Kaufvertrag kommt durch Ihre Bestellbestätigung per E-Mail zustande. Vorher handelt es sich lediglich um ein unverbindliches Angebot.' },
    { title: '§3 Preise und Zahlung', text: 'Alle Preise sind Endpreise inklusive gesetzlicher Mehrwertsteuer. Wir akzeptieren Zahlung per Kreditkarte (Stripe), PayPal, Apple Pay und Google Pay.' },
    { title: '§4 Lieferung', text: 'Standard-Lieferzeit 3–5 Werktage innerhalb Deutschlands. Versandkostenfreiheit ab einem Bestellwert von €50. International 7–14 Werktage.' },
    { title: '§5 Widerrufsrecht', text: 'Sie haben das Recht, binnen 30 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Waren müssen ungetragen und im Originalzustand zurückgesendet werden.' },
    { title: '§6 Gewährleistung', text: 'Es gilt die gesetzliche Gewährleistungsfrist von 2 Jahren. Bei Mängeln wenden Sie sich bitte an unseren Kundendienst.' },
    { title: '§7 Haftungsbeschränkung', text: 'Wir haften nur für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist, soweit gesetzlich zulässig, ausgeschlossen.' },
    { title: '§8 Schlussbestimmungen', text: 'Es gilt deutsches Recht. Gerichtsstand ist München. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-8">Allgemeine Geschäftsbedingungen</h1>
      <div className="card p-8 space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {sections.map(section => (
          <section key={section.title}>
            <h2 className="font-bold text-gray-900 dark:text-white text-base mb-2">{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
