import { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigateToJoinTeam?: () => void;
  loaderFinished?: boolean;
}

const Navbar = ({ onNavigateToJoinTeam, loaderFinished = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loaderFinished) {
      const t = setTimeout(() => setVisible(true), 2200);
      return () => clearTimeout(t);
    }
  }, [loaderFinished]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navLinks = [
    { label: 'Cómo funciona', id: 'como-funciona' },
    { label: 'Vínculos', id: 'vinculos' },
    { label: 'Experiencias', id: 'experiencias' },
    { label: 'Planes', id: 'planes' },
    { label: 'Preguntas', id: 'faq' },
  ];

  return (
    <>
      <style>{`
        /* ══════════════════════════════
           BASE
        ══════════════════════════════ */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1380px;
          margin: 0 auto;
        }

        .nav-logo {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-logo:hover {
          opacity: 0.85;
          transform: scale(1.03);
        }

        .nav-logo-img {
          width: auto;
          transition: height 0.4s ease;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));
        }

        /* Desktop links */
        .nav-desktop {
          display: flex;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.04em;
          transition: color 0.3s ease;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-link:hover { color: #F9DDA3; }

        .nav-btn-outline {
          border-radius: 50px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.35);
          color: rgba(255,255,255,0.8);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(249,221,163,0.5);
          color: #F9DDA3;
          transform: translateY(-1px);
        }

        .nav-btn-primary {
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: 1px solid rgba(255,255,255,0.3);
          color: #5A4520;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(249,221,163,0.2);
          -webkit-tap-highlight-color: transparent;
        }
        .nav-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(249,221,163,0.35);
        }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          z-index: 1002;
          position: relative;
        }
        .hamburger-line {
          display: block;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger-line + .hamburger-line { margin-top: 5px; }

        .nav-hamburger.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(4px, 5px);
        }
        .nav-hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        .nav-hamburger.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -5px);
        }

        /* Mobile overlay */
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .nav-mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Mobile menu panel */
        .nav-mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          max-width: 85vw;
          height: 100dvh;
          z-index: 1001;
          background: linear-gradient(180deg, rgba(120,95,78,0.97), rgba(90,69,50,0.98));
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          flex-direction: column;
          padding: 80px 32px 40px;
          gap: 6px;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
          overflow-y: auto;
        }
        .nav-mobile-menu.open {
          transform: translateX(0);
        }

        .nav-mobile-link {
          background: none;
          border: none;
          padding: 14px 0;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.8);
          font-size: 16px;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-align: left;
          transition: color 0.3s ease;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          -webkit-tap-highlight-color: transparent;
        }
        .nav-mobile-link:hover { color: #F9DDA3; }
        .nav-mobile-link:last-of-type { border-bottom: none; }

        .nav-mobile-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .nav-mobile-btn-outline {
          padding: 12px 24px;
          border-radius: 50px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-mobile-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          color: #F9DDA3;
          border-color: rgba(249,221,163,0.4);
        }

        .nav-mobile-btn-primary {
          padding: 13px 24px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: none;
          color: #5A4520;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(249,221,163,0.25);
          -webkit-tap-highlight-color: transparent;
        }

        /* ══════════════════════════════
           DESKTOP (> 1024px)
        ══════════════════════════════ */
        .nav-inner { padding: 0.3vw 40px; }
        .nav-logo-img { height: 3.6vw; }
        .nav-bar.scrolled .nav-logo-img { height: 3.2vw; }
        .nav-bar.scrolled .nav-inner { padding: 0.2vw 40px; }
        .nav-desktop { gap: 2.2vw; }
        .nav-link { font-size: 0.85vw; }
        .nav-btn-outline { padding: 0.4vw 1.3vw; font-size: 0.82vw; }
        .nav-btn-primary { padding: 0.45vw 1.5vw; font-size: 0.82vw; }

        /* ══════════════════════════════
           TABLET (≤ 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .nav-desktop { display: none; }
          .nav-hamburger {
            display: flex;
            flex-direction: column;
            padding: 8px;
          }
          .hamburger-line {
            width: 22px;
            height: 2px;
            background: rgba(255,255,255,0.85);
          }
          .nav-inner { padding: 10px 40px; }
          .nav-logo-img { height: 40px !important; }
          .nav-bar.scrolled .nav-logo-img { height: 34px !important; }
          .nav-bar.scrolled .nav-inner { padding: 8px 40px; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
           → Transparent bg, compact
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .nav-inner { padding: 6px 24px; }
          .nav-logo-img { height: 32px !important; }

          .nav-bar.scrolled .nav-logo-img { height: 28px !important; }
          .nav-bar.scrolled .nav-inner { padding: 5px 24px; }

          .hamburger-line {
            width: 20px;
            height: 1.5px;
          }
          .hamburger-line + .hamburger-line { margin-top: 4px; }
          .nav-hamburger { padding: 6px; }

          .nav-hamburger.open .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(3px, 4px);
          }
          .nav-hamburger.open .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(3px, -4px);
          }

          .nav-mobile-menu {
            width: 100%;
            max-width: 100%;
            padding: 60px 28px 36px;
          }
          .nav-mobile-link { font-size: 15px; padding: 12px 0; }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .nav-inner { padding: 5px 24px; }
          .nav-logo-img { height: 28px !important; }

          .nav-bar.scrolled .nav-logo-img { height: 24px !important; }
          .nav-bar.scrolled .nav-inner { padding: 4px 24px; }

          .hamburger-line {
            width: 18px;
            height: 1.5px;
          }
          .hamburger-line + .hamburger-line { margin-top: 4px; }
          .nav-hamburger { padding: 5px; }

          .nav-mobile-menu { padding: 55px 24px 32px; }
          .nav-mobile-link { font-size: 14px; padding: 11px 0; }
          .nav-mobile-btn-outline,
          .nav-mobile-btn-primary { font-size: 13px; padding: 11px 20px; }
        }

        /* ══════════════════════════════
           XS MOBILE (≤ 400px)
        ══════════════════════════════ */
        @media (max-width: 400px) {
          .nav-inner { padding: 5px 18px; }
          .nav-bar.scrolled .nav-inner { padding: 4px 18px; }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 340px)
        ══════════════════════════════ */
        @media (max-width: 340px) {
          .nav-inner { padding: 4px 14px; }
          .nav-logo-img { height: 24px !important; }
          .nav-bar.scrolled .nav-logo-img { height: 22px !important; }
          .nav-bar.scrolled .nav-inner { padding: 3px 14px; }

          .hamburger-line { width: 16px; height: 1.5px; }
          .hamburger-line + .hamburger-line { margin-top: 3px; }
          .nav-hamburger { padding: 4px; }

          .nav-mobile-menu { padding: 50px 18px 28px; }
          .nav-mobile-link { font-size: 13px; padding: 10px 0; }
          .nav-mobile-btn-outline,
          .nav-mobile-btn-primary { font-size: 12px; padding: 10px 16px; }
        }
      `}</style>

      <nav
        className={`nav-bar ${scrolled ? 'scrolled' : ''}`}
        style={{
          background: scrolled
            ? (window.innerWidth <= 768
                ? 'rgba(180, 156, 140, 0.75)'
                : 'rgba(180, 156, 140, 0.88)')
            : (window.innerWidth <= 768
                ? 'transparent'
                : 'rgba(180, 156, 140, 0.25)'),
          backdropFilter: scrolled ? 'blur(20px)' : (window.innerWidth <= 768 ? 'none' : 'blur(20px)'),
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : (window.innerWidth <= 768 ? 'none' : 'blur(20px)'),
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid transparent',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="nav-inner">
          <button
            type="button"
            className="nav-logo"
            onClick={() => scrollToSection('inicio')}
          >
            <img src="/logo.png" alt="Camil Virtual" className="nav-logo-img" />
          </button>

          <div className="nav-desktop">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="nav-btn-outline"
              onClick={onNavigateToJoinTeam}
            >
              Unite al equipo ✦
            </button>
            <button
              type="button"
              className="nav-btn-primary"
              onClick={() => scrollToSection('contacto')}
            >
              Empezar →
            </button>
          </div>

          <button
            type="button"
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div
        className={`nav-mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((item) => (
          <button
            key={item.id}
            type="button"
            className="nav-mobile-link"
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
        <div className="nav-mobile-buttons">
          <button
            type="button"
            className="nav-mobile-btn-outline"
            onClick={() => {
              setMenuOpen(false);
              if (onNavigateToJoinTeam) onNavigateToJoinTeam();
            }}
          >
            Unite al equipo ✦
          </button>
          <button
            type="button"
            className="nav-mobile-btn-primary"
            onClick={() => scrollToSection('contacto')}
          >
            Empezar →
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;