// GiftCamilSection.tsx
import { useEffect, useState, useRef, useCallback } from 'react';

const STEPS = [
  { emoji: '💝', title: 'Elegí el plan', desc: 'El vínculo ideal para esa persona' },
  { emoji: '📝', title: 'Contanos sobre ella', desc: 'Nombre, gustos e intereses' },
  { emoji: '💌', title: 'Recibí la carta', desc: 'Una carta digital para regalar' },
  { emoji: '✨', title: 'Hacemos el resto', desc: 'Nos contactamos y empezamos' },
];

const OCCASIONS = ['🎂 Cumpleaños', '💐 Día de la Madre', '🎄 Navidad', '💛 Sin motivo', '🏠 Vive solo/a'];

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
      ([entry]) => { if (entry.isIntersecting) { setHasAnimated(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateLoop = useCallback(() => {
    const f = 0.06;
    const c = current.current, t = target.current;
    c.rx = lerp(c.rx, t.rx, f); c.ry = lerp(c.ry, t.ry, f);
    c.gx = lerp(c.gx, t.gx, f); c.gy = lerp(c.gy, t.gy, f);
    c.go = lerp(c.go, t.go, f);
    const s = isHoveringRef.current ? 1.012 : 1;
    if (cardTiltRef.current) cardTiltRef.current.style.transform = `perspective(1200px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(${s},${s},1)`;
    if (glareRef.current) glareRef.current.style.background = `radial-gradient(ellipse at ${c.gx}% ${c.gy}%, rgba(249,221,163,${c.go * 0.08}) 0%, rgba(255,255,255,${c.go * 0.025}) 40%, transparent 70%)`;
    const d = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry) + Math.abs(c.go - t.go);
    if (d > 0.01 || isHoveringRef.current) { rafRef.current = requestAnimationFrame(animateLoop); }
    else { if (cardTiltRef.current) cardTiltRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'; if (glareRef.current) glareRef.current.style.background = 'transparent'; rafRef.current = null; }
  }, []);

  const kick = useCallback(() => { if (!rafRef.current) rafRef.current = requestAnimationFrame(animateLoop); }, [animateLoop]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardWrapperRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const max = 6;
    target.current.rx = ((y - r.height / 2) / (r.height / 2)) * -max;
    target.current.ry = ((x - r.width / 2) / (r.width / 2)) * max;
    target.current.gx = (x / r.width) * 100; target.current.gy = (y / r.height) * 100;
    target.current.go = 1; kick();
  }, [kick]);

  const onEnter = useCallback(() => { isHoveringRef.current = true; kick(); }, [kick]);
  const onLeave = useCallback(() => { isHoveringRef.current = false; target.current = { rx: 0, ry: 0, gx: 50, gy: 50, go: 0 }; kick(); }, [kick]);

  useEffect(() => { return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="regalar" className="gc-section">
      <style>{`
        .gc-section { position: relative; width: 100%; overflow: hidden; }
        .gc-bg { position: absolute; inset: 0; z-index: 0; display: flex; align-items: center; justify-content: center; }
        .gc-bg img { width: 140%; height: 140%; min-width: 140%; min-height: 140%; object-fit: cover; }
        .gc-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 1; opacity: 0; }
        .gc-orb-1 { width: clamp(180px, 25vw, 420px); height: clamp(180px, 25vw, 420px); background: radial-gradient(circle, rgba(249,221,163,0.07) 0%, transparent 70%); top: -8%; right: -3%; }
        .gc-orb-2 { width: clamp(140px, 20vw, 340px); height: clamp(140px, 20vw, 340px); background: radial-gradient(circle, rgba(246,158,130,0.05) 0%, transparent 70%); bottom: -4%; left: -2%; }
        .gc-deco { position: absolute; pointer-events: none; z-index: 3; opacity: 0; }
        .gc-deco img { width: 100%; height: 100%; object-fit: contain; }
        @keyframes gcF1 { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-8px) rotate(-2deg); } }
        @keyframes gcF2 { 0%, 100% { transform: translateY(0) rotate(10deg); } 50% { transform: translateY(-6px) rotate(16deg); } }
        .gc-fl-1 { animation: gcF1 5s ease-in-out infinite; }
        .gc-fl-2 { animation: gcF2 5.5s ease-in-out infinite 0.6s; }
        .gc-layout {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(48px, 7vw, 100px) clamp(24px, 4vw, 60px);
        }
        .gc-left { width: 46%; display: flex; align-items: center; flex-shrink: 0; }
        .gc-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          padding-right: 3vw;
          gap: 0;
        }
        .gc-right {
          width: 54%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: clamp(30px, 3vw, 50px) 0 clamp(30px, 3vw, 50px) clamp(24px, 3vw, 50px);
          gap: clamp(18px, 1.6vw, 26px);
        }
        .gc-accent { width: 38px; height: 2.5px; border-radius: 2px; background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.2)); margin-bottom: 14px; opacity: 0; }
        .gc-label { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.22em; color: rgba(255,255,255,0.55); text-transform: uppercase; margin-bottom: 14px; opacity: 0; }
        .gc-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(28px, 2.8vw, 42px); line-height: 1.25; color: #FFFFFF; letter-spacing: -0.02em; margin: 0 0 clamp(14px, 1.4vw, 20px); text-shadow: 0 2px 16px rgba(0,0,0,0.15); opacity: 0; }
        .gc-title-light { font-weight: 400; font-style: italic; color: rgba(255,255,255,0.88); }
        .gc-title-gold { color: #F9DDA3; }
        .gc-sub { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(15px, 1.15vw, 17px); color: rgba(255,255,255,0.65); line-height: 1.75; margin: 0 0 clamp(14px, 1.4vw, 20px); max-width: 440px; letter-spacing: 0.015em; opacity: 0; }
        .gc-occasions { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: clamp(20px, 2vw, 28px); }
        .gc-pill { padding: 5px 14px; border-radius: 50px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(11px, 0.85vw, 13px); color: rgba(255,255,255,0.55); white-space: nowrap; transition: all 0.3s ease; cursor: default; opacity: 0; }
        .gc-pill:hover { background: rgba(249,221,163,0.06); border-color: rgba(249,221,163,0.15); color: rgba(255,255,255,0.8); }
        .gc-steps-header { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(14px, 1.1vw, 17px); color: rgba(255,255,255,0.85); margin-bottom: clamp(12px, 1vw, 16px); display: flex; align-items: center; gap: 12px; opacity: 0; }
        .gc-steps-header::before { content: ''; width: 28px; height: 2px; background: linear-gradient(90deg, #F9DDA3, transparent); border-radius: 2px; }
        .gc-steps { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(8px, 0.7vw, 12px); width: 100%; }
        .gc-step { display: flex; align-items: center; gap: clamp(10px, 0.9vw, 14px); padding: clamp(10px, 0.9vw, 14px) clamp(11px, 1vw, 15px); border-radius: clamp(10px, 0.9vw, 14px); background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s ease; cursor: default; opacity: 0; }
        .gc-step:hover { background: rgba(249,221,163,0.05); border-color: rgba(249,221,163,0.12); transform: translateY(-2px); }
        .gc-step-emoji { font-size: clamp(20px, 1.7vw, 26px); line-height: 1; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: clamp(28px, 2.2vw, 34px); text-align: center; }
        .gc-step-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .gc-step-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(12px, 0.92vw, 14px); color: rgba(255,255,255,0.88); line-height: 1.25; }
        .gc-step-desc { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(10.5px, 0.78vw, 12px); color: rgba(255,255,255,0.5); line-height: 1.4; }
        .gc-action { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .gc-btn { display: inline-flex; align-items: center; gap: 11px; padding: clamp(13px, 1vw, 17px) clamp(28px, 2.2vw, 38px); border-radius: 50px; background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%); color: #2a1f0e; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(14px, 1.05vw, 17px); letter-spacing: 0.03em; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(249,221,163,0.2), 0 1px 3px rgba(0,0,0,0.1); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; opacity: 0; }
        .gc-btn::before { content: ''; position: absolute; inset: 0; border-radius: 50px; background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s ease; }
        .gc-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(249,221,163,0.3), 0 2px 8px rgba(0,0,0,0.1); }
        .gc-btn:hover::before { opacity: 1; }
        .gc-btn:active { transform: translateY(0); }
        .gc-btn-arrow { width: 16px; height: 16px; transition: transform 0.3s ease; }
        .gc-btn:hover .gc-btn-arrow { transform: translateX(3px); }
        .gc-microtrust { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(11px, 0.85vw, 13px); color: rgba(255,255,255,0.35); letter-spacing: 0.03em; opacity: 0; }
        .gc-tilt-wrap { position: relative; width: 100%; max-width: clamp(360px, 28vw, 480px); }
        .gc-tilt-inner { position: relative; transform-style: preserve-3d; will-change: transform; }
        .gc-tilt-glare { position: absolute; inset: 0; border-radius: clamp(18px, 1.5vw, 24px); pointer-events: none; z-index: 10; }
        .gc-tilt-shadow { position: absolute; inset: 6%; border-radius: clamp(18px, 1.5vw, 24px); background: rgba(0,0,0,0.2); filter: blur(24px); z-index: -1; transform: translateY(12px) scale(0.97); transition: all 0.5s ease; }
        .gc-tilt-wrap:hover .gc-tilt-shadow { filter: blur(32px); transform: translateY(20px) scale(0.94); opacity: 0.6; }
        .gc-card { position: relative; padding: clamp(24px, 2.2vw, 36px); border-radius: clamp(18px, 1.5vw, 24px); background: linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); box-shadow: 0 20px 56px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.05) inset; opacity: 0; overflow: hidden; transform-style: preserve-3d; transition: border-color 0.5s ease, box-shadow 0.5s ease; }
        .gc-tilt-wrap:hover .gc-card { border-color: rgba(249,221,163,0.1); }
        .gc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(249,221,163,0.2), transparent); }
        .gc-card-emoji { font-size: clamp(34px, 2.8vw, 46px); margin-bottom: clamp(12px, 1.2vw, 18px); display: block; filter: drop-shadow(0 3px 10px rgba(0,0,0,0.2)); transform: translateZ(28px); }
        .gc-card-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(19px, 1.7vw, 26px); color: #FFF; line-height: 1.25; margin-bottom: clamp(8px, 0.7vw, 12px); letter-spacing: -0.02em; transform: translateZ(20px); }
        .gc-card-desc { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(13px, 1vw, 15px); color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: clamp(16px, 1.5vw, 24px); transform: translateZ(14px); }
        .gc-card-features { display: flex; flex-direction: column; gap: clamp(8px, 0.7vw, 12px); margin-bottom: clamp(18px, 1.6vw, 26px); transform: translateZ(10px); }
        .gc-card-feature { display: flex; align-items: center; gap: 11px; font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(12px, 0.9vw, 14px); color: rgba(255,255,255,0.65); }
        .gc-card-check { width: 19px; height: 19px; border-radius: 50%; background: rgba(249,221,163,0.1); border: 1px solid rgba(249,221,163,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gc-card-check svg { width: 10px; height: 10px; color: #F9DDA3; }
        .gc-card-trust { display: flex; align-items: center; gap: 7px; font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(10.5px, 0.8vw, 12px); color: rgba(255,255,255,0.35); transform: translateZ(6px); }
        .gc-card-trust svg { width: 12px; height: 12px; color: rgba(249,221,163,0.4); }
        @keyframes gcFadeUp { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes gcSlideUp { 0% { opacity: 0; transform: translateY(36px) scale(0.97); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes gcCardIn { 0% { opacity: 0; transform: translateX(40px) scale(0.95); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes gcPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes gcOrbIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
        .gc-a-fu { animation: gcFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .gc-a-su { animation: gcSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .gc-a-ci { animation: gcCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .gc-a-pop { animation: gcPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .gc-a-orb { animation: gcOrbIn 1.5s ease both; }
        @media (max-width: 1024px) {
          .gc-layout { flex-direction: column; padding: 70px clamp(24px, 5vw, 60px) 60px; }
          .gc-left { width: 100%; }
          .gc-left-inner { padding: 0; align-items: center; text-align: center; margin-bottom: 46px; }
          .gc-sub { max-width: 500px; }
          .gc-occasions { justify-content: center; }
          .gc-steps { max-width: 480px; }
          .gc-step { text-align: left; }
          .gc-steps-header { justify-content: center; }
          .gc-right { width: 100%; padding: 0; }
          .gc-tilt-wrap { max-width: 520px; margin: 0 auto; }
          .gc-deco { display: none !important; }
          .gc-a-ci { animation-name: gcSlideUp; }
        }
        @media (max-width: 768px) {
          .gc-layout { padding: 56px 24px 50px; }
          .gc-left-inner { margin-bottom: 38px; }
          .gc-right { gap: 16px; }
          .gc-title { font-size: clamp(24px, 5.5vw, 30px); }
          .gc-sub { font-size: 15px; }
          .gc-steps { gap: 8px; }
          .gc-step { padding: 10px 12px; gap: 9px; }
          .gc-step-emoji { font-size: 18px; width: 24px; }
          .gc-step-title { font-size: 12.5px; }
          .gc-step-desc { font-size: 11px; }
          .gc-card { padding: 24px; }
          .gc-btn { padding: 13px 28px; font-size: 14px; }
        }
        @media (max-width: 540px) {
          .gc-layout { padding: 50px 20px 44px; }
          .gc-left-inner { margin-bottom: 32px; }
          .gc-right { gap: 14px; }
          .gc-title { font-size: clamp(22px, 5vw, 26px); }
          .gc-label { font-size: 10px; }
          .gc-sub { font-size: 14.5px; }
          .gc-pill { padding: 4px 11px; font-size: 11px; }
          .gc-steps-header { font-size: 14px; }
          .gc-step-emoji { font-size: 17px; width: 22px; }
          .gc-card { padding: 22px; border-radius: 18px; }
          .gc-card-emoji { font-size: 30px; }
          .gc-card-title { font-size: 18px; }
          .gc-card-desc { font-size: 13px; }
          .gc-card-feature { font-size: 12px; }
        }
        @media (max-width: 400px) {
          .gc-layout { padding: 44px 18px 40px; }
          .gc-left-inner { margin-bottom: 28px; }
          .gc-right { gap: 12px; }
          .gc-accent { width: 30px; margin-bottom: 10px; }
          .gc-label { font-size: 9.5px; margin-bottom: 10px; }
          .gc-title { font-size: 21px; }
          .gc-sub { font-size: 13.5px; }
          .gc-pill { padding: 4px 10px; font-size: 10.5px; }
          .gc-steps { gap: 7px; }
          .gc-step { padding: 9px 11px; gap: 8px; border-radius: 10px; }
          .gc-step-emoji { font-size: 15px; width: 20px; }
          .gc-step-title { font-size: 12px; }
          .gc-step-desc { font-size: 10.5px; }
          .gc-steps-header { font-size: 13.5px; }
          .gc-card { padding: 20px; border-radius: 16px; }
          .gc-card-emoji { font-size: 28px; margin-bottom: 10px; }
          .gc-card-title { font-size: 17px; }
          .gc-card-desc { font-size: 12.5px; }
          .gc-card-feature { font-size: 11.5px; gap: 9px; }
          .gc-card-check { width: 17px; height: 17px; }
          .gc-btn { padding: 12px 24px; font-size: 13.5px; gap: 9px; }
          .gc-btn-arrow { width: 14px; height: 14px; }
          .gc-microtrust { font-size: 11px; }
        }
        @media (max-width: 340px) {
          .gc-layout { padding: 38px 14px 36px; }
          .gc-title { font-size: 19px; }
          .gc-sub { font-size: 13px; }
          .gc-step { padding: 8px 10px; }
          .gc-step-emoji { font-size: 14px; width: 18px; }
          .gc-step-title { font-size: 11.5px; }
          .gc-step-desc { font-size: 10px; }
          .gc-card { padding: 18px; }
          .gc-card-title { font-size: 16px; }
          .gc-card-desc { font-size: 12px; }
          .gc-btn { padding: 11px 20px; font-size: 13px; }
        }
        @media (hover: none) {
          .gc-tilt-inner { transform: none !important; }
          .gc-tilt-glare, .gc-tilt-shadow { display: none !important; }
        }
      `}</style>

      <div className="gc-bg"><img src="/fondoliso.jpeg" alt="" /></div>
      <div className={`gc-orb gc-orb-1 ${a ? 'gc-a-orb' : ''}`} style={{ animationDelay: '0.3s' }} />
      <div className={`gc-orb gc-orb-2 ${a ? 'gc-a-orb' : ''}`} style={{ animationDelay: '0.5s' }} />

      <div className={`gc-deco ${a ? 'gc-a-pop' : ''}`} style={{ right: '6vw', top: '12%', width: 'clamp(28px,3.2vw,48px)', height: 'clamp(28px,3.2vw,48px)', animationDelay: '0.8s' }}>
        <img src="/corazonderecha.png" alt="" className={mounted ? 'gc-fl-1' : ''} />
      </div>
      <div className={`gc-deco ${a ? 'gc-a-pop' : ''}`} style={{ left: '5vw', bottom: '14%', width: 'clamp(24px,2.8vw,42px)', height: 'clamp(24px,2.8vw,42px)', animationDelay: '0.95s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'gc-fl-2' : ''} />
      </div>

      <div className="gc-layout">
        <div className="gc-left">
          <div className="gc-left-inner">
            <div className={`gc-accent ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.1s' }} />
            <span className={`gc-label ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.18s' }}>REGALÁ CAMIL</span>
            <h2 className={`gc-title ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.26s' }}>
              <span className="gc-title-light">El regalo más lindo</span><br />que podés <span className="gc-title-gold">hacer</span>
            </h2>
            <p className={`gc-sub ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.38s' }}>
              Regalale compañía genuina a alguien que querés. Vos solo elegís, contás y sorprendés — nosotros hacemos todo lo demás.
            </p>
            <div className="gc-occasions">
              {OCCASIONS.map((occ, i) => (
                <span key={i} className={`gc-pill ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: `${0.44 + i * 0.06}s` }}>{occ}</span>
              ))}
            </div>
            <div className={`gc-steps-header ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.55s' }}>¿Cómo funciona?</div>
            <div className="gc-steps">
              {STEPS.map((s, i) => (
                <div key={i} className={`gc-step ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
                  <div className="gc-step-emoji">{s.emoji}</div>
                  <div className="gc-step-info">
                    <div className="gc-step-title">{s.title}</div>
                    <div className="gc-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gc-right">
          <div ref={cardWrapperRef} className="gc-tilt-wrap" onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="gc-tilt-shadow" />
            <div ref={cardTiltRef} className="gc-tilt-inner">
              <div ref={glareRef} className="gc-tilt-glare" />
              <div className={`gc-card ${a ? 'gc-a-ci' : ''}`} style={{ animationDelay: '0.5s' }}>
                <span className="gc-card-emoji">🎁</span>
                <h3 className="gc-card-title">Sorprendé a alguien especial</h3>
                <p className="gc-card-desc">Elegí un plan, contanos sobre esa persona y recibí una carta de regalo digital lista para enviar.</p>
                <div className="gc-card-features">
                  {['Carta de regalo digital personalizada', 'Experiencia adaptada a sus intereses', 'Sin que la persona se entere antes'].map((feat, i) => (
                    <div key={i} className="gc-card-feature">
                      <div className="gc-card-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>
                <div className="gc-card-trust">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  100% seguro · Proceso simple y rápido
                </div>
              </div>
            </div>
          </div>

          <div className="gc-action">
            <button className={`gc-btn ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '0.9s' }} onClick={() => scrollTo('contacto')}>
              Quiero regalar Camil
              <svg className="gc-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <span className={`gc-microtrust ${a ? 'gc-a-fu' : ''}`} style={{ animationDelay: '1s' }}>Pago seguro · Sin compromiso</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCamilSection;