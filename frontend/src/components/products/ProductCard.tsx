'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api'
import toast from 'react-hot-toast'
import type { Product } from '@/types'
import StarRating from '@/components/ui/StarRating'
import ProductIllustration from './ProductIllustration'

interface Props {
  product: Product
  lang?: 'de' | 'en' | 'es'
}

export default function ProductCard({ product, lang = 'de' }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { isAuthenticated } = useAuthStore()

  const name = (lang !== 'de' && product.nameTranslations?.[lang]) || product.name
  const price = product.discountPrice || product.price

  const useIllustration = imgError || !product.images?.[0]?.url || product.images[0].url.includes('placeholder')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const defaultVariant = product.variants.find(v => v.stock > 0)
    if (!defaultVariant) { toast.error('Nicht auf Lager'); return }
    addItem({
      productId: product._id,
      name: product.name,
      image: product.images[0]?.url || '',
      price,
      size: defaultVariant.size,
      color: defaultVariant.color,
      quantity: 1,
      slug: product.slug
    })
    toast.success(`${name} zum Warenkorb hinzugefügt!`)
  }

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { toast.error('Bitte erst anmelden'); return }
    try {
      await authApi.toggleWishlist(product._id)
      setIsWishlisted(!isWishlisted)
      toast.success(isWishlisted ? 'Von Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt')
    } catch { toast.error('Fehler') }
  }

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <Link href={`/product/${product.slug}`} className="card group overflow-hidden flex flex-col">
      {/* Image / Illustration */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        {useIllustration ? (
          <div className="w-full h-full">
            <ProductIllustration
              category={product.category}
              team={product.team}
              size={280}
              className="w-full h-full"
            />
          </div>
        ) : (
          <Image
            src={product.images[0].url}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isLimited && <span className="badge bg-red-500 text-white text-xs px-2 py-0.5">🔥 Limited</span>}
          {discount && <span className="badge bg-primary-500 text-white text-xs px-2 py-0.5">-{discount}%</span>}
          {product.totalStock === 0 && <span className="badge bg-gray-500 text-white text-xs px-2 py-0.5">Ausverkauft</span>}
        </div>

        {/* Wishlist */}
        <button onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110"
          aria-label="Wishlist">
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {product.team && (
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            {product.team}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {name}
        </h3>
        <StarRating rating={product.rating} size="sm" />
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">€{price.toFixed(2)}</span>
            {discount && <span className="text-sm text-gray-400 line-through">€{product.price.toFixed(2)}</span>}
          </div>
          <button onClick={handleAddToCart} disabled={product.totalStock === 0}
            className="w-9 h-9 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95">
            🛒
          </button>
        </div>
      </div>
    </Link>
  )
}
