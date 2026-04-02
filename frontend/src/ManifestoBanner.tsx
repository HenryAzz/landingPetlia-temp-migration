import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

function useCountUpOnView(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

const stats = [
  { value: 73, suffix: "%", label: "de dueños no lleva historial digital" },
  { value: 4, suffix: "/5", label: "veterinarias sin presencia online" },
  { value: 50, suffix: "K+", label: "familias con mascotas en Argentina" },
];

const ManifestoBanner: React.FC = () => {
  const counters = stats.map((s) => useCountUpOnView(s.value, 1800));

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0C9AAB 0%, #14B8C4 35%, #67D1E3 100%)",
      }}
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-24 lg:py-32">
        {/* Paws */}
        <img
          src="/huella.png"
          alt=""
          className="absolute top-6 left-[8%] w-16 h-16 opacity-[0.12] -rotate-12 brightness-0 invert pointer-events-none select-none animate-float-slow"
        />
        <img
          src="/huella.png"
          alt=""
          className="absolute bottom-4 right-[6%] w-20 h-20 opacity-[0.08] rotate-[20deg] brightness-0 invert pointer-events-none select-none animate-float"
          style={{ animationDelay: "1s" }}
        />
        <img
          src="/huella.png"
          alt=""
          className="absolute top-1/2 right-[28%] w-10 h-10 opacity-[0.06] rotate-45 brightness-0 invert pointer-events-none select-none animate-float-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <Reveal>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <span className="text-2xl">🐾</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-extrabold text-white leading-[1.12] tracking-[-0.02em] max-w-4xl mb-6 sm:mb-8">
              "No creamos una necesidad nueva.{" "}
              <span className="text-[#E0F2FE] underline decoration-white/20 underline-offset-4">
                Ordenamos un caos
              </span>{" "}
              que ya existía todos los días."
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <p className="font-body text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mb-12 sm:mb-16">
              Petlia conecta a dueños de mascotas con los mejores
              profesionales y negocios de su zona. Sin fricción. Sin
              intermediarios. Todo en un solo lugar.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={400}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full max-w-3xl">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={counters[i].ref}
                  className="flex flex-col items-center bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-2xl py-6 px-4 transition-all duration-300 hover:bg-white/[0.12] hover:scale-105"
                >
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-2">
                    {counters[i].count}
                    {stat.suffix}
                  </span>
                  <span className="font-body text-xs sm:text-sm text-white/60 text-center leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBanner;