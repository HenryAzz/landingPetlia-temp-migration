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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
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
      className="relative w-full overflow-hidden"
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

        /* ── Zig-zag stagger ── */
        .bond-card-stagger-right {
          margin-left: clamp(8px, 1.5vw, 24px);
          margin-right: 0;
        }
        .bond-card-stagger-left {
          margin-left: 0;
          margin-right: clamp(8px, 1.5vw, 24px);
        }

        @media (max-width: 1024px) {
          .bond-card-stagger-right {
            margin-left: 12px;
            margin-right: 0;
          }
          .bond-card-stagger-left {
            margin-left: 0;
            margin-right: 12px;
          }
        }

        @media (max-width: 640px) {
          .bond-card-stagger-right {
            margin-left: 0;
            margin-right: 0;
          }
          .bond-card-stagger-left {
            margin-left: 0;
            margin-right: 0;
          }
        }

        /* ── Entrance animations ── */
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
        @keyframes cardSlideUp {
          0%   { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-bond-title { opacity: 0; }
        .entrance-bond-title.animate {
          animation: fadeSlideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-bond-subtitle { opacity: 0; }
        .entrance-bond-subtitle.animate {
          animation: fadeSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }
        .entrance-bond-cta { opacity: 0; }
        .entrance-bond-cta.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.5s;
        }
        .entrance-bond-card { opacity: 0; }
        .entrance-bond-card.animate {
          animation: cardSlideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-bond-card.animate.bond-card-0 { animation-delay: 0.35s; }
        .entrance-bond-card.animate.bond-card-1 { animation-delay: 0.55s; }
        .entrance-bond-card.animate.bond-card-2 { animation-delay: 0.75s; }

        .bond-icon-wrapper { opacity: 0; }
        .bond-icon-wrapper.animate-bond-icon-0 {
          animation: iconFadeIn 0.5s ease forwards; animation-delay: 0.7s;
        }
        .bond-icon-wrapper.animate-bond-icon-1 {
          animation: iconFadeIn 0.5s ease forwards; animation-delay: 0.9s;
        }
        .bond-icon-wrapper.animate-bond-icon-2 {
          animation: iconFadeIn 0.5s ease forwards; animation-delay: 1.1s;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .entrance-bond-card.animate {
            animation-name: cardSlideUp;
          }
          .entrance-bond-title.animate,
          .entrance-bond-subtitle.animate {
            animation-name: fadeSlideUp;
          }
        }

        .bond-layout {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
        }
        .bond-left {
          width: 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bond-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-left: 6vw;
          padding-right: 3vw;
          gap: 2.5vw;
        }
        .bond-right {
          width: 55%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bond-cards-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 40vw;
          gap: 1.5vw;
        }

        @media (max-width: 1024px) {
          .bond-layout {
            flex-direction: column;
            min-height: auto;
            padding: 80px 0 60px;
          }
          .bond-left {
            width: 100%;
            padding: 0 32px;
          }
          .bond-left-inner {
            padding-left: 0;
            padding-right: 0;
            align-items: center;
            text-align: center;
            gap: 20px;
            margin-bottom: 44px;
          }
          .bond-right {
            width: 100%;
            padding: 0 32px;
          }
          .bond-cards-container {
            max-width: 520px;
            margin: 0 auto;
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .bond-layout {
            padding: 60px 0 50px;
          }
          .bond-left {
            padding: 0 24px;
          }
          .bond-left-inner {
            gap: 16px;
            margin-bottom: 36px;
          }
          .bond-right {
            padding: 0 24px;
          }
          .bond-cards-container {
            max-width: 100%;
            gap: 28px;
          }
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

      <div className="relative z-10 bond-layout">
        {/* CAJA IZQUIERDA */}
        <div className="bond-left">
          <div className="bond-left-inner">
            <h2
              className={`entrance-bond-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: 'clamp(36px, 5.8vw, 90px)',
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
                fontSize: 'clamp(16px, 2.3vw, 35px)',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                margin: 0,
                opacity: 0.9,
                maxWidth: 'clamp(280px, 90%, 500px)',
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
                gap: 'clamp(6px, 0.5vw, 10px)',
                padding: 'clamp(10px, 0.7vw, 14px) clamp(24px, 2vw, 36px)',
                borderRadius: '50px',
                background:
                  'linear-gradient(135deg, rgba(249,221,163,0.8), rgba(249,221,163,0.6))',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#5A4520',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(13px, 0.95vw, 16px)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(249,221,163,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(249,221,163,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(249,221,163,0.25)';
              }}
            >
              Ver precios
              <svg
                style={{ width: 'clamp(14px, 1vw, 18px)', height: 'clamp(14px, 1vw, 18px)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div className="bond-right">
          <div className="bond-cards-container">

            {/* Card 1 — Correspondencia */}
            <div
              className={`bond-card bond-card-stagger-right relative entrance-bond-card bond-card-0 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(14, 116, 144, 0.5)',
                borderRadius: 'clamp(14px, 1.2vw, 19px)',
                padding: 'clamp(18px, 1.6vw, 28px) clamp(20px, 1.8vw, 30px)',
                minHeight: 'clamp(100px, 9.5vw, 160px)',
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(17px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: 'clamp(6px, 0.6vw, 10px)',
                }}
              >
                Correspondencia especial
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(12px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                  paddingRight: 'clamp(40px, 4vw, 70px)',
                }}
              >
                Dale chispa a tu semana con un toque encantador y un
                espacio al mes para compartir tiempo juntos
              </p>
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-0' : ''}`}
                style={{
                  right: '0',
                  top: '0',
                  transform: 'translate(35%, -35%)',
                  width: 'clamp(50px, 5.5vw, 90px)',
                  height: 'clamp(50px, 5.5vw, 90px)',
                }}
              >
                <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'card-icon-1' : ''}`} />
              </div>
            </div>

            {/* Card 2 — Casual */}
            <div
              className={`bond-card bond-card-stagger-left relative entrance-bond-card bond-card-1 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.6)',
                borderRadius: 'clamp(14px, 1.2vw, 19px)',
                padding: 'clamp(18px, 1.6vw, 28px) clamp(20px, 1.8vw, 30px)',
                minHeight: 'clamp(100px, 9.5vw, 160px)',
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(-8px, -0.6vw, -5px)',
                  right: 'clamp(12px, 1.5vw, 24px)',
                  padding: 'clamp(3px, 0.2vw, 5px) clamp(10px, 0.8vw, 14px)',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(9px, 0.65vw, 12px)',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                ⭐ MÁS ELEGIDO
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(17px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: 'clamp(6px, 0.6vw, 10px)',
                }}
              >
                Casualmente cotidiano
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(12px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Mantené una conversación para compartir más que el día a
                día y juntarse de vez en cuando
              </p>
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-1' : ''}`}
                style={{
                  left: '-1.5vw',
                  bottom: '-1vw',
                  transform: 'translate(-40%, 40%)',
                  width: 'clamp(100px, 10vw, 155px)',
                  height: 'clamp(100px, 10vw, 155px)',
                }}
              >
                <img src="/celular.png" alt="" className={`object-contain w-full h-full ${mounted ? 'card-icon-2' : ''}`} />
              </div>
            </div>

            {/* Card 3 — Diaria */}
            <div
              className={`bond-card bond-card-stagger-right relative entrance-bond-card bond-card-2 ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('planes')}
              style={{
                backgroundColor: 'rgba(234, 179, 8, 0.6)',
                borderRadius: 'clamp(14px, 1.2vw, 19px)',
                padding: 'clamp(18px, 1.6vw, 28px) clamp(20px, 1.8vw, 30px)',
                minHeight: 'clamp(100px, 9.5vw, 160px)',
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25), inset 1px 4px 8px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#FFFFFF',
                  fontSize: 'clamp(17px, 1.9vw, 30px)',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: 'clamp(6px, 0.6vw, 10px)',
                }}
              >
                Compañía diaria
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  color: '#E5E5E5',
                  fontSize: 'clamp(12px, 1.1vw, 18px)',
                  lineHeight: 1.5,
                  margin: 0,
                  paddingRight: 'clamp(40px, 4vw, 70px)',
                }}
              >
                Cómplice de cada momento, transformá lo cotidiano en pura
                magia y alegría como tu fiel compañera
              </p>
              <div
                className={`absolute pointer-events-none bond-icon-wrapper ${hasAnimated ? 'animate-bond-icon-2' : ''}`}
                style={{
                  right: '0',
                  bottom: '0',
                  transform: 'translate(35%, 35%)',
                  width: 'clamp(55px, 6vw, 95px)',
                  height: 'clamp(55px, 6vw, 95px)',
                }}
              >
                <img src="/billete.png" alt="" className={`object-contain w-full h-full ${mounted ? 'card-icon-3' : ''}`} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourBondScreen;