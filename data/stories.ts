export interface StorySegment {
    original: string;
    translation: string;
}
  
export interface Story {
    id: string;
    title: string;
    originalTitle: string;
    language: string;
    flag: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    color: string; // Tailwind bg color class for the cover
    segments: StorySegment[];
}
  
export const STORIES: Story[] = [
    {
        id: 'es_lion',
        title: 'The Lion and the Mouse',
        originalTitle: 'El León y el Ratón',
        language: 'Spanish',
        flag: '🇪🇸',
        level: 'Beginner',
        description: 'A classic fable about kindness and how even the small can help the strong.',
        color: 'bg-orange-500',
        segments: [
            {
                original: "Un día, un león dormía en el bosque.",
                translation: "One day, a lion was sleeping in the forest."
            },
            {
                original: "Un pequeño ratón comenzó a correr sobre su nariz.",
                translation: "A little mouse started running over his nose."
            },
            {
                original: "El león se despertó y atrapó al ratón con su enorme garra.",
                translation: "The lion woke up and caught the mouse with his huge paw."
            },
            {
                original: "—¡Por favor, no me comas! —chilló el ratón—.",
                translation: "\"Please, don't eat me!\" squeaked the mouse."
            },
            {
                original: "—Si me dejas ir, algún día podré ayudarte.",
                translation: "\"If you let me go, someday I might be able to help you.\""
            },
            {
                original: "El león se rió. —¿Cómo podría un ratón ayudar a un león?",
                translation: "The lion laughed. \"How could a mouse help a lion?\""
            },
            {
                original: "Pero decidió dejarlo ir.",
                translation: "But he decided to let him go."
            },
            {
                original: "Días después, el león cayó en una red de cazadores.",
                translation: "Days later, the lion fell into a hunter's net."
            },
            {
                original: "El ratón escuchó sus rugidos y corrió a ayudarlo.",
                translation: "The mouse heard his roars and ran to help him."
            },
            {
                original: "Mordió las cuerdas con sus dientes afilados y liberó al león.",
                translation: "He bit the ropes with his sharp teeth and freed the lion."
            },
            {
                original: "—Tenías razón —dijo el león—. Los pequeños amigos pueden ser grandes amigos.",
                translation: "\"You were right,\" said the lion. \"Small friends can be great friends.\""
            }
        ]
    },
    {
        id: 'de_bremen',
        title: 'The Bremen Town Musicians',
        originalTitle: 'Die Bremer Stadtmusikanten',
        language: 'German',
        flag: '🇩🇪',
        level: 'Intermediate',
        description: 'Four aging domestic animals who, after a lifetime of hard work, are neglected and mistreated by their former masters.',
        color: 'bg-emerald-600',
        segments: [
            {
                original: "Es war einmal ein Mann, der hatte einen Esel.",
                translation: "Once upon a time there was a man who had a donkey."
            },
            {
                original: "Der Esel hatte viele Jahre lang unverdrossen die Säcke in die Mühle getragen.",
                translation: "The donkey had carried sacks to the mill tirelessly for many years."
            },
            {
                original: "Aber nun gingen seine Kräfte zu Ende.",
                translation: "But now his strength was coming to an end."
            },
            {
                original: "Der Mann dachte daran, ihn wegzugeben.",
                translation: "The man thought about giving him away."
            },
            {
                original: "Aber der Esel merkte, dass kein guter Wind wehte.",
                translation: "But the donkey noticed that no good wind was blowing (trouble was brewing)."
            },
            {
                original: "Er lief fort und machte sich auf den Weg nach Bremen.",
                translation: "He ran away and set off for Bremen."
            },
            {
                original: "—Dort kann ich Stadtmusikant werden —dachte er.",
                translation: "\"There I can become a town musician,\" he thought."
            }
        ]
    },
    {
        id: 'jp_momotaro',
        title: 'Momotaro (Peach Boy)',
        originalTitle: '桃太郎',
        language: 'Japanese',
        flag: '🇯🇵',
        level: 'Beginner',
        description: 'A popular hero of Japanese folklore who was born from a giant peach.',
        color: 'bg-pink-400',
        segments: [
            {
                original: "昔々、あるおじいさんとおばあさんが住んでいました。",
                translation: "Once upon a time, there lived an old man and an old woman."
            },
            {
                original: "ある日、おばあさんが川で洗濯をしていると、大きな桃が流れてきました。",
                translation: "One day, when the grandmother was washing clothes in the river, a big peach came floating down."
            },
            {
                original: "「どんぶらこ、どんぶらこ」",
                translation: "\"Donburako, donburako\" (sound of bobbing in water)."
            },
            {
                original: "おばあさんはその桃を拾って家に持ち帰りました。",
                translation: "The grandmother picked up that peach and brought it home."
            },
            {
                original: "桃を切ろうとすると、中から元気な男の子が飛び出しました。",
                translation: "When they tried to cut the peach, a healthy boy jumped out from inside."
            },
            {
                original: "二人は彼を「桃太郎」と名付けました。",
                translation: "The two named him \"Momotaro\"."
            }
        ]
    }
];