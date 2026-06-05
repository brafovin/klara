interface Props {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  number?: string
  teamCode?: string
  size?: number
}

export default function JerseyIllustration({
  primaryColor = '#FFFFFF',
  secondaryColor = '#000000',
  accentColor = '#22c55e',
  number = '10',
  teamCode = '',
  size = 400,
}: Props) {
  return (
    <svg viewBox="0 0 400 420" width={size} height={size * 1.05} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`jersey-grad-${teamCode}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
        </linearGradient>
        <filter id="jersey-shadow">
          <feDropShadow dx="4" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Jersey body */}
      <g filter="url(#jersey-shadow)">
        {/* Main body */}
        <path
          d="M120 80 L60 130 L40 200 L70 205 L70 380 L330 380 L330 205 L360 200 L340 130 L280 80 L260 110 C240 125 200 130 140 110 Z"
          fill={`url(#jersey-grad-${teamCode})`}
          stroke={secondaryColor}
          strokeWidth="3"
          strokeOpacity="0.4"
        />
        {/* Left sleeve */}
        <path
          d="M120 80 L60 130 L40 200 L70 205 L85 140 L140 110 Z"
          fill={secondaryColor}
          fillOpacity="0.85"
          stroke={secondaryColor}
          strokeWidth="2"
        />
        {/* Right sleeve */}
        <path
          d="M280 80 L340 130 L360 200 L330 205 L315 140 L260 110 Z"
          fill={secondaryColor}
          fillOpacity="0.85"
          stroke={secondaryColor}
          strokeWidth="2"
        />
        {/* Collar */}
        <path
          d="M155 82 Q200 105 245 82 Q230 60 215 58 Q200 55 185 58 Q170 60 155 82 Z"
          fill={secondaryColor}
          fillOpacity="0.9"
        />
        {/* Collar inner */}
        <path
          d="M163 86 Q200 105 237 86 Q225 70 200 68 Q175 70 163 86 Z"
          fill={primaryColor}
          fillOpacity="0.6"
        />
        {/* Chest stripe */}
        <line x1="70" y1="235" x2="330" y2="235" stroke={accentColor} strokeWidth="12" strokeOpacity="0.3" />
      </g>

      {/* Number on jersey */}
      <text
        x="200"
        y="295"
        textAnchor="middle"
        fontSize="80"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill={secondaryColor}
        fillOpacity="0.75"
      >
        {number}
      </text>

      {/* Team code */}
      {teamCode && (
        <text
          x="200"
          y="345"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill={secondaryColor}
          fillOpacity="0.55"
          letterSpacing="4"
        >
          {teamCode}
        </text>
      )}

      {/* WM 2026 badge */}
      <circle cx="155" cy="165" r="22" fill={accentColor} fillOpacity="0.9" />
      <text x="155" y="162" textAnchor="middle" fontSize="8" fontWeight="700" fill="white" fontFamily="Arial">WM</text>
      <text x="155" y="173" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial">2026</text>

      {/* Subtle fabric texture lines */}
      <line x1="200" y1="140" x2="200" y2="375" stroke={secondaryColor} strokeWidth="1" strokeOpacity="0.08" />
    </svg>
  )
}
