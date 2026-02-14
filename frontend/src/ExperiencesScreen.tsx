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
      { threshold: 0.15 }
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
        setTimeout(() => setFade(false), 150);
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
      className="relative w-full overflow-hidden"
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

        .photo-pop {
          transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .photo-pop-in { opacity: 1; transform: scale(1); }
        .photo-pop-out { opacity: 0; transform: scale(0.75); }
        .pop-delay-1 { transition-delay: 0s; }
        .pop-delay-2 { transition-delay: 0.1s; }
        .pop-delay-3 { transition-delay: 0.2s; }
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
        .dot-indicator { transition: all 0.3s ease; }
        .dot-active { width: 28px; border-radius: 50px; background-color: #F9DDA3; }
        .dot-inactive { width: 10px; border-radius: 50%; background-color: rgba(255,255,255,0.3); cursor: pointer; }
        .dot-inactive:hover { background-color: #F9DDA3; opacity: 0.6; }

        @keyframes floatEmoji {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(3deg); }
          50% { transform: scale(1) rotate(-2deg); }
          75% { transform: scale(1.03) rotate(1deg); }
        }
        .emoji-float { animation: floatEmoji 3.5s ease-in-out infinite; }

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
        .exp-icon-wrapper.animate-exp-deco-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.5s; }
        .exp-icon-wrapper.animate-exp-deco-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.7s; }
        .exp-icon-wrapper.animate-exp-deco-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.9s; }

        @media (max-width: 1024px) {
          .entrance-exp-title.animate {
            animation-name: fadeSlideUp;
          }
          .entrance-exp-badge.animate {
            animation-name: fadeSlideUp;
          }
        }

        /* ── Layout ── */
        .exp-layout {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
          width: 100%;
        }
        .exp-left {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .exp-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-left: 6vw;
          padding-right: 3vw;
          gap: 2vw;
        }
        .exp-right {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .exp-photos-container {
          position: relative;
          width: 40vw;
          height: 36vw;
        }
        .exp-photo-left {
          position: absolute;
          left: -3vw;
          top: 0;
          width: 22vw;
          height: 30vw;
          z-index: 2;
        }
        .exp-photo-right {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 22vw;
          height: 30vw;
          z-index: 1;
        }

        /* ── Emoji: wrapper de posicionamiento ── */
        .exp-emoji-anchor {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp-emoji-sizer {
          width: clamp(55px, 4.5vw, 75px);
          height: clamp(55px, 4.5vw, 75px);
        }

        .exp-deco-desktop {
          display: block;
        }

        .exp-description {
          font-size: 1.15vw;
          max-width: 30vw;
        }
        .exp-counter {
          font-size: 0.8vw;
        }
        .exp-progress-bar {
          width: 12vw;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .exp-layout {
            flex-direction: column;
            min-height: auto;
            padding: 70px 0 60px;
          }
          .exp-left {
            width: 100%;
            padding: 0 32px;
          }
          .exp-left-inner {
            padding-left: 0;
            padding-right: 0;
            align-items: center;
            text-align: center;
            gap: 16px;
            margin-bottom: 40px;
          }
          .exp-right {
            width: 100%;
            justify-content: center;
            padding: 0 24px;
          }
          .exp-photos-container {
            width: 70vw;
            height: 50vw;
            max-width: 500px;
            max-height: 360px;
            margin: 0 auto;
          }
          .exp-photo-left {
            left: 0;
            top: 0;
            width: 42%;
            height: 75%;
          }
          .exp-photo-right {
            right: 0;
            bottom: 0;
            width: 42%;
            height: 75%;
          }
          .exp-emoji-sizer {
            width: 55px;
            height: 55px;
          }
          .exp-description {
            font-size: clamp(13px, 2.5vw, 16px);
            max-width: 400px;
          }
          .exp-counter {
            font-size: clamp(11px, 1.8vw, 14px);
          }
          .exp-progress-bar {
            width: clamp(120px, 30vw, 200px);
          }
          .exp-deco-desktop {
            display: none !important;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .exp-layout {
            padding: 50px 0 40px;
          }
          .exp-left {
            padding: 0 24px;
          }
          .exp-left-inner {
            gap: 14px;
            margin-bottom: 32px;
          }
          .exp-right {
            padding: 0 16px;
          }
          .exp-photos-container {
            width: 85vw;
            height: 60vw;
            max-width: none;
            max-height: none;
          }
          .exp-photo-left {
            width: 45%;
            height: 72%;
          }
          .exp-photo-right {
            width: 45%;
            height: 72%;
          }
          .exp-emoji-sizer {
            width: 48px;
            height: 48px;
          }
          .exp-description {
            font-size: 14px;
            max-width: 100%;
          }
          .exp-counter {
            font-size: 12px;
          }
          .exp-progress-bar {
            width: 150px;
          }
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

      {/* Decoraciones — desktop only */}
      <div
        className={`absolute pointer-events-none exp-icon-wrapper exp-deco-desktop ${hasAnimated ? 'animate-exp-deco-1' : ''}`}
        style={{ left: '43%', top: '18%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)', zIndex: 5 }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-1' : ''}`} style={{ opacity: 0.75 }} />
      </div>
      <div
        className={`absolute pointer-events-none exp-icon-wrapper exp-deco-desktop ${hasAnimated ? 'animate-exp-deco-2' : ''}`}
        style={{ left: '45%', top: '50%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-2' : ''}`} style={{ opacity: 0.7 }} />
      </div>
      <div
        className={`absolute pointer-events-none exp-icon-wrapper exp-deco-desktop ${hasAnimated ? 'animate-exp-deco-3' : ''}`}
        style={{ left: '42%', bottom: '18%', width: 'clamp(25px, 2.8vw, 45px)', height: 'clamp(25px, 2.8vw, 45px)', zIndex: 5 }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'exp-deco-3' : ''}`} style={{ opacity: 0.8 }} />
      </div>

      <div className="relative z-10 exp-layout">
        {/* CAJA IZQUIERDA */}
        <div className="exp-left">
          <div className="exp-left-inner">
            {/* Badge */}
            <span
              className={`entrance-exp-badge ${hasAnimated ? 'animate' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(4px, 0.4vw, 8px)',
                padding: 'clamp(4px, 0.35vw, 7px) clamp(12px, 1vw, 18px)',
                borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(11px, 0.82vw, 14px)',
                letterSpacing: '0.07em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 'clamp(12px, 0.85vw, 15px)' }}>✨</span>
              Experiencias reales
            </span>

            {/* Título */}
            <h2
              className={`entrance-exp-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: 'clamp(32px, 4.5vw, 75px)',
                lineHeight: 1.2,
                letterSpacing: '0.03em',
                margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.15)',
              }}
            >
              Así se <span style={{ fontWeight: 500 }}>vive</span>
              <br />con Camil
            </h2>

            {/* Texto dinámico */}
            <div className={`entrance-exp-dynamic ${hasAnimated ? 'animate' : ''}`}>
              <div className={`scene-fade ${fade ? 'scene-visible' : 'scene-hidden'}`}>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: '#F9DDA3',
                    fontSize: 'clamp(15px, 1.5vw, 26px)',
                    letterSpacing: '0.04em',
                    margin: 0,
                    marginBottom: 'clamp(6px, 0.8vw, 12px)',
                  }}
                >
                  {scene.title}
                </h3>
                <p
                  className="exp-description"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.8,
                    letterSpacing: '0.02em',
                    margin: 0,
                  }}
                >
                  {scene.description}
                </p>
              </div>
            </div>

            {/* Dots + progress */}
            <div
              className={`flex flex-col items-start entrance-exp-dots ${hasAnimated ? 'animate' : ''}`}
              style={{ gap: '10px', marginTop: 'clamp(4px, 0.5vw, 10px)' }}
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
                  className="exp-counter"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.05em',
                    marginLeft: '4px',
                  }}
                >
                  {activeScene + 1} / {scenes.length}
                </span>
              </div>
              <div
                className="exp-progress-bar"
                style={{
                  height: '2px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
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

        {/* CAJA DERECHA */}
        <div className="exp-right">
          <div className="exp-photos-container">
            {/* Foto izquierda */}
            <div
              className={`exp-photo-left photo-pop ${
                photoPop ? 'photo-pop-in pop-delay-1' : 'photo-pop-out pop-out-delay-1'
              }`}
            >
              <div
                className="photo-card w-full h-full"
                style={{
                  borderRadius: 'clamp(12px, 1.2vw, 18px)',
                  overflow: 'hidden',
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
              className={`exp-photo-right photo-pop ${
                photoPop ? 'photo-pop-in pop-delay-2' : 'photo-pop-out pop-out-delay-2'
              }`}
            >
              <div
                className="photo-card w-full h-full"
                style={{
                  borderRadius: 'clamp(12px, 1.2vw, 18px)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(3deg)',
                  border: '3px solid rgba(255,255,255,0.15)',
                }}
              >
                <img src={scene.right} alt="Persona" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Emoji — wrapper de posición + sizer separado */}
            <div className="exp-emoji-anchor">
              <div
                className={`exp-emoji-sizer photo-pop ${
                  photoPop ? 'photo-pop-in pop-delay-3' : 'photo-pop-out pop-out-delay-3'
                }`}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(20px, 2vw, 32px)',
                  }}
                >
                  {scene.emoji}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesScreen;