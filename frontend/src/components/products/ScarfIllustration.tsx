'use client'
import { useMemo } from 'react'

interface Props {
  color1?: string
  color2?: string
  color3?: string
  text?: string
  size?: number
}

export default function ScarfIllustration({
  color1 = '#DC2626',
  color2 = '#FFFFFF',
  color3,
  text = 'SCARF',
  size = 400,
}: Props) {
  const c3 = color3 || color2
  const id = useMemo(() => `s${Math.random().toString(36).slice(2, 7)}`, [])

  const isLight2 = color2 === '#FFFFFF' || color2 === '#fff' || color2 === '#ffffff' || color2 === '#FCD116'
  const isLightC1 = color1 === '#FFFFFF' || color1 === '#fff' || color1 === '#ffffff'

  // Draped S-curve scarf outline
  const top = 'M 18 88 C 52 68 96 88 140 80 C 184 72 220 96 264 84 C 308 72 352 92 388 76 C 408 68 422 80 432 88'
  const bot = 'M 432 160 C 422 168 408 156 388 164 C 352 176 308 156 264 168 C 220 180 184 156 140 168 C 96 180 52 160 18 160 Z'

  const scarfPath = `${top} L 432 160 C 422 168 408 156 388 164 C 352 176 308 156 264 168 C 220 180 184 156 140 168 C 96 180 52 160 18 160 Z`

  // Stripe paths following the drape
  const stripe = (t: number, b: number) =>
    `M 18 ${t} C 52 ${t-20} 96 ${t} 140 ${t-8} C 184 ${t-16} 220 ${t+8} 264 ${t-4} C 308 ${t-16} 352 ${t+4} 388 ${t-12} C 408 ${t-20} 422 ${t-8} 432 ${t}
     L 432 ${b} C 422 ${b+8} 408 ${b-4} 388 ${b+4} C 352 ${b+16} 308 ${b-4} 264 ${b+4} C 220 ${b+16} 184 ${b} 140 ${b+8} C 96 ${b+16} 52 ${b} 18 ${b} Z`

  return (
    <svg viewBox="0 0 450 280" width={size} height={size * (280 / 450)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${id}ds`} x="-10%" y="-30%" width="120%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.22" />
        </filter>
        <filter id={`${id}tex`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.6 0.08" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id={`${id}tg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}lg`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.25" />
          <stop offset="20%" stopColor="black" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}rg`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.25" />
          <stop offset="20%" stopColor="black" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <path d={scarfPath} />
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* Base body */}
        <path d={scarfPath} fill={color1} stroke={isLightC1 ? '#aabbcc' : 'none'} strokeWidth="1.5" />

        {/* Stripes clipped to scarf */}
        <g clipPath={`url(#${id}clip)`}>
          <path d={stripe(88, 112)} fill={color2} fillOpacity="0.95" />
          <path d={stripe(120, 138)} fill={c3} fillOpacity="0.95" />
          <path d={stripe(140, 160)} fill={color2} fillOpacity="0.70" />
        </g>

        {/* Shading */}
        <path d={scarfPath} fill={`url(#${id}tg)`} />
        <path d={scarfPath} fill={`url(#${id}lg)`} />
        <path d={scarfPath} fill={`url(#${id}rg)`} />
        <path d={scarfPath} fill={color1} filter={`url(#${id}tex)`} opacity="0.06" />

        {/* Text */}
        <text x="226" y="138" textAnchor="middle" fontSize="32" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill="black" fillOpacity="0.16" letterSpacing="4">{text}</text>
        <text x="224" y="136" textAnchor="middle" fontSize="32" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill={isLightC1 ? '#333333' : color1}
          stroke={isLight2 ? '#333' : color2} strokeWidth="4" paintOrder="stroke"
          letterSpacing="4">{text}</text>

        {/* Left fringe */}
        {[-14, -7, 0, 7, 14, 21, 28, 35, 42].map((x, i) => (
          <g key={i}>
            <path d={`M${14+x} 162 C${12+x} 178 ${16+x} 194 ${13+x} 210 C${11+x} 224 ${15+x} 234 ${13+x} 244`}
              fill="none" stroke={i%3===0 ? color1 : i%3===1 ? color2 : c3}
              strokeWidth="5.5" strokeLinecap="round" opacity="0.92" />
            <ellipse cx={13+x} cy="248" rx="4" ry="5.5"
              fill={i%3===0 ? color1 : i%3===1 ? color2 : c3} opacity="0.92" />
            <path d={`M${12+x} 163 C${10+x} 179 ${14+x} 194 ${11+x} 210`}
              fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.18" />
          </g>
        ))}

        {/* Right fringe */}
        {[-42, -35, -28, -21, -14, -7, 0, 7, 14].map((x, i) => (
          <g key={i}>
            <path d={`M${436+x} 162 C${438+x} 178 ${434+x} 194 ${437+x} 210 C${439+x} 224 ${435+x} 234 ${437+x} 244`}
              fill="none" stroke={i%3===0 ? color1 : i%3===1 ? color2 : c3}
              strokeWidth="5.5" strokeLinecap="round" opacity="0.92" />
            <ellipse cx={437+x} cy="248" rx="4" ry="5.5"
              fill={i%3===0 ? color1 : i%3===1 ? color2 : c3} opacity="0.92" />
          </g>
        ))}
      </g>
    </svg>
  )
}
