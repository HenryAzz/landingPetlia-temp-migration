import React from "react";
import Reveal from "./Reveal";

const features = [
  "Gestión de turnos sincronizada",
  "Base de datos de clientes y mascotas",
  "Panel de ventas y analíticas",
  "Envío de notificaciones automáticas",
];

const businessTypes = [
  {
    label: "Veterinarias",
    color: "from-[#0EA5B7] to-[#67D1E3]",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75-2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 2.25v15a2.25 2.25 0 0 0 2.25 2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v4.5m0 0h1.5m-1.5 0 3 3m-3-3-3 3" />
      </svg>
    ),
  },
  {
    label: "Pet Shops",
    color: "from-[#F59E0B] to-[#FBBF24]",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: "Peluquerías",
    color: "from-[#EC4899] to-[#F472B6]",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
      </svg>
    ),
  },
  {
    label: "Clínicas",
    color: "from-[#DC2626] to-[#EF4444]",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
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
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] mb-6">
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
                      Descargar App
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-[#111827] font-heading font-bold px-8 py-3.5 rounded-full transition-all duration-300 active:scale-[0.97] hover:-translate-y-[1px]">
                      Contacto
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* ── RIGHT: Icon Grid ── */}
              <Reveal delay={400} direction="right" className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Background glow behind the grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5B7]/10 to-[#8B5CF6]/10 rounded-3xl blur-2xl scale-110 pointer-events-none" />

                  <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
                    {businessTypes.map((item, i) => (
                      <div
                        key={i}
                        className="group relative bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 transition-all duration-500 hover:bg-white/[0.1] hover:border-white/[0.15] hover:scale-105 hover:-translate-y-1"
                      >
                        {/* Icon circle */}
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          {item.icon}
                        </div>

                        {/* Label */}
                        <span className="font-heading text-sm sm:text-base font-bold text-white/90 text-center transition-colors duration-300 group-hover:text-white">
                          {item.label}
                        </span>

                        {/* Subtle shine on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    ))}
                  </div>

                  {/* Central connecting paw - using pataBlanca.png */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0F172A] border-2 border-white/10 flex items-center justify-center z-10 shadow-xl overflow-hidden">
                    <img src="/pataBlanca.png" alt="" className="w-8 h-8 object-contain" />
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