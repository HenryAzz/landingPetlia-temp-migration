import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1a2b]/80 backdrop-blur-xl border-b border-white/5">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <a href="#" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            PET<span className="text-[#25f4f4]">LIA</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Funciones", "Para Negocios", "Precios", "Contacto"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#download"
              className="hidden sm:inline-flex bg-[#179bbf] hover:bg-[#148dae] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all shadow-lg shadow-[#179bbf]/20 hover:shadow-xl hover:shadow-[#179bbf]/30 active:scale-[0.97]"
            >
              Descargar App
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 py-4 flex flex-col gap-1">
            {["Funciones", "Para Negocios", "Precios", "Contacto"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-gray-400 hover:text-white py-2.5 transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#download"
              className="sm:hidden bg-[#179bbf] text-white font-semibold text-sm px-6 py-2.5 rounded-full text-center mt-3"
            >
              Descargar App
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;