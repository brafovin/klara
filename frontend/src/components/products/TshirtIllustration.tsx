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
  const id = `tsh-${Math.random().toString(36).slice(2,6)}`
  const isDark = primaryColor === '#000000' || primaryColor === '#111827' || primaryColor === '#1a1a1a'
  const textFill = isDark ? '#ffffff' : graphicColor

  return (
    <svg viewBox="0 0 400 440" width={size} height={size * 1.1} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.18))'}}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.12"/>
          <stop offset="25%" stopColor="black" stopOpacity="0"/>
          <stop offset="75%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.15"/>
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
          <stop offset="60%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M133 90 L68 138 L48 210 L90 218 L90 400 L310 400 L310 218 L352 210 L332 138 L267 90 C248 112 226 122 200 122 C174 122 152 112 133 90Z"/>
        </clipPath>
      </defs>

      {/* Sleeves */}
      <path d="M133 90 L68 138 L48 210 L90 218 L106 155 C122 135 138 116 133 90Z" fill={primaryColor}/>
      <path d="M267 90 L332 138 L352 210 L310 218 L294 155 C278 135 262 116 267 90Z" fill={primaryColor}/>
      {/* Sleeve shading */}
      <path d="M133 90 L68 138 L48 210 L90 218 L106 155 C122 135 138 116 133 90Z" fill="black" fillOpacity="0.1"/>
      <path d="M267 90 L332 138 L352 210 L310 218 L294 155 C278 135 262 116 267 90Z" fill="black" fillOpacity="0.1"/>

      {/* Body */}
      <path d="M133 90 L68 138 L48 210 L90 218 L90 400 L310 400 L310 218 L352 210 L332 138 L267 90 C248 112 226 122 200 122 C174 122 152 112 133 90Z"
        fill={primaryColor}/>

      {/* Fabric shading */}
      <path d="M133 90 L68 138 L48 210 L90 218 L90 400 L310 400 L310 218 L352 210 L332 138 L267 90 C248 112 226 122 200 122 C174 122 152 112 133 90Z"
        fill={`url(#${id}-body)`}/>
      <path d="M133 90 L68 138 L48 210 L90 218 L90 400 L310 400 L310 218 L352 210 L332 138 L267 90 C248 112 226 122 200 122 C174 122 152 112 133 90Z"
        fill={`url(#${id}-top)`}/>

      {/* Collar - crew neck */}
      <ellipse cx="200" cy="100" rx="60" ry="22" fill={primaryColor}/>
      <path d="M148 98 Q200 120 252 98 Q248 82 230 76 Q215 70 200 69 Q185 70 170 76 Q152 82 148 98Z"
        fill={graphicColor} fillOpacity="0.7"/>
      <path d="M153 98 Q200 118 247 98 Q243 85 225 79 Q213 74 200 73 Q187 74 175 79 Q157 85 153 98Z"
        fill={primaryColor} fillOpacity="0.7"/>

      {/* Graphic */}
      {graphic === 'ball' && (
        <g transform="translate(200,220)">
          <circle r="46" fill="white" fillOpacity="0.92"/>
          <circle r="46" fill={graphicColor} fillOpacity="0.12"/>
          <polygon points="0,-28 16,-8 10,14 -10,14 -16,-8" fill={graphicColor} fillOpacity="0.85"/>
          <polygon points="16,-8 36,-10 44,12 28,26 10,14" fill="none" stroke={graphicColor} strokeWidth="1.5" strokeOpacity="0.5"/>
          <polygon points="-16,-8 -36,-10 -44,12 -28,26 -10,14" fill="none" stroke={graphicColor} strokeWidth="1.5" strokeOpacity="0.5"/>
          <polygon points="0,-28 16,-8 36,-10 30,-30 10,-40" fill="none" stroke={graphicColor} strokeWidth="1.5" strokeOpacity="0.5"/>
          <circle r="46" fill="none" stroke={graphicColor} strokeWidth="2" strokeOpacity="0.3"/>
        </g>
      )}
      {graphic === 'star' && (
        <g transform="translate(200,220)">
          {[0,1,2,3,4].map(i => {
            const a = (i * 72 - 90) * Math.PI / 180
            const b = ((i * 72 + 36) - 90) * Math.PI / 180
            const x1 = 42 * Math.cos(a), y1 = 42 * Math.sin(a)
            const x2 = 18 * Math.cos(b), y2 = 18 * Math.sin(b)
            return <polygon key={i} points={`0,0 ${x1},${y1} ${x2},${y2}`} fill={graphicColor} fillOpacity="0.75"/>
          })}
        </g>
      )}
      {graphic === 'shield' && (
        <g transform="translate(200,210)">
          <path d="M0,-45 L40,-30 L40,10 Q40,38 0,52 Q-40,38 -40,10 L-40,-30 Z"
            fill={graphicColor} fillOpacity="0.8"/>
          <path d="M0,-38 L34,-25 L34,10 Q34,34 0,46 Q-34,34 -34,10 L-34,-25 Z"
            fill="white" fillOpacity="0.25"/>
          <text y="8" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial">⚽</text>
        </g>
      )}
      {graphic === 'wave' && (
        <g clipPath={`url(#${id}-clip)`}>
          <path d="M90 180 Q130 155 170 180 Q210 205 250 180 Q290 155 330 180 L330 220 Q290 195 250 220 Q210 245 170 220 Q130 195 90 220 Z"
            fill={graphicColor} fillOpacity="0.3"/>
          <path d="M90 220 Q130 195 170 220 Q210 245 250 220 Q290 195 330 220 L330 250 Q290 225 250 250 Q210 275 170 250 Q130 225 90 250 Z"
            fill={graphicColor} fillOpacity="0.2"/>
        </g>
      )}

      {/* Text */}
      <text x="200" y="300" textAnchor="middle" fontSize="30" fontWeight="900"
        fontFamily="Arial Black, sans-serif" fill={textFill} letterSpacing="2">
        {text}
      </text>
      <text x="200" y="325" textAnchor="middle" fontSize="14" fontWeight="600"
        fontFamily="Arial" fill={textFill} fillOpacity="0.65" letterSpacing="7">
        {subtext}
      </text>

      {/* Sleeve accent */}
      <line x1="68" y1="162" x2="86" y2="165" stroke={graphicColor} strokeWidth="5" strokeOpacity="0.5" strokeLinecap="round"/>
      <line x1="332" y1="162" x2="314" y2="165" stroke={graphicColor} strokeWidth="5" strokeOpacity="0.5" strokeLinecap="round"/>
      <line x1="68" y1="172" x2="86" y2="175" stroke={graphicColor} strokeWidth="3" strokeOpacity="0.35" strokeLinecap="round"/>
      <line x1="332" y1="172" x2="314" y2="175" stroke={graphicColor} strokeWidth="3" strokeOpacity="0.35" strokeLinecap="round"/>

      {/* Hem & side seams */}
      <line x1="90" y1="393" x2="310" y2="393" stroke="black" strokeWidth="1.5" strokeOpacity="0.1"/>
      <line x1="90" y1="220" x2="90" y2="398" stroke="black" strokeWidth="1" strokeOpacity="0.08"/>
      <line x1="310" y1="220" x2="310" y2="398" stroke="black" strokeWidth="1" strokeOpacity="0.08"/>
    </svg>
  )
}
