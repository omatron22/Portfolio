import React from 'react';

interface CharacterSelectProps {
  onSelectCharacter: (character: string) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelectCharacter }) => {
  return (
    <div
      className="relative w-[800px] h-[460px] mx-auto border-[10px] border-secondary rounded-lg shadow-lg bg-transparent box-border overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(/assets/choose.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center w-full h-full">
        <div className="flex items-end h-full pb-[106.67px] relative">
          {/* Left Character (Birthday) */}
          <div
            className="group absolute left-[20%] bottom-[53.33px] transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('birthday')}
          >
            <img
              src="/assets/birthday.png"
              alt="Birthday Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '230px', // Set explicit width
                height: 'auto',
              }}
            />
          </div>

          {/* Middle Character (OG) */}
          <div
            className="group absolute left-1/2 bottom-[74.67px] transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('og')}
          >
            <img
              src="/assets/OG.png"
              alt="OG Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '160px', // Set explicit width
                height: 'auto',
              }}
            />
          </div>

          {/* Right Character (Jeans) */}
          <div
            className="group absolute right-[20%] bottom-[48px] transform translate-x-[50%]"
            onClick={() => onSelectCharacter('jeans')}
          >
            <img
              src="/assets/jeans.png"
              alt="Jeans Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '160px', // Set explicit width
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
