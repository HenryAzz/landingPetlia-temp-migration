import React from "react";

const ProblemSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Huellita decorativa */}
      <img
        src="/huella.png"
        alt=""
        className="absolute bottom-10 right-[6%] w-16 h-16 opacity-[0.03] rotate-[20deg] pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10 xl:gap-16">
          {/* ── LEFT: TEXT ── */}
          <div className="w-full lg:w-[40%] flex flex-col">
            {/* Label */}
            <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#EF4444] mb-4 uppercase">
              El problema actual
            </span>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#111827] leading-[1.12] mb-10 lg:mb-12">
              Cuidar a tu mascota no debería ser un caos administrativo.
            </h2>

            {/* Pain points */}
            <div className="flex flex-col gap-7">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#EF4444]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-[#111827] leading-snug">
                    ¿Dónde dejé la cartilla de vacunación?
                  </p>
                  <p className="text-sm text-[#9CA3AF] mt-1">
                    Papeles perdidos cuando más los necesitás.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#EF4444]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-[#111827] leading-snug">
                    Olvidé la fecha de la desparasitación
                  </p>
                  <p className="text-sm text-[#9CA3AF] mt-1">
                    La salud no puede depender de tu memoria.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#EF4444]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-[#111827] leading-snug">
                    ¿Cuál es el veterinario de guardia hoy?
                  </p>
                  <p className="text-sm text-[#9CA3AF] mt-1">
                    Búsquedas desesperadas en momentos críticos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTER: DOG IMAGE ── */}
          <div className="w-full lg:w-[30%] flex justify-center">
            <div className="w-[280px] h-[320px] sm:w-[300px] sm:h-[360px] lg:w-[320px] lg:h-[400px] rounded-3xl overflow-hidden shadow-lg shadow-[#14B8C4]/10 border border-[#E5E7EB]">
              <img
                src="/perro.png"
                alt="Mascota"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── RIGHT: STAT CARDS ── */}
          <div className="w-full lg:w-[30%] flex flex-row lg:flex-col gap-5 sm:gap-6">
            {/* Card 1 — 68% */}
            <div className="flex-1 bg-red-50/60 border border-red-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <span className="block text-4xl sm:text-5xl font-extrabold text-[#EF4444] mb-3">
                68%
              </span>
              <p className="text-sm sm:text-[15px] text-[#6B7280] leading-snug">
                De dueños olvidan al menos 1 vacuna anual.
              </p>
            </div>

            {/* Card 2 — 4/5 */}
            <div className="flex-1 bg-[#E0F7FA]/50 border border-[#A5F3FC]/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <span className="block text-4xl sm:text-5xl font-extrabold text-[#0EA5B7] mb-3">
                4/5
              </span>
              <p className="text-sm sm:text-[15px] text-[#6B7280] leading-snug">
                Clínicas no tienen sistemas de turnos digitales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;