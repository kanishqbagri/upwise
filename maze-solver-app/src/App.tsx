import React, { useState, useEffect, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';

interface Position {
  x: number;
  y: number;
}

interface MazeCell {
  isWall: boolean;
  isVisited: boolean;
}

const MAZE_SIZE = 15;
const CELL_SIZE = 30;

const MazeSolver: React.FC = () => {
  const theme = useTheme();
  const [maze, setMaze] = useState<MazeCell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
  const [exitPos] = useState<Position>({ x: MAZE_SIZE - 2, y: MAZE_SIZE - 2 });
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Generate maze using recursive backtracking
  const generateMaze = useCallback(() => {
    const newMaze: MazeCell[][] = Array(MAZE_SIZE).fill(null).map(() =>
      Array(MAZE_SIZE).fill(null).map(() => ({ isWall: true, isVisited: false }))
    );

    const stack: Position[] = [];
    const start: Position = { x: 1, y: 1 };
    
    newMaze[start.y][start.x] = { isWall: false, isVisited: true };
    stack.push(start);

    const directions = [
      { dx: 0, dy: -2 }, // up
      { dx: 2, dy: 0 },  // right
      { dx: 0, dy: 2 },  // down
      { dx: -2, dy: 0 }  // left
    ];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const unvisitedNeighbors: Position[] = [];

      directions.forEach(({ dx, dy }) => {
        const nx = current.x + dx;
        const ny = current.y + dy;
        
        if (nx > 0 && nx < MAZE_SIZE - 1 && ny > 0 && ny < MAZE_SIZE - 1 && 
            newMaze[ny][nx].isWall) {
          unvisitedNeighbors.push({ x: nx, y: ny });
        }
      });

      if (unvisitedNeighbors.length > 0) {
        const next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        const wallX = current.x + (next.x - current.x) / 2;
        const wallY = current.y + (next.y - current.y) / 2;
        
        newMaze[wallY][wallX] = { isWall: false, isVisited: false };
        newMaze[next.y][next.x] = { isWall: false, isVisited: false };
        
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    // Ensure exit is accessible
    newMaze[exitPos.y][exitPos.x] = { isWall: false, isVisited: false };
    newMaze[exitPos.y - 1][exitPos.x] = { isWall: false, isVisited: false };
    newMaze[exitPos.y][exitPos.x - 1] = { isWall: false, isVisited: false };

    return newMaze;
  }, [exitPos]);

  // Initialize maze
  useEffect(() => {
    setMaze(generateMaze());
    setPlayerPos({ x: 1, y: 1 });
    setIsComplete(false);
    setShowCelebration(false);
  }, [generateMaze]);

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isComplete) return;

      const newPos = { ...playerPos };
      let moved = false;
      
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newPos.y = Math.max(0, newPos.y - 1);
          moved = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newPos.y = Math.min(MAZE_SIZE - 1, newPos.y + 1);
          moved = true;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newPos.x = Math.max(0, newPos.x - 1);
          moved = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newPos.x = Math.min(MAZE_SIZE - 1, newPos.x + 1);
          moved = true;
          break;
        default:
          return;
      }

      // Prevent default browser behavior for arrow keys
      if (moved) {
        event.preventDefault();
      }

      // Check if move is valid (not a wall)
      if (!maze[newPos.y]?.[newPos.x]?.isWall) {
        setPlayerPos(newPos);
        
        // Check if reached exit
        if (newPos.x === exitPos.x && newPos.y === exitPos.y) {
          setIsComplete(true);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, maze, exitPos, isComplete]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Maze Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MAZE_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${MAZE_SIZE}, ${CELL_SIZE}px)`,
          gap: 0,
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <Box
              key={`${x}-${y}`}
              sx={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell.isWall 
                  ? theme.palette.grey[800] 
                  : theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Player */}
              {playerPos.x === x && playerPos.y === y && (
                <Box
                  sx={{
                    width: CELL_SIZE * 0.6,
                    height: CELL_SIZE * 0.6,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20%',
                      height: '20%',
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: '50%',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '10%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '20%',
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: '50% 50% 0 0',
                    },
                  }}
                />
              )}
              
              {/* Exit */}
              {exitPos.x === x && exitPos.y === y && (
                <Box
                  sx={{
                    width: CELL_SIZE * 0.8,
                    height: CELL_SIZE * 0.8,
                    backgroundColor: theme.palette.success.main,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: CELL_SIZE * 0.4,
                    color: theme.palette.success.contrastText,
                    fontWeight: 'bold',
                  }}
                >
                  🚪
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>

      {/* Celebration Effect */}
      {showCelebration && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                fontSize: '2rem',
                animation: `celebrate ${2}s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
                '@keyframes celebrate': {
                  '0%': {
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(1)`,
                    opacity: 0,
                  },
                },
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫'][i % 5]}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MazeSolver;
