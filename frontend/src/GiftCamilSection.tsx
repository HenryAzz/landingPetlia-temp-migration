import { useEffect, useState, useRef, useCallback } from 'react';

const STEPS = [
  { emoji: '💝', title: 'Elegí el plan', desc: 'Seleccioná el vínculo ideal para esa persona' },
  { emoji: '📝', title: 'Contanos sobre ella', desc: 'Su nombre, gustos e intereses para personalizar todo' },
  { emoji: '💌', title: 'Recibí la carta de regalo', desc: 'Una carta digital hermosa para enviarle la sorpresa' },
  { emoji: '✨', title: 'Nosotros hacemos el resto', desc: 'Nos contactamos con cariño y empezamos la experiencia' },
];

const OCCASIONS = ['🎂 Cumpleaños', '💐 Día de la Madre', '🎄 Navidad', '💛 Sin motivo especial', '🏠 Vive solo/a'];

const GiftCamilSection = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const cardTiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, go: 0 });
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, go: 0 });

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
    const f = 0.06;
    const c = current.current;
    const t = target.current;

    c.rx = lerp(c.rx, t.rx, f);
    c.ry = lerp(c.ry, t.ry, f);
    c.gx = lerp(c.gx, t.gx, f);
    c.gy = lerp(c.gy, t.gy, f);
    c.go = lerp(c.go, t.go, f);

    const s = isHoveringRef.current ? 1.012 : 1;

    if (cardTiltRef.current) {
      cardTiltRef.current.style.transform =
        `perspective(1200px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(${s},${s},1)`;
    }

    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(ellipse at ${c.gx}% ${c.gy}%, rgba(249,221,163,${c.go * 0.08}) 0%, rgba(255,255,255,${c.go * 0.025}) 40%, transparent 70%)`;
    }

    const d = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry) + Math.abs(c.go - t.go);
    if (d > 0.01 || isHoveringRef.current) {
      rafRef.current = requestAnimationFrame(animateLoop);
    } else {
      if (cardTiltRef.current) {
        cardTiltRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      }
      if (glareRef.current) {
        glareRef.current.style.background = 'transparent';
      }
      rafRef.current = null;
    }
  }, []);

  const kick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animateLoop);
  }, [animateLoop]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardWrapperRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const max = 6;

    target.current.rx = ((y - cy) / cy) * -max;
    target.current.ry = ((x - cx) / cx) * max;
    target.current.gx = (x / r.width) * 100;
    target.current.gy = (y / r.height) * 100;
    target.current.go = 1;
    kick();
  }, [kick]);

  const onEnter = useCallback(() => {
    isHoveringRef.current = true;
    kick();
  }, [kick]);

  const onLeave = useCallback(() => {
    isHoveringRef.current = false;
    target.current = { rx: 0, ry: 0, gx: 50, gy: 50, go: 0 };
    kick();
  }, [kick]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="regalar" className="gc-section">
      <style>{`
        .gc-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: clamp(80px, 10vw, 140px) 0;
        }

        .gc-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gc-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        .gc-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          opacity: 0;
        }
        .gc-orb-1 {
          width: clamp(200px, 30vw, 500px);
          height: clamp(200px, 30vw, 500px);
          background: radial-gradient(circle, rgba(249,221,163,0.08) 0%, transparent 70%);
          top: -10%;
          right: -5%;
        }
        .gc-orb-2 {
          width: clamp(160px, 22vw, 380px);
          height: clamp(160px, 22vw, 380px);
          background: radial-gradient(circle, rgba(246,158,130,0.06) 0%, transparent 70%);
          bottom: -5%;
          left: -3%;
        }

        .gc-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 80px);
        }

        .gc-header {
          text-align: center;
          margin-bottom: clamp(48px, 5vw, 72px);
        }

        .gc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 100px;
          background: rgba(249,221,163,0.08);
          border: 1px solid rgba(249,221,163,0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(11px, 0.95vw, 13px);
          letter-spacing: 0.2em;
          color: #F9DDA3;
          text-transform: uppercase;
          margin-bottom: clamp(20px, 2vw, 28px);
          opacity: 0;
        }
        .gc-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F9DDA3;
          animation: gcPulse 2s ease-in-out infinite;
        }
        @keyframes gcPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .gc-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.25;
          color: #FFF;
          letter-spacing: -0.03em;
          margin: 0 0 clamp(18px, 1.8vw, 26px);
          opacity: 0;
        }
        .gc-title-em {
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.88);
        }
        .gc-title-gold {
          color: #F9DDA3;
        }

        .gc-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(16px, 1.35vw, 20px);
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          max-width: 600px;
          margin: 0 auto clamp(26px, 2.8vw, 38px);
          opacity: 0;
        }

        .gc-occasions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 11px;
        }
        .gc-pill {
          padding: 9px 22px;
          border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 15px);
          color: rgba(255,255,255,0.7);
          white-space: nowrap;
          transition: all 0.3s ease;
          opacity: 0;
          cursor: default;
        }
        .gc-pill:hover {
          background: rgba(249,221,163,0.08);
          border-color: rgba(249,221,163,0.2);
          color: rgba(255,255,255,0.9);
        }

        .gc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 64px);
          align-items: start;
        }

        .gc-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          opacity: 0;
        }

        .gc-timeline-header {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(18px, 1.5vw, 24px);
          color: #FFF;
          margin-bottom: clamp(30px, 2.8vw, 44px);
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .gc-timeline-header::before {
          content: '';
          width: 34px;
          height: 2px;
          background: linear-gradient(90deg, #F9DDA3, transparent);
          border-radius: 2px;
        }

        .gc-step {
          display: flex;
          gap: clamp(18px, 1.7vw, 26px);
          position: relative;
          padding-bottom: clamp(26px, 2.5vw, 40px);
        }
        .gc-step:last-child {
          padding-bottom: 0;
        }

        .gc-step-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .gc-step-num {
          width: clamp(50px, 4vw, 62px);
          height: clamp(50px, 4vw, 62px);
          border-radius: clamp(13px, 1.1vw, 17px);
          background: linear-gradient(135deg, rgba(249,221,163,0.12), rgba(249,221,163,0.04));
          border: 1px solid rgba(249,221,163,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(22px, 1.8vw, 28px);
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        .gc-step:hover .gc-step-num {
          background: linear-gradient(135deg, rgba(249,221,163,0.2), rgba(249,221,163,0.08));
          border-color: rgba(249,221,163,0.3);
          transform: scale(1.05);
        }

        .gc-step-line {
          width: 1px;
          flex: 1;
          min-height: 20px;
          background: linear-gradient(180deg, rgba(249,221,163,0.2), rgba(249,221,163,0.04));
          margin-top: 6px;
        }

        .gc-step-body {
          padding-top: clamp(8px, 0.7vw, 12px);
          min-width: 0;
        }

        .gc-step-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(16px, 1.25vw, 20px);
          color: rgba(255,255,255,0.92);
          margin-bottom: clamp(5px, 0.4vw, 7px);
          transition: color 0.3s ease;
        }
        .gc-step:hover .gc-step-title {
          color: #F9DDA3;
        }

        .gc-step-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13.5px, 1.05vw, 16px);
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
        }

        /* ──── Tilt wrapper ──── */
        .gc-tilt-wrap {
          position: sticky;
          top: 100px;
        }

        .gc-tilt-inner {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .gc-tilt-glare {
          position: absolute;
          inset: 0;
          border-radius: clamp(20px, 1.8vw, 28px);
          pointer-events: none;
          z-index: 10;
        }

        .gc-tilt-shadow {
          position: absolute;
          inset: 6%;
          border-radius: clamp(20px, 1.8vw, 28px);
          background: rgba(0,0,0,0.2);
          filter: blur(24px);
          z-index: -1;
          transform: translateY(14px) scale(0.97);
          transition: all 0.5s ease;
        }
        .gc-tilt-wrap:hover .gc-tilt-shadow {
          filter: blur(32px);
          transform: translateY(22px) scale(0.94);
          opacity: 0.6;
        }

        /* ──── CTA Card ──── */
        .gc-cta-card {
          position: relative;
          padding: clamp(34px, 3.2vw, 52px);
          border-radius: clamp(20px, 1.8vw, 28px);
          background: linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.15),
            0 1px 0 rgba(255,255,255,0.05) inset;
          opacity: 0;
          overflow: visible;
          transform-style: preserve-3d;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .gc-tilt-wrap:hover .gc-cta-card {
          border-color: rgba(249,221,163,0.1);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.18),
            0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .gc-cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,221,163,0.2), transparent);
        }

        .gc-card-emoji {
          font-size: clamp(42px, 3.5vw, 58px);
          margin-bottom: clamp(18px, 1.7vw, 26px);
          display: block;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
          transform: translateZ(28px);
        }

        .gc-card-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(23px, 2.1vw, 32px);
          color: #FFF;
          line-height: 1.25;
          margin-bottom: clamp(10px, 1vw, 16px);
          letter-spacing: -0.02em;
          transform: translateZ(20px);
        }

        .gc-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(14.5px, 1.15vw, 17px);
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          margin-bottom: clamp(26px, 2.8vw, 40px);
          transform: translateZ(14px);
        }

        .gc-card-features {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.1vw, 16px);
          margin-bottom: clamp(30px, 2.8vw, 44px);
          transform: translateZ(10px);
        }
        .gc-card-feature {
          display: flex;
          align-items: center;
          gap: 13px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13.5px, 1.05vw, 16px);
          color: rgba(255,255,255,0.7);
        }
        .gc-card-check {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: rgba(249,221,163,0.1);
          border: 1px solid rgba(249,221,163,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gc-card-check svg {
          width: 11px;
          height: 11px;
          color: #F9DDA3;
        }

        .gc-btn-group { transform: translateZ(16px); }

        .gc-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          width: 100%;
          padding: clamp(16px, 1.4vw, 20px) 30px;
          border-radius: 14px;
          background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%);
          color: #1a1308;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(15px, 1.15vw, 18px);
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .gc-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(249,221,163,0.3);
        }
        .gc-btn:hover::before {
          opacity: 1;
        }
        .gc-btn:active {
          transform: translateY(0);
        }
        .gc-btn-arrow {
          width: 19px;
          height: 19px;
          transition: transform 0.3s ease;
        }
        .gc-btn:hover .gc-btn-arrow {
          transform: translateX(3px);
        }

        .gc-btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: clamp(13px, 1.1vw, 17px) 30px;
          border-radius: 14px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(13px, 1vw, 15px);
          cursor: pointer;
          margin-top: 13px;
          transition: all 0.3s ease;
        }
        .gc-btn-secondary:hover {
          border-color: rgba(249,221,163,0.2);
          color: rgba(255,255,255,0.85);
          background: rgba(249,221,163,0.04);
        }

        .gc-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: clamp(16px, 1.4vw, 22px);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11.5px, 0.9vw, 13px);
          color: rgba(255,255,255,0.4);
          transform: translateZ(6px);
        }
        .gc-trust svg {
          width: 13px;
          height: 13px;
          color: rgba(249,221,163,0.4);
        }

        .gc-deco {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }
        .gc-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @keyframes gcF1 {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes gcF2 {
          0%, 100% { transform: translateY(0) rotate(10deg); }
          50% { transform: translateY(-8px) rotate(16deg); }
        }
        .gc-fl-1 { animation: gcF1 5s ease-in-out infinite; }
        .gc-fl-2 { animation: gcF2 5.5s ease-in-out infinite 0.6s; }

        @keyframes gcFadeUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gcSlideUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gcPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes gcOrbIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }

        .gc-a-fu { animation: gcFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .gc-a-su { animation: gcSlideUp 0.95s cubic-bezier(0.22,1,0.36,1) both; }
        .gc-a-pop { animation: gcPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
        .gc-a-orb { animation: gcOrbIn 1.5s ease both; }

        @media (max-width: 1024px) {
          .gc-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .gc-tilt-wrap {
            position: static;
            max-width: 560px;
            margin: 0 auto;
          }
          .gc-timeline {
            max-width: 560px;
            margin: 0 auto;
          }
          .gc-deco { display: none !important; }
          .gc-title { font-size: clamp(34px, 6vw, 50px); }
          .gc-subtitle { font-size: clamp(16px, 2.2vw, 19px); }
        }

        @media (max-width: 768px) {
          .gc-section { padding: clamp(60px, 8vw, 95px) 0; }
          .gc-header { margin-bottom: 42px; }
          .gc-grid { gap: 44px; }
          .gc-cta-card { padding: 30px; }
          .gc-btn { border-radius: 12px; }
          .gc-btn-secondary { border-radius: 12px; }
          .gc-title { font-size: clamp(30px, 6.8vw, 42px); }
          .gc-subtitle { font-size: 16px; }
        }

        @media (max-width: 540px) {
          .gc-title { font-size: clamp(27px, 6.5vw, 34px); }
          .gc-subtitle { font-size: 15.5px; }
          .gc-pill { padding: 7px 17px; font-size: 13px; }
          .gc-cta-card { padding: 26px; border-radius: 20px; }
          .gc-step-num { width: 44px; height: 44px; font-size: 20px; border-radius: 12px; }
          .gc-timeline-header { font-size: 17px; }
          .gc-step-title { font-size: 15.5px; }
          .gc-step-desc { font-size: 13.5px; }
        }

        @media (max-width: 400px) {
          .gc-section { padding: 50px 0; }
          .gc-badge { font-size: 10px; padding: 7px 17px; }
          .gc-title { font-size: 25px; }
          .gc-subtitle { font-size: 14.5px; }
          .gc-pill { padding: 6px 15px; font-size: 12px; }
          .gc-cta-card { padding: 22px; border-radius: 18px; }
          .gc-card-emoji { font-size: 36px; }
          .gc-card-title { font-size: 21px; }
          .gc-card-desc { font-size: 14px; }
          .gc-btn { padding: 14px 26px; font-size: 14.5px; }
          .gc-btn-secondary { padding: 12px 22px; font-size: 13px; }
          .gc-step-num { width: 40px; height: 40px; font-size: 18px; border-radius: 11px; }
          .gc-step-title { font-size: 14.5px; }
          .gc-step-desc { font-size: 13px; }
          .gc-step { gap: 14px; }
        }

        @media (max-width: 340px) {
          .gc-section { padding: 42px 0; }
          .gc-title { font-size: 22px; }
          .gc-subtitle { font-size: 14px; }
          .gc-cta-card { padding: 20px; }
          .gc-step-num { width: 36px; height: 36px; font-size: 16px; }
        }

        @media (hover: none) {
          .gc-tilt-inner { transform: none !important; }
          .gc-tilt-glare,
          .gc-tilt-shadow { display: none !important; }
        }
      `}</style>

      <div className="gc-bg">
        <img src="/fondoliso.jpeg" alt="" />
      </div>

      <div className={`gc-orb gc-orb-1 ${a ? 'gc-a-orb' : ''}`} style={{ animationDelay: '0.3s' }} />
      <div className={`gc-orb gc-orb-2 ${a ? 'gc-a-orb' : ''}`} style={{ animationDelay: '0.5s' }} />

      <div
        className={`gc-deco ${a ? 'gc-a-pop' : ''}`}
        style={{ right: '6vw', top: '10%', width: 'clamp(30px,3.5vw,54px)', height: 'clamp(30px,3.5vw,54px)', animationDelay: '0.8s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'gc-fl-1' : ''} />
      </div>
      <div
        className={`gc-deco ${a ? 'gc-a-pop' : ''}`}
        style={{ left: '5vw', bottom: '12%', width: 'clamp(26px,3vw,48px)', height: 'clamp(26px,3vw,48px)', animationDelay: '0.95s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'gc-fl-2' : ''} />
      </div>

      <div className="gc-container">
        <div className="gc-header">
          <span className={`gc-badge ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.1s' }}>
            <span className="gc-badge-dot" />
            REGALÁ CAMIL
          </span>

          <h2 className={`gc-title ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.2s' }}>
            <span className="gc-title-em">El regalo más lindo</span>
            <br />
            que podés <span className="gc-title-gold">hacer</span>
          </h2>

          <p className={`gc-subtitle ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.35s' }}>
            Regalale compañía genuina a alguien que querés.
            Vos solo elegís, contás y sorprendés — nosotros hacemos todo lo demás.
          </p>

          <div className="gc-occasions">
            {OCCASIONS.map((occ, i) => (
              <span
                key={i}
                className={`gc-pill ${a ? 'gc-a-fu' : ''}`}
                style={{ animationDelay: `${0.45 + i * 0.07}s` }}
              >
                {occ}
              </span>
            ))}
          </div>
        </div>

        <div className="gc-grid">
          <div className={`gc-timeline ${a ? 'gc-a-su' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div className="gc-timeline-header">¿Cómo funciona?</div>
            {STEPS.map((s, i) => (
              <div key={i} className="gc-step">
                <div className="gc-step-left">
                  <div className="gc-step-num">{s.emoji}</div>
                  {i < STEPS.length - 1 && <div className="gc-step-line" />}
                </div>
                <div className="gc-step-body">
                  <div className="gc-step-title">{s.title}</div>
                  <div className="gc-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={cardWrapperRef}
            className="gc-tilt-wrap"
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <div className="gc-tilt-shadow" />

            <div ref={cardTiltRef} className="gc-tilt-inner">
              <div ref={glareRef} className="gc-tilt-glare" />

              <div className={`gc-cta-card ${a ? 'gc-a-su' : ''}`} style={{ animationDelay: '0.65s' }}>
                <span className="gc-card-emoji">🎁</span>
                <h3 className="gc-card-title">Sorprendé a alguien especial</h3>
                <p className="gc-card-desc">
                  Elegí un plan, contanos sobre esa persona y recibí una carta de regalo digital lista para enviar.
                </p>

                <div className="gc-card-features">
                  {[
                    'Carta de regalo digital personalizada',
                    'Experiencia adaptada a sus intereses',
                    'Sin que la persona se entere antes',
                  ].map((feat, i) => (
                    <div key={i} className="gc-card-feature">
                      <div className="gc-card-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="gc-btn-group">
                  <button className="gc-btn" onClick={() => scrollTo('contacto')}>
                    Quiero regalar Camil
                    <svg className="gc-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button className="gc-btn-secondary" onClick={() => scrollTo('planes')}>
                    Ver planes disponibles
                  </button>
                </div>

                <div className="gc-trust">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  100% seguro · Proceso simple y rápido
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCamilSection;