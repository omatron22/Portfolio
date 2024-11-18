import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import AudioManager from './AudioManager';

interface IntroScreenProps {
  onPlay: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onPlay }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const phaserInstanceRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!introRef.current) {
      return;
    }

    // Destroy previous Phaser instance if it exists
    if (phaserInstanceRef.current) {
      phaserInstanceRef.current.destroy(true);
    }

    // Phaser configuration for the intro screen
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800, // Adjusted from 1200
      height: 460, // Adjusted from 690
      transparent: true,
      scene: {
        preload: function () {
          this.load.spritesheet('samson', '/assets/samson.png', {
            frameWidth: 1200,
            frameHeight: 690,
            endFrame: 199, // Ensure correct number of frames
          });
          this.load.spritesheet('samson2', '/assets/samson2.png', {
            frameWidth: 1200,
            frameHeight: 690,
            endFrame: 69,
          });
          this.load.image('playButton', '/assets/play.png');
        },
        create: function () {
          // Animation for samson
          this.anims.create({
            key: 'samson_animation',
            frames: this.anims.generateFrameNumbers('samson', { start: 0, end: 199 }),
            frameRate: 8,
            repeat: -1,
          });
          const samsonSprite = this.add.sprite(400, 230, 'samson'); // Positions adjusted
          samsonSprite.setScale(0.6667); // Scale adjusted
          samsonSprite.setOrigin(0.5, 0.5);
          samsonSprite.play('samson_animation');

          // Animation for samson2
          this.anims.create({
            key: 'samson2_animation',
            frames: this.anims.generateFrameNumbers('samson2', { start: 0, end: 69 }),
            frameRate: 6,
            repeat: -1,
          });
          const samson2Sprite = this.add.sprite(400, 230, 'samson2'); // Positions adjusted
          samson2Sprite.setScale(0.6667); // Scale adjusted
          samson2Sprite.setOrigin(0.5, 0.5);
          samson2Sprite.play('samson2_animation');

          // Add play button image over the sprite, positioned in the middle
          const playButton = this.add
            .image(400, 230, 'playButton')
            .setInteractive({ useHandCursor: true, pixelPerfect: true });
          playButton.setScale(0.6667); // Scale adjusted
          playButton.setOrigin(0.5, 0.5);
          playButton.on('pointerdown', onPlay);
          playButton.on('pointerover', () => {
            playButton.setScale(0.7334); // Scale up on hover (1.1 * 0.6667)
          });
          playButton.on('pointerout', () => {
            playButton.setScale(0.6667); // Scale back down when not hovering
          });
        },
      },
      parent: introRef.current,
    };

    phaserInstanceRef.current = new Phaser.Game(config);

    return () => {
      phaserInstanceRef.current?.destroy(true);
    };
  }, [onPlay]);

  return (
    <div
      className="relative w-[800px] h-[460px] mx-auto border-[10px] border-secondary rounded-lg shadow-lg bg-transparent box-border overflow-hidden"
    >
      <div ref={introRef} className="w-full h-full"></div>

      {/* Include AudioManager for managing audio */}
      <AudioManager currentScreen="intro" />
    </div>
  );
};

export default IntroScreen;
