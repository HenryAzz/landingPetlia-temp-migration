import { useEffect, useState, useRef } from 'react';

interface JoinTeamScreenProps {
  onGoBack?: () => void;
}

const BENEFITS = [
  { emoji: '💰', title: 'Bien remunerado', desc: 'Ingresos justos y flexibles' },
  { emoji: '🏠', title: '100% remoto', desc: 'Trabajá desde donde quieras' },
  { emoji: '🔒', title: 'Privacidad total', desc: 'Tu identidad siempre protegida' },
  { emoji: '💛', title: 'Acompañamiento', desc: 'Formación y apoyo del equipo' },
];

const JoinTeamScreen = ({ onGoBack }: JoinTeamScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setHasAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => setSubmitted(false);

  const a = hasAnimated;

  return (
    <section ref={sectionRef} className="jt-section">
      <style>{`
        /* ═══════════════════════════════
           BASE
        ═══════════════════════════════ */
        .jt-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: 100dvh;
        }

        /* ═══ BACKGROUND ═══ */
        .jt-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jt-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        /* ═══ TOP BAR ═══ */
        .jt-topbar {
          position: relative;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: clamp(8px, 0.8vw, 14px);
          padding: clamp(16px, 1.5vw, 24px) clamp(24px, 3vw, 48px);
          flex-shrink: 0;
        }

        .jt-back {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.4vw, 8px);
          padding: clamp(8px, 0.5vw, 12px) clamp(16px, 1.2vw, 22px);
          border-radius: 50px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12px, 0.95vw, 15px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          opacity: 0;
        }
        .jt-back:hover {
          background: rgba(255,255,255,0.12);
          color: #F9DDA3;
          border-color: rgba(249,221,163,0.3);
        }

        .jt-topbar-badge {
          display: inline-flex;
          align-items: center;
          gap: clamp(4px, 0.4vw, 7px);
          padding: clamp(6px, 0.5vw, 10px) clamp(14px, 1.1vw, 20px);
          border-radius: 50px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(11px, 0.95vw, 15px);
          letter-spacing: 0.05em;
          opacity: 0;
        }

        /* ═══ FLOATING DECO ═══ */
        .jt-deco {
          position: absolute;
          pointer-events: none;
          z-index: 4;
          opacity: 0;
        }
        .jt-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes jtF1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1.5deg); }
        }
        @keyframes jtF2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-6px) rotate(-2deg); }
          60% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes jtF3 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-7px) scale(1.03); }
        }

        .jt-fl-1 { animation: jtF1 4s ease-in-out infinite; }
        .jt-fl-2 { animation: jtF2 4.6s ease-in-out infinite 0.5s; }
        .jt-fl-3 { animation: jtF3 3.8s ease-in-out infinite 1s; }

        /* ═══ LAYOUT ═══ */
        .jt-layout {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          width: 100%;
          align-items: center;
        }

        .jt-left {
          width: 48%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .jt-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-left: 6vw;
          padding-right: 2vw;
        }

        .jt-right {
          width: 52%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;
          padding-right: 6vw;
        }

        /* ═══ ACCENT ═══ */
        .jt-accent {
          width: 42px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.15));
          margin-bottom: clamp(14px, 1.2vw, 20px);
          opacity: 0;
        }

        /* ═══ LABEL ═══ */
        .jt-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(10px, 0.82vw, 12px);
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: clamp(14px, 1.2vw, 20px);
          opacity: 0;
        }

        /* ═══ TITLE ═══ */
        .jt-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3.8vw, 54px);
          line-height: 1.14;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(14px, 1.2vw, 22px);
          text-shadow: 0 2px 16px rgba(0,0,0,0.2);
          opacity: 0;
        }
        .jt-title-highlight {
          color: #F9DDA3;
          font-weight: 700;
        }
        .jt-title-light {
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.85);
        }

        /* ═══ DESC ═══ */
        .jt-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.05vw, 16px);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0 0 clamp(20px, 1.8vw, 28px);
          max-width: clamp(280px, 30vw, 440px);
          opacity: 0;
        }

        /* ═══ BENEFITS GRID ═══ */
        .jt-benefits {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(8px, 0.7vw, 12px);
          width: 100%;
          max-width: clamp(300px, 30vw, 440px);
          margin-bottom: clamp(20px, 1.8vw, 28px);
        }

        .jt-benefit {
          display: flex;
          align-items: center;
          gap: clamp(10px, 0.8vw, 14px);
          padding: clamp(12px, 1vw, 18px);
          border-radius: clamp(12px, 1vw, 16px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          opacity: 0;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .jt-benefit:hover {
          background: rgba(249,221,163,0.08);
          border-color: rgba(249,221,163,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .jt-benefit-icon {
          width: clamp(34px, 2.5vw, 42px);
          height: clamp(34px, 2.5vw, 42px);
          border-radius: clamp(9px, 0.8vw, 12px);
          background: linear-gradient(135deg, rgba(249,221,163,0.15), rgba(246,158,130,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 1.1vw, 18px);
          flex-shrink: 0;
        }

        .jt-benefit-text {
          display: flex;
          flex-direction: column;
          gap: clamp(1px, 0.15vw, 3px);
          min-width: 0;
        }
        .jt-benefit-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 0.9vw, 14px);
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.01em;
        }
        .jt-benefit-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10.5px, 0.75vw, 12px);
          color: rgba(255,255,255,0.45);
          line-height: 1.4;
        }

        /* ═══ CLOSING ═══ */
        .jt-closing {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(12px, 0.95vw, 15px);
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin: 0;
          opacity: 0;
        }

        /* ═══ AVATAR — DESKTOP (absolute) ═══ */
        .jt-avatar-dk {
          position: absolute;
          bottom: 0;
          left: 38%;
          transform: translateX(-50%);
          width: clamp(260px, 24vw, 400px);
          z-index: 15;
          pointer-events: none;
          margin-bottom: -1.2vw;
          opacity: 0;
        }
        .jt-avatar-dk img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 8px 30px rgba(0,0,0,0.25));
        }

        /* ═══ AVATAR — MOBILE (in-flow) ═══ */
        .jt-avatar-mb {
          display: none;
          width: 100%;
          max-width: 280px;
          margin: 0 auto clamp(16px, 2vw, 24px);
          opacity: 0;
        }
        .jt-avatar-mb img {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 30px rgba(0,0,0,0.25));
        }

        /* ═══ FORM CARD ═══ */
        .jt-form-card {
          display: flex;
          flex-direction: column;
          border-radius: clamp(18px, 1.6vw, 26px);
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1);
          width: 100%;
          max-width: clamp(340px, 32vw, 500px);
          padding: clamp(22px, 2.2vw, 36px);
          gap: clamp(12px, 1.1vw, 18px);
          opacity: 0;
        }

        .jt-form-header {
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.25vw, 5px);
          margin-bottom: clamp(2px, 0.3vw, 6px);
        }
        .jt-form-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(17px, 1.4vw, 24px);
          color: #F9DDA3;
          margin: 0;
        }
        .jt-form-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 0.88vw, 14px);
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* ═══ FIELDS ═══ */
        .jt-field {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.35vw, 7px);
        }
        .jt-field-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 0.88vw, 14px);
          color: rgba(255,255,255,0.65);
        }
        .jt-field-row {
          display: flex;
          gap: clamp(8px, 0.7vw, 12px);
        }
        .jt-field-row .jt-field { flex: 1; min-width: 0; }
        .jt-field-age { flex: 0 0 28% !important; }

        .jt-input {
          width: 100%;
          padding: clamp(11px, 0.8vw, 15px) clamp(14px, 1.2vw, 20px);
          border-radius: clamp(10px, 0.9vw, 14px);
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 16px);
          letter-spacing: 0.02em;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .jt-input::placeholder { color: rgba(255,255,255,0.4); }
        .jt-input:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        .jt-textarea {
          width: 100%;
          padding: clamp(11px, 0.8vw, 15px) clamp(14px, 1.2vw, 20px);
          border-radius: clamp(10px, 0.9vw, 14px);
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 16px);
          outline: none;
          resize: none;
          min-height: clamp(80px, 6vw, 110px);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .jt-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .jt-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        /* ═══ METHODS ═══ */
        .jt-methods {
          display: flex;
          gap: clamp(6px, 0.5vw, 10px);
          margin-bottom: clamp(4px, 0.3vw, 6px);
        }
        .jt-method {
          padding: clamp(6px, 0.4vw, 9px) clamp(14px, 1.1vw, 20px);
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 0.88vw, 14px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .jt-method:hover { background: rgba(255,255,255,0.15); }

        /* ═══ LEGAL ═══ */
        .jt-legal {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.78vw, 12px);
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          margin: 0;
        }
        .jt-legal span {
          color: rgba(249,221,163,0.6);
          cursor: pointer;
          text-decoration: underline;
        }

        /* ═══ SUBMIT ═══ */
        .jt-submit {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: clamp(12px, 0.8vw, 16px) 0;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: 1px solid rgba(255,255,255,0.3);
          color: #5A4520;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1vw, 16px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 0.5vw, 10px);
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(249,221,163,0.2);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }
        .jt-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .jt-submit:hover::before { left: 100%; }
        .jt-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(249,221,163,0.3);
        }
        .jt-submit:active { transform: scale(0.97); }
        .jt-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ═══ SUBMIT TRUST ═══ */
        .jt-submit-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 0.8vw, 16px);
          flex-wrap: wrap;
        }
        .jt-submit-trust-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.7vw, 12px);
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
        }

        /* ═══ SPINNER ═══ */
        @keyframes jtSpin { to { transform: rotate(360deg); } }
        .jt-spinner {
          width: clamp(16px, 1.2vw, 20px);
          height: clamp(16px, 1.2vw, 20px);
          border: 2px solid rgba(90,69,32,0.2);
          border-top-color: #5A4520;
          border-radius: 50%;
          animation: jtSpin 1s linear infinite;
        }

        /* ═══ SUCCESS ═══ */
        .jt-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: clamp(18px, 1.6vw, 26px);
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
          width: 100%;
          max-width: clamp(340px, 32vw, 500px);
          padding: clamp(32px, 3vw, 52px) clamp(22px, 2.2vw, 36px);
          gap: clamp(14px, 1.2vw, 20px);
        }

        .jt-success-circle {
          width: clamp(56px, 4.5vw, 78px);
          height: clamp(56px, 4.5vw, 78px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2));
          border: 2px solid rgba(249,221,163,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(249,221,163,0.15);
        }
        .jt-success-emoji { font-size: clamp(26px, 2.4vw, 38px); }
        .jt-success-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(17px, 1.5vw, 24px);
          color: #F9DDA3;
          margin: 0;
        }
        .jt-success-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12.5px, 1vw, 16px);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0;
          max-width: clamp(260px, 24vw, 380px);
        }
        .jt-success-divider {
          width: clamp(40px, 5vw, 70px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,221,163,0.4), transparent);
        }
        .jt-success-actions {
          display: flex;
          align-items: center;
          gap: clamp(8px, 0.8vw, 14px);
          flex-wrap: wrap;
          justify-content: center;
        }
        .jt-success-btn {
          padding: clamp(8px, 0.5vw, 12px) clamp(18px, 1.4vw, 26px);
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(11px, 0.88vw, 14px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .jt-success-btn--secondary {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }
        .jt-success-btn--secondary:hover {
          background: rgba(255,255,255,0.15);
          color: #F9DDA3;
          border-color: rgba(249,221,163,0.4);
        }
        .jt-success-btn--primary {
          background: linear-gradient(135deg, rgba(249,221,163,0.15), rgba(249,221,163,0.08));
          border: 1px solid rgba(249,221,163,0.3);
          color: #F9DDA3;
          font-weight: 500;
        }
        .jt-success-btn--primary:hover {
          background: linear-gradient(135deg, rgba(249,221,163,0.25), rgba(249,221,163,0.15));
        }

        @keyframes jtHeartPop {
          0% { opacity: 0; transform: scale(0) rotate(-15deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(5deg); }
          70% { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes jtSuccessFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .jt-s-heart { animation: jtHeartPop 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .jt-s-1 { opacity: 0; animation: jtSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
        .jt-s-2 { opacity: 0; animation: jtSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards; }
        .jt-s-3 { opacity: 0; animation: jtSuccessFade 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }

        /* ═══ ENTRANCE ═══ */
        @keyframes jtUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes jtSlide {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes jtScale {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes jtPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes jtCardIn {
          0% { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes jtImgIn {
          0% { opacity: 0; transform: translateY(60px); }
          60% { opacity: 1; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .jt-a-up { animation: jtUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .jt-a-slide { animation: jtSlide 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .jt-a-scale { animation: jtScale 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .jt-a-pop { animation: jtPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .jt-a-card { animation: jtCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .jt-a-img { animation: jtImgIn 1s cubic-bezier(0.25,0.46,0.45,0.94) both; }

        /* ═══ TABLET ≤ 1024px ═══ */
        @media (max-width: 1024px) {
          .jt-section { min-height: auto; }

          .jt-layout {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding-bottom: 40px;
          }

          .jt-left { width: 100%; }
          .jt-left-inner {
            align-items: center;
            text-align: center;
            padding: 0 40px;
          }

          .jt-right {
            width: 100%;
            padding: 0 40px;
            justify-content: center;
          }

          .jt-form-card, .jt-success { max-width: 520px; margin: 0 auto; }
          .jt-desc { max-width: 460px; }
          .jt-benefits { max-width: 460px; }
          .jt-closing { text-align: center; }

          .jt-avatar-dk { display: none !important; }
          .jt-avatar-mb { display: block; }

          .jt-deco { display: none !important; }

          .jt-a-slide { animation-name: jtUp; }
        }

        /* ═══ MOBILE ≤ 768px ═══ */
        @media (max-width: 768px) {
          .jt-layout { gap: 16px; padding-bottom: 32px; }
          .jt-left-inner { padding: 0 24px; }
          .jt-right { padding: 0 24px; justify-content: center; }

          .jt-title { font-size: clamp(26px, 6vw, 34px); }
          .jt-desc { font-size: 14px; max-width: 380px; }

          .jt-form-card { max-width: 100%; padding: 26px; border-radius: 20px; }
          .jt-success { max-width: 100%; padding: 40px 24px; border-radius: 20px; }

          .jt-benefits { max-width: 100%; gap: 10px; }
          .jt-benefit { padding: 14px; gap: 12px; }
          .jt-benefit-icon { width: 36px; height: 36px; font-size: 16px; }
          .jt-benefit-name { font-size: 13px; }
          .jt-benefit-desc { font-size: 11.5px; }

          .jt-submit { border-radius: 14px; }

          .jt-avatar-mb { max-width: 240px; }
          .jt-topbar { padding: 16px 24px; }
        }

        /* ═══ SMALL ≤ 540px ═══ */
        @media (max-width: 540px) {
          .jt-layout { gap: 14px; padding-bottom: 28px; }
          .jt-left-inner { padding: 0 20px; }
          .jt-right { padding: 0 20px; justify-content: center; }

          .jt-title { font-size: clamp(24px, 5.5vw, 28px); }
          .jt-label { font-size: 10px; }
          .jt-desc { font-size: 13px; max-width: 340px; }

          .jt-form-card { padding: 22px 18px; border-radius: 18px; }

          .jt-benefits { gap: 8px; }
          .jt-benefit { padding: 12px; gap: 10px; border-radius: 12px; }
          .jt-benefit-icon { width: 32px; height: 32px; font-size: 14px; }

          .jt-field-row { flex-direction: column; }
          .jt-field-age { flex: 1 !important; }

          .jt-avatar-mb { max-width: 210px; }
          .jt-topbar { padding: 14px 20px; }
        }

        /* ═══ XS ≤ 400px ═══ */
        @media (max-width: 400px) {
          .jt-layout { gap: 12px; padding-bottom: 24px; }
          .jt-left-inner { padding: 0 18px; }
          .jt-right { padding: 0 18px; justify-content: center; }

          .jt-accent { width: 30px; margin-bottom: 12px; }
          .jt-label { margin-bottom: 12px; font-size: 9.5px; }
          .jt-title { font-size: 22px; margin-bottom: 10px; }
          .jt-desc { font-size: 12.5px; max-width: 300px; margin-bottom: 16px; }

          .jt-benefits { gap: 7px; margin-bottom: 16px; }
          .jt-benefit { padding: 11px; gap: 9px; }
          .jt-benefit-icon { width: 28px; height: 28px; font-size: 13px; border-radius: 8px; }
          .jt-benefit-name { font-size: 12.5px; }
          .jt-benefit-desc { font-size: 11px; }

          .jt-form-card { padding: 20px 16px; gap: 14px; border-radius: 16px; }
          .jt-form-title { font-size: 16px; }
          .jt-submit { padding: 12px 0; font-size: 13px; }
          .jt-submit-trust-item { font-size: 9.5px; }
          .jt-closing { font-size: 12px; }

          .jt-avatar-mb { max-width: 180px; }
          .jt-topbar { padding: 12px 18px; }
          .jt-back { font-size: 12px; padding: 7px 14px; }
          .jt-topbar-badge { font-size: 11px; padding: 5px 12px; }
        }

        /* ═══ XXS ≤ 340px ═══ */
        @media (max-width: 340px) {
          .jt-layout { gap: 10px; padding-bottom: 20px; }
          .jt-left-inner { padding: 0 14px; }
          .jt-right { padding: 0 14px; justify-content: center; }

          .jt-title { font-size: 20px; }
          .jt-desc { font-size: 12px; }

          .jt-benefit { padding: 10px; }
          .jt-benefit-icon { width: 26px; height: 26px; font-size: 12px; }
          .jt-benefit-name { font-size: 12px; }
          .jt-benefit-desc { font-size: 10.5px; }

          .jt-form-card { padding: 18px 14px; gap: 12px; border-radius: 14px; }
          .jt-form-title { font-size: 15px; }
          .jt-submit { padding: 11px 0; font-size: 12.5px; }

          .jt-avatar-mb { max-width: 160px; }
          .jt-topbar { padding: 10px 14px; }
          .jt-back { font-size: 11px; padding: 6px 12px; }
          .jt-topbar-badge { font-size: 10px; padding: 4px 10px; }

          .jt-success { padding: 28px 14px; border-radius: 14px; }
          .jt-success-btn { padding: 7px 16px; font-size: 11px; }
        }
      `}</style>

      {/* ═══ BACKGROUND ═══ */}
      <div className="jt-bg">
        <img src="/fondoliso.jpeg" alt="" />
      </div>

      {/* ═══ FLOATING DECO (desktop) ═══ */}
      <div
        className={`jt-deco ${a ? 'jt-a-pop' : ''}`}
        style={{ left: '46%', top: '15%', width: 'clamp(30px, 3.5vw, 55px)', height: 'clamp(30px, 3.5vw, 55px)', animationDelay: '0.6s' }}
      >
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'jt-fl-1' : ''} style={{ opacity: 0.6 }} />
      </div>
      <div
        className={`jt-deco ${a ? 'jt-a-pop' : ''}`}
        style={{ right: '4vw', top: '20%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', animationDelay: '0.75s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'jt-fl-2' : ''} style={{ opacity: 0.55 }} />
      </div>
      <div
        className={`jt-deco ${a ? 'jt-a-pop' : ''}`}
        style={{ left: '3vw', bottom: '25%', width: 'clamp(26px, 3vw, 48px)', height: 'clamp(26px, 3vw, 48px)', animationDelay: '0.9s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'jt-fl-3' : ''} style={{ opacity: 0.5 }} />
      </div>

      {/* ═══ TOP BAR ═══ */}
      <div className="jt-topbar">
        <button
          className={`jt-back ${a ? 'jt-a-up' : ''}`}
          style={{ animationDelay: '0.1s' }}
          onClick={onGoBack}
        >
          ← Volver al inicio
        </button>
        <span
          className={`jt-topbar-badge ${a ? 'jt-a-up' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <span>🌟</span> Sumate al equipo
        </span>
      </div>

      {/* ═══ LAYOUT ═══ */}
      <div className="jt-layout">

        {/* ── LEFT ── */}
        <div className="jt-left">
          <div className="jt-left-inner">
            <div
              className={`jt-accent ${a ? 'jt-a-slide' : ''}`}
              style={{ animationDelay: '0.15s' }}
            />

            <span
              className={`jt-label ${a ? 'jt-a-slide' : ''}`}
              style={{ animationDelay: '0.25s' }}
            >
              UNITE AL EQUIPO
            </span>

            <h1
              className={`jt-title ${a ? 'jt-a-slide' : ''}`}
              style={{ animationDelay: '0.35s' }}
            >
              <span className="jt-title-light">Camil quiere dar el</span>
              <br />
              mejor servicio.
              <br />
              <span className="jt-title-light">Pero no puede </span>
              <span className="jt-title-highlight">sola</span>.
            </h1>

            <p
              className={`jt-desc ${a ? 'jt-a-slide' : ''}`}
              style={{ animationDelay: '0.48s' }}
            >
              Buscamos personas especiales que compartan nuestra visión:
              empatía, dedicación y cariño genuino en cada interacción.
              Si sentís que podés aportar eso, nos encantaría conocerte.
            </p>

            {/* Avatar mobile */}
            <div
              className={`jt-avatar-mb ${a ? 'jt-a-img' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              <img src="/avatars.png" alt="Equipo Camil" />
            </div>

            {/* Benefits */}
            <div className="jt-benefits">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className={`jt-benefit ${a ? 'jt-a-card' : ''}`}
                  style={{ animationDelay: `${0.55 + i * 0.1}s` }}
                >
                  <div className="jt-benefit-icon">
                    <span>{b.emoji}</span>
                  </div>
                  <div className="jt-benefit-text">
                    <span className="jt-benefit-name">{b.title}</span>
                    <span className="jt-benefit-desc">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`jt-closing ${a ? 'jt-a-up' : ''}`}
              style={{ animationDelay: '1s' }}
            >
              Juntas podemos llegar a más personas 💛
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="jt-right">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className={`jt-form-card ${a ? 'jt-a-scale' : ''}`}
              style={{ animationDelay: '0.35s' }}
            >
              <div className="jt-form-header">
                <h3 className="jt-form-title">Postulación</h3>
                <p className="jt-form-sub">
                  Contanos sobre vos y por qué te gustaría sumarte
                </p>
              </div>

              {/* Name + Age */}
              <div className="jt-field-row">
                <div className="jt-field">
                  <label className="jt-field-label">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="jt-input"
                    placeholder="¿Cómo te llamás?"
                    required
                  />
                </div>
                <div className="jt-field jt-field-age">
                  <label className="jt-field-label">Edad *</label>
                  <input
                    type="number"
                    name="edad"
                    className="jt-input"
                    placeholder="Edad"
                    min="18"
                    max="65"
                    required
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="jt-field">
                <label className="jt-field-label">
                  ¿Cómo preferís que te contactemos? *
                </label>
                <div className="jt-methods">
                  {(['telefono', 'correo'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className="jt-method"
                      onClick={() => setContactMethod(m)}
                      style={{
                        border: `1px solid ${contactMethod === m ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                        backgroundColor: contactMethod === m ? 'rgba(249,221,163,0.15)' : 'transparent',
                        color: contactMethod === m ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {m === 'telefono' ? '📞 Teléfono' : '✉️ Correo'}
                    </button>
                  ))}
                </div>
                <input
                  type={contactMethod === 'telefono' ? 'tel' : 'email'}
                  name="contacto"
                  className="jt-input"
                  placeholder={
                    contactMethod === 'telefono'
                      ? 'Ej: +54 11 1234-5678'
                      : 'Tu correo electrónico'
                  }
                  required
                />
              </div>

              {/* Message */}
              <div className="jt-field">
                <label className="jt-field-label">
                  ¿Por qué te gustaría ser parte del equipo? *
                </label>
                <textarea
                  name="mensaje"
                  className="jt-textarea"
                  placeholder="¿Qué te motiva? ¿Tenés experiencia en acompañamiento o atención a personas?"
                  required
                />
              </div>

              {/* Legal */}
              <p className="jt-legal">
                Al enviar aceptás nuestra{' '}
                <span>política de privacidad</span> y{' '}
                <span>términos y condiciones</span>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="jt-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="jt-spinner" />
                    Enviando...
                  </>
                ) : (
                  'Enviar postulación 🌟'
                )}
              </button>

              {/* Trust */}
              <div className="jt-submit-trust">
                <span className="jt-submit-trust-item">🔒 Datos protegidos</span>
                <span className="jt-submit-trust-item">✓ 100% confidencial</span>
              </div>
            </form>
          ) : (
            <div className="jt-success">
              <div className="jt-success-circle jt-s-heart">
                <span className="jt-success-emoji">🌟</span>
              </div>
              <h3 className="jt-success-title jt-s-1">¡Postulación recibida!</h3>
              <p className="jt-success-text jt-s-2">
                Recibimos tu postulación y la revisaremos con mucho cariño.
                <br /><br />
                Si tu perfil encaja con lo que buscamos, nos pondremos en contacto pronto.
                <br /><br />
                ¡Gracias por querer ser parte de algo especial! 💛
              </p>
              <div className="jt-success-divider jt-s-2" />
              <div className="jt-success-actions jt-s-3">
                <button
                  type="button"
                  className="jt-success-btn jt-success-btn--secondary"
                  onClick={handleReset}
                >
                  Enviar otra postulación
                </button>
                <button
                  type="button"
                  className="jt-success-btn jt-success-btn--primary"
                  onClick={onGoBack}
                >
                  ← Volver al inicio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ AVATAR — DESKTOP (absolute bottom) ═══ */}
      <div
        className={`jt-avatar-dk ${a ? 'jt-a-img' : ''}`}
        style={{ animationDelay: '0.5s' }}
      >
        <img src="/avatars.png" alt="Equipo Camil" />
      </div>
    </section>
  );
};

export default JoinTeamScreen;