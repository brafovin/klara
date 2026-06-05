import JerseyIllustration from './JerseyIllustration'
import TshirtIllustration from './TshirtIllustration'
import HoodieIllustration from './HoodieIllustration'
import CapIllustration from './CapIllustration'
import ScarfIllustration from './ScarfIllustration'
import JacketIllustration from './JacketIllustration'

const TEAM_COLORS: Record<string, { primary: string; secondary: string; accent: string; code: string; flag: string }> = {
  deutschland: { primary: '#FFFFFF', secondary: '#1a1a1a', accent: '#DC0000', code: 'GER', flag: '🇩🇪' },
  brasilien:   { primary: '#FFD700', secondary: '#009B3A', accent: '#002776', code: 'BRA', flag: '🇧🇷' },
  argentinien: { primary: '#74ACDF', secondary: '#FFFFFF', accent: '#74ACDF', code: 'ARG', flag: '🇦🇷' },
  frankreich:  { primary: '#002395', secondary: '#FFFFFF', accent: '#ED2939', code: 'FRA', flag: '🇫🇷' },
  spanien:     { primary: '#AA151B', secondary: '#F1BF00', accent: '#AA151B', code: 'ESP', flag: '🇪🇸' },
  england:     { primary: '#FFFFFF', secondary: '#CF091D', accent: '#CF091D', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  portugal:    { primary: '#006600', secondary: '#FF0000', accent: '#FFD700', code: 'POR', flag: '🇵🇹' },
  usa:         { primary: '#002868', secondary: '#BF0A30', accent: '#FFFFFF', code: 'USA', flag: '🇺🇸' },
  mexiko:      { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126', code: 'MEX', flag: '🇲🇽' },
  neutral:     { primary: '#22c55e', secondary: '#1a1a1a', accent: '#3b82f6', code: 'WM', flag: '⚽' },
  other:       { primary: '#6366f1', secondary: '#FFFFFF', accent: '#f59e0b', code: 'FAN', flag: '⚽' },
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
    background: `linear-gradient(135deg, ${colors.primary}18 0%, ${colors.secondary}10 100%)`,
  }

  const content = (() => {
    switch (category) {
      case 'trikots':
        return <JerseyIllustration primaryColor={colors.primary} secondaryColor={colors.secondary} accentColor={colors.accent} number="10" teamCode={colors.code} size={size} />
      case 'hoodies':
        return <HoodieIllustration primaryColor={colors.primary} pocketColor={colors.secondary} teamName={colors.code} size={size} />
      case 'jacken':
        return <JacketIllustration primaryColor={colors.primary} secondaryColor={colors.secondary} teamName={colors.code} size={size} />
      case 'caps':
        return <CapIllustration primaryColor={colors.primary} accentColor={colors.secondary} size={size} />
      case 'schals':
        return <ScarfIllustration color1={colors.primary} color2={colors.secondary} text={colors.code} size={size} />
      case 'kinder':
        return <JerseyIllustration primaryColor={colors.primary} secondaryColor={colors.secondary} accentColor={colors.accent} number="11" teamCode="KID" size={size} />
      case 'limited':
        return <TshirtIllustration primaryColor="#111827" accentColor="#fbbf24" text="WM 2026" size={size} />
      case 'tshirts':
      default:
        return <TshirtIllustration primaryColor={colors.primary} accentColor={colors.secondary} text={colors.code} size={size} />
    }
  })()

  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`} style={containerStyle}>
      {content}
    </div>
  )
}
