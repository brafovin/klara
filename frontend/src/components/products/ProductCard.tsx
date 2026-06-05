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
import ProductIllustration, { TEAM_COLORS } from './ProductIllustration'

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
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  const useIllustration = imgError || !product.images?.[0]?.url || product.images[0].url.includes('placeholder')
  const colors = TEAM_COLORS[product.team || ''] || TEAM_COLORS['neutral']
  const flag = colors?.flag || '⚽'

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
    toast.success(`${name} hinzugefügt!`)
  }

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { toast.error('Bitte erst anmelden'); return }
    try {
      await authApi.toggleWishlist(product._id)
      setIsWishlisted(!isWishlisted)
      toast.success(isWishlisted ? 'Entfernt' : 'Gespeichert')
    } catch { toast.error('Fehler') }
  }

  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800">

      {/* ── Image / Illustration ── */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '4/5',
          background: `linear-gradient(155deg, ${colors.primary}55 0%, ${colors.primary}28 40%, ${colors.accent}22 100%)`,
        }}
      >
        {useIllustration ? (
          <div className="w-full h-full flex items-center justify-center p-6 pb-4">
            <ProductIllustration
              category={product.category}
              team={product.team}
              size={180}
              className="drop-shadow-xl"
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

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Team flag pill – top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm">
            <span>{flag}</span>
            {product.team && <span className="text-gray-600 dark:text-gray-300 uppercase tracking-wide hidden sm:inline">{product.team.slice(0,3)}</span>}
          </span>
        </div>

        {/* Badges – top right stack */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              -{discount}%
            </span>
          )}
          {product.isLimited && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              🔥 Limited
            </span>
          )}
          {product.totalStock === 0 && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              Ausverkauft
            </span>
          )}
        </div>

        {/* Wishlist – shown on hover */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white/95 dark:bg-gray-800/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
          aria-label="Wunschliste"
        >
          <span className="text-base">{isWishlisted ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category chip */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
          {product.category}
        </span>

        {/* Product name */}
        <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        {/* Sizes preview */}
        {product.variants.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {[...new Set(product.variants.filter(v => v.stock > 0).map(v => v.size))].slice(0, 4).map(s => (
              <span key={s} className="text-[10px] border border-gray-200 dark:border-gray-700 rounded-md px-1.5 py-0.5 text-gray-500 dark:text-gray-400 font-medium">
                {s}
              </span>
            ))}
            {product.variants.filter(v => v.stock > 0).length > 4 && (
              <span className="text-[10px] text-gray-400">+{product.variants.filter(v => v.stock > 0).length - 4}</span>
            )}
          </div>
        )}

        {/* Price + cart */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              €{price.toFixed(2)}
            </span>
            {discount && (
              <span className="text-xs text-gray-400 line-through">€{product.price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.totalStock === 0}
            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            aria-label="In den Warenkorb"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="hidden sm:inline">Kaufen</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
