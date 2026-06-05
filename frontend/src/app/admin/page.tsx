'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { adminApi, productApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
}

interface RecentOrder {
  _id: string
  user?: { name: string; email: string }
  guestEmail?: string
  totalPrice: number
  status: string
  createdAt: string
}

interface LowStockProduct {
  _id: string
  name: string
  totalStock: number
}

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([])
  const [tab, setTab] = useState<'dashboard' | 'orders' | 'products' | 'coupons'>('dashboard')
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10, type: 'percentage', minOrder: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/')
      return
    }
    adminApi.getDashboard()
      .then(res => {
        setStats(res.data.stats)
        setRecentOrders(res.data.recentOrders)
        setLowStock(res.data.lowStock)
      })
      .catch(() => toast.error('Fehler beim Laden der Dashboard-Daten'))
      .finally(() => setLoading(false))
  }, [isAuthenticated, user, router])

  useEffect(() => {
    if (tab === 'orders') {
      adminApi.getOrders().then(res => setOrders(res.data.orders)).catch(() => {})
    }
  }, [tab])

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, { status })
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o))
      toast.success('Status aktualisiert')
    } catch {
      toast.error('Fehler')
    }
  }

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await adminApi.createCoupon(newCoupon)
      toast.success('Gutschein erstellt!')
      setNewCoupon({ code: '', discount: 10, type: 'percentage', minOrder: 0 })
    } catch {
      toast.error('Fehler beim Erstellen des Gutscheins')
    }
  }

  if (!isAuthenticated || user?.role !== 'admin') return null
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-5xl animate-spin">⚽</div>
    </div>
  )

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    paid: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    processing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">WM 2026 Fan Shop · Verwaltung</p>
        </div>
        <span className="badge bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 px-3 py-1.5 text-sm">🔐 Admin</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
        {([['dashboard', '📊 Dashboard'], ['orders', '📦 Bestellungen'], ['products', '👕 Produkte'], ['coupons', '🎫 Gutscheine']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${tab === key ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && stats && (
        <div className="space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📦', label: 'Bestellungen', value: stats.totalOrders, color: 'from-blue-500 to-blue-600' },
              { icon: '💶', label: 'Umsatz', value: `€${stats.totalRevenue.toFixed(2)}`, color: 'from-green-500 to-green-600' },
              { icon: '👕', label: 'Produkte', value: stats.totalProducts, color: 'from-purple-500 to-purple-600' },
              { icon: '👥', label: 'Kunden', value: stats.totalUsers, color: 'from-orange-500 to-orange-600' },
            ].map(card => (
              <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white shadow-md`}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="text-2xl font-black">{card.value}</div>
                <div className="text-white/80 text-sm">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="card p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Letzte Bestellungen</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">ID</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Kunde</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Betrag</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 8).map(order => (
                    <tr key={order._id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-2.5 px-3 font-mono text-xs text-gray-500">#{order._id.slice(-6).toUpperCase()}</td>
                      <td className="py-2.5 px-3 text-gray-900 dark:text-gray-100">{order.user?.name || order.guestEmail || 'Gast'}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900 dark:text-white">€{order.totalPrice.toFixed(2)}</td>
                      <td className="py-2.5 px-3">
                        <span className={`badge ${statusColors[order.status] || ''} px-2 py-0.5`}>{order.status}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('de-DE')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low stock */}
          {lowStock.length > 0 && (
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">⚠️ Niedriger Lagerbestand</h2>
              <div className="space-y-2">
                {lowStock.map(p => (
                  <div key={p._id} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <span className="text-gray-900 dark:text-white font-medium">{p.name}</span>
                    <span className={`badge ${p.totalStock === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'} px-3 py-1`}>
                      {p.totalStock === 0 ? 'Ausverkauft' : `${p.totalStock} Stück`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Alle Bestellungen ({orders.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['ID', 'Kunde', 'Betrag', 'Status', 'Datum', 'Aktion'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 px-4">{order.user?.name || order.guestEmail || 'Gast'}</td>
                    <td className="py-3 px-4 font-semibold">€{order.totalPrice.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${statusColors[order.status] || ''} px-2 py-0.5`}>{order.status}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('de-DE')}</td>
                    <td className="py-3 px-4">
                      <select value={order.status}
                        onChange={e => handleStatusUpdate(order._id, e.target.value)}
                        className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div className="card p-6 text-center">
          <div className="text-5xl mb-4">👕</div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-2">Produkt-Verwaltung</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Produkte über die REST API oder direkt in MongoDB verwalten.</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left text-sm font-mono text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
            <p className="text-primary-600 font-semibold mb-2"># Beispiel: Produkt erstellen</p>
            <p>POST /api/products</p>
            <p className="text-gray-400">Authorization: Bearer {`{admin-token}`}</p>
            <p className="mt-2 text-gray-500"># Seed-Daten laden:</p>
            <p>cd backend && npm run seed</p>
          </div>
        </div>
      )}

      {tab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-5">Gutschein erstellen</h2>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Code</label>
                <input type="text" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                  className="input-field" placeholder="z.B. SOMMER10" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rabatt</label>
                  <input type="number" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: Number(e.target.value)})}
                    className="input-field" min="1" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Typ</label>
                  <select value={newCoupon.type} onChange={e => setNewCoupon({...newCoupon, type: e.target.value})} className="input-field">
                    <option value="percentage">Prozent (%)</option>
                    <option value="fixed">Fest (€)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mindestbestellwert (€)</label>
                <input type="number" value={newCoupon.minOrder} onChange={e => setNewCoupon({...newCoupon, minOrder: Number(e.target.value)})}
                  className="input-field" min="0" />
              </div>
              <button type="submit" className="btn-primary w-full">🎫 Gutschein erstellen</button>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Aktive Codes</h2>
            <div className="space-y-3">
              {[
                { code: 'WM2026', discount: '10%', min: '€30' },
                { code: 'FANSHOP15', discount: '15%', min: '€50' },
                { code: 'FREESHIP', discount: '€4.99', min: '€0' },
              ].map(c => (
                <div key={c.code} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="font-mono font-bold text-primary-600 dark:text-primary-400">{c.code}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">-{c.discount}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">ab {c.min}</span>
                  <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Aktiv</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
