import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Funciones", href: "#funciones" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Para Negocios", href: "#negocios" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const value = Math.min(window.scrollY / 120, 1);
      setProgress(value);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const bgOpacity = progress * 0.92;
  const blur = progress * 20;
  const shadow = progress * 0.12;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundColor: `rgba(14,165,183,${bgOpacity})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            boxShadow: progress > 0.1 ? `0 1px 0 rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,${shadow})` : "none",
          }}
        />

        <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-40">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* LOGO */}
            <a href="#" className="relative h-8 w-[120px] shrink-0">
              <img
                src="/logoOriginal.png"
                alt="Petlia"
                className="absolute inset-0 h-8 w-auto object-contain object-left transition-all duration-500"
                style={{ opacity: 1 - progress, transform: `scale(${1 - progress * 0.05})` }}
              />
              <img
                src="/logoBlanco.png"
                alt="Petlia"
                className="absolute inset-0 h-8 w-auto object-contain object-left transition-all duration-500"
                style={{ opacity: progress, transform: `scale(${0.95 + progress * 0.05})` }}
              />
            </a>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 hover:opacity-100"
                  style={{
                    color: progress > 0.5 ? `rgba(255,255,255,${0.75 + progress * 0.25})` : "#6B7280",
                    opacity: progress > 0.5 ? 0.85 : 1,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="#contacto"
                className="hidden sm:inline-flex font-heading text-[13px] px-6 py-2.5 rounded-full font-bold transition-all duration-300 tracking-wide"
                style={{
                  background: progress > 0.5 ? "rgba(255,255,255,0.15)" : "transparent",
                  color: progress > 0.5 ? "white" : "#6B7280",
                  border: progress > 0.5 ? "1px solid rgba(255,255,255,0.2)" : "1px solid #E5E7EB",
                }}
              >
                Contacto
              </a>
              <a
                href="#"
                className="hidden sm:inline-flex font-heading text-[13px] px-6 py-2.5 rounded-full font-bold transition-all duration-300 tracking-wide"
                style={{
                  background: progress > 0.5 ? "white" : "linear-gradient(135deg, #0EA5B7, #67D1E3)",
                  color: progress > 0.5 ? "#0EA5B7" : "white",
                }}
              >
                Descargar App
              </a>

              {/* HAMBURGER */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all"
              >
                <span
                  className="block w-5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: progress > 0.5 ? "white" : "#374151",
                    transform: isOpen ? "rotate(45deg) translateY(5px)" : "none",
                  }}
                />
                <span
                  className="block w-5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: progress > 0.5 ? "white" : "#374151",
                    opacity: isOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: progress > 0.5 ? "white" : "#374151",
                    transform: isOpen ? "rotate(-45deg) translateY(-5px)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-[#0F172A] border-l border-white/5 flex flex-col pt-24 px-8 gap-2 transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-lg font-bold text-white/80 hover:text-white py-3 border-b border-white/5 transition-all"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <a href="#" className="btn-shimmer bg-gradient-to-r from-[#0EA5B7] to-[#67D1E3] text-white font-heading font-bold text-center py-3.5 rounded-2xl">
              Descargar App
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;