import { useEffect, useState, useRef, useCallback } from 'react';

interface WelcomeScreenProps {
  loaderFinished?: boolean;
}

const VIDEOS = [
  '/videos/primera.mp4',
  '/videos/segunda.mp4',
  '/videos/extra.mp4',
  '/videos/tercera.mp4',
  '/videos/cuarta.mp4',
  '/videos/quinta.mp4',
];

const TRANSITION_LEAD_TIME = 1.8;
const GLASS_DURATION = 2200;
const PEAK_AT = 1100;
const VIDEO_CUSTOM_LEAD: Record<number, number> = { 4: 1.4, 5: 0.8 };

const HERO_TITLES = [
  <>Sentite especial,<br />con alguien especial.</>,
  <>Porque nadie debería<br />sentirse solo.</>,
  <>Un mensaje puede<br />cambiarlo todo.</>,
  <>El regalo más lindo<br />que podrías hacer.</>,
  <>A vos mismo,<br />claro que también.</>,
  <>Así se siente<br />tener a alguien.</>,
];

const WelcomeScreen = ({ loaderFinished = false }: WelcomeScreenProps) => {
  const [entered, setEntered] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  /* ★ TITLE PHASE — acoplado al sweep
   *   'show' → visible, posición normal
   *   'hide' → sale hacia la DERECHA + blur (siguiendo el sweep)
   *   'prep' → snap invisible a la IZQUIERDA (sin transition)
   *   'show' → entra desde la izquierda + deblur (emergiendo tras el sweep)
   */
  const [heroLine, setHeroLine] = useState(0);
  const [titlePhase, setTitlePhase] = useState<'show' | 'hide' | 'prep'>('show');

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const [frontSlot, setFrontSlot] = useState<'A' | 'B'>('A');
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [phase, setPhase] = useState<'playing' | 'sweep-in' | 'white-peak' | 'sweep-out'>('playing');
  const [backVisible, setBackVisible] = useState(false);
  const [frontFading, setFrontFading] = useState(false);

  const transitionStarted = useRef(false);
  const throttle = useRef(false);
  const isTransitioning = useRef(false);

  const getFrontVideo = useCallback(() => (frontSlot === 'A' ? videoARef.current : videoBRef.current), [frontSlot]);
  const getBackVideo = useCallback(() => (frontSlot === 'A' ? videoBRef.current : videoARef.current), [frontSlot]);

  const prepareVideo = useCallback((video: HTMLVideoElement, src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (video.src.includes(src) && video.readyState >= 2) { video.currentTime = 0; resolve(); return; }
      const onReady = () => { video.removeEventListener('canplay', onReady); video.currentTime = 0; resolve(); };
      video.addEventListener('canplay', onReady); video.src = src; video.load();
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (loaderFinished) { const t = setTimeout(() => setEntered(true), 200); return () => clearTimeout(t); }
  }, [loaderFinished]);

  useEffect(() => {
    if (entered) { const t = setTimeout(() => setIconsReady(true), 1900); return () => clearTimeout(t); }
  }, [entered]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => setHeroVisible(window.scrollY < 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !entered) return;
    const front = getFrontVideo(); const back = getBackVideo();
    if (front && !front.src.includes('.mp4')) { prepareVideo(front, VIDEOS[0]).then(() => { front.play().catch(() => {}); }); }
    if (back) { prepareVideo(back, VIDEOS[1]); }
  }, [entered, isMobile]);

  const handleTimeUpdate = useCallback(() => {
    if (isMobile || transitionStarted.current || isTransitioning.current) return;
    if (throttle.current) return;
    throttle.current = true; setTimeout(() => { throttle.current = false; }, 100);
    const front = getFrontVideo();
    if (!front || !front.duration || isNaN(front.duration)) return;
    const leadTime = VIDEO_CUSTOM_LEAD[currentVideoIdx] ?? TRANSITION_LEAD_TIME;
    const remaining = front.duration - front.currentTime;
    if (remaining <= leadTime && remaining > 0) { transitionStarted.current = true; doTransition(); }
  }, [isMobile, getFrontVideo, currentVideoIdx]);

  const handleEnded = useCallback(() => {
    if (isMobile) return;
    if (!transitionStarted.current && !isTransitioning.current) { transitionStarted.current = true; doTransition(); }
  }, [isMobile]);

  const doTransition = useCallback(() => {
    isTransitioning.current = true;
    const nextIdx = (currentVideoIdx + 1) % VIDEOS.length;
    const back = getBackVideo(); if (!back) return;

    const startAnimation = () => {
      /* ★ Título sale hacia la derecha (siguiendo el sweep) */
      setTitlePhase('hide');

      requestAnimationFrame(() => { requestAnimationFrame(() => {
        setPhase('sweep-in');
        setTimeout(() => { setBackVisible(true); back.currentTime = 0; back.play().catch(() => {}); }, PEAK_AT - 600);
        setTimeout(() => { setFrontFading(true); }, PEAK_AT - 350);
        setTimeout(() => { setPhase('white-peak'); }, PEAK_AT - 100);

        /* ★ En el flash: cambia texto + snap a posición izquierda */
        setTimeout(() => {
          setHeroLine(nextIdx);
          setTitlePhase('prep');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTitlePhase('show');
            });
          });
        }, PEAK_AT);

        setTimeout(() => { setPhase('sweep-out'); }, PEAK_AT + 100);

        setTimeout(() => {
          const oldFront = getFrontVideo();
          if (oldFront) { oldFront.pause(); oldFront.currentTime = 0; }
          setFrontSlot(p => p === 'A' ? 'B' : 'A'); setCurrentVideoIdx(nextIdx);
          setFrontFading(false); setBackVisible(false); setPhase('playing');
          if (oldFront) { prepareVideo(oldFront, VIDEOS[(nextIdx + 1) % VIDEOS.length]); }
          transitionStarted.current = false; isTransitioning.current = false;
        }, GLASS_DURATION);
      }); });
    };

    if (back.src.includes(VIDEOS[nextIdx]) && back.readyState >= 2) { back.currentTime = 0; startAnimation(); }
    else {
      const onReady = () => { back.removeEventListener('canplay', onReady); back.currentTime = 0; startAnimation(); };
      back.addEventListener('canplay', onReady);
      if (!back.src.includes(VIDEOS[nextIdx])) { back.src = VIDEOS[nextIdx]; } back.load();
    }
  }, [currentVideoIdx, getFrontVideo, getBackVideo, prepareVideo]);

  const handleDotClick = useCallback((targetIdx: number) => {
    if (phase !== 'playing' || targetIdx === currentVideoIdx || isMobile || isTransitioning.current) return;
    isTransitioning.current = true; transitionStarted.current = true;
    const back = getBackVideo(); if (!back) return;

    const startAnimation = () => {
      setTitlePhase('hide');

      requestAnimationFrame(() => { requestAnimationFrame(() => {
        setPhase('sweep-in');
        setTimeout(() => { setBackVisible(true); back.currentTime = 0; back.play().catch(() => {}); }, PEAK_AT - 600);
        setTimeout(() => { setFrontFading(true); }, PEAK_AT - 350);
        setTimeout(() => { setPhase('white-peak'); }, PEAK_AT - 100);

        setTimeout(() => {
          setHeroLine(targetIdx);
          setTitlePhase('prep');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTitlePhase('show');
            });
          });
        }, PEAK_AT);

        setTimeout(() => { setPhase('sweep-out'); }, PEAK_AT + 100);

        setTimeout(() => {
          const oldFront = getFrontVideo();
          if (oldFront) { oldFront.pause(); oldFront.currentTime = 0; }
          setFrontSlot(p => p === 'A' ? 'B' : 'A'); setCurrentVideoIdx(targetIdx);
          setFrontFading(false); setBackVisible(false); setPhase('playing');
          if (oldFront) { prepareVideo(oldFront, VIDEOS[(targetIdx + 1) % VIDEOS.length]); }
          transitionStarted.current = false; isTransitioning.current = false;
        }, GLASS_DURATION);
      }); });
    };

    const onReady = () => { back.removeEventListener('canplay', onReady); back.currentTime = 0; startAnimation(); };
    back.addEventListener('canplay', onReady); back.src = VIDEOS[targetIdx]; back.load();
  }, [phase, currentVideoIdx, isMobile, getFrontVideo, getBackVideo, prepareVideo]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const isAFront = frontSlot === 'A';

  /* ★ TITLE TRANSITION STYLES — acoplado al sweep */
  const titleTransition = titlePhase === 'prep'
    ? 'none'
    : 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1), filter 0.55s cubic-bezier(0.4,0,0.2,1)';

  const titleOpacity = titlePhase === 'show' ? 1 : 0;

  const titleTransform = titlePhase === 'hide'
    ? 'translateX(30px)'    // sale hacia la DERECHA (con el sweep)
    : titlePhase === 'prep'
      ? 'translateX(-20px)' // snap a la IZQUIERDA (invisible)
      : 'translateX(0)';    // posición final

  const titleFilter = titlePhase === 'show' ? 'blur(0px)' : 'blur(6px)';

  return (
    <section
      id="inicio"
      style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        height: '100dvh', background: '#000',
        ...(isMobile ? { height: 'auto', minHeight: '100dvh', background: 'transparent' } : {}),
      }}
    >
      {/* ╔══════════════════════════════════════════════════╗
          ║                   DESKTOP                       ║
          ╚══════════════════════════════════════════════════╝ */}
      {!isMobile && (
        <>
          <style>{`
            .ws-cl{position:absolute;inset:0;z-index:0}
            .ws-vs{position:absolute;inset:0}
            .ws-vsl{position:absolute;inset:0}
            .ws-vsl video{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
            .ws-vf{z-index:2;opacity:1;transition:opacity .7s cubic-bezier(.4,0,.2,1)}
            .ws-vf--fade{opacity:0}
            .ws-vb{z-index:1;opacity:0;transition:opacity .5s cubic-bezier(.4,0,.2,1)}
            .ws-vb--vis{opacity:1}
            @keyframes dkCinIn{0%{opacity:0;transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}
            .ws-cin-in{animation:dkCinIn 1.5s ease-out .1s both}
            .ws-gr{position:absolute;inset:0;z-index:10;pointer-events:none;overflow:hidden}
            .ws-gw{position:absolute;inset:0;background:white;opacity:0;z-index:6}
            .ws-psi .ws-gw{animation:dkWGI 1.1s cubic-bezier(.4,0,.2,1) forwards}
            .ws-pwp .ws-gw{opacity:.45}
            .ws-pso .ws-gw{animation:dkWFO 1.1s cubic-bezier(.4,0,.2,1) forwards}
            @keyframes dkWGI{0%{opacity:0}30%{opacity:.01}50%{opacity:.05}70%{opacity:.15}85%{opacity:.3}100%{opacity:.45}}
            @keyframes dkWFO{0%{opacity:.45}15%{opacity:.3}30%{opacity:.15}50%{opacity:.06}70%{opacity:.02}100%{opacity:0}}
            .ws-gd{position:absolute;inset:0;background:rgba(255,255,255,0);z-index:3}
            .ws-psi .ws-gd{animation:dkDI 1.1s cubic-bezier(.4,0,.2,1) forwards}
            .ws-pso .ws-gd{animation:dkDO 1.1s cubic-bezier(.4,0,.2,1) forwards}
            @keyframes dkDI{0%{background:rgba(255,255,255,0)}100%{background:rgba(255,255,255,.05)}}
            @keyframes dkDO{0%{background:rgba(255,255,255,.05)}100%{background:rgba(255,255,255,0)}}
            .ws-gb{position:absolute;width:300%;height:300%;top:-100%;left:-100%;transform:translateX(-110%) rotate(-35deg);will-change:transform;z-index:4}
            .ws-bw{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,transparent 34%,rgba(255,255,255,.008) 36%,rgba(255,255,255,.02) 37.5%,rgba(255,255,255,.05) 39%,rgba(255,255,255,.1) 41%,rgba(255,255,255,.18) 43%,rgba(255,255,255,.28) 44.5%,rgba(255,255,255,.4) 46%,rgba(255,255,255,.55) 47.5%,rgba(255,255,255,.7) 48.5%,rgba(255,255,255,.82) 49.3%,rgba(255,255,255,.92) 49.8%,rgba(255,255,255,1) 50%,rgba(255,255,255,.92) 50.2%,rgba(255,255,255,.82) 50.7%,rgba(255,255,255,.7) 51.5%,rgba(255,255,255,.55) 52.5%,rgba(255,255,255,.4) 54%,rgba(255,255,255,.28) 55.5%,rgba(255,255,255,.18) 57%,rgba(255,255,255,.1) 59%,rgba(255,255,255,.05) 61%,rgba(255,255,255,.02) 62.5%,rgba(255,255,255,.008) 64%,transparent 66%,transparent 100%)}
            .ws-bc{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,transparent 47%,rgba(255,255,255,.2) 48%,rgba(255,255,255,.5) 49%,rgba(255,255,255,.85) 49.6%,rgba(255,255,255,1) 50%,rgba(255,255,255,.85) 50.4%,rgba(255,255,255,.5) 51%,rgba(255,255,255,.2) 52%,transparent 53%,transparent 100%)}
            .ws-bl{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,transparent 26%,rgba(255,255,255,.005) 28%,rgba(255,255,255,.015) 29.5%,rgba(255,255,255,.035) 31%,rgba(255,255,255,.015) 33%,rgba(255,255,255,.005) 34.5%,transparent 36%,transparent 100%)}
            .ws-bt{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,transparent 65%,rgba(255,255,255,.005) 66%,rgba(255,255,255,.02) 67.5%,rgba(255,255,255,.04) 69%,rgba(255,255,255,.02) 71%,rgba(255,255,255,.005) 72.5%,transparent 74%,transparent 100%)}
            .ws-gbb{position:absolute;width:300%;height:300%;top:-100%;left:-100%;transform:translateX(-110%) rotate(-35deg);will-change:transform;z-index:3}
            .ws-bbd{position:absolute;inset:0;backdrop-filter:blur(16px) saturate(1.3) brightness(1.1);-webkit-backdrop-filter:blur(16px) saturate(1.3) brightness(1.1);mask-image:linear-gradient(90deg,transparent 0%,transparent 38%,black 44%,black 56%,transparent 62%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,transparent 38%,black 44%,black 56%,transparent 62%,transparent 100%)}
            @keyframes dkBSI{0%{transform:translateX(-110%) rotate(-35deg)}100%{transform:translateX(-5%) rotate(-35deg)}}
            @keyframes dkBSO{0%{transform:translateX(-5%) rotate(-35deg)}100%{transform:translateX(110%) rotate(-35deg)}}
            .ws-psi .ws-gb,.ws-psi .ws-gbb{animation:dkBSI 1.1s cubic-bezier(.16,1,.3,1) forwards}
            .ws-pwp .ws-gb,.ws-pwp .ws-gbb{transform:translateX(-5%) rotate(-35deg)}
            .ws-pso .ws-gb,.ws-pso .ws-gbb{animation:dkBSO 1.1s cubic-bezier(.16,1,.3,1) forwards}
            .ws-vig{position:absolute;inset:0;z-index:8;pointer-events:none;background:radial-gradient(ellipse 85% 85% at 50% 50%,transparent 55%,rgba(0,0,0,.12) 100%)}
            @keyframes dkHI{0%{opacity:0;transform:translateY(22px)}100%{opacity:1;transform:translateY(0)}}
            @keyframes dkBounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(5px)}}
          `}</style>

          <div className={`ws-cl ${entered ? 'ws-cin-in' : ''}`} style={{ opacity: entered ? undefined : 0 }}>
            <div className="ws-vs">
              <div className={`ws-vsl ${isAFront ? `ws-vf ${frontFading ? 'ws-vf--fade' : ''}` : `ws-vb ${backVisible ? 'ws-vb--vis' : ''}`}`}>
                <video ref={videoARef} muted playsInline preload="auto" {...(isAFront ? { onTimeUpdate: handleTimeUpdate, onEnded: handleEnded } : {})} />
              </div>
              <div className={`ws-vsl ${!isAFront ? `ws-vf ${frontFading ? 'ws-vf--fade' : ''}` : `ws-vb ${backVisible ? 'ws-vb--vis' : ''}`}`}>
                <video ref={videoBRef} muted playsInline preload="auto" {...(!isAFront ? { onTimeUpdate: handleTimeUpdate, onEnded: handleEnded } : {})} />
              </div>
            </div>
            <div className={`ws-gr ${phase === 'sweep-in' ? 'ws-psi' : phase === 'white-peak' ? 'ws-pwp' : phase === 'sweep-out' ? 'ws-pso' : ''}`}>
              <div className="ws-gw" /><div className="ws-gd" />
              <div className="ws-gbb"><div className="ws-bbd" /></div>
              <div className="ws-gb"><div className="ws-bl" /><div className="ws-bw" /><div className="ws-bc" /><div className="ws-bt" /></div>
            </div>
            <div className="ws-vig" />
          </div>

          {/* ═══ HERO OVERLAY DESKTOP ═══ */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '52%',
            zIndex: 12, display: 'flex', alignItems: 'center', pointerEvents: 'none',
            opacity: entered ? 1 : 0,
            transition: 'opacity 0.7s ease, transform 0.6s ease',
            ...(heroVisible ? {} : { opacity: 0, transform: 'translateY(-12px)' }),
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.03) 70%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              position: 'relative', zIndex: 2,
              paddingLeft: 'clamp(40px, 7vw, 100px)',
              maxWidth: 560, pointerEvents: 'auto',
            }}>
              {/* Gold accent */}
              <div style={{
                width: 38, height: 2.5,
                background: 'linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.2))',
                borderRadius: 2, marginBottom: 22, opacity: 0,
                ...(entered ? { animation: 'dkHI 0.8s ease-out 0.6s both' } : {}),
              }} />

              {/* ★ TÍTULO — contenedor fijo + wrapper de transición acoplada al sweep */}
              <div style={{
                minHeight: 'clamp(90px, 8.5vw, 130px)',
                display: 'flex',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  transition: titleTransition,
                  opacity: titleOpacity,
                  transform: titleTransform,
                  filter: titleFilter,
                }}>
                  <h1 style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', lineHeight: 1.15,
                    color: '#fff', letterSpacing: '-0.02em',
                    margin: 0,
                    textShadow: '0 2px 30px rgba(0,0,0,0.25)',
                    opacity: 0,
                    ...(entered ? { animation: 'dkHI 0.9s ease-out 0.75s both' } : {}),
                  }}>
                    {HERO_TITLES[heroLine]}
                  </h1>
                </div>
              </div>

              {/* Subtítulo — 100% estático */}
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 300,
                fontSize: 'clamp(0.88rem, 1.15vw, 1.1rem)', lineHeight: 1.7,
                color: 'rgba(255,255,255,0.72)',
                margin: '16px 0 32px', letterSpacing: '0.015em',
                textShadow: '0 1px 12px rgba(0,0,0,0.15)',
                opacity: 0,
                ...(entered ? { animation: 'dkHI 0.9s ease-out 1.0s both' } : {}),
              }}>
                Acompañamiento emocional real y personalizado.<br />
                Un espacio seguro, creado para vos.
              </p>

              {/* CTA — estático */}
              <button
                onClick={() => scrollTo('que-es')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 30px', borderRadius: 50,
                  background: 'linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%)',
                  color: '#2a1f0e', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600, fontSize: 14, letterSpacing: '0.04em',
                  cursor: 'pointer', border: 'none',
                  boxShadow: '0 4px 24px rgba(249,221,163,0.2), 0 1px 3px rgba(0,0,0,0.1)',
                  opacity: 0,
                  ...(entered ? { animation: 'dkHI 0.8s ease-out 1.25s both' } : {}),
                }}
              >
                Conocé a Camil
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video dots */}
          <div style={{
            position: 'absolute', bottom: 80, left: '50%',
            transform: 'translateX(-50%)', zIndex: 20,
            display: 'flex', gap: 8,
            opacity: entered ? 1 : 0,
            transition: 'opacity 0.8s ease 2.5s',
          }}>
            {VIDEOS.map((_, i) => (
              <button key={i} onClick={() => handleDotClick(i)} aria-label={`Video ${i + 1}`} style={{
                width: currentVideoIdx === i ? 20 : 6, height: 6,
                borderRadius: currentVideoIdx === i ? 3 : '50%',
                background: currentVideoIdx === i ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                border: 'none', padding: 0, cursor: 'pointer', outline: 'none',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                ...(currentVideoIdx === i ? { boxShadow: '0 0 8px rgba(255,255,255,0.3)' } : {}),
              }} />
            ))}
          </div>

          {/* Descubrí más */}
          <div style={{
            position: 'absolute', bottom: 28, left: '50%',
            transform: 'translateX(-50%)', zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            animation: 'dkBounce 2.5s ease-in-out infinite',
            opacity: entered ? 1 : 0,
            transition: 'opacity 0.8s ease 2s',
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 11,
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
            }}>Descubrí más</span>
            <svg width={14} height={14} style={{ opacity: 0.5 }} fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </>
      )}

      {/* ╔══════════════════════════════════════════════════╗
          ║                   MOBILE                        ║
          ╚══════════════════════════════════════════════════╝ */}
      {isMobile && (
        <>
          <style>{`
            @keyframes mBg{0%{opacity:0;transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
            @keyframes mLine{0%{opacity:0;width:0}100%{opacity:1;width:40px}}
            @keyframes mUp{0%{opacity:0;transform:translateY(22px)}100%{opacity:1;transform:translateY(0)}}
            @keyframes mRise{0%{opacity:0;transform:translateY(60px)}60%{opacity:1;transform:translateY(-8px)}100%{opacity:1;transform:translateY(0)}}
            @keyframes mPop{0%{opacity:0;transform:scale(0) rotate(-20deg)}60%{opacity:1;transform:scale(1.15) rotate(5deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}
            @keyframes mFH{0%,100%{transform:translateY(0) scale(1) rotate(0)}25%{transform:translateY(-8px) scale(1.04) rotate(1.5deg)}50%{transform:translateY(-14px) scale(1) rotate(-1deg)}75%{transform:translateY(-6px) scale(1.03) rotate(.5deg)}}
            @keyframes mFL{0%,100%{transform:translateY(0) rotate(0)}20%{transform:translateY(-10px) rotate(2deg)}50%{transform:translateY(-6px) rotate(-2.5deg)}70%{transform:translateY(-12px) rotate(1.5deg)}}
            @keyframes mFP{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-.8deg)}}
            @keyframes mFB{0%,100%{transform:translateY(0) rotate(0) translateX(0)}30%{transform:translateY(-7px) rotate(1.5deg) translateX(2px)}60%{transform:translateY(-4px) rotate(-1deg) translateX(-1px)}80%{transform:translateY(-9px) rotate(.5deg) translateX(1px)}}
            @keyframes mFloor{0%{transform:translateY(100%)}100%{transform:translateY(0)}}
            @keyframes mBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
            @keyframes mScrollIn{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
          `}</style>

          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, opacity: 0,
            ...(entered ? { animation: 'mBg 1s ease-out 0.1s both' } : {}),
          }}>
            <img src="/fondoazul.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>

          <div style={{
            position: 'relative', zIndex: 20, flex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '100%', minHeight: 0,
          }}>

            <div style={{
              width: '100%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 40,
            }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', width: '100%',
                paddingTop: 'clamp(28px, 5vh, 55px)',
                paddingLeft: 'clamp(20px, 6vw, 30px)',
                paddingRight: 'clamp(20px, 6vw, 30px)',
                paddingBottom: 6,
              }}>
                <div style={{
                  height: 2.5, borderRadius: 2,
                  background: 'linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.25))',
                  marginBottom: 'clamp(8px, 1.2vh, 14px)',
                  opacity: 0, width: 0,
                  ...(entered ? { animation: 'mLine 0.7s ease-out 0.4s both' } : {}),
                }} />

                <h1 style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 8.5vw, 2.8rem)', lineHeight: 1.12,
                  color: '#ffffff', letterSpacing: '-0.02em',
                  margin: '0 0 clamp(5px, 0.8vh, 10px)',
                  textShadow: '0 3px 30px rgba(0,0,0,0.35)',
                  opacity: 0,
                  ...(entered ? { animation: 'mUp 0.8s ease-out 0.55s both' } : {}),
                }}>
                  Sentite especial,<br />con alguien especial.
                </h1>

                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.82rem, 3.8vw, 1.05rem)', lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.78)',
                  margin: '0 0 clamp(10px, 1.8vh, 20px)',
                  letterSpacing: '0.01em', maxWidth: 420,
                  textShadow: '0 1px 12px rgba(0,0,0,0.18)',
                  opacity: 0,
                  ...(entered ? { animation: 'mUp 0.8s ease-out 0.75s both' } : {}),
                }}>
                  Acompañamiento emocional real y personalizado.<br />Un espacio seguro, creado para vos.
                </p>

                <button onClick={() => scrollTo('que-es')} style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: 'clamp(7px, 2vw, 10px)',
                  padding: 'clamp(11px, 2.8vw, 16px) clamp(26px, 8vw, 38px)',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg, #F9DDA3 0%, #e6c57a 100%)',
                  color: '#2a1f0e', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600, fontSize: 'clamp(12px, 3.5vw, 15px)',
                  letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(249,221,163,0.3), 0 1px 3px rgba(0,0,0,0.12)',
                  WebkitTapHighlightColor: 'transparent',
                  opacity: 0,
                  ...(entered ? { animation: 'mUp 0.7s ease-out 0.95s both' } : {}),
                }}>
                  Conocé a Camil
                  <svg width="clamp(13px, 3.5vw, 16px)" height="clamp(13px, 3.5vw, 16px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{
              width: '100%', flex: 1, position: 'relative',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              zIndex: 30, minHeight: 0,
            }}>
              <div style={{
                position: 'relative', display: 'flex', justifyContent: 'center',
                alignItems: 'flex-end', zIndex: 30, opacity: 0,
                ...(entered ? { animation: 'mRise 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s both' } : {}),
              }}>
                <img src="/camilhome.png" alt="Camil" style={{
                  height: 'auto', width: 'auto',
                  maxWidth: 'clamp(200px, 62vw, 320px)',
                  maxHeight: 'clamp(42vh, 55vh, 62vh)',
                  objectFit: 'contain', objectPosition: 'bottom center', zIndex: 30,
                }} />

                <img src="/corazon.png" alt="" style={{
                  position: 'absolute', objectFit: 'contain', zIndex: 50, pointerEvents: 'none',
                  left: 'clamp(-6px, -2vw, -14px)', top: '10%',
                  width: 'clamp(22px, 10vw, 50px)', height: 'clamp(22px, 10vw, 50px)',
                  opacity: 0,
                  ...(iconsReady ? { animation: 'mFH 3.4s ease-in-out infinite', opacity: 1 }
                    : entered ? { animation: 'mPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.3s both' } : {}),
                }} />

                <img src="/celular.png" alt="" style={{
                  position: 'absolute', objectFit: 'contain', zIndex: 50, pointerEvents: 'none',
                  left: 'clamp(-12px, -6vw, -38px)', bottom: '24%',
                  width: 'clamp(42px, 18vw, 95px)', height: 'clamp(42px, 18vw, 95px)',
                  opacity: 0,
                  ...(iconsReady ? { animation: 'mFP 4.5s ease-in-out infinite', opacity: 1 }
                    : entered ? { animation: 'mPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.5s both' } : {}),
                }} />

                <img src="/billete.png" alt="" style={{
                  position: 'absolute', objectFit: 'contain', zIndex: 50, pointerEvents: 'none',
                  right: 'clamp(-7px, -3vw, -16px)', top: '3%',
                  width: 'clamp(24px, 10vw, 52px)', height: 'clamp(24px, 10vw, 52px)',
                  opacity: 0,
                  ...(iconsReady ? { animation: 'mFB 5s ease-in-out infinite', opacity: 1 }
                    : entered ? { animation: 'mPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.7s both' } : {}),
                }} />

                <img src="/carta.png" alt="" style={{
                  position: 'absolute', objectFit: 'contain', zIndex: 50, pointerEvents: 'none',
                  right: 'clamp(-8px, -4vw, -20px)', bottom: '46%',
                  width: 'clamp(20px, 9vw, 48px)', height: 'clamp(20px, 9vw, 48px)',
                  opacity: 0,
                  ...(iconsReady ? { animation: 'mFL 4s ease-in-out infinite', opacity: 1 }
                    : entered ? { animation: 'mPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.9s both' } : {}),
                }} />
              </div>

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                zIndex: 55, pointerEvents: 'none',
                height: 'clamp(140px, 22vh, 200px)',
                background: `linear-gradient(to bottom,
                  rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 15%, rgba(0,0,0,0.1) 30%,
                  rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.42) 70%, rgba(0,0,0,0.58) 85%, rgba(0,0,0,0.7) 100%)`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.7) 70%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.7) 70%, black 100%)',
                }} />
              </div>

              <div style={{
                position: 'absolute', bottom: 'clamp(10px, 2vh, 20px)',
                left: 0, right: 0, zIndex: 60,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                opacity: 0,
                ...(entered ? { animation: 'mScrollIn 0.6s ease-out 1.3s both' } : {}),
              }}>
                <div style={{
                  animation: 'mBounce 2s ease-in-out infinite',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    fontSize: 'clamp(9px, 2.5vw, 11px)',
                    color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  }}>
                    Descubrí más
                  </span>
                  <svg width="clamp(10px, 3vw, 14px)" height="clamp(10px, 3vw, 14px)" fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            width: '100%', flexShrink: 0,
            height: 'clamp(28px, 6vh, 44px)',
            backgroundColor: '#F9DDA3',
            position: 'relative', zIndex: 10,
            transform: 'translateY(100%)',
            ...(entered ? { animation: 'mFloor 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both' } : {}),
          }} />
        </>
      )}
    </section>
  );
};

export default WelcomeScreen;