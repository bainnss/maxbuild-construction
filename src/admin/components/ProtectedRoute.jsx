import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCmsStore } from '../../store/cmsStore'

export default function ProtectedRoute() {
  const ready = useAuthStore((s) => s.ready)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const fetchAdmin = useCmsStore((s) => s.fetchAdmin)
  const adminHydrated = useCmsStore((s) => s.adminHydrated)
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated && !adminHydrated) {
      fetchAdmin().catch(() => {})
    }
  }, [isAuthenticated, adminHydrated, fetchAdmin])

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-navy text-slate-400">
        Checking session…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
