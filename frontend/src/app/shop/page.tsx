'use client'
import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types'
import { useUIStore } from '@/store/uiStore'
import { STATIC_PRODUCTS, filterProducts, sortProducts } from '@/lib/staticProducts'

const CATEGORIES = [
  { value: '', label: 'Alle Kategorien' },
  { value: 'trikots', label: '👕 Trikots' },
  { value: 'tshirts', label: '👕 T-Shirts' },
  { value: 'hoodies', label: '🧥 Hoodies' },
  { value: 'jacken', label: '🧥 Jacken' },
  { value: 'caps', label: '🧢 Caps' },
  { value: 'schals', label: '🧣 Schals' },
  { value: 'kinder', label: '🧒 Kinder' },
  { value: 'limited', label: '🔥 Limited' },
]

const TEAMS = [
  { value: '', label: 'Alle Teams' },
  { value: 'deutschland', label: '🇩🇪 Deutschland' },
  { value: 'brasilien', label: '🇧🇷 Brasilien' },
  { value: 'argentinien', label: '🇦🇷 Argentinien' },
  { value: 'frankreich', label: '🇫🇷 Frankreich' },
  { value: 'spanien', label: '🇪🇸 Spanien' },
  { value: 'england', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
  { value: 'portugal', label: '🇵🇹 Portugal' },
  { value: 'niederlande', label: '🇳🇱 Niederlande' },
  { value: 'italien', label: '🇮🇹 Italien' },
  { value: 'kroatien', label: '🇭🇷 Kroatien' },
  { value: 'usa', label: '🇺🇸 USA' },
  { value: 'mexiko', label: '🇲🇽 Mexiko' },
  { value: 'marokko', label: '🇲🇦 Marokko' },
  { value: 'japan', label: '🇯🇵 Japan' },
  { value: 'senegal', label: '🇸🇳 Senegal' },
  { value: 'suedkorea', label: '🇰🇷 Südkorea' },
  { value: 'australien', label: '🇦🇺 Australien' },
  { value: 'belgien', label: '🇧🇪 Belgien' },
  { value: 'kanada', label: '🇨🇦 Kanada' },
  { value: 'nigeria', label: '🇳🇬 Nigeria' },
  { value: 'tuerkei', label: '🇹🇷 Türkei' },
  { value: 'schweiz', label: '🇨🇭 Schweiz' },
]

const SORTS = [
  { value: '', label: 'Empfohlen' },
  { value: 'newest', label: 'Neueste' },
  { value: 'price_asc', label: 'Preis ↑' },
  { value: 'price_desc', label: 'Preis ↓' },
  { value: 'rating', label: 'Beliebtheit' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { language } = useUIStore()

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const category = searchParams.get('category') || ''
  const team = searchParams.get('team') || ''
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || ''
  const page = Number(searchParams.get('page') || '1')
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`/shop?${params.toString()}`)
  }, [searchParams, router])

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string | number> = { page, limit: 12 }
    if (category) params.category = category
    if (team) params.team = team
    if (search) params.search = search
    if (sort) params.sort = sort
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice

    productApi.getAll(params)
      .then(res => {
        const data = res.data.products
        if (data?.length) {
          setProducts(data)
          setTotal(res.data.total)
          setPages(res.data.pages)
        } else {
          throw new Error('no data')
        }
      })
      .catch(() => {
        const filtered = filterProducts(STATIC_PRODUCTS, { category, team, search, minPrice, maxPrice })
        const sorted = sortProducts(filtered, sort)
        const limit = 12
        const start = (page - 1) * limit
        setProducts(sorted.slice(start, start + limit))
        setTotal(filtered.length)
        setPages(Math.ceil(filtered.length / limit))
      })
      .finally(() => setLoading(false))
  }, [category, team, search, sort, page, minPrice, maxPrice])

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Kategorie</h3>
        <div className="space-y-1">
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setParam('category', c.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c.value ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Team</h3>
        <div className="space-y-1">
          {TEAMS.map(t => (
            <button key={t.value} onClick={() => setParam('team', t.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${team === t.value ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Preis (€)</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="Min" value={minPrice}
            onChange={e => setParam('minPrice', e.target.value)}
            className="input-field text-sm py-2" />
          <span className="text-gray-400">–</span>
          <input type="number" placeholder="Max" value={maxPrice}
            onChange={e => setParam('maxPrice', e.target.value)}
            className="input-field text-sm py-2" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚽</span>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary-200">WM 2026 Fan Shop</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-2">
                {search ? (
                  <>Ergebnisse für <span className="text-yellow-300">„{search}"</span></>
                ) : category ? (
                  <span className="capitalize">{category}</span>
                ) : team ? (
                  <span className="capitalize">{team}</span>
                ) : (
                  'Alle Produkte'
                )}
              </h1>
              <p className="text-primary-100 text-sm">
                {total > 0 ? `${total} Artikel verfügbar` : 'Lade Produkte…'}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {['🇩🇪','🇧🇷','🇦🇷','🇫🇷','🇪🇸'].map((flag, i) => (
                <span key={i} className="text-3xl md:text-4xl drop-shadow-lg">{flag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Category pills (horizontal scroll) ── */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map(c => (
              <button key={c.value} onClick={() => setParam('category', c.value)}
                className={`flex-none px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  category === c.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">
          {/* ── Sidebar – desktop ── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 sticky top-36">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all">
                  ⚙️ Filter
                </button>
                {/* Active filter chips */}
                {team && (
                  <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {team}
                    <button onClick={() => setParam('team', '')} className="ml-0.5 hover:text-red-500 leading-none">✕</button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:block">{total} Artikel</span>
                <select value={sort} onChange={e => setParam('sort', e.target.value)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {/* Mobile filter panel */}
            {isFilterOpen && (
              <div className="lg:hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 mb-6">
                <FilterPanel />
              </div>
            )}

            {/* Products grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-1/3" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-4/5" />
                      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-1/2" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-1/3 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Keine Produkte gefunden</h3>
                <p className="text-gray-500 mb-6">Versuche andere Filter</p>
                <button onClick={() => router.push('/shop')} className="btn-primary">Filter zurücksetzen</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} lang={language} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setParam('page', String(p))}
                    className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                      p === page
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center"><div className="animate-spin text-4xl">⚽</div></div>}>
      <ShopContent />
    </Suspense>
  )
}
