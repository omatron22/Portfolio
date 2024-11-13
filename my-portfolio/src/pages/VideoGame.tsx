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
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      {currentScreen === 'intro' && (
        <IntroScreen onPlay={() => setCurrentScreen('characterSelect')} />
      )}

      {currentScreen === 'characterSelect' && (
        <CharacterSelect onSelectCharacter={handleCharacterSelect} />
      )}

      {currentScreen === 'game' && (
        <div className="w-full h-full animate__animated animate__zoomIn">
          <Game
            character={selectedCharacter}
            onCharacterSelect={handleGoToCharacterSelect} // Pass the handler to Game
            onMainMenu={handleGoToMainMenu} // Add the onMainMenu prop to Game
          />
        </div>
      )}
    </div>
  );
};

export default VideoGame;
