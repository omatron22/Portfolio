import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface GameProps {
  character: string;
}

const Game: React.FC<GameProps> = ({ character }) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) {
      return;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 1000 },  // Gravity for jumping
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      parent: gameRef.current,
    };

    const game = new Phaser.Game(config);

    let player: Phaser.Physics.Arcade.Sprite;
    let ground: Phaser.Physics.Arcade.StaticGroup;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let obstacles: Phaser.Physics.Arcade.Group;
    let score = 0;
    let scoreText: Phaser.GameObjects.Text;
    let isGameOver = false;

    function preload(this: Phaser.Scene) {
      this.load.image('ground', 'assets/ground.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('obstacle', 'assets/obstacle.png');
    }

    function create(this: Phaser.Scene) {
      // Add the ground
      ground = this.physics.add.staticGroup();
      ground.create(400, 580, 'ground').setScale(2).refreshBody();

      // Create the player character
      player = this.physics.add.sprite(100, 450, 'player');
      player.setBounce(0);
      player.setCollideWorldBounds(true);

      // Enable collision between player and ground
      this.physics.add.collider(player, ground);

      // Create obstacle group
      obstacles = this.physics.add.group();

      // Set a timer to spawn obstacles periodically
      this.time.addEvent({
        delay: 1500,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true,
      });

      // Add score display
      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' });

      // Input handling for jump and duck
      cursors = this.input!.keyboard!.createCursorKeys();  // Non-null assertion used
    }

    function update(this: Phaser.Scene) {
      if (isGameOver) {
        return;
      }

      // Player auto-run
      player.setVelocityX(160);

      // Jump when spacebar or up arrow is pressed and player is on the ground
      if ((cursors.up.isDown || this.input!.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) && player.body?.touching.down) {
        player.setVelocityY(-550);
      }

      // Duck when the down arrow is pressed
      if (cursors.down.isDown) {
        player.setScale(1, 0.5);  // Shrink the player to "duck"
      } else {
        player.setScale(1, 1);
      }

      // Increment score as time passes
      score += 1;
      scoreText.setText('Score: ' + score);

      // Recycle obstacles when they go off screen
      obstacles.children.iterate((obstacle) => {
        const sprite = obstacle as Phaser.Physics.Arcade.Sprite;
        if (sprite.x < -50) {
          sprite.destroy();
        }
        return null;
      });
    }

    function spawnObstacle(this: Phaser.Scene) {
      // Create a new obstacle at a fixed y-position
      const obstacle = obstacles.create(800, 520, 'obstacle');
      obstacle.setVelocityX(-300);
      obstacle.setCollideWorldBounds(false);

      // Handle collision between player and obstacle
      this.physics.add.collider(player as Phaser.Physics.Arcade.Sprite, obstacle as Phaser.Physics.Arcade.Sprite, hitObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    }

    function hitObstacle(this: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
      this.physics.pause();
      player.setTint(0xff0000);
      isGameOver = true;
      scoreText.setText('Game Over! Final Score: ' + score);

      // Restart the game after 2 seconds
      this.time.delayedCall(2000, () => {
        this.scene.restart();
        isGameOver = false;
        score = 0;
      });
    }

    return () => {
      game.destroy(true);
    };
  }, [character]);

  return <div ref={gameRef}></div>;
};

export default Game;
