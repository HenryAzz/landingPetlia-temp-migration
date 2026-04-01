import React, { useState, useEffect } from "react";

interface Props {
  loaderFinished?: boolean;
}

const WelcomeScreen: React.FC<Props> = ({ loaderFinished }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loaderFinished) {
      const timer = setTimeout(() => setShow(true), 400);
      return () => clearTimeout(timer);
    }
  }, [loaderFinished]);

  const animate = (delay: number, translateY = 16) =>
    ({
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : `translateY(${translateY}px)`,
      transitionProperty: "opacity, transform",
      transitionDuration: "900ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
    }) as React.CSSProperties;

  const animatePhone = (delay: number, distance = 100) =>
    ({
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : `translateY(${distance}px)`,
      transitionProperty: "opacity, transform",
      transitionDuration: "1100ms",
      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      transitionDelay: `${delay}ms`,
    }) as React.CSSProperties;

  return (
    <section className="relative w-full flex justify-center bg-[#F9FAFB] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#67D1E3]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#0EA5B7]/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Huellitas */}
      <img
        src="/huella.png" alt=""
        className="absolute top-32 right-[10%] w-12 h-12 rotate-12 pointer-events-none select-none animate-float-slow"
        style={{ opacity: show ? 0.04 : 0, transition: "opacity 1.5s ease-out 1200ms" }}
      />
      <img
        src="/huella.png" alt=""
        className="absolute bottom-24 left-[6%] w-16 h-16 -rotate-12 pointer-events-none select-none animate-float"
        style={{ opacity: show ? 0.03 : 0, transition: "opacity 1.5s ease-out 1400ms" }}
      />
      <img
        src="/huella.png" alt=""
        className="absolute top-[60%] right-[3%] w-8 h-8 rotate-45 pointer-events-none select-none animate-float-slow"
        style={{ opacity: show ? 0.025 : 0, transition: "opacity 1.5s ease-out 1600ms", animationDelay: "1s" }}
      />

      <div
        className="w-full max-w-[1800px] px-6 md:px-10 lg:px-40
          flex flex-col lg:flex-row items-center gap-10 lg:gap-0
          pt-16 sm:pt-20
          py-10 sm:py-14 lg:py-16
          relative z-10"
        style={{
          minHeight: "min(calc(100svh - 4rem), 900px)",
        }}
      >

        {/* ── PHONES ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:order-2">

          {/* Phone 1 — izquierdo */}
          <div
            className="relative shrink-0"
            style={{
              ...animatePhone(250, 120),
              filter: "drop-shadow(0 30px 60px rgba(14,165,183,0.18)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
            }}
          >
            <div
              className="relative w-[170px] h-[350px] sm:w-[220px] sm:h-[455px] lg:w-[280px] lg:h-[580px]"
              style={{ animation: show ? "float 7s ease-in-out 1.8s infinite" : "none" }}
            >
              <img
                src="/0.png"
                alt="App preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Phone 2 — derecho */}
          <div
            className="relative ml-4 sm:ml-5 lg:ml-6 shrink-0"
            style={{
              ...animatePhone(100, 150),
              filter: "drop-shadow(0 30px 60px rgba(14,165,183,0.18)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
            }}
          >
            <div
              className="relative w-[170px] h-[350px] sm:w-[220px] sm:h-[455px] lg:w-[280px] lg:h-[580px] translate-y-[28px]"
              style={{ animation: show ? "float 8s ease-in-out 1.4s infinite" : "none" }}
            >
              <img
                src="/5.png"
                alt="App preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── TEXT ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-16 lg:order-1">

          <span
            className="inline-flex w-fit items-center gap-2 bg-[#E0F7FA]/80 text-[#0EA5B7] text-[10px] sm:text-[11px] font-heading font-bold px-4 py-2 rounded-full mb-5 sm:mb-7 tracking-[0.15em] border border-[#A5F3FC]/50 backdrop-blur-sm"
            style={animate(0, 16)}
          >
            🐾 NUEVA VERSIÓN 2.0 YA DISPONIBLE
          </span>

          <h1
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-extrabold text-[#111827] leading-[1.08] mb-4 sm:mb-5"
            style={animate(150, 18)}
          >
            Todo lo que tu mascota necesita en{" "}
            <span className="gradient-text-animated">una sola app.</span>
          </h1>

          <p
            className="font-body text-base sm:text-lg lg:text-xl text-[#6B7280] leading-relaxed mb-7 sm:mb-9 max-w-xl"
            style={animate(350, 16)}
          >
            Centraliza su historial médico, compra los mejores productos y
            agenda turnos con profesionales verificados en segundos.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            style={animate(550, 16)}
          >
            <button className="btn-shimmer bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-heading font-bold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#14B8C4]/25 hover:shadow-xl hover:shadow-[#14B8C4]/40 active:scale-[0.97] hover:-translate-y-[2px]">
              Descarga la App
            </button>
            <button className="border-2 border-[#E5E7EB] hover:border-[#A5F3FC] bg-white text-[#111827] font-heading font-bold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#F0FDFA] active:scale-[0.97] hover:-translate-y-[2px] hover:shadow-lg hover:shadow-[#14B8C4]/10">
              Suma tu negocio
            </button>
          </div>

          <div
            className="flex items-center gap-6 mt-8 sm:mt-10"
            style={animate(750, 14)}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E0F7FA] to-[#A5F3FC] border-2 border-white flex items-center justify-center">
                  <span className="text-[10px]">🐾</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-[#111827]">+50.000 familias</p>
              <p className="font-body text-xs text-[#9CA3AF]">ya confían en Petlia</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/30 to-transparent"
        style={{ opacity: show ? 1 : 0, transition: "opacity 1.2s ease-out 900ms" }}
      />
    </section>
  );
};

export default WelcomeScreen;