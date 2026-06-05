interface Props {
  primaryColor?: string
  secondaryColor?: string
  size?: number
  teamName?: string
}

export default function JacketIllustration({ primaryColor = '#1d4ed8', secondaryColor = '#dc2626', size = 400, teamName = '' }: Props) {
  return (
    <svg viewBox="0 0 400 460" width={size} height={size * 1.15} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jacket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
        </linearGradient>
        <filter id="jacket-shadow">
          <feDropShadow dx="4" dy="6" stdDeviation="10" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#jacket-shadow)">
        {/* Body */}
        <path
          d="M115 90 L50 145 L30 230 L70 238 L70 410 L330 410 L330 238 L370 230 L350 145 L285 90 L265 118 Q245 135 200 138 Q160 138 135 118 Z"
          fill="url(#jacket-grad)"
          stroke={secondaryColor}
          strokeWidth="2.5"
          strokeOpacity="0.4"
        />
        {/* Left sleeve */}
        <path d="M115 90 L50 145 L30 230 L70 238 L82 172 L135 118 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.35" />
        {/* Right sleeve */}
        <path d="M285 90 L350 145 L370 230 L330 238 L318 172 L265 118 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.35" />
        {/* Collar – stand-up */}
        <path d="M148 105 Q200 130 252 105 Q245 80 235 72 Q218 62 200 60 Q182 62 165 72 Q155 80 148 105 Z" fill={secondaryColor} fillOpacity="0.85" />
        <path d="M158 103 Q200 125 242 103 Q235 85 200 80 Q165 85 158 103 Z" fill={primaryColor} fillOpacity="0.6" />
        {/* Zipper */}
        <rect x="196" y="138" width="8" height="265" rx="3" fill={secondaryColor} fillOpacity="0.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="193" y={155 + i * 19} width="14" height="6" rx="2" fill={secondaryColor} fillOpacity="0.35" />
        ))}
        {/* Chest pockets */}
        <rect x="93" y="185" width="65" height="42" rx="6" fill={secondaryColor} fillOpacity="0.18" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.4" />
        <rect x="242" y="185" width="65" height="42" rx="6" fill={secondaryColor} fillOpacity="0.18" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.4" />
        {/* Side pockets */}
        <rect x="83" y="310" width="75" height="48" rx="7" fill={secondaryColor} fillOpacity="0.15" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.35" />
        <rect x="242" y="310" width="75" height="48" rx="7" fill={secondaryColor} fillOpacity="0.15" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.35" />
        {/* Sleeve stripe */}
        <line x1="52" y1="185" x2="80" y2="188" stroke={secondaryColor} strokeWidth="8" strokeOpacity="0.55" strokeLinecap="round" />
        <line x1="318" y1="188" x2="348" y2="185" stroke={secondaryColor} strokeWidth="8" strokeOpacity="0.55" strokeLinecap="round" />
      </g>
      {teamName && (
        <text x="200" y="275" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="Arial Black" fill={secondaryColor} fillOpacity="0.65" letterSpacing="4">
          {teamName.toUpperCase()}
        </text>
      )}
    </svg>
  )
}
