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
      "Hello.", "Hi.", "Good morning.", "Good afternoon.", "Good evening.", "Good night.",
      "How are you?", "I am fine, thank you.", "And you?", "What's up?", "How is it going?",
      "Nice to meet you.", "Pleasure to meet you.", "See you later.", "See you tomorrow.",
      "Goodbye.", "Bye.", "Take care.", "Have a nice day.", "Have a good weekend.",
      "Yes.", "No.", "Maybe.", "Okay.", "Please.", "Thank you.", "Thanks a lot.",
      "You are welcome.", "No problem.", "Excuse me.", "Sorry.", "I am sorry.",
      "I do not know.", "I understand.", "I do not understand.", "Help!", "Of course."
    ]
  },
  {
    id: 'conversation',
    title: '🗣️ Conversation & Introductions',
    sentences: [
      "What is your name?", "My name is John.", "I am Sarah.", "Who are you?",
      "Where are you from?", "I am from the United States.", "I come from Japan.",
      "Where do you live?", "I live in London.", "How old are you?", "I am 30 years old.",
      "What do you do?", "I am a student.", "I work in a bank.", "I am retired.",
      "Do you have any siblings?", "I have a brother and a sister.", "Are you married?",
      "I am single.", "I have a boyfriend.", "Do you have children?", "What are your hobbies?",
      "I like music.", "I love reading.", "Do you like sports?", "What is your favorite food?",
      "Do you have a pet?", "I have a dog.", "I have a cat.", "Let's hang out."
    ]
  },
  {
    id: 'language',
    title: '📖 Language Learning',
    sentences: [
      "Do you speak English?", "I speak a little Spanish.", "I am learning German.",
      "How do you say this in French?", "What does that mean?", "Can you repeat that?",
      "Please speak slower.", "Can you write it down?", "I do not understand that word.",
      "Is this correct?", "Your pronunciation is good.", "I want to practice speaking.",
      "Do you understand?", "Could you translate this?", "What is the opposite of big?",
      "How do you spell that?", "I have a question.", "Let's practice together.",
      "I made a mistake.", "My grammar is not good yet."
    ]
  },
  {
    id: 'travel',
    title: '✈️ Travel & Transport',
    sentences: [
      "Where is the airport?", "I need a taxi.", "Please take me to this address.",
      "How much to the city center?", "Is this the bus to the station?", "When does the train leave?",
      "I would like a ticket to Paris.", "One way or round trip?", "Is the flight on time?",
      "My luggage is lost.", "Where is the subway?", "Is it far from here?", "Can I walk there?",
      "Turn left.", "Turn right.", "Go straight.", "Stop here, please.", "I want to rent a car.",
      "Here is my passport.", "Where is the ticket office?", "Is this seat taken?",
      "The train is delayed.", "What platform is it?", "I missed my bus."
    ]
  },
  {
    id: 'accommodation',
    title: '🏨 Accommodation',
    sentences: [
      "I have a reservation.", "Do you have any rooms available?", "I would like a single room.",
      "How much is it per night?", "Does it include breakfast?", "Is there WiFi?",
      "What is the WiFi password?", "My key card does not work.", "Check-out is at 11.",
      "Can I leave my bags here?", "There is no hot water.", "The air conditioner is broken.",
      "I need extra towels.", "Can you wake me up at 7?", "Is there a gym?",
      "Where is the elevator?", "I lost my room key.", "The room is too noisy.",
      "Can I change rooms?", "I am checking out now."
    ]
  },
  {
    id: 'food',
    title: '🍽️ Food & Dining',
    sentences: [
      "A table for two, please.", "Can I see the menu?", "What do you recommend?",
      "I am a vegetarian.", "I am vegan.", "I am allergic to nuts.", "I do not eat pork.",
      "I would like to order.", "I will have the steak.", "Can I have some water?",
      "Is it spicy?", "It is delicious.", "I did not order this.", "Can we have the bill?",
      "Do you accept credit cards?", "Keep the change.", "I am full.", "I am hungry.",
      "I am thirsty.", "Let's grab a coffee.", "Do you want dessert?", "Cheers!",
      "Bon appétit.", "Is the kitchen still open?", "Take-away, please."
    ]
  },
  {
    id: 'shopping',
    title: '🛍️ Shopping',
    sentences: [
      "How much is this?", "It is too expensive.", "Can you give me a discount?",
      "Do you have this in a smaller size?", "Do you have it in black?", "Can I try it on?",
      "Where is the fitting room?", "It fits perfectly.", "It is too big.",
      "I am just looking.", "I will take it.", "Do you accept cash?", "Where is the cashier?",
      "Can I have a receipt?", "I would like to return this.", "What time do you close?",
      "Are you open on Sundays?", "I am looking for shoes.", "Is this on sale?",
      "Do you have a bag?", "It is a gift."
    ]
  },
  {
    id: 'emergency',
    title: '🚨 Emergency & Health',
    sentences: [
      "Help!", "Call the police!", "I need a doctor.", "Call an ambulance.",
      "There is a fire.", "I am lost.", "I lost my wallet.", "Someone stole my bag.",
      "I feel sick.", "My head hurts.", "I have a fever.", "My stomach hurts.",
      "I need medicine.", "Where is the hospital?", "Where is the pharmacy?",
      "I am injured.", "It is an emergency.", "I have an allergy.", "I need a dentist.",
      "Please help me.", "Leave me alone.", "I am in danger."
    ]
  },
  {
    id: 'time',
    title: '🕒 Time & Dates',
    sentences: [
      "What time is it?", "It is 3 o'clock.", "It is half past five.", "It is noon.",
      "It is midnight.", "When is your birthday?", "Today is Monday.", "Tomorrow is Tuesday.",
      "Yesterday was Sunday.", "See you next week.", "In two months.", "Last year.",
      "What is the date today?", "It is the first of May.", "I am late.", "You are early.",
      "The meeting is at 9 AM.", "The store opens at 10.", "It takes 20 minutes.",
      "Wait a moment.", "I do not have time."
    ]
  },
  {
    id: 'weather',
    title: '🌦️ Weather',
    sentences: [
      "How is the weather?", "It is sunny.", "It is raining.", "It is cloudy.",
      "It is snowing.", "It is hot.", "It is cold.", "It is windy.",
      "It is a beautiful day.", "It looks like rain.", "What is the temperature?",
      "It is 25 degrees.", "It is freezing.", "The weather is bad.", "I love summer.",
      "Winter is coming.", "I need an umbrella.", "The sun is shining.", "It is foggy."
    ]
  },
  {
    id: 'work',
    title: '💼 Work & Business',
    sentences: [
      "I have a meeting.", "I am busy.", "Can we talk later?", "Send me an email.",
      "What is your job?", "I work in an office.", "I am looking for a job.",
      "Here is my business card.", "I have a deadline.", "The internet is down.",
      "The printer is broken.", "Can you sign this?", "I am on vacation.",
      "Let's schedule a call.", "I agree with you.", "I disagree.", "Good job.",
      "We need to finish this.", "Who is the manager?", "I quit."
    ]
  },
  {
    id: 'home',
    title: '🏠 Home & Daily Life',
    sentences: [
      "I am waking up.", "I am going to sleep.", "I am cooking dinner.", "I am cleaning the house.",
      "Where is the remote?", "Turn on the TV.", "Turn off the lights.", "Close the door.",
      "Open the window.", "I need to do laundry.", "The sink is leaking.", "I am taking a shower.",
      "Did you feed the dog?", "What is for dinner?", "I am going to the supermarket.",
      "I am tired.", "I am relaxing.", "Brush your teeth.", "Put on your shoes."
    ]
  },
  {
    id: 'emotions',
    title: '😊 Feelings & Emotions',
    sentences: [
      "I am happy.", "I am sad.", "I am angry.", "I am excited.", "I am nervous.",
      "I am scared.", "I am bored.", "I am tired.", "I am surprised.", "I am confused.",
      "I am proud of you.", "I am disappointed.", "Do not worry.", "Calm down.",
      "Cheer up.", "I feel lonely.", "I am in love.", "It is funny.", "It is annoying.",
      "I miss you."
    ]
  },
  {
    id: 'technology',
    title: '💻 Technology',
    sentences: [
      "Can I use your phone?", "My battery is low.", "Do you have a charger?",
      "The WiFi is slow.", "I cannot connect to the internet.", "Did you get my message?",
      "I will text you.", "Take a photo.", "Post it on Instagram.", "My computer crashed.",
      "I need to print this.", "Download the app.", "What is the password?",
      "Click the link.", "Delete the file.", "Save the document."
    ]
  }
];