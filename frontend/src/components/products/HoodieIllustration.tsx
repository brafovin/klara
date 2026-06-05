interface Props {
  primaryColor?: string
  accentColor?: string
  size?: number
  teamName?: string
}

export default function HoodieIllustration({ primaryColor = '#7DD3FC', accentColor = '#0369a1', size = 400, teamName = '' }: Props) {
  const id = `hd-${Math.random().toString(36).slice(2,6)}`
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a'
  const textFill = isDark ? '#ffffff' : accentColor

  return (
    <svg viewBox="0 0 400 470" width={size} height={size * 1.175} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 10px 28px rgba(0,0,0,0.2))'}}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.15"/>
          <stop offset="22%" stopColor="black" stopOpacity="0"/>
          <stop offset="78%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.18"/>
        </linearGradient>
        <linearGradient id={`${id}-hood`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.12"/>
        </linearGradient>
        <clipPath id={`${id}-body-clip`}>
          <path d="M118 148 L55 192 L32 272 L78 280 L78 430 L322 430 L322 280 L368 272 L345 192 L282 148 C262 166 232 176 200 176 C168 176 138 166 118 148Z"/>
        </clipPath>
      </defs>

      {/* Hood */}
      <path d="M130 148 Q140 90 162 62 Q178 40 200 36 Q222 40 238 62 Q260 90 270 148 C250 166 228 174 200 174 C172 174 150 166 130 148Z"
        fill={primaryColor}/>
      <path d="M130 148 Q140 90 162 62 Q178 40 200 36 Q222 40 238 62 Q260 90 270 148 C250 166 228 174 200 174 C172 174 150 166 130 148Z"
        fill={`url(#${id}-hood)`}/>
      {/* Hood inner */}
      <path d="M148 148 Q155 100 170 76 Q182 56 200 52 Q218 56 230 76 Q245 100 252 148 Q232 162 200 166 Q168 162 148 148Z"
        fill={accentColor} fillOpacity="0.22"/>
      {/* Hood opening shadow */}
      <path d="M155 145 Q170 108 184 90 Q191 78 200 75 Q209 78 216 90 Q230 108 245 145 Q225 154 200 156 Q175 154 155 145Z"
        fill="black" fillOpacity="0.14"/>
      {/* Hood drawstrings */}
      <path d="M185 172 Q180 195 172 220 Q166 238 168 260" fill="none" stroke={accentColor} strokeWidth="3.5" strokeOpacity="0.6" strokeLinecap="round"/>
      <path d="M215 172 Q220 195 228 220 Q234 238 232 260" fill="none" stroke={accentColor} strokeWidth="3.5" strokeOpacity="0.6" strokeLinecap="round"/>
      {/* Drawstring tips */}
      <ellipse cx="168" cy="264" rx="5" ry="8" fill={accentColor} fillOpacity="0.7"/>
      <ellipse cx="232" cy="264" rx="5" ry="8" fill={accentColor} fillOpacity="0.7"/>

      {/* Left sleeve */}
      <path d="M118 148 L55 192 L32 272 L78 280 L96 210 C110 186 122 166 118 148Z" fill={primaryColor}/>
      <path d="M118 148 L55 192 L32 272 L78 280 L96 210 C110 186 122 166 118 148Z" fill="black" fillOpacity="0.1"/>
      {/* Cuff left */}
      <path d="M35 256 L80 264 L78 280 L32 272Z" fill={accentColor} fillOpacity="0.35"/>

      {/* Right sleeve */}
      <path d="M282 148 L345 192 L368 272 L322 280 L304 210 C290 186 278 166 282 148Z" fill={primaryColor}/>
      <path d="M282 148 L345 192 L368 272 L322 280 L304 210 C290 186 278 166 282 148Z" fill="black" fillOpacity="0.1"/>
      {/* Cuff right */}
      <path d="M365 256 L320 264 L322 280 L368 272Z" fill={accentColor} fillOpacity="0.35"/>

      {/* Body */}
      <path d="M118 148 L55 192 L32 272 L78 280 L78 430 L322 430 L322 280 L368 272 L345 192 L282 148 C262 166 232 176 200 176 C168 176 138 166 118 148Z"
        fill={primaryColor}/>
      <path d="M118 148 L55 192 L32 272 L78 280 L78 430 L322 430 L322 280 L368 272 L345 192 L282 148 C262 166 232 176 200 176 C168 176 138 166 118 148Z"
        fill={`url(#${id}-body)`}/>

      {/* Zipper */}
      <line x1="200" y1="175" x2="200" y2="405" stroke={accentColor} strokeWidth="4" strokeOpacity="0.55"/>
      <line x1="200" y1="175" x2="200" y2="405" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 5"/>
      {/* Zipper pull */}
      <rect x="193" y="192" width="14" height="10" rx="3" fill={accentColor} fillOpacity="0.8"/>
      <rect x="196" y="202" width="8" height="16" rx="2" fill={accentColor} fillOpacity="0.6"/>

      {/* Kangaroo pocket */}
      <path d="M118 328 Q118 316 130 312 L200 310 L270 312 Q282 316 282 328 L282 380 Q282 392 270 394 L200 396 L130 394 Q118 392 118 380 Z"
        fill={accentColor} fillOpacity="0.18" stroke={accentColor} strokeWidth="2" strokeOpacity="0.45"/>
      {/* Pocket divider */}
      <line x1="200" y1="310" x2="200" y2="396" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.35"/>

      {/* Team name */}
      {teamName && (
        <text x="200" y="282" textAnchor="middle" fontSize="24" fontWeight="900"
          fontFamily="Arial Black, sans-serif" fill={textFill} fillOpacity="0.7" letterSpacing="4">
          {teamName.toUpperCase()}
        </text>
      )}

      {/* Hem & seams */}
      <line x1="78" y1="423" x2="322" y2="423" stroke="black" strokeWidth="1.5" strokeOpacity="0.1"/>
      <line x1="78" y1="282" x2="78" y2="428" stroke="black" strokeWidth="1" strokeOpacity="0.08"/>
      <line x1="322" y1="282" x2="322" y2="428" stroke="black" strokeWidth="1" strokeOpacity="0.08"/>
    </svg>
  )
}
