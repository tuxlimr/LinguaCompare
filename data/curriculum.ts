import { DailyContent } from '../types';

export const CURRICULUM_DATA: DailyContent[] = [
    {
        day: 1,
        title: "The Basics & Personal Pronouns",
        description: "Start your journey by mastering the fundamental building blocks of communication: I, You, He, She.",
        grammarFocus: {
            title: "Personal Pronouns",
            content: [
                "English uses 'I', 'You', 'He/She/It' for singular subjects.",
                "Spanish drops pronouns often (e.g., 'Soy' instead of 'Yo soy').",
                "German has distinct formal 'Sie' vs informal 'Du'."
            ]
        },
        vocabulary: [
            { word: "Hello", translation: "Hola / Hallo / Konnichiwa" },
            { word: "I", translation: "Yo / Ich / Watashi" },
            { word: "to be", translation: "ser/estar / sein / desu" },
            { word: "Student", translation: "Estudiante / Student / Gakusei" }
        ],
        practiceSentences: [
            "I am a student.",
            "Hello, how are you?"
        ],
        exercises: [
            {
                id: "d1_e1",
                type: "multiple_choice",
                question: "Which pronoun is used for 'I' in German?",
                options: ["Du", "Ich", "Er", "Sie"],
                correctAnswer: "Ich",
                explanation: "'Du' is You, 'Er' is He."
            },
            {
                id: "d1_e2",
                type: "fill_blank",
                question: "In Spanish, '___ soy estudiante' (I am a student).",
                correctAnswer: "Yo",
                explanation: "Yo is the first person singular pronoun."
            }
        ]
    },
    {
        day: 2,
        title: "Present Tense Verbs",
        description: "Learn how to describe actions happening right now.",
        grammarFocus: {
            title: "Regular Verb Conjugation",
            content: [
                "English adds 's' for he/she/it (e.g., eats).",
                "Spanish changes endings (-o, -as, -a, -amos, -an).",
                "Japanese verbs do not change based on person/number."
            ]
        },
        vocabulary: [
            { word: "to eat", translation: "comer / essen / taberu" },
            { word: "to drink", translation: "beber / trinken / nomu" },
            { word: "Apple", translation: "Manzana / Apfel / Ringo" }
        ],
        practiceSentences: [
            "She eats an apple.",
            "I drink water."
        ],
        exercises: [
            {
                id: "d2_e1",
                type: "multiple_choice",
                question: "Translate: 'She eats'",
                options: ["Ella come", "Yo como", "Tu comes", "Nosotros comemos"],
                correctAnswer: "Ella come"
            }
        ]
    }
    // ... Days 3-30 would follow this pattern
];
