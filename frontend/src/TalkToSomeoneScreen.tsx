// TalkToSomeoneScreen.tsx
import { useEffect, useState, useRef } from 'react';

const FEATURES = [
  { emoji: '💬', title: 'Mensajes diarios', desc: 'Atención genuina pensada solo para vos' },
  { emoji: '✉️', title: 'Cartas personalizadas', desc: 'Escritas con dedicación y cariño real' },
  { emoji: '📞', title: 'Llamadas', desc: 'Una voz cálida cuando más lo necesitás' },
  { emoji: '🎥', title: 'Citas virtuales', desc: 'Encuentros amenos, desde donde estés' },
];

const TalkToSomeoneScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="que-es" className="tts-section">
      <style>{`
        .tts-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #FEFEFE 0%, #F9F9F9 100%);
        }

        .tts-wave {
          position: relative;
          width: 100%;
          pointer-events: none;
          z-index: 2;
          line-height: 0;
          margin-bottom: -1px;
        }
        .tts-wave svg {
          width: 100%;
          height: clamp(45px, 5.5vw, 75px);
          display: block;
        }

        .tts-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(40px, 6vw, 80px) clamp(24px, 4vw, 60px) clamp(60px, 8vw, 100px);
        }

        .tts-row {
          display: flex;
          align-items: center;
          gap: clamp(40px, 5vw, 80px);
        }

        .tts-col-left {
          flex: 1.15;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .tts-col-right {
          flex: 0.85;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .tts-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: 14px;
          opacity: 0;
        }

        .tts-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #F69E82;
          text-transform: uppercase;
          margin-bottom: 14px;
          opacity: 0;
        }

        .tts-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 2.8vw, 42px);
          line-height: 1.18;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 18px;
          opacity: 0;
        }

        .tts-title-light {
          font-weight: 400;
          color: #555;
        }

        .tts-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          border-radius: 50px;
          background: rgba(246,158,130,0.06);
          border: 1px solid rgba(246,158,130,0.12);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #8B6355;
          letter-spacing: 0.015em;
          margin-bottom: 28px;
          align-self: flex-start;
          opacity: 0;
        }

        .tts-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4CAF50;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(76,175,80,0.15), 0 0 8px rgba(76,175,80,0.3);
          animation: ttsPulse 2.5s ease-in-out infinite;
        }

        @keyframes ttsPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.15), 0 0 8px rgba(76,175,80,0.3); }
          50% { box-shadow: 0 0 0 4px rgba(76,175,80,0.1), 0 0 14px rgba(76,175,80,0.2); }
        }

        .tts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          margin-bottom: 32px;
        }

        .tts-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          border-radius: 16px;
          background: rgba(0,0,0,0.018);
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          opacity: 0;
        }

        .tts-card:hover {
          background: rgba(246,158,130,0.05);
          border-color: rgba(246,158,130,0.14);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(246,158,130,0.08);
        }

        .tts-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(246,158,130,0.1), rgba(249,221,163,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .tts-card-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .tts-card-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #2D2D2D;
          letter-spacing: 0.01em;
        }

        .tts-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          color: #999;
          line-height: 1.45;
          letter-spacing: 0.01em;
        }

        .tts-action {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .tts-btn {
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

        .tts-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tts-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(246,158,130,0.35), 0 2px 8px rgba(0,0,0,0.06);
        }

        .tts-btn:hover::before { opacity: 1; }

        .tts-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(246,158,130,0.2);
        }

        .tts-btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .tts-btn:hover .tts-btn-arrow {
          transform: translateX(3px);
        }

        .tts-trust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #BBBBBB;
          letter-spacing: 0.03em;
          opacity: 0;
        }

        .tts-phone-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tts-glow {
          position: absolute;
          width: 140%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(246,158,130,0.06) 0%, rgba(249,221,163,0.03) 35%, transparent 65%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        .tts-phone {
          position: relative;
          z-index: 2;
          width: clamp(200px, 20vw, 360px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1));
          opacity: 0;
        }

        .tts-deco {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
        }

        .tts-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .tts-deco-size {
          width: clamp(38px, 4.5vw, 75px);
          height: clamp(38px, 4.5vw, 75px);
        }

        .tts-d1 { left: -18%; bottom: 12%; }
        .tts-d2 { left: -24%; top: 8%; }
        .tts-d3 { right: -18%; bottom: 12%; }
        .tts-d4 { right: -24%; top: 8%; }

        @keyframes ttsFloat1 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          25% { transform: translateY(-9px) scale(1.04) rotate(1.5deg); }
          50% { transform: translateY(-15px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.03) rotate(0.5deg); }
        }
        @keyframes ttsFloat2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-6px) rotate(-2.5deg); }
          70% { transform: translateY(-13px) rotate(1.5deg); }
        }
        @keyframes ttsFloat3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-8px) rotate(1.5deg); }
          60% { transform: translateY(-12px) rotate(-1.5deg); }
          85% { transform: translateY(-4px) rotate(0.8deg); }
        }
        @keyframes ttsFloat4 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          20% { transform: translateY(-6px) scale(1.02) rotate(-1deg); }
          50% { transform: translateY(-13px) scale(1.05) rotate(1.5deg); }
          80% { transform: translateY(-5px) scale(1.01) rotate(-0.5deg); }
        }

        .tts-fl-1 { animation: ttsFloat1 3.4s ease-in-out infinite; }
        .tts-fl-2 { animation: ttsFloat2 4s ease-in-out infinite 0.6s; }
        .tts-fl-3 { animation: ttsFloat3 3.8s ease-in-out infinite 1.1s; }
        .tts-fl-4 { animation: ttsFloat4 3.6s ease-in-out infinite 0.4s; }

        @keyframes ttsUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ttsScale {
          0% { opacity: 0; transform: scale(0.88) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ttsPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes ttsCardIn {
          0% { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tts-anim-up { animation: ttsUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .tts-anim-scale { animation: ttsScale 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .tts-anim-pop { animation: ttsPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .tts-anim-card { animation: ttsCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }

        @media (max-width: 1024px) {
          .tts-row {
            flex-direction: column;
            gap: 50px;
          }
          .tts-col-left {
            align-items: center;
            text-align: center;
          }
          .tts-badge { align-self: center; }
          .tts-action { align-items: center; }
          .tts-grid { max-width: 480px; }
          .tts-card { text-align: left; }
          .tts-phone { width: clamp(200px, 30vw, 280px); }
          .tts-deco-size { width: 50px; height: 50px; }
        }

        @media (max-width: 768px) {
          .tts-container {
            padding: clamp(30px, 5vw, 50px) 24px clamp(50px, 7vw, 70px);
          }
          .tts-row { gap: 40px; }
          .tts-title { font-size: clamp(24px, 5.5vw, 30px); margin-bottom: 14px; }
          .tts-badge { font-size: 12px; padding: 7px 16px; gap: 8px; margin-bottom: 22px; }
          .tts-grid { gap: 10px; margin-bottom: 26px; }
          .tts-card { padding: 14px; gap: 12px; }
          .tts-card-icon { width: 36px; height: 36px; border-radius: 10px; font-size: 16px; }
          .tts-card-name { font-size: 13px; }
          .tts-card-desc { font-size: 11.5px; }
          .tts-btn { padding: 13px 28px; font-size: 14px; }
          .tts-phone { width: clamp(180px, 45vw, 240px); }
          .tts-deco-size { width: 42px; height: 42px; }
          .tts-d1 { left: -12%; bottom: 10%; }
          .tts-d2 { left: -16%; top: 6%; }
          .tts-d3 { right: -12%; bottom: 10%; }
          .tts-d4 { right: -16%; top: 6%; }
        }

        @media (max-width: 540px) {
          .tts-grid { grid-template-columns: 1fr; max-width: 360px; }
          .tts-title { font-size: clamp(22px, 5vw, 26px); }
          .tts-label { font-size: 10px; }
          .tts-phone { width: clamp(160px, 50vw, 210px); }
          .tts-deco-size { width: 36px; height: 36px; }
        }

        @media (max-width: 400px) {
          .tts-container { padding: 28px 18px 50px; }
          .tts-row { gap: 32px; }
          .tts-accent { width: 30px; margin-bottom: 10px; }
          .tts-label { margin-bottom: 10px; font-size: 9.5px; }
          .tts-title { font-size: 21px; margin-bottom: 12px; }
          .tts-badge { font-size: 11px; padding: 6px 14px; margin-bottom: 18px; }
          .tts-badge-dot { width: 7px; height: 7px; }
          .tts-grid { gap: 8px; margin-bottom: 22px; }
          .tts-card { padding: 12px; gap: 10px; border-radius: 12px; }
          .tts-card-icon { width: 32px; height: 32px; font-size: 14px; border-radius: 8px; }
          .tts-card-name { font-size: 12.5px; }
          .tts-card-desc { font-size: 11px; }
          .tts-btn { padding: 12px 24px; font-size: 13px; gap: 8px; }
          .tts-btn-arrow { width: 14px; height: 14px; }
          .tts-trust { font-size: 11px; }
          .tts-phone { width: clamp(150px, 52vw, 190px); }
          .tts-deco-size { width: 30px; height: 30px; }
          .tts-d1 { left: -10%; }
          .tts-d2 { left: -14%; }
          .tts-d3 { right: -10%; }
          .tts-d4 { right: -14%; }
        }

        @media (max-width: 340px) {
          .tts-container { padding: 24px 14px 44px; }
          .tts-row { gap: 28px; }
          .tts-title { font-size: 19px; }
          .tts-badge { font-size: 10px; padding: 5px 12px; }
          .tts-card { padding: 10px; }
          .tts-card-icon { width: 28px; height: 28px; font-size: 13px; }
          .tts-card-name { font-size: 12px; }
          .tts-card-desc { font-size: 10.5px; }
          .tts-btn { padding: 11px 20px; font-size: 12.5px; }
          .tts-phone { width: 150px; }
          .tts-deco-size { width: 26px; height: 26px; }
        }
      `}</style>

      {/* Wave */}
      <div className="tts-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      {/* Content */}
      <div className="tts-container">
        <div className="tts-row">
          <div className="tts-col-left">
            <div className={`tts-accent ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '0.15s' }} />
            <span className={`tts-label ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '0.25s' }}>QUÉ ES CAMIL</span>
            <h2 className={`tts-title ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '0.35s' }}>
              Alguien real que te escucha,<br /><span className="tts-title-light">te entiende y te acompaña</span>
            </h2>
            <div className={`tts-badge ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '0.5s' }}>
              <span className="tts-badge-dot" />Persona real · No es inteligencia artificial
            </div>
            <div className="tts-grid">
              {FEATURES.map((f, i) => (
                <div key={i} className={`tts-card ${a ? 'tts-anim-card' : ''}`} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                  <div className="tts-card-icon"><span>{f.emoji}</span></div>
                  <div className="tts-card-text">
                    <span className="tts-card-name">{f.title}</span>
                    <span className="tts-card-desc">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="tts-action">
              <button className={`tts-btn ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '1.05s' }} onClick={() => scrollTo('contacto')}>
                Empezar ahora
                <svg className="tts-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span className={`tts-trust ${a ? 'tts-anim-up' : ''}`} style={{ animationDelay: '1.2s' }}>
                Sin compromiso · Empezá cuando quieras
              </span>
            </div>
          </div>

          <div className="tts-col-right">
            <div className="tts-phone-wrap">
              <div className="tts-glow" />
              <img src="/celulargrande.png" alt="Conversación con Camil" className={`tts-phone ${a ? 'tts-anim-scale' : ''}`} style={{ animationDelay: '0.25s' }} />
              <div className={`tts-deco tts-d1 tts-deco-size ${a ? 'tts-anim-pop' : ''}`} style={{ animationDelay: '0.75s' }}>
                <img src="/corazonizquierda.png" alt="" className={mounted ? 'tts-fl-1' : ''} />
              </div>
              <div className={`tts-deco tts-d2 tts-deco-size ${a ? 'tts-anim-pop' : ''}`} style={{ animationDelay: '0.9s' }}>
                <img src="/carta.png" alt="" className={mounted ? 'tts-fl-2' : ''} />
              </div>
              <div className={`tts-deco tts-d3 tts-deco-size ${a ? 'tts-anim-pop' : ''}`} style={{ animationDelay: '1.05s' }}>
                <img src="/carta.png" alt="" className={mounted ? 'tts-fl-3' : ''} />
              </div>
              <div className={`tts-deco tts-d4 tts-deco-size ${a ? 'tts-anim-pop' : ''}`} style={{ animationDelay: '1.2s' }}>
                <img src="/corazonderecha.png" alt="" className={mounted ? 'tts-fl-4' : ''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToSomeoneScreen;