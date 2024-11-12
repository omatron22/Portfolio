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
          {/* Left Character (Birthday) */}
          <div className="group absolute left-1/4 bottom-20 transform translate-x-[-50%]">
            <img
              src="/assets/birthday.png"
              alt="Birthday Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
              onClick={() => onSelectCharacter('birthday')}
            />
          </div>

          {/* Middle Character (OG) */}
          <div className="group absolute left-1/2 bottom-28 transform translate-x-[-50%]">
            <img
              src="/assets/OG.png"
              alt="OG Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
              onClick={() => onSelectCharacter('OG')}
            />
          </div>

          {/* Right Character (Jeans) */}
          <div className="group absolute right-1/4 bottom-20 transform translate-x-[50%]">
            <img
              src="/assets/jeans.png"
              alt="Jeans Character"
              className="h-4/5 cursor-pointer group-hover:scale-110 transition-transform duration-500"
              onClick={() => onSelectCharacter('jeans')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
