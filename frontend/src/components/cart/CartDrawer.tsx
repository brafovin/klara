'use client'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCartStore()
  const { isCartOpen, setCartOpen } = useUIStore()

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setCartOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            🛒 Warenkorb {items.length > 0 && <span className="text-primary-600">({items.length})</span>}
          </h2>
          <button onClick={() => setCartOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Dein Warenkorb ist leer</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Füge Produkte hinzu!</p>
              <Link href="/shop" onClick={() => setCartOpen(false)}
                className="inline-block mt-6 btn-primary text-sm">
                Zum Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.size} · {item.color}</p>
                    <p className="text-sm font-bold text-primary-600 mt-1">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-xs">✕</button>
                    <div className="flex items-center gap-1.5 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 font-bold text-sm">−</button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 font-bold text-sm">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Zwischensumme</span>
              <span className="font-bold text-gray-900 dark:text-white text-lg">€{total().toFixed(2)}</span>
            </div>
            {total() < 50 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                ℹ️ Noch €{(50 - total()).toFixed(2)} bis zum kostenlosen Versand!
              </p>
            )}
            <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full text-center block">
              Zur Kasse · €{total().toFixed(2)}
            </Link>
            <Link href="/cart" onClick={() => setCartOpen(false)}
              className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Warenkorb ansehen
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
