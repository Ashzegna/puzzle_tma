import React from 'react';
import { Question as QuestionType, Option } from '../../types';
import Button from '../UI/Button';
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
  return (
    <div className="question-container card fade-in">
      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
      
      <h2 className="question-title">
        {question.emoji} {question.text}
      </h2>
      
      <div className="options-list">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption?.id === option.id ? 'selected' : ''}`}
            onClick={() => onSelectOption(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
      
      <Button 
        onClick={onNext} 
        disabled={!selectedOption}
        className="next-button"
      >
        {currentQuestion < totalQuestions - 1 ? 'Следующий вопрос' : 'Узнать результат'}
      </Button>
    </div>
  );
};

export default Question;
