import React, { useState, useEffect, useRef } from 'react';
import ApplicationBackground from '@src/components/card/app-background.component';
import '@src/styles/main.css';

export default function HomePage() {
  return (
    <ApplicationBackground>
      <SnakeGame />
    </ApplicationBackground>
  );
}

export const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false); // New state for pause/play
  const gridSize = 20; // Size of each grid cell
  const boardWidth = 35; // Number of cells in width
  const boardHeight = 32; // Number of cells in height;

  // Place initial food
  useEffect(() => {
    placeFood();
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver || paused) return; // Check if game is over or paused

    const interval = setInterval(() => {
      updateSnake();
    }, 200); // Snake speed

    return () => clearInterval(interval);
  }, [snake, direction, gameOver, paused]); // Added 'paused' to dependencies

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case 'r': // Reset the game on pressing 'r'
          resetGame();
          break;
        case ' ': // Toggle pause/play on pressing space bar
          setPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  const placeFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * boardWidth),
        y: Math.floor(Math.random() * boardHeight),
      };
    } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));

    setFood(newFood);
  };

  const updateSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (isCollision(head)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      placeFood(); // Place new food if eaten
    } else {
      newSnake.pop(); // Remove the tail unless eating food
    }

    setSnake(newSnake);
  };

  const isCollision = (head) => {
    return (
      head.x < 0 ||
      head.x >= boardWidth ||
      head.y < 0 ||
      head.y >= boardHeight ||
      snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y)
    );
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]); // Center the snake when resetting
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setPaused(false); // Unpause the game when resetting
    placeFood();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[700px] h-[647px] border border-gray-600">
        {Array.from({ length: boardHeight }, (_, y) =>
          Array.from({ length: boardWidth }, (_, x) => {
            const isSnakeBody = snake.some((seg) => seg.x === x && seg.y === y);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            return (
              <div
                key={`${x}-${y}`}
                className={`absolute w-[20px] h-[20px] transition-all duration-150 ease-in-out
                  ${
                    isSnakeHead
                      ? 'bg-yellow-500'
                      : isSnakeBody
                      ? 'bg-green-500'
                      : ''
                  }`}
                style={{
                  left: `${x * gridSize}px`,
                  top: `${y * gridSize}px`,
                  borderRadius: isSnakeHead ? '10px' : '3px', // More rounded head
                  zIndex: isSnakeHead ? 2 : 1, // Ensure head is above the body
                }}
              >
                {food.x === x && food.y === y && (
                  <span style={{ fontSize: '20px', lineHeight: '20px' }}>
                    🍏 {/* Apple emoji for food */}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
      {gameOver && (
        <div className="mt-4 text-red-500">
          Game Over! Press 'R' to restart.
        </div>
      )}
      {paused && (
        <div className="mt-4 text-yellow-500">
          Game Paused! Press Space to continue.
        </div>
      )}
      <div className="mt-2 text-lg">Score: {snake.length - 1}</div>
    </div>
  );
};
