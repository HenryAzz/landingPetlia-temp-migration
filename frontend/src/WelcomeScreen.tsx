import { useEffect, useState } from 'react';

const WelcomeScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
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
        .float-letter { animation: floatLetter 4s ease-in-out infinite; animation-delay: 0.6s; }
        .float-phone { animation: floatPhone 4.5s ease-in-out infinite; animation-delay: 1.3s; }
        .float-bill { animation: floatBill 5s ease-in-out infinite; animation-delay: 0.9s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .badge-animate-1 { animation: fadeInUp 0.6s ease-out 0.3s both; }
        .badge-animate-2 { animation: fadeInUp 0.6s ease-out 0.5s both; }
        .badge-animate-3 { animation: fadeInUp 0.6s ease-out 0.7s both; }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0">
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
              gap: '1.5vw',
              marginTop: '-10px',
            }}
          >
            <img
              src="/titlehome.png"
              alt="Camil Virtual"
              className="h-auto object-contain object-left"
              style={{
                marginLeft: '-3vw',
                width: '105%',
                maxWidth: '110%',
              }}
            />

            {/* Badges descriptivos — alineados con el subtítulo */}
            <div
              className="flex items-center"
              style={{
                paddingLeft: '12%',
                gap: '0.55vw',
              }}
            >
              <span
                className="badge-animate-1"
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
                }}
              >
                <span style={{ fontSize: '0.85vw' }}>💛</span>
                Compañía emocional real
              </span>

              <span
                className="badge-animate-2"
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
                }}
              >
                <span style={{ fontSize: '0.85vw' }}>✨</span>
                Contención personalizada
              </span>

              <span
                className="badge-animate-3"
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
                }}
              >
                <span style={{ fontSize: '0.85vw' }}>🤍</span>
                Espacio seguro digital
              </span>
            </div>

            <div
              className="flex items-center w-full"
              style={{
                paddingLeft: '12%',
                gap: '1.76vw',
              }}
            >
              <div
                className="text-white flex-shrink-0"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  fontSize: '1.76vw',
                  lineHeight: 1.6,
                  whiteSpace: 'nowrap',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.25)',
                }}
              >
                <p>
                  Un mensaje{' '}
                  <span style={{ fontWeight: 500 }}>
                    puede cambiarlo todo
                  </span>
                </p>
                <p>Sentite especial, con alguien especial</p>
              </div>

              <button
                type="button"
                className="rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                style={{
                  width: '3.51vw',
                  height: '3.51vw',
                  backgroundColor: '#BFBFBF',
                }}
                aria-label="Continuar"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#AFAFAF')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#BFBFBF')}
              >
                <svg
                  style={{ width: '1.46vw', height: '1.46vw' }}
                  fill="none"
                  stroke="#000000"
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
            </div>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div className="w-[35%] h-full flex-shrink-0 relative flex items-end justify-center">
          <div
            className="relative w-full flex justify-center items-end z-30"
            style={{
              transform: 'translateX(-60px)',
              marginBottom: '-50px',
            }}
          >
            <img
              src="/camilhome.png"
              alt="Camil"
              className="
                w-auto
                max-w-full
                h-[90vh]
                max-h-[calc(100vh-10px)]
                object-contain
                object-bottom
                z-30
              "
            />

            <img
              src="/corazon.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${mounted ? 'float-heart' : ''}`}
              style={{
                left: '-0.5vw',
                top: '5%',
                width: 'clamp(48px, 6.69vw, 100px)',
                height: 'clamp(48px, 6.69vw, 100px)',
              }}
            />

            <img
              src="/celular.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${mounted ? 'float-phone' : ''}`}
              style={{
                left: '-2.75vw',
                bottom: '20%',
                width: 'clamp(140px, 15.06vw, 300px)',
                height: 'clamp(140px, 15.06vw, 300px)',
              }}
            />

            <img
              src="/billete.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${mounted ? 'float-bill' : ''}`}
              style={{
                right: '1.2vw',
                top: '-5%',
                width: 'clamp(72px, 7.32vw, 100px)',
                height: 'clamp(72px, 7.32vw, 100px)',
              }}
            />

            <img
              src="/carta.png"
              alt=""
              className={`absolute object-contain z-50 pointer-events-none ${mounted ? 'float-letter' : ''}`}
              style={{
                right: '0.2vw',
                bottom: '50%',
                width: 'clamp(60px, 6.86vw, 100px)',
                height: 'clamp(60px, 6.86vw, 100px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Piso amarillo */}
      <div
        className="w-full flex-shrink-0 relative z-10"
        style={{ backgroundColor: '#F9DDA3', height: '50px' }}
      />
    </section>
  );
};

export default WelcomeScreen;