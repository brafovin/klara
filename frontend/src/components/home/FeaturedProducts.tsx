'use client'
import { useEffect, useState } from 'react'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types'
import { useUIStore } from '@/store/uiStore'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useUIStore()

  useEffect(() => {
    productApi.getFeatured()
      .then(res => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card aspect-[3/4] animate-pulse bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
    </section>
  )

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">
            ⭐ Highlights
          </p>
          <h2 className="section-title">
            {language === 'de' ? 'Beliebte Produkte' : language === 'en' ? 'Popular Products' : 'Productos Populares'}
          </h2>
        </div>
        <a href="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 hidden sm:flex items-center gap-1">
          {language === 'de' ? 'Alle ansehen' : language === 'en' ? 'View all' : 'Ver todos'} →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => (
          <ProductCard key={p._id} product={p} lang={language} />
        ))}
      </div>
    </section>
  )
}
