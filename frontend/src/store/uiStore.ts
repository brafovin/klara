import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  darkMode: boolean
  language: 'de' | 'en' | 'es'
  isCartOpen: boolean
  toggleDarkMode: () => void
  setLanguage: (lang: 'de' | 'en' | 'es') => void
  setCartOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      darkMode: false,
      language: 'de',
      isCartOpen: false,
      toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newMode)
        }
        return { darkMode: newMode }
      }),
      setLanguage: (language) => set({ language }),
      setCartOpen: (isCartOpen) => set({ isCartOpen }),
    }),
    { name: 'wm2026-ui' }
  )
)
