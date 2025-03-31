import { femalePartners, malePartners, typeCompatibility } from '../data/partners';
import { Option, GenderType, PartnerType, TestResult, Compatibility } from '../types';

/**
 * Определяет гендер пользователя
 * @param answer - ответ на первый вопрос
 * @returns гендер пользователя
 */
export function determineGender(answer: Option): GenderType {
  return answer.type as GenderType;
}

/**
 * Определяет тип партнера на основе ответов пользователя
 * @param {Array} answers - массив ответов пользователя (начиная со второго вопроса)
 * @returns {PartnerType} - тип идеального партнера
 */
export function determinePartnerType(answers: Option[]): PartnerType {
  // Подсчет очков для каждого типа
  const scores: Record<string, number> = {
    dreamyIntellectual: 0,
    charismaticLeader: 0,
    creativeSoul: 0,
    reliableProtector: 0,
    intellectualMentor: 0,
    unpredictableAdventurer: 0,
    ambitiousAchiever: 0
  };
  
  // Подсчет очков на основе ответов
  answers.forEach(answer => {
    if (answer && answer.type) {
      scores[answer.type] += 1;
    }
  });
  
  // Находим тип с наибольшим количеством очков
  let maxScore = 0;
  let resultType: PartnerType = 'dreamyIntellectual'; // Значение по умолчанию
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultType = type as PartnerType;
    }
  });
  
  return resultType;
}

/**
 * Генерирует полный результат для пользователя
 * @param {GenderType} gender - гендер пользователя
 * @param {PartnerType} partnerType - тип идеального партнера
 * @returns {TestResult} - объект с полным описанием результата
 */
export function generateResult(gender: GenderType, partnerType: PartnerType): TestResult {
  // Выбираем нужную базу данных в зависимости от гендера
  const partnersDatabase = gender === 'female' ? femalePartners : malePartners;
  
  const partner = partnersDatabase[partnerType];
  
  if (!partner) {
    // Возвращаем результат по умолчанию, если тип не найден
    return partnersDatabase.dreamyIntellectual as TestResult;
  }
  
  return partner as TestResult;
}

/**
 * Анализирует совместимость двух типов партнеров
 * @param {PartnerType} type1 - тип первого партнера
 * @param {PartnerType} type2 - тип второго партнера
 * @returns {Compatibility} - объект с описанием совместимости
 */
export function analyzeCompatibility(type1: PartnerType, type2: PartnerType): Compatibility {
  let compatibilityText = '';
  
  // Проверяем, есть ли специфичное описание для этой пары типов
  if (typeCompatibility[type1] && typeCompatibility[type1][type2]) {
    compatibilityText = typeCompatibility[type1][type2];
  } else if (typeCompatibility[type2] && typeCompatibility[type2][type1]) {
    compatibilityText = typeCompatibility[type2][type1];
  } else {
    // Общее описание, если специфичного нет
    compatibilityText = 'Интересное сочетание! У вас разные характеры, которые могут прекрасно дополнять друг друга.';
  }
  
  // Определяем, насколько совместимы типы (от 1 до 5)
  let compatibilityLevel = 3; // По умолчанию средняя совместимость
  
  // Одинаковые типы обычно хорошо совместимы
  if (type1 === type2) {
    compatibilityLevel = 4;
  }
  
  // Некоторые пары имеют особую совместимость
  const highCompatibility = [
    ['dreamyIntellectual', 'reliableProtector'],
    ['creativeSoul', 'unpredictableAdventurer'],
    ['charismaticLeader', 'ambitiousAchiever'],
    ['intellectualMentor', 'dreamyIntellectual']
  ];
  
  const pairString1 = `${type1},${type2}`;
  const pairString2 = `${type2},${type1}`;
  
  if (highCompatibility.some(pair => `${pair[0]},${pair[1]}` === pairString1 || `${pair[0]},${pair[1]}` === pairString2)) {
    compatibilityLevel = 5;
  }
  
  // Составляем общую строчку из песни для пары
  let songLine = '';
  if (compatibilityLevel >= 4) {
    songLine = 'Мы с тобой два пазла из разных коробок, края не совпадают, но узор один 🧩✨';
  } else if (compatibilityLevel === 3) {
    songLine = 'Наш пазл сложился, пусть не идеально, но это наша история – уникальная, реальная 📖💫';
  } else {
    songLine = 'Пусть весь мир твердит, что мы не совпадаем, но мы-то знаем, знаем, знаем 👀✨';
  }
  
  // Берем эмодзи для обоих типов из любой базы данных (они одинаковые)
  const partner1 = femalePartners[type1];
  const partner2 = femalePartners[type2];
  
  return {
    compatibilityLevel,
    compatibilityText,
    songLine,
    emojis: `${partner1.emoji} + ${partner2.emoji}`,
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790" // Используем URL песни
  };
}
