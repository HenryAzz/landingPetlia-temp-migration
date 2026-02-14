import { useState, useEffect, useRef, TouchEvent } from 'react';

const testimonials = [
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
    text: 'Al principio dudé. Pensé "esto no puede ser real". Pero desde la primera llamada sentí que era genuino. Camil tiene una forma de hacerte sentir que importás.',
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

  const handleNav = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(direction === 'next' ? 'left' : 'right');

    setTimeout(() => {
      if (direction === 'next') {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative w-full overflow-hidden flex flex-col test-section"
    >
      <style>{`
        .test-section {
          background-color: #F3F3F3;
          min-height: 75vh;
          padding-top: 8vw;
          padding-bottom: 6vw;
        }

        .test-header {
          margin-bottom: clamp(24px, 3.5vw, 56px);
          padding: 0 24px;
        }

        .test-badge {
          display: inline-flex;
          align-items: center;
          gap: clamp(4px, 0.4vw, 8px);
          padding: clamp(5px, 0.4vw, 8px) clamp(14px, 1vw, 20px);
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.15));
          border: 1px solid rgba(246,158,130,0.25);
          color: #9E6B55;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(11px, 0.82vw, 14px);
          letter-spacing: 0.07em;
          margin-bottom: clamp(10px, 1vw, 16px);
        }

        .test-badge-emoji {
          font-size: clamp(12px, 0.85vw, 15px);
        }

        .test-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #F69E82;
          font-size: clamp(22px, 3.2vw, 55px);
          line-height: 1.3;
          margin: 0;
          text-align: center;
        }

        .test-content-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 2vw, 32px);
          width: 100%;
          max-width: 60vw;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 80px);
        }

        .testimonial-nav {
          width: clamp(40px, 3vw, 52px);
          height: clamp(40px, 3vw, 52px);
          min-width: 40px;
          min-height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F9DDA3, #F6C97A);
          border: 2px solid rgba(249, 221, 163, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(249, 221, 163, 0.35);
          -webkit-tap-highlight-color: transparent;
        }

        .testimonial-nav:hover {
          background: linear-gradient(135deg, #F6C97A, #F69E82) !important;
          border-color: rgba(246, 158, 130, 0.5) !important;
          box-shadow: 0 6px 20px rgba(246, 158, 130, 0.3) !important;
          transform: scale(1.08);
        }

        .testimonial-nav:active {
          transform: scale(0.93);
        }

        .test-nav-icon {
          width: clamp(14px, 1.2vw, 20px);
          height: clamp(14px, 1.2vw, 20px);
          min-width: 14px;
          min-height: 14px;
        }

        .testimonial-card-wrapper {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          position: relative;
        }

        .testimonial-card {
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease;
          padding: clamp(20px, 2.5vw, 40px) clamp(20px, 3vw, 48px);
          border-radius: clamp(16px, 1.5vw, 24px);
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(246,158,130,0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
          text-align: center;
          touch-action: pan-y;
          will-change: transform;
        }

        .testimonial-card.slide-left {
          animation: slideOutLeft 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .testimonial-card.slide-right {
          animation: slideOutRight 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-40px); opacity: 0; }
        }

        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(40px); opacity: 0; }
        }

        .test-quote-mark {
          font-size: clamp(24px, 2.5vw, 45px);
          line-height: 1;
          color: rgba(246,158,130,0.25);
          font-family: Georgia, serif;
          margin-bottom: clamp(2px, 0.5vw, 8px);
          user-select: none;
        }

        .test-stars {
          margin-bottom: clamp(8px, 1vw, 16px);
          font-size: clamp(14px, 1.2vw, 22px);
          letter-spacing: 1px;
        }

        .test-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-style: italic;
          color: #4A4A4A;
          font-size: clamp(13px, 1.15vw, 18px);
          line-height: 1.75;
          margin: 0 auto;
          margin-bottom: clamp(14px, 1.5vw, 24px);
          max-width: clamp(240px, 40vw, 600px);
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .test-divider {
          width: clamp(35px, 3vw, 50px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(246,158,130,0.4), transparent);
          margin: 0 auto clamp(12px, 1.2vw, 20px) auto;
        }

        .test-author-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 0.8vw, 16px);
        }

        .test-avatar {
          width: clamp(36px, 3vw, 50px);
          height: clamp(36px, 3vw, 50px);
          min-width: 36px;
          min-height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.45), rgba(246,158,130,0.3));
          border: 2px solid rgba(246,158,130,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #F69E82;
          font-size: clamp(14px, 1.1vw, 18px);
          flex-shrink: 0;
        }

        .test-author-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .test-author-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #2A2A2A;
          font-size: clamp(12px, 0.95vw, 16px);
          line-height: 1.3;
        }

        .test-author-meta {
          display: flex;
          align-items: center;
          gap: clamp(3px, 0.5vw, 8px);
          flex-wrap: wrap;
        }

        .test-author-plan {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.78vw, 14px);
          line-height: 1.3;
        }

        .test-author-time {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #AAA;
          font-size: clamp(10px, 0.72vw, 13px);
          line-height: 1.3;
        }

        .test-dots {
          gap: clamp(6px, 0.5vw, 10px);
          margin-top: clamp(18px, 2vw, 32px);
        }

        .test-dot {
          height: 10px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .test-dot-active {
          width: 28px;
          background-color: #F69E82;
        }

        .test-dot-inactive {
          width: 10px;
          background-color: rgba(246,158,130,0.2);
        }

        .test-dot-inactive:hover {
          background-color: rgba(246,158,130,0.4);
          transform: scale(1.2);
        }

        .test-deco-item { display: block; }

        @keyframes testDeco1 {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          25% { transform: translateY(-5px) rotate(-7deg); }
          50% { transform: translateY(-2px) rotate(-12deg); }
          75% { transform: translateY(-6px) rotate(-8deg); }
        }
        @keyframes testDeco2 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          30% { transform: translateY(-4px) rotate(11deg); }
          60% { transform: translateY(-7px) rotate(6deg); }
          85% { transform: translateY(-2px) rotate(9deg); }
        }
        @keyframes testDeco3 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          25% { transform: translateY(-6px) rotate(15deg); }
          50% { transform: translateY(-3px) rotate(10deg); }
          75% { transform: translateY(-5px) rotate(13deg); }
        }
        @keyframes testDeco4 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          30% { transform: translateY(-5px) rotate(-3deg); }
          60% { transform: translateY(-8px) rotate(-8deg); }
          85% { transform: translateY(-3px) rotate(-5deg); }
        }
        .test-deco-1 { animation: testDeco1 4.3s ease-in-out infinite; }
        .test-deco-2 { animation: testDeco2 4.7s ease-in-out infinite; animation-delay: 0.5s; }
        .test-deco-3 { animation: testDeco3 4s ease-in-out infinite; animation-delay: 1s; }
        .test-deco-4 { animation: testDeco4 4.5s ease-in-out infinite; animation-delay: 0.7s; }

        @keyframes fadeSlideDown {
          0%   { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardScaleIn {
          0%   { opacity: 0; transform: scale(0.92) translateY(25px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes navFadeIn {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-test-badge { opacity: 0; }
        .entrance-test-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-test-title { opacity: 0; }
        .entrance-test-title.animate {
          animation: fadeSlideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.25s;
        }
        .entrance-test-nav-left { opacity: 0; }
        .entrance-test-nav-left.animate {
          animation: navFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.55s;
        }
        .entrance-test-nav-right { opacity: 0; }
        .entrance-test-nav-right.animate {
          animation: navFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
        }
        .entrance-test-card { opacity: 0; }
        .entrance-test-card.animate {
          animation: cardScaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
        }
        .entrance-test-dots { opacity: 0; }
        .entrance-test-dots.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }
        .test-icon-wrapper { opacity: 0; }
        .test-icon-wrapper.animate-test-deco-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.5s; }
        .test-icon-wrapper.animate-test-deco-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.65s; }
        .test-icon-wrapper.animate-test-deco-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.8s; }
        .test-icon-wrapper.animate-test-deco-4 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.95s; }

        .swipe-hint {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
          color: rgba(158, 107, 85, 0.5);
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.03em;
          animation: swipeHintPulse 2.5s ease-in-out infinite;
        }

        .swipe-hint-icon {
          font-size: 14px;
          animation: swipeHintSlide 2.5s ease-in-out infinite;
        }

        @keyframes swipeHintPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes swipeHintSlide {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }

        /* ══════════════════════════════════
           TABLET (≤ 1024px)
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .test-section {
            min-height: auto;
            padding-top: 75px;
            padding-bottom: 50px;
          }
          .test-content-row {
            max-width: 88vw;
            padding: 0 16px;
          }
          .test-text {
            max-width: 100%;
          }
          .test-deco-item {
            display: none !important;
          }
          .entrance-test-badge.animate,
          .entrance-test-title.animate {
            animation-name: fadeSlideUp;
          }
        }

        /* ══════════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════════ */
        @media (max-width: 768px) {
          .test-section {
            padding-top: 65px;
            padding-bottom: 40px;
          }
          .test-header {
            margin-bottom: 22px;
            padding: 0 20px;
          }
          .test-content-row {
            max-width: 100%;
            padding: 0 20px;
            gap: 0;
          }
          .testimonial-card {
            padding: 28px 24px;
            border-radius: 20px;
            background: linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7));
            border: 1px solid rgba(246,158,130,0.15);
            box-shadow: 0 12px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(246,158,130,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
          }
          .testimonial-nav {
            display: none !important;
          }
          .swipe-hint {
            display: flex;
          }
          .test-quote-mark {
            font-size: 32px;
            margin-bottom: 4px;
          }
          .test-stars {
            font-size: 16px;
            margin-bottom: 12px;
            letter-spacing: 2px;
          }
          .test-text {
            font-size: 14.5px;
            line-height: 1.8;
            margin-bottom: 18px;
            max-width: 100%;
          }
          .test-divider {
            width: 40px;
            margin-bottom: 16px;
          }
          .test-author-row {
            gap: 12px;
          }
          .test-avatar {
            width: 42px !important;
            height: 42px !important;
            min-width: 42px;
            min-height: 42px;
            font-size: 16px !important;
            border-width: 2px;
          }
          .test-author-name {
            font-size: 14px;
            font-weight: 500;
          }
          .test-author-plan {
            font-size: 12px;
          }
          .test-author-time {
            font-size: 11px;
          }
          .test-dots {
            margin-top: 20px;
            gap: 8px;
          }
          .test-dot {
            height: 10px;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .test-dot-active {
            width: 30px;
            background: linear-gradient(90deg, #F69E82, #F6B89A);
            box-shadow: 0 2px 8px rgba(246,158,130,0.35);
          }
          .test-dot-inactive {
            width: 10px;
          }
        }

        /* ══════════════════════════════════
           MOBILE (≤ 640px)  — MÁS AIRE
        ══════════════════════════════════ */
        @media (max-width: 640px) {
          .test-section {
            padding-top: 80px;
            padding-bottom: 50px;
          }
          .test-header {
            margin-bottom: 28px;
            padding: 0 16px;
          }
          .test-badge {
            margin-bottom: 14px;
          }
          .test-content-row {
            padding: 0 16px;
          }
          .testimonial-card {
            padding: 30px 24px;
            border-radius: 18px;
          }
          .test-text {
            font-size: 14px;
            line-height: 1.75;
          }
          .test-author-row {
            flex-direction: column;
            gap: 10px;
          }
          .test-author-info {
            align-items: center !important;
            text-align: center;
          }
          .test-author-meta {
            justify-content: center;
          }
          .test-dots {
            margin-top: 24px;
          }
          .swipe-hint {
            margin-top: 16px;
          }
        }

        /* ══════════════════════════════════
           SMALL MOBILE (≤ 480px)  — MÁS AIRE
        ══════════════════════════════════ */
        @media (max-width: 480px) {
          .test-section {
            padding-top: 75px;
            padding-bottom: 45px;
          }
          .test-header {
            margin-bottom: 26px;
            padding: 0 14px;
          }
          .test-badge {
            margin-bottom: 13px;
          }
          .test-content-row {
            padding: 0 14px;
          }
          .testimonial-card {
            padding: 28px 22px;
            border-radius: 16px;
          }
          .test-quote-mark {
            font-size: 28px;
            margin-bottom: 6px;
          }
          .test-stars {
            font-size: 14px;
            margin-bottom: 12px;
          }
          .test-text {
            font-size: 13.5px;
            line-height: 1.75;
            margin-bottom: 16px;
          }
          .test-divider {
            margin-bottom: 14px;
          }
          .test-avatar {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px;
            min-height: 38px;
            font-size: 14px !important;
          }
          .test-author-name {
            font-size: 13px;
          }
          .test-author-plan {
            font-size: 11px;
          }
          .test-author-time {
            font-size: 10.5px;
          }
          .test-dots {
            margin-top: 22px;
            gap: 7px;
          }
          .test-dot {
            height: 8px;
          }
          .test-dot-active {
            width: 26px;
          }
          .test-dot-inactive {
            width: 8px;
          }
          .swipe-hint {
            margin-top: 14px;
            font-size: 10.5px;
          }
        }

        /* ══════════════════════════════════
           VERY SMALL (≤ 380px)  — MÁS AIRE
        ══════════════════════════════════ */
        @media (max-width: 380px) {
          .test-section {
            padding-top: 70px;
            padding-bottom: 40px;
          }
          .test-header {
            margin-bottom: 24px;
            padding: 0 12px;
          }
          .test-title {
            font-size: 20px;
          }
          .test-badge {
            font-size: 10px;
            padding: 4px 10px;
            margin-bottom: 12px;
          }
          .test-content-row {
            padding: 0 12px;
          }
          .testimonial-card {
            padding: 26px 20px;
            border-radius: 14px;
          }
          .test-quote-mark {
            font-size: 24px;
            margin-bottom: 5px;
          }
          .test-stars {
            font-size: 13px;
            margin-bottom: 10px;
          }
          .test-text {
            font-size: 13px;
            line-height: 1.7;
            margin-bottom: 14px;
          }
          .test-divider {
            width: 30px;
            margin-bottom: 12px;
          }
          .test-avatar {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px;
            min-height: 36px;
            font-size: 13px !important;
            border-width: 1.5px;
          }
          .test-author-name {
            font-size: 12px;
          }
          .test-author-plan {
            font-size: 10px;
          }
          .test-author-time {
            font-size: 10px;
          }
          .test-dots {
            margin-top: 20px;
            gap: 6px;
          }
          .test-dot {
            height: 7px;
          }
          .test-dot-active {
            width: 22px;
          }
          .test-dot-inactive {
            width: 7px;
          }
          .swipe-hint {
            margin-top: 12px;
          }
        }

        /* ══════════════════════════════════
           MINIMUM (≤ 320px)  — MÁS AIRE
        ══════════════════════════════════ */
        @media (max-width: 320px) {
          .test-section {
            padding-top: 65px;
            padding-bottom: 36px;
          }
          .test-header {
            margin-bottom: 22px;
            padding: 0 10px;
          }
          .test-title {
            font-size: 18px;
            line-height: 1.35;
          }
          .test-badge {
            font-size: 9.5px;
            padding: 3px 9px;
            gap: 3px;
            margin-bottom: 11px;
          }
          .test-badge-emoji {
            font-size: 11px;
          }
          .test-content-row {
            padding: 0 10px;
          }
          .testimonial-card {
            padding: 24px 18px;
            border-radius: 12px;
          }
          .test-quote-mark {
            font-size: 20px;
            margin-bottom: 4px;
          }
          .test-stars {
            font-size: 12px;
            margin-bottom: 8px;
            letter-spacing: 0;
          }
          .test-text {
            font-size: 12px;
            line-height: 1.65;
            margin-bottom: 12px;
          }
          .test-divider {
            width: 24px;
            height: 1.5px;
            margin-bottom: 10px;
          }
          .test-author-row {
            gap: 6px;
          }
          .test-avatar {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px;
            min-height: 32px;
            font-size: 12px !important;
            border-width: 1px;
          }
          .test-author-name {
            font-size: 11px;
          }
          .test-author-plan {
            font-size: 9.5px;
          }
          .test-author-time {
            font-size: 9.5px;
          }
          .test-dots {
            margin-top: 18px;
            gap: 4px;
          }
          .test-dot {
            height: 6px;
          }
          .test-dot-active {
            width: 20px;
          }
          .test-dot-inactive {
            width: 6px;
          }
          .swipe-hint {
            margin-top: 10px;
            font-size: 9.5px;
          }
        }
      `}</style>

      {/* Onda amarilla arriba */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ zIndex: 30 }}>
        <svg
          viewBox="0 0 1440 120"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: 'clamp(35px, 5vw, 65px)', transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z"
            fill="#F9DDA3"
          />
        </svg>
      </div>

      {/* Decoraciones */}
      <div
        className={`absolute pointer-events-none test-icon-wrapper test-deco-item ${hasAnimated ? 'animate-test-deco-1' : ''}`}
        style={{ left: '4vw', top: '18%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)', zIndex: 5 }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-1' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none test-icon-wrapper test-deco-item ${hasAnimated ? 'animate-test-deco-2' : ''}`}
        style={{ right: '5vw', top: '15%', width: 'clamp(20px, 2.2vw, 35px)', height: 'clamp(20px, 2.2vw, 35px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-2' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none test-icon-wrapper test-deco-item ${hasAnimated ? 'animate-test-deco-3' : ''}`}
        style={{ left: '3.5vw', bottom: '12%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-3' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none test-icon-wrapper test-deco-item ${hasAnimated ? 'animate-test-deco-4' : ''}`}
        style={{ right: '4.5vw', bottom: '14%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', zIndex: 5 }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-4' : ''}`} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <div className="flex flex-col items-center test-header">
          <span className={`test-badge entrance-test-badge ${hasAnimated ? 'animate' : ''}`}>
            <span className="test-badge-emoji">💬</span>
            Historias reales
          </span>
          <h2 className={`test-title entrance-test-title ${hasAnimated ? 'animate' : ''}`}>
            Lo que dicen quienes ya{' '}
            <span style={{ fontWeight: 600 }}>lo viven</span>
          </h2>
        </div>

        {/* Testimonial row */}
        <div className="test-content-row">
          {/* Flecha izquierda */}
          <button
            type="button"
            className={`testimonial-nav entrance-test-nav-left ${hasAnimated ? 'animate' : ''}`}
            onClick={() => handleNav('prev')}
            aria-label="Anterior"
          >
            <svg className="test-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Card wrapper */}
          <div className={`testimonial-card-wrapper entrance-test-card ${hasAnimated ? 'animate' : ''}`}>
            <div
              className={`testimonial-card ${
                slideDirection === 'left' ? 'slide-left' : slideDirection === 'right' ? 'slide-right' : ''
              }`}
              style={{
                transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
                opacity: swipeOffset !== 0 ? 1 - Math.abs(swipeOffset) / 300 : undefined,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="test-quote-mark">"</div>
              <div className="test-stars">⭐⭐⭐⭐⭐</div>
              <p className="test-text">{current.text}</p>
              <div className="test-divider" />
              <div className="test-author-row">
                <div className="test-avatar">{current.name.charAt(0)}</div>
                <div className="test-author-info">
                  <span className="test-author-name">
                    {current.name}, {current.age} años
                  </span>
                  <div className="test-author-meta">
                    <span className="test-author-plan" style={{ color: current.planColor }}>
                      {current.plan}
                    </span>
                    <span className="test-author-time">· {current.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flecha derecha */}
          <button
            type="button"
            className={`testimonial-nav entrance-test-nav-right ${hasAnimated ? 'animate' : ''}`}
            onClick={() => handleNav('next')}
            aria-label="Siguiente"
          >
            <svg className="test-nav-icon" fill="none" stroke="#5A3E2B" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Swipe hint - solo mobile */}
        <div className="swipe-hint">
          <span className="swipe-hint-icon">👆</span>
          Deslizá para ver más
        </div>

        {/* Dots */}
        <div className={`flex items-center justify-center test-dots entrance-test-dots ${hasAnimated ? 'animate' : ''}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`test-dot ${index === activeIndex ? 'test-dot-active' : 'test-dot-inactive'}`}
              aria-label={`Testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsScreen;