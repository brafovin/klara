import JerseyIllustration from './JerseyIllustration'
import TshirtIllustration from './TshirtIllustration'
import HoodieIllustration from './HoodieIllustration'
import CapIllustration from './CapIllustration'
import ScarfIllustration from './ScarfIllustration'
import JacketIllustration from './JacketIllustration'

interface TeamColors {
  primary: string
  secondary: string
  accent: string
  stripe?: string
  collar?: string
  code: string
  flag: string
  pattern?: 'solid' | 'stripes' | 'diagonal' | 'hoops' | 'chevron' | 'yoke'
  scarfColor3?: string
}

export const TEAM_COLORS: Record<string, TeamColors> = {
  deutschland:  { primary: '#FFFFFF', secondary: '#000000', accent: '#DD0000', collar: '#000000', code: 'GER', flag: '🇩🇪', pattern: 'yoke' },
  brasilien:    { primary: '#FCD116', secondary: '#009B3A', accent: '#002776', collar: '#002776', code: 'BRA', flag: '🇧🇷', pattern: 'solid' },
  argentinien:  { primary: '#74ACDF', secondary: '#FFFFFF', accent: '#74ACDF', stripe: '#74ACDF', collar: '#FFFFFF', code: 'ARG', flag: '🇦🇷', pattern: 'hoops' },
  frankreich:   { primary: '#002395', secondary: '#FFFFFF', accent: '#ED2939', collar: '#ED2939', code: 'FRA', flag: '🇫🇷', pattern: 'solid' },
  spanien:      { primary: '#AA151B', secondary: '#F1BF00', accent: '#AA151B', collar: '#F1BF00', code: 'ESP', flag: '🇪🇸', pattern: 'solid' },
  england:      { primary: '#FFFFFF', secondary: '#CF091D', accent: '#CF091D', collar: '#CF091D', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pattern: 'solid' },
  portugal:     { primary: '#006600', secondary: '#FF0000', accent: '#FFD700', collar: '#FF0000', code: 'POR', flag: '🇵🇹', pattern: 'solid' },
  usa:          { primary: '#002868', secondary: '#BF0A30', accent: '#FFFFFF', stripe: '#BF0A30', collar: '#BF0A30', code: 'USA', flag: '🇺🇸', pattern: 'stripes' },
  mexiko:       { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126', collar: '#CE1126', code: 'MEX', flag: '🇲🇽', pattern: 'solid' },
  niederlande:  { primary: '#FF6600', secondary: '#003087', accent: '#FF6600', collar: '#003087', code: 'NED', flag: '🇳🇱', pattern: 'solid' },
  italien:      { primary: '#003DA5', secondary: '#FFFFFF', accent: '#009246', collar: '#FFFFFF', code: 'ITA', flag: '🇮🇹', pattern: 'solid' },
  japan:        { primary: '#FFFFFF', secondary: '#BC002D', accent: '#BC002D', collar: '#BC002D', code: 'JPN', flag: '🇯🇵', pattern: 'diagonal' },
  kroatien:     { primary: '#FF0000', secondary: '#FFFFFF', accent: '#002395', stripe: '#FFFFFF', collar: '#002395', code: 'CRO', flag: '🇭🇷', pattern: 'hoops' },
  marokko:      { primary: '#C1272D', secondary: '#006233', accent: '#C1272D', collar: '#006233', code: 'MAR', flag: '🇲🇦', pattern: 'solid' },
  senegal:      { primary: '#00853F', secondary: '#FFFFFF', accent: '#E31B23', stripe: '#E31B23', collar: '#FDEF42', code: 'SEN', flag: '🇸🇳', pattern: 'stripes' },
  australien:   { primary: '#00843D', secondary: '#FFD700', accent: '#00843D', collar: '#FFD700', code: 'AUS', flag: '🇦🇺', pattern: 'solid' },
  suedkorea:    { primary: '#FFFFFF', secondary: '#C60C30', accent: '#003478', collar: '#C60C30', code: 'KOR', flag: '🇰🇷', pattern: 'solid' },
  belgien:      { primary: '#EF3340', secondary: '#000000', accent: '#FFD700', collar: '#FFD700', code: 'BEL', flag: '🇧🇪', pattern: 'solid' },
  kanada:       { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000', collar: '#FFFFFF', code: 'CAN', flag: '🇨🇦', pattern: 'solid' },
  nigeria:      { primary: '#008751', secondary: '#FFFFFF', accent: '#008751', collar: '#FFFFFF', code: 'NGA', flag: '🇳🇬', pattern: 'solid' },
  tuerkei:      { primary: '#E30A17', secondary: '#FFFFFF', accent: '#E30A17', collar: '#FFFFFF', code: 'TUR', flag: '🇹🇷', pattern: 'solid' },
  schweiz:      { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000', collar: '#FFFFFF', code: 'SUI', flag: '🇨🇭', pattern: 'solid' },
  neutral:      { primary: '#111827', secondary: '#FCD116', accent: '#22c55e', collar: '#22c55e', code: 'WM', flag: '⚽', pattern: 'solid' },
  other:        { primary: '#6366f1', secondary: '#FFFFFF', accent: '#f59e0b', collar: '#FFFFFF', code: 'FAN', flag: '⚽', pattern: 'solid' },
}

interface Props {
  category?: string
  team?: string
  size?: number
  className?: string
}

export default function ProductIllustration({ category = 'tshirts', team = 'neutral', size = 400, className = '' }: Props) {
  const colors = TEAM_COLORS[team] || TEAM_COLORS['neutral']

  const containerStyle = {
    background: `linear-gradient(145deg, ${colors.primary}20 0%, ${colors.secondary}12 50%, ${colors.accent}10 100%)`,
  }

  const content = (() => {
    switch (category) {
      case 'trikots':
        return (
          <JerseyIllustration
            primaryColor={colors.primary}
            secondaryColor={colors.secondary}
            stripeColor={colors.stripe}
            accentColor={colors.accent}
            collarColor={colors.collar}
            number="10"
            teamCode={colors.code}
            size={size}
            pattern={colors.pattern}
          />
        )
      case 'hoodies':
        return <HoodieIllustration primaryColor={colors.primary} accentColor={colors.secondary} teamName={colors.code} size={size} />
      case 'jacken':
        return <JacketIllustration primaryColor={colors.primary} secondaryColor={colors.secondary} teamName={colors.code} size={size} />
      case 'caps':
        return <CapIllustration primaryColor={colors.primary} accentColor={colors.secondary} textColor={colors.accent} size={size} />
      case 'schals':
        return <ScarfIllustration color1={colors.primary} color2={colors.secondary} color3={colors.scarfColor3} text={colors.code} size={size} />
      case 'kinder':
        return (
          <JerseyIllustration
            primaryColor={colors.primary}
            secondaryColor={colors.secondary}
            stripeColor={colors.stripe}
            accentColor={colors.accent}
            collarColor={colors.collar}
            number="7"
            teamCode="KID"
            size={size}
            pattern={colors.pattern}
          />
        )
      case 'limited':
        return <TshirtIllustration primaryColor="#111827" graphicColor="#FCD116" text="WM 2026" subtext="LIMITED EDITION" graphic="star" size={size} />
      case 'tshirts':
      default:
        return <TshirtIllustration primaryColor={colors.primary} graphicColor={colors.secondary} text={colors.code} subtext="FAN 2026" graphic="ball" size={size} />
    }
  })()

  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`} style={containerStyle}>
      {content}
    </div>
  )
}
