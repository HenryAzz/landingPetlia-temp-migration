import React, { useState, useEffect } from "react";

interface Props {
  loaderFinished?: boolean;
}

const WelcomeScreen: React.FC<Props> = ({ loaderFinished }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loaderFinished) {
      const timer = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(timer);
    }
  }, [loaderFinished]);

  const a = (delay: number, y = 20) =>
    ({
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }) as React.CSSProperties;

  const aPhone = (delay: number, y = 100) =>
    ({
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 1.2s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, transform 1.2s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
    }) as React.CSSProperties;

  return (
    <section className="relative w-full flex justify-center bg-[#F9FAFB] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#67D1E3]/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0EA5B7]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-[#A5F3FC]/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Paw decorations */}
      <img src="/huella.png" alt="" className="absolute top-32 right-[12%] w-10 h-10 rotate-12 pointer-events-none select-none animate-float-slow" style={{ opacity: show ? 0.035 : 0, transition: "opacity 1.5s 1200ms" }} />
      <img src="/huella.png" alt="" className="absolute bottom-20 left-[8%] w-14 h-14 -rotate-12 pointer-events-none select-none animate-float" style={{ opacity: show ? 0.025 : 0, transition: "opacity 1.5s 1400ms" }} />

      <div
        className="w-full max-w-[1800px] px-6 sm:px-10 lg:px-20 xl:px-40 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-24 relative z-10"
        style={{ minHeight: "min(calc(100svh - 2rem), 950px)" }}
      >
        {/* ── TEXT SIDE ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-12 xl:pr-20 lg:order-1">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-[#0EA5B7] text-[10px] sm:text-[11px] font-heading font-bold px-4 py-2 rounded-full mb-6 tracking-[0.18em] border border-[#A5F3FC]/40 shadow-sm"
            style={a(0)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5B7] animate-pulse" />
            DISPONIBLE EN ARGENTINA
          </div>

          {/* Headline */}
          <h1
            className="font-heading text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] font-extrabold text-[#111827] leading-[1.06] tracking-[-0.02em] mb-5 sm:mb-6"
            style={a(100, 24)}
          >
            Todo para tu{" "}
            <span className="welcome-mascota-gradient">mascota,</span>
            <br />
            en{" "}
            <span className="gradient-text-animated">una sola app.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-base sm:text-lg lg:text-xl text-[#6B7280] leading-relaxed mb-8 sm:mb-10 max-w-lg"
            style={a(250)}
          >
            Encontrá veterinarias, pet shops y peluquerías cerca tuyo.
            Compará precios, contactá por WhatsApp y llevá el historial
            médico de tu mascota siempre con vos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto" style={a(400)}>
            <button className="btn-shimmer bg-gradient-to-r from-[#0EA5B7] to-[#5BC5D8] hover:from-[#0C9AAB] hover:to-[#4DB8CC] text-white font-heading font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#14B8C4]/20 hover:shadow-xl hover:shadow-[#14B8C4]/30 active:scale-[0.97] hover:-translate-y-[2px]">
              Descargar Gratis
            </button>
            <button className="border border-[#E5E7EB] hover:border-[#A5F3FC] bg-white hover:bg-[#F0FDFA] text-[#111827] font-heading font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 active:scale-[0.97] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#14B8C4]/5">
              Soy un Negocio
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 sm:mt-10" style={a(600)}>
            {[
              { icon: "🐾", text: "100% gratis para usuarios" },
              { icon: "⚡", text: "Contacto directo por WhatsApp" },
              { icon: "🔒", text: "Historial médico seguro" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span className="font-body text-xs sm:text-[13px] text-[#9CA3AF] font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHONES SIDE ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:order-2 relative">
          {/* Phone 1 */}
          <div className="relative shrink-0 z-10" style={aPhone(200, 120)}>
            <div
              className="relative w-[160px] h-[330px] sm:w-[200px] sm:h-[415px] lg:w-[260px] lg:h-[540px]"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(14,165,183,0.15)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
                animation: show ? "float 7s ease-in-out 1.8s infinite" : "none",
              }}
            >
              <img src="/0.png" alt="Petlia App - Explorar" className="w-full h-full object-contain" />
            </div>

            {/* Floating badge 1 */}
            <div
              className="absolute -left-4 sm:-left-8 top-[25%] glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg animate-float-slow"
              style={{ opacity: show ? 1 : 0, transition: "opacity 0.8s 1.5s", animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center">
                  <span className="text-white text-xs">📍</span>
                </div>
                <div>
                  <p className="font-heading text-[10px] sm:text-[11px] font-bold text-[#111827]">3 vets cerca</p>
                  <p className="font-body text-[9px] sm:text-[10px] text-[#9CA3AF]">Abiertas ahora</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone 2 */}
          <div className="relative ml-3 sm:ml-4 lg:ml-5 shrink-0" style={aPhone(50, 150)}>
            <div
              className="relative w-[160px] h-[330px] sm:w-[200px] sm:h-[415px] lg:w-[260px] lg:h-[540px] translate-y-[20px] sm:translate-y-[28px]"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(14,165,183,0.15)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
                animation: show ? "float 8s ease-in-out 1.4s infinite" : "none",
              }}
            >
              <img src="/5.png" alt="Petlia App - Perfil" className="w-full h-full object-contain" />
            </div>

            {/* Floating badge 2 */}
            <div
              className="absolute -right-2 sm:-right-6 bottom-[30%] glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg animate-float"
              style={{ opacity: show ? 1 : 0, transition: "opacity 0.8s 1.8s", animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="font-heading text-[10px] sm:text-[11px] font-bold text-[#111827]">Vacuna cargada</p>
                  <p className="font-body text-[9px] sm:text-[10px] text-[#9CA3AF]">Historial actualizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/30 to-transparent" style={{ opacity: show ? 1 : 0, transition: "opacity 1s 900ms" }} />
    </section>
  );
};

export default WelcomeScreen;