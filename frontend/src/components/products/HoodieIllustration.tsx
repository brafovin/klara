'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  accentColor?: string
  size?: number
  teamName?: string
}

export default function HoodieIllustration({ primaryColor = '#74ACDF', accentColor = '#0369a1', size = 400, teamName = '' }: Props) {
  const id = useMemo(() => `h${Math.random().toString(36).slice(2,7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#1a1a1a' || primaryColor === '#111827'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff'
  const textFill = isDark ? '#FFFFFF' : (isLight ? accentColor : accentColor)
  const shadowC = isLight ? '#8899aa' : '#000000'

  return (
    <svg viewBox="0 0 480 560" width={size} height={size*(560/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}bg`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.18"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.32"/>
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.18"/>
          <stop offset="18%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="82%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.22"/>
        </linearGradient>
        <linearGradient id={`${id}hood`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.22"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.28"/>
        </linearGradient>
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.12"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.45"/>
        </linearGradient>
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.12"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.45"/>
        </linearGradient>
        <radialGradient id={`${id}hinner`} cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.1"/>
        </radialGradient>
        <filter id={`${id}ds`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.22"/>
        </filter>
        <clipPath id={`${id}bc`}>
          <path d="M148 186 L68 232 L40 328 L94 340 L94 510 L386 510 L386 340 L440 328 L412 232 L332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"/>
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── HOOD ── */}
        {/* Hood back/outer shape */}
        <path d="M148 186 Q150 110 168 72 Q185 38 240 32 Q295 38 312 72 Q330 110 332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"
          fill={primaryColor}/>
        <path d="M148 186 Q150 110 168 72 Q185 38 240 32 Q295 38 312 72 Q330 110 332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"
          fill={`url(#${id}hood)`}/>
        {/* Hood inner lining (darker/accent) */}
        <path d="M164 186 Q166 118 180 84 Q192 56 240 50 Q288 56 300 84 Q314 118 316 186 Q296 198 240 204 Q184 198 164 186Z"
          fill={accentColor} fillOpacity="0.2"/>
        {/* Hood opening depth shadow */}
        <path d="M176 184 Q178 126 190 96 Q200 72 240 66 Q280 72 290 96 Q302 126 304 184 Q284 192 240 196 Q196 192 176 184Z"
          fill={`url(#${id}hinner)`}/>
        {/* Hood rim highlight */}
        <path d="M176 184 Q196 192 240 196 Q284 192 304 184"
          fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.25"/>

        {/* ── LEFT SLEEVE ── */}
        <path d="M148 186 L68 232 L40 328 L94 340 L118 268 Q132 228 148 186Z"
          fill={primaryColor}/>
        <path d="M148 186 L68 232 L40 328 L94 340 L118 268 Q132 228 148 186Z"
          fill={`url(#${id}sl)`}/>
        {/* Cuff band */}
        <path d="M40 314 L94 326 L94 342 L40 330Z" fill={accentColor} fillOpacity="0.5"/>
        <path d="M40 314 L94 326" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
        <path d="M40 320 L94 332" stroke="white" strokeWidth="1" strokeOpacity="0.15" fill="none"/>

        {/* ── RIGHT SLEEVE ── */}
        <path d="M332 186 L412 232 L440 328 L386 340 L362 268 Q348 228 332 186Z"
          fill={primaryColor}/>
        <path d="M332 186 L412 232 L440 328 L386 340 L362 268 Q348 228 332 186Z"
          fill={`url(#${id}sr)`}/>
        {/* Cuff band */}
        <path d="M440 314 L386 326 L386 342 L440 330Z" fill={accentColor} fillOpacity="0.5"/>
        <path d="M440 314 L386 326" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
        <path d="M440 320 L386 332" stroke="white" strokeWidth="1" strokeOpacity="0.15" fill="none"/>

        {/* ── BODY ── */}
        <path d="M148 186 L68 232 L40 328 L94 340 L94 510 L386 510 L386 340 L440 328 L412 232 L332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"
          fill={primaryColor}/>
        <path d="M148 186 L68 232 L40 328 L94 340 L94 510 L386 510 L386 340 L440 328 L412 232 L332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"
          fill={`url(#${id}bg)`}/>
        <path d="M148 186 L68 232 L40 328 L94 340 L94 510 L386 510 L386 340 L440 328 L412 232 L332 186 C312 202 278 212 240 212 C202 212 168 202 148 186Z"
          fill={`url(#${id}side)`}/>

        {/* Armhole shadows */}
        <path d="M94 340 L94 420 L120 406 L120 270Z" fill={shadowC} fillOpacity="0.1"/>
        <path d="M386 340 L386 420 L360 406 L360 270Z" fill={shadowC} fillOpacity="0.1"/>

        {/* ── ZIPPER ── */}
        <rect x="234" y="210" width="12" height="280" rx="2" fill={accentColor} fillOpacity="0.55"/>
        {/* Zipper teeth */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(
          <rect key={i} x="232" y={220+i*20} width="16" height="8" rx="1"
            fill="white" fillOpacity="0.2"/>
        ))}
        {/* Zipper pull */}
        <rect x="230" y="226" width="20" height="14" rx="4" fill={accentColor} fillOpacity="0.9"/>
        <line x1="240" y1="226" x2="240" y2="240" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
        <rect x="234" y="240" width="12" height="22" rx="3" fill={accentColor} fillOpacity="0.7"/>

        {/* ── DRAWSTRINGS ── */}
        <path d="M218 208 Q210 235 204 264 Q200 285 204 310" fill="none"
          stroke={accentColor} strokeWidth="4" strokeOpacity="0.65" strokeLinecap="round"/>
        <path d="M262 208 Q270 235 276 264 Q280 285 276 310" fill="none"
          stroke={accentColor} strokeWidth="4" strokeOpacity="0.65" strokeLinecap="round"/>
        {/* Drawstring tips */}
        <ellipse cx="204" cy="315" rx="6" ry="9" fill={accentColor} fillOpacity="0.8"/>
        <ellipse cx="276" cy="315" rx="6" ry="9" fill={accentColor} fillOpacity="0.8"/>
        <ellipse cx="204" cy="315" rx="3" ry="4" fill="white" fillOpacity="0.3"/>
        <ellipse cx="276" cy="315" rx="3" ry="4" fill="white" fillOpacity="0.3"/>

        {/* ── KANGAROO POCKET ── */}
        <path d="M122 384 Q122 370 136 366 L240 363 L344 366 Q358 370 358 384 L358 450 Q358 464 344 467 L240 470 L136 467 Q122 464 122 450Z"
          fill={accentColor} fillOpacity="0.15"/>
        <path d="M122 384 Q122 370 136 366 L240 363 L344 366 Q358 370 358 384 L358 450 Q358 464 344 467 L240 470 L136 467 Q122 464 122 450Z"
          fill="none" stroke={accentColor} strokeWidth="2.2" strokeOpacity="0.5"/>
        {/* Pocket divider */}
        <line x1="240" y1="363" x2="240" y2="470" stroke={accentColor} strokeWidth="1.8" strokeOpacity="0.4"/>
        {/* Pocket shadow top */}
        <path d="M122 384 Q122 370 136 366 L344 366 Q358 370 358 384 L358 390 Q344 376 136 376 Q122 380 122 390Z"
          fill={shadowC} fillOpacity="0.08"/>

        {/* ── TEAM NAME ── */}
        {teamName && (
          <text x="240" y="344" textAnchor="middle" fontSize="26" fontWeight="900"
            fontFamily="'Arial Black',sans-serif" fill={textFill} fillOpacity="0.7" letterSpacing="5">
            {teamName.toUpperCase()}
          </text>
        )}

        {/* ── SEAMS ── */}
        <line x1="94" y1="342" x2="94" y2="508" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.12"/>
        <line x1="386" y1="342" x2="386" y2="508" stroke={shadowC} strokeWidth="1.2" strokeOpacity="0.12"/>
        <line x1="94" y1="502" x2="386" y2="502" stroke={shadowC} strokeWidth="2" strokeOpacity="0.12"/>
      </g>
    </svg>
  )
}
