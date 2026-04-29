import { useEffect, useState, useRef } from 'react'
import { siteContent } from './data/content'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Languages from './components/Languages'
import Contact from './components/Contact'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Settings, Database } from 'lucide-react'
import backgroundImage from '../Enhance Portfolio with Animations/src/imports/brian-patrick-tagalog-_8hGFBxWD0A-unsplash.jpg'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [cursorX, setCursorX] = useState(0)
  const [cursorY, setCursorY] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Custom cursor effect
  useEffect(() => {
    // Check if touch device
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (hasTouch) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Track mouse position
    const handleMouseMove = (e) => {
      setCursorX(e.clientX)
      setCursorY(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    // Reveal all sections on load
    const sections = document.querySelectorAll('section')
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )
    })

    // Refresh ScrollTrigger after all animations complete
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(refreshTimeout)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-black overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>
      <DynamicBackground scrollProgress={scrollYProgress} />
      <AnimatedBackground scrollProgress={scrollYProgress} />
      <FloatingTechLogos scrollProgress={scrollYProgress} />
      
      <Navbar />

      {/* Custom Cursor */}
      <div
        className="cursor-dot"
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
        }}
      />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Languages />
        <Contact />
      </div>
    </div>
  )
}

function DynamicBackground({ scrollProgress }) {
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.35, 1.7]);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0.75, 0.95, 0.85, 0.7]);
  const brightness = useTransform(scrollProgress, [0, 0.5, 1], [1, 0.85, 0.7]);
  const blurValue = useTransform(scrollProgress, [0, 0.5, 1], [0, 1.5, 3.5]);

  const filter = useTransform(
    [blurValue, brightness],
    ([blur, bright]) => `blur(${blur}px) brightness(${bright})`
  );

  return (
    <div className="fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          scale,
          y,
          opacity,
          filter,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black/40 to-teal-950/35"
        style={{
          opacity: useTransform(scrollProgress, [0, 0.5, 1], [0.6, 0.75, 0.85])
        }}
      />
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
}

function AnimatedBackground({ scrollProgress }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 backdrop-blur-3xl" />
      {[...Array(12)].map((_, i) => (
        <FloatingGear key={i} index={i} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}

function FloatingGear({ index, scrollProgress }) {
  const positions = [
    { x: "10%", y: "10%" },
    { x: "80%", y: "20%" },
    { x: "15%", y: "60%" },
    { x: "70%", y: "70%" },
    { x: "40%", y: "30%" },
    { x: "60%", y: "85%" },
    { x: "25%", y: "45%" },
    { x: "85%", y: "50%" },
    { x: "50%", y: "15%" },
    { x: "5%", y: "75%" },
    { x: "90%", y: "40%" },
    { x: "35%", y: "90%" }
  ];

  const pos = positions[index];
  const delay = index * 1.2;
  const duration = 25 + index * 3;

  const opacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [0.03, 0.06, 0.04, 0.02]
  );

  return (
    <motion.div
      className="absolute backdrop-blur-sm"
      style={{
        left: pos.x,
        top: pos.y,
        opacity,
        filter: "blur(1px)"
      }}
      initial={{ scale: 0.3, rotate: 0 }}
      animate={{
        scale: [0.3, 1.8, 0.6, 1.4, 0.3],
        rotate: index % 2 === 0 ? [0, 360] : [360, 0],
        x: [0, index % 2 === 0 ? 150 : -150, 0],
        y: [0, index % 3 === 0 ? -120 : 120, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
    >
      <div className="relative">
        <Settings
          size={50 + index * 12}
          className="text-emerald-900/25"
          strokeWidth={1}
        />
        <div className="absolute inset-0 blur-xl">
          <Settings
            size={50 + index * 12}
            className="text-teal-950/20"
            strokeWidth={1}
          />
        </div>
      </div>
    </motion.div>
  );
}

function FloatingTechLogos({ scrollProgress }) {
  const logos = [
    { name: "React", color: "text-emerald-500/35", symbol: "⚛️", size: 60 },
    { name: "JS", color: "text-teal-600/35", symbol: "JS", size: 50 },
    { name: "HTML", color: "text-emerald-700/35", symbol: "<>", size: 55 },
    { name: "Node", color: "text-teal-800/35", symbol: "⬢", size: 65 },
    { name: "CSS", color: "text-emerald-600/35", symbol: "#", size: 50 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {logos.map((logo, i) => (
        <TechLogo
          key={logo.name}
          logo={logo}
          index={i}
          scrollProgress={scrollProgress}
        />
      ))}
      <DatabaseIcon scrollProgress={scrollProgress} />
    </div>
  );
}

function TechLogo({ logo, index, scrollProgress }) {
  // Use a simpler approach to avoid window size issues during SSR
  const startPositions = [
    { x: 100, y: 150 },
    { x: 800, y: 200 },
    { x: 200, y: 600 },
    { x: 800, y: 550 },
    { x: 500, y: 300 }
  ];

  const x = useTransform(
    scrollProgress,
    [0, 0.3, 0.6, 1],
    [
      startPositions[index].x,
      startPositions[index].x + (index % 2 === 0 ? 200 : -200),
      startPositions[index].x + (index % 2 === 0 ? -150 : 150),
      startPositions[index].x + (index % 2 === 0 ? 100 : -100)
    ]
  );

  const y = useTransform(
    scrollProgress,
    [0, 0.3, 0.6, 1],
    [
      startPositions[index].y,
      startPositions[index].y + (index % 3 === 0 ? -180 : 180),
      startPositions[index].y + 300,
      startPositions[index].y + 450
    ]
  );

  const rotate = useTransform(scrollProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollProgress, [0, 0.4, 0.7, 1], [1, 1.3, 0.9, 0.7]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0.5, 0.7, 0.5, 0.3]);

  return (
    <motion.div
      className={`absolute ${logo.color} font-bold flex items-center justify-center backdrop-blur-md`}
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        fontSize: `${logo.size}px`,
        filter: "blur(0.5px)",
        textShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 5 + index * 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {logo.symbol}
    </motion.div>
  );
}

function DatabaseIcon({ scrollProgress }) {
  const x = useTransform(scrollProgress, [0, 0.5, 1], [150, 500, 850]);
  const y = useTransform(scrollProgress, [0, 0.4, 0.8, 1], [400, 250, 500, 650]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0.4, 0.6, 0.5, 0.3]);

  return (
    <motion.div
      className="absolute backdrop-blur-sm"
      style={{ x, y, rotate, opacity, filter: "blur(0.5px)" }}
    >
      <Database size={70} className="text-teal-700/40 drop-shadow-2xl" strokeWidth={1.5} />
    </motion.div>
  );
}

export default App
