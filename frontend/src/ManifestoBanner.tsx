import React from "react";

const ManifestoBanner: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#0EA5B7] via-[#14B8C4] to-[#67D1E3] overflow-hidden">
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-40 py-16 sm:py-20 lg:py-24">
        {/* ── Huellitas decorativas blancas ── */}
        <img
          src="/huella.png"
          alt=""
          className="absolute top-8 left-[8%] w-16 h-16 opacity-[0.12] -rotate-12 pointer-events-none select-none brightness-0 invert"
        />
        <img
          src="/huella.png"
          alt=""
          className="absolute bottom-6 right-[6%] w-20 h-20 opacity-[0.08] rotate-[20deg] pointer-events-none select-none brightness-0 invert"
        />
        <img
          src="/huella.png"
          alt=""
          className="absolute top-1/2 right-[25%] w-10 h-10 opacity-[0.06] rotate-45 pointer-events-none select-none brightness-0 invert"
        />
        <img
          src="/huella.png"
          alt=""
          className="absolute bottom-1/3 left-[20%] w-8 h-8 opacity-[0.07] -rotate-6 pointer-events-none select-none brightness-0 invert"
        />

        {/* ── Línea decorativa sutil ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-[#A5F3FC]/50 to-transparent" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-extrabold text-white leading-[1.15] max-w-4xl mb-6 sm:mb-8">
            "No somos solo una app, somos el primer{" "}
            <span className="text-[#E0F2FE]">ecosistema integral</span> para
            mascotas en Latinoamérica."
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl">
            Conectamos tecnología de vanguardia con el amor por los animales,
            garantizando que cada mascota reciba el cuidado que merece, cuando
            lo necesita.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBanner;