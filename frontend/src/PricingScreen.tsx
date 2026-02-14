import { useEffect, useState, useRef } from 'react';

interface PricingScreenProps {
  onSelectPlan?: (planId: string) => void;
}

const PricingScreen = ({ onSelectPlan }: PricingScreenProps) => {
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

  const scrollToContact = (planId: string) => {
    if (onSelectPlan) onSelectPlan(planId);
    const element = document.getElementById('contacto');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="planes"
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#F3F3F3',
        minHeight: '100vh',
        paddingTop: '5vw',
        paddingBottom: '5vw',
      }}
    >
      <style>{`
        @keyframes gentlePulse1 {
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50% { transform: rotate(-10deg) translateY(-4px); }
        }
        @keyframes gentlePulse2 {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-23deg) translateY(-3px); }
        }
        @keyframes gentlePulse3 {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(17deg) translateY(-4px); }
        }
        .pricing-icon-1 { animation: gentlePulse1 4s ease-in-out infinite; }
        .pricing-icon-2 { animation: gentlePulse2 4.5s ease-in-out infinite; animation-delay: 0.7s; }
        .pricing-icon-3 { animation: gentlePulse3 3.8s ease-in-out infinite; animation-delay: 1.2s; }
        .pricing-card { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pricing-card:hover { transform: translateY(-6px); }
        .pricing-cta {
          position: relative; overflow: hidden; transition: all 0.3s ease;
        }
        .pricing-cta::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .pricing-cta:hover::before { left: 100%; }
        .pricing-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .cupos-dot {
          animation: subtlePulse 2s ease-in-out infinite;
        }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideDown {
          0%   { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardRevealUp {
          0%   { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* Card central tiene scale(1.04) como estado final */
        @keyframes cardRevealUpCenter {
          0%   { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1.04); }
        }
        @keyframes iconFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Header */
        .entrance-pricing-title {
          opacity: 0;
        }
        .entrance-pricing-title.animate {
          animation: fadeSlideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-pricing-subtitle {
          opacity: 0;
        }
        .entrance-pricing-subtitle.animate {
          animation: fadeSlideDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.25s;
        }
        .entrance-pricing-note {
          opacity: 0;
        }
        .entrance-pricing-note.animate {
          animation: fadeSlideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.35s;
        }

        /* Cards */
        .entrance-pricing-card-0 {
          opacity: 0;
        }
        .entrance-pricing-card-0.animate {
          animation: cardRevealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
        }
        .entrance-pricing-card-1 {
          opacity: 0;
        }
        .entrance-pricing-card-1.animate {
          animation: cardRevealUpCenter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.55s;
        }
        .entrance-pricing-card-2 {
          opacity: 0;
        }
        .entrance-pricing-card-2.animate {
          animation: cardRevealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }

        /* Icon wrappers — solo opacity */
        .pricing-icon-wrapper {
          opacity: 0;
        }
        .pricing-icon-wrapper.animate-pricing-icon-0 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 0.7s;
        }
        .pricing-icon-wrapper.animate-pricing-icon-1 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 0.85s;
        }
        .pricing-icon-wrapper.animate-pricing-icon-2 {
          animation: iconFadeIn 0.5s ease forwards;
          animation-delay: 1s;
        }

        /* Privacy box */
        .entrance-pricing-privacy {
          opacity: 0;
        }
        .entrance-pricing-privacy.animate {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.9s;
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex flex-col items-center" style={{ marginBottom: '3vw' }}>
          <h2
            className={`entrance-pricing-title ${hasAnimated ? 'animate' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#F69E82', fontSize: '3.2vw', lineHeight: 1.3, margin: 0, textAlign: 'center' }}
          >
            Elegí tu <span style={{ fontWeight: 600 }}>vínculo</span>
          </h2>
          <p
            className={`entrance-pricing-subtitle ${hasAnimated ? 'animate' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#5A5A5A', fontSize: '1.1vw', lineHeight: 1.6, margin: 0, marginTop: '0.8vw', textAlign: 'center' }}
          >
            Cada plan es un mundo. Elegí el que mejor te abrace.
          </p>
          <span
            className={`entrance-pricing-note ${hasAnimated ? 'animate' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#AAA', fontSize: '0.8vw', marginTop: '0.5vw' }}
          >
            Precios en pesos argentinos (ARS)
          </span>
        </div>

        <div className="flex items-stretch justify-center" style={{ gap: '1.8vw' }}>

          {/* Card 1 — Correspondencia */}
          <div
            className={`pricing-card relative flex flex-col entrance-pricing-card-0 ${hasAnimated ? 'animate' : ''}`}
            style={{ width: '20vw', borderRadius: '22px', overflow: 'visible', background: 'linear-gradient(180deg, rgba(14,116,144,0.08) 0%, rgba(14,116,144,0.03) 100%)', border: '1px solid rgba(14,116,144,0.2)', padding: '2vw 1.6vw', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
          >
            <div
              style={{
                position: 'absolute', left: '-1px', top: '1.8vw',
                display: 'flex', alignItems: 'center', gap: '0.35vw',
                padding: '0.3vw 0.9vw 0.3vw 0.7vw',
                backgroundColor: 'rgba(14,116,144,0.9)', color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68vw',
                letterSpacing: '0.04em', borderRadius: '0 50px 50px 0',
                boxShadow: '0 2px 8px rgba(14,116,144,0.25)', zIndex: 10,
              }}
            >
              <span className="cupos-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
              7 cupos disponibles
            </div>

            {/* Icon wrapper */}
            <div
              className={`absolute pointer-events-none pricing-icon-wrapper ${hasAnimated ? 'animate-pricing-icon-0' : ''}`}
              style={{ right: '-1.2vw', top: '-1.2vw', width: 'clamp(40px, 4vw, 65px)', height: 'clamp(40px, 4vw, 65px)' }}
            >
              <img src="/carta.png" alt="" className={`object-contain w-full h-full ${mounted ? 'pricing-icon-1' : ''}`} />
            </div>

            <div style={{ width: '3vw', height: '4px', borderRadius: '4px', backgroundColor: 'rgba(14,116,144,0.6)', marginBottom: '1.2vw', marginTop: '1.8vw' }} />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#2A2A2A', fontSize: 'clamp(16px, 1.4vw, 24px)', lineHeight: 1.3, margin: 0, marginBottom: '1vw' }}>Correspondencia<br />especial</h3>
            <div style={{ marginBottom: '1.2vw' }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: 'rgba(14,116,144,0.9)', fontSize: 'clamp(28px, 2.6vw, 42px)', lineHeight: 1, letterSpacing: '-0.02em' }}>$90.000</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#888', fontSize: '0.85vw', marginLeft: '0.3vw' }}>/mes</span>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(14,116,144,0.12)', marginBottom: '1.2vw' }} />
            <div className="flex flex-col" style={{ gap: '0.7vw', flex: 1 }}>
              {['Intercambio de 4 cartas semanales', 'Una cita virtual de 3 hs al mes', 'Respuestas personalizadas y cálidas', 'Atención a tus momentos especiales'].map((f, i) => (
                <div key={i} className="flex items-start" style={{ gap: '0.5vw' }}>
                  <span style={{ color: 'rgba(14,116,144,0.7)', fontSize: '0.9vw', lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#5A5A5A', fontSize: '0.88vw', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button type="button" className="pricing-cta" onClick={() => scrollToContact('correspondencia')} style={{ width: '100%', padding: '0.65vw 0', borderRadius: '50px', backgroundColor: 'rgba(14,116,144,0.15)', border: '1px solid rgba(14,116,144,0.3)', color: 'rgba(14,116,144,0.9)', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.9vw', cursor: 'pointer', marginTop: '1.5vw' }}>
              Elegir plan
            </button>
          </div>

          {/* Card 2 — Casual (DESTACADA) */}
          <div
            className={`pricing-card relative flex flex-col entrance-pricing-card-1 ${hasAnimated ? 'animate' : ''}`}
            style={{ width: '22vw', borderRadius: '22px', overflow: 'visible', background: 'linear-gradient(180deg, rgba(244,63,94,0.1) 0%, rgba(244,63,94,0.04) 100%)', border: '2px solid rgba(244,63,94,0.3)', padding: '2vw 1.6vw', boxShadow: '0 8px 30px rgba(244,63,94,0.08)' }}
          >
            <div style={{ position: 'absolute', top: '-0.8vw', left: '50%', transform: 'translateX(-50%)', padding: '0.25vw 1vw', borderRadius: '50px', backgroundColor: 'rgba(244,63,94,0.85)', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.7vw', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>⭐ MÁS ELEGIDO</div>

            <div
              style={{
                position: 'absolute', left: '-2px', top: '1.8vw',
                display: 'flex', alignItems: 'center', gap: '0.35vw',
                padding: '0.3vw 0.9vw 0.3vw 0.7vw',
                backgroundColor: 'rgba(244,63,94,0.9)', color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68vw',
                letterSpacing: '0.04em', borderRadius: '0 50px 50px 0',
                boxShadow: '0 2px 8px rgba(244,63,94,0.25)', zIndex: 10,
              }}
            >
              <span className="cupos-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
              5 cupos disponibles
            </div>

            {/* Icon wrapper */}
            <div
              className={`absolute pointer-events-none pricing-icon-wrapper ${hasAnimated ? 'animate-pricing-icon-1' : ''}`}
              style={{ right: '-3vw', top: '-2.8vw', width: 'clamp(70px, 7.5vw, 100px)', height: 'clamp(70px, 7.5vw, 100px)' }}
            >
              <img src="/celular.png" alt="" className={`object-contain w-full h-full ${mounted ? 'pricing-icon-2' : ''}`} />
            </div>

            <div style={{ width: '3vw', height: '4px', borderRadius: '4px', backgroundColor: 'rgba(244,63,94,0.6)', marginBottom: '1.2vw', marginTop: '1.8vw' }} />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#2A2A2A', fontSize: 'clamp(16px, 1.4vw, 24px)', lineHeight: 1.3, margin: 0, marginBottom: '1vw' }}>Casualmente<br />cotidiano</h3>
            <div style={{ marginBottom: '1.2vw' }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: 'rgba(244,63,94,0.9)', fontSize: 'clamp(28px, 2.6vw, 42px)', lineHeight: 1, letterSpacing: '-0.02em' }}>$180.000</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#888', fontSize: '0.85vw', marginLeft: '0.3vw' }}>/mes</span>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(244,63,94,0.15)', marginBottom: '1.2vw' }} />
            <div className="flex flex-col" style={{ gap: '0.7vw', flex: 1 }}>
              {['Número de teléfono exclusivo', 'Conversaciones fluidas y seguidas', 'Hasta 4 llamadas de 30 min al mes', 'Una cita virtual de 3 hs al mes', 'Atención a tus momentos especiales'].map((f, i) => (
                <div key={i} className="flex items-start" style={{ gap: '0.5vw' }}>
                  <span style={{ color: 'rgba(244,63,94,0.7)', fontSize: '0.9vw', lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#5A5A5A', fontSize: '0.88vw', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button type="button" className="pricing-cta" onClick={() => scrollToContact('casual')} style={{ width: '100%', padding: '0.65vw 0', borderRadius: '50px', backgroundColor: 'rgba(244,63,94,0.85)', border: '1px solid rgba(244,63,94,0.4)', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.9vw', cursor: 'pointer', marginTop: '1.5vw', boxShadow: '0 4px 15px rgba(244,63,94,0.15)' }}>
              Elegir plan
            </button>
          </div>

          {/* Card 3 — Compañía diaria */}
          <div
            className={`pricing-card relative flex flex-col entrance-pricing-card-2 ${hasAnimated ? 'animate' : ''}`}
            style={{ width: '20vw', borderRadius: '22px', overflow: 'visible', background: 'linear-gradient(180deg, rgba(234,179,8,0.08) 0%, rgba(234,179,8,0.03) 100%)', border: '1px solid rgba(234,179,8,0.25)', padding: '2vw 1.6vw', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
          >
            <div
              style={{
                position: 'absolute', left: '-1px', top: '1.8vw',
                display: 'flex', alignItems: 'center', gap: '0.35vw',
                padding: '0.3vw 0.9vw 0.3vw 0.7vw',
                backgroundColor: 'rgba(234,179,8,0.95)', color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.68vw',
                letterSpacing: '0.04em', borderRadius: '0 50px 50px 0',
                boxShadow: '0 2px 8px rgba(234,179,8,0.3)', zIndex: 10,
              }}
            >
              <span className="cupos-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
              ¡Último cupo!
            </div>

            {/* Icon wrapper */}
            <div
              className={`absolute pointer-events-none pricing-icon-wrapper ${hasAnimated ? 'animate-pricing-icon-2' : ''}`}
              style={{ right: '-1.2vw', top: '-1.2vw', width: 'clamp(40px, 4vw, 65px)', height: 'clamp(40px, 4vw, 65px)' }}
            >
              <img src="/billete.png" alt="" className={`object-contain w-full h-full ${mounted ? 'pricing-icon-3' : ''}`} />
            </div>

            <div style={{ width: '3vw', height: '4px', borderRadius: '4px', backgroundColor: 'rgba(234,179,8,0.6)', marginBottom: '1.2vw', marginTop: '1.8vw' }} />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#2A2A2A', fontSize: 'clamp(16px, 1.4vw, 24px)', lineHeight: 1.3, margin: 0, marginBottom: '1vw' }}>Compañía<br />diaria</h3>
            <div style={{ marginBottom: '1.2vw' }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: 'rgba(234,179,8,0.9)', fontSize: 'clamp(28px, 2.6vw, 42px)', lineHeight: 1, letterSpacing: '-0.02em' }}>$380.000</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#888', fontSize: '0.85vw', marginLeft: '0.3vw' }}>/mes</span>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(234,179,8,0.15)', marginBottom: '1.2vw' }} />
            <div className="flex flex-col" style={{ gap: '0.7vw', flex: 1 }}>
              {['Mensajes ilimitados diarios', 'Llamadas incluidas sin límite', 'Dos citas virtuales de 3 hs al mes', 'Prioridad en atención y respuestas', 'Compañera fiel en cada momento'].map((f, i) => (
                <div key={i} className="flex items-start" style={{ gap: '0.5vw' }}>
                  <span style={{ color: 'rgba(234,179,8,0.8)', fontSize: '0.9vw', lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#5A5A5A', fontSize: '0.88vw', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button type="button" className="pricing-cta" onClick={() => scrollToContact('diaria')} style={{ width: '100%', padding: '0.65vw 0', borderRadius: '50px', backgroundColor: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.35)', color: 'rgba(180,140,8,0.9)', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.9vw', cursor: 'pointer', marginTop: '1.5vw' }}>
              Elegir plan
            </button>
          </div>
        </div>

        {/* Privacidad */}
        <div
          className={`flex items-start entrance-pricing-privacy ${hasAnimated ? 'animate' : ''}`}
          style={{ marginTop: '3.5vw', maxWidth: '55vw', padding: '1.4vw 2vw', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))', backdropFilter: 'blur(12px)', border: '1px solid rgba(246,158,130,0.25)', boxShadow: '0 2px 12px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7)', gap: '1.2vw' }}
        >
          <div style={{ width: 'clamp(32px, 2.5vw, 42px)', height: 'clamp(32px, 2.5vw, 42px)', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(246,158,130,0.2), rgba(249,221,163,0.15))', border: '1px solid rgba(246,158,130,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 'clamp(14px, 1.2vw, 20px)' }}>🔒</div>
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#F69E82', fontSize: '0.95vw', margin: 0, marginBottom: '0.4vw' }}>Privacidad y seguridad garantizada</h4>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: '#5A5A5A', fontSize: '0.85vw', lineHeight: 1.7, margin: 0 }}>
              La identidad de Camil se mantendrá siempre en reserva por su seguridad. Todas las interacciones se realizan en un marco de respeto, confianza y discreción absoluta. Podés cancelar cuando quieras, sin permanencia mínima.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingScreen;s