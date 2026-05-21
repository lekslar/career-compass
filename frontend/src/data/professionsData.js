import { Code, Server, Smartphone, CheckCircle } from 'lucide-react';

export const professionsData = [
  {
    id: 1,
    slug: 'frontend',
    title: 'Frontend-разработчик',
    icon: Code,
    color: 'card-blue',
    shortDescription: 'Создаёт интерфейсы веб-приложений',
    fullDescription: 'Frontend-разработчик отвечает за создание и оптимизацию пользовательского интерфейса веб-приложений. Специалист работает с HTML, CSS и JavaScript для реализации дизайна, обеспечения интерактивности и хорошей производительности.',
    keySkills: [
      { name: 'HTML/CSS', level: 'Essential' },
      { name: 'JavaScript', level: 'Essential' },
      { name: 'React/Vue/Angular', level: 'Essential' },
      { name: 'Git', level: 'Important' },
      { name: 'REST API', level: 'Important' },
      { name: 'Responsive Design', level: 'Essential' }
    ],
    requirements: {
      education: 'Высшее образование или курсы программирования',
      certificates: 'Желательны сертификаты по JavaScript и фреймворкам',
      experience: 'Начиная с 0 опыта (Junior), до 5+ лет (Senior)'
    },
    careerPath: [
      {
        level: 'Junior Frontend Developer',
        description: 'Базовые навыки HTML/CSS/JS, простые задачи под присмотром',
        salary: '60 000 - 100 000 ₽'
      },
      {
        level: 'Middle Frontend Developer',
        description: 'Самостоятельная разработка, оптимизация, код-ревью',
        salary: '120 000 - 180 000 ₽'
      },
      {
        level: 'Senior Frontend Developer',
        description: 'Архитектура, менторство, стратегия разработки',
        salary: '200 000 - 300 000 ₽'
      },
      {
        level: 'Lead Frontend Developer',
        description: 'Управление командой, планирование, инновации',
        salary: '300 000+ ₽'
      }
    ],
    firstSteps: [
      'Изучить HTML и CSS основы',
      'Научиться JavaScript базовым концепциям',
      'Создать 3-5 простых проектов',
      'Изучить React или Vue',
      'Выложить портфолио на GitHub',
      'Найти первый проект для практики'
    ],
    resources: {
      courses: [
        'The Complete JavaScript Course (Udemy)',
        'React - The Complete Guide (Udemy)',
        'Frontend Masters',
        'Codecademy'
      ],
      books: [
        'JavaScript: The Good Parts',
        'Eloquent JavaScript',
        'You Don\'t Know JS Yet'
      ],
      websites: [
        'MDN Web Docs',
        'CSS-Tricks',
        'Dev.to'
      ]
    }
  },
  {
    id: 2,
    slug: 'backend',
    title: 'Backend разработчик',
    icon: Server,
    color: 'card-lilac',
    shortDescription: 'Разрабатывает серверную часть приложений',
    fullDescription: 'Backend-разработчик создаёт и поддерживает серверную логику приложений. Работает с базами данных, API, аутентификацией и бизнес-логикой, обеспечивая стабильность и масштабируемость системы.',
    keySkills: [
      { name: 'Python/Java/Node.js', level: 'Essential' },
      { name: 'SQL/Databases', level: 'Essential' },
      { name: 'REST API', level: 'Essential' },
      { name: 'Git', level: 'Important' },
      { name: 'Docker', level: 'Important' },
      { name: 'System Design', level: 'Important' }
    ],
    requirements: {
      education: 'Высшее образование в ИТ или курсы программирования',
      certificates: 'Полезны сертификаты AWS, Docker, Kubernetes',
      experience: 'От 0 опыта (Junior) до 10+ лет (Senior)'
    },
    careerPath: [
      {
        level: 'Junior Backend Developer',
        description: 'CRUD операции, работа с БД, простая логика',
        salary: '70 000 - 110 000 ₽'
      },
      {
        level: 'Middle Backend Developer',
        description: 'Сложная логика, оптимизация, архитектура модулей',
        salary: '130 000 - 200 000 ₽'
      },
      {
        level: 'Senior Backend Developer',
        description: 'Архитектура системы, микросервисы, performance',
        salary: '220 000 - 350 000 ₽'
      },
      {
        level: 'Lead Backend Developer',
        description: 'Управление проектом, стратегия, инновации',
        salary: '350 000+ ₽'
      }
    ],
    firstSteps: [
      'Выбрать язык программирования (Python/JavaScript)',
      'Изучить основы программирования',
      'Освоить SQL и работу с БД',
      'Создать REST API проект',
      'Выложить проект на GitHub',
      'Изучить Docker и деплой'
    ],
    resources: {
      courses: [
        'The Complete Node.js Developer Course (Udemy)',
        'Python Django - The Complete Guide',
        'System Design Interview',
        'Backend Masters'
      ],
      books: [
        'Design Patterns',
        'Clean Code',
        'System Design Interview'
      ],
      websites: [
        'Stack Overflow',
        'GitHub',
        'LeetCode'
      ]
    }
  },
  {
    id: 3,
    slug: 'android',
    title: 'Android разработчик',
    icon: Smartphone,
    color: 'card-pink',
    shortDescription: 'Разрабатывает приложения для Android',
    fullDescription: 'Android-разработчик создаёт мобильные приложения для устройств на базе Android. Работает с Java/Kotlin, Android SDK, материальным дизайном и оптимизирует приложения для различных устройств.',
    keySkills: [
      { name: 'Kotlin/Java', level: 'Essential' },
      { name: 'Android SDK', level: 'Essential' },
      { name: 'Material Design', level: 'Important' },
      { name: 'REST API', level: 'Essential' },
      { name: 'Git', level: 'Important' },
      { name: 'Firebase', level: 'Important' }
    ],
    requirements: {
      education: 'Высшее образование или курсы мобильной разработки',
      certificates: 'Google Associate Android Developer сертификат',
      experience: 'От 0 опыта до 7+ лет'
    },
    careerPath: [
      {
        level: 'Junior Android Developer',
        description: 'Простые экраны, базовая функциональность',
        salary: '65 000 - 105 000 ₽'
      },
      {
        level: 'Middle Android Developer',
        description: 'Сложные фичи, оптимизация, архитектура',
        salary: '125 000 - 190 000 ₽'
      },
      {
        level: 'Senior Android Developer',
        description: 'Архитектура приложения, лидерство, менторство',
        salary: '210 000 - 320 000 ₽'
      },
      {
        level: 'Lead Android Developer',
        description: 'Управление командой, стратегия, инновации',
        salary: '320 000+ ₽'
      }
    ],
    firstSteps: [
      'Изучить Java или Kotlin',
      'Установить Android Studio',
      'Создать первое приложение (Hello World)',
      'Изучить основы Android API',
      'Создать 3-4 своих проекта',
      'Опубликовать на Google Play Store'
    ],
    resources: {
      courses: [
        'Android Development for Beginners (Udacity)',
        'Advanced Android App Development',
        'Kotlin for Android Developers',
        'Google Developers Codelabs'
      ],
      books: [
        'Head First Android Development',
        'Professional Android',
        'The Big Nerd Ranch Guide'
      ],
      websites: [
        'Android Developers (developer.android.com)',
        'GitHub',
        'Medium'
      ]
    }
  },
  {
    id: 4,
    slug: 'qa',
    title: 'QA Engineer',
    icon: CheckCircle,
    color: 'card-lime',
    shortDescription: 'Тестирует качество приложений',
    fullDescription: 'QA Engineer обеспечивает качество программного обеспечения через тестирование. Проводит как ручное, так и автоматизированное тестирование, документирует баги и улучшает процессы разработки.',
    keySkills: [
      { name: 'Тестирование (manual)', level: 'Essential' },
      { name: 'Автоматизация тестов', level: 'Important' },
      { name: 'SQL', level: 'Important' },
      { name: 'Python/JavaScript', level: 'Important' },
      { name: 'Git', level: 'Important' },
      { name: 'JIRA/TestRail', level: 'Essential' }
    ],
    requirements: {
      education: 'Высшее образование или курсы QA',
      certificates: 'ISTQB, Selenium и другие сертификаты по тестированию',
      experience: 'От 0 опыта (Junior) до 8+ лет (Senior)'
    },
    careerPath: [
      {
        level: 'Junior QA Engineer',
        description: 'Ручное тестирование, документирование багов',
        salary: '55 000 - 85 000 ₽'
      },
      {
        level: 'Middle QA Engineer',
        description: 'Автоматизация тестов, тест-кейсы, координация',
        salary: '100 000 - 160 000 ₽'
      },
      {
        level: 'Senior QA Engineer',
        description: 'Стратегия тестирования, менторство, CI/CD',
        salary: '180 000 - 280 000 ₽'
      },
      {
        level: 'Lead QA Engineer',
        description: 'Управление командой, оптимизация процессов',
        salary: '280 000+ ₽'
      }
    ],
    firstSteps: [
      'Изучить основы тестирования и ISTQB',
      'Научиться заполнять тест-кейсы',
      'Найти практику на открытых проектах',
      'Изучить Selenium/Cypress',
      'Освоить Python или JavaScript',
      'Создать портфолио с примерами'
    ],
    resources: {
      courses: [
        'ISTQB Certification Preparation',
        'Selenium WebDriver with Java',
        'API Testing with Postman',
        'Complete Selenium WebDriver Course'
      ],
      books: [
        'ISTQB Certification Handbook',
        'The Art of Software Testing',
        'Lessons Learned in Software Testing'
      ],
      websites: [
        'Test.io',
        'BugCrowd',
        'Selenium.dev'
      ]
    }
  }
];
