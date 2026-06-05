interface Props {
  color1?: string
  color2?: string
  color3?: string
  text?: string
  size?: number
}

export default function ScarfIllustration({ color1 = '#DC2626', color2 = '#FFFFFF', color3, text = 'ENGLAND', size = 400 }: Props) {
  const c3 = color3 || color1
  const id = `sc-${Math.random().toString(36).slice(2,6)}`

  return (
    <svg viewBox="0 0 420 300" width={size} height={size * 0.714} xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 6px 20px rgba(0,0,0,0.2))'}}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.1"/>
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M28 95 Q55 72 85 95 Q115 118 145 95 Q175 72 205 95 Q235 118 265 95 Q295 72 325 95 Q355 118 385 95 Q408 80 415 95 L415 185 Q405 200 385 185 Q355 162 325 185 Q295 208 265 185 Q235 162 205 185 Q175 208 145 185 Q115 162 85 185 Q55 208 28 185 Q12 172 8 162 L8 108 Q14 88 28 95Z"/>
        </clipPath>
      </defs>

      {/* Scarf shadow */}
      <path d="M28 99 Q55 76 85 99 Q115 122 145 99 Q175 76 205 99 Q235 122 265 99 Q295 76 325 99 Q355 122 385 99 Q408 84 415 99 L415 189 Q405 204 385 189 Q355 166 325 189 Q295 212 265 189 Q235 166 205 189 Q175 212 145 189 Q115 166 85 189 Q55 212 28 189 Q12 176 8 166 L8 112 Q14 92 28 99Z"
        fill="black" fillOpacity="0.12" transform="translate(3,5)"/>

      {/* Base */}
      <path d="M28 95 Q55 72 85 95 Q115 118 145 95 Q175 72 205 95 Q235 118 265 95 Q295 72 325 95 Q355 118 385 95 Q408 80 415 95 L415 185 Q405 200 385 185 Q355 162 325 185 Q295 208 265 185 Q235 162 205 185 Q175 208 145 185 Q115 162 85 185 Q55 208 28 185 Q12 172 8 162 L8 108 Q14 88 28 95Z"
        fill={color1}/>

      {/* Stripes */}
      <g clipPath={`url(#${id}-clip)`}>
        {/* Top stripe */}
        <path d="M8 108 Q55 84 145 108 Q235 132 325 108 Q375 92 415 108 L415 126 Q375 110 325 126 Q235 150 145 126 Q55 102 8 126Z" fill={color2} fillOpacity="0.9"/>
        {/* Middle stripe */}
        <path d="M8 138 Q55 114 145 138 Q235 162 325 138 Q375 122 415 138 L415 156 Q375 140 325 156 Q235 180 145 156 Q55 132 8 156Z" fill={color3 || color2} fillOpacity="0.9"/>
        {/* Bottom of top-side */}
        <path d="M8 108 Q55 84 145 108 Q235 132 325 108 Q375 92 415 108 L415 114 Q375 98 325 114 Q235 138 145 114 Q55 90 8 114Z" fill={c3} fillOpacity="0.55"/>
      </g>

      {/* Gradient overlay */}
      <path d="M28 95 Q55 72 85 95 Q115 118 145 95 Q175 72 205 95 Q235 118 265 95 Q295 72 325 95 Q355 118 385 95 Q408 80 415 95 L415 185 Q405 200 385 185 Q355 162 325 185 Q295 208 265 185 Q235 162 205 185 Q175 208 145 185 Q115 162 85 185 Q55 208 28 185 Q12 172 8 162 L8 108 Q14 88 28 95Z"
        fill={`url(#${id}-body)`}/>

      {/* Text */}
      <text x="212" y="152" textAnchor="middle" fontSize="32" fontWeight="900"
        fontFamily="Arial Black, Impact, sans-serif"
        fill={color2} stroke={color1} strokeWidth="4" paintOrder="stroke"
        letterSpacing="6">
        {text}
      </text>

      {/* Fringe left */}
      {[-12,-6,0,6,12,18,24].map((x, i) => (
        <g key={i}>
          <line x1={16 + x} y1="178" x2={14 + x} y2="240" stroke={i % 2 === 0 ? color1 : color2} strokeWidth="5.5" strokeLinecap="round" transform="rotate(-3,16,178)"/>
          <ellipse cx={14 + x} cy="243" rx="4" ry="5" fill={i % 2 === 0 ? color1 : color2} fillOpacity="0.7" transform="rotate(-3,16,178)"/>
        </g>
      ))}

      {/* Fringe right */}
      {[-12,-6,0,6,12,18,24].map((x, i) => (
        <g key={i}>
          <line x1={382 + x} y1="178" x2={384 + x} y2="240" stroke={i % 2 === 0 ? color1 : color2} strokeWidth="5.5" strokeLinecap="round" transform="rotate(3,396,178)"/>
          <ellipse cx={384 + x} cy="243" rx="4" ry="5" fill={i % 2 === 0 ? color1 : color2} fillOpacity="0.7" transform="rotate(3,396,178)"/>
        </g>
      ))}
    </svg>
  )
}
