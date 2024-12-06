import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import IntroScreen from '../components/IntroScreen';
import CharacterSelect from '../components/CharacterSelect';

const VideoGame: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'intro' | 'characterSelect' | 'game' | 'gameOver'
  >('intro');
  const [selectedCharacter, setSelectedCharacter] = useState('player');

  // Scaling logic for the game components
  const [scale, setScale] = useState(1);
  const baseWidth = 1280; // Adjusted base width to match your game's actual dimensions
  const baseHeight = 720; // Adjusted base height

  // State to detect mobile devices
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a mobile device
    function checkIfMobile() {
      const mobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    }
    checkIfMobile();

    // Scaling logic (only if not on mobile)
    if (!isMobile) {
      const handleResize = () => {
        const widthScale = window.innerWidth / baseWidth;
        const heightScale = window.innerHeight / baseHeight;
        const newScale = Math.min(widthScale, heightScale, 1); // Do not scale up
        setScale(newScale);
      };

      handleResize(); // Initial call
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [baseWidth, baseHeight, isMobile]);

  // Handle character selection and start game
  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setCurrentScreen('game');
  };

  // Handle navigation back to character selection screen
  const handleGoToCharacterSelect = () => {
    setCurrentScreen('characterSelect');
  };

  // Handle navigation back to the main menu (intro screen)
  const handleGoToMainMenu = () => {
    setCurrentScreen('intro');
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      {isMobile ? (
        // Display message for mobile users
        <section className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Game Not Supported on Mobile Devices</h2>
            <p className="text-lg">
              Sorry, this game is not supported on mobile devices. Please access it from a desktop or
              laptop computer.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Game Section */}
          <section className="flex-grow flex items-center justify-center">
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                width: `${baseWidth}px`,
                height: `${baseHeight}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentScreen === 'intro' && (
                <IntroScreen onPlay={() => setCurrentScreen('characterSelect')} />
              )}

              {currentScreen === 'characterSelect' && (
                <CharacterSelect onSelectCharacter={handleCharacterSelect} />
              )}

              {currentScreen === 'game' && (
                <Game
                  character={selectedCharacter}
                  onCharacterSelect={handleGoToCharacterSelect} // Pass the handler to Game
                  onMainMenu={handleGoToMainMenu} // Add the onMainMenu prop to Game
                />
              )}
            </div>
          </section>
        </>
      )}

      {/* Dedication Section */}
      <section className="py-8 bg-gradient-to-b from-base-200 to-base-300">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-pixelon text-base-content mb-4">
            Dedicated to My Best Friend
          </h2>
          <p className="text-lg md:text-xl font-Inter text-base-content mb-8">
            In loving memory of someone very important to me. Rest in peace Samson.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                src: '/assets/mybestfriend.JPG',
                alt: 'My Best Friend 1',
                style: { transform: 'rotate(-3deg)' },
              },
              {
                src: '/assets/happy.JPG',
                alt: 'My Best Friend 2',
                style: { transform: 'rotate(2deg)' },
              },
              {
                src: '/assets/walking.jpeg',
                alt: 'My Best Friend 3',
                style: { transform: 'rotate(-1deg)' },
              },
              {
                src: '/assets/fun.JPG',
                alt: 'My Best Friend 4',
                style: { transform: 'rotate(4deg)' },
              },
              {
                src: '/assets/camaro.jpg',
                alt: 'My Best Friend 5',
                style: { transform: 'rotate(-2deg)' },
              },
            ].map((image, index) => (
              <div
                key={index}
                className="w-28 sm:w-32 md:w-40 lg:w-48 overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
                style={image.style}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoGame;
