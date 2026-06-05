interface Props {
  primaryColor?: string
  pocketColor?: string
  size?: number
  teamName?: string
}

export default function HoodieIllustration({
  primaryColor = '#7DD3FC',
  pocketColor = '#0369a1',
  size = 400,
  teamName = '',
}: Props) {
  return (
    <svg viewBox="0 0 400 460" width={size} height={size * 1.15} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={pocketColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="hoodie-shadow">
          <feDropShadow dx="4" dy="6" stdDeviation="10" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#hoodie-shadow)">
        {/* Body */}
        <path
          d="M115 120 L55 170 L35 240 L70 248 L70 410 L330 410 L330 248 L365 240 L345 170 L285 120 L265 145 Q240 165 200 168 Q165 168 135 145 Z"
          fill="url(#hoodie-grad)"
          stroke={pocketColor}
          strokeWidth="2"
          strokeOpacity="0.35"
        />
        {/* Left sleeve */}
        <path d="M115 120 L55 170 L35 240 L70 248 L85 180 L135 145 Z" fill={primaryColor} stroke={pocketColor} strokeWidth="1.5" strokeOpacity="0.3" />
        {/* Right sleeve */}
        <path d="M285 120 L345 170 L365 240 L330 248 L315 180 L265 145 Z" fill={primaryColor} stroke={pocketColor} strokeWidth="1.5" strokeOpacity="0.3" />
        {/* Hood */}
        <path
          d="M135 145 Q150 100 165 75 Q180 55 200 52 Q220 55 235 75 Q250 100 265 145 Q240 165 200 168 Q165 168 135 145 Z"
          fill={primaryColor}
          stroke={pocketColor}
          strokeWidth="2.5"
          strokeOpacity="0.5"
        />
        {/* Hood inner shadow */}
        <path
          d="M155 145 Q165 110 180 92 Q190 80 200 78 Q210 80 220 92 Q235 110 245 145 Q225 158 200 160 Q175 158 155 145 Z"
          fill={pocketColor}
          fillOpacity="0.18"
        />
        {/* Zipper */}
        <line x1="200" y1="168" x2="200" y2="385" stroke={pocketColor} strokeWidth="3.5" strokeOpacity="0.5" strokeDasharray="6 4" />
        {/* Kangaroo pocket */}
        <rect x="140" y="300" width="120" height="70" rx="10" fill={pocketColor} fillOpacity="0.2" stroke={pocketColor} strokeWidth="2" strokeOpacity="0.4" />
        <line x1="200" y1="300" x2="200" y2="370" stroke={pocketColor} strokeWidth="2" strokeOpacity="0.3" />
        {/* Drawstrings */}
        <line x1="178" y1="162" x2="155" y2="205" stroke={pocketColor} strokeWidth="2.5" strokeOpacity="0.5" />
        <line x1="222" y1="162" x2="245" y2="205" stroke={pocketColor} strokeWidth="2.5" strokeOpacity="0.5" />
      </g>

      {/* Team name on chest */}
      {teamName && (
        <text x="200" y="270" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="Arial Black" fill={pocketColor} fillOpacity="0.7" letterSpacing="3">
          {teamName.toUpperCase()}
        </text>
      )}
    </svg>
  )
}
