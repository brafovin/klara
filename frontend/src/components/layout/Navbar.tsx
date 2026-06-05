'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchBar from '@/components/ui/SearchBar'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const itemCount = useCartStore(s => s.itemCount())
  const { user, logout, isAuthenticated } = useAuthStore()
  const { darkMode, toggleDarkMode, language, setLanguage, setCartOpen } = useUIStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const navLinks = [
    { href: '/', label: language === 'de' ? 'Start' : language === 'en' ? 'Home' : 'Inicio' },
    { href: '/shop', label: language === 'de' ? 'Shop' : 'Shop' },
    { href: '/shop?category=trikots', label: language === 'de' ? 'Trikots' : language === 'en' ? 'Jerseys' : 'Camisetas' },
    { href: '/shop?category=limited', label: language === 'de' ? 'Limited' : 'Limited' },
  ]

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md' : 'bg-white dark:bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-black text-sm">⚽</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-gray-900 dark:text-white leading-tight text-sm">WM 2026</div>
                <div className="text-xs text-primary-600 font-semibold leading-tight">Fan Shop</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-all">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <SearchBar />

              {/* Language */}
              <select value={language} onChange={e => setLanguage(e.target.value as 'de'|'en'|'es')}
                className="hidden sm:block text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-transparent text-gray-600 dark:text-gray-400 cursor-pointer">
                <option value="de">🇩🇪 DE</option>
                <option value="en">🇬🇧 EN</option>
                <option value="es">🇪🇸 ES</option>
              </select>

              {/* Dark mode */}
              <button onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Toggle dark mode">
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    <span>👤</span>
                    <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 hidden group-hover:block z-50">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {language === 'de' ? 'Mein Konto' : 'My Account'}
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {language === 'de' ? 'Bestellungen' : 'Orders'}
                    </Link>
                    {user?.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 font-medium">
                        Admin
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700">
                      {language === 'de' ? 'Abmelden' : 'Logout'}
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <span>🔑</span>
                  <span>{language === 'de' ? 'Anmelden' : 'Login'}</span>
                </Link>
              )}

              {/* Cart button */}
              <button onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-colors shadow-md hover:shadow-lg"
                aria-label="Cart">
                🛒
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-100 dark:border-gray-800">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg">
                  🔑 {language === 'de' ? 'Anmelden / Registrieren' : 'Login / Register'}
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      <CartDrawer />
    </>
  )
}
