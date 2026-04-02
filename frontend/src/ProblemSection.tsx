import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.unobserve(el); } },
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
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

const painPoints = [
  {
    emoji: "🔍",
    title: "\"¿Cuál veterinaria está abierta ahora?\"",
    desc: "En una urgencia, perdés tiempo buscando en Google y llamando a todos lados.",
  },
  {
    emoji: "💸",
    title: "\"Los precios nunca están actualizados\"",
    desc: "Siempre tenés que preguntar cuánto sale un baño, un alimento o una vacuna.",
  },
  {
    emoji: "📋",
    title: "\"El historial de Luna está en mil lugares\"",
    desc: "Vacunas en un papel, estudios en WhatsApp, turnos en la cabeza. Imposible.",
  },
];

const ProblemSection: React.FC = () => {
  const counter1 = useCountUp(73);
  const counter2 = useCountUp(4);

  return (
    <section className="relative w-full bg-[#0F172A] overflow-hidden noise-overlay">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#EF4444]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#14B8C4]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Paws */}
      <img src="/huella.png" alt="" className="absolute top-16 right-[8%] w-12 h-12 opacity-[0.02] rotate-12 brightness-0 invert pointer-events-none select-none" />
      <img src="/huella.png" alt="" className="absolute bottom-20 left-[5%] w-16 h-16 opacity-[0.015] -rotate-12 brightness-0 invert pointer-events-none select-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-40 py-20 sm:py-28 lg:py-32">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-[0.2em] text-[#EF4444] uppercase mb-4">
              <span className="w-8 h-px bg-[#EF4444]/60" />
              El problema
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-[-0.02em] max-w-3xl">
              ¿Te suena{" "}
              <span className="text-[#EF4444]">familiar</span>?
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Pain points */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            {painPoints.map((point, i) => (
              <Reveal key={i} delay={200 + i * 120}>
                <div className="group flex items-start gap-5 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#EF4444]/20 transition-all duration-500">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center text-xl transition-all duration-300 group-hover:bg-[#EF4444]/20 group-hover:scale-110">
                    {point.emoji}
                  </div>
                  <div>
                    <p className="font-heading text-base sm:text-lg font-bold text-white/90 leading-snug mb-1.5">
                      {point.title}
                    </p>
                    <p className="font-body text-sm text-white/40 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="w-full lg:w-[45%] flex flex-col sm:flex-row lg:flex-col gap-5">
            <Reveal delay={500} className="flex-1">
              <div ref={counter1.ref} className="relative rounded-2xl sm:rounded-3xl p-7 sm:p-8 border border-[#EF4444]/10 bg-[#EF4444]/[0.04] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/[0.05] rounded-full blur-[60px] pointer-events-none" />
                <span className="relative block font-heading text-5xl sm:text-6xl font-extrabold text-[#EF4444] mb-3 tracking-tight">
                  {counter1.count}%
                </span>
                <p className="relative font-body text-sm sm:text-[15px] text-white/50 leading-snug">
                  de dueños pierden información médica importante de sus mascotas.
                </p>
              </div>
            </Reveal>
            <Reveal delay={650} className="flex-1">
              <div ref={counter2.ref} className="relative rounded-2xl sm:rounded-3xl p-7 sm:p-8 border border-[#14B8C4]/15 bg-[#14B8C4]/[0.04] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8C4]/[0.06] rounded-full blur-[60px] pointer-events-none" />
                <span className="relative block font-heading text-5xl sm:text-6xl font-extrabold text-[#67D1E3] mb-3 tracking-tight">
                  {counter2.count}/5
                </span>
                <p className="relative font-body text-sm sm:text-[15px] text-white/50 leading-snug">
                  negocios pet no muestran precios online. Siempre hay que preguntar.
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