import { useState, useEffect, useRef } from 'react';

const FAQS = [
  {
    question: '¿Camil es una persona real?',
    answer: 'Sí, absolutamente. Camil es una persona real, con sentimientos, humor y dedicación genuina. No es un bot, no es inteligencia artificial. Cada mensaje, cada carta y cada llamada es auténtica.',
  },
  {
    question: '¿Qué tipo de servicio es este exactamente?',
    answer: 'Camil ofrece compañía emocional y entretenimiento: conversaciones, cartas, llamadas y citas virtuales en un marco de respeto y contención. Es un vínculo de amistad y calidez humana. No es un servicio de citas románticas ni incluye contenido íntimo de ningún tipo.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer: 'Sí, podés cancelar tu suscripción en cualquier momento sin penalidad. No hay permanencia mínima ni cargos ocultos. Queremos que estés porque querés, no porque tenés que.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Totalmente. Toda tu información personal se mantiene confidencial. No compartimos datos con terceros bajo ninguna circunstancia. Las conversaciones son privadas y protegidas.',
  },
  {
    question: '¿Cómo es la primera experiencia?',
    answer: 'Una vez que completás el formulario, el equipo de Camil te contacta a la brevedad para conocerte, entender qué buscás y coordinar todo. Desde el primer momento vas a sentir la calidez que nos caracteriza.',
  },
  {
    question: '¿Por qué no se muestra el rostro de Camil?',
    answer: 'Por seguridad y privacidad de Camil, su identidad visual se mantiene en reserva. Esto no afecta la experiencia — la conexión se construye a través de la palabra, la voz y la presencia. Lo que sentís es real.',
  },
  {
    question: '¿Puedo cambiar de plan?',
    answer: 'Sí, podés subir o bajar de plan cuando quieras. El cambio se aplica en el siguiente ciclo de facturación. Nuestro equipo te ayuda con la transición.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria, Mercado Pago y tarjetas de crédito/débito. El pago es mensual y se coordina al momento de la inscripción.',
  },
];

const FAQScreen = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const measure = () => {
      setHeights(contentRefs.current.map((el) => el?.scrollHeight || 0));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mounted]);

  useEffect(() => {
    const t = setTimeout(() => {
      setHeights(contentRefs.current.map((el) => el?.scrollHeight || 0));
    }, 50);
    return () => clearTimeout(t);
  }, [openIndex]);

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
    <section ref={sectionRef} id="faq" className="faq-section">
      <style>{`
        /* ═══════════════════════════════
           BASE
        ═══════════════════════════════ */
        .faq-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
          padding-top: clamp(50px, 6vw, 100px);
          padding-bottom: clamp(50px, 6vw, 100px);
        }

        /* ═══ LAYOUT ═══ */
        .faq-layout {
          position: relative;
          z-index: 10;
          display: flex;
          width: 100%;
          padding-left: 6vw;
          padding-right: 6vw;
          gap: 4vw;
        }

        .faq-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex-shrink: 0;
          width: 30%;
          padding-top: 1vw;
        }

        .faq-right {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.8vw;
          min-width: 0;
        }

        /* ═══ ACCENT ═══ */
        .faq-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: clamp(12px, 1.2vw, 18px);
          opacity: 0;
        }

        /* ═══ LABEL ═══ */
        .faq-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 1vw, 13px);
          letter-spacing: 0.22em;
          color: #F69E82;
          text-transform: uppercase;
          margin-bottom: clamp(12px, 1.2vw, 18px);
          opacity: 0;
        }

        /* ═══ TITLE ═══ */
        .faq-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.25;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 clamp(10px, 1vw, 16px);
          opacity: 0;
        }

        .faq-title-light {
          font-weight: 400;
          color: #555;
        }

        /* ═══ DESC ═══ */
        .faq-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.2vw, 18px);
          color: #888;
          line-height: 1.7;
          margin: 0 0 clamp(16px, 1.5vw, 24px);
          max-width: clamp(240px, 20vw, 340px);
          opacity: 0;
        }

        /* ═══ CTA ═══ */
        .faq-btn {
          display: inline-flex;
          align-items: center;
          gap: clamp(6px, 0.5vw, 10px);
          padding: clamp(11px, 0.7vw, 15px) clamp(24px, 1.8vw, 34px);
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 0.9vw, 15px);
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(246,158,130,0.25), 0 1px 3px rgba(0,0,0,0.06);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
          margin-bottom: clamp(8px, 0.6vw, 14px);
        }

        .faq-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .faq-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(246,158,130,0.35), 0 2px 8px rgba(0,0,0,0.06);
        }

        .faq-btn:hover::before { opacity: 1; }

        .faq-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(246,158,130,0.2);
        }

        .faq-btn-arrow {
          width: clamp(13px, 0.9vw, 16px);
          height: clamp(13px, 0.9vw, 16px);
          transition: transform 0.3s ease;
        }

        .faq-btn:hover .faq-btn-arrow {
          transform: translateX(3px);
        }

        .faq-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10.5px, 0.75vw, 12px);
          color: #BBB;
          letter-spacing: 0.03em;
          opacity: 0;
        }

        /* ═══ ACCORDION ITEMS ═══ */
        .faq-item {
          cursor: pointer;
          border-radius: clamp(12px, 1vw, 16px);
          padding: clamp(14px, 1.2vw, 22px) clamp(16px, 1.5vw, 26px);
          background: rgba(255,255,255,0.4);
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          opacity: 0;
        }

        .faq-item:hover {
          border-color: rgba(246,158,130,0.35);
        }

        .faq-item--open {
          background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5));
          border-color: rgba(246,158,130,0.3);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }

        .faq-q-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 1vw, 14px);
        }

        .faq-question {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(13px, 1vw, 16px);
          margin: 0;
          flex: 1;
          min-width: 0;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
          line-height: 1.4;
        }

        .faq-question--open {
          color: #F69E82;
          font-weight: 500;
        }

        .faq-question--closed {
          color: #3A3A3A;
          font-weight: 400;
        }

        .faq-chevron {
          width: clamp(15px, 1.2vw, 20px);
          height: clamp(15px, 1.2vw, 20px);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .faq-chevron--open {
          transform: rotate(180deg);
        }

        /* ═══ ANSWER COLLAPSE ═══ */
        .faq-answer-wrap {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        }

        .faq-answer-wrap--open {
          opacity: 1;
        }

        .faq-answer-wrap--closed {
          max-height: 0px !important;
          opacity: 0;
        }

        .faq-answer-inner {
          padding-top: clamp(8px, 0.8vw, 14px);
        }

        .faq-answer-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          font-size: clamp(12px, 0.88vw, 15px);
          line-height: 1.7;
          letter-spacing: 0.01em;
          margin: 0;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        /* ═══ FLOATING DECO ═══ */
        .faq-deco {
          position: absolute;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }

        .faq-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes faqF1 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.06) rotate(2deg); }
        }
        @keyframes faqF2 {
          0%, 100% { transform: scale(1.03) rotate(0deg); }
          50% { transform: scale(0.97) rotate(-1.5deg); }
        }
        @keyframes faqF3 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1.5deg); }
        }

        .faq-fl-1 { animation: faqF1 4s ease-in-out infinite; }
        .faq-fl-2 { animation: faqF2 4.8s ease-in-out infinite; }
        .faq-fl-3 { animation: faqF3 3.6s ease-in-out infinite; }

        /* ═══ ENTRANCE ═══ */
        @keyframes faqUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqSlide {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes faqItemIn {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes faqItemUpIn {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .faq-a-up { animation: faqUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .faq-a-slide { animation: faqSlide 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .faq-a-item { animation: faqItemIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .faq-a-pop { animation: faqPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }

        /* ═══ RESPONSIVE: TABLET ≤ 1024px ═══ */
        @media (max-width: 1024px) {
          .faq-section {
            padding-top: 70px;
            padding-bottom: 70px;
          }

          .faq-layout {
            flex-direction: column;
            align-items: center;
            padding-left: 40px;
            padding-right: 40px;
            gap: 36px;
          }

          .faq-left {
            width: 100%;
            align-items: center;
            text-align: center;
            padding-top: 0;
          }

          .faq-right {
            width: 100%;
            max-width: 640px;
            gap: 12px;
          }

          .faq-desc { max-width: 440px; }

          .faq-deco { display: none !important; }

          .faq-a-slide { animation-name: faqUp; }
          .faq-a-item { animation-name: faqItemUpIn; }
        }

        /* ═══ RESPONSIVE: MOBILE ≤ 768px ═══ */
        @media (max-width: 768px) {
          .faq-section {
            padding-top: 56px;
            padding-bottom: 56px;
          }

          .faq-layout {
            padding-left: 24px;
            padding-right: 24px;
            gap: 28px;
          }

          .faq-right {
            max-width: 100%;
            gap: 10px;
          }

          .faq-title { font-size: clamp(24px, 5.5vw, 30px); }
          .faq-desc { font-size: 14px; max-width: 360px; }

          .faq-item { padding: 16px 18px; }
          .faq-question { font-size: 14.5px; }
          .faq-answer-text { font-size: 13.5px; line-height: 1.65; }

          .faq-btn { padding: 12px 26px; font-size: 14px; }
        }

        /* ═══ RESPONSIVE: SMALL ≤ 540px ═══ */
        @media (max-width: 540px) {
          .faq-section {
            padding-top: 48px;
            padding-bottom: 48px;
          }

          .faq-layout {
            padding-left: 20px;
            padding-right: 20px;
            gap: 24px;
          }

          .faq-title { font-size: clamp(22px, 5vw, 26px); }
          .faq-label { font-size: 10px; }
          .faq-desc { font-size: 13px; max-width: 320px; }

          .faq-right { gap: 8px; }
          .faq-item { padding: 14px 16px; border-radius: 12px; }
          .faq-question { font-size: 13.5px; }
          .faq-answer-text { font-size: 13px; }

          .faq-btn { padding: 11px 24px; font-size: 13px; }
        }

        /* ═══ RESPONSIVE: XS ≤ 400px ═══ */
        @media (max-width: 400px) {
          .faq-section {
            padding-top: 42px;
            padding-bottom: 42px;
          }

          .faq-layout {
            padding-left: 18px;
            padding-right: 18px;
            gap: 22px;
          }

          .faq-accent { width: 30px; margin-bottom: 10px; }
          .faq-label { margin-bottom: 10px; font-size: 9.5px; }
          .faq-title { font-size: 21px; margin-bottom: 8px; }
          .faq-desc { font-size: 12.5px; max-width: 280px; margin-bottom: 14px; }

          .faq-right { gap: 7px; }
          .faq-item { padding: 12px 14px; border-radius: 11px; }
          .faq-question { font-size: 13px; }
          .faq-answer-inner { padding-top: 7px; }
          .faq-answer-text { font-size: 12.5px; }

          .faq-btn { padding: 10px 22px; font-size: 12.5px; gap: 5px; }
          .faq-btn-arrow { width: 12px; height: 12px; }
          .faq-microtrust { font-size: 10.5px; }
        }

        /* ═══ RESPONSIVE: XXS ≤ 340px ═══ */
        @media (max-width: 340px) {
          .faq-section { padding-top: 36px; padding-bottom: 36px; }
          .faq-layout { padding-left: 14px; padding-right: 14px; gap: 20px; }

          .faq-title { font-size: 19px; }
          .faq-desc { font-size: 12px; max-width: 260px; }

          .faq-right { gap: 6px; }
          .faq-item { padding: 11px 12px; border-radius: 10px; }
          .faq-question { font-size: 12.5px; }
          .faq-answer-text { font-size: 12px; line-height: 1.6; }

          .faq-btn { padding: 9px 20px; font-size: 12px; }
        }
      `}</style>

      {/* ═══ FLOATING DECO (desktop) ═══ */}
      <div
        className={`faq-deco ${a ? 'faq-a-pop' : ''}`}
        style={{ left: '2.5vw', top: '55%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', animationDelay: '0.6s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'faq-fl-1' : ''} />
      </div>
      <div
        className={`faq-deco ${a ? 'faq-a-pop' : ''}`}
        style={{ left: '4.5vw', top: '68%', width: 'clamp(24px, 2.8vw, 44px)', height: 'clamp(24px, 2.8vw, 44px)', animationDelay: '0.75s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'faq-fl-2' : ''} />
      </div>
      <div
        className={`faq-deco ${a ? 'faq-a-pop' : ''}`}
        style={{ left: '2vw', top: '80%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', animationDelay: '0.9s' }}
      >
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'faq-fl-3' : ''} />
      </div>

      {/* ═══ LAYOUT ═══ */}
      <div className="faq-layout">

        {/* ── LEFT ── */}
        <div className="faq-left">
          <div
            className={`faq-accent ${a ? 'faq-a-slide' : ''}`}
            style={{ animationDelay: '0.1s' }}
          />

          <span
            className={`faq-label ${a ? 'faq-a-slide' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            PREGUNTAS FRECUENTES
          </span>

          <h2
            className={`faq-title ${a ? 'faq-a-slide' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            Todo lo que
            <br />
            <span className="faq-title-light">necesitás saber</span>
          </h2>

          <p
            className={`faq-desc ${a ? 'faq-a-slide' : ''}`}
            style={{ animationDelay: '0.42s' }}
          >
            Si tenés otra duda, escribinos y te respondemos personalmente.
          </p>

          <button
            className={`faq-btn ${a ? 'faq-a-up' : ''}`}
            style={{ animationDelay: '0.55s' }}
            onClick={() => scrollTo('contacto')}
          >
            Escribinos
            <svg
              className="faq-btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <span
            className={`faq-microtrust ${a ? 'faq-a-up' : ''}`}
            style={{ animationDelay: '0.7s' }}
          >
            Respondemos en menos de 24 hs
          </span>
        </div>

        {/* ── RIGHT / ACCORDION ── */}
        <div className="faq-right">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''} ${a ? 'faq-a-item' : ''}`}
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="faq-q-row">
                  <h3 className={`faq-question ${isOpen ? 'faq-question--open' : 'faq-question--closed'}`}>
                    {faq.question}
                  </h3>
                  <svg
                    className={`faq-chevron ${isOpen ? 'faq-chevron--open' : ''}`}
                    fill="none"
                    stroke={isOpen ? '#F69E82' : '#AAA'}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div
                  className={`faq-answer-wrap ${isOpen ? 'faq-answer-wrap--open' : 'faq-answer-wrap--closed'}`}
                  style={{ maxHeight: isOpen ? `${(heights[i] || 0) + 20}px` : '0px' }}
                >
                  <div
                    ref={(el) => { contentRefs.current[i] = el; }}
                    className="faq-answer-inner"
                  >
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQScreen;