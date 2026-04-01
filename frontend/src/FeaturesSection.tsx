import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════
   Parallax tilt – solo desktop, solo cuando la sección
   está visible en viewport. Lerp continuo para fluidez.
   ═══════════════════════════════════════════════════════ */
function useTilt(isActive: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const pos = useRef({ x: 0, y: 0 });
  const goal = useRef({ x: 0, y: 0 });
  const activeRef = useRef(isActive);

  /* Sync sin reiniciar el loop */
  useEffect(() => {
    activeRef.current = isActive;
    if (!isActive) goal.current = { x: 0, y: 0 };
  }, [isActive]);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;

    let alive = true;
    const EASE = 0.055;       // lerp factor – más bajo = más sedoso
    const MAX_DEG = 4;        // grados máximos de inclinación
    const PERSP = 1200;       // perspectiva CSS (px)
    const SCALE_K = 0.002;    // cuánto escala con la magnitud

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* ── animation loop ── */
    const tick = () => {
      if (!alive) return;

      const gx = activeRef.current ? goal.current.x : 0;
      const gy = activeRef.current ? goal.current.y : 0;

      pos.current.x = lerp(pos.current.x, gx, EASE);
      pos.current.y = lerp(pos.current.y, gy, EASE);

      // Snap cerca de cero para evitar jitter sub-píxel
      if (Math.abs(pos.current.x) < 0.005) pos.current.x = 0;
      if (Math.abs(pos.current.y) < 0.005) pos.current.y = 0;

      const { x, y } = pos.current;
      const s = 1 + Math.hypot(x, y) * SCALE_K;

      el.style.transform = `perspective(${PERSP}px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) scale(${Math.min(s, 1.015).toFixed(4)})`;

      raf.current = requestAnimationFrame(tick);
    };

    /* ── mouse tracking ── */
    const onMove = (e: MouseEvent) => {
      if (!activeRef.current) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      goal.current = {
        x: -Math.max(-1, Math.min(1, dy)) * MAX_DEG,
        y: Math.max(-1, Math.min(1, dx)) * MAX_DEG,
      };
    };

    tick();
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, []); // corre una sola vez; isActive se lee desde ref

  return ref;
}

/* ── Card icon container ── */
interface CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent?: boolean;
  style?: React.CSSProperties;
}

const FeatureCard: React.FC<CardProps> = ({ icon, title, desc, accent, style }) => (
  <div
    className="group bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-5 border border-[#E5E7EB] card-hover cursor-default"
    style={style}
  >
    <div
      className={`
        shrink-0 w-14 self-stretch
        rounded-2xl flex items-start justify-center pt-4
        shadow-sm transition-transform duration-300 group-hover:scale-110
        ${accent
          ? "bg-gradient-to-br from-[#EF4444]/90 to-[#DC2626] shadow-red-400/15"
          : "bg-gradient-to-br from-[#67D1E3] to-[#0EA5B7] shadow-[#14B8C4]/15"
        }
      `}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        {icon}
      </svg>
    </div>

    <div className="pt-3 flex-1 min-w-0">
      <h3 className="font-heading text-[15px] sm:text-base font-bold text-[#111827] mb-1.5 leading-snug">
        {title}
      </h3>
      <p className="font-body text-[13px] sm:text-sm text-[#9CA3AF] leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════ */

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const tiltRef = useTilt(isInView);

  /* Un solo observer: entrada one-shot + visibilidad continua */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setTriggered(true);
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const t = (ms: number) =>
    ({
      opacity: triggered ? 1 : 0,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDuration: "650ms",
      transitionDelay: `${ms}ms`,
      transitionProperty: "opacity, transform",
    }) as React.CSSProperties;

  /* ── Data ── */
  const leftCards: Omit<CardProps, "style">[] = [
    {
      icon: (<><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" /><line x1="12" y1="3" x2="12" y2="9" /></>),
      title: "Marketplace de Alimentos",
      desc: "Filtra por raza, edad y necesidades especiales. Compra recurrente con 10% OFF.",
      accent: false,
    },
    {
      icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M9 16l2 2 4-4" /></>),
      title: "Turnos a un Toque",
      desc: "Agenda veterinaria, peluquería o paseadores sin llamar por teléfono.",
      accent: false,
    },
    {
      icon: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
      title: "Emergencias 24/7",
      desc: "Botón de pánico que te conecta con la clínica abierta más cercana.",
      accent: true,
    },
  ];

  const rightCards: Omit<CardProps, "style">[] = [
    {
      icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>),
      title: "Historial Completo",
      desc: "Comparte el perfil de tu mascota con cualquier profesional en un click.",
      accent: false,
    },
    {
      icon: (<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>),
      title: "Alertas Inteligentes",
      desc: "Recordatorios de vacunas, pipetas y medicación programados automáticamente.",
      accent: false,
    },
    {
      icon: (<><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
      title: "Geolocalización",
      desc: "Encuentra parques pet-friendly y hoteles con reseñas verificadas.",
      accent: true,
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">
      <img
        src="/huella.png"
        alt=""
        className="absolute top-32 left-[3%] w-10 h-10 opacity-[0.03] rotate-12 pointer-events-none select-none"
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-20 sm:py-28">

        {/* ── HEADER ── */}
        <div
          className="flex flex-col sm:flex-row items-start justify-between mb-14 sm:mb-20 gap-6"
          style={{ ...t(0), transform: triggered ? "none" : "translateY(24px)" }}
        >
          <div>
            <span className="inline-block font-heading text-xs sm:text-sm font-semibold text-[#0EA5B7] bg-[#E0F7FA]/80 px-5 py-2 rounded-full mb-5 tracking-wide border border-[#A5F3FC]/40">
              Para Dueños
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#111827] leading-[1.1]">
              Experiencia pensada para el{" "}
              <span className="gradient-text-animated">bienestar animal.</span>
            </h2>
          </div>
          <button className="shrink-0 text-sm sm:text-base font-heading font-bold text-[#111827] border-2 border-[#E5E7EB] hover:border-[#A5F3FC] bg-white rounded-full px-6 py-3 transition-all hover:bg-[#F0FDFA] active:scale-[0.97] hover:shadow-lg">
            Ver todas las funciones
          </button>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-6 xl:gap-10">

          {/* LEFT CARDS */}
          <div className="w-full lg:w-[30%] flex flex-col gap-5 sm:gap-6 order-2 lg:order-1">
            {leftCards.map((card, i) => (
              <FeatureCard
                key={i}
                {...card}
                style={{
                  ...t(350 + i * 130),
                  transform: triggered
                    ? "translateX(0) translateY(0) rotate(0deg)"
                    : "translateX(-40px) translateY(16px) rotate(-1.5deg)",
                }}
              />
            ))}
          </div>

          {/* PHONE — con tilt viewport-aware */}
          <div
            className="w-full lg:w-[40%] flex justify-center order-1 lg:order-2 mb-4 lg:mb-0"
            style={{
              ...t(200),
              transform: triggered
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.94)",
            }}
          >
            <div
              ref={tiltRef}
              className="relative shrink-0"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div
                className="animate-float"
                style={{
                  filter:
                    "drop-shadow(0 30px 60px rgba(14,165,183,0.14)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))",
                  animationDuration: "7s",
                }}
              >
                <div className="relative w-[260px] h-[540px] sm:w-[290px] sm:h-[600px] lg:w-[310px] lg:h-[640px]">
                  {/* ── 6.png (telefono + screen integrado) ── */}
                  <img
                    src="/6.png"
                    alt="App preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="w-full lg:w-[30%] flex flex-col gap-5 sm:gap-6 order-3">
            {rightCards.map((card, i) => (
              <FeatureCard
                key={i}
                {...card}
                style={{
                  ...t(750 + i * 130),
                  transform: triggered
                    ? "translateX(0) translateY(0) rotate(0deg)"
                    : "translateX(40px) translateY(16px) rotate(1.5deg)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;