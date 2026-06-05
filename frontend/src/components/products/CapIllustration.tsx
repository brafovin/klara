'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  accentColor?: string
  textColor?: string
  size?: number
}

export default function CapIllustration({
  primaryColor = '#DC2626',
  accentColor = '#fbbf24',
  textColor,
  size = 400,
}: Props) {
  const id = useMemo(() => `c${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight = (hex: string) => {
    const h = hex.replace('#', '')
    if (h.length < 6) return true
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 200
  }
  const light = isLight(primaryColor)
  const shadow = light ? '#7799bb' : '#000000'
  const txt = textColor || (light ? '#222222' : '#ffffff')
  const stroke = light ? '#99aabb' : 'none'

  return (
    <svg viewBox="0 0 400 300" width={size} height={size * 0.75} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${id}ds`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="2" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.30" />
        </filter>
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.06" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <radialGradient id={`${id}cg`} cx="42%" cy="28%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity={light ? '0.05' : '0.30'} />
          <stop offset="60%" stopColor={primaryColor} stopOpacity="0" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.35" />
        </radialGradient>
        <linearGradient id={`${id}ls`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.30" />
          <stop offset="40%" stopColor={shadow} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}rs`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.22" />
          <stop offset="40%" stopColor={shadow} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}bg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* Crown */}
        <path d="M 200 42 C 116 42 62 80 56 148 C 50 184 60 206 80 218 L 200 232 L 320 218 C 340 206 350 184 344 148 C 338 80 284 42 200 42 Z"
          fill={primaryColor} stroke={stroke} strokeWidth={light ? 1.5 : 0} />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg - 90) * Math.PI / 180
          const ex = 200 + 145 * Math.cos(rad)
          const ey = 148 + 95 * Math.sin(rad) * 0.7
          return <line key={i} x1="200" y1="50" x2={ex} y2={ey}
            stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="5 4" />
        })}
        <path d="M 200 42 C 116 42 62 80 56 148 C 50 184 60 206 80 218 L 200 232 L 320 218 C 340 206 350 184 344 148 C 338 80 284 42 200 42 Z"
          fill={`url(#${id}cg)`} />
        <path d="M 200 42 C 116 42 62 80 56 148 C 50 184 60 206 80 218 L 200 232 L 320 218 C 340 206 350 184 344 148 C 338 80 284 42 200 42 Z"
          fill={`url(#${id}ls)`} />
        <path d="M 200 42 C 116 42 62 80 56 148 C 50 184 60 206 80 218 L 200 232 L 320 218 C 340 206 350 184 344 148 C 338 80 284 42 200 42 Z"
          fill={`url(#${id}rs)`} />
        <path d="M 200 42 C 116 42 62 80 56 148 C 50 184 60 206 80 218 L 200 232 L 320 218 C 340 206 350 184 344 148 C 338 80 284 42 200 42 Z"
          fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Sweatband */}
        <path d="M 80 218 C 100 230 148 238 200 238 C 252 238 300 230 320 218 C 300 208 252 202 200 202 C 148 202 100 208 80 218 Z"
          fill={accentColor} fillOpacity="0.70" />
        <path d="M 80 218 C 100 228 148 234 200 234 C 252 234 300 228 320 218"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.35" />
        {Array.from({length: 11}, (_, i) => (
          <ellipse key={i} cx={102 + i * 22} cy="222" rx="3" ry="2"
            fill={primaryColor} fillOpacity="0.50" />
        ))}

        {/* Brim underside */}
        <path d="M 56 220 C 40 240 38 268 60 278 C 100 294 150 300 200 300 C 250 300 300 294 340 278 C 362 268 360 240 344 220 C 316 234 264 242 200 242 C 136 242 84 234 56 220 Z"
          fill={shadow} fillOpacity="0.28" />
        {/* Brim top */}
        <path d="M 56 220 C 40 238 38 264 60 274 C 100 290 150 296 200 296 C 250 296 300 290 340 274 C 362 264 360 238 344 220 C 316 232 264 240 200 240 C 136 240 84 232 56 220 Z"
          fill={`url(#${id}bg)`} />
        <path d="M 56 220 C 40 240 38 268 60 278 C 100 296 150 302 200 302 C 250 302 300 296 340 278 C 362 268 360 240 344 220"
          fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.45" />
        <path d="M 68 228 C 52 246 50 268 70 276 C 108 291 152 297 200 297 C 248 297 292 291 330 276 C 350 268 348 246 332 228"
          fill="none" stroke={accentColor} strokeWidth="1.1" strokeOpacity="0.35" strokeDasharray="4 3" />
        <path d="M 88 234 C 74 250 72 268 88 276 C 122 289 158 294 200 294 C 242 294 278 289 312 276 C 328 268 326 250 312 234"
          fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.22" strokeDasharray="4 3" />

        {/* Top button */}
        <circle cx="200" cy="48" r="10" fill={accentColor} fillOpacity="0.95" />
        <circle cx="200" cy="48" r="6" fill={primaryColor} fillOpacity="0.65" />
        <circle cx="200" cy="48" r="3" fill={accentColor} fillOpacity="0.85" />
        <line x1="196" y1="48" x2="204" y2="48" stroke="white" strokeWidth="1.4" strokeOpacity="0.55" />
        <line x1="200" y1="44" x2="200" y2="52" stroke="white" strokeWidth="1.4" strokeOpacity="0.55" />

        {/* Emblem */}
        <ellipse cx="200" cy="152" rx="34" ry="30" fill={accentColor} fillOpacity="0.85" />
        <ellipse cx="200" cy="152" rx="30" ry="26" fill="white" fillOpacity="0.14" />
        <text x="200" y="147" textAnchor="middle" fontSize="13" fontWeight="900"
          fontFamily="'Arial Black',sans-serif" fill={txt} opacity="0.95">WM</text>
        <text x="200" y="163" textAnchor="middle" fontSize="11" fontWeight="700"
          fontFamily="Arial,sans-serif" fill={txt} opacity="0.90">2026</text>

        {/* Back strap */}
        <rect x="168" y="228" width="64" height="20" rx="5" fill={accentColor} fillOpacity="0.55" />
        <rect x="188" y="224" width="24" height="28" rx="4" fill={accentColor} fillOpacity="0.85" />
        <rect x="193" y="228" width="14" height="20" rx="2" fill={primaryColor} fillOpacity="0.55" />
        <line x1="200" y1="226" x2="200" y2="250" stroke="white" strokeWidth="1.8" strokeOpacity="0.38" />
        {[-2, 0, 2].map(o => (
          <circle key={o} cx={200 + o * 8} cy="238" r="2.5" fill={primaryColor} fillOpacity="0.75" />
        ))}
      </g>
    </svg>
  )
}
