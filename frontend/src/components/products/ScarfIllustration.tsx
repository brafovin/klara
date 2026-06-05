interface Props {
  color1?: string
  color2?: string
  text?: string
  size?: number
}

export default function ScarfIllustration({ color1 = '#DC2626', color2 = '#FFFFFF', text = 'ENGLAND', size = 400 }: Props) {
  const stripes = 12
  const stripeHeight = 60 / stripes
  return (
    <svg viewBox="0 0 400 280" width={size} height={size * 0.7} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="scarf-shadow">
          <feDropShadow dx="2" dy="6" stdDeviation="10" floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter="url(#scarf-shadow)">
        {/* Scarf body – wavy */}
        <path
          d="M30 100 Q60 80 90 100 Q120 120 150 100 Q180 80 210 100 Q240 120 270 100 Q300 80 330 100 Q360 120 390 100 L390 180 Q360 200 330 180 Q300 160 270 180 Q240 200 210 180 Q180 160 150 180 Q120 200 90 180 Q60 160 30 180 Z"
          fill={color1}
          stroke={color2}
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Horizontal stripes */}
        {Array.from({ length: stripes }).map((_, i) =>
          i % 2 === 1 ? (
            <clipPath key={i} id={`stripe-clip-${i}`}>
              <path d="M30 100 Q60 80 90 100 Q120 120 150 100 Q180 80 210 100 Q240 120 270 100 Q300 80 330 100 Q360 120 390 100 L390 180 Q360 200 330 180 Q300 160 270 180 Q240 200 210 180 Q180 160 150 180 Q120 200 90 180 Q60 160 30 180 Z" />
            </clipPath>
          ) : null
        )}
        {Array.from({ length: stripes }).map((_, i) =>
          i % 2 === 1 ? (
            <rect key={i} x="30" y={100 + i * stripeHeight} width="360" height={stripeHeight}
              fill={color2} opacity="0.6"
              clipPath={`url(#stripe-clip-${i})`} />
          ) : null
        )}
        {/* Fringes left */}
        {[-3, -1, 1, 3, 5].map((offset, i) => (
          <path key={i}
            d={`M${28 + offset * 4} 178 Q${24 + offset * 4} 210 ${28 + offset * 4} 240`}
            fill="none" stroke={i % 2 === 0 ? color1 : color2} strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* Fringes right */}
        {[-3, -1, 1, 3, 5].map((offset, i) => (
          <path key={i}
            d={`M${372 + offset * 4} 178 Q${376 + offset * 4} 210 ${372 + offset * 4} 240`}
            fill="none" stroke={i % 2 === 0 ? color1 : color2} strokeWidth="5" strokeLinecap="round" />
        ))}
      </g>
      {/* Text on scarf */}
      <text x="200" y="152" textAnchor="middle" fontSize="30" fontWeight="900" fontFamily="Arial Black"
        fill={color2} stroke={color1} strokeWidth="3" paintOrder="stroke" letterSpacing="5">
        {text}
      </text>
    </svg>
  )
}
