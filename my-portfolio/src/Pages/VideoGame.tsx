import React, { useState } from 'react';
import Game from '../components/Game';
import IntroScreen from '../components/IntroScreen';
import CharacterSelect from '../components/CharacterSelect';

const VideoGame: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'characterSelect' | 'game' | 'gameOver'>('intro');
  const [selectedCharacter, setSelectedCharacter] = useState('player');

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
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Game Section */}
      <section className="py-10 flex items-center justify-center">
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
      </section>

      {/* Dedication Section */}
      <section className="py-16 bg-gradient-to-b from-base-200 to-base-300">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-base-content mb-6">Dedicated to My Best Friend</h2>
          <p className="text-xl text-base-content mb-12">In loving memory of someone very important to me. Rest in peace Samson.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { src: '/assets/mybestfriend.JPG', alt: 'My Best Friend 1', style: { transform: 'rotate(-3deg)' } },
              { src: '/assets/happy.JPG', alt: 'My Best Friend 2', style: { transform: 'rotate(2deg)' } },
              { src: '/assets/walking.jpeg', alt: 'My Best Friend 3', style: { transform: 'rotate(-1deg)' } },
              { src: '/assets/fun.JPG', alt: 'My Best Friend 4', style: { transform: 'rotate(4deg)' } },
              { src: '/assets/camaro.jpg', alt: 'My Best Friend 5', style: { transform: 'rotate(-2deg)' } },
            ].map((image, index) => (
              <div key={index} className="w-40 sm:w-48 md:w-56 lg:w-64 overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl" style={image.style}>
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
