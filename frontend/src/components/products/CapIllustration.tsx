'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  accentColor?: string
  textColor?: string
  size?: number
}

export default function CapIllustration({ primaryColor = '#DC2626', accentColor = '#fbbf24', textColor, size = 400 }: Props) {
  const id = useMemo(() => `c${Math.random().toString(36).slice(2,7)}`, [])
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff' || primaryColor === '#FCD116' || primaryColor === '#FFD700'
  const txt = textColor || (isLight ? '#1a1a1a' : 'white')
  const shadowC = isLight ? '#8899aa' : '#000'

  return (
    <svg viewBox="0 0 480 400" width={size} height={size*(400/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}crown`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0.0":"0.28"}/>
          <stop offset="60%" stopColor="white" stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.25"/>
        </linearGradient>
        <linearGradient id={`${id}left`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}right`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}brim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor}/>
          <stop offset="80%" stopColor={primaryColor} stopOpacity="0.85"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id={`${id}bunder`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.08"/>
        </linearGradient>
        <filter id={`${id}ds`} x="-20%" y="-15%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#000" floodOpacity="0.25"/>
        </filter>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── CROWN ── */}
        {/* Main crown shape (slightly angled perspective) */}
        <path d="M104 270 Q108 158 240 118 Q372 158 376 270Z" fill={primaryColor}/>

        {/* Panel seam lines (6 panels) */}
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad = (deg-90)*Math.PI/180
          const ex = 240 + 137*Math.cos(rad)
          const ey = 268 - 148*Math.sin(rad)*0.75
          return <line key={i} x1="240" y1="126" x2={ex} y2={ey}
            stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.28" strokeDasharray="5 4"/>
        })}

        {/* Crown gradient overlays */}
        <path d="M104 270 Q108 158 240 118 Q372 158 376 270Z" fill={`url(#${id}crown)`}/>
        <path d="M104 270 Q108 158 170 130 L170 270Z" fill={`url(#${id}left)`}/>
        <path d="M376 270 Q372 158 310 130 L310 270Z" fill={`url(#${id}right)`}/>

        {/* Sweatband strip */}
        <path d="M104 270 Q112 284 240 290 Q368 284 376 270 Q368 260 240 264 Q112 260 104 270Z"
          fill={accentColor} fillOpacity="0.6"/>
        <path d="M104 270 Q112 282 240 288 Q368 282 376 270"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3"/>
        {/* Sweatband perforations */}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <ellipse key={i} cx={140+i*28} cy="277" rx="4" ry="3" fill={primaryColor} fillOpacity="0.4"/>
        ))}

        {/* ── BRIM (perspective view) ── */}
        {/* Brim underside (darker, visible from slightly above) */}
        <path d="M70 278 Q72 310 240 318 Q408 310 410 278 Q380 290 240 294 Q100 290 70 278Z"
          fill={`url(#${id}bunder)`}/>
        {/* Brim top surface */}
        <path d="M70 278 Q72 308 240 316 Q408 308 410 278 Q380 286 240 290 Q100 286 70 278Z"
          fill={`url(#${id}brim)`}/>
        {/* Brim edge */}
        <path d="M70 278 Q72 312 240 320 Q408 312 410 278"
          fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.45"/>
        {/* Brim stitching lines */}
        <path d="M84 283 Q86 308 240 315 Q394 308 396 283"
          fill="none" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <path d="M98 286 Q100 308 240 314 Q380 308 382 286"
          fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 3"/>

        {/* ── TOP BUTTON ── */}
        <circle cx="240" cy="122" r="14" fill={accentColor} fillOpacity="0.95"/>
        <circle cx="240" cy="122" r="9" fill={primaryColor} fillOpacity="0.6"/>
        <circle cx="240" cy="122" r="4" fill={accentColor} fillOpacity="0.8"/>
        {/* Button thread holes */}
        <line x1="236" y1="122" x2="244" y2="122" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
        <line x1="240" y1="118" x2="240" y2="126" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>

        {/* ── FRONT EMBLEM ── */}
        <path d="M240 208 L256 230 L278 226 L270 248 L284 264 L262 262 L252 284 L240 264 L228 284 L218 262 L196 264 L210 248 L202 226 L224 230Z"
          fill={accentColor} fillOpacity="0.85"/>
        <path d="M240 218 L252 236 L270 232 L264 250 L274 263 L256 261 L248 279 L240 261 L232 279 L224 261 L206 263 L216 250 L210 232 L228 236Z"
          fill="white" fillOpacity="0.2"/>
        <text x="240" y="250" textAnchor="middle" fontSize="20" fontWeight="900"
          fontFamily="'Arial Black',sans-serif" fill={txt} opacity="0.95">WM</text>

        {/* ── ADJUSTABLE BACK STRAP ── */}
        <rect x="190" y="284" width="100" height="22" rx="6" fill={accentColor} fillOpacity="0.55"/>
        <rect x="230" y="280" width="20" height="30" rx="4" fill={accentColor} fillOpacity="0.8"/>
        {/* Buckle */}
        <rect x="234" y="284" width="12" height="22" rx="2" fill="white" fillOpacity="0.3"/>
        {/* Strap holes */}
        {[-2,-1,0,1,2].map(i=>(
          <circle key={i} cx={240+i*8} cy="295" r="2.5" fill={primaryColor} fillOpacity="0.7"/>
        ))}
      </g>
    </svg>
  )
}
