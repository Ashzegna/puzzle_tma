import { Question } from '../types';

// Вопросы на основе существующего кода бота
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Как ты обычно понимаешь близких людей?',
    emoji: '❤️🧠',
    options: [
      { id: 'q1_a', text: '🔮 Ощущаю невысказанные эмоции людей', type: 'emotionalTelepatia' },
      { id: 'q1_b', text: '✨ Притягиваю к себе нужных людей', type: 'magneticAttraction' },
      { id: 'q1_c', text: '⚗️ Превращаю обычные моменты в особенные', type: 'relationshipAlchemy' },
      { id: 'q1_d', text: '🌱 Помогаю обрести душевный покой', type: 'soulHealer' },
      { id: 'q1_e', text: '📚 Нахожу глубинный смысл в ситуациях', type: 'wisdomKeeper' },
      { id: 'q1_f', text: '🎭 Создаю волшебство в повседневности', type: 'specialMomentCreator' },
      { id: 'q1_g', text: '🌈 Вижу возможности в любых проблемах', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q2',
    text: 'Что тебе чаще всего говорят друзья?',
    emoji: '👥💬',
    options: [
      { id: 'q2_a', text: '🔮 "Ты как будто видишь меня насквозь"', type: 'emotionalTelepatia' },
      { id: 'q2_b', text: '✨ "С тобой всегда так легко общаться"', type: 'magneticAttraction' },
      { id: 'q2_c', text: '⚗️ "Ты делаешь обычные вещи особенными"', type: 'relationshipAlchemy' },
      { id: 'q2_d', text: '🌱 "Рядом с тобой становится спокойнее"', type: 'soulHealer' },
      { id: 'q2_e', text: '📚 "Ты всегда даешь мудрые советы"', type: 'wisdomKeeper' },
      { id: 'q2_f', text: '🎭 "Ты умеешь создавать особенную атмосферу"', type: 'specialMomentCreator' },
      { id: 'q2_g', text: '🌈 "Ты находишь выход из любой ситуации"', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q3',
    text: 'Что ты делаешь, когда друг в сложной ситуации?',
    emoji: '🤗🆘',
    options: [
      { id: 'q3_a', text: '🔮 Чувствую, что его беспокоит на самом деле', type: 'emotionalTelepatia' },
      { id: 'q3_b', text: '✨ Вдохновляю его своей энергией и уверенностью', type: 'magneticAttraction' },
      { id: 'q3_c', text: '⚗️ Превращаю проблему в возможность для роста', type: 'relationshipAlchemy' },
      { id: 'q3_d', text: '🌱 Создаю пространство для исцеления и принятия', type: 'soulHealer' },
      { id: 'q3_e', text: '📚 Помогаю увидеть более глубокий смысл происходящего', type: 'wisdomKeeper' },
      { id: 'q3_f', text: '🎭 Отвлекаю созданием особенных моментов', type: 'specialMomentCreator' },
      { id: 'q3_g', text: '🌈 Нахожу необычные решения проблемы', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q4',
    text: 'Какой дар в отношениях ты считаешь самым ценным?',
    emoji: '🎁❤️',
    options: [
      { id: 'q4_a', text: '🔮 Понимать невысказанные чувства других', type: 'emotionalTelepatia' },
      { id: 'q4_b', text: '✨ Притягивать и объединять людей', type: 'magneticAttraction' },
      { id: 'q4_c', text: '⚗️ Находить радость в обычных моментах', type: 'relationshipAlchemy' },
      { id: 'q4_d', text: '🌱 Создавать атмосферу доверия и спокойствия', type: 'soulHealer' },
      { id: 'q4_e', text: '📚 Видеть глубину и смысл в каждой ситуации', type: 'wisdomKeeper' },
      { id: 'q4_f', text: '🎭 Создавать незабываемые воспоминания', type: 'specialMomentCreator' },
      { id: 'q4_g', text: '🌈 Преодолевать любые препятствия вместе', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q5',
    text: 'Чем ты гордишься больше всего в своих отношениях?',
    emoji: '🏆💫',
    options: [
      { id: 'q5_a', text: '🔮 Глубоким пониманием близких без слов', type: 'emotionalTelepatia' },
      { id: 'q5_b', text: '✨ Способностью привлекать интересных людей', type: 'magneticAttraction' },
      { id: 'q5_c', text: '⚗️ Умением превращать обыденное в особенное', type: 'relationshipAlchemy' },
      { id: 'q5_d', text: '🌱 Способностью исцелять эмоциональные раны', type: 'soulHealer' },
      { id: 'q5_e', text: '📚 Способностью дать мудрый совет в нужный момент', type: 'wisdomKeeper' },
      { id: 'q5_f', text: '🎭 Умением создавать яркие и запоминающиеся события', type: 'specialMomentCreator' },
      { id: 'q5_g', text: '🌈 Нахождением решений в самых сложных ситуациях', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q6',
    text: 'Что тебе больше всего нравится делать с близкими?',
    emoji: '👥❤️',
    options: [
      { id: 'q6_a', text: '🔮 Глубоко и искренне общаться о чувствах', type: 'emotionalTelepatia' },
      { id: 'q6_b', text: '✨ Знакомить между собой разных людей', type: 'magneticAttraction' },
      { id: 'q6_c', text: '⚗️ Находить новые грани в привычных вещах', type: 'relationshipAlchemy' },
      { id: 'q6_d', text: '🌱 Создавать пространство для раскрытия и роста', type: 'soulHealer' },
      { id: 'q6_e', text: '📚 Обсуждать глубокие темы и делиться мудростью', type: 'wisdomKeeper' },
      { id: 'q6_f', text: '🎭 Организовывать особенные моменты и впечатления', type: 'specialMomentCreator' },
      { id: 'q6_g', text: '🌈 Решать сложные задачи вместе', type: 'impossibilityMaster' }
    ]
  },
  {
    id: 'q7',
    text: 'В какой роли ты чаще всего оказываешься среди друзей?',
    emoji: '🎭👥',
    options: [
      { id: 'q7_a', text: '🔮 Тот, кто понимает истинные чувства каждого', type: 'emotionalTelepatia' },
      { id: 'q7_b', text: '✨ Объединяющий центр компании', type: 'magneticAttraction' },
      { id: 'q7_c', text: '⚗️ Тот, кто превращает обычную встречу в событие', type: 'relationshipAlchemy' },
      { id: 'q7_d', text: '🌱 Тот, с кем делятся сокровенным и у кого ищут поддержки', type: 'soulHealer' },
      { id: 'q7_e', text: '📚 Советчик и хранитель мудрости', type: 'wisdomKeeper' },
      { id: 'q7_f', text: '🎭 Создатель ярких впечатлений и воспоминаний', type: 'specialMomentCreator' },
      { id: 'q7_g', text: '🌈 Решатель проблем и преодолеватель трудностей', type: 'impossibilityMaster' }
    ]
  }
];

// Шаблоны для пользовательских вопросов
export const customQuestionTemplates = [
  {
    text: 'Что ты больше всего ценишь в партнере?',
    options: [
      '💯 Верность и честность',
      '🤝 Взаимопонимание',
      '❤️‍🔥 Страсть и романтику',
      '🎉 Веселье и сюрпризы',
      '🧠 Интеллект и глубину',
      '🌸 Нежность и заботу'
    ]
  },
  {
    text: 'Какой подарок тебя больше всего порадует?',
    options: [
      '🛠️ Практичная вещь',
      '🎁 Что-то со смыслом',
      '❤️ Романтический сюрприз',
      '🎢 Новые впечатления',
      '🔮 Что-то редкое и необычное',
      '✋ Сделанное своими руками'
    ]
  },
  {
    text: 'Как ты представляешь идеальные выходные вместе?',
    options: [
      '🏠 Дома в уюте вдвоем',
      '🏃‍♂️ Активный отдых',
      '🌃 Романтический уикенд',
      '🎪 Веселые развлечения',
      '🎭 Культурная программа',
      '🎲 Спонтанно, без планов'
    ]
  }
];
