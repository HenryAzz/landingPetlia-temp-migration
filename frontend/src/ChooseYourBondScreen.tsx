import { useEffect, useState, useRef } from 'react';

const ChooseYourBondScreen = () => {
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
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="vinculos"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: '100vh' }}
    >
      <style>{`
        @keyframes gentleFloat1 {
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50% { transform: rotate(-10deg) translateY(-5px); }
        }
        @keyframes gentleFloat2 {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-23deg) translateY(-4px); }
        }
        @keyframes gentleFloat3 {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(17deg) translateY(-5px); }
        }
        .card-icon-1 { animation: gentleFloat1 4s ease-in-out infinite; }
        .card-icon-2 { animation: gentleFloat2 4.5s ease-in-out infinite; animation-delay: 0.7s; }
        .card-icon-3 { animation: gentleFloat3 3.8s ease-in-out infinite; animation-delay: 1.2s; }
        .bond-card {
          transition: all 0.35s ease;
          cursor: pointer;
        }
        .bond-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.3), inset 1px 4px 8px rgba(0,0,0,0.25);
        }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardSlideIn {
          0%   { opacity: 0; transform: translateX(60px) scale(0.93); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Título */
        .entrance-bond-title {
          opacity: 0;
        }
        .entrance-bond-title.animate {
          animation: fadeSlideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }

        /* Subtítulo */
        .entrance-bond-subtitle {
          opacity: 0;
        }
        .entrance-bond-subtitle.animate {
          animation: fadeSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }

        /* CTA */
        .entrance-bond-cta {
          opacity: 0;
        }
        .entrance-bond-cta.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.5s;
        }

        /* Cards */
        .entrance-bond-card {
          opacity: 0;
        }
        .entrance-bond-card.animate {
          animation: cardSlideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-bond-card.animate.bond-card-0 { animation-delay: 0.35s; }
        .entrance-bond-card.animate.bond-card-1 { animation-delay: 0.55s; }
        .entrance-bond-card.animate.bond-card-2 { animation-delay: 0.75s; }

        /* Icon wrappers — solo opacity, no tocan transform */
        .bond-icon-wrapper {
          opacity: 0;
        }
        .bond-icon-wrapper.animate-bond-icon-0 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 0.7s;
        }
        .bond-icon-wrapper.animate-bond-icon-1 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 0.9s;
        }
        .bond-icon-wrapper.animate-bond-icon-2 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 1.1s;
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/fondoliso.jpeg"
          alt=""
          className="object-cover"
          style={{
            width: '140%',
            height: '140%',
            minWidth: '140%',
            minHeight: '140%',
            transform: 'translateY(-8%)',
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex min-h-0 w-full">
        {/* CAJA IZQUIERDA */}
        <div
          className="h-full flex items-center justify-center flex-shrink-0"
          style={{ width: '45%' }}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              width: '100%',
              paddingLeft: '6vw',
              paddingRight: '3vw',
              gap: '2.5vw',
            }}
          >
            <h2
              className={`entrance-bond-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: 'clamp(48px, 5.8vw, 90px)',
                lineHeight: 1.15,
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Tu tiempo,
              <br />
              tu <span style={{ fontWeight: 500 }}>espacio</span>.
            </h2>

            <p
              className={`entrance-bond-subtitle ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: 'clamp(22px, 2.3vw, 35px)',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                margin: 0,
                opacity: 0.9,
                maxWidth: '90%',
              }}
            >
              Elegí el vínculo que mejor se adapte a vos y date el mimo
              que necesitás
            </p>

            <button
              type="button"
              className={`entrance-bond-cta ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5vw',
                padding: '0.7vw 2vw',
                borderRadius: '50px',
                background:
                  'linear-gradient(135deg, rgba(249,221,163,0.8), rgba(249,221,163,0.6))',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#5A4520',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '0.95vw',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(249,221,163,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(249,221,163,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(249,221,163,0.25)';
              }}
            >
              Ver precios
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
          className="h-full flex-shrink-0 flex items-center justify-center"
          style={{ width: '55%' }}
        >
          <div
            className="flex flex-col"
            style={{ width: '100%', maxWidth: '40vw', gap: '1.5vw' }}
          >
            {/* Card 1 */}
            <div
              className={`bond-card relative entrance-bond-card bond-card-0 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(14, 116, 144, 0.5)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '1vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(18px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: '0.6vw',
                }}
              >
                Correspondencia especial
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(13px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Dale chispa a tu semana con un toque encantador y un
                espacio al mes para compartir tiempo juntos
              </p>
              {/* Icon wrapper — opacity only */}
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-0' : ''}`}
                style={{
                  right: '-1.5vw',
                  top: '-1.5vw',
                  width: 'clamp(50px, 5vw, 80px)',
                  height: 'clamp(50px, 5vw, 80px)',
                }}
              >
                <img
                  src="/carta.png"
                  alt=""
                  className={`object-contain w-full h-full ${mounted ? 'card-icon-1' : ''}`}
                />
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={`bond-card relative entrance-bond-card bond-card-1 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.6)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '-1vw',
                marginRight: '2.5vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-0.6vw',
                  right: '1.5vw',
                  padding: '0.2vw 0.8vw',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.65vw',
                  letterSpacing: '0.08em',
                }}
              >
                ⭐ MÁS ELEGIDO
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(18px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: '0.6vw',
                }}
              >
                Casualmente cotidiano
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(13px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Mantené una conversación para compartir más que el día a
                día y juntarse de vez en cuando
              </p>
              {/* Icon wrapper — opacity only */}
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-1' : ''}`}
                style={{
                  left: '-4vw',
                  bottom: '-4.5vw',
                  width: 'clamp(85px, 9vw, 140px)',
                  height: 'clamp(85px, 9vw, 140px)',
                }}
              >
                <img
                  src="/celular.png"
                  alt=""
                  className={`object-contain w-full h-full ${mounted ? 'card-icon-2' : ''}`}
                />
              </div>
            </div>

            {/* Card 3 */}
            <div
              className={`bond-card relative entrance-bond-card bond-card-2 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(234, 179, 8, 0.6)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '1vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(18px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: '0.6vw',
                }}
              >
                Compañía diaria
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(13px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Cómplice de cada momento, transformá lo cotidiano en pura
                magia y alegría como tu fiel compañera
              </p>
              {/* Icon wrapper — opacity only */}
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-2' : ''}`}
                style={{
                  right: '-1.5vw',
                  bottom: '-1.5vw',
                  width: 'clamp(50px, 5vw, 80px)',
                  height: 'clamp(50px, 5vw, 80px)',
                }}
              >
                <img
                  src="/billete.png"
                  alt=""
                  className={`object-contain w-full h-full ${mounted ? 'card-icon-3' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourBondScreen;