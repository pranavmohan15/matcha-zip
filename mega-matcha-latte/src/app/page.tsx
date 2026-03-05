"use client";

import { useRef } from "react";
import { useScroll, motion, MotionValue, useTransform } from "framer-motion";
import MatchaCanvas from "../components/MatchaCanvas";

function BeatOverlay({
  progress,
  start,
  end,
  title,
  subtitle,
  align
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  title: string;
  subtitle: string | React.ReactNode;
  align: "left" | "center" | "right";
}) {
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [20, 0, 0, -20]
  );

  const alignClass =
    align === "center" ? "items-center text-center" :
      align === "left" ? "items-start text-left" :
        "items-end text-right";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} px-8 md:px-24 pointer-events-none`}
    >
      <div className="max-w-4xl pointer-events-auto">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-4 uppercase">
          {title}
        </h2>
        <div className="text-xl md:text-3xl font-light text-white/60 tracking-tight">
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-[#090E17] text-white min-h-screen smooth-scroll">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 z-50 flex items-center justify-between pointer-events-auto mix-blend-difference">
        <a href="#home" className="text-xl font-bold tracking-[0.2em] uppercase text-white cursor-pointer hover:text-[#00E5FF] transition-colors">Matcha</a>
        <div className="flex gap-6 md:gap-12 text-xs md:text-sm uppercase tracking-widest font-medium text-white/80">
          <a href="#home" className="hover:text-[#00E5FF] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#00E5FF] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#00E5FF] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Scrollytelling Section */}
      <section id="home" ref={containerRef} className="relative h-[400vh] w-full bg-[#090E17]">
        <MatchaCanvas scrollProgress={scrollYProgress} />

        {/* Sticky container for Beats overlay */}
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

          {/* Beat A: 0 - 20% */}
          <BeatOverlay
            progress={scrollYProgress}
            start={0} end={0.2}
            title="THE MEGA MATCHA"
            subtitle="A collision of calm and chaos."
            align="center"
          />

          {/* Beat B: 25 - 45% */}
          <BeatOverlay
            progress={scrollYProgress}
            start={0.25} end={0.45}
            title="PURE VELVET"
            subtitle="Artisan-milled green tea meets creamy perfection."
            align="left"
          />

          {/* Beat C: 50 - 70% */}
          <BeatOverlay
            progress={scrollYProgress}
            start={0.50} end={0.70}
            title="HIGH VELOCITY"
            subtitle="A sudden, explosive jolt of rich espresso and shattered ice."
            align="right"
          />

          {/* Beat D: 75 - 95% */}
          <BeatOverlay
            progress={scrollYProgress}
            start={0.75} end={0.95}
            title="TASTE THE IMPACT"
            subtitle={
              <div className="mt-12">
                <a href="#contact" className="inline-block px-10 py-5 bg-[#00E5FF] pointer-events-auto text-[#090E17] font-semibold text-lg tracking-[0.2em] uppercase rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(132,169,108,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]">
                  Order Yours Now
                </a>
              </div>
            }
            align="center"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-[100vh] bg-[#00E5FF] text-[#090E17] flex items-center justify-center p-8 md:p-24 overflow-hidden pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">The Art of<br /><span className="text-white">Precision.</span></h2>
            <div className="w-20 h-2 bg-[#090E17] mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80">
              Our Mega Matcha Latte is born from a rigorous obsession with quality. We source only the finest, first-harvest ceremonial grade matcha from Uji, Japan.
            </p>
            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80 mt-6">
              Blended with velvety micro-foamed oat milk and a violent shock of single-origin espresso, it’s not just a drink. It’s a kinetic experience built for those who never settle.
            </p>
          </div>
          <div className="relative aspect-square bg-[#090E17] rounded-[4rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('/sequence/frame_79.webp')] bg-cover bg-center opacity-70 mix-blend-screen scale-110 hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
              <div className="text-white">
                <div className="text-sm tracking-[0.2em] font-bold uppercase text-[#00E5FF] mb-2">Final Form</div>
                <div className="text-2xl font-light">The Perfect Collision</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-[80vh] bg-[#090E17] text-white flex flex-col items-center justify-center p-8 md:p-24 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl w-full"
        >
          <div className="inline-block px-4 py-2 border border-[#00E5FF]/50 rounded-full text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-8">Secure Yours</div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6 text-white drop-shadow-2xl">Imbibe the <br /><span className="text-[#00E5FF]">Chaos.</span></h2>
          <p className="text-xl text-white/50 mb-12 font-light">Visit our flagship concept stores or order the Mega drop online before it sells out.</p>

          <form className="flex flex-col gap-6 max-w-md mx-auto pointer-events-auto">
            <input type="email" placeholder="ENTER YOUR EMAIL" className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-5 text-white placeholder-white/40 focus:outline-none focus:border-[#00E5FF] transition-colors tracking-widest text-sm uppercase" />
            <button type="button" className="px-10 py-5 bg-white text-[#090E17] font-bold text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-[#00E5FF] hover:text-white transition-all duration-300 shadow-xl hover:shadow-[#00E5FF]/20 hover:-translate-y-1">
              Join the Waitlist
            </button>
          </form>

          <div className="mt-32 text-white/20 text-[10px] tracking-widest uppercase flex flex-col md:flex-row gap-4 items-center justify-center">
            <span>© 2026 Mega Matcha Ltd. All Rights Reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
