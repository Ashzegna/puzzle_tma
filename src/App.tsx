import React, { useState } from 'react';
import { useTest } from './hooks/useTest';
import Question from './components/Test/Question';
import Result from './components/Test/Result';
import StartScreen from './components/Test/StartScreen';

// Правильное имя бота для использования в разных частях приложения
export const BOT_USERNAME = 'knowyourmagic_bot';

const App: React.FC = () => {
  const [showTest, setShowTest] = useState(false);
  
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

  const handleStartTest = () => {
    setShowTest(true);
  };

  const handleRestart = () => {
    restartTest();
    setShowTest(false);
  };

  return (
    <div className="container">
      <header className="app-header">
        {showTest && (
          <h1>Твоя скрытая сверхспособность</h1>
        )}
      </header>
      
      <main className="app-content">
        {!showTest && (
          <StartScreen onStartTest={handleStartTest} />
        )}
        
        {showTest && !isTestCompleted && (
          <Question 
            question={currentQuestion} 
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
            onNext={handleNextQuestion}
            currentQuestion={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        )}
        
        {showTest && isTestCompleted && testResult && (
          <Result 
            result={testResult}
            compatibility={compatibility}
            onRestart={handleRestart}
            onShare={shareResult}
          />
        )}
      </main>
    </div>
  );
};

export default App;
