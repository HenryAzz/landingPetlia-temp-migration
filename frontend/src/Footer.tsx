import React from "react";

const columns = [
  { title: "Producto", links: ["Funcionalidades", "Para Negocios", "Marketplace", "Turnos", "Precios"] },
  { title: "Compañía", links: ["Sobre nosotros", "Blog", "Carreras", "Prensa", "Contacto"] },
  { title: "Soporte", links: ["Centro de ayuda", "Comunidad", "Guías", "Status", "FAQ"] },
  { title: "Legal", links: ["Términos de uso", "Privacidad", "Cookies", "Licencias"] },
];

const socialIcons = [
  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "TikTok", path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#0F172A] overflow-hidden">
      <img src="/huella.png" alt="" className="absolute top-20 right-[8%] w-16 h-16 opacity-[0.025] rotate-12 brightness-0 invert pointer-events-none select-none" />
      <img src="/huella.png" alt="" className="absolute bottom-24 left-[5%] w-12 h-12 opacity-[0.02] -rotate-12 brightness-0 invert pointer-events-none select-none" />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14B8C4]/30 to-transparent" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40">
        <div className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4 flex flex-col">
              <img src="/logoBlanco.png" alt="Petlia" className="h-8 sm:h-9 w-auto object-contain object-left mb-6" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#67D1E3] to-[#0EA5B7] rounded-full mb-6" />
              <p className="font-body text-sm text-[#94A3B8] leading-relaxed max-w-xs mb-8">
                El primer ecosistema integral para mascotas en Latinoamérica.
                Todo lo que necesitan, en un solo lugar.
              </p>
              <div className="flex items-center gap-3">
                {socialIcons.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#14B8C4]/20 border border-white/[0.06] hover:border-[#14B8C4]/30 flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-[#64748B] group-hover:text-[#67D1E3] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col, ci) => (
              <div key={ci} className="lg:col-span-2">
                <h4 className="font-heading text-sm font-bold text-white mb-5 tracking-wide">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <a href="#" className="font-body text-sm text-[#64748B] hover:text-[#67D1E3] transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#475569]">
            © {new Date().getFullYear()} Petlia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-[#475569]">Hecho con</span>
            <svg className="w-4 h-4 text-[#14B8C4]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="font-body text-xs text-[#475569]">en Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;