// PricingScreen.tsx
import { useEffect, useState, useRef, TouchEvent } from 'react';
import Tilt from 'react-parallax-tilt';

interface PricingScreenProps {
  onSelectPlan?: (planId: string) => void;
}

const PLANS = [
  {
    id: 'correspondencia',
    name: 'Correspondencia especial',
    subtitle: 'Un toque dulce a tu semana',
    price: '$90.000',
    color: 'rgba(14,116,144,0.9)',
    colorLight: 'rgba(14,116,144,',
    cupos: '4 cupos disponibles',
    icon: '/carta.png',
    iconFloat: 'prc-float-1',
    features: [
      'Intercambio de 4 cartas semanales c/u.',
      'Una cita virtual de 3 hs al mes',
      'Atención a tus momentos especiales',
      'Sorpresas con cariño',
    ],
    ctaBg: 'rgba(14,116,144,0.15)',
    ctaBorder: 'rgba(14,116,144,0.3)',
    ctaColor: 'rgba(14,116,144,0.9)',
    highlighted: false,
  },
  {
    id: 'casual',
    name: 'Casualmente cotidiano',
    subtitle: 'La compañía que te cambia el día',
    price: '$180.000',
    color: 'rgba(244,63,94,0.9)',
    colorLight: 'rgba(244,63,94,',
    cupos: '3 cupos disponibles',
    icon: '/celular.png',
    iconFloat: 'prc-float-2',
    badge: '⭐ MÁS ELEGIDO',
    features: [
      'Número de teléfono exclusivo',
      'Conversaciones fluidas y seguidas',
      'Hasta 4 llamadas de 30 min al mes',
      'Una cita virtual de 3 hs al mes',
      'Sorpresas especiales',
    ],
    ctaBg: 'rgba(244,63,94,0.85)',
    ctaBorder: 'rgba(244,63,94,0.4)',
    ctaColor: '#FFFFFF',
    highlighted: true,
  },
  {
    id: 'diaria',
    name: 'Compañía diaria',
    subtitle: 'Tu cómplice de cada momento',
    price: '$380.000',
    color: 'rgba(234,179,8,0.9)',
    colorLight: 'rgba(234,179,8,',
    cupos: '¡Último cupo!',
    cuposBold: true,
    icon: '/billete.png',
    iconFloat: 'prc-float-3',
    features: [
      'Mensajes ilimitados diarios',
      'Llamadas incluidas sin límite',
      'Una cita virtual de 3 hs al mes',
      'Prioridad en atención y respuestas',
      'Compañera fiel en cada momento',
    ],
    ctaBg: 'rgba(234,179,8,0.15)',
    ctaBorder: 'rgba(234,179,8,0.35)',
    ctaColor: 'rgba(180,140,8,0.9)',
    highlighted: false,
  },
];

const PricingScreen = ({ onSelectPlan }: PricingScreenProps) => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mobileActive, setMobileActive] = useState(1);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToContact = (planId: string) => {
    if (onSelectPlan) onSelectPlan(planId);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMobileNav = (dir: 'prev' | 'next') => {
    if (isTransitioning) return;
    const next = dir === 'next'
      ? Math.min(mobileActive + 1, PLANS.length - 1)
      : Math.max(mobileActive - 1, 0);
    if (next === mobileActive) return;
    setIsTransitioning(true);
    setSlideDir(dir === 'next' ? 'left' : 'right');
    setTimeout(() => {
      setMobileActive(next);
      setSlideDir(null);
      setIsTransitioning(false);
    }, 260);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!isSwiping.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isSwiping.current = true;
    }
    if (isSwiping.current) {
      e.preventDefault();
      setSwipeOffset(Math.max(-100, Math.min(100, dx * 0.35)));
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping.current) {
      if (swipeOffset < -28) handleMobileNav('next');
      else if (swipeOffset > 28) handleMobileNav('prev');
    }
    setSwipeOffset(0);
    isSwiping.current = false;
  };

  const a = hasAnimated;
  const currentPlan = PLANS[mobileActive];

  const renderCard = (plan: typeof PLANS[0], idx: number, mode: 'desktop' | 'tablet' | 'mobile') => {
    const isMob = mode === 'mobile';
    const modeClass = mode === 'desktop'
      ? `prc-card-dk ${plan.highlighted ? 'prc-card-dk--hl' : ''}`
      : mode === 'tablet'
        ? `prc-card-tb ${plan.highlighted ? 'prc-card-tb--hl' : ''}`
        : `prc-card-mb ${plan.highlighted ? 'prc-card-mb--hl' : ''}`;

    const entranceClass = mode === 'mobile'
      ? `prc-card-entrance-mb-${idx} ${a ? 'prc-a-card' : ''}`
      : `prc-card-entrance-${mode}-${idx} ${a ? 'prc-a-card' : ''}`;

    const cardElement = (
      <div
        key={isMob ? `${mode}-${plan.id}` : undefined}
        className={`prc-card ${modeClass} ${entranceClass}`}
        style={{
          background: plan.highlighted
            ? `linear-gradient(${isMob ? '160deg' : '180deg'}, ${plan.colorLight}0.11) 0%, ${plan.colorLight}0.035) 100%)`
            : `linear-gradient(${isMob ? '160deg' : '180deg'}, ${plan.colorLight}0.08) 0%, ${plan.colorLight}0.025) 100%)`,
          border: plan.highlighted
            ? `2px solid ${plan.colorLight}0.28)`
            : `1px solid ${plan.colorLight}0.18)`,
          animationDelay: mode === 'desktop'
            ? `${0.4 + idx * 0.15}s`
            : mode === 'tablet'
              ? `${0.35 + idx * 0.15}s`
              : `${0.4 + idx * 0.18}s`,
        }}
      >
        {plan.badge && (
          <div className="prc-badge" style={{ backgroundColor: plan.color }}>
            {plan.badge}
          </div>
        )}

        <div
          className="prc-cupos"
          style={{
            backgroundColor: plan.color,
            boxShadow: `0 2px 8px ${plan.colorLight}0.25)`,
            fontWeight: plan.cuposBold ? 600 : 500,
          }}
        >
          <span className="prc-cupos-dot" />
          {plan.cupos}
        </div>

        <div
          className={`prc-icon prc-icon--${plan.id} ${a ? 'prc-icon-visible' : ''}`}
          style={{ animationDelay: `${0.7 + idx * 0.15}s` }}
        >
          <img
            src={plan.icon}
            alt=""
            className={mounted ? plan.iconFloat : ''}
          />
        </div>

        <div className="prc-bar" style={{ backgroundColor: `${plan.colorLight}0.55)` }} />

        <h3 className="prc-name">{plan.name}</h3>
        <span className="prc-plan-sub">{plan.subtitle}</span>

        <div className="prc-price-row">
          <span className="prc-price" style={{ color: plan.color }}>{plan.price}</span>
          <span className="prc-period">/mes</span>
        </div>

        <div className="prc-line" style={{ backgroundColor: `${plan.colorLight}0.12)` }} />

        <div className="prc-features">
          {plan.features.map((f, i) => (
            <div key={i} className="prc-feat">
              <span className="prc-feat-check" style={{ color: `${plan.colorLight}0.65)` }}>✓</span>
              <span className="prc-feat-text">{f}</span>
            </div>
          ))}
        </div>

        <button
          className="prc-cta"
          onClick={() => scrollToContact(plan.id)}
          style={{
            backgroundColor: plan.ctaBg,
            border: `1px solid ${plan.ctaBorder}`,
            color: plan.ctaColor,
            boxShadow: plan.highlighted ? `0 4px 14px ${plan.colorLight}0.18)` : 'none',
          }}
        >
          Elegir este plan
        </button>
      </div>
    );

    if (isMob) return cardElement;

    if (isMobile) {
      return (
        <div
          key={`${mode}-${plan.id}`}
          className={mode === 'desktop' ? 'prc-tilt-dk' : 'prc-tilt-tb'}
          style={{ overflow: 'visible' }}
        >
          {cardElement}
        </div>
      );
    }

    return (
      <Tilt
        key={`${mode}-${plan.id}`}
        className={mode === 'desktop' ? 'prc-tilt-dk' : 'prc-tilt-tb'}
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        scale={1.02}
        transitionSpeed={1200}
        glareEnable={false}
        style={{ overflow: 'visible' }}
      >
        {cardElement}
      </Tilt>
    );
  };

  return (
    <section ref={sectionRef} id="planes" className="prc-section">
      <style>{`
        .prc-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #F3F3F3;
          padding-top: clamp(50px, 6vw, 90px);
          padding-bottom: clamp(40px, 5vw, 80px);
        }

        .prc-tilt-dk {
          height: 100%;
          overflow: visible !important;
        }
        .prc-tilt-dk > div {
          height: 100%;
          overflow: visible !important;
        }

        .prc-tilt-tb {
          width: 100%;
          max-width: 500px;
          overflow: visible !important;
        }
        .prc-tilt-tb > div {
          overflow: visible !important;
        }

        .prc-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(36px, 4vw, 64px);
          padding: 0 clamp(24px, 4vw, 60px);
        }

        .prc-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: 16px;
          opacity: 0;
        }

        .prc-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #F69E82;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0;
        }

        .prc-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 2.8vw, 42px);
          line-height: 1.18;
          color: #1C1C1E;
          letter-spacing: -0.025em;
          margin: 0 0 18px;
          opacity: 0;
        }

        .prc-title-light {
          font-weight: 400;
          color: #555;
        }

        .prc-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(16px, 1.4vw, 20px);
          color: #888;
          line-height: 1.6;
          margin: 0 0 8px;
          opacity: 0;
        }

        .prc-note {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.8vw, 13px);
          color: #BBB;
          margin: 0;
          opacity: 0;
        }

        .prc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 22px;
          overflow: visible;
          will-change: transform;
        }

        .prc-badge {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 14px;
          border-radius: 50px;
          color: #FFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.08em;
          white-space: nowrap;
          z-index: 12;
        }

        .prc-cupos {
          position: absolute;
          left: -1px;
          display: flex;
          align-items: center;
          color: #FFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          border-radius: 0 50px 50px 0;
          z-index: 11;
        }

        .prc-cupos-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFF;
          flex-shrink: 0;
          animation: prcPulse 2s ease-in-out infinite;
        }

        @keyframes prcPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .prc-icon {
          position: absolute;
          pointer-events: none;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .prc-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .prc-icon-visible {
          opacity: 1;
        }

        @keyframes prcF1 {
          0%, 100% { transform: rotate(-12deg) translateY(0); }
          50% { transform: rotate(-10deg) translateY(-4px); }
        }
        @keyframes prcF2 {
          0%, 100% { transform: rotate(-25deg) translateY(0); }
          50% { transform: rotate(-23deg) translateY(-3px); }
        }
        @keyframes prcF3 {
          0%, 100% { transform: rotate(15deg) translateY(0); }
          50% { transform: rotate(17deg) translateY(-4px); }
        }

        .prc-float-1 { animation: prcF1 4s ease-in-out infinite; }
        .prc-float-2 { animation: prcF2 4.5s ease-in-out infinite 0.7s; }
        .prc-float-3 { animation: prcF3 3.8s ease-in-out infinite 1.2s; }

        .prc-bar { border-radius: 4px; }

        .prc-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #2A2A2A;
          line-height: 1.3;
          margin: 0;
        }

        .prc-plan-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #999;
          line-height: 1.4;
          display: block;
        }

        .prc-price-row {
          display: flex;
          align-items: baseline;
        }

        .prc-price {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .prc-period {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #888;
        }

        .prc-line { width: 100%; height: 1px; }

        .prc-features {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .prc-feat {
          display: flex;
          align-items: flex-start;
        }

        .prc-feat-check {
          flex-shrink: 0;
          line-height: 1.6;
        }

        .prc-feat-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #5A5A5A;
          line-height: 1.6;
        }

        .prc-cta {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .prc-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .prc-cta:hover::before { left: 100%; }
        .prc-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
        .prc-cta:active { transform: scale(0.97); }

        .prc-card-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #BBB;
          white-space: nowrap;
        }

        .prc-privacy-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 1320px;
          margin: clamp(36px, 4vw, 64px) auto 0;
          padding: 0 clamp(24px, 4vw, 60px);
          box-sizing: border-box;
        }

        .prc-privacy {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 780px;
          padding: 28px 32px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(246,158,130,0.2);
          box-shadow: 0 2px 16px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7);
          gap: 18px;
          opacity: 0;
          box-sizing: border-box;
        }

        .prc-privacy-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 28px;
          line-height: 1;
        }

        .prc-privacy-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .prc-privacy-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: #F69E82;
          font-size: 15px;
          margin: 0;
          line-height: 1.3;
        }

        .prc-privacy-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: #666;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        .prc-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
          opacity: 0;
        }

        .prc-dot {
          height: 10px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }

        .prc-dot--active {
          width: 28px;
          background: linear-gradient(90deg, #F69E82, #F6B89A);
          box-shadow: 0 2px 8px rgba(246,158,130,0.35);
        }

        .prc-dot--idle {
          width: 10px;
          background: rgba(246,158,130,0.18);
        }

        .prc-dot--idle:hover {
          background: rgba(246,158,130,0.4);
          transform: scale(1.3);
        }

        .prc-swipe {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 11px;
          color: rgba(0,0,0,0.3);
          letter-spacing: 0.03em;
          opacity: 0;
        }

        .prc-swipe-icon {
          font-size: 14px;
          animation: prcSwipe 2.5s ease-in-out infinite;
        }

        @keyframes prcSwipe {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }

        @keyframes prcUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes prcDown {
          0% { opacity: 0; transform: translateY(-24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes prcCardIn {
          0% { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes prcCardInHL {
          0% { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1.04); }
        }
        @keyframes prcSlideL {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-50px); opacity: 0; }
        }
        @keyframes prcSlideR {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }

        .prc-a-down { animation: prcDown 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .prc-a-up { animation: prcUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .prc-a-card { animation: prcCardIn 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .prc-card-dk--hl.prc-a-card { animation-name: prcCardInHL; }
        .prc-slide-l { animation: prcSlideL 0.26s cubic-bezier(0.4,0,0.2,1) forwards; }
        .prc-slide-r { animation: prcSlideR 0.26s cubic-bezier(0.4,0,0.2,1) forwards; }

        /* ═══════════════════════════════
           DESKTOP (> 1024px) — FIXED VALUES
        ═══════════════════════════════ */
        .prc-row-dk {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(14px, 1.8vw, 26px);
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 60px);
        }

        .prc-col-tb { display: none; }
        .prc-wrap-mb { display: none; }

        .prc-card-dk {
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          width: 330px;
          padding: 28px 22px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          height: 100%;
        }

        .prc-card-dk:hover {
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .prc-card-dk--hl {
          width: 365px;
          box-shadow: 0 8px 30px rgba(244,63,94,0.08);
        }

        /* Desktop icon positions — fixed px */
        .prc-card-dk .prc-icon--correspondencia { right: -16px; top: -16px; width: 70px; height: 70px; }
        .prc-card-dk .prc-icon--casual { right: -46px; top: -46px; width: 130px; height: 130px; }
        .prc-card-dk .prc-icon--diaria { right: -16px; top: -16px; width: 70px; height: 70px; }

        /* Desktop badge & cupos — fixed px */
        .prc-card-dk .prc-badge { top: -10px; font-size: 11px; }
        .prc-card-dk .prc-cupos { top: 24px; gap: 5px; padding: 4px 12px 4px 10px; font-size: 11px; }

        /* Desktop card content — ALL FIXED PX with capped values */
        .prc-card-dk .prc-bar { width: 36px; height: 4px; margin-bottom: 16px; margin-top: 24px; }
        .prc-card-dk .prc-name { font-size: 22px; margin-bottom: 4px; }
        .prc-card-dk .prc-plan-sub { font-size: 13px; margin-bottom: 14px; }
        .prc-card-dk .prc-price { font-size: 38px; }
        .prc-card-dk .prc-period { font-size: 14px; margin-left: 4px; }
        .prc-card-dk .prc-price-row { margin-bottom: 16px; }
        .prc-card-dk .prc-line { margin-bottom: 16px; }
        .prc-card-dk .prc-features { gap: 10px; }
        .prc-card-dk .prc-feat { gap: 7px; }
        .prc-card-dk .prc-feat-check { font-size: 14px; }
        .prc-card-dk .prc-feat-text { font-size: 14px; }
        .prc-card-dk .prc-cta { padding: 10px 0; font-size: 15px; margin-top: 20px; }
        .prc-card-dk .prc-card-trust { font-size: 11px; margin-top: 10px; }

        /* ═══════════════════════════════
           TABLET (≤ 1024px)
        ═══════════════════════════════ */
        @media (max-width: 1024px) {
          .prc-section { padding-top: 80px; padding-bottom: 60px; }
          .prc-row-dk { display: none !important; }
          .prc-col-tb { display: flex; }
          .prc-wrap-mb { display: none; }

          .prc-col-tb {
            flex-direction: column;
            align-items: center;
            gap: 30px;
            padding: 0 clamp(24px, 5vw, 60px);
            width: 100%;
          }

          .prc-card-tb {
            width: 100%;
            max-width: 500px;
            padding: 38px 34px 34px;
            border-radius: 22px;
            box-shadow: 0 6px 25px rgba(0,0,0,0.05);
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .prc-card-tb:hover { box-shadow: 0 10px 35px rgba(0,0,0,0.08); }
          .prc-card-tb--hl { box-shadow: 0 8px 30px rgba(244,63,94,0.1); }

          .prc-card-tb .prc-badge { top: -13px; font-size: 11px; padding: 5px 16px; }
          .prc-card-tb .prc-cupos { top: 20px; gap: 6px; padding: 6px 16px 6px 13px; font-size: 11px; }

          .prc-card-tb .prc-icon--correspondencia { width: 100px; height: 100px; right: -18px; top: -30px; }
          .prc-card-tb .prc-icon--casual { width: 200px; height: 200px; right: -80px; top: -70px; }
          .prc-card-tb .prc-icon--diaria { width: 110px; height: 110px; right: -40px; top: -30px; }

          .prc-card-tb .prc-bar { width: 32px; height: 4px; margin-top: 28px; margin-bottom: 18px; }
          .prc-card-tb .prc-name { font-size: 20px; margin-bottom: 4px; }
          .prc-card-tb .prc-plan-sub { font-size: 12.5px; margin-bottom: 14px; }
          .prc-card-tb .prc-price { font-size: 36px; }
          .prc-card-tb .prc-period { font-size: 14px; margin-left: 5px; }
          .prc-card-tb .prc-price-row { margin-bottom: 18px; }
          .prc-card-tb .prc-line { margin-bottom: 18px; }
          .prc-card-tb .prc-features { gap: 12px; }
          .prc-card-tb .prc-feat { gap: 8px; }
          .prc-card-tb .prc-feat-check { font-size: 15px; }
          .prc-card-tb .prc-feat-text { font-size: 15px; }
          .prc-card-tb .prc-cta { padding: 15px 0; font-size: 15px; margin-top: 24px; }
          .prc-card-tb .prc-card-trust { font-size: 11px; margin-top: 10px; }

          .prc-tilt-tb { max-width: 500px; }

          .prc-privacy-wrapper { padding: 0 clamp(24px, 5vw, 60px); margin-top: 40px; }
          .prc-privacy { max-width: 500px; padding: 24px 28px; }
          .prc-privacy-icon { font-size: 26px; }
          .prc-privacy-title { font-size: 14px; }
          .prc-privacy-text { font-size: 13px; }

          .prc-a-down { animation-name: prcUp; }
        }

        /* ═══════════════════════════════
           MOBILE (≤ 768px) — STACKED VERTICAL
        ═══════════════════════════════ */
        @media (max-width: 768px) {
          .prc-section { padding-top: 70px; padding-bottom: 50px; }
          .prc-header { margin-bottom: 28px; padding: 0 24px; }
          .prc-row-dk { display: none !important; }
          .prc-col-tb { display: none !important; }

          .prc-wrap-mb {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 0 24px;
          }

          .prc-mb-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
            width: 100%;
            max-width: 400px;
          }

          .prc-card-mb {
            width: 100%;
            padding: 38px 28px 32px;
            border-radius: 22px;
            box-shadow: 0 14px 45px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.03);
            opacity: 0;
          }

          .prc-card-mb .prc-badge { top: -13px; font-size: 10.5px; padding: 5px 16px; }
          .prc-card-mb .prc-cupos { top: 20px; gap: 6px; padding: 6px 15px 6px 12px; font-size: 11px; }

          .prc-card-mb .prc-icon--correspondencia { width: 85px; height: 85px; right: -12px; top: -25px; }
          .prc-card-mb .prc-icon--casual { width: 150px; height: 150px; right: -55px; top: -55px; }
          .prc-card-mb .prc-icon--diaria { width: 90px; height: 90px; right: -25px; top: -15px; }

          .prc-card-mb .prc-bar { width: 30px; height: 4px; margin-top: 28px; margin-bottom: 18px; }
          .prc-card-mb .prc-name { font-size: 20px; margin-bottom: 4px; }
          .prc-card-mb .prc-plan-sub { font-size: 12.5px; margin-bottom: 16px; }
          .prc-card-mb .prc-price { font-size: 36px; }
          .prc-card-mb .prc-period { font-size: 14px; margin-left: 5px; }
          .prc-card-mb .prc-price-row { margin-bottom: 18px; }
          .prc-card-mb .prc-line { margin-bottom: 20px; }
          .prc-card-mb .prc-features { gap: 14px; }
          .prc-card-mb .prc-feat { gap: 10px; }
          .prc-card-mb .prc-feat-check { font-size: 15px; }
          .prc-card-mb .prc-feat-text { font-size: 15px; line-height: 1.55; }
          .prc-card-mb .prc-cta { padding: 16px 0; font-size: 15px; margin-top: 26px; border-radius: 14px; }
          .prc-card-mb .prc-card-trust { font-size: 10.5px; margin-top: 10px; }

          .prc-title { font-size: clamp(24px, 5.5vw, 30px); }

          /* Hide dots and swipe hint in stacked mode */
          .prc-dots { display: none !important; }
          .prc-swipe { display: none !important; }

          .prc-privacy-wrapper { padding: 0 24px; margin-top: 34px; }
          .prc-privacy {
            max-width: 400px;
            padding: 22px 24px;
            border-radius: 16px;
            gap: 16px;
          }
          .prc-privacy-icon { font-size: 24px; }
          .prc-privacy-title { font-size: 14px; }
          .prc-privacy-text { font-size: 13px; line-height: 1.65; }
        }

        @media (max-width: 540px) {
          .prc-section { padding-top: 64px; padding-bottom: 44px; }
          .prc-header { padding: 0 20px; margin-bottom: 24px; }
          .prc-title { font-size: clamp(22px, 5vw, 26px); }
          .prc-label { font-size: 10px; }
          .prc-wrap-mb { padding: 0 20px; }
          .prc-mb-area { max-width: 380px; gap: 26px; }

          .prc-card-mb { padding: 34px 24px 28px; border-radius: 20px; }
          .prc-card-mb .prc-name { font-size: 19px; }
          .prc-card-mb .prc-plan-sub { font-size: 12px; }
          .prc-card-mb .prc-price { font-size: 34px; }
          .prc-card-mb .prc-features { gap: 12px; }
          .prc-card-mb .prc-feat-text { font-size: 14.5px; }
          .prc-card-mb .prc-feat-check { font-size: 14px; }
          .prc-card-mb .prc-cta { padding: 15px 0; font-size: 14.5px; margin-top: 24px; }
          .prc-card-mb .prc-card-trust { font-size: 10px; }

          .prc-privacy-wrapper { padding: 0 20px; margin-top: 30px; }
          .prc-privacy {
            max-width: 380px;
            padding: 20px 22px;
            border-radius: 14px;
            gap: 14px;
          }
          .prc-privacy-icon { font-size: 22px; }
          .prc-privacy-title { font-size: 13px; }
          .prc-privacy-text { font-size: 12.5px; }
        }

        @media (max-width: 400px) {
          .prc-section { padding-top: 58px; padding-bottom: 40px; }
          .prc-header { padding: 0 18px; margin-bottom: 22px; }
          .prc-accent { width: 30px; margin-bottom: 12px; }
          .prc-label { margin-bottom: 12px; font-size: 9.5px; }
          .prc-title { font-size: 21px; margin-bottom: 10px; }
          .prc-subtitle { font-size: 13px; }
          .prc-note { font-size: 10px; }

          .prc-wrap-mb { padding: 0 18px; }
          .prc-mb-area { gap: 24px; }
          .prc-card-mb { padding: 32px 22px 26px; border-radius: 18px; }
          .prc-card-mb .prc-badge { font-size: 9.5px; padding: 3px 12px; top: -11px; }
          .prc-card-mb .prc-cupos { font-size: 9.5px; padding: 4px 11px 4px 9px; top: 16px; }
          .prc-card-mb .prc-bar { margin-top: 22px; margin-bottom: 12px; width: 24px; }
          .prc-card-mb .prc-name { font-size: 17px; margin-bottom: 3px; }
          .prc-card-mb .prc-plan-sub { font-size: 11px; margin-bottom: 12px; }
          .prc-card-mb .prc-price { font-size: 30px; }
          .prc-card-mb .prc-period { font-size: 11px; }
          .prc-card-mb .prc-price-row { margin-bottom: 14px; }
          .prc-card-mb .prc-line { margin-bottom: 16px; }
          .prc-card-mb .prc-features { gap: 9px; }
          .prc-card-mb .prc-feat-check { font-size: 12px; }
          .prc-card-mb .prc-feat-text { font-size: 13px; }
          .prc-card-mb .prc-cta { padding: 13px 0; font-size: 13px; margin-top: 20px; }
          .prc-card-mb .prc-card-trust { font-size: 9.5px; margin-top: 8px; }

          .prc-card-mb .prc-icon--correspondencia { width: 62px; height: 62px; right: -10px; top: -10px; }
          .prc-card-mb .prc-icon--casual { width: 130px; height: 130px; right: -45px; top: -45px; }
          .prc-card-mb .prc-icon--diaria { width: 70px; height: 70px; right: -18px; top: -10px; }

          .prc-privacy-wrapper { padding: 0 18px; margin-top: 26px; }
          .prc-privacy {
            padding: 18px 20px;
            border-radius: 14px;
            gap: 12px;
          }
          .prc-privacy-icon { font-size: 20px; }
          .prc-privacy-title { font-size: 12.5px; }
          .prc-privacy-text { font-size: 11.5px; line-height: 1.6; }
        }

        @media (max-width: 340px) {
          .prc-section { padding-top: 52px; padding-bottom: 36px; }
          .prc-header { padding: 0 14px; }
          .prc-title { font-size: 19px; }
          .prc-subtitle { font-size: 12px; }

          .prc-wrap-mb { padding: 0 14px; }
          .prc-mb-area { gap: 22px; }
          .prc-card-mb { padding: 28px 18px 22px; border-radius: 14px; }
          .prc-card-mb .prc-name { font-size: 16px; }
          .prc-card-mb .prc-price { font-size: 28px; }
          .prc-card-mb .prc-feat-text { font-size: 12px; }
          .prc-card-mb .prc-cta { padding: 12px 0; font-size: 12.5px; }
          .prc-card-mb .prc-card-trust { font-size: 9px; }

          .prc-card-mb .prc-icon--correspondencia { width: 55px; height: 55px; }
          .prc-card-mb .prc-icon--casual { width: 110px; height: 110px; right: -38px; top: -38px; }
          .prc-card-mb .prc-icon--diaria { width: 60px; height: 60px; }

          .prc-privacy-wrapper { padding: 0 14px; margin-top: 22px; }
          .prc-privacy {
            padding: 16px 16px;
            border-radius: 12px;
            gap: 10px;
          }
          .prc-privacy-icon { font-size: 18px; }
          .prc-privacy-title { font-size: 11.5px; }
          .prc-privacy-text { font-size: 10.5px; }
        }
      `}</style>

      <div className="prc-header">
        <div className={`prc-accent ${a ? 'prc-a-down' : ''}`} style={{ animationDelay: '0.1s' }} />
        <span className={`prc-label ${a ? 'prc-a-down' : ''}`} style={{ animationDelay: '0.2s' }}>PLANES</span>
        <h2 className={`prc-title ${a ? 'prc-a-down' : ''}`} style={{ animationDelay: '0.3s' }}>
          Elegí tu <span className="prc-title-light">vínculo</span>
        </h2>
        <p className={`prc-subtitle ${a ? 'prc-a-up' : ''}`} style={{ animationDelay: '0.4s' }}>
          Cada plan es un mundo. Elegí el que mejor se adapte a vos.
        </p>
        <span className={`prc-note ${a ? 'prc-a-up' : ''}`} style={{ animationDelay: '0.5s' }}>
          Precios en pesos argentinos (ARS)
        </span>
      </div>

      <div className="prc-row-dk">
        {PLANS.map((plan, i) => renderCard(plan, i, 'desktop'))}
      </div>

      <div className="prc-col-tb">
        {PLANS.map((plan, i) => renderCard(plan, i, 'tablet'))}
      </div>

      <div className="prc-wrap-mb">
        <div className="prc-mb-area">
          {PLANS.map((plan, i) => renderCard(plan, i, 'mobile'))}
        </div>

        <div className={`prc-dots ${a ? 'prc-a-up' : ''}`} style={{ animationDelay: '0.65s' }}>
          {PLANS.map((_, i) => (
            <button
              key={i}
              className={`prc-dot ${i === mobileActive ? 'prc-dot--active' : 'prc-dot--idle'}`}
              onClick={() => setMobileActive(i)}
              aria-label={`Plan ${i + 1}`}
            />
          ))}
        </div>

        <div className={`prc-swipe ${a ? 'prc-a-up' : ''}`} style={{ animationDelay: '0.8s' }}>
          <span className="prc-swipe-icon">👆</span>
          Deslizá para ver los planes
        </div>
      </div>

      <div className="prc-privacy-wrapper">
        <div className={`prc-privacy ${a ? 'prc-a-up' : ''}`} style={{ animationDelay: '0.9s' }}>
          <div className="prc-privacy-icon">🔒</div>
          <div className="prc-privacy-content">
            <h4 className="prc-privacy-title">Privacidad y seguridad garantizada</h4>
            <p className="prc-privacy-text">
              Todas las interacciones se realizan en un marco de respeto, confianza y discreción absoluta.
              Podés cancelar cuando quieras, sin permanencia mínima.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingScreen;