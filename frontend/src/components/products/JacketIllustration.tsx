'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  size?: number
  teamName?: string
}

export default function JacketIllustration({
  primaryColor = '#1d4ed8',
  secondaryColor = '#dc2626',
  size = 400,
  teamName = '',
}: Props) {
  const id = useMemo(() => `jk${Math.random().toString(36).slice(2, 7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff' || primaryColor === '#ffffff'
  const shadowC = isLight ? '#8899aa' : '#000000'
  const textFill = isDark ? '#FFFFFF' : (isLight ? secondaryColor : secondaryColor)
  const strokeBorder = isLight ? '#b8c6d8' : 'none'

  // Full-length jacket paths – longer body, straighter cut
  const bodyPath = 'M146 98 C86 82 48 122 22 162 L10 240 L88 260 L88 510 L392 510 L392 260 L470 240 L458 162 C432 122 394 82 334 98 C314 128 280 142 240 142 C200 142 166 128 146 98Z'
  const leftSleevePath = 'M146 98 C86 82 48 122 22 162 L10 240 L88 260 L112 178 C126 134 138 108 146 98Z'
  const rightSleevePath = 'M334 98 C394 82 432 122 458 162 L470 240 L392 260 L368 178 C354 134 342 108 334 98Z'

  return (
    <svg viewBox="0 0 480 540" width={size} height={size * (540 / 480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture – smooth nylon-like */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-16%" y="-10%" width="132%" height="132%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.26" />
        </filter>

        {/* Body main gradient */}
        <linearGradient id={`${id}bg`} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.22'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.32" />
        </linearGradient>

        {/* Center chest highlight */}
        <radialGradient id={`${id}center`} cx="50%" cy="34%" r="42%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.16'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side edge shadows */}
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.24" />
          <stop offset="16%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="84%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.28" />
        </linearGradient>

        {/* Left sleeve */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.50" />
        </linearGradient>

        {/* Right sleeve */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.14'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.50" />
        </linearGradient>

        {/* Lapel gradient */}
        <linearGradient id={`${id}lapel`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.10" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d={leftSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={leftSleevePath} fill={`url(#${id}sl)`} />
        {/* Sleeve accent stripes */}
        <path d="M48 162 L78 168 L78 178 L48 172Z" fill={secondaryColor} fillOpacity="0.72" />
        <path d="M38 182 L72 190 L72 198 L38 190Z" fill={secondaryColor} fillOpacity="0.55" />
        <path d="M32 200 L68 208 L68 214 L32 206Z" fill={secondaryColor} fillOpacity="0.38" />
        {/* Ribbed cuff band */}
        <path d="M10 226 L88 244 L88 262 L10 244Z" fill={secondaryColor} fillOpacity="0.58" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="10" y1={226 + i * 5} x2="88" y2={244 + i * 5}
            stroke="white" strokeWidth={i === 0 ? '1.8' : '0.9'} strokeOpacity={i === 0 ? '0.30' : '0.14'} />
        ))}
        <path d={leftSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── RIGHT SLEEVE ── */}
        <path d={rightSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={rightSleevePath} fill={`url(#${id}sr)`} />
        {/* Sleeve accent stripes */}
        <path d="M432 162 L402 168 L402 178 L432 172Z" fill={secondaryColor} fillOpacity="0.72" />
        <path d="M442 182 L408 190 L408 198 L442 190Z" fill={secondaryColor} fillOpacity="0.55" />
        <path d="M448 200 L412 208 L412 214 L448 206Z" fill={secondaryColor} fillOpacity="0.38" />
        {/* Ribbed cuff band */}
        <path d="M470 226 L392 244 L392 262 L470 244Z" fill={secondaryColor} fillOpacity="0.58" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="470" y1={226 + i * 5} x2="392" y2={244 + i * 5}
            stroke="white" strokeWidth={i === 0 ? '1.8' : '0.9'} strokeOpacity={i === 0 ? '0.30' : '0.14'} />
        ))}
        <path d={rightSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── BODY ── */}
        <path d={bodyPath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '2' : '0'} />
        <path d={bodyPath} fill={`url(#${id}bg)`} />
        <path d={bodyPath} fill={`url(#${id}center)`} />
        <path d={bodyPath} fill={`url(#${id}side)`} />
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Armhole inner shadows */}
        <path d="M88 260 L88 340 L114 324 L114 180Z" fill={shadowC} fillOpacity="0.11" />
        <path d="M392 260 L392 340 L366 324 L366 180Z" fill={shadowC} fillOpacity="0.11" />

        {/* ── STAND-UP COLLAR ── */}
        {/* Collar band outer */}
        <path
          d="M163 116 C184 138 210 144 240 146 C270 144 296 138 317 116 C308 88 286 70 240 66 C194 70 172 88 163 116Z"
          fill={secondaryColor}
          fillOpacity="0.92"
        />
        {/* Collar inner fold – primary color */}
        <path
          d="M170 118 C190 138 212 143 240 145 C268 143 290 138 310 118 C302 94 282 77 240 73 C198 77 178 94 170 118Z"
          fill={primaryColor}
          fillOpacity="0.70"
        />
        {/* Collar top fold crease */}
        <path d="M176 116 C194 134 214 141 240 143 C266 141 286 134 304 116"
          fill="none" stroke="white" strokeWidth="1.8" strokeOpacity="0.28" />
        {/* Collar rib lines */}
        {[0, 1, 2].map((i) => (
          <path key={i}
            d={`M${170 + i * 3} ${118 + i * 1} C${190 + i * 3} ${138 + i * 1} ${214 + i * 3} ${143 + i * 1} 240 ${145 + i * 1} C${266 - i * 3} ${143 + i * 1} ${290 - i * 3} ${138 + i * 1} ${310 - i * 3} ${118 + i * 1}`}
            fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.18" />
        ))}

        {/* ── LAPELS ── */}
        <path d="M184 130 L146 194 L196 208 L240 152Z" fill={secondaryColor} fillOpacity="0.84" />
        <path d="M296 130 L334 194 L284 208 L240 152Z" fill={secondaryColor} fillOpacity="0.84" />
        {/* Lapel shading */}
        <path d="M184 130 L146 194 L172 200 L218 148Z" fill={`url(#${id}lapel)`} />
        <path d="M296 130 L334 194 L308 200 L262 148Z" fill={`url(#${id}lapel)`} />
        {/* Lapel edge crease */}
        <path d="M184 130 L146 194" fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.18" />
        <path d="M296 130 L334 194" fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.18" />

        {/* ── FULL-LENGTH ZIPPER ── */}
        {/* Zipper tape */}
        <rect x="234" y="150" width="12" height="340" rx="2" fill={secondaryColor} fillOpacity="0.62" />
        {/* Alternating zipper teeth */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
          <g key={i}>
            <rect x="232" y={162 + i * 20} width="6" height="9" rx="1" fill="white" fillOpacity="0.20" />
            <rect x="242" y={162 + i * 20} width="6" height="9" rx="1" fill="white" fillOpacity="0.20" />
          </g>
        ))}
        {/* Zipper slider */}
        <rect x="228" y="166" width="24" height="18" rx="5" fill={secondaryColor} fillOpacity="0.96" />
        <line x1="240" y1="166" x2="240" y2="184" stroke="white" strokeWidth="2.2" strokeOpacity="0.45" />
        {/* Pull tab */}
        <rect x="233" y="184" width="14" height="28" rx="4" fill={secondaryColor} fillOpacity="0.80" />
        <line x1="240" y1="186" x2="240" y2="210" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
        {/* Stopper at bottom */}
        <path d="M232 486 L248 486 L248 494 L232 494Z" fill={secondaryColor} fillOpacity="0.85" />

        {/* ── CHEST POCKETS WITH ZIPPERS ── */}
        {/* Left chest pocket */}
        <path d="M94 226 L182 220 L184 266 L96 274 Q86 272 86 262 L86 234 Q86 224 94 226Z"
          fill={secondaryColor} fillOpacity="0.16" />
        <path d="M94 226 L182 220 L184 266 L96 274 Q86 272 86 262 L86 234 Q86 224 94 226Z"
          fill="none" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.52" />
        {/* Pocket top seam */}
        <line x1="86" y1="234" x2="182" y2="228" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.46" />
        {/* Pocket zipper */}
        <line x1="110" y1="224" x2="158" y2="221" stroke={secondaryColor} strokeWidth="3.5" strokeOpacity="0.45" />
        <circle cx="108" cy="224" r="5" fill={secondaryColor} fillOpacity="0.65" />
        <ellipse cx="108" cy="224" rx="2.5" ry="2.5" fill="white" fillOpacity="0.30" />
        {/* Pocket shadow */}
        <path d="M94 226 L182 220 L182 232 Q134 228 94 236Z" fill={shadowC} fillOpacity="0.08" />

        {/* Right chest pocket */}
        <path d="M298 220 L386 226 L394 234 L394 262 Q393 272 384 274 L296 266Z"
          fill={secondaryColor} fillOpacity="0.16" />
        <path d="M298 220 L386 226 L394 234 L394 262 Q393 272 384 274 L296 266Z"
          fill="none" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.52" />
        <line x1="298" y1="228" x2="394" y2="234" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.46" />
        <line x1="322" y1="221" x2="370" y2="224" stroke={secondaryColor} strokeWidth="3.5" strokeOpacity="0.45" />
        <circle cx="372" cy="224" r="5" fill={secondaryColor} fillOpacity="0.65" />
        <ellipse cx="372" cy="224" rx="2.5" ry="2.5" fill="white" fillOpacity="0.30" />
        <path d="M298 220 L386 226 L386 238 Q346 232 298 236Z" fill={shadowC} fillOpacity="0.08" />

        {/* ── SIDE / HIP POCKETS ── */}
        {/* Left hip pocket */}
        <path d="M88 368 L178 361 L180 424 L90 432 Q84 430 84 422 L84 375 Q84 368 88 368Z"
          fill={secondaryColor} fillOpacity="0.13" />
        <path d="M88 368 L178 361 L180 424 L90 432 Q84 430 84 422 L84 375 Q84 368 88 368Z"
          fill="none" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.46" />
        {/* Hip pocket shadow at top */}
        <path d="M88 368 L178 361 L178 372 Q134 368 88 378Z" fill={shadowC} fillOpacity="0.09" />

        {/* Right hip pocket */}
        <path d="M302 361 L392 368 L396 375 L396 422 Q395 430 390 432 L300 424Z"
          fill={secondaryColor} fillOpacity="0.13" />
        <path d="M302 361 L392 368 L396 375 L396 422 Q395 430 390 432 L300 424Z"
          fill="none" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.46" />
        <path d="M302 361 L392 368 L392 378 Q346 372 302 376Z" fill={shadowC} fillOpacity="0.09" />

        {/* ── TEAM NAME ── */}
        {teamName && (
          <text x="240" y="330" textAnchor="middle" fontSize="25" fontWeight="900"
            fontFamily="'Arial Black',sans-serif" fill={textFill} fillOpacity="0.72" letterSpacing="5">
            {teamName.toUpperCase()}
          </text>
        )}

        {/* ── SEAMS ── */}
        <line x1="88" y1="262" x2="88" y2="508" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.10" />
        <line x1="392" y1="262" x2="392" y2="508" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.10" />
        {/* Ribbed hem band */}
        <path d="M88 498 L392 498 L392 510 L88 510Z" fill={secondaryColor} fillOpacity="0.22" />
        <line x1="88" y1="498" x2="392" y2="498" stroke={shadowC} strokeWidth="2" strokeOpacity="0.14" />
        {[1, 2, 3].map((i) => (
          <line key={i} x1="88" y1={498 + i * 3} x2="392" y2={498 + i * 3}
            stroke="white" strokeWidth="0.7" strokeOpacity="0.09" />
        ))}
      </g>
    </svg>
  )
}
