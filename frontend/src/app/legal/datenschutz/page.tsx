export default function DatenschutzPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-8">Datenschutzerklärung</h1>
      <div className="card p-8 space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">1. Datenschutz auf einen Blick</h2>
          <p>Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website und in unserem Online-Shop.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">2. Erhobene Daten</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Name und Kontaktdaten (bei Registrierung oder Bestellung)</li>
            <li>Lieferadresse und Zahlungsdaten</li>
            <li>Bestellhistorie und Kommunikation</li>
            <li>Technische Daten (IP-Adresse, Browser, Gerät)</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">3. Zahlungsdienstleister</h2>
          <p>Für die Zahlungsabwicklung nutzen wir Stripe und PayPal. Diese Anbieter haben eigene Datenschutzrichtlinien, die Sie auf deren Websites einsehen können.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">4. Cookies</h2>
          <p>Wir verwenden technisch notwendige Cookies für den Warenkorb und die Anmeldung sowie optionale Analyse-Cookies. Sie können Cookies in Ihren Browser-Einstellungen deaktivieren.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">5. Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Wenden Sie sich an: datenschutz@wm2026shop.de</p>
        </section>
      </div>
    </div>
  )
}
