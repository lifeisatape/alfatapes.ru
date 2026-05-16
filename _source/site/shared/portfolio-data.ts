export type PortfolioCase = {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  features: string[];
  achievements: string[];
  technologies: string[];
  category: string;
  imageUrl?: string;
  images?: string[];
  demoUrl?: string;
  screenSize?: { width: number; height: number };
};

export const portfolioCases: PortfolioCase[] = [
  {
    id: "liniya-bi",
    title: "Сайт и BI для Линии",
    subtitle: "Клиентский сайт и комплексная система управления наружной рекламой с аналитикой и планированием",
    overview: "Полнофункциональная система, разработанная для управления рекламными щитами, отслеживания заказов и предоставления аналитики для бизнеса наружной рекламы в Петрозаводске и Карелии. Проект требовал комплексного подхода для решения различных пользовательских ролей и бизнес-потребностей. Система включает более 300 рекламных поверхностей с полным функционалом для планирования, управления и анализа.",
    features: ["Дашборд с ключевыми метриками и аналитикой", "Управление заказами с отслеживанием статуса", "База данных клиентов с историей"],
    achievements: ["Интерактивная карта с расположением рекламных щитов", "Планирование расписания и встроенный AI ассистент", "Аналитика эффективности рекламных кампаний"],
    technologies: ["React", "TypeScript", "Express.js", "PostgreSQL", "Tailwind CSS", "Leaflet"],
    category: "Web Application",
    imageUrl: "@assets/line1_1763386688336.png",
    images: ["@assets/line2_1763386688337.png", "@assets/line3_1763386688337.png", "@assets/line4_1763386688338.png", "@assets/line5_1763386688338.png", "@assets/line6_1763386688339.png", "@assets/line7_1763386688340.png"],
  },
  {
    id: "online-editor",
    title: "Онлайн редактор",
    subtitle: "Многофункциональный онлайн-редактор изображений с поддержкой рисования, анимированные кисти, вставки готовых ассетов, рендеринг GIF / APNG",
    overview: "Приложение представляет собой полноценный веб-редактор изображений, реализованный на React и Fabric.js. Настраиваемые кисти, функции манипуляции объектами и библиотека готовых ассетов. Особое внимание уделено адаптивности и удобству использования на различных устройствах.",
    features: ["Многофункциональный редактор изображений", "Настраиваемые кисти и инструменты рисования", "Анимированные кисти и эффкеты"],
    achievements: ["Замечен в топ 6 раздела ART в Base App", "Предложение интеграции от HUNT SDK для минтинга NFT", "Положительные отзывы от web3-сообщества"],
    technologies: ["React", "Fabric.js", "CSS", "Vercel"],
    category: "Creative Tool",
    imageUrl: "@assets/editor_1763388096038.png",
    demoUrl: "https://tapes.moscow",
    screenSize: { width: 1300, height: 600 },
  },
  {
    id: "flowers-on-mars",
    title: "Flowers on Mars",
    subtitle: "Браузерная игра-шутер в жанре аркады с базой для интеграции Web3",
    overview: "Flowers on Mars - это динамичная браузерная игра-шутер с элементами аркады, в которой игрок управляет космонавтом на Марсе, сражаясь с различными противниками. Детально проработанная система управления как на десктопе, так и на мобильных устройствах.",
    features: ["Управляемый игроком персонаж с системой здоровья и щитов", "Различные типы врагов с ИИ", "Сражение с боссом в конце уровня", "Система частиц и визуальных эффектов"],
    achievements: ["Система очков и глобальная таблица лидеров", "Адаптивное управление для разных устройств", "Полная поддержка десктопных и мобильных устройств"],
    technologies: ["JavaScript", "Canvas", "Python", "Flask", "Web3.js", "HTML5"],
    category: "Game",
    imageUrl: "@assets/flowersonmrs_1763388273464.png",
    demoUrl: "https://flowersonmars.replit.app",
    screenSize: { width: 1300, height: 600 },
  },
  {
    id: "honk-farcaster",
    title: "Honk! Приложение Farcaster",
    subtitle: "Социальное приложение-кликер с увлекательной механикой, построенное на протоколе Farcaster",
    overview: "Honk! - это развлекательное приложение для социальной сети Farcaster, где пользователи могут кликать на кнопку 'Honk' для накопления очков и соревнования с другими пользователями. Приложение использует безопасную JWT-аутентификацию и имеет встроенные механизмы защиты от превышения лимитов. Более 4000 активных пользователей используют приложение ежедневно.",
    features: ["Безопасная аутентификация на основе JWT", "Защита от превышения лимитов", "Интерактивная механика социального кликера"],
    achievements: ["Одно из первых mini app на Farcaster", "Социальный эффект и хайп на мемах", "4000+ активных пользователей ежедневно"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "JWT", "PostgreSQL", "Farcaster Frame SDK"],
    category: "Social App",
    imageUrl: "@assets/honk_1763388485672.png",
  },
  {
    id: "pinball-allstars",
    title: "Pinball: All Stars",
    subtitle: "Пинбол из детства с персонализированным дизайном уровней для Farcaster сообществ",
    overview: "Развлекательное приложение для социальной сети Farcaster, где пользователи могут играть в классический пинбол для накопления очков и соревнования с другими пользователями.",
    features: ["3 персонализированных уровня", "Редактор уровней", "Интерактивная социальная механика", "Обновления в реальном времени", "Функциональность прогрессивного веб-приложения"],
    achievements: ["#64 trending Farcaster", "#5 Base App Games", "630+ игроков", "2000+ игровых сессий", "Каждый 3-й добавил в избранное"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "JWT", "PostgreSQL", "Farcaster Frame SDK"],
    category: "Game",
    imageUrl: "@assets/pinbal_1763388368936.png",
    demoUrl: "https://pinballll.space",
    screenSize: { width: 375, height: 700 },
  },
  {
    id: "alfatuna",
    title: "alfatuna",
    subtitle: "Высокоточное Progressive Web Application для настройки гитары с использованием микрофона устройства",
    overview: "Приложение обеспечивает профессиональное определение высоты тона в реальном времени с визуализацией через спектрограмму.",
    features: ["14 гитарных строёв (Standard, Drop D/C/C#/B/A, D/Eb/C# Standard, DADGAD, Open G/D/E/A)", "Высокоточное определение частоты", "Real-time scrolling спектрограмма", "Автоматическое определение струны", "Тактильная обратная связь", "Темная минималистичная тема"],
    achievements: ["PWA режим", "Адаптивный дизайн", "Калибровка", "Свайп-навигация между строями"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Web Audio API", "PWA"],
    category: "Music App",
    demoUrl: "https://alfatuna.replit.app",
    screenSize: { width: 375, height: 740 },
  },
];
