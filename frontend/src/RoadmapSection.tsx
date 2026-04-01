import React from "react";

const RoadmapSection: React.FC = () => {
  const milestones = [
    {
      quarter: "Q1 2024",
      title: "Lanzamiento Beta",
      description: "Registro inicial de mascotas y buscador básico.",
      status: "done" as const,
    },
    {
      quarter: "Q2 2024",
      title: "Marketplace Full",
      description: "Pagos integrados y suscripciones de alimentos.",
      status: "done" as const,
    },
    {
      quarter: "Q3 2024",
      title: "Red de Expertos",
      description: "Consultas online y telemedicina 24/7.",
      status: "current" as const,
    },
    {
      quarter: "Q4 2024",
      title: "Seguros Petlia",
      description: "Planes de cobertura médica integral.",
      status: "upcoming" as const,
    },
  ];

  return (
    <section className="relative w-full bg-[#F9FAFB] overflow-hidden">
      <img
        src="/huella.png"
        alt=""
        className="absolute bottom-16 left-[4%] w-14 h-14 opacity-[0.03] rotate-[15deg] pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA] px-5 py-2 rounded-full mb-6 tracking-wide border border-[#A5F3FC]/40">
            Visión 2024
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.1] mb-5">
            Nuestro camino hacia el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
              futuro.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
            Estamos evolucionando constantemente para ofrecerte la mejor
            tecnología de cuidado animal.
          </p>
        </div>

        {/* ── TIMELINE ── */}
        <div className="relative">
          <div className="hidden sm:block absolute top-[30px] left-0 right-0 h-px bg-[#E5E7EB] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6 lg:gap-8 relative z-10">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`
                    w-[60px] h-[60px] rounded-full flex items-center justify-center mb-5
                    ${
                      m.status === "done"
                        ? "bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] shadow-lg shadow-[#14B8C4]/25"
                        : m.status === "current"
                        ? "bg-gradient-to-br from-[#0EA5B7] to-[#0C9AAB] shadow-lg shadow-[#14B8C4]/30 ring-4 ring-[#A5F3FC]/40"
                        : "bg-white border-2 border-[#E5E7EB]"
                    }
                  `}
                >
                  {m.status === "done" ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span
                      className={`text-lg font-bold ${
                        m.status === "current"
                          ? "text-white"
                          : "text-[#D1D5DB]"
                      }`}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase mb-3">
                  {m.quarter}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2 leading-snug">
                  {m.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed max-w-[200px]">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;