import React, { useRef, useState, useEffect } from "react";
import Reveal from "./Reveal";

const features = [
  {
    icon: "🏪",
    title: "Marketplace inteligente",
    desc: "Veterinarias, clínicas y pet shops cerca tuyo. Filtrá por tipo, distancia y precio.",
    wide: true,
  },
  {
    icon: "💬",
    title: "WhatsApp directo",
    desc: "Sin intermediarios. Hablá con el negocio al instante.",
  },
  {
    icon: "❤️",
    title: "Favoritos con alertas",
    desc: "Guardá productos y recibí notificaciones si bajan de precio.",
  },
  {
    icon: "📋",
    title: "Historial médico digital",
    desc: "Vacunas, estudios y consultas en un solo lugar. Vos decidís qué se guarda.",
    wide: true,
  },
  {
    icon: "💰",
    title: "Precios actualizados",
    desc: "Sin sorpresas. Todo transparente.",
  },
  {
    icon: "📍",
    title: "Geolocalización",
    desc: "Encontrá el negocio más cercano en segundos.",
  },
];

const FeatureCard = ({
  icon,
  title,
  desc,
  wide,
  index,
  visible,
}: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      className={`relative group ${wide ? "lg:col-span-2" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `all 800ms cubic-bezier(0.16,1,0.3,1) ${
          index * 120
        }ms`,
      }}
    >
      {/* Animated Border Beam */}
      <div className="absolute inset-0 rounded-3xl p-[1px] overflow-hidden">
        <div className="absolute inset-[-200%] animate-borderBeam bg-[conic-gradient(from_0deg,transparent,rgba(14,165,183,0.6),transparent_30%)]" />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 p-10 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_80px_rgba(14,165,183,0.15)]"
      >
        {/* Spotlight */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(14,165,183,0.25)_0%,transparent_60%)] blur-3xl"
            style={{
              left: "calc(var(--mouse-x) - 250px)",
              top: "calc(var(--mouse-y) - 250px)",
            }}
          />
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Content */}
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] flex items-center justify-center text-2xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {icon}
          </div>

          <h3 className="mt-8 font-heading text-2xl font-bold text-[#0F172A] tracking-[-0.02em]">
            {title}
          </h3>

          <p className="mt-4 font-body text-[15px] text-[#64748B] leading-relaxed max-w-md">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="funciones"
      className="relative w-full overflow-hidden bg-[#F8FAFC]"
    >
      {/* Ambient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(14,165,183,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(103,209,227,0.08),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-32 py-32">

        {/* Header */}
        <div className="text-center mb-24">
          <Reveal>
            <span className="font-heading text-xs tracking-[0.35em] uppercase text-[#0EA5B7]">
              Funciones
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-6 font-heading text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#0F172A]">
              Tecnología que se{" "}
              <span className="gradient-text-animated">
                siente diferente.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 font-body text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Petlia no es una app más. Es una experiencia diseñada para eliminar fricción.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feat, i) => (
            <FeatureCard
              key={i}
              {...feat}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes borderBeam {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-borderBeam {
          animation: borderBeam 6s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-borderBeam {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;