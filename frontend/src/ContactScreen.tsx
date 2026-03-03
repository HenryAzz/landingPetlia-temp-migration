import { useState, useEffect, useRef } from 'react';

interface ContactScreenProps {
  preSelectedPlan?: string;
  onNavigateToJoinTeam?: () => void;
}

const PLANS = [
  { id: 'correspondencia', label: 'Correspondencia especial — $90.000/mes', bg: 'rgba(14,116,144,0.08)', border: 'rgba(14,116,144,0.3)' },
  { id: 'casual', label: 'Casualmente cotidiano — $180.000/mes', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.3)' },
  { id: 'diaria', label: 'Compañía diaria — $380.000/mes', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
];

const TRUST_ITEMS = [
  { emoji: '🔒', title: 'Tu información', desc: 'Es 100% confidencial y protegida' },
  { emoji: '💛', title: 'Sin compromiso', desc: 'Es solo el primer paso para conocerte' },
  { emoji: '✓', title: 'Pago seguro', desc: 'Sin permanencia · Cancelá cuando quieras' },
];

const ContactScreen = ({ preSelectedPlan, onNavigateToJoinTeam }: ContactScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (preSelectedPlan) setSelectedPlan(preSelectedPlan);
  }, [preSelectedPlan]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPlan('');
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="contacto" className="cnt-section">
      <style>{`
        /* ═══════════════════════════════
           BASE
        ═══════════════════════════════ */
        .cnt-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-bottom: clamp(40px, 4vw, 70px);
        }

        /* ═══ BACKGROUND ═══ */
        .cnt-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cnt-bg img {
          width: 140%;
          height: 140%;
          min-width: 140%;
          min-height: 140%;
          object-fit: cover;
        }

        /* ═══ WAVE ═══ */
        .cnt-wave {
          position: relative;
          width: 100%;
          pointer-events: none;
          z-index: 2;
          line-height: 0;
          flex-shrink: 0;
          margin-bottom: -1px;
        }

        .cnt-wave svg {
          width: 100%;
          height: clamp(45px, 5.5vw, 75px);
          display: block;
        }

        /* ═══ FLOATING DECO ═══ */
        .cnt-deco {
          position: absolute;
          pointer-events: none;
          z-index: 4;
          opacity: 0;
        }

        .cnt-deco img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes cntF1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-4px) rotate(-1.5deg); }
          75% { transform: translateY(-6px) rotate(0.5deg); }
        }
        @keyframes cntF2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-6px) rotate(-2deg); }
          60% { transform: translateY(-10px) rotate(1.5deg); }
          85% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        @keyframes cntF3 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          25% { transform: translateY(-7px) scale(1.03) rotate(1.5deg); }
          50% { transform: translateY(-4px) scale(1) rotate(-1deg); }
          75% { transform: translateY(-6px) scale(1.02) rotate(0.5deg); }
        }
        @keyframes cntF4 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-5px) rotate(-1.5deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
          80% { transform: translateY(-3px) rotate(-0.5deg); }
        }

        .cnt-fl-1 { animation: cntF1 4s ease-in-out infinite; }
        .cnt-fl-2 { animation: cntF2 4.6s ease-in-out infinite 0.5s; }
        .cnt-fl-3 { animation: cntF3 3.8s ease-in-out infinite 1s; }
        .cnt-fl-4 { animation: cntF4 4.3s ease-in-out infinite 0.3s; }

        /* ═══ LAYOUT ═══ */
        .cnt-layout {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          width: 100%;
          align-items: center;
        }

        .cnt-left {
          width: 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .cnt-left-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding-left: 6vw;
          padding-right: 3vw;
          position: relative;
        }

        .cnt-right {
          width: 55%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cnt-right-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(14px, 1.2vw, 20px);
        }

        /* ═══ LEFT — ACCENT ═══ */
        .cnt-accent {
          width: 42px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.15));
          margin-bottom: clamp(14px, 1.4vw, 22px);
          opacity: 0;
        }

        /* ═══ LEFT — LABEL ═══ */
        .cnt-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(10px, 0.82vw, 12px);
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: clamp(14px, 1.4vw, 22px);
          opacity: 0;
        }

        /* ═══ LEFT — TITLE ═══ */
        .cnt-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 4vw, 58px);
          line-height: 1.12;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(14px, 1.2vw, 22px);
          text-shadow: 0 2px 16px rgba(0,0,0,0.2);
          opacity: 0;
        }

        .cnt-title-light {
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.85);
        }

        /* ═══ LEFT — DESC ═══ */
        .cnt-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.1vw, 17px);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0 0 clamp(20px, 2vw, 32px);
          max-width: clamp(260px, 26vw, 400px);
          opacity: 0;
        }

        /* ═══ LEFT — TRUST CARDS ═══ */
        .cnt-trust-grid {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 0.9vw, 14px);
          width: 100%;
          max-width: clamp(280px, 28vw, 420px);
        }

        .cnt-trust-card {
          display: flex;
          align-items: flex-start;
          gap: clamp(12px, 1vw, 16px);
          padding: clamp(14px, 1.2vw, 20px);
          border-radius: clamp(14px, 1.2vw, 18px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          opacity: 0;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .cnt-trust-card:hover {
          background: rgba(249,221,163,0.08);
          border-color: rgba(249,221,163,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .cnt-trust-card-icon {
          width: clamp(36px, 2.8vw, 44px);
          height: clamp(36px, 2.8vw, 44px);
          border-radius: clamp(10px, 0.9vw, 13px);
          background: linear-gradient(135deg, rgba(249,221,163,0.15), rgba(246,158,130,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(15px, 1.2vw, 19px);
          flex-shrink: 0;
        }

        .cnt-trust-card-text {
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.25vw, 4px);
          min-width: 0;
        }

        .cnt-trust-card-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1vw, 15px);
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.01em;
        }

        .cnt-trust-card-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11.5px, 0.85vw, 13px);
          color: rgba(255,255,255,0.45);
          line-height: 1.45;
          letter-spacing: 0.01em;
        }

        /* ═══ FORM CARD ═══ */
        .cnt-form-card {
          display: flex;
          flex-direction: column;
          border-radius: clamp(18px, 1.6vw, 26px);
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1);
          width: 100%;
          max-width: clamp(340px, 34vw, 520px);
          padding: clamp(22px, 2.5vw, 40px);
          gap: clamp(14px, 1.3vw, 22px);
          opacity: 0;
        }

        .cnt-form-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(17px, 1.4vw, 24px);
          color: #F9DDA3;
          margin: 0 0 clamp(2px, 0.3vw, 6px);
        }

        /* ═══ FORM FIELDS ═══ */
        .cnt-field {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.4vw, 7px);
        }

        .cnt-field-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12px, 0.88vw, 14px);
          color: rgba(255,255,255,0.6);
        }

        .cnt-input {
          width: 100%;
          padding: clamp(11px, 0.85vw, 16px) clamp(14px, 1.3vw, 20px);
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

        .cnt-input::placeholder { color: rgba(255,255,255,0.4); }

        .cnt-input:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        .cnt-textarea {
          width: 100%;
          padding: clamp(11px, 0.85vw, 16px) clamp(14px, 1.3vw, 20px);
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
          min-height: clamp(75px, 6vw, 100px);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .cnt-textarea::placeholder { color: rgba(255,255,255,0.4); }

        .cnt-textarea:focus {
          border-color: #F9DDA3;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(249,221,163,0.15);
        }

        /* ═══ METHOD BUTTONS ═══ */
        .cnt-methods {
          display: flex;
          gap: clamp(6px, 0.5vw, 10px);
          margin-bottom: clamp(4px, 0.4vw, 7px);
        }

        .cnt-method {
          padding: clamp(6px, 0.4vw, 9px) clamp(14px, 1.1vw, 20px);
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 0.88vw, 14px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .cnt-method:hover {
          background: rgba(255,255,255,0.15);
        }

        /* ═══ PLAN OPTIONS ═══ */
        .cnt-plans {
          display: flex;
          flex-direction: column;
          gap: clamp(5px, 0.45vw, 8px);
        }

        .cnt-plan {
          display: flex;
          align-items: center;
          gap: clamp(7px, 0.6vw, 12px);
          padding: clamp(9px, 0.6vw, 13px) clamp(12px, 1.1vw, 18px);
          border-radius: clamp(9px, 0.8vw, 12px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          text-align: left;
        }

        .cnt-plan:hover {
          transform: translateY(-1px);
        }

        .cnt-plan-radio {
          width: clamp(16px, 1.2vw, 20px);
          height: clamp(16px, 1.2vw, 20px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s ease;
        }

        .cnt-plan-dot {
          width: clamp(7px, 0.5vw, 9px);
          height: clamp(7px, 0.5vw, 9px);
          border-radius: 50%;
          background: #FFFFFF;
        }

        .cnt-plan-label {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(12px, 0.92vw, 15px);
          transition: all 0.3s ease;
        }

        /* ═══ OPTIONAL TAG ═══ */
        .cnt-optional {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.7vw, 12px);
          color: rgba(255,255,255,0.35);
          font-style: italic;
        }

        /* ═══ LEGAL ═══ */
        .cnt-legal {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.78vw, 12px);
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          margin: 0;
        }

        .cnt-legal span {
          color: rgba(249,221,163,0.6);
          cursor: pointer;
          text-decoration: underline;
        }

        /* ═══ SUBMIT ═══ */
        .cnt-submit {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: clamp(12px, 0.85vw, 16px) 0;
          border-radius: 50px;
          background: linear-gradient(135deg, #F9DDA3, #f0c96e);
          border: 1px solid rgba(255,255,255,0.3);
          color: #5A4520;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1.05vw, 16px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 0.5vw, 10px);
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(249,221,163,0.2);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          -webkit-tap-highlight-color: transparent;
        }

        .cnt-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .cnt-submit:hover::before { left: 100%; }

        .cnt-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(249,221,163,0.3);
        }

        .cnt-submit:active { transform: scale(0.97); }

        .cnt-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ═══ SUBMIT TRUST LINE ═══ */
        .cnt-submit-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 0.8vw, 16px);
          flex-wrap: wrap;
        }

        .cnt-submit-trust-item {
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
        @keyframes cntSpin { to { transform: rotate(360deg); } }

        .cnt-spinner {
          width: clamp(16px, 1.2vw, 20px);
          height: clamp(16px, 1.2vw, 20px);
          border: 2px solid rgba(90,69,32,0.2);
          border-top-color: #5A4520;
          border-radius: 50%;
          animation: cntSpin 1s linear infinite;
        }

        /* ═══ JOIN TEAM ═══ */
        .cnt-join {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.6vw, 10px);
          padding: clamp(9px, 0.7vw, 13px) clamp(16px, 1.6vw, 26px);
          border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 0.88vw, 14px);
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          opacity: 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cnt-join:hover {
          background: rgba(249,221,163,0.12);
          border-color: rgba(249,221,163,0.4);
          transform: translateY(-1px);
        }

        .cnt-join-cta {
          color: #F9DDA3;
          font-weight: 500;
        }

        /* ═══ SUCCESS CARD ═══ */
        .cnt-success {
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
          max-width: clamp(340px, 34vw, 520px);
          padding: clamp(32px, 3.5vw, 56px) clamp(22px, 2.5vw, 40px);
          gap: clamp(14px, 1.4vw, 22px);
        }

        .cnt-success-circle {
          width: clamp(56px, 5vw, 80px);
          height: clamp(56px, 5vw, 80px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2));
          border: 2px solid rgba(249,221,163,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(249,221,163,0.15);
        }

        .cnt-success-emoji {
          font-size: clamp(26px, 2.6vw, 40px);
        }

        .cnt-success-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(17px, 1.6vw, 24px);
          color: #F9DDA3;
          margin: 0;
        }

        .cnt-success-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(12.5px, 1.1vw, 16px);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0;
          max-width: clamp(260px, 26vw, 380px);
        }

        .cnt-success-divider {
          width: clamp(40px, 5vw, 70px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,221,163,0.4), transparent);
        }

        .cnt-success-reset {
          padding: clamp(8px, 0.6vw, 12px) clamp(20px, 1.5vw, 28px);
          border-radius: 50px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 0.88vw, 14px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cnt-success-reset:hover {
          background: rgba(255,255,255,0.15);
          color: #F9DDA3;
          border-color: rgba(249,221,163,0.4);
        }

        @keyframes cntHeartPop {
          0% { opacity: 0; transform: scale(0) rotate(-15deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(5deg); }
          70% { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes cntSuccessFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .cnt-s-heart { animation: cntHeartPop 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cnt-s-1 { opacity: 0; animation: cntSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
        .cnt-s-2 { opacity: 0; animation: cntSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards; }
        .cnt-s-3 { opacity: 0; animation: cntSuccessFade 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }

        /* ═══ ENTRANCE ═══ */
        @keyframes cntUp {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cntSlide {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes cntScale {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cntPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes cntCardIn {
          0% { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cnt-a-up { animation: cntUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-slide { animation: cntSlide 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-scale { animation: cntScale 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-pop { animation: cntPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .cnt-a-card { animation: cntCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }

        /* ═══ RESPONSIVE: TABLET ≤ 1024px ═══ */
        @media (max-width: 1024px) {
          .cnt-section { min-height: auto; padding-bottom: 60px; }

          .cnt-layout {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .cnt-left { width: 100%; }
          .cnt-left-inner {
            align-items: center;
            text-align: center;
            padding: 30px 40px 0;
          }

          .cnt-right { width: 100%; }
          .cnt-right-inner { padding: 0 40px; }

          .cnt-desc { max-width: 460px; }
          .cnt-form-card { max-width: 560px; }
          .cnt-success { max-width: 560px; }

          .cnt-trust-grid {
            max-width: 480px;
          }

          .cnt-trust-card {
            text-align: left;
          }

          .cnt-deco { display: none !important; }

          .cnt-a-slide { animation-name: cntUp; }
        }

        /* ═══ RESPONSIVE: MOBILE ≤ 768px ═══ */
        @media (max-width: 768px) {
          .cnt-section { padding-bottom: 50px; }
          .cnt-layout { gap: 32px; }

          .cnt-left-inner { padding: 24px 24px 0; }
          .cnt-right-inner { padding: 0 24px; }

          .cnt-title { font-size: clamp(26px, 6vw, 34px); }
          .cnt-desc { font-size: 14px; max-width: 380px; }

          .cnt-form-card { max-width: 100%; padding: 26px; border-radius: 20px; }
          .cnt-success { max-width: 100%; padding: 40px 24px; border-radius: 20px; }

          .cnt-submit { border-radius: 14px; }

          .cnt-trust-card {
            padding: 14px;
            gap: 12px;
          }

          .cnt-trust-card-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            font-size: 16px;
          }

          .cnt-trust-card-title { font-size: 13px; }
          .cnt-trust-card-desc { font-size: 11.5px; }
        }

        /* ═══ RESPONSIVE: SMALL ≤ 540px ═══ */
        @media (max-width: 540px) {
          .cnt-section { padding-bottom: 44px; }
          .cnt-layout { gap: 26px; }

          .cnt-left-inner { padding: 20px 20px 0; }
          .cnt-right-inner { padding: 0 20px; }

          .cnt-title { font-size: clamp(24px, 5.5vw, 28px); }
        .cnt-label { font-size: 10px; }
          .cnt-desc { font-size: 13px; max-width: 340px; }

          .cnt-form-card { padding: 22px 18px; border-radius: 18px; }

          .cnt-trust-grid { max-width: 340px; }
        }

        /* ═══ RESPONSIVE: XS ≤ 400px ═══ */
        @media (max-width: 400px) {
          .cnt-section { padding-bottom: 40px; }
          .cnt-layout { gap: 22px; }

          .cnt-left-inner { padding: 18px 18px 0; }
          .cnt-right-inner { padding: 0 18px; }

          .cnt-accent { width: 30px; margin-bottom: 12px; }
          .cnt-label { margin-bottom: 12px; font-size: 9.5px; }
          .cnt-title { font-size: 22px; margin-bottom: 10px; }
          .cnt-desc { font-size: 12.5px; max-width: 300px; margin-bottom: 16px; }

          .cnt-trust-card {
            padding: 12px;
            gap: 10px;
            border-radius: 12px;
          }

          .cnt-trust-card-icon {
            width: 32px;
            height: 32px;
            font-size: 14px;
            border-radius: 8px;
          }

          .cnt-trust-card-title { font-size: 12.5px; }
        .cnt-trust-card-desc { font-size: 11px; }

          .cnt-form-card { padding: 20px 16px; gap: 14px; border-radius: 16px; }
          .cnt-form-title { font-size: 16px; }

          .cnt-submit { padding: 12px 0; font-size: 13px; }
          .cnt-submit-trust-item { font-size: 9.5px; }

        .cnt-join { padding: 9px 14px; font-size: 11px; }

          .cnt-success { padding: 32px 18px; border-radius: 16px; }
        }

        /* ═══ RESPONSIVE: XXS ≤ 340px ═══ */
        @media (max-width: 340px) {
          .cnt-section { padding-bottom: 36px; }
          .cnt-layout { gap: 20px; }
          .cnt-left-inner { padding: 16px 14px 0; }
          .cnt-right-inner { padding: 0 14px; }

          .cnt-title { font-size: 20px; }
          .cnt-desc { font-size: 12px; }

          .cnt-trust-card { padding: 10px; }
          .cnt-trust-card-icon { width: 28px; height: 28px; font-size: 13px; }
          .cnt-trust-card-title { font-size: 12px; }
          .cnt-trust-card-desc { font-size: 10.5px; }

          .cnt-form-card { padding: 18px 14px; gap: 12px; border-radius: 14px; }
          .cnt-form-title { font-size: 15px; }

          .cnt-submit { padding: 11px 0; font-size: 12.5px; }
          .cnt-join { padding: 8px 12px; font-size: 10.5px; }

          .cnt-success { padding: 28px 14px; border-radius: 14px; }
        }
      `}</style>

      {/* ═══ BACKGROUND ═══ */}
      <div className="cnt-bg">
        <img src="/fondoazul.png" alt="" />
      </div>

      {/* ═══ WAVE ═══ */}
      <div className="cnt-wave">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z"
            fill="#F9DDA3"
          />
        </svg>
      </div>

      {/* ═══ FLOATING DECO (desktop) ═══ */}
      <div
        className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`}
        style={{ left: '3vw', top: '22%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', animationDelay: '0.6s' }}
      >
        <img src="/corazonderecha.png" alt="" className={mounted ? 'cnt-fl-1' : ''} style={{ opacity: 0.7 }} />
      </div>
      <div
        className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`}
        style={{ left: '6vw', top: '45%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', animationDelay: '0.75s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'cnt-fl-2' : ''} style={{ opacity: 0.6 }} />
      </div>
      <div
        className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`}
        style={{ left: '2.5vw', top: '65%', width: 'clamp(24px, 2.8vw, 44px)', height: 'clamp(24px, 2.8vw, 44px)', animationDelay: '0.9s' }}
      >
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'cnt-fl-3' : ''} style={{ opacity: 0.65 }} />
      </div>
      <div
        className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`}
        style={{ left: '5.5vw', top: '82%', width: 'clamp(20px, 2.2vw, 36px)', height: 'clamp(20px, 2.2vw, 36px)', animationDelay: '1.05s' }}
      >
        <img src="/carta.png" alt="" className={mounted ? 'cnt-fl-4' : ''} style={{ opacity: 0.55 }} />
      </div>

      {/* ═══ LAYOUT ═══ */}
      <div className="cnt-layout">

        {/* ── LEFT ── */}
        <div className="cnt-left">
          <div className="cnt-left-inner">

            <div
              className={`cnt-accent ${a ? 'cnt-a-slide' : ''}`}
              style={{ animationDelay: '0.1s' }}
            />

            <span
              className={`cnt-label ${a ? 'cnt-a-slide' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              COMENZÁ AHORA
            </span>

            <h2
              className={`cnt-title ${a ? 'cnt-a-slide' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <span className="cnt-title-light">Tu primer paso</span>
              <br />hacia algo especial
            </h2>

            <p
              className={`cnt-desc ${a ? 'cnt-a-slide' : ''}`}
              style={{ animationDelay: '0.42s' }}
            >
              Completá el formulario y el equipo de Camil se pondrá en contacto
              a la brevedad para conocerte y comenzar.
            </p>

            <div className="cnt-trust-grid">
              {TRUST_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`cnt-trust-card ${a ? 'cnt-a-card' : ''}`}
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  <div className="cnt-trust-card-icon">{item.emoji}</div>
                  <div className="cnt-trust-card-text">
                    <span className="cnt-trust-card-title">{item.title}</span>
                    <span className="cnt-trust-card-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="cnt-right">
          <div className="cnt-right-inner">

            {!submitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`cnt-form-card ${a ? 'cnt-a-scale' : ''}`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <h3 className="cnt-form-title">Solicitar vínculo</h3>

                  {/* Name */}
                  <div className="cnt-field">
                    <label className="cnt-field-label">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      className="cnt-input"
                      placeholder="¿Cómo te llamás?"
                      required
                    />
                  </div>

                  {/* Contact method */}
                  <div className="cnt-field">
                    <label className="cnt-field-label">¿Cómo preferís que te contactemos? *</label>
                    <div className="cnt-methods">
                      {(['telefono', 'correo'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          className="cnt-method"
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
                      className="cnt-input"
                      placeholder={contactMethod === 'telefono' ? 'Ej: +54 11 1234-5678' : 'Tu correo electrónico'}
                      required
                    />
                  </div>

                  {/* Plan */}
                  <div className="cnt-field">
                    <label className="cnt-field-label">Plan de interés *</label>
                    <div className="cnt-plans">
                      {PLANS.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          className="cnt-plan"
                          onClick={() => setSelectedPlan(plan.id)}
                          style={{
                            border: `1.5px solid ${selectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.15)'}`,
                            backgroundColor: selectedPlan === plan.id ? plan.bg : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          <div
                            className="cnt-plan-radio"
                            style={{ border: `2px solid ${selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}` }}
                          >
                            {selectedPlan === plan.id && <div className="cnt-plan-dot" />}
                          </div>
                          <span
                            className="cnt-plan-label"
                            style={{
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

                  {/* Message — OPTIONAL */}
                  <div className="cnt-field">
                    <label className="cnt-field-label">
                      Contanos un poco sobre vos{' '}
                      <span className="cnt-optional">(opcional)</span>
                    </label>
                    <textarea
                      name="mensaje"
                      className="cnt-textarea"
                      placeholder="¿Qué te motivó a escribirnos? Contanos lo que quieras"
                    />
                  </div>

                  {/* Legal */}
                  <p className="cnt-legal">
                    Al enviar aceptás nuestra{' '}
                    <span>política de privacidad</span> y{' '}
                    <span>términos y condiciones</span>.
                  </p>

                  {/* Submit */}
                  <button type="submit" className="cnt-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="cnt-spinner" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar solicitud'
                    )}
                  </button>

                  {/* Trust seals */}
                  <div className="cnt-submit-trust">
                    <span className="cnt-submit-trust-item">🔒 Datos protegidos</span>
                    <span className="cnt-submit-trust-item">✓ Sin permanencia</span>
                    <span className="cnt-submit-trust-item">💳 Pago seguro</span>
                  </div>
                </form>

                {/* Join team */}
                <button
                  className={`cnt-join ${a ? 'cnt-a-up' : ''}`}
                  style={{ animationDelay: '0.7s' }}
                  onClick={onNavigateToJoinTeam}
                >
                  <span>🌟</span>
                  ¿Querés ser parte del equipo de Camil?
                  <span className="cnt-join-cta">Conocé más →</span>
                </button>
              </>
            ) : (
              <div className="cnt-success">
                <div className="cnt-success-circle cnt-s-heart">
                  <span className="cnt-success-emoji">💛</span>
                </div>
                <h3 className="cnt-success-title cnt-s-1">¡Solicitud enviada!</h3>
                <p className="cnt-success-text cnt-s-2">
                  El equipo de Camil recibió tu mensaje y se pondrá en contacto
                  a la brevedad.
                  <br /><br />
                  Gracias por dar el primer paso 💌
                </p>
                <div className="cnt-success-divider cnt-s-2" />
                <button className="cnt-success-reset cnt-s-3" onClick={handleReset}>
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