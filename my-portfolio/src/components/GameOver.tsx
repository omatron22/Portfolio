import React from 'react';

interface GameOverProps {
  currentScore: number;
  highScore: number;
  handleRestart: () => void;
  onCharacterSelect?: () => void; // Made optional
  onMainMenu: () => void; // Added prop to navigate to main menu
}

const GameOver: React.FC<GameOverProps> = ({ currentScore, highScore, handleRestart, onCharacterSelect, onMainMenu }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Game Over Background Image */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <img
          src="/assets/gameover-menu.png"
          alt="Game Over Menu"
          style={{
            width: '500px', // Adjust width and height accordingly
            height: 'auto',
          }}
        />
        
        {/* High Score and Current Score */}
        <div
          style={{
            position: 'absolute',
            top: '56%', // Lowered the position to move both scores slightly lower
            left: '64%', // Keeps scores to the right
            transform: 'translate(-50%, -50%)',
            textAlign: 'left',
          }}
        >
          <p style={{ 
            fontSize: '1.5rem', 
            margin: '0 0 10px 0', 
            color: '#dc78fb', 
            fontFamily: 'VT323, monospace', 
            textShadow: '-1px 1px #000'  // Shadow on the bottom-left side
          }}>
            : {highScore}
          </p>
          <p style={{ 
            fontSize: '1.5rem', 
            margin: '20px 0 0 0', 
            color: '#dc78fb', 
            fontFamily: 'VT323, monospace', 
            textShadow: '-1px 1px #000'  // Shadow on the bottom-left side
          }}>
            : {currentScore}
          </p>
        </div>

        {/* Restart, Main Menu, and Paw Buttons */}
        <div
          style={{
            position: 'absolute',
            top: '82.5%', // Adjust this to move the buttons container higher or lower
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: '60px', // Gap between the buttons
          }}
        >
          {/* Restart Button */}
          <img
            src="/assets/restart.png"
            alt="Restart Button"
            onClick={handleRestart}
            style={{
              width: '80px', // Reduced width to make the button smaller
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Main Menu Button */}
          <img
            src="/assets/home-button.png"
            alt="Main Menu Button"
            onClick={onMainMenu} // Use the callback to go back to main menu
            style={{
              width: '80px', // Reduced width to make the button smaller
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Paw Button to Go to Character Select */}
          {onCharacterSelect && (
            <img
              src="/assets/paw-button.png"
              alt="Paw Button"
              onClick={onCharacterSelect}
              style={{
                width: '80px', // Adjust width accordingly
                height: 'auto',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOver;
