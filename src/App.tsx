import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ClickSound, ClickSpark, ScrollProgress, SmoothScroll, Splash, WhatsAppFloat } from './components/ui/Effects'
import { brand, services } from './data/site'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const titles: Record<string, string> = { '/': brand.tagline, '/about': 'About us', '/services': 'Services', '/projects': 'Projects', '/contact': 'Contact' }

export default function App() {
  const loc = useLocation()
  useEffect(() => {
    const slug = loc.pathname.startsWith('/services/') ? services.find((s) => loc.pathname.endsWith(s.slug))?.title : undefined
    const t = slug ?? titles[loc.pathname] ?? 'Page not found'
    document.title = `${t} — ${brand.name}`
  }, [loc.pathname])
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Splash />
      <SmoothScroll />
      <ScrollProgress />
      <ClickSpark />
      <ClickSound />
      <WhatsAppFloat />
      <Navbar />
      <motion.main id="main" key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Suspense fallback={<div className="grid h-screen place-items-center bg-page text-accent">Loading…</div>}>
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
      <Footer />
    </>
  )
}
