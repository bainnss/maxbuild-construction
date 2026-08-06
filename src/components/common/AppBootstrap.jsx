import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useCmsStore } from '../../store/cmsStore'

export default function AppBootstrap() {
  const hydrate = useAuthStore((s) => s.hydrate)
  const fetchPublic = useCmsStore((s) => s.fetchPublic)

  useEffect(() => {
    hydrate()
    fetchPublic()
  }, [hydrate, fetchPublic])

  return null
}
