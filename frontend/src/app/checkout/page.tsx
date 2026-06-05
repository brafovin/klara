'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { orderApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'

const COUNTRIES = ['Deutschland', 'Österreich', 'Schweiz', 'USA', 'Großbritannien', 'Frankreich', 'Spanien', 'Brasilien', 'Argentinien']

type Step = 'shipping' | 'payment' | 'confirm'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  const [step, setStep] = useState<Step>('shipping')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [shipping, setShipping] = useState({
    name: user?.name || '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Deutschland'
  })
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const shippingCost = total() >= 50 ? 0 : 4.99
  const finalTotal = total() - discount + shippingCost

  if (items.length === 0 && !orderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dein Warenkorb ist leer</h1>
        <Link href="/shop" className="btn-primary">Zum Shop</Link>
      </div>
    )
  }

  const handleCoupon = async () => {
    try {
      const res = await orderApi.validateCoupon({ code: couponCode, orderTotal: total() })
      setDiscount(res.data.coupon.discount)
      toast.success(`Gutschein angewendet! -€${res.data.coupon.discount.toFixed(2)}`)
    } catch {
      toast.error('Ungültiger Gutschein')
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const orderItems = items.map(item => ({
        product: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }))
      const res = await orderApi.create({
        orderItems,
        shippingAddress: {
          name: shipping.name,
          street: shipping.street,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country
        },
        paymentMethod,
        couponCode: couponCode || undefined,
        guestEmail: !isAuthenticated ? shipping.email : undefined
      })
      setOrderId(res.data.order._id)
      clearCart()
      setStep('confirm')
      toast.success('Bestellung erfolgreich aufgegeben! 🎉')
    } catch {
      toast.error('Fehler beim Aufgeben der Bestellung')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Bestellung aufgegeben!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Bestellnummer: <span className="font-bold text-gray-900 dark:text-white">#{orderId.slice(-8).toUpperCase()}</span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Wir senden eine Bestätigung an {shipping.email || user?.email}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/shop" className="btn-primary">Weiter shoppen</Link>
          {isAuthenticated && <Link href="/account" className="btn-secondary">Meine Bestellungen</Link>}
        </div>
      </div>
    )
  }

  const steps: { id: Step; label: string }[] = [
    { id: 'shipping', label: '1. Versand' },
    { id: 'payment', label: '2. Zahlung' },
    { id: 'confirm', label: '3. Bestätigung' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 text-sm font-medium ${step === s.id ? 'text-primary-600 dark:text-primary-400' : i < steps.findIndex(x => x.id === step) ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === s.id ? 'bg-primary-600 text-white' : i < steps.findIndex(x => x.id === step) ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {i < steps.findIndex(x => x.id === step) ? '✓' : i + 1}
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-3 ${i < steps.findIndex(x => x.id === step) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <div className="card p-6 space-y-4">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">Lieferadresse</h2>
              {!isAuthenticated && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-Mail (für Gastbestellung)</label>
                  <input type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})}
                    className="input-field" placeholder="ihre@email.de" required />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vollständiger Name</label>
                <input type="text" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})}
                  className="input-field" placeholder="Max Mustermann" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Straße & Hausnummer</label>
                <input type="text" value={shipping.street} onChange={e => setShipping({...shipping, street: e.target.value})}
                  className="input-field" placeholder="Musterstraße 1" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">PLZ</label>
                  <input type="text" value={shipping.postalCode} onChange={e => setShipping({...shipping, postalCode: e.target.value})}
                    className="input-field" placeholder="12345" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Stadt</label>
                  <input type="text" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}
                    className="input-field" placeholder="München" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Land</label>
                <select value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} className="input-field">
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={() => setStep('payment')}
                disabled={!shipping.name || !shipping.street || !shipping.city || !shipping.postalCode}
                className="btn-primary w-full mt-2">
                Weiter zur Zahlung →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="card p-6 space-y-4">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">Zahlungsmethode</h2>
              <div className="space-y-3">
                {[
                  { id: 'stripe', icon: '💳', label: 'Kreditkarte', sub: 'Visa, Mastercard, Amex' },
                  { id: 'paypal', icon: '🅿️', label: 'PayPal', sub: 'Sicher & schnell' },
                  { id: 'apple_pay', icon: '🍎', label: 'Apple Pay', sub: 'Touch ID / Face ID' },
                  { id: 'google_pay', icon: 'G', label: 'Google Pay', sub: 'Mit Google-Konto' },
                ].map(pm => (
                  <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                      onChange={e => setPaymentMethod(e.target.value)} className="sr-only" />
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg font-bold">
                      {pm.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{pm.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{pm.sub}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === pm.id ? 'border-primary-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {paymentMethod === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                    </div>
                  </label>
                ))}
              </div>

              {/* Coupon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gutscheincode</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="z.B. WM2026" value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    className="input-field flex-1 py-2.5 text-sm" />
                  <button onClick={handleCoupon} className="btn-secondary text-sm px-4 py-2.5">Einlösen</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('shipping')} className="btn-secondary flex-1">← Zurück</button>
                <button onClick={handlePlaceOrder} disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {loading ? <span className="animate-spin">⚽</span> : '🔒'} Jetzt bestellen
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                🔒 256-bit SSL-Verschlüsselung · Sichere Zahlung
              </p>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="card p-5 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Deine Bestellung</h3>
          <div className="space-y-3 mb-4">
            {items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.size} · ×{item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Zwischensumme</span><span>€{total().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Rabatt</span><span>-€{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Versand</span>
              <span>{shippingCost === 0 ? <span className="text-green-600">Kostenlos</span> : `€${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
              <span>Gesamt</span><span>€{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
