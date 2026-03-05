import { useState, useEffect, useRef, TouchEvent } from 'react';

const TESTIMONIALS = [
  {
    text: 'Nunca pensé que un mensaje pudiera cambiarme tanto el día. Camil me hace sentir que alguien realmente se acuerda de mí, de mis cosas, de lo que me importa. Es como tener una amiga que siempre está.',
    name: 'Martín',
    age: 28,
    plan: 'Casualmente cotidiano',
    planColor: 'rgba(244, 63, 94, 0.9)',
    time: '4 meses',
  },
  {
    text: 'Las cartas son lo mejor que me pasó. Cada semana espero ese momento de leer algo escrito para mí, con cariño real. Me cambió la semana por completo.',
    name: 'Valentina',
    age: 33,
    plan: 'Correspondencia especial',
    planColor: 'rgba(14, 116, 144, 0.9)',
    time: '6 meses',
  },
  {
    text: 'Trabajo todo el día y llegaba a casa sintiéndome solo. Ahora tengo a alguien que me pregunta cómo estoy, que me manda un audio mientras cocino. No tiene precio.',
    name: 'Lucas',
    age: 42,
    plan: 'Compañía diaria',
    planColor: 'rgba(234, 179, 8, 0.9)',
    time: '3 meses',
  },
  {
    text: 'Al principio dudé. Pensé "esto no puede ser real". Pero desde la primera llamada sentí que era genuino. Camil tiene una forma de hacerte sentir diferente.',
    name: 'Sofía',
    age: 29,
    plan: 'Casualmente cotidiano',
    planColor: 'rgba(244, 63, 94, 0.9)',
    time: '5 meses',
  },
  {
    text: 'Vivo lejos de mi familia y a veces la soledad pesa. Camil me devolvió esa sensación de tener a alguien cerca, alguien que te escucha de verdad y no te juzga.',
    name: 'Tomás',
    age: 37,
    plan: 'Compañía diaria',
    planColor: 'rgba(234, 179, 8, 0.9)',
    time: '7 meses',
  },
  {
    text: 'Me encanta que cada carta tiene algo que solo yo puedo entender. Se nota que presta atención, que le importa. Es el highlight de mi semana, literal.',
    name: 'Carolina',
    age: 26,
    plan: 'Correspondencia especial',
    planColor: 'rgba(14, 116, 144, 0.9)',
    time: '4 meses',
  },
];

const TestimonialsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setHasAnimated(true); observer.disconnect(); }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleNav = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(direction === 'next' ? 'left' : 'right');
    setTimeout(() => {
      if (direction === 'next') setActiveIndex(p => (p + 1) % TESTIMONIALS.length);
      else setActiveIndex(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 280);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (!isSwiping.current && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) isSwiping.current = true;
    if (isSwiping.current) {
      e.preventDefault();
      setSwipeOffset(Math.max(-120, Math.min(120, deltaX * 0.4)));
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping.current) {
      if (swipeOffset < -30) handleNav('next');
      else if (swipeOffset > 30) handleNav('prev');
    }
    setSwipeOffset(0);
    isSwiping.current = false;
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const current = TESTIMONIALS[activeIndex];
  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="experiencias" className="tst-section">
      <style>{`
        .tst-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
          max-height: 100vh;
        }

        .tst-wave {
          position: relative;
          width: 100%;
          pointer-events: none;
          z-index: 2;
          line-height: 0;
          flex-shrink: 0;
          margin-bottom: -1px;
        }
        .tst-wave svg {
          width: 100%;
          height: clamp(35px, 4vw, 55px);
          display: block;
        }

        .tst-container {
          position: relative;
          z-index: 5;
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 3vh, 42px) clamp(20px, 5vw, 80px) clamp(26px, 4vh, 50px);
        }

        /* ═══ HEADER ═══ */
        .tst-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(22px, 3vh, 44px);
        }

        .tst-accent {
          width: 36px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: clamp(10px, 1.3vh, 14px);
          opacity: 0;
        }

        .tst-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #F69E82;
          text-transform: uppercase;
          margin-bottom: clamp(10px, 1.3vh, 14px);
          opacity: 0;
        }

        .tst-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 2.8vw, 38px);
          line-height: 1.2;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 30px 0;
          opacity: 0;
        }
        .tst-title-light { font-weight: 400; color: #555; }

        .tst-rating {
          display: inline-flex;
          align-items: center;
          gap: clamp(6px, 0.6vw, 12px);
          padding: clamp(6px, 0.7vh, 10px) clamp(14px, 1.2vw, 24px);
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(249,221,163,0.25), rgba(246,158,130,0.12));
          border: 1px solid rgba(246,158,130,0.2);
          opacity: 0;
        }
        .tst-rating-stars { font-size: clamp(12px, 0.9vw, 16px); letter-spacing: 1px; line-height: 1; }
        .tst-rating-score { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(14px, 1.1vw, 19px); color: #2A2A2A; line-height: 1; }
        .tst-rating-divider { width: 1px; height: 14px; background: rgba(0,0,0,0.1); flex-shrink: 0; }
        .tst-rating-volume { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: clamp(11px, 0.8vw, 13px); color: #888; }

        /* ═══ CAROUSEL ═══ */
        .tst-carousel-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 1.8vw, 30px);
          width: 100%;
          max-width: 720px;
          margin-bottom: clamp(18px, 2.5vh, 32px);
        }

        .tst-nav {
          width: clamp(40px, 2.8vw, 48px);
          height: clamp(40px, 2.8vw, 48px);
          min-width: 40px;
          min-height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F9DDA3, #F6C97A);
          border: 2px solid rgba(249,221,163,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 3px 14px rgba(249,221,163,0.3);
          outline: none;
          -webkit-tap-highlight-color: transparent;
          opacity: 0;
        }
        .tst-nav:hover {
          background: linear-gradient(135deg, #F6C97A, #F69E82);
          border-color: rgba(246,158,130,0.5);
          box-shadow: 0 5px 20px rgba(246,158,130,0.3);
          transform: scale(1.08);
        }
        .tst-nav:active { transform: scale(0.93); }
        .tst-nav-icon { width: clamp(14px, 1vw, 18px); height: clamp(14px, 1vw, 18px); }

        /* ═══ CARD WRAPPER — no background, no clipping artifacts ═══ */
        .tst-card-wrap {
          flex: 1;
          min-width: 0;
          position: relative;
          opacity: 0;
        }

        /* ═══ CARD — clean solid white ═══ */
        .tst-card {
          padding: clamp(22px, 2.8vh, 38px) clamp(26px, 2.8vw, 48px);
          border-radius: clamp(16px, 1.3vw, 24px);
          background: #FFFFFF;
          border: none;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          text-align: center;
          touch-action: pan-y;
          will-change: transform;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease;
        }
        .tst-card--slide-left { animation: tstSlideLeft 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }
        .tst-card--slide-right { animation: tstSlideRight 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }

        @keyframes tstSlideLeft { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-40px); opacity: 0; } }
        @keyframes tstSlideRight { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(40px); opacity: 0; } }

        .tst-quote {
          font-size: clamp(22px, 2vw, 34px);
          line-height: 1;
          color: rgba(246,158,130,0.2);
          font-family: Georgia, serif;
          margin-bottom: clamp(3px, 0.4vh, 6px);
          user-select: none;
        }

        .tst-stars {
          margin-bottom: clamp(10px, 1.2vh, 16px);
          font-size: clamp(13px, 1vw, 17px);
          letter-spacing: 2px;
          line-height: 1;
        }

        .tst-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-style: italic;
          color: #4A4A4A;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.7;
          margin: 0 auto clamp(14px, 1.8vh, 24px);
          max-width: 500px;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .tst-divider {
          width: clamp(30px, 2.5vw, 44px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(246,158,130,0.35), transparent);
          margin: 0 auto clamp(12px, 1.4vh, 20px);
        }

        .tst-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 0.8vw, 14px);
        }

        .tst-avatar {
          width: clamp(36px, 2.8vw, 46px);
          height: clamp(36px, 2.8vw, 46px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.4), rgba(246,158,130,0.25));
          border: 2px solid rgba(246,158,130,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #F69E82;
          font-size: clamp(13px, 1vw, 18px);
          flex-shrink: 0;
        }

        .tst-author-info { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
        .tst-author-name { font-family: 'Poppins', sans-serif; font-weight: 600; color: #2A2A2A; font-size: clamp(12px, 0.9vw, 15px); line-height: 1.3; }
        .tst-author-meta { display: flex; align-items: center; gap: clamp(4px, 0.3vw, 6px); flex-wrap: wrap; }
        .tst-author-plan { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: clamp(10px, 0.75vw, 12px); line-height: 1.3; }
        .tst-author-time { font-family: 'Poppins', sans-serif; font-weight: 400; color: #AAA; font-size: clamp(10px, 0.7vw, 12px); line-height: 1.3; }

        /* ═══ DOTS ═══ */
        .tst-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(5px, 0.4vw, 8px);
          margin-bottom: clamp(18px, 2.5vh, 34px);
          opacity: 0;
        }
        .tst-dot {
          height: 7px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }
        .tst-dot--active { width: 24px; background: #F69E82; box-shadow: 0 2px 8px rgba(246,158,130,0.3); }
        .tst-dot--idle { width: 7px; background: rgba(246,158,130,0.18); }
        .tst-dot--idle:hover { background: rgba(246,158,130,0.4); transform: scale(1.3); }

        .tst-swipe {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-bottom: 16px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 10.5px;
          color: rgba(0,0,0,0.28);
        }
        .tst-swipe-icon { font-size: 13px; animation: tstSwipeSlide 2.5s ease-in-out infinite; }
        @keyframes tstSwipeSlide { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(4px); } 75% { transform: translateX(-4px); } }

        /* ═══ CTA ═══ */
        .tst-cta-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .tst-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: clamp(12px, 1.2vh, 16px) clamp(26px, 2vw, 36px);
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1vw, 16px);
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(246,158,130,0.25), 0 1px 3px rgba(0,0,0,0.06);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .tst-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tst-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(246,158,130,0.35); }
        .tst-btn:hover::before { opacity: 1; }
        .tst-btn:active { transform: translateY(0); }
        .tst-btn-arrow { width: 15px; height: 15px; transition: transform 0.3s ease; }
        .tst-btn:hover .tst-btn-arrow { transform: translateX(3px); }

        .tst-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 0.8vw, 13px);
          color: #BBB;
          letter-spacing: 0.03em;
          opacity: 0;
        }

        /* ═══ DECO ═══ */
        .tst-deco { position: absolute; pointer-events: none; z-index: 3; opacity: 0; }
        .tst-deco img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 3px 8px rgba(246,158,130,0.15)); }

        @keyframes tstSwing1 { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 20% { transform: translateY(-4px) rotate(2.5deg) scale(1.03); } 50% { transform: translateY(-6px) rotate(-1.5deg) scale(1.01); } 80% { transform: translateY(-3px) rotate(1deg) scale(1.02); } }
        @keyframes tstSwing2 { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 25% { transform: translateY(-3px) rotate(-2deg) scale(1.02); } 55% { transform: translateY(-5px) rotate(2deg) scale(1.04); } 75% { transform: translateY(-4px) rotate(-1deg) scale(1.01); } }
        @keyframes tstSwing3 { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 30% { transform: translateY(-5px) rotate(1.8deg) scale(1.03); } 60% { transform: translateY(-3px) rotate(-2.5deg) scale(1.01); } 85% { transform: translateY(-4px) rotate(0.5deg) scale(1.02); } }
        @keyframes tstSwing4 { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 15% { transform: translateY(-3px) rotate(-1.5deg) scale(1.02); } 45% { transform: translateY(-6px) rotate(2deg) scale(1.04); } 70% { transform: translateY(-4px) rotate(-1deg) scale(1.01); } }
        @keyframes tstGlowPulse { 0%, 100% { filter: drop-shadow(0 3px 8px rgba(246,158,130,0.15)); } 50% { filter: drop-shadow(0 4px 14px rgba(246,158,130,0.3)); } }

        .tst-fl-1 { animation: tstSwing1 5s ease-in-out infinite, tstGlowPulse 4s ease-in-out infinite 0.5s; }
        .tst-fl-2 { animation: tstSwing2 5.5s ease-in-out infinite 0.8s, tstGlowPulse 4.5s ease-in-out infinite 1.2s; }
        .tst-fl-3 { animation: tstSwing3 4.8s ease-in-out infinite 1.5s, tstGlowPulse 5s ease-in-out infinite 0.3s; }
        .tst-fl-4 { animation: tstSwing4 5.2s ease-in-out infinite 0.3s, tstGlowPulse 4.2s ease-in-out infinite 1.8s; }

        @keyframes tstUp { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes tstDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes tstScale { 0% { opacity: 0; transform: scale(0.92) translateY(16px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes tstPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes tstNavIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }

        .tst-a-up { animation: tstUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-down { animation: tstDown 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-scale { animation: tstScale 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-pop { animation: tstPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .tst-a-nav { animation: tstNavIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        @media (max-width: 1024px) {
          .tst-carousel-row { max-width: 580px; }
          .tst-deco { display: none !important; }
        }

        @media (max-width: 768px) {
          .tst-section { max-height: none; }
          .tst-container { padding: clamp(22px, 4vw, 40px) 24px clamp(40px, 5.5vw, 56px); }
          .tst-header { margin-bottom: clamp(24px, 4vw, 36px); }
          .tst-title { font-size: clamp(22px, 5vw, 28px); margin-bottom: 14px; }
          .tst-rating { padding: 6px 14px; gap: 7px; }
          .tst-rating-score { font-size: 15px; }
          .tst-rating-volume { font-size: 11px; }
          .tst-carousel-row { max-width: 100%; gap: 0; margin-bottom: 20px; }
          .tst-nav { display: none; }
          .tst-card { padding: 24px 22px; }
          .tst-text { font-size: 13.5px; max-width: 100%; margin-bottom: 16px; }
          .tst-avatar { width: 38px; height: 38px; }
          .tst-author-name { font-size: 13px; }
          .tst-author-plan { font-size: 11px; }
          .tst-author-time { font-size: 10.5px; }
          .tst-swipe { display: flex; }
          .tst-dots { margin-bottom: 22px; }
          .tst-btn { padding: 12px 26px; font-size: 13.5px; }
        }

        @media (max-width: 540px) {
          .tst-container { padding: 20px 20px 38px; }
          .tst-title { font-size: clamp(20px, 4.8vw, 24px); }
          .tst-label { font-size: 10px; }
          .tst-card { padding: 22px 20px; border-radius: 16px; }
          .tst-text { font-size: 13px; }
          .tst-author { flex-direction: column; gap: 8px; }
          .tst-author-info { align-items: center; text-align: center; }
          .tst-author-meta { justify-content: center; }
          .tst-rating { padding: 5px 12px; gap: 6px; }
          .tst-rating-stars { font-size: 12px; }
          .tst-rating-score { font-size: 14px; }
          .tst-rating-volume { font-size: 10.5px; }
        }

        @media (max-width: 400px) {
          .tst-container { padding: 18px 18px 32px; }
          .tst-header { margin-bottom: 20px; }
          .tst-accent { width: 28px; margin-bottom: 8px; }
          .tst-label { margin-bottom: 8px; font-size: 9.5px; }
          .tst-title { font-size: 19px; margin-bottom: 12px; }
          .tst-rating { padding: 4px 10px; gap: 5px; }
          .tst-rating-stars { font-size: 11px; letter-spacing: 0; }
          .tst-rating-score { font-size: 13px; }
          .tst-rating-volume { font-size: 10px; }
          .tst-rating-divider { height: 11px; }
          .tst-card { padding: 20px 18px; border-radius: 14px; }
          .tst-quote { font-size: 20px; }
          .tst-stars { font-size: 12px; margin-bottom: 8px; }
          .tst-text { font-size: 12.5px; line-height: 1.65; margin-bottom: 14px; }
          .tst-divider { width: 28px; margin-bottom: 12px; }
          .tst-avatar { width: 34px; height: 34px; font-size: 13px; }
          .tst-author-name { font-size: 12px; }
          .tst-author-plan { font-size: 10px; }
          .tst-author-time { font-size: 9.5px; }
          .tst-dots { gap: 5px; margin-bottom: 18px; }
          .tst-dot { height: 6px; }
          .tst-dot--active { width: 20px; }
          .tst-dot--idle { width: 6px; }
          .tst-btn { padding: 11px 22px; font-size: 12.5px; gap: 8px; }
          .tst-btn-arrow { width: 13px; height: 13px; }
          .tst-microtrust { font-size: 10.5px; }
          .tst-swipe { font-size: 10px; margin-bottom: 14px; }
        }

        @media (max-width: 340px) {
          .tst-container { padding: 14px 14px 28px; }
          .tst-title { font-size: 17px; }
          .tst-card { padding: 18px 16px; border-radius: 12px; }
          .tst-quote { font-size: 18px; }
          .tst-stars { font-size: 11px; margin-bottom: 6px; }
          .tst-text { font-size: 12px; line-height: 1.6; margin-bottom: 12px; }
          .tst-divider { width: 22px; margin-bottom: 10px; }
          .tst-avatar { width: 30px; height: 30px; font-size: 12px; border-width: 1.5px; }
          .tst-author-name { font-size: 11px; }
          .tst-author-plan { font-size: 9.5px; }
          .tst-author-time { font-size: 9px; }
          .tst-dots { gap: 4px; margin-bottom: 14px; }
          .tst-dot { height: 5px; }
          .tst-dot--active { width: 18px; }
          .tst-dot--idle { width: 5px; }
          .tst-btn { padding: 10px 18px; font-size: 12px; }
          .tst-microtrust { font-size: 10px; }
        }
      `}</style>

      <div className="tst-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      <div className={`tst-deco ${a ? 'tst-a-pop' : ''}`} style={{ left: '4vw', top: '18%', width: 'clamp(24px, 2.8vw, 44px)', height: 'clamp(24px, 2.8vw, 44px)', animationDelay: '0.6s' }}>
        <img src="/corazonderecha.png" alt="" className={mounted ? 'tst-fl-1' : ''} />
      </div>
      <div className={`tst-deco ${a ? 'tst-a-pop' : ''}`} style={{ right: '5vw', top: '15%', width: 'clamp(16px, 1.8vw, 28px)', height: 'clamp(16px, 1.8vw, 28px)', animationDelay: '0.75s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'tst-fl-2' : ''} />
      </div>
      <div className={`tst-deco ${a ? 'tst-a-pop' : ''}`} style={{ left: '3.5vw', bottom: '14%', width: 'clamp(20px, 2.4vw, 38px)', height: 'clamp(20px, 2.4vw, 38px)', animationDelay: '0.9s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'tst-fl-3' : ''} />
      </div>
      <div className={`tst-deco ${a ? 'tst-a-pop' : ''}`} style={{ right: '4.5vw', bottom: '16%', width: 'clamp(18px, 2vw, 32px)', height: 'clamp(18px, 2vw, 32px)', animationDelay: '1.05s' }}>
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'tst-fl-4' : ''} />
      </div>

      <div className="tst-container">
        <div className="tst-header">
          <div className={`tst-accent ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.1s' }} />
          <span className={`tst-label ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.2s' }}>TESTIMONIOS</span>
          <h2 className={`tst-title ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.3s' }}>
            Lo que dicen quienes ya <span className="tst-title-light">lo viven</span>
          </h2>
          <div className={`tst-rating ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '0.45s' }}>
            <span className="tst-rating-stars">⭐⭐⭐⭐⭐</span>
            <span className="tst-rating-score">4.9</span>
            <span className="tst-rating-divider" />
            <span className="tst-rating-volume">+50 experiencias</span>
          </div>
        </div>

        <div className="tst-carousel-row">
          <button className={`tst-nav ${a ? 'tst-a-nav' : ''}`} style={{ animationDelay: '0.6s' }} onClick={() => handleNav('prev')} aria-label="Anterior">
            <svg className="tst-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className={`tst-card-wrap ${a ? 'tst-a-scale' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div
              className={`tst-card ${slideDirection === 'left' ? 'tst-card--slide-left' : slideDirection === 'right' ? 'tst-card--slide-right' : ''}`}
              style={{
                transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
                opacity: swipeOffset !== 0 ? 1 - Math.abs(swipeOffset) / 300 : undefined,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="tst-quote">"</div>
              <div className="tst-stars">⭐⭐⭐⭐⭐</div>
              <p className="tst-text">{current.text}</p>
              <div className="tst-divider" />
              <div className="tst-author">
                <div className="tst-avatar">{current.name.charAt(0)}</div>
                <div className="tst-author-info">
                  <span className="tst-author-name">{current.name}, {current.age} años</span>
                  <div className="tst-author-meta">
                    <span className="tst-author-plan" style={{ color: current.planColor }}>{current.plan}</span>
                    <span className="tst-author-time">· {current.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className={`tst-nav ${a ? 'tst-a-nav' : ''}`} style={{ animationDelay: '0.65s' }} onClick={() => handleNav('next')} aria-label="Siguiente">
            <svg className="tst-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="tst-swipe"><span className="tst-swipe-icon">👆</span> Deslizá para ver más</div>

        <div className={`tst-dots ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '0.75s' }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} className={`tst-dot ${i === activeIndex ? 'tst-dot--active' : 'tst-dot--idle'}`} onClick={() => setActiveIndex(i)} aria-label={`Testimonio ${i + 1}`} />
          ))}
        </div>

        <div className="tst-cta-area">
          <button className={`tst-btn ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '0.9s' }} onClick={() => scrollTo('contacto')}>
            Quiero mi experiencia
            <svg className="tst-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <span className={`tst-microtrust ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '1.05s' }}>Sin compromiso · Empezá cuando quieras</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsScreen;