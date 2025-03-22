import { useState, useCallback, useEffect } from 'react';
import { Option, Question, TestResult, Compatibility } from '../types';
import { questions } from '../data/questions';
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
    
    if (currentQuestionIndex < questions.length - 1) {
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
  
  // Поделиться результатом теста
  const shareResult = useCallback(() => {
    if (!testResult) return;
    
    // Получаем данные пользователя
    const userData = getUserData();
    
    // Создаем уникальный идентификатор для теста
    const testId = Math.random().toString(36).substring(2, 15);
    
    // Формируем правильную ссылку на Miniapp с параметрами
    // Обратите внимание: здесь используется формат, который Telegram может обработать
    const botUsername = 'knowyourmagic_bot'; // Замените на имя вашего бота
    
    // В Telegram есть два способа поделиться:
    // 1. Через WebApp.switchInlineQuery - для инлайн-режима
    // 2. Через WebApp.openTelegramLink - для обычной ссылки
    
    try {
      // Формируем текст сообщения для шаринга
      const shareText = `🧠 Я прошел тест "Пазлы" и узнал свою скрытую сверхспособность!
      
Моя сверхспособность: ${testResult.name} ${testResult.emoji}

"${testResult.songLine}"

Узнай свою сверхспособность и проверь нашу совместимость!`;
      
      // Используем switchInlineQuery для создания инлайн-сообщения
      // Это позволит пользователю выбрать чат для отправки
      tgWebApp.switchInlineQuery(`test_${testId}_${testResult.type}`, ['users', 'groups', 'channels']);
      
      // Также можно использовать shareUrl для обычной ссылки:
      // const shareUrl = `https://t.me/${botUsername}/app?startapp=test_${testId}_${testResult.type}`;
      // window.open(shareUrl, '_blank');
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
      
      // Запасной вариант - открыть приложение с параметрами
      const fallbackUrl = `https://t.me/${botUsername}/app?startapp=test_${testId}_${testResult.type}`;
      tgWebApp.openTelegramLink(fallbackUrl);
    }
  }, [testResult, tgWebApp, getUserData]);
  
  // Установка кнопки шаринга в конце теста
  useEffect(() => {
    if (isTestCompleted && testResult) {
      const cleanup = showMainButton('Поделиться результатом', shareResult);
      return cleanup;
    }
  }, [isTestCompleted, testResult, showMainButton, shareResult]);
  
  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: questions.length,
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
