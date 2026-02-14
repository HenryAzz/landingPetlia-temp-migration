import { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigateToJoinTeam?: () => void;
  loaderFinished?: boolean;
}

const Navbar = ({ onNavigateToJoinTeam, loaderFinished = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Espera a que el loader termine + delay para que la WelcomeScreen cargue primero
  useEffect(() => {
    if (loaderFinished) {
      const t = setTimeout(() => setVisible(true), 2200);
      return () => clearTimeout(t);
    }
  }, [loaderFinished]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[1000]"
      style={{
        padding: scrolled ? '0.3vw 4vw' : '0.1vw 4vw',
        background: scrolled
          ? 'rgba(180, 156, 140, 0.88)'
          : 'rgba(180, 156, 140, 0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            const element = document.getElementById('inicio');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
            e.currentTarget.style.transform = 'scale(1.03)';
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
              height: scrolled ? '3.2vw' : '3.6vw',
              width: 'auto',
              transition: 'height 0.4s ease',
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))',
            }}
          />
        </button>

        {/* Links + Botones */}
        <div className="flex items-center" style={{ gap: '2.2vw' }}>
          {[
            { label: 'Inicio', id: 'inicio' },
            { label: 'Cómo funciona', id: 'como-funciona' },
            { label: 'Vínculos', id: 'vinculos' },
            { label: 'Experiencias', id: 'experiencias' },
            { label: 'Planes', id: 'planes' },
            { label: 'Preguntas', id: 'faq' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const element = document.getElementById(item.id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.85vw',
                letterSpacing: '0.04em',
                transition: 'color 0.3s ease',
                padding: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#F9DDA3')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')
              }
            >
              {item.label}
            </button>
          ))}

          {/* Botón Ser Camil */}
          <button
            type="button"
            onClick={onNavigateToJoinTeam}
            style={{
              padding: '0.4vw 1.3vw',
              borderRadius: '50px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '0.82vw',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(249,221,163,0.5)';
              e.currentTarget.style.color = '#F9DDA3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Unite al equipo ✦
          </button>

          {/* Botón Empezar */}
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '0.45vw 1.5vw',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #F9DDA3, #f0c96e)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#5A4520',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '0.82vw',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(249,221,163,0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(249,221,163,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(249,221,163,0.2)';
            }}
          >
            Empezar →
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;