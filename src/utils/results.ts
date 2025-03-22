import { superpowers, typeCompatibility } from '../data/superpowers';
import { Option, SuperpowerType, TestResult, Compatibility } from '../types';

/**
 * Определяет тип сверхспособности на основе ответов пользователя
 * @param {Array} answers - массив ответов пользователя
 * @returns {SuperpowerType} - тип сверхспособности
 */
export function determinePersonalityType(answers: Option[]): SuperpowerType {
  // Подсчет очков для каждого типа
  const scores: Record<SuperpowerType, number> = {
    emotionalTelepatia: 0,
    magneticAttraction: 0,
    relationshipAlchemy: 0,
    soulHealer: 0,
    wisdomKeeper: 0,
    specialMomentCreator: 0,
    impossibilityMaster: 0
  };
  
  // Подсчет очков на основе ответов
  answers.forEach(answer => {
    if (answer && answer.type) {
      scores[answer.type] += 1;
    }
  });
  
  // Находим тип с наибольшим количеством очков
  let maxScore = 0;
  let resultType: SuperpowerType = 'emotionalTelepatia'; // Значение по умолчанию
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultType = type as SuperpowerType;
    }
  });
  
  return resultType;
}

/**
 * Генерирует полный результат для пользователя
 * @param {SuperpowerType} type - тип сверхспособности
 * @returns {TestResult} - объект с полным описанием результата
 */
export function generateResult(type: SuperpowerType): TestResult {
  const superpower = superpowers[type];
  
  if (!superpower) {
    // Возвращаем результат по умолчанию, если тип не найден
    return superpowers.emotionalTelepatia as TestResult;
  }
  
  return superpower as TestResult;
}

/**
 * Анализирует совместимость двух типов сверхспособностей
 * @param {SuperpowerType} type1 - тип первой сверхспособности
 * @param {SuperpowerType} type2 - тип второй сверхспособности
 * @returns {Compatibility} - объект с описанием совместимости
 */
export function analyzeCompatibility(type1: SuperpowerType, type2: SuperpowerType): Compatibility {
  let compatibilityText = '';
  
  // Проверяем, есть ли специфичное описание для этой пары типов
  if (typeCompatibility[type1] && typeCompatibility[type1][type2]) {
    compatibilityText = typeCompatibility[type1][type2];
  } else if (typeCompatibility[type2] && typeCompatibility[type2][type1]) {
    compatibilityText = typeCompatibility[type2][type1];
  } else {
    // Общее описание, если специфичного нет
    compatibilityText = 'Интересное сочетание! У вас разные сверхспособности, которые могут прекрасно дополнять друг друга.';
  }
  
  // Определяем, насколько совместимы типы (от 1 до 5)
  let compatibilityLevel = 3; // По умолчанию средняя совместимость
  
  // Одинаковые типы обычно хорошо совместимы
  if (type1 === type2) {
    compatibilityLevel = 4;
  }
  
  // Некоторые пары имеют особую совместимость
  const highCompatibility = [
    ['emotionalTelepatia', 'soulHealer'],
    ['relationshipAlchemy', 'specialMomentCreator'],
    ['magneticAttraction', 'impossibilityMaster'],
    ['wisdomKeeper', 'soulHealer']
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
  
  const superpower1 = superpowers[type1];
  const superpower2 = superpowers[type2];
  
  return {
    compatibilityLevel,
    compatibilityText,
    songLine,
    emojis: `${superpower1.emoji} + ${superpower2.emoji}`,
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790" // Используем URL песни
  };
}
