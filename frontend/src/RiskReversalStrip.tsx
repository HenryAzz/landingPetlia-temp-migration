import { useEffect, useState, useRef } from 'react';

const GUARANTEES = [
  { emoji: '🛡️', title: 'Garantía de satisfacción', desc: 'Si no es lo que esperabas, te devolvemos el 100%' },
  { emoji: '🚫', title: 'Sin permanencia', desc: 'Cancelá cuando quieras, sin preguntas ni letra chica' },
  { emoji: '💳', title: 'Pago 100% seguro', desc: 'Tus datos financieros están siempre protegidos' },
];

const RiskReversalStrip = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHasAnimated(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const a = hasAnimated;

  return (
    <section ref={ref} className="rr-section">
      <style>{`
        .rr-section {
          position: relative; width: 100%; overflow: hidden;
          background: #F3F3F3;
          border-top: 1px solid rgba(0,0,0,0.04);
          border-bottom: 1px solid rgba(0,0,0,0.04);
          padding: clamp(36px, 4vw, 56px) 0;
        }

        .rr-container {
          max-width: 1100px; margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(24px, 2.5vw, 36px);
        }

        .rr-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 18px; border-radius: 50px;
          background: linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.04));
          border: 1px solid rgba(76,175,80,0.2);
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(11px, 0.85vw, 14px);
          color: #4CAF50; letter-spacing: 0.06em;
          opacity: 0;
        }
        .rr-badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #4CAF50;
          box-shadow: 0 0 0 2px rgba(76,175,80,0.15);
          animation: rrPulse 2.5s ease-in-out infinite;
        }
        @keyframes rrPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.15); }
          50% { box-shadow: 0 0 0 4px rgba(76,175,80,0.1), 0 0 12px rgba(76,175,80,0.15); }
        }

        .rr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 1.5vw, 24px); width: 100%;
        }

        .rr-card {
          display: flex; align-items: flex-start;
          gap: clamp(14px, 1.1vw, 18px);
          padding: clamp(20px, 1.8vw, 28px);
          border-radius: clamp(14px, 1.2vw, 18px);
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default; opacity: 0;
        }
        .rr-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
          border-color: rgba(246,158,130,0.15);
        }

        .rr-card-icon {
          width: clamp(44px, 3.2vw, 52px); height: clamp(44px, 3.2vw, 52px);
          border-radius: clamp(12px, 1vw, 14px);
          background: linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0.05));
          border: 1px solid rgba(76,175,80,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(20px, 1.5vw, 24px); flex-shrink: 0;
        }

        .rr-card-text {
          display: flex; flex-direction: column;
          gap: clamp(3px, 0.3vw, 5px); min-width: 0;
        }
        .rr-card-title {
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(14px, 1.05vw, 16.5px); color: #1C1C1E;
          line-height: 1.3;
        }
        .rr-card-desc {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          font-size: clamp(13px, 0.95vw, 15px); color: #666;
          line-height: 1.55;
        }

        @keyframes rrUp { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes rrCardIn { 0% { opacity: 0; transform: translateY(20px) scale(0.97); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .rr-a-up { animation: rrUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .rr-a-card { animation: rrCardIn 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        @media (max-width: 768px) {
          .rr-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
          .rr-card { padding: 18px; gap: 14px; }
          .rr-card-icon { width: 42px; height: 42px; font-size: 19px; }
          .rr-card-title { font-size: 14.5px; }
          .rr-card-desc { font-size: 13px; }
        }
        @media (max-width: 400px) {
          .rr-section { padding: 28px 0; }
          .rr-container { gap: 18px; }
          .rr-badge { font-size: 10.5px; padding: 5px 14px; }
          .rr-card { padding: 14px; gap: 12px; border-radius: 12px; }
          .rr-card-icon { width: 38px; height: 38px; font-size: 17px; border-radius: 10px; }
          .rr-card-title { font-size: 13.5px; }
          .rr-card-desc { font-size: 12.5px; color: #555; }
        }
        @media (max-width: 340px) {
          .rr-card { padding: 12px; gap: 10px; }
          .rr-card-icon { width: 34px; height: 34px; font-size: 15px; }
          .rr-card-title { font-size: 13px; }
          .rr-card-desc { font-size: 12px; }
        }
      `}</style>

      <div className="rr-container">
        <div className={`rr-badge ${a ? 'rr-a-up' : ''}`} style={{ animationDelay: '0.1s' }}>
          <span className="rr-badge-dot" />
          PROBÁ SIN RIESGO
        </div>

        <div className="rr-grid">
          {GUARANTEES.map((g, i) => (
            <div key={i} className={`rr-card ${a ? 'rr-a-card' : ''}`} style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
              <div className="rr-card-icon">{g.emoji}</div>
              <div className="rr-card-text">
                <span className="rr-card-title">{g.title}</span>
                <span className="rr-card-desc">{g.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskReversalStrip;