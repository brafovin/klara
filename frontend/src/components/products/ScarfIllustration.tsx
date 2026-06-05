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
  const c3 = color3 ?? color2
  const id = useMemo(() => `x${Math.random().toString(36).slice(2, 7)}`, [])

  const isLightC1 =
    color1 === '#FFFFFF' || color1 === '#fff' || color1 === '#ffffff' || color1.toLowerCase() === '#f5f5f5'
  const isLightC2 =
    color2 === '#FFFFFF' || color2 === '#fff' || color2 === '#ffffff' || color2 === '#FCD116'

  // Scarf shape: slightly S-curved horizontal rectangle to show drape
  // viewBox 0 0 440 280
  // The scarf body has a gentle wave on top and bottom edges
  const scarfTop = 'M 14,90 C 60,78 100,98 150,86 C 200,74 240,96 290,84 C 340,72 390,92 426,82'
  const scarfBottom = 'M 14,170 C 60,182 100,162 150,174 C 200,186 240,164 290,176 C 340,188 390,168 426,178'

  // Full scarf outline (closed path)
  const scarfPath = `${scarfTop} L 426,178 C 390,168 340,188 290,176 C 240,164 200,186 150,174 C 100,162 60,182 14,170 Z`

  return (
    <svg
      viewBox="0 0 440 280"
      width={size}
      height={size * (280 / 440)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Football scarf illustration"
    >
      <defs>
        {/* Knit fabric fractalNoise texture */}
        <filter
          id={`${id}tex`}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55 0.08"
            numOctaves="4"
            seed="9"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Ghost-mannequin drop shadow */}
        <filter id={`${id}ds`} x="-14%" y="-28%" width="128%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.26" />
        </filter>

        {/* Top surface highlight (light from above) */}
        <linearGradient id={`${id}topHL`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Bottom shadow */}
        <linearGradient id={`${id}botSh`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="65%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>

        {/* Left edge shadow */}
        <linearGradient id={`${id}leftSh`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.30" />
          <stop offset="18%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Right edge shadow */}
        <linearGradient id={`${id}rightSh`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.30" />
          <stop offset="18%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Center radial depth highlight */}
        <radialGradient id={`${id}centerHL`} cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`${id}clip`}>
          <path d={scarfPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>

        {/* ══ SCARF BASE ══ */}
        <path
          d={scarfPath}
          fill={color1}
          stroke={isLightC1 ? '#aabbcc' : 'none'}
          strokeWidth={isLightC1 ? '1.5' : '0'}
        />

        {/* ══ COLOR STRIPES (clipped to scarf) ══ */}
        <g clipPath={`url(#${id}clip)`}>

          {/* Stripe 1 – color2, roughly 1/4 from left */}
          <path
            d={`M 95,60 C 100,60 105,60 110,60 L 110,200 C 105,200 100,200 95,200 Z
                M 95,60 Q 130,72 130,130 Q 130,188 95,200 Q 70,188 70,130 Q 70,72 95,60 Z`}
            fill={color2}
            fillOpacity="0"
          />
          {/* Stripe 1 – wide band */}
          <path
            d="M 72,60 C 82,68 92,72 102,70 C 112,68 118,64 126,62 L 126,210 C 118,212 112,208 102,210 C 92,212 82,208 72,200 Z"
            fill={color2}
            fillOpacity="0.96"
          />
          {/* Stripe 1 top edge highlight */}
          <path
            d="M 72,60 C 82,68 92,72 102,70 C 112,68 118,64 126,62 L 126,72 C 118,74 112,70 102,80 C 92,82 82,78 72,70 Z"
            fill="#ffffff"
            fillOpacity="0.18"
          />

          {/* Stripe 2 – c3, center */}
          <path
            d="M 188,56 C 198,64 208,68 218,66 C 228,64 234,60 242,58 L 242,214 C 234,216 228,212 218,214 C 208,216 198,212 188,204 Z"
            fill={c3}
            fillOpacity="0.96"
          />
          <path
            d="M 188,56 C 198,64 208,68 218,66 C 228,64 234,60 242,58 L 242,68 C 234,70 228,66 218,76 C 208,78 198,74 188,66 Z"
            fill="#ffffff"
            fillOpacity="0.16"
          />

          {/* Stripe 3 – color2, roughly 3/4 from left */}
          <path
            d="M 304,62 C 314,70 324,74 334,72 C 344,70 350,66 358,64 L 358,206 C 350,208 344,204 334,206 C 324,208 314,204 304,196 Z"
            fill={color2}
            fillOpacity="0.96"
          />
          <path
            d="M 304,62 C 314,70 324,74 334,72 C 344,70 350,66 358,64 L 358,74 C 350,76 344,72 334,82 C 324,84 314,80 304,72 Z"
            fill="#ffffff"
            fillOpacity="0.18"
          />

          {/* Knit texture lines (horizontal rib rows) */}
          {Array.from({ length: 18 }, (_, i) => {
            const y = 78 + i * 8
            return (
              <line
                key={i}
                x1="14" y1={y}
                x2="426" y2={y}
                stroke="#000000"
                strokeWidth="0.6"
                strokeOpacity="0.07"
              />
            )
          })}
        </g>

        {/* Lighting overlays */}
        <path d={scarfPath} fill={`url(#${id}topHL)`} />
        <path d={scarfPath} fill={`url(#${id}botSh)`} />
        <path d={scarfPath} fill={`url(#${id}leftSh)`} />
        <path d={scarfPath} fill={`url(#${id}rightSh)`} />
        <path d={scarfPath} fill={`url(#${id}centerHL)`} />

        {/* Fabric texture */}
        <path d={scarfPath} fill={color1} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* Scarf edge highlights (top and bottom) */}
        <path
          d={scarfTop}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
        <path
          d={scarfBottom}
          fill="none"
          stroke="#000000"
          strokeWidth="1.2"
          strokeOpacity="0.10"
          strokeLinecap="round"
        />

        {/* ══ SCARF TEXT ══ */}
        {/* Text drop shadow */}
        <text
          x="221" y="139"
          textAnchor="middle"
          fontSize="34" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill="#000000" fillOpacity="0.20"
          letterSpacing="6"
        >
          {text}
        </text>
        {/* Main text with stroke for legibility on any stripe color */}
        <text
          x="220" y="137"
          textAnchor="middle"
          fontSize="34" fontWeight="900"
          fontFamily="'Arial Black','Impact',sans-serif"
          fill={isLightC1 ? '#222222' : color1}
          stroke={isLightC2 ? '#333333' : color2}
          strokeWidth="5"
          paintOrder="stroke"
          letterSpacing="6"
        >
          {text}
        </text>

        {/* ══ FRINGE LEFT ══ */}
        {Array.from({ length: 9 }, (_, i) => {
          const baseX = 10 + i * 8
          const c = i % 2 === 0 ? color1 : color2
          const cx2 = baseX + 2
          return (
            <g key={i}>
              {/* Fringe strand – slightly wavy path */}
              <path
                d={`M${baseX},172 C${baseX - 2},188 ${baseX + 3},202 ${baseX},218 C${baseX - 2},232 ${baseX + 3},244 ${baseX},258`}
                fill="none"
                stroke={c}
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.94"
              />
              {/* Strand highlight */}
              <path
                d={`M${cx2},174 C${cx2 - 1},190 ${cx2 + 2},204 ${cx2},218`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.20"
              />
              {/* Aglet tip */}
              <ellipse
                cx={baseX}
                cy="262"
                rx="4"
                ry="6"
                fill={c}
                opacity="0.95"
              />
              <ellipse
                cx={baseX - 1}
                cy="259"
                rx="2"
                ry="2.5"
                fill="#ffffff"
                opacity="0.25"
              />
            </g>
          )
        })}

        {/* ══ FRINGE RIGHT ══ */}
        {Array.from({ length: 9 }, (_, i) => {
          const baseX = 430 - i * 8
          const c = i % 2 === 0 ? color1 : color2
          const cx2 = baseX - 2
          return (
            <g key={i}>
              <path
                d={`M${baseX},172 C${baseX + 2},188 ${baseX - 3},202 ${baseX},218 C${baseX + 2},232 ${baseX - 3},244 ${baseX},258`}
                fill="none"
                stroke={c}
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.94"
              />
              <path
                d={`M${cx2},174 C${cx2 + 1},190 ${cx2 - 2},204 ${cx2},218`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.20"
              />
              <ellipse
                cx={baseX}
                cy="262"
                rx="4"
                ry="6"
                fill={c}
                opacity="0.95"
              />
              <ellipse
                cx={baseX + 1}
                cy="259"
                rx="2"
                ry="2.5"
                fill="#ffffff"
                opacity="0.25"
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
