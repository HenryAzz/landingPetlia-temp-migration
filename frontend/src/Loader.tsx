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
      `}</style>

      {/* Contenedor principal */}
      <div
        className="flex items-center"
        style={{ gap: '0' }}
      >
        {/* Línea izquierda */}
        <div
          className="loader-line"
          style={{
            width: 'clamp(40px, 8vw, 120px)',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(246,158,130,0.4), rgba(246,158,130,0.5))',
            marginRight: 'clamp(12px, 1.5vw, 24px)',
          }}
        />

        {/* Los 3 iconos con sus huecos */}
        <div
          className="flex items-center"
          style={{ gap: 'clamp(14px, 1.8vw, 28px)' }}
        >
          {/* Hueco + Icono 1: Corazón izquierda */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(36px, 3.5vw, 55px)',
              height: 'clamp(36px, 3.5vw, 55px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                backgroundColor: 'rgba(246,158,130,0.08)',
                border: '1.5px dashed rgba(246,158,130,0.2)',
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

          {/* Hueco + Icono 2: Carta */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(40px, 4vw, 62px)',
              height: 'clamp(40px, 4vw, 62px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                backgroundColor: 'rgba(246,158,130,0.08)',
                border: '1.5px dashed rgba(246,158,130,0.2)',
              }}
            />
            <img
              src="/carta.png"
              alt=""
              className={phase >= 2 ? 'loader-icon-appear-carta' : 'loader-icon-hidden'}
              style={{
                position: 'absolute',
                inset: '2px',
                width: 'calc(100% - 8px)',
                height: 'calc(100% - 8px)',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Hueco + Icono 3: Corazón derecha */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(36px, 3.5vw, 55px)',
              height: 'clamp(36px, 3.5vw, 55px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                backgroundColor: 'rgba(246,158,130,0.08)',
                border: '1.5px dashed rgba(246,158,130,0.2)',
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
            width: 'clamp(40px, 8vw, 120px)',
            height: '1px',
            background:
              'linear-gradient(90deg, rgba(246,158,130,0.5), rgba(246,158,130,0.4), transparent)',
            marginLeft: 'clamp(12px, 1.5vw, 24px)',
          }}
        />
      </div>

      {/* Texto "Camil virtual" */}
      <div
        className={phase >= 1 ? 'loader-text' : ''}
        style={{
          marginTop: 'clamp(18px, 2vw, 32px)',
          opacity: phase >= 1 ? undefined : 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F69E82',
            fontSize: 'clamp(16px, 1.4vw, 24px)',
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
            fontSize: 'clamp(16px, 1.4vw, 24px)',
            letterSpacing: '0.15em',
            marginLeft: 'clamp(4px, 0.4vw, 8px)',
          }}
        >
          virtual
        </span>
      </div>
    </div>
  );
};

export default Loader;