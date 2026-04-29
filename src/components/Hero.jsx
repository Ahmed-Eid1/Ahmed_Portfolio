import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../data/content'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [showArrow, setShowArrow] = useState(false)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    let typeInterval;
    
    let ctx = gsap.context(() => {
      // Initial animations sequence
      const tl = gsap.timeline()

      // Navbar slide down
      tl.from('.navbar-fade', { y: -50, opacity: 0, duration: 0.6, ease: 'power3.out' }, 'start')

      // Name clip up
      .from(nameRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power4.inOut',
      }, 'start+=0.2')

      // Subtitle type animation
      .from(subtitleRef.current, {
        opacity: 0,
        duration: 0.5,
      }, 'name+=0.5')
      .to(subtitleRef.current, {
        opacity: 1,
        duration: 0,
      }, 'name+=0.5')

      // Typewriter effect for "Full Stack Developer"
      const fullText = 'Full Stack Developer'
      let currentText = ''
      let charIndex = 0

      typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          currentText += fullText[charIndex]
          setTypedText(currentText)
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 80)

      // CTA fade in
      tl.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, 'name+=0.8')

      // Scroll indicator appear after typing completes
      setTimeout(() => {
        setShowArrow(true)
        setTimeout(() => {
          gsap.from('.scroll-indicator', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
        }, 100)
      }, 1200)
    });

    return () => {
      ctx.revert();
      clearInterval(typeInterval);
    }
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative pt-20"
      style={{ minHeight: '100vh', color: '#FFFFFF' }}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-white text-5xl md:text-8xl font-serif mb-4 tracking-tighter drop-shadow-lg"
        >
          {siteContent.name}
        </h1>

        {/* Typewriter Subtitle */}
        <div ref={subtitleRef} className="mb-8 drop-shadow-md">
          <span className="text-accent font-mono text-xl md:text-2xl tracking-widest uppercase">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-gray-300 text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-body font-light drop-shadow">
          {siteContent.tagline}
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToProjects}
          className="inline-block px-10 py-4 bg-accent/10 border border-accent text-accent font-mono text-sm md:text-base uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] backdrop-blur-sm"
        >
          View My Work
        </button>

        {/* Scroll Indicator */}
        {showArrow && (
          <div className="scroll-indicator mt-24 flex flex-col items-center justify-center animate-bounce">
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-md"
            >
              <path d="M7 10l5 8 5-8" />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
