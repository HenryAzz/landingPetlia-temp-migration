import { useEffect, useState } from 'react';

const PricingScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col"
      style={{ backgroundColor: '#F3F3F3', minHeight: '100vh', paddingTop: '8vw', paddingBottom: '5vw' }}
    >
      <style>{`
        @keyframes gentlePulse1 {
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50% { transform: rotate(-10deg) translateY(-4px); }
        }
        @keyframes gentlePulse2 {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-23deg) translateY(-3px); }
        }
        @keyframes gentlePulse3 {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(17deg) translateY(-4px); }
        }
        .pricing-icon-1 { animation: gentlePulse1 4s ease-in-out infinite; }
        .pricing-icon-2 { animation: gentlePulse2 4.5s ease-in-out infinite; animation-delay: 0.7s; }
        .pricing-icon-3 { animation: gentlePulse3 3.8s ease-in-out infinite; animation-delay: 1.2s; }

        .pricing-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .pricing-card:hover {
          transform: translateY(-6px);
        }

        .pricing-cta {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .pricing-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .pricing-cta:hover::before {
          left: 100%;
        }
        .pricing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Onda amarilla arriba */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: '65px', transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z"
            fill="#F9DDA3"
          />
        </svg>
      </div>

      {/* Contenido principal */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
      >

        {/* Título */}
        <div
          className="flex flex-col items-center"
          style={{ marginBottom: '3vw' }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: '#F69E82',
              fontSize: '3.2vw',
              lineHeight: 1.3,
              letterSpacing: '0.02em',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Elegí tu{' '}
            <span style={{ fontWeight: 600 }}>vínculo</span>
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: '#5A5A5A',
              fontSize: '1.1vw',
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              margin: 0,
              marginTop: '0.8vw',
              textAlign: 'center',
            }}
          >
            Cada plan es un mundo. Elegí el que mejor te abrace.
          </p>
        </div>

        {/* Cards de pricing */}
        <div
          className="flex items-stretch justify-center"
          style={{ gap: '1.8vw' }}
        >

          {/* Card 1 — Correspondencia especial */}
          <div
            className="pricing-card relative flex flex-col"
            style={{
              width: '20vw',
              borderRadius: '22px',
              overflow: 'visible',
              background: 'linear-gradient(180deg, rgba(14, 116, 144, 0.08) 0%, rgba(14, 116, 144, 0.03) 100%)',
              border: '1px solid rgba(14, 116, 144, 0.2)',
              padding: '2vw 1.6vw',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            }}
          >
            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'pricing-icon-1' : ''}`}
              style={{
                right: '-1.2vw',
                top: '-1.2vw',
                width: 'clamp(40px, 4vw, 65px)',
                height: 'clamp(40px, 4vw, 65px)',
              }}
            />

            <div
              style={{
                width: '3vw',
                height: '4px',
                borderRadius: '4px',
                backgroundColor: 'rgba(14, 116, 144, 0.6)',
                marginBottom: '1.2vw',
              }}
            />

            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: '#2A2A2A',
                fontSize: 'clamp(16px, 1.4vw, 24px)',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
                marginBottom: '1vw',
              }}
            >
              Correspondencia
              <br />
              especial
            </h3>

            <div style={{ marginBottom: '1.2vw' }}>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  color: 'rgba(14, 116, 144, 0.9)',
                  fontSize: 'clamp(28px, 2.6vw, 42px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                $90.000
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#888',
                  fontSize: '0.85vw',
                  marginLeft: '0.3vw',
                }}
              >
                /mes
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(14, 116, 144, 0.12)',
                marginBottom: '1.2vw',
              }}
            />

            <div
              className="flex flex-col"
              style={{ gap: '0.7vw', flex: 1 }}
            >
              {[
                'Intercambio de 4 cartas semanales',
                'Una cita virtual de 3 hs al mes',
                'Respuestas personalizadas y cálidas',
                'Atención a tus momentos especiales',
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start"
                  style={{ gap: '0.5vw' }}
                >
                  <span
                    style={{
                      color: 'rgba(14, 116, 144, 0.7)',
                      fontSize: '0.9vw',
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: '#5A5A5A',
                      fontSize: '0.88vw',
                      lineHeight: 1.6,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="pricing-cta"
              style={{
                width: '100%',
                padding: '0.65vw 0',
                borderRadius: '50px',
                backgroundColor: 'rgba(14, 116, 144, 0.15)',
                border: '1px solid rgba(14, 116, 144, 0.3)',
                color: 'rgba(14, 116, 144, 0.9)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.9vw',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                marginTop: '1.5vw',
              }}
            >
              Elegir plan
            </button>
          </div>

          {/* Card 2 — Casualmente cotidiano (DESTACADA) */}
          <div
            className="pricing-card relative flex flex-col"
            style={{
              width: '22vw',
              borderRadius: '22px',
              overflow: 'visible',
              background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.1) 0%, rgba(244, 63, 94, 0.04) 100%)',
              border: '2px solid rgba(244, 63, 94, 0.3)',
              padding: '2vw 1.6vw',
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.08)',
              transform: 'scale(1.04)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-0.8vw',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0.25vw 1vw',
                borderRadius: '50px',
                backgroundColor: 'rgba(244, 63, 94, 0.85)',
                color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.7vw',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              ⭐ MÁS ELEGIDO
            </div>

            <img
              src="/celular.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'pricing-icon-2' : ''}`}
              style={{
                right: '-1.8vw',
                top: '-1.8vw',
                width: 'clamp(55px, 5.5vw, 85px)',
                height: 'clamp(55px, 5.5vw, 85px)',
              }}
            />

            <div
              style={{
                width: '3vw',
                height: '4px',
                borderRadius: '4px',
                backgroundColor: 'rgba(244, 63, 94, 0.6)',
                marginBottom: '1.2vw',
              }}
            />

            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: '#2A2A2A',
                fontSize: 'clamp(16px, 1.4vw, 24px)',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
                marginBottom: '1vw',
              }}
            >
              Casualmente
              <br />
              cotidiano
            </h3>

            <div style={{ marginBottom: '1.2vw' }}>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  color: 'rgba(244, 63, 94, 0.9)',
                  fontSize: 'clamp(28px, 2.6vw, 42px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                $180.000
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#888',
                  fontSize: '0.85vw',
                  marginLeft: '0.3vw',
                }}
              >
                /mes
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                marginBottom: '1.2vw',
              }}
            />

            <div
              className="flex flex-col"
              style={{ gap: '0.7vw', flex: 1 }}
            >
              {[
                'Número de teléfono exclusivo',
                'Conversaciones fluidas y seguidas',
                'Llamadas limitadas incluidas',
                'Una cita virtual de 3 hs al mes',
                'Atención a tus momentos especiales',
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start"
                  style={{ gap: '0.5vw' }}
                >
                  <span
                    style={{
                      color: 'rgba(244, 63, 94, 0.7)',
                      fontSize: '0.9vw',
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: '#5A5A5A',
                      fontSize: '0.88vw',
                      lineHeight: 1.6,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="pricing-cta"
              style={{
                width: '100%',
                padding: '0.65vw 0',
                borderRadius: '50px',
                backgroundColor: 'rgba(244, 63, 94, 0.85)',
                border: '1px solid rgba(244, 63, 94, 0.4)',
                color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.9vw',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                marginTop: '1.5vw',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.15)',
              }}
            >
              Elegir plan
            </button>
          </div>

          {/* Card 3 — Compañía diaria */}
          <div
            className="pricing-card relative flex flex-col"
            style={{
              width: '20vw',
              borderRadius: '22px',
              overflow: 'visible',
              background: 'linear-gradient(180deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.03) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              padding: '2vw 1.6vw',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            }}
          >
            <img
              src="/billete.png"
              alt=""
              className={`absolute object-contain pointer-events-none ${mounted ? 'pricing-icon-3' : ''}`}
              style={{
                right: '-1.2vw',
                top: '-1.2vw',
                width: 'clamp(40px, 4vw, 65px)',
                height: 'clamp(40px, 4vw, 65px)',
              }}
            />

            <div
              style={{
                width: '3vw',
                height: '4px',
                borderRadius: '4px',
                backgroundColor: 'rgba(234, 179, 8, 0.6)',
                marginBottom: '1.2vw',
              }}
            />

            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: '#2A2A2A',
                fontSize: 'clamp(16px, 1.4vw, 24px)',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
                marginBottom: '1vw',
              }}
            >
              Compañía
              <br />
              diaria
            </h3>

            <div style={{ marginBottom: '1.2vw' }}>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  color: 'rgba(234, 179, 8, 0.9)',
                  fontSize: 'clamp(28px, 2.6vw, 42px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                $380.000
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: '#888',
                  fontSize: '0.85vw',
                  marginLeft: '0.3vw',
                }}
              >
                /mes
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                marginBottom: '1.2vw',
              }}
            />

            <div
              className="flex flex-col"
              style={{ gap: '0.7vw', flex: 1 }}
            >
              {[
                'Mensajes ilimitados diarios',
                'Llamadas incluidas sin límite',
                'Dos citas virtuales de 3 hs al mes',
                'Prioridad en atención y respuestas',
                'Compañera fiel en cada momento',
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start"
                  style={{ gap: '0.5vw' }}
                >
                  <span
                    style={{
                      color: 'rgba(234, 179, 8, 0.8)',
                      fontSize: '0.9vw',
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: '#5A5A5A',
                      fontSize: '0.88vw',
                      lineHeight: 1.6,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="pricing-cta"
              style={{
                width: '100%',
                padding: '0.65vw 0',
                borderRadius: '50px',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                color: 'rgba(180, 140, 8, 0.9)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.9vw',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                marginTop: '1.5vw',
              }}
            >
              Elegir plan
            </button>
          </div>
        </div>

        {/* Aviso de privacidad */}
        <div
          className="flex items-start"
          style={{
            marginTop: '3.5vw',
            maxWidth: '55vw',
            padding: '1.4vw 2vw',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(246, 158, 130, 0.25)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
            gap: '1.2vw',
          }}
        >
          <div
            style={{
              width: 'clamp(32px, 2.5vw, 42px)',
              height: 'clamp(32px, 2.5vw, 42px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(246, 158, 130, 0.2), rgba(249, 221, 163, 0.15))',
              border: '1px solid rgba(246, 158, 130, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 'clamp(14px, 1.2vw, 20px)',
            }}
          >
            🔒
          </div>
          <div>
            <h4
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: '#F69E82',
                fontSize: '0.95vw',
                letterSpacing: '0.03em',
                margin: 0,
                marginBottom: '0.4vw',
              }}
            >
              Privacidad y seguridad garantizada
            </h4>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#5A5A5A',
                fontSize: '0.85vw',
                lineHeight: 1.7,
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              La identidad de Camil se mantendrá siempre en incógnito por su seguridad.
              No se mostrará su rostro en ningún momento, sin excepción.
              Todas las interacciones se realizan en un marco de respeto, confianza y discreción absoluta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingScreen;