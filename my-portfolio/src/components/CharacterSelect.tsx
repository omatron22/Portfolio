import React from 'react';

interface CharacterSelectProps {
  onSelectCharacter: (character: string) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelectCharacter }) => {
  return (
    <div
      className="relative rounded-lg shadow-lg flex items-center justify-center"
      style={{
        width: '1200px',
        height: '690px',
        backgroundImage: `url(/assets/choose.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center w-full h-full">
        <div className="flex items-end h-full pb-40 relative">
          {/* Left Character (Birthday) - Move farther left */}
          <div
            className="group absolute left-[20%] bottom-20 transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('birthday')}
          >
            <img
              src="/assets/birthday.png"
              alt="Birthday Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Middle Character (OG) - Stays in the center */}
          <div
            className="group absolute left-1/2 bottom-28 transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('og')}
          >
            <img
              src="/assets/OG.png"
              alt="OG Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Right Character (Jeans) - Move farther right */}
          <div
            className="group absolute right-[20%] bottom-20 transform translate-x-[50%]"
            onClick={() => onSelectCharacter('jeans')}
          >
            <img
              src="/assets/jeans.png"
              alt="Jeans Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
