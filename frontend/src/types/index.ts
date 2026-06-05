export interface Product {
  _id: string
  name: string
  nameTranslations?: { en?: string; es?: string; de?: string }
  slug: string
  description: string
  descriptionTranslations?: { en?: string; es?: string; de?: string }
  price: number
  discountPrice?: number
  category: string
  team?: string
  images: Array<{ url: string; alt: string }>
  variants: Array<{ size: string; color: string; stock: number; sku: string }>
  totalStock: number
  rating: number
  numReviews: number
  isLimited?: boolean
  isFeatured?: boolean
  material?: string
  saleEndsAt?: string
  tags?: string[]
  createdAt: string
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
  slug: string
}

export interface Order {
  _id: string
  orderItems: Array<{
    product: Product | string
    name: string
    image?: string
    price: number
    quantity: number
    size?: string
    color?: string
  }>
  shippingAddress: {
    name: string
    street: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  discountAmount: number
  totalPrice: number
  status: string
  isPaid: boolean
  paidAt?: string
  createdAt: string
}

export interface Review {
  _id: string
  user: { name: string; avatar?: string }
  rating: number
  title: string
  comment: string
  isVerifiedPurchase: boolean
  createdAt: string
}
