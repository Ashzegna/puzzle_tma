import React, { useEffect } from 'react';
import { TestResult, Compatibility } from '../../types';
import Button from '../UI/Button';

interface ResultProps {
  result: TestResult;
  compatibility: Compatibility | null;
  onRestart: () => void;
  onShare: () => void;
}

const Result: React.FC<ResultProps> = ({
  result,
  compatibility,
  onRestart,
  onShare
}) => {
  return (
    <div className="result-container">
      <div className="result-card card fade-in">
        <div className="result-header">
          <div className="result-emoji">{result.emoji}</div>
          <h1 className="result-title">{result.name}</h1>
        </div>
        
        <p className="result-description">{result.description}</p>
        
        <div className="result-examples">
          <h3>В чём это проявляется:</h3>
          <p>{result.examples}</p>
        </div>
        
        <div className="result-song">
          <h3>Твоя строчка из песни:</h3>
          <p className="song-line">{result.songLine}</p>
          <a 
            href={result.songUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="song-link"
          >
            🎧 Послушать песню
          </a>
        </div>
      </div>
      
      {compatibility && (
        <div className="compatibility-card card fade-in">
          <h2>Совместимость</h2>
          <p className="compatibility-emoji">{compatibility.emojis}</p>
          <div className="compatibility-stars">
            {"⭐".repeat(compatibility.compatibilityLevel)}
          </div>
          <p className="compatibility-text">{compatibility.compatibilityText}</p>
          <p className="compatibility-song">{compatibility.songLine}</p>
        </div>
      )}
      
      <div className="result-actions">
        <Button onClick={onRestart} className="restart-button">
          Пройти ещё раз
        </Button>
        <Button onClick={onShare} className="share-button">
          Поделиться
        </Button>
      </div>
    </div>
  );
};

export default Result;
