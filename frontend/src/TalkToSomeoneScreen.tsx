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
          background: linear-gradient(180deg, #FEFEFE 0%, #FAFAFA 100%);
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
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(48px, 7vw, 100px) clamp(24px, 5vw, 80px) clamp(64px, 9vw, 120px);
        }

        /* ═══ HEADER — full width ═══ */
        .tts-header {
          width: 100%;
          margin-bottom: clamp(28px, 3vw, 44px);
        }

        .tts-accent {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.18));
          margin-bottom: 16px;
          opacity: 0;
        }

        .tts-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 1vw, 13px);
          letter-spacing: 0.2em;
          color: #E8856A;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0;
        }

        .tts-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 3.6vw, 50px);
          line-height: 1.2;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
          max-width: 820px;
          opacity: 0;
        }

        .tts-title-light {
          font-weight: 400;
          color: #4A4A4A;
        }

        .tts-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 22px;
          border-radius: 50px;
          background: rgba(246,158,130,0.07);
          border: 1px solid rgba(246,158,130,0.15);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(13px, 1.05vw, 14px);
          color: #7A5548;
          letter-spacing: 0.02em;
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

        /* ═══ BODY — two columns ═══ */
        .tts-body {
          display: flex;
          align-items: flex-start;
          gap: clamp(36px, 4.5vw, 72px);
        }

        .tts-body-left {
          flex: 1.15;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .tts-body-right {
          flex: 0.85;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          margin-top: -20px;
        }

        /* ═══ FEATURES GRID ═══ */
        .tts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          width: 100%;
          margin-bottom: 36px;
        }

        .tts-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          border-radius: 14px;
          background: rgba(0,0,0,0.015);
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
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(246,158,130,0.1), rgba(249,221,163,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          flex-shrink: 0;
        }

        .tts-card-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .tts-card-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(14.5px, 1.1vw, 15.5px);
          color: #2A2A2A;
          letter-spacing: 0.01em;
          line-height: 1.3;
        }

        .tts-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 14px);
          color: #717171;
          line-height: 1.55;
          letter-spacing: 0.015em;
        }

        /* ═══ CTA ═══ */
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
          padding: 16px 36px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.1vw, 16px);
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
          position: absolute; inset: 0;
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
        .tts-btn:active { transform: translateY(0); box-shadow: 0 2px 12px rgba(246,158,130,0.2); }
        .tts-btn-arrow { width: 17px; height: 17px; transition: transform 0.3s ease; }
        .tts-btn:hover .tts-btn-arrow { transform: translateX(3px); }

        .tts-trust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12.5px, 0.95vw, 13.5px);
          color: #999;
          letter-spacing: 0.03em;
          line-height: 1.5;
          opacity: 0;
        }

        /* ═══ PHONE ═══ */
        .tts-phone-wrap {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .tts-glow {
          position: absolute;
          width: 140%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(246,158,130,0.06) 0%,
            rgba(249,221,163,0.03) 35%,
            transparent 65%
          );
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        .tts-phone {
          position: relative;
          z-index: 2;
          width: clamp(220px, 24vw, 400px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 24px 60px rgba(0,0,0,0.12));
          opacity: 0;
        }

        /* ═══ DECOS ═══ */
        .tts-deco {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
        }
        .tts-deco img { width: 100%; height: 100%; object-fit: contain; }

        .tts-deco-size {
          width: clamp(38px, 4.8vw, 80px);
          height: clamp(38px, 4.8vw, 80px);
        }

        .tts-d1 { left: -18%; bottom: 18%; }
        .tts-d2 { left: -24%; top: 8%; }
        .tts-d3 { right: -18%; bottom: 18%; }
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

        /* ═══ ANIMATIONS ═══ */
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

        /* ═══ TABLET ≤ 1024px ═══ */
        @media (max-width: 1024px) {
          .tts-header { text-align: center; }
          .tts-badge { margin-left: auto; margin-right: auto; }
          .tts-title { max-width: 100%; }
          .tts-body { flex-direction: column; align-items: center; gap: 44px; }
          .tts-body-left { align-items: center; text-align: center; }
          .tts-body-right { padding-top: 0; margin-top: 0; }
          .tts-action { align-items: center; }
          .tts-grid { max-width: 500px; }
          .tts-card { text-align: left; }
          .tts-phone { width: clamp(220px, 35vw, 300px); }
          .tts-deco-size { width: 55px; height: 55px; }
        }

        /* ═══ MOBILE ≤ 768px ═══ */
        @media (max-width: 768px) {
          .tts-container { padding: clamp(36px, 5vw, 50px) 24px clamp(50px, 7vw, 70px); }
          .tts-title { font-size: clamp(26px, 6vw, 34px); margin-bottom: 16px; }
          .tts-header { margin-bottom: clamp(24px, 3vw, 32px); }
          .tts-badge { font-size: 13px; padding: 8px 18px; gap: 9px; }
          .tts-grid { gap: 12px; margin-bottom: 28px; }
          .tts-card { padding: 16px; gap: 12px; }
          .tts-card-icon { width: 38px; height: 38px; border-radius: 10px; font-size: 17px; }
          .tts-card-name { font-size: 14.5px; }
          .tts-card-desc { font-size: 13px; }
          .tts-btn { padding: 14px 30px; font-size: 15px; }
          .tts-phone { width: clamp(200px, 48vw, 260px); }
          .tts-deco-size { width: 46px; height: 46px; }
          .tts-d1 { left: -12%; bottom: 12%; }
          .tts-d2 { left: -16%; top: 6%; }
          .tts-d3 { right: -12%; bottom: 12%; }
          .tts-d4 { right: -16%; top: 6%; }
        }

        /* ═══ SMALL ≤ 540px ═══ */
        @media (max-width: 540px) {
          .tts-grid { grid-template-columns: 1fr; max-width: 380px; }
          .tts-title { font-size: clamp(23px, 5.5vw, 28px); }
          .tts-label { font-size: 11px; }
          .tts-phone { width: clamp(180px, 52vw, 230px); }
          .tts-deco-size { width: 38px; height: 38px; }
        }

        /* ═══ XS ≤ 400px ═══ */
        @media (max-width: 400px) {
          .tts-container { padding: 28px 18px 50px; }
          .tts-header { margin-bottom: 20px; }
          .tts-accent { width: 32px; margin-bottom: 12px; }
          .tts-label { margin-bottom: 12px; font-size: 10.5px; }
          .tts-title { font-size: 22px; margin-bottom: 14px; }
          .tts-badge { font-size: 12px; padding: 7px 16px; }
          .tts-badge-dot { width: 7px; height: 7px; }
          .tts-grid { gap: 10px; margin-bottom: 24px; }
          .tts-card { padding: 14px; gap: 11px; border-radius: 12px; }
          .tts-card-icon { width: 34px; height: 34px; font-size: 15px; border-radius: 9px; }
          .tts-card-name { font-size: 13.5px; }
          .tts-card-desc { font-size: 12.5px; }
          .tts-btn { padding: 13px 26px; font-size: 14px; gap: 9px; }
          .tts-btn-arrow { width: 15px; height: 15px; }
          .tts-trust { font-size: 12px; }
          .tts-phone { width: clamp(160px, 54vw, 200px); }
          .tts-deco-size { width: 32px; height: 32px; }
          .tts-d1 { left: -10%; }
          .tts-d2 { left: -14%; }
          .tts-d3 { right: -10%; }
          .tts-d4 { right: -14%; }
        }

        /* ═══ XXS ≤ 340px ═══ */
        @media (max-width: 340px) {
          .tts-container { padding: 24px 14px 44px; }
          .tts-title { font-size: 20px; }
          .tts-badge { font-size: 11px; padding: 6px 14px; }
          .tts-card { padding: 12px; }
          .tts-card-icon { width: 30px; height: 30px; font-size: 14px; }
          .tts-card-name { font-size: 13px; }
          .tts-card-desc { font-size: 12px; }
          .tts-btn { padding: 12px 22px; font-size: 13.5px; }
          .tts-phone { width: 160px; }
          .tts-deco-size { width: 28px; height: 28px; }
        }
      `}</style>

      <div className="tts-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      <div className="tts-container">

        {/* ══ HEADER — full width, title en dos estrofas ══ */}
        <div className="tts-header">
          <div
            className={`tts-accent ${a ? 'tts-anim-up' : ''}`}
            style={{ animationDelay: '0.15s' }}
          />
          <span
            className={`tts-label ${a ? 'tts-anim-up' : ''}`}
            style={{ animationDelay: '0.25s' }}
          >
            QUÉ ES CAMIL
          </span>
          <h2
            className={`tts-title ${a ? 'tts-anim-up' : ''}`}
            style={{ animationDelay: '0.35s' }}
          >
            Alguien real que te escucha,
            <br />
            <span className="tts-title-light">te entiende y te acompaña</span>
          </h2>
          <div
            className={`tts-badge ${a ? 'tts-anim-up' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <span className="tts-badge-dot" />
            Persona real · No es inteligencia artificial
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="tts-body">

          <div className="tts-body-left">
            <div className="tts-grid">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className={`tts-card ${a ? 'tts-anim-card' : ''}`}
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <div className="tts-card-icon"><span>{f.emoji}</span></div>
                  <div className="tts-card-text">
                    <span className="tts-card-name">{f.title}</span>
                    <span className="tts-card-desc">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tts-action">
              <button
                className={`tts-btn ${a ? 'tts-anim-up' : ''}`}
                style={{ animationDelay: '1.05s' }}
                onClick={() => scrollTo('contacto')}
              >
                Empezar ahora
                <svg className="tts-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span
                className={`tts-trust ${a ? 'tts-anim-up' : ''}`}
                style={{ animationDelay: '1.2s' }}
              >
                Sin compromiso · Empezá cuando quieras
              </span>
            </div>
          </div>

          <div className="tts-body-right">
            <div className="tts-phone-wrap">
              <div className="tts-glow" />
              <img
                src="/celulargrande.png"
                alt="Conversación con Camil"
                className={`tts-phone ${a ? 'tts-anim-scale' : ''}`}
                style={{ animationDelay: '0.25s' }}
              />
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