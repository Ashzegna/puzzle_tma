import React, { useState } from 'react';
import { Question as QuestionType, Option } from '../../types';
import ProgressBar from '../UI/ProgressBar';

interface QuestionProps {
  question: QuestionType;
  selectedOption: Option | null;
  onSelectOption: (option: Option) => void;
  onNext: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onSelectOption,
  onNext,
  currentQuestion,
  totalQuestions
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Функция для обработки клика по опции
  const handleOptionClick = (option: Option) => {
    if (isTransitioning) return; // Предотвращаем множественные нажатия во время перехода
    
    setIsTransitioning(true);
    onSelectOption(option);
    
    // Добавляем небольшую задержку для визуальной обратной связи
    setTimeout(() => {
      onNext();
      setIsTransitioning(false);
    }, 400); // Чуть увеличил задержку для лучшей видимости выбора
  };

  return (
    <div className={`question-container card fade-in ${isTransitioning ? 'question-transitioning' : ''}`}>
      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
      
      <h2 className="question-title">
        {question.emoji} {question.text}
      </h2>
      
      <div className="options-list">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption?.id === option.id ? 'selected' : ''} ${isTransitioning ? 'option-disabled' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
