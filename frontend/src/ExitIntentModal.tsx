import { useEffect, useState, useCallback } from 'react';

const ExitIntentModal = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const show = useCallback(() => {
    if (dismissed || submitted) return;
    setVisible(true);
  }, [dismissed, submitted]);

  useEffect(() => {
    if (dismissed) return;

    // Exit intent (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) show();
    };

    // Scroll depth fallback (mobile + desktop)
    let triggered = false;
    const handleScroll = () => {
      if (triggered) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.7) { triggered = true; setTimeout(show, 3000); }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed, show]);

  const handleClose = () => { setVisible(false); setDismissed(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => { setVisible(false); setDismissed(true); }, 2500);
  };

  if (!visible) return null;

  return (
    <div className="ei-overlay">
      <style>{`
        .ei-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
          animation: eiFadeIn 0.3s ease both;
          padding: 24px;
        }
        @keyframes eiFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }

        .ei-card {
          position: relative; width: 100%; max-width: 420px;
          padding: clamp(28px, 3vw, 44px);
          border-radius: clamp(20px, 1.8vw, 28px);
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: clamp(14px, 1.5vw, 22px);
          animation: eiSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        @keyframes eiSlideUp { 0% { opacity: 0; transform: translateY(40px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }

        .ei-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s ease; color: rgba(255,255,255,0.5);
          font-size: 16px; font-family: 'Poppins', sans-serif;
        }
        .ei-close:hover { background: rgba(255,255,255,0.15); color: #F9DDA3; }

        .ei-emoji { font-size: clamp(36px, 3.5vw, 50px); }

        .ei-title {
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(18px, 1.6vw, 26px); color: #FFF; margin: 0;
          line-height: 1.3;
        }
        .ei-title-gold { color: #F9DDA3; }

        .ei-desc {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          font-size: clamp(13px, 1vw, 15px); color: rgba(255,255,255,0.65);
          line-height: 1.6; margin: 0; max-width: 340px;
        }

        .ei-form {
          display: flex; flex-direction: column;
          gap: clamp(10px, 0.9vw, 14px); width: 100%;
        }

        .ei-input {
          width: 100%; padding: clamp(12px, 0.9vw, 16px) clamp(16px, 1.2vw, 20px);
          border-radius: clamp(12px, 1vw, 16px);
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px); color: #FFF;
          font-family: 'Poppins', sans-serif; font-size: clamp(13px, 1vw, 15px);
          outline: none; transition: all 0.3s ease; box-sizing: border-box;
        }
        .ei-input::placeholder { color: rgba(255,255,255,0.4); }
        .ei-input:focus { border-color: #F9DDA3; background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(249,221,163,0.15); }

        .ei-submit {
          width: 100%; padding: clamp(12px, 0.85vw, 16px) 0;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: none; color: #5A4520;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(13px, 1vw, 16px); cursor: pointer;
          box-shadow: 0 4px 20px rgba(249,221,163,0.2);
          transition: all 0.35s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ei-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(249,221,163,0.3); }
        .ei-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .ei-trust {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          font-size: clamp(10px, 0.75vw, 12px); color: rgba(255,255,255,0.35);
        }

        .ei-success { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .ei-success-emoji { font-size: 40px; animation: eiPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes eiPop { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .ei-success-text {
          font-family: 'Poppins', sans-serif; font-weight: 500;
          font-size: clamp(15px, 1.2vw, 18px); color: #F9DDA3;
        }

        @keyframes eiSpin { to { transform: rotate(360deg); } }
        .ei-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(90,69,32,0.2); border-top-color: #5A4520;
          border-radius: 50%; animation: eiSpin 1s linear infinite;
        }

        @media (max-width: 480px) {
          .ei-card { padding: 24px 20px; }
          .ei-title { font-size: 18px; }
          .ei-close { width: 28px; height: 28px; font-size: 14px; top: 10px; right: 10px; }
        }
      `}</style>

      <div className="ei-card">
        <button className="ei-close" onClick={handleClose}>✕</button>

        {!submitted ? (
          <>
            <span className="ei-emoji">💬</span>
            <h3 className="ei-title">
              ¿Querés que te <span className="ei-title-gold">contactemos</span>?
            </h3>
            <p className="ei-desc">
              Dejanos tu nombre y WhatsApp. Sin spam, sin compromiso.
              Solo una charla para conocernos.
            </p>

            <form className="ei-form" onSubmit={handleSubmit}>
              <input className="ei-input" type="text" placeholder="Tu nombre" required />
              <input className="ei-input" type="tel" placeholder="Tu WhatsApp (ej: +54 11...)" required />
              <button className="ei-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><div className="ei-spinner" /> Enviando...</> : 'Quiero que me contacten 💛'}
              </button>
            </form>

            <span className="ei-trust">🔒 Sin spam · Sin compromiso · Respuesta rápida</span>
          </>
        ) : (
          <div className="ei-success">
            <span className="ei-success-emoji">💛</span>
            <span className="ei-success-text">¡Listo! Te contactamos pronto</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;