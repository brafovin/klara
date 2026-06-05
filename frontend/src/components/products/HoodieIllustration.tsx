'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  accentColor?: string
  size?: number
  teamName?: string
}

export default function HoodieIllustration({
  primaryColor = '#74ACDF',
  accentColor = '#0369a1',
  size = 400,
  teamName = '',
}: Props) {
  const id = useMemo(() => `h${Math.random().toString(36).slice(2, 7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a' || primaryColor === '#111827'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff' || primaryColor === '#ffffff'
  const textFill = isDark ? '#FFFFFF' : (isLight ? accentColor : accentColor)
  const shadowC = isLight ? '#8899aa' : '#000000'
  const strokeBorder = isLight ? '#b8c6d8' : 'none'

  // Body paths – larger proportions for hoodie bulk
  const bodyPath = 'M144 190 L62 238 L36 334 L96 348 L96 518 L384 518 L384 348 L444 334 L418 238 L336 190 C316 208 280 218 240 218 C200 218 164 208 144 190Z'
  const leftSleevePath = 'M144 190 L62 238 L36 334 L96 348 L120 272 C132 234 138 210 144 190Z'
  const rightSleevePath = 'M336 190 L418 238 L444 334 L384 348 L360 272 C348 234 342 210 336 190Z'

  return (
    <svg viewBox="0 0 480 550" width={size} height={size * (550 / 480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture – slightly coarser for fleece */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.55 0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-16%" y="-10%" width="132%" height="132%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.28" />
        </filter>

        {/* Body gradient */}
        <linearGradient id={`${id}bg`} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.20'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.34" />
        </linearGradient>

        {/* Center highlight */}
        <radialGradient id={`${id}center`} cx="50%" cy="42%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.14'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side shadows */}
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22" />
          <stop offset="16%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="84%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.25" />
        </linearGradient>

        {/* Hood outer gradient */}
        <linearGradient id={`${id}hood`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.24'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.30" />
        </linearGradient>

        {/* Hood inner depth (dark for depth illusion) */}
        <radialGradient id={`${id}hinner`} cx="50%" cy="75%" r="62%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.55" />
          <stop offset="80%" stopColor={shadowC} stopOpacity="0.15" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.0" />
        </radialGradient>

        {/* Left sleeve */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.50" />
        </linearGradient>

        {/* Right sleeve */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.50" />
        </linearGradient>

        <clipPath id={`${id}bc`}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── HOOD (back/outer) ── */}
        <path
          d="M144 190 C146 112 164 70 186 44 C202 24 220 18 240 16 C260 18 278 24 294 44 C316 70 334 112 336 190 C316 208 280 218 240 218 C200 218 164 208 144 190Z"
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={isLight ? '1.5' : '0'}
        />
        <path
          d="M144 190 C146 112 164 70 186 44 C202 24 220 18 240 16 C260 18 278 24 294 44 C316 70 334 112 336 190 C316 208 280 218 240 218 C200 218 164 208 144 190Z"
          fill={`url(#${id}hood)`}
        />

        {/* Hood inner lining visible area */}
        <path
          d="M162 188 C163 120 178 80 196 56 C210 36 224 30 240 28 C256 30 270 36 284 56 C302 80 317 120 318 188 C300 202 272 210 240 212 C208 210 180 202 162 188Z"
          fill={accentColor}
          fillOpacity="0.22"
        />

        {/* Hood opening depth shadow */}
        <path
          d="M176 186 C178 128 190 92 204 70 C216 50 228 44 240 42 C252 44 264 50 276 70 C290 92 302 128 304 186 C286 196 264 202 240 204 C216 202 194 196 176 186Z"
          fill={`url(#${id}hinner)`}
        />

        {/* Hood opening rim highlight */}
        <path d="M176 186 C196 196 218 202 240 204 C262 202 284 196 304 186"
          fill="none" stroke="white" strokeWidth="2.2" strokeOpacity="0.28" />

        {/* Hood texture */}
        <path
          d="M144 190 C146 112 164 70 186 44 C202 24 220 18 240 16 C260 18 278 24 294 44 C316 70 334 112 336 190 C316 208 280 218 240 218 C200 218 164 208 144 190Z"
          fill={primaryColor}
          filter={`url(#${id}tex)`}
          opacity="0.055"
        />

        {/* ── LEFT SLEEVE ── */}
        <path d={leftSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={leftSleevePath} fill={`url(#${id}sl)`} />
        {/* Ribbed cuff */}
        <path d="M36 318 L96 332 L96 350 L36 336Z" fill={accentColor} fillOpacity="0.55" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1="36" y1={318 + i * 6} x2="96" y2={332 + i * 6}
            stroke="white" strokeWidth={i === 0 ? '1.8' : '0.9'} strokeOpacity={i === 0 ? '0.28' : '0.14'} />
        ))}
        <path d={leftSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.055" />

        {/* ── RIGHT SLEEVE ── */}
        <path d={rightSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={rightSleevePath} fill={`url(#${id}sr)`} />
        {/* Ribbed cuff */}
        <path d="M444 318 L384 332 L384 350 L444 336Z" fill={accentColor} fillOpacity="0.55" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1="444" y1={318 + i * 6} x2="384" y2={332 + i * 6}
            stroke="white" strokeWidth={i === 0 ? '1.8' : '0.9'} strokeOpacity={i === 0 ? '0.28' : '0.14'} />
        ))}
        <path d={rightSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.055" />

        {/* ── BODY ── */}
        <path d={bodyPath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '2' : '0'} />
        <path d={bodyPath} fill={`url(#${id}bg)`} />
        <path d={bodyPath} fill={`url(#${id}center)`} />
        <path d={bodyPath} fill={`url(#${id}side)`} />
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.055" />

        {/* Armhole inner shadows */}
        <path d="M96 348 L96 426 L122 410 L122 274Z" fill={shadowC} fillOpacity="0.10" />
        <path d="M384 348 L384 426 L358 410 L358 274Z" fill={shadowC} fillOpacity="0.10" />

        {/* ── HALF-ZIP ── */}
        {/* Zipper tape */}
        <rect x="234" y="216" width="12" height="200" rx="2" fill={accentColor} fillOpacity="0.60" />
        {/* Zipper teeth (alternating) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <rect x="232" y={226 + i * 18} width="7" height="8" rx="1" fill="white" fillOpacity="0.22" />
            <rect x="241" y={226 + i * 18} width="7" height="8" rx="1" fill="white" fillOpacity="0.22" />
          </g>
        ))}
        {/* Zipper slider/pull */}
        <rect x="228" y="230" width="24" height="18" rx="5" fill={accentColor} fillOpacity="0.96" />
        <line x1="240" y1="230" x2="240" y2="248" stroke="white" strokeWidth="2" strokeOpacity="0.45" />
        {/* Pull tab */}
        <rect x="233" y="248" width="14" height="26" rx="4" fill={accentColor} fillOpacity="0.78" />
        <line x1="240" y1="250" x2="240" y2="272" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
        {/* Zipper guard at top */}
        <path d="M232 214 L248 214 L248 222 L232 222Z" fill={accentColor} fillOpacity="0.85" rx="2" />

        {/* ── DRAWSTRINGS ── */}
        <path d="M216 212 C212 240 208 266 206 290 C204 308 206 322 202 342"
          fill="none" stroke={accentColor} strokeWidth="4.5" strokeOpacity="0.68" strokeLinecap="round" />
        <path d="M264 212 C268 240 272 266 274 290 C276 308 274 322 278 342"
          fill="none" stroke={accentColor} strokeWidth="4.5" strokeOpacity="0.68" strokeLinecap="round" />
        {/* Cord texture overlay */}
        <path d="M216 212 C212 240 208 266 206 290 C204 308 206 322 202 342"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.18" strokeLinecap="round"
          strokeDasharray="6 6" />
        <path d="M264 212 C268 240 272 266 274 290 C276 308 274 322 278 342"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.18" strokeLinecap="round"
          strokeDasharray="6 6" />
        {/* Aglets (cord tips) */}
        <ellipse cx="202" cy="346" rx="6" ry="10" fill={accentColor} fillOpacity="0.85" />
        <ellipse cx="278" cy="346" rx="6" ry="10" fill={accentColor} fillOpacity="0.85" />
        <ellipse cx="202" cy="346" rx="3" ry="5" fill="white" fillOpacity="0.30" />
        <ellipse cx="278" cy="346" rx="3" ry="5" fill="white" fillOpacity="0.30" />

        {/* ── KANGAROO POCKET ── */}
        {/* Pocket shadow depth */}
        <path d="M118 390 Q118 374 132 370 L240 367 L348 370 Q362 374 362 390 L362 456 Q362 470 348 474 L240 477 L132 474 Q118 470 118 456Z"
          fill={shadowC} fillOpacity="0.08" transform="translate(2,3)" />
        {/* Pocket body */}
        <path d="M118 390 Q118 374 132 370 L240 367 L348 370 Q362 374 362 390 L362 456 Q362 470 348 474 L240 477 L132 474 Q118 470 118 456Z"
          fill={accentColor} fillOpacity="0.14" />
        <path d="M118 390 Q118 374 132 370 L240 367 L348 370 Q362 374 362 390 L362 456 Q362 470 348 474 L240 477 L132 474 Q118 470 118 456Z"
          fill="none" stroke={accentColor} strokeWidth="2.2" strokeOpacity="0.52" />
        {/* Top pocket edge shadow */}
        <path d="M118 390 Q118 374 132 370 L348 370 Q362 374 362 390 L362 396 Q348 380 132 380 Q118 384 118 396Z"
          fill={shadowC} fillOpacity="0.09" />
        {/* Center divider seam */}
        <line x1="240" y1="367" x2="240" y2="477" stroke={accentColor} strokeWidth="1.8" strokeOpacity="0.40" />

        {/* ── TEAM NAME ── */}
        {teamName && (
          <text x="240" y="356" textAnchor="middle" fontSize="24" fontWeight="900"
            fontFamily="'Arial Black',sans-serif" fill={textFill} fillOpacity="0.72" letterSpacing="5">
            {teamName.toUpperCase()}
          </text>
        )}

        {/* ── SEAMS ── */}
        <line x1="96" y1="350" x2="96" y2="516" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.11" />
        <line x1="384" y1="350" x2="384" y2="516" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.11" />
        {/* Ribbed hem band */}
        <path d="M96 506 L384 506 L384 518 L96 518Z" fill={accentColor} fillOpacity="0.18" />
        <line x1="96" y1="506" x2="384" y2="506" stroke={shadowC} strokeWidth="2" strokeOpacity="0.14" />
        {[1, 2, 3].map((i) => (
          <line key={i} x1="96" y1={506 + i * 3} x2="384" y2={506 + i * 3}
            stroke="white" strokeWidth="0.7" strokeOpacity="0.08" />
        ))}
      </g>
    </svg>
  )
}
