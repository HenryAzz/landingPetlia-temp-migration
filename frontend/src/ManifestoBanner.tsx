import React from "react";
import Reveal from "./Reveal";

const ManifestoBanner: React.FC = () => {
  return (
    <section className="w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #0C9AAB 0%, #14B8C4 35%, #67D1E3 100%)" }}>
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-16 sm:py-20 lg:py-28">
        {/* Paws */}
        <img src="/huella.png" alt="" className="absolute top-6 left-[8%] w-16 h-16 opacity-[0.12] -rotate-12 brightness-0 invert pointer-events-none select-none animate-float-slow" />
        <img src="/huella.png" alt="" className="absolute bottom-4 right-[6%] w-20 h-20 opacity-[0.08] rotate-[20deg] brightness-0 invert pointer-events-none select-none animate-float" style={{ animationDelay: "1s" }} />
        <img src="/huella.png" alt="" className="absolute top-1/2 right-[28%] w-10 h-10 opacity-[0.06] rotate-45 brightness-0 invert pointer-events-none select-none animate-float-slow" style={{ animationDelay: "2s" }} />
        <img src="/huella.png" alt="" className="absolute bottom-1/3 left-[22%] w-8 h-8 opacity-[0.07] -rotate-6 brightness-0 invert pointer-events-none select-none animate-float" style={{ animationDelay: "1.5s" }} />
        <img src="/huella.png" alt="" className="absolute top-[20%] left-[50%] w-6 h-6 opacity-[0.05] rotate-[60deg] brightness-0 invert pointer-events-none select-none animate-float-slow" style={{ animationDelay: "0.5s" }} />

        {/* Top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        {/* Bottom line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <Reveal>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <span className="text-2xl">💬</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-extrabold text-white leading-[1.15] max-w-4xl mb-6 sm:mb-8">
              "No somos solo una app, somos el primer{" "}
              <span className="text-[#E0F2FE] underline decoration-white/20 underline-offset-4">
                ecosistema integral
              </span>{" "}
              para mascotas en Latinoamérica."
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <p className="font-body text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl">
              Conectamos tecnología de vanguardia con el amor por los animales,
              garantizando que cada mascota reciba el cuidado que merece, cuando
              lo necesita.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBanner;