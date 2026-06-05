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
  const id = useMemo(() => `j${Math.random().toString(36).slice(2, 7)}`, [])

  const sc = stripeColor ?? secondaryColor
  const ac = accentColor ?? secondaryColor
  const cc = collarColor ?? secondaryColor

  const lum = (hex: string) => {
    const h = hex.replace('#', '')
    if (h.length < 6) return 255
    return (parseInt(h.slice(0,2),16)*299 + parseInt(h.slice(2,4),16)*587 + parseInt(h.slice(4,6),16)*114) / 1000
  }
  const lightPrimary = lum(primaryColor) > 180
  const lightSecondary = lum(secondaryColor) > 180
  const strokeBorder = lightPrimary ? '#b0c0d0' : 'none'
  // Number color: if secondary is light use it, otherwise use it. If secondary == primary use white/black
  const numColor = secondaryColor === primaryColor
    ? (lightPrimary ? '#333333' : '#ffffff')
    : secondaryColor

  // Jersey body + sleeves (one unified path for clean edges)
  // viewBox 0 0 400 450
  const body = 'M 128 68 C 96 54 54 58 32 92 L 8 188 C 6 200 12 210 22 214 L 76 230 76 432 324 432 324 230 378 214 C 388 210 394 200 392 188 L 368 92 C 346 58 304 54 272 68 C 254 102 232 114 200 116 C 168 114 146 102 128 68 Z'

  // Sleeve-only zones for pattern clips
  const leftSleeve = 'M 128 68 C 96 54 54 58 32 92 L 8 188 C 6 200 12 210 22 214 L 76 230 76 190 104 140 C 112 118 120 90 128 68 Z'
  const rightSleeve = 'M 272 68 C 304 54 346 58 368 92 L 392 188 C 394 200 388 210 378 214 L 324 230 324 190 296 140 C 288 118 280 90 272 68 Z'

  // Yoke = shoulders + sleeves, V-shape cutting down to ~y=252 in center
  const yoke = 'M 128 68 C 96 54 54 58 32 92 L 8 188 C 6 200 12 210 22 214 L 76 230 76 252 200 224 324 252 324 230 378 214 C 388 210 394 200 392 188 L 368 92 C 346 58 304 54 272 68 C 254 102 232 114 200 116 C 168 114 146 102 128 68 Z'

  // V-neck: thin outer band (~10px), inner opening is transparent
  const collarOuter = 'M 152 76 C 168 106 184 116 200 118 C 216 116 232 106 248 76 C 234 68 218 64 200 63 C 182 64 166 68 152 76 Z'
  const collarInner = 'M 158 78 C 172 106 186 114 200 116 C 214 114 228 106 242 78 C 230 71 216 67 200 67 C 184 67 170 71 158 78 Z'

  return (
    <svg viewBox="0 0 400 450" width={size} height={size * (450/400)} xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <filter id={`${id}ds`} x="-18%" y="-10%" width="136%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.28" />
        </filter>
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.06" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Overall diagonal shading – simulates light from top-left */}
        <linearGradient id={`${id}g1`} x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={lightPrimary ? '0.04' : '0.28'} />
          <stop offset="42%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.28" />
        </linearGradient>

        {/* Center chest radial highlight */}
        <radialGradient id={`${id}g2`} cx="50%" cy="48%" r="38%">
          <stop offset="0%" stopColor="white" stopOpacity={lightPrimary ? '0' : '0.18'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side edge shadows */}
        <linearGradient id={`${id}g3`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.22" />
          <stop offset="18%" stopColor="black" stopOpacity="0" />
          <stop offset="82%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.22" />
        </linearGradient>

        {/* Bottom vignette */}
        <linearGradient id={`${id}g4`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="72%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </linearGradient>

        {/* Left sleeve darker shading */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={lightPrimary ? '0' : '0.12'} />
          <stop offset="100%" stopColor="black" stopOpacity="0.38" />
        </linearGradient>

        {/* Right sleeve darker shading */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={lightPrimary ? '0' : '0.12'} />
          <stop offset="100%" stopColor="black" stopOpacity="0.38" />
        </linearGradient>

        <clipPath id={`${id}bc`}><path d={body} /></clipPath>
        <clipPath id={`${id}lsc`}><path d={leftSleeve} /></clipPath>
        <clipPath id={`${id}rsc`}><path d={rightSleeve} /></clipPath>
        <clipPath id={`${id}yc`}><path d={yoke} /></clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── BASE JERSEY ── */}
        <path d={body} fill={primaryColor} stroke={strokeBorder} strokeWidth={lightPrimary ? '1.5' : '0'} />

        {/* ── PATTERNS ── */}
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}bc)`}>
            {Array.from({length:18},(_,i) => (
              <rect key={i} x={i*24} y="0" width="12" height="450" fill={sc} opacity="0.92" />
            ))}
          </g>
        )}
        {pattern === 'hoops' && (
          <g clipPath={`url(#${id}bc)`}>
            {Array.from({length:12},(_,i) => (
              <rect key={i} x="0" y={i*38} width="400" height="19" fill={sc} opacity="0.92" />
            ))}
          </g>
        )}
        {pattern === 'diagonal' && (
          <g clipPath={`url(#${id}bc)`}>
            {Array.from({length:28},(_,i) => (
              <rect key={i} x={-300+i*28} y="0" width="14" height="700" fill={sc} opacity="0.90" transform="rotate(42 200 225)" />
            ))}
          </g>
        )}
        {pattern === 'chevron' && (
          <g clipPath={`url(#${id}bc)`}>
            {Array.from({length:14},(_,i) => (
              <path key={i} d={`M0 ${i*34+14} L200 ${i*34} L400 ${i*34+14} L400 ${i*34+26} L200 ${i*34+12} L0 ${i*34+26}Z`}
                fill={sc} opacity="0.90" />
            ))}
          </g>
        )}
        {pattern === 'yoke' && (
          <g clipPath={`url(#${id}yc)`}>
            {/* Yoke solid base */}
            <rect x="0" y="0" width="400" height="450" fill={sc} />
            {/* Diamond grid – larger diamonds, more spacious */}
            {Array.from({length:16},(_,row) =>
              Array.from({length:20},(_,col) => {
                const dw = 20, dh = 14
                const cx = (row%2===0 ? 0 : dw/2) + col*dw - 10
                const cy = row*dh
                return (
                  <polygon key={`${row}-${col}`}
                    points={`${cx},${cy-dh/2} ${cx+dw/2},${cy} ${cx},${cy+dh/2} ${cx-dw/2},${cy}`}
                    fill={(row+col)%2===0 ? ac : primaryColor}
                    fillOpacity="0.82"
                  />
                )
              })
            )}
            {/* Yoke bottom highlight edge */}
            <path d="M76 252 C120 238 160 232 200 230 C240 232 280 238 324 252"
              fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.35" />
          </g>
        )}

        {/* ── SLEEVE SHADING OVERLAYS ── */}
        <path d={leftSleeve} fill={`url(#${id}sl)`} />
        <path d={rightSleeve} fill={`url(#${id}sr)`} />

        {/* ── LIGHTING ── */}
        <path d={body} fill={`url(#${id}g1)`} />
        <path d={body} fill={`url(#${id}g2)`} />
        <path d={body} fill={`url(#${id}g3)`} />
        <path d={body} fill={`url(#${id}g4)`} />

        {/* Fabric texture */}
        <path d={body} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.048" />

        {/* Armhole depth shadows */}
        <path d="M76 230 L76 310 L100 296 L100 166Z" fill="black" fillOpacity="0.10" />
        <path d="M324 230 L324 310 L300 296 L300 166Z" fill="black" fillOpacity="0.10" />

        {/* ── SLEEVE CUFFS ── */}
        <g clipPath={`url(#${id}lsc)`}>
          <path d="M8 192 L76 210 76 232 8 214Z" fill={cc} opacity="0.92" />
          <line x1="8" y1="198" x2="76" y2="216" stroke="white" strokeWidth="1.2" strokeOpacity="0.28" />
          <line x1="8" y1="205" x2="76" y2="223" stroke="white" strokeWidth="0.8" strokeOpacity="0.15" />
        </g>
        <g clipPath={`url(#${id}rsc)`}>
          <path d="M392 192 L324 210 324 232 392 214Z" fill={cc} opacity="0.92" />
          <line x1="392" y1="198" x2="324" y2="216" stroke="white" strokeWidth="1.2" strokeOpacity="0.28" />
          <line x1="392" y1="205" x2="324" y2="223" stroke="white" strokeWidth="0.8" strokeOpacity="0.15" />
        </g>

        {/* ── V-NECK COLLAR ── */}
        {/* Collar band */}
        <path d={collarOuter} fill={cc} />
        {/* Cut out to show body color inside */}
        <path d={collarInner} fill={primaryColor} />
        {/* Collar highlight top edge */}
        <path d="M 152 76 C 168 106 184 116 200 118 C 216 116 232 106 248 76"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity={lightSecondary ? '0.20' : '0.35'} />
        {/* Collar shadow bottom inner edge */}
        <path d="M 158 78 C 172 106 186 114 200 116 C 214 114 228 106 242 78"
          fill="none" stroke="black" strokeWidth="0.8" strokeOpacity="0.20" />

        {/* ── BADGE (left chest) ── */}
        <g transform="translate(140,166)">
          <path d="M-12,-18 L12,-18 L14,2 Q6,14 0,18 Q-6,14 -14,2 Z" fill={cc} opacity="0.95" />
          <path d="M-12,-18 L12,-18 L14,2 Q6,14 0,18 Q-6,14 -14,2 Z"
            fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.45" />
          <text x="0" y="-7" textAnchor="middle" fontSize="7" fontWeight="900"
            fontFamily="Arial,sans-serif" fill="white" opacity="0.95">WM</text>
          <text x="0" y="3" textAnchor="middle" fontSize="6" fontWeight="700"
            fontFamily="Arial,sans-serif" fill="white" opacity="0.90">2026</text>
          {teamCode && (
            <text x="0" y="13" textAnchor="middle" fontSize="5" fontWeight="600"
              fontFamily="Arial,sans-serif" fill="white" opacity="0.75">{teamCode}</text>
          )}
        </g>

        {/* ── NUMBER ── */}
        {/* Shadow */}
        <text x="203" y="340" textAnchor="middle" fontSize="88" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill="black" fillOpacity="0.15" letterSpacing="-3">{number}</text>
        {/* Main */}
        <text x="200" y="337" textAnchor="middle" fontSize="88" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill={numColor} fillOpacity="0.92" letterSpacing="-3">{number}</text>

        {/* Team code */}
        {teamCode && (
          <text x="200" y="372" textAnchor="middle" fontSize="16" fontWeight="700"
            fontFamily="Arial,sans-serif" fill={numColor} fillOpacity="0.60" letterSpacing="6">
            {teamCode}
          </text>
        )}

        {/* ── HEM BAND ── */}
        <g clipPath={`url(#${id}bc)`}>
          <rect x="76" y="418" width="248" height="14" fill={cc} fillOpacity="0.35" />
          <line x1="76" y1="418" x2="324" y2="418" stroke="black" strokeWidth="1.2" strokeOpacity="0.14" />
          <line x1="76" y1="424" x2="324" y2="424" stroke="white" strokeWidth="0.7" strokeOpacity="0.10" />
        </g>

        {/* Seam lines */}
        <line x1="76" y1="232" x2="76" y2="430" stroke="black" strokeWidth="1" strokeOpacity="0.10" />
        <line x1="324" y1="232" x2="324" y2="430" stroke="black" strokeWidth="1" strokeOpacity="0.10" />
      </g>
    </svg>
  )
}
