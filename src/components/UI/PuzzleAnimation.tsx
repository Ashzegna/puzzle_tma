import React from 'react';

const PuzzleAnimation: React.FC = () => {
  return (
    <div className="puzzle-animation-container">
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Первая часть пазла - анимированная */}
        <g className="puzzle-piece puzzle-piece-1">
          <path 
            d="M50 50H87.5C87.5 42.5 95 42.5 95 50C95 57.5 102.5 57.5 102.5 50V25H50V50Z" 
            fill="#f59e0b" 
            fillOpacity="0.7"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M25 50V87.5C17.5 87.5 17.5 95 25 95C32.5 95 32.5 102.5 25 102.5H0V50H25Z" 
            fill="#f59e0b" 
            fillOpacity="0.7"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M50 102.5H87.5C87.5 110 95 110 95 102.5C95 95 102.5 95 102.5 102.5V125H50V102.5Z" 
            fill="#f59e0b" 
            fillOpacity="0.7"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M25 102.5V87.5C17.5 87.5 17.5 80 25 80C32.5 80 32.5 72.5 25 72.5H0V102.5H25Z" 
            fill="#f59e0b" 
            fillOpacity="0.7"
            stroke="white" 
            strokeWidth="2"
          />
        </g>

        {/* Вторая часть пазла - анимированная в другую сторону */}
        <g className="puzzle-piece puzzle-piece-2">
          <path 
            d="M125 50H162.5C162.5 42.5 170 42.5 170 50C170 57.5 177.5 57.5 177.5 50V25H125V50Z" 
            fill="#2d3748" 
            fillOpacity="0.8"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M100 50V87.5C92.5 87.5 92.5 95 100 95C107.5 95 107.5 102.5 100 102.5H75V50H100Z" 
            fill="#2d3748" 
            fillOpacity="0.8"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M125 102.5H162.5C162.5 110 170 110 170 102.5C170 95 177.5 95 177.5 102.5V125H125V102.5Z" 
            fill="#2d3748" 
            fillOpacity="0.8"
            stroke="white" 
            strokeWidth="2"
          />
          <path 
            d="M100 102.5V87.5C92.5 87.5 92.5 80 100 80C107.5 80 107.5 72.5 100 72.5H75V102.5H100Z" 
            fill="#2d3748" 
            fillOpacity="0.8"
            stroke="white" 
            strokeWidth="2"
          />
        </g>

        {/* Искрящиеся эффекты */}
        <circle className="sparkle sparkle-1" cx="50" cy="50" r="2" fill="white" />
        <circle className="sparkle sparkle-2" cx="150" cy="70" r="2" fill="white" />
        <circle className="sparkle sparkle-3" cx="80" cy="130" r="2" fill="white" />
        <circle className="sparkle sparkle-4" cx="170" cy="120" r="2" fill="white" />
      </svg>
    </div>
  );
};

export default PuzzleAnimation;
