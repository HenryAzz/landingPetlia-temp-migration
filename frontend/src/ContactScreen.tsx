import { useState, useEffect, useRef } from 'react';

interface ContactScreenProps {
  preSelectedPlan?: string;
  onNavigateToJoinTeam?: () => void;
}

const ContactScreen = ({ preSelectedPlan, onNavigateToJoinTeam }: ContactScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (preSelectedPlan) {
      setSelectedPlan(preSelectedPlan);
    }
  }, [preSelectedPlan]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPlan('');
  };

  const plans = [
    { id: 'correspondencia', label: 'Correspondencia especial — $90.000/mes', bg: 'rgba(14,116,144,0.08)', border: 'rgba(14,116,144,0.3)' },
    { id: 'casual', label: 'Casualmente cotidiano — $180.000/mes', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.3)' },
    { id: 'diaria', label: 'Compañía diaria — $380.000/mes', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  ];

  const garantias = [
    { emoji: '⏰', text: 'Respuesta en menos de 24 hs' },
    { emoji: '🔒', text: 'Tu información es 100% confidencial' },
    { emoji: '💛', text: 'Sin compromiso, es solo el primer paso' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: '100vh', paddingTop: '6vw', paddingBottom: '4vw' }}
    >
      <style>{`
        .contact-input {
          width: 100%;
          padding: 0.85vw 1.3vw;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 1vw;
          letter-spacing: 0.02em;
          outline: none;
          transition: all 0.3s ease;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.4); }
        .contact-input:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }
        .contact-textarea {
          width: 100%;
          padding: 0.85vw 1.3vw;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 1vw;
          outline: none;
          resize: none;
          min-height: 6vw;
          transition: all 0.3s ease;
        }
        .contact-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .contact-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }
        .method-btn { transition: all 0.3s ease; cursor: pointer; }
        .method-btn:hover { background: rgba(255,255,255,0.15); }
        .plan-option { transition: all 0.3s ease; cursor: pointer; }
        .plan-option:hover { transform: translateY(-1px); }
        .submit-btn {
          position: relative; overflow: hidden; transition: all 0.35s ease;
        }
        .submit-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249,221,163,0.3); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-spinner {
          animation: spin 1s linear infinite;
          border: 2px solid rgba(90,69,32,0.2);
          border-top-color: #5A4520;
          border-radius: 50%;
          width: 1.4vw;
          height: 1.4vw;
        }

        .join-team-link {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .join-team-link:hover {
          background: rgba(249,221,163,0.12) !important;
          border-color: rgba(249,221,163,0.4) !important;
          transform: translateY(-1px);
        }

        /* ── Success state animations ── */
        @keyframes successHeartPop {
          0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
          50%  { opacity: 1; transform: scale(1.2) rotate(5deg); }
          70%  { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes successFadeUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes successCheckmark {
          0%   { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .success-heart {
          animation: successHeartPop 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .success-title {
          opacity: 0;
          animation: successFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.25s;
        }
        .success-text {
          opacity: 0;
          animation: successFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
        }
        .success-btn {
          opacity: 0;
          animation: successFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
        }

        /* ── Entrance animations (one-time) ── */
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-45px); }
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
        @keyframes formReveal {
          0%   { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes garantiaFade {
          0%   { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .entrance-contact-badge { opacity: 0; }
        .entrance-contact-badge.animate {
          animation: pillPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        .entrance-contact-title { opacity: 0; }
        .entrance-contact-title.animate {
          animation: fadeSlideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }
        .entrance-contact-desc { opacity: 0; }
        .entrance-contact-desc.animate {
          animation: fadeSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.35s;
        }
        .entrance-contact-garantia { opacity: 0; }
        .entrance-contact-garantia.animate {
          animation: garantiaFade 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .entrance-contact-garantia.animate.garantia-0 { animation-delay: 0.5s; }
        .entrance-contact-garantia.animate.garantia-1 { animation-delay: 0.6s; }
        .entrance-contact-garantia.animate.garantia-2 { animation-delay: 0.7s; }
        .entrance-contact-form { opacity: 0; }
        .entrance-contact-form.animate {
          animation: formReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }
        .entrance-contact-join { opacity: 0; }
        .entrance-contact-join.animate {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/fondoazul.png"
          alt=""
          className="object-cover"
          style={{ width: '140%', height: '140%', minWidth: '140%', minHeight: '140%' }}
        />
      </div>

      {/* Onda amarilla arriba */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ zIndex: 30 }}>
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none" style={{ height: '65px', transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex min-h-0 w-full items-center">
        {/* CAJA IZQUIERDA */}
        <div className="h-full flex items-center justify-center flex-shrink-0" style={{ width: '45%' }}>
          <div className="flex flex-col items-start justify-center" style={{ width: '100%', paddingLeft: '6vw', paddingRight: '3vw', gap: '2vw' }}>
            <span
              className={`entrance-contact-badge ${hasAnimated ? 'animate' : ''}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4vw',
                padding: '0.4vw 1.1vw', borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff',
                fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                fontSize: '0.9vw', letterSpacing: '0.07em',
              }}
            >
              <span style={{ fontSize: '0.95vw' }}>💌</span>
              Comenzá ahora
            </span>

            <h2
              className={`entrance-contact-title ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontStyle: 'italic',
                color: '#FFFFFF', fontSize: 'clamp(42px, 4.5vw, 75px)', lineHeight: 1.2,
                letterSpacing: '0.03em', margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.15)',
              }}
            >
              Tu primer paso<br />hacia algo <span style={{ fontWeight: 500 }}>especial</span>
            </h2>

            <p
              className={`entrance-contact-desc ${hasAnimated ? 'animate' : ''}`}
              style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                color: 'rgba(255,255,255,0.8)', fontSize: '1.2vw',
                lineHeight: 1.7, margin: 0, maxWidth: '30vw',
              }}
            >
              Completá el formulario y el equipo de Camil se pondrá en contacto con vos en menos de 24 hs para conocerte y comenzar esta experiencia juntos.
            </p>

            <div className="flex flex-col" style={{ gap: '0.8vw', marginTop: '0.5vw' }}>
              {garantias.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center entrance-contact-garantia garantia-${i} ${hasAnimated ? 'animate' : ''}`}
                  style={{ gap: '0.6vw' }}
                >
                  <div
                    style={{
                      width: 'clamp(28px, 2.2vw, 36px)',
                      height: 'clamp(28px, 2.2vw, 36px)',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9vw',
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                      color: 'rgba(255,255,255,0.65)', fontSize: '0.95vw',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CAJA DERECHA */}
        <div className="h-full flex-shrink-0 flex items-center justify-center" style={{ width: '55%' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2vw' }}>
            {!submitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`flex flex-col entrance-contact-form ${hasAnimated ? 'animate' : ''}`}
                  style={{
                    width: '100%', maxWidth: '34vw', padding: '2.5vw',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
                    gap: '1.3vw',
                  }}
                >
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#F9DDA3', fontSize: '1.4vw', margin: 0, marginBottom: '0.3vw' }}>
                    Solicitar vínculo
                  </h3>

                  <div className="flex flex-col" style={{ gap: '0.4vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.88vw' }}>Nombre *</label>
                    <input type="text" name="nombre" className="contact-input" placeholder="¿Cómo te llamás?" required />
                  </div>

                  <div className="flex flex-col" style={{ gap: '0.4vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.88vw' }}>¿Cómo preferís que te contactemos? *</label>
                    <div className="flex" style={{ gap: '0.5vw', marginBottom: '0.4vw' }}>
                      {(['telefono', 'correo'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          className="method-btn"
                          onClick={() => setContactMethod(method)}
                          style={{
                            padding: '0.4vw 1.1vw', borderRadius: '50px',
                            border: `1px solid ${contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                            backgroundColor: contactMethod === method ? 'rgba(249,221,163,0.15)' : 'transparent',
                            color: contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                            fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.88vw',
                          }}
                        >
                          {method === 'telefono' ? '📞 Teléfono' : '✉️ Correo'}
                        </button>
                      ))}
                    </div>
                    <input
                      type={contactMethod === 'telefono' ? 'tel' : 'email'}
                      name="contacto"
                      className="contact-input"
                      placeholder={contactMethod === 'telefono' ? 'Ej: +54 11 1234-5678' : 'Tu correo electrónico'}
                      required
                    />
                  </div>

                  <div className="flex flex-col" style={{ gap: '0.4vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.88vw' }}>Plan de interés *</label>
                    <div className="flex flex-col" style={{ gap: '0.45vw' }}>
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          className="plan-option"
                          onClick={() => setSelectedPlan(plan.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.6vw',
                            padding: '0.6vw 1.1vw', borderRadius: '12px',
                            border: `1.5px solid ${selectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.15)'}`,
                            backgroundColor: selectedPlan === plan.id ? plan.bg : 'rgba(255,255,255,0.05)',
                            textAlign: 'left', cursor: 'pointer',
                          }}
                        >
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {selectedPlan === plan.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />}
                          </div>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: selectedPlan === plan.id ? 500 : 400, color: selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)', fontSize: '0.92vw' }}>
                            {plan.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col" style={{ gap: '0.4vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.88vw' }}>
                      Contanos un poco sobre vos *
                    </label>
                    <textarea
                      name="mensaje"
                      className="contact-textarea"
                      placeholder="¿Para quién es el servicio? ¿Qué te motivó a escribirnos?"
                      required
                    />
                  </div>

                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.78vw', lineHeight: 1.6, margin: 0 }}>
                    Al enviar aceptás nuestra{' '}
                    <span style={{ color: 'rgba(249,221,163,0.6)', cursor: 'pointer', textDecoration: 'underline' }}>política de privacidad</span> y{' '}
                    <span style={{ color: 'rgba(249,221,163,0.6)', cursor: 'pointer', textDecoration: 'underline' }}>términos y condiciones</span>.
                  </p>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    style={{
                      width: '100%', padding: '0.85vw 0', borderRadius: '50px',
                      background: 'linear-gradient(135deg, #F9DDA3, #f0c96e)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#5A4520', fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600, fontSize: '1.05vw',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(249,221,163,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5vw',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar solicitud'
                    )}
                  </button>
                </form>

                <button
                  type="button"
                  className={`join-team-link entrance-contact-join ${hasAnimated ? 'animate' : ''}`}
                  onClick={onNavigateToJoinTeam}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6vw',
                    padding: '0.7vw 1.6vw', borderRadius: '50px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.88vw',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1vw' }}>🌟</span>
                  ¿Querés ser parte del equipo de Camil?
                  <span style={{ color: '#F9DDA3', fontWeight: 500, marginLeft: '0.2vw' }}>Conocé más →</span>
                </button>
              </>
            ) : (
              /* ── Estado de éxito mejorado ── */
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  width: '100%', maxWidth: '34vw', padding: '3.5vw 2.5vw',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  gap: '1.4vw', textAlign: 'center',
                }}
              >
                {/* Corazón animado */}
                <div
                  className="success-heart"
                  style={{
                    width: 'clamp(65px, 5.5vw, 85px)',
                    height: 'clamp(65px, 5.5vw, 85px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2))',
                    border: '2px solid rgba(249,221,163,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(30px, 2.8vw, 42px)',
                    boxShadow: '0 8px 25px rgba(249,221,163,0.15)',
                  }}
                >
                  💛
                </div>

                <h3
                  className="success-title"
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                    color: '#F9DDA3', fontSize: '1.6vw', margin: 0,
                  }}
                >
                  ¡Solicitud enviada!
                </h3>

                <p
                  className="success-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    color: 'rgba(255,255,255,0.75)', fontSize: '1.1vw',
                    lineHeight: 1.7, margin: 0, maxWidth: '26vw',
                  }}
                >
                  El equipo de Camil recibió tu mensaje y se pondrá en contacto con vos en menos de 24 hs.
                  <br /><br />
                  Gracias por dar el primer paso 💌
                </p>

                {/* Línea decorativa */}
                <div
                  className="success-text"
                  style={{
                    width: '5vw', height: '2px', borderRadius: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(249,221,163,0.4), transparent)',
                  }}
                />

                <button
                  type="button"
                  className="success-btn"
                  onClick={handleReset}
                  style={{
                    padding: '0.55vw 1.6vw', borderRadius: '50px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    fontSize: '0.88vw', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#F9DDA3';
                    e.currentTarget.style.borderColor = 'rgba(249,221,163,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  Enviar otra solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactScreen;