import { useEffect, useState } from 'react';

const TalkToSomeoneScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
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
        .float-heart-left { animation: floatHeartLeft 3.4s ease-in-out infinite; }
        .float-letter-top { animation: floatLetterTop 4s ease-in-out infinite; animation-delay: 0.6s; }
        .float-letter-bottom { animation: floatLetterBottom 3.8s ease-in-out infinite; animation-delay: 1.1s; }
        .float-heart-right { animation: floatHeartRight 3.6s ease-in-out infinite; animation-delay: 0.4s; }
      `}</style>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex min-h-0 w-full">

        {/* CAJA IZQUIERDA — 65% */}
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
              }}
            >
              Habla con alguien{' '}
              <span style={{ fontWeight: 600 }}>real</span>
              <br />
              que te dedica toda su atención
            </h2>

            {/* Canales de contacto */}
            <div
              className="flex items-center"
              style={{
                gap: '0.55vw',
              }}
            >
              {[
                { emoji: '✉️', label: 'Cartas' },
                { emoji: '💬', label: 'Mensajes' },
                { emoji: '📞', label: 'Llamadas' },
                { emoji: '🎥', label: 'Citas virtuales' },
              ].map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4vw',
                    padding: '0.4vw 1.1vw',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, rgba(249, 221, 163, 0.45), rgba(246, 158, 130, 0.2))',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    color: '#8C6A50',
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

            {/* Texto descriptivo */}
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
              <p style={{ margin: 0, marginBottom: '1.2vw' }}>
                En un mundo consumido por la tecnología, la distancia y el
                desapego, Camil abre un espacio en su cálido corazón para
                quienes lo necesitan.
              </p>
              <p style={{ margin: 0 }}>
                Su deseo es dar amor y comprensión, risas, juegos y
                entretenimiento a través de mensajes, llamadas y citas
                virtuales.
              </p>
            </div>
          </div>
        </div>

        {/* CAJA DERECHA — 35% */}
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
            {/* Celular central */}
            <img
              src="/celulargrande.png"
              alt="Celular"
              className="relative z-10 object-contain"
              style={{
                width: 'clamp(200px, 22vw, 420px)',
                height: 'auto',
              }}
            />

            {/* Izquierda abajo — Corazón */}
            <img
              src="/corazonizquierda.png"
              alt=""
              className={`absolute object-contain z-20 pointer-events-none ${mounted ? 'float-heart-left' : ''}`}
              style={{
                left: '2%',
                bottom: '18%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            />

            {/* Izquierda arriba — Carta */}
            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain z-20 pointer-events-none ${mounted ? 'float-letter-top' : ''}`}
              style={{
                left: '0%',
                top: '15%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            />

            {/* Derecha abajo — Carta */}
            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain z-20 pointer-events-none ${mounted ? 'float-letter-bottom' : ''}`}
              style={{
                right: '2%',
                bottom: '18%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            />

            {/* Derecha arriba — Corazón */}
            <img
              src="/corazonderecha.png"
              alt=""
              className={`absolute object-contain z-20 pointer-events-none ${mounted ? 'float-heart-right' : ''}`}
              style={{
                right: '0%',
                top: '15%',
                width: 'clamp(40px, 5.5vw, 90px)',
                height: 'clamp(40px, 5.5vw, 90px)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToSomeoneScreen;