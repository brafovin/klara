interface Props {
  primaryColor?: string
  accentColor?: string
  size?: number
}

export default function CapIllustration({ primaryColor = '#DC2626', accentColor = '#fbbf24', size = 400 }: Props) {
  return (
    <svg viewBox="0 0 400 350" width={size} height={size * 0.875} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cap-grad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.7" />
        </linearGradient>
        <filter id="cap-shadow">
          <feDropShadow dx="3" dy="6" stdDeviation="10" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#cap-shadow)">
        {/* Cap crown */}
        <path
          d="M90 210 Q95 130 200 100 Q305 130 310 210 Z"
          fill="url(#cap-grad)"
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        {/* Brim */}
        <path
          d="M85 210 Q85 232 200 232 Q315 232 315 210 L90 210 Z"
          fill={primaryColor}
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.4"
        />
        {/* Brim underside */}
        <path
          d="M60 220 Q65 245 200 250 Q335 245 340 220 Q315 232 200 232 Q85 232 60 220 Z"
          fill={accentColor}
          fillOpacity="0.2"
        />
        {/* Panel seams */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 200 + 115 * Math.sin(rad)
          const y = 210 - 105 * Math.cos(rad)
          return <line key={i} x1="200" y1="107" x2={x} y2={y} stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.25" />
        })}
        {/* Button on top */}
        <circle cx="200" cy="107" r="9" fill={accentColor} fillOpacity="0.8" />
        {/* Sweatband */}
        <path
          d="M90 210 Q95 218 200 220 Q305 218 310 210"
          fill="none"
          stroke={accentColor}
          strokeWidth="6"
          strokeOpacity="0.4"
        />
        {/* Adjustable strap */}
        <rect x="172" y="225" width="56" height="14" rx="4" fill={accentColor} fillOpacity="0.5" />
        <rect x="195" y="222" width="10" height="20" rx="2" fill={accentColor} fillOpacity="0.7" />
      </g>

      {/* Front emblem area */}
      <circle cx="200" cy="170" r="28" fill="white" fillOpacity="0.25" />
      <circle cx="200" cy="170" r="28" fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.5" />
      <text x="200" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Arial">WM</text>
      <text x="200" y="180" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" fontFamily="Arial">2026</text>
    </svg>
  )
}
