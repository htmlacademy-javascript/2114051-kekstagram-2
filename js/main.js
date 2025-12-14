  const LIKES_MIN = 15;
  const LIKES_MAX = 200;
  const COMMENTS_MAX = 30;
  const AVATAR_MIN = 1;
  const AVATAR_MAX = 6;
  const NAMES = ['Петя', 'Вася', 'Гриша', 'Юра', 'Слава', 'Миша', 'Марик', 'Антон', 'Дима'];


  const DESCRIPTIONS = [
    'Мокры дождь',
    'Прекрасная сказка',
    'Добрый слон',
    'Толстая собака',
    'Высокая гора',
    'Пустыня без воды',
    'Человек может все',
    'А на море белый песок',
    'Дует теплый ветер в лицо',
    'Я плачу на Техно',
    'Твоя печаль, твоя любовь, улыбки, слезы',
    'За окном все так же стонут провода',
    'Поезд мчит меня в сибирские морозы',
    'Гранитный камушек',
    'Вокзал, место встречь и прощаний',
    'Счастливые глаза',
    'Умиротворение',
    'Успех для каждого свой',
    'Бьет январская вьюга',
    'Терпение охотника',
    'Красная феррари',
    'Красивая жизнь',
    'Собака лучший друг человека',
    'Большие города',
    'Вкусный борщ'
  ];

  const COMMENTS_TEXT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];


let creatureComments = function(commentId) {
  const avatarNumber = Math.floor(Math.random() * (AVATAR_MAX - AVATAR_MIN + 1)) + AVATAR_MIN;

  const NAME = NAMES[Math.floor(Math.random() * NAMES.length)];

  const counterMessage = Math.floor(Math.random() * 2) + 1;
  let message = '';

  for (let j = 0; j < counterMessage; j++) {
    const randomText = COMMENTS_TEXT[Math.floor(Math.random() * COMMENTS_TEXT.length)];
    message += randomText + ' ';
  }
    return {
      id: commentId,
      avatar: `img/avatar-${avatarNumber}.svg`,
      message: message.trim(),
      name: NAME
    };
};


let creaturePhotoDescriptions = function() {
  const photos = [];
   let commentIdCounter = 1;

  for (let i = 1; i <= 25; i++) {

    const RANDOM_DESCRIPTIONS = Math.floor(Math.random() * DESCRIPTIONS.length);
    const DESCRIPTION = DESCRIPTIONS[RANDOM_DESCRIPTIONS];

    const LIKES = Math.floor(Math.random() * (LIKES_MAX - LIKES_MIN + 1)) + LIKES_MIN;

    const COMMENTS_COUNTER = Math.floor(Math.random() * (COMMENTS_MAX + 1));

    const COMMENTS = [];
    for (let j = 0; j < COMMENTS_COUNTER; j++) {
      COMMENTS.push(creatureComments(commentIdCounter));
      commentIdCounter++;
    };

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTION,
      likes: LIKES,
      comments: COMMENTS,
    };
    photos.push(photo);
  }

  return photos;
}

console.log(creaturePhotoDescriptions());
