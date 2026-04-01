import React from "react";

const AppScreensSection: React.FC = () => {
  const screens = [
    { label: "LOGIN", offset: "translate-y-6" },
    { label: "HOME", offset: "-translate-y-2" },
    { label: "MARKETS", offset: "translate-y-4" },
    { label: "PERFIL", offset: "-translate-y-3" },
    { label: "TURNOS", offset: "translate-y-5" },
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Huellita */}
      <img
        src="/huella.png"
        alt=""
        className="absolute top-20 right-[5%] w-12 h-12 opacity-[0.03] rotate-[30deg] pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.1] mb-5">
            Diseño pensado{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
              para ti.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-md">
            Interfaz intuitiva, rápida y sin distracciones.
          </p>
        </div>

        {/* ── PHONES ROW (Desktop) ── */}
        <div className="hidden lg:flex items-end justify-center gap-6 xl:gap-8">
          {screens.map((screen, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${screen.offset}`}
            >
              <div
                className="relative"
                style={{
                  filter:
                    "drop-shadow(0 25px 50px rgba(14,165,183,0.10)) drop-shadow(0 8px 16px rgba(0,0,0,0.05))",
                }}
              >
                <div className="relative w-[220px] h-[455px] xl:w-[240px] xl:h-[500px]">
                  <div className="absolute inset-[3%] overflow-hidden rounded-[1.8rem] xl:rounded-[2rem] z-0">
                    <img
                      src="/Screen.png"
                      alt={`${screen.label} screen`}
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
              <span className="mt-6 text-xs font-bold tracking-[0.2em] text-[#9CA3AF] uppercase">
                {screen.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── PHONES SCROLL (Mobile / Tablet) ── */}
        <div className="lg:hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4">
            {screens.map((screen, i) => (
              <div
                key={i}
                className="flex flex-col items-center snap-center shrink-0"
              >
                <div
                  className="relative"
                  style={{
                    filter:
                      "drop-shadow(0 20px 40px rgba(14,165,183,0.10)) drop-shadow(0 6px 12px rgba(0,0,0,0.05))",
                  }}
                >
                  <div className="relative w-[200px] h-[415px] sm:w-[220px] sm:h-[455px]">
                    <div className="absolute inset-[3%] overflow-hidden rounded-[1.6rem] sm:rounded-[1.8rem] z-0">
                      <img
                        src="/Screen.png"
                        alt={`${screen.label} screen`}
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
                <span className="mt-5 text-[11px] font-bold tracking-[0.2em] text-[#9CA3AF] uppercase">
                  {screen.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 gap-1.5">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 0
                    ? "w-6 bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]"
                    : "w-1.5 bg-[#E5E7EB]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppScreensSection;