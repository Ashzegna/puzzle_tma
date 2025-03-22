import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-text">
        Вопрос {current} из {total}
      </div>
      <div 
        className="progress-bar" 
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginTop: '8px'
        }}
      >
        <div 
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
