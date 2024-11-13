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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
      }}
    >
      <h2>How to Play</h2>
      <p>Use the arrow keys to control your character:</p>
      <ul>
        <li>Up Arrow: Jump</li>
        <li>Down Arrow: Duck</li>
        <li>Left/Right Arrows: Move left/right</li>
      </ul>
      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default HowToPlay;
