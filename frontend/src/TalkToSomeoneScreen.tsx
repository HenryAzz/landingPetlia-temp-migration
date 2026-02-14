import { useEffect, useState, useRef } from 'react';

const TalkToSomeoneScreen = () => {
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
    <section ref={sectionRef} id="que-es" className="tts-section">
      <style>{`
        .tts-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
        }

        @keyframes floatHeartLeft {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          25% { transform: translateY(-8px) scale(1.04) rotate(1.5deg); }
          50% { transform: translateY(-14px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.03) rotate(0.5deg); }
        }
        @keyframes floatLetterTop {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          20% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-6px) rotate(-2.5deg); }
          70% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes floatLetterBottom {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-7px) rotate(1.5deg); }
          60% { transform: translateY(-11px) rotate(-1.5deg); }
          85% { transform: translateY(-4px) rotate(0.8deg); }
        }
        @keyframes floatHeartRight {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          20% { transform: translateY(-6px) scale(1.02) rotate(-1deg); }
          50% { transform: translateY(-12px) scale(1.05) rotate(1.5deg); }
          80% { transform: translateY(-5px) scale(1.01) rotate(-0.5deg); }
        }
        .float-heart-left   { animation: floatHeartLeft   3.4s ease-in-out infinite; }
        .float-letter-top    { animation: floatLetterTop   4s   ease-in-out infinite; animation-delay: 0.6s; }
        .float-letter-bottom { animation: floatLetterBottom 3.8s ease-in-out infinite; animation-delay: 1.1s; }
        .float-heart-right   { animation: floatHeartRight  3.6s ease-in-out infinite; animation-delay: 0.4s; }

        .tts-pill {
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
        .tts-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .tts-cta {
          display: inline-flex;
          align-items: center;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(246,158,130,0.75), rgba(246,158,130,0.55));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.45);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(246,158,130,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .tts-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(246,158,130,0.3);
        }
        .tts-cta:active { transform: scale(0.97); }

        .tts-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #F69E82;
          line-height: 1.3;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .tts-title span { font-weight: 600; }

        .tts-body {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          line-height: 1.8;
          letter-spacing: 0.02em;
        }
        .tts-body p { margin: 0; }

        /* ── Entrance ── */
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pillPop {
          0% { opacity: 0; transform: scale(0.7) translateY(10px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes iconFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-tts-title { opacity: 0; }
        .entrance-tts-title.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.1s; }
        .entrance-tts-pills { opacity: 0; }
        .entrance-tts-pills.animate { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.35s; }
        .entrance-tts-pill { opacity: 0; }
        .entrance-tts-pill.animate { animation: pillPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .entrance-tts-pill.animate:nth-child(1) { animation-delay: 0.45s; }
        .entrance-tts-pill.animate:nth-child(2) { animation-delay: 0.55s; }
        .entrance-tts-pill.animate:nth-child(3) { animation-delay: 0.65s; }
        .entrance-tts-pill.animate:nth-child(4) { animation-delay: 0.75s; }
        .entrance-tts-text1 { opacity: 0; }
        .entrance-tts-text1.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.55s; }
        .entrance-tts-text2 { opacity: 0; }
        .entrance-tts-text2.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.7s; }
        .entrance-tts-cta { opacity: 0; }
        .entrance-tts-cta.animate { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.9s; }
        .entrance-tts-phone { opacity: 0; }
        .entrance-tts-phone.animate { animation: fadeScaleIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.3s; }

        .tts-icon-wrapper { opacity: 0; }
        .tts-icon-wrapper.animate-tts-icon-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.8s; }
        .tts-icon-wrapper.animate-tts-icon-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.95s; }
        .tts-icon-wrapper.animate-tts-icon-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 1.1s; }
        .tts-icon-wrapper.animate-tts-icon-4 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 1.25s; }

        /* ══════════════════════════════
           DESKTOP (> 1024px)
        ══════════════════════════════ */
        .tts-section {
          min-height: 100vh;
          padding-top: 90px;
        }

        .tts-layout {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          min-height: 0;
          width: 100%;
        }

        .tts-left {
          width: 65%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tts-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          max-width: 55vw;
          padding-left: 6vw;
          gap: 1.8vw;
        }

        .tts-right {
          width: 35%;
          height: 100%;
          flex-shrink: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Phone area — relative container, icons positioned relative to this */
        .tts-phone-area {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-2.5vw);
        }

        .tts-title { font-size: 3.2vw; }
        .tts-pills-row { gap: 0.6vw; }
        .tts-pill { gap: 0.4vw; padding: 0.45vw 1.15vw; font-size: 0.88vw; }
        .tts-pill-emoji { font-size: 0.9vw; }
        .tts-body { font-size: 1.15vw; max-width: 42vw; }
        .tts-body-gap { margin-bottom: 1.2vw; }
        .tts-cta { gap: 0.5vw; padding: 0.6vw 1.8vw; font-size: 0.95vw; }
        .tts-cta-icon { width: 1vw; height: 1vw; }
        .tts-phone-img { width: clamp(200px, 22vw, 420px); }

        /* Icons positioned relative to phone-area container */
        .tts-deco { position: absolute; z-index: 20; pointer-events: none; }
        .tts-deco-size { width: clamp(40px, 5.5vw, 90px); height: clamp(40px, 5.5vw, 90px); }
        .tts-deco-1 { left: -20%; bottom: 10%; }
        .tts-deco-2 { left: -25%; top: 8%; }
        .tts-deco-3 { right: -20%; bottom: 10%; }
        .tts-deco-4 { right: -25%; top: 8%; }

        /* ══════════════════════════════
           TABLET (769px – 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .tts-section {
            min-height: auto;
            padding-top: 80px;
            padding-bottom: 60px;
          }

          .tts-layout {
            flex-direction: column;
            align-items: center;
            gap: 48px;
          }

          .tts-left { width: 100%; height: auto; }
          .tts-left-inner {
            align-items: center;
            text-align: center;
            max-width: 100%;
            padding: 0 40px;
            gap: 20px;
          }

          .tts-right { width: 100%; height: auto; justify-content: center; }
          .tts-phone-area {
            transform: none;
          }

          .tts-title { font-size: 34px; }
          .tts-pills-row { gap: 8px; flex-wrap: wrap; justify-content: center; }
          .tts-pill { gap: 6px; padding: 8px 18px; font-size: 13px; }
          .tts-pill-emoji { font-size: 14px; }
          .tts-body { font-size: 15px; max-width: 520px; }
          .tts-body-gap { margin-bottom: 14px; }
          .tts-cta { gap: 7px; padding: 13px 30px; font-size: 14.5px; }
          .tts-cta-icon { width: 15px; height: 15px; }
          .tts-phone-img { width: 240px; }

          .tts-deco-size { width: 52px; height: 52px; }
          .tts-deco-1 { left: -18%; bottom: 8%; }
          .tts-deco-2 { left: -22%; top: 6%; }
          .tts-deco-3 { right: -18%; bottom: 8%; }
          .tts-deco-4 { right: -22%; top: 6%; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .tts-section {
            padding-top: 70px;
            padding-bottom: 50px;
          }

          .tts-layout { gap: 40px; }
          .tts-left-inner { padding: 0 24px; gap: 16px; }

          .tts-title { font-size: 28px; }
          .tts-pills-row { gap: 7px; }
          .tts-pill { gap: 5px; padding: 7px 14px; font-size: 12.5px; }
          .tts-pill-emoji { font-size: 13px; }
          .tts-body { font-size: 14px; max-width: 400px; }
          .tts-body-gap { margin-bottom: 12px; }
          .tts-cta { gap: 6px; padding: 12px 26px; font-size: 13.5px; }
          .tts-cta-icon { width: 14px; height: 14px; }
          .tts-phone-img { width: 200px; }

          .tts-deco-size { width: 42px; height: 42px; }
           .tts-deco-1 {left: -15%; top:50%; }
          .tts-deco-2 { left: -10%; top:10%; }
          .tts-deco-3 { right: -5%; top:75%; }
          .tts-deco-4 { right: -10%; top: 25%; 
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .tts-section {
            padding-top: 60px;
            padding-bottom: 44px;
          }

          .tts-layout { gap: 34px; }
          .tts-left-inner { padding: 0 18px; gap: 14px; }

          .tts-title { font-size: 24px; }
          .tts-pills-row { gap: 6px; }
          .tts-pill { gap: 4px; padding: 6px 12px; font-size: 11.5px; }
          .tts-pill-emoji { font-size: 12px; }
          .tts-body { font-size: 13px; max-width: 340px; }
          .tts-body-gap { margin-bottom: 10px; }
          .tts-cta { gap: 5px; padding: 11px 22px; font-size: 13px; }
          .tts-cta-icon { width: 13px; height: 13px; }
          .tts-phone-img { width: 175px; }

          .tts-deco-size { width: 36px; height: 36px; }
           .tts-deco-1 {left: -15%; top:50%; }
          .tts-deco-2 { left: -10%; top:10%; }
          .tts-deco-3 { right: -5%; top:75%; }
          .tts-deco-4 { right: -10%; top: 25%; 
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════ */
        @media (max-width: 380px) {
          .tts-section { padding-top: 54px; padding-bottom: 40px; }
          .tts-layout { gap: 30px; }
          .tts-left-inner { padding: 0 14px; gap: 12px; }

          .tts-title { font-size: 21px; }
          .tts-pill { padding: 5px 10px; font-size: 11px; }
          .tts-body { font-size: 12.5px; max-width: 300px; }
          .tts-cta { padding: 10px 20px; font-size: 12.5px; }
          .tts-phone-img { width: 155px; }

          .tts-deco-size { width: 30px; height: 30px; }
        }

        /* ══════════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════════ */
        @media (max-width: 320px) {
          .tts-section { padding-top: 48px; padding-bottom: 36px; }
          .tts-layout { gap: 26px; }
          .tts-left-inner { padding: 0 12px; gap: 10px; }

          .tts-title { font-size: 19px; }
          .tts-pill { padding: 4px 9px; font-size: 10.5px; }
          .tts-pill-emoji { font-size: 10.5px; }
          .tts-body { font-size: 12px; max-width: 270px; }
          .tts-cta { padding: 9px 18px; font-size: 12px; }
          .tts-cta-icon { width: 12px; height: 12px; }
          .tts-phone-img { width: 140px; }

          .tts-deco-size { width: 26px; height: 26px; }
          .tts-deco-1 {left: -15%; top:50%; }
          .tts-deco-2 { left: -10%; top:10%; }
          .tts-deco-3 { right: -5%; top:75%; }
          .tts-deco-4 { right: -10%; top: 25%; 
        }
      `}</style>

      <div className="tts-layout">
        {/* ── LEFT ── */}
        <div className="tts-left">
          <div className="tts-left-inner">
            <h2 className={`tts-title entrance-tts-title ${hasAnimated ? 'animate' : ''}`}>
              Habla con alguien <span>real</span>
              <br />
              que te dedica toda su atención
            </h2>

            <div className={`flex items-center tts-pills-row entrance-tts-pills ${hasAnimated ? 'animate' : ''}`}>
              {[
                { emoji: '✉️', label: 'Cartas' },
                { emoji: '💬', label: 'Mensajes' },
                { emoji: '📞', label: 'Llamadas' },
                { emoji: '🎥', label: 'Citas virtuales' },
              ].map((item, i) => (
                <span key={i} className={`tts-pill entrance-tts-pill ${hasAnimated ? 'animate' : ''}`}>
                  <span className="tts-pill-emoji">{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>

            <div className="tts-body">
              <p className={`tts-body-gap entrance-tts-text1 ${hasAnimated ? 'animate' : ''}`}>
                En un mundo donde la tecnología nos conecta pero la distancia nos separa, Camil abre un espacio cálido y genuino para quienes necesitan ser escuchados.
              </p>
              <p className={`entrance-tts-text2 ${hasAnimated ? 'animate' : ''}`}>
                Su deseo es dar amor y comprensión, risas, juegos y entretenimiento a través de mensajes, llamadas y citas virtuales.
              </p>
            </div>

            <button
              type="button"
              className={`tts-cta entrance-tts-cta ${hasAnimated ? 'animate' : ''}`}
              onClick={() => scrollToSection('como-funciona')}
            >
              ¿Cómo funciona?
              <svg className="tts-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="tts-right">
          <div className="tts-phone-area">
            <img
              src="/celulargrande.png"
              alt="Celular con conversación"
              className={`relative z-10 object-contain tts-phone-img entrance-tts-phone ${hasAnimated ? 'animate' : ''}`}
              style={{ height: 'auto' }}
            />

            {/* Icons close to phone — positioned relative to phone-area */}
            <div className={`tts-deco tts-deco-1 tts-deco-size tts-icon-wrapper ${hasAnimated ? 'animate-tts-icon-1' : ''}`}>
              <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'float-heart-left' : ''}`} />
            </div>
            <div className={`tts-deco tts-deco-2 tts-deco-size tts-icon-wrapper ${hasAnimated ? 'animate-tts-icon-2' : ''}`}>
              <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'float-letter-top' : ''}`} />
            </div>
            <div className={`tts-deco tts-deco-3 tts-deco-size tts-icon-wrapper ${hasAnimated ? 'animate-tts-icon-3' : ''}`}>
              <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'float-letter-bottom' : ''}`} />
            </div>
            <div className={`tts-deco tts-deco-4 tts-deco-size tts-icon-wrapper ${hasAnimated ? 'animate-tts-icon-4' : ''}`}>
              <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'float-heart-right' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToSomeoneScreen;