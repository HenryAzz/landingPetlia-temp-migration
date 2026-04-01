import React from "react";

const SolutionSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F9FAFB] overflow-hidden">
      {/* Huellitas */}
      <img
        src="/huella.png"
        alt=""
        className="absolute top-16 left-[5%] w-12 h-12 opacity-[0.03] -rotate-12 pointer-events-none select-none"
      />
      <img
        src="/huella.png"
        alt=""
        className="absolute bottom-20 right-[8%] w-14 h-14 opacity-[0.035] rotate-[25deg] pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA] px-5 py-2 rounded-full mb-6 tracking-wide border border-[#A5F3FC]/40">
            Nuestra Propuesta
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.12] mb-5 max-w-3xl">
            La solución que tú y ellos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
              merecen.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
            Diseñamos PETLIA para que tu única preocupación sea disfrutar con
            tu mejor amigo. Todo bajo control, desde la palma de tu mano.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 — Gestión Centralizada */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-6 shadow-md shadow-[#14B8C4]/20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-[1.35rem] font-bold text-[#111827] mb-3">
              Gestión Centralizada
            </h3>
            <p className="text-sm sm:text-[15px] text-[#6B7280] leading-relaxed">
              Digitalizamos cada visita, vacuna y tratamiento. Tu historial
              siempre contigo.
            </p>
          </div>

          {/* Card 2 — Red de Confianza */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-6 shadow-md shadow-[#14B8C4]/20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-[1.35rem] font-bold text-[#111827] mb-3">
              Red de Confianza
            </h3>
            <p className="text-sm sm:text-[15px] text-[#6B7280] leading-relaxed">
              Acceso exclusivo a proveedores puntuados por la comunidad PETLIA.
            </p>
          </div>

          {/* Card 3 — Compras sin fricción */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] transition-all hover:shadow-lg hover:shadow-[#14B8C4]/8 hover:border-[#A5F3FC]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-6 shadow-md shadow-[#14B8C4]/20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
                <line x1="12" y1="3" x2="12" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-[1.35rem] font-bold text-[#111827] mb-3">
              Compras sin fricción
            </h3>
            <p className="text-sm sm:text-[15px] text-[#6B7280] leading-relaxed">
              Tus marcas favoritas con entrega programada para que nunca falte
              comida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;