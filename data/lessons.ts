import { Lesson } from "@/types/types";

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn essential Tagalog greetings",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kumusta",
          english: "Hello/How are you?",
          pronunciation: "koo-MUS-tah",
        },
        {
          tagalog: "Magandang umaga",
          english: "Good morning",
          pronunciation: "mah-gan-DANG oo-MAH-gah",
        },
        {
          tagalog: "Magandang hapon",
          english: "Good afternoon",
          pronunciation: "mah-gan-DANG hah-PON",
        },
        {
          tagalog: "Magandang gabi",
          english: "Good evening",
          pronunciation: "mah-gan-DANG gah-BEE",
        },
      ],
      vocabulary: [
        { word: "Salamat", meaning: "Thank you", pronunciation: "sah-LAH-mat" },
        { word: "Paalam", meaning: "Goodbye", pronunciation: "pah-AH-lam" },
        { word: "Po", meaning: "Respectful particle", pronunciation: "poh" },
        { word: "Mabuti", meaning: "Good/Fine", pronunciation: "mah-BOO-tee" },
      ],
      tips: [
        "Adding 'po' makes greetings more respectful",
        "Time-specific greetings show cultural awareness",
        "'Kumusta' can be used anytime as a general greeting",
      ],
      culturalNotes:
        "Filipinos value respect, especially to elders. Always use 'po' when greeting older people.",
    },
    exercises: [
      {
        type: "translate",
        question: "Hello",
        answer: "Kumusta",
        options: ["Kumusta", "Salamat", "Paalam", "Magandang umaga"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "How do you say 'Good morning' in Tagalog?",
        answer: "Magandang umaga",
        options: [
          "Magandang gabi",
          "Magandang umaga",
          "Magandang hapon",
          "Kumusta",
        ],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Magandang _____ (good afternoon).",
        answer: "hapon",
        hint: "This word refers to the afternoon period of the day",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud the following Tagalog greeting:",
        text: "Magandang umaga po",
        xp: 12,
      },
      {
        type: "listening",
        question:
          "Listen to the audio and build the sentence using the word bank:",
        text: "Kumusta ka",
        answer: "Kumusta ka",
        wordBank: ["Kumusta", "ka", "po", "ako"],
        xp: 15,
      },
    ],
  },
  {
    id: 2,
    title: "Family Members",
    description: "Learn words for family relationships",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ang pamilya ko",
          english: "My family",
          pronunciation: "ang pah-MEEL-yah koh",
        },
        {
          tagalog: "Sino siya?",
          english: "Who is he/she?",
          pronunciation: "see-NOH see-YAH",
        },
        {
          tagalog: "Ito ang aking...",
          english: "This is my...",
          pronunciation: "ee-TOH ang ah-KING",
        },
      ],
      vocabulary: [
        {
          word: "Ama/Tatay",
          meaning: "Father",
          pronunciation: "AH-mah/TAH-tie",
        },
        {
          word: "Ina/Nanay",
          meaning: "Mother",
          pronunciation: "EE-nah/nah-NIGH",
        },
        { word: "Anak", meaning: "Child", pronunciation: "AH-nak" },
        { word: "Kapatid", meaning: "Sibling", pronunciation: "kah-pah-TEED" },
        { word: "Lolo", meaning: "Grandfather", pronunciation: "LOH-loh" },
        { word: "Lola", meaning: "Grandmother", pronunciation: "LOH-lah" },
        { word: "Tito", meaning: "Uncle", pronunciation: "TEE-toh" },
        { word: "Tita", meaning: "Aunt", pronunciation: "TEE-tah" },
      ],
      tips: [
        "Tatay/Nanay are more informal than Ama/Ina",
        "Lolo/Lola can also be used for any elderly person as respect",
        "Tito/Tita are often used for family friends too",
      ],
      culturalNotes:
        "Filipino families are typically close-knit and extended family members play important roles.",
    },
    exercises: [
      {
        type: "match",
        question: "Match the Tagalog words with their English meanings",
        pairs: [
          { tagalog: "Ama", english: "Father" },
          { tagalog: "Ina", english: "Mother" },
          { tagalog: "Anak", english: "Child" },
          { tagalog: "Kapatid", english: "Sibling" },
        ],
        xp: 15,
      },
      {
        type: "fillBlank",
        question: "Ang aking _____ ay mabait (my grandfather is kind).",
        answer: "lolo",
        hint: "This is a common term of endearment for elderly men in Filipino culture",
        xp: 8,
      },
      {
        type: "multipleChoice",
        question: "Which word means 'aunt' in Tagalog?",
        answer: "Tita",
        options: ["Tito", "Tita", "Pinsan", "Pamangkin"],
        xp: 5,
      },
      {
        type: "speaking",
        question: "Read aloud the following sentence about family:",
        text: "Ito ang aking ama",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and arrange the words to form the sentence:",
        text: "Ang pamilya ko ay malaki",
        answer: "Ang pamilya ko ay malaki",
        wordBank: ["Ang", "pamilya", "ko", "ay", "malaki", "maliit"],
        xp: 15,
      },
    ],
  },
  {
    id: 3,
    title: "Numbers 1-10",
    description: "Count from one to ten in Tagalog",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ilan ito?",
          english: "How many is this?",
          pronunciation: "ee-LAHN ee-TOH",
        },
        {
          tagalog: "Bilang mo",
          english: "Count it",
          pronunciation: "BEE-lang moh",
        },
      ],
      vocabulary: [
        { word: "Isa", meaning: "One", pronunciation: "EE-sah" },
        { word: "Dalawa", meaning: "Two", pronunciation: "dah-LAH-wah" },
        { word: "Tatlo", meaning: "Three", pronunciation: "taht-LOH" },
        { word: "Apat", meaning: "Four", pronunciation: "AH-paht" },
        { word: "Lima", meaning: "Five", pronunciation: "LEE-mah" },
        { word: "Anim", meaning: "Six", pronunciation: "AH-neem" },
        { word: "Pito", meaning: "Seven", pronunciation: "pee-TOH" },
        { word: "Walo", meaning: "Eight", pronunciation: "wah-LOH" },
        { word: "Siyam", meaning: "Nine", pronunciation: "see-YAHM" },
        { word: "Sampu", meaning: "Ten", pronunciation: "sahm-POO" },
      ],
      tips: [
        "Practice counting objects around you",
        "Numbers are essential for shopping and daily activities",
        "Memorize through repetition and visual association",
      ],
      culturalNotes:
        "Numbers are crucial for bargaining in Filipino markets and understanding prices.",
    },
    exercises: [
      {
        type: "match",
        question: "Match the Tagalog numbers with their values",
        pairs: [
          { tagalog: "Isa", english: "1" },
          { tagalog: "Dalawa", english: "2" },
          { tagalog: "Tatlo", english: "3" },
          { tagalog: "Apat", english: "4" },
          { tagalog: "Lima", english: "5" },
        ],
        xp: 15,
      },
      {
        type: "fillBlank",
        question: "May _____ (six) na mangga sa mesa.",
        answer: "anim",
        hint: "This follows after 'lima' (five)",
        xp: 8,
      },
      {
        type: "multipleChoice",
        question: "What is 'ten' in Tagalog?",
        answer: "Sampu",
        options: ["Siyam", "Walo", "Sampu", "Pito"],
        xp: 5,
      },
      {
        type: "speaking",
        question: "Read aloud the numbers from one to five:",
        text: "Isa, dalawa, tatlo, apat, lima",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and select the correct sequence of numbers:",
        text: "Anim, pito, walo",
        answer: "Anim, pito, walo",
        wordBank: ["Anim", "pito", "walo", "siyam", "lima", "apat"],
        xp: 15,
      },
    ],
  },
  {
    id: 4,
    title: "Colors",
    description: "Learn basic colors in Tagalog",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong kulay ito?",
          english: "What color is this?",
          pronunciation: "ah-NOHNG koo-LIGH ee-TOH",
        },
        {
          tagalog: "Gusto ko ang kulay...",
          english: "I like the color...",
          pronunciation: "goos-TOH koh ang koo-LIGH",
        },
      ],
      vocabulary: [
        { word: "Pula", meaning: "Red", pronunciation: "poo-LAH" },
        { word: "Asul", meaning: "Blue", pronunciation: "ah-SOOL" },
        { word: "Dilaw", meaning: "Yellow", pronunciation: "dee-LAW" },
        { word: "Berde", meaning: "Green", pronunciation: "ber-DEH" },
        { word: "Itim", meaning: "Black", pronunciation: "ee-TEEM" },
        { word: "Puti", meaning: "White", pronunciation: "poo-TEE" },
        { word: "Kahel", meaning: "Orange", pronunciation: "kah-HEHL" },
        { word: "Lila", meaning: "Purple", pronunciation: "lee-LAH" },
      ],
      tips: [
        "Associate colors with common objects",
        "Practice describing things around you",
        "Colors can help in shopping and describing items",
      ],
      culturalNotes:
        "Colors have significance in Filipino culture - red and yellow are in the flag, white represents peace.",
    },
    exercises: [
      {
        type: "translate",
        question: "Red",
        answer: "Pula",
        options: ["Pula", "Asul", "Dilaw", "Berde"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What color is 'berde' in English?",
        answer: "Green",
        options: ["Blue", "Green", "Yellow", "Purple"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang kulay ng araw ay _____ (yellow).",
        answer: "dilaw",
        hint: "This color is associated with brightness and sunshine",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this color description:",
        text: "Anong kulay ito? Pula ito.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and select the correct color sequence:",
        text: "Pula, puti, asul",
        answer: "Pula, puti, asul",
        wordBank: ["Pula", "puti", "asul", "dilaw", "berde", "itim"],
        xp: 15,
      },
    ],
  },
  {
    id: 5,
    title: "Days of the Week",
    description: "Learn the seven days of the week",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong araw ngayon?",
          english: "What day is today?",
          pronunciation: "ah-NOHNG ah-RAW ngah-YOHN",
        },
        {
          tagalog: "Bukas ay...",
          english: "Tomorrow is...",
          pronunciation: "BOO-kas eye",
        },
        {
          tagalog: "Kahapon ay...",
          english: "Yesterday was...",
          pronunciation: "kah-hah-POHN eye",
        },
      ],
      vocabulary: [
        { word: "Lunes", meaning: "Monday", pronunciation: "loo-NEHS" },
        { word: "Martes", meaning: "Tuesday", pronunciation: "mar-TEHS" },
        {
          word: "Miyerkules",
          meaning: "Wednesday",
          pronunciation: "mee-yer-koo-LEHS",
        },
        { word: "Huwebes", meaning: "Thursday", pronunciation: "hoo-WEH-behs" },
        { word: "Biyernes", meaning: "Friday", pronunciation: "bee-yer-NEHS" },
        { word: "Sabado", meaning: "Saturday", pronunciation: "sah-BAH-doh" },
        { word: "Linggo", meaning: "Sunday", pronunciation: "leeng-GOH" },
      ],
      tips: [
        "Most day names come from Spanish origins",
        "Sunday (Linggo) is typically the start of the Filipino week",
        "Practice by saying what day it is each morning",
      ],
      culturalNotes:
        "Sunday is traditionally family day in Filipino culture, often spent together at church and meals.",
    },
    exercises: [
      {
        type: "match",
        question: "Match the days with their Tagalog names",
        pairs: [
          { tagalog: "Lunes", english: "Monday" },
          { tagalog: "Martes", english: "Tuesday" },
          { tagalog: "Miyerkules", english: "Wednesday" },
          { tagalog: "Huwebes", english: "Thursday" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is 'Friday' in Tagalog?",
        answer: "Biyernes",
        options: ["Sabado", "Biyernes", "Linggo", "Lunes"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang weekend ay nagsisimula sa _____ (Saturday).",
        answer: "Sabado",
        hint: "This day comes before Sunday",
        xp: 8,
      },
    ],
  },
  {
    id: 6,
    title: "Common Verbs",
    description: "Learn essential action words",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang ginagawa mo?",
          english: "What are you doing?",
          pronunciation: "ah-NOH ang gee-nah-gah-WAH moh",
        },
        {
          tagalog: "Gusto kong...",
          english: "I want to...",
          pronunciation: "goos-TOH kohng",
        },
      ],
      vocabulary: [
        { word: "Kumain", meaning: "To eat", pronunciation: "koo-mah-EEN" },
        { word: "Uminom", meaning: "To drink", pronunciation: "oo-mee-NOHM" },
        { word: "Matulog", meaning: "To sleep", pronunciation: "mah-too-LOHG" },
        { word: "Lumakad", meaning: "To walk", pronunciation: "loo-mah-KAHD" },
        { word: "Tumakbo", meaning: "To run", pronunciation: "too-mahk-BOH" },
        { word: "Magbasa", meaning: "To read", pronunciation: "mahg-bah-SAH" },
        {
          word: "Magsulat",
          meaning: "To write",
          pronunciation: "mahg-soo-LAHT",
        },
        {
          word: "Makinig",
          meaning: "To listen",
          pronunciation: "mah-kee-NEEG",
        },
      ],
      tips: [
        "Verbs change form based on tense and focus",
        "Start with infinitive forms before learning conjugations",
        "Practice with simple sentences",
      ],
      culturalNotes:
        "Tagalog verbs have a complex system of affixes that change meaning and focus.",
    },
    exercises: [
      {
        type: "translate",
        question: "To eat",
        answer: "Kumain",
        options: ["Kumain", "Uminom", "Matulog", "Lumakad"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'magsulat' mean?",
        answer: "To write",
        options: ["To read", "To write", "To listen", "To sleep"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Gusto kong _____ (sleep) ngayon.",
        answer: "matulog",
        hint: "This verb means to rest during the night",
        xp: 8,
      },
    ],
  },
  {
    id: 7,
    title: "Food and Drinks",
    description: "Learn names of common Filipino foods",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang ulam?",
          english: "What's the viand/dish?",
          pronunciation: "ah-NOH ang oo-LAHM",
        },
        {
          tagalog: "Masarap ito",
          english: "This is delicious",
          pronunciation: "mah-sah-RAHP ee-TOH",
        },
        {
          tagalog: "Gutom na ako",
          english: "I'm hungry",
          pronunciation: "goo-TOHM nah ah-KOH",
        },
      ],
      vocabulary: [
        { word: "Kanin", meaning: "Rice", pronunciation: "kah-NEEN" },
        {
          word: "Adobo",
          meaning: "Filipino stew dish",
          pronunciation: "ah-doh-BOH",
        },
        { word: "Tubig", meaning: "Water", pronunciation: "too-BEEG" },
        { word: "Kape", meaning: "Coffee", pronunciation: "kah-PEH" },
        { word: "Tinapay", meaning: "Bread", pronunciation: "tee-nah-PIGH" },
        { word: "Prutas", meaning: "Fruit", pronunciation: "proo-TAHS" },
        { word: "Gulay", meaning: "Vegetable", pronunciation: "goo-LIGH" },
        { word: "Manok", meaning: "Chicken", pronunciation: "mah-NOHK" },
      ],
      tips: [
        "Rice (kanin) is a staple in Filipino meals",
        "Learn food names to navigate menus and markets",
        "Filipino cuisine has Spanish, Chinese, and Malay influences",
      ],
      culturalNotes:
        "Sharing meals is central to Filipino culture - 'Kain tayo' (Let's eat) is a common invitation.",
    },
    exercises: [
      {
        type: "match",
        question: "Match the food items",
        pairs: [
          { tagalog: "Kanin", english: "Rice" },
          { tagalog: "Tubig", english: "Water" },
          { tagalog: "Kape", english: "Coffee" },
          { tagalog: "Tinapay", english: "Bread" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is the Filipino staple food?",
        answer: "Kanin",
        options: ["Tinapay", "Kanin", "Prutas", "Gulay"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Umiinom ako ng _____ (water) araw-araw.",
        answer: "tubig",
        hint: "This is essential for life and has no taste",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this food conversation:",
        text: "Ano ang ulam? Masarap ang adobo.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and arrange the meal description:",
        text: "Gutom na ako, kain tayo",
        answer: "Gutom na ako, kain tayo",
        wordBank: ["Gutom", "na", "ako", "kain", "tayo", "busog"],
        xp: 15,
      },
    ],
  },
  {
    id: 8,
    title: "Body Parts",
    description: "Learn parts of the human body",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Masakit ang aking...",
          english: "My ... hurts",
          pronunciation: "mah-sah-KEET ang ah-KING",
        },
        {
          tagalog: "Saan ka masakit?",
          english: "Where does it hurt?",
          pronunciation: "sah-AHN kah mah-sah-KEET",
        },
      ],
      vocabulary: [
        { word: "Ulo", meaning: "Head", pronunciation: "oo-LOH" },
        { word: "Mata", meaning: "Eyes", pronunciation: "mah-TAH" },
        { word: "Ilong", meaning: "Nose", pronunciation: "ee-LOHNG" },
        { word: "Bibig", meaning: "Mouth", pronunciation: "bee-BEEG" },
        { word: "Kamay", meaning: "Hand", pronunciation: "kah-MIGH" },
        { word: "Paa", meaning: "Foot", pronunciation: "pah-AH" },
        { word: "Tenga", meaning: "Ear", pronunciation: "teh-NGAH" },
        { word: "Ngipin", meaning: "Teeth", pronunciation: "ngee-PEEN" },
      ],
      tips: [
        "Useful for describing health issues",
        "Important for medical situations",
        "Practice pointing to body parts while saying the words",
      ],
      culturalNotes:
        "Knowing body parts is essential for communicating health concerns and visiting Filipino doctors.",
    },
    exercises: [
      {
        type: "translate",
        question: "Head",
        answer: "Ulo",
        options: ["Ulo", "Mata", "Ilong", "Bibig"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'kamay' mean?",
        answer: "Hand",
        options: ["Foot", "Hand", "Ear", "Eye"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Nagsisipilyo ako ng aking _____ (teeth) tuwing umaga.",
        answer: "ngipin",
        hint: "These are white and used for chewing",
        xp: 8,
      },
    ],
  },
  {
    id: 9,
    title: "Weather",
    description: "Describe weather conditions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kumusta ang panahon?",
          english: "How's the weather?",
          pronunciation: "koo-MUS-tah ang pah-nah-HOHN",
        },
        {
          tagalog: "Mainit ngayon",
          english: "It's hot today",
          pronunciation: "mah-ee-NEET ngah-YOHN",
        },
        {
          tagalog: "Umuulan",
          english: "It's raining",
          pronunciation: "oo-moo-oo-LAHN",
        },
      ],
      vocabulary: [
        { word: "Araw", meaning: "Sun/Day", pronunciation: "ah-RAW" },
        { word: "Ulan", meaning: "Rain", pronunciation: "oo-LAHN" },
        { word: "Hangin", meaning: "Wind", pronunciation: "hah-NGEEN" },
        { word: "Mainit", meaning: "Hot", pronunciation: "mah-ee-NEET" },
        { word: "Malamig", meaning: "Cold", pronunciation: "mah-lah-MEEG" },
        { word: "Maulap", meaning: "Cloudy", pronunciation: "mah-oo-LAHP" },
        {
          word: "Maaliwalas",
          meaning: "Clear/Bright",
          pronunciation: "mah-ah-lee-wah-LAHS",
        },
        { word: "Bagyo", meaning: "Storm/Typhoon", pronunciation: "bahg-YOH" },
      ],
      tips: [
        "Philippines has tropical weather - hot and humid",
        "Rainy season is from June to November",
        "Weather vocabulary is essential for daily conversation",
      ],
      culturalNotes:
        "Philippines experiences typhoons regularly, making weather discussion very common and important.",
    },
    exercises: [
      {
        type: "match",
        question: "Match weather conditions",
        pairs: [
          { tagalog: "Mainit", english: "Hot" },
          { tagalog: "Malamig", english: "Cold" },
          { tagalog: "Ulan", english: "Rain" },
          { tagalog: "Hangin", english: "Wind" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is a typhoon called in Tagalog?",
        answer: "Bagyo",
        options: ["Ulan", "Bagyo", "Hangin", "Araw"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang panahon ngayon ay _____ (cloudy).",
        answer: "maulap",
        hint: "This describes when the sky is covered with clouds",
        xp: 8,
      },
    ],
  },
  {
    id: 10,
    title: "Basic Pronouns",
    description: "Learn personal pronouns",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ako ay...",
          english: "I am...",
          pronunciation: "ah-KOH eye",
        },
        {
          tagalog: "Ikaw ay...",
          english: "You are...",
          pronunciation: "ee-KAW eye",
        },
        {
          tagalog: "Siya ay...",
          english: "He/She is...",
          pronunciation: "see-YAH eye",
        },
      ],
      vocabulary: [
        { word: "Ako", meaning: "I/Me", pronunciation: "ah-KOH" },
        { word: "Ikaw/Ka", meaning: "You", pronunciation: "ee-KAW/kah" },
        { word: "Siya", meaning: "He/She", pronunciation: "see-YAH" },
        { word: "Kami", meaning: "We (exclusive)", pronunciation: "kah-MEE" },
        { word: "Tayo", meaning: "We (inclusive)", pronunciation: "tah-YOH" },
        { word: "Kayo", meaning: "You (plural)", pronunciation: "kah-YOH" },
        { word: "Sila", meaning: "They", pronunciation: "see-LAH" },
        { word: "Ito", meaning: "This", pronunciation: "ee-TOH" },
      ],
      tips: [
        "'Kami' excludes the listener, 'Tayo' includes them",
        "Pronouns can be in different positions in sentences",
        "Context often determines which pronoun to use",
      ],
      culturalNotes:
        "The inclusive/exclusive 'we' distinction is important in Filipino social dynamics.",
    },
    exercises: [
      {
        type: "translate",
        question: "I",
        answer: "Ako",
        options: ["Ako", "Ikaw", "Siya", "Kami"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which pronoun includes the listener in 'we'?",
        answer: "Tayo",
        options: ["Kami", "Tayo", "Kayo", "Sila"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (They) ay mga kaibigan ko.",
        answer: "Sila",
        hint: "This pronoun refers to multiple people, not including yourself",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this introduction:",
        text: "Ako ay estudyante. Ikaw ay guro.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and build the sentence about us:",
        text: "Tayo ay mga kaibigan",
        answer: "Tayo ay mga kaibigan",
        wordBank: ["Tayo", "ay", "mga", "kaibigan", "Kami", "sila"],
        xp: 15,
      },
    ],
  },
  {
    id: 11,
    title: "Months of the Year",
    description: "Learn the twelve months",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong buwan ngayon?",
          english: "What month is it now?",
          pronunciation: "ah-NOHNG boo-WAHN ngah-YOHN",
        },
        {
          tagalog: "Ipinanganak ako sa buwan ng...",
          english: "I was born in the month of...",
          pronunciation: "ee-pee-nahn-GAH-nak ah-KOH sah boo-WAHN ng",
        },
      ],
      vocabulary: [
        { word: "Enero", meaning: "January", pronunciation: "eh-NEH-roh" },
        { word: "Pebrero", meaning: "February", pronunciation: "peh-BREH-roh" },
        { word: "Marso", meaning: "March", pronunciation: "mar-SOH" },
        { word: "Abril", meaning: "April", pronunciation: "ah-BREEL" },
        { word: "Mayo", meaning: "May", pronunciation: "mah-YOH" },
        { word: "Hunyo", meaning: "June", pronunciation: "hoon-YOH" },
        { word: "Hulyo", meaning: "July", pronunciation: "hool-YOH" },
        { word: "Agosto", meaning: "August", pronunciation: "ah-GOHS-toh" },
        {
          word: "Setyembre",
          meaning: "September",
          pronunciation: "set-YEHM-breh",
        },
        { word: "Oktubre", meaning: "October", pronunciation: "ohk-TOO-breh" },
        {
          word: "Nobyembre",
          meaning: "November",
          pronunciation: "nohb-YEHM-breh",
        },
        {
          word: "Disyembre",
          meaning: "December",
          pronunciation: "dees-YEHM-breh",
        },
      ],
      tips: [
        "Most month names derive from Spanish",
        "Useful for dates, birthdays, and appointments",
        "Practice with important dates in your life",
      ],
      culturalNotes:
        "Different months have significance - December is Christmas season, June starts school year.",
    },
    exercises: [
      {
        type: "match",
        question: "Match the months",
        pairs: [
          { tagalog: "Enero", english: "January" },
          { tagalog: "Mayo", english: "May" },
          { tagalog: "Agosto", english: "August" },
          { tagalog: "Disyembre", english: "December" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What month is 'Hunyo'?",
        answer: "June",
        options: ["May", "June", "July", "August"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang Pasko ay sa buwan ng _____ (December).",
        answer: "Disyembre",
        hint: "This is the last month of the year",
        xp: 8,
      },
    ],
  },
  {
    id: 12,
    title: "Clothing",
    description: "Learn names of clothing items",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang suot mo?",
          english: "What are you wearing?",
          pronunciation: "ah-NOH ang soo-OHT moh",
        },
        {
          tagalog: "Maganda ang damit mo",
          english: "Your clothes are beautiful",
          pronunciation: "mah-gan-DAH ang dah-MEET moh",
        },
      ],
      vocabulary: [
        { word: "Damit", meaning: "Clothes", pronunciation: "dah-MEET" },
        { word: "Sapatos", meaning: "Shoes", pronunciation: "sah-pah-TOHS" },
        { word: "Sombrero", meaning: "Hat", pronunciation: "som-BREH-roh" },
        { word: "Salwal", meaning: "Pants", pronunciation: "sahl-WAHL" },
        { word: "Polo", meaning: "Shirt", pronunciation: "poh-LOH" },
        { word: "Baro", meaning: "Dress/Top", pronunciation: "bah-ROH" },
        { word: "Medyas", meaning: "Socks", pronunciation: "med-YAHS" },
        { word: "Singsing", meaning: "Ring", pronunciation: "sing-SING" },
      ],
      tips: [
        "Essential for shopping and describing appearance",
        "Many clothing words come from Spanish",
        "Context helps determine formal vs casual clothing terms",
      ],
      culturalNotes:
        "Traditional Filipino clothing includes barong tagalog for men and terno for women.",
    },
    exercises: [
      {
        type: "translate",
        question: "Shoes",
        answer: "Sapatos",
        options: ["Sapatos", "Sombrero", "Salwal", "Medyas"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'damit' mean?",
        answer: "Clothes",
        options: ["Shoes", "Hat", "Clothes", "Ring"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Nagsusuot ako ng _____ (socks) sa aking paa.",
        answer: "medyas",
        hint: "These go on your feet inside shoes",
        xp: 8,
      },
    ],
  },
  {
    id: 13,
    title: "Transportation",
    description: "Learn modes of transportation",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Paano ako makakarating doon?",
          english: "How can I get there?",
          pronunciation: "pah-ah-NOH ah-KOH mah-kah-kah-rah-TEENG doh-OHN",
        },
        {
          tagalog: "Sumakay tayo sa...",
          english: "Let's ride the...",
          pronunciation: "soo-mah-KIGH tah-YOH sah",
        },
      ],
      vocabulary: [
        { word: "Kotse", meaning: "Car", pronunciation: "koht-SEH" },
        { word: "Bus", meaning: "Bus", pronunciation: "bahs" },
        { word: "Jeepney", meaning: "Jeepney", pronunciation: "jeep-NEE" },
        { word: "Tren", meaning: "Train", pronunciation: "trehn" },
        {
          word: "Bisikleta",
          meaning: "Bicycle",
          pronunciation: "bee-see-kleh-TAH",
        },
        { word: "Motor", meaning: "Motorcycle", pronunciation: "moh-TOHR" },
        { word: "Taksi", meaning: "Taxi", pronunciation: "tahk-SEE" },
        { word: "Bangka", meaning: "Boat", pronunciation: "bahng-KAH" },
      ],
      tips: [
        "Jeepneys are iconic Filipino public transport",
        "Essential for navigating Philippine cities",
        "Different regions may have unique transport options",
      ],
      culturalNotes:
        "Jeepneys are a symbol of Filipino ingenuity and are the most popular public transport.",
    },
    exercises: [
      {
        type: "match",
        question: "Match transportation modes",
        pairs: [
          { tagalog: "Kotse", english: "Car" },
          { tagalog: "Jeepney", english: "Jeepney" },
          { tagalog: "Bisikleta", english: "Bicycle" },
          { tagalog: "Bangka", english: "Boat" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is the most iconic Filipino public transport?",
        answer: "Jeepney",
        options: ["Bus", "Jeepney", "Taksi", "Tren"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Nakasakay ako sa aking _____ (bicycle) papunta sa trabaho.",
        answer: "bisikleta",
        hint: "This has two wheels and you pedal it",
        xp: 8,
      },
    ],
  },
  {
    id: 14,
    title: "Time Expressions",
    description: "Learn to tell time and express when",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong oras na?",
          english: "What time is it?",
          pronunciation: "ah-NOHNG oh-RAHS nah",
        },
        {
          tagalog: "Kailan ka pupunta?",
          english: "When will you go?",
          pronunciation: "kah-ee-LAHN kah poo-poon-TAH",
        },
      ],
      vocabulary: [
        { word: "Oras", meaning: "Time/Hour", pronunciation: "oh-RAHS" },
        { word: "Minuto", meaning: "Minute", pronunciation: "mee-noo-TOH" },
        { word: "Ngayon", meaning: "Now", pronunciation: "ngah-YOHN" },
        { word: "Mamaya", meaning: "Later", pronunciation: "mah-mah-YAH" },
        {
          word: "Kahapon",
          meaning: "Yesterday",
          pronunciation: "kah-hah-POHN",
        },
        { word: "Bukas", meaning: "Tomorrow", pronunciation: "boo-KAHS" },
        { word: "Umaga", meaning: "Morning", pronunciation: "oo-MAH-gah" },
        { word: "Gabi", meaning: "Night", pronunciation: "gah-BEE" },
      ],
      tips: [
        "Time expressions are crucial for appointments",
        "Learn both formal and casual time expressions",
        "Practice with daily schedule vocabulary",
      ],
      culturalNotes:
        "'Filipino time' refers to the cultural tendency to arrive later than scheduled - though punctuality is appreciated in business.",
    },
    exercises: [
      {
        type: "translate",
        question: "Now",
        answer: "Ngayon",
        options: ["Ngayon", "Mamaya", "Kahapon", "Bukas"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'bukas' mean?",
        answer: "Tomorrow",
        options: ["Yesterday", "Today", "Tomorrow", "Later"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Makikita kita _____ (later).",
        answer: "mamaya",
        hint: "This refers to a time in the near future, same day",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this time question:",
        text: "Anong oras na? Alas tres na.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and arrange the time expression:",
        text: "Kailan ka pupunta? Bukas umaga.",
        answer: "Kailan ka pupunta? Bukas umaga.",
        wordBank: ["Kailan", "ka", "pupunta", "Bukas", "umaga", "gabi"],
        xp: 15,
      },
    ],
  },
  {
    id: 15,
    title: "Emotions",
    description: "Express feelings and emotions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kumusta ang pakiramdam mo?",
          english: "How are you feeling?",
          pronunciation: "koo-MUS-tah ang pah-kee-rahm-DAHM moh",
        },
        {
          tagalog: "Masaya ako",
          english: "I am happy",
          pronunciation: "mah-sah-YAH ah-KOH",
        },
      ],
      vocabulary: [
        { word: "Masaya", meaning: "Happy", pronunciation: "mah-sah-YAH" },
        { word: "Malungkot", meaning: "Sad", pronunciation: "mah-loong-KOHT" },
        { word: "Galit", meaning: "Angry", pronunciation: "gah-LEET" },
        { word: "Takot", meaning: "Afraid", pronunciation: "tah-KOHT" },
        { word: "Excited", meaning: "Excited", pronunciation: "ek-sigh-TEHD" },
        { word: "Pagod", meaning: "Tired", pronunciation: "pah-GOHD" },
        { word: "Gutom", meaning: "Hungry", pronunciation: "goo-TOHM" },
        { word: "Uhaw", meaning: "Thirsty", pronunciation: "oo-HAW" },
      ],
      tips: [
        "Essential for expressing your state of mind",
        "Helps in building emotional connections",
        "Can be combined with intensity words",
      ],
      culturalNotes:
        "Filipinos value emotional expression and asking about feelings shows care and concern.",
    },
    exercises: [
      {
        type: "match",
        question: "Match emotions",
        pairs: [
          { tagalog: "Masaya", english: "Happy" },
          { tagalog: "Malungkot", english: "Sad" },
          { tagalog: "Galit", english: "Angry" },
          { tagalog: "Takot", english: "Afraid" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "How do you say 'tired' in Tagalog?",
        answer: "Pagod",
        options: ["Gutom", "Pagod", "Uhaw", "Takot"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (Hungry) na ako, kumain na tayo.",
        answer: "Gutom",
        hint: "This feeling makes you want to eat food",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this emotional expression:",
        text: "Kumusta ang pakiramdam mo? Masaya ako ngayon.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and complete the feeling conversation:",
        text: "Pagod na ako, kailangan ko magpahinga",
        answer: "Pagod na ako, kailangan ko magpahinga",
        wordBank: [
          "Pagod",
          "na",
          "ako",
          "kailangan",
          "ko",
          "magpahinga",
          "masaya",
        ],
        xp: 15,
      },
    ],
  },
  {
    id: 16,
    title: "Animals",
    description: "Learn names of common animals",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong hayop ito?",
          english: "What animal is this?",
          pronunciation: "ah-NOHNG hah-YOHP ee-TOH",
        },
        {
          tagalog: "May alagang hayop ka ba?",
          english: "Do you have a pet?",
          pronunciation: "migh ah-lah-gahng hah-YOHP kah bah",
        },
      ],
      vocabulary: [
        { word: "Aso", meaning: "Dog", pronunciation: "ah-SOH" },
        { word: "Pusa", meaning: "Cat", pronunciation: "poo-SAH" },
        { word: "Ibon", meaning: "Bird", pronunciation: "ee-BOHN" },
        { word: "Isda", meaning: "Fish", pronunciation: "ees-DAH" },
        { word: "Kabayo", meaning: "Horse", pronunciation: "kah-bah-YOH" },
        { word: "Baboy", meaning: "Pig", pronunciation: "bah-BOY" },
        { word: "Baka", meaning: "Cow", pronunciation: "bah-KAH" },
        { word: "Manok", meaning: "Chicken", pronunciation: "mah-NOHK" },
      ],
      tips: [
        "Useful for describing pets and farm animals",
        "Many animals are also food items in Filipino cuisine",
        "Some animals have cultural significance",
      ],
      culturalNotes:
        "Dogs are popular pets in the Philippines, and roosters are important in traditional cockfighting culture.",
    },
    exercises: [
      {
        type: "translate",
        question: "Dog",
        answer: "Aso",
        options: ["Aso", "Pusa", "Ibon", "Isda"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What animal is 'pusa'?",
        answer: "Cat",
        options: ["Dog", "Cat", "Bird", "Fish"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (bird) ay lumilipad sa langit.",
        answer: "ibon",
        hint: "This animal has wings and can fly",
        xp: 8,
      },
    ],
  },
  {
    id: 17,
    title: "House and Home",
    description: "Learn parts of a house and home items",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Nasaan ang...?",
          english: "Where is the...?",
          pronunciation: "nah-sah-AHN ang",
        },
        {
          tagalog: "Maligayang pagdating sa aming bahay",
          english: "Welcome to our house",
          pronunciation:
            "mah-lee-gah-yahng pahg-dah-teeng sah ah-MEENG bah-HIGH",
        },
      ],
      vocabulary: [
        { word: "Bahay", meaning: "House", pronunciation: "bah-HIGH" },
        { word: "Sala", meaning: "Living room", pronunciation: "sah-LAH" },
        { word: "Kusina", meaning: "Kitchen", pronunciation: "koo-see-NAH" },
        { word: "Banyo", meaning: "Bathroom", pronunciation: "bahn-YOH" },
        { word: "Kwarto", meaning: "Room", pronunciation: "kwar-TOH" },
        { word: "Pinto", meaning: "Door", pronunciation: "peen-TOH" },
        { word: "Bintana", meaning: "Window", pronunciation: "been-tah-NAH" },
        { word: "Sahig", meaning: "Floor", pronunciation: "sah-HEEG" },
      ],
      tips: [
        "Essential for describing living spaces",
        "Helps when looking for housing",
        "Useful for giving directions inside homes",
      ],
      culturalNotes:
        "Filipino homes often have an extended family setup, with multiple generations living together.",
    },
    exercises: [
      {
        type: "match",
        question: "Match house parts",
        pairs: [
          { tagalog: "Bahay", english: "House" },
          { tagalog: "Kusina", english: "Kitchen" },
          { tagalog: "Banyo", english: "Bathroom" },
          { tagalog: "Kwarto", english: "Room" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "Where do you cook food?",
        answer: "Kusina",
        options: ["Sala", "Kusina", "Banyo", "Kwarto"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Pakisara ang _____ (door).",
        answer: "pinto",
        hint: "You use this to enter and exit rooms",
        xp: 8,
      },
    ],
  },
  {
    id: 18,
    title: "Jobs and Professions",
    description: "Learn different occupations",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang trabaho mo?",
          english: "What is your job?",
          pronunciation: "ah-NOH ang trah-bah-HOH moh",
        },
        {
          tagalog: "Gusto kong maging...",
          english: "I want to become...",
          pronunciation: "goos-TOH kohng mah-GEENG",
        },
      ],
      vocabulary: [
        { word: "Doktor", meaning: "Doctor", pronunciation: "dok-TOHR" },
        { word: "Nars", meaning: "Nurse", pronunciation: "nahrs" },
        { word: "Guro", meaning: "Teacher", pronunciation: "goo-ROH" },
        {
          word: "Inhinyero",
          meaning: "Engineer",
          pronunciation: "een-hee-nyeh-ROH",
        },
        { word: "Abogado", meaning: "Lawyer", pronunciation: "ah-boh-gah-DOH" },
        { word: "Pulis", meaning: "Police", pronunciation: "poo-LEES" },
        {
          word: "Tindero",
          meaning: "Store keeper",
          pronunciation: "teen-deh-ROH",
        },
        { word: "Driver", meaning: "Driver", pronunciation: "DRAH-ee-ver" },
      ],
      tips: [
        "Important for introductions and networking",
        "Many professional terms derive from Spanish or English",
        "Gender variations exist for some professions",
      ],
      culturalNotes:
        "Education and professional achievement are highly valued in Filipino culture.",
    },
    exercises: [
      {
        type: "translate",
        question: "Teacher",
        answer: "Guro",
        options: ["Guro", "Doktor", "Nars", "Pulis"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Who works in a hospital treating patients?",
        answer: "Doktor",
        options: ["Guro", "Doktor", "Abogado", "Driver"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (police) ay tumutulong sa kapayapaan.",
        answer: "pulis",
        hint: "This person enforces the law and wears a uniform",
        xp: 8,
      },
    ],
  },
  {
    id: 19,
    title: "Shopping",
    description: "Learn shopping vocabulary and phrases",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Magkano ito?",
          english: "How much is this?",
          pronunciation: "mahg-kah-NOH ee-TOH",
        },
        {
          tagalog: "Pwedeng tawad?",
          english: "Can you give a discount?",
          pronunciation: "PWEH-dehng tah-WAHD",
        },
        {
          tagalog: "Bibili ako ng...",
          english: "I will buy...",
          pronunciation: "bee-bee-LEE ah-KOH ng",
        },
      ],
      vocabulary: [
        { word: "Tindahan", meaning: "Store", pronunciation: "teen-dah-HAHN" },
        { word: "Bayad", meaning: "Payment", pronunciation: "bah-YAHD" },
        { word: "Sukli", meaning: "Change (money)", pronunciation: "sook-LEE" },
        { word: "Presyo", meaning: "Price", pronunciation: "prehs-YOH" },
        { word: "Mura", meaning: "Cheap", pronunciation: "moo-RAH" },
        { word: "Mahal", meaning: "Expensive", pronunciation: "mah-HAHL" },
        { word: "Sale", meaning: "Sale", pronunciation: "seyl" },
        { word: "Basket", meaning: "Basket", pronunciation: "bas-keht" },
      ],
      tips: [
        "Bargaining is common in local markets",
        "Know your numbers for prices",
        "Politeness helps in getting better deals",
      ],
      culturalNotes:
        "Filipino markets encourage haggling, but department stores have fixed prices.",
    },
    exercises: [
      {
        type: "match",
        question: "Match shopping terms",
        pairs: [
          { tagalog: "Bayad", english: "Payment" },
          { tagalog: "Sukli", english: "Change" },
          { tagalog: "Mura", english: "Cheap" },
          { tagalog: "Mahal", english: "Expensive" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What do you ask to know the cost of something?",
        answer: "Magkano ito?",
        options: ["Kumusta?", "Magkano ito?", "Nasaan ito?", "Kailan ito?"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang item na ito ay napaka-_____ (expensive).",
        answer: "mahal",
        hint: "This describes something that costs a lot of money",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud this shopping conversation:",
        text: "Magkano ito? Pwedeng tawad?",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and arrange the shopping transaction:",
        text: "Bibili ako ng sapatos, magkano?",
        answer: "Bibili ako ng sapatos, magkano?",
        wordBank: ["Bibili", "ako", "ng", "sapatos", "magkano", "mura"],
        xp: 15,
      },
    ],
  },
  {
    id: 20,
    title: "Directions",
    description: "Learn to ask for and give directions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Nasaan ang...?",
          english: "Where is the...?",
          pronunciation: "nah-sah-AHN ang",
        },
        {
          tagalog: "Paano pumunta sa...?",
          english: "How to go to...?",
          pronunciation: "pah-ah-NOH poo-moon-TAH sah",
        },
        {
          tagalog: "Diretso lang",
          english: "Just go straight",
          pronunciation: "dee-reht-SOH lahng",
        },
      ],
      vocabulary: [
        { word: "Kanan", meaning: "Right", pronunciation: "kah-NAHN" },
        { word: "Kaliwa", meaning: "Left", pronunciation: "kah-lee-WAH" },
        { word: "Diretso", meaning: "Straight", pronunciation: "dee-reht-SOH" },
        { word: "Malapit", meaning: "Near", pronunciation: "mah-lah-PEET" },
        { word: "Malayo", meaning: "Far", pronunciation: "mah-lah-YOH" },
        { word: "Tawid", meaning: "Cross", pronunciation: "tah-WEED" },
        { word: "Kanto", meaning: "Corner", pronunciation: "kahn-TOH" },
        { word: "Daan", meaning: "Road/Way", pronunciation: "dah-AHN" },
      ],
      tips: [
        "Essential for navigation in the Philippines",
        "Use landmarks as reference points",
        "Don't hesitate to ask locals for help",
      ],
      culturalNotes:
        "Filipinos are generally helpful with directions and will often go out of their way to assist foreigners.",
    },
    exercises: [
      {
        type: "translate",
        question: "Left",
        answer: "Kaliwa",
        options: ["Kanan", "Kaliwa", "Diretso", "Malapit"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'malayo' mean?",
        answer: "Far",
        options: ["Near", "Far", "Straight", "Corner"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Kumanan sa susunod na _____ (corner).",
        answer: "kanto",
        hint: "This is where two streets meet",
        xp: 8,
      },
      {
        type: "speaking",
        question: "Read aloud these direction instructions:",
        text: "Nasaan ang tindahan? Diretso lang, tapos kanan.",
        xp: 12,
      },
      {
        type: "listening",
        question: "Listen and build the direction question:",
        text: "Paano pumunta sa ospital?",
        answer: "Paano pumunta sa ospital?",
        wordBank: ["Paano", "pumunta", "sa", "ospital", "simbahan", "malapit"],
        xp: 15,
      },
    ],
  },
  {
    id: 21,
    title: "School and Education",
    description: "Learn school-related vocabulary",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Nag-aaral ako sa...",
          english: "I study at...",
          pronunciation: "nahg-ah-ah-RAHL ah-KOH sah",
        },
        {
          tagalog: "Anong kurso mo?",
          english: "What's your course?",
          pronunciation: "ah-NOHNG koor-SOH moh",
        },
      ],
      vocabulary: [
        {
          word: "Paaralan",
          meaning: "School",
          pronunciation: "pah-ah-rah-LAHN",
        },
        {
          word: "Estudyante",
          meaning: "Student",
          pronunciation: "ehs-tood-YAHN-teh",
        },
        { word: "Klase", meaning: "Class", pronunciation: "klah-SEH" },
        { word: "Libro", meaning: "Book", pronunciation: "leeb-ROH" },
        { word: "Lapis", meaning: "Pencil", pronunciation: "lah-PEES" },
        { word: "Papel", meaning: "Paper", pronunciation: "pah-PEHL" },
        { word: "Eksamen", meaning: "Exam", pronunciation: "ehk-sah-MEHN" },
        {
          word: "Takdang-aralin",
          meaning: "Homework",
          pronunciation: "tahk-dahng ah-rah-LEEN",
        },
      ],
      tips: [
        "Education vocabulary is useful for students",
        "Many academic terms are borrowed from English or Spanish",
        "School system in Philippines follows American model",
      ],
      culturalNotes:
        "Education is highly prized in Filipino families, with parents making sacrifices for children's schooling.",
    },
    exercises: [
      {
        type: "match",
        question: "Match school items",
        pairs: [
          { tagalog: "Libro", english: "Book" },
          { tagalog: "Lapis", english: "Pencil" },
          { tagalog: "Papel", english: "Paper" },
          { tagalog: "Klase", english: "Class" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What do you call a person who studies?",
        answer: "Estudyante",
        options: ["Guro", "Estudyante", "Doktor", "Abogado"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Kailangan kong mag-aral para sa aking _____ (exam) bukas.",
        answer: "eksamen",
        hint: "This is a test to measure your knowledge",
        xp: 8,
      },
    ],
  },
  {
    id: 22,
    title: "Health and Medicine",
    description: "Learn health-related vocabulary",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Hindi ako masarap ang pakiramdam",
          english: "I don't feel well",
          pronunciation: "heen-DEE ah-KOH mah-sah-RAHP ang pah-kee-rahm-DAHM",
        },
        {
          tagalog: "Kailangan kong pumunta sa ospital",
          english: "I need to go to the hospital",
          pronunciation: "kah-ee-lah-NGAHN kohng poo-moon-TAH sah ohs-pee-TAHL",
        },
      ],
      vocabulary: [
        { word: "Ospital", meaning: "Hospital", pronunciation: "ohs-pee-TAHL" },
        { word: "Gamot", meaning: "Medicine", pronunciation: "gah-MOHT" },
        { word: "Sakit", meaning: "Pain/Illness", pronunciation: "sah-KEET" },
        { word: "Lagnat", meaning: "Fever", pronunciation: "lahg-NAHT" },
        { word: "Sipon", meaning: "Cold", pronunciation: "see-POHN" },
        { word: "Ubo", meaning: "Cough", pronunciation: "oo-BOH" },
        { word: "Sugat", meaning: "Wound", pronunciation: "soo-GAHT" },
        { word: "Dugo", meaning: "Blood", pronunciation: "doo-GOH" },
      ],
      tips: [
        "Essential vocabulary for medical emergencies",
        "Learn to describe symptoms clearly",
        "Know how to ask for help in health situations",
      ],
      culturalNotes:
        "Traditional Filipino medicine includes herbal remedies alongside modern medical treatment.",
    },
    exercises: [
      {
        type: "translate",
        question: "Medicine",
        answer: "Gamot",
        options: ["Gamot", "Sakit", "Ospital", "Dugo"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What do you call a fever in Tagalog?",
        answer: "Lagnat",
        options: ["Sipon", "Ubo", "Lagnat", "Sugat"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "May _____ (cough) ako at kailangan ko ng gamot.",
        answer: "ubo",
        hint: "This is a symptom where you make a sudden sound from your throat",
        xp: 8,
      },
    ],
  },
  {
    id: 23,
    title: "Technology",
    description: "Learn modern technology vocabulary",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "May wifi ba dito?",
          english: "Is there wifi here?",
          pronunciation: "migh wai-fai bah dee-TOH",
        },
        {
          tagalog: "Nasaan ang charger ko?",
          english: "Where is my charger?",
          pronunciation: "nah-sah-AHN ang char-jer koh",
        },
      ],
      vocabulary: [
        { word: "Cellphone", meaning: "Cellphone", pronunciation: "sel-fohn" },
        { word: "Computer", meaning: "Computer", pronunciation: "kom-pyu-ter" },
        { word: "Internet", meaning: "Internet", pronunciation: "in-ter-net" },
        { word: "Email", meaning: "Email", pronunciation: "ee-meyl" },
        { word: "Website", meaning: "Website", pronunciation: "web-sait" },
        { word: "Password", meaning: "Password", pronunciation: "pas-wurd" },
        { word: "Download", meaning: "Download", pronunciation: "dawn-lohd" },
        { word: "Upload", meaning: "Upload", pronunciation: "ap-lohd" },
      ],
      tips: [
        "Most tech terms are borrowed from English",
        "Essential for modern communication",
        "Philippines has high social media usage",
      ],
      culturalNotes:
        "Philippines is one of the world's top social media users, especially Facebook and mobile messaging.",
    },
    exercises: [
      {
        type: "match",
        question: "Match technology terms",
        pairs: [
          { tagalog: "Cellphone", english: "Mobile phone" },
          { tagalog: "Internet", english: "Internet" },
          { tagalog: "Email", english: "Electronic mail" },
          { tagalog: "Password", english: "Password" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What do you use to connect to the internet wirelessly?",
        answer: "Wifi",
        options: ["Email", "Wifi", "Password", "Download"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Kailangan kong mag-_____ (download) ng app na ito.",
        answer: "download",
        hint: "This means to transfer data from the internet to your device",
        xp: 8,
      },
    ],
  },
  {
    id: 24,
    title: "Sports and Recreation",
    description: "Learn sports and recreational activities",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Marunong ka bang maglaro ng...?",
          english: "Do you know how to play...?",
          pronunciation: "mah-roo-NOHNG kah bahng mahg-lah-ROH ng",
        },
        {
          tagalog: "Gusto ko maglaro",
          english: "I want to play",
          pronunciation: "goos-TOH koh mahg-lah-ROH",
        },
      ],
      vocabulary: [
        {
          word: "Basketball",
          meaning: "Basketball",
          pronunciation: "bas-ket-bol",
        },
        { word: "Boxing", meaning: "Boxing", pronunciation: "bok-sing" },
        {
          word: "Volleyball",
          meaning: "Volleyball",
          pronunciation: "vo-li-bol",
        },
        {
          word: "Football",
          meaning: "Football/Soccer",
          pronunciation: "fut-bol",
        },
        { word: "Swimming", meaning: "Swimming", pronunciation: "swim-ming" },
        { word: "Running", meaning: "Running", pronunciation: "ra-ning" },
        {
          word: "Badminton",
          meaning: "Badminton",
          pronunciation: "bad-min-ton",
        },
        { word: "Chess", meaning: "Chess", pronunciation: "chess" },
      ],
      tips: [
        "Basketball is extremely popular in the Philippines",
        "Boxing has produced many Filipino champions",
        "Sports are great conversation starters",
      ],
      culturalNotes:
        "Basketball is the most popular sport in the Philippines, played in almost every neighborhood.",
    },
    exercises: [
      {
        type: "translate",
        question: "Basketball",
        answer: "Basketball",
        options: ["Basketball", "Boxing", "Swimming", "Chess"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What sport is most popular in the Philippines?",
        answer: "Basketball",
        options: ["Football", "Basketball", "Boxing", "Swimming"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Si Manny Pacquiao ay sikat sa _____ (boxing).",
        answer: "boxing",
        hint: "This is a combat sport using fists",
        xp: 8,
      },
    ],
  },
  {
    id: 25,
    title: "Money and Banking",
    description: "Learn financial vocabulary",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Magkano ang perang kailangan ko?",
          english: "How much money do I need?",
          pronunciation: "mahg-kah-NOH ang peh-rahng kah-ee-lah-NGAHN koh",
        },
        {
          tagalog: "Saan ang malapit na bangko?",
          english: "Where is the nearest bank?",
          pronunciation: "sah-AHN ang mah-lah-PEET nah bahng-KOH",
        },
      ],
      vocabulary: [
        { word: "Pera", meaning: "Money", pronunciation: "peh-RAH" },
        { word: "Bangko", meaning: "Bank", pronunciation: "bahng-KOH" },
        { word: "ATM", meaning: "ATM", pronunciation: "ay-tee-em" },
        {
          word: "Credit card",
          meaning: "Credit card",
          pronunciation: "kre-dit kard",
        },
        { word: "Utang", meaning: "Debt", pronunciation: "oo-TAHNG" },
        { word: "Ipon", meaning: "Savings", pronunciation: "ee-POHN" },
        { word: "Bayad", meaning: "Payment", pronunciation: "bah-YAHD" },
        { word: "Resibo", meaning: "Receipt", pronunciation: "reh-see-BOH" },
      ],
      tips: [
        "Philippine currency is the Peso (PHP)",
        "Most establishments accept cash",
        "ATMs are widely available in cities",
      ],
      culturalNotes:
        "Filipinos often practice 'paluwagan' - informal savings groups where members contribute regularly.",
    },
    exercises: [
      {
        type: "match",
        question: "Match financial terms",
        pairs: [
          { tagalog: "Pera", english: "Money" },
          { tagalog: "Bangko", english: "Bank" },
          { tagalog: "Utang", english: "Debt" },
          { tagalog: "Ipon", english: "Savings" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is the Filipino currency?",
        answer: "Peso",
        options: ["Dollar", "Peso", "Yen", "Euro"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question:
          "Kailangan kong mag-ipon ng maraming _____ (money) para sa bakasyon.",
        answer: "pera",
        hint: "This is what you use to buy things",
        xp: 8,
      },
    ],
  },
  {
    id: 26,
    title: "Cooking and Kitchen",
    description: "Learn cooking terms and kitchen items",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Marunong ka bang magluto?",
          english: "Do you know how to cook?",
          pronunciation: "mah-roo-NOHNG kah bahng mahg-loo-TOH",
        },
        {
          tagalog: "Ano ang lulutuin natin?",
          english: "What shall we cook?",
          pronunciation: "ah-NOH ang loo-loo-too-EEN nah-TEEN",
        },
      ],
      vocabulary: [
        { word: "Magluto", meaning: "To cook", pronunciation: "mahg-loo-TOH" },
        { word: "Kawali", meaning: "Pan", pronunciation: "kah-wah-LEE" },
        { word: "Kaldero", meaning: "Pot", pronunciation: "kahl-deh-ROH" },
        { word: "Kutsara", meaning: "Spoon", pronunciation: "koot-sah-RAH" },
        { word: "Tinidor", meaning: "Fork", pronunciation: "tee-nee-DOHR" },
        { word: "Kutsilyo", meaning: "Knife", pronunciation: "koot-seel-YOH" },
        { word: "Plato", meaning: "Plate", pronunciation: "plah-TOH" },
        { word: "Baso", meaning: "Glass", pronunciation: "bah-SOH" },
      ],
      tips: [
        "Filipino cooking often involves rice as a base",
        "Many cooking terms come from Spanish",
        "Sharing meals is important in Filipino culture",
      ],
      culturalNotes:
        "Filipino cuisine blends indigenous, Spanish, Chinese, and American influences.",
    },
    exercises: [
      {
        type: "translate",
        question: "To cook",
        answer: "Magluto",
        options: ["Magluto", "Kumain", "Uminom", "Maghugas"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What do you use to eat soup?",
        answer: "Kutsara",
        options: ["Tinidor", "Kutsara", "Kutsilyo", "Plato"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Pakilagay ang pagkain sa _____ (plate).",
        answer: "plato",
        hint: "This is a flat dish you eat from",
        xp: 8,
      },
    ],
  },
  {
    id: 27,
    title: "Festivals and Celebrations",
    description: "Learn about Filipino festivals and celebrations",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Maligayang pagdiriwang!",
          english: "Happy celebration!",
          pronunciation: "mah-lee-gah-yahng pahg-dee-ree-WAHNG",
        },
        {
          tagalog: "Anong pista ngayon?",
          english: "What festival is today?",
          pronunciation: "ah-NOHNG pees-TAH ngah-YOHN",
        },
      ],
      vocabulary: [
        { word: "Pista", meaning: "Festival", pronunciation: "pees-TAH" },
        { word: "Pasko", meaning: "Christmas", pronunciation: "pahs-KOH" },
        {
          word: "Bagong Taon",
          meaning: "New Year",
          pronunciation: "bah-gohng tah-OHN",
        },
        {
          word: "Semana Santa",
          meaning: "Holy Week",
          pronunciation: "seh-mah-nah sahn-TAH",
        },
        {
          word: "Sinulog",
          meaning: "Sinulog Festival",
          pronunciation: "see-noo-LOHG",
        },
        {
          word: "Ati-Atihan",
          meaning: "Ati-Atihan Festival",
          pronunciation: "ah-tee ah-tee-HAHN",
        },
        {
          word: "Flores de Mayo",
          meaning: "Flowers of May",
          pronunciation: "floh-rehs deh mah-YOH",
        },
        { word: "Undas", meaning: "All Saints Day", pronunciation: "oon-DAHS" },
      ],
      tips: [
        "Philippines has many religious and cultural festivals",
        "Each region has unique celebrations",
        "Food and family gatherings are central to Filipino celebrations",
      ],
      culturalNotes:
        "Filipino festivals often combine Catholic traditions with indigenous customs, creating unique celebrations.",
    },
    exercises: [
      {
        type: "match",
        question: "Match celebrations",
        pairs: [
          { tagalog: "Pasko", english: "Christmas" },
          { tagalog: "Bagong Taon", english: "New Year" },
          { tagalog: "Pista", english: "Festival" },
          { tagalog: "Undas", english: "All Saints Day" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is the biggest celebration in the Philippines?",
        answer: "Pasko",
        options: ["Sinulog", "Pasko", "Undas", "Ati-Atihan"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (Holy Week) ay ipinagdiriwang bago ang Easter.",
        answer: "Semana Santa",
        hint: "This is a religious observance in March or April",
        xp: 8,
      },
    ],
  },
  {
    id: 28,
    title: "Nature and Environment",
    description: "Learn about nature and environmental terms",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Maganda ang kalikasan dito",
          english: "Nature is beautiful here",
          pronunciation: "mah-gan-DAH ang kah-lee-kah-SAHN dee-TOH",
        },
        {
          tagalog: "Kailangan nating alagaan ang kapaligiran",
          english: "We need to take care of the environment",
          pronunciation:
            "kah-ee-lah-NGAHN nah-teeng ah-lah-gah-AHN ang kah-pah-lee-gee-RAHN",
        },
      ],
      vocabulary: [
        {
          word: "Kalikasan",
          meaning: "Nature",
          pronunciation: "kah-lee-kah-SAHN",
        },
        { word: "Puno", meaning: "Tree", pronunciation: "poo-NOH" },
        { word: "Bulaklak", meaning: "Flower", pronunciation: "boo-lahk-LAHK" },
        { word: "Bundok", meaning: "Mountain", pronunciation: "boon-DOHK" },
        { word: "Dagat", meaning: "Sea/Ocean", pronunciation: "dah-GAHT" },
        { word: "Ilog", meaning: "River", pronunciation: "ee-LOHG" },
        { word: "Langit", meaning: "Sky", pronunciation: "lah-NEET" },
        { word: "Lupa", meaning: "Earth/Soil", pronunciation: "loo-PAH" },
      ],
      tips: [
        "Philippines is rich in natural beauty",
        "Environmental awareness is growing in the country",
        "Many islands offer diverse ecosystems",
      ],
      culturalNotes:
        "Philippines is an archipelago with over 7,000 islands, making marine conservation very important.",
    },
    exercises: [
      {
        type: "translate",
        question: "Tree",
        answer: "Puno",
        options: ["Puno", "Bulaklak", "Bundok", "Langit"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What surrounds the Philippine islands?",
        answer: "Dagat",
        options: ["Bundok", "Ilog", "Dagat", "Lupa"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang mga _____ (flowers) sa hardin ay namumukadkad.",
        answer: "bulaklak",
        hint: "These are colorful parts of plants that attract bees",
        xp: 8,
      },
    ],
  },
  {
    id: 29,
    title: "Music and Arts",
    description: "Learn about music and artistic expressions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Marunong ka bang kumanta?",
          english: "Do you know how to sing?",
          pronunciation: "mah-roo-NOHNG kah bahng koo-MAHN-tah",
        },
        {
          tagalog: "Magaling ka sa musika",
          english: "You're good at music",
          pronunciation: "mah-gah-LEENG kah sah MOO-see-kah",
        },
      ],
      vocabulary: [
        { word: "Musika", meaning: "Music", pronunciation: "MOO-see-kah" },
        { word: "Kanta", meaning: "Song", pronunciation: "KAHN-tah" },
        { word: "Sayaw", meaning: "Dance", pronunciation: "sah-YAW" },
        { word: "Gitara", meaning: "Guitar", pronunciation: "gee-TAH-rah" },
        { word: "Pinta", meaning: "Paint/Painting", pronunciation: "PEEN-tah" },
        { word: "Sining", meaning: "Art", pronunciation: "SEE-ning" },
        { word: "Tugtog", meaning: "Playing music", pronunciation: "toog-TOG" },
        { word: "Liriko", meaning: "Lyrics", pronunciation: "lee-REE-koh" },
      ],
      tips: [
        "Music is integral to Filipino celebrations",
        "Karaoke is extremely popular in the Philippines",
        "Learning songs is a great way to practice pronunciation",
      ],
      culturalNotes:
        "Filipinos are known for their musical talent and love for singing, with karaoke being a national pastime.",
    },
    exercises: [
      {
        type: "match",
        question: "Match artistic terms",
        pairs: [
          { tagalog: "Musika", english: "Music" },
          { tagalog: "Kanta", english: "Song" },
          { tagalog: "Sayaw", english: "Dance" },
          { tagalog: "Sining", english: "Art" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is 'gitara' in English?",
        answer: "Guitar",
        options: ["Piano", "Guitar", "Violin", "Drums"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Gusto kong matutong mag-_____ (dance) ng tango.",
        answer: "sayaw",
        hint: "This is a rhythmic movement to music",
        xp: 8,
      },
    ],
  },
  {
    id: 30,
    title: "Personality Traits",
    description: "Describe people's character and personality",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang ugali niya?",
          english: "What is his/her personality?",
          pronunciation: "ah-NOH ang oo-GAH-lee nee-YAH",
        },
        {
          tagalog: "Siya ay napakabait",
          english: "He/She is very kind",
          pronunciation: "see-YAH eye nah-pah-kah-bah-EET",
        },
      ],
      vocabulary: [
        { word: "Mabait", meaning: "Kind", pronunciation: "mah-bah-EET" },
        {
          word: "Masipag",
          meaning: "Hardworking",
          pronunciation: "mah-SEE-pag",
        },
        {
          word: "Matalino",
          meaning: "Intelligent",
          pronunciation: "mah-tah-LEE-noh",
        },
        {
          word: "Matulungin",
          meaning: "Helpful",
          pronunciation: "mah-too-LOO-ngin",
        },
        { word: "Masaya", meaning: "Cheerful", pronunciation: "mah-SAH-yah" },
        { word: "Matapang", meaning: "Brave", pronunciation: "mah-TAH-pang" },
        { word: "Mahiyain", meaning: "Shy", pronunciation: "mah-hee-YAH-in" },
        {
          word: "Makulit",
          meaning: "Stubborn/Annoying",
          pronunciation: "mah-koo-LEET",
        },
      ],
      tips: [
        "Many adjectives start with 'ma-' prefix",
        "Use these to describe friends and family",
        "Filipinos value positive personality traits highly",
      ],
      culturalNotes:
        "Being 'mabait' (kind) and 'masipag' (hardworking) are highly valued traits in Filipino culture.",
    },
    exercises: [
      {
        type: "translate",
        question: "Kind",
        answer: "Mabait",
        options: ["Mabait", "Masipag", "Matalino", "Matapang"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which word means 'hardworking'?",
        answer: "Masipag",
        options: ["Mabait", "Masipag", "Mahiyain", "Makulit"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang kaibigan ko ay napaka-_____ (intelligent).",
        answer: "matalino",
        hint: "This describes someone who learns quickly and is smart",
        xp: 8,
      },
    ],
  },
  {
    id: 31,
    title: "Occupations and Workplaces",
    description: "Learn about different workplaces and job activities",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Saan ka nagtatrabaho?",
          english: "Where do you work?",
          pronunciation: "sah-AHN kah nahg-tah-trah-BAH-hoh",
        },
        {
          tagalog: "Gusto ko ang trabaho ko",
          english: "I like my job",
          pronunciation: "goos-TOH koh ang trah-BAH-hoh koh",
        },
      ],
      vocabulary: [
        { word: "Opisina", meaning: "Office", pronunciation: "oh-pee-SEE-nah" },
        { word: "Pabrika", meaning: "Factory", pronunciation: "pah-BREE-kah" },
        {
          word: "Tindahan",
          meaning: "Store/Shop",
          pronunciation: "teen-DAH-han",
        },
        { word: "Ospital", meaning: "Hospital", pronunciation: "ohs-pee-TAHL" },
        {
          word: "Paaralan",
          meaning: "School",
          pronunciation: "pah-ah-RAH-lan",
        },
        { word: "Palengke", meaning: "Market", pronunciation: "pah-LENG-keh" },
        {
          word: "Restawran",
          meaning: "Restaurant",
          pronunciation: "res-taw-RAHN",
        },
        {
          word: "Kumpanya",
          meaning: "Company",
          pronunciation: "koom-PAHN-yah",
        },
      ],
      tips: [
        "Workplaces give context to professional vocabulary",
        "Many Filipinos work overseas, so job terminology is important",
        "Different industries have specialized vocabulary",
      ],
      culturalNotes:
        "Overseas Filipino Workers (OFWs) are a significant part of the economy, with many Filipinos working abroad to support their families.",
    },
    exercises: [
      {
        type: "match",
        question: "Match workplaces",
        pairs: [
          { tagalog: "Opisina", english: "Office" },
          { tagalog: "Pabrika", english: "Factory" },
          { tagalog: "Palengke", english: "Market" },
          { tagalog: "Restawran", english: "Restaurant" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "Where would a doctor work?",
        answer: "Ospital",
        options: ["Opisina", "Ospital", "Paaralan", "Tindahan"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang tatay ko ay nagtatrabaho sa isang _____ (company).",
        answer: "kumpanya",
        hint: "This is a business organization that employs people",
        xp: 8,
      },
    ],
  },
  {
    id: 32,
    title: "Hobbies and Interests",
    description: "Discuss leisure activities and pastimes",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang hilig mo?",
          english: "What are your hobbies?",
          pronunciation: "ah-NOH ang HEE-lig moh",
        },
        {
          tagalog: "Gusto kong mag-",
          english: "I like to...",
          pronunciation: "goos-TOH kohng mahg",
        },
      ],
      vocabulary: [
        { word: "Magbasa", meaning: "To read", pronunciation: "mahg-BAH-sah" },
        { word: "Manood", meaning: "To watch", pronunciation: "mah-NOH-od" },
        { word: "Magluto", meaning: "To cook", pronunciation: "mahg-LOO-toh" },
        { word: "Maglaro", meaning: "To play", pronunciation: "mahg-LAH-roh" },
        {
          word: "Mangolekta",
          meaning: "To collect",
          pronunciation: "mang-oh-LEK-tah",
        },
        {
          word: "Magbiyahe",
          meaning: "To travel",
          pronunciation: "mahg-bee-YAH-heh",
        },
        {
          word: "Mag-photography",
          meaning: "To do photography",
          pronunciation: "mahg-poh-TOG-rah-fee",
        },
        { word: "Mangisda", meaning: "To fish", pronunciation: "mang-EES-dah" },
      ],
      tips: [
        "Hobbies often use the 'mag-' or 'mang-' prefix before the activity",
        "Great conversation starter with Filipino friends",
        "Many Filipinos enjoy social hobbies",
      ],
      culturalNotes:
        "Karaoke, basketball, and social gatherings are popular leisure activities in Filipino culture.",
    },
    exercises: [
      {
        type: "translate",
        question: "To read",
        answer: "Magbasa",
        options: ["Magbasa", "Manood", "Magluto", "Maglaro"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which word means 'to travel'?",
        answer: "Magbiyahe",
        options: ["Mangolekta", "Mangisda", "Magbiyahe", "Manood"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Gusto kong _____ (to cook) tuwing weekend.",
        answer: "magluto",
        hint: "This hobby involves preparing food",
        xp: 8,
      },
    ],
  },
  {
    id: 33,
    title: "Travel and Tourism",
    description: "Learn terms for travel and tourism",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Saan magandang pumunta?",
          english: "Where is a good place to go?",
          pronunciation: "sah-AHN mah-gan-DAHNG poo-MOON-tah",
        },
        {
          tagalog: "Paano pumunta sa...?",
          english: "How do I get to...?",
          pronunciation: "pah-AH-noh poo-MOON-tah sah",
        },
      ],
      vocabulary: [
        {
          word: "Bakasyon",
          meaning: "Vacation",
          pronunciation: "bah-kahs-YOHN",
        },
        { word: "Turista", meaning: "Tourist", pronunciation: "too-REES-tah" },
        { word: "Hotel", meaning: "Hotel", pronunciation: "hoh-TEL" },
        {
          word: "Pasaporte",
          meaning: "Passport",
          pronunciation: "pah-sah-POR-teh",
        },
        {
          word: "Tabing-dagat",
          meaning: "Beach",
          pronunciation: "tah-bing-dah-GAHT",
        },
        {
          word: "Paliparan",
          meaning: "Airport",
          pronunciation: "pah-lee-PAH-ran",
        },
        { word: "Museo", meaning: "Museum", pronunciation: "moo-SEH-oh" },
        {
          word: "Souvenir",
          meaning: "Souvenir",
          pronunciation: "soo-veh-NEER",
        },
      ],
      tips: [
        "Philippines is a major tourist destination",
        "Learn place names of popular Filipino destinations",
        "Transport vocabulary is useful for travelers",
      ],
      culturalNotes:
        "The Philippines has over 7,000 islands with many beautiful beaches, mountains, and cultural sites to visit.",
    },
    exercises: [
      {
        type: "match",
        question: "Match travel terms",
        pairs: [
          { tagalog: "Bakasyon", english: "Vacation" },
          { tagalog: "Turista", english: "Tourist" },
          { tagalog: "Tabing-dagat", english: "Beach" },
          { tagalog: "Paliparan", english: "Airport" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is 'pasaporte' in English?",
        answer: "Passport",
        options: ["Ticket", "Passport", "Visa", "Map"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Mag-che-check in kami sa _____ (hotel) mamaya.",
        answer: "hotel",
        hint: "This is where tourists stay when traveling",
        xp: 8,
      },
    ],
  },
  {
    id: 34,
    title: "Dates and Time (Extended)",
    description: "Advanced expressions of time and dates",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Anong petsa ngayon?",
          english: "What's today's date?",
          pronunciation: "ah-NOHNG PET-sah ngah-YOHN",
        },
        {
          tagalog: "Alas singko ng hapon",
          english: "Five o'clock in the afternoon",
          pronunciation: "AH-las SING-koh ng hah-POHN",
        },
      ],
      vocabulary: [
        { word: "Petsa", meaning: "Date", pronunciation: "PET-sah" },
        { word: "Alas", meaning: "At (time)", pronunciation: "AH-las" },
        { word: "Umaga", meaning: "Morning", pronunciation: "oo-MAH-gah" },
        { word: "Tanghali", meaning: "Noon", pronunciation: "tang-HAH-lee" },
        { word: "Hapon", meaning: "Afternoon", pronunciation: "hah-POHN" },
        { word: "Gabi", meaning: "Evening/Night", pronunciation: "gah-BEE" },
        {
          word: "Hatinggabi",
          meaning: "Midnight",
          pronunciation: "hah-ting-GAH-bee",
        },
        {
          word: "Madaling-araw",
          meaning: "Dawn",
          pronunciation: "mah-dah-ling AH-raw",
        },
      ],
      tips: [
        "Filipino time expressions are specific",
        "Time is expressed using 'alas' + number",
        "Practice telling time for daily activities",
      ],
      culturalNotes:
        "In Filipino culture, time periods of the day are clearly distinguished and have different greeting expressions.",
    },
    exercises: [
      {
        type: "match",
        question: "Match time periods",
        pairs: [
          { tagalog: "Umaga", english: "Morning" },
          { tagalog: "Tanghali", english: "Noon" },
          { tagalog: "Hapon", english: "Afternoon" },
          { tagalog: "Gabi", english: "Evening/Night" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "How do you say 'midnight' in Tagalog?",
        answer: "Hatinggabi",
        options: ["Tanghali", "Madaling-araw", "Hatinggabi", "Gabi"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang pagpupulong ay magsisimula ng _____ (noon) bukas.",
        answer: "tanghali",
        hint: "This is the middle of the day, around 12pm",
        xp: 8,
      },
    ],
  },
  {
    id: 35,
    title: "Phone Conversations",
    description: "Learn phrases for telephone communication",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Hello, sino ito?",
          english: "Hello, who is this?",
          pronunciation: "heh-LOH, SEE-noh ee-TOH",
        },
        {
          tagalog: "Pwede ko bang makausap si...",
          english: "May I speak with...",
          pronunciation: "PWEH-deh koh bahng mah-kah-OO-sahp see",
        },
      ],
      vocabulary: [
        { word: "Tumawag", meaning: "To call", pronunciation: "too-MAH-wag" },
        { word: "Sumagot", meaning: "To answer", pronunciation: "soo-MAH-got" },
        { word: "Numero", meaning: "Number", pronunciation: "noo-MEH-roh" },
        { word: "Linya", meaning: "Line", pronunciation: "LEEN-yah" },
        { word: "Abala", meaning: "Busy", pronunciation: "ah-BAH-lah" },
        {
          word: "Cellphone",
          meaning: "Mobile phone",
          pronunciation: "sel-FOHN",
        },
        { word: "Text", meaning: "Text message", pronunciation: "tekst" },
        {
          word: "Telepono",
          meaning: "Telephone",
          pronunciation: "teh-leh-POH-noh",
        },
      ],
      tips: [
        "Philippines is known as the 'texting capital of the world'",
        "Mobile communication is essential in Filipino culture",
        "Many phone terms are borrowed from English",
      ],
      culturalNotes:
        "Filipinos often prefer texting to calling and have developed a unique text language with shortcuts.",
    },
    exercises: [
      {
        type: "translate",
        question: "To call",
        answer: "Tumawag",
        options: ["Tumawag", "Sumagot", "Abala", "Linya"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "How do you say 'number' in Tagalog?",
        answer: "Numero",
        options: ["Linya", "Numero", "Telepono", "Cellphone"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Hindi ko siya ma-_____ (call) kasi abala ang linya.",
        answer: "tawagan",
        hint: "This means to contact someone by phone",
        xp: 8,
      },
    ],
  },
  {
    id: 36,
    title: "Social Media and Internet",
    description: "Learn vocabulary for online communication",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "I-follow mo ako",
          english: "Follow me",
          pronunciation: "ee-FOL-low moh ah-KOH",
        },
        {
          tagalog: "Mag-share ng larawan",
          english: "Share a photo",
          pronunciation: "mahg-SHARE ng lah-RAH-wan",
        },
      ],
      vocabulary: [
        { word: "Internet", meaning: "Internet", pronunciation: "IN-ter-net" },
        { word: "Password", meaning: "Password", pronunciation: "PASS-word" },
        { word: "Account", meaning: "Account", pronunciation: "ah-KOWNT" },
        { word: "Mag-post", meaning: "To post", pronunciation: "mahg-POHST" },
        {
          word: "Mag-upload",
          meaning: "To upload",
          pronunciation: "mahg-UP-lohd",
        },
        {
          word: "Mag-download",
          meaning: "To download",
          pronunciation: "mahg-DOWN-lohd",
        },
        { word: "Profile", meaning: "Profile", pronunciation: "PRO-file" },
        {
          word: "Larawan",
          meaning: "Picture/Photo",
          pronunciation: "lah-RAH-wan",
        },
      ],
      tips: [
        "Filipinos are heavy social media users",
        "Many internet terms are direct English borrowings with Filipino prefixes",
        "Social media is important for keeping in touch with family abroad",
      ],
      culturalNotes:
        "The Philippines consistently ranks among the top countries for social media usage, with most people spending several hours daily online.",
    },
    exercises: [
      {
        type: "match",
        question: "Match social media terms",
        pairs: [
          { tagalog: "Mag-post", english: "To post" },
          { tagalog: "Mag-upload", english: "To upload" },
          { tagalog: "Larawan", english: "Picture/Photo" },
          { tagalog: "Password", english: "Password" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is 'account' in Tagalog?",
        answer: "Account",
        options: ["Larawan", "Internet", "Profile", "Account"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Kailangan kong mag-_____ (download) ng bagong app.",
        answer: "download",
        hint: "This means to transfer files from the internet to your device",
        xp: 8,
      },
    ],
  },
  {
    id: 37,
    title: "Basic Sentence Structure",
    description: "Learn fundamental Tagalog sentence patterns",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ako ay Pilipino",
          english: "I am Filipino",
          pronunciation: "ah-KOH eye pee-lee-PEE-noh",
        },
        {
          tagalog: "Pilipino ako",
          english: "I am Filipino",
          pronunciation: "pee-lee-PEE-noh ah-KOH",
        },
      ],
      vocabulary: [
        { word: "Ay", meaning: "Is/am/are (linking)", pronunciation: "eye" },
        { word: "Ang", meaning: "The (marker)", pronunciation: "ahng" },
        { word: "Ng", meaning: "Of (marker)", pronunciation: "nahng" },
        { word: "Sa", meaning: "To/at/in (marker)", pronunciation: "sah" },
        { word: "Si", meaning: "Marker for names", pronunciation: "see" },
        { word: "Mga", meaning: "Plural marker", pronunciation: "mah-NGAH" },
        { word: "Hindi", meaning: "No/not", pronunciation: "HEEN-dee" },
        { word: "Oo", meaning: "Yes", pronunciation: "OH-oh" },
      ],
      tips: [
        "Tagalog word order is flexible but follows patterns",
        "Markers are crucial for showing relationships between words",
        "Practice both basic sentence patterns",
      ],
      culturalNotes:
        "Tagalog uses markers instead of prepositions and has a verb-focus system different from English.",
    },
    exercises: [
      {
        type: "translate",
        question: "I am a student",
        answer: "Ako ay estudyante",
        options: [
          "Ako ay estudyante",
          "Estudyante ako",
          "Ako estudyante",
          "Estudyante ay ako",
        ],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which marker is used for names?",
        answer: "Si",
        options: ["Ang", "Ng", "Sa", "Si"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (The) bahay ay malaki.",
        answer: "Ang",
        hint: "This is the marker for definite subjects",
        xp: 8,
      },
    ],
  },
  {
    id: 38,
    title: "Questions and Answers",
    description: "Learn to form questions and give answers",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Sino ang gumawa nito?",
          english: "Who did this?",
          pronunciation: "SEE-noh ahng goo-MAH-wah nee-TOH",
        },
        {
          tagalog: "Kailan mangyayari ito?",
          english: "When will this happen?",
          pronunciation: "KAI-lan mahng-yah-YAH-ree ee-TOH",
        },
      ],
      vocabulary: [
        { word: "Sino", meaning: "Who", pronunciation: "SEE-noh" },
        { word: "Ano", meaning: "What", pronunciation: "AH-noh" },
        { word: "Saan", meaning: "Where", pronunciation: "sah-AHN" },
        { word: "Kailan", meaning: "When", pronunciation: "KAI-lan" },
        { word: "Bakit", meaning: "Why", pronunciation: "bah-KEET" },
        { word: "Paano", meaning: "How", pronunciation: "pah-AH-noh" },
        { word: "Ilan", meaning: "How many", pronunciation: "EE-lan" },
        { word: "Magkano", meaning: "How much", pronunciation: "mahg-KAH-noh" },
      ],
      tips: [
        "Question words typically start a sentence",
        "Rising intonation indicates a yes/no question",
        "Practice forming questions about daily topics",
      ],
      culturalNotes:
        "Filipinos may avoid direct questions to maintain harmony (pakikisama) in certain situations.",
    },
    exercises: [
      {
        type: "match",
        question: "Match question words",
        pairs: [
          { tagalog: "Sino", english: "Who" },
          { tagalog: "Ano", english: "What" },
          { tagalog: "Saan", english: "Where" },
          { tagalog: "Bakit", english: "Why" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "Which word asks about price?",
        answer: "Magkano",
        options: ["Ilan", "Paano", "Magkano", "Kailan"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (How) ka pumunta sa Maynila?",
        answer: "Paano",
        hint: "This asks about the method or manner of doing something",
        xp: 8,
      },
    ],
  },
  {
    id: 39,
    title: "Past Tense",
    description: "Express actions that happened in the past",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kumain na ako",
          english: "I already ate",
          pronunciation: "koo-MAH-in nah ah-KOH",
        },
        {
          tagalog: "Bumili ako ng regalo kahapon",
          english: "I bought a gift yesterday",
          pronunciation: "boo-MEE-lee ah-KOH ng reh-GAH-loh kah-HAH-pon",
        },
      ],
      vocabulary: [
        { word: "Kumain", meaning: "Ate", pronunciation: "koo-MAH-in" },
        { word: "Uminom", meaning: "Drank", pronunciation: "oo-MEE-nom" },
        { word: "Bumili", meaning: "Bought", pronunciation: "boo-MEE-lee" },
        { word: "Pumunta", meaning: "Went", pronunciation: "poo-MOON-tah" },
        { word: "Natulog", meaning: "Slept", pronunciation: "nah-TOO-log" },
        { word: "Nagbasa", meaning: "Read", pronunciation: "nahg-BAH-sah" },
        {
          word: "Nagsalita",
          meaning: "Spoke",
          pronunciation: "nahg-sah-LEE-tah",
        },
        { word: "Nakita", meaning: "Saw", pronunciation: "nah-KEE-tah" },
      ],
      tips: [
        "Past tense often uses -um- infix or nag-/na- prefixes",
        "Time markers like 'kahapon' (yesterday) help indicate past tense",
        "Learn past tense forms of common verbs first",
      ],
      culturalNotes:
        "Tagalog verb conjugation focuses on aspect (completed vs. ongoing) rather than simple tense.",
    },
    exercises: [
      {
        type: "translate",
        question: "I ate",
        answer: "Kumain ako",
        options: ["Kumain ako", "Kakain ako", "Kain ako", "Kinain ako"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which is the past tense of 'to buy'?",
        answer: "Bumili",
        options: ["Bili", "Bumibili", "Bumili", "Bibili"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (Went) ako sa palengke kahapon.",
        answer: "Pumunta",
        hint: "This is the past tense of 'to go'",
        xp: 8,
      },
    ],
  },
  {
    id: 40,
    title: "Future Tense",
    description: "Express actions that will happen in the future",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kakain ako mamaya",
          english: "I will eat later",
          pronunciation: "kah-KAH-in ah-KOH mah-mah-YAH",
        },
        {
          tagalog: "Pupunta kami sa Cebu bukas",
          english: "We will go to Cebu tomorrow",
          pronunciation: "poo-POON-tah KAH-mee sah SEH-boo boo-KAHS",
        },
      ],
      vocabulary: [
        { word: "Kakain", meaning: "Will eat", pronunciation: "kah-KAH-in" },
        { word: "Iinom", meaning: "Will drink", pronunciation: "ee-EE-nom" },
        { word: "Bibili", meaning: "Will buy", pronunciation: "bee-BEE-lee" },
        { word: "Pupunta", meaning: "Will go", pronunciation: "poo-POON-tah" },
        {
          word: "Matutulog",
          meaning: "Will sleep",
          pronunciation: "mah-too-TOO-log",
        },
        {
          word: "Magbabasa",
          meaning: "Will read",
          pronunciation: "mahg-bah-BAH-sah",
        },
        {
          word: "Magsasalita",
          meaning: "Will speak",
          pronunciation: "mahg-sah-sah-LEE-tah",
        },
        {
          word: "Makikita",
          meaning: "Will see",
          pronunciation: "mah-kee-KEE-tah",
        },
      ],
      tips: [
        "Future tense often uses first syllable reduplication",
        "Time markers like 'bukas' (tomorrow) help indicate future tense",
        "Compare past, present, and future forms to see patterns",
      ],
      culturalNotes:
        "Tagalog has a rich system of verbal affixes that indicate not just time but also focus and aspect.",
    },
    exercises: [
      {
        type: "translate",
        question: "I will eat",
        answer: "Kakain ako",
        options: ["Kumain ako", "Kakain ako", "Kain ako", "Kinain ako"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "Which is the future tense of 'to go'?",
        answer: "Pupunta",
        options: ["Pumunta", "Pupunta", "Punta", "Napunta"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "_____ (Will buy) ako ng bagong damit bukas.",
        answer: "Bibili",
        hint: "This is the future tense of 'to buy'",
        xp: 8,
      },
    ],
  },
  {
    id: 41,
    title: "Describing Objects and Places",
    description: "Learn to describe features and characteristics",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ang bahay ay malaki at maganda",
          english: "The house is big and beautiful",
          pronunciation: "ahng BAH-high eye mah-LAH-kee at mah-GAHN-dah",
        },
        {
          tagalog: "Masarap ang pagkain dito",
          english: "The food here is delicious",
          pronunciation: "mah-SAH-rap ahng pahg-KAH-in dee-TOH",
        },
      ],
      vocabulary: [
        { word: "Malaki", meaning: "Big", pronunciation: "mah-LAH-kee" },
        { word: "Maliit", meaning: "Small", pronunciation: "mah-lee-EET" },
        {
          word: "Maganda",
          meaning: "Beautiful",
          pronunciation: "mah-GAHN-dah",
        },
        { word: "Pangit", meaning: "Ugly", pronunciation: "PAHNG-it" },
        { word: "Mahal", meaning: "Expensive", pronunciation: "mah-HAHL" },
        { word: "Mura", meaning: "Cheap", pronunciation: "MOO-rah" },
        { word: "Malinis", meaning: "Clean", pronunciation: "mah-LEE-nis" },
        { word: "Marumi", meaning: "Dirty", pronunciation: "mah-ROO-mee" },
      ],
      tips: [
        "Descriptors usually follow the noun they describe",
        "Many adjectives start with 'ma-' prefix",
        "Practice creating compound descriptions",
      ],
      culturalNotes:
        "Filipinos often describe places in relation to landmarks rather than using addresses.",
    },
    exercises: [
      {
        type: "match",
        question: "Match opposite descriptors",
        pairs: [
          { tagalog: "Malaki", english: "Big" },
          { tagalog: "Maliit", english: "Small" },
          { tagalog: "Mahal", english: "Expensive" },
          { tagalog: "Mura", english: "Cheap" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What does 'malinis' mean?",
        answer: "Clean",
        options: ["Dirty", "Clean", "Beautiful", "Ugly"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang bahay niya ay _____ (beautiful) at malaki.",
        answer: "maganda",
        hint: "This describes something pleasing to look at",
        xp: 8,
      },
    ],
  },
  {
    id: 42,
    title: "Filipino Cuisine",
    description: "Learn about traditional Filipino dishes",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang pambansang pagkain ng Pilipinas?",
          english: "What is the national food of the Philippines?",
          pronunciation:
            "AH-noh ahng pahm-BAHN-sahng pahg-KAH-in nahng pee-lee-PEE-nahs",
        },
        {
          tagalog: "Masarap ang ulam na ito",
          english: "This dish is delicious",
          pronunciation: "mah-SAH-rahp ahng OO-lahm nah ee-TOH",
        },
      ],
      vocabulary: [
        {
          word: "Adobo",
          meaning: "Meat stewed in vinegar and soy sauce",
          pronunciation: "ah-DOH-boh",
        },
        {
          word: "Sinigang",
          meaning: "Sour soup with meat and vegetables",
          pronunciation: "see-NEE-gahng",
        },
        { word: "Lechon", meaning: "Roasted pig", pronunciation: "leh-CHOHN" },
        { word: "Pancit", meaning: "Noodle dish", pronunciation: "PAHN-sit" },
        { word: "Lumpia", meaning: "Spring rolls", pronunciation: "LOOM-pyah" },
        {
          word: "Halo-halo",
          meaning: "Mixed dessert with shaved ice",
          pronunciation: "HAH-loh HAH-loh",
        },
        {
          word: "Kare-kare",
          meaning: "Oxtail stew in peanut sauce",
          pronunciation: "KAH-reh KAH-reh",
        },
        {
          word: "Balut",
          meaning: "Fertilized duck egg",
          pronunciation: "bah-LOOT",
        },
      ],
      tips: [
        "Filipino cuisine reflects the country's history and cultural influences",
        "Rice is served with most meals",
        "Many Filipino dishes combine sweet, sour, and savory flavors",
      ],
      culturalNotes:
        "Food is central to Filipino gatherings, and meals are typically shared family-style rather than individually plated.",
    },
    exercises: [
      {
        type: "match",
        question: "Match Filipino dishes",
        pairs: [
          { tagalog: "Adobo", english: "Meat stewed in vinegar and soy sauce" },
          {
            tagalog: "Sinigang",
            english: "Sour soup with meat and vegetables",
          },
          { tagalog: "Lechon", english: "Roasted pig" },
          { tagalog: "Lumpia", english: "Spring rolls" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "Which is a popular Filipino dessert?",
        answer: "Halo-halo",
        options: ["Adobo", "Pancit", "Halo-halo", "Kare-kare"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (noodle dish) ay popular sa mga handaan.",
        answer: "pancit",
        hint: "This is a noodle dish often served at celebrations",
        xp: 8,
      },
    ],
  },
  {
    id: 43,
    title: "Health and Wellness",
    description: "Discuss health habits and wellness concepts",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Kailangan mong mag-ehersisyo",
          english: "You need to exercise",
          pronunciation: "kah-ee-LANG-an mohng mahg-eh-her-SIS-yoh",
        },
        {
          tagalog: "Matulog ng sapat",
          english: "Sleep adequately",
          pronunciation: "mah-TOO-log nahng sah-PAHT",
        },
      ],
      vocabulary: [
        {
          word: "Kalusugan",
          meaning: "Health",
          pronunciation: "kah-loo-SOO-gan",
        },
        {
          word: "Ehersisyo",
          meaning: "Exercise",
          pronunciation: "eh-her-SIS-yoh",
        },
        { word: "Pagkain", meaning: "Food/Diet", pronunciation: "pahg-KAH-in" },
        { word: "Tulog", meaning: "Sleep", pronunciation: "TOO-log" },
        { word: "Stress", meaning: "Stress", pronunciation: "stress" },
        {
          word: "Magpahinga",
          meaning: "To rest",
          pronunciation: "mahg-pah-HEENG-ah",
        },
        {
          word: "Bitamina",
          meaning: "Vitamin",
          pronunciation: "bee-tah-MEE-nah",
        },
        {
          word: "Kaginhawaan",
          meaning: "Wellness",
          pronunciation: "kah-gee-nha-WAH-an",
        },
      ],
      tips: [
        "Health vocabulary combines traditional and modern concepts",
        "Filipinos value both Western medicine and traditional healing practices",
        "Wellness is viewed holistically in Filipino culture",
      ],
      culturalNotes:
        "Traditional Filipino health practices include 'hilot' (massage therapy) and herbal remedies passed down through generations.",
    },
    exercises: [
      {
        type: "translate",
        question: "Health",
        answer: "Kalusugan",
        options: ["Kalusugan", "Ehersisyo", "Tulog", "Stress"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'magpahinga' mean?",
        answer: "To rest",
        options: ["To exercise", "To eat", "To rest", "To work"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (exercise) ay mahalaga para sa kalusugan.",
        answer: "ehersisyo",
        hint: "This is physical activity to maintain fitness",
        xp: 8,
      },
    ],
  },
  {
    id: 44,
    title: "Social Etiquette",
    description: "Learn proper behavior in Filipino social settings",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Po at opo",
          english: "Respectful particles",
          pronunciation: "poh at OH-poh",
        },
        {
          tagalog: "Pwede po bang magtanong?",
          english: "May I ask a question? (polite)",
          pronunciation: "PWEH-deh poh bahng mahg-TAH-nong",
        },
      ],
      vocabulary: [
        {
          word: "Magalang",
          meaning: "Respectful",
          pronunciation: "mah-GAH-lang",
        },
        {
          word: "Mano po",
          meaning: "Gesture of respect to elders",
          pronunciation: "MAH-noh poh",
        },
        {
          word: "Kuya",
          meaning: "Older brother/male",
          pronunciation: "KOO-yah",
        },
        {
          word: "Ate",
          meaning: "Older sister/female",
          pronunciation: "AH-teh",
        },
        {
          word: "Pakikisama",
          meaning: "Getting along with others",
          pronunciation: "pah-kee-kee-SAH-mah",
        },
        { word: "Hiya", meaning: "Shame/Shyness", pronunciation: "HEE-yah" },
        {
          word: "Utang na loob",
          meaning: "Debt of gratitude",
          pronunciation: "OO-tang nah loh-OHB",
        },
        {
          word: "Delicadeza",
          meaning: "Sense of propriety",
          pronunciation: "deh-lee-kah-DEH-zah",
        },
      ],
      tips: [
        "Always use 'po' and 'opo' when speaking to elders",
        "Address older individuals as 'Kuya/Ate' even if not related",
        "Maintaining harmony (pakikisama) is highly valued",
      ],
      culturalNotes:
        "Filipino social etiquette revolves around respect for elders, saving face (hiya), and maintaining smooth interpersonal relationships.",
    },
    exercises: [
      {
        type: "match",
        question: "Match etiquette terms",
        pairs: [
          { tagalog: "Magalang", english: "Respectful" },
          { tagalog: "Pakikisama", english: "Getting along with others" },
          { tagalog: "Hiya", english: "Shame/Shyness" },
          { tagalog: "Utang na loob", english: "Debt of gratitude" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What term is used to address an older male?",
        answer: "Kuya",
        options: ["Kuya", "Ate", "Po", "Hiya"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question:
          "Ginagawa natin ang _____ (getting along) para sa mapayapang samahan.",
        answer: "pakikisama",
        hint: "This refers to harmonious relationships with others",
        xp: 8,
      },
    ],
  },
  {
    id: 45,
    title: "Cultural Practices",
    description: "Learn about unique Filipino customs",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Maligayang Pasko!",
          english: "Merry Christmas!",
          pronunciation: "mah-lee-GAH-yahng PAHS-koh",
        },
        {
          tagalog: "Tuloy po kayo",
          english: "Please come in (welcoming guests)",
          pronunciation: "TOO-loy poh KAH-yoh",
        },
      ],
      vocabulary: [
        {
          word: "Bayanihan",
          meaning: "Community cooperation",
          pronunciation: "bah-yah-NEE-han",
        },
        {
          word: "Fiesta",
          meaning: "Town festival",
          pronunciation: "pee-ES-tah",
        },
        {
          word: "Simbang Gabi",
          meaning: "Night mass before Christmas",
          pronunciation: "seem-BAHNG GAH-bee",
        },
        {
          word: "Lamay",
          meaning: "Wake (for deceased)",
          pronunciation: "LAH-my",
        },
        {
          word: "Pagmamano",
          meaning: "Hand to forehead gesture",
          pronunciation: "pahg-mah-MAH-noh",
        },
        { word: "Harana", meaning: "Serenade", pronunciation: "hah-RAH-nah" },
        {
          word: "Barong Tagalog",
          meaning: "Filipino formal shirt",
          pronunciation: "bah-ROHNG tah-GAH-log",
        },
        {
          word: "Tinikling",
          meaning: "Traditional bamboo dance",
          pronunciation: "tee-neek-LEENG",
        },
      ],
      tips: [
        "Filipino customs blend indigenous, Spanish, and American influences",
        "Religious practices are important in Filipino culture",
        "Regional variations exist in cultural practices",
      ],
      culturalNotes:
        "Filipinos are known for their hospitality, with guests always being offered food and made to feel welcome in homes.",
    },
    exercises: [
      {
        type: "match",
        question: "Match cultural practices",
        pairs: [
          { tagalog: "Bayanihan", english: "Community cooperation" },
          { tagalog: "Simbang Gabi", english: "Night mass before Christmas" },
          { tagalog: "Pagmamano", english: "Hand to forehead gesture" },
          { tagalog: "Tinikling", english: "Traditional bamboo dance" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What is 'Barong Tagalog'?",
        answer: "Filipino formal shirt",
        options: [
          "Traditional dance",
          "Filipino formal shirt",
          "Christmas celebration",
          "Cooking method",
        ],
        xp: 5,
      },
      {
        type: "fillBlank",
        question:
          "Ang _____ (community cooperation) ay nagpapakita ng diwa ng pagtutulungan ng mga Pilipino.",
        answer: "bayanihan",
        hint: "This refers to people working together to help others",
        xp: 8,
      },
    ],
  },
  {
    id: 46,
    title: "Government and Politics",
    description: "Learn vocabulary related to governance",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Sino ang pangulo ng Pilipinas?",
          english: "Who is the president of the Philippines?",
          pronunciation: "SEE-noh ahng pahng-OO-loh nahng pee-lee-PEE-nahs",
        },
        {
          tagalog: "Bumoto tayo sa eleksyon",
          english: "Let's vote in the election",
          pronunciation: "boo-MOH-toh tah-YOH sah eh-LEK-shohn",
        },
      ],
      vocabulary: [
        {
          word: "Pangulo",
          meaning: "President",
          pronunciation: "pahng-OO-loh",
        },
        {
          word: "Bise Pangulo",
          meaning: "Vice President",
          pronunciation: "BEE-seh pahng-OO-loh",
        },
        { word: "Senador", meaning: "Senator", pronunciation: "seh-nah-DOHR" },
        {
          word: "Kongreso",
          meaning: "Congress",
          pronunciation: "kong-GREH-soh",
        },
        { word: "Batas", meaning: "Law", pronunciation: "BAH-tahs" },
        {
          word: "Gobyerno",
          meaning: "Government",
          pronunciation: "gob-YEHR-noh",
        },
        {
          word: "Eleksyon",
          meaning: "Election",
          pronunciation: "eh-LEK-shohn",
        },
        { word: "Boto", meaning: "Vote", pronunciation: "BOH-toh" },
      ],
      tips: [
        "Political terms often derive from Spanish",
        "Philippines has a democratic government system",
        "Politics is a common topic of conversation",
      ],
      culturalNotes:
        "The Philippines follows a presidential system similar to the United States, with three branches of government.",
    },
    exercises: [
      {
        type: "translate",
        question: "President",
        answer: "Pangulo",
        options: ["Pangulo", "Senador", "Batas", "Gobyerno"],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'boto' mean?",
        answer: "Vote",
        options: ["Law", "Government", "Vote", "Election"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Ang _____ (government) ay dapat maglingkod sa mamamayan.",
        answer: "gobyerno",
        hint: "This is the system that runs a country",
        xp: 8,
      },
    ],
  },
  {
    id: 47,
    title: "Giving Opinions",
    description: "Learn to express views and opinions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Sa tingin ko...",
          english: "I think...",
          pronunciation: "sah tee-NEEN koh",
        },
        {
          tagalog: "Sang-ayon ako sa iyo",
          english: "I agree with you",
          pronunciation: "sahng-AH-yohn ah-KOH sah EE-yoh",
        },
      ],
      vocabulary: [
        { word: "Opinyon", meaning: "Opinion", pronunciation: "oh-peen-YOHN" },
        { word: "Sang-ayon", meaning: "Agree", pronunciation: "sahng-AH-yohn" },
        {
          word: "Hindi sang-ayon",
          meaning: "Disagree",
          pronunciation: "HEEN-dee sahng-AH-yohn",
        },
        {
          word: "Siguro",
          meaning: "Maybe/Perhaps",
          pronunciation: "see-GOO-roh",
        },
        { word: "Tama", meaning: "Correct/Right", pronunciation: "TAH-mah" },
        { word: "Mali", meaning: "Wrong", pronunciation: "MAH-lee" },
        {
          word: "Palagay",
          meaning: "Belief/Opinion",
          pronunciation: "pah-LAH-guy",
        },
        {
          word: "Pananaw",
          meaning: "Perspective/View",
          pronunciation: "pah-NAH-now",
        },
      ],
      tips: [
        "Opinions are often softened to maintain harmony",
        "Indirect expressions are common when disagreeing",
        "Non-verbal cues are important in understanding Filipino opinions",
      ],
      culturalNotes:
        "Filipinos may avoid direct disagreement to preserve smooth interpersonal relationships and save face.",
    },
    exercises: [
      {
        type: "match",
        question: "Match opinion expressions",
        pairs: [
          { tagalog: "Sa tingin ko", english: "I think" },
          { tagalog: "Sang-ayon", english: "Agree" },
          { tagalog: "Hindi sang-ayon", english: "Disagree" },
          { tagalog: "Siguro", english: "Maybe/Perhaps" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What does 'tama' mean?",
        answer: "Correct/Right",
        options: ["Wrong", "Maybe", "Correct/Right", "Opinion"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Sa _____ (opinion) ko, dapat tayong kumilos ngayon.",
        answer: "opinyon",
        hint: "This refers to your personal view on something",
        xp: 8,
      },
    ],
  },
  {
    id: 48,
    title: "Filipino Idioms",
    description: "Learn common Filipino expressions and sayings",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Bahala na",
          english: "Come what may/Let fate decide",
          pronunciation: "bah-HAH-lah nah",
        },
        {
          tagalog: "Matiisin ka talaga",
          english: "You're really patient/enduring",
          pronunciation: "mah-tee-EE-sin kah tah-LAH-gah",
        },
      ],
      vocabulary: [
        {
          word: "Bahala na",
          meaning: "Come what may",
          pronunciation: "bah-HAH-lah nah",
        },
        {
          word: "Ningas kogon",
          meaning: "Initial enthusiasm that quickly fades",
          pronunciation: "NEE-ngas KOH-gon",
        },
        {
          word: "Pusong mamon",
          meaning: "Soft-hearted",
          pronunciation: "POO-song mah-MOHN",
        },
        {
          word: "Isang kahig, isang tuka",
          meaning: "Hand to mouth existence",
          pronunciation: "EE-sang KAH-hig, EE-sang TOO-kah",
        },
        {
          word: "Magkasingkahulugan",
          meaning: "Birds of the same feather",
          pronunciation: "mag-kah-sing-kah-hoo-LOO-gan",
        },
        {
          word: "Malakas ang dating",
          meaning: "Makes a strong impression",
          pronunciation: "mah-LAH-kas ang DAH-ting",
        },
        {
          word: "Mainit ang ulo",
          meaning: "Hot-headed/angry",
          pronunciation: "mah-EE-nit ang OO-loh",
        },
        {
          word: "Malayo pa ang araw",
          meaning: "It's still a long way off",
          pronunciation: "mah-LAH-yoh pah ang AH-raw",
        },
      ],
      tips: [
        "Idioms reveal cultural values and perspectives",
        "Understanding idioms improves cultural fluency",
        "Many Filipino idioms relate to nature or daily life",
      ],
      culturalNotes:
        "Filipino idioms often reflect values like resilience, family ties, and acceptance of fate.",
    },
    exercises: [
      {
        type: "match",
        question: "Match Filipino idioms",
        pairs: [
          { tagalog: "Bahala na", english: "Come what may" },
          { tagalog: "Pusong mamon", english: "Soft-hearted" },
          {
            tagalog: "Ningas kogon",
            english: "Initial enthusiasm that quickly fades",
          },
          { tagalog: "Mainit ang ulo", english: "Hot-headed/angry" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What does 'isang kahig, isang tuka' describe?",
        answer: "Hand to mouth existence",
        options: [
          "Being very lucky",
          "Hand to mouth existence",
          "Working hard",
          "Being indecisive",
        ],
        xp: 5,
      },
      {
        type: "fillBlank",
        question:
          "Si Maria ay may _____ (soft-hearted) kaya madali siyang maawa.",
        answer: "pusong mamon",
        hint: "This idiom compares the heart to a soft bread",
        xp: 8,
      },
    ],
  },
  {
    id: 49,
    title: "Making Plans",
    description: "Learn to arrange meetings and activities",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Gusto mo bang lumabas?",
          english: "Do you want to go out?",
          pronunciation: "GOOS-toh moh bahng loo-MAH-bas",
        },
        {
          tagalog: "Kailan tayo magkikita?",
          english: "When will we meet?",
          pronunciation: "KAI-lan tah-YOH mag-kee-KEE-tah",
        },
      ],
      vocabulary: [
        { word: "Plano", meaning: "Plan", pronunciation: "PLAH-noh" },
        {
          word: "Lakad",
          meaning: "Appointment/Plan",
          pronunciation: "LAH-kad",
        },
        {
          word: "Imbitasyon",
          meaning: "Invitation",
          pronunciation: "im-bee-tah-SYON",
        },
        { word: "Magkita", meaning: "To meet", pronunciation: "mag-KEE-tah" },
        { word: "Lumabas", meaning: "To go out", pronunciation: "loo-MAH-bas" },
        { word: "Manood", meaning: "To watch", pronunciation: "mah-NOH-od" },
        { word: "Kumain", meaning: "To eat", pronunciation: "koo-MAH-in" },
        {
          word: "Magkape",
          meaning: "To have coffee",
          pronunciation: "mag-KAH-peh",
        },
      ],
      tips: [
        "Plans are often made with flexibility in mind",
        "Specific time references are sometimes approximate",
        "Invitations are usually extended warmly and repeatedly",
      ],
      culturalNotes:
        "'Filipino time' refers to the cultural tendency to be relaxed about punctuality, though this is changing in professional settings.",
    },
    exercises: [
      {
        type: "translate",
        question: "Do you want to go out?",
        answer: "Gusto mo bang lumabas?",
        options: [
          "Gusto mo bang lumabas?",
          "Kailan tayo magkikita?",
          "Saan tayo pupunta?",
          "Anong oras tayo aalis?",
        ],
        xp: 10,
      },
      {
        type: "multipleChoice",
        question: "What does 'magkita' mean?",
        answer: "To meet",
        options: ["To eat", "To watch", "To meet", "To go out"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "May _____ (plan) ka ba sa Sabado?",
        answer: "plano",
        hint: "This refers to an arrangement for the future",
        xp: 8,
      },
    ],
  },
  {
    id: 50,
    title: "Advanced Conversations",
    description: "Learn to engage in deeper Filipino discussions",
    progress: 0,
    completed: false,
    guidebook: {
      keyPhrases: [
        {
          tagalog: "Ano ang palagay mo tungkol sa...?",
          english: "What do you think about...?",
          pronunciation: "AH-noh ang pah-LAH-guy moh toong-KOHL sah",
        },
        {
          tagalog: "Naiintindihan ko ang iyong punto",
          english: "I understand your point",
          pronunciation: "nah-een-teen-DEE-han koh ang ee-YOHNG POON-toh",
        },
      ],
      vocabulary: [
        {
          word: "Usapan",
          meaning: "Conversation/Discussion",
          pronunciation: "oo-SAH-pan",
        },
        {
          word: "Punto",
          meaning: "Point (in discussion)",
          pronunciation: "POON-toh",
        },
        { word: "Paksa", meaning: "Topic/Subject", pronunciation: "PAHK-sah" },
        {
          word: "Pananaw",
          meaning: "Perspective",
          pronunciation: "pah-NAH-naw",
        },
        {
          word: "Pagpapaliwanag",
          meaning: "Explanation",
          pronunciation: "pag-pah-pah-lee-WAH-nag",
        },
        {
          word: "Pagtatalo",
          meaning: "Debate/Argument",
          pronunciation: "pag-tah-TAH-loh",
        },
        {
          word: "Kaisipan",
          meaning: "Idea/Thought",
          pronunciation: "kah-ee-SEE-pan",
        },
        {
          word: "Malalim",
          meaning: "Deep/Profound",
          pronunciation: "mah-lah-LEEM",
        },
      ],
      tips: [
        "Advanced conversations require cultural sensitivity",
        "Filipinos may communicate indirectly on complex topics",
        "Non-verbal cues remain important in deep discussions",
      ],
      culturalNotes:
        "Conversations in Filipino culture often value harmony and connection over direct confrontation or pure information exchange.",
    },
    exercises: [
      {
        type: "match",
        question: "Match conversation terms",
        pairs: [
          { tagalog: "Usapan", english: "Conversation/Discussion" },
          { tagalog: "Paksa", english: "Topic/Subject" },
          { tagalog: "Pananaw", english: "Perspective" },
          { tagalog: "Kaisipan", english: "Idea/Thought" },
        ],
        xp: 15,
      },
      {
        type: "multipleChoice",
        question: "What does 'malalim' describe?",
        answer: "Deep/Profound",
        options: ["Simple", "Shallow", "Deep/Profound", "Confusing"],
        xp: 5,
      },
      {
        type: "fillBlank",
        question: "Magbigay ka ng _____ (explanation) tungkol sa iyong teorya.",
        answer: "pagpapaliwanag",
        hint: "This means clarifying or providing details about something",
        xp: 8,
      },
    ],
  },
];
