import React from "react";
import Reveal from "./Reveal";

const features = [
  "Perfil visible para miles de dueños",
  "Gestioná precios y servicios por WhatsApp",
  "Historial conectado con ID de mascota",
  "Recibí consultas directas, sin intermediarios",
];

const businessTypes = [
  {
    label: "Veterinarias",
    color: "from-[#0EA5B7] to-[#67D1E3]",
    emoji: "🏥",
  },
  {
    label: "Pet Shops",
    color: "from-[#F59E0B] to-[#FBBF24]",
    emoji: "🛍️",
  },
  {
    label: "Peluquerías",
    color: "from-[#EC4899] to-[#F472B6]",
    emoji: "✂️",
  },
  {
    label: "Clínicas",
    color: "from-[#DC2626] to-[#EF4444]",
    emoji: "🩺",
  },
];

const whatsappSteps = [
  { msg: "Cambiar precio baño a $8.000", type: "sent" as const },
  { msg: "✅ Precio actualizado en tu perfil", type: "received" as const },
  { msg: "Agregar vacuna antirrábica al ID 20202020", type: "sent" as const },
  { msg: "✅ Registro enviado al dueño para aprobación", type: "received" as const },
];

const BusinessSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F9FAFB] overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-24 sm:py-32">
        <Reveal>
          <div className="relative w-full rounded-[2rem] bg-[#0F172A] overflow-hidden">
            {/* Glows */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#14B8C4]/8 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#67D1E3]/[0.04] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-[#0EA5B7]/[0.06] rounded-full blur-[80px] pointer-events-none" />

            {/* Paws */}
            <img
              src="/huella.png"
              alt=""
              className="absolute top-8 right-10 w-20 h-20 opacity-[0.035] rotate-12 pointer-events-none select-none brightness-0 invert animate-float-slow"
            />
            <img
              src="/huella.png"
              alt=""
              className="absolute bottom-8 left-8 w-12 h-12 opacity-[0.025] -rotate-12 pointer-events-none select-none brightness-0 invert animate-float"
              style={{ animationDelay: "3s" }}
            />

            <div className="relative z-10 p-8 sm:p-14 lg:p-20 flex flex-col lg:flex-row items-start gap-14 lg:gap-16">
              {/* LEFT */}
              <div className="w-full lg:w-1/2">
                <Reveal delay={100}>
                  <span className="inline-block font-heading text-xs font-bold text-[#0F172A] bg-gradient-to-r from-[#67D1E3] to-[#0EA5B7] px-4 py-1.5 rounded-full mb-7 tracking-wide">
                    PARA NEGOCIOS
                  </span>
                </Reveal>

                <Reveal delay={200}>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-6">
                    ¿Tenés una veterinaria o{" "}
                    <span className="gradient-text-animated">
                      pet shop?
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={300}>
                  <p className="font-body text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8 max-w-lg">
                    Unite a Petlia y llegá a miles de dueños que buscan
                    justo lo que ofrecés. Sin aprender sistemas nuevos.{" "}
                    <span className="text-[#67D1E3] font-semibold">
                      Todo se gestiona por WhatsApp.
                    </span>
                  </p>
                </Reveal>

                <div className="flex flex-col gap-4 mb-10">
                  {features.map((feat, i) => (
                    <Reveal key={i} delay={400 + i * 80}>
                      <div className="flex items-center gap-3 group">
                        <div className="shrink-0 w-5 h-5 rounded-full border border-[#14B8C4] flex items-center justify-center transition-all duration-300 group-hover:bg-[#14B8C4] group-hover:scale-110">
                          <div className="w-2 h-2 rounded-full bg-[#14B8C4] transition-all duration-300 group-hover:bg-white" />
                        </div>
                        <span className="font-body text-[#D1D5DB] text-base transition-colors group-hover:text-white">
                          {feat}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={750}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-premium bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] hover:from-[#0C9AAB] hover:to-[#5BC5D8] text-white font-heading font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#14B8C4]/30 active:scale-[0.97] hover:-translate-y-[1px]">
                      Sumar mi negocio
                    </button>
                    <button className="bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-heading font-bold px-8 py-3.5 rounded-full transition-all duration-300 active:scale-[0.97] hover:-translate-y-[1px] border border-white/10">
                      Saber más
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT */}
              <Reveal
                delay={400}
                direction="right"
                className="w-full lg:w-1/2"
              >
                <div className="flex flex-col gap-8">
                  {/* Business type grid */}
                  <div className="relative w-full max-w-md mx-auto lg:mx-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5B7]/10 to-[#8B5CF6]/10 rounded-3xl blur-2xl scale-110 pointer-events-none" />
                    <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
                      {businessTypes.map((item, i) => (
                        <div
                          key={i}
                          className="group relative bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col items-center gap-3 transition-all duration-500 hover:bg-white/[0.1] hover:border-white/[0.15] hover:scale-105 hover:-translate-y-1"
                        >
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                          >
                            {item.emoji}
                          </div>
                          <span className="font-heading text-sm sm:text-base font-bold text-white/90 text-center transition-colors duration-300 group-hover:text-white">
                            {item.label}
                          </span>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                      ))}
                      {/* Center paw */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0F172A] border-2 border-white/10 flex items-center justify-center z-10 shadow-xl overflow-hidden">
                        <img
                          src="/pataBlanca.png"
                          alt=""
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Chat Mockup */}
                  <div className="relative w-full max-w-md mx-auto lg:mx-0 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 overflow-hidden">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-xs font-bold text-white/80">
                          Gestión por WhatsApp
                        </p>
                        <p className="font-body text-[10px] text-white/40">
                          Así de simple
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {whatsappSteps.map((step, i) => (
                        <div
                          key={i}
                          className={`max-w-[85%] px-3.5 py-2 rounded-xl font-body text-xs leading-relaxed ${
                            step.type === "sent"
                              ? "self-end bg-[#DCF8C6]/90 text-[#1B3A1B] rounded-br-sm"
                              : "self-start bg-white/10 text-white/80 rounded-bl-sm"
                          }`}
                          style={{
                            animation: `fadeSlideUp 0.4s ease-out ${0.6 + i * 0.3}s both`,
                          }}
                        >
                          {step.msg}
                        </div>
                      ))}
                    </div>
                    <style>{`
                      @keyframes fadeSlideUp {
                        from { opacity: 0; transform: translateY(8px); }
                        to { opacity: 1; transform: translateY(0); }
                      }
                    `}</style>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BusinessSection;