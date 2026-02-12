import { useEffect, useState, useRef } from 'react';

const scenes = [
  {
    left: '/leer1.png',
    right: '/leer2.png',
    emoji: '📖',
    title: 'Lecturas compartidas',
    description: 'Un libro, dos almas. Compartiendo historias y silencios cómplices a la distancia.',
  },
  {
    left: '/compras1.png',
    right: '/compras2.png',
    emoji: '👩‍🍳',
    title: 'Cocinando juntos',
    description: 'Los mismos ingredientes, la misma receta. Transformando lo cotidiano en un plan inolvidable.',
  },
  {
    left: '/cama1.png',
    right: '/cama2.png',
    emoji: '🍿',
    title: 'Películas en sincro',
    description: 'Misma peli, mismos sustos. Compartiendo emociones en tiempo real aunque estén lejos.',
  },
];

const DURATION = 8000;
const TICK = 50;

const ExperiencesScreen = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [fade, setFade] = useState(true);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);

    const interval = setInterval(() => {
      if (isTransitioning.current) return;

      elapsedRef.current += TICK;
      setProgress((elapsedRef.current / DURATION) * 100);

      if (elapsedRef.current >= DURATION) {
        isTransitioning.current = true;
        setFade(false);

        setTimeout(() => {
          setActiveScene((prev) => (prev + 1) % scenes.length);
          setFade(true);
          elapsedRef.current = 0;
          setProgress(0);
          isTransitioning.current = false;
        }, 600);
      }
    }, TICK);

    return () => clearInterval(interval);
  }, [activeScene]);

  const handleDotClick = (index: number) => {
    if (index === activeScene || isTransitioning.current) return;
    isTransitioning.current = true;
    setFade(false);
    setTimeout(() => {
      setActiveScene(index);
      setFade(true);
      elapsedRef.current = 0;
      setProgress(0);
      isTransitioning.current = false;
    }, 600);
  };

  const scene = scenes[activeScene];

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: '100vh' }}
    >
      <style>{`
        .scene-fade {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scene-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .scene-hidden {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        .photo-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .photo-card:hover {
          transform: scale(1.03) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25) !important;
        }
        .dot-indicator {
          transition: all 0.3s ease;
        }
        .dot-active {
          width: 28px;
          border-radius: 50px;
          background-color: #F9DDA3;
        }
        .dot-inactive {
          width: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        .dot-inactive:hover {
          background-color: #F9DDA3;
          opacity: 0.6;
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          25% { transform: translate(-50%, -50%) scale(1.05) rotate(3deg); }
          50% { transform: translate(-50%, -50%) scale(1) rotate(-2deg); }
          75% { transform: translate(-50%, -50%) scale(1.03) rotate(1deg); }
        }
        .emoji-float {
          animation: floatEmoji 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo */}
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
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex min-h-0 w-full">

        {/* CAJA IZQUIERDA — 50% */}
        <div
          className="h-full flex items-center justify-center flex-shrink-0"
          style={{ width: '50%' }}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              width: '100%',
              paddingLeft: '6vw',
              paddingRight: '3vw',
              gap: '2vw',
            }}
          >
            {/* Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4vw',
                padding: '0.35vw 1vw',
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.82vw',
                letterSpacing: '0.07em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '0.85vw' }}>✨</span>
              Experiencias reales
            </span>

            {/* Título */}
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: 'clamp(42px, 4.5vw, 75px)',
                lineHeight: 1.2,
                letterSpacing: '0.03em',
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              Así se{' '}
              <span style={{ fontWeight: 500 }}>vive</span>
              <br />
              con Camil
            </h2>

            {/* Texto dinámico */}
            <div className={`scene-fade ${fade ? 'scene-visible' : 'scene-hidden'}`}>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: '#F9DDA3',
                  fontSize: 'clamp(16px, 1.5vw, 26px)',
                  letterSpacing: '0.04em',
                  margin: 0,
                  marginBottom: '0.8vw',
                }}
              >
                {scene.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1.15vw',
                  lineHeight: 1.8,
                  letterSpacing: '0.02em',
                  margin: 0,
                  maxWidth: '30vw',
                }}
              >
                {scene.description}
              </p>
            </div>

            {/* Dots + contador + progreso */}
            <div
              className="flex flex-col items-start"
              style={{ gap: '10px', marginTop: '0.5vw' }}
            >
              <div
                className="flex items-center"
                style={{ gap: '12px' }}
              >
                <div
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  {scenes.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDotClick(index)}
                      className={`dot-indicator ${
                        index === activeScene ? 'dot-active' : 'dot-inactive'
                      }`}
                      style={{
                        height: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      aria-label={`Escena ${index + 1}`}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.8vw',
                    letterSpacing: '0.05em',
                    marginLeft: '4px',
                  }}
                >
                  {activeScene + 1} / {scenes.length}
                </span>
              </div>

              {/* Barra de progreso */}
              <div
                style={{
                  width: '12vw',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#F9DDA3',
                    borderRadius: '2px',
                    transition: 'width 50ms linear',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CAJA DERECHA — 50% */}
        <div
          className="h-full flex-shrink-0 relative flex items-center justify-center"
          style={{ width: '50%' }}
        >
          <div
            className={`relative scene-fade ${fade ? 'scene-visible' : 'scene-hidden'}`}
            style={{
              width: '40vw',
              height: '36vw',
            }}
          >
            {/* Foto Camil */}
            <div
              className="photo-card absolute"
              style={{
                left: '0',
                top: '0',
                width: '22vw',
                height: '30vw',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                zIndex: 2,
                transform: 'rotate(-3deg)',
                border: '3px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <img
                src={scene.left}
                alt="Camil"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foto otra persona */}
            <div
              className="photo-card absolute"
              style={{
                right: '0',
                bottom: '0',
                width: '22vw',
                height: '30vw',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                zIndex: 1,
                transform: 'rotate(3deg)',
                border: '3px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <img
                src={scene.right}
                alt="Persona"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Emoji glass flotante */}
            <div
              className="absolute emoji-float"
              style={{
                left: '50%',
                top: '50%',
                zIndex: 3,
                width: 'clamp(55px, 4.5vw, 75px)',
                height: 'clamp(55px, 4.5vw, 75px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(249, 221, 163, 0.6), rgba(246, 158, 130, 0.4))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(22px, 2vw, 32px)',
              }}
            >
              {scene.emoji}
            </div>

            {/* Línea decorativa */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                zIndex: 0,
                width: '15vw',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(249, 221, 163, 0.4), transparent)',
                transform: 'translate(-50%, -50%) rotate(-15deg)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesScreen;