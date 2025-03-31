import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import PuzzleAnimation from '../UI/PuzzleAnimation';

interface StartScreenProps {
  onStartTest: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartTest }) => {
  const [counter, setCounter] = useState(14382);
  
  // Имитация увеличения счетчика для психологического эффекта
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        // Случайным образом увеличиваем счетчик
        if (Math.random() > 0.7) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="start-screen-container fade-in">
      <PuzzleAnimation />
      
      <h2>Какая кинозвезда станет твоим идеальным партнером?</h2>
      
      <div className="song-quote-container glass-card">
        <p className="song-quote-text">
          "Мы с тобой два пазла из разных коробок, края не совпадают, но узор один. Ты - загадка, я - ответ невпопад, вместе мы - ребус, что хочется разгадать."
        </p>
        <p className="song-quote-source">— из песни "Пазлы"</p>
        
        <a 
          href="https://music.yandex.ru/album/35714443/track/136874790" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="song-link"
        >
          🎧 Послушать песню
        </a>
      </div>
      
      <p className="description">
        Пройди тест и узнай, какая голливудская звезда идеально подходит именно тебе. Раскрой секрет своей идеальной пары!
      </p>
      
      <Button onClick={onStartTest} className="start-button">
        Начать тест
      </Button>
      
      <div className="stats-counter">
        {counter.toLocaleString()} человека прошли тест
      </div>
    </div>
  );
};

export default StartScreen;
