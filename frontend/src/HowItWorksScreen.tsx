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
  const rafs = useRef<(number | null)[]>([null, null, null, null]);
  const hovers = useRef<boolean[]>([false, false, false, false]);
  const currents = useRef(STEPS.map(() => ({ rx: 0, ry: 0 })));
  const targets = useRef(STEPS.map(() => ({ rx: 0, ry: 0 })));

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
    return () => {
      rafs.current.forEach(r => { if (r) cancelAnimationFrame(r); });
    };
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback((i: number) => {
    const c = currents.current[i];
    const t = targets.current[i];
    const f = 0.08;

    c.rx = lerp(c.rx, t.rx, f);
    c.ry = lerp(c.ry, t.ry, f);

    const el = cardRefs.current[i];
    if (el) {
      if (Math.abs(c.rx) > 0.01 || Math.abs(c.ry) > 0.01) {
        el.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) translateY(${hovers.current[i] ? '-8px' : '0'})`;
      } else {
        el.style.transform = hovers.current[i] ? 'translateY(-8px)' : '';
      }
    }

    const d = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry);
    if (d > 0.01 || hovers.current[i]) {
      rafs.current[i] = requestAnimationFrame(() => animate(i));
    } else {
      if (el) el.style.transform = '';
      rafs.current[i] = null;
    }
  }, []);

  const kick = useCallback((i: number) => {
    if (!rafs.current[i]) rafs.current[i] = requestAnimationFrame(() => animate(i));
  }, [animate]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const max = 6;

    targets.current[i].rx = ((y - cy) / cy) * -max;
    targets.current[i].ry = ((x - cx) / cx) * max;
    kick(i);
  }, [kick]);

  const onEnter = useCallback((i: number) => {
    hovers.current[i] = true;
    kick(i);
  }, [kick]);

  const onLeave = useCallback((i: number) => {
    hovers.current[i] = false;
    targets.current[i] = { rx: 0, ry: 0 };
    kick(i);
  }, [kick]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="como-funciona" className="hiw-section">
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
          height: clamp(45px, 5.5vw, 75px);
          display: block;
        }

        .hiw-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(32px, 5vw, 72px) clamp(20px, 5vw, 80px) clamp(56px, 8vw, 110px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hiw-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(40px, 5.5vw, 72px);
        }

        .hiw-accent {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(249,221,163,0.9), rgba(249,221,163,0.15));
          margin-bottom: 16px;
          opacity: 0;
        }

        .hiw-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1.1vw, 15px);
          letter-spacing: 0.2em;
          color: rgba(249,221,163,0.85);
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
        }

        .hiw-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(38px, 4.5vw, 60px);
          line-height: 1.25;
          color: #FFFFFF;
          letter-spacing: -0.025em;
          margin: 0 0 18px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.25);
          opacity: 0;
        }

        .hiw-title-light {
          font-weight: 400;
          color: rgba(255,255,255,0.88);
        }

        .hiw-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(17px, 1.35vw, 20px);
          color: rgba(255,255,255,0.7);
          margin: 0;
          max-width: 520px;
          line-height: 1.75;
          letter-spacing: 0.015em;
          opacity: 0;
        }

        .hiw-steps-wrap {
          width: 100%;
          position: relative;
          margin-bottom: clamp(40px, 5.5vw, 64px);
        }

        .hiw-connector {
          position: absolute;
          top: clamp(42px, 3.2vw, 52px);
          left: calc(12.5% + clamp(19px, 1.4vw, 24px));
          right: calc(12.5% + clamp(19px, 1.4vw, 24px));
          height: 2px;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
        }

        .hiw-connector-line {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.12) 0px,
            rgba(255,255,255,0.12) 6px,
            transparent 6px,
            transparent 14px
          );
          border-radius: 1px;
        }

        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 1.4vw, 20px);
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hiw-card {
          position: relative;
          padding: clamp(26px, 2.6vw, 36px) clamp(24px, 2.2vw, 32px);
          border-radius: clamp(18px, 1.5vw, 24px);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.15),
            0 1px 0 rgba(255,255,255,0.05) inset;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 1.5vw, 22px);
          transition: box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      border-color 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      background 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
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
          background: linear-gradient(
            160deg,
            rgba(255,255,255,0.07) 0%,
            transparent 40%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .hiw-card:hover {
          box-shadow:
            0 24px 64px rgba(0,0,0,0.3),
            0 1px 0 rgba(255,255,255,0.1) inset;
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
        }

        .hiw-card:hover::before { opacity: 1; }

        .hiw-card-number {
          width: clamp(50px, 3.5vw, 58px);
          height: clamp(50px, 3.5vw, 58px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(16px, 1.15vw, 19px);
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .hiw-card:hover .hiw-card-number {
          box-shadow: 0 0 24px var(--step-glow);
          transform: scale(1.08);
        }

        .hiw-card-emoji {
          display: inline-flex;
          align-items: center;
          gap: 0;
          font-size: clamp(26px, 2vw, 32px);
          margin-top: 2px;
        }

        .hiw-card-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #FFFFFF;
          font-size: clamp(18px, 1.45vw, 23px);
          line-height: 1.35;
          margin: 0;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        .hiw-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
          font-size: clamp(14.5px, 1.15vw, 17px);
          line-height: 1.75;
          margin: 0;
          letter-spacing: 0.015em;
        }

        .hiw-card-accent {
          margin-top: auto;
          padding-top: clamp(12px, 1.2vw, 18px);
        }

        .hiw-card-accent-bar {
          width: clamp(36px, 3.5vw, 56px);
          height: 2.5px;
          border-radius: 2px;
          opacity: 0.4;
          transition: all 0.4s ease;
        }

        .hiw-card:hover .hiw-card-accent-bar {
          opacity: 0.7;
          width: clamp(48px, 5vw, 76px);
        }

        .hiw-cta-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hiw-btn {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 17px 40px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%);
          color: #2a1f0e;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(16px, 1.2vw, 18px);
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
        .hiw-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(249,221,163,0.2);
        }

        .hiw-btn-arrow {
          width: 18px; height: 18px;
          transition: transform 0.3s ease;
        }
        .hiw-btn:hover .hiw-btn-arrow { transform: translateX(3px); }

        .hiw-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13.5px, 1.05vw, 15px);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.03em;
          text-align: center;
          line-height: 1.6;
          opacity: 0;
        }

        .hiw-deco {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }
        .hiw-deco img { width: 100%; height: 100%; object-fit: contain; }

        @keyframes hiwF1 {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-7px) rotate(-4deg); }
        }
        @keyframes hiwF2 {
          0%, 100% { transform: translateY(0) rotate(10deg); }
          50% { transform: translateY(-6px) rotate(14deg); }
        }
        @keyframes hiwF3 {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-8px) rotate(9deg); }
        }
        @keyframes hiwF4 {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-5px) rotate(-8deg); }
        }

        .hiw-f1 { animation: hiwF1 4.2s ease-in-out infinite; }
        .hiw-f2 { animation: hiwF2 4.6s ease-in-out infinite 0.5s; }
        .hiw-f3 { animation: hiwF3 3.9s ease-in-out infinite 1s; }
        .hiw-f4 { animation: hiwF4 4.4s ease-in-out infinite 0.8s; }

        @keyframes hiwUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hiwDown {
          0% { opacity: 0; transform: translateY(-24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hiwCardIn {
          0% { opacity: 0; transform: translateY(36px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hiwPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes hiwLineIn {
          0% { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }

        .hiw-a-up { animation: hiwUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-down { animation: hiwDown 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-card { animation: hiwCardIn 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .hiw-a-pop { animation: hiwPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .hiw-a-line { animation: hiwLineIn 1s cubic-bezier(0.22,1,0.36,1) both; transform-origin: left center; }

        @media (max-width: 1024px) {
          .hiw-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
            max-width: 620px;
          }
          .hiw-connector { display: none; }
          .hiw-deco { display: none; }
          .hiw-title { font-size: clamp(34px, 5vw, 46px); }
          .hiw-subtitle { font-size: clamp(16px, 2vw, 19px); }
        }

        @media (max-width: 768px) {
          .hiw-container {
            padding: clamp(24px, 4vw, 44px) 24px clamp(48px, 7vw, 70px);
          }
          .hiw-header { margin-bottom: clamp(34px, 5vw, 50px); }
          .hiw-title { font-size: clamp(30px, 6.5vw, 40px); }
          .hiw-subtitle { font-size: 16px; }
          .hiw-grid { gap: 16px; }
          .hiw-card { padding: 24px 22px; gap: 14px; }
          .hiw-card-number { width: 46px; height: 46px; font-size: 15px; }
          .hiw-card-emoji { font-size: 24px; }
          .hiw-card-title { font-size: 17px; }
          .hiw-card-desc { font-size: 14.5px; }
          .hiw-btn { padding: 15px 34px; font-size: 16px; }
        }

        @media (max-width: 540px) {
          .hiw-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
          }
          .hiw-title { font-size: clamp(27px, 6vw, 34px); }
          .hiw-label { font-size: 12px; }
          .hiw-subtitle { font-size: 15.5px; }
          .hiw-card {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 0;
            padding: 22px;
          }
          .hiw-card-number {
            width: 44px; height: 44px;
            margin-right: 16px;
            margin-bottom: 14px;
          }
          .hiw-card-header-text {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding-top: 4px;
          }
          .hiw-card-desc {
            width: 100%;
            padding-left: 60px;
            margin-top: 4px;
            font-size: 14px;
          }
          .hiw-card-accent {
            width: 100%;
            padding-left: 60px;
            padding-top: 12px;
          }
        }

        @media (max-width: 400px) {
          .hiw-container { padding: 20px 18px 44px; }
          .hiw-header { margin-bottom: 28px; }
          .hiw-accent { width: 34px; }
          .hiw-label { font-size: 11.5px; margin-bottom: 16px; }
          .hiw-title { font-size: 25px; margin-bottom: 14px; }
          .hiw-subtitle { font-size: 15px; }
          .hiw-grid { gap: 14px; }
          .hiw-card { padding: 20px; border-radius: 16px; }
          .hiw-card-number { width: 40px; height: 40px; font-size: 14px; margin-right: 14px; }
          .hiw-card-emoji { font-size: 22px; }
          .hiw-card-title { font-size: 16px; }
          .hiw-card-desc { font-size: 13.5px; padding-left: 54px; }
          .hiw-card-accent { padding-left: 54px; }
          .hiw-btn { padding: 14px 28px; font-size: 15px; gap: 10px; }
          .hiw-btn-arrow { width: 16px; height: 16px; }
          .hiw-microtrust { font-size: 13px; }
        }

        @media (max-width: 340px) {
          .hiw-container { padding: 18px 14px 38px; }
          .hiw-title { font-size: 23px; }
          .hiw-subtitle { font-size: 14.5px; }
          .hiw-card { padding: 18px; }
          .hiw-card-number { width: 36px; height: 36px; font-size: 13px; margin-right: 12px; }
          .hiw-card-emoji { font-size: 20px; }
          .hiw-card-title { font-size: 15px; }
          .hiw-card-desc { font-size: 13px; padding-left: 48px; }
          .hiw-card-accent { padding-left: 48px; }
          .hiw-btn { padding: 13px 24px; font-size: 14.5px; }
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
                  animationDelay: `${0.55 + i * 0.13}s`,
                  ['--step-glow' as string]: `${step.color}50`,
                }}
                onMouseMove={e => onMove(e, i)}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={() => onLeave(i)}
              >
                <div
                  className="hiw-card-number"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                    border: `2px solid ${step.color}40`,
                    color: step.color,
                  }}
                >
                  {step.number}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="hiw-card-emoji">{step.emoji}</span>
                  <h3 className="hiw-card-title">{step.title}</h3>
                </div>

                <p className="hiw-card-desc">{step.description}</p>

                <div className="hiw-card-accent">
                  <div
                    className="hiw-card-accent-bar"
                    style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hiw-cta-area">
          <button className={`hiw-btn ${a ? 'hiw-a-up' : ''}`} style={{ animationDelay: '1.15s' }} onClick={() => scrollTo('contacto')}>
            Empezar ahora
            <svg className="hiw-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className={`hiw-microtrust ${a ? 'hiw-a-up' : ''}`} style={{ animationDelay: '1.3s' }}>
            Completá el formulario y te contactamos a la brevedad
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksScreen;