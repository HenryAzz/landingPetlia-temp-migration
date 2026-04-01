import React from "react";

interface Props {
  loaderFinished?: boolean;
}

const WelcomeScreen: React.FC<Props> = () => {
  return (
    <section className="relative w-full flex justify-center bg-[#F9FAFB] overflow-hidden">
      {/* ── Huellitas decorativas ── */}
      <img
        src="/huella.png"
        alt=""
        className="absolute top-24 right-[8%] w-14 h-14 opacity-[0.04] rotate-12 pointer-events-none select-none"
      />
      <img
        src="/huella.png"
        alt=""
        className="absolute bottom-20 left-[4%] w-20 h-20 opacity-[0.035] -rotate-12 pointer-events-none select-none"
      />
      <img
        src="/huella.png"
        alt=""
        className="absolute top-1/3 right-[2%] w-10 h-10 opacity-[0.03] rotate-45 pointer-events-none select-none"
      />
      {/* Glow sutil superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#67D1E3]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1800px] px-6 md:px-10 lg:px-40 flex flex-col lg:flex-row items-center py-12 md:py-20 lg:py-28 pt-24 md:pt-28 lg:pt-36 relative z-10">
        {/* ── PHONES (arriba en mobile, derecha en desktop) ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:order-2 mb-12 lg:mb-0">
          {/* PHONE 1 */}
          <div
            className="relative shrink-0"
            style={{
              filter:
                "drop-shadow(0 30px 60px rgba(14,165,183,0.14)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
            }}
          >
            <div className="relative w-[160px] h-[330px] sm:w-[200px] sm:h-[415px] lg:w-[260px] lg:h-[540px]">
              <div className="absolute inset-[3%] overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] lg:rounded-[2.2rem] z-0">
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

          {/* PHONE 2 */}
          <div
            className="relative translate-y-[30px] ml-4 sm:ml-5 lg:ml-6 shrink-0"
            style={{
              filter:
                "drop-shadow(0 30px 60px rgba(14,165,183,0.14)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
            }}
          >
            <div className="relative w-[160px] h-[330px] sm:w-[200px] sm:h-[415px] lg:w-[260px] lg:h-[540px]">
              <div className="absolute inset-[3%] overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] lg:rounded-[2.2rem] z-0">
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

        {/* ── TEXT + BUTTONS ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-16 lg:order-1">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 bg-[#E0F7FA] text-[#0EA5B7] text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 tracking-[0.12em] border border-[#A5F3FC]/50">
            🐾 NUEVA VERSIÓN 2.0 YA DISPONIBLE
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold text-[#111827] leading-[1.08] mb-4 sm:mb-6">
            Todo lo que tu mascota necesita en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3]">
              una sola app.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#6B7280] leading-relaxed mb-8 sm:mb-10 max-w-xl">
            Centraliza su historial médico, compra los mejores productos y
            agenda turnos con profesionales verificados en segundos.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-[#14B8C4]/25 hover:shadow-xl hover:shadow-[#14B8C4]/35 active:scale-[0.97]">
              Descarga la App
            </button>
            <button className="border-2 border-[#E5E7EB] hover:border-[#14B8C4]/30 bg-white text-[#111827] font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all hover:bg-[#F0FDFA] active:scale-[0.97]">
              Suma tu negocio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeScreen;