import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

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
      width: 1200,
      height: 690,
      transparent: true,
      scene: {
        preload: function () {
          this.load.spritesheet('samson', '/assets/samson.png', {
            frameWidth: 1200,
            frameHeight: 690,
          });
          this.load.spritesheet('samson2', '/assets/samson2.png', {
            frameWidth: 1200,
            frameHeight: 690,
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
          const samsonSprite = this.add.sprite(600, 345, 'samson');
          samsonSprite.setScale(1);
          samsonSprite.setOrigin(0.5, 0.5);
          samsonSprite.play('samson_animation');

          // Animation for samson2
          this.anims.create({
            key: 'samson2_animation',
            frames: this.anims.generateFrameNumbers('samson2', { start: 0, end: 69 }),
            frameRate: 6,
            repeat: -1,
          });
          const samson2Sprite = this.add.sprite(600, 345, 'samson2');
          samson2Sprite.setScale(1);
          samson2Sprite.setOrigin(0.5, 0.5);
          samson2Sprite.play('samson2_animation');

          // Add play button image over the sprite, positioned in the middle
          const playButton = this.add.image(600, 345, 'playButton').setInteractive({ useHandCursor: true, pixelPerfect: true });
          playButton.setScale(1);
          playButton.setOrigin(0.5, 0.5);
          playButton.on('pointerdown', onPlay);
          playButton.on('pointerover', () => {
            playButton.setScale(1.1); // Scale up on hover
          });
          playButton.on('pointerout', () => {
            playButton.setScale(1); // Scale back down when not hovering
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
      ref={introRef}
      className="relative rounded-lg shadow-lg"
      style={{
        width: '1200px',
        height: '690px',
      }}
    ></div>
  );
};

export default IntroScreen;
