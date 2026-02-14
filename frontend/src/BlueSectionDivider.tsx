const BlueSectionDivider = ({ text }: { text: string }) => {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '18vh',
          minHeight: '120px',
          maxHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Mismo fondo azul continuo */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img
            src="/fondoliso.jpeg"
            alt=""
            className="object-cover"
            style={{
              width: '140%',
              height: '140%',
              minWidth: '140%',
              minHeight: '140%',
            }}
          />
        </div>
  
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{ gap: '1.2vw' }}
        >
          <div
            className="flex items-center"
            style={{ gap: '1.5vw', width: '60vw' }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(249,221,163,0.4), rgba(249,221,163,0.6))',
              }}
            />
  
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6vw',
                padding: '0.5vw 1.8vw',
                borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(249,221,163,0.25)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap' as const,
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'clamp(13px, 1vw, 18px)',
                  letterSpacing: '0.06em',
                }}
              >
                ✦
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(249,221,163,0.85)',
                  fontSize: 'clamp(13px, 1vw, 18px)',
                  letterSpacing: '0.06em',
                }}
              >
                {text}
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'clamp(13px, 1vw, 18px)',
                  letterSpacing: '0.06em',
                }}
              >
                ✦
              </span>
            </div>
  
            <div
              style={{
                flex: 1,
                height: '1px',
                background:
                  'linear-gradient(90deg, rgba(249,221,163,0.6), rgba(249,221,163,0.4), transparent)',
              }}
            />
          </div>
  
          <div
            className="flex items-center justify-center"
            style={{ gap: '2vw', opacity: 0.4 }}
          >
            {['◆', '◆', '◆'].map((d, i) => (
              <span
                key={i}
                style={{
                  fontSize: i === 1
                    ? 'clamp(6px, 0.35vw, 10px)'
                    : 'clamp(8px, 0.5vw, 12px)',
                  color: '#F9DDA3',
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default BlueSectionDivider;