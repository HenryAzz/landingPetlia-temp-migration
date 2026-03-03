import { useEffect, useState, useRef } from 'react';

const PERSONAS = [
  { emoji: '🏙️', title: 'Te mudaste a una ciudad nueva', desc: 'Y todavía no armaste tu círculo.', accent: '#F69E82' },
  { emoji: '💼', title: 'Trabajás mucho y llegás solo/a', desc: 'El día vuela pero la noche pesa.', accent: '#67D4E8' },
  { emoji: '🎁', title: 'Querés regalarle compañía a alguien', desc: 'El regalo más valioso: presencia genuina.', accent: '#F9DDA3' },
  { emoji: '🧓', title: 'Sos adulto mayor y querés conversar', desc: 'Sin complicaciones, alguien real.', accent: '#F4B896' },
  { emoji: '🦋', title: 'Tenés todo pero te falta algo', desc: 'No es terapia. Es que alguien se acuerde de vos.', accent: '#E8C878' },
  { emoji: '🌱', title: 'Te cuesta conectar con otros', desc: 'A tu ritmo, sin presiones, sin juicios.', accent: '#A8D8A8' },
];

const ForWhomScreen = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="para-quien" className="fw-section">
      <style>{`
        .fw-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #FAFAFA 0%, #F9F9F9 100%);
        }

        .fw-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(48px, 7vw, 100px) clamp(24px, 5vw, 80px) clamp(64px, 9vw, 120px);
        }

        .fw-layout {
          display: flex;
          gap: clamp(48px, 6vw, 80px);
          align-items: stretch;
        }

        /* ═══ LEFT COLUMN ═══ */
        .fw-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .fw-accent {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.18));
          margin-bottom: 16px;
          opacity: 0;
        }

        .fw-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 1vw, 13px);
          letter-spacing: 0.2em;
          color: #E8856A;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0;
        }

        .fw-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.25;
          color: #1C1C1E;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          opacity: 0;
        }
        .fw-title-light {
          font-weight: 400;
          color: #4A4A4A;
        }

        .fw-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.15vw, 17px);
          color: #666;
          line-height: 1.75;
          margin: 0 0 clamp(14px, 1.4vw, 20px);
          max-width: 440px;
          letter-spacing: 0.015em;
          opacity: 0;
        }

        .fw-highlight {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(14px, 1.1vw, 16px);
          color: #D4785E;
          line-height: 1.65;
          margin: 0 0 clamp(28px, 2.8vw, 40px);
          padding-left: clamp(16px, 1.3vw, 22px);
          border-left: 2.5px solid rgba(246,158,130,0.35);
          max-width: 400px;
          opacity: 0;
        }

        /* ═══ CTA AREA ═══ */
        .fw-action {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .fw-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.1vw, 16px);
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(246,158,130,0.25), 0 1px 3px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .fw-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .fw-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(246,158,130,0.35), 0 2px 8px rgba(0,0,0,0.06);
        }
        .fw-btn:hover::before { opacity: 1; }
        .fw-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(246,158,130,0.2);
        }
        .fw-btn-arrow {
          width: 17px; height: 17px;
          transition: transform 0.3s ease;
        }
        .fw-btn:hover .fw-btn-arrow { transform: translateX(3px); }

        .fw-trust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12.5px, 0.95vw, 13.5px);
          color: #999;
          letter-spacing: 0.03em;
          line-height: 1.5;
          opacity: 0;
        }

        /* ═══ RIGHT COLUMN ═══ */
        .fw-right {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
        }

        .fw-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .fw-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(14px, 1.2vw, 20px);
          padding: clamp(18px, 1.5vw, 24px) clamp(16px, 1.3vw, 22px);
          border-radius: 14px;
          cursor: default;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
          position: relative;
        }

        .fw-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: clamp(16px, 1.3vw, 22px);
          right: clamp(16px, 1.3vw, 22px);
          height: 1px;
          background: rgba(0,0,0,0.045);
        }
        .fw-item:last-child::after { display: none; }

        .fw-item:hover {
          background: #FFF;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        .fw-item:hover::after { opacity: 0; }

        .fw-item-emoji {
          width: clamp(42px, 3.2vw, 50px);
          height: clamp(42px, 3.2vw, 50px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(19px, 1.5vw, 23px);
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .fw-item:hover .fw-item-emoji { transform: scale(1.1); }

        .fw-item-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          padding-top: 3px;
        }

        .fw-item-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(14.5px, 1.1vw, 15.5px);
          color: #2A2A2A;
          line-height: 1.35;
          letter-spacing: 0.01em;
          transition: color 0.3s ease;
        }
        .fw-item:hover .fw-item-title { color: #1C1C1E; }

        .fw-item-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 14px);
          color: #717171;
          line-height: 1.55;
          letter-spacing: 0.015em;
          transition: color 0.3s ease;
        }
        .fw-item:hover .fw-item-desc { color: #555; }

        .fw-item-arrow {
          width: 16px; height: 16px;
          color: #CCC;
          flex-shrink: 0;
          margin-top: 8px;
          margin-left: auto;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.3s ease;
        }
        .fw-item:hover .fw-item-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--item-accent);
        }

        /* ═══ ANIMATIONS ═══ */
        @keyframes fwFadeUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fwSlideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .fw-a-fu { animation: fwFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .fw-a-si { animation: fwSlideIn 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        /* ═══ TABLET ≤ 1024px ═══ */
        @media (max-width: 1024px) {
          .fw-layout { flex-direction: column; gap: 40px; }
          .fw-left { text-align: center; align-items: center; }
          .fw-action { align-items: center; }
          .fw-desc { max-width: 500px; text-align: center; }
          .fw-highlight { text-align: left; margin-left: auto; margin-right: auto; }
          .fw-right { width: 100%; max-width: 560px; margin: 0 auto; }
          .fw-a-si { animation-name: fwFadeUp; }
        }

        /* ═══ MOBILE ≤ 768px ═══ */
        @media (max-width: 768px) {
          .fw-container {
            padding: clamp(36px, 5vw, 50px) 24px clamp(50px, 7vw, 70px);
          }
          .fw-title { font-size: clamp(25px, 5.8vw, 32px); margin-bottom: 16px; }
          .fw-desc { font-size: 15px; }
          .fw-highlight { font-size: 14px; }
          .fw-item { padding: 16px; gap: 12px; }
          .fw-item-emoji { width: 38px; height: 38px; font-size: 17px; border-radius: 10px; }
          .fw-item-title { font-size: 14.5px; }
          .fw-item-desc { font-size: 13px; }
          .fw-btn { padding: 14px 30px; font-size: 15px; }
        }

        /* ═══ SMALL ≤ 540px ═══ */
        @media (max-width: 540px) {
          .fw-title { font-size: clamp(23px, 5.2vw, 27px); }
          .fw-label { font-size: 11px; }
          .fw-desc { font-size: 14px; }
          .fw-highlight { font-size: 13.5px; }
          .fw-item { padding: 14px; gap: 11px; border-radius: 12px; }
          .fw-item-emoji { width: 34px; height: 34px; font-size: 15px; }
          .fw-item-title { font-size: 14px; }
          .fw-item-desc { font-size: 12.5px; }
          .fw-item-arrow { display: none; }
        }

        /* ═══ XS ≤ 400px ═══ */
        @media (max-width: 400px) {
          .fw-container { padding: 28px 18px 50px; }
          .fw-accent { width: 32px; margin-bottom: 12px; }
          .fw-label { margin-bottom: 12px; font-size: 10.5px; }
          .fw-title { font-size: 22px; margin-bottom: 14px; }
          .fw-desc { font-size: 13.5px; margin-bottom: 10px; }
          .fw-highlight { font-size: 13px; padding-left: 14px; margin-bottom: 24px; }
          .fw-btn { padding: 13px 26px; font-size: 14px; gap: 9px; }
          .fw-btn-arrow { width: 15px; height: 15px; }
          .fw-trust { font-size: 12px; }
          .fw-item { padding: 12px; gap: 10px; }
          .fw-item-emoji { width: 32px; height: 32px; font-size: 14px; border-radius: 9px; }
          .fw-item-title { font-size: 13.5px; }
          .fw-item-desc { font-size: 12px; }
        }

        /* ═══ XXS ≤ 340px ═══ */
        @media (max-width: 340px) {
          .fw-container { padding: 24px 14px 44px; }
          .fw-title { font-size: 20px; }
          .fw-desc { font-size: 13px; }
          .fw-item { padding: 10px; }
          .fw-item-emoji { width: 28px; height: 28px; font-size: 13px; }
          .fw-item-title { font-size: 13px; }
          .fw-item-desc { font-size: 11.5px; }
          .fw-btn { padding: 12px 22px; font-size: 13.5px; }
        }
      `}</style>

      <div className="fw-container">
        <div className="fw-layout">
          <div className="fw-left">
            <div
              className={`fw-accent ${a ? 'fw-a-fu' : ''}`}
              style={{ animationDelay: '0.1s' }}
            />
            <span
              className={`fw-label ${a ? 'fw-a-fu' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              ¿PARA QUIÉN ES?
            </span>
            <h2
              className={`fw-title ${a ? 'fw-a-fu' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              Camil es para vos
              <br />
              <span className="fw-title-light">si alguna vez sentiste esto</span>
            </h2>
            <p
              className={`fw-desc ${a ? 'fw-a-fu' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              No importa la razón ni la edad. Si sentís que necesitás a alguien, ya es motivo suficiente.
            </p>
            <p
              className={`fw-highlight ${a ? 'fw-a-fu' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              "A veces, un mensaje puede cambiarlo todo."
            </p>

            <div className="fw-action">
              <button
                className={`fw-btn ${a ? 'fw-a-fu' : ''}`}
                style={{ animationDelay: '0.6s' }}
                onClick={() => scrollTo('contacto')}
              >
                Quiero mi Camil
                <svg className="fw-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span
                className={`fw-trust ${a ? 'fw-a-fu' : ''}`}
                style={{ animationDelay: '0.7s' }}
              >
                Sin compromiso · Para cualquier edad · 100% privado
              </span>
            </div>
          </div>

          <div className="fw-right">
            <div className="fw-list">
              {PERSONAS.map((p, i) => (
                <div
                  key={i}
                  className={`fw-item ${a ? 'fw-a-si' : ''}`}
                  style={{
                    animationDelay: `${0.3 + i * 0.08}s`,
                    ['--item-accent' as string]: p.accent,
                  }}
                >
                  <div
                    className="fw-item-emoji"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}14, ${p.accent}08)`,
                      border: `1px solid ${p.accent}18`,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div className="fw-item-text">
                    <span className="fw-item-title">{p.title}</span>
                    <span className="fw-item-desc">{p.desc}</span>
                  </div>
                  <svg className="fw-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomScreen;