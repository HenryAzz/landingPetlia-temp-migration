import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = 120; // cuanto tarda en transformarse
      const value = Math.min(scrollY / max, 1);
      setProgress(value);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // estilos dinámicos suaves
  const bgOpacity = progress * 0.9; // fondo aparece gradual
  const blur = progress * 16; // blur progresivo
  const shadow = progress * 0.15;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      
      {/* Fondo dinámico REAL */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundColor: `rgba(14,165,183,${bgOpacity})`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          boxShadow: `0 10px 30px rgba(0,0,0,${shadow})`,
        }}
      />

      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LOGO con transición REAL */}
          <div className="relative h-8 w-[120px]">
            <img
              src="/logoOriginal.png"
              className="absolute inset-0 h-8 transition-all duration-300"
              style={{
                opacity: 1 - progress,
                transform: `scale(${1 - progress * 0.05})`,
              }}
            />
            <img
              src="/logoBlanco.png"
              className="absolute inset-0 h-8 transition-all duration-300"
              style={{
                opacity: progress,
                transform: `scale(${0.95 + progress * 0.05})`,
              }}
            />
          </div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {["Funciones", "Para Negocios", "Precios", "Contacto"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-semibold transition-all duration-300"
                  style={{
                    color:
                      progress > 0.5
                        ? `rgba(255,255,255,${0.8 + progress * 0.2})`
                        : "#6B7280",
                  }}
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden sm:inline-flex text-sm px-6 py-2.5 rounded-full font-bold transition-all duration-300"
              style={{
                background:
                  progress > 0.5
                    ? "white"
                    : "linear-gradient(to right, #0EA5B7, #67D1E3)",
                color: progress > 0.5 ? "#0EA5B7" : "white",
              }}
            >
              Descargar App
            </a>

            {/* HAMBURGER */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{
                color: progress > 0.5 ? "white" : "#6B7280",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;