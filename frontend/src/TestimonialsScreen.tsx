import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    text: 'Nunca pensé que un mensaje pudiera cambiarme tanto el día. Camil me hace sentir que alguien realmente se acuerda de mí, de mis cosas, de lo que me importa. Es como tener una amiga que siempre está.',
    name: 'Martín',
    age: 28,
    plan: 'Casualmente cotidiano',
    planColor: 'rgba(244, 63, 94, 0.9)',
    time: '4 meses',
  },
  {
    text: 'Las cartas son lo mejor que me pasó. Cada semana espero ese momento de leer algo escrito para mí, con cariño real. Me cambió la semana por completo.',
    name: 'Valentina',
    age: 33,
    plan: 'Correspondencia especial',
    planColor: 'rgba(14, 116, 144, 0.9)',
    time: '6 meses',
  },
  {
    text: 'Trabajo todo el día y llegaba a casa sintiéndome solo. Ahora tengo a alguien que me pregunta cómo estoy, que me manda un audio mientras cocino. No tiene precio.',
    name: 'Lucas',
    age: 42,
    plan: 'Compañía diaria',
    planColor: 'rgba(234, 179, 8, 0.9)',
    time: '3 meses',
  },
  {
    text: 'Al principio dudé. Pensé "esto no puede ser real". Pero desde la primera llamada sentí que era genuino. Camil tiene una forma de hacerte sentir que importás.',
    name: 'Sofía',
    age: 29,
    plan: 'Casualmente cotidiano',
    planColor: 'rgba(244, 63, 94, 0.9)',
    time: '5 meses',
  },
  {
    text: 'Vivo lejos de mi familia y a veces la soledad pesa. Camil me devolvió esa sensación de tener a alguien cerca, alguien que te escucha de verdad y no te juzga.',
    name: 'Tomás',
    age: 37,
    plan: 'Compañía diaria',
    planColor: 'rgba(234, 179, 8, 0.9)',
    time: '7 meses',
  },
  {
    text: 'Me encanta que cada carta tiene algo que solo yo puedo entender. Se nota que presta atención, que le importa. Es el highlight de mi semana, literal.',
    name: 'Carolina',
    age: 26,
    plan: 'Correspondencia especial',
    planColor: 'rgba(14, 116, 144, 0.9)',
    time: '4 meses',
  },
];

const TestimonialsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleNav = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setActiveIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#F3F3F3',
        minHeight: '75vh',
        paddingTop: '8vw',
        paddingBottom: '6vw',
      }}
    >
      <style>{`
        .testimonial-card { transition: all 0.5s ease; }
        .testimonial-nav {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .testimonial-nav:hover {
          background: rgba(246,158,130,0.15) !important;
          border-color: rgba(246,158,130,0.4) !important;
        }
        @keyframes testDeco1 {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          25% { transform: translateY(-5px) rotate(-7deg); }
          50% { transform: translateY(-2px) rotate(-12deg); }
          75% { transform: translateY(-6px) rotate(-8deg); }
        }
        @keyframes testDeco2 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          30% { transform: translateY(-4px) rotate(11deg); }
          60% { transform: translateY(-7px) rotate(6deg); }
          85% { transform: translateY(-2px) rotate(9deg); }
        }
        @keyframes testDeco3 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          25% { transform: translateY(-6px) rotate(15deg); }
          50% { transform: translateY(-3px) rotate(10deg); }
          75% { transform: translateY(-5px) rotate(13deg); }
        }
        @keyframes testDeco4 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          30% { transform: translateY(-5px) rotate(-3deg); }
          60% { transform: translateY(-8px) rotate(-8deg); }
          85% { transform: translateY(-3px) rotate(-5deg); }
        }
        .test-deco-1 { animation: testDeco1 4.3s ease-in-out infinite; }
        .test-deco-2 { animation: testDeco2 4.7s ease-in-out infinite; animation-delay: 0.5s; }
        .test-deco-3 { animation: testDeco3 4s ease-in-out infinite; animation-delay: 1s; }
        .test-deco-4 { animation: testDeco4 4.5s ease-in-out infinite; animation-delay: 0.7s; }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideDown {
          0%   { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardScaleIn {
          0%   { opacity: 0; transform: scale(0.9) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes navFadeIn {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Badge */
        .entrance-test-badge {
          opacity: 0;
        }
        .entrance-test-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }

        /* Título */
        .entrance-test-title {
          opacity: 0;
        }
        .entrance-test-title.animate {
          animation: fadeSlideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.25s;
        }

        /* Nav izq */
        .entrance-test-nav-left {
          opacity: 0;
        }
        .entrance-test-nav-left.animate {
          animation: navFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.55s;
        }

        /* Nav der */
        .entrance-test-nav-right {
          opacity: 0;
        }
        .entrance-test-nav-right.animate {
          animation: navFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
        }

        /* Card */
        .entrance-test-card {
          opacity: 0;
        }
        .entrance-test-card.animate {
          animation: cardScaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
        }

        /* Dots */
        .entrance-test-dots {
          opacity: 0;
        }
        .entrance-test-dots.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }

        /* Deco icon wrappers — solo opacity */
        .test-icon-wrapper {
          opacity: 0;
        }
        .test-icon-wrapper.animate-test-deco-1 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.5s;
        }
        .test-icon-wrapper.animate-test-deco-2 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.65s;
        }
        .test-icon-wrapper.animate-test-deco-3 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.8s;
        }
        .test-icon-wrapper.animate-test-deco-4 {
          animation: iconFadeIn 0.6s ease forwards;
          animation-delay: 0.95s;
        }
      `}</style>

      {/* Onda amarilla arriba */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: '65px', transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z"
            fill="#F9DDA3"
          />
        </svg>
      </div>

      {/* ===== 4 Decoraciones — wrapper (opacity) + hijo (swing) ===== */}

      <div
        className={`absolute pointer-events-none test-icon-wrapper ${hasAnimated ? 'animate-test-deco-1' : ''}`}
        style={{ left: '4vw', top: '18%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)', zIndex: 5 }}
      >
        <img src="/corazonderecha.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-1' : ''}`} />
      </div>

      <div
        className={`absolute pointer-events-none test-icon-wrapper ${hasAnimated ? 'animate-test-deco-2' : ''}`}
        style={{ right: '5vw', top: '15%', width: 'clamp(20px, 2.2vw, 35px)', height: 'clamp(20px, 2.2vw, 35px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-2' : ''}`} />
      </div>

      <div
        className={`absolute pointer-events-none test-icon-wrapper ${hasAnimated ? 'animate-test-deco-3' : ''}`}
        style={{ left: '3.5vw', bottom: '12%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', zIndex: 5 }}
      >
        <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-3' : ''}`} />
      </div>

      <div
        className={`absolute pointer-events-none test-icon-wrapper ${hasAnimated ? 'animate-test-deco-4' : ''}`}
        style={{ right: '4.5vw', bottom: '14%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', zIndex: 5 }}
      >
        <img src="/corazonizquierda.png" alt="" className={`object-contain w-full h-full ${mounted ? 'test-deco-4' : ''}`} />
      </div>

      {/* ===== Contenido ===== */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{ paddingLeft: '6vw', paddingRight: '6vw' }}
      >
        {/* Header */}
        <div
          className="flex flex-col items-center"
          style={{ marginBottom: '3.5vw' }}
        >
          <span
            className={`entrance-test-badge ${hasAnimated ? 'animate' : ''}`}
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
              marginBottom: '1vw',
            }}
          >
            <span style={{ fontSize: '0.85vw' }}>💬</span>
            Historias reales
          </span>

          <h2
            className={`entrance-test-title ${hasAnimated ? 'animate' : ''}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: '#F69E82',
              fontSize: '3.2vw',
              lineHeight: 1.3,
              margin: 0,
              textAlign: 'center',
            }}
          >
            Lo que dicen quienes ya{' '}
            <span style={{ fontWeight: 600 }}>lo viven</span>
          </h2>
        </div>

        {/* Testimonial */}
        <div
          className="flex items-center justify-center"
          style={{ gap: '2vw', width: '100%', maxWidth: '60vw' }}
        >
          <button
            type="button"
            className={`testimonial-nav entrance-test-nav-left ${hasAnimated ? 'animate' : ''}`}
            onClick={() => handleNav('prev')}
            style={{
              width: 'clamp(36px, 3vw, 48px)',
              height: 'clamp(36px, 3vw, 48px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(246,158,130,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Anterior"
          >
            <svg
              style={{ width: '1vw', height: '1vw' }}
              fill="none"
              stroke="#F69E82"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            className={`testimonial-card entrance-test-card ${hasAnimated ? 'animate' : ''}`}
            style={{
              flex: 1,
              padding: '2.5vw 3vw',
              borderRadius: '24px',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(246,158,130,0.2)',
              boxShadow:
                '0 8px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(28px, 2.5vw, 45px)',
                lineHeight: 1,
                color: 'rgba(246,158,130,0.2)',
                fontFamily: 'Georgia, serif',
                marginBottom: '0.5vw',
                userSelect: 'none',
              }}
            >
              "
            </div>

            <div style={{ marginBottom: '1vw', fontSize: '1.2vw' }}>
              ⭐⭐⭐⭐⭐
            </div>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#4A4A4A',
                fontSize: '1.15vw',
                lineHeight: 1.8,
                margin: 0,
                marginBottom: '1.5vw',
                maxWidth: '40vw',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {testimonials[activeIndex].text}
            </p>

            <div
              style={{
                width: '3vw',
                height: '2px',
                borderRadius: '2px',
                background:
                  'linear-gradient(90deg, transparent, rgba(246,158,130,0.4), transparent)',
                margin: '0 auto 1.2vw auto',
              }}
            />

            <div
              className="flex items-center justify-center"
              style={{ gap: '1vw' }}
            >
              <div
                style={{
                  width: 'clamp(40px, 3vw, 50px)',
                  height: 'clamp(40px, 3vw, 50px)',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(249,221,163,0.4), rgba(246,158,130,0.3))',
                  border: '2px solid rgba(246,158,130,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  color: '#F69E82',
                  fontSize: '1.1vw',
                }}
              >
                {testimonials[activeIndex].name.charAt(0)}
              </div>
              <div className="flex flex-col items-start">
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: '#2A2A2A',
                    fontSize: '0.95vw',
                  }}
                >
                  {testimonials[activeIndex].name},{' '}
                  {testimonials[activeIndex].age} años
                </span>
                <div
                  className="flex items-center"
                  style={{ gap: '0.5vw' }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: testimonials[activeIndex].planColor,
                      fontSize: '0.78vw',
                    }}
                  >
                    {testimonials[activeIndex].plan}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: '#AAA',
                      fontSize: '0.72vw',
                    }}
                  >
                    · {testimonials[activeIndex].time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`testimonial-nav entrance-test-nav-right ${hasAnimated ? 'animate' : ''}`}
            onClick={() => handleNav('next')}
            style={{
              width: 'clamp(36px, 3vw, 48px)',
              height: 'clamp(36px, 3vw, 48px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(246,158,130,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Siguiente"
          >
            <svg
              style={{ width: '1vw', height: '1vw' }}
              fill="none"
              stroke="#F69E82"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div
          className={`flex items-center justify-center entrance-test-dots ${hasAnimated ? 'animate' : ''}`}
          style={{ gap: '8px', marginTop: '2vw' }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                width: index === activeIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '50px',
                backgroundColor:
                  index === activeIndex
                    ? '#F69E82'
                    : 'rgba(246,158,130,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsScreen;