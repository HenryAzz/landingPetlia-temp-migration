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
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
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
      if (direction === 'next') {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      }
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

    if (!isSwiping.current && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }

    if (isSwiping.current) {
      e.preventDefault();
      const maxOffset = 120;
      const dampened = deltaX * 0.4;
      setSwipeOffset(Math.max(-maxOffset, Math.min(maxOffset, dampened)));
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping.current) {
      if (swipeOffset < -30) {
        handleNav('next');
      } else if (swipeOffset > 30) {
        handleNav('prev');
      }
    }
    setSwipeOffset(0);
    isSwiping.current = false;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const current = TESTIMONIALS[activeIndex];
  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="testimonios" className="tst-section">
      <style>{`
        .tst-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
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
          height: clamp(45px, 5.5vw, 75px);
          display: block;
        }

        .tst-container {
          position: relative;
          z-index: 5;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(30px, 5vw, 70px) clamp(20px, 5vw, 80px) clamp(50px, 6vw, 90px);
        }

        .tst-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(36px, 4vw, 56px);
        }

        .tst-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: 16px;
          opacity: 0;
        }

        .tst-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 1vw, 13px);
          letter-spacing: 0.22em;
          color: #F69E82;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0;
        }

        .tst-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.18;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
          opacity: 0;
        }

        .tst-title-light {
          font-weight: 400;
          color: #555;
        }

        .tst-rating {
          display: inline-flex;
          align-items: center;
          gap: clamp(8px, 0.8vw, 14px);
          padding: clamp(8px, 0.6vw, 12px) clamp(18px, 1.4vw, 28px);
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(249,221,163,0.25), rgba(246,158,130,0.12));
          border: 1px solid rgba(246,158,130,0.2);
          opacity: 0;
        }

        .tst-rating-stars {
          font-size: clamp(14px, 1.1vw, 18px);
          letter-spacing: 1px;
          line-height: 1;
        }

        .tst-rating-score {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(16px, 1.3vw, 22px);
          color: #2A2A2A;
          line-height: 1;
        }

        .tst-rating-divider {
          width: 1px;
          height: 18px;
          background: rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .tst-rating-volume {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 0.85vw, 14px);
          color: #888;
          letter-spacing: 0.02em;
        }

        .tst-carousel-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2vw, 32px);
          width: 100%;
          max-width: 780px;
          margin-bottom: clamp(20px, 2.5vw, 36px);
        }

        .tst-nav {
          width: clamp(44px, 3.2vw, 54px);
          height: clamp(44px, 3.2vw, 54px);
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F9DDA3, #F6C97A);
          border: 2px solid rgba(249,221,163,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 4px 16px rgba(249,221,163,0.3);
          outline: none;
          -webkit-tap-highlight-color: transparent;
          opacity: 0;
        }

        .tst-nav:hover {
          background: linear-gradient(135deg, #F6C97A, #F69E82);
          border-color: rgba(246,158,130,0.5);
          box-shadow: 0 6px 24px rgba(246,158,130,0.3);
          transform: scale(1.08);
        }

        .tst-nav:active {
          transform: scale(0.93);
        }

        .tst-nav-icon {
          width: clamp(16px, 1.2vw, 20px);
          height: clamp(16px, 1.2vw, 20px);
        }

        .tst-card-wrap {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          position: relative;
          opacity: 0;
        }

        .tst-card {
          padding: clamp(28px, 2.8vw, 44px) clamp(28px, 3.2vw, 52px);
          border-radius: clamp(18px, 1.5vw, 26px);
          background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(246,158,130,0.15);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.04),
            0 2px 8px rgba(246,158,130,0.04),
            inset 0 1px 0 rgba(255,255,255,0.8);
          text-align: center;
          touch-action: pan-y;
          will-change: transform;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.28s ease;
        }

        .tst-card--slide-left {
          animation: tstSlideLeft 0.28s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        .tst-card--slide-right {
          animation: tstSlideRight 0.28s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes tstSlideLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-40px); opacity: 0; }
        }

        @keyframes tstSlideRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(40px); opacity: 0; }
        }

        .tst-quote {
          font-size: clamp(28px, 2.5vw, 42px);
          line-height: 1;
          color: rgba(246,158,130,0.2);
          font-family: Georgia, serif;
          margin-bottom: clamp(4px, 0.5vw, 8px);
          user-select: none;
        }

        .tst-stars {
          margin-bottom: clamp(12px, 1.2vw, 18px);
          font-size: clamp(15px, 1.2vw, 20px);
          letter-spacing: 2px;
          line-height: 1;
        }

        .tst-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-style: italic;
          color: #4A4A4A;
          font-size: clamp(14px, 1.15vw, 18px);
          line-height: 1.8;
          margin: 0 auto clamp(18px, 1.8vw, 28px);
          max-width: 540px;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .tst-divider {
          width: clamp(36px, 3vw, 50px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(246,158,130,0.35), transparent);
          margin: 0 auto clamp(14px, 1.4vw, 22px);
        }

        .tst-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 0.9vw, 16px);
        }

        .tst-avatar {
          width: clamp(40px, 3.2vw, 52px);
          height: clamp(40px, 3.2vw, 52px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.4), rgba(246,158,130,0.25));
          border: 2px solid rgba(246,158,130,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #F69E82;
          font-size: clamp(15px, 1.2vw, 20px);
          flex-shrink: 0;
        }

        .tst-author-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .tst-author-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #2A2A2A;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.3;
        }

        .tst-author-meta {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.4vw, 8px);
          flex-wrap: wrap;
        }

        .tst-author-plan {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(11px, 0.8vw, 13px);
          line-height: 1.3;
        }

        .tst-author-time {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #AAA;
          font-size: clamp(10.5px, 0.75vw, 13px);
          line-height: 1.3;
        }

        .tst-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 0.5vw, 10px);
          margin-bottom: clamp(28px, 3vw, 44px);
          opacity: 0;
        }

        .tst-dot {
          height: 8px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }

        .tst-dot--active {
          width: 28px;
          background: #F69E82;
          box-shadow: 0 2px 8px rgba(246,158,130,0.3);
        }

        .tst-dot--idle {
          width: 8px;
          background: rgba(246,158,130,0.18);
        }

        .tst-dot--idle:hover {
          background: rgba(246,158,130,0.4);
          transform: scale(1.3);
        }

        .tst-swipe {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 24px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 11px;
          color: rgba(0,0,0,0.3);
          letter-spacing: 0.03em;
        }

        .tst-swipe-icon {
          font-size: 14px;
          animation: tstSwipeSlide 2.5s ease-in-out infinite;
        }

        @keyframes tstSwipeSlide {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }

        .tst-cta-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .tst-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 34px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 15px;
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
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tst-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(246,158,130,0.35), 0 2px 8px rgba(0,0,0,0.06);
        }

        .tst-btn:hover::before { opacity: 1; }

        .tst-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(246,158,130,0.2);
        }

        .tst-btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .tst-btn:hover .tst-btn-arrow {
          transform: translateX(3px);
        }

        .tst-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #BBB;
          letter-spacing: 0.03em;
          opacity: 0;
        }

        /* ═══ FLOATING DECO ═══ */
        .tst-deco {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }

        .tst-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* ═══ Premium swing — same pattern as EverythingGoodScreen ═══ */
        @keyframes tstSwing1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1.5deg); }
        }
        @keyframes tstSwing2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-3px) rotate(-2.5deg); }
          70% { transform: translateY(-5px) rotate(1.5deg); }
        }
        @keyframes tstSwing3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          35% { transform: translateY(-4px) rotate(1.8deg); }
          65% { transform: translateY(-3px) rotate(-2deg); }
        }
        @keyframes tstSwing4 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-3px) rotate(-1.5deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
          80% { transform: translateY(-2px) rotate(-1deg); }
        }

        .tst-fl-1 { animation: tstSwing1 5s ease-in-out infinite; }
        .tst-fl-2 { animation: tstSwing2 5.5s ease-in-out infinite 0.8s; }
        .tst-fl-3 { animation: tstSwing3 4.8s ease-in-out infinite 1.5s; }
        .tst-fl-4 { animation: tstSwing4 5.2s ease-in-out infinite 0.3s; }

        /* ═══ ENTRANCE ═══ */
        @keyframes tstUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes tstDown {
          0% { opacity: 0; transform: translateY(-24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes tstScale {
          0% { opacity: 0; transform: scale(0.92) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tstPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes tstNavIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .tst-a-up { animation: tstUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-down { animation: tstDown 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-scale { animation: tstScale 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .tst-a-pop { animation: tstPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .tst-a-nav { animation: tstNavIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        @media (max-width: 1024px) {
          .tst-carousel-row { max-width: 600px; }
          .tst-deco { display: none !important; }
        }

        @media (max-width: 768px) {
          .tst-container { padding: clamp(24px, 4vw, 40px) 24px clamp(40px, 5vw, 60px); }
          .tst-header { margin-bottom: clamp(28px, 3.5vw, 40px); }
          .tst-title { font-size: clamp(24px, 5.5vw, 30px); margin-bottom: 16px; }
          .tst-rating { padding: 7px 16px; gap: 8px; }
          .tst-rating-score { font-size: 16px; }
          .tst-rating-volume { font-size: 12px; }
          .tst-rating-divider { height: 14px; }
          .tst-carousel-row { max-width: 100%; gap: 0; margin-bottom: 20px; }
          .tst-nav { display: none; }
          .tst-card {
            padding: 28px 24px; border-radius: 20px;
            background: linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7));
            box-shadow: 0 12px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(246,158,130,0.06), inset 0 1px 0 rgba(255,255,255,0.9);
          }
          .tst-text { font-size: 14.5px; max-width: 100%; margin-bottom: 18px; }
          .tst-avatar { width: 42px; height: 42px; }
          .tst-author-name { font-size: 14px; }
          .tst-author-plan { font-size: 12px; }
          .tst-author-time { font-size: 11px; }
          .tst-swipe { display: flex; }
          .tst-dots { margin-bottom: 24px; }
          .tst-btn { padding: 13px 28px; font-size: 14px; }
        }

        @media (max-width: 540px) {
          .tst-container { padding: 20px 20px 40px; }
          .tst-title { font-size: clamp(22px, 5vw, 26px); }
        .tst-label { font-size: 10px; }
          .tst-card { padding: 24px 20px; border-radius: 18px; }
          .tst-text { font-size: 14px; }
          .tst-author { flex-direction: column; gap: 10px; }
          .tst-author-info { align-items: center; text-align: center; }
          .tst-author-meta { justify-content: center; }
          .tst-rating { padding: 6px 14px; gap: 7px; }
          .tst-rating-stars { font-size: 13px; }
          .tst-rating-score { font-size: 15px; }
        .tst-rating-volume { font-size: 11px; }
        }

        @media (max-width: 400px) {
          .tst-container { padding: 18px 18px 36px; }
          .tst-header { margin-bottom: 22px; }
          .tst-accent { width: 30px; margin-bottom: 12px; }
          .tst-label { margin-bottom: 12px; font-size: 9.5px; }
          .tst-title { font-size: 21px; margin-bottom: 14px; }
          .tst-rating { padding: 5px 12px; gap: 6px; }
          .tst-rating-stars { font-size: 12px; letter-spacing: 0; }
          .tst-rating-score { font-size: 14px; }
          .tst-rating-volume { font-size: 10.5px; }
          .tst-rating-divider { height: 12px; }
          .tst-card { padding: 22px 18px; border-radius: 16px; }
          .tst-quote { font-size: 24px; }
          .tst-stars { font-size: 14px; margin-bottom: 10px; }
          .tst-text { font-size: 13.5px; line-height: 1.75; margin-bottom: 16px; }
          .tst-divider { width: 32px; margin-bottom: 14px; }
          .tst-avatar { width: 38px; height: 38px; font-size: 14px; }
          .tst-author-name { font-size: 13px; }
        .tst-author-plan { font-size: 11px; }
          .tst-author-time { font-size: 10.5px; }
          .tst-dots { gap: 6px; margin-bottom: 20px; }
          .tst-dot { height: 7px; }
          .tst-dot--active { width: 24px; }
          .tst-dot--idle { width: 7px; }
          .tst-btn { padding: 12px 24px; font-size: 13px; gap: 8px; }
          .tst-btn-arrow { width: 14px; height: 14px; }
        .tst-microtrust { font-size: 11px; }
          .tst-swipe { font-size: 10.5px; }
        }

        @media (max-width: 340px) {
          .tst-container { padding: 16px 14px 32px; }
          .tst-title { font-size: 19px; }
          .tst-card { padding: 20px 16px; border-radius: 14px; }
          .tst-quote { font-size: 20px; }
          .tst-stars { font-size: 12px; margin-bottom: 8px; }
          .tst-text { font-size: 13px; line-height: 1.7; margin-bottom: 14px; }
          .tst-divider { width: 26px; margin-bottom: 12px; }
          .tst-avatar { width: 34px; height: 34px; font-size: 13px; border-width: 1.5px; }
          .tst-author-name { font-size: 12px; }
        .tst-author-plan { font-size: 10px; }
        .tst-author-time { font-size: 10px; }
          .tst-dots { gap: 5px; margin-bottom: 18px; }
          .tst-dot { height: 6px; }
          .tst-dot--active { width: 20px; }
          .tst-dot--idle { width: 6px; }
          .tst-btn { padding: 11px 20px; font-size: 12.5px; }
          .tst-microtrust { font-size: 10.5px; }
          .tst-rating { padding: 4px 10px; gap: 5px; }
        .tst-rating-stars { font-size: 11px; }
          .tst-rating-score { font-size: 13px; }
          .tst-rating-volume { font-size: 10px; }
        }
      `}</style>

      <div className="tst-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      {/* Floating deco */}
      <div
        className={`tst-deco ${a ? 'tst-a-pop' : ''}`}
        style={{ left: '4vw', top: '18%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', animationDelay: '0.6s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'tst-fl-1' : ''} />
      </div>
      <div
        className={`tst-deco ${a ? 'tst-a-pop' : ''}`}
        style={{ right: '5vw', top: '15%', width: 'clamp(18px, 2vw, 32px)', height: 'clamp(18px, 2vw, 32px)', animationDelay: '0.75s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'tst-fl-2' : ''} />
      </div>
      <div
        className={`tst-deco ${a ? 'tst-a-pop' : ''}`}
        style={{ left: '3.5vw', bottom: '14%', width: 'clamp(24px, 2.8vw, 44px)', height: 'clamp(24px, 2.8vw, 44px)', animationDelay: '0.9s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'tst-fl-3' : ''} />
      </div>
      <div
        className={`tst-deco ${a ? 'tst-a-pop' : ''}`}
        style={{ right: '4.5vw', bottom: '16%', width: 'clamp(20px, 2.3vw, 36px)', height: 'clamp(20px, 2.3vw, 36px)', animationDelay: '1.05s' }}
      >
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'tst-fl-4' : ''} />
      </div>

      <div className="tst-container">
        <div className="tst-header">
          <div className={`tst-accent ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.1s' }} />
          <span className={`tst-label ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.2s' }}>
            TESTIMONIOS
          </span>
          <h2 className={`tst-title ${a ? 'tst-a-down' : ''}`} style={{ animationDelay: '0.3s' }}>
            Lo que dicen quienes ya
            <br />
            <span className="tst-title-light">lo viven</span>
          </h2>
          <div className={`tst-rating ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '0.45s' }}>
            <span className="tst-rating-stars">⭐⭐⭐⭐⭐</span>
            <span className="tst-rating-score">4.9</span>
            <span className="tst-rating-divider" />
            <span className="tst-rating-volume">+50 experiencias</span>
          </div>
        </div>

        <div className="tst-carousel-row">
          <button
            className={`tst-nav ${a ? 'tst-a-nav' : ''}`}
            style={{ animationDelay: '0.6s' }}
            onClick={() => handleNav('prev')}
            aria-label="Anterior"
          >
            <svg className="tst-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={`tst-card-wrap ${a ? 'tst-a-scale' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div
              className={`tst-card ${
                slideDirection === 'left' ? 'tst-card--slide-left'
                : slideDirection === 'right' ? 'tst-card--slide-right'
                : ''
              }`}
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
                  <span className="tst-author-name">
                    {current.name}, {current.age} años
                  </span>
                  <div className="tst-author-meta">
                    <span className="tst-author-plan" style={{ color: current.planColor }}>
                      {current.plan}
                    </span>
                    <span className="tst-author-time">· {current.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`tst-nav ${a ? 'tst-a-nav' : ''}`}
            style={{ animationDelay: '0.65s' }}
            onClick={() => handleNav('next')}
            aria-label="Siguiente"
          >
            <svg className="tst-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="tst-swipe">
          <span className="tst-swipe-icon">👆</span>
          Deslizá para ver más
        </div>

        <div className={`tst-dots ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '0.75s' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`tst-dot ${i === activeIndex ? 'tst-dot--active' : 'tst-dot--idle'}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>

        <div className="tst-cta-area">
          <button
            className={`tst-btn ${a ? 'tst-a-up' : ''}`}
            style={{ animationDelay: '0.9s' }}
            onClick={() => scrollTo('contacto')}
          >
            Quiero mi experiencia
            <svg className="tst-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className={`tst-microtrust ${a ? 'tst-a-up' : ''}`} style={{ animationDelay: '1.05s' }}>
            Sin compromiso · Empezá cuando quieras
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsScreen;