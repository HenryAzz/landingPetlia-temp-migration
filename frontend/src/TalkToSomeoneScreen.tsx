import { useEffect, useState, useRef } from 'react';

const TalkToSomeoneScreen = () => {
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
      id="que-es"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ backgroundColor: '#F3F3F3', minHeight: '100vh', paddingTop: '90px' }}
    >
      <style>{`
        @keyframes floatHeartLeft {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          25% { transform: translateY(-8px) scale(1.04) rotate(1.5deg); }
          50% { transform: translateY(-14px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.03) rotate(0.5deg); }
        }
        @keyframes floatLetterTop {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          20% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-6px) rotate(-2.5deg); }
          70% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes floatLetterBottom {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-7px) rotate(1.5deg); }
          60% { transform: translateY(-11px) rotate(-1.5deg); }
          85% { transform: translateY(-4px) rotate(0.8deg); }
        }
        @keyframes floatHeartRight {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          20% { transform: translateY(-6px) scale(1.02) rotate(-1deg); }
          50% { transform: translateY(-12px) scale(1.05) rotate(1.5deg); }
          80% { transform: translateY(-5px) scale(1.01) rotate(-0.5deg); }
        }
        .float-heart-left   { animation: floatHeartLeft   3.4s ease-in-out infinite; }
        .float-letter-top    { animation: floatLetterTop   4s   ease-in-out infinite; animation-delay: 0.6s; }
        .float-letter-bottom { animation: floatLetterBottom 3.8s ease-in-out infinite; animation-delay: 1.1s; }
        .float-heart-right   { animation: floatHeartRight  3.6s ease-in-out infinite; animation-delay: 0.4s; }

        .channel-pill {
          transition: all 0.3s ease;
        }
        .channel-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          0%   { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* Fade wrapper para íconos — NO toca transform, solo opacity */
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-title {
          opacity: 0;
        }
        .entrance-title.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }

        .entrance-pills {
          opacity: 0;
        }
        .entrance-pills.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.35s;
        }

        .entrance-pill-item {
          opacity: 0;
        }
        .entrance-pill-item.animate {
          animation: pillPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-pill-item.animate:nth-child(1) { animation-delay: 0.45s; }
        .entrance-pill-item.animate:nth-child(2) { animation-delay: 0.55s; }
        .entrance-pill-item.animate:nth-child(3) { animation-delay: 0.65s; }
        .entrance-pill-item.animate:nth-child(4) { animation-delay: 0.75s; }

        .entrance-text-1 {
          opacity: 0;
        }
        .entrance-text-1.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.55s;
        }

        .entrance-text-2 {
          opacity: 0;
        }
        .entrance-text-2.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }

        .entrance-cta {
          opacity: 0;
        }
        .entrance-cta.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.9s;
        }

        .entrance-phone {
          opacity: 0;
        }
        .entrance-phone.animate {
          animation: fadeScaleIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }

        /* Wrappers de íconos — solo controlan opacity, el hijo dentro flota libre */
        .icon-wrapper {
          opacity: 0;
        }
        .icon-wrapper.animate-icon-1 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.8s;
        }
        .icon-wrapper.animate-icon-2 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.95s;
        }
        .icon-wrapper.animate-icon-3 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 1.1s;
        }
        .icon-wrapper.animate-icon-4 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 1.25s;
        }
      `}</style>

      <div className="relative z-10 flex-1 flex min-h-0 w-full">
        {/* CAJA IZQUIERDA */}
        <div
          className="h-full flex items-center justify-center flex-shrink-0"
          style={{ width: '65%' }}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              width: '100%',
              maxWidth: '55vw',
              paddingLeft: '6vw',
              gap: '1.8vw',
            }}
          >
            <h2
              className={`entrance-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#F69E82',
                fontSize: '3.2vw',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              Habla con alguien{' '}
              <span style={{ fontWeight: 600 }}>real</span>
              <br />
              que te dedica toda su atención
            </h2>

            {/* Canales */}
            <div
              className={`flex items-center entrance-pills ${hasAnimated ? 'animate' : ''}`}
              style={{ gap: '0.6vw' }}
            >
              {[
                { emoji: '✉️', label: 'Cartas' },
                { emoji: '💬', label: 'Mensajes' },
                { emoji: '📞', label: 'Llamadas' },
                { emoji: '🎥', label: 'Citas virtuales' },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`channel-pill entrance-pill-item ${hasAnimated ? 'animate' : ''}`}
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

            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#5A5A5A',
                fontSize: '1.15vw',
                lineHeight: 1.8,
                letterSpacing: '0.02em',
                maxWidth: '42vw',
              }}
            >
              <p
                className={`entrance-text-1 ${hasAnimated ? 'animate' : ''}`}
                style={{ margin: 0, marginBottom: '1.2vw' }}
              >
                En un mundo donde la tecnología nos conecta pero la
                distancia nos separa, Camil abre un espacio cálido y
                genuino para quienes necesitan ser escuchados.
              </p>
              <p
                className={`entrance-text-2 ${hasAnimated ? 'animate' : ''}`}
                style={{ margin: 0 }}
              >
                Su deseo es dar amor y comprensión, risas, juegos y
                entretenimiento a través de mensajes, llamadas y citas
                virtuales.
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              className={`entrance-cta ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('como-funciona')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5vw',
                padding: '0.6vw 1.8vw',
                borderRadius: '50px',
                background:
                  'linear-gradient(135deg, rgba(246, 158, 130, 0.75), rgba(246, 158, 130, 0.55))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.95vw',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                boxShadow:
                  '0 4px 15px rgba(246, 158, 130, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(246,158,130,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(246,158,130,0.2)';
              }}
            >
              ¿Cómo funciona?
              <svg
                style={{ width: '1vw', height: '1vw' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div
          className="h-full flex-shrink-0 relative flex items-center justify-center"
          style={{ width: '35%' }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '100%',
              height: '100%',
              transform: 'translateX(-2.5vw)',
            }}
          >
            <img
              src="/celulargrande.png"
              alt="Celular con conversación"
              className={`relative z-10 object-contain entrance-phone ${hasAnimated ? 'animate' : ''}`}
              style={{
                width: 'clamp(200px, 22vw, 420px)',
                height: 'auto',
              }}
            />

            {/* Ícono 1 — corazón izquierda */}
            <div
              className={`absolute z-20 pointer-events-none icon-wrapper ${hasAnimated ? 'animate-icon-1' : ''}`}
              style={{
                left: '2%',
                bottom: '18%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            >
              <img
                src="/corazonizquierda.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'float-heart-left' : ''}`}
              />
            </div>

            {/* Ícono 2 — carta arriba */}
            <div
              className={`absolute z-20 pointer-events-none icon-wrapper ${hasAnimated ? 'animate-icon-2' : ''}`}
              style={{
                left: '0%',
                top: '15%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            >
              <img
                src="/carta.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'float-letter-top' : ''}`}
              />
            </div>

            {/* Ícono 3 — carta abajo */}
            <div
              className={`absolute z-20 pointer-events-none icon-wrapper ${hasAnimated ? 'animate-icon-3' : ''}`}
              style={{
                right: '2%',
                bottom: '18%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            >
              <img
                src="/carta.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'float-letter-bottom' : ''}`}
              />
            </div>

            {/* Ícono 4 — corazón derecha */}
            <div
              className={`absolute z-20 pointer-events-none icon-wrapper ${hasAnimated ? 'animate-icon-4' : ''}`}
              style={{
                right: '0%',
                top: '15%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            >
              <img
                src="/corazonderecha.png"
                alt=""
                className={`object-contain w-full h-full ${mounted ? 'float-heart-right' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToSomeoneScreen;