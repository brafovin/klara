'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { authApi, orderApi } from '@/lib/api'
import type { Order } from '@/types'
import Link from 'next/link'

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [tab, setTab] = useState<'overview' | 'orders' | 'wishlist'>('overview')
  const [wishlist, setWishlist] = useState<unknown[]>([])

  useEffect(() => {
    if (!isAuthenticated) { router.push('/auth/login'); return }
    orderApi.getMyOrders().then(res => setOrders(res.data.orders)).catch(() => {})
    authApi.getWishlist().then(res => setWishlist(res.data.wishlist)).catch(() => {})
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl text-white font-black shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">{user?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => { logout(); router.push('/') }}
          className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          Abmelden
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
        {([['overview', '👤 Übersicht'], ['orders', '📦 Bestellungen'], ['wishlist', '❤️ Wunschliste']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === key ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📦', label: 'Bestellungen', value: orders.length },
            { icon: '❤️', label: 'Wunschliste', value: wishlist.length },
            { icon: '⭐', label: 'Mitglied seit', value: '2026' },
          ].map(card => (
            <div key={card.label} className="card p-6 text-center">
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-3xl font-black text-gray-900 dark:text-white">{card.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 card">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-gray-500 dark:text-gray-400">Noch keine Bestellungen</p>
              <Link href="/shop" className="btn-primary inline-block mt-4">Jetzt shoppen</Link>
            </div>
          ) : orders.map(order => (
            <div key={order._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString('de-DE')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${statusColors[order.status] || 'bg-gray-100 text-gray-700'} px-3 py-1`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">€{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.orderItems.map((item, i) => (
                  <span key={i} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    {item.name} ×{item.quantity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'wishlist' && (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">❤️</div>
          <p className="text-gray-500 dark:text-gray-400">
            {wishlist.length > 0 ? `${wishlist.length} Produkte auf der Wunschliste` : 'Deine Wunschliste ist leer'}
          </p>
          <Link href="/shop" className="btn-primary inline-block mt-4">Produkte entdecken</Link>
        </div>
      )}
    </div>
  )
}
