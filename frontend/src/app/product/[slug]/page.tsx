'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { productApi, reviewApi } from '@/lib/api'
import { STATIC_PRODUCTS } from '@/lib/staticProducts'
import ProductImageGallery from '@/components/products/ProductImageGallery'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import StarRating from '@/components/ui/StarRating'
import toast from 'react-hot-toast'
import type { Product, Review } from '@/types'
import Link from 'next/link'

export default function ProductDetailPage() {
  const { slug } = useParams() as { slug: string }
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' })

  const addItem = useCartStore(s => s.addItem)
  const { isAuthenticated } = useAuthStore()
  const { language, setCartOpen } = useUIStore()

  useEffect(() => {
    Promise.all([
      productApi.getBySlug(slug),
    ]).then(([productRes]) => {
      const p = (productRes.data.product || STATIC_PRODUCTS.find(x => x.slug === slug)) as Product
      setProduct(p)
      const firstVariant = p.variants.find(v => v.stock > 0)
      if (firstVariant) {
        setSelectedSize(firstVariant.size)
        setSelectedColor(firstVariant.color)
      }
    }).catch(() => {
      const p = STATIC_PRODUCTS.find(x => x.slug === slug) || null
      setProduct(p)
      if (p) {
        const firstVariant = p.variants.find(v => v.stock > 0)
        if (firstVariant) { setSelectedSize(firstVariant.size); setSelectedColor(firstVariant.color) }
      }
    }).finally(() => setLoading(false))

    reviewApi.getForProduct(slug).then(res => setReviews(res.data.reviews)).catch(() => {})
  }, [slug])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
      <div className="text-5xl animate-spin">⚽</div>
    </div>
  )

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">😔</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produkt nicht gefunden</h1>
      <Link href="/shop" className="btn-primary">Zurück zum Shop</Link>
    </div>
  )

  const name = (language !== 'de' && product.nameTranslations?.[language as 'en'|'es']) || product.name
  const description = (language !== 'de' && product.descriptionTranslations?.[language as 'en'|'es']) || product.description
  const price = product.discountPrice || product.price
  const discount = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : null

  const availableSizes = [...new Set(product.variants.map(v => v.size))]
  const availableColors = [...new Set(product.variants.filter(v => !selectedSize || v.size === selectedSize).map(v => v.color))]

  const selectedVariant = product.variants.find(v =>
    (!selectedSize || v.size === selectedSize) && (!selectedColor || v.color === selectedColor)
  )

  const handleAddToCart = () => {
    if (!selectedVariant) { toast.error('Bitte Größe und Farbe auswählen'); return }
    if (selectedVariant.stock < quantity) { toast.error('Nicht genug auf Lager'); return }
    addItem({
      productId: product._id,
      name: product.name,
      image: product.images[0]?.url || '',
      price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug
    })
    toast.success(`${name} zum Warenkorb hinzugefügt!`)
    setCartOpen(true)
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { toast.error('Bitte erst anmelden'); return }
    try {
      await reviewApi.create(product._id, reviewForm)
      toast.success('Bewertung eingereicht!')
      const res = await reviewApi.getForProduct(product._id)
      setReviews(res.data.reviews)
      setReviewForm({ rating: 5, title: '', comment: '' })
    } catch {
      toast.error('Fehler beim Einreichen der Bewertung')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-600">Start</Link>
        <span>›</span>
        <Link href="/shop" className="hover:text-primary-600">Shop</Link>
        <span>›</span>
        <span className="text-gray-900 dark:text-white font-medium truncate">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <ProductImageGallery
          images={product.images}
          category={product.category}
          team={product.team}
          productName={product.name}
          isLimited={product.isLimited}
          discountPercent={discount}
        />

        {/* Details */}
        <div className="space-y-6">
          {product.team && (
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              {product.team}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">{name}</h1>

          <div className="flex items-center gap-4">
            <StarRating rating={product.rating} size="lg" />
            <button onClick={() => setActiveTab('reviews')} className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400">
              {product.numReviews} Bewertungen
            </button>
            {selectedVariant && (
              <span className={`text-sm font-medium ${selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {selectedVariant.stock > 0 ? `✓ ${selectedVariant.stock} auf Lager` : '✗ Ausverkauft'}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-gray-900 dark:text-white">€{price.toFixed(2)}</span>
            {discount && (
              <>
                <span className="text-xl text-gray-400 line-through">€{product.price.toFixed(2)}</span>
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm">
                  -{discount}% gespart
                </span>
              </>
            )}
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900 dark:text-white">Größe</span>
              <button className="text-xs text-primary-600 hover:underline">Größentabelle</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => {
                const hasStock = product.variants.some(v => v.size === size && v.stock > 0)
                return (
                  <button key={size} onClick={() => hasStock && setSelectedSize(size)}
                    disabled={!hasStock}
                    className={`px-4 py-2 rounded-xl font-medium text-sm border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : hasStock
                          ? 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300'
                          : 'border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                    }`}>
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color */}
          {availableColors.length > 1 && (
            <div>
              <span className="font-semibold text-gray-900 dark:text-white block mb-3">
                Farbe: <span className="text-primary-600">{selectedColor}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {availableColors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900 dark:text-white">Menge</span>
            <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors">−</button>
              <span className="w-12 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
              <button onClick={() => setQuantity(Math.min((selectedVariant?.stock || 10), quantity + 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors">+</button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3">
            <button onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className="flex-1 btn-primary text-base py-4 flex items-center justify-center gap-2">
              🛒 In den Warenkorb
            </button>
          </div>

          {/* Info badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {[
              { icon: '🚚', text: 'Versand ab €50 kostenlos' },
              { icon: '↩️', text: '30 Tage Rückgabe' },
              { icon: '🔒', text: 'Sichere Zahlung' },
            ].map(item => (
              <div key={item.text} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-xl mb-1">{item.icon}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>

          {product.material && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Material: {product.material}</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
          {(['description', 'reviews'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}>
              {tab === 'description' ? 'Beschreibung' : `Bewertungen (${reviews.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'description' ? (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{description}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Review form */}
            {isAuthenticated && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Bewertung schreiben</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bewertung</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setReviewForm({...reviewForm, rating: star})}
                          className={`text-2xl transition-colors ${star <= reviewForm.rating ? 'star-filled' : 'star-empty'}`}>★</button>
                      ))}
                    </div>
                  </div>
                  <input type="text" placeholder="Titel" value={reviewForm.title}
                    onChange={e => setReviewForm({...reviewForm, title: e.target.value})}
                    className="input-field" required />
                  <textarea placeholder="Deine Erfahrung..." value={reviewForm.comment}
                    onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                    className="input-field min-h-24 resize-none" required />
                  <button type="submit" className="btn-primary">Bewertung absenden</button>
                </form>
              </div>
            )}

            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-12">Noch keine Bewertungen. Sei der Erste!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review._id} className="card p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{review.user.name}</span>
                          {review.isVerifiedPurchase && (
                            <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✓ Verifiziert</span>
                          )}
                        </div>
                        <StarRating rating={review.rating} size="sm" showValue={false} />
                      </div>
                      <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('de-DE')}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{review.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
