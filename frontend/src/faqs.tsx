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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#F3F3F3',
        minHeight: '80vh',
        paddingTop: '6vw',
        paddingBottom: '6vw',
      }}
    >
      <style>{`
        .faq-item {
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          border-color: rgba(246,158,130,0.4) !important;
        }
        .faq-answer {
          transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
          overflow: hidden;
        }
        .faq-answer-open {
          max-height: 300px;
          opacity: 1;
          padding-top: 0.8vw;
        }
        .faq-answer-closed {
          max-height: 0;
          opacity: 0;
          padding-top: 0;
        }
        .faq-chevron {
          transition: transform 0.3s ease;
        }
        .faq-chevron-open {
          transform: rotate(180deg);
        }
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

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(35px); }
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
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Badge */
        .entrance-faq-badge {
          opacity: 0;
        }
        .entrance-faq-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }

        /* Título */
        .entrance-faq-title {
          opacity: 0;
        }
        .entrance-faq-title.animate {
          animation: fadeSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }

        /* Descripción */
        .entrance-faq-desc {
          opacity: 0;
        }
        .entrance-faq-desc.animate {
          animation: fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.35s;
        }

        /* CTA */
        .entrance-faq-cta {
          opacity: 0;
        }
        .entrance-faq-cta.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.5s;
        }

        /* FAQ items */
        .entrance-faq-item {
          opacity: 0;
        }
        .entrance-faq-item.animate {
          animation: faqItemSlide 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-faq-item.animate.faq-i-0 { animation-delay: 0.25s; }
        .entrance-faq-item.animate.faq-i-1 { animation-delay: 0.33s; }
        .entrance-faq-item.animate.faq-i-2 { animation-delay: 0.41s; }
        .entrance-faq-item.animate.faq-i-3 { animation-delay: 0.49s; }
        .entrance-faq-item.animate.faq-i-4 { animation-delay: 0.57s; }
        .entrance-faq-item.animate.faq-i-5 { animation-delay: 0.65s; }
        .entrance-faq-item.animate.faq-i-6 { animation-delay: 0.73s; }
        .entrance-faq-item.animate.faq-i-7 { animation-delay: 0.81s; }

        /* Deco icon wrappers — solo opacity */
        .faq-icon-wrapper {
          opacity: 0;
        }
        .faq-icon-wrapper.animate-faq-deco-1 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.6s;
        }
        .faq-icon-wrapper.animate-faq-deco-2 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.75s;
        }
        .faq-icon-wrapper.animate-faq-deco-3 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.9s;
        }
      `}</style>

      {/* ===== Decoraciones — wrapper (opacity) + hijo (pulse) ===== */}
      <div
        className={`absolute pointer-events-none faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-1' : ''}`}
        style={{ left: '2.5vw', top: '55%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)' }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-1' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-2' : ''}`}
        style={{ left: '4.5vw', top: '68%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)' }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-2' : ''}`} />
      </div>
      <div
        className={`absolute pointer-events-none faq-icon-wrapper ${hasAnimated ? 'animate-faq-deco-3' : ''}`}
        style={{ left: '2vw', top: '80%', width: 'clamp(25px, 2.8vw, 45px)', height: 'clamp(25px, 2.8vw, 45px)' }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'faq-deco-3' : ''}`} />
      </div>

      <div
        className="relative z-10 flex w-full"
        style={{
          paddingLeft: '6vw',
          paddingRight: '6vw',
          gap: '4vw',
        }}
      >
        {/* Lado izquierdo — Título */}
        <div
          className="flex flex-col items-start flex-shrink-0"
          style={{ width: '30%', paddingTop: '1vw' }}
        >
          <span
            className={`entrance-faq-badge ${hasAnimated ? 'animate' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4vw',
              padding: '0.35vw 1vw',
              borderRadius: '50px',
              background:
                'linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.15))',
              border: '1px solid rgba(246,158,130,0.25)',
              color: '#9E6B55',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '0.82vw',
              letterSpacing: '0.07em',
              marginBottom: '1.2vw',
            }}
          >
            <span style={{ fontSize: '0.85vw' }}>❓</span>
            FAQ
          </span>

          <h2
            className={`entrance-faq-title ${hasAnimated ? 'animate' : ''}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: '#F69E82',
              fontSize: '3.2vw',
              lineHeight: 1.3,
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            Preguntas{' '}
            <span style={{ fontWeight: 600 }}>frecuentes</span>
          </h2>

          <p
            className={`entrance-faq-desc ${hasAnimated ? 'animate' : ''}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: '#5A5A5A',
              fontSize: '1vw',
              lineHeight: 1.7,
              margin: 0,
              marginTop: '1vw',
              maxWidth: '20vw',
            }}
          >
            Todo lo que necesitás saber antes de dar el primer paso.
            Si tenés otra duda, escribinos.
          </p>

          <button
            type="button"
            className={`entrance-faq-cta ${hasAnimated ? 'animate' : ''}`}
            onClick={() => {
              const el = document.getElementById('contacto');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4vw',
              marginTop: '1.5vw',
              padding: '0.55vw 1.6vw',
              borderRadius: '50px',
              background:
                'linear-gradient(135deg, rgba(246,158,130,0.75), rgba(246,158,130,0.55))',
              border: '1px solid rgba(255,255,255,0.45)',
              color: '#FFFFFF',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '0.88vw',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contactar
            <svg
              style={{ width: '0.9vw', height: '0.9vw' }}
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

        {/* Lado derecho — Acordeón */}
        <div className="flex flex-col flex-1" style={{ gap: '0.8vw' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item entrance-faq-item faq-i-${index} ${hasAnimated ? 'animate' : ''}`}
              style={{
                padding: '1.2vw 1.5vw',
                borderRadius: '16px',
                background:
                  openIndex === index
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))'
                    : 'rgba(255,255,255,0.4)',
                border: `1px solid ${openIndex === index ? 'rgba(246,158,130,0.35)' : 'rgba(0,0,0,0.06)'}`,
                boxShadow:
                  openIndex === index
                    ? '0 4px 15px rgba(0,0,0,0.04)'
                    : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleFAQ(index)}
            >
              <div
                className="flex items-center justify-between"
                style={{ gap: '1vw' }}
              >
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: openIndex === index ? 500 : 400,
                    color: openIndex === index ? '#F69E82' : '#3A3A3A',
                    fontSize: '1vw',
                    letterSpacing: '0.02em',
                    margin: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {faq.question}
                </h3>
                <svg
                  className={`faq-chevron ${openIndex === index ? 'faq-chevron-open' : ''}`}
                  style={{
                    width: '1.2vw',
                    height: '1.2vw',
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke={openIndex === index ? '#F69E82' : '#AAA'}
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
                className={`faq-answer ${openIndex === index ? 'faq-answer-open' : 'faq-answer-closed'}`}
              >
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: '#5A5A5A',
                    fontSize: '0.88vw',
                    lineHeight: 1.7,
                    letterSpacing: '0.01em',
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQScreen;