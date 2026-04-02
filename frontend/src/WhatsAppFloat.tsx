import { useEffect, useState } from "react";

const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="wa-wrap">
      <style>{`
        .wa-wrap {
          position: fixed;
          bottom: clamp(20px, 2.5vw, 32px);
          right: clamp(16px, 2vw, 28px);
          z-index: 8000;
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 8px;
          animation: waFadeIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes waFadeIn { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }

        .wa-tooltip {
          padding: 8px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          font-family: 'Nunito', ui-sans-serif, system-ui, sans-serif; font-weight: 500;
          font-size: clamp(11px, 0.85vw, 13px); color: #2A2A2A;
          white-space: nowrap;
          animation: waTooltipIn 0.3s ease both;
        }
        @keyframes waTooltipIn { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }

        .wa-btn {
          width: clamp(52px, 4vw, 62px); height: clamp(52px, 4vw, 62px);
          border-radius: 50%;
          background: #25D366;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(37,211,102,0.3), 0 2px 6px rgba(0,0,0,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }
        .wa-btn::after {
          content: ''; position: absolute; inset: -4px;
          border-radius: 50%; border: 2px solid rgba(37,211,102,0.3);
          animation: waPulse 2.5s ease-in-out infinite;
        }
        @keyframes waPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 28px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.12);
        }
        .wa-btn:active { transform: scale(0.95); }

        .wa-icon { width: clamp(26px, 2vw, 32px); height: clamp(26px, 2vw, 32px); }

        @media (max-width: 540px) {
          .wa-wrap { bottom: 16px; right: 16px; }
          .wa-btn { width: 52px; height: 52px; }
          .wa-icon { width: 26px; height: 26px; }
        }
      `}</style>

      {tooltipVisible && (
        <div className="wa-tooltip">💬 Escribinos por WhatsApp</div>
      )}

      <a
        href="https://wa.link/nrb6ix"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        aria-label="Contactar por WhatsApp"
      >
        <svg className="wa-icon" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
