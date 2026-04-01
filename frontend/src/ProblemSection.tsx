import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/* ── Animated Counter Hook ── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

const painPoints = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "¿Dónde dejé la cartilla de vacunación?",
    desc: "Papeles perdidos cuando más los necesitás.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Olvidé la fecha de la desparasitación",
    desc: "La salud no puede depender de tu memoria.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "¿Cuál es el veterinario de guardia hoy?",
    desc: "Búsquedas desesperadas en momentos críticos.",
  },
];

const ProblemSection: React.FC = () => {
  const counter1 = useCountUp(68);
  const counter2Start = useRef(false);
  const [count2, setCount2] = useState(0);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref2.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counter2Start.current) {
          counter2Start.current = true;
          setCount2(4);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <img src="/huella.png" alt="" className="absolute bottom-12 right-[7%] w-14 h-14 opacity-[0.03] rotate-[20deg] pointer-events-none select-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* ── TITLE ROW — spans left + center columns ── */}
        <div className="lg:mb-[-2rem]">
          <Reveal>
            <span className="font-heading text-xs sm:text-sm font-bold tracking-[0.18em] text-[#EF4444] mb-4 uppercase block">
              El problema actual
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#111827] leading-[1.12] mb-10 lg:mb-12 lg:w-[68%]">
              Cuidar a tu mascota no debería ser un{" "}
              <span className="text-[#EF4444]">caos</span> administrativo.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10 xl:gap-16">
          {/* ── LEFT: PAIN POINTS ── */}
          <div className="w-full lg:w-[40%] flex flex-col">
            {/* Title shown only on mobile (already rendered above for desktop) */}
            <div className="lg:hidden">
              <Reveal>
                <span className="font-heading text-xs sm:text-sm font-bold tracking-[0.18em] text-[#EF4444] mb-4 uppercase block">
                  El problema actual
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] leading-[1.12] mb-10">
                  Cuidar a tu mascota no debería ser un{" "}
                  <span className="text-[#EF4444]">caos</span> administrativo.
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col gap-7">
              {painPoints.map((point, i) => (
                <Reveal key={i} delay={200 + i * 150}>
                  <div className="flex items-start gap-4 group">
                    <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-[#EF4444] transition-all duration-300 group-hover:bg-[#EF4444] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-400/20">
                      {point.icon}
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-[#111827] leading-snug">
                        {point.title}
                      </p>
                      <p className="font-body text-sm text-[#9CA3AF] mt-1">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── CENTER: DOG IMAGE ── */}
          <Reveal delay={300} className="w-full lg:w-[30%] flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#67D1E3]/20 to-[#0EA5B7]/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-[280px] h-[320px] sm:w-[300px] sm:h-[360px] lg:w-[320px] lg:h-[400px] rounded-3xl overflow-hidden shadow-xl shadow-black/8 border border-[#E5E7EB] transition-transform duration-500 group-hover:scale-[1.02]">
                <img src="/perro.png" alt="Mascota" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: STAT CARDS ── */}
          <div className="w-full lg:w-[30%] flex flex-row lg:flex-col gap-5 sm:gap-6">
            <Reveal delay={400} className="flex-1">
              <div
                ref={counter1.ref}
                className="bg-red-50/60 border border-red-100/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-glow"
              >
                <span className="block font-heading text-4xl sm:text-5xl font-extrabold text-[#EF4444] mb-3">
                  {counter1.count}%
                </span>
                <p className="font-body text-sm sm:text-[15px] text-[#6B7280] leading-snug">
                  De dueños olvidan al menos 1 vacuna anual.
                </p>
              </div>
            </Reveal>

            <Reveal delay={550} className="flex-1">
              <div
                ref={ref2}
                className="bg-[#E0F7FA]/40 border border-[#A5F3FC]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-glow"
              >
                <span className="block font-heading text-4xl sm:text-5xl font-extrabold text-[#0EA5B7] mb-3">
                  {count2}/5
                </span>
                <p className="font-body text-sm sm:text-[15px] text-[#6B7280] leading-snug">
                  Clínicas no tienen sistemas de turnos digitales.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;