// Определение гендера пользователя
export type GenderType = 'male' | 'female';

// Типы характеров
export type PartnerType = 
  | 'dreamyIntellectual'
  | 'charismaticLeader'
  | 'creativeSoul'
  | 'reliableProtector'
  | 'intellectualMentor'
  | 'unpredictableAdventurer'
  | 'ambitiousAchiever';

export interface Option {
  id: string;
  text: string;
  type: string; // Может быть GenderType или PartnerType
}

export interface Question {
  id: string;
  text: string;
  emoji: string;
  options: Option[];
}

export interface Superpower {
  type: string;
  name: string;
  emoji: string;
  description: string;
  examples: string;
  songLine: string;
  songUrl: string;
}

export interface TestResult {
  type: string;
  name: string;
  emoji: string;
  description: string;
  examples: string;
  songLine: string;
  songUrl: string;
}

export interface Compatibility {
  compatibilityLevel: number;
  compatibilityText: string;
  songLine: string;
  emojis: string;
  songUrl: string;
}

export interface User {
  id: string;
  name?: string;
  gender?: GenderType;
  result?: TestResult;
}

export interface CustomQuestionTemplate {
  text: string;
  options: string[];
}
