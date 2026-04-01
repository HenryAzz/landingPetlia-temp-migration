import React from "react";
import Reveal from "./Reveal";

const cards = [
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    title: "Gestión Centralizada",
    desc: "Digitalizamos cada visita, vacuna y tratamiento. Tu historial siempre contigo.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Red de Confianza",
    desc: "Acceso exclusivo a proveedores puntuados por la comunidad PETLIA.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
        <line x1="12" y1="3" x2="12" y2="9" />
      </svg>
    ),
    title: "Compras sin fricción",
    desc: "Tus marcas favoritas con entrega programada para que nunca falte comida.",
  },
];

const SolutionSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F9FAFB] overflow-hidden dot-pattern">
      <img src="/huella.png" alt="" className="absolute top-20 left-[5%] w-10 h-10 opacity-[0.03] -rotate-12 pointer-events-none select-none animate-float-slow" />
      <img src="/huella.png" alt="" className="absolute bottom-16 right-[8%] w-14 h-14 opacity-[0.035] rotate-[25deg] pointer-events-none select-none animate-float" style={{ animationDelay: "2s" }} />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28 relative z-10">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <Reveal>
            <span className="inline-block font-heading text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA]/80 px-5 py-2 rounded-full mb-6 tracking-wide border border-[#A5F3FC]/40 backdrop-blur-sm">
              Nuestra Propuesta
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.12] mb-5 max-w-3xl">
              La solución que tú y ellos{" "}
              <span className="gradient-text-animated">merecen.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
              Diseñamos PETLIA para que tu única preocupación sea disfrutar con
              tu mejor amigo. Todo bajo control, desde la palma de tu mano.
            </p>
          </Reveal>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, i) => (
            <Reveal key={i} delay={150 + i * 120}>
              <div className="group bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] card-glow cursor-default">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-6 shadow-md shadow-[#14B8C4]/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl sm:text-[1.35rem] font-bold text-[#111827] mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm sm:text-[15px] text-[#6B7280] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;