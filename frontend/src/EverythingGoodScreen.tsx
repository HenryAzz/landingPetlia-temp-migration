import { useEffect, useState } from 'react';

const EverythingGoodScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
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

        .glass-badge {
          transition: all 0.3s ease;
        }
        .glass-badge:hover {
          background: linear-gradient(
            135deg,
            rgba(246, 158, 130, 0.18),
            rgba(249, 221, 163, 0.22)
          );
          border-color: rgba(246, 158, 130, 0.5);
          transform: translateY(-1px);
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
            className="absolute bottom-0 left-0 object-contain object-left-bottom"
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
            {/* Icono 1 — por encima del título */}
            <img
              src="/corazonderecha.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'gentle-swing-1' : ''}`}
              style={{
                right: '-4vw',
                top: '-3vw',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            />

            {/* Título */}
            <h2
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

            {/* Badges glassmorphism */}
            <div
              className="flex items-center"
              style={{
                gap: '0.55vw',
              }}
            >
              {[
                { emoji: '🤗', label: 'Sin presiones' },
                { emoji: '🌸', label: 'A tu ritmo' },
                { emoji: '🔒', label: 'Sin compromisos' },
              ].map((item, i) => (
                <span
                  key={i}
                  className="glass-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4vw',
                    padding: '0.4vw 1.1vw',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(246, 158, 130, 0.35)',
                    boxShadow:
                      '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(246, 158, 130, 0.08)',
                    color: '#9E6B55',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.85vw',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '0.88vw' }}>{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* Icono 2 — entre badges y texto */}
            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'gentle-swing-2' : ''}`}
              style={{
                right: '-4vw',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            />

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
              <p style={{ margin: 0, marginBottom: '1.2vw' }}>
                Con un gran sentido del humor, dulce y elocuente, Camil
                crea un espacio donde podés ser vos sin explicaciones.
              </p>
              <p style={{ margin: 0 }}>
                Atenta a tus gustos y momentos especiales, te acompaña
                marcando un antes y un después en tu vida.
              </p>
            </div>

            {/* CTA Botón glass */}
            <button
              type="button"
              className="cta-glass flex items-center justify-center"
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

            {/* Icono 3 — al final del contenido */}
            <img
              src="/corazonizquierda.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'gentle-swing-3' : ''}`}
              style={{
                right: '-4vw',
                bottom: '-3vw',
                width: 'clamp(35px, 4.5vw, 75px)',
                height: 'clamp(35px, 4.5vw, 75px)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverythingGoodScreen;