import React from 'react';

interface HowToPlayProps {
  onClose: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/assets/howtoplay.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          bottom: '6.67px', // Adjusted from 10px
          right: '33px', // Adjusted from 50px
          width: '233px', // Adjusted from 350px
          height: '93px', // Adjusted from 140px
          backgroundImage: 'url(/assets/startgame.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = 'scale(1.1)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = 'scale(1)')
        }
      />
    </div>
  );
};

export default HowToPlay;
