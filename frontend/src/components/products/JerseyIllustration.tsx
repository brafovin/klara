'use client'
import { useMemo } from 'react'

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
  secondaryColor = '#1a1a1a',
  stripeColor,
  collarColor,
  number = '10',
  teamCode = '',
  size = 400,
  pattern = 'solid',
}: Props) {
  const stripe = stripeColor || secondaryColor
  const collar = collarColor || secondaryColor
  const id = useMemo(() => `j${Math.random().toString(36).slice(2,7)}`, [])

  // Darken primary for shadows
  const isDark = primaryColor === '#FFFFFF' || primaryColor.toLowerCase() === '#fff'
  const shadowColor = isDark ? '#b0b8c8' : '#000000'

  return (
    <svg viewBox="0 0 480 520" width={size} height={size * (520/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Body main gradient - light from top-left */}
        <linearGradient id={`${id}bg`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isDark ? "0.08" : "0.22"}/>
          <stop offset="45%" stopColor={primaryColor} stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.28"/>
        </linearGradient>
        {/* Fabric fold - vertical center highlight */}
        <linearGradient id={`${id}ch`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowColor} stopOpacity="0.12"/>
          <stop offset="35%" stopColor="white" stopOpacity={isDark ? "0.0" : "0.18"}/>
          <stop offset="50%" stopColor="white" stopOpacity={isDark ? "0.0" : "0.12"}/>
          <stop offset="65%" stopColor="white" stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.18"/>
        </linearGradient>
        {/* Left sleeve gradient */}
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isDark ? "0.0" : "0.15"}/>
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.4"/>
        </linearGradient>
        {/* Right sleeve gradient */}
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isDark ? "0.0" : "0.15"}/>
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.4"/>
        </linearGradient>
        {/* Collar 3D gradient */}
        <radialGradient id={`${id}col`} cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
          <stop offset="100%" stopColor={shadowColor} stopOpacity="0.5"/>
        </radialGradient>
        {/* Drop shadow filter */}
        <filter id={`${id}ds`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.25"/>
        </filter>
        {/* Clip paths */}
        <clipPath id={`${id}bc`}>
          <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L82 490 L398 490 L398 232 L460 210 L420 118 Q380 82 330 95 Q310 128 240 136 Q170 128 150 95Z"/>
        </clipPath>
        <clipPath id={`${id}slc`}>
          <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L110 170 Q130 130 150 95Z"/>
        </clipPath>
        <clipPath id={`${id}src`}>
          <path d="M330 95 Q380 82 420 118 L460 210 L398 232 L370 170 Q350 130 330 95Z"/>
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L110 170 Q130 130 150 95Z"
          fill={secondaryColor}/>
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}slc)`}>
            {[-2,-1,0,1,2,3].map(i=>(
              <rect key={i} x={-20+i*24} y="70" width="12" height="200" fill={stripe} fillOpacity="0.4"
                transform="rotate(-35 85 155)"/>
            ))}
          </g>
        )}
        <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L110 170 Q130 130 150 95Z"
          fill={`url(#${id}sl)`}/>
        {/* Sleeve cuff */}
        <path d="M20 198 L82 218 L82 234 L20 213Z" fill={collar} opacity="0.85"/>
        <path d="M20 198 L82 218" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.25"/>

        {/* ── RIGHT SLEEVE ── */}
        <path d="M330 95 Q380 82 420 118 L460 210 L398 232 L370 170 Q350 130 330 95Z"
          fill={secondaryColor}/>
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}src)`}>
            {[-2,-1,0,1,2,3].map(i=>(
              <rect key={i} x={350+i*24} y="70" width="12" height="200" fill={stripe} fillOpacity="0.4"
                transform="rotate(35 395 155)"/>
            ))}
          </g>
        )}
        <path d="M330 95 Q380 82 420 118 L460 210 L398 232 L370 170 Q350 130 330 95Z"
          fill={`url(#${id}sr)`}/>
        {/* Sleeve cuff */}
        <path d="M460 198 L398 218 L398 234 L460 213Z" fill={collar} opacity="0.85"/>
        <path d="M460 198 L398 218" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.25"/>

        {/* ── BODY ── */}
        <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L82 490 L398 490 L398 232 L460 210 L420 118 Q380 82 330 95 Q310 128 240 136 Q170 128 150 95Z"
          fill={primaryColor}/>

        {/* Pattern on body */}
        {pattern === 'stripes' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
              <rect key={i} x={62+i*26} y="88" width="13" height="410" fill={stripe} fillOpacity="0.25"/>
            ))}
          </g>
        )}
        {pattern === 'hoops' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4,5,6,7,8,9].map(i=>(
              <rect key={i} x="82" y={95+i*40} width="316" height="20" fill={stripe} fillOpacity="0.35"/>
            ))}
          </g>
        )}
        {pattern === 'diagonal' && (
          <g clipPath={`url(#${id}bc)`}>
            {[-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(i=>(
              <rect key={i} x={30+i*38} y="60" width="18" height="560" fill={stripe} fillOpacity="0.28"
                transform="rotate(40 240 300)"/>
            ))}
          </g>
        )}
        {pattern === 'chevron' && (
          <g clipPath={`url(#${id}bc)`}>
            {[0,1,2,3,4].map(i=>(
              <path key={i} d={`M82 ${160+i*60} L240 ${128+i*60} L398 ${160+i*60} L398 ${180+i*60} L240 ${148+i*60} L82 ${180+i*60}Z`}
                fill={stripe} fillOpacity="0.3"/>
            ))}
          </g>
        )}

        {/* Body shading overlays */}
        <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L82 490 L398 490 L398 232 L460 210 L420 118 Q380 82 330 95 Q310 128 240 136 Q170 128 150 95Z"
          fill={`url(#${id}bg)`}/>
        <path d="M150 95 Q100 82 60 118 L20 210 L82 232 L82 490 L398 490 L398 232 L460 210 L420 118 Q380 82 330 95 Q310 128 240 136 Q170 128 150 95Z"
          fill={`url(#${id}ch)`}/>

        {/* Sleeve-to-body shadow */}
        <path d="M82 232 L82 310 L110 295 L110 175Z" fill={shadowColor} fillOpacity="0.1"/>
        <path d="M398 232 L398 310 L370 295 L370 175Z" fill={shadowColor} fillOpacity="0.1"/>

        {/* ── COLLAR (round neck, 3D) ── */}
        {/* Collar outer shape */}
        <path d="M174 104 Q195 138 240 142 Q285 138 306 104 Q300 88 285 78 Q262 68 240 66 Q218 68 195 78 Q180 88 174 104Z"
          fill={collar}/>
        {/* Collar inner – shows body color inside neck */}
        <path d="M180 107 Q200 136 240 139 Q280 136 300 107 Q294 94 281 85 Q262 76 240 74 Q218 76 199 85 Q186 94 180 107Z"
          fill={primaryColor}/>
        {/* Collar 3D shading */}
        <path d="M174 104 Q195 138 240 142 Q285 138 306 104 Q300 88 285 78 Q262 68 240 66 Q218 68 195 78 Q180 88 174 104Z"
          fill={`url(#${id}col)`} fillOpacity="0.6"/>
        {/* Collar rib line */}
        <path d="M182 106 Q200 133 240 136 Q280 133 298 106"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3"/>

        {/* ── SEAM LINES ── */}
        {/* Shoulder seams */}
        <path d="M150 95 Q130 130 110 172" fill="none" stroke={shadowColor} strokeWidth="1.5" strokeOpacity="0.2"/>
        <path d="M330 95 Q350 130 370 172" fill="none" stroke={shadowColor} strokeWidth="1.5" strokeOpacity="0.2"/>
        {/* Side seams */}
        <line x1="82" y1="234" x2="82" y2="488" stroke={shadowColor} strokeWidth="1.5" strokeOpacity="0.15"/>
        <line x1="398" y1="234" x2="398" y2="488" stroke={shadowColor} strokeWidth="1.5" strokeOpacity="0.15"/>
        {/* Center seam */}
        <line x1="240" y1="142" x2="240" y2="488" stroke={shadowColor} strokeWidth="1" strokeOpacity="0.08"/>

        {/* ── BADGE (WM 2026 shield) ── */}
        <path d="M170 168 L170 204 Q170 220 185 228 L196 234 L196 162Z" fill={collar} fillOpacity="0.15"/>
        <path d="M170 162 L196 162 L196 200 Q196 218 183 226 L170 218Z" fill="white" fillOpacity="0.12"/>
        <path d="M170 162 L196 162 L196 200 Q196 218 183 226 L170 218Z" fill="none" stroke={collar} strokeWidth="1.8" strokeOpacity="0.7"/>
        <text x="183" y="183" textAnchor="middle" fontSize="8" fontWeight="800" fill={collar} fontFamily="Arial" opacity="0.9">WM</text>
        <text x="183" y="195" textAnchor="middle" fontSize="9" fontWeight="900" fill={collar} fontFamily="Arial" opacity="0.9">2026</text>
        <text x="183" y="207" textAnchor="middle" fontSize="7" fontWeight="600" fill={collar} fontFamily="Arial" opacity="0.7">{teamCode}</text>

        {/* ── NUMBER ── */}
        <text x="240" y="365" textAnchor="middle"
          fontSize="110" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill={secondaryColor} fillOpacity="0.88"
          style={{letterSpacing:'-6px'}}>
          {number}
        </text>
        {/* Number shadow for depth */}
        <text x="243" y="368" textAnchor="middle"
          fontSize="110" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif"
          fill={shadowColor} fillOpacity="0.12"
          style={{letterSpacing:'-6px', zIndex:-1}}>
          {number}
        </text>

        {/* ── TEAM NAME BELOW NUMBER ── */}
        {teamCode && (
          <text x="240" y="412" textAnchor="middle" fontSize="22" fontWeight="700"
            fontFamily="Arial,sans-serif" fill={secondaryColor} fillOpacity="0.65" letterSpacing="6">
            {teamCode}
          </text>
        )}

        {/* ── HEM ── */}
        <line x1="82" y1="482" x2="398" y2="482" stroke={secondaryColor} strokeWidth="2.5" strokeOpacity="0.12"/>
        <line x1="82" y1="488" x2="398" y2="488" stroke={secondaryColor} strokeWidth="1.5" strokeOpacity="0.08"/>
      </g>
    </svg>
  )
}
