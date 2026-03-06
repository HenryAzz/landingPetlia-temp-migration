const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="footer-root"
      style={{
        backgroundColor: '#F9DDA3',
        width: '100%',
      }}
    >
      <style>{`
        /* ══════════════════════════════
           DESKTOP — todo vw puro → px fijo
        ══════════════════════════════ */
        .footer-grid {
          display: flex;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 8px 60px 20px;          /* era 0.5vw 6vw 1.5vw → a 5000px = 25px 300px 75px */
        }

        .footer-col-logo {
          display: flex;
          flex-direction: column;
          gap: 14px;                        /* era 1vw → a 5000px = 50px */
          max-width: 340px;                 /* era 24vw → a 5000px = 1200px */
        }

        .footer-logo-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          align-self: flex-start;
          transition: all 0.3s ease;
        }
        .footer-logo-btn:hover {
          opacity: 0.85;
          transform: scale(1.02);
        }

        .footer-logo-img {
          height: clamp(80px, 10vw, 130px); /* era 12.5vw → a 5000px = 625px */
          width: auto;
        }

        .footer-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(90,69,32,0.7);
          font-size: 14px;                  /* era 0.85vw → a 5000px = 42.5px */
          line-height: 1.7;
          margin: 0;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;                        /* era 0.7vw → a 5000px = 35px */
        }

        .footer-col-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #5A4520;
          font-size: 14px;                  /* era 0.88vw → a 5000px = 44px */
          letter-spacing: 0.08em;
          margin: 0 0 4px 0;               /* era 0 0 0.3vw 0 → a 5000px = 15px */
          text-transform: uppercase;
        }

        .footer-col-link {
          background: none;
          border: none;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(90,69,32,0.65);
          font-size: 14px;                  /* era 0.85vw → a 5000px = 42.5px */
          cursor: pointer;
          text-align: left;
          transition: color 0.3s ease;
        }
        .footer-col-link:hover {
          color: #5A4520;
        }

        .footer-contact-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(90,69,32,0.65);
          font-size: 14px;                  /* era 0.85vw */
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 8px;                         /* era 0.6vw → a 5000px = 30px */
          margin-top: 8px;                  /* era 0.5vw → a 5000px = 25px */
        }

        .footer-social-icon {
          width: clamp(30px, 2.3vw, 38px);
          height: clamp(30px, 2.3vw, 38px);
          border-radius: 50%;
          background: rgba(90,69,32,0.1);
          border: 1px solid rgba(90,69,32,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: rgba(90,69,32,0.6);
          font-size: 12px;                  /* era 0.7vw → a 5000px = 35px */
        }
        .footer-social-icon:hover {
          background: rgba(90,69,32,0.2);
          border-color: rgba(90,69,32,0.35);
          color: #5A4520;
        }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(90,69,32,0.12);
          padding: 16px 60px;              /* era 1.2vw 6vw → a 5000px = 60px 300px */
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-bottom-left {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(90,69,32,0.5);
          font-size: 12px;                  /* era 0.78vw → a 5000px = 39px */
        }

        .footer-bottom-right {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(90,69,32,0.4);
          font-size: 12px;                  /* era 0.75vw → a 5000px = 37.5px */
        }

        /* ══════════════════════════════
           TABLET (≤ 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px 40px;
            padding: 40px 40px 28px;
          }

          .footer-col-logo {
            max-width: 100%;
            gap: 14px;
            grid-column: 1 / 2;
          }

          .footer-logo-img {
            height: 90px;
          }

          .footer-desc {
            font-size: 13px;
          }

          .footer-col-title {
            font-size: 12px;
            margin-bottom: 4px;
          }

          .footer-col {
            gap: 8px;
          }

          .footer-col-link {
            font-size: 13px;
          }

          .footer-contact-text {
            font-size: 13px;
          }

          .footer-socials {
            gap: 8px;
            margin-top: 8px;
          }

          .footer-social-icon {
            width: 34px;
            height: 34px;
            font-size: 12px;
          }

          .footer-bottom {
            padding: 16px 40px;
            flex-direction: column;
            gap: 6px;
            align-items: center;
            text-align: center;
          }

          .footer-bottom-left {
            font-size: 11px;
          }

          .footer-bottom-right {
            font-size: 11px;
          }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 48px 28px 24px;
          }

          .footer-col-logo {
            align-items: center;
            text-align: center;
            gap: 12px;
          }

          .footer-logo-btn {
            align-self: center;
          }

          .footer-logo-img {
            height: 80px;
          }

          .footer-desc {
            font-size: 13px;
            max-width: 320px;
          }

          .footer-col {
            align-items: center;
            text-align: center;
            gap: 7px;
          }

          .footer-col-title {
            font-size: 11.5px;
            margin-bottom: 2px;
          }

          .footer-col-link {
            font-size: 13px;
            text-align: center;
          }

          .footer-contact-text {
            font-size: 13px;
          }

          .footer-socials {
            justify-content: center;
            gap: 10px;
            margin-top: 6px;
          }

          .footer-social-icon {
            width: 36px;
            height: 36px;
            font-size: 13px;
          }

          .footer-bottom {
            padding: 14px 28px;
            flex-direction: column;
            gap: 4px;
          }

          .footer-bottom-left {
            font-size: 10.5px;
          }

          .footer-bottom-right {
            font-size: 10.5px;
          }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .footer-grid {
            gap: 24px;
            padding: 56px 20px 20px;
          }

          .footer-logo-img {
            height: 68px;
          }

          .footer-desc {
            font-size: 12px;
            max-width: 280px;
            line-height: 1.6;
          }

          .footer-col {
            gap: 6px;
          }

          .footer-col-title {
            font-size: 11px;
          }

          .footer-col-link {
            font-size: 12px;
          }

          .footer-contact-text {
            font-size: 12px;
          }

          .footer-social-icon {
            width: 34px;
            height: 34px;
            font-size: 12px;
          }

          .footer-bottom {
            padding: 12px 20px;
          }

          .footer-bottom-left,
          .footer-bottom-right {
            font-size: 10px;
          }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 340px)
        ══════════════════════════════ */
        @media (max-width: 340px) {
          .footer-grid {
            gap: 20px;
            padding: 60px 16px 16px;
          }

          .footer-logo-img {
            height: 56px;
          }

          .footer-desc {
            font-size: 11px;
            max-width: 240px;
          }

          .footer-col-title {
            font-size: 10.5px;
          }

          .footer-col-link {
            font-size: 11px;
          }

          .footer-contact-text {
            font-size: 11px;
          }

          .footer-social-icon {
            width: 30px;
            height: 30px;
            font-size: 11px;
          }

          .footer-bottom {
            padding: 10px 16px;
          }

          .footer-bottom-left,
          .footer-bottom-right {
            font-size: 9px;
          }
        }
      `}</style>

      {/* ═══ 4-Column Grid ═══ */}
      <div className="footer-grid">
        {/* Col 1 — Logo + descripción */}
        <div className="footer-col-logo">
          <button
            type="button"
            className="footer-logo-btn"
            onClick={() => scrollToSection('inicio')}
          >
            <img
              src="/logo.png"
              alt="Camil Virtual"
              className="footer-logo-img"
            />
          </button>
          <p className="footer-desc">
            Compañía emocional genuina en un mundo digital. Porque todos merecemos a alguien que nos escuche de verdad.
          </p>
        </div>

        {/* Col 2 — Navegación */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navegación</h4>
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
              className="footer-col-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Col 3 — Legal */}
        <div className="footer-col">
          <h4 className="footer-col-title">Legal</h4>
          {[
            'Términos y condiciones',
            'Política de privacidad',
            'Política de cookies',
            'Política de reembolso',
          ].map((item) => (
            <button
              key={item}
              type="button"
              className="footer-col-link"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Col 4 — Contacto */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contacto</h4>
          <span className="footer-contact-text">📧 hola@camilvirtual.com</span>
          <span className="footer-contact-text">📱 @camilvirtual</span>

          <div className="footer-socials">
            {['Instagram', 'TikTok', 'Twitter'].map((social) => (
              <div
                key={social}
                className="footer-social-icon"
              >
                {social.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Bottom Bar ═══ */}
      <div className="footer-bottom">
        <span className="footer-bottom-left">
          © {new Date().getFullYear()} Camil Virtual. Todos los derechos reservados.
        </span>
        <span className="footer-bottom-right">
          Hecho con 💛 para quienes necesitan ser escuchados
        </span>
      </div>
    </footer>
  );
};

export default Footer;