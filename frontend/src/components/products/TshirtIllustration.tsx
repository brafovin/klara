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
  const id = useMemo(() => `t${Math.random().toString(36).slice(2, 7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#111827' || primaryColor === '#1a1a1a'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff' || primaryColor === '#ffffff'
  const textFill = isDark ? '#ffffff' : (isLight ? graphicColor : (graphicColor === primaryColor ? '#FFFFFF' : graphicColor))
  const shadowC = isLight ? '#8899aa' : '#000000'
  const strokeBorder = isLight ? '#b8c6d8' : 'none'

  // Smooth curved t-shirt outline with proper proportions
  const bodyPath = 'M152 92 C98 74 58 110 36 148 L16 214 L90 234 L90 492 L390 492 L390 234 L464 214 L444 148 C422 110 382 74 328 92 C310 126 278 138 240 138 C202 138 170 126 152 92Z'
  const leftSleevePath = 'M152 92 C98 74 58 110 36 148 L16 214 L90 234 L116 164 C130 128 142 106 152 92Z'
  const rightSleevePath = 'M328 92 C382 74 422 110 444 148 L464 214 L390 234 L364 164 C350 128 338 106 328 92Z'

  return (
    <svg viewBox="0 0 480 522" width={size} height={size * (522 / 480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Fabric texture */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Drop shadow */}
        <filter id={`${id}ds`} x="-16%" y="-10%" width="132%" height="132%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000" floodOpacity="0.26" />
        </filter>

        {/* Body light-to-shadow gradient */}
        <linearGradient id={`${id}bg`} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.22'} />
          <stop offset="45%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.32" />
        </linearGradient>

        {/* Center chest highlight */}
        <radialGradient id={`${id}center`} cx="50%" cy="38%" r="44%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.18'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side edge shadows */}
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22" />
          <stop offset="18%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="82%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.25" />
        </linearGradient>

        {/* Left sleeve gradient */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="82%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.12'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.48" />
        </linearGradient>

        {/* Right sleeve gradient */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="82%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0' : '0.12'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.48" />
        </linearGradient>

        {/* Collar 3D depth */}
        <radialGradient id={`${id}col`} cx="50%" cy="10%" r="90%">
          <stop offset="0%" stopColor="white" stopOpacity="0.38" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.55" />
        </radialGradient>

        <clipPath id={`${id}bc`}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d={leftSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={leftSleevePath} fill={`url(#${id}sl)`} />
        {/* Cuff accent band with ribbing */}
        <path d="M16 200 L90 220 L90 236 L16 216Z" fill={graphicColor} fillOpacity="0.62" />
        <path d="M16 200 L90 220" stroke="white" strokeWidth="2" strokeOpacity="0.30" fill="none" />
        <path d="M16 208 L90 228" stroke="white" strokeWidth="1" strokeOpacity="0.16" fill="none" />
        {/* Sleeve texture */}
        <path d={leftSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.045" />

        {/* ── RIGHT SLEEVE ── */}
        <path d={rightSleevePath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        <path d={rightSleevePath} fill={`url(#${id}sr)`} />
        {/* Cuff accent band */}
        <path d="M464 200 L390 220 L390 236 L464 216Z" fill={graphicColor} fillOpacity="0.62" />
        <path d="M464 200 L390 220" stroke="white" strokeWidth="2" strokeOpacity="0.30" fill="none" />
        <path d="M464 208 L390 228" stroke="white" strokeWidth="1" strokeOpacity="0.16" fill="none" />
        <path d={rightSleevePath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.045" />

        {/* ── BODY ── */}
        <path d={bodyPath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '2' : '0'} />

        {/* Lighting */}
        <path d={bodyPath} fill={`url(#${id}bg)`} />
        <path d={bodyPath} fill={`url(#${id}center)`} />
        <path d={bodyPath} fill={`url(#${id}side)`} />

        {/* Fabric texture */}
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.045" />

        {/* Armhole inner shadows */}
        <path d="M90 234 L90 316 L116 300 L116 166Z" fill={shadowC} fillOpacity="0.10" />
        <path d="M390 234 L390 316 L364 300 L364 166Z" fill={shadowC} fillOpacity="0.10" />

        {/* ── CREW NECK COLLAR ── */}
        {/* Outer collar band */}
        <path
          d="M170 100 C184 132 210 140 240 142 C270 140 296 132 310 100 C302 82 282 68 240 64 C198 68 178 82 170 100Z"
          fill={graphicColor}
          fillOpacity="0.80"
        />
        {/* Inner cutout – shirt color */}
        <path
          d="M177 102 C190 130 212 137 240 139 C268 137 290 130 303 102 C296 86 278 73 240 69 C202 73 184 86 177 102Z"
          fill={primaryColor}
        />
        {/* Collar 3D gradient */}
        <path
          d="M170 100 C184 132 210 140 240 142 C270 140 296 132 310 100 C302 82 282 68 240 64 C198 68 178 82 170 100Z"
          fill={`url(#${id}col)`}
          fillOpacity="0.45"
        />
        {/* Collar rib texture lines */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${177 + i * 4} ${102 + i * 1.5} C${190 + i * 4} ${129 + i * 1.5} ${212 + i * 4} ${136 + i * 1.5} 240 ${138 + i * 1.5} C${268 - i * 4} ${136 + i * 1.5} ${290 - i * 4} ${129 + i * 1.5} ${303 - i * 4} ${102 + i * 1.5}`}
            fill="none"
            stroke="white"
            strokeWidth="0.9"
            strokeOpacity="0.25"
          />
        ))}

        {/* ── CENTER GRAPHIC ── */}
        {graphic === 'ball' && (
          <g transform="translate(240,278)">
            <circle r="54" fill="white" fillOpacity="0.92" />
            {/* Ball pentagon panels */}
            <path d="M0,-54 C13,-42 19,-22 17,-5 C11,2 0,7 -8,5 C-19,3 -30,-6 -32,-19 C-30,-38 -16,-52 0,-54Z"
              fill={graphicColor} fillOpacity="0.88" />
            <path d="M17,-5 C30,-9 44,-2 52,11 C46,30 32,46 13,52 C2,44 -6,29 -8,15 C0,9 11,4 17,-5Z"
              fill={graphicColor} fillOpacity="0.88" />
            <path d="M-32,-19 C-48,-13 -54,4 -50,20 C-44,33 -27,44 -13,46 C-17,31 -17,15 -8,5 C-19,3 -25,-8 -32,-19Z"
              fill={graphicColor} fillOpacity="0.88" />
            <circle r="54" fill="none" stroke={graphicColor} strokeWidth="2.5" strokeOpacity="0.28" />
            {/* Seam lines */}
            <path d="M0,-54 C6,-42 8,-28 8,-14" fill="none" stroke={graphicColor} strokeWidth="1.2" strokeOpacity="0.3" />
            <path d="M17,-5 C8,-4 0,-3 -8,5" fill="none" stroke={graphicColor} strokeWidth="1.2" strokeOpacity="0.3" />
            {/* Specular highlight */}
            <ellipse cx="-19" cy="-23" rx="15" ry="11" fill="white" fillOpacity="0.52" transform="rotate(-28)" />
          </g>
        )}
        {graphic === 'star' && (
          <g transform="translate(240,275)">
            <polygon points="0,-54 13,-17 52,-17 21,8 33,46 0,23 -33,46 -21,8 -52,-17 -13,-17"
              fill={graphicColor} fillOpacity="0.88" />
            <polygon points="0,-42 10,-13 40,-13 17,5 26,36 0,19 -26,36 -17,5 -40,-13 -10,-13"
              fill="white" fillOpacity="0.22" />
            {/* Star shine */}
            <path d="M-4,-46 C-2,-38 0,-30 2,-24" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          </g>
        )}
        {graphic === 'shield' && (
          <g transform="translate(240,272)">
            <path d="M0,-54 L48,-36 L48,8 Q48,46 0,62 Q-48,46 -48,8 L-48,-36Z"
              fill={graphicColor} fillOpacity="0.88" />
            <path d="M0,-46 L40,-30 L40,8 Q40,40 0,54 Q-40,40 -40,8 L-40,-30Z"
              fill="white" fillOpacity="0.16" />
            {/* Shield cross */}
            <line x1="0" y1="-46" x2="0" y2="54" stroke="white" strokeWidth="2" strokeOpacity="0.30" />
            <line x1="-40" y1="-2" x2="40" y2="-2" stroke="white" strokeWidth="2" strokeOpacity="0.30" />
            <text textAnchor="middle" y="-14" fontSize="22" fontWeight="900" fontFamily="'Arial Black',sans-serif" fill="white">WM</text>
            <text textAnchor="middle" y="12" fontSize="17" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">2026</text>
          </g>
        )}
        {graphic === 'wave' && (
          <g clipPath={`url(#${id}bc)`}>
            <path d="M90 200 Q140 176 190 200 Q240 224 290 200 Q340 176 390 200 L390 234 Q340 210 290 234 Q240 258 190 234 Q140 210 90 234Z"
              fill={graphicColor} fillOpacity="0.40" />
            <path d="M90 244 Q140 220 190 244 Q240 268 290 244 Q340 220 390 244 L390 268 Q340 244 290 268 Q240 292 190 268 Q140 244 90 268Z"
              fill={graphicColor} fillOpacity="0.22" />
            <path d="M90 287 Q140 264 190 287 Q240 310 290 287 Q340 264 390 287 L390 304 Q340 282 290 304 Q240 326 190 304 Q140 282 90 304Z"
              fill={graphicColor} fillOpacity="0.12" />
          </g>
        )}

        {/* ── TEXT ── */}
        <text x="240" y="362" textAnchor="middle" fontSize="33" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif" fill={textFill} letterSpacing="2">
          {text}
        </text>
        <text x="240" y="390" textAnchor="middle" fontSize="16" fontWeight="600"
          fontFamily="Arial,sans-serif" fill={textFill} fillOpacity="0.60" letterSpacing="7">
          {subtext}
        </text>

        {/* ── SEAMS ── */}
        <line x1="90" y1="236" x2="90" y2="490" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.10" />
        <line x1="390" y1="236" x2="390" y2="490" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.10" />
        {/* Hem */}
        <path d="M90 480 L390 480 L390 492 L90 492Z" fill={graphicColor} fillOpacity="0.12" />
        <line x1="90" y1="480" x2="390" y2="480" stroke={shadowC} strokeWidth="1.8" strokeOpacity="0.13" />
      </g>
    </svg>
  )
}
