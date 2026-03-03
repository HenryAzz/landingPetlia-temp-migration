const BlueSectionDivider = ({ text }: { text: string }) => {
  return (
    <div className="bsd-section">
      <style>{`
        .bsd-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 18vh;
          min-height: 120px;
          max-height: 200px;
        }

        .bsd-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bsd-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        .bsd-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .bsd-row {
          display: flex;
          align-items: center;
        }

        .bsd-line-left {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,221,163,0.4), rgba(249,221,163,0.6));
        }
        .bsd-line-right {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(249,221,163,0.6), rgba(249,221,163,0.4), transparent);
        }

        .bsd-pill {
          display: flex;
          align-items: center;
          border-radius: 50px;
          background-color: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(249,221,163,0.25);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          white-space: nowrap;
        }

        .bsd-star {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.06em;
        }

        .bsd-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-style: italic;
          color: rgba(249,221,163,0.85);
          letter-spacing: 0.06em;
        }

        .bsd-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.4;
        }

        .bsd-dot {
          color: #F9DDA3;
        }

        /* ══════════════════════════════
           DESKTOP
        ══════════════════════════════ */
        .bsd-content { gap: 1.2vw; }
        .bsd-row { gap: 1.5vw; width: 60vw; }
        .bsd-pill { gap: 0.6vw; padding: 0.5vw 1.8vw; }
        .bsd-star { font-size: clamp(13px, 1vw, 18px); }
        .bsd-text { font-size: clamp(13px, 1vw, 18px); }
        .bsd-dots { gap: 2vw; }
        .bsd-dot { font-size: clamp(8px, 0.5vw, 12px); }
        .bsd-dot-mid { font-size: clamp(6px, 0.35vw, 10px); }

        /* ══════════════════════════════
           TABLET (≤ 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .bsd-section {
            min-height: 100px;
            max-height: 160px;
          }
          .bsd-content { gap: 10px; }
          .bsd-row { gap: 14px; width: 75vw; }
          .bsd-pill { gap: 8px; padding: 8px 22px; }
          .bsd-star { font-size: 14px; }
          .bsd-text { font-size: 14px; }
          .bsd-dots { gap: 16px; }
          .bsd-dot { font-size: 8px; }
          .bsd-dot-mid { font-size: 6px; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .bsd-section {
            min-height: 90px;
            max-height: 140px;
          }
          .bsd-content { gap: 8px; }
          .bsd-row { gap: 12px; width: 85vw; }
          .bsd-pill { gap: 7px; padding: 7px 18px; }
          .bsd-star { font-size: 13px; }
          .bsd-text { font-size: 13px; }
          .bsd-dots { gap: 14px; }
          .bsd-dot { font-size: 7px; }
          .bsd-dot-mid { font-size: 5px; }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .bsd-section {
            min-height: 80px;
            max-height: 120px;
          }
          .bsd-content { gap: 7px; }
          .bsd-row { gap: 10px; width: 90vw; }
          .bsd-pill { gap: 6px; padding: 6px 16px; }
          .bsd-star { font-size: 12px; }
          .bsd-text { font-size: 12px; }
          .bsd-dots { gap: 12px; }
          .bsd-dot { font-size: 6px; }
          .bsd-dot-mid { font-size: 4px; }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════ */
        @media (max-width: 380px) {
          .bsd-section {
            min-height: 74px;
            max-height: 110px;
          }
          .bsd-content { gap: 6px; }
          .bsd-row { gap: 8px; width: 92vw; }
          .bsd-pill { gap: 5px; padding: 5px 14px; }
          .bsd-star { font-size: 11px; }
          .bsd-text { font-size: 11px; }
          .bsd-dots { gap: 10px; }
          .bsd-dot { font-size: 5px; }
          .bsd-dot-mid { font-size: 3.5px; }
        }

        /* ══════════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════════ */
        @media (max-width: 320px) {
          .bsd-section {
            min-height: 68px;
            max-height: 100px;
          }
          .bsd-content { gap: 5px; }
          .bsd-row { gap: 6px; width: 94vw; }
          .bsd-pill { gap: 4px; padding: 4px 12px; }
          .bsd-star { font-size: 10px; }
          .bsd-text { font-size: 10px; }
          .bsd-dots { gap: 8px; }
          .bsd-dot { font-size: 4px; }
          .bsd-dot-mid { font-size: 3px; }
        }
      `}</style>

      {/* Background */}
      <div className="bsd-bg">
        <img src="/fondoliso.jpeg" alt="" />
      </div>

      {/* Content */}
      <div className="bsd-content">
        <div className="bsd-row">
          <div className="bsd-line-left" />

          <div className="bsd-pill">
            <span className="bsd-star">✦</span>
            <span className="bsd-text">{text}</span>
            <span className="bsd-star">✦</span>
          </div>

          <div className="bsd-line-right" />
        </div>

        <div className="bsd-dots">
          <span className="bsd-dot">◆</span>
          <span className="bsd-dot bsd-dot-mid">◆</span>
          <span className="bsd-dot">◆</span>
        </div>
      </div>
    </div>
  );
};

export default BlueSectionDivider;