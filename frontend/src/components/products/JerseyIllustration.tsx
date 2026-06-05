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
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
  }
  const lightPrimary = lum(primaryColor) > 180
  const strokeBorder = lightPrimary ? '#b0c4d8' : 'none'
  const numColor = secondaryColor === primaryColor
    ? (lightPrimary ? '#333333' : '#ffffff')
    : secondaryColor

  // Main body path (viewBox 0 0 400 460)
  const bodyPath =
    'M 132 70 C 100 56 56 60 34 94 L 8 192 C 6 204 12 215 23 219 L 78 236 78 438 322 438 322 236 L 377 219 C 388 215 394 204 392 192 L 366 94 C 344 60 300 56 268 70 C 250 104 228 116 200 118 C 172 116 150 104 132 70 Z'

  // Left sleeve zone (for separate shading)
  const leftSleevePath =
    'M 132 70 C 100 56 56 60 34 94 L 8 192 C 6 204 12 215 23 219 L 78 236 78 160 C 78 140 90 120 110 100 Z'

  // Right sleeve zone
  const rightSleevePath =
    'M 268 70 C 300 56 344 60 366 94 L 392 192 C 394 204 388 215 377 219 L 322 236 322 160 C 322 140 310 120 290 100 Z'

  // V-collar outer
  const collarOuter =
    'M 158 80 C 165 92 178 108 200 118 C 222 108 235 92 242 80 C 233 74 216 70 200 70 C 184 70 167 74 158 80 Z'

  // V-collar inner (cuts out, slightly smaller)
  const collarInner =
    'M 163 84 C 170 95 181 109 200 118 C 219 109 230 95 237 84 C 229 79 215 75 200 75 C 185 75 171 79 163 84 Z'

  // Yoke zone path: full sleeves + upper chest V down to y=250
  const yokePath =
    'M 132 70 C 100 56 56 60 34 94 L 8 192 C 6 204 12 215 23 219 L 78 236 78 195 L 200 250 322 195 322 236 L 377 219 C 388 215 394 204 392 192 L 366 94 C 344 60 300 56 268 70 C 250 104 228 116 200 118 C 172 116 150 104 132 70 Z'

  // Left cuff band (bottom of left sleeve)
  const leftCuffPath = 'M 8 182 L 23 219 L 78 236 L 78 218 L 28 203 Z'
  // Right cuff band
  const rightCuffPath = 'M 392 182 L 377 219 L 322 236 L 322 218 L 372 203 Z'

  // Shoulder highlight arc (top of shoulder, thin bright line)
  const leftShoulderHighlight = 'M 34 94 C 60 68 96 58 132 70'
  const rightShoulderHighlight = 'M 268 70 C 304 58 340 68 366 94'

  // Armhole shadow triangle
  const leftArmholeShadow = 'M 78 180 L 78 236 L 110 200 Z'
  const rightArmholeShadow = 'M 322 180 L 322 236 L 290 200 Z'

  // Badge shield path centered around (142, 180), ~26×30px
  const badgePath =
    'M 142 165 L 155 165 L 155 188 C 155 196 148 201 142 203 C 136 201 129 196 129 188 Z'

  return (
    <svg
      viewBox="0 0 400 460"
      width={size}
      height={size * (460 / 400)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* === GRADIENTS === */}

        {/* 1. Main body gradient: top-left light to bottom-right shadow */}
        <linearGradient id={`${id}-bodyGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>

        {/* 2. Center chest radial highlight */}
        <radialGradient id={`${id}-chestHighlight`} cx="42%" cy="38%" r="38%" fx="42%" fy="38%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* 3. Left side shadow */}
        <linearGradient id={`${id}-leftShadow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.20)" />
          <stop offset="35%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* 4. Right side shadow */}
        <linearGradient id={`${id}-rightShadow`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.24)" />
          <stop offset="35%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* 5. Bottom vignette */}
        <linearGradient id={`${id}-bottomVignette`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </linearGradient>

        {/* 6. Left sleeve gradient: lighter near shoulder, darker at cuff */}
        <linearGradient id={`${id}-leftSleeveGrad`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </linearGradient>

        {/* 7. Right sleeve gradient: slightly darker overall (shadow side) */}
        <linearGradient id={`${id}-rightSleeveGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.30)" />
        </linearGradient>

        {/* Clip paths */}
        <clipPath id={`${id}-bodyClip`}>
          <path d={bodyPath} />
        </clipPath>
        <clipPath id={`${id}-yokeClip`}>
          <path d={yokePath} />
        </clipPath>

        {/* Stripe pattern for 'stripes' */}
        <pattern id={`${id}-stripePat`} x="0" y="0" width="56" height="460" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="28" height="460" fill={sc} />
          <rect x="28" y="0" width="28" height="460" fill="transparent" />
        </pattern>

        {/* Hoops pattern */}
        <pattern id={`${id}-hoopsPat`} x="0" y="0" width="400" height="44" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="400" height="22" fill={sc} />
          <rect x="0" y="22" width="400" height="22" fill="transparent" />
        </pattern>

        {/* Yoke diamond pattern */}
        <pattern id={`${id}-yokeDiamond`} x="0" y="0" width="22" height="14" patternUnits="userSpaceOnUse">
          <polygon points="11,0 22,7 11,14 0,7" fill={ac} />
          <polygon points="0,0 11,7 0,14" fill={primaryColor} />
          <polygon points="22,0 22,14 11,7" fill={primaryColor} />
        </pattern>
      </defs>

      {/* ===== BASE JERSEY FILL ===== */}
      <path d={bodyPath} fill={primaryColor} stroke={strokeBorder} strokeWidth={strokeBorder !== 'none' ? 1 : 0} />

      {/* ===== PATTERN LAYER ===== */}
      {pattern === 'stripes' && (
        <path d={bodyPath} fill={`url(#${id}-stripePat)`} clipPath={`url(#${id}-bodyClip)`} />
      )}
      {pattern === 'hoops' && (
        <path d={bodyPath} fill={`url(#${id}-hoopsPat)`} clipPath={`url(#${id}-bodyClip)`} />
      )}
      {pattern === 'diagonal' && (
        <g clipPath={`url(#${id}-bodyClip)`}>
          {[-80, -40, 0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={0}
              x2={x + 460}
              y2={460}
              stroke={sc}
              strokeWidth={24}
              strokeOpacity={0.85}
            />
          ))}
        </g>
      )}
      {pattern === 'yoke' && (
        <>
          {/* Yoke base color */}
          <path d={yokePath} fill={sc} clipPath={`url(#${id}-bodyClip)`} />
          {/* Yoke diamond overlay */}
          <path d={yokePath} fill={`url(#${id}-yokeDiamond)`} clipPath={`url(#${id}-bodyClip)`} opacity={0.7} />
          {/* Bottom V-edge highlight of yoke */}
          <polyline
            points="78,195 200,250 322,195"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2}
            clipPath={`url(#${id}-bodyClip)`}
          />
        </>
      )}
      {pattern === 'chevron' && (
        <g clipPath={`url(#${id}-bodyClip)`}>
          {[180, 230, 280, 330].map((y, i) => (
            <polyline
              key={i}
              points={`78,${y} 200,${y - 40} 322,${y}`}
              fill="none"
              stroke={sc}
              strokeWidth={26}
              strokeOpacity={0.9}
            />
          ))}
        </g>
      )}

      {/* ===== FABRIC FOLD LINES (subtle, clipped to body) ===== */}
      <g clipPath={`url(#${id}-bodyClip)`}>
        {/* Left shoulder drape lines */}
        <line x1={100} y1={90} x2={155} y2={190} stroke="rgba(0,0,0,0.06)" strokeWidth={1.5} />
        <line x1={80}  y1={110} x2={140} y2={220} stroke="rgba(0,0,0,0.055)" strokeWidth={1.5} />
        <line x1={115} y1={80}  x2={165} y2={165} stroke="rgba(0,0,0,0.045)" strokeWidth={1.5} />
        {/* Right shoulder drape lines */}
        <line x1={300} y1={90}  x2={245} y2={190} stroke="rgba(0,0,0,0.06)" strokeWidth={1.5} />
        <line x1={320} y1={110} x2={260} y2={220} stroke="rgba(0,0,0,0.055)" strokeWidth={1.5} />
        <line x1={285} y1={80}  x2={235} y2={165} stroke="rgba(0,0,0,0.045)" strokeWidth={1.5} />
        {/* Center torso crease */}
        <line x1={198} y1={140} x2={196} y2={380} stroke="rgba(0,0,0,0.04)" strokeWidth={1} />
        <line x1={202} y1={140} x2={204} y2={380} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      </g>

      {/* ===== 3D SHADING LAYERS ===== */}
      {/* Main top-left-to-bottom-right gradient */}
      <path d={bodyPath} fill={`url(#${id}-bodyGrad)`} />
      {/* Center chest radial highlight */}
      <path d={bodyPath} fill={`url(#${id}-chestHighlight)`} />
      {/* Left edge shadow */}
      <path d={bodyPath} fill={`url(#${id}-leftShadow)`} />
      {/* Right edge shadow */}
      <path d={bodyPath} fill={`url(#${id}-rightShadow)`} />
      {/* Bottom vignette */}
      <path d={bodyPath} fill={`url(#${id}-bottomVignette)`} />

      {/* Left sleeve lighter shading */}
      <path d={leftSleevePath} fill={`url(#${id}-leftSleeveGrad)`} clipPath={`url(#${id}-bodyClip)`} />
      {/* Right sleeve darker shading */}
      <path d={rightSleevePath} fill={`url(#${id}-rightSleeveGrad)`} clipPath={`url(#${id}-bodyClip)`} />

      {/* Armhole shadows */}
      <path d={leftArmholeShadow}  fill="rgba(0,0,0,0.14)" clipPath={`url(#${id}-bodyClip)`} />
      <path d={rightArmholeShadow} fill="rgba(0,0,0,0.18)" clipPath={`url(#${id}-bodyClip)`} />

      {/* ===== CUFF BANDS ===== */}
      <path d={leftCuffPath}  fill={cc} clipPath={`url(#${id}-bodyClip)`} />
      <path d={rightCuffPath} fill={cc} clipPath={`url(#${id}-bodyClip)`} />
      {/* Cuff highlights */}
      <path d={leftCuffPath}  fill="rgba(255,255,255,0.15)" clipPath={`url(#${id}-bodyClip)`} />

      {/* ===== SHOULDER HIGHLIGHT ARCS ===== */}
      <path
        d={leftShoulderHighlight}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={3}
        strokeLinecap="round"
        clipPath={`url(#${id}-bodyClip)`}
      />
      <path
        d={rightShoulderHighlight}
        fill="none"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth={2.5}
        strokeLinecap="round"
        clipPath={`url(#${id}-bodyClip)`}
      />

      {/* Sleeve top-edge highlight lines */}
      <path
        d="M 34 94 L 8 192"
        fill="none"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth={2}
        strokeLinecap="round"
        clipPath={`url(#${id}-bodyClip)`}
      />
      <path
        d="M 366 94 L 392 192"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1.5}
        strokeLinecap="round"
        clipPath={`url(#${id}-bodyClip)`}
      />

      {/* ===== COLLAR ===== */}
      {/* Collar outer band in collarColor */}
      <path d={collarOuter} fill={cc} />
      {/* Collar inner cut revealing primaryColor */}
      <path d={collarInner} fill={primaryColor} />
      {/* Collar shadow along inner edge */}
      <path
        d={collarInner}
        fill="none"
        stroke="rgba(0,0,0,0.30)"
        strokeWidth={2.5}
      />
      {/* Collar white highlight along outer edge */}
      <path
        d={collarOuter}
        fill="none"
        stroke="rgba(255,255,255,0.50)"
        strokeWidth={1.5}
      />

      {/* ===== BADGE ===== */}
      <path d={badgePath} fill={secondaryColor} opacity={0.9} />
      <path d={badgePath} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />

      {/* ===== NUMBER ===== */}
      {/* Number shadow */}
      <text
        x={202}
        y={333}
        textAnchor="middle"
        fontSize={82}
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="rgba(0,0,0,0.18)"
        letterSpacing={-2}
      >
        {number}
      </text>
      {/* Number main */}
      <text
        x={200}
        y={330}
        textAnchor="middle"
        fontSize={82}
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill={numColor}
        letterSpacing={-2}
      >
        {number}
      </text>
      {/* Number inner highlight */}
      <text
        x={199}
        y={328}
        textAnchor="middle"
        fontSize={82}
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="rgba(255,255,255,0.12)"
        letterSpacing={-2}
      >
        {number}
      </text>

      {/* ===== TEAM CODE ===== */}
      {teamCode && (
        <text
          x={200}
          y={365}
          textAnchor="middle"
          fontSize={15}
          fontWeight="700"
          fontFamily="'Arial', sans-serif"
          fill={numColor}
          letterSpacing={6}
          opacity={0.85}
        >
          {teamCode}
        </text>
      )}
    </svg>
  )
}
