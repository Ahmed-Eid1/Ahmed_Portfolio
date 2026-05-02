import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const cardRefs = useRef([])
  const titleRef = useRef(null)

  const handleCardClick = (project) => {
    if (project.liveSite) {
      window.open(project.liveSite, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Section title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%',
        },
      })

      // Card stagger animation
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
            Featured Projects
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {siteContent.projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleCardClick(project)}
              className={`project-card group bg-surface border border-accent/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(45,212,191,0.2)] hover:-translate-y-2 backdrop-blur-sm relative cursor-pointer hover:border-accent/50`}
            >
              {/* Top Border Accent */}
              <div className="h-1 bg-accent w-full transition-all duration-300 group-hover:h-2" />

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-bold group-hover:text-accent transition-colors drop-shadow-md">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.liveSite && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveSite, '_blank', 'noopener,noreferrer')
                        }}
                        className="text-gray-400 hover:text-accent transition-colors hover:scale-110"
                        aria-label="View Live Site"
                      >
                        <FaExternalLinkAlt size={24} />
                      </button>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent transition-colors hover:scale-110"
                      aria-label="View on GitHub"
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed font-body font-light">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Type */}
                <div className="text-sm text-gray-500 font-mono tracking-wider uppercase mt-4">
                  {project.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
