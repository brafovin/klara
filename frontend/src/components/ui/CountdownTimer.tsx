'use client'
import { useState, useEffect } from 'react'

interface Props {
  targetDate: Date
  label?: string
}

export default function CountdownTimer({ targetDate, label = 'WM-Finale' }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { label: 'Tage', value: timeLeft.days },
    { label: 'Std', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sek', value: timeLeft.seconds },
  ]

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider font-medium">
        ⏱ Countdown bis zum {label}
      </p>
      <div className="flex gap-3 justify-center">
        {units.map(unit => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-2xl md:text-3xl tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-medium">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
