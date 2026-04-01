import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Huellita */}
      <img
        src="/huella.png"
        alt=""
        className="absolute top-32 left-[3%] w-10 h-10 opacity-[0.03] rotate-12 pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* ── HEADER ROW ── */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <span className="inline-block text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA] px-5 py-2 rounded-full mb-5 tracking-wide border border-[#A5F3FC]/40">
              Para Dueños
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#111827] leading-[1.1]">
              Experiencia pensada para el{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
                bienestar animal.
              </span>
            </h2>
          </div>
          <button className="shrink-0 text-sm sm:text-base font-semibold text-[#111827] border-2 border-[#E5E7EB] hover:border-[#14B8C4]/30 bg-white rounded-full px-6 py-3 transition-all hover:bg-[#F0FDFA] active:scale-[0.97]">
            Ver todas las funciones
          </button>
        </div>

        {/* ── CONTENT: CARDS + PHONE ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-6 xl:gap-10">
          {/* ── LEFT CARDS ── */}
          <div className="w-full lg:w-[30%] flex flex-col gap-5 sm:gap-6 order-2 lg:order-1">
            {/* Card 1 — Marketplace */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-start pt-4 justify-center shadow-sm shadow-[#14B8C4]/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
                  <line x1="12" y1="3" x2="12" y2="9" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Marketplace de Alimentos
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Filtra por raza, edad y necesidades especiales. Compra
                  recurrente con 10% OFF.
                </p>
              </div>
            </div>

            {/* Card 2 — Turnos */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-start pt-4 justify-center shadow-sm shadow-[#14B8C4]/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Turnos a un Toque
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Agenda veterinaria, peluquería o paseadores sin llamar por
                  teléfono.
                </p>
              </div>
            </div>

            {/* Card 3 — Emergencias */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#EF4444]/80 to-[#DC2626] flex items-start pt-4 justify-center shadow-sm shadow-red-400/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Emergencias 24/7
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Botón de pánico que te conecta con la clínica abierta más
                  cercana.
                </p>
              </div>
            </div>
          </div>

          {/* ── CENTER PHONE ── */}
          <div className="w-full lg:w-[40%] flex justify-center order-1 lg:order-2 mb-4 lg:mb-0">
            <div
              className="relative shrink-0"
              style={{
                filter:
                  "drop-shadow(0 30px 60px rgba(14,165,183,0.12)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
              }}
            >
              <div className="relative w-[260px] h-[540px] sm:w-[290px] sm:h-[600px] lg:w-[310px] lg:h-[640px]">
                <div className="absolute inset-[3%] overflow-hidden rounded-[2.2rem] z-0">
                  <img
                    src="/Screen.png"
                    alt="App screen"
                    className="absolute top-[-10px] left-[-2px] w-[102%] h-auto"
                  />
                </div>
                <img
                  src="/phone.png"
                  alt="Phone frame"
                  className="relative w-full h-full object-contain z-10"
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT CARDS ── */}
          <div className="w-full lg:w-[30%] flex flex-col gap-5 sm:gap-6 order-3">
            {/* Card 4 — Historial */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-start pt-4 justify-center shadow-sm shadow-[#14B8C4]/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Historial Completo
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Comparte el perfil de tu mascota con cualquier profesional en
                  un click.
                </p>
              </div>
            </div>

            {/* Card 5 — Alertas */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-start pt-4 justify-center shadow-sm shadow-[#14B8C4]/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Alertas Inteligentes
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Recordatorios de vacunas, pipetas y medicación programados
                  automáticamente.
                </p>
              </div>
            </div>

            {/* Card 6 — Geolocalización */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
              <div className="shrink-0 w-14 h-full rounded-2xl bg-gradient-to-br from-[#EF4444]/80 to-[#DC2626] flex items-start pt-4 justify-center shadow-sm shadow-red-400/15">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
                  Geolocalización
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Encuentra parques pet-friendly y hoteles con reseñas
                  verificadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;