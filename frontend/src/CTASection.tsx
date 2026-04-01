import React from "react";
import Reveal from "./Reveal";

const CTASection: React.FC = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-16 sm:py-24">
        <Reveal>
          <div className="relative bg-gradient-to-br from-[#F0FDFA] via-[#E0F7FA] to-[#ECFEFF] border border-[#A5F3FC]/40 rounded-3xl sm:rounded-[2rem] px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center overflow-hidden">
            {/* Paws */}
            <img src="/huella.png" alt="" className="absolute top-6 right-8 w-14 h-14 opacity-[0.05] rotate-12 pointer-events-none select-none animate-float-slow" />
            <img src="/huella.png" alt="" className="absolute bottom-8 left-10 w-16 h-16 opacity-[0.04] -rotate-12 pointer-events-none select-none animate-float" style={{ animationDelay: "1s" }} />
            <img src="/huella.png" alt="" className="absolute top-1/3 left-[6%] w-8 h-8 opacity-[0.035] rotate-45 pointer-events-none select-none" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#67D1E3]/[0.06] rounded-full blur-[100px] pointer-events-none" />

            <Reveal delay={100}>
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center mb-8 shadow-lg shadow-[#14B8C4]/25 animate-glow-pulse">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="relative z-10 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-extrabold text-[#111827] leading-[1.12] mb-5">
                Tu mascota te lo va a{" "}
                <span className="gradient-text-animated">agradecer.</span>
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="relative z-10 font-body text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed max-w-lg mb-10">
                Únete a las más de 50.000 familias que ya están transformando la
                vida de sus mascotas con Petlia. Gratis para siempre para
                usuarios.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                <button className="btn-premium bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-heading font-bold text-base sm:text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#14B8C4]/25 hover:shadow-xl hover:shadow-[#14B8C4]/40 active:scale-[0.97] hover:-translate-y-[2px]">
                  ¡Descargar Gratis!
                </button>
                <button className="bg-white hover:bg-gray-50 text-[#111827] font-heading font-bold text-base sm:text-lg px-10 py-4 rounded-full border border-[#E5E7EB] hover:border-[#A5F3FC] transition-all duration-300 active:scale-[0.97] hover:-translate-y-[2px] hover:shadow-lg hover:shadow-[#14B8C4]/10">
                  Sumar mi negocio
                </button>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                {["Sin costos ocultos", "Registro en 1 min", "Soporte 24/7"].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-body text-xs sm:text-sm text-[#6B7280] font-semibold">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;