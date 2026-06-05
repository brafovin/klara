'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  size?: number
  teamName?: string
}

export default function JacketIllustration({ primaryColor = '#1d4ed8', secondaryColor = '#dc2626', size = 400, teamName = '' }: Props) {
  const id = useMemo(() => `jk${Math.random().toString(36).slice(2,7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff'
  const shadowC = isLight ? '#8899aa' : '#000000'
  const textFill = isDark ? '#FFFFFF' : (isLight ? secondaryColor : secondaryColor)

  return (
    <svg viewBox="0 0 480 540" width={size} height={size*(540/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}bg`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.2"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22"/>
          <stop offset="18%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="82%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.26"/>
        </linearGradient>
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0":"0.1"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.48"/>
        </linearGradient>
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0":"0.1"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.48"/>
        </linearGradient>
        <filter id={`${id}ds`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.22"/>
        </filter>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d="M148 96 Q88 82 50 122 L18 228 L86 248 L108 172 Q126 128 148 96Z"
          fill={primaryColor}/>
        <path d="M148 96 Q88 82 50 122 L18 228 L86 248 L108 172 Q126 128 148 96Z"
          fill={`url(#${id}sl)`}/>
        {/* Cuff */}
        <path d="M18 214 L86 232 L86 250 L18 232Z" fill={secondaryColor} fillOpacity="0.55"/>
        <path d="M18 214 L86 232" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
        <path d="M18 221 L86 239" stroke="white" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
        {/* Sleeve stripes */}
        <path d="M52 158 L76 162 L76 172 L52 168Z" fill={secondaryColor} fillOpacity="0.7"/>
        <path d="M44 178 L72 182 L72 190 L44 186Z" fill={secondaryColor} fillOpacity="0.5"/>

        {/* ── RIGHT SLEEVE ── */}
        <path d="M332 96 Q392 82 430 122 L462 228 L394 248 L372 172 Q354 128 332 96Z"
          fill={primaryColor}/>
        <path d="M332 96 Q392 82 430 122 L462 228 L394 248 L372 172 Q354 128 332 96Z"
          fill={`url(#${id}sr)`}/>
        {/* Cuff */}
        <path d="M462 214 L394 232 L394 250 L462 232Z" fill={secondaryColor} fillOpacity="0.55"/>
        <path d="M462 214 L394 232" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
        <path d="M462 221 L394 239" stroke="white" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
        {/* Sleeve stripes */}
        <path d="M428 158 L404 162 L404 172 L428 168Z" fill={secondaryColor} fillOpacity="0.7"/>
        <path d="M436 178 L408 182 L408 190 L436 186Z" fill={secondaryColor} fillOpacity="0.5"/>

        {/* ── BODY ── */}
        <path d="M148 96 Q88 82 50 122 L18 228 L86 248 L86 500 L394 500 L394 248 L462 228 L430 122 Q392 82 332 96 L315 118 Q295 136 240 140 Q185 136 165 118Z"
          fill={primaryColor}/>
        <path d="M148 96 Q88 82 50 122 L18 228 L86 248 L86 500 L394 500 L394 248 L462 228 L430 122 Q392 82 332 96 L315 118 Q295 136 240 140 Q185 136 165 118Z"
          fill={`url(#${id}bg)`}/>
        <path d="M148 96 Q88 82 50 122 L18 228 L86 248 L86 500 L394 500 L394 248 L462 228 L430 122 Q392 82 332 96 L315 118 Q295 136 240 140 Q185 136 165 118Z"
          fill={`url(#${id}side)`}/>

        {/* ── STAND-UP COLLAR ── */}
        <path d="M165 118 Q185 136 240 140 Q295 136 315 118 L306 92 Q285 72 240 68 Q195 72 174 92Z"
          fill={secondaryColor} fillOpacity="0.9"/>
        <path d="M171 118 Q190 134 240 138 Q290 134 309 118 L302 95 Q283 77 240 73 Q197 77 178 95Z"
          fill={primaryColor} fillOpacity="0.65"/>
        {/* Collar top fold */}
        <path d="M178 114 Q196 130 240 134 Q284 130 302 114"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3"/>

        {/* ── LAPELS ── */}
        <path d="M186 130 L148 186 L196 200 L240 150Z" fill={secondaryColor} fillOpacity="0.82"/>
        <path d="M294 130 L332 186 L284 200 L240 150Z" fill={secondaryColor} fillOpacity="0.82"/>
        {/* Lapel shading */}
        <path d="M186 130 L148 186 L172 194 L220 148Z" fill="black" fillOpacity="0.1"/>
        <path d="M294 130 L332 186 L308 194 L260 148Z" fill="black" fillOpacity="0.1"/>

        {/* ── ZIPPER ── */}
        <rect x="234" y="148" width="12" height="332" rx="2" fill={secondaryColor} fillOpacity="0.6"/>
        {/* Zipper teeth */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i=>(
          <rect key={i} x="232" y={160+i*22} width="16" height="10" rx="1"
            fill="white" fillOpacity="0.18"/>
        ))}
        {/* Zipper slider */}
        <rect x="228" y="164" width="24" height="16" rx="5" fill={secondaryColor} fillOpacity="0.95"/>
        <line x1="240" y1="164" x2="240" y2="180" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
        <rect x="232" y="180" width="16" height="24" rx="3" fill={secondaryColor} fillOpacity="0.75"/>

        {/* ── CHEST POCKETS ── */}
        {/* Left chest pocket */}
        <path d="M96 218 L180 212 L182 256 L98 264 Q88 262 88 252 L88 226 Q88 216 96 218Z"
          fill={secondaryColor} fillOpacity="0.16"/>
        <path d="M96 218 L180 212 L182 256 L98 264 Q88 262 88 252 L88 226 Q88 216 96 218Z"
          fill="none" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.5"/>
        <line x1="88" y1="226" x2="180" y2="220" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.45"/>
        {/* Pocket zipper */}
        <line x1="120" y1="218" x2="160" y2="216" stroke={secondaryColor} strokeWidth="3" strokeOpacity="0.4"/>
        <circle cx="118" cy="218" r="4" fill={secondaryColor} fillOpacity="0.6"/>

        {/* Right chest pocket */}
        <path d="M300 212 L384 218 L392 226 L392 252 Q391 262 382 264 L298 256Z"
          fill={secondaryColor} fillOpacity="0.16"/>
        <path d="M300 212 L384 218 L392 226 L392 252 Q391 262 382 264 L298 256Z"
          fill="none" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.5"/>
        <line x1="300" y1="220" x2="392" y2="226" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.45"/>
        <line x1="320" y1="213" x2="360" y2="216" stroke={secondaryColor} strokeWidth="3" strokeOpacity="0.4"/>
        <circle cx="362" cy="216" r="4" fill={secondaryColor} fillOpacity="0.6"/>

        {/* ── SIDE POCKETS ── */}
        <path d="M88 360 L176 353 L178 416 L90 424 Q84 422 84 414 L84 367 Q84 360 88 360Z"
          fill={secondaryColor} fillOpacity="0.14"/>
        <path d="M88 360 L176 353 L178 416 L90 424 Q84 422 84 414 L84 367 Q84 360 88 360Z"
          fill="none" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.45"/>
        <path d="M304 353 L392 360 L396 367 L396 414 Q395 422 390 424 L302 416Z"
          fill={secondaryColor} fillOpacity="0.14"/>
        <path d="M304 353 L392 360 L396 367 L396 414 Q395 422 390 424 L302 416Z"
          fill="none" stroke={secondaryColor} strokeWidth="1.8" strokeOpacity="0.45"/>

        {/* ── TEAM NAME ── */}
        {teamName && (
          <text x="240" y="320" textAnchor="middle" fontSize="26" fontWeight="900"
            fontFamily="'Arial Black',sans-serif" fill={textFill} fillOpacity="0.7" letterSpacing="5">
            {teamName.toUpperCase()}
          </text>
        )}

        {/* ── SEAMS ── */}
        <line x1="86" y1="250" x2="86" y2="498" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.1"/>
        <line x1="394" y1="250" x2="394" y2="498" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.1"/>
        <line x1="86" y1="492" x2="394" y2="492" stroke={shadowC} strokeWidth="2" strokeOpacity="0.12"/>
      </g>
    </svg>
  )
}
