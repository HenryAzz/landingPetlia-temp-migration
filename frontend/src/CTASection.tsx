import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-16 sm:py-24">
        {/* ── CARD ── */}
        <div className="relative bg-gradient-to-br from-[#F0FDFA] to-[#E0F7FA] border border-[#A5F3FC]/50 rounded-3xl sm:rounded-[2rem] px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center overflow-hidden">
          {/* Huellitas dentro del card */}
          <img
            src="/huella.png"
            alt=""
            className="absolute top-6 right-8 w-14 h-14 opacity-[0.06] rotate-12 pointer-events-none select-none"
          />
          <img
            src="/huella.png"
            alt=""
            className="absolute bottom-8 left-10 w-16 h-16 opacity-[0.05] -rotate-12 pointer-events-none select-none"
          />
          <img
            src="/huella.png"
            alt=""
            className="absolute top-1/2 left-[5%] w-8 h-8 opacity-[0.04] rotate-45 pointer-events-none select-none"
          />

          {/* Heart icon */}
          <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-8 shadow-md shadow-[#14B8C4]/20">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-extrabold text-[#111827] leading-[1.12] mb-5">
            Tu mascota te lo va a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
              agradecer.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="relative z-10 text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed max-w-lg mb-10">
            Únete a las más de 50.000 familias que ya están transformando la
            vida de sus mascotas con Petlia. Gratis para siempre para usuarios.
          </p>

          {/* Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
            <button className="bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-semibold text-base sm:text-lg px-10 py-4 rounded-full transition-all shadow-lg shadow-[#14B8C4]/25 hover:shadow-xl hover:shadow-[#14B8C4]/35 active:scale-[0.97]">
              ¡Descargar Gratis!
            </button>
            <button className="bg-white hover:bg-gray-50 text-[#111827] font-semibold text-base sm:text-lg px-10 py-4 rounded-full border border-[#E5E7EB] hover:border-[#14B8C4]/30 transition-all active:scale-[0.97]">
              Sumar mi negocio
            </button>
          </div>

          {/* Trust badges */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {["Sin costos ocultos", "Registro en 1 min", "Soporte 24/7"].map(
              (item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-[#6B7280] font-medium">
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;