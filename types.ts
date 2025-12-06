
export type WordType = 'noun' | 'verb' | 'particle' | 'adjective' | 'article' | 'preposition' | 'pronoun' | 'other';

export interface WordMapping {
  text: string;
  type: WordType;
  translation?: string; // Literal translation of the specific word
  matchingIndex?: number; // Index of the corresponding word in the reference sentence
}

export interface LanguageData {
  id: string;
  language: string;
  flag: string; // Emoji or URL
  sentence: string;
  wordMapping: WordMapping[];
  grammarNotes: string[];
  difficulty: number; // 0 to 100
}

export interface ComparisonScenario {
  referenceSentence: string;
  languages: LanguageData[];
}

// Navigation Types
export type View = 'dashboard' | 'compare' | 'routine' | 'certification';

// --- Phase 1.2 & 2 Types ---

export interface VocabularyItem {
    word: string;
    translation: string;
    context?: string;
}

export type ExerciseType = 'multiple_choice' | 'fill_blank';

export interface Exercise {
    id: string;
    type: ExerciseType;
    question: string;
    options?: string[]; // For multiple choice
    correctAnswer: string;
    explanation?: string;
}

export interface DailyContent {
    day: number;
    title: string;
    description: string;
    grammarFocus: {
        title: string;
        content: string[];
    };
    vocabulary: VocabularyItem[];
    practiceSentences: string[]; // Sentences to practice speaking
    exercises: Exercise[];
}

export interface UserProgress {
    completedDays: number[]; // Array of day numbers completed
    currentDay: number;
    xp: number;
    // Certification Tracking
    exercisesCompleted: number;
    speakingSessionsCompleted: number;
}