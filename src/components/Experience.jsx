import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
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
          trigger: '#experience',
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
            trigger: '#experience',
            start: 'top 60%',
          },
        })
      }

      // Entry animations
      const entries = document.querySelectorAll('.timeline-entry')
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
    <section id="experience" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-20">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
            Work Experience
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

          {/* Entries */}
          <div className="space-y-12">
            {siteContent.experience.map((job, index) => (
              <div key={index} className="relative pl-12 md:pl-32 timeline-entry">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-5 h-5 bg-surface border-2 border-accent rounded-full hidden md:flex items-center justify-center z-10 shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full" />
                </div>

                {/* Job Content */}
                <div className="bg-surface p-6 md:p-8 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors shadow-lg hover:shadow-[0_10px_30px_rgba(45,212,191,0.1)]">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                    <h3 className="text-white text-2xl font-serif font-bold tracking-wide">
                      {job.title}
                    </h3>
                    <div className="text-accent font-mono text-sm whitespace-nowrap bg-accent/5 px-3 py-1 rounded-full border border-accent/20">
                      {job.period}
                    </div>
                  </div>

                  <div className="text-gray-300 text-lg mb-2 font-light">
                    {job.company}
                  </div>

                  <div className="text-gray-500 text-sm mb-6 flex items-center gap-2 font-mono">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.location}
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3">
                    {job.points.map((point, idx) => (
                      <li key={idx} className="text-gray-400 leading-relaxed font-body font-light flex items-start">
                        <span className="text-accent mr-3 mt-1 text-xs">◆</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
