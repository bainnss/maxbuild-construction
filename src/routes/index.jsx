import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from '../components/layout/MainLayout'
import ProtectedRoute from '../admin/components/ProtectedRoute'
import AdminLayout from '../admin/layouts/AdminLayout'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Services = lazy(() => import('../pages/Services'))
const Projects = lazy(() => import('../pages/Projects'))
const ProjectDetails = lazy(() => import('../pages/ProjectDetails'))
const Team = lazy(() => import('../pages/Team'))
const Careers = lazy(() => import('../pages/Careers'))
const FAQ = lazy(() => import('../pages/FAQ'))
const Contact = lazy(() => import('../pages/Contact'))

const AdminLogin = lazy(() => import('../admin/pages/Login'))
const AdminDashboard = lazy(() => import('../admin/pages/Dashboard'))
const AdminProjects = lazy(() => import('../admin/pages/Projects'))
const ProjectForm = lazy(() => import('../admin/pages/Projects/ProjectForm'))
const ProjectDetailsAdmin = lazy(() => import('../admin/pages/Projects/ProjectDetails'))
const AdminServices = lazy(() => import('../admin/pages/Services'))
const AdminTeam = lazy(() => import('../admin/pages/Team'))
const AdminClients = lazy(() => import('../admin/pages/Clients'))
const AdminSettings = lazy(() => import('../admin/pages/Settings'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-28" role="status" aria-label="Loading page">
      <div className="h-10 w-10 animate-pulse rounded-sm border border-accent/40 bg-accent/20" />
    </div>
  )
}

export default function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: '#1A1B5D',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: { iconTheme: { primary: '#00AEEF', secondary: '#fff' } },
          error: { iconTheme: { primary: '#F43F5E', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/:id" element={<ProjectDetailsAdmin />} />
              <Route path="projects/:id/edit" element={<ProjectForm />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetails />} />
            <Route path="team" element={<Team />} />
            <Route path="careers" element={<Careers />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="section-pad container-premium pt-40 text-center">
                  <h1 className="font-display text-4xl font-semibold text-white">Page not found</h1>
                  <p className="mt-4 text-slate-400">The page you requested could not be found.</p>
                  <a href="/" className="link-underline mt-8 inline-block text-accent">
                    Return home
                  </a>
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
