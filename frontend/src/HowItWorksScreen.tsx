import { useEffect, useState, useRef, useCallback } from 'react';

const STEPS = [
  {
    number: '01',
    emoji: '💛',
    title: 'Elegí tu vínculo',
    description: 'Explorá los 3 tipos de compañía y elegí el que mejor se adapte a lo que necesitás.',
    color: '#F9DDA3',
  },
  {
    number: '02',
    emoji: '📝',
    title: 'Completá el formulario',
    description: 'Contanos un poco sobre vos para personalizar tu experiencia desde el primer momento.',
    color: '#F69E82',
  },
  {
    number: '03',
    emoji: '💬',
    title: 'Te contactamos',
    description: 'El equipo de Camil se comunica con vos para coordinar todo y empezar cuanto antes.',
    color: '#E8C878',
  },
  {
    number: '04',
    emoji: '✨',
    title: '¡Empezá a disfrutar!',
    description: 'Recibí tu primera carta, mensaje o llamada y viví la experiencia Camil.',
    color: '#F4B896',
  },
];

const HowItWorksScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentTilts = useRef(STEPS.map(() => ({ rx: 0, ry: 0, scale: 1 })));
  const isInSection = useRef(false);

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

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateLoop = useCallback(() => {
    const f = 0.07;
    let needsUpdate = false;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const c = currentTilts.current[i];
      const rect = el.getBoundingClientRect();
      const cardCx = rect.left + rect.width / 2;
      const cardCy = rect.top + rect.height / 2;

      let targetRx = 0, targetRy = 0, targetScale = 1;

      if (isInSection.current) {
        const dx = mousePos.current.x - cardCx;
        const dy = mousePos.current.y - cardCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 600;
        const intensity = Math.max(0, 1 - dist / maxDist);
        const maxTilt = 8;

        targetRx = (dy / (rect.height / 2)) * -maxTilt * intensity;
        targetRy = (dx / (rect.width / 2)) * maxTilt * intensity;
        targetRx = Math.max(-maxTilt, Math.min(maxTilt, targetRx));
        targetRy = Math.max(-maxTilt, Math.min(maxTilt, targetRy));
        targetScale = 1 + 0.015 * intensity;
      }

      c.rx = lerp(c.rx, targetRx, f);
      c.ry = lerp(c.ry, targetRy, f);
      c.scale = lerp(c.scale, targetScale, f);

      el.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(${c.scale},${c.scale},1)`;

      if (Math.abs(c.rx - targetRx) > 0.01 || Math.abs(c.ry - targetRy) > 0.01 || Math.abs(c.scale - targetScale) > 0.001) {
        needsUpdate = true;
      }
    });

    if (needsUpdate || isInSection.current) {
      rafRef.current = requestAnimationFrame(animateLoop);
    } else {
      cardRefs.current.forEach(el => {
        if (el) el.style.transform = '';
      });
      rafRef.current = null;
    }
  }, []);

  const kick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animateLoop);
  }, [animateLoop]);

  const onSectionMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    kick();
  }, [kick]);

  const onSectionEnter = useCallback(() => {
    isInSection.current = true;
    kick();
  }, [kick]);

  const onSectionLeave = useCallback(() => {
    isInSection.current = false;
    kick();
  }, [kick]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const a = hasAnimated;

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="hiw-section"
      onMouseMove={onSectionMove}
      onMouseEnter={onSectionEnter}
      onMouseLeave={onSectionLeave}
    >
      <style>{`
        .hiw-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 85vh;
        }

        .hiw-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hiw-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        .hiw-wave {
          position: relative;
          width: 100%;
          pointer-events: none;
          z-index: 2;
          line-height: 0;
          flex-shrink: 0;
          margin-bottom: -1px;
        }
        .hiw-wave svg {
          width: 100%;
          height: clamp(40px, 4.5vw, 65px);
          display: block;
        }

        .hiw-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: clamp(20px, 3vw, 40px) clamp(20px, 5vw, 72px) clamp(32px, 4.5vw, 56px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ═══ HEADER ═══ */
        .hiw-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(28px, 3.5vw, 44px);
        }

        .hiw-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(249,221,163,0.9), rgba(249,221,163,0.15));
          margin-bottom: 12px;
          opacity: 0;
        }

        .hiw-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(249,221,163,0.75);
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0;
        }

        .hiw-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.25;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(10px, 1vw, 16px);
          text-shadow: 0 2px 20px rgba(0,0,0,0.2);
          opacity: 0;
        }
        .hiw-title-light {
          font-weight: 400;
          color: rgba(255,255,255,0.85);
        }

        .hiw-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.15vw, 17px);
          color: rgba(255,255,255,0.6);
          margin: 0;
          max-width: 480px;
          line-height: 1.7;
          letter-spacing: 0.015em;
          opacity: 0;
        }

        /* ═══ STEPS ═══ */
        .hiw-steps-wrap {
          width: 100%;
          position: relative;
          margin-bottom: clamp(28px, 3.5vw, 44px);
        }

        .hiw-connector {
          position: absolute;
          top: 50%;
          left: calc(12.5% + 16px);
          right: calc(12.5% + 16px);
          height: 1px;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-50%);
        }
        .hiw-connector-line {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 5px,
            transparent 5px,
            transparent 13px
          );
        }

        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.1vw, 18px);
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* ═══ CARD ═══ */
        .hiw-card {
          position: relative;
          border-radius: clamp(16px, 1.3vw, 22px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow: 0 6px 28px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          padding: clamp(18px, 1.5vw, 26px);
          min-height: clamp(170px, 13.5vw, 230px);
          transition: box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease;
          cursor: default;
          overflow: hidden;
          opacity: 0;
          will-change: transform;
        }

        .hiw-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(160deg, rgba(255,255,255,0.05) 0%, transparent 40%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .hiw-card:hover {
          box-shadow: 0 20px 56px rgba(0,0,0,0.22), 0 0 28px var(--step-glow);
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
        }
        .hiw-card:hover::before { opacity: 1; }

        /* Top accent line */
        .hiw-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: clamp(18px, 1.5vw, 24px);
          right: clamp(18px, 1.5vw, 24px);
          height: 2px;
          border-radius: 0 0 2px 2px;
          background: var(--step-color);
          opacity: 0.3;
          transition: opacity 0.4s ease;
        }
        .hiw-card:hover::after { opacity: 0.55; }

        /* Emoji */
        .hiw-card-emoji {
          font-size: clamp(20px, 1.6vw, 26px);
          line-height: 1;
          margin-bottom: clamp(10px, 0.9vw, 16px);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12));
        }

        /* Title */
        .hiw-card-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #FFFFFF;
          font-size: clamp(14.5px, 1.15vw, 18px);
          line-height: 1.35;
          margin: 0 0 clamp(6px, 0.5vw, 10px);
        }

        /* Description */
        .hiw-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          font-size: clamp(12px, 0.88vw, 14px);
          line-height: 1.6;
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* Number — bottom right, decorative */
        .hiw-card-num {
          position: absolute;
          bottom: clamp(12px, 1vw, 18px);
          right: clamp(16px, 1.4vw, 24px);
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 2.8vw, 48px);
          line-height: 1;
          letter-spacing: -0.04em;
          opacity: 0.12;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hiw-card:hover .hiw-card-num {
          opacity: 0.22;
          transform: scale(1.06);
        }

        /* ═══ CTA ═══ */
        .hiw-cta-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .hiw-btn {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: clamp(13px, 1vw, 17px) clamp(30px, 2.3vw, 40px);
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%);
          color: #2a1f0e;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(14px, 1.05vw, 17px);
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(249,221,163,0.2), 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .hiw-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hiw-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(249,221,163,0.35), 0 2px 8px rgba(0,0,0,0.1);
        }
        .hiw-btn:hover::before { opacity: 1; }
        .hiw-btn:active { transform: translateY(0); }
        .hiw-btn-arrow { width: 16px; height: 16px; transition: transform 0.3s ease; }
        .hiw-btn:hover .hiw-btn-arrow { transform: translateX(3px); }

        .hiw-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11.5px, 0.85vw, 13px);
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.03em;
          text-align: center;
          opacity: 0;
        }

        /* ═══ DECO ═══ */
        .hiw-deco {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }
        .hiw-deco img { width: 100%; height: 100%; object-fit: contain; }

        @keyframes hiwF1 { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-7px) rotate(-4deg); } }
        @keyframes hiwF2 { 0%, 100% { transform: translateY(0) rotate(10deg); } 50% { transform: translateY(-6px) rotate(14deg); } }
        @keyframes hiwF3 { 0%, 100% { transform: translateY(0) rotate(5deg); } 50% { transform: translateY(-8px) rotate(9deg); } }
        @keyframes hiwF4 { 0%, 100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(-5px) rotate(-8deg); } }
        .hiw-f1 { animation: hiwF1 4.2s ease-in-out infinite; }
        .hiw-f2 { animation: hiwF2 4.6s ease-in-out infinite 0.5s; }
        .hiw-f3 { animation: hiwF3 3.9s ease-in-out infinite 1s; }
        .hiw-f4 { animation: hiwF4 4.4s ease-in-out infinite 0.8s; }

        /* ═══ ANIMATIONS ═══ */
        @keyframes hiwUp { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes hiwDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes hiwCardIn { 0% { opacity: 0; transform: translateY(32px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes hiwPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes hiwLineIn { 0% { opacity: 0; transform: scaleX(0); } 100% { opacity: 1; transform: scaleX(1); } }

        .hiw-a-up { animation: hiwUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-down { animation: hiwDown 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-card { animation: hiwCardIn 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-pop { animation: hiwPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .hiw-a-line { animation: hiwLineIn 1s cubic-bezier(0.22,1,0.36,1) both; transform-origin: left center; }

        /* ═══ TABLET ≤ 1024 ═══ */
        @media (max-width: 1024px) {
          .hiw-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            max-width: 580px;
          }
          .hiw-card { min-height: 165px; }
          .hiw-connector { display: none; }
          .hiw-deco { display: none; }
        }

        /* ═══ MOBILE ≤ 768 ═══ */
        @media (max-width: 768px) {
          .hiw-container {
            padding: clamp(20px, 3vw, 36px) 24px clamp(40px, 5vw, 56px);
          }
          .hiw-header { margin-bottom: clamp(24px, 4vw, 36px); }
          .hiw-title { font-size: clamp(24px, 5.5vw, 30px); }
          .hiw-subtitle { font-size: 15px; }
          .hiw-grid { gap: 12px; }
          .hiw-card { padding: 18px; min-height: 150px; }
          .hiw-card-emoji { font-size: 20px; margin-bottom: 10px; }
          .hiw-card-title { font-size: 14.5px; }
          .hiw-card-desc { font-size: 12px; }
          .hiw-card-num { font-size: 32px; bottom: 10px; right: 14px; }
          .hiw-btn { padding: 13px 30px; font-size: 14px; }
        }

        /* ═══ SMALL ≤ 540 ═══ */
        @media (max-width: 540px) {
          .hiw-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          .hiw-card {
            min-height: auto;
            padding: 18px 18px 20px;
            flex-direction: row;
            align-items: flex-start;
            gap: clamp(12px, 3vw, 16px);
          }
          .hiw-card::after { left: 14px; right: 14px; }
          .hiw-card-emoji { font-size: 20px; margin-bottom: 0; flex-shrink: 0; margin-top: 2px; }
          .hiw-card-content { flex: 1; min-width: 0; }
          .hiw-card-title { font-size: 14px; margin-bottom: 4px; }
          .hiw-card-desc { font-size: 11.5px; padding-right: 30px; }
          .hiw-card-num { font-size: 28px; bottom: 8px; right: 12px; }
          .hiw-title { font-size: clamp(22px, 5vw, 26px); }
          .hiw-label { font-size: 10px; }
          .hiw-subtitle { font-size: 14.5px; }
        }

        /* ═══ XS ≤ 400 ═══ */
        @media (max-width: 400px) {
          .hiw-container { padding: 18px 18px 38px; }
          .hiw-header { margin-bottom: 22px; }
          .hiw-accent { width: 30px; margin-bottom: 10px; }
          .hiw-label { font-size: 9.5px; margin-bottom: 10px; }
          .hiw-title { font-size: 21px; }
          .hiw-subtitle { font-size: 13.5px; }
          .hiw-grid { gap: 10px; }
          .hiw-card { padding: 16px 16px 18px; gap: 10px; border-radius: 14px; }
          .hiw-card-emoji { font-size: 18px; }
          .hiw-card-title { font-size: 13.5px; }
          .hiw-card-desc { font-size: 11px; padding-right: 26px; }
          .hiw-card-num { font-size: 24px; bottom: 7px; right: 10px; }
          .hiw-btn { padding: 12px 24px; font-size: 13.5px; gap: 9px; }
          .hiw-btn-arrow { width: 14px; height: 14px; }
          .hiw-microtrust { font-size: 11px; }
        }

        /* ═══ XXS ≤ 340 ═══ */
        @media (max-width: 340px) {
          .hiw-container { padding: 16px 14px 34px; }
          .hiw-title { font-size: 19px; }
          .hiw-subtitle { font-size: 13px; }
          .hiw-card { padding: 14px 14px 16px; gap: 9px; }
          .hiw-card-emoji { font-size: 16px; }
          .hiw-card-title { font-size: 13px; }
          .hiw-card-desc { font-size: 10.5px; }
          .hiw-card-num { font-size: 22px; }
          .hiw-btn { padding: 11px 20px; font-size: 13px; }
        }

        @media (hover: none) {
          .hiw-card { will-change: auto !important; }
        }
      `}</style>

      <div className="hiw-bg">
        <img src="/fondoliso.jpeg" alt="" />
      </div>

      <div className="hiw-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      <div
        className={`hiw-deco ${a ? 'hiw-a-pop' : ''}`}
        style={{ left: '4vw', top: '15%', width: 'clamp(28px, 3.5vw, 55px)', height: 'clamp(28px, 3.5vw, 55px)', animationDelay: '0.7s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'hiw-f1' : ''} />
      </div>
      <div
        className={`hiw-deco ${a ? 'hiw-a-pop' : ''}`}
        style={{ right: '5vw', top: '13%', width: 'clamp(18px, 2.2vw, 35px)', height: 'clamp(18px, 2.2vw, 35px)', animationDelay: '0.85s' }}
      >
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'hiw-f2' : ''} />
      </div>
      <div
        className={`hiw-deco ${a ? 'hiw-a-pop' : ''}`}
        style={{ left: '3.5vw', bottom: '12%', width: 'clamp(24px, 3vw, 48px)', height: 'clamp(24px, 3vw, 48px)', animationDelay: '1s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'hiw-f3' : ''} />
      </div>
      <div
        className={`hiw-deco ${a ? 'hiw-a-pop' : ''}`}
        style={{ right: '4.5vw', bottom: '14%', width: 'clamp(16px, 2vw, 30px)', height: 'clamp(16px, 2vw, 30px)', animationDelay: '1.15s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'hiw-f4' : ''} />
      </div>

      <div className="hiw-container">
        <div className="hiw-header">
          <div className={`hiw-accent ${a ? 'hiw-a-down' : ''}`} style={{ animationDelay: '0.1s' }} />
          <span className={`hiw-label ${a ? 'hiw-a-down' : ''}`} style={{ animationDelay: '0.2s' }}>
            CÓMO FUNCIONA
          </span>
          <h2 className={`hiw-title ${a ? 'hiw-a-down' : ''}`} style={{ animationDelay: '0.3s' }}>
            4 pasos simples
            <br />
            <span className="hiw-title-light">para sentirte acompañado</span>
          </h2>
          <p className={`hiw-subtitle ${a ? 'hiw-a-up' : ''}`} style={{ animationDelay: '0.45s' }}>
            Sin complicaciones, sin esperas largas. Elegí, completá y empezá a sentirte diferente.
          </p>
        </div>

        <div className="hiw-steps-wrap">
          <div className={`hiw-connector ${a ? 'hiw-a-line' : ''}`} style={{ animationDelay: '0.9s' }}>
            <div className="hiw-connector-line" />
          </div>

          <div className="hiw-grid">
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                className={`hiw-card ${a ? 'hiw-a-card' : ''}`}
                style={{
                  animationDelay: `${0.5 + i * 0.12}s`,
                  ['--step-glow' as string]: `${step.color}30`,
                  ['--step-color' as string]: step.color,
                }}
              >
                <span className="hiw-card-emoji">{step.emoji}</span>
                <div className="hiw-card-content">
                  <h3 className="hiw-card-title">{step.title}</h3>
                  <p className="hiw-card-desc">{step.description}</p>
                </div>
                <span className="hiw-card-num" style={{ color: step.color }}>
                  {step.number}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hiw-cta-area">
          <button className={`hiw-btn ${a ? 'hiw-a-up' : ''}`} style={{ animationDelay: '1.1s' }} onClick={() => scrollTo('contacto')}>
            Empezar ahora
            <svg className="hiw-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className={`hiw-microtrust ${a ? 'hiw-a-up' : ''}`} style={{ animationDelay: '1.25s' }}>
            Completá el formulario y te contactamos a la brevedad
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksScreen;