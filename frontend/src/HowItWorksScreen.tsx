import { useEffect, useState, useRef } from 'react';

const HowItWorksScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const steps = [
    {
      number: '01',
      emoji: '💛',
      title: 'Elegí tu vínculo',
      description: 'Explorá los 3 tipos de compañía y elegí el que mejor se adapte a lo que necesitás.',
      accentColor: '#F9DDA3',
      accentBg: 'rgba(249,221,163,0.15)',
    },
    {
      number: '02',
      emoji: '📝',
      title: 'Completá el formulario',
      description: 'Contanos un poco sobre vos para que podamos conocerte y personalizar tu experiencia.',
      accentColor: '#F69E82',
      accentBg: 'rgba(246,158,130,0.15)',
    },
    {
      number: '03',
      emoji: '💬',
      title: 'Te contactamos',
      description: 'En menos de 24 hs el equipo de Camil se comunica con vos para coordinar todo.',
      accentColor: '#E8C878',
      accentBg: 'rgba(232,200,120,0.15)',
    },
    {
      number: '04',
      emoji: '✨',
      title: '¡Comenzá a disfrutar!',
      description: 'Recibí tu primera carta, mensaje o llamada y empezá a vivir la experiencia Camil.',
      accentColor: '#F4B896',
      accentBg: 'rgba(244,184,150,0.15)',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: '85vh' }}
    >
      <style>{`
        /* ── Step number glow ── */
        .step-number {
          position: relative;
        }
        .step-number::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* ── Card styles ── */
        .step-card-modern {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }
        .step-card-modern::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.08) 0%,
            transparent 50%,
            rgba(255,255,255,0.04) 100%
          );
        }
        .step-card-modern:hover {
          transform: translateY(-8px);
          box-shadow:
            0 25px 60px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .step-card-modern:hover::before {
          opacity: 1;
        }
        .step-card-modern:hover .step-number::after {
          opacity: 0.3;
        }

        /* ── Connector line (desktop) ── */
        .connector-line {
          position: relative;
        }
        .connector-line::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(249,221,163,0.3),
            transparent
          );
          transform: translateY(-50%);
        }

        /* ── Mobile connector (vertical) ── */
        .mobile-connector {
          width: 2px;
          height: 32px;
          background: linear-gradient(180deg, transparent, rgba(249,221,163,0.4), transparent);
          margin: 0 auto;
        }

        /* ── Pulse dot on connector ── */
        @keyframes connectorPulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        .connector-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F9DDA3;
          animation: connectorPulse 2.5s ease-in-out infinite;
        }

        /* ── Floating decorations ── */
        @keyframes hiwDeco1 {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          25% { transform: translateY(-6px) rotate(-5deg); }
          50% { transform: translateY(-3px) rotate(-10deg); }
          75% { transform: translateY(-7px) rotate(-6deg); }
        }
        @keyframes hiwDeco2 {
          0%, 100% { transform: translateY(0px) rotate(10deg); }
          30% { transform: translateY(-5px) rotate(13deg); }
          60% { transform: translateY(-8px) rotate(8deg); }
          85% { transform: translateY(-3px) rotate(11deg); }
        }
        @keyframes hiwDeco3 {
          0%, 100% { transform: translateY(0px) rotate(5deg); }
          25% { transform: translateY(-7px) rotate(8deg); }
          50% { transform: translateY(-4px) rotate(3deg); }
          75% { transform: translateY(-6px) rotate(7deg); }
        }
        @keyframes hiwDeco4 {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          30% { transform: translateY(-4px) rotate(-9deg); }
          60% { transform: translateY(-7px) rotate(-14deg); }
          85% { transform: translateY(-2px) rotate(-10deg); }
        }
        .hiw-deco-1 { animation: hiwDeco1 4.2s ease-in-out infinite; }
        .hiw-deco-2 { animation: hiwDeco2 4.6s ease-in-out infinite; animation-delay: 0.5s; }
        .hiw-deco-3 { animation: hiwDeco3 3.9s ease-in-out infinite; animation-delay: 1s; }
        .hiw-deco-4 { animation: hiwDeco4 4.4s ease-in-out infinite; animation-delay: 0.8s; }

        /* ── Entrance animations ── */
        @keyframes fadeSlideDown {
          0%   { opacity: 0; transform: translateY(-35px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          0%   { opacity: 0; transform: translateY(50px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes connectorGrow {
          0%   { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }

        .entrance-hiw-title { opacity: 0; }
        .entrance-hiw-title.animate {
          animation: fadeSlideDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-hiw-subtitle { opacity: 0; }
        .entrance-hiw-subtitle.animate {
          animation: fadeSlideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }
        .entrance-hiw-card { opacity: 0; }
        .entrance-hiw-card.animate {
          animation: cardReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-hiw-card.animate.card-0 { animation-delay: 0.5s; }
        .entrance-hiw-card.animate.card-1 { animation-delay: 0.65s; }
        .entrance-hiw-card.animate.card-2 { animation-delay: 0.8s; }
        .entrance-hiw-card.animate.card-3 { animation-delay: 0.95s; }

        .entrance-hiw-connector { opacity: 0; }
        .entrance-hiw-connector.animate {
          animation: connectorGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-hiw-connector.animate.conn-0 { animation-delay: 0.7s; }
        .entrance-hiw-connector.animate.conn-1 { animation-delay: 0.85s; }
        .entrance-hiw-connector.animate.conn-2 { animation-delay: 1s; }

        .hiw-icon-wrapper { opacity: 0; }
        .hiw-icon-wrapper.animate-deco-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.6s; }
        .hiw-icon-wrapper.animate-deco-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.75s; }
        .hiw-icon-wrapper.animate-deco-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.9s; }
        .hiw-icon-wrapper.animate-deco-4 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 1.05s; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hiw-steps-grid {
            flex-direction: column !important;
            max-width: 500px !important;
            margin: 0 auto;
            gap: 0 !important;
          }
          .hiw-step-wrapper {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .step-card-modern {
            width: 100% !important;
          }
          .desktop-connector {
            display: none !important;
          }
          .mobile-connector-wrapper {
            display: flex !important;
          }
          .hiw-deco-desktop {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-connector-wrapper {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hiw-steps-grid {
            max-width: 100% !important;
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/fondoliso.jpeg"
          alt=""
          className="object-cover"
          style={{ width: '140%', height: '140%', minWidth: '140%', minHeight: '140%' }}
        />
      </div>

      {/* Onda amarilla */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ zIndex: 30 }}>
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none" style={{ height: 'clamp(35px, 5vw, 65px)', transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      {/* Decoraciones — desktop only */}
      <div
        className={`absolute pointer-events-none hiw-icon-wrapper hiw-deco-desktop ${hasAnimated ? 'animate-deco-1' : ''}`}
        style={{ left: '4vw', top: '14%', width: 'clamp(28px, 3.5vw, 55px)', height: 'clamp(28px, 3.5vw, 55px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'hiw-deco-1' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none hiw-icon-wrapper hiw-deco-desktop ${hasAnimated ? 'animate-deco-2' : ''}`}
        style={{ right: '5vw', top: '12%', width: 'clamp(18px, 2.2vw, 35px)', height: 'clamp(18px, 2.2vw, 35px)', zIndex: 5 }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'hiw-deco-2' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none hiw-icon-wrapper hiw-deco-desktop ${hasAnimated ? 'animate-deco-3' : ''}`}
        style={{ left: '3.5vw', bottom: '10%', width: 'clamp(24px, 3vw, 48px)', height: 'clamp(24px, 3vw, 48px)', zIndex: 5 }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'hiw-deco-3' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none hiw-icon-wrapper hiw-deco-desktop ${hasAnimated ? 'animate-deco-4' : ''}`}
        style={{ right: '4.5vw', bottom: '12%', width: 'clamp(16px, 2vw, 30px)', height: 'clamp(16px, 2vw, 30px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'hiw-deco-4' : ''}`} />
      </div>

      {/* Contenido */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{ padding: 'clamp(60px, 8vw, 130px) clamp(20px, 5vw, 80px) clamp(50px, 7vw, 110px)' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center" style={{ marginBottom: 'clamp(32px, 4.5vw, 70px)' }}>
          {/* Badge */}
          <div
            className={`entrance-hiw-subtitle ${hasAnimated ? 'animate' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: 'clamp(4px, 0.4vw, 8px) clamp(12px, 1.1vw, 18px)',
              borderRadius: '50px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              marginBottom: 'clamp(12px, 1.2vw, 20px)',
            }}
          >
            <span style={{ fontSize: 'clamp(12px, 0.9vw, 16px)' }}>🚀</span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 'clamp(11px, 0.8vw, 14px)',
                letterSpacing: '0.08em',
              }}
            >
              SIMPLE Y RÁPIDO
            </span>
          </div>

          <h2
            className={`entrance-hiw-title ${hasAnimated ? 'animate' : ''}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#FFFFFF',
              fontSize: 'clamp(32px, 4.8vw, 80px)',
              lineHeight: 1.2,
              letterSpacing: '0.03em',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
          >
            ¿Cómo <span style={{ fontWeight: 500 }}>funciona</span>?
          </h2>
          <p
            className={`entrance-hiw-subtitle ${hasAnimated ? 'animate' : ''}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(13px, 1.15vw, 20px)',
              lineHeight: 1.6,
              margin: 0,
              marginTop: 'clamp(8px, 1vw, 16px)',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            En 4 pasos simples empezás a vivir la experiencia Camil
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="hiw-steps-grid flex items-stretch justify-center"
          style={{ gap: '0', width: '100%', maxWidth: '85vw' }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="hiw-step-wrapper flex items-stretch"
              style={{ flex: 1 }}
            >
              {/* Card */}
              <div
                className={`step-card-modern entrance-hiw-card card-${i} ${hasAnimated ? 'animate' : ''}`}
                style={{
                  width: '100%',
                  padding: 'clamp(20px, 2vw, 32px)',
                  borderRadius: 'clamp(16px, 1.4vw, 22px)',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div className="flex flex-col" style={{ gap: 'clamp(10px, 0.9vw, 16px)', flex: 1 }}>
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    {/* Step number circle */}
                    <div
                      className="step-number"
                      style={{
                        width: 'clamp(36px, 2.8vw, 46px)',
                        height: 'clamp(36px, 2.8vw, 46px)',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.accentBg}, rgba(255,255,255,0.05))`,
                        border: `2px solid ${step.accentColor}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        color: step.accentColor,
                        fontSize: 'clamp(12px, 0.85vw, 15px)',
                        letterSpacing: '0.05em',
                        boxShadow: `0 4px 15px ${step.accentColor}20`,
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Emoji box */}
                    <div
                      style={{
                        width: 'clamp(36px, 2.8vw, 46px)',
                        height: 'clamp(36px, 2.8vw, 46px)',
                        borderRadius: 'clamp(10px, 0.8vw, 14px)',
                        backgroundColor: step.accentBg,
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(16px, 1.3vw, 22px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        flexShrink: 0,
                      }}
                    >
                      {step.emoji}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      color: '#FFFFFF',
                      fontSize: 'clamp(15px, 1.2vw, 21px)',
                      lineHeight: 1.3,
                      margin: 0,
                      textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 'clamp(12px, 0.88vw, 16px)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div style={{ marginTop: 'auto', paddingTop: 'clamp(12px, 1.5vw, 24px)', flexShrink: 0 }}>
                  <div
                    style={{
                      width: 'clamp(24px, 3vw, 48px)',
                      height: '2px',
                      borderRadius: '2px',
                      background: `linear-gradient(90deg, ${step.accentColor}, transparent)`,
                      opacity: 0.6,
                    }}
                  />
                </div>
              </div>

              {/* Desktop connector */}
              {i < steps.length - 1 && (
                <div
                  className={`desktop-connector connector-line entrance-hiw-connector conn-${i} ${hasAnimated ? 'animate' : ''}`}
                  style={{
                    width: 'clamp(20px, 2.5vw, 40px)',
                    alignSelf: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    height: '20px',
                  }}
                >
                  <div className="connector-dot" />
                </div>
              )}

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="mobile-connector-wrapper justify-center" style={{ display: 'none' }}>
                  <div className="mobile-connector" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksScreen;