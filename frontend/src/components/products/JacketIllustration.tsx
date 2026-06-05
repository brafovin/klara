'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  teamName?: string
  size?: number
}

export default function JacketIllustration({
  primaryColor = '#1a1a2e',
  secondaryColor = '#e94560',
  teamName = '',
  size = 400,
}: Props) {
  const id = useMemo(() => `k${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight = (hex: string) => {
    const h = hex.replace('#', '')
    if (h.length < 6) return true
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 200
  }
  const light = isLight(primaryColor)
  const shadow = light ? '#6688aa' : '#000000'
  const stroke = light ? '#aabbcc' : 'none'

  const body = 'M 140 104 C 104 88 56 90 34 124 L 8 224 C 6 238 12 250 24 254 L 80 272 L 80 472 L 320 472 L 320 272 L 376 254 C 388 250 394 238 392 224 L 366 124 C 344 90 296 88 260 104 C 242 138 224 150 200 152 C 176 150 158 138 140 104 Z'
  const leftSleeve = 'M 140 104 C 104 88 56 90 34 124 L 8 224 C 6 238 12 250 24 254 L 80 272 L 80 218 L 108 152 C 120 124 130 110 140 104 Z'
  const rightSleeve = 'M 260 104 C 296 88 344 90 366 124 L 392 224 C 394 238 388 250 376 254 L 320 272 L 320 218 L 292 152 C 280 124 270 110 260 104 Z'

  return (
    <svg viewBox="0 0 400 500" width={size} height={size * 1.25} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${id}ds`} x="-18%" y="-10%" width="136%" height="132%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity="0.30" />
        </filter>
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.60 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id={`${id}bg`} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={light ? '0' : '0.22'} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.40" />
        </linearGradient>
        <radialGradient id={`${id}hl`} cx="50%" cy="40%" r="44%">
          <stop offset="0%" stopColor="white" stopOpacity={light ? '0' : '0.16'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}sd`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.28" />
          <stop offset="18%" stopColor={shadow} stopOpacity="0" />
          <stop offset="82%" stopColor={shadow} stopOpacity="0" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}sl`} x1="90%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={light ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.52" />
        </linearGradient>
        <linearGradient id={`${id}sr`} x1="10%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={light ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.52" />
        </linearGradient>
        <clipPath id={`${id}bc`}><path d={body} /></clipPath>
        <clipPath id={`${id}lc`}><path d={leftSleeve} /></clipPath>
        <clipPath id={`${id}rc`}><path d={rightSleeve} /></clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* Left sleeve */}
        <path d={leftSleeve} fill={primaryColor} stroke={stroke} strokeWidth={light ? 1.5 : 0} />
        <g clipPath={`url(#${id}lc)`}>
          {[0, 1, 2].map(i => (
            <rect key={i} x="-20" y={144 + i * 36} width="200" height="14"
              fill={secondaryColor} opacity="0.85" transform="rotate(-38 80 200)" />
          ))}
        </g>
        <path d={leftSleeve} fill={`url(#${id}sl)`} />
        <path d="M 8 210 L 80 228 L 80 274 L 8 256 Z" fill={secondaryColor} opacity="0.90" />
        {[0,1,2].map(i => (
          <line key={i} x1="8" y1={210+i*9} x2="80" y2={228+i*9}
            stroke="white" strokeWidth="1.2" strokeOpacity={i===0?'0.30':'0.14'} />
        ))}
        <path d={leftSleeve} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Right sleeve */}
        <path d={rightSleeve} fill={primaryColor} stroke={stroke} strokeWidth={light ? 1.5 : 0} />
        <g clipPath={`url(#${id}rc)`}>
          {[0, 1, 2].map(i => (
            <rect key={i} x="220" y={144 + i * 36} width="200" height="14"
              fill={secondaryColor} opacity="0.85" transform="rotate(38 320 200)" />
          ))}
        </g>
        <path d={rightSleeve} fill={`url(#${id}sr)`} />
        <path d="M 392 210 L 320 228 L 320 274 L 392 256 Z" fill={secondaryColor} opacity="0.90" />
        {[0,1,2].map(i => (
          <line key={i} x1="392" y1={210+i*9} x2="320" y2={228+i*9}
            stroke="white" strokeWidth="1.2" strokeOpacity={i===0?'0.30':'0.14'} />
        ))}
        <path d={rightSleeve} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Body */}
        <path d={body} fill={primaryColor} stroke={stroke} strokeWidth={light ? 2 : 0} />
        <path d={body} fill={`url(#${id}bg)`} />
        <path d={body} fill={`url(#${id}hl)`} />
        <path d={body} fill={`url(#${id}sd)`} />
        <path d={body} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Armhole shadows */}
        <path d="M80 272 L80 350 L106 336 L106 172Z" fill={shadow} fillOpacity="0.12" />
        <path d="M320 272 L320 350 L294 336 L294 172Z" fill={shadow} fillOpacity="0.12" />

        {/* Stand-up collar */}
        <path d="M 152 108 C 164 100 180 96 200 94 C 220 96 236 100 248 108 L 248 136 C 236 128 220 124 200 122 C 180 124 164 128 152 136 Z"
          fill={secondaryColor} opacity="0.90" />
        <path d="M 152 108 C 164 100 180 96 200 94 C 220 96 236 100 248 108"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.30" />

        {/* Center zipper */}
        <line x1="200" y1="130" x2="200" y2="470" stroke={shadow} strokeWidth="1.5" strokeOpacity="0.25" />
        <rect x="195" y="132" width="10" height="338" rx="2" fill={secondaryColor} opacity="0.65" />
        {Array.from({length: 16}, (_, i) => (
          <g key={i}>
            <rect x="193" y={140 + i * 18} width="6" height="8" rx="1" fill="white" fillOpacity="0.24" />
            <rect x="201" y={140 + i * 18} width="6" height="8" rx="1" fill="white" fillOpacity="0.24" />
          </g>
        ))}
        <rect x="190" y="140" width="20" height="16" rx="4" fill={secondaryColor} opacity="0.96" />
        <rect x="193" y="156" width="14" height="22" rx="3" fill={secondaryColor} opacity="0.80" />
        <line x1="200" y1="141" x2="200" y2="177" stroke="white" strokeWidth="1.5" strokeOpacity="0.40" />

        {/* Chest pocket */}
        <path d="M 100 190 L 166 190 L 166 224 L 100 224 Z"
          fill={primaryColor} stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.65" />
        <line x1="100" y1="190" x2="166" y2="190" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.80" />
        <circle cx="158" cy="190" r="5" fill={secondaryColor} opacity="0.85" />
        <rect x="154" y="188" width="8" height="10" rx="2" fill={secondaryColor} opacity="0.90" />

        {/* Hip pockets */}
        {[88, 244].map((x, si) => (
          <g key={si}>
            <path d={`M ${x} 358 L ${x+80} 358 L ${x+80} 400 L ${x} 400 Z`}
              fill={primaryColor} stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.60" />
            <line x1={x} y1="358" x2={x+80} y2="358"
              stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.80" />
            <circle cx={x+72} cy="358" r="5" fill={secondaryColor} opacity="0.85" />
            <rect x={x+68} y="356" width="8" height="10" rx="2" fill={secondaryColor} opacity="0.90" />
          </g>
        ))}

        {teamName && (
          <text x="200" y="330" textAnchor="middle" fontSize="18" fontWeight="900"
            fontFamily="'Arial Black',sans-serif"
            fill={secondaryColor} fillOpacity="0.75" letterSpacing="5">
            {teamName.toUpperCase()}
          </text>
        )}

        {/* Seam lines */}
        <line x1="80" y1="274" x2="80" y2="470" stroke={shadow} strokeWidth="1.2" strokeOpacity="0.12" />
        <line x1="320" y1="274" x2="320" y2="470" stroke={shadow} strokeWidth="1.2" strokeOpacity="0.12" />

        {/* Ribbed hem */}
        <path d="M 80 458 L 320 458 L 320 472 L 80 472 Z" fill={secondaryColor} fillOpacity="0.35" />
        {[0,1,2].map(i => (
          <line key={i} x1="80" y1={458+i*4} x2="320" y2={458+i*4}
            stroke="white" strokeWidth="0.8" strokeOpacity="0.12" />
        ))}
      </g>
    </svg>
  )
}
