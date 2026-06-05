'use client'
import { useState } from 'react'
import Image from 'next/image'
import ProductIllustration from './ProductIllustration'

interface ProductImage { url: string; alt: string }

interface Props {
  images: ProductImage[]
  category?: string
  team?: string
  productName: string
  isLimited?: boolean
  discountPercent?: number | null
}

export default function ProductImageGallery({ images, category, team, productName, isLimited, discountPercent }: Props) {
  const [selected, setSelected] = useState(0)
  const [imgError, setImgError] = useState(false)

  const useIllustration = imgError || !images?.[0]?.url || images[0].url.includes('placeholder') || images[0].url.includes('via.placeholder')

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900">
        {useIllustration ? (
          <ProductIllustration category={category} team={team} size={600} className="w-full h-full" />
        ) : (
          <Image
            src={images[selected]?.url}
            alt={images[selected]?.alt || productName}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {isLimited && (
          <div className="absolute top-4 left-4">
            <span className="badge bg-red-500 text-white text-sm px-3 py-1">🔥 Limited Edition</span>
          </div>
        )}
        {discountPercent && (
          <div className="absolute top-4 right-4">
            <span className="badge bg-primary-500 text-white text-sm px-3 py-1">-{discountPercent}%</span>
          </div>
        )}
      </div>
      {images.length > 1 && !useIllustration && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${selected === i ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'}`}>
              <Image src={img.url} alt={img.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
