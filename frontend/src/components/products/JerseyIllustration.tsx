'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  stripeColor?: string
  accentColor?: string
  collarColor?: string
  number?: string
  teamCode?: string
  size?: number
  pattern?: 'solid' | 'stripes' | 'diagonal' | 'hoops' | 'chevron' | 'yoke'
}

export default function JerseyIllustration({
  primaryColor = '#FFFFFF',
  secondaryColor = '#000000',
  stripeColor,
  accentColor,
  collarColor,
  number = '10',
  teamCode = '',
  size = 400,
  pattern = 'solid',
}: Props) {
  const stripe = stripeColor || secondaryColor
  const accent = accentColor || secondaryColor
  const collar = collarColor || secondaryColor
  const id = useMemo(() => `j${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight =
    primaryColor === '#FFFFFF' || primaryColor === '#fff' ||
    primaryColor === '#ffffff' || primaryColor === '#FFF' ||
    primaryColor === '#fafafa' || primaryColor === '#f5f5f5'

  const shadowC = isLight ? '#6677aa' : '#000000'
  const strokeBorder = isLight ? '#aabbcc' : 'none'

  // ── Jersey paths (realistic proportions, 400×480 viewBox) ──
  // Shirt body: collar ~y62-120, underarm y260, hem y460
  const body = `
    M 130 80
    C 98 64 56 68 34 100
    L 6 196 C 4 208 10 218 20 222
    L 78 240 78 460 322 460 322 240
    L 380 222 C 390 218 396 208 394 196
    L 366 100 C 344 68 302 64 270 80
    C 252 116 232 128 200 130
    C 168 128 148 116 130 80 Z
  `

  const leftSleeve = `
    M 130 80
    C 98 64 56 68 34 100
    L 6 196 C 4 208 10 218 20 222
    L 78 240 102 164
    C 114 126 122 100 130 80 Z
  `

  const rightSleeve = `
    M 270 80
    C 302 64 344 68 366 100
    L 394 196 C 396 208 390 218 380 222
    L 322 240 298 164
    C 286 126 278 100 270 80 Z
  `

  // Yoke: V-shaped zone covering upper chest + shoulders + sleeves top half
  const yoke = `
    M 6 196 C 4 208 10 218 20 222 L 78 240 102 164
    C 114 126 122 100 130 80
    C 148 116 168 128 200 130
    C 232 128 252 116 270 80
    C 278 100 286 126 298 164
    L 322 240 380 222 C 390 218 396 208 394 196
    L 366 100 C 344 68 302 64 270 80
    C 252 116 232 128 200 130
    C 168 128 148 116 130 80
    C 98 64 56 68 34 100 Z
  `

  return (
    <svg viewBox="0 0 400 480" width={size} height={size * (480 / 400)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.06" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-20%" y="-10%" width="140%" height="135%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity="0.28" />
        </filter>

        {/* Body light → dark */}
        <linearGradient id={`${id}bg`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.24'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.40" />
        </linearGradient>

        {/* Center chest highlight */}
        <radialGradient id={`${id}hl`} cx="50%" cy="55%" r="42%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.18'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side shadows */}
        <linearGradient id={`${id}sd`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.28" />
          <stop offset="16%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="84%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.28" />
        </linearGradient>

        {/* Left sleeve shading */}
        <linearGradient id={`${id}sl`} x1="90%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.52" />
        </linearGradient>

        {/* Right sleeve shading */}
        <linearGradient id={`${id}sr`} x1="10%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.52" />
        </linearGradient>

        {/* Collar depth */}
        <radialGradient id={`${id}col`} cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.36" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.55" />
        </radialGradient>

        {/* Clip paths */}
        <clipPath id={`${id}bc`}><path d={body} /></clipPath>
        <clipPath id={`${id}lsc`}><path d={leftSleeve} /></clipPath>
        <clipPath id={`${id}rsc`}><path d={rightSleeve} /></clipPath>
        <clipPath id={`${id}yc`}><path d={yoke} /></clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>

        {/* ── LEFT SLEEVE ── */}
        <path d={leftSleeve} fill={pattern === 'yoke' ? stripe : secondaryColor}
          stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}lsc)`}>
            {[-3,-2,-1,0,1,2,3,4].map(i => (
              <rect key={i} x={-20+i*22} y="50" width="11" height="220"
                fill={stripe} fillOpacity="0.44" transform="rotate(-38 78 155)" />
            ))}
          </g>
        )}
        <path d={leftSleeve} fill={`url(#${id}sl)`} />
        {/* Cuff */}
        <path d="M 6 182 L 78 200 78 242 6 224 Z" fill={collar} />
        <path d="M 6 182 L 78 200" stroke="white" strokeWidth="2" strokeOpacity="0.30" fill="none" />
        <path d="M 6 190 L 78 208" stroke="white" strokeWidth="1" strokeOpacity="0.16" fill="none" />
        <path d={leftSleeve} fill={secondaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── RIGHT SLEEVE ── */}
        <path d={rightSleeve} fill={pattern === 'yoke' ? stripe : secondaryColor}
          stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}rsc)`}>
            {[-3,-2,-1,0,1,2,3,4].map(i => (
              <rect key={i} x={298+i*22} y="50" width="11" height="220"
                fill={stripe} fillOpacity="0.44" transform="rotate(38 322 155)" />
            ))}
          </g>
        )}
        <path d={rightSleeve} fill={`url(#${id}sr)`} />
        {/* Cuff */}
        <path d="M 394 182 L 322 200 322 242 394 224 Z" fill={collar} />
        <path d="M 394 182 L 322 200" stroke="white" strokeWidth="2" strokeOpacity="0.30" fill="none" />
        <path d="M 394 190 L 322 208" stroke="white" strokeWidth="1" strokeOpacity="0.16" fill="none" />
        <path d={rightSleeve} fill={secondaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── BODY ── */}
        <path d={body} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '2' : '0'} />

        {/* ── PATTERNS ── */}
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
              <rect key={i} x={78+i*24} y="70" width="12" height="400"
                fill={stripe} fillOpacity="0.26" />
            ))}
          </g>
        )}
        {pattern === 'hoops' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4,5,6,7,8,9].map(i => (
              <rect key={i} x="78" y={80+i*38} width="244" height="19"
                fill={stripe} fillOpacity="0.36" />
            ))}
          </g>
        )}
        {pattern === 'diagonal' && (
          <g clipPath={`url(#${id}bc)`}>
            {[-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].map(i => (
              <rect key={i} x={40+i*34} y="40" width="17" height="560"
                fill={stripe} fillOpacity="0.30" transform="rotate(42 200 280)" />
            ))}
          </g>
        )}
        {pattern === 'chevron' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4,5].map(i => (
              <path key={i}
                d={`M78 ${152+i*52} L200 ${118+i*52} L322 ${152+i*52} L322 ${172+i*52} L200 ${138+i*52} L78 ${172+i*52}Z`}
                fill={stripe} fillOpacity="0.32" />
            ))}
          </g>
        )}

        {/* ── YOKE PATTERN (Adidas diamond style) ── */}
        {pattern === 'yoke' && (
          <g clipPath={`url(#${id}yc)`}>
            {/* Solid yoke base */}
            <path d={yoke} fill={stripe} />
            {/* Diamond grid — rows offset for classic diamond look */}
            {Array.from({length: 9}, (_, row) => {
              const colCount = row % 2 === 0 ? 14 : 13
              return Array.from({length: colCount}, (_, col) => {
                const x = row % 2 === 0
                  ? -18 + col * 30
                  : -3 + col * 30
                const y = 68 + row * 18
                const w = 13
                const h = 10
                const fill = (row + col) % 2 === 0 ? accent : primaryColor
                return (
                  <polygon
                    key={`${row}-${col}`}
                    points={`${x},${y-h} ${x+w},${y} ${x},${y+h} ${x-w},${y}`}
                    fill={fill}
                    fillOpacity="0.88"
                  />
                )
              })
            })}
            {/* Thin highlight line at yoke bottom edge */}
            <path d="M 78 240 C 120 228 160 224 200 224 C 240 224 280 228 322 240"
              fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.28" />
          </g>
        )}

        {/* Body lighting layers */}
        <path d={body} fill={`url(#${id}bg)`} />
        <path d={body} fill={`url(#${id}hl)`} />
        <path d={body} fill={`url(#${id}sd)`} />
        <path d={body} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.045" />

        {/* Armhole depth shadows */}
        <path d="M78 240 L78 320 L104 306 L104 164Z" fill={shadowC} fillOpacity="0.12" />
        <path d="M322 240 L322 320 L296 306 L296 164Z" fill={shadowC} fillOpacity="0.12" />

        {/* Shoulder seams */}
        <path d="M130 80 C116 112 104 148 100 164" fill="none" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.20" />
        <path d="M270 80 C284 112 296 148 300 164" fill="none" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.20" />
        {/* Side seams */}
        <line x1="78" y1="242" x2="78" y2="458" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.12" />
        <line x1="322" y1="242" x2="322" y2="458" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.12" />

        {/* ── COLLAR (V-neck style) ── */}
        <path
          d="M 148 90 C 160 126 182 136 200 138 C 218 136 240 126 252 90 C 244 70 226 58 200 54 C 174 58 156 70 148 90 Z"
          fill={collar}
        />
        <path
          d="M 155 92 C 166 124 184 133 200 135 C 216 133 234 124 245 92 C 238 74 222 63 200 59 C 178 63 162 74 155 92 Z"
          fill={primaryColor}
        />
        <path
          d="M 148 90 C 160 126 182 136 200 138 C 218 136 240 126 252 90 C 244 70 226 58 200 54 C 174 58 156 70 148 90 Z"
          fill={`url(#${id}col)`} fillOpacity="0.45"
        />
        {/* Collar rib lines */}
        {[0,1,2].map(i => (
          <path key={i}
            d={`M${155+i*3} ${92+i} C${165+i*3} ${122+i} ${183+i*3} ${132+i} 200 ${134+i} C${217-i*3} ${132+i} ${235-i*3} ${122+i} ${245-i*3} ${92+i}`}
            fill="none" stroke="white" strokeWidth="0.9" strokeOpacity="0.22"
          />
        ))}

        {/* ── BADGE (left chest) ── */}
        <g transform="translate(136,158)">
          <path d="M-13,-22 L13,-22 L15,-2 Q15,14 0,22 Q-15,14 -15,-2 Z"
            fill={collar} fillOpacity="0.90" />
          <path d="M-13,-22 L13,-22 L15,-2 Q15,14 0,22 Q-15,14 -15,-2 Z"
            fill="white" fillOpacity="0.10" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="white" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="-15" y1="-2" x2="15" y2="-2" stroke="white" strokeWidth="0.8" strokeOpacity="0.35" />
          <text x="0" y="-9" textAnchor="middle" fontSize="8" fontWeight="800"
            fontFamily="Arial,sans-serif" fill="white" opacity="0.95">WM</text>
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="900"
            fontFamily="Arial,sans-serif" fill="white" opacity="0.95">2026</text>
          {teamCode && (
            <text x="0" y="15" textAnchor="middle" fontSize="6" fontWeight="600"
              fontFamily="Arial,sans-serif" fill="white" opacity="0.80">{teamCode}</text>
          )}
        </g>

        {/* ── NUMBER ── */}
        <text x="203" y="358" textAnchor="middle" fontSize="106" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill={shadowC} fillOpacity="0.16" letterSpacing="-4">{number}</text>
        <text x="200" y="354" textAnchor="middle" fontSize="106" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill={secondaryColor} fillOpacity="0.90" letterSpacing="-4">{number}</text>

        {/* Team code below number */}
        {teamCode && (
          <text x="200" y="396" textAnchor="middle" fontSize="18" fontWeight="700"
            fontFamily="Arial,sans-serif" fill={secondaryColor} fillOpacity="0.60" letterSpacing="7">
            {teamCode}
          </text>
        )}

        {/* ── HEM BAND ── */}
        <path d="M78 446 L322 446 L322 460 L78 460 Z" fill={collar} fillOpacity="0.35" />
        <line x1="78" y1="446" x2="322" y2="446" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.16" />
        <line x1="78" y1="452" x2="322" y2="452" stroke="white" strokeWidth="0.8" strokeOpacity="0.10" />
      </g>
    </svg>
  )
}
