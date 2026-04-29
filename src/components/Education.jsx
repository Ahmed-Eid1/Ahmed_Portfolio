import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const Education = () => {
  const timelineRef = useRef(null)
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
          trigger: '#education',
          start: 'top 75%',
        },
      })

      // Timeline line draw animation
      const timelineEl = timelineRef.current
      if (timelineEl) {
        const length = timelineEl.getTotalLength()
        gsap.set(timelineEl, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(timelineEl, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#education',
            start: 'top 60%',
          },
        })
      }

      // Entry animations
      const entries = document.querySelectorAll('.edu-entry')
      entries.forEach((entry, index) => {
        gsap.from(entry, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 70%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-20">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
            Education
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <svg
            className="absolute left-[15px] top-0 bottom-0 w-0.5 h-full hidden md:block"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
          >
            <path ref={timelineRef} d="M0.5,0 L0.5,100" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Education Entry */}
          <div className="pl-12 md:pl-32 mb-12 edu-entry">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-0 w-5 h-5 bg-surface border-2 border-accent rounded-full hidden md:flex items-center justify-center z-10 shadow-[0_0_10px_rgba(45,212,191,0.5)]">
              <div className="w-2.5 h-2.5 bg-accent rounded-full" />
            </div>

            {/* Education Content */}
            <div className="bg-surface p-6 md:p-8 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors shadow-lg hover:shadow-[0_10px_30px_rgba(45,212,191,0.1)]">
              <h3 className="text-white text-2xl font-serif font-bold mb-2 tracking-wide">
                {siteContent.education[0].degree}
              </h3>
              <div className="text-accent text-lg mb-4 font-mono">
                {siteContent.education[0].institution}
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-gray-500 mb-6 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="2" r="2" />
                    <path d="M21 7.86a9 9 0 0 1-18 0v.28c0 .84-.26 1.64-.72 2.28l-1.1 1.34a10.02 10.02 0 0 0 18.24 0l-1.1-1.34a4.94 4.94 0 0 1-.72-2.28v-.28Z" />
                    <path d="M8 14a4 4 0 0 0 8 0" />
                    <path d="M12 14v8" />
                  </svg>
                  {siteContent.education[0].location}
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {siteContent.education[0].period}
                </div>
              </div>
              <div className="text-gray-400 italic font-light">
                {siteContent.education[0].note}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="pl-12 md:pl-32 edu-entry mt-16">
            <h3 className="text-white text-2xl font-serif font-bold mb-8">
              Certifications
            </h3>

            <div className="space-y-6 relative">
              {siteContent.certifications.map((cert, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[3.8rem] md:-left-[8.8rem] top-3 w-4 h-4 bg-surface border-2 border-accent rounded-full hidden md:flex items-center justify-center z-10 shadow-[0_0_8px_rgba(45,212,191,0.5)]">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>

                  <div className="bg-surface p-5 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors shadow-lg w-full md:w-auto md:min-w-[300px] hover:shadow-[0_10px_30px_rgba(45,212,191,0.05)] hover:-translate-y-1">
                    <h4 className="text-white font-serif text-lg mb-2">{cert.title}</h4>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                      <span className="text-accent font-mono bg-accent/5 px-2 py-0.5 rounded">{cert.issuer}</span>
                      <span className="font-mono border-l border-gray-600 pl-4 py-0.5">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
