import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginSchema } from '../../validation/schemas'
import { useAuthStore } from '../../../store/authStore'
import { useCmsStore } from '../../../store/cmsStore'
import Logo from '../../../components/common/Logo'
import { Field, inputClass } from '../../components/ui/primitives'

export default function AdminLogin() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useAuthStore((s) => s.login)
  const fetchAdmin = useCmsStore((s) => s.fetchAdmin)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', remember: true },
  })

  if (isAuthenticated) return <Navigate to="/admin" replace />

  const onSubmit = async (data) => {
    const result = await login(data.username, data.password, data.remember)
    if (!result.ok) {
      toast.error(result.error || 'Login failed')
      return
    }
    try {
      await fetchAdmin()
    } catch {
      /* public content still works; admin lists will retry */
    }
    toast.success('Login successful')
    navigate('/admin', { replace: true })
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-navy px-4 py-10">
      <div className="absolute inset-0 brand-orb opacity-25" />
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-navy-light/70 p-7 shadow-premium backdrop-blur-xl md:p-8"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 rounded-xl  px-4 py-3">
            <Logo type="nav " variant="compact" className="object-center" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-white">Admin Console</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage MaxBuild content, projects, and team.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Field label="Username" error={errors.username?.message}>
            <div className="relative">
              <User size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
              <input
                className={`${inputClass} pl-10`}
                autoComplete="username"
                placeholder="admin"
                {...register('username')}
              />
            </div>
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                className={`${inputClass} pr-10 pl-10`}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-white"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="rounded border-white/20" {...register('remember')} />
              Remember me
            </label>
            <button
              type="button"
              disabled
              className="cursor-not-allowed text-slate-500"
              title="Disabled in demo"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent-deep py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_40px_-12px_rgba(0,136,206,0.65)] transition hover:bg-accent disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
