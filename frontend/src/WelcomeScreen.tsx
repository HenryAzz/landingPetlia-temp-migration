import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  loaderFinished?: boolean;
}

const WelcomeScreen = ({ loaderFinished = false }: WelcomeScreenProps) => {
  const [entered, setEntered] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    if (loaderFinished) {
      const t = setTimeout(() => setEntered(true), 200);
      return () => clearTimeout(t);
    }
  }, [loaderFinished]);

  useEffect(() => {
    if (entered) {
      const t = setTimeout(() => setIconsReady(true), 1900);
      return () => clearTimeout(t);
    }
  }, [entered]);

  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      <style>{`
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          25% { transform: translateY(-8px) scale(1.04) rotate(1.5deg); }
          50% { transform: translateY(-14px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.03) rotate(0.5deg); }
        }
        @keyframes floatLetter {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          20% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-6px) rotate(-2.5deg); }
          70% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-0.8deg); }
        }
        @keyframes floatBill {
          0%, 100% { transform: translateY(0px) rotate(0deg) translateX(0px); }
          30% { transform: translateY(-7px) rotate(1.5deg) translateX(2px); }
          60% { transform: translateY(-4px) rotate(-1deg) translateX(-1px); }
          80% { transform: translateY(-9px) rotate(0.5deg) translateX(1px); }
        }
        .float-heart { animation: floatHeart 3.4s ease-in-out infinite; }
        .float-letter { animation: floatLetter 4s ease-in-out infinite; }
        .float-phone { animation: floatPhone 4.5s ease-in-out infinite; }
        .float-bill { animation: floatBill 5s ease-in-out infinite; }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .scroll-indicator { animation: bounceDown 2s ease-in-out infinite; }

        @keyframes bgReveal {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .bg-enter {
          animation: bgReveal 1s ease-out 0.1s both;
        }

        @keyframes titleSlideIn {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .title-enter {
          animation: titleSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
        }

        @keyframes badgeIn {
          0% { opacity: 0; transform: translateY(15px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .badge-enter-1 { animation: badgeIn 0.5s ease-out 0.7s both; }
        .badge-enter-2 { animation: badgeIn 0.5s ease-out 0.85s both; }
        .badge-enter-3 { animation: badgeIn 0.5s ease-out 1s both; }

        @keyframes textFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .text-enter {
          animation: textFadeIn 0.7s ease-out 1.1s both;
        }

        @keyframes camilRise {
          0% { opacity: 0; transform: translateX(-60px) translateY(80px); }
          60% { opacity: 1; transform: translateX(-60px) translateY(-10px); }
          100% { opacity: 1; transform: translateX(-60px) translateY(0); }
        }
        .camil-enter {
          animation: camilRise 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
        }

        @keyframes iconPopIn {
          0% { opacity: 0; transform: scale(0) rotate(-20deg); }
          60% { opacity: 1; transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .icon-enter-1 { animation: iconPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s both; }
        .icon-enter-2 { animation: iconPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s both; }
        .icon-enter-3 { animation: iconPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.7s both; }
        .icon-enter-4 { animation: iconPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.9s both; }

        @keyframes floorSlideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        .floor-enter {
          animation: floorSlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
        }
      `}</style>

      {/* Fondo */}
      <div
        className={entered ? 'absolute inset-0 z-0 bg-enter' : 'absolute inset-0 z-0'}
        style={{ opacity: entered ? undefined : 0 }}
      >
        <img
          src="/fondoazul.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 flex-1 flex min-h-0 w-full">
        {/* CAJA IZQUIERDA */}
        <div
          className="h-full flex items-center justify-center flex-shrink-0"
          style={{ width: '65%' }}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              width: '100%',
              maxWidth: '72vw',
              paddingLeft: '4vw',
              gap: '1vw',
              marginTop: '-10px',
            }}
          >
            {/* Título */}
            <img
              src="/titlehome.png"
              alt="Camil Virtual"
              className={`h-auto object-contain object-left ${entered ? 'title-enter' : ''}`}
              style={{
                marginLeft: '-3vw',
                width: '105%',
                maxWidth: '110%',
                opacity: entered ? undefined : 0,
              }}
            />

            {/* Badges */}
            <div
              className="flex items-center"
              style={{ paddingLeft: '12%', gap: '0.55vw' }}
            >
              {[
                { emoji: '💛', label: 'Compañía emocional real', cls: 'badge-enter-1' },
                { emoji: '✨', label: 'Contención personalizada', cls: 'badge-enter-2' },
                { emoji: '🤍', label: 'Espacio seguro digital', cls: 'badge-enter-3' },
              ].map((item, i) => (
                <span
                  key={i}
                  className={entered ? item.cls : ''}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35vw',
                    padding: '0.3vw 0.9vw',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.82vw',
                    letterSpacing: '0.07em',
                    whiteSpace: 'nowrap',
                    opacity: entered ? undefined : 0,
                  }}
                >
                  <span style={{ fontSize: '0.85vw' }}>{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* Texto */}
            <div
              className={`flex items-center w-full ${entered ? 'text-enter' : ''}`}
              style={{ paddingLeft: '12%', opacity: entered ? undefined : 0 }}
            >
              <div
                className="text-white"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  fontSize: '1.76vw',
                  lineHeight: 1.6,
                  textShadow: '1px 1px 1px rgba(0,0,0,0.25)',
                }}
              >
                <p style={{ margin: 0 }}>
                  Un mensaje{' '}
                  <span style={{ fontWeight: 500 }}>puede cambiarlo todo</span>
                </p>
                <p style={{ margin: 0 }}>Sentite especial, con alguien especial</p>
              </div>
            </div>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div className="w-[35%] h-full flex-shrink-0 relative flex items-end justify-center">
          <div
            className={`relative w-full flex justify-center items-end z-30 ${entered ? 'camil-enter' : ''}`}
            style={{
              marginBottom: '-50px',
              opacity: entered ? undefined : 0,
              transform: entered ? undefined : 'translateX(-60px) translateY(80px)',
            }}
          >
            {/* Camil */}
            <img
              src="/camilhome.png"
              alt="Camil"
              className="w-auto max-w-full h-[80vh] max-h-[calc(100vh-10px)] object-contain object-bottom z-30"
            />

            {/* Corazón */}
            <img
              src="/corazon.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${
                iconsReady
                  ? 'float-heart'
                  : entered
                    ? 'icon-enter-1'
                    : ''
              }`}
              style={{
                left: '-0.5vw',
                top: '5%',
                width: 'clamp(48px, 6.69vw, 100px)',
                height: 'clamp(48px, 6.69vw, 100px)',
                opacity: entered ? undefined : 0,
              }}
            />

            {/* Celular */}
            <img
              src="/celular.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${
                iconsReady
                  ? 'float-phone'
                  : entered
                    ? 'icon-enter-2'
                    : ''
              }`}
              style={{
                left: '-2.75vw',
                bottom: '20%',
                width: 'clamp(140px, 15.06vw, 300px)',
                height: 'clamp(140px, 15.06vw, 300px)',
                opacity: entered ? undefined : 0,
              }}
            />

            {/* Billete */}
            <img
              src="/billete.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${
                iconsReady
                  ? 'float-bill'
                  : entered
                    ? 'icon-enter-3'
                    : ''
              }`}
              style={{
                right: '1.2vw',
                top: '-5%',
                width: 'clamp(72px, 7.32vw, 100px)',
                height: 'clamp(72px, 7.32vw, 100px)',
                opacity: entered ? undefined : 0,
              }}
            />

            {/* Carta */}
            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${
                iconsReady
                  ? 'float-letter'
                  : entered
                    ? 'icon-enter-4'
                    : ''
              }`}
              style={{
                right: '0.2vw',
                bottom: '50%',
                width: 'clamp(60px, 6.86vw, 100px)',
                height: 'clamp(60px, 6.86vw, 100px)',
                opacity: entered ? undefined : 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* Piso amarillo */}
      <div
        className={`w-full flex-shrink-0 relative z-10 ${entered ? 'floor-enter' : ''}`}
        style={{
          backgroundColor: '#F9DDA3',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: entered ? undefined : 'translateY(100%)',
        }}
      >
        <div
          className="scroll-indicator"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.15vw',
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              color: 'rgba(90,69,32,0.5)',
              fontSize: '0.7vw',
              letterSpacing: '0.1em',
            }}
          >
            Descubrí más
          </span>
          <svg
            style={{ width: '0.9vw', height: '0.9vw' }}
            fill="none"
            stroke="rgba(90,69,32,0.5)"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default WelcomeScreen;