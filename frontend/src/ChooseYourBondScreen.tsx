// ChooseYourBondScreen.tsx
import { useEffect, useState, useRef } from 'react';

const BONDS = [
  { id: 'correspondencia', title: 'Correspondencia especial', subtitle: 'Para quien busca un toque dulce', description: 'Dale chispa a tu semana con un toque encantador y un espacio al mes para compartir tiempo juntos.', highlights: ['Cartas semanales', '1 cita virtual / mes', 'Sorpresas'], bg: 'rgba(14, 116, 144, 0.5)', accent: '#67D4E8', accentGlow: 'rgba(103,212,232,0.15)', icon: '/carta.png', iconFloat: 'cyb-fl-1', stagger: 'right' },
  { id: 'casual', title: 'Casualmente cotidiano', subtitle: 'La compañía que te cambia el día', description: 'Mantené una conversación para compartir más que el día a día y juntarse de vez en cuando.', highlights: ['Mensajes diarios', '1 cita virtual / mes', 'Audios y llamadas limitadas', 'Sorpresas'], bg: 'rgba(244, 63, 94, 0.6)', accent: '#FF8FA3', accentGlow: 'rgba(255,143,163,0.15)', icon: '/celular.png', iconFloat: 'cyb-fl-2', stagger: 'left', popular: true },
  { id: 'diaria', title: 'Compañía diaria', subtitle: 'Tu cómplice de cada momento', description: 'Transformá lo cotidiano en pura magia y alegría como tu fiel compañera.', highlights: ['Conversación continua', '1 cita virtual / mes', 'audios + llamadas + sorpresas'], bg: 'rgba(234, 179, 8, 0.6)', accent: '#F9DDA3', accentGlow: 'rgba(249,221,163,0.15)', icon: '/billete.png', iconFloat: 'cyb-fl-3', stagger: 'right' },
];

const ChooseYourBondScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="vinculos" className="cyb-section">
      <style>{`
        .cyb-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .cyb-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cyb-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
          transform: translateY(-8%);
        }
        .cyb-layout {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(48px, 7vw, 100px) clamp(24px, 4vw, 60px);
        }
        .cyb-left {
          width: 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cyb-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-right: 3vw;
          gap: clamp(14px, 1.3vw, 20px);
        }
        .cyb-right {
          width: 62%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: clamp(30px, 3vw, 50px) 0;
        }

        .cyb-cards {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 600px;
          gap: clamp(8px, 1.65vw, 25px);
            margin-left: auto;
        }

        .cyb-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.2));
          opacity: 0;
        }
        .cyb-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          opacity: 0;
        }
        .cyb-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(70px, 2.8vw, 55px);
          line-height: 1.10;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0,0,0,0.2);
          opacity: 0;
        }
        .cyb-title-light { font-weight: 400; font-style: italic; color: rgba(255,255,255,0.9); }
        .cyb-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.75;
          color: rgba(255,255,255,0.75);
          margin: 10px 0 30px 0;
          max-width: 400px;
          letter-spacing: 0.015em;
          opacity: 0;
        }
        .cyb-cta-wrap { display: flex; flex-direction: column; align-items: inherit; gap: 14px; }
        .cyb-btn {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: clamp(14px, 1vw, 18px) clamp(30px, 2.5vw, 42px);
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%);
          color: #2a1f0e;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.1vw, 18px);
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(249,221,163,0.2), 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .cyb-btn::before { content: ''; position: absolute; inset: 0; border-radius: 50px; background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s ease; }
        .cyb-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(249,221,163,0.35), 0 2px 8px rgba(0,0,0,0.1); }
        .cyb-btn:hover::before { opacity: 1; }
        .cyb-btn:active { transform: translateY(0); }
        .cyb-btn-arrow { width: 17px; height: 17px; transition: transform 0.3s ease; }
        .cyb-btn:hover .cyb-btn-arrow { transform: translateX(3px); }
        .cyb-microtrust { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(13px, 1vw, 14px); color: rgba(255,255,255,0.45); letter-spacing: 0.03em; opacity: 0; margin-top: 10px; }

        .cyb-card {
          position: relative;
          border-radius: clamp(14px, 1.1vw, 20px);
          padding: clamp(14px, 1.1vw, 18px) clamp(22px, 1.8vw, 30px);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow: 0 4px 4px rgba(0,0,0,0.2), inset 1px 4px 8px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          justify-content: right;
          gap: clamp(3px, 0.25vw, 5px);
          overflow: visible;
          cursor: pointer;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cyb-card::after { content: ''; position: absolute; top: 0; left: clamp(22px, 2vw, 30px); right: clamp(22px, 2vw, 30px); height: 2px; border-radius: 0 0 2px 2px; background: var(--card-accent); opacity: 0.4; }
        .cyb-card::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%); opacity: 0; transition: opacity 0.4s ease; z-index: 0; }
        .cyb-card:hover { transform: translateY(-5px) scale(1.015); box-shadow: 0 16px 40px rgba(0,0,0,0.3), inset 1px 4px 8px rgba(0,0,0,0.2), 0 0 40px var(--card-glow); }
        .cyb-card:hover::before { opacity: 1; }
        .cyb-card > * { position: relative; z-index: 1; }
        .cyb-stagger-r { margin-left: clamp(8px, 1vw, 16px); }
        .cyb-stagger-l { margin-right: clamp(8px, 1vw, 16px); }

        .cyb-popular { position: absolute; top: clamp(-11px, -0.8vw, -7px); right: clamp(16px, 1.7vw, 26px); padding: clamp(5px, 0.3vw, 7px) clamp(14px, 1vw, 18px); border-radius: 50px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(10px, 0.75vw, 13px); letter-spacing: 0.1em; white-space: nowrap; z-index: 5; }

        .cyb-card-title { font-family: 'Poppins', sans-serif; font-weight: 600; color: #FFFFFF; font-size: clamp(16px, 1.35vw, 22px); line-height: 1.2; margin: 0; }
        .cyb-card-subtitle { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: clamp(10px, 0.72vw, 12px); letter-spacing: 0.05em; padding: 2px 10px; border-radius: 50px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); white-space: nowrap; align-self: flex-start; }
        .cyb-card-desc { font-family: 'Poppins', sans-serif; font-weight: 400; color: rgba(255,255,255,0.8); font-size: clamp(14px, 0.88vw, 15.5px); line-height: 1.45; margin: 0; padding-right: clamp(40px, 4vw, 65px); }
        .cyb-card-features { display: flex; flex-wrap: wrap; gap: clamp(3px, 0.25vw, 5px); margin-top: clamp(1px, 0.15vw, 3px); }
        .cyb-card-feat { display: inline-flex; align-items: center; gap: 5px; padding: 2px 9px; border-radius: 50px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.06); font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(10px, 0.68vw, 11.5px); color: rgba(255,255,255,0.75); white-space: nowrap; transition: all 0.3s ease; }
        .cyb-card:hover .cyb-card-feat { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.1); }
        .cyb-card-feat-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }

        .cyb-icon-wrap { position: absolute; pointer-events: none; z-index: 10; opacity: 0; }
        .cyb-icon-wrap img { width: 100%; height: 100%; object-fit: contain; }
        .cyb-icon-pos-0 { right: 0; top: 0; transform: translate(35%, -35%); width: clamp(45px, 5vw, 75px); height: clamp(45px, 5vw, 75px); }
        .cyb-icon-pos-1 { left: -1.5vw; bottom: -1vw; transform: translate(-40%, 40%); width: clamp(85px, 9vw, 130px); height: clamp(85px, 9vw, 130px); }
        .cyb-icon-pos-2 { right: 0; bottom: 0; transform: translate(35%, 35%); width: clamp(50px, 5.5vw, 80px); height: clamp(50px, 5.5vw, 80px); }

        @keyframes cybF1 { 0%, 100% { transform: translate(35%, -35%) rotate(-12deg) translateY(0); } 50% { transform: translate(35%, -35%) rotate(-9deg) translateY(-5px); } }
        @keyframes cybF2 { 0%, 100% { transform: translate(-40%, 40%) rotate(-25deg) translateY(0); } 50% { transform: translate(-40%, 40%) rotate(-22deg) translateY(-4px); } }
        @keyframes cybF3 { 0%, 100% { transform: translate(35%, 35%) rotate(15deg) translateY(0); } 50% { transform: translate(35%, 35%) rotate(18deg) translateY(-5px); } }
        .cyb-fl-1 { animation: cybF1 4s ease-in-out infinite; }
        .cyb-fl-2 { animation: cybF2 4.5s ease-in-out infinite 0.7s; }
        .cyb-fl-3 { animation: cybF3 3.8s ease-in-out infinite 1.2s; }

        @keyframes cybUp { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cybSlideR { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes cybCardIn { 0% { opacity: 0; transform: translateX(50px) scale(0.94); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes cybPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        .cyb-a-up { animation: cybUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .cyb-a-slide { animation: cybSlideR 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .cyb-a-card { animation: cybCardIn 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .cyb-a-pop { animation: cybPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }

        @media (max-width: 1024px) {
          .cyb-layout { flex-direction: column; padding: 70px clamp(24px, 5vw, 60px) 60px; }
          .cyb-left { width: 100%; }
          .cyb-left-inner { padding: 0; align-items: center; text-align: center; gap: 16px; margin-bottom: 46px; }
          .cyb-sub { max-width: 460px; }
          .cyb-right { width: 100%; padding: 0; }
          .cyb-cards { max-width: 560px; margin: 0 auto; gap: 22px; }
          .cyb-stagger-r { margin-left: 12px; }
          .cyb-stagger-l { margin-right: 12px; }
          .cyb-a-card { animation-name: cybUp; }
          .cyb-a-slide { animation-name: cybUp; }
          .cyb-cta-wrap { align-items: center; }
          .cyb-card {
            padding: clamp(16px, 2vw, 22px) clamp(18px, 2.5vw, 26px);
            gap: clamp(5px, 0.6vw, 8px);
          }
        }

        @media (max-width: 768px) {
          .cyb-layout { padding: 56px 24px 50px; }
          .cyb-left-inner { gap: 14px; margin-bottom: 38px; }
          .cyb-cards { gap: 20px; }
          .cyb-title { font-size: clamp(24px, 5.5vw, 30px); }
          .cyb-sub { font-size: 15px; }
          .cyb-card { padding: 16px 18px; gap: 6px; border-radius: 16px; }
          .cyb-card-title { font-size: 17px; }
          .cyb-card-subtitle { font-size: 11.5px; padding: 3px 10px; }
          .cyb-card-desc { font-size: 13px; line-height: 1.5; }
          .cyb-card-feat { font-size: 10.5px; padding: 3px 9px; }
          .cyb-btn { padding: 14px 30px; font-size: 15px; }
          .cyb-icon-pos-0 { width: 46px; height: 46px; }
          .cyb-icon-pos-1 { width: 88px; height: 88px; left: -10px; bottom: -6px; }
          .cyb-icon-pos-2 { width: 50px; height: 50px; }
        }

        @media (max-width: 540px) {
          .cyb-layout { padding: 50px 20px 44px; }
          .cyb-left-inner { gap: 12px; margin-bottom: 32px; }
          .cyb-cards { gap: 24px; }
          .cyb-stagger-r, .cyb-stagger-l { margin-left: 0; margin-right: 0; }
          .cyb-title { font-size: clamp(22px, 5vw, 26px); }
          .cyb-label { font-size: 10px; }
          .cyb-sub { font-size: 14.5px; }
          .cyb-card { padding: 15px 16px; border-radius: 14px; gap: 5px; }
          .cyb-card-title { font-size: 16px; }
          .cyb-card-subtitle { font-size: 11px; }
          .cyb-card-desc { font-size: 12.5px; padding-right: clamp(36px, 11vw, 60px); }
          .cyb-card-feat { font-size: 10px; padding: 3px 8px; }
          .cyb-icon-pos-0 { width: 42px; height: 42px; }
          .cyb-icon-pos-1 { width: 78px; height: 78px; left: -8px; bottom: -5px; }
          .cyb-icon-pos-2 { width: 46px; height: 46px; }
        }

        @media (max-width: 400px) {
          .cyb-layout { padding: 44px 18px 40px; }
          .cyb-left-inner { gap: 10px; margin-bottom: 28px; }
          .cyb-accent { width: 34px; }
          .cyb-label { font-size: 9.5px; }
          .cyb-title { font-size: 21px; }
          .cyb-sub { font-size: 13.5px; }
          .cyb-card { padding: 14px 15px; gap: 5px; }
          .cyb-card-title { font-size: 15.5px; }
          .cyb-card-subtitle { font-size: 10.5px; }
          .cyb-card-desc { font-size: 12px; }
          .cyb-card-feat { font-size: 9.5px; }
          .cyb-popular { font-size: 9.5px; padding: 4px 12px; }
          .cyb-btn { padding: 13px 26px; font-size: 14.5px; gap: 9px; }
          .cyb-btn-arrow { width: 15px; height: 15px; }
          .cyb-microtrust { font-size: 12.5px; }
          .cyb-icon-pos-0 { width: 38px; height: 38px; }
          .cyb-icon-pos-1 { width: 68px; height: 68px; left: -6px; bottom: -4px; }
          .cyb-icon-pos-2 { width: 40px; height: 40px; }
        }

        @media (max-width: 340px) {
          .cyb-layout { padding: 38px 14px 36px; }
          .cyb-title { font-size: 19px; }
          .cyb-sub { font-size: 13px; }
          .cyb-card { padding: 13px 14px; }
          .cyb-card-title { font-size: 15px; }
          .cyb-card-subtitle { font-size: 10px; }
          .cyb-card-desc { font-size: 11.5px; }
          .cyb-card-feat { font-size: 9px; }
          .cyb-btn { padding: 12px 22px; font-size: 14px; }
          .cyb-icon-pos-0 { width: 34px; height: 34px; }
          .cyb-icon-pos-1 { width: 60px; height: 60px; }
          .cyb-icon-pos-2 { width: 36px; height: 36px; }
        }
      `}</style>

      <div className="cyb-bg"><img src="/fondoliso.jpeg" alt="" /></div>

      <div className="cyb-layout">
        <div className="cyb-left">
          <div className="cyb-left-inner">
            <div className={`cyb-accent ${a ? 'cyb-a-slide' : ''}`} style={{ animationDelay: '0.1s' }} />
            <span className={`cyb-label ${a ? 'cyb-a-slide' : ''}`} style={{ animationDelay: '0.2s' }}>ELEGÍ TU VÍNCULO</span>
            <h2 className={`cyb-title ${a ? 'cyb-a-slide' : ''}`} style={{ animationDelay: '0.3s' }}>
              <span className="cyb-title-light">Tu tiempo,</span><br />tu espacio.
            </h2>
            <p className={`cyb-sub ${a ? 'cyb-a-slide' : ''}`} style={{ animationDelay: '0.45s' }}>
              Elegí el vínculo que mejor se adapte a vos y date el mimo que necesitás. Cada plan está pensado para acompañarte a tu ritmo.
            </p>
            <div className="cyb-cta-wrap">
              <button className={`cyb-btn ${a ? 'cyb-a-up' : ''}`} style={{ animationDelay: '0.6s' }} onClick={() => scrollTo('planes')}>
                Elegir mi compañia
                <svg className="cyb-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span className={`cyb-microtrust ${a ? 'cyb-a-up' : ''}`} style={{ animationDelay: '0.75s' }}>
                Sin permanencia · Cambiá de plan cuando quieras
              </span>
            </div>
          </div>
        </div>

        <div className="cyb-right">
          <div className="cyb-cards">
            {BONDS.map((bond, i) => (
              <div key={bond.id} className={`cyb-card ${bond.stagger === 'right' ? 'cyb-stagger-r' : 'cyb-stagger-l'} ${a ? 'cyb-a-card' : ''}`}
                style={{ backgroundColor: bond.bg, animationDelay: `${0.4 + i * 0.18}s`, ['--card-accent' as string]: bond.accent, ['--card-glow' as string]: bond.accentGlow }}
                onClick={() => scrollTo('planes')}>
                {bond.popular && <div className="cyb-popular">⭐ MÁS ELEGIDO</div>}
                <h3 className="cyb-card-title">{bond.title}</h3>
                <span className="cyb-card-subtitle">{bond.subtitle}</span>
                <p className="cyb-card-desc">{bond.description}</p>
                <div className="cyb-card-features">
                  {bond.highlights.map((h, j) => (
                    <span key={j} className="cyb-card-feat">
                      <span className="cyb-card-feat-dot" style={{ background: bond.accent }} />{h}
                    </span>
                  ))}
                </div>
                <div className={`cyb-icon-wrap cyb-icon-pos-${i} ${a ? 'cyb-a-pop' : ''}`} style={{ animationDelay: `${0.8 + i * 0.15}s` }}>
                  <img src={bond.icon} alt="" className={mounted ? bond.iconFloat : ''} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourBondScreen;