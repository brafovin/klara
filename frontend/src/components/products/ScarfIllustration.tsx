'use client'
import { useMemo } from 'react'

interface Props {
  color1?: string
  color2?: string
  color3?: string
  text?: string
  size?: number
}

export default function ScarfIllustration({ color1 = '#DC2626', color2 = '#FFFFFF', color3, text = 'SCARF', size = 400 }: Props) {
  const c3 = color3 || color2
  const id = useMemo(() => `s${Math.random().toString(36).slice(2,7)}`, [])
  const isLight2 = color2 === '#FFFFFF' || color2 === '#fff' || color2 === '#FCD116'

  return (
    <svg viewBox="0 0 480 340" width={size} height={size*(340/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}top`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}bot`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.18"/>
        </linearGradient>
        <linearGradient id={`${id}left`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.22"/>
          <stop offset="30%" stopColor="black" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}right`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.22"/>
          <stop offset="30%" stopColor="black" stopOpacity="0"/>
        </linearGradient>
        <filter id={`${id}ds`} x="-15%" y="-20%" width="130%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.22"/>
        </filter>
        <clipPath id={`${id}clip`}>
          <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"/>
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* Shadow copy offset */}
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill="black" fillOpacity="0.1" transform="translate(2,6)"/>

        {/* Base scarf body */}
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill={color1}/>

        {/* Stripe overlays */}
        <g clipPath={`url(#${id}clip)`}>
          {/* Stripe 1 */}
          <path d="M8 126 Q60 102 152 126 Q244 150 332 126 Q390 108 428 126 L428 148 Q390 130 332 148 Q244 172 152 148 Q60 124 8 148Z"
            fill={color2} fillOpacity="0.95"/>
          {/* Stripe 2 */}
          <path d="M8 158 Q60 134 152 158 Q244 182 332 158 Q390 140 428 158 L428 178 Q390 160 332 178 Q244 202 152 178 Q60 156 8 178Z"
            fill={c3} fillOpacity="0.95"/>
          {/* Stripe highlights */}
          <path d="M8 126 Q60 102 152 126 Q244 150 332 126 Q390 108 428 126 L428 132 Q390 114 332 132 Q244 156 152 132 Q60 108 8 132Z"
            fill="white" fillOpacity="0.18"/>
          <path d="M8 158 Q60 134 152 158 Q244 182 332 158 Q390 140 428 158 L428 164 Q390 146 332 164 Q244 188 152 164 Q60 142 8 164Z"
            fill="white" fillOpacity="0.12"/>
        </g>

        {/* Shading overlays */}
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill={`url(#${id}top)`}/>
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill={`url(#${id}bot)`}/>
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill={`url(#${id}left)`}/>
        <path d="M32 112 Q60 88 90 112 Q120 136 152 112 Q182 88 212 112 Q242 136 272 112 Q302 88 332 112 Q362 136 392 112 Q418 96 428 112 L428 210 Q418 226 392 210 Q362 186 332 210 Q302 234 272 210 Q242 186 212 210 Q182 234 152 210 Q120 186 90 210 Q60 234 32 210 Q14 198 8 186 L8 126 Q14 106 32 112Z"
          fill={`url(#${id}right)`}/>

        {/* ── TEXT ── */}
        <text x="218" y="174" textAnchor="middle"
          fontSize="36" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill={color1} stroke={isLight2 ? '#333' : color2} strokeWidth="5" paintOrder="stroke"
          letterSpacing="5">
          {text}
        </text>

        {/* ── FRINGE LEFT ── */}
        {[-14,-7,0,7,14,21,28,35].map((x,i)=>(
          <g key={i}>
            <path d={`M${14+x} 196 Q${12+x} 225 ${14+x} 268`}
              fill="none" stroke={i%2===0?color1:color2} strokeWidth="6"
              strokeLinecap="round" opacity="0.9"/>
            <ellipse cx={14+x} cy="272" rx="4.5" ry="6"
              fill={i%2===0?color1:color2} opacity="0.9"/>
          </g>
        ))}

        {/* ── FRINGE RIGHT ── */}
        {[-35,-28,-21,-14,-7,0,7,14].map((x,i)=>(
          <g key={i}>
            <path d={`M${438+x} 196 Q${440+x} 225 ${438+x} 268`}
              fill="none" stroke={i%2===0?color1:color2} strokeWidth="6"
              strokeLinecap="round" opacity="0.9"/>
            <ellipse cx={438+x} cy="272" rx="4.5" ry="6"
              fill={i%2===0?color1:color2} opacity="0.9"/>
          </g>
        ))}
      </g>
    </svg>
  )
}
