import React, { useState } from 'react';
import Game from '../components/Game';

const VideoGame: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('player'); // Default character

  const handleCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharacter(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      {!isGameStarted ? (
        <div className="bg-base-100 rounded-lg shadow-lg p-8 text-center max-w-sm">
          <h1 className="text-3xl font-bold mb-6 text-primary">Welcome to My 2D Platformer</h1>
          <label className="block text-lg mb-4 text-secondary">Select Your Character:</label>
          <select 
            onChange={handleCharacterChange} 
            value={selectedCharacter} 
            className="select select-bordered w-full max-w-xs mb-6"
          >
            <option value="player">Player 1</option>
            <option value="otherCharacter">Player 2</option> {/* Add more characters if needed */}
          </select>
          <button 
            onClick={() => setIsGameStarted(true)} 
            className="btn btn-primary w-full"
          >
            Play
          </button>
        </div>
      ) : (
        <Game character={selectedCharacter} />
      )}
    </div>
  );
};

export default VideoGame;
