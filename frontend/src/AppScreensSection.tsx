import React, { useState } from "react";
import Reveal from "./Reveal";

const screens = [
  {
    label: "EXPLORAR",
    desc: "Negocios pet cerca tuyo",
    img: "/1.png",
    offset: "translate-y-6",
  },
  {
    label: "NEGOCIO",
    desc: "Precios, servicios y contacto",
    img: "/2.png",
    offset: "-translate-y-2",
  },
  {
    label: "PRODUCTOS",
    desc: "Armá tu lista y consultá",
    img: "/3.png",
    offset: "translate-y-4",
  },
  {
    label: "HISTORIAL",
    desc: "La memoria de tu mascota",
    img: "/4.png",
    offset: "-translate-y-3",
  },
  {
    label: "FAVORITOS",
    desc: "Alertas de descuentos",
    img: "/5.png",
    offset: "translate-y-5",
  },
];

const PhoneMockup: React.FC<{
  screen: (typeof screens)[0];
  sizeClass: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}> = ({ screen, sizeClass, isActive, onHover, onLeave }) => (
  <div
    className="relative group cursor-pointer"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {/* Glow behind phone */}
    <div
      className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-[#0EA5B7]/20 to-[#67D1E3]/10 blur-2xl transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
      }`}
    />
    <div
      className="relative transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2"
      style={{
        filter:
          "drop-shadow(0 25px 50px rgba(14,165,183,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))",
      }}
    >
      <div className={`relative ${sizeClass}`}>
        <img
          src={screen.img}
          alt={`${screen.label} screen`}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
);

const AppScreensSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(2);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#67D1E3]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <img
        src="/huella.png"
        alt=""
        className="absolute top-16 right-[5%] w-10 h-10 opacity-[0.03] rotate-[30deg] pointer-events-none select-none"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/20 to-transparent" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-24 sm:py-32">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <Reveal>
            <span className="inline-block font-heading text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA]/80 px-5 py-2 rounded-full mb-6 tracking-wide border border-[#A5F3FC]/40">
              Dentro de la app
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-[#111827] leading-[1.08] tracking-[-0.02em] mb-5">
              Así se ve{" "}
              <span className="gradient-text-animated">Petlia.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-lg">
              Interfaz intuitiva, rápida y sin distracciones.
              <br className="hidden sm:block" />
              Todo lo que necesitás, a un toque de distancia.
            </p>
          </Reveal>
        </div>

        {/* Desktop Gallery */}
        <div className="hidden lg:flex items-end justify-center gap-6 xl:gap-8">
          {screens.map((screen, i) => (
            <Reveal key={i} delay={100 + i * 100}>
              <div
                className={`flex flex-col items-center transition-all duration-500 ${screen.offset} ${
                  activeIdx === i ? "scale-105 z-10" : "scale-100 z-0"
                }`}
              >
                <PhoneMockup
                  screen={screen}
                  sizeClass="w-[220px] h-[455px] xl:w-[240px] xl:h-[500px]"
                  isActive={activeIdx === i}
                  onHover={() => setActiveIdx(i)}
                  onLeave={() => setActiveIdx(2)}
                />
                <div className="mt-7 flex flex-col items-center">
                  <span className="font-heading text-xs font-bold tracking-[0.2em] text-[#111827] uppercase">
                    {screen.label}
                  </span>
                  <span
                    className={`font-body text-xs text-[#9CA3AF] mt-1.5 transition-all duration-300 ${
                      activeIdx === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    {screen.desc}
                  </span>
                </div>
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
                  screen={screen}
                  sizeClass="w-[200px] h-[415px] sm:w-[220px] sm:h-[455px]"
                />
                <div className="mt-5 flex flex-col items-center">
                  <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#111827] uppercase">
                    {screen.label}
                  </span>
                  <span className="font-body text-[10px] text-[#9CA3AF] mt-1">
                    {screen.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-1.5">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 2
                    ? "w-6 bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]"
                    : "w-1.5 bg-[#E5E7EB]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom feature pills */}
        <Reveal delay={600}>
          <div className="flex flex-wrap justify-center gap-3 mt-14 sm:mt-20">
            {[
              "WhatsApp directo",
              "Precios actualizados",
              "Historial digital",
              "Notificaciones de ofertas",
            ].map((feat, i) => (
              <span
                key={i}
                className="font-body text-xs sm:text-sm text-[#6B7280] bg-[#F3F4F6] px-4 py-2 rounded-full border border-[#E5E7EB] hover:border-[#A5F3FC] hover:bg-[#F0FDFA] transition-all duration-300 cursor-default"
              >
                {feat}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AppScreensSection;