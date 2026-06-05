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
  const id = useMemo(() => `x${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight =
    primaryColor === '#FFFFFF' ||
    primaryColor === '#fff' ||
    primaryColor === '#ffffff' ||
    primaryColor === '#FCD116' ||
    primaryColor === '#FFD700' ||
    primaryColor === '#fbbf24' ||
    primaryColor.toLowerCase() === '#f5f5f5'

  const shadowC = isLight ? '#7a8fa0' : '#000000'
  const strokeBorder = isLight ? '#aabbcc' : 'none'
  const strokeW = isLight ? '1.8' : '0'
  const txt = textColor ?? (isLight ? '#1a1a1a' : '#ffffff')

  const crownPath = [
    'M  60,230',
    'Q  52,160  90,120',
    'Q 120, 80 175, 68',
    'Q 210, 60 248, 68',
    'Q 300, 80 328,116',
    'Q 355,150 348,226',
    'Q 290,256 200,262',
    'Q 110,256  60,230 Z',
  ].join(' ')

  const frontPanelPath = [
    'M  60,230',
    'Q  62,160  98,122',
    'Q 130, 88 175, 74',
    'Q 200, 67 200, 67',
    'L 200,262',
    'Q 110,258  60,230 Z',
  ].join(' ')

  const sidePanelPath = [
    'M 200, 67',
    'Q 248, 68 298, 82',
    'Q 348,108 348,226',
    'Q 290,258 200,262',
    'L 200, 67 Z',
  ].join(' ')

  return (
    <svg
      viewBox="0 0 400 320"
      width={size}
      height={size * (320 / 400)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Snapback cap illustration"
    >
      <defs>
        <filter
          id={`${id}tex`}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65 0.06"
            numOctaves="4"
            seed="5"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        <filter id={`${id}ds`} x="-22%" y="-14%" width="144%" height="148%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000000" floodOpacity="0.30" />
        </filter>

        <linearGradient id={`${id}crownGrad`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.38'} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.35" />
        </linearGradient>

        <radialGradient id={`${id}frontHL`} cx="45%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.22'} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}sideShad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.32" />
        </linearGradient>

        <linearGradient id={`${id}leftEdge`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.28" />
          <stop offset="22%" stopColor={shadowC} stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`${id}bottomVig`} cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.20" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}brimTop`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.02' : '0.20'} />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.30" />
        </linearGradient>

        <linearGradient id={`${id}brimUnder`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.65" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.22" />
        </linearGradient>

        <clipPath id={`${id}crownClip`}>
          <path d={crownPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        <path
          d={crownPath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={strokeW}
        />

        <path d={frontPanelPath} fill={primaryColor} />
        <path d={frontPanelPath} fill={`url(#${id}frontHL)`} />

        <path d={sidePanelPath} fill={primaryColor} />
        <path d={sidePanelPath} fill={`url(#${id}sideShad)`} />

        <path d={crownPath} fill={`url(#${id}crownGrad)`} />
        <path d={crownPath} fill={`url(#${id}leftEdge)`} />
        <path d={crownPath} fill={`url(#${id}bottomVig)`} />

        {/* Panel seam lines */}
        <line
          x1="200" y1="68" x2="200" y2="262"
          stroke={shadowC} strokeWidth="1.4" strokeOpacity="0.25"
        />
        <path
          d="M 200,68 Q 150,120 90,228"
          fill="none" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.20"
        />
        <path
          d="M 200,68 Q 110,110 62,230"
          fill="none" stroke={shadowC} strokeWidth="0.9" strokeOpacity="0.13"
        />
        <path
          d="M 200,68 Q 265,110 322,222"
          fill="none" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.20"
        />
        <path
          d="M 200,68 Q 310,106 348,226"
          fill="none" stroke={shadowC} strokeWidth="1" strokeOpacity="0.16"
        />

        <path d={crownPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Sweatband */}
        <path
          d="M 60,230 Q 110,256 200,262 Q 290,258 348,226 Q 340,240 200,248 Q 60,242 60,230 Z"
          fill={accentColor}
          fillOpacity="0.70"
        />
        <path
          d="M 60,230 Q 110,254 200,260 Q 290,256 348,226"
          fill="none" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.30"
        />
        {Array.from({ length: 11 }, (_, i) => {
          const t = i / 10
          const x = 68 + t * 272
          const y = 236 + Math.sin(t * Math.PI) * 12
          return (
            <ellipse
              key={i}
              cx={x} cy={y}
              rx="3.5" ry="2.2"
              fill={primaryColor}
              fillOpacity="0.40"
            />
          )
        })}

        {/* Brim underside */}
        <path
          d="M 10,248 Q  8,272  60,282 Q 120,292 200,294 Q 240,294 240,286 Q 200,282 120,272 Q 48,262 10,248 Z"
          fill={`url(#${id}brimUnder)`}
        />
        {/* Brim top surface */}
        <path
          d="M 10,246 Q  8,268  60,278 Q 130,290 200,290 Q 240,290 240,282 Q 196,278 120,268 Q 48,258 10,246 Z"
          fill={primaryColor}
        />
        <path
          d="M 10,246 Q  8,268  60,278 Q 130,290 200,290 Q 240,290 240,282 Q 196,278 120,268 Q 48,258 10,246 Z"
          fill={`url(#${id}brimTop)`}
        />
        {/* Brim outer edge */}
        <path
          d="M 10,248 Q  8,274  60,284 Q 130,294 200,294 Q 242,294 242,284"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        {/* Brim stitching row 1 */}
        <path
          d="M 20,252 Q 20,272 65,281 Q 136,290 200,290"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeOpacity="0.45"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />
        {/* Brim stitching row 2 */}
        <path
          d="M 34,256 Q 35,272 70,278 Q 140,287 200,286"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.9"
          strokeOpacity="0.30"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />
        <path
          d="M 10,246 Q  8,268  60,278 Q 130,290 200,290 Q 240,290 240,282 Q 196,278 120,268 Q 48,258 10,246 Z"
          fill={primaryColor}
          filter={`url(#${id}tex)`}
          opacity="0.05"
        />

        {/* Top button */}
        <circle cx="200" cy="70" r="14" fill={accentColor} fillOpacity="0.96" />
        <circle cx="200" cy="70" r="9" fill={primaryColor} fillOpacity="0.70" />
        <circle cx="200" cy="70" r="4" fill={accentColor} fillOpacity="0.90" />
        <line x1="196" y1="70" x2="204" y2="70" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.55" />
        <line x1="200" y1="66" x2="200" y2="74" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.55" />
        <ellipse cx="197" cy="67" rx="3.5" ry="2" fill="#ffffff" fillOpacity="0.28" />

        {/* Front emblem – WM embroidered patch */}
        <ellipse cx="145" cy="170" rx="42" ry="36" fill={accentColor} fillOpacity="0.90" />
        <ellipse
          cx="145" cy="170" rx="42" ry="36"
          fill="none"
          stroke={primaryColor} strokeWidth="2.5" strokeOpacity="0.50"
          strokeDasharray="4 2"
        />
        <ellipse cx="140" cy="162" rx="30" ry="20" fill="#ffffff" fillOpacity="0.18" />
        {/* Shadow text for depth */}
        <text
          x="146" y="179"
          textAnchor="middle"
          fontSize="24" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill="#000000"
          opacity="0.18"
          letterSpacing="1"
        >
          WM
        </text>
        {/* Emblem text */}
        <text
          x="145" y="178"
          textAnchor="middle"
          fontSize="24" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill={txt}
          opacity="0.96"
          letterSpacing="1"
        >
          WM
        </text>

        {/* Adjustable back strap */}
        <path
          d="M 202,248 Q 240,246 278,248 Q 278,262 240,264 Q 202,262 202,248 Z"
          fill={accentColor}
          fillOpacity="0.60"
        />
        <rect x="226" y="244" width="28" height="22" rx="5" fill={accentColor} fillOpacity="0.90" />
        <rect x="230" y="248" width="20" height="14" rx="3" fill={primaryColor} fillOpacity="0.60" />
        <line x1="240" y1="246" x2="240" y2="266" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.40" />
        {([-2, -0.67, 0.67, 2] as number[]).map((offset, i) => (
          <circle
            key={i}
            cx={240 + offset * 8}
            cy={257}
            r="2.5"
            fill={primaryColor}
            fillOpacity="0.65"
          />
        ))}
        <path
          d="M 202,249 Q 240,247 278,249 L 278,252 Q 240,250 202,252 Z"
          fill="#ffffff" fillOpacity="0.18"
        />
      </g>
    </svg>
  )
}
