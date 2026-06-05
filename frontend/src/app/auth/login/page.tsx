'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()
  const login = useAuthStore(s => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = isRegister
        ? await authApi.register({ name, ...form })
        : await authApi.login(form)
      login(res.data.user, res.data.token)
      toast.success(isRegister ? 'Konto erstellt!' : 'Willkommen zurück!')
      router.push('/')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Fehler'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">⚽</div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              {isRegister ? 'Konto erstellen' : 'Willkommen zurück!'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {isRegister ? 'Werde Teil der WM-Fan-Community' : 'Melde dich in deinem Konto an'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="input-field" placeholder="Max Mustermann" required={isRegister} />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-Mail</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="input-field" placeholder="max@beispiel.de" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Passwort</label>
                {!isRegister && <Link href="/auth/forgot" className="text-xs text-primary-600 hover:underline">Vergessen?</Link>}
              </div>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="input-field" placeholder="••••••••" required minLength={6} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? '...' : isRegister ? '🚀 Konto erstellen' : '🔑 Anmelden'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-gray-500 dark:text-gray-400">
              {isRegister ? 'Bereits ein Konto? ' : 'Noch kein Konto? '}
              <span className="text-primary-600 hover:underline font-medium">
                {isRegister ? 'Anmelden' : 'Registrieren'}
              </span>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">Test-Admin: admin@wm2026shop.de / Admin1234!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
