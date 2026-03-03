import { useEffect, useState, useRef, TouchEvent } from 'react';

interface PricingScreenProps {
  onSelectPlan?: (planId: string) => void;
}

const plans = [
  {
    id: 'correspondencia',
    name: 'Correspondencia especial',
    price: '$90.000',
    color: 'rgba(14,116,144,0.9)',
    colorLight: 'rgba(14,116,144,',
    cupos: '7 cupos disponibles',
    icon: '/carta.png',
    iconClass: 'pricing-icon-1',
    features: [
      'Intercambio de 4 cartas semanales',
      'Una cita virtual de 3 hs al mes',
      'Respuestas personalizadas y cálidas',
      'Atención a tus momentos especiales',
    ],
    ctaBg: 'rgba(14,116,144,0.15)',
    ctaBorder: 'rgba(14,116,144,0.3)',
    ctaColor: 'rgba(14,116,144,0.9)',
    highlighted: false,
  },
  {
    id: 'casual',
    name: 'Casualmente cotidiano',
    price: '$180.000',
    color: 'rgba(244,63,94,0.9)',
    colorLight: 'rgba(244,63,94,',
    cupos: '5 cupos disponibles',
    icon: '/celular.png',
    iconClass: 'pricing-icon-2',
    badge: '⭐ MÁS ELEGIDO',
    features: [
      'Número de teléfono exclusivo',
      'Conversaciones fluidas y seguidas',
      'Hasta 4 llamadas de 30 min al mes',
      'Una cita virtual de 3 hs al mes',
      'Atención a tus momentos especiales',
    ],
    ctaBg: 'rgba(244,63,94,0.85)',
    ctaBorder: 'rgba(244,63,94,0.4)',
    ctaColor: '#FFFFFF',
    highlighted: true,
  },
  {
    id: 'diaria',
    name: 'Compañía diaria',
    price: '$380.000',
    color: 'rgba(234,179,8,0.9)',
    colorLight: 'rgba(234,179,8,',
    cupos: '¡Último cupo!',
    cuposBold: true,
    icon: '/billete.png',
    iconClass: 'pricing-icon-3',
    features: [
      'Mensajes ilimitados diarios',
      'Llamadas incluidas sin límite',
      'Dos citas virtuales de 3 hs al mes',
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
  const [mobileActiveCard, setMobileActiveCard] = useState(1);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
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
    const element = document.getElementById('contacto');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMobileNav = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    const nextIndex = direction === 'next'
      ? Math.min(mobileActiveCard + 1, plans.length - 1)
      : Math.max(mobileActiveCard - 1, 0);
    if (nextIndex === mobileActiveCard) return;

    setIsTransitioning(true);
    setSlideDirection(direction === 'next' ? 'left' : 'right');
    setTimeout(() => {
      setMobileActiveCard(nextIndex);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 260);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (!isSwiping.current && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      isSwiping.current = true;
    }
    if (isSwiping.current) {
      e.preventDefault();
      setSwipeOffset(Math.max(-100, Math.min(100, deltaX * 0.35)));
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

  const currentPlan = plans[mobileActiveCard];

  // Inline style for icon sizing per plan
  const getIconStyle = (plan: typeof plans[0]): React.CSSProperties => {
    if (plan.id === 'casual') {
      // Celular needs to be much bigger because the image is narrower
      return {};
    }
    return {};
  };

  const renderCard = (plan: typeof plans[0], index: number, mode: 'desktop' | 'tablet' | 'mobile') => {
    const isDesktop = mode === 'desktop';
    const isTablet = mode === 'tablet';
    const isMobile = mode === 'mobile';

    const cardClass = isDesktop
      ? `pricing-card pricing-card-desktop ${plan.highlighted ? 'pricing-card-desktop-highlight' : 'pricing-card-desktop-normal'} entrance-pricing-card-${index} ${hasAnimated ? 'animate' : ''}`
      : isTablet
        ? `pricing-card pricing-card-tablet ${plan.highlighted ? 'pricing-card-tablet-highlight' : ''} entrance-pricing-card-tablet-${index} ${hasAnimated ? 'animate' : ''}`
        : `pricing-card pricing-card-mobile ${plan.highlighted ? 'pricing-card-mobile-highlight' : ''} ${slideDirection === 'left' ? 'mobile-slide-left' : slideDirection === 'right' ? 'mobile-slide-right' : ''}`;

    const mobileStyle = isMobile ? {
      transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
      opacity: swipeOffset !== 0 ? 1 - Math.abs(swipeOffset) / 280 : undefined,
    } : {};

    return (
      <div
        key={`${mode}-${plan.id}`}
        className={cardClass}
        style={{
          background: plan.highlighted
            ? `linear-gradient(${isMobile ? '160deg' : '180deg'}, ${plan.colorLight}0.11) 0%, ${plan.colorLight}0.035) 100%)`
            : `linear-gradient(${isMobile ? '160deg' : '180deg'}, ${plan.colorLight}0.08) 0%, ${plan.colorLight}0.025) 100%)`,
          border: plan.highlighted
            ? `2px solid ${plan.colorLight}0.28)`
            : `1px solid ${plan.colorLight}0.18)`,
          ...mobileStyle,
        }}
        {...(isMobile ? {
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
        } : {})}
      >
        {plan.badge && (
          <div className="pricing-badge-top" style={{ backgroundColor: plan.color }}>
            {plan.badge}
          </div>
        )}

        <div
          className="pricing-cupos"
          style={{ backgroundColor: plan.color, boxShadow: `0 2px 8px ${plan.colorLight}0.25)`, fontWeight: plan.cuposBold ? 600 : 500 }}
        >
          <span className="cupos-dot" />
          {plan.cupos}
        </div>

        {/* Icon — each plan gets its own sizing class */}
        <div
          className={`pricing-card-icon pricing-icon-plan-${plan.id} pricing-icon-wrapper ${hasAnimated ? `animate-pricing-icon-${index}` : ''}`}
        >
          <img src={plan.icon} alt="" className={`object-contain w-full h-full ${mounted ? plan.iconClass : ''}`} />
        </div>

        <div className="pricing-accent-bar" style={{ backgroundColor: `${plan.colorLight}0.55)` }} />

        <h3 className="pricing-plan-name">{plan.name}</h3>

        <div className="pricing-price-block">
          <span className="pricing-plan-price" style={{ color: plan.color }}>{plan.price}</span>
          <span className="pricing-plan-period">/mes</span>
        </div>

        <div className="pricing-line" style={{ backgroundColor: `${plan.colorLight}0.12)` }} />

        <div className="pricing-feature-list">
          {plan.features.map((f, i) => (
            <div key={i} className="pricing-feat-row">
              <span className="pricing-feat-check" style={{ color: `${plan.colorLight}0.65)` }}>✓</span>
              <span className="pricing-feat-text">{f}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="pricing-cta-btn"
          onClick={() => scrollToContact(plan.id)}
          style={{
            backgroundColor: plan.ctaBg,
            border: `1px solid ${plan.ctaBorder}`,
            color: plan.ctaColor,
            boxShadow: plan.highlighted ? `0 4px 14px ${plan.colorLight}0.18)` : 'none',
          }}
        >
          Elegir plan
        </button>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="planes" className="relative w-full overflow-hidden flex flex-col pricing-section">
      <style>{`
        .pricing-section {
          background-color: #F3F3F3;
          min-height: 100vh;
          padding-top: clamp(80px, 8vw, 140px);
          padding-bottom: clamp(60px, 6vw, 110px);
        }

        .pricing-header {
          margin-bottom: clamp(28px, 3.2vw, 60px);
          padding: 0 24px;
        }
        .pricing-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 400; color: #F69E82;
          font-size: clamp(24px, 3.2vw, 55px);
          line-height: 1.3; margin: 0; text-align: center;
        }
        .pricing-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400; color: #5A5A5A;
          font-size: clamp(13px, 1.1vw, 18px);
          line-height: 1.6; margin: 0;
          margin-top: clamp(6px, 0.8vw, 14px);
          text-align: center;
        }
        .pricing-note {
          font-family: 'Poppins', sans-serif;
          font-weight: 400; color: #AAA;
          font-size: clamp(10px, 0.8vw, 13px);
          margin-top: clamp(4px, 0.5vw, 8px);
        }

        .pricing-card {
          position: relative;
          display: flex; flex-direction: column;
          border-radius: 22px;
          overflow: visible;
          will-change: transform;
        }
        .pricing-badge-top {
          position: absolute; left: 50%; transform: translateX(-50%);
          padding: clamp(3px, 0.3vw, 5px) clamp(10px, 1vw, 16px);
          border-radius: 50px; color: #FFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 500; letter-spacing: 0.08em;
          white-space: nowrap; z-index: 12;
        }
        .pricing-cupos {
          position: absolute; left: -1px;
          display: flex; align-items: center;
          color: #FFF; font-family: 'Poppins', sans-serif;
          font-weight: 500; letter-spacing: 0.04em;
          border-radius: 0 50px 50px 0; z-index: 11;
        }
        .cupos-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background-color: #FFF; flex-shrink: 0;
          animation: subtlePulse 2s ease-in-out infinite;
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.65; }
        }

        .pricing-card-icon {
          position: absolute; pointer-events: none; z-index: 20;
        }

        .pricing-accent-bar { border-radius: 4px; }
        .pricing-plan-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 500; color: #2A2A2A;
          line-height: 1.3; margin: 0;
        }
        .pricing-price-block { display: flex; align-items: baseline; }
        .pricing-plan-price {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; line-height: 1;
          letter-spacing: -0.02em;
        }
        .pricing-plan-period {
          font-family: 'Poppins', sans-serif;
          font-weight: 400; color: #888;
        }
        .pricing-line { width: 100%; height: 1px; }
        .pricing-feature-list { display: flex; flex-direction: column; flex: 1; }
        .pricing-feat-row { display: flex; align-items: flex-start; }
        .pricing-feat-check { flex-shrink: 0; line-height: 1.6; }
        .pricing-feat-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400; color: #5A5A5A; line-height: 1.6;
        }
        .pricing-cta-btn {
          position: relative; overflow: hidden;
          width: 100%; border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500; cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: all 0.3s ease;
        }
        .pricing-cta-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .pricing-cta-btn:hover::before { left: 100%; }
        .pricing-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
        .pricing-cta-btn:active { transform: scale(0.97); }

        @keyframes gentlePulse1 {
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50% { transform: rotate(-10deg) translateY(-4px); }
        }
        @keyframes gentlePulse2 {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-23deg) translateY(-3px); }
        }
        @keyframes gentlePulse3 {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(17deg) translateY(-4px); }
        }
        .pricing-icon-1 { animation: gentlePulse1 4s ease-in-out infinite; }
        .pricing-icon-2 { animation: gentlePulse2 4.5s ease-in-out infinite; animation-delay: 0.7s; }
        .pricing-icon-3 { animation: gentlePulse3 3.8s ease-in-out infinite; animation-delay: 1.2s; }

        @keyframes fadeSlideDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardRevealUp {
          0% { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cardRevealUpCenter {
          0% { opacity: 0; transform: translateY(50px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1.04); }
        }
        @keyframes iconFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-50px); opacity: 0; }
        }
        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
        @keyframes swipeHintPulse {
          0%, 100% { opacity: 0.35; } 50% { opacity: 0.65; }
        }
        @keyframes swipeHintSlide {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }

        .entrance-pricing-title { opacity: 0; }
        .entrance-pricing-title.animate { animation: fadeSlideDown 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.1s; }
        .entrance-pricing-subtitle { opacity: 0; }
        .entrance-pricing-subtitle.animate { animation: fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.25s; }
        .entrance-pricing-note { opacity: 0; }
        .entrance-pricing-note.animate { animation: fadeSlideDown 0.6s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.35s; }
        .entrance-pricing-card-0 { opacity: 0; }
        .entrance-pricing-card-0.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.4s; }
        .entrance-pricing-card-1 { opacity: 0; }
        .entrance-pricing-card-1.animate { animation: cardRevealUpCenter 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.55s; }
        .entrance-pricing-card-2 { opacity: 0; }
        .entrance-pricing-card-2.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.7s; }
        .pricing-icon-wrapper { opacity: 0; }
        .pricing-icon-wrapper.animate-pricing-icon-0 { animation: iconFadeIn 0.5s ease forwards; animation-delay: 0.7s; }
        .pricing-icon-wrapper.animate-pricing-icon-1 { animation: iconFadeIn 0.5s ease forwards; animation-delay: 0.85s; }
        .pricing-icon-wrapper.animate-pricing-icon-2 { animation: iconFadeIn 0.5s ease forwards; animation-delay: 1s; }
        .entrance-pricing-privacy { opacity: 0; }
        .entrance-pricing-privacy.animate { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.9s; }
        .entrance-mobile-wrapper { opacity: 0; }
        .entrance-mobile-wrapper.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.4s; }
        .entrance-mobile-dots { opacity: 0; }
        .entrance-mobile-dots.animate { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.65s; }
        .entrance-mobile-swipe { opacity: 0; }
        .entrance-mobile-swipe.animate { animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.8s; }

        .entrance-pricing-card-tablet-0 { opacity: 0; }
        .entrance-pricing-card-tablet-0.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.35s; }
        .entrance-pricing-card-tablet-1 { opacity: 0; }
        .entrance-pricing-card-tablet-1.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.5s; }
        .entrance-pricing-card-tablet-2 { opacity: 0; }
        .entrance-pricing-card-tablet-2.animate { animation: cardRevealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.65s; }

        .mobile-slide-left { animation: slideOutLeft 0.26s cubic-bezier(0.4,0,0.2,1) forwards; }
        .mobile-slide-right { animation: slideOutRight 0.26s cubic-bezier(0.4,0,0.2,1) forwards; }

        /* ══════════════════════════
           DESKTOP (> 1024px)
        ══════════════════════════ */
        .pricing-desktop-row {
          display: flex; align-items: stretch; justify-content: center;
          gap: clamp(14px, 1.8vw, 30px);
          padding: 0 clamp(20px, 5vw, 100px);
        }
        .pricing-tablet-col { display: none; }
        .pricing-mobile-wrap { display: none; }

        .pricing-card-desktop { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pricing-card-desktop:hover { transform: translateY(-6px); }
        .pricing-card-desktop-normal {
          width: clamp(260px, 20vw, 330px);
          padding: 2vw 1.6vw;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .pricing-card-desktop-highlight {
          width: clamp(280px, 22vw, 365px);
          padding: 2vw 1.6vw;
          box-shadow: 0 8px 30px rgba(244,63,94,0.08);
        }

        /* ── DESKTOP per-plan icon sizes ── */
        .pricing-card-desktop .pricing-icon-plan-correspondencia {
          right: -1.2vw; top: -1.2vw;
          width: clamp(45px, 4.5vw, 70px);
          height: clamp(45px, 4.5vw, 70px);
        }
        .pricing-card-desktop .pricing-icon-plan-casual {
          right: -3.5vw; top: -3.5vw;
          width: clamp(80px, 9vw, 130px);
          height: clamp(80px, 9vw, 130px);
        }
        .pricing-card-desktop .pricing-icon-plan-diaria {
          right: -1.2vw; top: -1.2vw;
          width: clamp(45px, 4.5vw, 70px);
          height: clamp(45px, 4.5vw, 70px);
        }

        .pricing-card-desktop .pricing-badge-top { top: -0.8vw; font-size: clamp(9px, 0.7vw, 12px); }
        .pricing-card-desktop .pricing-cupos { top: 1.8vw; gap: 0.35vw; padding: 0.3vw 0.9vw 0.3vw 0.7vw; font-size: clamp(9px, 0.68vw, 12px); }
        .pricing-card-desktop .pricing-accent-bar { width: 3vw; height: 4px; margin-bottom: 1.2vw; margin-top: 1.8vw; }
        .pricing-card-desktop .pricing-plan-name { font-size: clamp(16px, 1.4vw, 24px); margin-bottom: 1vw; }
        .pricing-card-desktop .pricing-plan-price { font-size: clamp(28px, 2.6vw, 42px); }
        .pricing-card-desktop .pricing-plan-period { font-size: clamp(11px, 0.85vw, 14px); margin-left: 0.3vw; }
        .pricing-card-desktop .pricing-price-block { margin-bottom: 1.2vw; }
        .pricing-card-desktop .pricing-line { margin-bottom: 1.2vw; }
        .pricing-card-desktop .pricing-feature-list { gap: 0.7vw; }
        .pricing-card-desktop .pricing-feat-row { gap: 0.5vw; }
        .pricing-card-desktop .pricing-feat-check { font-size: clamp(11px, 0.9vw, 14px); }
        .pricing-card-desktop .pricing-feat-text { font-size: clamp(12px, 0.88vw, 15px); }
        .pricing-card-desktop .pricing-cta-btn { padding: 0.65vw 0; font-size: clamp(13px, 0.9vw, 15px); margin-top: 1.5vw; }

        .pricing-privacy {
          margin-top: clamp(30px, 3.5vw, 60px);
          max-width: clamp(320px, 55vw, 800px);
          padding: clamp(16px, 1.4vw, 24px) clamp(18px, 2vw, 32px);
          border-radius: clamp(12px, 1.2vw, 16px);
          background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(246,158,130,0.25);
          box-shadow: 0 2px 12px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7);
          gap: clamp(10px, 1.2vw, 20px);
        }
        .pricing-privacy-icon {
          width: clamp(32px, 2.5vw, 42px); height: clamp(32px, 2.5vw, 42px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(246,158,130,0.2), rgba(249,221,163,0.15));
          border: 1px solid rgba(246,158,130,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: clamp(14px, 1.2vw, 20px);
        }
        .pricing-privacy-title {
          font-family: 'Poppins', sans-serif; font-weight: 500;
          color: #F69E82; font-size: clamp(12px, 0.95vw, 16px);
          margin: 0 0 clamp(3px, 0.4vw, 6px) 0;
        }
        .pricing-privacy-text {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          color: #5A5A5A; font-size: clamp(11px, 0.85vw, 14px);
          line-height: 1.7; margin: 0;
        }

        .pricing-dots {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 22px;
        }
        .pricing-dot {
          height: 10px; border-radius: 50px; border: none;
          cursor: pointer; padding: 0;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }
        .pricing-dot-active {
          width: 28px;
          background: linear-gradient(90deg, #F69E82, #F6B89A);
          box-shadow: 0 2px 8px rgba(246,158,130,0.35);
        }
        .pricing-dot-inactive { width: 10px; background-color: rgba(246,158,130,0.2); }
        .pricing-swipe-hint {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 14px;
          color: rgba(158,107,85,0.5);
          font-family: 'Poppins', sans-serif;
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.03em;
          animation: swipeHintPulse 2.5s ease-in-out infinite;
        }
        .pricing-swipe-icon {
          font-size: 14px;
          animation: swipeHintSlide 2.5s ease-in-out infinite;
        }

        /* ══════════════════════════
           TABLET (769px – 1024px)
        ══════════════════════════ */
        @media (max-width: 1024px) {
          .pricing-section { min-height: auto; padding-top: 80px; padding-bottom: 60px; }
          .pricing-desktop-row { display: none !important; }
          .pricing-tablet-col { display: flex; }
          .pricing-mobile-wrap { display: none; }

          .pricing-tablet-col {
            flex-direction: column; align-items: center;
            gap: 30px; padding: 0 32px; width: 100%;
          }

          .pricing-card-tablet {
            width: 100%; max-width: 500px;
            padding: 38px 34px 34px; border-radius: 22px;
            box-shadow: 0 6px 25px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .pricing-card-tablet:hover { transform: translateY(-4px); box-shadow: 0 10px 35px rgba(0,0,0,0.08); }
          .pricing-card-tablet-highlight { box-shadow: 0 8px 30px rgba(244,63,94,0.1); }

          .pricing-card-tablet .pricing-badge-top { top: -13px; font-size: 11px; padding: 5px 16px; }
          .pricing-card-tablet .pricing-cupos { top: 20px; gap: 6px; padding: 6px 16px 6px 13px; font-size: 11px; }

          /* ── TABLET per-plan icons ── */
          .pricing-card-tablet .pricing-icon-plan-correspondencia {
            width: 100px; height: 100px;
            right: -18px; top: -30px;
          }
          .pricing-card-tablet .pricing-icon-plan-casual {
            width: 200px; height: 200px;
            right: -80px; top: -70px;
          }
          .pricing-card-tablet .pricing-icon-plan-diaria {
            width: 110px; height: 110px;
            right: -40px; top: -30px;
          }

          .pricing-card-tablet .pricing-accent-bar { width: 32px; height: 4px; margin-top: 28px; margin-bottom: 18px; }
          .pricing-card-tablet .pricing-plan-name { font-size: 20px; margin-bottom: 14px; }
          .pricing-card-tablet .pricing-plan-price { font-size: 36px; }
          .pricing-card-tablet .pricing-plan-period { font-size: 14px; margin-left: 5px; }
          .pricing-card-tablet .pricing-price-block { margin-bottom: 18px; }
          .pricing-card-tablet .pricing-line { margin-bottom: 18px; }
          .pricing-card-tablet .pricing-feature-list { gap: 12px; }
          .pricing-card-tablet .pricing-feat-row { gap: 8px; }
          .pricing-card-tablet .pricing-feat-check { font-size: 15px; }
          .pricing-card-tablet .pricing-feat-text { font-size: 15px; }
          .pricing-card-tablet .pricing-cta-btn { padding: 15px 0; font-size: 15px; margin-top: 24px; }

          .pricing-privacy { max-width: 500px; margin-top: 38px; }

          .entrance-pricing-title.animate,
          .entrance-pricing-subtitle.animate { animation-name: fadeSlideUp; }
        }

        /* ══════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════ */
        @media (max-width: 768px) {
          .pricing-section { padding-top: 78px; padding-bottom: 55px; }
          .pricing-header { margin-bottom: 30px; padding: 0 20px; }
          .pricing-desktop-row { display: none !important; }
          .pricing-tablet-col { display: none !important; }
          .pricing-mobile-wrap {
            display: flex; flex-direction: column; align-items: center;
            width: 100%; padding: 0 24px;
          }
          .pricing-mobile-card-area { width: 100%; max-width: 400px; overflow: visible; }

          .pricing-card-mobile {
            padding: 38px 28px 32px; border-radius: 22px;
            box-shadow: 0 14px 45px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.03);
            touch-action: pan-y; will-change: transform;
            transition: transform 0.26s cubic-bezier(0.4,0,0.2,1), opacity 0.26s ease;
          }

          .pricing-card-mobile .pricing-badge-top { top: -13px; font-size: 10.5px; padding: 5px 16px; }
          .pricing-card-mobile .pricing-cupos { top: 20px; gap: 6px; padding: 6px 15px 6px 12px; font-size: 11px; }

          /* ── 768px per-plan icons ── */
            .pricing-card-mobile .pricing-icon-plan-correspondencia {
            width: 85px; height: 85px;
            right: -12px; top: -25px;
          }
          .pricing-card-mobile .pricing-icon-plan-casual {
            width: 150px; height: 150px;
            right: -55px; top: -55px;
          }
          .pricing-card-mobile .pricing-icon-plan-diaria {
            width: 90px; height: 90px;
            right: -25px; top: -15px;
          }

          .pricing-card-mobile .pricing-accent-bar { width: 30px; height: 4px; margin-top: 28px; margin-bottom: 18px; }
          .pricing-card-mobile .pricing-plan-name { font-size: 20px; margin-bottom: 16px; }
          .pricing-card-mobile .pricing-plan-price { font-size: 36px; }
          .pricing-card-mobile .pricing-plan-period { font-size: 14px; margin-left: 5px; }
          .pricing-card-mobile .pricing-price-block { margin-bottom: 18px; }
          .pricing-card-mobile .pricing-line { margin-bottom: 20px; }
          .pricing-card-mobile .pricing-feature-list { gap: 14px; }
          .pricing-card-mobile .pricing-feat-row { gap: 10px; }
          .pricing-card-mobile .pricing-feat-check { font-size: 15px; }
          .pricing-card-mobile .pricing-feat-text { font-size: 15px; line-height: 1.55; }
          .pricing-card-mobile .pricing-cta-btn { padding: 16px 0; font-size: 15px; margin-top: 26px; border-radius: 14px; }

          .pricing-privacy {
            max-width: calc(100% - 48px); margin-top: 34px; padding: 20px 22px;
            flex-direction: column; align-items: center; text-align: center; gap: 12px;
          }
        }

        /* ══════════════════════════
           MOBILE (≤ 640px)
        ══════════════════════════ */
        @media (max-width: 640px) {
          .pricing-section { padding-top: 82px; padding-bottom: 50px; }
          .pricing-header { margin-bottom: 28px; padding: 0 16px; }
          .pricing-mobile-wrap { padding: 0 22px; }
          .pricing-mobile-card-area { max-width: 380px; }
          .pricing-card-mobile { padding: 36px 26px 30px; border-radius: 20px; }
          .pricing-card-mobile .pricing-plan-name { font-size: 19px; margin-bottom: 14px; }
          .pricing-card-mobile .pricing-plan-price { font-size: 34px; }
          .pricing-card-mobile .pricing-feature-list { gap: 12px; }
          .pricing-card-mobile .pricing-feat-text { font-size: 14.5px; }
          .pricing-card-mobile .pricing-feat-check { font-size: 14px; }
          .pricing-card-mobile .pricing-cta-btn { padding: 15px 0; font-size: 14.5px; margin-top: 24px; }
          .pricing-card-mobile .pricing-accent-bar { margin-top: 26px; margin-bottom: 16px; }

          /* ── 640px per-plan icons ── */
           /* ── 480px per-plan icons ── */
          .pricing-card-mobile .pricing-icon-plan-correspondencia {
            width: 85px; height: 85px;
            right: -12px; top: -25px;
          }
          .pricing-card-mobile .pricing-icon-plan-casual {
            width: 150px; height: 150px;
            right: -55px; top: -55px;
          }
          .pricing-card-mobile .pricing-icon-plan-diaria {
            width: 90px; height: 90px;
            right: -25px; top: -15px;
          }

          .pricing-privacy { max-width: calc(100% - 44px); margin-top: 30px; }
        }

        /* ══════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════ */
        @media (max-width: 480px) {
          .pricing-section { padding-top: 78px; padding-bottom: 45px; }
          .pricing-header { margin-bottom: 26px; padding: 0 14px; }
          .pricing-subtitle { font-size: 13px; }
          .pricing-mobile-wrap { padding: 0 20px; }
          .pricing-mobile-card-area { max-width: 100%; }
          .pricing-card-mobile { padding: 34px 24px 28px; border-radius: 18px; }
          .pricing-card-mobile .pricing-badge-top { font-size: 10px; padding: 4px 13px; }
          .pricing-card-mobile .pricing-cupos { font-size: 10px; padding: 5px 13px 5px 10px; top: 18px; }
          .pricing-card-mobile .pricing-accent-bar { margin-top: 24px; margin-bottom: 14px; }
          .pricing-card-mobile .pricing-plan-name { font-size: 18px; margin-bottom: 14px; }
          .pricing-card-mobile .pricing-plan-price { font-size: 32px; }
          .pricing-card-mobile .pricing-plan-period { font-size: 12px; }
          .pricing-card-mobile .pricing-price-block { margin-bottom: 16px; }
          .pricing-card-mobile .pricing-line { margin-bottom: 18px; }
          .pricing-card-mobile .pricing-feature-list { gap: 11px; }
          .pricing-card-mobile .pricing-feat-check { font-size: 13px; }
          .pricing-card-mobile .pricing-feat-text { font-size: 14px; }
          .pricing-card-mobile .pricing-cta-btn { padding: 14px 0; font-size: 14px; margin-top: 22px; }

          /* ── 480px per-plan icons ── */
          .pricing-card-mobile .pricing-icon-plan-correspondencia {
            width: 85px; height: 85px;
            right: -12px; top: -25px;
          }
          .pricing-card-mobile .pricing-icon-plan-casual {
            width: 150px; height: 150px;
            right: -55px; top: -55px;
          }
          .pricing-card-mobile .pricing-icon-plan-diaria {
            width: 90px; height: 90px;
            right: -25px; top: -15px;
          }

          .pricing-dots { margin-top: 20px; gap: 7px; }
          .pricing-dot { height: 8px; }
          .pricing-dot-active { width: 24px; }
          .pricing-dot-inactive { width: 8px; }
          .pricing-swipe-hint { margin-top: 12px; font-size: 10.5px; }

          .pricing-privacy {
            max-width: calc(100% - 40px); margin-top: 28px;
            padding: 16px 18px; border-radius: 14px; gap: 10px;
          }
          .pricing-privacy-title { font-size: 12.5px; }
          .pricing-privacy-text { font-size: 11.5px; }
        }

        /* ══════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════ */
        @media (max-width: 380px) {
          .pricing-section { padding-top: 72px; padding-bottom: 40px; }
          .pricing-header { margin-bottom: 24px; padding: 0 12px; }
          .pricing-title { font-size: 21px; }
          .pricing-subtitle { font-size: 12.5px; }
          .pricing-note { font-size: 10px; }
          .pricing-mobile-wrap { padding: 0 18px; }
          .pricing-card-mobile { padding: 32px 22px 26px; border-radius: 16px; }
          .pricing-card-mobile .pricing-badge-top { font-size: 9.5px; padding: 3px 12px; top: -11px; }
          .pricing-card-mobile .pricing-cupos { font-size: 9.5px; padding: 4px 11px 4px 9px; top: 16px; }
          .pricing-card-mobile .pricing-accent-bar { margin-top: 22px; margin-bottom: 12px; width: 24px; }
          .pricing-card-mobile .pricing-plan-name { font-size: 17px; margin-bottom: 12px; }
          .pricing-card-mobile .pricing-plan-price { font-size: 30px; }
          .pricing-card-mobile .pricing-plan-period { font-size: 11px; }
          .pricing-card-mobile .pricing-price-block { margin-bottom: 14px; }
          .pricing-card-mobile .pricing-line { margin-bottom: 16px; }
          .pricing-card-mobile .pricing-feature-list { gap: 9px; }
          .pricing-card-mobile .pricing-feat-check { font-size: 12px; }
          .pricing-card-mobile .pricing-feat-text { font-size: 13px; }
          .pricing-card-mobile .pricing-cta-btn { padding: 13px 0; font-size: 13px; margin-top: 20px; }

          /* ── 380px per-plan icons ── */
          .pricing-card-mobile .pricing-icon-plan-correspondencia {
            width: 62px; height: 62px;
            right: -10px; top: -10px;
          }
          .pricing-card-mobile .pricing-icon-plan-casual {
            width: 150px; height: 150px;
            right: -55px; top: -55px;
          }
          .pricing-card-mobile .pricing-icon-plan-diaria {
            width: 80px; height: 80px;
            right: -20px; top: -10px;
          }

          .pricing-dots { margin-top: 18px; gap: 6px; }
          .pricing-dot { height: 7px; }
          .pricing-dot-active { width: 22px; }
          .pricing-dot-inactive { width: 7px; }
          .pricing-swipe-hint { margin-top: 10px; font-size: 10px; }

          .pricing-privacy {
            max-width: calc(100% - 36px); margin-top: 26px;
            padding: 14px 16px; border-radius: 12px;
          }
          .pricing-privacy-icon { width: 30px; height: 30px; font-size: 14px; }
          .pricing-privacy-title { font-size: 12px; }
          .pricing-privacy-text { font-size: 11px; line-height: 1.65; }
        }

        /* ══════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════ */
        @media (max-width: 320px) {
          .pricing-section { padding-top: 66px; padding-bottom: 36px; }
          .pricing-header { margin-bottom: 22px; padding: 0 10px; }
          .pricing-title { font-size: 19px; }
          .pricing-subtitle { font-size: 12px; margin-top: 5px; }
          .pricing-note { font-size: 9.5px; }
          .pricing-mobile-wrap { padding: 0 16px; }
          .pricing-card-mobile { padding: 30px 20px 24px; border-radius: 14px; }
          .pricing-card-mobile .pricing-badge-top { font-size: 9px; padding: 3px 10px; top: -10px; }
          .pricing-card-mobile .pricing-cupos { font-size: 9px; top: 14px; padding: 3px 9px 3px 7px; }
          .pricing-card-mobile .pricing-accent-bar { margin-top: 20px; margin-bottom: 10px; width: 22px; height: 3px; }
          .pricing-card-mobile .pricing-plan-name { font-size: 16px; margin-bottom: 10px; }
          .pricing-card-mobile .pricing-plan-price { font-size: 28px; }
          .pricing-card-mobile .pricing-plan-period { font-size: 10px; }
          .pricing-card-mobile .pricing-price-block { margin-bottom: 12px; }
          .pricing-card-mobile .pricing-line { margin-bottom: 14px; }
          .pricing-card-mobile .pricing-feature-list { gap: 8px; }
          .pricing-card-mobile .pricing-feat-check { font-size: 11px; }
          .pricing-card-mobile .pricing-feat-text { font-size: 12px; }
          .pricing-card-mobile .pricing-cta-btn { padding: 12px 0; font-size: 12.5px; margin-top: 18px; }

          /* ── 320px per-plan icons ── */
           .pricing-card-mobile .pricing-icon-plan-correspondencia {
            width: 80px; height: 80px;
            right: -15px; top: -25px;
          }
          .pricing-card-mobile .pricing-icon-plan-casual {
            width: 150px; height: 150px;
            right: -55px; top: -55px;
          }
          .pricing-card-mobile .pricing-icon-plan-diaria {
            width: 80px; height: 80px;
            right: -25px; top: -15px;
          }


          .pricing-dots { margin-top: 16px; gap: 4px; }
          .pricing-dot { height: 6px; }
          .pricing-dot-active { width: 20px; }
          .pricing-dot-inactive { width: 6px; }
          .pricing-swipe-hint { margin-top: 8px; font-size: 9.5px; }

          .pricing-privacy {
            max-width: calc(100% - 32px); margin-top: 22px;
            padding: 12px 14px; border-radius: 11px; gap: 8px;
          }
          .pricing-privacy-icon { width: 28px; height: 28px; font-size: 13px; }
          .pricing-privacy-title { font-size: 11px; }
          .pricing-privacy-text { font-size: 10.5px; line-height: 1.6; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex flex-col items-center pricing-header">
          <h2 className={`pricing-title entrance-pricing-title ${hasAnimated ? 'animate' : ''}`}>
            Elegí tu <span style={{ fontWeight: 600 }}>vínculo</span>
          </h2>
          <p className={`pricing-subtitle entrance-pricing-subtitle ${hasAnimated ? 'animate' : ''}`}>
            Cada plan es un mundo. Elegí el que mejor te abrace.
          </p>
          <span className={`pricing-note entrance-pricing-note ${hasAnimated ? 'animate' : ''}`}>
            Precios en pesos argentinos (ARS)
          </span>
        </div>

        <div className="pricing-desktop-row">
          {plans.map((plan, index) => renderCard(plan, index, 'desktop'))}
        </div>

        <div className="pricing-tablet-col">
          {plans.map((plan, index) => renderCard(plan, index, 'tablet'))}
        </div>

        <div className="pricing-mobile-wrap">
          <div className={`pricing-mobile-card-area entrance-mobile-wrapper ${hasAnimated ? 'animate' : ''}`}>
            {renderCard(currentPlan, mobileActiveCard, 'mobile')}
          </div>

          <div className={`pricing-dots entrance-mobile-dots ${hasAnimated ? 'animate' : ''}`}>
            {plans.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMobileActiveCard(index)}
                className={`pricing-dot ${index === mobileActiveCard ? 'pricing-dot-active' : 'pricing-dot-inactive'}`}
                aria-label={`Plan ${index + 1}`}
              />
            ))}
          </div>

          <div className={`pricing-swipe-hint entrance-mobile-swipe ${hasAnimated ? 'animate' : ''}`}>
            <span className="pricing-swipe-icon">👆</span>
            Deslizá para ver los planes
          </div>
        </div>

        <div className={`flex items-start pricing-privacy entrance-pricing-privacy ${hasAnimated ? 'animate' : ''}`}>
          <div className="pricing-privacy-icon">🔒</div>
          <div>
            <h4 className="pricing-privacy-title">Privacidad y seguridad garantizada</h4>
            <p className="pricing-privacy-text">
              La identidad de Camil se mantendrá siempre en reserva por su seguridad. Todas las interacciones se realizan en un marco de respeto, confianza y discreción absoluta. Podés cancelar cuando quieras, sin permanencia mínima.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingScreen;

