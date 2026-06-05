'use client'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { orderApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState('')
  const router = useRouter()

  const shippingCost = total() >= 50 ? 0 : 4.99
  const finalTotal = total() - discount + shippingCost

  const handleCoupon = async () => {
    if (!couponCode) return
    try {
      const res = await orderApi.validateCoupon({ code: couponCode, orderTotal: total() })
      setDiscount(res.data.coupon.discount)
      setCouponApplied(couponCode)
      toast.success(`Gutschein angewendet! -€${res.data.coupon.discount.toFixed(2)}`)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Ungültiger Gutschein'
      toast.error(msg)
    }
  }

  if (items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6">🛒</div>
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Dein Warenkorb ist leer</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Entdecke unsere Produkte und füge sie hinzu!</p>
      <Link href="/shop" className="btn-primary text-base px-10">Zum Shop</Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">🛒 Warenkorb ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <div key={i} className="card p-4 flex gap-4">
              <Link href={`/product/${item.slug}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.size} · {item.color}</p>
                <p className="font-bold text-primary-600 mt-1">€{item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.productId, item.size, item.color)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">✕ entfernen</button>
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors">−</button>
                  <span className="w-10 text-center font-bold text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors">+</button>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Bestellübersicht</h2>

            {/* Coupon */}
            <div>
              <div className="flex gap-2">
                <input type="text" placeholder="Gutscheincode" value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  className="input-field text-sm flex-1 py-2.5" />
                <button onClick={handleCoupon} className="btn-secondary text-sm px-4 py-2.5">
                  Einlösen
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 mt-1">✓ Code „{couponApplied}" angewendet</p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Zwischensumme</span>
                <span>€{total().toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Rabatt</span>
                  <span>-€{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Versand</span>
                <span>{shippingCost === 0 ? <span className="text-green-600 font-medium">Kostenlos ✓</span> : `€${shippingCost.toFixed(2)}`}</span>
              </div>
              {total() < 50 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                  Noch €{(50 - total()).toFixed(2)} bis zum kostenlosen Versand!
                </p>
              )}
              <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                <span>Gesamt</span>
                <span>€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block text-base">
              Zur Kasse →
            </Link>
          </div>

          <div className="text-center space-y-2 text-xs text-gray-400 dark:text-gray-500">
            <p>🔒 Sichere SSL-Verschlüsselung</p>
            <p>💳 Stripe · 🅿️ PayPal · 🍎 Apple Pay</p>
          </div>
        </div>
      </div>
    </div>
  )
}
