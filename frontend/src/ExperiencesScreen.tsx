import { useEffect, useState, useRef } from 'react';

const scenes = [
  {
    left: '/leer1.png',
    right: '/leer2.png',
    emoji: '📖',
    title: 'Lecturas compartidas',
    description:
      'Un libro, dos almas. Compartiendo historias y silencios cómplices a la distancia.',
  },
  {
    left: '/compras1.png',
    right: '/compras2.png',
    emoji: '👩‍🍳',
    title: 'Cocinando juntos',
    description:
      'Los mismos ingredientes, la misma receta. Transformando lo cotidiano en un plan inolvidable.',
  },
  {
    left: '/cama1.png',
    right: '/cama2.png',
    emoji: '🍿',
    title: 'Películas en sincro',
    description:
      'Misma peli, mismos sustos. Compartiendo emociones en tiempo real aunque estén lejos.',
  },
];

const DURATION = 8000;
const TICK = 50;

const ExperiencesScreen = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [fade, setFade] = useState(true);
  const [photoPop, setPhotoPop] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elapsedRef = useRef(0);
  const isTransitioning = useRef(false);
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
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);

    const interval = setInterval(() => {
      if (isTransitioning.current) return;
      elapsedRef.current += TICK;
      setProgress((elapsedRef.current / DURATION) * 100);

      if (elapsedRef.current >= DURATION) {
        isTransitioning.current = true;

        setPhotoPop(false);

        setTimeout(() => {
          setFade(false);
        }, 150);

        setTimeout(() => {
          setActiveScene((prev) => (prev + 1) % scenes.length);
          elapsedRef.current = 0;
          setProgress(0);

          setFade(true);

          setTimeout(() => {
            setPhotoPop(true);
            isTransitioning.current = false;
          }, 120);
        }, 650);
      }
    }, TICK);

    return () => clearInterval(interval);
  }, [activeScene]);

  const handleDotClick = (index: number) => {
    if (index === activeScene || isTransitioning.current) return;
    isTransitioning.current = true;

    setPhotoPop(false);
    setTimeout(() => setFade(false), 150);

    setTimeout(() => {
      setActiveScene(index);
      elapsedRef.current = 0;
      setProgress(0);
      setFade(true);
      setTimeout(() => {
        setPhotoPop(true);
        isTransitioning.current = false;
      }, 120);
    }, 650);
  };

  const scene = scenes[activeScene];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: '100vh' }}
    >
      <style>{`
        .scene-fade {
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .scene-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .scene-hidden {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }

        /* ── Photo pop transitions ── */
        .photo-pop {
          transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .photo-pop-in {
          opacity: 1;
          transform: scale(1);
        }
        .photo-pop-out {
          opacity: 0;
          transform: scale(0.75);
        }

        /* Stagger delays for pop-in */
        .pop-delay-1 { transition-delay: 0s; }
        .pop-delay-2 { transition-delay: 0.1s; }
        .pop-delay-3 { transition-delay: 0.2s; }

        /* Stagger delays for pop-out (reverse) */
        .pop-out-delay-1 { transition-delay: 0.12s; }
        .pop-out-delay-2 { transition-delay: 0.06s; }
        .pop-out-delay-3 { transition-delay: 0s; }

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
        @keyframes expDeco1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(2deg); }
          50% { transform: translateY(-3px) rotate(-1.5deg); }
          75% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes expDeco2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-5px) rotate(-2deg); }
          60% { transform: translateY(-9px) rotate(1.5deg); }
          85% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        @keyframes expDeco3 {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          25% { transform: translateY(-7px) scale(1.03) rotate(1.5deg); }
          50% { transform: translateY(-4px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.02) rotate(0.5deg); }
        }
        .exp-deco-1 { animation: expDeco1 4.2s ease-in-out infinite; }
        .exp-deco-2 { animation: expDeco2 4.8s ease-in-out infinite; animation-delay: 0.6s; }
        .exp-deco-3 { animation: expDeco3 3.9s ease-in-out infinite; animation-delay: 1.2s; }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-exp-badge { opacity: 0; }
        .entrance-exp-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-exp-title { opacity: 0; }
        .entrance-exp-title.animate {
          animation: fadeSlideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }
        .entrance-exp-dynamic { opacity: 0; }
        .entrance-exp-dynamic.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.45s;
        }
        .entrance-exp-dots { opacity: 0; }
        .entrance-exp-dots.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
        }
        .exp-icon-wrapper { opacity: 0; }
        .exp-icon-wrapper.animate-exp-deco-1 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.5s;
        }
        .exp-icon-wrapper.animate-exp-deco-2 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.7s;
        }
        .exp-icon-wrapper.animate-exp-deco-3 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.9s;
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/fondoliso.jpeg"
          alt=""
          className="object-cover"
          style={{ width: '140%', height: '140%', minWidth: '140%', minHeight: '140%' }}
        />
      </div>

      {/* Decoraciones */}
      <div
        className={`absolute pointer-events-none exp-icon-wrapper ${hasAnimated ? 'animate-exp-deco-1' : ''}`}
        style={{ left: '43%', top: '18%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)', zIndex: 5 }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-1' : ''}`} style={{ opacity: 0.75 }} />
      </div>
      <div
        className={`absolute pointer-events-none exp-icon-wrapper ${hasAnimated ? 'animate-exp-deco-2' : ''}`}
        style={{ left: '45%', top: '50%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-2' : ''}`} style={{ opacity: 0.7 }} />
      </div>
      <div
        className={`absolute pointer-events-none exp-icon-wrapper ${hasAnimated ? 'animate-exp-deco-3' : ''}`}
        style={{ left: '42%', bottom: '18%', width: 'clamp(25px, 2.8vw, 45px)', height: 'clamp(25px, 2.8vw, 45px)', zIndex: 5 }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-3' : ''}`} style={{ opacity: 0.8 }} />
      </div>

      <div className="relative z-10 flex-1 flex min-h-0 w-full">
        {/* CAJA IZQUIERDA */}
        <div className="h-full flex items-center justify-center flex-shrink-0" style={{ width: '50%' }}>
          <div
            className="flex flex-col items-start justify-center"
            style={{ width: '100%', paddingLeft: '6vw', paddingRight: '3vw', gap: '2vw' }}
          >
            <span
              className={`entrance-exp-badge ${hasAnimated ? 'animate' : ''}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4vw',
                padding: '0.35vw 1vw', borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff',
                fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                fontSize: '0.82vw', letterSpacing: '0.07em', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '0.85vw' }}>✨</span>
              Experiencias reales
            </span>

            <h2
              className={`entrance-exp-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontStyle: 'italic',
                color: '#FFFFFF', fontSize: 'clamp(42px, 4.5vw, 75px)', lineHeight: 1.2,
                letterSpacing: '0.03em', margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.15)',
              }}
            >
              Así se <span style={{ fontWeight: 500 }}>vive</span>
              <br />con Camil
            </h2>

            <div className={`entrance-exp-dynamic ${hasAnimated ? 'animate' : ''}`}>
              <div className={`scene-fade ${fade ? 'scene-visible' : 'scene-hidden'}`}>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#F9DDA3',
                    fontSize: 'clamp(16px, 1.5vw, 26px)', letterSpacing: '0.04em',
                    margin: 0, marginBottom: '0.8vw',
                  }}
                >
                  {scene.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)', fontSize: '1.15vw',
                    lineHeight: 1.8, letterSpacing: '0.02em', margin: 0, maxWidth: '30vw',
                  }}
                >
                  {scene.description}
                </p>
              </div>
            </div>

            <div
              className={`flex flex-col items-start entrance-exp-dots ${hasAnimated ? 'animate' : ''}`}
              style={{ gap: '10px', marginTop: '0.5vw' }}
            >
              <div className="flex items-center" style={{ gap: '12px' }}>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  {scenes.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDotClick(index)}
                      className={`dot-indicator ${index === activeScene ? 'dot-active' : 'dot-inactive'}`}
                      style={{ height: '10px', border: 'none', cursor: 'pointer', padding: 0 }}
                      aria-label={`Escena ${index + 1}`}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    color: 'rgba(255,255,255,0.5)', fontSize: '0.8vw',
                    letterSpacing: '0.05em', marginLeft: '4px',
                  }}
                >
                  {activeScene + 1} / {scenes.length}
                </span>
              </div>
              <div
                style={{
                  width: '12vw', height: '2px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '2px', overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`, height: '100%',
                    backgroundColor: '#F9DDA3', borderRadius: '2px',
                    transition: 'width 50ms linear',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div
          className="h-full flex-shrink-0 relative flex items-center justify-center"
          style={{ width: '50%' }}
        >
          <div
            className="relative"
            style={{ width: '40vw', height: '36vw' }}
          >
            {/* Foto izquierda */}
            <div
              className={`absolute photo-pop ${
                photoPop
                  ? 'photo-pop-in pop-delay-1'
                  : 'photo-pop-out pop-out-delay-1'
              }`}
              style={{
                left: '-3vw', top: '0',
                width: '22vw', height: '30vw', zIndex: 2,
              }}
            >
              <div
                className="photo-card w-full h-full"
                style={{
                  borderRadius: '18px', overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(-3deg)',
                  border: '3px solid rgba(255,255,255,0.15)',
                }}
              >
                <img src={scene.left} alt="Camil" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Foto derecha */}
            <div
              className={`absolute photo-pop ${
                photoPop
                  ? 'photo-pop-in pop-delay-2'
                  : 'photo-pop-out pop-out-delay-2'
              }`}
              style={{
                right: '0', bottom: '0',
                width: '22vw', height: '30vw', zIndex: 1,
              }}
            >
              <div
                className="photo-card w-full h-full"
                style={{
                  borderRadius: '18px', overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(3deg)',
                  border: '3px solid rgba(255,255,255,0.15)',
                }}
              >
                <img src={scene.right} alt="Persona" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Emoji */}
            <div
              className={`absolute photo-pop ${
                photoPop
                  ? 'photo-pop-in pop-delay-3'
                  : 'photo-pop-out pop-out-delay-3'
              }`}
              style={{
                left: '50%', top: '50%', zIndex: 3,
                width: 'clamp(55px, 4.5vw, 75px)',
                height: 'clamp(55px, 4.5vw, 75px)',
                marginLeft: 'calc(-1 * clamp(55px, 4.5vw, 75px) / 2)',
                marginTop: 'calc(-1 * clamp(55px, 4.5vw, 75px) / 2)',
              }}
            >
              <div
                className="emoji-float w-full h-full"
                style={{
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(249,221,163,0.6), rgba(246,158,130,0.4))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(22px, 2vw, 32px)',
                }}
              >
                {scene.emoji}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesScreen;