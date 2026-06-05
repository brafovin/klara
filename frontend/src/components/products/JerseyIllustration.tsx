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
  const id = useMemo(() => `x${Math.random().toString(36).slice(2, 7)}`, [])

  const sc = stripeColor ?? secondaryColor
  const ac = accentColor ?? secondaryColor
  const cc = collarColor ?? secondaryColor

  // Detect light colors to add a border stroke
  const isLight = (hex: string) => {
    const h = hex.replace('#', '')
    if (h.length < 6) return true
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 200
  }
  const lightPrimary = isLight(primaryColor)
  const strokeColor = lightPrimary ? '#aabbcc' : 'none'
  const strokeW = lightPrimary ? 1 : 0

  const scale = size / 400

  // Main jersey silhouette path (body + sleeves combined)
  const jerseyPath =
    'M 120 72 C 88 58, 46 62, 24 96 L 2 188 C 0 200, 6 210, 16 214 L 74 230 L 74 456 L 326 456 L 326 230 L 384 214 C 394 210, 400 200, 398 188 L 376 96 C 354 62, 312 58, 280 72 C 260 108, 238 120, 200 122 C 162 120, 140 108, 120 72 Z'

  // Left sleeve clip area (rough bounding for left sleeve)
  const leftSleeveClip =
    'M 120 72 C 88 58, 46 62, 24 96 L 2 188 C 0 200, 6 210, 16 214 L 74 230 L 74 180 L 100 140 L 120 72 Z'

  // Right sleeve clip area
  const rightSleeveClip =
    'M 280 72 C 312 58, 354 62, 376 96 L 398 188 C 400 200, 394 210, 384 214 L 326 230 L 326 180 L 300 140 L 280 72 Z'

  // Body only clip (no sleeves)
  const bodyClip =
    'M 74 230 L 74 456 L 326 456 L 326 230 L 200 200 Z'

  // Yoke zone: upper chest + full sleeves
  const yokeClip =
    'M 120 72 C 88 58, 46 62, 24 96 L 2 188 C 0 200, 6 210, 16 214 L 74 230 L 74 270 L 200 240 L 326 270 L 326 230 L 384 214 C 394 210, 400 200, 398 188 L 376 96 C 354 62, 312 58, 280 72 C 260 108, 238 120, 200 122 C 162 120, 140 108, 120 72 Z'

  // V-collar path
  const collarPath =
    'M 148 80 C 160 96, 178 118, 200 130 C 222 118, 240 96, 252 80 C 238 72, 220 68, 200 68 C 180 68, 162 72, 148 80 Z'

  const collarBandPath =
    'M 148 80 L 200 130 L 252 80 C 240 68, 220 62, 200 62 C 180 62, 160 68, 148 80 Z'

  const renderPattern = () => {
    if (pattern === 'solid') return null

    if (pattern === 'stripes') {
      const stripes = []
      for (let x = 0; x < 400; x += 24) {
        stripes.push(
          <rect key={x} x={x} y={0} width={12} height={480} fill={sc} opacity={0.9} />
        )
      }
      return (
        <g clipPath={`url(#${id}-jersey-clip)`}>
          {stripes}
        </g>
      )
    }

    if (pattern === 'hoops') {
      const hoops = []
      for (let y = 0; y < 480; y += 38) {
        hoops.push(
          <rect key={y} x={0} y={y} width={400} height={18} fill={sc} opacity={0.9} />
        )
      }
      return (
        <g clipPath={`url(#${id}-jersey-clip)`}>
          {hoops}
        </g>
      )
    }

    if (pattern === 'diagonal') {
      const lines = []
      for (let i = -400; i < 800; i += 24) {
        lines.push(
          <rect key={i} x={i} y={0} width={12} height={800} fill={sc} opacity={0.9}
            transform="rotate(42 200 240)" />
        )
      }
      return (
        <g clipPath={`url(#${id}-jersey-clip)`}>
          {lines}
        </g>
      )
    }

    if (pattern === 'chevron') {
      const chevrons = []
      for (let y = -20; y < 500; y += 36) {
        chevrons.push(
          <path key={y}
            d={`M 0 ${y + 18} L 200 ${y} L 400 ${y + 18} L 400 ${y + 30} L 200 ${y + 12} L 0 ${y + 30} Z`}
            fill={sc} opacity={0.9} />
        )
      }
      return (
        <g clipPath={`url(#${id}-jersey-clip)`}>
          {chevrons}
        </g>
      )
    }

    if (pattern === 'yoke') {
      // Yoke base fill
      const diamonds = []
      const dw = 14
      const dh = 10
      for (let row = 0; row < 30; row++) {
        for (let col = -2; col < 32; col++) {
          const cx = col * dw + (row % 2 === 0 ? 0 : dw / 2)
          const cy = row * dh
          const fill = (row + col) % 2 === 0 ? ac : primaryColor
          diamonds.push(
            <polygon key={`${row}-${col}`}
              points={`${cx},${cy - dh / 2} ${cx + dw / 2},${cy} ${cx},${cy + dh / 2} ${cx - dw / 2},${cy}`}
              fill={fill} />
          )
        }
      }
      return (
        <>
          <g clipPath={`url(#${id}-yoke-clip)`}>
            <rect x={0} y={0} width={400} height={480} fill={sc} />
            <g opacity={0.85}>{diamonds}</g>
          </g>
        </>
      )
    }

    return null
  }

  const renderBadge = () => (
    <g transform="translate(148,168)">
      {/* Shield shape */}
      <path d="M 0 -16 L 16 -16 L 16 4 Q 8 14 0 18 Q -8 14 -16 4 L -16 -16 Z"
        fill={cc} opacity={0.95} />
      <path d="M 0 -16 L 16 -16 L 16 4 Q 8 14 0 18 Q -8 14 -16 4 L -16 -16 Z"
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={0.8} />
      <text x={0} y={-5} textAnchor="middle" fill="white"
        fontSize={5} fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing={0.5}>WM</text>
      <text x={0} y={4} textAnchor="middle" fill="white"
        fontSize={4} fontFamily="Arial, sans-serif">2026</text>
    </g>
  )

  return (
    <svg
      width={size}
      height={size * (480 / 400)}
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Drop shadow filter */}
        <filter id={`${id}-shadow`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx={0} dy={6} stdDeviation={10} floodColor="#000000" floodOpacity={0.35} />
        </filter>

        {/* Fabric texture */}
        <filter id={`${id}-texture`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={0.75} numOctaves={4} result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Top-left linear gradient for 3D shaping */}
        <linearGradient id={`${id}-grad-top`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={0.28} />
          <stop offset="40%" stopColor="white" stopOpacity={0.04} />
          <stop offset="100%" stopColor="black" stopOpacity={0.22} />
        </linearGradient>

        {/* Radial highlight on center chest */}
        <radialGradient id={`${id}-grad-center`} cx="50%" cy="38%" r="38%">
          <stop offset="0%" stopColor="white" stopOpacity={0.18} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>

        {/* Left edge shadow */}
        <linearGradient id={`${id}-grad-left`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity={0.25} />
          <stop offset="25%" stopColor="black" stopOpacity={0} />
        </linearGradient>

        {/* Right edge shadow */}
        <linearGradient id={`${id}-grad-right`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity={0.25} />
          <stop offset="25%" stopColor="black" stopOpacity={0} />
        </linearGradient>

        {/* Bottom shadow */}
        <linearGradient id={`${id}-grad-bottom`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="70%" stopColor="black" stopOpacity={0} />
          <stop offset="100%" stopColor="black" stopOpacity={0.3} />
        </linearGradient>

        {/* Jersey main clip */}
        <clipPath id={`${id}-jersey-clip`}>
          <path d={jerseyPath} />
        </clipPath>

        {/* Left sleeve clip */}
        <clipPath id={`${id}-left-sleeve-clip`}>
          <path d={leftSleeveClip} />
        </clipPath>

        {/* Right sleeve clip */}
        <clipPath id={`${id}-right-sleeve-clip`}>
          <path d={rightSleeveClip} />
        </clipPath>

        {/* Yoke clip */}
        <clipPath id={`${id}-yoke-clip`}>
          <path d={yokeClip} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/* Base jersey fill */}
        <path d={jerseyPath} fill={primaryColor}
          stroke={strokeColor} strokeWidth={strokeW} />

        {/* Pattern layer */}
        {renderPattern()}

        {/* Fabric texture overlay */}
        <path d={jerseyPath} fill="transparent"
          filter={`url(#${id}-texture)`} opacity={0.05} />

        {/* Lighting: top-left to bottom-right gradient */}
        <path d={jerseyPath} fill={`url(#${id}-grad-top)`} />

        {/* Radial highlight center */}
        <path d={jerseyPath} fill={`url(#${id}-grad-center)`} />

        {/* Left edge shadow */}
        <path d={jerseyPath} fill={`url(#${id}-grad-left)`} />

        {/* Right edge shadow */}
        <path d={jerseyPath} fill={`url(#${id}-grad-right)`} />

        {/* Bottom shadow */}
        <path d={jerseyPath} fill={`url(#${id}-grad-bottom)`} />

        {/* Left cuff band */}
        <g clipPath={`url(#${id}-left-sleeve-clip)`}>
          <rect x={0} y={194} width={90} height={22}
            fill={cc} opacity={0.85}
            transform="rotate(-20 45 205)" />
          {/* Ribbing lines on left cuff */}
          {[0, 4, 8, 12].map(offset => (
            <line key={offset}
              x1={offset} y1={194} x2={offset + 90} y2={194}
              stroke="rgba(0,0,0,0.15)" strokeWidth={1}
              transform="rotate(-20 45 205)" />
          ))}
        </g>

        {/* Right cuff band */}
        <g clipPath={`url(#${id}-right-sleeve-clip)`}>
          <rect x={310} y={194} width={90} height={22}
            fill={cc} opacity={0.85}
            transform="rotate(20 355 205)" />
          {[0, 4, 8, 12].map(offset => (
            <line key={offset}
              x1={310} y1={194 + offset} x2={400} y2={194 + offset}
              stroke="rgba(0,0,0,0.15)" strokeWidth={1}
              transform="rotate(20 355 205)" />
          ))}
        </g>

        {/* V-collar fill */}
        <path d={collarPath} fill={cc} />

        {/* Collar band (ribbed outer edge) */}
        <path d={collarBandPath} fill={cc} opacity={0.6}
          stroke="rgba(0,0,0,0.2)" strokeWidth={1} />

        {/* Collar ribbing texture */}
        {[-3, 0, 3, 6].map(offset => (
          <line key={offset}
            x1={200 + offset} y1={62}
            x2={148 + offset} y2={80}
            stroke="rgba(0,0,0,0.12)" strokeWidth={0.8} />
        ))}
        {[-3, 0, 3, 6].map(offset => (
          <line key={`r${offset}`}
            x1={200 + offset} y1={62}
            x2={252 + offset} y2={80}
            stroke="rgba(0,0,0,0.12)" strokeWidth={0.8} />
        ))}

        {/* Badge */}
        {renderBadge()}

        {/* Jersey number */}
        <text
          x={200} y={348}
          textAnchor="middle"
          fill={secondaryColor}
          fontSize={96}
          fontWeight="bold"
          fontFamily="'Arial Black', Arial, sans-serif"
          opacity={0.92}
        >
          {number}
        </text>

        {/* Team code */}
        {teamCode && (
          <text
            x={200} y={388}
            textAnchor="middle"
            fill={secondaryColor}
            fontSize={18}
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            letterSpacing={4}
            opacity={0.7}
          >
            {teamCode}
          </text>
        )}

        {/* Hem band */}
        <g clipPath={`url(#${id}-jersey-clip)`}>
          <rect x={0} y={442} width={400} height={14} fill={cc} opacity={0.35} />
          {[445, 449, 453].map(y => (
            <line key={y} x1={74} y1={y} x2={326} y2={y}
              stroke="rgba(0,0,0,0.12)" strokeWidth={0.8} />
          ))}
        </g>

        {/* Final specular highlight (top shoulder) */}
        <ellipse cx={160} cy={100} rx={55} ry={22}
          fill="white" opacity={0.08}
          transform="rotate(-30 160 100)"
          clipPath={`url(#${id}-jersey-clip)`} />
      </g>
    </svg>
  )
}
