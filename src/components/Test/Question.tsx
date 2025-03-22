import React from 'react';
import { Question as QuestionType, Option } from '../../types';
import PuzzleProgressBar from '../UI/PuzzleProgressBar';
import Button from '../UI/Button';

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
  // Функция для обработки клика по опции
  const handleOptionClick = (option: Option) => {
    onSelectOption(option);
  };

  return (
    <div className="question-container card glass-card fade-in">
      <PuzzleProgressBar current={currentQuestion + 1} total={totalQuestions} />
      
      <h2 className="question-title">
        {question.emoji} {question.text}
      </h2>
      
      <div className="options-list">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`option option-ios ${selectedOption?.id === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            <span className="option-emoji">{option.text.split(' ')[0]}</span>
            <span>{option.text.substring(option.text.indexOf(' '))}</span>
          </div>
        ))}
      </div>
      
      <div className="question-actions">
        <Button 
          onClick={onNext}
          disabled={!selectedOption}
          className="next-button"
        >
          Следующий вопрос
        </Button>
      </div>
    </div>
  );
};

export default Question;
      <h2 className="question-title">
        {question.emoji} {question.text}
      </h2>
      
      <div className="options-list">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption?.id === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
      
      <div className="question-actions">
        <Button 
          onClick={onNext}
          disabled={!selectedOption}
          className="next-button"
        >
          Следующий вопрос
        </Button>
      </div>
    </div>
  );
};

export default Question;
