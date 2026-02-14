import { useEffect, useState, useRef } from 'react';

const EverythingGoodScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="eg-section">
      <style>{`
        .eg-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
        }

        @keyframes gentleSwing1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(-1px) rotate(-1.5deg); }
          75% { transform: translateY(-4px) rotate(1deg); }
        }
        @keyframes gentleSwing2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-2px) rotate(-2deg); }
          60% { transform: translateY(-4px) rotate(1.5deg); }
          85% { transform: translateY(-1px) rotate(-0.5deg); }
        }
        @keyframes gentleSwing3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          20% { transform: translateY(-3px) rotate(1.5deg); }
          55% { transform: translateY(-2px) rotate(-2deg); }
          80% { transform: translateY(-4px) rotate(0.8deg); }
        }
        .gentle-swing-1 { animation: gentleSwing1 5s ease-in-out infinite; }
        .gentle-swing-2 { animation: gentleSwing2 5.5s ease-in-out infinite; animation-delay: 0.8s; }
        .gentle-swing-3 { animation: gentleSwing3 4.8s ease-in-out infinite; animation-delay: 1.5s; }

        .eg-pill {
          display: inline-flex;
          align-items: center;
          border-radius: 50px;
          background-color: #FFFFFF;
          border: 1.5px solid rgba(246,158,130,0.25);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          color: #7A5C4F;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          white-space: nowrap;
          cursor: default;
          transition: all 0.3s ease;
        }
        .eg-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .eg-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(246,158,130,0.75), rgba(246,158,130,0.55));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.45);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(246,158,130,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .eg-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .eg-cta:hover::before { left: 100%; }
        .eg-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(246,158,130,0.3), 0 0 0 1px rgba(255,255,255,0.5) inset;
        }
        .eg-cta:active { transform: scale(0.97); }

        .eg-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #F69E82;
          line-height: 1.3;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .eg-title span { font-weight: 600; }

        .eg-body {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          line-height: 1.8;
          letter-spacing: 0.02em;
        }
        .eg-body p { margin: 0; }

        .eg-limits-card {
          background-color: #FFFFFF;
          border: 1.5px solid rgba(246,158,130,0.2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          align-items: flex-start;
        }
        .eg-limits-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #7A5C4F;
          margin: 0;
        }
        .eg-limits-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #7A7A7A;
          line-height: 1.6;
          margin: 0;
        }

        /* ── Entrance ── */
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pillPop {
          0% { opacity: 0; transform: scale(0.7) translateY(10px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardSlideUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes iconFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeScaleUp {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .entrance-eg-image { opacity: 0; }
        .entrance-eg-image.animate { animation: fadeSlideRight 1s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.15s; }
        .entrance-eg-title { opacity: 0; }
        .entrance-eg-title.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.1s; }
        .entrance-eg-pills { opacity: 0; }
        .entrance-eg-pills.animate { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.35s; }
        .entrance-eg-pill { opacity: 0; }
        .entrance-eg-pill.animate { animation: pillPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .entrance-eg-pill.animate:nth-child(1) { animation-delay: 0.45s; }
        .entrance-eg-pill.animate:nth-child(2) { animation-delay: 0.55s; }
        .entrance-eg-pill.animate:nth-child(3) { animation-delay: 0.65s; }
        .entrance-eg-text1 { opacity: 0; }
        .entrance-eg-text1.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.55s; }
        .entrance-eg-text2 { opacity: 0; }
        .entrance-eg-text2.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.7s; }
        .entrance-eg-card { opacity: 0; }
        .entrance-eg-card.animate { animation: cardSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.85s; }
        .entrance-eg-cta { opacity: 0; }
        .entrance-eg-cta.animate { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 1s; }

        .eg-icon-wrapper { opacity: 0; }
        .eg-icon-wrapper.animate-eg-icon-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.7s; }
        .eg-icon-wrapper.animate-eg-icon-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.9s; }
        .eg-icon-wrapper.animate-eg-icon-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 1.1s; }

        .entrance-eg-image-mobile { opacity: 0; }
        .entrance-eg-image-mobile.animate { animation: fadeScaleUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.6s; }

        /* ══════════════════════════════
           DESKTOP (> 1024px)
           Exactly like original: 45% / 55%
        ══════════════════════════════ */
        .eg-section {
          height: 100vh;
          min-height: 100vh;
        }

        .eg-layout {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          min-height: 0;
          width: 100%;
        }

        /* Desktop left — original layout */
        .eg-left {
          width: 45%;
          height: 100%;
          flex-shrink: 0;
          position: relative;
        }
        .eg-left-image {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: left bottom;
        }

        /* Mobile image — hidden on desktop */
        .eg-image-mobile { display: none; }

        /* Desktop right — original layout */
        .eg-right {
          width: 55%;
          height: 100%;
          flex-shrink: 0;
          position: relative;
          display: flex;
          align-items: center;
        }
        .eg-right-inner {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          width: 100%;
          max-width: 45vw;
          padding-left: 3vw;
          padding-right: 6vw;
          gap: 1.8vw;
        }

        /* Desktop sizes */
        .eg-title { font-size: 3.2vw; white-space: nowrap; }
        .eg-pills-row { gap: 0.6vw; }
        .eg-pill { gap: 0.4vw; padding: 0.45vw 1.15vw; font-size: 0.88vw; }
        .eg-pill-emoji { font-size: 0.9vw; }
        .eg-body { font-size: 1.15vw; }
        .eg-body-gap { margin-bottom: 1.2vw; }
        .eg-limits-card { padding: 1vw 1.4vw; border-radius: 14px; gap: 0.8vw; }
        .eg-limits-emoji { font-size: 1.1vw; flex-shrink: 0; margin-top: 0.1vw; }
        .eg-limits-title { font-size: 0.85vw; margin-bottom: 0.3vw; }
        .eg-limits-text { font-size: 0.78vw; }
        .eg-cta { gap: 0.5vw; padding: 0.7vw 2.2vw; font-size: 0.95vw; align-self: flex-start; }
        .eg-cta-icon { width: 1.1vw; height: 1.1vw; }

        .eg-deco { position: absolute; pointer-events: none; }
        .eg-deco-1 { right: -4vw; top: -3vw; width: clamp(35px,4.5vw,75px); height: clamp(35px,4.5vw,75px); }
        .eg-deco-2 { right: -4vw; top: 50%; width: clamp(35px,4.5vw,75px); height: clamp(35px,4.5vw,75px); }
        .eg-deco-3 { right: -4vw; bottom: -3vw; width: clamp(35px,4.5vw,75px); height: clamp(35px,4.5vw,75px); }

        /* ══════════════════════════════
           TABLET (769px – 1024px)
           Text on top, image below full-width
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .eg-section {
            height: auto;
            min-height: auto;
            padding-top: 70px;
            padding-bottom: 0;
          }

          .eg-layout {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          /* Hide desktop image */
          .eg-left { display: none; }

          /* Show mobile image — full width, flush left, margin-right only */
          .eg-image-mobile {
            display: block;
            width: 100%;
            order: 2;
            padding-right: 2vw;
            padding-left: 0;
          }
          .eg-image-mobile img {
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: left bottom;
            display: block;
          }

          .eg-right {
            width: 100%;
            height: auto;
            order: 1;
          }
          .eg-right-inner {
            align-items: center;
            text-align: center;
            max-width: 100%;
            padding: 0 40px;
            gap: 20px;
          }

          .eg-title { font-size: 32px; white-space: normal; }
          .eg-pills-row { gap: 8px; flex-wrap: wrap; justify-content: center; }
          .eg-pill { gap: 6px; padding: 8px 18px; font-size: 13px; }
          .eg-pill-emoji { font-size: 14px; }
          .eg-body { font-size: 15px; max-width: 520px; }
          .eg-body-gap { margin-bottom: 14px; }
          .eg-limits-card { padding: 16px 20px; border-radius: 14px; gap: 12px; text-align: left; max-width: 520px; }
          .eg-limits-emoji { font-size: 16px; }
          .eg-limits-title { font-size: 13.5px; margin-bottom: 4px; }
          .eg-limits-text { font-size: 12.5px; }
          .eg-cta { gap: 7px; padding: 13px 30px; font-size: 14.5px; align-self: center; }
          .eg-cta-icon { width: 15px; height: 15px; }

          .eg-deco-1 { right: 20px; top: -10px; width: 42px; height: 42px; }
          .eg-deco-2 { right: 16px; top: 50%; width: 38px; height: 38px; }
          .eg-deco-3 { right: 20px; bottom: -10px; width: 36px; height: 36px; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .eg-section { padding-top: 56px; }
          .eg-layout { gap: 32px; }

          .eg-right-inner { padding: 0 24px; gap: 16px; }

          .eg-image-mobile {
            padding-right: 2vw;
          }

          .eg-title { font-size: 26px; }
          .eg-pills-row { gap: 7px; }
          .eg-pill { gap: 5px; padding: 7px 14px; font-size: 12.5px; }
          .eg-pill-emoji { font-size: 13px; }
          .eg-body { font-size: 14px; max-width: 400px; }
          .eg-body-gap { margin-bottom: 12px; }
          .eg-limits-card { padding: 14px 16px; border-radius: 12px; gap: 10px; max-width: 400px; }
          .eg-limits-emoji { font-size: 15px; }
          .eg-limits-title { font-size: 13px; }
          .eg-limits-text { font-size: 12px; }
          .eg-cta { gap: 6px; padding: 12px 26px; font-size: 13.5px; }
          .eg-cta-icon { width: 14px; height: 14px; }

          .eg-deco-1 { right: 14px; top: -6px; width: 36px; height: 36px; }
          .eg-deco-2 { right: 10px; width: 32px; height: 32px; }
          .eg-deco-3 { right: 14px; bottom: -6px; width: 30px; height: 30px; }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .eg-section { padding-top: 48px; }
          .eg-layout { gap: 28px; }

          .eg-right-inner { padding: 0 18px; gap: 14px; }

          .eg-image-mobile {
            padding-right: 2vw;
          }

          .eg-title { font-size: 22px; }
          .eg-pill { gap: 4px; padding: 6px 12px; font-size: 11.5px; }
          .eg-pill-emoji { font-size: 12px; }
          .eg-body { font-size: 13px; max-width: 340px; }
          .eg-body-gap { margin-bottom: 10px; }
          .eg-limits-card { padding: 12px 14px; border-radius: 11px; gap: 8px; max-width: 340px; }
          .eg-limits-emoji { font-size: 14px; }
          .eg-limits-title { font-size: 12.5px; }
          .eg-limits-text { font-size: 11.5px; }
          .eg-cta { gap: 5px; padding: 11px 22px; font-size: 13px; }
          .eg-cta-icon { width: 13px; height: 13px; }

          .eg-deco-1 { right: 10px; width: 30px; height: 30px; }
          .eg-deco-2 { right: 8px; width: 26px; height: 26px; }
          .eg-deco-3 { right: 10px; width: 24px; height: 24px; }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════ */
        @media (max-width: 380px) {
          .eg-section { padding-top: 42px; }
          .eg-layout { gap: 24px; }
          .eg-right-inner { padding: 0 14px; gap: 12px; }

          .eg-title { font-size: 20px; }
          .eg-pill { padding: 5px 10px; font-size: 11px; }
          .eg-body { font-size: 12.5px; max-width: 300px; }
          .eg-limits-card { padding: 10px 12px; border-radius: 10px; max-width: 300px; }
          .eg-limits-title { font-size: 12px; }
          .eg-limits-text { font-size: 11px; }
          .eg-cta { padding: 10px 20px; font-size: 12.5px; }

          .eg-deco-1 { width: 26px; height: 26px; }
          .eg-deco-2 { width: 22px; height: 22px; }
          .eg-deco-3 { width: 20px; height: 20px; }
        }

        /* ══════════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════════ */
        @media (max-width: 320px) {
          .eg-section { padding-top: 36px; }
          .eg-layout { gap: 20px; }
          .eg-right-inner { padding: 0 12px; gap: 10px; }

          .eg-title { font-size: 18px; }
          .eg-pill { padding: 4px 9px; font-size: 10.5px; }
          .eg-body { font-size: 12px; max-width: 270px; }
          .eg-limits-card { padding: 9px 10px; max-width: 270px; }
          .eg-limits-title { font-size: 11.5px; }
          .eg-limits-text { font-size: 10.5px; }
          .eg-cta { padding: 9px 18px; font-size: 12px; }

          .eg-deco-1, .eg-deco-2, .eg-deco-3 { display: none; }
        }
      `}</style>

      <div className="eg-layout">
        {/* ── LEFT: Image (desktop only) — exactly like original ── */}
        <div className="eg-left">
          <img
            src="/beso.png"
            alt="Beso"
            className={`eg-left-image entrance-eg-image ${hasAnimated ? 'animate' : ''}`}
          />
        </div>

        {/* ── RIGHT: Text content ── */}
        <div className="eg-right">
          <div className="eg-right-inner">
            <div className={`eg-deco eg-deco-1 eg-icon-wrapper ${hasAnimated ? 'animate-eg-icon-1' : ''}`}>
              <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'gentle-swing-1' : ''}`} />
            </div>

            <h2 className={`eg-title entrance-eg-title ${hasAnimated ? 'animate' : ''}`}>
              Todo lo que te hace <span>bien</span>,
              <br />
              sin todo lo que incomoda.
            </h2>

            <div className={`flex items-center eg-pills-row entrance-eg-pills ${hasAnimated ? 'animate' : ''}`}>
              {[
                { emoji: '🤗', label: 'Sin presiones' },
                { emoji: '🌸', label: 'A tu ritmo' },
                { emoji: '🔒', label: 'Sin compromisos' },
              ].map((item, i) => (
                <span key={i} className={`eg-pill entrance-eg-pill ${hasAnimated ? 'animate' : ''}`}>
                  <span className="eg-pill-emoji">{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>

            <div className={`eg-deco eg-deco-2 eg-icon-wrapper ${hasAnimated ? 'animate-eg-icon-2' : ''}`}>
              <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'gentle-swing-2' : ''}`} />
            </div>

            <div className="eg-body">
              <p className={`eg-body-gap entrance-eg-text1 ${hasAnimated ? 'animate' : ''}`}>
                Con un gran sentido del humor, dulce y elocuente, Camil crea un espacio donde podés ser vos sin explicaciones.
              </p>
              <p className={`entrance-eg-text2 ${hasAnimated ? 'animate' : ''}`}>
                Atenta a tus gustos y momentos especiales, te acompaña marcando un antes y un después en tu vida.
              </p>
            </div>

            <div className={`eg-limits-card entrance-eg-card ${hasAnimated ? 'animate' : ''}`}>
              <span className="eg-limits-emoji">🤍</span>
              <div>
                <p className="eg-limits-title">Compañía genuina, con límites claros</p>
                <p className="eg-limits-text">
                  Camil ofrece contención emocional, conversación y entretenimiento en un marco de respeto mutuo. No es un servicio de citas ni de contenido para adultos.
                </p>
              </div>
            </div>

            <button
              type="button"
              className={`eg-cta entrance-eg-cta ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('vinculos')}
            >
              Conocé los vínculos
              <svg className="eg-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <div className={`eg-deco eg-deco-3 eg-icon-wrapper ${hasAnimated ? 'animate-eg-icon-3' : ''}`}>
              <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'gentle-swing-3' : ''}`} />
            </div>
          </div>
        </div>

        {/* ── IMAGE: Mobile/Tablet — full width, flush left, 2vw margin right ── */}
        <div className={`eg-image-mobile entrance-eg-image-mobile ${hasAnimated ? 'animate' : ''}`}>
          <img src="/beso.png" alt="Beso" />
        </div>
      </div>
    </section>
  );
};

export default EverythingGoodScreen;