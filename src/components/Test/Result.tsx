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
  // Добавляем эффект для анимации появления результата
  useEffect(() => {
    // Имитация эффекта конфетти с помощью DOM
    const container = document.querySelector('.result-container');
    if (container) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0';
        particle.style.transform = `translateY(${Math.random() * 100}px)`;
        
        container.appendChild(particle);
        
        // Анимируем частицы
        setTimeout(() => {
          particle.style.transition = 'all 1s ease-out';
          particle.style.opacity = '1';
          particle.style.transform = `translateY(${-Math.random() * 100}px)`;
          
          // Удаляем частицы после анимации
          setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => {
              particle.remove();
            }, 1000);
          }, 1000);
        }, Math.random() * 500);
      }
    }
  }, []);

  return (
    <div className="result-container">
      <div className="result-card card fade-in">
        <div className="result-header">
          <div className="result-icon float-animation">{result.emoji}</div>
          <h1 className="result-title glow-animation">{result.name}</h1>
        </div>
        
        <p className="result-description">{result.description}</p>
        
        <div className="result-examples">
          <h3>В чём это проявляется:</h3>
          <p>{result.examples}</p>
        </div>
        
        <div className="result-song">
          <h3>Твоя строчка из песни:</h3>
          <p className="song-quote pulse-animation">{result.songLine}</p>
          <a 
            href={result.songUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="song-link"
            style={{ color: 'var(--accent-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}
          >
            🎧 Послушать песню "Пазлы"
          </a>
        </div>
      </div>
      
      {compatibility && (
        <div className="compatibility-card card fade-in">
          <h2>Совместимость</h2>
          <p className="compatibility-emoji pulse-animation">{compatibility.emojis}</p>
          <div className="compatibility-stars">
            {"⭐".repeat(compatibility.compatibilityLevel)}
          </div>
          <p className="compatibility-text">{compatibility.compatibilityText}</p>
          <p className="song-quote">{compatibility.songLine}</p>
        </div>
      )}
      
      <div className="result-actions">
        <Button onClick={onRestart} className="restart-button">
          Пройти ещё раз
        </Button>
        <Button onClick={onShare} className="share-button">
          Поделиться результатом
        </Button>
      </div>
    </div>
  );
};

export default Result;
