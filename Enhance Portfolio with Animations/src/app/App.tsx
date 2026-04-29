import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { Settings, Database, Code2 } from "lucide-react";
import backgroundImage from "../imports/brian-patrick-tagalog-_8hGFBxWD0A-unsplash.jpg";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-black overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>
      <DynamicBackground scrollProgress={scrollYProgress} />
      <AnimatedBackground scrollProgress={scrollYProgress} />
      <FloatingTechLogos scrollProgress={scrollYProgress} />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </div>
    </div>
  );
}

function DynamicBackground({ scrollProgress }: { scrollProgress: any }) {
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

function AnimatedBackground({ scrollProgress }: { scrollProgress: any }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-3xl" />
      {[...Array(12)].map((_, i) => (
        <FloatingGear key={i} index={i} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}

function FloatingGear({ index, scrollProgress }: { index: number; scrollProgress: any }) {
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

function FloatingTechLogos({ scrollProgress }: { scrollProgress: any }) {
  const logos = [
    { name: "React", color: "text-emerald-500/35", symbol: "⚛️", size: 60 },
    { name: "JS", color: "text-teal-600/35", symbol: "JS", size: 50 },
    { name: "HTML", color: "text-emerald-700/35", symbol: "<>", size: 55 },
    { name: "Node", color: "text-teal-800/35", symbol: "⬢", size: 65 },
    { name: "CSS", color: "text-emerald-600/35", symbol: "#", size: 50 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
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

function TechLogo({ logo, index, scrollProgress }: any) {
  const startPositions = [
    { x: 100, y: 150 },
    { x: window.innerWidth - 150, y: 200 },
    { x: 200, y: window.innerHeight - 200 },
    { x: window.innerWidth - 200, y: window.innerHeight - 250 },
    { x: window.innerWidth / 2, y: 300 }
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

function DatabaseIcon({ scrollProgress }: any) {
  const x = useTransform(scrollProgress, [0, 0.5, 1], [150, window.innerWidth / 2, window.innerWidth - 150]);
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

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%", fontFamily: "'Playfair Display', serif" }}
        >
          Developer
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-emerald-100/80 mb-8 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Building the future, one line at a time
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="px-8 py-3 bg-emerald-900 text-gray-100 rounded-full hover:bg-emerald-800 transition-all duration-500 shadow-xl"
          >
            View Projects
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20, 184, 166, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="px-8 py-3 border-2 border-teal-700 text-emerald-200 rounded-full hover:bg-teal-950/40 transition-all duration-500 shadow-xl backdrop-blur-sm"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <motion.h2
          className="text-6xl font-bold text-emerald-100 mb-8 drop-shadow-xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
          animate={isInView ? {
            scale: [1, 1.03, 1],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="space-y-6 text-lg text-gray-100/90"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1.8 }}
        >
          <p className="drop-shadow-lg">
            I'm a passionate full-stack developer with expertise in modern web technologies.
            I love creating beautiful, performant applications that solve real-world problems.
          </p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {["React", "Node.js", "TypeScript", "Tailwind"].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 1.2 + i * 0.25, duration: 1.2 }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -3, 3, 0],
                  transition: { duration: 0.6 }
                }}
                className="p-4 bg-black/70 backdrop-blur-md rounded-lg border border-emerald-800/50 text-center shadow-xl hover:border-emerald-600/70 transition-all duration-500"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const projects = [
    { title: "E-Commerce Platform", tech: "React, Node.js, MongoDB" },
    { title: "Task Manager", tech: "TypeScript, PostgreSQL" },
    { title: "Social Dashboard", tech: "Next.js, Tailwind" }
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-6xl font-bold text-emerald-100 mb-12 text-center drop-shadow-xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ delay: i * 0.4, duration: 1.5, ease: "easeOut" }}
              whileHover={{
                y: -15,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="relative group"
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-black/80 to-emerald-950/60 backdrop-blur-md rounded-xl border border-emerald-800/50 overflow-hidden shadow-2xl"
                whileHover={{ boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)" }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/0 via-emerald-800/25 to-emerald-900/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 ease-in-out" />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Code2 className="mb-4 text-emerald-500" size={40} strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold text-emerald-100 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-200/90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{project.tech}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}