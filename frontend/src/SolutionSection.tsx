import React from "react";
import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    icon: "📱",
    title: "Descargá y cargá tus mascotas",
    desc: "Creá tu cuenta en segundos. Cargá nombre, edad y tipo. Cada mascota recibe un ID único.",
    color: "from-[#67D1E3] to-[#0EA5B7]",
  },
  {
    num: "02",
    icon: "🔍",
    title: "Explorá negocios cercanos",
    desc: "Veterinarias, pet shops, peluquerías y clínicas. Con precios reales, rating, horarios y distancia.",
    color: "from-[#0EA5B7] to-[#0C9AAB]",
  },
  {
    num: "03",
    icon: "💬",
    title: "Conectá directo por WhatsApp",
    desc: "Hablá con el negocio sin intermediarios. Consultá disponibilidad, pedí productos y listo.",
    color: "from-[#0C9AAB] to-[#088395]",
  },
];

const SolutionSection: React.FC = () => {
  return (
    <section id="como-funciona" className="relative w-full bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <img src="/huella.png" alt="" className="absolute top-20 right-[6%] w-10 h-10 opacity-[0.03] rotate-[20deg] pointer-events-none select-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-40 py-20 sm:py-28 lg:py-32">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-[0.2em] text-[#0EA5B7] uppercase mb-4">
              <span className="w-8 h-px bg-[#0EA5B7]/40" />
              Cómo funciona
              <span className="w-8 h-px bg-[#0EA5B7]/40" />
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-[1.08] tracking-[-0.02em] mb-5 max-w-2xl">
              Simple. Rápido.{" "}
              <span className="gradient-text-animated">Sin vueltas.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
              En tres pasos tenés todo resuelto. Sin crear cuentas complicadas, sin fricción.
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal key={i} delay={200 + i * 150}>
              <div className="group relative bg-[#F9FAFB] rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] card-glow cursor-default h-full">
                {/* Number */}
                <span className="font-heading text-[80px] sm:text-[100px] font-extrabold text-[#F3F4F6] leading-none absolute top-4 right-6 select-none transition-colors duration-300 group-hover:text-[#E0F7FA]">
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-md shadow-[#14B8C4]/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Content */}
                <h3 className="relative font-heading text-xl font-bold text-[#111827] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="relative font-body text-[15px] text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow connector (desktop only, not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center z-20 shadow-sm">
                    <svg className="w-4 h-4 text-[#0EA5B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;