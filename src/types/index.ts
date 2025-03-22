export type SuperpowerType = 
  | 'emotionalTelepatia'
  | 'magneticAttraction'
  | 'relationshipAlchemy'
  | 'soulHealer'
  | 'wisdomKeeper'
  | 'specialMomentCreator'
  | 'impossibilityMaster';

export interface Option {
  id: string;
  text: string;
  type: SuperpowerType;
}

export interface Question {
  id: string;
  text: string;
  emoji: string;
  options: Option[];
}

export interface Superpower {
  type: SuperpowerType;
  name: string;
  emoji: string;
  description: string;
  examples: string;
  songLine: string;
  songUrl: string;
}

export interface TestResult {
  type: SuperpowerType;
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
  result?: TestResult;
}

export interface CustomQuestionTemplate {
  text: string;
  options: string[];
}
