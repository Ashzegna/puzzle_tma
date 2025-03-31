import { useState, useCallback, useEffect } from 'react';
import { Option, Question, TestResult, Compatibility } from '../types';
import { enhancedQuestions } from '../data/enhancedQuestions';
import { determinePersonalityType, generateResult, analyzeCompatibility } from '../utils/results';
import { useTelegram } from './useTelegram';

export function useTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [sharedTestId, setSharedTestId] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null);
  
  const { tgWebApp, showMainButton, getUserData } = useTelegram();
  
  // Обработка данных из URL (если тест был поделен)
  useEffect(() => {
    // Анализируем URL для получения ID поделенного теста
    const searchParams = new URLSearchParams(window.location.search);
    const testId = searchParams.get('testId');
    const powerType = searchParams.get('powerType');
    
    if (testId && powerType) {
      setSharedTestId(testId);
      
      // Сохраняем для возможного отображения совместимости после завершения теста
      localStorage.setItem('sharedTestId', testId);
      localStorage.setItem('sharedPowerType', powerType);
    }
  }, []);
  
  // Выбор варианта ответа
  const handleOptionSelect = useCallback((option: Option) => {
    setSelectedOption(option);
  }, []);
  
  // Переход к следующему вопросу
  const handleNextQuestion = useCallback(() => {
    if (!selectedOption) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(newAnswers);
    
    if (currentQuestionIndex < enhancedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Если достигли последнего вопроса, завершаем тест
      const powerType = determinePersonalityType(newAnswers);
      const result = generateResult(powerType);
      setTestResult(result);
      setIsTestCompleted(true);
      
      // Анимация завершения происходит в компоненте Result
      console.log('Тест завершен!');
      
      // Проверяем, есть ли данные о поделенном тесте
      const sharedPowerType = localStorage.getItem('sharedPowerType');
      if (sharedPowerType) {
        // Анализируем совместимость с поделенным тестом
        const compatibilityData = analyzeCompatibility(powerType, sharedPowerType as any);
        setCompatibility(compatibilityData);
      }
    }
  }, [currentQuestionIndex, selectedOption, selectedAnswers]);
  
  // Начать тест заново
  const restartTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setIsTestCompleted(false);
    setTestResult(null);
    setCompatibility(null);
  }, []);
  
  // Поделиться результатом теста (исправленная версия)
  const shareResult = useCallback(() => {
    if (!testResult) return;
    
    try {
      // Создаем уникальный идентификатор для шеринга
      // Используем комбинацию типа результата и случайных символов
      const resultType = testResult.type;
      const randomPart = Math.random().toString(36).substring(2, 6);
      const shareId = resultType.substring(0, 3) + randomPart;
      
      // Формируем текст сообщения с результатом
      const shareText = `🧠 Я прошел тест "Пазлы" и узнал свою скрытую сверхспособность!
      
Моя сверхспособность: ${testResult.name} ${testResult.emoji}

"${testResult.songLine}"

Узнай свою сверхспособность!`;
      
      // Имя вашего бота (замените на реальное имя)
      const botUsername = 'knowyourmagic_bot';
      
      // Формируем ссылку с уникальным параметром в пути, как в вашем рабочем примере
      const appUrl = `https://t.me/${botUsername}/${shareId}/app`;
      
      // Используем механизм Telegram для шеринга
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`;
      
      // Открываем диалог шеринга в Telegram
      tgWebApp.openTelegramLink(shareUrl);
      
      console.log('Поделились ссылкой:', appUrl);
      
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
      alert('Не удалось поделиться результатом. Попробуйте ещё раз.');
    }
  }, [testResult, tgWebApp]);
  
  // Убираем MainButton и оставляем только кнопку в UI
  // Иначе может быть конфликт между разными способами шеринга
  useEffect(() => {
    if (isTestCompleted && testResult) {
      // Комментируем или удаляем эту часть, чтобы избежать дублирования
      // const cleanup = showMainButton('Поделиться результатом', shareResult);
      // return cleanup;
      
      // Или можно использовать только MainButton, но отключить кнопку в UI
      // На ваше усмотрение
    }
  }, [isTestCompleted, testResult, showMainButton, shareResult]);
  
  return {
    currentQuestion: enhancedQuestions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: enhancedQuestions.length,
    selectedOption,
    isTestCompleted,
    testResult,
    compatibility,
    sharedTestId,
    handleOptionSelect,
    handleNextQuestion,
    restartTest,
    shareResult
  };
}
