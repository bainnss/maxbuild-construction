import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from '../common/ScrollProgress'
import ScrollToTop from '../common/ScrollToTop'
import CustomCursor from '../common/CustomCursor'
import LoadingScreen from '../common/LoadingScreen'
import PageTransition from './PageTransition'
import CTABanner from '../common/CTABanner'
import { useLenis } from '../../hooks/useLenis'

export default function MainLayout() {
  useLenis()
  const location = useLocation()
  const hideStickyCta = ['/contact', '/careers'].includes(location.pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
            {!hideStickyCta && <CTABanner />}
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
