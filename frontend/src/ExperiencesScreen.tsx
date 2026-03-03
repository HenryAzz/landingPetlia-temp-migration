import { useEffect, useState, useRef } from 'react';

const SCENES = [
  {
    left: '/leer1.png',
    right: '/leer2.png',
    emoji: '📖',
    title: 'Lecturas compartidas',
    desc: 'Un libro, dos almas. Compartiendo historias y silencios cómplices a la distancia.',
    chip: '💛 Conexión genuina',
  },
  {
    left: '/compras1.png',
    right: '/compras2.png',
    emoji: '👩‍🍳',
    title: 'Cocinando juntos',
    desc: 'Los mismos ingredientes, la misma receta. Transformando lo cotidiano en un plan inolvidable.',
    chip: '✨ Momentos únicos',
  },
  {
    left: '/cama1.png',
    right: '/cama2.png',
    emoji: '🍿',
    title: 'Películas en sincro',
    desc: 'Misma peli, mismos sustos. Compartiendo emociones en tiempo real aunque estén lejos.',
    chip: '🤍 Compañía real',
  },
];

const DURATION = 8000;
const TICK = 50;

const ExperiencesScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [fade, setFade] = useState(true);
  const [photoPop, setPhotoPop] = useState(true);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const isTransitioning = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
    const iv = setInterval(() => {
      if (isTransitioning.current) return;
      elapsedRef.current += TICK;
      setProgress((elapsedRef.current / DURATION) * 100);
      if (elapsedRef.current >= DURATION) {
        doTransition((activeScene + 1) % SCENES.length);
      }
    }, TICK);
    return () => clearInterval(iv);
  }, [activeScene]);

  const doTransition = (next: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPhotoPop(false);
    setTimeout(() => setFade(false), 150);
    setTimeout(() => {
      setActiveScene(next);
      elapsedRef.current = 0;
      setProgress(0);
      setFade(true);
      setTimeout(() => {
        setPhotoPop(true);
        isTransitioning.current = false;
      }, 120);
    }, 650);
  };

  const handleDot = (i: number) => {
    if (i === activeScene || isTransitioning.current) return;
    doTransition(i);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scene = SCENES[activeScene];
  const a = hasAnimated;

  return (
    <section ref={sectionRef} className="exp-section">
      <style>{`
        .exp-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .exp-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        .exp-layout {
          position: relative;
          z-index: 5;
          display: flex;
          min-height: 100vh;
        }
        .exp-left {
          width: 52%;
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
          max-width: 540px;
          padding-left: clamp(40px, 6vw, 90px);
          padding-right: clamp(20px, 2vw, 40px);
        }
        .exp-right {
          width: 48%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        /* ═══ ACCENT ═══ */
        .exp-accent {
          width: 42px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.15));
          margin-bottom: 18px;
          opacity: 0;
        }

        /* ═══ LABEL ═══ */
        .exp-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 18px;
          opacity: 0;
        }

        /* ═══ TITLE — matches ChooseYourBond on desktop ═══ */
        .exp-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 4.5vw, 62px);
          line-height: 1.12;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0 0 32px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.2);
          opacity: 0;
        }
        .exp-title-light {
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.85);
        }

        /* ═══ SCENE ═══ */
        .exp-scene {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          min-height: 140px;
          width: 100%;
        }
        .exp-scene-fade {
          transition: opacity 0.45s ease, transform 0.45s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .exp-scene-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .exp-scene-hidden {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }
        .exp-scene-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.03em;
          align-self: flex-start;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .exp-scene-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #F9DDA3;
          font-size: clamp(20px, 1.6vw, 26px);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .exp-scene-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          font-size: clamp(14.5px, 1.1vw, 17px);
          line-height: 1.7;
          letter-spacing: 0.01em;
          margin: 0;
          max-width: 440px;
        }

        /* ═══ CONTROLS ═══ */
        .exp-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 32px;
          opacity: 0;
        }
        .exp-controls-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .exp-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .exp-dot {
          height: 8px;
          border: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .exp-dot--active {
          width: 30px;
          border-radius: 50px;
          background: #F9DDA3;
          box-shadow: 0 0 12px rgba(249,221,163,0.3);
        }
        .exp-dot--idle {
          width: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }
        .exp-dot--idle:hover {
          background: rgba(249,221,163,0.5);
          transform: scale(1.3);
        }
        .exp-counter {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
        }
        .exp-progress {
          width: clamp(140px, 14vw, 220px);
          height: 2.5px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .exp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.6));
          border-radius: 3px;
          transition: width 50ms linear;
        }

        /* ═══ CTA ═══ */
        .exp-cta-area {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .exp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 36px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%);
          color: #2a1f0e;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(249,221,163,0.2), 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .exp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .exp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(249,221,163,0.35), 0 2px 8px rgba(0,0,0,0.1);
        }
        .exp-btn:hover::before { opacity: 1; }
        .exp-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(249,221,163,0.2);
        }
        .exp-btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }
        .exp-btn:hover .exp-btn-arrow { transform: translateX(3px); }
        .exp-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.03em;
          opacity: 0;
        }

        /* ═══ PHOTOS ═══ */
        .exp-photos-wrap {
          position: relative;
          width: clamp(320px, 36vw, 520px);
          aspect-ratio: 1 / 0.9;
        }
        .exp-glow {
          position: absolute;
          width: 130%;
          aspect-ratio: 1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249,221,163,0.06) 0%, rgba(246,158,130,0.03) 35%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .exp-photo-slot { position: absolute; z-index: 2; }
        .exp-photo-slot--left { left: -3vw; top: 0; width: 54%; height: 76%; z-index: 3; }
        .exp-photo-slot--right { right: 0; bottom: 0; width: 54%; height: 76%; z-index: 2; }
        .exp-photo-card {
          width: 100%;
          height: 100%;
          border-radius: clamp(14px, 1.3vw, 22px);
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.22), 0 4px 14px rgba(0,0,0,0.1);
          border: 2.5px solid rgba(255,255,255,0.14);
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s ease;
          position: relative;
        }
        .exp-photo-card--left { transform: rotate(-3.5deg); }
        .exp-photo-card--right { transform: rotate(3.5deg); }
        .exp-photo-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.12); }
        .exp-photo-card--left:hover { transform: rotate(-3.5deg) scale(1.04) translateY(-4px); }
        .exp-photo-card--right:hover { transform: rotate(3.5deg) scale(1.04) translateY(-4px); }
        .exp-photo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.08) 100%);
          pointer-events: none;
        }
        .exp-photo-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .exp-pop { transition: opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
        .exp-pop--in { opacity: 1; transform: scale(1); }
        .exp-pop--out { opacity: 0; transform: scale(0.75); }
        .exp-pop-d1 { transition-delay: 0s; }
        .exp-pop-d2 { transition-delay: 0.1s; }
        .exp-pop-d3 { transition-delay: 0.2s; }
        .exp-pop-out-d1 { transition-delay: 0.12s; }
        .exp-pop-out-d2 { transition-delay: 0.06s; }
        .exp-pop-out-d3 { transition-delay: 0s; }

        .exp-emoji-anchor {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 6;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp-emoji-sizer { width: clamp(54px, 4.8vw, 78px); height: clamp(54px, 4.8vw, 78px); }
        .exp-emoji-orb {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.55), rgba(246,158,130,0.35));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 2px solid rgba(255,255,255,0.45);
          box-shadow: 0 8px 28px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(22px, 2.2vw, 32px);
        }
        @keyframes expEmojiFloat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.06) rotate(3deg); }
          50% { transform: scale(1) rotate(-2deg); }
          75% { transform: scale(1.04) rotate(1deg); }
        }
        .exp-emoji-float { animation: expEmojiFloat 3.5s ease-in-out infinite; }

        .exp-deco { position: absolute; pointer-events: none; z-index: 4; opacity: 0; }
        .exp-deco img { width: 100%; height: 100%; object-fit: contain; }
        @keyframes expF1 { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-7px) rotate(-4deg); } }
        @keyframes expF2 { 0%, 100% { transform: translateY(0) rotate(10deg); } 50% { transform: translateY(-6px) rotate(14deg); } }
        @keyframes expF3 { 0%, 100% { transform: translateY(0) rotate(5deg); } 50% { transform: translateY(-8px) rotate(9deg); } }
        .exp-fl-1 { animation: expF1 4.2s ease-in-out infinite; }
        .exp-fl-2 { animation: expF2 4.6s ease-in-out infinite 0.5s; }
        .exp-fl-3 { animation: expF3 3.9s ease-in-out infinite 1s; }

        @keyframes expUp { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes expSlide { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes expPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        .exp-a-up { animation: expUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .exp-a-slide { animation: expSlide 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .exp-a-pop { animation: expPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }

        /* ═══════════════════════════════
           TABLET ≤ 1024
        ═══════════════════════════════ */
        @media (max-width: 1024px) {
          .exp-layout {
            flex-direction: column;
            min-height: auto;
            padding: 72px 0 64px;
          }
          .exp-left {
            width: 100%;
            padding: 0 clamp(28px, 5vw, 48px);
          }
          .exp-left-inner {
            padding: 0;
            max-width: 560px;
            align-items: center;
            text-align: center;
            margin: 0 auto 52px;
          }
          .exp-title {
            font-size: clamp(40px, 6vw, 54px);
          }
          .exp-label { font-size: 13px; }
          .exp-scene-chip { align-self: center; font-size: 14px; }
          .exp-scene-title { font-size: clamp(22px, 3vw, 28px); }
          .exp-scene-desc { font-size: clamp(16px, 2.2vw, 19px); max-width: 100%; }
          .exp-right {
            width: 100%;
            padding: 0 32px;
            justify-content: center;
          }
          .exp-photos-wrap {
            width: clamp(300px, 52vw, 440px);
            margin: 0 auto;
          }
          .exp-controls { align-items: center; }
          .exp-cta-area { align-items: center; }
          .exp-deco { display: none !important; }
          .exp-a-slide { animation-name: expUp; }
        }

        /* ═══════════════════════════════
           MOBILE ≤ 768
        ═══════════════════════════════ */
        @media (max-width: 768px) {
          .exp-layout { padding: 60px 0 52px; }
          .exp-left { padding: 0 28px; }
          .exp-left-inner {
            max-width: 500px;
            margin-bottom: 44px;
          }
          .exp-right { padding: 0 28px; }

          .exp-accent { width: 46px; height: 3px; margin-bottom: 16px; }
          .exp-label { font-size: 13px; margin-bottom: 16px; letter-spacing: 0.18em; }

          .exp-title {
            font-size: clamp(36px, 10vw, 48px);
            margin-bottom: 28px;
          }

          .exp-scene {
            margin-bottom: 26px;
            min-height: 150px;
            gap: 12px;
          }
          .exp-scene-chip { font-size: 14px; padding: 7px 18px; }
          .exp-scene-title { font-size: clamp(22px, 5.5vw, 28px); }
          .exp-scene-desc {
            font-size: clamp(16px, 4.2vw, 18px);
            line-height: 1.65;
          }

          .exp-controls { margin-bottom: 28px; gap: 10px; }
          .exp-counter { font-size: 13px; }
          .exp-progress { width: clamp(140px, 40vw, 220px); }

          .exp-btn { padding: 15px 34px; font-size: 15px; }
          .exp-microtrust { font-size: 13px; }

          .exp-photos-wrap { width: clamp(260px, 60vw, 370px); }
          .exp-emoji-sizer { width: 52px; height: 52px; }
        }

        /* ═══════════════════════════════
           SMALL ≤ 540
        ═══════════════════════════════ */
        @media (max-width: 540px) {
          .exp-layout { padding: 52px 0 46px; }
          .exp-left { padding: 0 24px; }
          .exp-left-inner {
            max-width: 100%;
            margin-bottom: 40px;
          }
          .exp-right { padding: 0 24px; }

          .exp-accent { width: 42px; margin-bottom: 14px; }
          .exp-label { font-size: 12.5px; margin-bottom: 14px; }

          .exp-title {
            font-size: clamp(34px, 9.5vw, 44px);
            margin-bottom: 24px;
          }

          .exp-scene {
            min-height: 140px;
            margin-bottom: 24px;
            gap: 11px;
          }
          .exp-scene-chip { font-size: 13.5px; padding: 6px 16px; }
          .exp-scene-title { font-size: clamp(20px, 5.5vw, 26px); }
          .exp-scene-desc {
            font-size: clamp(15px, 4vw, 17px);
            line-height: 1.6;
          }

          .exp-controls { margin-bottom: 24px; }
          .exp-counter { font-size: 12.5px; }

          .exp-btn { padding: 14px 30px; font-size: 14.5px; }
          .exp-microtrust { font-size: 12.5px; }

          .exp-photos-wrap { width: 78vw; max-width: 340px; }
          .exp-emoji-sizer { width: 48px; height: 48px; }
          .exp-photo-card { border-radius: 16px; border-width: 2px; }
        }

        /* ═══════════════════════════════
           XS ≤ 400
        ═══════════════════════════════ */
        @media (max-width: 400px) {
          .exp-layout { padding: 46px 0 40px; }
          .exp-left { padding: 0 20px; }
          .exp-right { padding: 0 20px; }

          .exp-accent { width: 38px; height: 2.5px; margin-bottom: 12px; }
          .exp-label { font-size: 12px; margin-bottom: 12px; letter-spacing: 0.16em; }

          .exp-title {
            font-size: clamp(32px, 9vw, 40px);
            margin-bottom: 22px;
          }

          .exp-scene {
            min-height: 130px;
            margin-bottom: 22px;
            gap: 10px;
          }
          .exp-scene-chip { font-size: 13px; padding: 6px 15px; }
          .exp-scene-title { font-size: clamp(19px, 5.2vw, 24px); }
          .exp-scene-desc {
            font-size: clamp(14.5px, 3.8vw, 16px);
            line-height: 1.55;
          }

          .exp-controls { margin-bottom: 22px; gap: 9px; }
          .exp-dots { gap: 7px; }
          .exp-dot { height: 7px; }
          .exp-dot--active { width: 26px; }
          .exp-dot--idle { width: 7px; }
          .exp-counter { font-size: 12px; }
          .exp-progress { height: 2px; }

          .exp-cta-area { gap: 10px; }
          .exp-btn { padding: 13px 28px; font-size: 14px; gap: 9px; }
          .exp-btn-arrow { width: 15px; height: 15px; }
          .exp-microtrust { font-size: 12px; }

          .exp-photos-wrap { width: 84vw; max-width: 320px; }
          .exp-emoji-sizer { width: 44px; height: 44px; }
          .exp-emoji-orb { font-size: 21px; }
          .exp-photo-card { border-radius: 14px; }
          .exp-photo-card--left { transform: rotate(-3deg); }
          .exp-photo-card--right { transform: rotate(3deg); }
          .exp-photo-card--left:hover { transform: rotate(-3deg) scale(1.03); }
          .exp-photo-card--right:hover { transform: rotate(3deg) scale(1.03); }
        }

        /* ═══════════════════════════════
           XXS ≤ 340
        ═══════════════════════════════ */
        @media (max-width: 340px) {
          .exp-layout { padding: 40px 0 36px; }
          .exp-left { padding: 0 16px; }
          .exp-right { padding: 0 16px; }

          .exp-accent { width: 34px; margin-bottom: 10px; }
          .exp-label { font-size: 11px; margin-bottom: 10px; }

          .exp-title {
            font-size: clamp(28px, 8.5vw, 34px);
            margin-bottom: 20px;
          }

          .exp-scene {
            min-height: 120px;
            margin-bottom: 20px;
            gap: 9px;
          }
          .exp-scene-chip { font-size: 12px; padding: 5px 13px; }
          .exp-scene-title { font-size: clamp(17px, 5vw, 21px); }
          .exp-scene-desc { font-size: clamp(13.5px, 3.6vw, 15px); line-height: 1.5; }

          .exp-controls { margin-bottom: 20px; }
          .exp-btn { padding: 12px 24px; font-size: 13.5px; }
          .exp-microtrust { font-size: 11.5px; }

          .exp-photos-wrap { width: 88vw; }
          .exp-emoji-sizer { width: 40px; height: 40px; }
          .exp-emoji-orb { font-size: 19px; }
          .exp-photo-card--left { transform: rotate(-2.5deg); }
          .exp-photo-card--right { transform: rotate(2.5deg); }
        }
      `}</style>

      <div className="exp-bg">
        <img src="/fondoliso.jpeg" alt="" />
      </div>

      <div className={`exp-deco ${a ? 'exp-a-pop' : ''}`} style={{ left: '44%', top: '16%', width: 'clamp(28px,3.2vw,50px)', height: 'clamp(28px,3.2vw,50px)', animationDelay: '0.7s' }}>
        <img src="/corazonderecha.png" alt="" className={mounted ? 'exp-fl-1' : ''} style={{ opacity: 0.75 }} />
      </div>
      <div className={`exp-deco ${a ? 'exp-a-pop' : ''}`} style={{ left: '46%', top: '50%', width: 'clamp(24px,2.8vw,44px)', height: 'clamp(24px,2.8vw,44px)', animationDelay: '0.85s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'exp-fl-2' : ''} style={{ opacity: 0.7 }} />
      </div>
      <div className={`exp-deco ${a ? 'exp-a-pop' : ''}`} style={{ left: '43%', bottom: '16%', width: 'clamp(22px,2.5vw,40px)', height: 'clamp(22px,2.5vw,40px)', animationDelay: '1s' }}>
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'exp-fl-3' : ''} style={{ opacity: 0.8 }} />
      </div>

      <div className="exp-layout">
        <div className="exp-left">
          <div className="exp-left-inner">
            <div className={`exp-accent ${a ? 'exp-a-slide' : ''}`} style={{ animationDelay: '0.1s' }} />
            <span className={`exp-label ${a ? 'exp-a-slide' : ''}`} style={{ animationDelay: '0.2s' }}>
              EXPERIENCIAS
            </span>
            <h2 className={`exp-title ${a ? 'exp-a-slide' : ''}`} style={{ animationDelay: '0.3s' }}>
              <span className="exp-title-light">Así se </span>vive<br />con Camil
            </h2>
            <div className={`exp-scene ${a ? 'exp-a-up' : ''}`} style={{ animationDelay: '0.5s', opacity: a ? undefined : 0 }}>
              <div className={`exp-scene-fade ${fade ? 'exp-scene-visible' : 'exp-scene-hidden'}`}>
                <span className="exp-scene-chip">{scene.chip}</span>
                <h3 className="exp-scene-title">{scene.title}</h3>
                <p className="exp-scene-desc">{scene.desc}</p>
              </div>
            </div>
            <div className={`exp-controls ${a ? 'exp-a-up' : ''}`} style={{ animationDelay: '0.65s' }}>
              <div className="exp-controls-row">
                <div className="exp-dots">
                  {SCENES.map((_, i) => (
                    <button key={i} className={`exp-dot ${i === activeScene ? 'exp-dot--active' : 'exp-dot--idle'}`} onClick={() => handleDot(i)} aria-label={`Escena ${i + 1}`} />
                  ))}
                </div>
                <span className="exp-counter">{activeScene + 1} / {SCENES.length}</span>
              </div>
              <div className="exp-progress">
                <div className="exp-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="exp-cta-area">
              <button className={`exp-btn ${a ? 'exp-a-up' : ''}`} style={{ animationDelay: '0.8s' }} onClick={() => scrollTo('planes')}>
                Quiero vivir esta experiencia
                <svg className="exp-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span className={`exp-microtrust ${a ? 'exp-a-up' : ''}`} style={{ animationDelay: '0.95s' }}>
                Cada experiencia es única y personalizada
              </span>
            </div>
          </div>
        </div>

        <div className="exp-right">
          <div className="exp-photos-wrap">
            <div className="exp-glow" />
            <div className={`exp-photo-slot exp-photo-slot--left exp-pop ${photoPop ? 'exp-pop--in exp-pop-d1' : 'exp-pop--out exp-pop-out-d1'}`}>
              <div className="exp-photo-card exp-photo-card--left">
                <img src={scene.left} alt="Camil" />
              </div>
            </div>
            <div className={`exp-photo-slot exp-photo-slot--right exp-pop ${photoPop ? 'exp-pop--in exp-pop-d2' : 'exp-pop--out exp-pop-out-d2'}`}>
              <div className="exp-photo-card exp-photo-card--right">
                <img src={scene.right} alt="Persona" />
              </div>
            </div>
            <div className="exp-emoji-anchor">
              <div className={`exp-emoji-sizer exp-pop ${photoPop ? 'exp-pop--in exp-pop-d3' : 'exp-pop--out exp-pop-out-d3'}`}>
                <div className="exp-emoji-orb exp-emoji-float">{scene.emoji}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesScreen;