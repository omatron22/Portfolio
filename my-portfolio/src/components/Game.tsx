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
      height: 400,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 1000 },
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

    function preload(this: Phaser.Scene) {
      this.load.image('ground', '/assets/ground.png');
      this.load.image('player', '/assets/player.png');
      this.load.image('obstacle', '/assets/obstacle.png');
    }

    function create(this: Phaser.Scene) {
      // Ground setup
      ground = this.physics.add.staticGroup();
      ground.create(400, 390, 'ground').setScale(2).refreshBody();

      // Player setup
      player = this.physics.add.sprite(100, 300, 'player');
      player.setBounce(0.1);
      player.setCollideWorldBounds(true);

      // Collisions between player and ground
      this.physics.add.collider(player, ground);

      // Input controls
      cursors = this.input.keyboard?.createCursorKeys()!;

      // Create obstacles group
      obstacles = this.physics.add.group();

      // Set a timer to spawn obstacles periodically
      this.time.addEvent({
        delay: 1500,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true,
      });
    }

    function update(this: Phaser.Scene) {
      if (!player || !cursors) return;

      // Stop player movement by default
      player.setVelocityX(0);

      // Move left
      if (cursors.left?.isDown) {
        player.setVelocityX(-160);
      }
      // Move right
      else if (cursors.right?.isDown) {
        player.setVelocityX(160);
      }

      // Jump if touching the ground
      if ((cursors.up?.isDown || cursors.space?.isDown) && player.body?.touching.down) {
        player.setVelocityY(-500);
      }
    }

    function spawnObstacle(this: Phaser.Scene) {
      const obstacle = obstacles.create(800, 350, 'obstacle') as Phaser.Physics.Arcade.Sprite;
      obstacle.setVelocityX(-200);
      obstacle.setCollideWorldBounds(false);
      
      if (obstacle.body instanceof Phaser.Physics.Arcade.Body) {
        obstacle.body.setAllowGravity(false);
      }

      // Handle collision between player and obstacle
      this.physics.add.collider(player, obstacle, hitObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    }

    function hitObstacle(this: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
      this.physics.pause();
      player.setTint(0xff0000);
    }

    return () => {
      game.destroy(true);
    };
  }, [character]);

  return <div ref={gameRef}></div>;
};

export default Game;