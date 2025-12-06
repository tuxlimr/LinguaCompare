export interface PhraseCategory {
  id: string;
  title: string;
  sentences: string[];
}

export const PHRASEBOOK: PhraseCategory[] = [
  {
    id: 'essentials',
    title: '👋 Essentials & Greetings',
    sentences: [
      "Hello, how are you today?",
      "My name is John and I am a student.",
      "I am from the United States.",
      "Nice to meet you.",
      "I do not understand.",
      "Could you please repeat that?",
      "Where is the bathroom?",
      "Yes, please.",
      "No, thank you.",
      "I am sorry.",
      "Excuse me, do you speak English?",
      "See you later.",
      "Have a nice day.",
      "I need help."
    ]
  },
  {
    id: 'travel',
    title: '✈️ Travel & Directions',
    sentences: [
      "Where is the train station?",
      "I would like to buy a ticket to Paris.",
      "Is this the right bus for the airport?",
      "Turn left at the next corner.",
      "How far is the hotel from here?",
      "I am looking for a pharmacy.",
      "Please call a taxi for me.",
      "What time does the flight leave?",
      "Here is my passport.",
      "I have a reservation.",
      "Is there a map I can use?",
      "The train is delayed.",
      "Stop here, please."
    ]
  },
  {
    id: 'dining',
    title: '🍽️ Dining & Food',
    sentences: [
      "A table for two, please.",
      "Can I see the menu?",
      "I would like to order now.",
      "I am a vegetarian.",
      "I am allergic to nuts.",
      "This food is delicious.",
      "Can I have some water?",
      "How much does this cost?",
      "The bill, please.",
      "Do you accept credit cards?",
      "I would like a coffee with milk.",
      "Is this dish spicy?",
      "Enjoy your meal."
    ]
  },
  {
    id: 'social',
    title: '💬 Social & Hobbies',
    sentences: [
      "What do you do for fun?",
      "I like to read books and watch movies.",
      "Do you have any siblings?",
      "I have a dog and a cat.",
      "The weather is beautiful today.",
      "Where do you live?",
      "I am learning a new language.",
      "Let's go to the park.",
      "What is your favorite music?",
      "I play soccer on weekends.",
      "Are you free tomorrow?",
      "Let's meet at the cafe."
    ]
  },
  {
    id: 'shopping',
    title: '🛍️ Shopping',
    sentences: [
      "How much is this shirt?",
      "Do you have this in a larger size?",
      "I am just looking, thanks.",
      "Can I try this on?",
      "Where is the fitting room?",
      "It is too expensive.",
      "I will take it.",
      "Do you have a bag?",
      "What time do you close?",
      "Is this on sale?"
    ]
  },
  {
    id: 'emergency',
    title: '🚨 Emergency & Health',
    sentences: [
      "I need a doctor.",
      "Call the police.",
      "I lost my wallet.",
      "I feel sick.",
      "Where is the nearest hospital?",
      "My head hurts.",
      "I need some medicine.",
      "Please help me.",
      "It is an emergency.",
      "I lost my passport."
    ]
  },
  {
    id: 'work',
    title: '💼 Work & Business',
    sentences: [
      "I have a meeting at nine.",
      "Please send me the email.",
      "I work as a software engineer.",
      "Here is my business card.",
      "The internet is not working.",
      "Can we reschedule the call?",
      "I am busy right now.",
      "This is a great opportunity.",
      "When is the deadline?",
      "Let's discuss this tomorrow."
    ]
  },
  {
    id: 'emotions',
    title: '😊 Feelings & Emotions',
    sentences: [
      "I am very happy today.",
      "I feel tired.",
      "Why are you sad?",
      "I am excited about the trip.",
      "I am nervous about the exam.",
      "He is angry with me.",
      "I am bored.",
      "She is surprised.",
      "I feel much better now.",
      "Do not worry."
    ]
  }
];