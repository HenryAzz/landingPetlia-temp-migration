import React from "react";
import Reveal from "./Reveal";

const features = [
  "Gestión de turnos sincronizada",
  "Base de datos de clientes y mascotas",
  "Panel de ventas y analíticas",
  "Envío de notificaciones automáticas",
];

const BusinessSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F9FAFB] overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        <Reveal>
          <div className="relative w-full rounded-[2rem] bg-[#0F172A] overflow-hidden">
            {/* Glows */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#14B8C4]/8 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#67D1E3]/[0.04] rounded-full blur-[100px] pointer-events-none" />

            {/* Paws */}
            <img src="/huella.png" alt="" className="absolute top-8 right-10 w-20 h-20 opacity-[0.035] rotate-12 pointer-events-none select-none brightness-0 invert animate-float-slow" />
            <img src="/huella.png" alt="" className="absolute bottom-8 left-8 w-12 h-12 opacity-[0.025] -rotate-12 pointer-events-none select-none brightness-0 invert animate-float" style={{ animationDelay: "3s" }} />

            <div className="relative z-10 p-10 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
              {/* ── LEFT ── */}
              <div className="w-full lg:w-1/2">
                <Reveal delay={100}>
                  <span className="inline-block font-heading text-xs font-bold text-[#0F172A] bg-gradient-to-r from-[#67D1E3] to-[#0EA5B7] px-4 py-1.5 rounded-full mb-6 tracking-wide">
                    PETLIA PARA NEGOCIOS
                  </span>
                </Reveal>

                <Reveal delay={200}>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] mb-6 max-w-md">
                    Digitaliza tu veterinaria o pet shop{" "}
                    <span className="gradient-text-animated">hoy mismo.</span>
                  </h2>
                </Reveal>

                <Reveal delay={300}>
                  <p className="font-body text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8 max-w-lg">
                    Gestiona agenda, stock y clientes desde un solo lugar.
                    Aumenta tu visibilidad y fideliza a tu comunidad con
                    herramientas de marketing integradas.
                  </p>
                </Reveal>

                <div className="flex flex-col gap-4 mb-10">
                  {features.map((feat, i) => (
                    <Reveal key={i} delay={400 + i * 80}>
                      <div className="flex items-center gap-3 group">
                        <div className="shrink-0 w-5 h-5 rounded-full border border-[#14B8C4] flex items-center justify-center transition-all duration-300 group-hover:bg-[#14B8C4] group-hover:scale-110">
                          <div className="w-2 h-2 rounded-full bg-[#14B8C4] transition-all duration-300 group-hover:bg-white" />
                        </div>
                        <span className="font-body text-[#D1D5DB] text-base transition-colors group-hover:text-white">
                          {feat}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={700}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-premium bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-heading font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#14B8C4]/30 active:scale-[0.97] hover:-translate-y-[1px]">
                      Comenzar Gratis
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-[#111827] font-heading font-bold px-8 py-3.5 rounded-full transition-all duration-300 active:scale-[0.97] hover:-translate-y-[1px]">
                      Ver Demo de Dashboard
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* ── RIGHT: Browser ── */}
              <Reveal delay={400} direction="right" className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
                  <div className="w-full h-12 bg-[#1E293B]/80 flex items-center px-4 gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <div className="w-1/3 h-5 rounded-md bg-white/10 ml-4" />
                  </div>
                  <div className="w-full aspect-video">
                    <img src="https://picsum.photos/id/160/1200/800" alt="Dashboard PETLIA" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BusinessSection;