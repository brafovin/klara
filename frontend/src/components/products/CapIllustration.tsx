interface Props {
  primaryColor?: string
  accentColor?: string
  textColor?: string
  size?: number
}

export default function CapIllustration({ primaryColor = '#DC2626', accentColor = '#fbbf24', textColor, size = 400 }: Props) {
  const id = `cap-${Math.random().toString(36).slice(2,6)}`
  const txt = textColor || (primaryColor === '#FFFFFF' || primaryColor === '#fff' ? '#111827' : 'white')

  return (
    <svg viewBox="0 0 400 320" width={size} height={size * 0.8} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.2))'}}>
      <defs>
        <linearGradient id={`${id}-crown`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.15"/>
        </linearGradient>
        <linearGradient id={`${id}-brim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor}/>
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.7"/>
        </linearGradient>
        <radialGradient id={`${id}-brim-under`} cx="50%" cy="30%">
          <stop offset="0%" stopColor="black" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.06"/>
        </radialGradient>
      </defs>

      {/* Crown panels */}
      <path d="M96 218 Q100 130 200 96 Q300 130 304 218Z" fill={primaryColor}/>

      {/* Panel seam lines */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180
        const ex = 200 + 108 * Math.cos(rad)
        const ey = 218 - 116 * Math.sin(rad) * 0.82
        return <line key={i} x1="200" y1="102" x2={ex} y2={ey} stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.3"/>
      })}

      {/* Crown gradient */}
      <path d="M96 218 Q100 130 200 96 Q300 130 304 218Z" fill={`url(#${id}-crown)`}/>

      {/* Sweatband */}
      <path d="M96 218 Q100 228 200 232 Q300 228 304 218 Q300 212 200 216 Q100 212 96 218Z"
        fill={accentColor} fillOpacity="0.55"/>

      {/* Brim */}
      <path d="M58 226 Q60 250 200 256 Q340 250 342 226 Q318 234 200 236 Q82 234 58 226Z"
        fill={`url(#${id}-brim)`} stroke={accentColor} strokeWidth="1" strokeOpacity="0.4"/>
      {/* Brim underside */}
      <path d="M58 226 Q60 250 200 256 Q340 250 342 226 Q318 234 200 236 Q82 234 58 226Z"
        fill={`url(#${id}-brim-under)`}/>
      {/* Brim edge */}
      <path d="M58 226 Q60 252 200 258 Q340 252 342 226" fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.4"/>

      {/* Brim stitching */}
      <path d="M72 233 Q74 250 200 255 Q326 250 328 233" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 3"/>
      <path d="M82 236 Q84 250 200 254 Q316 250 318 236" fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 3"/>

      {/* Button on top */}
      <circle cx="200" cy="100" r="11" fill={accentColor} fillOpacity="0.9"/>
      <circle cx="200" cy="100" r="7" fill={primaryColor} fillOpacity="0.5"/>

      {/* Front emblem */}
      <ellipse cx="200" cy="176" rx="34" ry="36" fill="white" fillOpacity="0.15"/>
      <ellipse cx="200" cy="176" rx="34" ry="36" fill="none" stroke={accentColor} strokeWidth="1.8" strokeOpacity="0.6"/>
      <text x="200" y="170" textAnchor="middle" fontSize="13" fontWeight="800" fill={txt} fontFamily="Arial Black">WM</text>
      <text x="200" y="187" textAnchor="middle" fontSize="15" fontWeight="900" fill={txt} fontFamily="Arial Black">2026</text>

      {/* Adjustable strap */}
      <rect x="165" y="230" width="70" height="18" rx="5" fill={accentColor} fillOpacity="0.55"/>
      <rect x="193" y="226" width="14" height="26" rx="3" fill={accentColor} fillOpacity="0.75"/>
      {/* Strap holes */}
      {[-2,-1,0,1,2].map(i => (
        <circle key={i} cx={200 + i * 6} cy="239" r="1.5" fill={primaryColor} fillOpacity="0.7"/>
      ))}
    </svg>
  )
}
