interface Props {
  primaryColor?: string
  accentColor?: string
  text?: string
  size?: number
}

export default function TshirtIllustration({
  primaryColor = '#FBBF24',
  accentColor = '#15803d',
  text = 'WM 2026',
  size = 400,
}: Props) {
  return (
    <svg viewBox="0 0 400 420" width={size} height={size * 1.05} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tshirt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.75" />
        </linearGradient>
        <filter id="tshirt-shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="8" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#tshirt-shadow)">
        {/* Body */}
        <path
          d="M130 85 L65 135 L50 195 L85 200 L85 375 L315 375 L315 200 L350 195 L335 135 L270 85 L255 108 C235 122 200 128 145 108 Z"
          fill="url(#tshirt-grad)"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeOpacity="0.5"
        />
        {/* Left sleeve */}
        <path d="M130 85 L65 135 L50 195 L85 200 L95 140 L145 108 Z" fill={primaryColor} stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" />
        {/* Right sleeve */}
        <path d="M270 85 L335 135 L350 195 L315 200 L305 140 L255 108 Z" fill={primaryColor} stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" />
        {/* Collar */}
        <ellipse cx="200" cy="88" rx="55" ry="22" fill={accentColor} fillOpacity="0.4" />
        <ellipse cx="200" cy="90" rx="45" ry="17" fill={primaryColor} fillOpacity="0.8" />
      </g>

      {/* Front design */}
      {/* Soccer ball */}
      <circle cx="200" cy="210" r="42" fill="white" fillOpacity="0.9" />
      <circle cx="200" cy="210" r="42" fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" />
      {/* Ball patches */}
      <polygon points="200,175 218,188 211,208 189,208 182,188" fill={accentColor} fillOpacity="0.7" />
      <polygon points="218,188 237,188 242,207 225,220 211,208" fill="none" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="182,188 163,188 158,207 175,220 189,208" fill="none" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Text */}
      <text x="200" y="290" textAnchor="middle" fontSize="28" fontWeight="900" fontFamily="Arial Black, sans-serif" fill={accentColor} letterSpacing="2">
        {text}
      </text>
      <text x="200" y="320" textAnchor="middle" fontSize="14" fontWeight="600" fontFamily="Arial" fill={accentColor} fillOpacity="0.7" letterSpacing="6">
        FAN SHOP
      </text>

      {/* Sleeve accent lines */}
      <line x1="68" y1="155" x2="90" y2="158" stroke={accentColor} strokeWidth="4" strokeOpacity="0.6" />
      <line x1="330" y1="155" x2="308" y2="158" stroke={accentColor} strokeWidth="4" strokeOpacity="0.6" />
    </svg>
  )
}
