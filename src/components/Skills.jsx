import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../data/content'

const Skills = () => {
  const marqueeRef = useRef(null)
  const marqueeRef2 = useRef(null)
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
          trigger: '#skills',
          start: 'top 75%',
        },
      })

      // Marquee animation - first row (left to right)
      const tl1 = gsap.timeline({ repeat: -1, yoyo: false })
      tl1
        .fromTo(
          marqueeRef.current,
          {
            x: 0,
          },
          {
            x: '-50%',
            duration: 30,
            ease: 'none',
          }
        )

      // Marquee animation - second row (right to left)
      const tl2 = gsap.timeline({ repeat: -1, yoyo: false })
      tl2
        .fromTo(
          marqueeRef2.current,
          {
            x: '100%',
          },
          {
            x: 0,
            duration: 35,
            ease: 'none',
          }
        )
    })

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    { name: 'Frontend', skills: siteContent.skills.Frontend, primary: true },
    { name: 'Backend', skills: siteContent.skills.Backend, primary: false },
    { name: 'Database', skills: siteContent.skills.Database, primary: false },
    { name: 'Tools', skills: siteContent.skills.Tools, primary: false },
  ]

  const allSkills = [
    ...siteContent.skills.Frontend.map((s) => ({ name: s, primary: true })),
    ...siteContent.skills.Backend.map((s) => ({ name: s, primary: false })),
    ...siteContent.skills.Database.map((s) => ({ name: s, primary: false })),
    ...siteContent.skills.Tools.map((s) => ({ name: s, primary: false })),
  ]

  return (
    <section id="skills" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-20">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">My Skills</h2>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((cat) => (
            <div key={cat.name} className="bg-surface p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors">
              <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-4 font-mono">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 text-xs font-mono rounded-full border ${
                      cat.primary
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-transparent bg-background text-gray-400'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Animation */}
        <div className="overflow-hidden py-8 border-t border-b border-accent/10 relative">
          {/* Gradients for fading effect on edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

          <div
            ref={marqueeRef}
            className="flex items-center gap-12 whitespace-nowrap animate-marquee"
            style={{ willChange: 'transform' }}
          >
            {[...allSkills, ...allSkills, ...allSkills].map((skill, idx) => (
              <span
                key={`${skill.name}-${idx}`}
                className={`text-xl md:text-2xl font-mono px-4 transition-colors ${
                  skill.primary ? 'text-accent drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
