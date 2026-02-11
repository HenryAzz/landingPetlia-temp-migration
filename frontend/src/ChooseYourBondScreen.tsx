import { useEffect, useState } from 'react';

const ChooseYourBondScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
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
      `}</style>

      {/* Fondo expandido */}
<div className="absolute inset-0 z-0 flex items-center justify-center">
  <img
    src="/fondoazul.png"
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

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex min-h-0 w-full">

        {/* CAJA IZQUIERDA — 45% */}
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
            {/* Título */}
            <h2
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
              tu{' '}
              <span style={{ fontWeight: 500 }}>espacio</span>.
            </h2>

            {/* Subtítulo */}
            <p
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
              que necesitas
            </p>
          </div>
        </div>

        {/* CAJA DERECHA — 55% */}
        <div
          className="h-full flex-shrink-0 flex items-center justify-center"
          style={{ width: '55%' }}
        >
          <div
            className="flex flex-col"
            style={{
              width: '100%',
              maxWidth: '40vw',
              gap: '1.5vw',
            }}
          >
            {/* Card 1 — Correspondencia especial (Azul) */}
            <div
              className="relative"
              style={{
                backgroundColor: 'rgba(14, 116, 144, 0.5)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0, 0, 0, 0.25), inset 1px 4px 8px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '1vw',
                marginRight: '0vw',
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
                  letterSpacing: '0.03em',
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
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                Dale chispa a tu semana con un toque encantador y un
                espacio al mes para compartir tiempo juntos
              </p>

              <img
                src="/carta.png"
                alt=""
                className={`absolute object-contain pointer-events-none ${mounted ? 'card-icon-1' : ''}`}
                style={{
                  right: '-1.5vw',
                  top: '-1.5vw',
                  width: 'clamp(50px, 5vw, 80px)',
                  height: 'clamp(50px, 5vw, 80px)',
                }}
              />
            </div>

            {/* Card 2 — Casualmente cotidiano (Rosa) */}
            <div
              className="relative"
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.6)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0, 0, 0, 0.25), inset 1px 4px 8px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '-1vw',
                marginRight: '2.5vw',
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
                  letterSpacing: '0.03em',
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
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                Mantené una conversación para compartir más que el día a
                día y juntarse de vez en cuando
              </p>

              <img
                src="/celular.png"
                alt=""
                className={`absolute object-contain pointer-events-none ${mounted ? 'card-icon-2' : ''}`}
                style={{
                  left: '-4vw',
                  bottom: '-4.5vw',
                  width: 'clamp(85px, 9vw, 140px)',
                  height: 'clamp(85px, 9vw, 140px)',
                }}
              />
            </div>

            {/* Card 3 — Compañía diaria (Amarillo) */}
            <div
              className="relative"
              style={{
                backgroundColor: 'rgba(234, 179, 8, 0.6)',
                borderRadius: '19px',
                padding: '1.6vw 1.8vw',
                minHeight: '9.5vw',
                boxShadow:
                  '0px 4px 4px rgba(0, 0, 0, 0.25), inset 1px 4px 8px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                marginLeft: '1vw',
                marginRight: '0vw',
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
                  letterSpacing: '0.03em',
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
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                Cómplice de cada momento, transformá lo cotidiano en pura
                magia y alegría como tu fiel compañera
              </p>

              <img
                src="/billete.png"
                alt=""
                className={`absolute object-contain pointer-events-none ${mounted ? 'card-icon-3' : ''}`}
                style={{
                  right: '-1.5vw',
                  bottom: '-1.5vw',
                  width: 'clamp(50px, 5vw, 80px)',
                  height: 'clamp(50px, 5vw, 80px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourBondScreen;