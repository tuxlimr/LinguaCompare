import { ComparisonScenario, WordType } from './types';

export const WORD_TYPE_COLORS: Record<WordType, string> = {
  noun: 'bg-green-100 text-green-800 border-green-200',
  verb: 'bg-purple-100 text-purple-800 border-purple-200',
  adjective: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  article: 'bg-blue-100 text-blue-800 border-blue-200',
  particle: 'bg-gray-100 text-gray-800 border-gray-200',
  preposition: 'bg-orange-100 text-orange-800 border-orange-200',
  pronoun: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  other: 'bg-slate-100 text-slate-800 border-slate-200',
};

// Reference: "The(0) cat(1) sits(2) on(3) the(4) big(5) table.(6)"
export const INITIAL_SCENARIO: ComparisonScenario = {
  referenceSentence: "The cat sits on the big table.",
  languages: [
    {
      id: 'es',
      language: 'Spanish',
      flag: '🇪🇸',
      sentence: "El gato se sienta en la mesa grande.",
      wordMapping: [
        { text: "El", type: "article", translation: "The", matchingIndex: 0 },
        { text: "gato", type: "noun", translation: "cat", matchingIndex: 1 },
        { text: "se sienta", type: "verb", translation: "sits (itself)", matchingIndex: 2 },
        { text: "en", type: "preposition", translation: "on", matchingIndex: 3 },
        { text: "la", type: "article", translation: "the", matchingIndex: 4 },
        { text: "mesa", type: "noun", translation: "table", matchingIndex: 6 },
        { text: "grande", type: "adjective", translation: "big", matchingIndex: 5 },
      ],
      grammarNotes: [
        "Uses gendered articles: 'el' (masc.), 'la' (fem.).",
        "Adjective ('grande') follows the noun ('mesa')."
      ],
      difficulty: 30
    },
    {
      id: 'jp',
      language: 'Japanese',
      flag: '🇯🇵',
      sentence: "猫は大きいテーブルの上に座っています。",
      wordMapping: [
        { text: "猫", type: "noun", translation: "Cat", matchingIndex: 1 },
        { text: "は", type: "particle", translation: "topic marker" },
        { text: "大きい", type: "adjective", translation: "big", matchingIndex: 5 },
        { text: "テーブル", type: "noun", translation: "table", matchingIndex: 6 },
        { text: "の", type: "particle", translation: "of/possessive" },
        { text: "上に", type: "preposition", translation: "on/top", matchingIndex: 3 },
        { text: "座っています", type: "verb", translation: "is sitting", matchingIndex: 2 },
      ],
      grammarNotes: [
        "Pronunciation: Neko wa ookii teeburu no ue ni suwatte imasu.",
        "Subject-Object-Verb (SOV) word order.",
        "Particles mark grammatical function: 'は' (topic), 'に' (location)."
      ],
      difficulty: 85
    },
    {
      id: 'de',
      language: 'German',
      flag: '🇩🇪',
      sentence: "Die Katze sitzt auf dem großen Tisch.",
      wordMapping: [
        { text: "Die", type: "article", translation: "The", matchingIndex: 0 },
        { text: "Katze", type: "noun", translation: "cat", matchingIndex: 1 },
        { text: "sitzt", type: "verb", translation: "sits", matchingIndex: 2 },
        { text: "auf dem", type: "preposition", translation: "on the", matchingIndex: 3 },
        { text: "großen", type: "adjective", translation: "big", matchingIndex: 5 },
        { text: "Tisch", type: "noun", translation: "table", matchingIndex: 6 },
      ],
      grammarNotes: [
        "Verb-Second (V2) word order in main clauses.",
        "Noun cases affect articles and adjectives (Dative case here)."
      ],
      difficulty: 60
    },
    {
      id: 'sv',
      language: 'Swedish',
      flag: '🇸🇪',
      sentence: "Katten sitter på det stora bordet.",
      wordMapping: [
        { text: "Katten", type: "noun", translation: "The cat", matchingIndex: 1 },
        { text: "sitter", type: "verb", translation: "sits", matchingIndex: 2 },
        { text: "på", type: "preposition", translation: "on", matchingIndex: 3 },
        { text: "det", type: "article", translation: "the", matchingIndex: 4 },
        { text: "stora", type: "adjective", translation: "big", matchingIndex: 5 },
        { text: "bordet", type: "noun", translation: "table", matchingIndex: 6 },
      ],
      grammarNotes: [
        "Definite article often attached as suffix (-en, -et).",
        "Adjectives take definite form ('stora') after 'det'."
      ],
      difficulty: 40
    },
    {
      id: 'fi',
      language: 'Finnish',
      flag: '🇫🇮',
      sentence: "Kissa istuu isolla pöydällä.",
      wordMapping: [
        { text: "Kissa", type: "noun", translation: "Cat", matchingIndex: 1 },
        { text: "istuu", type: "verb", translation: "sits", matchingIndex: 2 },
        { text: "isolla", type: "adjective", translation: "big (on)", matchingIndex: 5 },
        { text: "pöydällä", type: "noun", translation: "table (on)", matchingIndex: 6 },
      ],
      grammarNotes: [
        "No articles exist in Finnish.",
        "Uses cases (Adessive -lla) instead of prepositions for 'on'.",
        "Adjectives agree with the noun in case."
      ],
      difficulty: 75
    }
  ]
};