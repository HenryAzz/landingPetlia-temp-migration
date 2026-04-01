import React, { useEffect, useState, useCallback } from "react";

interface LoaderProps {
  onFinish: () => void;
}

const pawPositions = [
  { top: "22%", left: "18%", rotate: -25, delay: 300, size: "w-6 h-6" },
  { top: "15%", right: "22%", rotate: 15, delay: 500, size: "w-5 h-5" },
  { bottom: "28%", left: "24%", rotate: 35, delay: 700, size: "w-4 h-4" },
  { bottom: "20%", right: "18%", rotate: -10, delay: 900, size: "w-7 h-7" },
  { top: "45%", left: "10%", rotate: 45, delay: 600, size: "w-3 h-3" },
  { top: "40%", right: "12%", rotate: -30, delay: 800, size: "w-4 h-4" },
];

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<"enter" | "logo" | "paws" | "exit">("enter");

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 150),
      setTimeout(() => setPhase("paws"), 500),
      setTimeout(() => setPhase("exit"), 2200),
      setTimeout(handleFinish, 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [handleFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ease-in ${
        phase === "exit" ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #070E1A 0%, #0B1628 40%, #0F1D32 100%)",
      }}
    >
      {/* ── Gradient glow behind logo ── */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full transition-all duration-[2000ms] ease-out ${
          phase === "paws" || phase === "exit"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,183,0.12) 0%, rgba(103,209,227,0.05) 40%, transparent 70%)",
        }}
      />

      {/* ── Secondary glow ring ── */}
      <div
        className={`absolute w-[300px] h-[300px] rounded-full animate-glow-pulse transition-opacity duration-1000 ${
          phase === "paws" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(103,209,227,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ── Paw prints ── */}
      {pawPositions.map((paw, i) => (
        <img
          key={i}
          src="/huella.png"
          alt=""
          className={`absolute ${paw.size} brightness-0 invert transition-all ease-out select-none pointer-events-none`}
          style={{
            top: paw.top,
            bottom: paw.bottom,
            left: paw.left,
            right: paw.right,
            transform: `rotate(${paw.rotate}deg) scale(${
              phase === "paws" || phase === "exit" ? 1 : 0.3
            })`,
            opacity:
              phase === "paws"
                ? 0.15
                : phase === "exit"
                ? 0.05
                : 0,
            transitionDuration: "600ms",
            transitionDelay: `${paw.delay}ms`,
            animation:
              phase === "paws"
                ? `float ${3 + i * 0.4}s ease-in-out infinite ${paw.delay}ms`
                : "none",
          }}
        />
      ))}

      {/* ── Logo ── */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <img
          src="/logoBlanco.png"
          alt="Petlia"
          className={`h-10 sm:h-12 w-auto object-contain transition-all duration-700 ease-out ${
            phase === "enter"
              ? "opacity-0 scale-75 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        />

        {/* ── Tagline ── */}
        <p
          className={`font-body text-[13px] tracking-[0.25em] text-[#67D1E3]/60 uppercase transition-all duration-500 ease-out ${
            phase === "paws" || phase === "exit"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Todo en un solo lugar
        </p>
      </div>

      {/* ── Progress line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className={`h-full rounded-full transition-none ${
            phase !== "enter" ? "animate-progress-fill" : "w-0"
          }`}
          style={{
            background: "linear-gradient(90deg, #0EA5B7, #67D1E3, #A5F3FC)",
          }}
        />
      </div>

      {/* ── Side lines decoration ── */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1px] transition-all duration-[1500ms] ease-out ${
          phase === "paws" ? "h-32 opacity-100" : "h-0 opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, transparent, #14B8C4/20, transparent)",
          transitionDelay: "600ms",
        }}
      />
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[1px] transition-all duration-[1500ms] ease-out ${
          phase === "paws" ? "h-32 opacity-100" : "h-0 opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, transparent, rgba(20,184,196,0.2), transparent)",
          transitionDelay: "600ms",
        }}
      />
    </div>
  );
};

export default Loader;