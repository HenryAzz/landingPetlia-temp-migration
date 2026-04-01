import React from "react";
import Reveal from "./Reveal";

const screens = [
  { label: "LOGIN", offset: "translate-y-6", img: "/1.png" },
  { label: "HOME", offset: "-translate-y-2", img: "/2.png" },
  { label: "MARKETS", offset: "translate-y-4", img: "/3.png" },
  { label: "PERFIL", offset: "-translate-y-3", img: "/4.png" },
  { label: "TURNOS", offset: "translate-y-5", img: "/5.png" },
];

const PhoneMockup: React.FC<{
  label: string;
  img: string;
  className?: string;
  sizeClass: string;
}> = ({ label, img, className = "", sizeClass }) => (
  <div className={`relative ${className}`}>
    <div
      className="relative animate-float"
      style={{
        filter:
          "drop-shadow(0 25px 50px rgba(14,165,183,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.05))",
        animationDuration: `${6 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      <div className={`relative ${sizeClass}`}>
        <img
          src={img}
          alt={`${label} screen`}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
);

const AppScreensSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <img
        src="/huella.png"
        alt=""
        className="absolute top-16 right-[5%] w-10 h-10 opacity-[0.03] rotate-[30deg] pointer-events-none select-none"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/20 to-transparent" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.1] mb-5">
              Diseño pensado{" "}
              <span className="gradient-text-animated">para ti.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-md">
              Interfaz intuitiva, rápida y sin distracciones.
            </p>
          </Reveal>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-end justify-center gap-6 xl:gap-8">
          {screens.map((screen, i) => (
            <Reveal key={i} delay={100 + i * 100}>
              <div className={`flex flex-col items-center ${screen.offset}`}>
                <PhoneMockup
                  label={screen.label}
                  img={screen.img}
                  sizeClass="w-[220px] h-[455px] xl:w-[240px] xl:h-[500px]"
                />
                <span className="mt-6 font-heading text-xs font-bold tracking-[0.2em] text-[#9CA3AF] uppercase">
                  {screen.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile scroll */}
        <div className="lg:hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4">
            {screens.map((screen, i) => (
              <div
                key={i}
                className="flex flex-col items-center snap-center shrink-0"
              >
                <PhoneMockup
                  label={screen.label}
                  img={screen.img}
                  sizeClass="w-[200px] h-[415px] sm:w-[220px] sm:h-[455px]"
                />
                <span className="mt-5 font-heading text-[11px] font-bold tracking-[0.2em] text-[#9CA3AF] uppercase">
                  {screen.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 gap-1.5">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 0
                    ? "w-6 bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]"
                    : "w-1.5 bg-[#E5E7EB]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppScreensSection;