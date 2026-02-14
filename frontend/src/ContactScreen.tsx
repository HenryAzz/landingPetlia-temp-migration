import { useState, useEffect, useRef } from 'react';

interface ContactScreenProps {
  preSelectedPlan?: string;
  onNavigateToJoinTeam?: () => void;
}

const ContactScreen = ({ preSelectedPlan, onNavigateToJoinTeam }: ContactScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (preSelectedPlan) {
      setSelectedPlan(preSelectedPlan);
    }
  }, [preSelectedPlan]);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPlan('');
  };

  const plans = [
    { id: 'correspondencia', label: 'Correspondencia especial — $90.000/mes', bg: 'rgba(14,116,144,0.08)', border: 'rgba(14,116,144,0.3)' },
    { id: 'casual', label: 'Casualmente cotidiano — $180.000/mes', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.3)' },
    { id: 'diaria', label: 'Compañía diaria — $380.000/mes', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  ];

  const garantias = [
    { emoji: '⏰', text: 'Respuesta en menos de 24 hs' },
    { emoji: '🔒', text: 'Tu información es 100% confidencial' },
    { emoji: '💛', text: 'Sin compromiso, es solo el primer paso' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="contact-section"
    >
      <style>{`
        /* ══════════════════════════════
           BASE / SHARED
        ══════════════════════════════ */
        .contact-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Inputs ── */
        .contact-input {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.4); }
        .contact-input:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        .contact-textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          outline: none;
          resize: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .contact-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .contact-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        /* ── Buttons ── */
        .method-btn {
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          border-radius: 50px;
          -webkit-tap-highlight-color: transparent;
        }
        .method-btn:hover { background: rgba(255,255,255,0.15); }

        .plan-option {
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }
        .plan-option:hover { transform: translateY(-1px); }

        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          width: 100%;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: 1px solid rgba(255,255,255,0.3);
          color: #5A4520;
          box-shadow: 0 4px 15px rgba(249,221,163,0.2);
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249,221,163,0.3); }
        .submit-btn:active { transform: scale(0.97); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

        .join-team-link {
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          -webkit-tap-highlight-color: transparent;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
        }
        .join-team-link:hover {
          background: rgba(249,221,163,0.12) !important;
          border-color: rgba(249,221,163,0.4) !important;
          transform: translateY(-1px);
        }

        /* ── Labels ── */
        .contact-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
        }
        .contact-form-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #F9DDA3;
          margin: 0;
        }
        .contact-legal {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          margin: 0;
        }
        .contact-legal a, .contact-legal span {
          color: rgba(249,221,163,0.6);
          cursor: pointer;
          text-decoration: underline;
        }

        /* ── Form card ── */
        .contact-form-card {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1);
          width: 100%;
        }

        /* ── Success card ── */
        .contact-success-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
          text-align: center;
          width: 100%;
        }

        /* ── Badge ── */
        .contact-badge {
          display: inline-flex;
          align-items: center;
          border-radius: 50px;
          background-color: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.07em;
        }

        /* ── Left section title ── */
        .contact-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-style: italic;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: 0.03em;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .contact-title span { font-weight: 500; }

        .contact-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          margin: 0;
        }

        /* ── Garantia items ── */
        .contact-garantia-icon {
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-garantia-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
        }

        /* ── Wave ── */
        .contact-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 30;
        }

        /* ── Background ── */
        .contact-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        /* ── Spinner ── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-spinner {
          animation: spin 1s linear infinite;
          border: 2px solid rgba(90,69,32,0.2);
          border-top-color: #5A4520;
          border-radius: 50%;
        }

        /* ── Success animations ── */
        @keyframes successHeartPop {
          0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
          50%  { opacity: 1; transform: scale(1.2) rotate(5deg); }
          70%  { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes successFadeUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .success-heart { animation: successHeartPop 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .success-title {
          opacity: 0;
          animation: successFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.25s;
        }
        .success-text {
          opacity: 0;
          animation: successFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.4s;
        }
        .success-btn-anim {
          opacity: 0;
          animation: successFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.6s;
        }

        /* ── Entrance animations ── */
        @keyframes fadeSlideRight {
          0%   { opacity: 0; transform: translateX(-45px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(35px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillPop {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes formReveal {
          0%   { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes garantiaFade {
          0%   { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .entrance-contact-badge { opacity: 0; }
        .entrance-contact-badge.animate { animation: pillPop 0.6s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.1s; }
        .entrance-contact-title { opacity: 0; }
        .entrance-contact-title.animate { animation: fadeSlideRight 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.2s; }
        .entrance-contact-desc { opacity: 0; }
        .entrance-contact-desc.animate { animation: fadeSlideRight 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.35s; }
        .entrance-contact-garantia { opacity: 0; }
        .entrance-contact-garantia.animate { animation: garantiaFade 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .entrance-contact-garantia.animate.garantia-0 { animation-delay: 0.5s; }
        .entrance-contact-garantia.animate.garantia-1 { animation-delay: 0.6s; }
        .entrance-contact-garantia.animate.garantia-2 { animation-delay: 0.7s; }
        .entrance-contact-form { opacity: 0; }
        .entrance-contact-form.animate { animation: formReveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.3s; }
        .entrance-contact-join { opacity: 0; }
        .entrance-contact-join.animate { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.7s; }

        /* Reset button hover */
        .success-reset-btn {
          padding: 10px 28px;
          border-radius: 50px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .success-reset-btn:hover {
          background: rgba(255,255,255,0.15);
          color: #F9DDA3;
          border-color: rgba(249,221,163,0.4);
        }

        /* ══════════════════════════════
           DESKTOP (> 1024px)
        ══════════════════════════════ */
        .contact-section {
          min-height: 100vh;
          padding-top: 6vw;
          padding-bottom: 4vw;
        }

        .contact-layout {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          min-height: 0;
          width: 100%;
          align-items: center;
        }

        .contact-left {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 45%;
        }
        .contact-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-left: 6vw;
          padding-right: 3vw;
          gap: 2vw;
        }

        .contact-right {
          height: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55%;
        }
        .contact-right-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2vw;
        }

        /* Desktop sizes */
        .contact-badge { gap: 0.4vw; padding: 0.4vw 1.1vw; font-size: 0.9vw; }
        .contact-badge-icon { font-size: 0.95vw; }
        .contact-title { font-size: clamp(42px, 4.5vw, 75px); }
        .contact-desc { font-size: 1.2vw; max-width: 30vw; }

        .contact-garantias { gap: 0.8vw; margin-top: 0.5vw; }
        .contact-garantia-row { gap: 0.6vw; }
        .contact-garantia-icon { width: clamp(28px,2.2vw,36px); height: clamp(28px,2.2vw,36px); font-size: 0.9vw; }
        .contact-garantia-text { font-size: 0.95vw; }

        .contact-form-card { max-width: 34vw; padding: 2.5vw; gap: 1.3vw; }
        .contact-form-title { font-size: 1.4vw; margin-bottom: 0.3vw; }
        .contact-label { font-size: 0.88vw; }
        .contact-input { padding: 0.85vw 1.3vw; font-size: 1vw; }
        .contact-textarea { padding: 0.85vw 1.3vw; font-size: 1vw; min-height: 6vw; }
        .contact-field-gap { gap: 0.4vw; }
        .method-btn { padding: 0.4vw 1.1vw; font-size: 0.88vw; }
        .method-row { gap: 0.5vw; margin-bottom: 0.4vw; }
        .plan-options { gap: 0.45vw; }
        .plan-option { gap: 0.6vw; padding: 0.6vw 1.1vw; border-radius: 12px; }
        .plan-radio { width: 18px; height: 18px; }
        .plan-radio-dot { width: 8px; height: 8px; }
        .plan-label { font-size: 0.92vw; }
        .contact-legal { font-size: 0.78vw; }
        .submit-btn { padding: 0.85vw 0; font-size: 1.05vw; gap: 0.5vw; }
        .loading-spinner { width: 1.4vw; height: 1.4vw; }
        .join-team-link { gap: 0.6vw; padding: 0.7vw 1.6vw; font-weight: 400; font-size: 0.88vw; }
        .join-icon { font-size: 1vw; }
        .join-cta { color: #F9DDA3; font-weight: 500; margin-left: 0.2vw; }

        .contact-success-card { max-width: 34vw; padding: 3.5vw 2.5vw; gap: 1.4vw; }
        .success-heart-circle {
          width: clamp(65px,5.5vw,85px); height: clamp(65px,5.5vw,85px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2));
          border: 2px solid rgba(249,221,163,0.4);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 25px rgba(249,221,163,0.15);
        }
        .success-heart-emoji { font-size: clamp(30px,2.8vw,42px); }
        .success-title-text {
          font-family: 'Poppins', sans-serif; font-weight: 500;
          color: #F9DDA3; margin: 0;
        }
        .success-title-text { font-size: 1.6vw; }
        .success-body {
          font-family: 'Poppins', sans-serif; font-weight: 400;
          color: rgba(255,255,255,0.75); line-height: 1.7; margin: 0;
        }
        .success-body { font-size: 1.1vw; max-width: 26vw; }
        .success-divider {
          width: 5vw; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,221,163,0.4), transparent);
        }
        .success-reset-btn { font-size: 0.88vw; }

        .contact-wave svg { height: 65px; }

        /* ══════════════════════════════
           TABLET (769px – 1024px)
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .contact-section {
            min-height: auto;
            padding-top: 0;
            padding-bottom: 70px;
          }

          .contact-layout {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .contact-left {
            width: 100%;
            height: auto;
          }
          .contact-left-inner {
            align-items: center;
            text-align: center;
            padding: 70px 40px 0;
            gap: 18px;
          }

          .contact-right {
            width: 100%;
            height: auto;
          }
          .contact-right-inner {
            padding: 0 40px;
            gap: 18px;
          }

          .contact-badge { gap: 6px; padding: 7px 18px; font-size: 12.5px; }
          .contact-badge-icon { font-size: 13px; }
          .contact-title { font-size: 38px; }
          .contact-desc { font-size: 15px; max-width: 480px; }

          .contact-garantias { gap: 12px; margin-top: 6px; }
          .contact-garantia-row { gap: 10px; }
          .contact-garantia-icon { width: 34px; height: 34px; font-size: 14px; }
          .contact-garantia-text { font-size: 14px; }

          .contact-form-card { max-width: 560px; padding: 32px; gap: 20px; }
          .contact-form-title { font-size: 20px; margin-bottom: 4px; }
          .contact-label { font-size: 13.5px; }
          .contact-input { padding: 14px 18px; font-size: 15px; }
          .contact-textarea { padding: 14px 18px; font-size: 15px; min-height: 100px; }
          .contact-field-gap { gap: 6px; }
          .method-btn { padding: 8px 18px; font-size: 13.5px; }
          .method-row { gap: 8px; margin-bottom: 6px; }
          .plan-options { gap: 8px; }
          .plan-option { gap: 10px; padding: 12px 16px; border-radius: 12px; }
          .plan-radio { width: 20px; height: 20px; }
          .plan-radio-dot { width: 9px; height: 9px; }
          .plan-label { font-size: 14px; }
          .contact-legal { font-size: 12px; }
          .submit-btn { padding: 15px 0; font-size: 15px; gap: 8px; }
          .loading-spinner { width: 20px; height: 20px; }
          .join-team-link { gap: 8px; padding: 12px 24px; font-size: 13px; }
          .join-icon { font-size: 15px; }
          .join-cta { margin-left: 2px; }

          .contact-success-card { max-width: 560px; padding: 48px 32px; gap: 20px; }
          .success-heart-circle { width: 72px; height: 72px; }
          .success-heart-emoji { font-size: 34px; }
          .success-title-text { font-size: 22px; }
          .success-body { font-size: 15px; max-width: 400px; }
          .success-divider { width: 60px; }
          .success-reset-btn { font-size: 13px; padding: 11px 26px; }

          .contact-wave svg { height: 50px; }

          .entrance-contact-title.animate { animation-name: fadeSlideUp; }
          .entrance-contact-desc.animate { animation-name: fadeSlideUp; }
          .entrance-contact-garantia.animate { animation-name: fadeSlideUp; }
        }

        /* ══════════════════════════════
           MOBILE (≤ 768px)
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .contact-section {
            padding-top: 0;
            padding-bottom: 55px;
          }

          .contact-layout {
            gap: 32px;
          }

          .contact-left-inner {
            padding: 60px 24px 0;
            gap: 14px;
          }

          .contact-right-inner {
            padding: 0 24px;
            gap: 16px;
          }

          .contact-badge { gap: 5px; padding: 6px 14px; font-size: 12px; }
          .contact-badge-icon { font-size: 12.5px; }
          .contact-title { font-size: 30px; }
          .contact-desc { font-size: 14px; max-width: 380px; }

          .contact-garantias { gap: 10px; margin-top: 4px; }
          .contact-garantia-row { gap: 8px; }
          .contact-garantia-icon { width: 32px; height: 32px; font-size: 13px; }
          .contact-garantia-text { font-size: 13px; }

          .contact-form-card { max-width: 100%; padding: 26px; gap: 18px; border-radius: 20px; }
          .contact-form-title { font-size: 18px; }
          .contact-label { font-size: 13px; }
          .contact-input { padding: 13px 16px; font-size: 14.5px; border-radius: 12px; }
          .contact-textarea { padding: 13px 16px; font-size: 14.5px; min-height: 90px; border-radius: 12px; }
          .contact-field-gap { gap: 5px; }
          .method-btn { padding: 7px 16px; font-size: 13px; }
          .method-row { gap: 7px; margin-bottom: 5px; }
          .plan-options { gap: 7px; }
          .plan-option { gap: 9px; padding: 11px 14px; border-radius: 11px; }
          .plan-radio { width: 18px; height: 18px; }
          .plan-radio-dot { width: 8px; height: 8px; }
          .plan-label { font-size: 13px; }
          .contact-legal { font-size: 11.5px; }
          .submit-btn { padding: 14px 0; font-size: 14.5px; gap: 7px; border-radius: 14px; }
          .loading-spinner { width: 18px; height: 18px; }
          .join-team-link {
            gap: 6px; padding: 11px 20px; font-size: 12.5px;
            flex-wrap: wrap; justify-content: center; text-align: center;
          }
          .join-icon { font-size: 14px; }

          .contact-success-card { max-width: 100%; padding: 40px 24px; gap: 18px; border-radius: 20px; }
          .success-heart-circle { width: 64px; height: 64px; }
          .success-heart-emoji { font-size: 30px; }
          .success-title-text { font-size: 20px; }
          .success-body { font-size: 14px; max-width: 320px; }
          .success-divider { width: 50px; }
          .success-reset-btn { font-size: 12.5px; padding: 10px 24px; }

          .contact-wave svg { height: 40px; }
        }

        /* ══════════════════════════════
           SMALL MOBILE (≤ 480px)
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .contact-section {
            padding-bottom: 45px;
          }

          .contact-layout { gap: 28px; }

          .contact-left-inner {
            padding: 52px 18px 0;
            gap: 12px;
          }

          .contact-right-inner {
            padding: 0 18px;
            gap: 14px;
          }

          .contact-badge { gap: 4px; padding: 5px 12px; font-size: 11px; }
          .contact-title { font-size: 26px; }
          .contact-desc { font-size: 13px; max-width: 320px; }

          .contact-garantias { gap: 8px; }
          .contact-garantia-icon { width: 30px; height: 30px; font-size: 12px; }
          .contact-garantia-text { font-size: 12.5px; }

          .contact-form-card { padding: 22px 18px; gap: 16px; border-radius: 18px; }
          .contact-form-title { font-size: 17px; }
          .contact-label { font-size: 12.5px; }
          .contact-input { padding: 12px 14px; font-size: 14px; border-radius: 11px; }
          .contact-textarea { padding: 12px 14px; font-size: 14px; min-height: 85px; border-radius: 11px; }
          .method-btn { padding: 6px 14px; font-size: 12.5px; }
          .plan-option { gap: 8px; padding: 10px 12px; border-radius: 10px; }
          .plan-label { font-size: 12.5px; }
          .contact-legal { font-size: 11px; }
          .submit-btn { padding: 13px 0; font-size: 14px; }
          .loading-spinner { width: 16px; height: 16px; }
          .join-team-link { gap: 5px; padding: 10px 16px; font-size: 12px; }

          .contact-success-card { padding: 36px 20px; gap: 16px; border-radius: 18px; }
          .success-heart-circle { width: 58px; height: 58px; }
          .success-heart-emoji { font-size: 27px; }
          .success-title-text { font-size: 18px; }
          .success-body { font-size: 13px; max-width: 280px; }
          .success-divider { width: 40px; }
          .success-reset-btn { font-size: 12px; padding: 9px 22px; }

          .contact-wave svg { height: 32px; }
        }

        /* ══════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════ */
        @media (max-width: 380px) {
          .contact-section { padding-bottom: 40px; }
          .contact-layout { gap: 24px; }

          .contact-left-inner { padding: 46px 14px 0; gap: 10px; }
          .contact-right-inner { padding: 0 14px; gap: 12px; }

          .contact-badge { padding: 4px 10px; font-size: 10.5px; }
          .contact-title { font-size: 23px; }
          .contact-desc { font-size: 12.5px; max-width: 280px; }

          .contact-garantias { gap: 7px; }
          .contact-garantia-icon { width: 28px; height: 28px; font-size: 11px; }
          .contact-garantia-text { font-size: 12px; }

          .contact-form-card { padding: 20px 16px; gap: 14px; border-radius: 16px; }
          .contact-form-title { font-size: 16px; }
          .contact-label { font-size: 12px; }
          .contact-input { padding: 11px 13px; font-size: 13.5px; border-radius: 10px; }
          .contact-textarea { padding: 11px 13px; font-size: 13.5px; min-height: 80px; border-radius: 10px; }
          .method-btn { padding: 5px 12px; font-size: 12px; }
          .plan-option { gap: 7px; padding: 9px 11px; border-radius: 9px; }
          .plan-radio { width: 16px; height: 16px; }
          .plan-radio-dot { width: 7px; height: 7px; }
          .plan-label { font-size: 12px; }
          .contact-legal { font-size: 10.5px; }
          .submit-btn { padding: 12px 0; font-size: 13.5px; }
          .join-team-link { padding: 9px 14px; font-size: 11.5px; }

          .contact-success-card { padding: 32px 16px; gap: 14px; border-radius: 16px; }
          .success-heart-circle { width: 52px; height: 52px; }
          .success-heart-emoji { font-size: 24px; }
          .success-title-text { font-size: 17px; }
          .success-body { font-size: 12.5px; max-width: 260px; }
          .success-reset-btn { font-size: 11.5px; padding: 8px 20px; }

          .contact-wave svg { height: 28px; }
        }

        /* ══════════════════════════════
           MINIMUM (≤ 320px)
        ══════════════════════════════ */
        @media (max-width: 320px) {
          .contact-section { padding-bottom: 36px; }
          .contact-layout { gap: 22px; }

          .contact-left-inner { padding: 40px 12px 0; gap: 8px; }
          .contact-right-inner { padding: 0 12px; gap: 10px; }

          .contact-badge { padding: 3px 9px; font-size: 10px; }
          .contact-title { font-size: 20px; }
          .contact-desc { font-size: 12px; max-width: 260px; }

          .contact-garantias { gap: 6px; }
          .contact-garantia-icon { width: 26px; height: 26px; font-size: 10px; }
          .contact-garantia-text { font-size: 11.5px; }

          .contact-form-card { padding: 18px 14px; gap: 12px; border-radius: 14px; }
          .contact-form-title { font-size: 15px; }
          .contact-label { font-size: 11.5px; }
          .contact-input { padding: 10px 12px; font-size: 13px; border-radius: 9px; }
          .contact-textarea { padding: 10px 12px; font-size: 13px; min-height: 75px; border-radius: 9px; }
          .method-btn { padding: 5px 10px; font-size: 11.5px; }
          .plan-option { gap: 6px; padding: 8px 10px; border-radius: 8px; }
          .plan-radio { width: 15px; height: 15px; }
          .plan-radio-dot { width: 6px; height: 6px; }
          .plan-label { font-size: 11.5px; }
          .contact-legal { font-size: 10px; }
          .submit-btn { padding: 11px 0; font-size: 13px; }
          .loading-spinner { width: 14px; height: 14px; }
          .join-team-link { padding: 8px 12px; font-size: 11px; }

          .contact-success-card { padding: 28px 14px; gap: 12px; border-radius: 14px; }
          .success-heart-circle { width: 48px; height: 48px; }
          .success-heart-emoji { font-size: 22px; }
          .success-title-text { font-size: 16px; }
          .success-body { font-size: 12px; max-width: 240px; }
          .success-reset-btn { font-size: 11px; padding: 7px 18px; }

          .contact-wave svg { height: 24px; }
        }
      `}</style>

      {/* Background */}
      <div className="contact-bg">
        <img src="/fondoazul.png" alt="" />
      </div>

      {/* Wave */}
      <div className="contact-wave">
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      {/* ═══ Layout ═══ */}
      <div className="contact-layout">

        {/* ── Left: Info ── */}
        <div className="contact-left">
          <div className="contact-left-inner">
            <span className={`contact-badge entrance-contact-badge ${hasAnimated ? 'animate' : ''}`}>
              <span className="contact-badge-icon">💌</span>
              Comenzá ahora
            </span>

            <h2 className={`contact-title entrance-contact-title ${hasAnimated ? 'animate' : ''}`}>
              Tu primer paso<br />hacia algo <span>especial</span>
            </h2>

            <p className={`contact-desc entrance-contact-desc ${hasAnimated ? 'animate' : ''}`}>
              Completá el formulario y el equipo de Camil se pondrá en contacto con vos en menos de 24 hs para conocerte y comenzar esta experiencia juntos.
            </p>

            <div className="flex flex-col contact-garantias">
              {garantias.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center contact-garantia-row entrance-contact-garantia garantia-${i} ${hasAnimated ? 'animate' : ''}`}
                >
                  <div className="contact-garantia-icon">
                    {item.emoji}
                  </div>
                  <span className="contact-garantia-text">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="contact-right">
          <div className="contact-right-inner">
            {!submitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`contact-form-card entrance-contact-form ${hasAnimated ? 'animate' : ''}`}
                >
                  <h3 className="contact-form-title">
                    Solicitar vínculo
                  </h3>

                  {/* Name */}
                  <div className="flex flex-col contact-field-gap">
                    <label className="contact-label">Nombre *</label>
                    <input type="text" name="nombre" className="contact-input" placeholder="¿Cómo te llamás?" required />
                  </div>

                  {/* Contact method */}
                  <div className="flex flex-col contact-field-gap">
                    <label className="contact-label">¿Cómo preferís que te contactemos? *</label>
                    <div className="flex method-row">
                      {(['telefono', 'correo'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          className="method-btn"
                          onClick={() => setContactMethod(method)}
                          style={{
                            border: `1px solid ${contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                            backgroundColor: contactMethod === method ? 'rgba(249,221,163,0.15)' : 'transparent',
                            color: contactMethod === method ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {method === 'telefono' ? '📞 Teléfono' : '✉️ Correo'}
                        </button>
                      ))}
                    </div>
                    <input
                      type={contactMethod === 'telefono' ? 'tel' : 'email'}
                      name="contacto"
                      className="contact-input"
                      placeholder={contactMethod === 'telefono' ? 'Ej: +54 11 1234-5678' : 'Tu correo electrónico'}
                      required
                    />
                  </div>

                  {/* Plan */}
                  <div className="flex flex-col contact-field-gap">
                    <label className="contact-label">Plan de interés *</label>
                    <div className="flex flex-col plan-options">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          className="plan-option"
                          onClick={() => setSelectedPlan(plan.id)}
                          style={{
                            border: `1.5px solid ${selectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.15)'}`,
                            backgroundColor: selectedPlan === plan.id ? plan.bg : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          <div
                            className="plan-radio"
                            style={{
                              borderRadius: '50%',
                              border: `2px solid ${selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {selectedPlan === plan.id && (
                              <div
                                className="plan-radio-dot"
                                style={{ borderRadius: '50%', backgroundColor: '#FFFFFF' }}
                              />
                            )}
                          </div>
                          <span
                            className="plan-label"
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: selectedPlan === plan.id ? 500 : 400,
                              color: selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                            }}
                          >
                            {plan.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col contact-field-gap">
                    <label className="contact-label">Contanos un poco sobre vos *</label>
                    <textarea
                      name="mensaje"
                      className="contact-textarea"
                      placeholder="¿Para quién es el servicio? ¿Qué te motivó a escribirnos?"
                      required
                    />
                  </div>

                  {/* Legal */}
                  <p className="contact-legal">
                    Al enviar aceptás nuestra{' '}
                    <span>política de privacidad</span> y{' '}
                    <span>términos y condiciones</span>.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar solicitud'
                    )}
                  </button>
                </form>

                {/* Join team */}
                <button
                  type="button"
                  className={`join-team-link entrance-contact-join ${hasAnimated ? 'animate' : ''}`}
                  onClick={onNavigateToJoinTeam}
                >
                  <span className="join-icon">🌟</span>
                  ¿Querés ser parte del equipo de Camil?
                  <span className="join-cta">Conocé más →</span>
                </button>
              </>
            ) : (
              /* ── Success state ── */
              <div className="contact-success-card">
                <div className="success-heart-circle success-heart">
                  <span className="success-heart-emoji">💛</span>
                </div>

                <h3 className="success-title-text success-title">
                  ¡Solicitud enviada!
                </h3>

                <p className="success-body success-text">
                  El equipo de Camil recibió tu mensaje y se pondrá en contacto con vos en menos de 24 hs.
                  <br /><br />
                  Gracias por dar el primer paso 💌
                </p>

                <div className="success-divider success-text" />

                <button
                  type="button"
                  className="success-reset-btn success-btn-anim"
                  onClick={handleReset}
                >
                  Enviar otra solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactScreen;