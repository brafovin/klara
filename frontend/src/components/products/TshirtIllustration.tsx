'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  graphicColor?: string
  text?: string
  subtext?: string
  size?: number
  graphic?: 'ball' | 'star' | 'shield' | 'wave'
}

export default function TshirtIllustration({
  primaryColor = '#FBBF24',
  graphicColor = '#15803d',
  text = 'WM 2026',
  subtext = 'FAN',
  size = 400,
  graphic = 'ball',
}: Props) {
  const id = useMemo(() => `t${Math.random().toString(36).slice(2,7)}`, [])
  const isDark = primaryColor === '#000000' || primaryColor === '#111827' || primaryColor === '#1a1a1a'
  const isLight = primaryColor === '#FFFFFF' || primaryColor === '#fff'
  const textFill = isDark ? '#ffffff' : (isLight ? graphicColor : (graphicColor === primaryColor ? '#FFFFFF' : graphicColor))
  const shadowC = isLight ? '#8899aa' : '#000000'

  return (
    <svg viewBox="0 0 480 520" width={size} height={size*(520/480)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}bg`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight ? "0.0" : "0.2"}/>
          <stop offset="50%" stopColor="white" stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadowC} stopOpacity="0.18"/>
          <stop offset="20%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="80%" stopColor={shadowC} stopOpacity="0"/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.22"/>
        </linearGradient>
        <linearGradient id={`${id}sl`} x1="100%" y1="0%" x2="0%" y2="80%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0":"0.1"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.45"/>
        </linearGradient>
        <linearGradient id={`${id}sr`} x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="white" stopOpacity={isLight?"0":"0.1"}/>
          <stop offset="100%" stopColor={shadowC} stopOpacity="0.45"/>
        </linearGradient>
        <filter id={`${id}ds`} x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.22"/>
        </filter>
        <clipPath id={`${id}bc`}>
          <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L90 490 L390 490 L390 228 L458 210 L418 115 Q380 78 325 95 Q308 128 240 136 Q172 128 155 95Z"/>
        </clipPath>
      </defs>

      <g filter={`url(#${id}ds)`}>
        {/* ── LEFT SLEEVE ── */}
        <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L114 165 Q132 128 155 95Z" fill={primaryColor}/>
        <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L114 165 Q132 128 155 95Z" fill={`url(#${id}sl)`}/>
        {/* sleeve cuff strip */}
        <path d="M22 198 L90 215 L90 230 L22 212Z" fill={graphicColor} fillOpacity="0.6"/>
        <path d="M22 198 L90 215" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>

        {/* ── RIGHT SLEEVE ── */}
        <path d="M325 95 Q380 78 418 115 L458 210 L390 228 L366 165 Q348 128 325 95Z" fill={primaryColor}/>
        <path d="M325 95 Q380 78 418 115 L458 210 L390 228 L366 165 Q348 128 325 95Z" fill={`url(#${id}sr)`}/>
        {/* sleeve cuff strip */}
        <path d="M458 198 L390 215 L390 230 L458 212Z" fill={graphicColor} fillOpacity="0.6"/>
        <path d="M458 198 L390 215" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>

        {/* ── BODY ── */}
        <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L90 490 L390 490 L390 228 L458 210 L418 115 Q380 78 325 95 Q308 128 240 136 Q172 128 155 95Z"
          fill={primaryColor}/>
        {/* Shading overlays */}
        <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L90 490 L390 490 L390 228 L458 210 L418 115 Q380 78 325 95 Q308 128 240 136 Q172 128 155 95Z"
          fill={`url(#${id}bg)`}/>
        <path d="M155 95 Q100 78 62 115 L22 210 L90 228 L90 490 L390 490 L390 228 L458 210 L418 115 Q380 78 325 95 Q308 128 240 136 Q172 128 155 95Z"
          fill={`url(#${id}side)`}/>

        {/* Armhole shadow */}
        <path d="M90 228 L90 310 L116 296 L116 168Z" fill={shadowC} fillOpacity="0.1"/>
        <path d="M390 228 L390 310 L364 296 L364 168Z" fill={shadowC} fillOpacity="0.1"/>

        {/* ── COLLAR (crew neck with rib) ── */}
        <path d="M172 103 Q195 132 240 136 Q285 132 308 103 Q302 88 288 80 Q266 70 240 68 Q214 70 192 80 Q178 88 172 103Z"
          fill={graphicColor} fillOpacity="0.75"/>
        <path d="M178 105 Q200 130 240 134 Q280 130 302 105 Q296 92 284 84 Q264 74 240 72 Q216 74 196 84 Q184 92 178 105Z"
          fill={primaryColor}/>
        {/* Collar rib texture */}
        <path d="M180 104 Q200 128 240 132 Q280 128 300 104" fill="none" stroke="white" strokeWidth="1.2"
          strokeOpacity="0.3" strokeDasharray="3 3"/>

        {/* ── GRAPHIC ── */}
        {graphic === 'ball' && (
          <g transform="translate(240,270)">
            <circle r="52" fill="white" fillOpacity="0.9"/>
            <circle r="52" fill={graphicColor} fillOpacity="0.1"/>
            {/* Ball panels */}
            <path d="M0,-52 C12,-40 18,-20 16,-4 C10,2 0,6 -8,4 C-18,2 -28,-6 -30,-18 C-28,-36 -16,-50 0,-52Z"
              fill={graphicColor} fillOpacity="0.85"/>
            <path d="M16,-4 C28,-8 42,-2 50,10 C44,28 30,44 12,50 C2,42 -6,28 -8,14 C0,8 10,4 16,-4Z"
              fill={graphicColor} fillOpacity="0.85"/>
            <path d="M-30,-18 C-46,-12 -52,4 -48,20 C-42,32 -26,42 -12,44 C-16,30 -16,14 -8,4 C-18,2 -24,-8 -30,-18Z"
              fill={graphicColor} fillOpacity="0.85"/>
            <circle r="52" fill="none" stroke={graphicColor} strokeWidth="2.5" strokeOpacity="0.3"/>
            {/* Shine */}
            <ellipse cx="-18" cy="-22" rx="14" ry="10" fill="white" fillOpacity="0.5" transform="rotate(-30)"/>
          </g>
        )}
        {graphic === 'star' && (
          <g transform="translate(240,270)">
            <polygon points="0,-52 12,-16 50,-16 20,8 32,44 0,22 -32,44 -20,8 -50,-16 -12,-16"
              fill={graphicColor} fillOpacity="0.85"/>
            <polygon points="0,-40 9,-12 38,-12 16,6 24,34 0,18 -24,34 -16,6 -38,-12 -9,-12"
              fill="white" fillOpacity="0.25"/>
            <text textAnchor="middle" y="12" fontSize="28" fontWeight="900" fontFamily="Arial Black" fill="white" fillOpacity="0.9">⚽</text>
          </g>
        )}
        {graphic === 'shield' && (
          <g transform="translate(240,265)">
            <path d="M0,-52 L46,-34 L46,8 Q46,44 0,60 Q-46,44 -46,8 L-46,-34Z"
              fill={graphicColor} fillOpacity="0.85"/>
            <path d="M0,-44 L38,-28 L38,8 Q38,38 0,52 Q-38,38 -38,8 L-38,-28Z"
              fill="white" fillOpacity="0.18"/>
            <line x1="0" y1="-44" x2="0" y2="52" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
            <line x1="-38" y1="-2" x2="38" y2="-2" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
            <text textAnchor="middle" y="-12" fontSize="22" fontWeight="900" fontFamily="Arial Black" fill="white">WM</text>
            <text textAnchor="middle" y="14" fontSize="18" fontWeight="700" fontFamily="Arial" fill="white">2026</text>
          </g>
        )}
        {graphic === 'wave' && (
          <g clipPath={`url(#${id}bc)`}>
            <path d="M90 195 Q140 172 190 195 Q240 218 290 195 Q340 172 390 195 L390 228 Q340 205 290 228 Q240 251 190 228 Q140 205 90 228Z"
              fill={graphicColor} fillOpacity="0.38"/>
            <path d="M90 240 Q140 217 190 240 Q240 263 290 240 Q340 217 390 240 L390 264 Q340 241 290 264 Q240 287 190 264 Q140 241 90 264Z"
              fill={graphicColor} fillOpacity="0.22"/>
          </g>
        )}

        {/* ── TEXT ── */}
        <text x="240" y="354" textAnchor="middle" fontSize="32" fontWeight="900"
          fontFamily="'Arial Black',Impact,sans-serif" fill={textFill} letterSpacing="2">
          {text}
        </text>
        <text x="240" y="382" textAnchor="middle" fontSize="16" fontWeight="600"
          fontFamily="Arial" fill={textFill} fillOpacity="0.6" letterSpacing="7">
          {subtext}
        </text>

        {/* ── SEAMS ── */}
        <line x1="90" y1="232" x2="90" y2="488" stroke={shadowC} strokeWidth="1" strokeOpacity="0.1"/>
        <line x1="390" y1="232" x2="390" y2="488" stroke={shadowC} strokeWidth="1" strokeOpacity="0.1"/>
        <line x1="90" y1="482" x2="390" y2="482" stroke={shadowC} strokeWidth="2" strokeOpacity="0.12"/>
        <line x1="240" y1="136" x2="240" y2="488" stroke={shadowC} strokeWidth="1" strokeOpacity="0.06"/>
      </g>
    </svg>
  )
}
