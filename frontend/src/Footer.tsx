const Footer = () => {
    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <footer
        className="relative w-full"
        style={{
          backgroundColor: '#F9DDA3',
        }}
      >
        <div
          className="flex justify-between"
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '0.5vw 6vw 1.5vw' }}
        >
          {/* Col 1 — Logo grande + descripción */}
          <div className="flex flex-col" style={{ gap: '1vw', maxWidth: '24vw' }}>
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src="/logo.png"
                alt="Camil Virtual"
                style={{
                  height: '12.5vw',
                  width: 'auto',
                }}
              />
            </button>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(90,69,32,0.7)', fontSize: '0.85vw', lineHeight: 1.7, margin: 0 }}>
              Compañía emocional genuina en un mundo digital. Porque todos merecemos a alguien que nos escuche de verdad.
            </p>
          </div>
  
          {/* Col 2 — Nav */}
          <div className="flex flex-col" style={{ gap: '0.7vw' }}>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#5A4520', fontSize: '0.88vw', letterSpacing: '0.08em', margin: 0, marginBottom: '0.3vw', textTransform: 'uppercase' }}>Navegación</h4>
            {[
              { label: 'Inicio', id: 'inicio' },
              { label: 'Cómo funciona', id: 'como-funciona' },
              { label: 'Vínculos', id: 'vinculos' },
              { label: 'Planes', id: 'planes' },
              { label: 'Preguntas frecuentes', id: 'faq' },
              { label: 'Contacto', id: 'contacto' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: 'rgba(90,69,32,0.65)',
                  fontSize: '0.85vw',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5A4520')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(90,69,32,0.65)')}
              >
                {item.label}
              </button>
            ))}
          </div>
  
          {/* Col 3 — Legal */}
          <div className="flex flex-col" style={{ gap: '0.7vw' }}>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#5A4520', fontSize: '0.88vw', letterSpacing: '0.08em', margin: 0, marginBottom: '0.3vw', textTransform: 'uppercase' }}>Legal</h4>
            {['Términos y condiciones', 'Política de privacidad', 'Política de cookies', 'Política de reembolso'].map((item) => (
              <button
                key={item}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: 'rgba(90,69,32,0.65)',
                  fontSize: '0.85vw',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5A4520')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(90,69,32,0.65)')}
              >
                {item}
              </button>
            ))}
          </div>
  
          {/* Col 4 — Contacto */}
          <div className="flex flex-col" style={{ gap: '0.7vw' }}>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#5A4520', fontSize: '0.88vw', letterSpacing: '0.08em', margin: 0, marginBottom: '0.3vw', textTransform: 'uppercase' }}>Contacto</h4>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(90,69,32,0.65)', fontSize: '0.85vw' }}>📧 hola@camilvirtual.com</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(90,69,32,0.65)', fontSize: '0.85vw' }}>📱 @camilvirtual</span>
  
            <div className="flex items-center" style={{ gap: '0.6vw', marginTop: '0.5vw' }}>
              {['Instagram', 'TikTok', 'Twitter'].map((social) => (
                <div
                  key={social}
                  style={{
                    width: 'clamp(30px, 2.3vw, 38px)',
                    height: 'clamp(30px, 2.3vw, 38px)',
                    borderRadius: '50%',
                    background: 'rgba(90,69,32,0.1)',
                    border: '1px solid rgba(90,69,32,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: 'rgba(90,69,32,0.6)',
                    fontSize: '0.7vw',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(90,69,32,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(90,69,32,0.35)';
                    e.currentTarget.style.color = '#5A4520';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(90,69,32,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(90,69,32,0.2)';
                    e.currentTarget.style.color = 'rgba(90,69,32,0.6)';
                  }}
                >
                  {social.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(90,69,32,0.12)',
            padding: '1.2vw 6vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(90,69,32,0.5)', fontSize: '0.78vw' }}>
            © {new Date().getFullYear()} Camil Virtual. Todos los derechos reservados.
          </span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(90,69,32,0.4)', fontSize: '0.75vw' }}>
            Hecho con 💛 para quienes necesitan ser escuchados
          </span>
        </div>
      </footer>
    );
  };
  
  export default Footer;