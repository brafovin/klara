'use client'
import { useMemo } from 'react'

interface Props {
  primaryColor?: string
  secondaryColor?: string
  stripeColor?: string
  accentColor?: string
  collarColor?: string
  number?: string
  teamCode?: string
  size?: number
  pattern?: 'solid' | 'stripes' | 'diagonal' | 'hoops' | 'chevron' | 'yoke'
}

export default function JerseyIllustration({
  primaryColor = '#FFFFFF',
  secondaryColor = '#000000',
  stripeColor,
  accentColor,
  collarColor,
  number = '10',
  teamCode = '',
  size = 400,
  pattern = 'solid',
}: Props) {
  const id = useMemo(() => `j${Math.random().toString(36).slice(2, 7)}`, [])

  const sc = stripeColor ?? secondaryColor
  const ac = accentColor ?? secondaryColor
  const cc = collarColor ?? secondaryColor

  const lum = (hex: string) => {
    const h = hex.replace('#', '')
    if (h.length < 6) return 255
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
  }
  const lightPrimary = lum(primaryColor) > 180
  const strokeBorder = lightPrimary ? '#aac0d4' : 'none'
  const numColor = secondaryColor === primaryColor
    ? (lightPrimary ? '#333333' : '#ffffff')
    : secondaryColor
  const lightNum = lum(numColor) > 180

  // ── Silhouette ──────────────────────────────────────────────────────────
  // Ghost-mannequin: shoulders pushed up, body with slight taper, longer torso
  const bodyPath =
    'M 138 68 C 106 54 58 58 36 93 L 8 196 C 5 209 13 221 26 224 L 82 242 82 448 318 448 318 242 L 374 224 C 387 221 395 209 392 196 L 364 93 C 342 58 294 54 262 68 C 244 102 224 116 200 118 C 176 116 156 102 138 68 Z'

  // Sleeve zones for separate lighting
  const leftSleevePath =
    'M 138 68 C 106 54 58 58 36 93 L 8 196 C 5 209 13 221 26 224 L 82 242 82 170 C 82 145 95 118 118 98 Z'
  const rightSleevePath =
    'M 262 68 C 294 54 342 58 364 93 L 392 196 C 395 209 387 221 374 224 L 318 242 318 170 C 318 145 305 118 282 98 Z'

  // Side seam lines for realism
  const leftSeam = 'M 82 242 C 80 310 78 370 80 448'
  const rightSeam = 'M 318 242 C 320 310 322 370 320 448'

  // Collar – realistic round/V collar
  const collarOuter = 'M 156 78 C 162 92 176 110 200 118 C 224 110 238 92 244 78 C 234 71 218 67 200 67 C 182 67 166 71 156 78 Z'
  const collarInner = 'M 161 82 C 167 94 179 110 200 118 C 221 110 233 94 239 82 C 230 76 216 72 200 72 C 184 72 170 76 161 82 Z'

  // Hem ribbing band at bottom
  const hemPath = 'M 82 428 L 82 448 L 318 448 L 318 428 Z'
  const leftCuffPath = 'M 8 196 L 26 224 L 82 242 L 82 222 L 30 208 Z'
  const rightCuffPath = 'M 392 196 L 374 224 L 318 242 L 318 222 L 370 208 Z'

  // Yoke / pattern zone
  const yokePath =
    'M 138 68 C 106 54 58 58 36 93 L 8 196 C 5 209 13 221 26 224 L 82 242 82 195 L 200 258 318 195 318 242 L 374 224 C 387 221 395 209 392 196 L 364 93 C 342 58 294 54 262 68 C 244 102 224 116 200 118 C 176 116 156 102 138 68 Z'

  // Shoulder seam lines
  const leftShoulder = 'M 36 93 C 64 68 102 58 138 68'
  const rightShoulder = 'M 262 68 C 298 58 336 68 364 93'

  // Armhole crease (where sleeve meets body)
  const leftArmholeLine = 'M 82 168 C 84 190 82 215 82 242'
  const rightArmholeLine = 'M 318 168 C 316 190 318 215 318 242'

  // Badge position
  const badgePath = 'M 134 170 L 148 170 L 148 194 C 148 202 141 207 134 209 C 127 207 120 202 120 194 Z'

  return (
    <svg
      viewBox="0 0 400 470"
      width={size}
      height={size * (470 / 400)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* ── Drop shadow for product-photo look ── */}
        <filter id={`${id}-drop`} x="-10%" y="-5%" width="120%" height="120%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#000000" floodOpacity="0.22" />
        </filter>

        {/* ── Fabric knit texture ── */}
        <filter id={`${id}-fabric`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.12" numOctaves="4" seed="7" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* ── Lighting gradients ── */}
        <linearGradient id={`${id}-mainLight`} x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.32)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.26)" />
        </linearGradient>

        <radialGradient id={`${id}-specular`} cx="34%" cy="30%" r="28%" fx="34%" fy="30%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        <linearGradient id={`${id}-leftEdge`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.22)" />
          <stop offset="30%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        <linearGradient id={`${id}-rightEdge`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.28)" />
          <stop offset="30%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        <linearGradient id={`${id}-bottomFade`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="55%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.20)" />
        </linearGradient>

        <linearGradient id={`${id}-leftSlv`} x1="100%" y1="0%" x2="0%" y2="80%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>

        <linearGradient id={`${id}-rightSlv`} x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.32)" />
        </linearGradient>

        <radialGradient id={`${id}-centerFade`} cx="50%" cy="55%" r="35%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
        </radialGradient>

        {/* ── Clip paths ── */}
        <clipPath id={`${id}-bodyClip`}>
          <path d={bodyPath} />
        </clipPath>
        <clipPath id={`${id}-yokeClip`}>
          <path d={yokePath} />
        </clipPath>

        {/* ── Stripe pattern ── */}
        <pattern id={`${id}-stripePat`} x="0" y="0" width="52" height="470" patternUnits="userSpaceOnUse">
          <rect x="0"  y="0" width="26" height="470" fill={sc} />
        </pattern>

        {/* ── Hoops pattern ── */}
        <pattern id={`${id}-hoopsPat`} x="0" y="0" width="400" height="42" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="400" height="21" fill={sc} />
        </pattern>

        {/* ── Yoke diamond ── */}
        <pattern id={`${id}-yokeDia`} x="0" y="0" width="24" height="15" patternUnits="userSpaceOnUse">
          <polygon points="12,0 24,7.5 12,15 0,7.5" fill={ac} />
          <polygon points="0,0 12,7.5 0,15" fill={primaryColor} />
          <polygon points="24,0 24,15 12,7.5" fill={primaryColor} />
        </pattern>
      </defs>

      {/* ══ MAIN JERSEY GROUP with drop shadow ══ */}
      <g filter={`url(#${id}-drop)`}>

        {/* Base fill */}
        <path
          d={bodyPath}
          fill={primaryColor}
          stroke={strokeBorder}
          strokeWidth={strokeBorder !== 'none' ? 1.2 : 0}
        />

        {/* ── Pattern layer ── */}
        {pattern === 'stripes' && (
          <path d={bodyPath} fill={`url(#${id}-stripePat)`} clipPath={`url(#${id}-bodyClip)`} />
        )}
        {pattern === 'hoops' && (
          <path d={bodyPath} fill={`url(#${id}-hoopsPat)`} clipPath={`url(#${id}-bodyClip)`} />
        )}
        {pattern === 'diagonal' && (
          <g clipPath={`url(#${id}-bodyClip)`}>
            {[-60,-20,20,60,100,140,180,220,260,300,340,380,420].map((x, i) => (
              <line key={i} x1={x} y1={0} x2={x+470} y2={470} stroke={sc} strokeWidth={22} strokeOpacity={0.88} />
            ))}
          </g>
        )}
        {pattern === 'yoke' && (
          <>
            <path d={yokePath} fill={sc} clipPath={`url(#${id}-bodyClip)`} />
            <path d={yokePath} fill={`url(#${id}-yokeDia)`} clipPath={`url(#${id}-bodyClip)`} opacity={0.72} />
            <polyline points="82,195 200,258 318,195" fill="none"
              stroke="rgba(255,255,255,0.50)" strokeWidth={1.8} clipPath={`url(#${id}-bodyClip)`} />
          </>
        )}
        {pattern === 'chevron' && (
          <g clipPath={`url(#${id}-bodyClip)`}>
            {[185,235,285,335].map((y, i) => (
              <polyline key={i} points={`82,${y} 200,${y-42} 318,${y}`}
                fill="none" stroke={sc} strokeWidth={24} strokeOpacity={0.88} />
            ))}
          </g>
        )}

        {/* ── Hem and cuff bands ── */}
        <path d={hemPath}      fill={cc} clipPath={`url(#${id}-bodyClip)`} />
        <path d={leftCuffPath} fill={cc} clipPath={`url(#${id}-bodyClip)`} />
        <path d={rightCuffPath} fill={cc} clipPath={`url(#${id}-bodyClip)`} />

        {/* Hem ribbing lines */}
        <g clipPath={`url(#${id}-bodyClip)`}>
          {[432,436,440,444].map(y => (
            <line key={y} x1={82} y1={y} x2={318} y2={y}
              stroke="rgba(0,0,0,0.12)" strokeWidth={0.8} />
          ))}
          {/* Cuff ribbing lines - left */}
          {[0,4,8,12,16].map((d, i) => (
            <line key={`cl${i}`}
              x1={8+d*1.2} y1={196+d*1.5} x2={26+d*1.4} y2={224+d*0.8}
              stroke="rgba(0,0,0,0.10)" strokeWidth={0.7} />
          ))}
          {/* Cuff ribbing lines - right */}
          {[0,4,8,12,16].map((d, i) => (
            <line key={`cr${i}`}
              x1={392-d*1.2} y1={196+d*1.5} x2={374-d*1.4} y2={224+d*0.8}
              stroke="rgba(0,0,0,0.10)" strokeWidth={0.7} />
          ))}
        </g>

        {/* ── Fabric texture overlay ── */}
        <path d={bodyPath} fill={primaryColor} filter={`url(#${id}-fabric)`} opacity={0.055} />

        {/* ── Wrinkle lines (organic Bezier curves) ── */}
        <g clipPath={`url(#${id}-bodyClip)`} opacity={1}>
          {/* Left shoulder drape */}
          <path d="M 96 92 C 118 118 126 155 128 198" fill="none" stroke="rgba(0,0,0,0.065)" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M 76 116 C 100 148 106 188 108 235" fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth={1.5} strokeLinecap="round" />
          <path d="M 58 140 C 76 168 78 205 80 238" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth={1.2} strokeLinecap="round" />
          {/* Left highlight alongside wrinkle */}
          <path d="M 98 94 C 120 120 128 157 130 200" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1} strokeLinecap="round" />

          {/* Right shoulder drape */}
          <path d="M 304 92 C 282 118 274 155 272 198" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M 324 116 C 300 148 294 188 292 235" fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth={1.5} strokeLinecap="round" />
          <path d="M 342 140 C 324 168 322 205 320 238" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth={1.2} strokeLinecap="round" />

          {/* Center torso crease (very subtle) */}
          <path d="M 198 148 C 196 240 195 330 196 440" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M 202 148 C 204 240 205 330 204 440" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeLinecap="round" />

          {/* Chest tension lines (horizontal slight curves) */}
          <path d="M 120 200 C 160 196 240 196 280 200" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={1} strokeLinecap="round" />
          <path d="M 118 240 C 158 237 242 237 282 240" fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth={1} strokeLinecap="round" />

          {/* Lower torso drape */}
          <path d="M 140 310 C 148 340 148 390 146 438" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M 260 310 C 252 340 252 390 254 438" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={1.2} strokeLinecap="round" />
        </g>

        {/* ── Seam lines ── */}
        <g clipPath={`url(#${id}-bodyClip)`}>
          {/* Side seams */}
          <path d={leftSeam}  fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={1} strokeLinecap="round" />
          <path d={rightSeam} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={1} strokeLinecap="round" />
          {/* Side seam highlights */}
          <path d="M 83 242 C 81 310 79 370 81 448" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
          <path d="M 317 242 C 319 310 321 370 319 448" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
          {/* Armhole seam marks */}
          <path d={leftArmholeLine}  fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth={1} strokeLinecap="round" />
          <path d={rightArmholeLine} fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth={1} strokeLinecap="round" />
        </g>

        {/* ── 3D Shading layers ── */}
        <path d={bodyPath} fill={`url(#${id}-mainLight)`} />
        <path d={bodyPath} fill={`url(#${id}-specular)`} />
        <path d={bodyPath} fill={`url(#${id}-leftEdge)`} />
        <path d={bodyPath} fill={`url(#${id}-rightEdge)`} />
        <path d={bodyPath} fill={`url(#${id}-bottomFade)`} />
        <path d={bodyPath} fill={`url(#${id}-centerFade)`} />

        {/* Sleeve shading */}
        <path d={leftSleevePath}  fill={`url(#${id}-leftSlv)`}  clipPath={`url(#${id}-bodyClip)`} />
        <path d={rightSleevePath} fill={`url(#${id}-rightSlv)`} clipPath={`url(#${id}-bodyClip)`} />

        {/* Armhole shadow pool */}
        <ellipse cx={82}  cy={232} rx={22} ry={12} fill="rgba(0,0,0,0.14)" clipPath={`url(#${id}-bodyClip)`} />
        <ellipse cx={318} cy={232} rx={22} ry={12} fill="rgba(0,0,0,0.18)" clipPath={`url(#${id}-bodyClip)`} />

        {/* Shoulder highlight arcs */}
        <path d={leftShoulder}  fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth={2.5} strokeLinecap="round" clipPath={`url(#${id}-bodyClip)`} />
        <path d={rightShoulder} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={2.0} strokeLinecap="round" clipPath={`url(#${id}-bodyClip)`} />

        {/* Sleeve top edges */}
        <path d="M 36 93 L 8 196"   fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={1.8} strokeLinecap="round" clipPath={`url(#${id}-bodyClip)`} />
        <path d="M 364 93 L 392 196" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1.4} strokeLinecap="round" clipPath={`url(#${id}-bodyClip)`} />

        {/* Cuff band shading */}
        <path d={leftCuffPath}  fill="rgba(0,0,0,0.10)" clipPath={`url(#${id}-bodyClip)`} />
        <path d={rightCuffPath} fill="rgba(0,0,0,0.15)" clipPath={`url(#${id}-bodyClip)`} />
        <path d={hemPath}       fill="rgba(0,0,0,0.10)" clipPath={`url(#${id}-bodyClip)`} />

        {/* ── Collar ── */}
        <path d={collarOuter} fill={cc} />
        <path d={collarInner} fill={primaryColor} />
        {/* Collar shading */}
        <path d={collarOuter} fill="rgba(0,0,0,0.12)" />
        <path d={collarInner} fill="rgba(0,0,0,0.00)" />
        <path d={collarOuter} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.2} />
        <path d={collarInner} fill="none" stroke="rgba(0,0,0,0.35)"       strokeWidth={1.8} />
        {/* Collar highlight top */}
        <path d="M 162 83 C 175 71 226 71 238 83" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth={1.5} strokeLinecap="round" />

        {/* ── Badge ── */}
        <path d={badgePath} fill={secondaryColor} opacity={0.88} />
        <path d={badgePath} fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth={0.8} />
        {/* Badge shine */}
        <path d="M 122 172 L 134 172 L 134 183" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth={0.8} strokeLinecap="round" />

        {/* ── Number ── */}
        {/* Shadow layer */}
        <text x={203} y={343} textAnchor="middle" fontSize={80} fontWeight="900"
          fontFamily="'Arial Black',Arial,sans-serif"
          fill="rgba(0,0,0,0.20)" letterSpacing={-1}>
          {number}
        </text>
        {/* Main number */}
        <text x={200} y={340} textAnchor="middle" fontSize={80} fontWeight="900"
          fontFamily="'Arial Black',Arial,sans-serif"
          fill={numColor} letterSpacing={-1}>
          {number}
        </text>
        {/* Number highlight */}
        <text x={199} y={338} textAnchor="middle" fontSize={80} fontWeight="900"
          fontFamily="'Arial Black',Arial,sans-serif"
          fill={lightNum ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.14)'} letterSpacing={-1}>
          {number}
        </text>

        {/* ── Team code ── */}
        {teamCode && (
          <text x={200} y={376} textAnchor="middle" fontSize={14} fontWeight="700"
            fontFamily="Arial,sans-serif"
            fill={numColor} letterSpacing={5} opacity={0.82}>
            {teamCode}
          </text>
        )}
      </g>
    </svg>
  )
}
