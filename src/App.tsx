import React from 'react';
import { useTest } from './hooks/useTest';
import Question from './components/Test/Question';
import Result from './components/Test/Result';

const App: React.FC = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedOption,
    isTestCompleted,
    testResult,
    compatibility,
    handleOptionSelect,
    handleNextQuestion,
    restartTest,
    shareResult
  } = useTest();

  return (
    <div className="container">
      <header className="app-header">
        <h1>Твоя скрытая сверхспособность</h1>
      </header>
      
      <main className="app-content">
        {!isTestCompleted ? (
          <Question 
            question={currentQuestion} 
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
            onNext={handleNextQuestion}
            currentQuestion={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        ) : (
          testResult && (
            <Result 
              result={testResult}
              compatibility={compatibility}
              onRestart={restartTest}
              onShare={shareResult}
            />
          )
        )}
      </main>
      
      <footer className="app-footer">
        <p>Песня "Пазлы" &copy; 2023-2025</p>
      </footer>
    </div>
  );
};

export default App;
