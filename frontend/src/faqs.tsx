import { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    question: '¿Camil es una persona real?',
    answer:
      'Sí, absolutamente. Camil es una persona real, con sentimientos, humor y dedicación genuina. No es un bot, no es inteligencia artificial. Cada mensaje, cada carta y cada llamada es auténtica.',
  },
  {
    question: '¿Qué tipo de servicio es este exactamente?',
    answer:
      'Camil ofrece compañía emocional y entretenimiento: conversaciones, cartas, llamadas y citas virtuales en un marco de respeto y contención. Es un vínculo de amistad y calidez humana. No es un servicio de citas románticas ni incluye contenido íntimo de ningún tipo.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer:
      'Sí, podés cancelar tu suscripción en cualquier momento sin penalidad. No hay permanencia mínima ni cargos ocultos. Queremos que estés porque querés, no porque tenés que.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Totalmente. Toda tu información personal se mantiene confidencial. No compartimos datos con terceros bajo ninguna circunstancia. Las conversaciones son privadas y protegidas.',
  },
  {
    question: '¿Cómo es la primera experiencia?',
    answer:
      'Una vez que completás el formulario, el equipo de Camil te contacta en menos de 24 hs para conocerte, entender qué buscás y coordinar todo. Desde el primer momento vas a sentir la calidez que nos caracteriza.',
  },
  {
    question: '¿Por qué no se muestra el rostro de Camil?',
    answer:
      'Por seguridad y privacidad de Camil, su identidad visual se mantiene en reserva. Esto no afecta la experiencia — la conexión se construye a través de la palabra, la voz y la presencia. Lo que sentís es real.',
  },
  {
    question: '¿Puedo cambiar de plan?',
    answer:
      'Sí, podés subir o bajar de plan cuando quieras. El cambio se aplica en el siguiente ciclo de facturación. Nuestro equipo te ayuda con la transición.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos transferencia bancaria, Mercado Pago y tarjetas de crédito/débito. El pago es mensual y se coordina al momento de la inscripción.',
  },
];

const FAQScreen = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAnswerHeight = (index: number) => {
    const el = answerRefs.current[index];
    if (!el) return 0;
    return el.scrollHeight;
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="faq-section"
    >
      <style>{`
        /* ══════════════════════════════
           BASE / SHARED
        ══════════════════════════════ */
        .faq-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
          min-height: 80vh;
        }

        /* ── FAQ Item ── */
        .faq-item {
          cursor: pointer;
          border-radius: 16px;
          transition: all 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .faq-item:hover {
          border-color: rgba(246,158,130,0.4) !important;
        }
        .faq-item-open {
          background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5)) !important;
          border-color: rgba(246,158,130,0.35) !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04) !important;
        }

        /* ── Answer transition ── */
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease,
                      padding 0.3s ease;
        }
        .faq-answer-open {
          opacity: 1;
        }
        .faq-answer-closed {
          max-height: 0 !important;
          opacity: 0;
          padding-top: 0 !important;
        }

        /* ── Chevron ── */
        .faq-chevron {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .faq-chevron-open {
          transform: rotate(180deg);
        }

        /* ── Question text transition ── */
        .faq-question {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }
        .faq-question-open {
          color: #F69E82;
          font-weight: 500;
        }
        .faq-question-closed {
          color: #3A3A3A;
          font-weight: 400;
        }

        /* ── Answer text ── */
        .faq-answer-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          line-height: 1.7;
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── CTA Button ── */
        .faq-cta-btn {
          display: inline-flex;
          align-items: center;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(246,158,130,0.75), rgba(246,158,130,0.55));
          border: 1px solid rgba(255,255,255,0.45);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .faq-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(246,158,130,0.25);
        }
        .faq-cta-btn:active {
          transform: scale(0.97);
        }

        /* ── Badge ── */
        .faq-badge {
          display: inline-flex;
          align-items: center;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.15));
          border: 1px solid rgba(246,158,130,0.25);
          color: #9E6B55;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.07em;
        }

        /* ── Title ── */
        .faq-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #F69E82;
          line-height: 1.3;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .faq-title span {
          font-weight: 600;
        }

        /* ── Description ── */
        .faq-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Deco Animations ── */
        @keyframes faqPulse1 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.06) rotate(2deg); }
        }
        @keyframes faqPulse2 {
          0%, 100% { transform: scale(1.03) rotate(0deg); }
          50% { transform: scale(0.97) rotate(-1.5deg); }
        }
        @keyframes faqPulse3 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1.5deg); }
        }
        .faq-deco-1 { animation: faqPulse1 4s ease-in-out infinite; }
        .faq-deco-2 { animation: faqPulse2 4.8s ease-in-out infinite; }
        .faq-deco-3 { animation: faqPulse3 3.6s ease-in-out infinite; }

        /* ── Entrance Animations ── */
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(35px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          0%   { opacity: 0; transform: translateY(-25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes faqItemSlide {
          0%   { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes faqItemSlideUp {
          0%   { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .entrance-faq-badge { opacity: 0; }
        .entrance-faq-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-faq-title { opacity: 0; }
        .entrance-faq-title.animate {
          animation: fadeSlideRight 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.2s;
        }
        .entrance-faq-desc { opacity: 0; }
        .entrance-faq-desc.animate {
          animation: fadeSlideRight 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.35s;
        }
        .entrance-faq-cta { opacity: 0; }
        .entrance-faq-cta.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.5s;
        }

        /* Desktop: slide from right */
        .entrance-faq-item { opacity: 0; }
        .entrance-faq-item.animate {
          animation: faqItemSlide 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .entrance-faq-item.animate.faq-i-0 { animation-delay: 0.25s; }
        .entrance-faq-item.animate.faq-i-1 { animation-delay: 0.33s; }
        .entrance-faq-item.animate.faq-i-2 { animation-delay: 0.41s; }
        .entrance-faq-item.animate.faq-i-3 { animation-delay: 0.49s; }
        .entrance-faq-item.animate.faq-i-4 { animation-delay: 0.57s; }
        .entrance-faq-item.animate.faq-i-5 { animation-delay: 0.65s; }
        .entrance-faq-item.animate.faq-i-6 { animation-delay: 0.73s; }
        .entrance-faq-item.animate.faq-i-7 { animation-delay: 0.81s; }

        .faq-icon-wrapper { opacity: 0; }
        .faq-icon-wrapper.animate-faq-deco-1 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.6s; }
        .faq-icon-wrapper.animate-faq-deco-2 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.75s; }
        .faq-icon-wrapper.animate-faq-deco-3 { animation: iconFadeIn 0.6s ease forwards; animation-delay: 0.9s; }

        /* ══════════════════════════════
           DESKTOP (> 1024px)
        ══════════════════════════════ */
        .faq-section {
          padding-top: 6vw;
          padding-bottom: 6vw;
        }

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
        }

        /* Desktop sizes */
        .faq-badge {
          gap: 0.4vw;
          padding: 0.35vw 1vw;
          font-size: 0.82vw;
          margin-bottom: 1.2vw;
        }
        .faq-badge-icon { font-size: 0.85vw; }

        .faq-title { font-size: 3.2vw; }

        .faq-desc {
          font-size: 1vw;
          margin-top: 1vw;
          max-width: 20vw;
        }

        .faq-cta-btn {
          gap: 0.4vw;
          margin-top: 1.5vw;
          padding: 0.55vw 1.6vw;
          font-size: 0.88vw;
        }
        .faq-cta-icon { width: 0.9vw; height: 0.9vw; }

        .faq-item {
          padding: 1.2vw 1.5vw;
          background: rgba(255,255,255,0.4);
          border: 1px solid rgba(0,0,0,0.06);
        }

        .faq-question { font-size: 1vw; }
        .faq-chevron { width: 1.2vw; height: 1.2vw; }

        .faq-answer-open { padding-top: 0.8vw; }
        .faq-answer-text { font-size: 0.88vw; }

        .faq-q-row { gap: 1vw; }

        /* Deco positions desktop */
        .faq-deco-pos-1 { left: 2.5vw; top: 55%; width: clamp(30px,3.5vw,55px); height: clamp(30px,3.5vw,55px); }
        .faq-deco-pos-2 { left: 4.5vw; top: 68%; width: clamp(28px,3.2vw,50px); height: clamp(28px,3.2vw,50px); }
        .faq-deco-pos-3 { left: 2vw; top: 80%; width: clamp(25px,2.8vw,45px); height: clamp(25px,2.8vw,45px); }

        /* ══════════════════════════════
           TABLET (769px – 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .faq-section {
            min-height: auto;
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

          .faq-badge {
            gap: 6px; padding: 6px 16px;
            font-size: 12px; margin-bottom: 14px;
          }
          .faq-badge-icon { font-size: 13px; }

          .faq-title { font-size: 34px; }

          .faq-desc {
            font-size: 15px; margin-top: 12px;
            max-width: 440px;
          }

          .faq-cta-btn {
            gap: 6px; margin-top: 18px;
            padding: 12px 28px; font-size: 14px;
          }
          .faq-cta-icon { width: 14px; height: 14px; }

          .faq-item { padding: 18px 22px; border-radius: 14px; }
          .faq-question { font-size: 15px; }
          .faq-chevron { width: 18px; height: 18px; }
          .faq-answer-open { padding-top: 10px; }
          .faq-answer-text { font-size: 14px; }
          .faq-q-row { gap: 12px; }

          /* Entrance: slide up on tablet */
          .entrance-faq-title.animate { animation-name: fadeSlideUp; }
          .entrance-faq-desc.animate { animation-name: fadeSlideUp; }
          .entrance-faq-item.animate { animation-name: faqItemSlideUp; }

          /* Deco - reposition for tablet */
          .faq-deco-pos-1 { left: 20px; top: auto; bottom: 180px; width: 38px; height: 38px; }
          .faq-deco-pos-2 { left: auto; right: 24px; top: auto; bottom: 120px; width: 34px; height: 34px; }
          .faq-deco-pos-3 { left: 30px; top: auto; bottom: 60px; width: 30px; height: 30px; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .faq-section {
            padding-top: 60px;
            padding-bottom: 60px;
            min-height: auto;
          }

          .faq-layout {
            flex-direction: column;
            align-items: center;
            padding-left: 24px;
            padding-right: 24px;
            gap: 30px;
          }

          .faq-left {
            width: 100%;
            align-items: center;
            text-align: center;
          }

          .faq-right {
            width: 100%;
            max-width: 100%;
            gap: 10px;
          }

          .faq-badge {
            gap: 5px; padding: 5px 14px;
            font-size: 11.5px; margin-bottom: 12px;
          }
          .faq-badge-icon { font-size: 12px; }

          .faq-title { font-size: 28px; }

          .faq-desc {
            font-size: 14px; margin-top: 10px;
            max-width: 340px;
          }

          .faq-cta-btn {
            gap: 6px; margin-top: 16px;
            padding: 11px 26px; font-size: 13.5px;
          }
          .faq-cta-icon { width: 13px; height: 13px; }

          .faq-item { padding: 16px 18px; border-radius: 14px; }
          .faq-question { font-size: 14.5px; }
          .faq-chevron { width: 18px; height: 18px; }
          .faq-answer-open { padding-top: 10px; }
          .faq-answer-text { font-size: 13.5px; line-height: 1.65; }
          .faq-q-row { gap: 10px; }

          .entrance-faq-title.animate { animation-name: fadeSlideUp; }
          .entrance-faq-desc.animate { animation-name: fadeSlideUp; }
          .entrance-faq-item.animate { animation-name: faqItemSlideUp; }

          .faq-deco-pos-1 { left: 12px; top: auto; bottom: 160px; width: 32px; height: 32px; }
          .faq-deco-pos-2 { left: auto; right: 16px; top: auto; bottom: 100px; width: 28px; height: 28px; }
          .faq-deco-pos-3 { left: 18px; top: auto; bottom: 45px; width: 26px; height: 26px; }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .faq-section {
            padding-top: 50px;
            padding-bottom: 50px;
          }

          .faq-layout {
            padding-left: 18px;
            padding-right: 18px;
            gap: 26px;
          }

          .faq-badge {
            gap: 4px; padding: 4px 12px;
            font-size: 11px; margin-bottom: 10px;
          }
          .faq-badge-icon { font-size: 11px; }

          .faq-title { font-size: 24px; }

          .faq-desc {
            font-size: 13px; margin-top: 8px;
            max-width: 300px;
          }

          .faq-cta-btn {
            gap: 5px; margin-top: 14px;
            padding: 10px 22px; font-size: 13px;
          }
          .faq-cta-icon { width: 12px; height: 12px; }

          .faq-right { gap: 8px; }
          .faq-item { padding: 14px 16px; border-radius: 12px; }
          .faq-question { font-size: 13.5px; }
          .faq-chevron { width: 16px; height: 16px; }
          .faq-answer-open { padding-top: 8px; }
          .faq-answer-text { font-size: 13px; line-height: 1.6; }
          .faq-q-row { gap: 8px; }

          .faq-deco-pos-1 { left: 8px; bottom: 140px; width: 28px; height: 28px; }
          .faq-deco-pos-2 { right: 10px; bottom: 85px; width: 24px; height: 24px; }
          .faq-deco-pos-3 { left: 12px; bottom: 35px; width: 22px; height: 22px; }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════ */
        @media (max-width: 380px) {
          .faq-section {
            padding-top: 44px;
            padding-bottom: 44px;
          }

          .faq-layout {
            padding-left: 14px;
            padding-right: 14px;
            gap: 22px;
          }

          .faq-badge {
            padding: 3px 10px;
            font-size: 10.5px; margin-bottom: 8px;
          }

          .faq-title { font-size: 21px; }

          .faq-desc {
            font-size: 12.5px; margin-top: 7px;
            max-width: 260px;
          }

          .faq-cta-btn {
            margin-top: 12px;
            padding: 9px 20px; font-size: 12.5px;
          }

          .faq-right { gap: 7px; }
          .faq-item { padding: 12px 14px; border-radius: 11px; }
          .faq-question { font-size: 13px; }
          .faq-chevron { width: 15px; height: 15px; }
          .faq-answer-open { padding-top: 7px; }
          .faq-answer-text { font-size: 12.5px; }
          .faq-q-row { gap: 7px; }

          .faq-deco-pos-1 { left: 6px; bottom: 120px; width: 24px; height: 24px; }
          .faq-deco-pos-2 { right: 8px; bottom: 70px; width: 20px; height: 20px; }
          .faq-deco-pos-3 { left: 10px; bottom: 28px; width: 18px; height: 18px; }
        }

        /* ══════════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════════ */
        @media (max-width: 320px) {
          .faq-section {
            padding-top: 38px;
            padding-bottom: 38px;
          }

          .faq-layout {
            padding-left: 12px;
            padding-right: 12px;
            gap: 20px;
          }

          .faq-badge {
            padding: 3px 9px;
            font-size: 10px; margin-bottom: 7px;
          }

          .faq-title { font-size: 19px; }

          .faq-desc {
            font-size: 12px; margin-top: 6px;
            max-width: 240px;
          }

          .faq-cta-btn {
            margin-top: 10px;
            padding: 8px 18px; font-size: 12px;
          }
          .faq-cta-icon { width: 11px; height: 11px; }

          .faq-right { gap: 6px; }
          .faq-item { padding: 11px 12px; border-radius: 10px; }
          .faq-question { font-size: 12.5px; }
          .faq-chevron { width: 14px; height: 14px; }
          .faq-answer-open { padding-top: 6px; }
          .faq-answer-text { font-size: 12px; line-height: 1.55; }
          .faq-q-row { gap: 6px; }

          .faq-deco-pos-1 { display: none; }
          .faq-deco-pos-2 { display: none; }
          .faq-deco-pos-3 { display: none; }
        }
      `}</style>

      {/* ═══ Decoraciones flotantes ═══ */}
      <div
        className={`absolute pointer-events-none faq-deco-pos-1 faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-1' : ''}`}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-1' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none faq-deco-pos-2 faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-2' : ''}`}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-2' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none faq-deco-pos-3 faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-3' : ''}`}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-3' : ''}`} />
      </div>

      {/* ═══ Layout principal ═══ */}
      <div className="faq-layout">

        {/* ── Lado izquierdo / Header ── */}
        <div className="faq-left">
          <span className={`faq-badge entrance-faq-badge ${hasAnimated ? 'animate' : ''}`}>
            <span className="faq-badge-icon">❓</span>
            FAQ
          </span>

          <h2 className={`faq-title entrance-faq-title ${hasAnimated ? 'animate' : ''}`}>
            Preguntas <span>frecuentes</span>
          </h2>

          <p className={`faq-desc entrance-faq-desc ${hasAnimated ? 'animate' : ''}`}>
            Todo lo que necesitás saber antes de dar el primer paso.
            Si tenés otra duda, escribinos.
          </p>

          <button
            type="button"
            className={`faq-cta-btn entrance-faq-cta ${hasAnimated ? 'animate' : ''}`}
            onClick={() => {
              const el = document.getElementById('contacto');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contactar
            <svg
              className="faq-cta-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* ── Lado derecho / Acordeón ── */}
        <div className="faq-right">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item entrance-faq-item faq-i-${index} ${hasAnimated ? 'animate' : ''} ${isOpen ? 'faq-item-open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between faq-q-row">
                  <h3 className={`faq-question ${isOpen ? 'faq-question-open' : 'faq-question-closed'}`}>
                    {faq.question}
                  </h3>
                  <svg
                    className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}
                    fill="none"
                    stroke={isOpen ? '#F69E82' : '#AAA'}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div
                  ref={(el) => { answerRefs.current[index] = el; }}
                  className={`faq-answer ${isOpen ? 'faq-answer-open' : 'faq-answer-closed'}`}
                  style={{
                    maxHeight: isOpen ? `${getAnswerHeight(index)}px` : '0px',
                  }}
                >
                  <p className="faq-answer-text">
                    {faq.answer}
                  </p>
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