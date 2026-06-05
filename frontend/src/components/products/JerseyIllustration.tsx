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
  secondaryColor = '#000000',
  stripeColor,
  collarColor,
  number = '10',
  teamCode = '',
  size = 400,
  pattern = 'solid',
}: Props) {
  const stripe = stripeColor || secondaryColor
  const collar = collarColor || secondaryColor
  const id = `j-${teamCode || 'x'}-${Math.random().toString(36).slice(2,6)}`

  return (
    <svg viewBox="0 0 400 440" width={size} height={size * 1.1} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.18))'}}>
      <defs>
        {/* Main gradient for 3D effect */}
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.18"/>
          <stop offset="20%" stopColor={primaryColor} stopOpacity="0"/>
          <stop offset="80%" stopColor={primaryColor} stopOpacity="0"/>
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.22"/>
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}-sleeve-l`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.35"/>
        </linearGradient>
        <linearGradient id={`${id}-sleeve-r`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.35"/>
        </linearGradient>
        <clipPath id={`${id}-body-clip`}>
          <path d="M128 88 L62 136 L38 215 L82 222 L82 400 L318 400 L318 222 L362 215 L338 136 L272 88 C252 112 228 122 200 122 C172 122 148 112 128 88Z"/>
        </clipPath>
        <clipPath id={`${id}-sleeve-l-clip`}>
          <path d="M128 88 L62 136 L38 215 L82 222 L98 158 C118 140 132 120 128 88Z"/>
        </clipPath>
        <clipPath id={`${id}-sleeve-r-clip`}>
          <path d="M272 88 L338 136 L362 215 L318 222 L302 158 C282 140 268 120 272 88Z"/>
        </clipPath>
        <filter id={`${id}-crease`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/* ===== LEFT SLEEVE ===== */}
      <path d="M128 88 L62 136 L38 215 L82 222 L98 158 C118 140 132 120 128 88Z"
        fill={secondaryColor} />
      {pattern === 'stripes' && (
        <g clipPath={`url(#${id}-sleeve-l-clip)`}>
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={20 + i*22} y="80" width="11" height="160" fill={stripe} fillOpacity="0.35" transform="rotate(-30,80,155)"/>
          ))}
        </g>
      )}
      <rect x="55" y="208" width="35" height="9" rx="4" fill={primaryColor} fillOpacity="0.6"/>
      <path d="M128 88 L62 136 L38 215 L82 222 L98 158 C118 140 132 120 128 88Z"
        fill={`url(#${id}-sleeve-l)`}/>

      {/* ===== RIGHT SLEEVE ===== */}
      <path d="M272 88 L338 136 L362 215 L318 222 L302 158 C282 140 268 120 272 88Z"
        fill={secondaryColor} />
      {pattern === 'stripes' && (
        <g clipPath={`url(#${id}-sleeve-r-clip)`}>
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={270 + i*22} y="80" width="11" height="160" fill={stripe} fillOpacity="0.35" transform="rotate(30,320,155)"/>
          ))}
        </g>
      )}
      <rect x="310" y="208" width="35" height="9" rx="4" fill={primaryColor} fillOpacity="0.6"/>
      <path d="M272 88 L338 136 L362 215 L318 222 L302 158 C282 140 268 120 272 88Z"
        fill={`url(#${id}-sleeve-r)`}/>

      {/* ===== BODY BASE ===== */}
      <path d="M128 88 L62 136 L38 215 L82 222 L82 400 L318 400 L318 222 L362 215 L338 136 L272 88 C252 112 228 122 200 122 C172 122 148 112 128 88Z"
        fill={primaryColor}/>

      {/* Pattern overlay on body */}
      {pattern === 'stripes' && (
        <g clipPath={`url(#${id}-body-clip)`}>
          {[-2,-1,0,1,2,3,4,5,6,7,8].map(i => (
            <rect key={i} x={82 + i*22} y="88" width="11" height="320" fill={stripe} fillOpacity="0.28"/>
          ))}
        </g>
      )}
      {pattern === 'hoops' && (
        <g clipPath={`url(#${id}-body-clip)`}>
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <rect key={i} x="82" y={88 + i*32} width="240" height="16" fill={stripe} fillOpacity="0.32"/>
          ))}
        </g>
      )}
      {pattern === 'diagonal' && (
        <g clipPath={`url(#${id}-body-clip)`}>
          {[-4,-3,-2,-1,0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={50 + i*30} y="80" width="15" height="420" fill={stripe} fillOpacity="0.3" transform="rotate(45,200,250)"/>
          ))}
        </g>
      )}
      {pattern === 'chevron' && (
        <g clipPath={`url(#${id}-body-clip)`}>
          {[0,1,2,3,4,5].map(i => (
            <path key={i} d={`M82 ${145+i*48} L200 ${115+i*48} L318 ${145+i*48} L318 ${165+i*48} L200 ${135+i*48} L82 ${165+i*48} Z`}
              fill={stripe} fillOpacity="0.3"/>
          ))}
        </g>
      )}

      {/* 3D shading overlay */}
      <path d="M128 88 L62 136 L38 215 L82 222 L82 400 L318 400 L318 222 L362 215 L338 136 L272 88 C252 112 228 122 200 122 C172 122 148 112 128 88Z"
        fill={`url(#${id}-body)`}/>
      <path d="M128 88 L62 136 L38 215 L82 222 L82 400 L318 400 L318 222 L362 215 L338 136 L272 88 C252 112 228 122 200 122 C172 122 148 112 128 88Z"
        fill={`url(#${id}-light)`}/>

      {/* Side panels */}
      <path d="M82 222 L82 400 L115 400 L115 230 Z" fill={secondaryColor} fillOpacity="0.15"/>
      <path d="M318 222 L318 400 L285 400 L285 230 Z" fill={secondaryColor} fillOpacity="0.15"/>

      {/* ===== COLLAR ===== */}
      {/* V-Neck collar */}
      <path d="M160 96 L200 130 L240 96 L232 82 Q216 68 200 66 Q184 68 168 82 Z"
        fill={collar} />
      <path d="M166 97 L200 126 L234 97 L228 86 Q214 74 200 72 Q186 74 172 86 Z"
        fill={primaryColor} fillOpacity="0.5"/>
      {/* Collar stitching */}
      <path d="M168 95 L200 124 L232 95" fill="none" stroke={stripe} strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 2"/>

      {/* Shoulder seam lines */}
      <line x1="130" y1="90" x2="98" y2="160" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.2"/>
      <line x1="270" y1="90" x2="302" y2="160" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.2"/>

      {/* Side seam */}
      <line x1="82" y1="225" x2="82" y2="398" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.2"/>
      <line x1="318" y1="225" x2="318" y2="398" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.2"/>

      {/* ===== BADGE AREA ===== */}
      <ellipse cx="148" cy="182" rx="22" ry="24" fill="white" fillOpacity="0.18"/>
      <ellipse cx="148" cy="182" rx="22" ry="24" fill="none" stroke={collar} strokeWidth="1.5" strokeOpacity="0.6"/>
      <text x="148" y="178" textAnchor="middle" fontSize="9" fontWeight="700" fill={collar} fontFamily="Arial">WM</text>
      <text x="148" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={collar} fontFamily="Arial">2026</text>

      {/* ===== NUMBER ===== */}
      <text x="200" y="318" textAnchor="middle" fontSize="98" fontWeight="900"
        fontFamily="Arial Black, Impact, sans-serif"
        fill={secondaryColor} fillOpacity="0.82"
        style={{letterSpacing:'-4px'}}>
        {number}
      </text>

      {/* ===== TEAM CODE ===== */}
      {teamCode && (
        <text x="200" y="368" textAnchor="middle" fontSize="20" fontWeight="700"
          fontFamily="Arial, sans-serif" fill={secondaryColor} fillOpacity="0.55"
          letterSpacing="5">
          {teamCode}
        </text>
      )}

      {/* Hem */}
      <line x1="82" y1="392" x2="318" y2="392" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.15"/>
      <line x1="82" y1="398" x2="318" y2="398" stroke={secondaryColor} strokeWidth="1" strokeOpacity="0.1"/>
    </svg>
  )
}
