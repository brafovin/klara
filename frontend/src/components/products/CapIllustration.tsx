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
  const isLight =
    primaryColor === '#FFFFFF' ||
    primaryColor === '#fff' ||
    primaryColor === '#ffffff' ||
    primaryColor === '#FCD116' ||
    primaryColor === '#FFD700' ||
    primaryColor === '#fbbf24'
  const txt = textColor || (isLight ? '#1a1a1a' : 'white')
  const shadowC = isLight ? '#8899aa' : '#000'
  const strokeBorder = isLight ? '#b8c6d8' : 'none'

  return (
    <svg viewBox="0 0 480 380" width={size} height={size * (380 / 480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-20%" y="-15%" width="140%" height="145%">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000" floodOpacity="0.28" />
        </filter>

        {/* Crown top-highlight to bottom-shadow */}
        <linearGradient id={`${id}crown`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.30'} />
          <stop offset="55%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.28" />
        </linearGradient>

        {/* Left panel shadow */}
        <linearGradient id={`${id}panelL`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.28" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0" />
        </linearGradient>

        {/* Right panel shadow */}
        <linearGradient id={`${id}panelR`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.28" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0" />
        </linearGradient>

        {/* Brim top surface */}
        <linearGradient id={`${id}brim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="75%" stopColor={primaryColor} stopOpacity="0.88" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.45" />
        </linearGradient>

        {/* Brim underside */}
        <linearGradient id={`${id}bunder`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.50" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.10" />
        </linearGradient>

        {/* Front panel slight center highlight */}
        <radialGradient id={`${id}front`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.18'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── CROWN – main dome shape ── */}
        {/* Back panels (slightly visible behind front) */}
        <path d="M108 268 Q112 156 240 116 Q368 156 372 268Z"
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={isLight ? '1.5' : '0'}
        />

        {/* Panel seam lines radiating from top button */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg - 90) * Math.PI / 180
          const ex = 240 + 134 * Math.cos(rad)
          const ey = 266 - 147 * Math.sin(rad) * 0.74
          // Only draw the front-facing seams (avoid overdraw on back)
          if (deg >= 180) return null
          return (
            <line
              key={i}
              x1="240"
              y1="124"
              x2={ex}
              y2={ey}
              stroke={accentColor}
              strokeWidth="1.5"
              strokeOpacity="0.30"
              strokeDasharray="5 4"
            />
          )
        })}
        {/* Back panel seams (visible but dimmer) */}
        {[180, 240, 300].map((deg, i) => {
          const rad = (deg - 90) * Math.PI / 180
          const ex = 240 + 134 * Math.cos(rad)
          const ey = 266 - 147 * Math.sin(rad) * 0.74
          return (
            <line
              key={i}
              x1="240"
              y1="124"
              x2={ex}
              y2={ey}
              stroke={accentColor}
              strokeWidth="1.2"
              strokeOpacity="0.18"
              strokeDasharray="5 4"
            />
          )
        })}

        {/* Crown lighting */}
        <path d="M108 268 Q112 156 240 116 Q368 156 372 268Z" fill={`url(#${id}crown)`} />
        <path d="M108 268 Q112 156 174 130 L174 268Z" fill={`url(#${id}panelL)`} />
        <path d="M372 268 Q368 156 306 130 L306 268Z" fill={`url(#${id}panelR)`} />

        {/* Front panel highlight */}
        <path d="M174 130 Q204 120 240 116 Q276 120 306 130 L306 268 L174 268Z"
          fill={`url(#${id}front)`} />

        {/* Fabric texture on crown */}
        <path d="M108 268 Q112 156 240 116 Q368 156 372 268Z"
          fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.055" />

        {/* ── SWEATBAND ── */}
        <path
          d="M108 268 Q116 284 240 292 Q364 284 372 268 Q364 256 240 262 Q116 256 108 268Z"
          fill={accentColor}
          fillOpacity="0.65"
        />
        <path d="M108 268 Q116 282 240 290 Q364 282 372 268"
          fill="none" stroke="white" strokeWidth="1.8" strokeOpacity="0.32" />
        {/* Sweatband perforations */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ellipse
            key={i}
            cx={130 + i * 26}
            cy="276"
            rx="3.5"
            ry="2.5"
            fill={primaryColor}
            fillOpacity="0.42"
          />
        ))}

        {/* ── BRIM ── */}
        {/* Brim underside (visible as depth) */}
        <path
          d="M68 276 Q70 314 240 322 Q410 314 412 276 Q382 290 240 294 Q98 290 68 276Z"
          fill={`url(#${id}bunder)`}
        />
        {/* Brim top surface */}
        <path
          d="M68 276 Q70 312 240 320 Q410 312 412 276 Q382 288 240 292 Q98 288 68 276Z"
          fill={`url(#${id}brim)`}
        />
        {/* Brim outer edge */}
        <path d="M68 276 Q70 316 240 324 Q410 316 412 276"
          fill="none" stroke={accentColor} strokeWidth="2.2" strokeOpacity="0.48" />
        {/* Brim stitching rows */}
        <path d="M82 282 Q84 310 240 317 Q396 310 398 282"
          fill="none" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.38" strokeDasharray="4 3" />
        <path d="M100 287 Q102 310 240 316 Q378 310 380 287"
          fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.26" strokeDasharray="4 3" />

        {/* ── TOP BUTTON ── */}
        <circle cx="240" cy="120" r="15" fill={accentColor} fillOpacity="0.96" />
        <circle cx="240" cy="120" r="10" fill={primaryColor} fillOpacity="0.65" />
        <circle cx="240" cy="120" r="4.5" fill={accentColor} fillOpacity="0.82" />
        {/* Button thread */}
        <line x1="235" y1="120" x2="245" y2="120" stroke="white" strokeWidth="1.6" strokeOpacity="0.55" />
        <line x1="240" y1="115" x2="240" y2="125" stroke="white" strokeWidth="1.6" strokeOpacity="0.55" />

        {/* ── FRONT EMBLEM AREA ── */}
        {/* Emblem background patch */}
        <path
          d="M240 198 L258 222 L282 218 L274 242 L290 258 L268 256 L260 280 L240 260 L220 280 L212 256 L190 258 L206 242 L198 218 L222 222Z"
          fill={accentColor}
          fillOpacity="0.88"
        />
        {/* Emblem inner shine */}
        <path
          d="M240 208 L254 228 L272 224 L265 245 L278 258 L260 256 L253 276 L240 258 L227 276 L220 256 L202 258 L215 245 L208 224 L226 228Z"
          fill="white"
          fillOpacity="0.18"
        />
        {/* Emblem text */}
        <text x="240" y="244" textAnchor="middle" fontSize="20" fontWeight="900"
          fontFamily="'Arial Black',sans-serif" fill={txt} opacity="0.96">WM</text>

        {/* ── ADJUSTABLE BACK STRAP ── */}
        {/* Strap body */}
        <rect x="186" y="284" width="108" height="24" rx="7" fill={accentColor} fillOpacity="0.58" />
        {/* Buckle center bar */}
        <rect x="228" y="280" width="24" height="32" rx="5" fill={accentColor} fillOpacity="0.85" />
        {/* Buckle window */}
        <rect x="233" y="285" width="14" height="22" rx="3" fill={primaryColor} fillOpacity="0.55" />
        {/* Center pin */}
        <line x1="240" y1="284" x2="240" y2="312" stroke="white" strokeWidth="2" strokeOpacity="0.40" />
        {/* Strap adjustment holes */}
        {[-3, -1.5, 0, 1.5, 3].map((offset, i) => (
          <circle key={i} cx={240 + offset * 9} cy="296" r="2.8" fill={primaryColor} fillOpacity="0.72" />
        ))}
      </g>
    </svg>
  )
}
