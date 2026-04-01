import { useEffect, useState, useRef } from 'react';

const MESSAGES = [
  { emoji: '💌', text: 'Una nueva carta está siendo escrita', time: 'Hace unos minutos' },
  { emoji: '📮', text: 'Otra carta acaba de salir', time: 'Hace un momento' },
  { emoji: '💬', text: 'Camil está respondiendo mensajes', time: 'Ahora' },
  { emoji: '🌙', text: 'Una conversación tranquila sigue abierta', time: 'Hace un rato' },
  { emoji: '✉️', text: 'Una respuesta acaba de enviarse', time: 'Hace unos minutos' },
  { emoji: '🕊️', text: 'Un mensaje llegó a destino', time: 'Hace un momento' },
  { emoji: '📬', text: 'Una carta encontró a su destinatario', time: 'Hace un rato' },
  { emoji: '✨', text: 'Una nueva correspondencia comenzó', time: 'Hace un rato' },
  { emoji: '☕', text: 'Camil está escribiendo', time: 'Ahora' },
  { emoji: '💛', text: 'Otra conversación sigue su curso', time: 'Hace unos minutos' },
];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (dismissed) return;

    const showNext = () => {
      setCurrentIdx((p) => (p + 1) % MESSAGES.length);
      setVisible(true);
      timerRef.current = setTimeout(() => setVisible(false), 10000);
    };

    const initial = setTimeout(showNext, 15000);
    const interval = setInterval(showNext, 35000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;
  const msg = MESSAGES[currentIdx];

  return (
    <div className="sp-toast">
      <style>{`
        .sp-toast {
          position: fixed; bottom: clamp(20px, 2.5vw, 32px); left: clamp(16px, 2vw, 28px);
          z-index: 8000;
          display: flex; align-items: center; gap: clamp(10px, 0.8vw, 14px);
          padding: clamp(12px, 1vw, 18px) clamp(16px, 1.4vw, 24px);
          border-radius: clamp(14px, 1.2vw, 18px);
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04);
          animation: spSlideIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
          max-width: clamp(280px, 30vw, 360px);
          cursor: default;
        }
        @keyframes spSlideIn { 0% { opacity: 0; transform: translateY(20px) translateX(-10px); } 100% { opacity: 1; transform: translateY(0) translateX(0); } }

        .sp-emoji { font-size: clamp(20px, 1.6vw, 26px); flex-shrink: 0; }

        .sp-content { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .sp-text {
          font-family: 'Poppins', sans-serif; font-weight: 500;
          font-size: clamp(12px, 0.9vw, 14px); color: #2A2A2A;
          line-height: 1.4;
        }
        .sp-time {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          font-size: clamp(10px, 0.72vw, 12px); color: #AAA;
        }

        .sp-close {
          position: absolute; top: -6px; right: -6px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #FFF; border: 1px solid rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: #AAA; cursor: pointer;
          transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .sp-close:hover { background: #F69E82; color: #FFF; border-color: #F69E82; }

        @media (max-width: 540px) {
          .sp-toast { max-width: calc(100vw - 32px); bottom: 16px; left: 16px; right: 16px; }
        }
        @media (max-width: 400px) {
          .sp-toast { padding: 10px 14px; border-radius: 12px; }
          .sp-text { font-size: 12px; }
          .sp-time { font-size: 10px; }
        }
      `}</style>

      <span className="sp-emoji">{msg.emoji}</span>
      <div className="sp-content">
        <span className="sp-text">{msg.text}</span>
        <span className="sp-time">{msg.time}</span>
      </div>
      <button className="sp-close" onClick={() => setDismissed(true)}>✕</button>
    </div>
  );
};

export default SocialProofToast;