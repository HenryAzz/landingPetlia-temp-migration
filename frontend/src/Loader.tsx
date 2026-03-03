import { useEffect, useState } from 'react';

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 550);
    const t3 = setTimeout(() => setPhase(3), 950);
    const t4 = setTimeout(() => setPhase(4), 1500);
    const t5 = setTimeout(() => onFinish(), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F3F3F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
        opacity: phase === 4 ? 0 : 1,
        pointerEvents: phase === 4 ? 'none' : 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes iconPop {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(8px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes iconPopCarta {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(8px) rotate(12deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(-2px) rotate(12deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(12deg);
          }
        }
        .loader-icon-appear {
          animation: iconPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .loader-icon-appear-carta {
          animation: iconPopCarta 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .loader-icon-hidden {
          opacity: 0;
        }
        @keyframes shimmerLine {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        .loader-line {
          animation: shimmerLine 1.5s ease-in-out infinite;
        }
        @keyframes textFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .loader-text {
          animation: textFadeIn 0.4s ease forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        /* ===== RESPONSIVE VARIABLES ===== */
        .loader-wrapper {
          --icon-size: 48px;
          --icon-size-center: 54px;
          --icon-gap: 16px;
          --line-width: 50px;
          --line-margin: 14px;
          --text-size: 18px;
          --text-margin-top: 20px;
          --text-spacing: 6px;
          --slot-radius: 10px;
          --slot-border: 1.5px;
        }

        /* Móviles muy pequeños (< 360px) */
        @media (max-width: 359px) {
          .loader-wrapper {
            --icon-size: 38px;
            --icon-size-center: 44px;
            --icon-gap: 10px;
            --line-width: 30px;
            --line-margin: 8px;
            --text-size: 15px;
            --text-margin-top: 16px;
            --text-spacing: 4px;
            --slot-radius: 8px;
          }
        }

        /* Móviles pequeños (360-479px) */
        @media (min-width: 360px) and (max-width: 479px) {
          .loader-wrapper {
            --icon-size: 44px;
            --icon-size-center: 50px;
            --icon-gap: 14px;
            --line-width: 40px;
            --line-margin: 10px;
            --text-size: 16px;
            --text-margin-top: 18px;
            --text-spacing: 5px;
            --slot-radius: 10px;
          }
        }

        /* Móviles medianos (480-639px) */
        @media (min-width: 480px) and (max-width: 639px) {
          .loader-wrapper {
            --icon-size: 48px;
            --icon-size-center: 54px;
            --icon-gap: 16px;
            --line-width: 55px;
            --line-margin: 14px;
            --text-size: 17px;
            --text-margin-top: 20px;
            --text-spacing: 6px;
          }
        }

        /* Tablets (640-1023px) */
        @media (min-width: 640px) and (max-width: 1023px) {
          .loader-wrapper {
            --icon-size: 52px;
            --icon-size-center: 60px;
            --icon-gap: 20px;
            --line-width: 80px;
            --line-margin: 18px;
            --text-size: 20px;
            --text-margin-top: 24px;
            --text-spacing: 7px;
          }
        }

        /* Desktop (1024-1439px) */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .loader-wrapper {
            --icon-size: 50px;
            --icon-size-center: 58px;
            --icon-gap: 24px;
            --line-width: 100px;
            --line-margin: 20px;
            --text-size: 22px;
            --text-margin-top: 28px;
            --text-spacing: 7px;
          }
        }

        /* Desktop grande (>= 1440px) */
        @media (min-width: 1440px) {
          .loader-wrapper {
            --icon-size: 55px;
            --icon-size-center: 62px;
            --icon-gap: 28px;
            --line-width: 120px;
            --line-margin: 24px;
            --text-size: 24px;
            --text-margin-top: 32px;
            --text-spacing: 8px;
          }
        }

        /* Landscape en móviles (altura pequeña) */
        @media (max-height: 500px) {
          .loader-wrapper {
            --icon-size: 34px;
            --icon-size-center: 40px;
            --icon-gap: 10px;
            --line-width: 40px;
            --line-margin: 10px;
            --text-size: 14px;
            --text-margin-top: 12px;
            --text-spacing: 4px;
            --slot-radius: 8px;
          }
        }
      `}</style>

      {/* Contenedor principal con variables CSS */}
      <div
        className="loader-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {/* Fila de iconos + líneas */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* Línea izquierda */}
          <div
            className="loader-line"
            style={{
              width: 'var(--line-width)',
              minWidth: '20px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(246,158,130,0.4), rgba(246,158,130,0.5))',
              marginRight: 'var(--line-margin)',
              flexShrink: 1,
            }}
          />

          {/* Los 3 iconos */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--icon-gap)',
              flexShrink: 0,
            }}
          >
            {/* Icono 1: Corazón izquierda */}
            <div
              style={{
                position: 'relative',
                width: 'var(--icon-size)',
                height: 'var(--icon-size)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--slot-radius)',
                  backgroundColor: 'rgba(246,158,130,0.08)',
                  border: 'var(--slot-border) dashed rgba(246,158,130,0.2)',
                }}
              />
              <img
                src="/corazonizquierda.png"
                alt=""
                className={phase >= 1 ? 'loader-icon-appear' : 'loader-icon-hidden'}
                style={{
                  position: 'absolute',
                  inset: '4px',
                  width: 'calc(100% - 8px)',
                  height: 'calc(100% - 8px)',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Icono 2: Carta (más grande) */}
            <div
              style={{
                position: 'relative',
                width: 'var(--icon-size-center)',
                height: 'var(--icon-size-center)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--slot-radius)',
                  backgroundColor: 'rgba(246,158,130,0.08)',
                  border: 'var(--slot-border) dashed rgba(246,158,130,0.2)',
                }}
              />
              <img
                src="/carta.png"
                alt=""
                className={phase >= 2 ? 'loader-icon-appear-carta' : 'loader-icon-hidden'}
                style={{
                  position: 'absolute',
                  inset: '2px',
                  width: 'calc(100% - 4px)',
                  height: 'calc(100% - 4px)',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Icono 3: Corazón derecha */}
            <div
              style={{
                position: 'relative',
                width: 'var(--icon-size)',
                height: 'var(--icon-size)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--slot-radius)',
                  backgroundColor: 'rgba(246,158,130,0.08)',
                  border: 'var(--slot-border) dashed rgba(246,158,130,0.2)',
                }}
              />
              <img
                src="/corazonderecha.png"
                alt=""
                className={phase >= 3 ? 'loader-icon-appear' : 'loader-icon-hidden'}
                style={{
                  position: 'absolute',
                  inset: '4px',
                  width: 'calc(100% - 8px)',
                  height: 'calc(100% - 8px)',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>

          {/* Línea derecha */}
          <div
            className="loader-line"
            style={{
              width: 'var(--line-width)',
              minWidth: '20px',
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(246,158,130,0.5), rgba(246,158,130,0.4), transparent)',
              marginLeft: 'var(--line-margin)',
              flexShrink: 1,
            }}
          />
        </div>

        {/* Texto "Camil virtual" */}
        <div
          className={phase >= 1 ? 'loader-text' : ''}
          style={{
            marginTop: 'var(--text-margin-top)',
            opacity: phase >= 1 ? undefined : 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F69E82',
              fontSize: 'var(--text-size)',
              letterSpacing: '0.15em',
            }}
          >
            Camil
          </span>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              color: 'rgba(246,158,130,0.5)',
              fontSize: 'var(--text-size)',
              letterSpacing: '0.15em',
              marginLeft: 'var(--text-spacing)',
            }}
          >
            virtual
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;