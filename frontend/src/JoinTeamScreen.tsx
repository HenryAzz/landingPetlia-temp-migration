import { useState } from 'react';

interface JoinTeamScreenProps {
  onGoBack?: () => void;
}

const JoinTeamScreen = ({ onGoBack }: JoinTeamScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  const benefits = [
    { emoji: '💰', title: 'Bien remunerado', tip: 'Ingresos justos y flexibles' },
    { emoji: '🏠', title: '100% remoto', tip: 'Trabajá desde donde quieras' },
    { emoji: '🔒', title: 'Privacidad total', tip: 'Tu identidad siempre protegida' },
    { emoji: '💛', title: 'Acompañamiento', tip: 'Formación y apoyo del equipo' },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      <style>{`
        .jt-input {
          width: 100%;
          padding: 0.8vw 1.2vw;
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
        .jt-input::placeholder { color: rgba(255,255,255,0.4); }
        .jt-input:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }
        .jt-input:hover:not(:focus) {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
        }
        .jt-textarea {
          width: 100%;
          padding: 0.8vw 1.2vw;
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
          min-height: 5.5vw;
          transition: all 0.3s ease;
        }
        .jt-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .jt-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }
        .jt-textarea:hover:not(:focus) {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
        }
        .jt-method-btn { transition: all 0.3s ease; cursor: pointer; }
        .jt-method-btn:hover { background: rgba(255,255,255,0.15); }
        .jt-submit-btn {
          position: relative; overflow: hidden; transition: all 0.35s ease;
        }
        .jt-submit-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .jt-submit-btn:hover::before { left: 100%; }
        .jt-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249,221,163,0.3); }
        .jt-submit-btn:active { transform: translateY(0px); box-shadow: 0 2px 10px rgba(249,221,163,0.2); }
        .jt-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }
        .jt-back-btn { transition: all 0.3s ease; cursor: pointer; }
        .jt-back-btn:hover { background: rgba(255,255,255,0.12) !important; color: #F9DDA3 !important; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.06); }
        }
        @keyframes shimmer2 {
          0%, 100% { opacity: 0.5; transform: scale(1.04); }
          50% { opacity: 0.35; transform: scale(0.96); }
        }
        .jt-heart-1 {
          animation: shimmer 3.5s ease-in-out infinite;
        }
        .jt-heart-2 {
          animation: shimmer2 4.2s ease-in-out infinite;
        }
        .jt-animate-1 { animation: fadeInUp 0.6s ease-out 0.1s both; }
        .jt-animate-2 { animation: fadeInUp 0.6s ease-out 0.2s both; }
        .jt-animate-3 { animation: fadeInUp 0.6s ease-out 0.35s both; }
        .jt-animate-4 { animation: fadeInUp 0.6s ease-out 0.45s both; }
        .jt-animate-img { animation: fadeInLeft 0.8s ease-out 0.3s both; }
        .jt-success-animation { animation: fadeInScale 0.5s ease-out; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .jt-loading-spinner {
          animation: spin 1s linear infinite;
          border: 2px solid rgba(90,69,32,0.2);
          border-top-color: #5A4520;
          border-radius: 50%;
          width: 1.3vw;
          height: 1.3vw;
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(4px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .jt-tooltip {
          animation: tooltipIn 0.2s ease-out both;
        }
      `}</style>

      {/* ===== FONDO AZUL ===== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
         src="/fondoliso.jpeg"
          alt=""
          className="object-cover"
          style={{ width: '140%', height: '140%', minWidth: '140%', minHeight: '140%' }}
        />
      </div>

      {/* ===== IMAGEN AVATARS ===== */}
      <img
        src="/avatars.png"
        alt="Camil junto a su equipo"
        className="jt-animate-img"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '36vw',
          width: '28vw',
          maxWidth: '480px',
          height: 'auto',
          zIndex: 15,
          filter: 'drop-shadow(0 4px 25px rgba(0,0,0,0.3))',
          pointerEvents: 'none',
          marginBottom: '-1.4vw',
        }}
      />

      {/* ===== CORAZONES en zig-zag entre título y form ===== */}
      <img
        src="/corazonizquierda.png"
        alt=""
        className="jt-heart-1"
        style={{
          position: 'absolute',
          top: '18vh',
          left: '50.5%',
          width: '5vw',
          height: 'auto',
          zIndex: 12,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 2px 8px rgba(249,221,163,0.2))',
        }}
      />
      <img
        src="/corazonderecha.png"
        alt=""
        className="jt-heart-2"
        style={{
          position: 'absolute',
          top: '30vh',
          left: '53%',
          width: '4vw',
          height: 'auto',
          zIndex: 12,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 2px 8px rgba(249,221,163,0.15))',
        }}
      />

      {/* ===== GLOW ===== */}
      <div
        style={{
          position: 'absolute',
          bottom: '-6vw',
          left: '30vw',
          width: '34vw',
          height: '34vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,221,163,0.05) 0%, transparent 65%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* ===== BARRA SUPERIOR ===== */}
      <div
        className="absolute top-0 left-0 w-full z-50 flex items-center"
        style={{ padding: '1.5vw 3vw', gap: '0.8vw' }}
      >
        <button
          onClick={onGoBack}
          className="jt-back-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5vw',
            padding: '0.5vw 1.2vw',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '0.95vw',
          }}
        >
          ← Volver al inicio
        </button>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4vw',
            padding: '0.5vw 1.1vw',
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '0.95vw',
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ fontSize: '1vw' }}>🌟</span>
          Sumate al equipo
        </span>
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="relative z-10 w-full h-full flex">

        {/* COLUMNA IZQUIERDA */}
        <div
          className="flex-shrink-0 flex flex-col justify-center"
          style={{
            width: '52%',
            paddingLeft: '6vw',
            paddingRight: '2vw',
            paddingTop: '4vw',
            paddingBottom: '5vw',
          }}
        >
          <h1
            className="jt-animate-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#FFFFFF',
              fontSize: 'clamp(36px, 3.6vw, 64px)',
              lineHeight: 1.15,
              letterSpacing: '0.03em',
              margin: 0,
              marginBottom: '1.4vw',
              textShadow: '0 2px 10px rgba(0,0,0,0.15)',
            }}
          >
            Camil quiere dar el<br />
            mejor servicio.<br />
            Pero no puede <span style={{ fontWeight: 500, color: '#F9DDA3' }}>sola</span>.
          </h1>

          <p
            className="jt-animate-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: 'rgba(255,255,255,0.88)',
              fontSize: '1.2vw',
              lineHeight: 1.8,
              margin: 0,
              marginBottom: '1vw',
              maxWidth: '31vw',
            }}
          >
            Cada persona que nos elige merece{' '}
            <span style={{ color: '#F9DDA3', fontWeight: 500 }}>atención genuina</span>,
            calidez real y una conexión auténtica. Nuestro compromiso con la calidad
            significa que no podemos acapararlo todo.
          </p>

          <p
            className="jt-animate-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: 'rgba(255,255,255,0.68)',
              fontSize: '1.1vw',
              lineHeight: 1.8,
              margin: 0,
              marginBottom: '2vw',
              maxWidth: '31vw',
            }}
          >
            Por eso buscamos personas especiales que compartan nuestra visión:
            empatía, dedicación y cariño en cada mensaje. Si sentís que podés
            aportar eso, nos encantaría conocerte.
          </p>

          {/* Frase cierre — antes era caption de la imagen */}
          <p
            className="jt-animate-3"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95vw',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '28vw',
            }}
          >
            Juntas podemos llegar a más personas 💛
          </p>
        </div>

        {/* COLUMNA DERECHA */}
        <div
          className="flex-shrink-0 flex items-center justify-end"
          style={{
            width: '48%',
            paddingRight: '2.5vw',
            paddingTop: '4vw',
            paddingBottom: '2.5vw',
          }}
        >
          <div
            className="flex flex-col"
            style={{ width: '100%', maxWidth: '33vw', gap: '0.8vw' }}
          >
            {/* Beneficios con tooltip */}
            <div
              className="jt-animate-3 flex"
              style={{ gap: '0.7vw', width: '100%', position: 'relative' }}
            >
              {benefits.map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3vw',
                    padding: '0.75vw 0.4vw',
                    borderRadius: '14px',
                    background: hoveredCard === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${hoveredCard === i ? 'rgba(249,221,163,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    position: 'relative',
                    transform: hoveredCard === i ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span style={{ fontSize: '1.2vw' }}>{item.emoji}</span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      color: '#F9DDA3',
                      fontSize: '0.78vw',
                      textAlign: 'center',
                    }}
                  >
                    {item.title}
                  </span>

                  {hoveredCard === i && (
                    <div
                      className="jt-tooltip"
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '0.4vw',
                        padding: '0.35vw 0.7vw',
                        borderRadius: '10px',
                        background: 'rgba(20,40,70,0.95)',
                        border: '1px solid rgba(249,221,163,0.2)',
                        backdropFilter: 'blur(8px)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 400,
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.72vw',
                        }}
                      >
                        {item.tip}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Formulario */}
            <div className="jt-animate-4" style={{ width: '100%' }}>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                  style={{
                    width: '100%',
                    padding: '2vw',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
                    gap: '1vw',
                  }}
                >
                  <div style={{ marginBottom: '0.1vw' }}>
                    <h3
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        color: '#F9DDA3',
                        fontSize: '1.35vw',
                        margin: 0,
                        marginBottom: '0.25vw',
                      }}
                    >
                      Postulación
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: '0.88vw',
                        margin: 0,
                      }}
                    >
                      Contanos sobre vos y por qué te gustaría sumarte
                    </p>
                  </div>

                  <div className="flex" style={{ gap: '0.7vw' }}>
                    <div className="flex flex-col" style={{ gap: '0.35vw', flex: 1 }}>
                      <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.65)', fontSize: '0.88vw' }}>
                        Nombre *
                      </label>
                      <input type="text" name="nombre" className="jt-input" placeholder="¿Cómo te llamás?" required />
                    </div>
                    <div className="flex flex-col" style={{ gap: '0.35vw', width: '28%' }}>
                      <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.65)', fontSize: '0.88vw' }}>
                        Edad *
                      </label>
                      <input type="number" name="edad" className="jt-input" placeholder="Edad" min="18" max="65" required />
                    </div>
                  </div>

                  <div className="flex flex-col" style={{ gap: '0.35vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.65)', fontSize: '0.88vw' }}>
                      ¿Cómo preferís que te contactemos? *
                    </label>
                    <div className="flex" style={{ gap: '0.5vw', marginBottom: '0.3vw' }}>
                      {(['telefono', 'correo'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          className="jt-method-btn"
                          onClick={() => setContactMethod(method)}
                          style={{
                            padding: '0.4vw 1.1vw',
                            borderRadius: '50px',
                            border: `1px solid ${contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                            backgroundColor: contactMethod === method ? 'rgba(249,221,163,0.15)' : 'transparent',
                            color: contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            fontSize: '0.88vw',
                          }}
                        >
                          {method === 'telefono' ? '📞 Teléfono' : '✉️ Correo'}
                        </button>
                      ))}
                    </div>
                    <input
                      type={contactMethod === 'telefono' ? 'tel' : 'email'}
                      name="contacto"
                      className="jt-input"
                      placeholder={contactMethod === 'telefono' ? 'Ej: +54 11 1234-5678' : 'Tu correo electrónico'}
                      required
                    />
                  </div>

                  <div className="flex flex-col" style={{ gap: '0.35vw' }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.65)', fontSize: '0.88vw' }}>
                      ¿Por qué te gustaría ser parte del equipo? *
                    </label>
                    <textarea
                      name="mensaje"
                      className="jt-textarea"
                      placeholder="¿Qué te motiva? ¿Tenés experiencia en acompañamiento o atención a personas?"
                      required
                    />
                  </div>

                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.78vw', lineHeight: 1.6, margin: 0 }}>
                    Al enviar aceptás nuestra{' '}
                    <span style={{ color: 'rgba(249,221,163,0.55)', cursor: 'pointer', textDecoration: 'underline' }}>política de privacidad</span> y{' '}
                    <span style={{ color: 'rgba(249,221,163,0.55)', cursor: 'pointer', textDecoration: 'underline' }}>términos y condiciones</span>.
                  </p>

                  <button
                    type="submit"
                    className="jt-submit-btn"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.8vw 0',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #F9DDA3, #f0c96e)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#5A4520',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.05vw',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(249,221,163,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5vw',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="jt-loading-spinner" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar postulación 🌟'
                    )}
                  </button>
                </form>
              ) : (
                <div
                  className="jt-success-animation flex flex-col items-center justify-center"
                  style={{
                    width: '100%',
                    padding: '3vw 2vw',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    gap: '1.2vw',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 'clamp(55px, 4.5vw, 75px)',
                      height: 'clamp(55px, 4.5vw, 75px)',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2))',
                      border: '2px solid rgba(249,221,163,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(26px, 2.2vw, 38px)',
                    }}
                  >
                    🌟
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      color: '#F9DDA3',
                      fontSize: '1.6vw',
                      margin: 0,
                    }}
                  >
                    ¡Postulación recibida!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '1.05vw',
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: '24vw',
                    }}
                  >
                    Recibimos tu postulación y la revisaremos con mucho cariño.
                    <br /><br />
                    Si tu perfil encaja con lo que buscamos, nos pondremos en contacto pronto.
                    <br /><br />
                    ¡Gracias por querer ser parte de algo especial! 💛
                  </p>
                  <div className="flex" style={{ gap: '0.8vw', marginTop: '0.5vw' }}>
                    <button
                      type="button"
                      onClick={handleReset}
                      style={{
                        padding: '0.5vw 1.4vw',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: '0.9vw',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.color = '#F9DDA3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      }}
                    >
                      Enviar otra postulación
                    </button>
                    <button
                      type="button"
                      onClick={onGoBack}
                      style={{
                        padding: '0.5vw 1.4vw',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, rgba(249,221,163,0.15), rgba(249,221,163,0.08))',
                        border: '1px solid rgba(249,221,163,0.3)',
                        color: '#F9DDA3',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.9vw',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,221,163,0.25), rgba(249,221,163,0.15))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,221,163,0.15), rgba(249,221,163,0.08))';
                      }}
                    >
                      ← Volver al inicio
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamScreen;