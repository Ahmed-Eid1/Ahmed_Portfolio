import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { siteContent } from '../data/content'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo('.menu-link', {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-accent/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Left */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}
          className="text-accent font-mono text-2xl font-bold tracking-widest hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
        >
          AE
        </a>

        {/* Desktop Nav - Right */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()) }}
              className="text-gray-300 hover:text-accent transition-colors relative group font-body text-sm uppercase tracking-widest"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {link}
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent transform scaleX-0 group-hover:scaleX-100 transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-xl md:hidden flex items-center justify-center border-t-4 border-accent">
          <button
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-8">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()) }}
                className="menu-link text-4xl font-serif text-white hover:text-accent hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
