'use client'

import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  graphicColor?: string
  text?: string
  subtext?: string
  size?: number
  graphic?: 'ball' | 'star' | 'shield' | 'wave'
}

export default function TshirtIllustration({
  primaryColor = '#FBBF24',
  graphicColor = '#15803d',
  text = 'WM 2026',
  subtext = 'FAN',
  size = 400,
  graphic = 'ball',
}: Props) {
  const id = useMemo(() => `x${Math.random().toString(36).slice(2, 7)}`, [])

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

  // Casual t-shirt shape: boxier, crew neck
  const tshirtPath =
    'M 110 68 C 78 54, 40 58, 18 90 L 0 182 C -2 196, 4 208, 14 212 L 68 226 L 68 446 L 332 446 L 332 226 L 386 212 C 396 208, 402 196, 400 182 L 382 90 C 360 58, 322 54, 290 68 C 272 96, 242 112, 200 114 C 158 112, 128 96, 110 68 Z'

  // Left sleeve clip
  const leftSleeveClip =
    'M 110 68 C 78 54, 40 58, 18 90 L 0 182 C -2 196, 4 208, 14 212 L 68 226 L 68 172 L 96 128 L 110 68 Z'

  // Right sleeve clip
  const rightSleeveClip =
    'M 290 68 C 322 54, 360 58, 382 90 L 400 182 C 402 196, 396 208, 386 212 L 332 226 L 332 172 L 304 128 L 290 68 Z'

  // Crew neck collar path (round)
  const collarPath =
    'M 142 78 C 150 56, 172 46, 200 46 C 228 46, 250 56, 258 78 C 242 92, 222 100, 200 100 C 178 100, 158 92, 142 78 Z'

  // Collar band (thicker ring)
  const collarBandOuter =
    'M 138 76 C 146 50, 170 38, 200 38 C 230 38, 254 50, 262 76 C 248 94, 226 104, 200 104 C 174 104, 152 94, 138 76 Z'

  const renderGraphic = () => {
    if (graphic === 'ball') {
      return (
        <g transform="translate(200, 245)">
          {/* Ball base */}
          <circle r={44} fill="white" />
          {/* Black pentagons - realistic soccer ball patches */}
          {/* Center pentagon */}
          <polygon
            points="0,-18 17,-6 11,15 -11,15 -17,-6"
            fill="#111111"
          />
          {/* Top-left pentagon */}
          <polygon
            points="-26,-30 -8,-26 -6,-10 -22,-4 -34,-16"
            fill="#111111"
          />
          {/* Top-right pentagon */}
          <polygon
            points="26,-30 34,-16 22,-4 6,-10 8,-26"
            fill="#111111"
          />
          {/* Bottom-left pentagon */}
          <polygon
            points="-34,16 -18,10 -12,26 -26,36 -38,26"
            fill="#111111"
          />
          {/* Bottom-right pentagon */}
          <polygon
            points="34,16 38,26 26,36 12,26 18,10"
            fill="#111111"
          />
          {/* Seam lines */}
          <path d="M 0,-18 L -26,-30 M 0,-18 L 26,-30 M 17,-6 L 34,-16 M 17,-6 L 18,10 M 11,15 L 26,36 M 11,15 L -11,15 M -11,15 L -26,36 M -17,-6 L -34,-16 M -17,-6 L -18,10"
            stroke="rgba(0,0,0,0.25)" strokeWidth={0.8} fill="none" />
          {/* Ball seam curve */}
          <ellipse cx={0} cy={0} rx={44} ry={44}
            fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
          {/* Specular highlight top-left */}
          <ellipse cx={-14} cy={-16} rx={14} ry={10}
            fill="white" opacity={0.45}
            transform="rotate(-30 -14 -16)" />
        </g>
      )
    }

    if (graphic === 'star') {
      const starPoints = (cx: number, cy: number, outerR: number, innerR: number, points: number) => {
        const pts = []
        for (let i = 0; i < points * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR
          const angle = (i * Math.PI) / points - Math.PI / 2
          pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
        }
        return pts.join(' ')
      }
      return (
        <g transform="translate(200,245)">
          {/* Glow */}
          <polygon points={starPoints(0, 0, 52, 22, 5)}
            fill={graphicColor} opacity={0.25} />
          {/* Star */}
          <polygon points={starPoints(0, 0, 44, 18, 5)}
            fill={graphicColor} />
          {/* Inner highlight */}
          <polygon points={starPoints(0, 0, 44, 18, 5)}
            fill="url(#star-highlight)" opacity={0.3} />
          <radialGradient id="star-highlight" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </radialGradient>
          {/* Specular */}
          <ellipse cx={-8} cy={-18} rx={12} ry={7}
            fill="white" opacity={0.35}
            transform="rotate(-20 -8 -18)" />
        </g>
      )
    }

    if (graphic === 'shield') {
      return (
        <g transform="translate(200,245)">
          {/* Shield shape */}
          <path d="M 0,-44 L 38,-32 L 38,8 Q 20,38 0,48 Q -20,38 -38,8 L -38,-32 Z"
            fill={graphicColor} />
          {/* Shield inner border */}
          <path d="M 0,-38 L 32,-28 L 32,6 Q 16,32 0,42 Q -16,32 -32,6 L -32,-28 Z"
            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />
          {/* Horizontal divider */}
          <line x1={-32} y1={-8} x2={32} y2={-8}
            stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />
          {/* WM text */}
          <text x={0} y={-16} textAnchor="middle" fill="white"
            fontSize={14} fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing={2}>
            WM
          </text>
          {/* 2026 text */}
          <text x={0} y={16} textAnchor="middle" fill="white"
            fontSize={12} fontFamily="Arial, sans-serif" letterSpacing={1}>
            2026
          </text>
          {/* Specular */}
          <ellipse cx={-6} cy={-28} rx={16} ry={8}
            fill="white" opacity={0.2}
            transform="rotate(-15 -6 -28)" />
        </g>
      )
    }

    if (graphic === 'wave') {
      return (
        <g>
          <path d="M 68 210 Q 110 192, 150 210 Q 190 228, 230 210 Q 270 192, 332 210 L 332 228 Q 270 210, 230 228 Q 190 246, 150 228 Q 110 210, 68 228 Z"
            fill={graphicColor} opacity={0.85} />
          <path d="M 68 240 Q 110 222, 150 240 Q 190 258, 230 240 Q 270 222, 332 240 L 332 258 Q 270 240, 230 258 Q 190 276, 150 258 Q 110 240, 68 258 Z"
            fill={graphicColor} opacity={0.65} />
          <path d="M 68 270 Q 110 252, 150 270 Q 190 288, 230 270 Q 270 252, 332 270 L 332 288 Q 270 270, 230 288 Q 190 306, 150 288 Q 110 270, 68 288 Z"
            fill={graphicColor} opacity={0.45} />
        </g>
      )
    }

    return null
  }

  return (
    <svg
      width={size}
      height={size * (460 / 400)}
      viewBox="0 0 400 460"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Drop shadow */}
        <filter id={`${id}-shadow`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx={0} dy={6} stdDeviation={10} floodColor="#000000" floodOpacity={0.35} />
        </filter>

        {/* Fabric texture */}
        <filter id={`${id}-texture`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={0.72} numOctaves={4} result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Top-left to bottom-right gradient */}
        <linearGradient id={`${id}-grad-main`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={0.26} />
          <stop offset="40%" stopColor="white" stopOpacity={0.04} />
          <stop offset="100%" stopColor="black" stopOpacity={0.22} />
        </linearGradient>

        {/* Radial center highlight */}
        <radialGradient id={`${id}-grad-center`} cx="50%" cy="40%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity={0.16} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>

        {/* Left edge shadow */}
        <linearGradient id={`${id}-grad-left`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity={0.22} />
          <stop offset="22%" stopColor="black" stopOpacity={0} />
        </linearGradient>

        {/* Right edge shadow */}
        <linearGradient id={`${id}-grad-right`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity={0.22} />
          <stop offset="22%" stopColor="black" stopOpacity={0} />
        </linearGradient>

        {/* Bottom shadow */}
        <linearGradient id={`${id}-grad-bottom`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="65%" stopColor="black" stopOpacity={0} />
          <stop offset="100%" stopColor="black" stopOpacity={0.28} />
        </linearGradient>

        {/* T-shirt clip */}
        <clipPath id={`${id}-tshirt-clip`}>
          <path d={tshirtPath} />
        </clipPath>

        {/* Left sleeve clip */}
        <clipPath id={`${id}-left-sleeve-clip`}>
          <path d={leftSleeveClip} />
        </clipPath>

        {/* Right sleeve clip */}
        <clipPath id={`${id}-right-sleeve-clip`}>
          <path d={rightSleeveClip} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/* Base t-shirt */}
        <path d={tshirtPath} fill={primaryColor}
          stroke={strokeColor} strokeWidth={strokeW} />

        {/* Fabric texture overlay */}
        <path d={tshirtPath} fill="transparent"
          filter={`url(#${id}-texture)`} opacity={0.05} />

        {/* Lighting layers */}
        <path d={tshirtPath} fill={`url(#${id}-grad-main)`} />
        <path d={tshirtPath} fill={`url(#${id}-grad-center)`} />
        <path d={tshirtPath} fill={`url(#${id}-grad-left)`} />
        <path d={tshirtPath} fill={`url(#${id}-grad-right)`} />
        <path d={tshirtPath} fill={`url(#${id}-grad-bottom)`} />

        {/* Left cuff accent */}
        <g clipPath={`url(#${id}-left-sleeve-clip)`}>
          <rect x={-5} y={196} width={84} height={18}
            fill={graphicColor} opacity={0.75}
            transform="rotate(-20 37 205)" />
          {[199, 204, 209].map(y => (
            <line key={y}
              x1={-5} y1={y} x2={79} y2={y}
              stroke="rgba(0,0,0,0.15)" strokeWidth={0.7}
              transform="rotate(-20 37 205)" />
          ))}
        </g>

        {/* Right cuff accent */}
        <g clipPath={`url(#${id}-right-sleeve-clip)`}>
          <rect x={321} y={196} width={84} height={18}
            fill={graphicColor} opacity={0.75}
            transform="rotate(20 363 205)" />
          {[199, 204, 209].map(y => (
            <line key={y}
              x1={321} y1={y} x2={405} y2={y}
              stroke="rgba(0,0,0,0.15)" strokeWidth={0.7}
              transform="rotate(20 363 205)" />
          ))}
        </g>

        {/* Crew neck collar band */}
        <path d={collarBandOuter} fill={graphicColor} opacity={0.75} />
        <path d={collarPath} fill={primaryColor} />

        {/* Collar ribbing */}
        {[-12, -6, 0, 6, 12].map(offset => (
          <ellipse key={offset}
            cx={200 + offset * 0.5} cy={72}
            rx={2} ry={14}
            fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth={0.6}
            transform={`rotate(${offset * 1.5} ${200 + offset * 0.5} 72)`} />
        ))}

        {/* Graphic */}
        {renderGraphic()}

        {/* Main text */}
        <text
          x={200} y={318}
          textAnchor="middle"
          fill={graphicColor}
          fontSize={28}
          fontWeight="bold"
          fontFamily="'Arial Black', Arial, sans-serif"
          opacity={0.92}
          letterSpacing={2}
        >
          {text}
        </text>

        {/* Subtext */}
        <text
          x={200} y={344}
          textAnchor="middle"
          fill={graphicColor}
          fontSize={14}
          fontFamily="Arial, sans-serif"
          letterSpacing={6}
          opacity={0.7}
        >
          {subtext}
        </text>

        {/* Hem band */}
        <g clipPath={`url(#${id}-tshirt-clip)`}>
          <rect x={0} y={432} width={400} height={14} fill={graphicColor} opacity={0.15} />
        </g>

        {/* Shoulder specular highlight */}
        <ellipse cx={155} cy={98} rx={52} ry={18}
          fill="white" opacity={0.08}
          transform="rotate(-28 155 98)"
          clipPath={`url(#${id}-tshirt-clip)`} />
      </g>
    </svg>
  )
}
