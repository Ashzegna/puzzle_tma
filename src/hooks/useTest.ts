import { useState, useCallback, useEffect } from 'react';
import { Option, GenderType, PartnerType, Question, TestResult, Compatibility } from '../types';
import { questions } from '../data/questions';
import { determineGender, determinePartnerType, generateResult, analyzeCompatibility } from '../utils/results';
import { useTelegram } from './useTelegram';

export function useTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [sharedTestId, setSharedTestId] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null);
  const [userGender, setUserGender] = useState<GenderType | null>(null);
  
  const { tgWebApp, showMainButton, getUserData } = useTelegram();
  
  // Обработка данных из URL (если тест был поделен)
  useEffect(() => {
    // Анализируем URL для получения ID поделенного теста
    const searchParams = new URLSearchParams(window.location.search);
    const testId = searchParams.get('testId');
    const partnerType = searchParams.get('partnerType');
    const gender = searchParams.get('gender');
    
    if (testId && partnerType && gender) {
      setSharedTestId(testId);
      
      // Сохраняем для возможного отображения совместимости после завершения теста
      localStorage.setItem('sharedTestId', testId);
      localStorage.setItem('sharedPartnerType', partnerType);
      localStorage.setItem('sharedGender', gender);
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
    
    // Если это первый вопрос (определение пола)
    if (currentQuestionIndex === 0) {
      const gender = determineGender(selectedOption);
      setUserGender(gender);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Если достигли последнего вопроса, завершаем тест
      if (userGender) {
        // Определяем тип партнера на основе ответов (пропускаем первый вопрос о поле)
        const partnerType = determinePartnerType(newAnswers.slice(1));
        // Генерируем результат на основе пола пользователя и типа партнера
        const result = generateResult(userGender, partnerType as PartnerType);
        setTestResult(result);
        setIsTestCompleted(true);
        
        // Проверяем, есть ли данные о поделенном тесте
        const sharedPartnerType = localStorage.getItem('sharedPartnerType');
        const sharedGender = localStorage.getItem('sharedGender');
        
        if (sharedPartnerType && sharedGender) {
          // Анализируем совместимость с поделенным тестом
          const compatibilityData = analyzeCompatibility(partnerType as PartnerType, sharedPartnerType as PartnerType);
          setCompatibility(compatibilityData);
        }
      }
    }
  }, [currentQuestionIndex, selectedOption, selectedAnswers, userGender]);
  
  // Начать тест заново
  const restartTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setIsTestCompleted(false);
    setTestResult(null);
    setCompatibility(null);
    setUserGender(null);
  }, []);
  
  // Функция шеринга результата
  const shareResult = useCallback(() => {
    if (!testResult || !userGender) return;
    
    try {
      // Формируем текст сообщения с результатом
      const shareText = `🎬 Я прошел тест "Какая кинозвезда станет моим идеальным партнером"!
      
Мой идеальный партнер: ${testResult.name} ${testResult.emoji}

"${testResult.songLine}"

Узнай, кто твоя идеальная пара!`;
      
      // Имя бота из рабочего примера
      const botUsername = 'knowyourmagic_bot';
      
      // Партнер, который получился в результате теста
      const partnerType = testResult.type;
      
      // Используем точный формат из вашего примера и добавляем параметры
      const appUrl = `https://t.me/${botUsername}/ghKJ67/app?testId=shared&partnerType=${partnerType}&gender=${userGender}`;
      
      // Используем механизм Telegram для шеринга
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`;
      
      // Открываем диалог шеринга в Telegram
      tgWebApp.openTelegramLink(shareUrl);
      
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
      alert('Не удалось поделиться результатом. Попробуйте ещё раз.');
    }
  }, [testResult, userGender, tgWebApp]);
  
  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: questions.length,
    selectedOption,
    isTestCompleted,
    testResult,
    compatibility,
    sharedTestId,
    userGender,
    handleOptionSelect,
    handleNextQuestion,
    restartTest,
    shareResult
  };
}
