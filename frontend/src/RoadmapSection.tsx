import React from "react";
import Reveal from "./Reveal";

const milestones = [
  {
    phase: "Fase 1",
    title: "MVP Usuarios",
    description:
      "Marketplace de negocios pet, historial de mascotas, favoritos con alertas y contacto directo por WhatsApp.",
    status: "current" as const,
    features: ["Marketplace", "Historial", "Favoritos", "WhatsApp"],
  },
  {
    phase: "Fase 2",
    title: "Panel Negocios",
    description:
      "Herramientas para que veterinarias y pet shops gestionen turnos, stock y clientes desde un solo lugar.",
    status: "upcoming" as const,
    features: ["Turnos", "Stock", "CRM", "Analíticas"],
  },
  {
    phase: "Fase 3",
    title: "Servicios Plus",
    description:
      "Paseadores, guarderías, pet hotels y servicios de emergencia integrados en la plataforma.",
    status: "upcoming" as const,
    features: ["Paseadores", "Guarderías", "Pet Hotels", "Emergencias"],
  },
  {
    phase: "Fase 4",
    title: "Ecosistema Completo",
    description:
      "Seguros, telemedicina veterinaria, marketplace de adopción y comunidad pet.",
    status: "upcoming" as const,
    features: ["Seguros", "Telemedicina", "Adopción", "Comunidad"],
  },
];

const RoadmapSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F9FAFB] overflow-hidden">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #111827 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <img
        src="/huella.png"
        alt=""
        className="absolute bottom-16 left-[4%] w-14 h-14 opacity-[0.03] rotate-[15deg] pointer-events-none select-none"
      />
      <img
        src="/huella.png"
        alt=""
        className="absolute top-20 right-[6%] w-10 h-10 opacity-[0.025] -rotate-[20deg] pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-24 sm:py-32 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <Reveal>
            <span className="inline-block font-heading text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA]/80 px-5 py-2 rounded-full mb-6 tracking-wide border border-[#A5F3FC]/40">
              Roadmap
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-[#111827] leading-[1.08] tracking-[-0.02em] mb-5">
              Lo que estamos{" "}
              <span className="gradient-text-animated">
                construyendo.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
              Petlia evoluciona con cada feedback. Empezamos simple y
              escalamos sin romper el producto.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] bg-[#E5E7EB] z-0">
            <div
              className="h-full bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] rounded-full"
              style={{ width: "25%" }}
            />
          </div>

          {/* Vertical line (mobile) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[29px] w-[2px] bg-[#E5E7EB] z-0">
            <div
              className="w-full bg-gradient-to-b from-[#0EA5B7] to-[#67D1E3] rounded-full"
              style={{ height: "25%" }}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {milestones.map((m, i) => (
              <Reveal key={i} delay={150 + i * 120}>
                <div className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0">
                  {/* Dot */}
                  <div
                    className={`shrink-0 w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center lg:mb-6 transition-all duration-300 ${
                      m.status === "current"
                        ? "bg-gradient-to-br from-[#0EA5B7] to-[#67D1E3] shadow-lg shadow-[#14B8C4]/30 ring-4 ring-[#A5F3FC]/30 animate-glow-pulse"
                        : "bg-white border-2 border-[#E5E7EB] group-hover:border-[#A5F3FC]"
                    }`}
                  >
                    {m.status === "current" ? (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ) : (
                      <span className="font-heading text-lg font-bold text-[#D1D5DB]">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:text-center">
                    <span
                      className={`font-heading text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block ${
                        m.status === "current"
                          ? "text-[#0EA5B7]"
                          : "text-[#9CA3AF]"
                      }`}
                    >
                      {m.phase}{" "}
                      {m.status === "current" && (
                        <span className="ml-1 inline-flex items-center gap-1 bg-[#E0F7FA] text-[#0EA5B7] px-2 py-0.5 rounded-full text-[9px] tracking-normal font-semibold normal-case">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5B7] animate-pulse" />
                          Actual
                        </span>
                      )}
                    </span>
                    <h3
                      className={`font-heading text-base sm:text-lg font-bold mb-2 leading-snug ${
                        m.status === "current"
                          ? "text-[#111827]"
                          : "text-[#6B7280]"
                      }`}
                    >
                      {m.title}
                    </h3>
                    <p className="font-body text-sm text-[#9CA3AF] leading-relaxed mb-4 lg:max-w-[220px] lg:mx-auto">
                      {m.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap lg:justify-center gap-1.5">
                      {m.features.map((f, fi) => (
                        <span
                          key={fi}
                          className={`font-body text-[10px] px-2.5 py-1 rounded-full border ${
                            m.status === "current"
                              ? "bg-[#E0F7FA]/60 text-[#0EA5B7] border-[#A5F3FC]/50"
                              : "bg-[#F3F4F6] text-[#9CA3AF] border-[#E5E7EB]"
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;