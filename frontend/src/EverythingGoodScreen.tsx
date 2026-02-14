import { useEffect, useState, useRef } from 'react';

const EverythingGoodScreen = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col"
      style={{ backgroundColor: '#F3F3F3', height: '100vh' }}
    >
      <style>{`
        @keyframes gentleSwing1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(-1px) rotate(-1.5deg); }
          75% { transform: translateY(-4px) rotate(1deg); }
        }
        @keyframes gentleSwing2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-2px) rotate(-2deg); }
          60% { transform: translateY(-4px) rotate(1.5deg); }
          85% { transform: translateY(-1px) rotate(-0.5deg); }
        }
        @keyframes gentleSwing3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          20% { transform: translateY(-3px) rotate(1.5deg); }
          55% { transform: translateY(-2px) rotate(-2deg); }
          80% { transform: translateY(-4px) rotate(0.8deg); }
        }
        .gentle-swing-1 { animation: gentleSwing1 5s ease-in-out infinite; }
        .gentle-swing-2 { animation: gentleSwing2 5.5s ease-in-out infinite; animation-delay: 0.8s; }
        .gentle-swing-3 { animation: gentleSwing3 4.8s ease-in-out infinite; animation-delay: 1.5s; }

        .channel-pill-light {
          transition: all 0.3s ease;
        }
        .channel-pill-light:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .cta-glass {
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .cta-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transition: left 0.5s ease;
        }
        .cta-glass:hover::before {
          left: 100%;
        }
        .cta-glass:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 25px rgba(246, 158, 130, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardSlideUp {
          0%   { opacity: 0; transform: translateY(30px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Imagen izquierda */
        .entrance-image {
          opacity: 0;
        }
        .entrance-image.animate {
          animation: fadeSlideRight 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.15s;
        }

        /* Título */
        .entrance-title-eg {
          opacity: 0;
        }
        .entrance-title-eg.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }

        /* Pills container */
        .entrance-pills-eg {
          opacity: 0;
        }
        .entrance-pills-eg.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.35s;
        }

        /* Pill items individuales */
        .entrance-pill-eg {
          opacity: 0;
        }
        .entrance-pill-eg.animate {
          animation: pillPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-pill-eg.animate:nth-child(1) { animation-delay: 0.45s; }
        .entrance-pill-eg.animate:nth-child(2) { animation-delay: 0.55s; }
        .entrance-pill-eg.animate:nth-child(3) { animation-delay: 0.65s; }

        /* Textos */
        .entrance-text-eg-1 {
          opacity: 0;
        }
        .entrance-text-eg-1.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.55s;
        }
        .entrance-text-eg-2 {
          opacity: 0;
        }
        .entrance-text-eg-2.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }

        /* Card límites */
        .entrance-card-eg {
          opacity: 0;
        }
        .entrance-card-eg.animate {
          animation: cardSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.85s;
        }

        /* CTA */
        .entrance-cta-eg {
          opacity: 0;
        }
        .entrance-cta-eg.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1s;
        }

        /* Icon wrappers — solo opacity, no tocan transform */
        .icon-wrapper-eg {
          opacity: 0;
        }
        .icon-wrapper-eg.animate-icon-eg-1 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.7s;
        }
        .icon-wrapper-eg.animate-icon-eg-2 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.9s;
        }
        .icon-wrapper-eg.animate-icon-eg-3 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 1.1s;
        }
      `}</style>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex min-h-0 w-full">

        {/* CAJA IZQUIERDA — 45% */}
        <div
          className="h-full flex-shrink-0 relative"
          style={{ width: '45%' }}
        >
          <img
            src="/beso.png"
            alt="Beso"
            className={`absolute bottom-0 left-0 object-contain object-left-bottom entrance-image ${hasAnimated ? 'animate' : ''}`}
            style={{
              width: '100%',
              maxHeight: '100%',
            }}
          />
        </div>

        {/* CAJA DERECHA — 55% */}
        <div
          className="h-full flex-shrink-0 relative flex items-center"
          style={{ width: '55%' }}
        >
          <div
            className="flex flex-col justify-center relative"
            style={{
              width: '100%',
              maxWidth: '45vw',
              paddingLeft: '3vw',
              paddingRight: '6vw',
              gap: '1.8vw',
            }}
          >
            {/* Icono 1 — wrapper fade + hijo swing */}
            <div
              className={`absolute pointer-events-none icon-wrapper-eg ${hasAnimated ? 'animate-icon-eg-1' : ''}`}
              style={{
                right: '-4vw',
                top: '-3vw',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            >
              <img
                src="/corazonderecha.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'gentle-swing-1' : ''}`}
              />
            </div>

            {/* Título */}
            <h2
              className={`entrance-title-eg ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#F69E82',
                fontSize: '3.2vw',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Todo lo que te hace{' '}
              <span style={{ fontWeight: 600 }}>bien</span>,
              <br />
              sin todo lo que incomoda.
            </h2>

            {/* Badges */}
            <div
              className={`flex items-center entrance-pills-eg ${hasAnimated ? 'animate' : ''}`}
              style={{ gap: '0.6vw' }}
            >
              {[
                { emoji: '🤗', label: 'Sin presiones' },
                { emoji: '🌸', label: 'A tu ritmo' },
                { emoji: '🔒', label: 'Sin compromisos' },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`channel-pill-light entrance-pill-eg ${hasAnimated ? 'animate' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4vw',
                    padding: '0.45vw 1.15vw',
                    borderRadius: '50px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(246,158,130,0.25)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    color: '#7A5C4F',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.88vw',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                >
                  <span style={{ fontSize: '0.9vw' }}>{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* Icono 2 — wrapper fade + hijo swing */}
            <div
              className={`absolute pointer-events-none icon-wrapper-eg ${hasAnimated ? 'animate-icon-eg-2' : ''}`}
              style={{
                right: '-4vw',
                top: '50%',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            >
              <img
                src="/carta.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'gentle-swing-2' : ''}`}
              />
            </div>

            {/* Texto descriptivo */}
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#5A5A5A',
                fontSize: '1.15vw',
                lineHeight: 1.8,
                letterSpacing: '0.02em',
              }}
            >
              <p
                className={`entrance-text-eg-1 ${hasAnimated ? 'animate' : ''}`}
                style={{ margin: 0, marginBottom: '1.2vw' }}
              >
                Con un gran sentido del humor, dulce y elocuente, Camil
                crea un espacio donde podés ser vos sin explicaciones.
              </p>
              <p
                className={`entrance-text-eg-2 ${hasAnimated ? 'animate' : ''}`}
                style={{ margin: 0 }}
              >
                Atenta a tus gustos y momentos especiales, te acompaña
                marcando un antes y un después en tu vida.
              </p>
            </div>

            {/* Bloque límites claros */}
            <div
              className={`entrance-card-eg ${hasAnimated ? 'animate' : ''}`}
              style={{
                padding: '1vw 1.4vw',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(246,158,130,0.2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8vw',
              }}
            >
              <span style={{ fontSize: '1.1vw', flexShrink: 0, marginTop: '0.1vw' }}>🤍</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: '#7A5C4F',
                    fontSize: '0.85vw',
                    margin: 0,
                    marginBottom: '0.3vw',
                  }}
                >
                  Compañía genuina, con límites claros
                </p>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: '#7A7A7A',
                    fontSize: '0.78vw',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Camil ofrece contención emocional, conversación y
                  entretenimiento en un marco de respeto mutuo. No es un
                  servicio de citas ni de contenido para adultos.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className={`cta-glass flex items-center justify-center entrance-cta-eg ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('vinculos')}
              style={{
                alignSelf: 'flex-start',
                padding: '0.7vw 2.2vw',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, rgba(246, 158, 130, 0.75), rgba(246, 158, 130, 0.55))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.95vw',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                gap: '0.5vw',
                boxShadow:
                  '0 4px 15px rgba(246, 158, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              Conocé los vínculos
              <svg
                style={{ width: '1.1vw', height: '1.1vw' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            {/* Icono 3 — wrapper fade + hijo swing */}
            <div
              className={`absolute pointer-events-none icon-wrapper-eg ${hasAnimated ? 'animate-icon-eg-3' : ''}`}
              style={{
                right: '-4vw',
                bottom: '-3vw',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            >
              <img
                src="/corazonizquierda.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'gentle-swing-3' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverythingGoodScreen;