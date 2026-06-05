interface Props {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export default function StarRating({ rating, maxStars = 5, size = 'md', showValue = true }: Props) {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
  return (
    <div className={`flex items-center gap-1 ${sizes[size]}`}>
      {Array.from({ length: maxStars }, (_, i) => (
        <span key={i} className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
      ))}
      {showValue && <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}
