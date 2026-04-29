import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Section title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        },
      })

      // Left column animation
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 65%',
        },
      })

      // Right column animation
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '#about',
          start: 'top 65%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-16" ref={titleRef}>
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">About Me</h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div ref={leftRef} className="space-y-6">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-body font-light">
              {siteContent.bio}
            </p>
          </div>

          <div ref={rightRef} className="grid grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <h3 className="text-accent text-5xl md:text-7xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform origin-left">
                {siteContent.skills.Frontend.length + siteContent.skills.Backend.length + siteContent.skills.Database.length}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-mono">Technologies</p>
            </div>
            <div className="space-y-2 group">
              <h3 className="text-accent text-5xl md:text-7xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform origin-left">
                {siteContent.experience.length + 1}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-mono">Years Active</p>
            </div>
            <div className="space-y-2 group">
              <h3 className="text-accent text-5xl md:text-7xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform origin-left">
                {siteContent.projects.length}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-mono">Projects</p>
            </div>
            <div className="space-y-2 group">
              <h3 className="text-accent text-5xl md:text-7xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform origin-left">
                {siteContent.certifications.length}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-mono">Certifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
