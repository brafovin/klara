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
  const id = useMemo(() => `x${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight =
    primaryColor === '#FFFFFF' ||
    primaryColor === '#fff' ||
    primaryColor === '#ffffff' ||
    primaryColor.toLowerCase() === '#f5f5f5' ||
    primaryColor.toLowerCase() === '#fafafa' ||
    primaryColor.toLowerCase() === '#f0f0f0'

  const isDark =
    primaryColor === '#000000' ||
    primaryColor === '#111111' ||
    primaryColor === '#1a1a1a' ||
    primaryColor === '#111827' ||
    primaryColor === '#0f172a'

  const shadowC = isLight ? '#5a6e85' : '#000000'
  const strokeBorder = isLight ? '#aabbcc' : 'none'
  const strokeW = isLight ? '1.8' : '0'
  const textFill = isDark ? '#ffffff' : isLight ? accentColor : '#ffffff'

  // ── Body shape: boxy pullover hoodie, viewBox 0 0 400 500 ──
  // Shoulder line sits at ~y=190, body widens at armhole, narrows at hem
  const bodyPath = [
    'M 118,192',
    'L  44,232',
    'L  18,355',
    'L  86,370',
    'L  86,470',
    'L 314,470',
    'L 314,370',
    'L 382,355',
    'L 356,232',
    'L 282,192',
    'C 260,210 232,220 200,220',
    'C 168,220 140,210 118,192 Z',
  ].join(' ')

  const leftSleevePath = [
    'M 118,192',
    'L  44,232',
    'L  18,355',
    'L  86,370',
    'L 108,280',
    'C 116,244 118,216 118,192 Z',
  ].join(' ')

  const rightSleevePath = [
    'M 282,192',
    'L 356,232',
    'L 382,355',
    'L 314,370',
    'L 292,280',
    'C 284,244 282,216 282,192 Z',
  ].join(' ')

  // Hood: large dome that sits behind the body collar area
  const hoodOuterPath = [
    'M 118,192',
    'C 118,140 130,90 152,56',
    'C 168,30 186,16 200,14',
    'C 214,16 232,30 248,56',
    'C 270,90 282,140 282,192',
    'C 260,210 232,220 200,220',
    'C 168,220 140,210 118,192 Z',
  ].join(' ')

  // Hood tunnel opening – the dark void of the hood interior
  const hoodInnerPath = [
    'M 140,188',
    'C 142,130 154,86 172,60',
    'C 184,40 196,32 200,30',
    'C 204,32 216,40 228,60',
    'C 246,86 258,130 260,188',
    'C 244,200 224,208 200,210',
    'C 176,208 156,200 140,188 Z',
  ].join(' ')

  return (
    <svg
      viewBox="0 0 400 500"
      width={size}
      height={size * (500 / 400)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hoodie illustration"
    >
      <defs>
        {/* Fleece fabric fractalNoise texture */}
        <filter
          id={`${id}tex`}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55 0.07"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Ghost-mannequin drop shadow */}
        <filter id={`${id}ds`} x="-20%" y="-10%" width="140%" height="136%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000000" floodOpacity="0.32" />
        </filter>

        {/* Body: top-left highlight → bottom-right shadow */}
        <linearGradient id={`${id}bg`} x1="5%" y1="2%" x2="92%" y2="98%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.26'} />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.40" />
        </linearGradient>

        {/* Center chest radial highlight */}
        <radialGradient id={`${id}center`} cx="50%" cy="42%" r="36%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.18'} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Side edge shadows */}
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.30" />
          <stop offset="16%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="84%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.32" />
        </linearGradient>

        {/* Hood outer lighting: top-left highlight, bottom-right dark */}
        <linearGradient id={`${id}hoodGrad`} x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.30'} />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.38" />
        </linearGradient>

        {/* Hood inner depth – dark abyss gradient */}
        <radialGradient id={`${id}hInner`} cx="50%" cy="75%" r="65%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.88" />
          <stop offset="60%" stopColor={shadowC} stopOpacity="0.50" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.05" />
        </radialGradient>

        {/* Hood side shadow bands */}
        <linearGradient id={`${id}hoodSide`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22" />
          <stop offset="20%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="80%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.22" />
        </linearGradient>

        {/* Left sleeve: bright top-right, dark bottom-left */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.18'} />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.56" />
        </linearGradient>

        {/* Right sleeve */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.18'} />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.56" />
        </linearGradient>

        {/* Pocket inner shadow top-to-bottom */}
        <linearGradient id={`${id}pkt`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.18" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.04" />
        </linearGradient>

        {/* Cuff band gradient */}
        <linearGradient id={`${id}cuff`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.20" />
        </linearGradient>

        <clipPath id={`${id}bodyclip`}>
          <path d={bodyPath} />
        </clipPath>
        <clipPath id={`${id}hoodclip`}>
          <path d={hoodOuterPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>

        {/* ══ HOOD (rendered first – behind everything) ══ */}
        <path
          d={hoodOuterPath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={strokeW}
        />
        {/* Hood lighting overlay */}
        <path d={hoodOuterPath} fill={`url(#${id}hoodGrad)`} />
        {/* Hood side vignette */}
        <path d={hoodOuterPath} fill={`url(#${id}hoodSide)`} />
        {/* Hood top-edge corner darks for 3D dome feel */}
        <path
          d="M 118,192 C 120,148 128,108 140,80 L 136,78 C 124,108 116,150 114,196 Z"
          fill={shadowC}
          fillOpacity="0.14"
        />
        <path
          d="M 282,192 C 280,148 272,108 260,80 L 264,78 C 276,108 284,150 286,196 Z"
          fill={shadowC}
          fillOpacity="0.14"
        />
        {/* Hood fabric texture at 5% */}
        <path d={hoodOuterPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Hood inner opening – dark lining */}
        <path d={hoodInnerPath} fill={accentColor} fillOpacity="0.15" />
        <path d={hoodInnerPath} fill={`url(#${id}hInner)`} />
        {/* Hood opening rim highlight (edge of the tunnel) */}
        <path
          d="M 140,188 C 158,200 178,207 200,209 C 222,207 242,200 260,188"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
        {/* Hood opening top rim shadow */}
        <path
          d="M 140,188 C 158,178 178,174 200,174 C 222,174 242,178 260,188"
          fill="none"
          stroke={shadowC}
          strokeWidth="2"
          strokeOpacity="0.20"
          strokeLinecap="round"
        />

        {/* ══ LEFT SLEEVE ══ */}
        <path
          d={leftSleevePath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={strokeW}
        />
        <path d={leftSleevePath} fill={`url(#${id}sl)`} />
        <path d={leftSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Left ribbed cuff band */}
        <path d="M 18,340 L 86,355 L 86,372 L 18,357 Z" fill={accentColor} fillOpacity="0.80" />
        <path d="M 18,340 L 86,355 L 86,372 L 18,357 Z" fill={`url(#${id}cuff)`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="18" y1={340 + i * 4}
            x2="86" y2={355 + i * 4}
            stroke="#ffffff"
            strokeWidth={i === 0 ? '1.8' : '0.9'}
            strokeOpacity={i === 0 ? '0.32' : '0.13'}
          />
        ))}
        <line x1="18" y1="340" x2="86" y2="355" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.22" />

        {/* ══ RIGHT SLEEVE ══ */}
        <path
          d={rightSleevePath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={strokeW}
        />
        <path d={rightSleevePath} fill={`url(#${id}sr)`} />
        <path d={rightSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Right ribbed cuff band */}
        <path d="M 382,340 L 314,355 L 314,372 L 382,357 Z" fill={accentColor} fillOpacity="0.80" />
        <path d="M 382,340 L 314,355 L 314,372 L 382,357 Z" fill={`url(#${id}cuff)`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="382" y1={340 + i * 4}
            x2="314" y2={355 + i * 4}
            stroke="#ffffff"
            strokeWidth={i === 0 ? '1.8' : '0.9'}
            strokeOpacity={i === 0 ? '0.32' : '0.13'}
          />
        ))}
        <line x1="382" y1="340" x2="314" y2="355" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.22" />

        {/* ══ BODY ══ */}
        <path
          d={bodyPath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={isLight ? '2' : '0'}
        />
        <path d={bodyPath} fill={`url(#${id}bg)`} />
        <path d={bodyPath} fill={`url(#${id}center)`} />
        <path d={bodyPath} fill={`url(#${id}side)`} />
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Armhole crease shadows (depth where arm meets body) */}
        <path d="M 86,370 L 86,448 L 110,435 L 110,285 Z" fill={shadowC} fillOpacity="0.10" />
        <path d="M 314,370 L 314,448 L 290,435 L 290,285 Z" fill={shadowC} fillOpacity="0.10" />

        {/* Shoulder seam lines */}
        <path
          d="M 118,192 C 140,210 168,220 200,220"
          fill="none" stroke={shadowC} strokeWidth="1.3" strokeOpacity="0.20"
        />
        <path
          d="M 282,192 C 260,210 232,220 200,220"
          fill="none" stroke={shadowC} strokeWidth="1.3" strokeOpacity="0.20"
        />

        {/* ══ DRAWSTRINGS ══ */}
        {/* Left cord – natural drape with slight S-curve */}
        <path
          d="M 185,216 C 181,244 177,270 175,296 C 173,316 177,332 173,356"
          fill="none"
          stroke={accentColor}
          strokeWidth="5"
          strokeOpacity="0.78"
          strokeLinecap="round"
        />
        {/* Left cord round highlight */}
        <path
          d="M 185,216 C 181,244 177,270 175,296 C 173,316 177,332 173,356"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeOpacity="0.26"
          strokeLinecap="round"
          strokeDasharray="0"
        />
        {/* Left cord center crease */}
        <path
          d="M 184,216 C 180,244 176,270 174,296 C 172,316 176,332 172,356"
          fill="none"
          stroke={shadowC}
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />

        {/* Right cord */}
        <path
          d="M 215,216 C 219,244 223,270 225,296 C 227,316 223,332 227,356"
          fill="none"
          stroke={accentColor}
          strokeWidth="5"
          strokeOpacity="0.78"
          strokeLinecap="round"
        />
        <path
          d="M 215,216 C 219,244 223,270 225,296 C 227,316 223,332 227,356"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeOpacity="0.26"
          strokeLinecap="round"
        />
        <path
          d="M 216,216 C 220,244 224,270 226,296 C 228,316 224,332 228,356"
          fill="none"
          stroke={shadowC}
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />

        {/* Aglets (metal tips) */}
        <ellipse cx="173" cy="360" rx="5.5" ry="9" fill={accentColor} fillOpacity="0.95" />
        <ellipse cx="173" cy="357" rx="2.5" ry="3.5" fill="#ffffff" fillOpacity="0.35" />
        <line x1="173" y1="355" x2="173" y2="369" stroke={shadowC} strokeWidth="1" strokeOpacity="0.28" />

        <ellipse cx="227" cy="360" rx="5.5" ry="9" fill={accentColor} fillOpacity="0.95" />
        <ellipse cx="227" cy="357" rx="2.5" ry="3.5" fill="#ffffff" fillOpacity="0.35" />
        <line x1="227" y1="355" x2="227" y2="369" stroke={shadowC} strokeWidth="1" strokeOpacity="0.28" />

        {/* ══ KANGAROO POCKET ══ */}
        {/* Pocket drop shadow */}
        <path
          d="M 108,352 Q 108,338 120,334 L 200,331 L 280,334 Q 292,338 292,352 L 292,430 Q 292,442 280,446 L 200,449 L 120,446 Q 108,442 108,430 Z"
          fill={shadowC}
          fillOpacity="0.12"
          transform="translate(2,3)"
        />
        {/* Pocket tonal fill (slightly lighter/darker) */}
        <path
          d="M 108,352 Q 108,338 120,334 L 200,331 L 280,334 Q 292,338 292,352 L 292,430 Q 292,442 280,446 L 200,449 L 120,446 Q 108,442 108,430 Z"
          fill={accentColor}
          fillOpacity="0.10"
        />
        <path
          d="M 108,352 Q 108,338 120,334 L 200,331 L 280,334 Q 292,338 292,352 L 292,430 Q 292,442 280,446 L 200,449 L 120,446 Q 108,442 108,430 Z"
          fill={`url(#${id}pkt)`}
        />
        {/* Pocket stitch border */}
        <path
          d="M 108,352 Q 108,338 120,334 L 200,331 L 280,334 Q 292,338 292,352 L 292,430 Q 292,442 280,446 L 200,449 L 120,446 Q 108,442 108,430 Z"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.50"
          strokeDasharray="5 3"
        />
        {/* Pocket opening slot (top edge) */}
        <path
          d="M 122,334 L 278,334"
          fill="none"
          stroke={shadowC}
          strokeWidth="3.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
        <path
          d="M 122,334 L 278,334"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.20"
          strokeLinecap="round"
        />
        {/* Pocket inner top shadow (depth of opening) */}
        <path
          d="M 120,334 Q 200,338 280,334 L 280,344 Q 200,348 120,344 Z"
          fill={shadowC}
          fillOpacity="0.08"
        />
        {/* Center divider seam */}
        <line
          x1="200" y1="331" x2="200" y2="449"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeOpacity="0.35"
          strokeDasharray="5 3"
        />

        {/* ══ TEAM NAME (above pocket) ══ */}
        {teamName && (
          <>
            <text
              x="201" y="322"
              textAnchor="middle"
              fontSize="20" fontWeight="900"
              fontFamily="'Arial Black','Impact',sans-serif"
              fill="#000000" fillOpacity="0.18"
              letterSpacing="4"
            >
              {teamName.toUpperCase()}
            </text>
            <text
              x="200" y="321"
              textAnchor="middle"
              fontSize="20" fontWeight="900"
              fontFamily="'Arial Black','Impact',sans-serif"
              fill={textFill} fillOpacity="0.82"
              letterSpacing="4"
            >
              {teamName.toUpperCase()}
            </text>
          </>
        )}

        {/* ══ SIDE SEAMS ══ */}
        <line x1="86" y1="370" x2="86" y2="468" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.14" />
        <line x1="314" y1="370" x2="314" y2="468" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.14" />

        {/* ══ RIBBED HEM BAND ══ */}
        <path d="M 86,458 L 314,458 L 314,470 L 86,470 Z" fill={accentColor} fillOpacity="0.25" />
        <path d="M 86,458 L 314,458 L 314,470 L 86,470 Z" fill={`url(#${id}cuff)`} />
        <line x1="86" y1="458" x2="314" y2="458" stroke={shadowC} strokeWidth="2" strokeOpacity="0.18" />
        <line x1="86" y1="458" x2="314" y2="458" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.22" />
        {[1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="86" y1={458 + i * 3}
            x2="314" y2={458 + i * 3}
            stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.10"
          />
        ))}
      </g>
    </svg>
  )
}
