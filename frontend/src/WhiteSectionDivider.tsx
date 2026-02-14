const WhiteSectionDivider = () => {
    return (
      <div
        className="relative w-full"
        style={{
          backgroundColor: '#F3F3F3',
          height: '10vh',
          minHeight: '70px',
          maxHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: '70vw', gap: '1.5vw' }}
        >
          {/* Línea izquierda */}
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(246,158,130,0.25), rgba(246,158,130,0.4))',
            }}
          />
  
          {/* Centro */}
          <div
            className="flex items-center"
            style={{ gap: '0.6vw' }}
          >
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(246,158,130,0.25)',
              }}
            />
            <div
              style={{
                width: 'clamp(28px, 2.2vw, 38px)',
                height: 'clamp(28px, 2.2vw, 38px)',
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, rgba(249,221,163,0.2), rgba(246,158,130,0.15))',
                border: '1px solid rgba(246,158,130,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(11px, 0.85vw, 16px)',
                color: 'rgba(246,158,130,0.5)',
              }}
            >
              ✦
            </div>
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(246,158,130,0.25)',
              }}
            />
          </div>
  
          {/* Línea derecha */}
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(246,158,130,0.4), rgba(246,158,130,0.25), transparent)',
            }}
          />
        </div>
      </div>
    );
  };
  
  export default WhiteSectionDivider;