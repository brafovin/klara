'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  stripeColor?: string
  collarColor?: string
  number?: string
  teamCode?: string
  size?: number
  pattern?: 'solid' | 'stripes' | 'diagonal' | 'hoops' | 'chevron'
}

export default function JerseyIllustration({
  primaryColor = '#FFFFFF',
  secondaryColor = '#1a1a1a',
  stripeColor,
  collarColor,
  number = '10',
  teamCode = '',
  size = 400,
  pattern = 'solid',
}: Props) {
  const stripe = stripeColor || secondaryColor
  const collar = collarColor || secondaryColor
  const id = useMemo(() => `j${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight =
    primaryColor === '#FFFFFF' ||
    primaryColor === '#fff' ||
    primaryColor === '#ffffff' ||
    primaryColor === '#FFF' ||
    primaryColor === '#fafafa' ||
    primaryColor === '#f5f5f5'
  const shadowC = isLight ? '#7788aa' : '#000000'
  const strokeBorder = isLight ? '#b8c6dc' : 'none'

  // Smooth bezier body path – organic, realistic proportions
  // Collar ~y=90-148, Shoulders ~x=68-432, Sleeves to ~y=258, Hem y=544
  const bodyPath =
    'M148 96 C114 80 66 84 44 118 L10 224 C8 234 13 243 22 246 L82 264 L82 544 L398 544 L398 264 L458 246 C467 243 472 234 470 224 L436 118 C414 84 366 80 332 96 C312 130 278 145 240 145 C202 145 168 130 148 96Z'

  const leftSleevePath =
    'M148 96 C114 80 66 84 44 118 L10 224 C8 234 13 243 22 246 L82 264 L108 182 C120 142 133 112 148 96Z'

  const rightSleevePath =
    'M332 96 C366 80 414 84 436 118 L470 224 C472 234 467 243 458 246 L398 264 L372 182 C360 142 347 112 332 96Z'

  return (
    <svg
      viewBox="0 0 500 580"
      width={size}
      height={size * (580 / 500)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Fabric woven texture */}
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.05" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Soft drop shadow */}
        <filter id={`${id}ds`} x="-18%" y="-8%" width="136%" height="132%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.3" />
        </filter>

        {/* Body top-corner highlight → bottom-shadow gradient */}
        <linearGradient id={`${id}bg`} x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.28'} />
          <stop offset="38%" stopColor={primaryColor} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.38" />
        </linearGradient>

        {/* Center chest radial highlight */}
        <radialGradient id={`${id}center`} cx="50%" cy="36%" r="46%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.20'} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Side edge shadows */}
        <linearGradient id={`${id}sides`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.28" />
          <stop offset="14%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="86%" stopColor={shadowC} stopOpacity="0" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.30" />
        </linearGradient>

        {/* Left sleeve shading */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.16'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.55" />
        </linearGradient>

        {/* Right sleeve shading */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? '0.0' : '0.16'} />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.55" />
        </linearGradient>

        {/* Collar 3D depth */}
        <radialGradient id={`${id}col`} cx="50%" cy="10%" r="90%">
          <stop offset="0%" stopColor="white" stopOpacity="0.40" />
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.60" />
        </radialGradient>

        {/* Clip paths */}
        <clipPath id={`${id}bc`}>
          <path d={bodyPath} />
        </clipPath>
        <clipPath id={`${id}slc`}>
          <path d={leftSleevePath} />
        </clipPath>
        <clipPath id={`${id}src`}>
          <path d={rightSleevePath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d={leftSleevePath} fill={secondaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}slc)`}>
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={-24 + i * 26}
                y="60"
                width="13"
                height="230"
                fill={stripe}
                fillOpacity="0.42"
                transform="rotate(-40 82 166)"
              />
            ))}
          </g>
        )}
        <path d={leftSleevePath} fill={`url(#${id}sl)`} />
        {/* Cuff band with ribbing detail */}
        <path d="M10 210 L82 228 L82 266 L10 248Z" fill={collar} opacity="0.92" />
        <path d="M10 210 L82 228" fill="none" stroke="white" strokeWidth="2.2" strokeOpacity="0.32" />
        <path d="M10 218 L82 236" fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.18" />
        <path d="M10 226 L82 244" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.12" />
        {/* Texture overlay on sleeve */}
        <path d={leftSleevePath} fill={secondaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── RIGHT SLEEVE ── */}
        <path d={rightSleevePath} fill={secondaryColor} stroke={strokeBorder} strokeWidth={isLight ? '1.5' : '0'} />
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}src)`}>
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={372 + i * 26}
                y="60"
                width="13"
                height="230"
                fill={stripe}
                fillOpacity="0.42"
                transform="rotate(40 418 166)"
              />
            ))}
          </g>
        )}
        <path d={rightSleevePath} fill={`url(#${id}sr)`} />
        {/* Cuff band */}
        <path d="M490 210 L398 228 L398 266 L490 248Z" fill={collar} opacity="0.92" />
        <path d="M490 210 L398 228" fill="none" stroke="white" strokeWidth="2.2" strokeOpacity="0.32" />
        <path d="M490 218 L398 236" fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.18" />
        <path d="M490 226 L398 244" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.12" />
        <path d={rightSleevePath} fill={secondaryColor} filter={`url(#${id}tex)`} opacity="0.05" />

        {/* ── BODY BASE ── */}
        <path d={bodyPath} fill={primaryColor} stroke={strokeBorder} strokeWidth={isLight ? '2' : '0'} />

        {/* Pattern overlays */}
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <rect
                key={i}
                x={82 + i * 26}
                y="86"
                width="13"
                height="468"
                fill={stripe}
                fillOpacity="0.25"
              />
            ))}
          </g>
        )}
        {pattern === 'hoops' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <rect
                key={i}
                x="82"
                y={96 + i * 40}
                width="316"
                height="20"
                fill={stripe}
                fillOpacity="0.35"
              />
            ))}
          </g>
        )}
        {pattern === 'diagonal' && (
          <g clipPath={`url(#${id}bc)`}>
            {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <rect
                key={i}
                x={36 + i * 38}
                y="56"
                width="19"
                height="620"
                fill={stripe}
                fillOpacity="0.28"
                transform="rotate(42 250 320)"
              />
            ))}
          </g>
        )}
        {pattern === 'chevron' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M82 ${168 + i * 58} L240 ${133 + i * 58} L398 ${168 + i * 58} L398 ${190 + i * 58} L240 ${155 + i * 58} L82 ${190 + i * 58}Z`}
                fill={stripe}
                fillOpacity="0.30"
              />
            ))}
          </g>
        )}

        {/* Multi-layer lighting */}
        <path d={bodyPath} fill={`url(#${id}bg)`} />
        <path d={bodyPath} fill={`url(#${id}center)`} />
        <path d={bodyPath} fill={`url(#${id}sides)`} />

        {/* Fabric texture overlay */}
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}tex)`} opacity="0.045" />

        {/* Armhole inner shadow */}
        <path d="M82 264 L82 348 L112 330 L112 180Z" fill={shadowC} fillOpacity="0.13" />
        <path d="M398 264 L398 348 L368 330 L368 180Z" fill={shadowC} fillOpacity="0.13" />

        {/* Shoulder seam lines */}
        <path d="M148 96 C132 128 116 168 110 182" fill="none" stroke={shadowC} strokeWidth="1.8" strokeOpacity="0.20" />
        <path d="M332 96 C348 128 364 168 370 182" fill="none" stroke={shadowC} strokeWidth="1.8" strokeOpacity="0.20" />
        {/* Side seam lines */}
        <line x1="82" y1="266" x2="82" y2="542" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.12" />
        <line x1="398" y1="266" x2="398" y2="542" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.12" />
        {/* Center axis – very subtle */}
        <line x1="240" y1="148" x2="240" y2="542" stroke={shadowC} strokeWidth="1" strokeOpacity="0.06" />

        {/* ── COLLAR (round neck, 3D ribbed band) ── */}
        {/* Outer collar band */}
        <path
          d="M164 106 C177 142 208 152 240 154 C272 152 303 142 316 106 C308 82 286 66 240 62 C194 66 172 82 164 106Z"
          fill={collar}
        />
        {/* Inner cutout – body color */}
        <path
          d="M172 108 C184 140 210 149 240 151 C270 149 296 140 308 108 C301 87 281 73 240 69 C199 73 179 87 172 108Z"
          fill={primaryColor}
        />
        {/* Collar 3D shading */}
        <path
          d="M164 106 C177 142 208 152 240 154 C272 152 303 142 316 106 C308 82 286 66 240 62 C194 66 172 82 164 106Z"
          fill={`url(#${id}col)`}
          fillOpacity="0.50"
        />
        {/* Collar rib highlight lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${172 + i * 4} ${108 + i * 1.5} C${183 + i * 4} ${138 + i * 1.5} ${208 + i * 4} ${148 + i * 1.5} 240 ${150 + i * 1.5} C${272 - i * 4} ${148 + i * 1.5} ${297 - i * 4} ${138 + i * 1.5} ${308 - i * 4} ${108 + i * 1.5}`}
            fill="none"
            stroke="white"
            strokeWidth="0.9"
            strokeOpacity="0.22"
          />
        ))}

        {/* ── WM 2026 BADGE (shield, left chest) ── */}
        <g transform="translate(165,172)">
          <path
            d="M-16,-28 L16,-28 L18,-4 Q18,18 0,28 Q-18,18 -18,-4Z"
            fill="white"
            fillOpacity="0.14"
            stroke={collar}
            strokeWidth="2"
            strokeOpacity="0.80"
          />
          <path d="M-16,-28 L16,-28 L18,-4 Q18,18 0,28 Q-18,18 -18,-4Z" fill={collar} fillOpacity="0.10" />
          {/* Shield inner divider */}
          <line x1="0" y1="-28" x2="0" y2="28" stroke={collar} strokeWidth="1" strokeOpacity="0.4" />
          <line x1="-18" y1="-4" x2="18" y2="-4" stroke={collar} strokeWidth="1" strokeOpacity="0.4" />
          <text x="0" y="-12" textAnchor="middle" fontSize="9" fontWeight="800"
            fill={collar} fontFamily="Arial,sans-serif" opacity="0.95">WM</text>
          <text x="0" y="1" textAnchor="middle" fontSize="10" fontWeight="900"
            fill={collar} fontFamily="Arial,sans-serif" opacity="0.95">2026</text>
          {teamCode && (
            <text x="0" y="16" textAnchor="middle" fontSize="7" fontWeight="600"
              fill={collar} fontFamily="Arial,sans-serif" opacity="0.80">{teamCode}</text>
          )}
        </g>

        {/* ── NUMBER (large, bold, centered) ── */}
        {/* Shadow offset copy */}
        <text
          x="244"
          y="386"
          textAnchor="middle"
          fontSize="110"
          fontWeight="900"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fill={shadowC}
          fillOpacity="0.16"
          letterSpacing="-6"
        >
          {number}
        </text>
        {/* Main number */}
        <text
          x="240"
          y="382"
          textAnchor="middle"
          fontSize="110"
          fontWeight="900"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fill={secondaryColor}
          fillOpacity="0.92"
          letterSpacing="-6"
        >
          {number}
        </text>

        {/* ── TEAM CODE below number ── */}
        {teamCode && (
          <text
            x="240"
            y="430"
            textAnchor="middle"
            fontSize="21"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            fill={secondaryColor}
            fillOpacity="0.65"
            letterSpacing="8"
          >
            {teamCode}
          </text>
        )}

        {/* ── HEM RIBBED BAND ── */}
        <path d="M82 530 L398 530 L398 544 L82 544Z" fill={collar} fillOpacity="0.38" />
        <line x1="82" y1="530" x2="398" y2="530" stroke={shadowC} strokeWidth="1.5" strokeOpacity="0.18" />
        <line x1="82" y1="536" x2="398" y2="536" stroke="white" strokeWidth="0.8" strokeOpacity="0.10" />
        <line x1="82" y1="541" x2="398" y2="541" stroke={shadowC} strokeWidth="0.8" strokeOpacity="0.10" />
      </g>
    </svg>
  )
}
