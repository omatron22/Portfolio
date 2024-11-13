import React, { useEffect, useRef, useState, useCallback } from 'react';
import Phaser from 'phaser';
import GameOver from './GameOver'; // Importing GameOver component
import HowToPlay from './HowToPlay'; // Import the HowToPlay component

interface GameProps {
  character: string;
  onCharacterSelect: () => void; // Add this prop to navigate back to character select
}

const Game: React.FC<GameProps> = ({ character, onCharacterSelect }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const isPausedRef = useRef(false);
  const isMusicOnRef = useRef(true);
  const highScoreRef = useRef(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    // Show the guide if it hasn't been dismissed before
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
    if (gameInstanceRef.current) {
      gameInstanceRef.current.destroy(true);
      gameInstanceRef.current = null;
    }
    setShowGuide(false);
    sessionStorage.setItem('guideShown', 'true');
    setIsInitialized(false);
  };
  

  useEffect(() => {
    if (!gameRef.current || showGuide || isInitialized) return;

    // Ensure previous game instance is fully destroyed
    if (gameInstanceRef.current) {
      gameInstanceRef.current.destroy(true);
      gameInstanceRef.current = null;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1200,
      height: 690,
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 800 },
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

    let player: Phaser.Physics.Arcade.Sprite | null = null;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
    let scoreText: Phaser.GameObjects.Text;
    let backgroundMusic: Phaser.Sound.BaseSound;
    let obstacles: Phaser.Physics.Arcade.Group;
    let score = 0;

    // Constants for scale and hitbox dimensions
    const scaleFactor = 0.5;
    const hitboxWidth = 320;
    const hitboxHeight = 290;
    const duckHitboxHeight = 220;

    // Ground height level
    const groundHeightLevel = 600;

    // Declare variables to store original player Y position and previous ducking state
    let isDuckingPrevious = false;

    function preload(this: Phaser.Scene) {
      // Determine character prefix based on selected character
      const characterPrefix = character === 'birthday' ? 'birthday' :
      character === 'jeans' ? 'jeans' :
      character === 'og' ? 'og' : '';

      // Load common assets
      this.load.spritesheet('background', '/assets/background.png', { frameWidth: 1200, frameHeight: 690 });
      this.load.spritesheet('background2', '/assets/background2.png', { frameWidth: 1200, frameHeight: 690 });
      this.load.spritesheet('chocolate', '/assets/choco.png', { frameWidth: 1200, frameHeight: 690 });
      this.load.spritesheet('ball', '/assets/tennis-ball.png', { frameWidth: 1200, frameHeight: 690 });
      this.load.spritesheet('bone', '/assets/bone.png', { frameWidth: 1200, frameHeight: 690 });
      this.load.audio('jump', '/assets/jump.mp3');
      this.load.audio('backgroundMusic', '/assets/backgroundMusic.mp3');
    
      // Load character-specific assets
      this.load.image(`${characterPrefix}idle`, `/assets/${characterPrefix}-idle.png`);
      this.load.spritesheet(`${characterPrefix}moving`, `/assets/${characterPrefix}-moving.png`, {
        frameWidth: 1200,
        frameHeight: 690,
      });
      this.load.spritesheet(`${characterPrefix}jump`, `/assets/${characterPrefix}-jump.png`, {
        frameWidth: 1200,
        frameHeight: 690,
      });
      this.load.image(`${characterPrefix}duck_idle`, `/assets/${characterPrefix}-duck-idle.png`);
      this.load.spritesheet(`${characterPrefix}duck_moving`, `/assets/${characterPrefix}-duck-moving.png`, {
        frameWidth: 1200,
        frameHeight: 690,
      });
    }
    

    function create(this: Phaser.Scene) {
      const characterPrefix = character === 'birthday' ? 'birthday' :
      character === 'jeans' ? 'jeans' :
      character === 'og' ? 'og' : '';

      score = 0;
      setCurrentScore(0);

      // Set background sprite and add animation
      const background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
      this.anims.create({
        key: 'background_animation',
        frames: this.anims.generateFrameNumbers('background', { start: 0, end: 199 }),
        frameRate: 8,
        repeat: -1,
      });
      background.play('background_animation');

      // Set second background sprite and add animation
      const background2 = this.add.sprite(0, 0, 'background2').setOrigin(0, 0);
      this.anims.create({
        key: 'background2_animation',
        frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 68 }),
        frameRate: 8,
        repeat: -1,
      });
      background2.play('background2_animation');

      // Play background music
      backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
      if (isMusicOnRef.current) {
        backgroundMusic.play();
      }

      this.anims.create({ key: `${characterPrefix}idle_animation`, frames: [{ key: `${characterPrefix}idle` }], frameRate: 1, repeat: -1 });

      this.anims.create({ key: `${characterPrefix}duck_idle_animation`, frames: [{ key: `${characterPrefix}duck_idle` }], frameRate: 1, repeat: -1 });


      this.anims.create({
        key: `${characterPrefix}moving_animation`,
        frames: this.anims.generateFrameNumbers(`${characterPrefix}moving`, { start: 0, end: 7 }),
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
        frames: this.anims.generateFrameNumbers(`${characterPrefix}duck_moving`, { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1,
      });

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

      // Set world bounds
      this.physics.world.setBounds(0, 0, 1200, groundHeightLevel);

      // Create the player sprite and start with idle animation
      player = this.physics.add.sprite(150, groundHeightLevel - 50, `${characterPrefix}idle`);
      player.setBounce(0.1).setCollideWorldBounds(true);
      player.setScale(scaleFactor);
      player.setOrigin(0.5, 1);
      (player.body as Phaser.Physics.Arcade.Body).setSize(hitboxWidth, hitboxHeight);
      player.anims.play(`${characterPrefix}idle_animation`);

      // Input handling for player movement
      cursors = this.input.keyboard?.createCursorKeys() ?? null;

// Display score on the screen
scoreText = this.add.text(16, 16, '0', {
  fontSize: '36px', // Increased the font size for better readability
  color: '#fff',
  fontFamily: 'VT323, monospace', // Updated font for a retro look
  fixedWidth: 200,
}).setScrollFactor(0)
  .setStroke('#000', 4); // Add black outline with thickness of 4 pixels



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

          const randomY = Phaser.Math.Between(groundHeightLevel - 200, groundHeightLevel - 30);
          const obstacleType = Phaser.Math.RND.pick([
            'chocolate', 'chocolate', 'chocolate',
            'bone', 'ball',
          ]);

          const obstacle = obstacles.get(1200, randomY, obstacleType);
          if (obstacle) {
            obstacle.setActive(true);
            obstacle.setVisible(true);
            obstacle.setVelocityX(-200);
            obstacle.body.enable = true;
            obstacle.setScale(0.11);
            const body = obstacle.body as Phaser.Physics.Arcade.Body;
            body.setCircle(250);
            body.setOffset(350, 75);
            obstacle.body.setAllowGravity(false);

            switch (obstacleType) {
              case 'chocolate':
                obstacle.play('chocolate_animation');
                break;
              case 'bone':
                obstacle.play('bone_animation');
                break;
              case 'ball':
                obstacle.play('ball_animation');
                break;
            }
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
    
      const characterPrefix = character === 'birthday' ? 'birthday' :
      character === 'jeans' ? 'jeans' :
      character === 'og' ? 'og' : '';

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
        player.setVelocityY(-600);
        this.sound.play('jump');
        player.anims.play(`${characterPrefix}jump_animation`, true);
      }
    
      // Movement logic
      if (isLeftPressed) {
        player.setVelocityX(-200);
        isMoving = true;
      } else if (isRightPressed) {
        player.setVelocityX(200);
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
    

    return () => {
      gameInstanceRef.current?.destroy(true);
      gameInstanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, handleGameOver]);

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

  const toggleMusic = () => {
    setIsMusicOn((prev) => {
      if (prev) {
        gameInstanceRef.current?.sound.stopAll();
      } else {
        gameInstanceRef.current?.sound.play('backgroundMusic');
      }
      isMusicOnRef.current = !prev;
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
      style={{
        position: 'relative',
        width: '1200px',
        height: '690px',
        margin: '0 auto',
        border: '2px solid #ccc',
        backgroundColor: 'transparent',
      }}
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
              top: '10px',
              right: '10px',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <img
              src={isMusicOn ? '/assets/sound-on.png' : '/assets/sound-off.png'}
              onClick={toggleMusic}
              alt={isMusicOn ? 'Sound On' : 'Sound Off'}
              style={{ cursor: 'pointer', width: '50px', height: '50px' }}
            />
            <img
              src={isPaused ? '/assets/play-button.png' : '/assets/pause-button.png'}
              onClick={togglePause}
              alt={isPaused ? 'Play' : 'Pause'}
              style={{ cursor: 'pointer', width: '50px', height: '50px' }}
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
            />
          )}
        </>
      )}
    </div>
  );
  
  
};

export default Game;