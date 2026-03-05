import { useEffect, useState, useRef } from 'react';

const BENEFITS = [
  { emoji: '💛', title: 'Contención emocional', desc: 'Alguien que te escucha de verdad, sin juzgar' },
  { emoji: '😄', title: 'Humor y compañía', desc: 'Risas, juegos y conversaciones que alegran el día' },
  { emoji: '🎁', title: 'Detalles que importan', desc: 'Recuerda tus gustos, fechas y momentos especiales' },
  { emoji: '🕊️', title: 'Sin presiones', desc: 'A tu ritmo, sin compromisos ni explicaciones' },
];

const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

const RISING_HEARTS = [
  { size: 16, right: '16%', bottom: '34%', delay: 0, dur: 5.5, drift: 18, color: '#F69E82' },
  { size: 11, right: '22%', bottom: '38%', delay: 0.7, dur: 4.8, drift: -14, color: '#F4B896' },
  { size: 19, right: '10%', bottom: '32%', delay: 1.3, dur: 6.2, drift: 22, color: '#E8856A' },
  { size: 13, right: '26%', bottom: '36%', delay: 2.0, dur: 5.0, drift: -16, color: '#F9DDA3' },
  { size: 15, right: '14%', bottom: '40%', delay: 2.8, dur: 5.8, drift: 14, color: '#F69E82' },
  { size: 10, right: '20%', bottom: '33%', delay: 3.5, dur: 4.5, drift: -10, color: '#F4B896' },
  { size: 17, right: '8%', bottom: '37%', delay: 4.2, dur: 6.0, drift: 20, color: '#E8856A' },
  { size: 12, right: '24%', bottom: '35%', delay: 4.9, dur: 5.2, drift: -18, color: '#F9DDA3' },
  { size: 14, right: '18%', bottom: '31%', delay: 5.6, dur: 5.4, drift: 12, color: '#F69E82' },
  { size: 9, right: '12%', bottom: '39%', delay: 6.3, dur: 4.6, drift: -8, color: '#E8856A' },
];

const EverythingGoodScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} className="eg-section">
      <style>{`
        .eg-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #F9F9F9 0%, #FEFEFE 50%, #F9F9F9 100%);
        }

        @media (min-width: 1025px) {
          .eg-section {
            height: 100vh;
            max-height: 100vh;
          }
        }

        .eg-row {
          display: flex;
          width: 100%;
          height: 100%;
        }

        /* ═══════════════════════════════
           LEFT COLUMN
        ═══════════════════════════════ */
        .eg-col-left {
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .eg-left-text {
          padding-top: clamp(40px, 6vh, 80px);
          padding-bottom: clamp(16px, 2vh, 28px);
          padding-right: clamp(24px, 3vw, 48px);
                    margin-left: clamp(24px, 3vw, 50px);

          flex-shrink: 0;
          position: relative;
          z-index: 3;
          /*
            Match reference: max-width 1300px centered + padding clamp(24px,5vw,80px)
            Text left edge from viewport = max((100vw - 1300px)/2, 0px) + clamp(24px,5vw,80px)
            Since this column starts at viewport left edge (full-width row),
            padding-left = that same value.
          */
          padding-left: max(
            clamp(24px, 5vw, 80px),
            calc((100vw - 1300px) / 2 + clamp(24px, 5vw, 80px))
          );
        }

        .eg-left-img-wrap {
          flex: 1;
          position: relative;
          overflow: hidden;
          min-height: 0;
        }

        .eg-img-glow {
          position: absolute;
          bottom: 8%;
          left: 15%;
          width: 70%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(246,158,130,0.05) 0%,
            rgba(249,221,163,0.025) 40%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 0;
        }

        .eg-img-desktop {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: left bottom;
          z-index: 1;
          opacity: 0;
        }

        /* ═══ RISING HEARTS ═══ */
        .eg-hearts-container {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .eg-rising-heart {
          position: absolute;
          opacity: 0;
          will-change: transform, opacity;
        }

        .eg-rising-heart svg {
          display: block;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        @keyframes egHeartRise1 {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.3) rotate(0deg); }
          6%   { opacity: 0.85; transform: translateY(-20px) translateX(var(--drift-half)) scale(0.7) rotate(5deg); }
          25%  { opacity: 0.75; transform: translateY(-120px) translateX(calc(var(--drift) * -0.3)) scale(0.9) rotate(-8deg); }
          50%  { opacity: 0.5; transform: translateY(-280px) translateX(var(--drift-half)) scale(1) rotate(5deg); }
          75%  { opacity: 0.25; transform: translateY(-440px) translateX(calc(var(--drift) * -0.5)) scale(0.95) rotate(-4deg); }
          100% { opacity: 0; transform: translateY(-580px) translateX(var(--drift)) scale(0.8) rotate(3deg); }
        }

        @keyframes egHeartRise2 {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.35) rotate(0deg); }
          8%   { opacity: 0.8; transform: translateY(-25px) translateX(calc(var(--drift) * 0.3)) scale(0.65) rotate(-4deg); }
          30%  { opacity: 0.65; transform: translateY(-150px) translateX(var(--drift-half)) scale(0.85) rotate(6deg); }
          55%  { opacity: 0.45; transform: translateY(-310px) translateX(calc(var(--drift) * -0.4)) scale(0.95) rotate(-6deg); }
          80%  { opacity: 0.2; transform: translateY(-460px) translateX(var(--drift-half)) scale(1) rotate(4deg); }
          100% { opacity: 0; transform: translateY(-560px) translateX(var(--drift)) scale(0.75) rotate(-3deg); }
        }

        @keyframes egHeartRise3 {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.4) rotate(5deg); }
          7%   { opacity: 0.8; transform: translateY(-18px) translateX(calc(var(--drift) * -0.4)) scale(0.6) rotate(-3deg); }
          28%  { opacity: 0.7; transform: translateY(-130px) translateX(var(--drift-half)) scale(0.88) rotate(8deg); }
          52%  { opacity: 0.5; transform: translateY(-300px) translateX(calc(var(--drift) * 0.6)) scale(0.95) rotate(-5deg); }
          78%  { opacity: 0.2; transform: translateY(-470px) translateX(calc(var(--drift) * -0.3)) scale(1) rotate(3deg); }
          100% { opacity: 0; transform: translateY(-600px) translateX(var(--drift)) scale(0.7) rotate(-4deg); }
        }

        .eg-hr-anim1 { animation-name: egHeartRise1; }
        .eg-hr-anim2 { animation-name: egHeartRise2; }
        .eg-hr-anim3 { animation-name: egHeartRise3; }

        .eg-hr-active {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: infinite;
        }

        /* ═══════════════════════════════
           RIGHT COLUMN
        ═══════════════════════════════ */
        .eg-col-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(40px, 6vh, 80px) clamp(24px, 3vw, 48px) clamp(40px, 6vh, 80px) clamp(32px, 3.5vw, 56px);
          position: relative;
          overflow-y: auto;
        }

        .eg-inner {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
        }

        /* ═══ MOBILE HEADER ═══ */
        .eg-mobile-header {
          display: none;
        }

        /* ═══ FLOATING DECO ═══ */
        .eg-deco {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
        }
        .eg-deco img { width: 100%; height: 100%; object-fit: contain; }

        .eg-dk-1 {
          right: clamp(16px, 3vw, 40px); top: 14%;
          width: clamp(32px, 3.5vw, 56px); height: clamp(32px, 3.5vw, 56px);
        }
        .eg-dk-2 {
          right: clamp(10px, 2.5vw, 32px); top: 50%; transform: translateY(-50%);
          width: clamp(26px, 3vw, 48px); height: clamp(26px, 3vw, 48px);
        }
        .eg-dk-3 {
          right: clamp(14px, 2.8vw, 36px); bottom: 14%;
          width: clamp(30px, 3.2vw, 52px); height: clamp(30px, 3.2vw, 52px);
        }

        @keyframes egSwing1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1.5deg); }
        }
        @keyframes egSwing2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-3px) rotate(-2.5deg); }
          70% { transform: translateY(-5px) rotate(1.5deg); }
        }
        @keyframes egSwing3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          35% { transform: translateY(-4px) rotate(1.8deg); }
          65% { transform: translateY(-3px) rotate(-2deg); }
        }
        .eg-fl-1 { animation: egSwing1 5s ease-in-out infinite; }
        .eg-fl-2 { animation: egSwing2 5.5s ease-in-out infinite 0.8s; }
        .eg-fl-3 { animation: egSwing3 4.8s ease-in-out infinite 1.5s; }

        /* ═══════════════════════════════
           TYPOGRAPHY — matches reference
        ═══════════════════════════════ */
        .eg-accent {
          width: 38px;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #F69E82, rgba(246,158,130,0.15));
          margin-bottom: 14px;
          opacity: 0;
        }

        .eg-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #E8856A;
          text-transform: uppercase;
          margin-bottom: 14px;
          opacity: 0;
        }

        .eg-title {

          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.25;
          color: #1C1C1E;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          opacity: 0;
       

         
        }
        .eg-title-light { 
          font-weight: 400;
          color: #4A4A4A;
        } 

        .eg-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.15vw, 17px);
          color: #666;
          line-height: 1.75;
          margin: 0 0 clamp(14px, 1.4vw, 20px);
          max-width: 440px;
          letter-spacing: 0.015em;
          opacity: 0;
        }

        /* ═══════════════════════════════
           BENEFITS — single column stack
        ═══════════════════════════════ */
        .eg-benefits {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .eg-benefit {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(0,0,0,0.018);
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          opacity: 0;
        }

        .eg-benefit:hover {
          background: rgba(246,158,130,0.05);
          border-color: rgba(246,158,130,0.14);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(246,158,130,0.08);
        }

        .eg-benefit-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(246,158,130,0.1), rgba(249,221,163,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .eg-benefit-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .eg-benefit-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #2D2D2D;
          letter-spacing: 0.01em;
          line-height: 1.25;
        }

        .eg-benefit-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          color: #999;
          line-height: 1.4;
          letter-spacing: 0.01em;
        }

        /* ═══ TRUST ═══ */
        .eg-trust {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(246,158,130,0.06) 0%, rgba(249,221,163,0.04) 100%);
          border: 1.5px solid rgba(246,158,130,0.15);
          margin-bottom: 28px;
          opacity: 0;
        }

        .eg-trust-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #F69E82, #e8856a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .eg-trust-badge svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .eg-trust-content { display: flex; flex-direction: column; gap: 3px; }

        .eg-trust-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #3A3A3A;
          margin: 0;
          line-height: 1.3;
        }

        .eg-trust-desc {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          color: #717171;
          line-height: 1.5;
          margin: 0;
          letter-spacing: 0.015em;
        }

        /* ═══ ACTION ═══ */
        .eg-action {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .eg-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 34px;
          border-radius: 50px;
          background: linear-gradient(135deg, #F69E82 0%, #e8856a 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(246,158,130,0.25), 0 1px 3px rgba(0,0,0,0.06);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .eg-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .eg-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(246,158,130,0.35), 0 2px 8px rgba(0,0,0,0.06);
        }
        .eg-btn:hover::before { opacity: 1; }
        .eg-btn:active { transform: translateY(0); box-shadow: 0 2px 12px rgba(246,158,130,0.2); }
        .eg-btn-arrow { width: 16px; height: 16px; transition: transform 0.3s ease; }
        .eg-btn:hover .eg-btn-arrow { transform: translateX(3px); }

        .eg-microtrust {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #BBBBBB;
          letter-spacing: 0.03em;
          line-height: 1.5;
          opacity: 0;
        }

        /* ═══ MOBILE IMAGE ═══ */
        .eg-img-mobile {
          display: none;
          width: 100%;
          overflow: hidden;
        }
        .eg-img-mobile img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: left bottom;
          display: block;
          opacity: 0;
        }

        /* ═══ ANIMATIONS ═══ */
        @keyframes egUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes egSlideR {
          0%   { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes egScale {
          0%   { opacity: 0; transform: scale(0.9) translateY(14px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes egPop {
          0%   { opacity: 0; transform: scale(0) rotate(-10deg); }
          60%  { opacity: 1; transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes egCardIn {
          0%   { opacity: 0; transform: translateY(14px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .eg-a-up    { animation: egUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .eg-a-slide { animation: egSlideR 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .eg-a-scale { animation: egScale 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .eg-a-pop   { animation: egPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .eg-a-card  { animation: egCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        /* ═══════════════════════════════
           RESPONSIVE
        ═══════════════════════════════ */

        /* TABLET ≤ 1024px */
        @media (max-width: 1024px) {
          .eg-row { flex-direction: column; }
          .eg-col-left { display: none; }
          .eg-img-mobile { display: block; order: 2; padding-right: 2vw; }
          .eg-col-right {
            order: 1;
            padding: clamp(48px, 7vw, 80px) clamp(24px, 5vw, 80px) 40px;
            justify-content: center;
          }
          .eg-inner { max-width: 560px; align-items: center; text-align: center; }
          .eg-mobile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 28px;
          }
          .eg-mobile-header .eg-sub { margin-bottom: 0; }
          .eg-benefits {
            max-width: 480px;
            width: 100%;
          }
          .eg-benefit { text-align: left; }
          .eg-trust { max-width: 480px; text-align: left; }
          .eg-action { align-items: center; }
          .eg-dk-1, .eg-dk-2, .eg-dk-3 { display: none; }
        }

        /* MOBILE ≤ 768px */
        @media (max-width: 768px) {
          .eg-col-right { padding: clamp(36px, 5vw, 56px) 24px 32px; }
          .eg-title { font-size: clamp(24px, 5.5vw, 30px); margin-bottom: 14px; }
          .eg-sub { font-size: 15px; }
          .eg-benefits { gap: 8px; margin-bottom: 24px; }
          .eg-benefit { padding: 14px 16px; gap: 12px; }
          .eg-benefit-icon { width: 36px; height: 36px; font-size: 16px; border-radius: 10px; }
          .eg-benefit-name { font-size: 13.5px; }
          .eg-benefit-desc { font-size: 12px; }
          .eg-trust { padding: 16px 18px; gap: 12px; margin-bottom: 24px; }
          .eg-trust-badge { width: 38px; height: 38px; border-radius: 10px; }
          .eg-trust-badge svg { width: 18px; height: 18px; }
          .eg-trust-title { font-size: 13.5px; }
          .eg-trust-desc { font-size: 12px; }
          .eg-btn { padding: 13px 28px; font-size: 14px; }
        }

        /* SMALL ≤ 540px */
        @media (max-width: 540px) {
          .eg-col-right { padding: 36px 20px 28px; }
          .eg-title { font-size: clamp(22px, 5vw, 26px); }
          .eg-label { font-size: 10px; }
          .eg-benefit { padding: 12px 14px; gap: 11px; border-radius: 12px; }
          .eg-benefit-icon { width: 34px; height: 34px; font-size: 15px; }
          .eg-trust { padding: 14px 16px; border-radius: 14px; }
        }

        /* XS ≤ 400px */
        @media (max-width: 400px) {
          .eg-col-right { padding: 28px 18px 24px; }
          .eg-accent { width: 30px; margin-bottom: 10px; }
          .eg-label { margin-bottom: 10px; font-size: 9.5px; }
          .eg-title { font-size: 21px; margin-bottom: 12px; }
          .eg-sub { font-size: 13.5px; }
          .eg-mobile-header { margin-bottom: 20px; }
          .eg-benefits { gap: 7px; margin-bottom: 20px; }
          .eg-benefit { padding: 11px 13px; gap: 10px; }
          .eg-benefit-icon { width: 32px; height: 32px; font-size: 14px; border-radius: 8px; }
          .eg-benefit-name { font-size: 12.5px; }
          .eg-benefit-desc { font-size: 11px; }
          .eg-trust { padding: 13px 15px; gap: 11px; margin-bottom: 22px; border-radius: 12px; }
          .eg-trust-badge { width: 36px; height: 36px; border-radius: 9px; }
          .eg-trust-badge svg { width: 17px; height: 17px; }
          .eg-trust-title { font-size: 13px; }
          .eg-trust-desc { font-size: 11.5px; }
          .eg-btn { padding: 12px 24px; font-size: 13px; gap: 8px; }
          .eg-btn-arrow { width: 14px; height: 14px; }
          .eg-microtrust { font-size: 11px; }
        }

        /* XXS ≤ 340px */
        @media (max-width: 340px) {
          .eg-col-right { padding: 24px 14px 20px; }
          .eg-title { font-size: 19px; }
          .eg-sub { font-size: 13px; }
          .eg-benefit { padding: 10px 12px; }
          .eg-benefit-icon { width: 28px; height: 28px; font-size: 13px; }
          .eg-benefit-name { font-size: 12px; }
          .eg-benefit-desc { font-size: 10.5px; }
          .eg-trust { padding: 12px 14px; }
          .eg-trust-title { font-size: 12.5px; }
          .eg-trust-desc { font-size: 11px; }
          .eg-btn { padding: 11px 20px; font-size: 12.5px; }
        }
      `}</style>

      <div className="eg-row">

        {/* ═══ LEFT COLUMN — Title + Image (Desktop) ═══ */}
        <div className="eg-col-left">
          <div className="eg-left-text">
            <div className={`eg-accent ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.15s' }} />
            <span className={`eg-label ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.25s' }}>
              LA EXPERIENCIA
            </span>
            <h2 className={`eg-title ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.35s' }}>
              Todo lo bueno, <span className="eg-title-light">sin lo que incomoda</span>
            </h2>
            <p className={`eg-sub ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.5s' }}>
              Un espacio donde podés ser vos, sin presiones ni explicaciones.
              Compañía genuina que se adapta a lo que necesitás.
            </p>
          </div>

          <div className="eg-left-img-wrap">
            <div className="eg-img-glow" />
            <img
              src="/beso.png"
              alt="Camil"
              className={`eg-img-desktop ${a ? 'eg-a-slide' : ''}`}
              style={{ animationDelay: '0.15s' }}
            />

            {a && (
              <div className="eg-hearts-container">
                {RISING_HEARTS.map((h, i) => {
                  const animClass = `eg-hr-anim${(i % 3) + 1}`;
                  return (
                    <div
                      key={i}
                      className={`eg-rising-heart ${animClass} eg-hr-active`}
                      style={{
                        right: h.right,
                        bottom: h.bottom,
                        animationDuration: `${h.dur}s`,
                        animationDelay: `${h.delay}s`,
                        ['--drift' as string]: `${h.drift}px`,
                        ['--drift-half' as string]: `${h.drift * 0.5}px`,
                      }}
                    >
                      <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color} style={{ opacity: 0.85 }}>
                        <path d={HEART_PATH} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ═══ RIGHT COLUMN — Benefits + Trust + CTA ═══ */}
        <div className="eg-col-right">
          <div className="eg-inner">

            {/* Mobile-only header */}
            <div className="eg-mobile-header">
              <div className={`eg-accent ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.15s' }} />
              <span className={`eg-label ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.25s' }}>
                LA EXPERIENCIA
              </span>
              <h2 className={`eg-title ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.35s' }}>
                Todo lo bueno, <span className="eg-title-light">sin lo que incomoda</span>
              </h2>
              <p className={`eg-sub ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.5s' }}>
                Un espacio donde podés ser vos, sin presiones ni explicaciones.
                Compañía genuina que se adapta a lo que necesitás.
              </p>
            </div>

            {/* Floating deco */}
            <div className={`eg-deco eg-dk-1 ${a ? 'eg-a-pop' : ''}`} style={{ animationDelay: '0.8s' }}>
              <img src="/corazonderecha.png" alt="" className={mounted ? 'eg-fl-1' : ''} />
            </div>
            <div className={`eg-deco eg-dk-2 ${a ? 'eg-a-pop' : ''}`} style={{ animationDelay: '0.95s' }}>
              <img src="/carta.png" alt="" className={mounted ? 'eg-fl-2' : ''} />
            </div>
            <div className={`eg-deco eg-dk-3 ${a ? 'eg-a-pop' : ''}`} style={{ animationDelay: '1.1s' }}>
              <img src="/corazonizquierda.png" alt="" className={mounted ? 'eg-fl-3' : ''} />
            </div>

            {/* Benefits — single column */}
            <div className="eg-benefits">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className={`eg-benefit ${a ? 'eg-a-card' : ''}`}
                  style={{ animationDelay: `${0.55 + i * 0.08}s` }}
                >
                  <div className="eg-benefit-icon"><span>{b.emoji}</span></div>
                  <div className="eg-benefit-text">
                    <span className="eg-benefit-name">{b.title}</span>
                    <span className="eg-benefit-desc">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust block */}
            <div className={`eg-trust ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '0.95s' }}>
              <div className="eg-trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="eg-trust-content">
                <p className="eg-trust-title">Compañía genuina, con límites claros</p>
                <p className="eg-trust-desc">
                  Contención emocional y entretenimiento en un marco de respeto mutuo.
                  No es un servicio de citas ni de contenido para adultos.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="eg-action">
              <button
                className={`eg-btn ${a ? 'eg-a-up' : ''}`}
                style={{ animationDelay: '1.1s' }}
                onClick={() => scrollTo('contacto')}
              >
                Quiero empezar
                <svg className="eg-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <span className={`eg-microtrust ${a ? 'eg-a-up' : ''}`} style={{ animationDelay: '1.2s' }}>
                Sin permanencia · Cancelá cuando quieras
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile image */}
      <div className="eg-img-mobile">
        <img
          src="/beso.png"
          alt="Camil"
          className={a ? 'eg-a-scale' : ''}
          style={{ animationDelay: '0.6s' }}
        />
      </div>
    </section>
  );
};

export default EverythingGoodScreen;