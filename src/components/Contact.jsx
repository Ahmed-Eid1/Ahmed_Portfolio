import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/content'
import * as emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  const formRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Section title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Magnetic hover effect for button
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: Math.max(-8, Math.min(8, x * 0.15)),
        y: Math.max(-8, Math.min(8, y * 0.15)),
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('submitting')

    // EmailJS configuration - replace with actual credentials
    const serviceID = 'service_portfolio'
    const templateID = 'template_contact'
    const userID = 'YOUR_EMAILJS_KEY'

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      })
      .catch(() => {
        setFormStatus('error')
      })
  }

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
            Let's build something.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-mono mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface border border-accent/20 text-white p-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-gray-600 shadow-inner"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-mono mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-surface border border-accent/20 text-white p-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-gray-600 shadow-inner"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm font-mono mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full bg-surface border border-accent/20 text-white p-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-gray-600 shadow-inner"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className="relative overflow-hidden bg-accent/10 border border-accent text-accent px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-[#0A0A0A] disabled:opacity-50 w-full md:w-auto shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] backdrop-blur-sm"
              >
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Sent!'}
                {formStatus === 'error' && 'Try Again'}
              </button>

              {formStatus === 'success' && (
                <p className="text-accent mt-4 text-center drop-shadow-md">Thanks for reaching out!</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-500 mt-4 text-center">Something went wrong. Try again!</p>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="space-y-6 text-gray-400 mb-8 font-light">
                <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-accent/10 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.8)]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <p className="text-white font-bold tracking-wide">{siteContent.name}</p>
                    <p className="font-mono text-sm text-accent">{siteContent.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-accent/10 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.8)]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-white font-bold tracking-wide">{siteContent.name}</p>
                    <p className="font-mono text-sm text-accent">{siteContent.phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={siteContent.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-surface border border-accent/20 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                >
                  <FaGithub size={24} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={siteContent.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-surface border border-accent/20 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                >
                  <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={siteContent.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-surface border border-accent/20 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                >
                  <FaInstagram size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
