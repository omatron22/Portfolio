import React, { useEffect, useRef, useState, useCallback } from 'react';
import Phaser from 'phaser';
import GameOver from './GameOver'; // Importing GameOver component
import HowToPlay from './HowToPlay'; // Import the HowToPlay component
import AudioManager from './AudioManager'; // Import the AudioManager component

interface GameProps {
  character: string;
  onCharacterSelect: () => void; // Add this prop to navigate back to character select
  onMainMenu: () => void; // Add this prop to navigate back to the main menu
}

const Game: React.FC<GameProps> = ({ character, onCharacterSelect, onMainMenu }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const isPausedRef = useRef(false);
  const highScoreRef = useRef(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    // Check if guide has already been shown in this session
    return sessionStorage.getItem('guideShown') !== 'true';
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  // Update the highScoreRef whenever highScore changes
  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  const handleGameOver = useCallback(() => {
    setGameOver(true);

    if (gameInstanceRef.current) {
      const currentScene = gameInstanceRef.current.scene.getScene('mainScene');

      if (currentScene) {
        currentScene.physics.world.pause();
        currentScene.scene.pause();
      }
    }
  }, []);

  // Function to handle starting the game after the guide
  const handleStartGame = () => {
    setShowGuide(false);
    sessionStorage.setItem('guideShown', 'true'); // Set guide as shown for this session
  };

  useEffect(() => {
    if (!gameRef.current || showGuide) return;

    // Ensure previous game instance is fully destroyed
    if (gameInstanceRef.current) {
      gameInstanceRef.current.destroy(true);
      gameInstanceRef.current = null;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 460,
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 533 }, // 800 * 0.6667 ≈ 533
          debug: false,
        },
      },
      scene: {
        key: 'mainScene',
        preload,
        create,
        update,
      },
      parent: gameRef.current,
    };

    gameInstanceRef.current = new Phaser.Game(config);

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [showGuide, character]);

  let player: Phaser.Physics.Arcade.Sprite | null = null;
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  let scoreText: Phaser.GameObjects.Text;
  let obstacles: Phaser.Physics.Arcade.Group;
  let score = 0;

  // Constants for scale and hitbox dimensions (adjusted)
  const scaleFactor = 0.3333; // Original 0.5 scaled by 0.6667
  const hitboxWidth = 213; // 320 * 0.6667
  const hitboxHeight = 193; // 290 * 0.6667
  const duckHitboxHeight = 147; // 220 * 0.6667

  // Ground height level (adjusted)
  const groundHeightLevel = 400; // Original 600 * 0.6667

  // Declare variables to store previous ducking state
  let isDuckingPrevious = false;

  function preload(this: Phaser.Scene) {
    // Determine character prefix based on selected character
    const characterPrefix =
      character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

    // Load common assets (original sizes)
    this.load.spritesheet('background', '/assets/background.png', {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 199, // Added endFrame to ensure correct number of frames
    });
    this.load.spritesheet('background2', '/assets/background2.png', {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 68,
    });
    this.load.spritesheet('chocolate', '/assets/choco.png', {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 3,
    });
    this.load.spritesheet('ball', '/assets/tennis-ball.png', {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 3,
    });
    this.load.spritesheet('bone', '/assets/bone.png', {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 3,
    });

    // Load character-specific assets
    this.load.image(`${characterPrefix}idle`, `/assets/${characterPrefix}-idle.png`);
    this.load.image(`${characterPrefix}duck_idle`, `/assets/${characterPrefix}-duck-idle.png`);

    this.load.spritesheet(`${characterPrefix}moving`, `/assets/${characterPrefix}-moving.png`, {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 7, // Adjusted to match the number of frames
    });
    this.load.spritesheet(`${characterPrefix}duck_moving`, `/assets/${characterPrefix}-duck-moving.png`, {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 1, // Adjusted to match the number of frames
    });
    this.load.spritesheet(`${characterPrefix}jump`, `/assets/${characterPrefix}-jump.png`, {
      frameWidth: 1200,
      frameHeight: 690,
      endFrame: 2, // Adjusted to match the number of frames
    });
  }

  function create(this: Phaser.Scene) {
    const characterPrefix =
      character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

    score = 0;
    setCurrentScore(0);

    // Create animations here to ensure they are ready before being played
    // Background animations
    this.anims.create({
      key: 'background_animation',
      frames: this.anims.generateFrameNumbers('background', { start: 0, end: 199 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'background2_animation',
      frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 68 }),
      frameRate: 8,
      repeat: -1,
    });

    // Player animations
    this.anims.create({
      key: `${characterPrefix}idle_animation`,
      frames: [{ key: `${characterPrefix}idle` }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: `${characterPrefix}duck_idle_animation`,
      frames: [{ key: `${characterPrefix}duck_idle` }],
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: `${characterPrefix}moving_animation`,
      frames: this.anims.generateFrameNumbers(`${characterPrefix}moving`, {
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: `${characterPrefix}jump_animation`,
      frames: this.anims.generateFrameNumbers(`${characterPrefix}jump`, { start: 0, end: 2 }),
      frameRate: 3,
      repeat: 0,
    });

    this.anims.create({
      key: `${characterPrefix}duck_moving_animation`,
      frames: this.anims.generateFrameNumbers(`${characterPrefix}duck_moving`, {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    // Obstacle animations
    this.anims.create({
      key: 'chocolate_animation',
      frames: this.anims.generateFrameNumbers('chocolate', { start: 0, end: 3 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'ball_animation',
      frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 3 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'bone_animation',
      frames: this.anims.generateFrameNumbers('bone', { start: 0, end: 3 }),
      frameRate: 2,
      repeat: -1,
    });

    // Set background sprite and add animation
    const background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(800, 460); // Adjusted size
    background.anims.play('background_animation');

    // Set second background sprite and add animation
    const background2 = this.add.sprite(0, 0, 'background2').setOrigin(0, 0);
    background2.setDisplaySize(800, 460); // Adjusted size
    background2.anims.play('background2_animation');

    // Set world bounds
    this.physics.world.setBounds(0, 0, 800, groundHeightLevel);

    // Create the player sprite and start with idle animation
    player = this.physics.add.sprite(100, groundHeightLevel - 50, `${characterPrefix}idle`);
    player.setBounce(0.1).setCollideWorldBounds(true);
    player.setScale(scaleFactor);
    player.setOrigin(0.5, 1);
    (player.body as Phaser.Physics.Arcade.Body).setSize(hitboxWidth, hitboxHeight);
    player.anims.play(`${characterPrefix}idle_animation`);

    // Input handling for player movement
    cursors = this.input.keyboard?.createCursorKeys() ?? null;

    // Display score on the screen
    scoreText = this.add
      .text(11, 11, '0', {
        fontSize: '24px', // 36 * 0.6667
        color: '#fff',
        fontFamily: 'VT323, monospace',
        fixedWidth: 133, // 200 * 0.6667
      })
      .setScrollFactor(0)
      .setStroke('#000', 2.7); // 4 * 0.6667

    // Create obstacle group
    obstacles = this.physics.add.group({
      maxSize: 10,
    });

    // Add collider for player and obstacles
    this.physics.add.collider(player, obstacles, (player, obstacle) => {
      const obs = obstacle as Phaser.Physics.Arcade.Sprite;

      if (obs.texture.key === 'chocolate') {
        handleGameOver();
      } else {
        // Collectible obstacles: bone and ball
        score += 10;
        setCurrentScore(score);
        scoreText.setText(`${score}`);
        obs.destroy();

        // Update high score if current score is greater
        if (score > highScoreRef.current) {
          setHighScore(score);
          localStorage.setItem('highScore', score.toString());
        }
      }
    });

    // Spawning logic for obstacles
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        if (gameOver) return; // Stop spawning when game is over

        const randomY = Phaser.Math.Between(groundHeightLevel - 120, groundHeightLevel - 30);
        const obstacleType = Phaser.Math.RND.pick([
          'chocolate',
          'chocolate',
          'chocolate',
          'bone',
          'ball',
        ]);

        const obstacle = obstacles.get(800, randomY, obstacleType);
        if (obstacle) {
          obstacle.setActive(true);
          obstacle.setVisible(true);
          obstacle.setVelocityX(-133); // 200 * 0.6667
          obstacle.body.enable = true;
          obstacle.setScale(0.073); // 0.11 * 0.6667
          const body = obstacle.body as Phaser.Physics.Arcade.Body;
          body.setCircle(167); // 250 * 0.6667
          body.setOffset(450, 200); // 350 * 0.6667, 75 * 0.6667
          obstacle.body.setAllowGravity(false);

          obstacle.anims.play(`${obstacleType}_animation`, true);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  function update(this: Phaser.Scene) {
    if (isPausedRef.current || gameOver) {
      return;
    }
    if (!player || !cursors) return;

    const characterPrefix =
      character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

    player.setVelocityX(0);
    const isOnGround = player.body?.blocked.down;
    const isDownPressed = cursors.down?.isDown;
    const isLeftPressed = cursors.left?.isDown;
    const isRightPressed = cursors.right?.isDown;
    const isUpPressed = cursors.up?.isDown;

    let isDucking = false;
    let isMoving = false;

    // Jump logic
    if (isUpPressed && isOnGround) {
      player.setVelocityY(-400); // 600 * 0.6667
      player.anims.play(`${characterPrefix}jump_animation`, true);
    }

    // Movement logic
    if (isLeftPressed) {
      player.setVelocityX(-133); // 200 * 0.6667
      isMoving = true;
    } else if (isRightPressed) {
      player.setVelocityX(133); // 200 * 0.6667
      isMoving = true;
    }

    // Ducking logic
    if (isDownPressed && isOnGround) {
      isDucking = true;
    }

    // Adjust the hitbox size when ducking
    const body = player.body as Phaser.Physics.Arcade.Body;
    if (isDucking && !isDuckingPrevious) {
      const deltaHeight = (hitboxHeight - duckHitboxHeight) * scaleFactor;
      body.setSize(hitboxWidth, duckHitboxHeight);
      player.y += deltaHeight / 2;
      isDuckingPrevious = true;
    } else if (!isDucking && isDuckingPrevious) {
      const deltaHeight = (hitboxHeight - duckHitboxHeight) * scaleFactor;
      body.setSize(hitboxWidth, hitboxHeight);
      player.y -= deltaHeight / 2;
      isDuckingPrevious = false;
    }

    // Animation logic
    if (isDucking && isMoving) {
      if (player.anims.currentAnim?.key !== `${characterPrefix}duck_moving_animation`) {
        player.anims.play(`${characterPrefix}duck_moving_animation`, true);
      }
    } else if (isDucking) {
      if (player.anims.currentAnim?.key !== `${characterPrefix}duck_idle_animation`) {
        player.anims.play(`${characterPrefix}duck_idle_animation`, true);
      }
    } else if (isMoving) {
      if (
        player.anims.currentAnim?.key !== `${characterPrefix}moving_animation` &&
        player.anims.currentAnim?.key !== `${characterPrefix}jump_animation`
      ) {
        player.anims.play(`${characterPrefix}moving_animation`, true);
      }
    } else {
      if (
        player.anims.currentAnim?.key !== `${characterPrefix}idle_animation` &&
        player.anims.currentAnim?.key !== `${characterPrefix}jump_animation`
      ) {
        player.anims.play(`${characterPrefix}idle_animation`, true);
      }
    }

    // Reset to idle or moving animation after jump animation finishes
    if (
      isOnGround &&
      player.anims.currentAnim?.key === `${characterPrefix}jump_animation` &&
      !player.anims.isPlaying
    ) {
      if (isMoving) {
        player.anims.play(`${characterPrefix}moving_animation`, true);
      } else {
        player.anims.play(`${characterPrefix}idle_animation`, true);
      }
    }

    // Cleanup obstacles
    obstacles.children.iterate((obstacle: Phaser.GameObjects.GameObject) => {
      const obs = obstacle as Phaser.Physics.Arcade.Sprite;

      if (obs.body && (obs.x < -50 || !obs.body.enable)) {
        obstacles.killAndHide(obs);
        obs.body.enable = false;
      }

      return true;
    });
  }

  const togglePause = () => {
    setIsPaused((prev) => {
      if (prev) {
        gameInstanceRef.current?.scene.resume('mainScene');
      } else {
        gameInstanceRef.current?.scene.pause('mainScene');
      }
      isPausedRef.current = !prev;
      return !prev;
    });
  };

  const handleRestart = () => {
    setGameOver(false);
    setCurrentScore(0);

    if (gameInstanceRef.current) {
      const currentScene = gameInstanceRef.current.scene.getScene('mainScene');

      if (currentScene) {
        currentScene.scene.restart();
        currentScene.physics.world.resume();
      }
    }
  };

  return (
    <div
    className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden"
    >
      {/* Show the HowToPlay screen before starting the game */}
      {showGuide ? (
        <HowToPlay onClose={handleStartGame} />
      ) : (
        <>
          {/* Top-right control buttons */}
          <div
            style={{
              position: 'absolute',
              top: '6.7px', // 10 * 0.6667
              right: '60px', // 90 * 0.6667
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '20px', // 30 * 0.6667
            }}
          >
            {/* Pause Button */}
            <img
              src={isPaused ? '/assets/play-button.png' : '/assets/pause-button.png'}
              onClick={togglePause}
              alt={isPaused ? 'Play' : 'Pause'}
              style={{
                cursor: 'pointer',
                width: '33px', // 50 * 0.6667
                height: '33px', // 50 * 0.6667
              }}
            />
          </div>

          {/* Game container (only rendered after guide is dismissed) */}
          <div ref={gameRef} style={{ width: '100%', height: '100%' }}></div>

          {/* Game Over screen */}
          {gameOver && (
            <GameOver
              currentScore={currentScore}
              highScore={highScore}
              handleRestart={handleRestart}
              onCharacterSelect={onCharacterSelect}
              onMainMenu={onMainMenu}
            />
          )}
          <AudioManager currentScreen="game" />
        </>
      )}
    </div>
  );
};

export default Game;
