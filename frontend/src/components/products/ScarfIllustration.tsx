'use client'
import { useMemo } from 'react'

interface Props {
  color1?: string
  color2?: string
  color3?: string
  text?: string
  size?: number
}

export default function ScarfIllustration({
  color1 = '#DC2626',
  color2 = '#FFFFFF',
  color3,
  text = 'SCARF',
  size = 400,
}: Props) {
  const c3 = color3 || color2
  const id = useMemo(() => `s${Math.random().toString(36).slice(2, 7)}`, [])
  const isLight2 = color2 === '#FFFFFF' || color2 === '#fff' || color2 === '#ffffff' || color2 === '#FCD116'
  const isLightC1 = color1 === '#FFFFFF' || color1 === '#fff' || color1 === '#ffffff'

  // Slightly curved/draped scarf path for realistic drape
  const scarfPath = 'M28 108 C56 84 88 108 118 108 C148 108 178 84 208 108 C238 132 268 108 298 84 C328 60 358 84 388 108 C408 122 424 108 432 108 L432 216 C424 224 408 210 388 216 C358 240 328 216 298 192 C268 168 238 192 208 216 C178 240 148 216 118 216 C88 216 56 240 28 216 C12 206 6 190 6 174 L6 132 C6 118 14 104 28 108Z'

  return (
    <svg viewBox="0 0 440 340" width={size} height={size * (340 / 440)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture – woven appearance */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-15%" y="-20%" width="130%" height="155%">
          <feDropShadow dx="0" dy="10" stdDeviation="13" floodColor="#000" floodOpacity="0.24" />
        </filter>

        {/* Top surface highlight */}
        <linearGradient id={`${id}top`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.26" />
          <stop offset="40%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Bottom shadow */}
        <linearGradient id={`${id}bot`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.20" />
        </linearGradient>

        {/* Left edge shadow */}
        <linearGradient id={`${id}left`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.28" />
          <stop offset="28%" stopColor="black" stopOpacity="0" />
        </linearGradient>

        {/* Right edge shadow */}
        <linearGradient id={`${id}right`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.28" />
          <stop offset="28%" stopColor="black" stopOpacity="0" />
        </linearGradient>

        {/* Clip to scarf outline */}
        <clipPath id={`${id}clip`}>
          <path d={scarfPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* Base scarf body */}
        <path d={scarfPath} fill={color1} />

        {/* Stripe system clipped to scarf body */}
        <g clipPath={`url(#${id}clip)`}>
          {/* Stripe band 1 – follows contour */}
          <path
            d="M6 122 C56 98 88 122 118 122 C148 122 178 98 208 122 C238 146 268 122 298 98 C328 74 358 98 388 122 C408 136 424 122 432 122 L432 148 C424 148 408 136 388 148 C358 172 328 148 298 124 C268 100 238 124 208 148 C178 172 148 148 118 148 C88 148 56 172 6 148Z"
            fill={color2}
            fillOpacity="0.96"
          />
          {/* Stripe band 2 */}
          <path
            d="M6 160 C56 136 88 160 118 160 C148 160 178 136 208 160 C238 184 268 160 298 136 C328 112 358 136 388 160 C408 174 424 160 432 160 L432 184 C424 184 408 170 388 184 C358 208 328 184 298 160 C268 136 238 160 208 184 C178 208 148 184 118 184 C88 184 56 208 6 184Z"
            fill={c3}
            fillOpacity="0.96"
          />
          {/* Stripe band 3 – thin accent */}
          <path
            d="M6 196 C56 172 88 196 118 196 C148 196 178 172 208 196 C238 220 268 196 298 172 C328 148 358 172 388 196 C408 210 424 196 432 196 L432 206 C424 206 408 192 388 206 C358 230 328 206 298 182 C268 158 238 182 208 206 C178 230 148 206 118 206 C88 206 56 230 6 206Z"
            fill={color2}
            fillOpacity="0.82"
          />
          {/* Highlight lines on stripes */}
          <path
            d="M6 122 C56 98 88 122 118 122 C148 122 178 98 208 122 C238 146 268 122 298 98 C328 74 358 98 388 122 C408 136 424 122 432 122 L432 126 C424 126 408 136 388 126 C358 102 328 78 298 102 C268 126 238 150 208 126 C178 102 148 126 118 126 C88 126 56 102 6 126Z"
            fill="white"
            fillOpacity="0.20"
          />
          <path
            d="M6 160 C56 136 88 160 118 160 C148 160 178 136 208 160 C238 184 268 160 298 136 C328 112 358 136 388 160 C408 174 424 160 432 160 L432 164 C424 164 408 168 388 164 C358 140 328 116 298 140 C268 164 238 188 208 164 C178 140 148 164 118 164 C88 164 56 140 6 164Z"
            fill="white"
            fillOpacity="0.14"
          />
        </g>

        {/* Shading overlays */}
        <path d={scarfPath} fill={`url(#${id}top)`} />
        <path d={scarfPath} fill={`url(#${id}bot)`} />
        <path d={scarfPath} fill={`url(#${id}left)`} />
        <path d={scarfPath} fill={`url(#${id}right)`} />

        {/* Fabric texture */}
        <path d={scarfPath} fill={color1} filter={`url(#${id}tex)`} opacity="0.055" />

        {/* ── TEXT ── */}
        {/* Text shadow */}
        <text
          x="221"
          y="174"
          textAnchor="middle"
          fontSize="38"
          fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill="black"
          fillOpacity="0.18"
          letterSpacing="5"
        >
          {text}
        </text>
        {/* Main text */}
        <text
          x="219"
          y="172"
          textAnchor="middle"
          fontSize="38"
          fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill={isLightC1 ? '#333333' : color1}
          stroke={isLight2 ? '#333' : color2}
          strokeWidth="5"
          paintOrder="stroke"
          letterSpacing="5"
        >
          {text}
        </text>

        {/* ── FRINGE LEFT ── */}
        {[-16, -9, -2, 5, 12, 19, 26, 33, 40].map((x, i) => (
          <g key={i}>
            {/* Fringe strand (slightly wavy) */}
            <path
              d={`M${15 + x} 198 C${13 + x} 214 ${17 + x} 230 ${14 + x} 248 C${12 + x} 262 ${16 + x} 272 ${14 + x} 282`}
              fill="none"
              stroke={i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : c3)}
              strokeWidth="6.5"
              strokeLinecap="round"
              opacity="0.92"
            />
            {/* Aglet nub */}
            <ellipse
              cx={14 + x}
              cy="286"
              rx="4.5"
              ry="6"
              fill={i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : c3)}
              opacity="0.92"
            />
            {/* Strand shine */}
            <path
              d={`M${13 + x} 200 C${11 + x} 216 ${14 + x} 232 ${12 + x} 248`}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.18"
            />
          </g>
        ))}

        {/* ── FRINGE RIGHT ── */}
        {[-40, -33, -26, -19, -12, -5, 2, 9, 16].map((x, i) => (
          <g key={i}>
            <path
              d={`M${425 + x} 198 C${427 + x} 214 ${423 + x} 230 ${426 + x} 248 C${428 + x} 262 ${424 + x} 272 ${426 + x} 282`}
              fill="none"
              stroke={i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : c3)}
              strokeWidth="6.5"
              strokeLinecap="round"
              opacity="0.92"
            />
            <ellipse
              cx={426 + x}
              cy="286"
              rx="4.5"
              ry="6"
              fill={i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : c3)}
              opacity="0.92"
            />
            <path
              d={`M${427 + x} 200 C${429 + x} 216 ${426 + x} 232 ${428 + x} 248`}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.18"
            />
          </g>
        ))}

        {/* Scarf stroke border for light colors */}
        {isLightC1 && (
          <path d={scarfPath} fill="none" stroke="#b8c6d8" strokeWidth="1.5" />
        )}
      </g>
    </svg>
  )
}
