import { useState } from 'react';

const ContactScreen = () => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'cliente' | 'camil'>('cliente');
  const [formFade, setFormFade] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleModeSwitch = (newMode: 'cliente' | 'camil') => {
    if (newMode === mode) return;
    setFormFade(false);
    setTimeout(() => {
      setMode(newMode);
      setSubmitted(false);
      setFormFade(true);
    }, 400);
  };

  const plans = [
    { id: 'correspondencia', label: 'Correspondencia especial', color: 'rgba(14, 116, 144, 0.9)', bg: 'rgba(14, 116, 144, 0.08)', border: 'rgba(14, 116, 144, 0.3)' },
    { id: 'casual', label: 'Casualmente cotidiano', color: 'rgba(244, 63, 94, 0.9)', bg: 'rgba(244, 63, 94, 0.08)', border: 'rgba(244, 63, 94, 0.3)' },
    { id: 'diaria', label: 'Compañía diaria', color: 'rgba(234, 179, 8, 0.9)', bg: 'rgba(234, 179, 8, 0.08)', border: 'rgba(234, 179, 8, 0.3)' },
  ];

  const garantias = mode === 'cliente'
    ? [
        { emoji: '⏰', text: 'Respuesta en menos de 24 hs' },
        { emoji: '🔒', text: 'Tu información es 100% confidencial' },
        { emoji: '💛', text: 'Sin compromiso, es solo el primer paso' },
      ]
    : [
        { emoji: '💰', text: 'Trabajo flexible y bien remunerado' },
        { emoji: '🏠', text: '100% remoto, desde donde quieras' },
        { emoji: '🔒', text: 'Tu identidad siempre protegida' },
      ];

  return (
    <section
      id="contacto"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: '100vh' }}
    >
      <style>{`
        .contact-input {
          width: 100%;
          padding: 0.7vw 1.2vw;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 0.9vw;
          letter-spacing: 0.02em;
          outline: none;
          transition: all 0.3s ease;
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .contact-input:focus {
          border-color: #F9DDA3;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(249, 221, 163, 0.15);
        }
        .contact-textarea {
          width: 100%;
          padding: 0.7vw 1.2vw;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 0.9vw;
          letter-spacing: 0.02em;
          outline: none;
          resize: none;
          min-height: 5vw;
          transition: all 0.3s ease;
        }
        .contact-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .contact-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(249, 221, 163, 0.15);
        }
        .method-btn {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .method-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .plan-option {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .plan-option:hover {
          transform: translateY(-1px);
        }
        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before {
          left: 100%;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 221, 163, 0.3);
        }
        .form-transition {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .form-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .form-hidden {
          opacity: 0;
          transform: translateY(10px);
        }
        .mode-switch {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .mode-switch:hover {
          color: #F9DDA3 !important;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .success-animation {
          animation: fadeInScale 0.5s ease-out;
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/fondoazul.png"
          alt=""
          className="object-cover"
          style={{
            width: '140%',
            height: '140%',
            minWidth: '140%',
            minHeight: '140%',
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex min-h-0 w-full">

        {/* CAJA IZQUIERDA — 45% */}
        <div
          className="h-full flex items-center justify-center flex-shrink-0"
          style={{ width: '45%' }}
        >
          <div
            className="flex flex-col items-start justify-center"
            style={{
              width: '100%',
              paddingLeft: '6vw',
              paddingRight: '3vw',
              gap: '2vw',
            }}
          >
            {/* Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4vw',
                padding: '0.35vw 1vw',
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '0.82vw',
                letterSpacing: '0.07em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '0.85vw' }}>
                {mode === 'cliente' ? '💌' : '🌟'}
              </span>
              {mode === 'cliente' ? 'Comenzá ahora' : 'Sumate al equipo'}
            </span>

            {/* Título */}
            <div className={`form-transition ${formFade ? 'form-visible' : 'form-hidden'}`}>
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#FFFFFF',
                  fontSize: 'clamp(42px, 4.5vw, 75px)',
                  lineHeight: 1.2,
                  letterSpacing: '0.03em',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                }}
              >
                {mode === 'cliente' ? (
                  <>
                    Tu primer paso
                    <br />
                    hacia algo{' '}
                    <span style={{ fontWeight: 500 }}>especial</span>
                  </>
                ) : (
                  <>
                    Convertite en
                    <br />
                    una{' '}
                    <span style={{ fontWeight: 500 }}>Camil</span>
                  </>
                )}
              </h2>
            </div>

            {/* Descripción */}
            <div className={`form-transition ${formFade ? 'form-visible' : 'form-hidden'}`}>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1vw',
                  lineHeight: 1.7,
                  letterSpacing: '0.02em',
                  margin: 0,
                  maxWidth: '30vw',
                }}
              >
                {mode === 'cliente'
                  ? 'Completá el formulario y el equipo de Camil se pondrá en contacto con vos en menos de 24 hs para conocerte y comenzar esta experiencia juntos.'
                  : '¿Sos empática, creativa y te apasiona conectar con personas? Estamos buscando chicas especiales que quieran formar parte de algo único. Dejá tus datos y te contactamos.'}
              </p>
            </div>

            {/* Garantías */}
            <div
              className={`flex flex-col form-transition ${formFade ? 'form-visible' : 'form-hidden'}`}
              style={{ gap: '0.7vw', marginTop: '0.5vw' }}
            >
              {garantias.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center"
                  style={{ gap: '0.5vw' }}
                >
                  <span style={{ fontSize: '0.9vw' }}>{item.emoji}</span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontSize: '0.85vw',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CAJA DERECHA — 55% */}
        <div
          className="h-full flex-shrink-0 flex items-center justify-center"
          style={{ width: '55%' }}
        >
          <div
            className={`form-transition ${formFade ? 'form-visible' : 'form-hidden'}`}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col"
                style={{
                  width: '100%',
                  maxWidth: '32vw',
                  padding: '2.2vw',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  gap: '1.2vw',
                }}
              >
                {/* Título del form */}
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: '#F9DDA3',
                    fontSize: '1.3vw',
                    letterSpacing: '0.03em',
                    margin: 0,
                    marginBottom: '0.3vw',
                  }}
                >
                  {mode === 'cliente' ? 'Solicitar vínculo' : 'Postulación'}
                </h3>

                {/* Nombre */}
                <div className="flex flex-col" style={{ gap: '0.3vw' }}>
                  <label
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.78vw',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="contact-input"
                    placeholder="¿Cómo te llamás?"
                    required
                  />
                </div>

                {/* Edad — solo para camil */}
                {mode === 'camil' && (
                  <div className="flex flex-col" style={{ gap: '0.3vw' }}>
                    <label
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.78vw',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Edad
                    </label>
                    <input
                      type="number"
                      className="contact-input"
                      placeholder="Tu edad"
                      min="18"
                      required
                    />
                  </div>
                )}

                {/* Selector teléfono / correo */}
                <div className="flex flex-col" style={{ gap: '0.3vw' }}>
                  <label
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.78vw',
                      letterSpacing: '0.04em',
                    }}
                  >
                    ¿Cómo preferís que te contactemos?
                  </label>
                  <div className="flex" style={{ gap: '0.5vw', marginBottom: '0.4vw' }}>
                    <button
                      type="button"
                      className="method-btn"
                      onClick={() => setContactMethod('telefono')}
                      style={{
                        padding: '0.35vw 1vw',
                        borderRadius: '50px',
                        border: `1px solid ${contactMethod === 'telefono' ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                        backgroundColor: contactMethod === 'telefono' ? 'rgba(249, 221, 163, 0.15)' : 'transparent',
                        color: contactMethod === 'telefono' ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.78vw',
                        letterSpacing: '0.04em',
                      }}
                    >
                      📞 Teléfono
                    </button>
                    <button
                      type="button"
                      className="method-btn"
                      onClick={() => setContactMethod('correo')}
                      style={{
                        padding: '0.35vw 1vw',
                        borderRadius: '50px',
                        border: `1px solid ${contactMethod === 'correo' ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                        backgroundColor: contactMethod === 'correo' ? 'rgba(249, 221, 163, 0.15)' : 'transparent',
                        color: contactMethod === 'correo' ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.78vw',
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✉️ Correo
                    </button>
                  </div>
                  <input
                    type={contactMethod === 'telefono' ? 'tel' : 'email'}
                    className="contact-input"
                    placeholder={contactMethod === 'telefono' ? 'Tu número de teléfono' : 'Tu correo electrónico'}
                    required
                  />
                </div>

                {/* Selección de plan — solo para cliente */}
                {mode === 'cliente' && (
                  <div className="flex flex-col" style={{ gap: '0.3vw' }}>
                    <label
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.78vw',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Plan de interés
                    </label>
                    <div className="flex flex-col" style={{ gap: '0.4vw' }}>
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          className="plan-option"
                          onClick={() => setSelectedPlan(plan.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5vw',
                            padding: '0.55vw 1vw',
                            borderRadius: '10px',
                            border: `1.5px solid ${selectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.15)'}`,
                            backgroundColor: selectedPlan === plan.id ? plan.bg : 'rgba(255, 255, 255, 0.05)',
                            textAlign: 'left',
                            cursor: 'pointer',
                          }}
                        >
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              border: `2px solid ${selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {selectedPlan === plan.id && (
                              <div
                                style={{
                                  width: '7px',
                                  height: '7px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FFFFFF',
                                }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: selectedPlan === plan.id ? 500 : 400,
                              color: selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                              fontSize: '0.88vw',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {plan.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Textarea */}
                <div className="flex flex-col" style={{ gap: '0.3vw' }}>
                  <label
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.78vw',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {mode === 'cliente'
                      ? 'Contanos un poco sobre vos'
                      : '¿Por qué te gustaría ser parte del equipo?'}
                  </label>
                  <textarea
                    className="contact-textarea"
                    placeholder={
                      mode === 'cliente'
                        ? '¿Para quién es el servicio? ¿Qué te motivó a escribirnos? Contanos lo que quieras...'
                        : '¿Qué te motiva? ¿Tenés experiencia en acompañamiento o atención? Contanos lo que quieras...'
                    }
                    required
                  />
                </div>

                {/* Botón enviar */}
                <button
                  type="submit"
                  className="submit-btn"
                  style={{
                    width: '100%',
                    padding: '0.75vw 0',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #F9DDA3, #f0c96e)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#5A4520',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.95vw',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(249, 221, 163, 0.2)',
                    marginTop: '0.3vw',
                  }}
                >
                  {mode === 'cliente' ? 'Enviar solicitud' : 'Enviar postulación'}
                </button>

                {/* Aviso */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.72vw',
                    letterSpacing: '0.02em',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  El equipo de Camil te responderá en menos de 24 hs ✨
                </p>

                {/* Switch de modo */}
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    marginTop: '0.3vw',
                  }}
                />
                <button
                  type="button"
                  className="mode-switch"
                  onClick={() => handleModeSwitch(mode === 'cliente' ? 'camil' : 'cliente')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.35)',
                    fontSize: '0.75vw',
                    letterSpacing: '0.03em',
                    textAlign: 'center',
                  }}
                >
                  {mode === 'cliente'
                    ? '¿Querés ser parte del equipo Camil? →'
                    : '← Quiero contratar el servicio'}
                </button>
              </form>
            ) : (
              <div
                className="success-animation flex flex-col items-center justify-center"
                style={{
                  width: '100%',
                  maxWidth: '32vw',
                  padding: '3vw 2.5vw',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  gap: '1.2vw',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 'clamp(60px, 5vw, 80px)',
                    height: 'clamp(60px, 5vw, 80px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(249, 221, 163, 0.3), rgba(246, 158, 130, 0.2))',
                    border: '2px solid rgba(249, 221, 163, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(28px, 2.5vw, 40px)',
                  }}
                >
                  {mode === 'cliente' ? '💛' : '🌟'}
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: '#F9DDA3',
                    fontSize: '1.5vw',
                    letterSpacing: '0.03em',
                    margin: 0,
                  }}
                >
                  {mode === 'cliente' ? '¡Solicitud enviada!' : '¡Postulación recibida!'}
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '1vw',
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: '25vw',
                  }}
                >
                  {mode === 'cliente'
                    ? (
                      <>
                        El equipo de Camil recibió tu mensaje y se pondrá
                        en contacto con vos en menos de 24 hs.
                        <br /><br />
                        Gracias por dar el primer paso 💌
                      </>
                    )
                    : (
                      <>
                        Recibimos tu postulación y la revisaremos
                        con mucho cariño. Nos pondremos en contacto
                        con vos pronto.
                        <br /><br />
                        ¡Gracias por querer ser parte! 🌟
                      </>
                    )
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactScreen;