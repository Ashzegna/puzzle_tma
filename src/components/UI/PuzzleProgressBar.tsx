import React from 'react';

interface PuzzleProgressBarProps {
  current: number;
  total: number;
}

const PuzzleProgressBar: React.FC<PuzzleProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  // Создаем массив частей пазла для визуализации прогресса
  const puzzlePieces = Array.from({ length: total }, (_, index) => ({
    id: index,
    isCompleted: index < current
  }));

  return (
    <div className="puzzle-progress-container">
      <div className="puzzle-progress-text">
        Вопрос {current} из {total}
      </div>
      
      <div className="puzzle-pieces-container">
        {puzzlePieces.map((piece) => (
          <div 
            key={piece.id}
            className={`puzzle-piece ${piece.isCompleted ? 'completed' : ''}`}
            style={{
              width: `${90 / total}%`,
              transition: 'all 0.5s ease'
            }}
          >
            <svg 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 5H32.5C32.5 0 37.5 0 37.5 5C37.5 10 42.5 10 42.5 5V-10H5V5Z" 
                transform="translate(-2.5, 20) rotate(-90)"
                fill={piece.isCompleted ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)'}
                stroke={piece.isCompleted ? 'white' : 'rgba(255,255,255,0.3)'}
                strokeWidth="1"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleProgressBar;
