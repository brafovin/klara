interface Props {
  primaryColor?: string
  secondaryColor?: string
  size?: number
  teamName?: string
}

export default function JacketIllustration({ primaryColor = '#1d4ed8', secondaryColor = '#dc2626', size = 400, teamName = '' }: Props) {
  const id = `jk-${Math.random().toString(36).slice(2,6)}`
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a'
  const textFill = isDark ? '#ffffff' : secondaryColor

  return (
    <svg viewBox="0 0 400 460" width={size} height={size * 1.15} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 10px 28px rgba(0,0,0,0.2))'}}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.18"/>
          <stop offset="25%" stopColor="black" stopOpacity="0"/>
          <stop offset="75%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.22"/>
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0%" y1="0%" x2="0%" y2="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Left sleeve */}
      <path d="M118 88 L52 142 L30 228 L76 236 L94 168 C110 144 124 118 118 88Z" fill={primaryColor}/>
      <path d="M30 212 L76 220 L76 236 L30 228Z" fill={secondaryColor} fillOpacity="0.4"/>
      <path d="M118 88 L52 142 L30 228 L76 236 L94 168 C110 144 124 118 118 88Z" fill="black" fillOpacity="0.1"/>

      {/* Right sleeve */}
      <path d="M282 88 L348 142 L370 228 L324 236 L306 168 C290 144 276 118 282 88Z" fill={primaryColor}/>
      <path d="M370 212 L324 220 L324 236 L370 228Z" fill={secondaryColor} fillOpacity="0.4"/>
      <path d="M282 88 L348 142 L370 228 L324 236 L306 168 C290 144 276 118 282 88Z" fill="black" fillOpacity="0.1"/>

      {/* Lapels */}
      <path d="M168 80 L138 130 L180 148 L200 115 Z" fill={secondaryColor} fillOpacity="0.82"/>
      <path d="M232 80 L262 130 L220 148 L200 115 Z" fill={secondaryColor} fillOpacity="0.82"/>

      {/* Body */}
      <path d="M118 88 L52 142 L30 228 L76 236 L76 420 L324 420 L324 236 L370 228 L348 142 L282 88 L265 112 Q245 130 200 134 Q155 130 135 112 Z"
        fill={primaryColor}/>

      {/* Body shading */}
      <path d="M118 88 L52 142 L30 228 L76 236 L76 420 L324 420 L324 236 L370 228 L348 142 L282 88 L265 112 Q245 130 200 134 Q155 130 135 112 Z"
        fill={`url(#${id}-body)`}/>
      <path d="M118 88 L52 142 L30 228 L76 236 L76 420 L324 420 L324 236 L370 228 L348 142 L282 88 L265 112 Q245 130 200 134 Q155 130 135 112 Z"
        fill={`url(#${id}-top)`}/>

      {/* Stand-up collar */}
      <path d="M143 100 L200 120 L257 100 L248 74 Q228 56 200 54 Q172 56 152 74 Z"
        fill={secondaryColor} fillOpacity="0.88"/>
      <path d="M149 100 L200 118 L251 100 L243 78 Q225 62 200 60 Q175 62 157 78 Z"
        fill={primaryColor} fillOpacity="0.55"/>

      {/* Zipper */}
      <line x1="200" y1="120" x2="200" y2="400" stroke={secondaryColor} strokeWidth="4" strokeOpacity="0.6"/>
      <line x1="200" y1="120" x2="200" y2="400" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 5"/>
      {/* Zipper pull */}
      <rect x="193" y="136" width="14" height="10" rx="3" fill={secondaryColor} fillOpacity="0.85"/>
      <rect x="196" y="146" width="8" height="18" rx="2" fill={secondaryColor} fillOpacity="0.65"/>

      {/* Chest pockets */}
      <path d="M92 195 L154 190 L156 232 L94 238 Q84 236 84 228 L84 202 Q85 194 92 195Z"
        fill={secondaryColor} fillOpacity="0.18" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.5"/>
      <line x1="84" y1="202" x2="156" y2="198" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.4"/>
      <path d="M246 190 L308 195 L316 202 L316 228 Q315 236 306 238 L244 232 Z"
        fill={secondaryColor} fillOpacity="0.18" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.5"/>
      <line x1="244" y1="198" x2="316" y2="202" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.4"/>

      {/* Side pockets */}
      <path d="M80 320 L162 314 L164 374 L82 380 Q76 378 76 370 L76 326 Q76 320 80 320Z"
        fill={secondaryColor} fillOpacity="0.15" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.4"/>
      <path d="M238 314 L320 320 L324 326 L324 370 Q323 378 318 380 L236 374 Z"
        fill={secondaryColor} fillOpacity="0.15" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.4"/>

      {/* Sleeve stripe */}
      <line x1="52" y1="175" x2="75" y2="178" stroke={secondaryColor} strokeWidth="9" strokeOpacity="0.6" strokeLinecap="round"/>
      <line x1="52" y1="188" x2="75" y2="191" stroke={secondaryColor} strokeWidth="5" strokeOpacity="0.4" strokeLinecap="round"/>
      <line x1="348" y1="175" x2="325" y2="178" stroke={secondaryColor} strokeWidth="9" strokeOpacity="0.6" strokeLinecap="round"/>
      <line x1="348" y1="188" x2="325" y2="191" stroke={secondaryColor} strokeWidth="5" strokeOpacity="0.4" strokeLinecap="round"/>

      {/* Hem */}
      <line x1="76" y1="413" x2="324" y2="413" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.25"/>
      <line x1="76" y1="419" x2="324" y2="419" stroke={secondaryColor} strokeWidth="1" strokeOpacity="0.15"/>

      {teamName && (
        <text x="200" y="288" textAnchor="middle" fontSize="22" fontWeight="900"
          fontFamily="Arial Black, sans-serif" fill={textFill} fillOpacity="0.65" letterSpacing="4">
          {teamName.toUpperCase()}
        </text>
      )}
    </svg>
  )
}
