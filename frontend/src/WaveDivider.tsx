const WaveDivider = () => {
    return (
      <div
        className="w-full pointer-events-none"
        style={{
          height: '0px',
          position: 'relative',
          zIndex: 999,
        }}
      >
        <div
          className="absolute left-0 w-full"
          style={{
            top: '-25px',
          }}
        >
          <svg
            viewBox="0 0 1440 120"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: '65px' }}
          >
            <path
              d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z"
              fill="#F9DDA3"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default WaveDivider;