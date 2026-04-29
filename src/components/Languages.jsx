import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const Languages = () => {
  const barRefs = useRef([])
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
          trigger: '#languages',
          start: 'top 75%',
        },
      })

      // Progress bar animations
      const entries = document.querySelectorAll('.language-entry')
      entries.forEach((entry, index) => {
        const bar = barRefs.current[index]

        gsap.from(bar, {
          width: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: index * 0.5,
          scrollTrigger: {
            trigger: entry,
            start: 'top 60%',
          },
        })
      })

      // Label animations
      entries.forEach((entry, index) => {
        const label = entry.querySelector('.lang-label')
        if (label) {
          gsap.from(label, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.5 + 0.2,
            scrollTrigger: {
              trigger: entry,
              start: 'top 65%',
            },
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="languages" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
            Languages
          </h2>
        </div>

        {/* Language Entries */}
        <div className="grid gap-8 max-w-2xl mx-auto">
          {siteContent.languages.map((lang, index) => (
            <div
              key={index}
              ref={(el) => (el ? (el.id = `lang-${index}`) : null)}
              className="language-entry bg-surface p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(45,212,191,0.05)] hover:-translate-y-1"
            >
              {/* Label */}
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-white text-xl font-serif font-bold lang-label tracking-wide">
                  {lang.name}
                </h3>
                <span className="text-gray-400 text-sm font-mono bg-background px-2 py-0.5 rounded border border-accent/5">
                  {lang.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 bg-background rounded-full overflow-hidden border border-accent/10">
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  className="h-full bg-accent rounded-full relative"
                  style={{ width: `${lang.percent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-full"></div>
                </div>
              </div>

              {/* Percentage */}
              <div className="flex justify-end mt-2">
                <span className="text-accent text-xs font-mono drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]">{lang.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages
