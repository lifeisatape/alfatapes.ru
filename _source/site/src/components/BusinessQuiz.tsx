import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionBackdrop } from '@/components/SectionBackdrop';

interface Answer {
  [key: number]: string | string[];
}

const allResults = [
  {
    title: 'ML-решения и классическая автоматизация',
    description: 'Если ваши данные структурированы в таблицах, нужны прогнозы и аналитика',
    details: `
• Анализ исторических данных
• Оптимизация запасов и логистики
• Прогнозирование спроса и тенденций
• Интеграции с другими системами
Подходит для: розницы, производства, логистики, аналитики продаж`
  },
  {
    title: 'AI-интеграции на базе LLM',
    description: 'Если нужно автоматизировать работу с текстом и документами',
    details: `
• Обработка текста и документов
• Автоматизация переписки
• Классификация входящих заявок
• Извлечение информации из документов
Подходит для: поддержка клиентов, обработка документов, обращения`
  },
  {
    title: 'Сайт / PWA',
    description: 'Если нужно цифровое присутствие и база для будущей автоматизации',
    details: `
• Основа для интеграции всех будущих решений
• Прогрессивное веб-приложение (PWA)
• Интеграция с CRM и системами учёта
• Возможность встроить чат-боты
Подходит для: компаний без цифрового присутствия, нужен современный интерфейс`
  },
  {
    title: 'Лояльность и интерактив',
    description: 'Если нужно выделиться, увлечь клиентов и повысить лояльность',
    details: `
• Механики лояльности 
• Интерактивные квизы
• Образовательные симуляторы и тренажёры
• Система баллов и бонусов для клиентов
Подходит для: маркетинга, обучения, повышения вовлечения`
  },
  {
    title: 'Дизайн и контент',
    description: 'Если нужен уникальный контент для продвижения и выделения',
    details: `
• Дизайн графики, интерфейсов, продуктов
• Видео для маркетинга
• Музыка для брендирования
• Голос и озвучка
Подходит для: творческих компаний, маркетинга, медиа`
  },
  {
    title: 'Аудит',
    description: 'Думаете с чего начать и нужна стратегия',
    details: `
• Анализ вашего цифрового присутствия
• Рекомендации по оптимизации для AI-поисковиков
• Стратегия развития с учётом данных и ресурсов
• Оценка затрат и сроков
Подходит для: любого бизнеса, которому нужна ясность и план действий`
  }
];

const questions = [
  {
    id: 1,
    
    question: 'Как сейчас организована работа?',
    type: 'single' as const,
    options: [
      'Вручную: таблицы, бумажные документы, звонки',
      'Есть учётная программа, но работаем руками',
      'Многое оцифровано, есть отчёты и интеграции',
      'Есть своя IT-команда, внедряем технологии постоянно'
    ]
  },
  {
    id: 2,
  
    question: 'Что беспокоит больше всего?',
    type: 'single' as const,
    options: [
      'Тратим много времени на рутину',
      'Не понимаем, почему клиенты уходят',
      'Нужен сайт или приложение с нуля',
      'Хотим выделиться — нужна геймификация или интерактив'
    ]
  },
  {
    id: 3,
   
    question: 'Какие задачи повторяются каждый день?',
    type: 'multiple' as const,
    options: [
      'Отвечаем на одни и те же вопросы клиентов',
      'Переносим данные из одной системы в другую',
      'Анализируем документы, письма, отзывы',
      'Ничего особо не повторяется / не знаю'
    ]
  },
  {
    id: 4,
   
    question: 'Сколько времени уходит на рутину?',
    type: 'single' as const,
    options: [
      'Несколько часов в день',
      'Немного, но накапливается и раздражает',
      'Не знаю, но можно ускориться',
      'У нас таких задач нет'
    ]
  },
  {
    id: 5,
   
    question: 'Есть ли данные за последний год?',
    type: 'single' as const,
    options: [
      'Есть много данных в цифровом виде',
      'Есть, в разных местах и не организованно',
      'Только за последние месяцы',
      'Нет, только начинаем / всё на бумаге'
    ]
  },
  {
    id: 6,
    
    question: 'С чем больше работаете?',
    type: 'single' as const,
    options: [
      'Продажи, остатки, аналитика',
      'Заявки, документы, описания, отзывы',
      'Фото / видео материалы, контент',
      'Всего понемногу'
    ]
  },
  {
    id: 7,
   
    question: 'Чего хотите достичь?',
    type: 'single' as const,
    options: [
      'Избавиться от рутины',
      'Быстрее обрабатывать заявки',
      'Создать сайт / приложение',
      'Усилить вовлечение клиентов'
    ]
  },
  {
    id: 8,
    
    question: 'Какой бюджет на проект?',
    type: 'single' as const,
    options: [
      'До 200 000 ₽',
      '200 000 - 500 000 ₽',
      'От 500 000 ₽',
      'Пока не знаю'
    ]
  },
  {
    id: 9,
   
    question: 'Как быстро нужен результат?',
    type: 'single' as const,
    options: [
      '2-4 недели',
      '1-3 месяца',
      'Не спешим',
      'Пока не знаю'
    ]
  }
];

function calculateResults(answers: Answer) {
  const results = [];

  if (answers[6] === 'Продажи, остатки, аналитика') {
    results.push(allResults[0]);
  }

  if (answers[6] === 'Заявки, документы, описания, отзывы') {
    results.push(allResults[1]);
  }

  if (answers[2] === 'Нужен сайт или приложение с нуля' ||
      answers[5] === 'Нет, только начинаем / всё на бумаге') {
    results.push(allResults[2]);
  }

  if (answers[2] === 'Хотим выделиться — нужна геймификация или интерактив' ||
      answers[7] === 'Усилить вовлечение клиентов') {
    results.push(allResults[3]);
  }

  if (answers[6] === 'Фото / видео материалы, контент') {
    results.push(allResults[4]);
  }

  if (results.length === 0) {
    results.push(allResults[2]);
    results.push(allResults[1]);
    results.push(allResults[5]);
  }

  const uniqueResults = Array.from(new Map(results.map(r => [r.title, r])).values());
  return uniqueResults.slice(0, 3);
}

export function BusinessQuiz() {
  const [answers, setAnswers] = useState<Answer>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<typeof allResults>([]);

  const currentQuestion = questions[currentStep];
  const hasCurrentAnswer = answers[currentQuestion.id] &&
    (Array.isArray(answers[currentQuestion.id]) ? (answers[currentQuestion.id] as string[]).length > 0 : true);

  const handleAnswer = (questionId: number, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSingleChoice = (questionId: number, value: string) => {
    handleAnswer(questionId, value);
  };

  const handleMultipleChoice = (questionId: number, value: string, checked: boolean) => {
    const current = (answers[questionId] as string[]) || [];
    if (checked) {
      handleAnswer(questionId, [...current, value]);
    } else {
      handleAnswer(questionId, current.filter(v => v !== value));
    }
  };

  const handleNext = () => {
    if (hasCurrentAnswer) {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        const recs = calculateResults(answers);
        setRecommendations(recs);
        setShowResults(true);
        setResultIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setShowResults(false);
    setCurrentStep(0);
    setAnswers({});
    setResultIndex(0);
    setRecommendations([]);
    
    // Force visibility of quiz elements after reset
    setTimeout(() => {
      const quizElements = document.querySelectorAll('#quiz .scroll-fade-in');
      quizElements.forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);
  };

  const handleNextResult = () => {
    if (resultIndex < recommendations.length - 1) {
      setResultIndex(resultIndex + 1);
    }
  };

  const handlePrevResult = () => {
    if (resultIndex > 0) {
      setResultIndex(resultIndex - 1);
    }
  };

  const currentResult = recommendations[resultIndex];

  return (
    <section id="quiz" className="relative py-32 px-6">
      <SectionBackdrop opacity="medium" />
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-4xl md:text-5xl font-bold mb-6">Аудит</span>
          </h2>
          
        </div>

        {!showResults ? (
          <div className="space-y-8">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rainbow-purple to-rainbow-cyan transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {currentStep + 1} / {questions.length}
              </span>
            </div>

            {/* Question */}
            <div className="scroll-fade-in" data-testid={`quiz-question-${currentQuestion.id}`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{currentQuestion.question}</h3>

              {/* Answer Options */}
              {currentQuestion.type === 'single' ? (
                <RadioGroup 
                  key={`radio-${currentQuestion.id}`}
                  value={answers[currentQuestion.id] as string || ''} 
                  onValueChange={(value) => handleSingleChoice(currentQuestion.id, value)}
                >
                  <div className="space-y-4 mb-8">
                    {currentQuestion.options.map((option, idx) => (
                      <div key={`${currentQuestion.id}-${idx}-${option}`} className="liquid-glass rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer" data-testid={`quiz-option-${currentQuestion.id}-${idx}`}>
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={option} id={`q${currentQuestion.id}-${idx}`} />
                          <Label htmlFor={`q${currentQuestion.id}-${idx}`} className="flex-1 cursor-pointer font-medium text-base">
                            {option}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <div key={`checkbox-${currentQuestion.id}`} className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, idx) => (
                    <div key={`${currentQuestion.id}-${idx}-${option}`} className="liquid-glass rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer" data-testid={`quiz-option-${currentQuestion.id}-${idx}`}>
                      <div className="flex items-center gap-4">
                        <Checkbox
                          id={`q${currentQuestion.id}-${idx}`}
                          checked={(answers[currentQuestion.id] as string[])?.includes(option) || false}
                          onCheckedChange={(checked) => handleMultipleChoice(currentQuestion.id, option, checked as boolean)}
                        />
                        <Label htmlFor={`q${currentQuestion.id}-${idx}`} className="flex-1 cursor-pointer font-medium text-base">
                          {option}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  data-testid="button-previous-question"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!hasCurrentAnswer}
                  size="lg"
                  className="btn-glass rounded-full px-8 font-bold flex-1 md:flex-none"
                  data-testid="button-next-question"
                >
                  {currentStep === questions.length - 1 ? 'Узнать рекомендации' : 'Далее'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            

            {currentResult && (
              <div className="liquid-glass rounded-xl p-8 md:p-12 min-h-[600px] flex flex-col justify-between" data-testid={`quiz-result-${resultIndex}`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{currentResult.title}</h2>
                  <p className="text-xl text-muted-foreground mb-8 font-medium">{currentResult.description}</p>
                  
                  <div className="space-y-4">
                    {currentResult.details.split('\n').map((line, idx) => {
                      if (line.trim() === '') return null;
                      return (
                        <p key={idx} className="text-muted-foreground leading-relaxed">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Result Navigation */}
                {recommendations.length > 1 && (
                  <div className="flex gap-4 justify-between pt-8 mt-8">
                    <Button
                      onClick={handlePrevResult}
                      disabled={resultIndex === 0}
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                      data-testid="button-previous-result"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Button
                      onClick={handleNextResult}
                      disabled={resultIndex === recommendations.length - 1}
                      size="lg"
                      className="btn-glass rounded-full px-8 font-bold"
                      data-testid="button-next-result"
                    >
                      
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center gap-4 pt-8 flex-wrap">
              <Button
                onClick={handleRetake}
                variant="outline"
                size="lg"
                className="rounded-full text-lg px-8 py-6 font-bold"
                data-testid="button-retake-quiz"
              >
                Заново
              </Button>
              <Button
                asChild
                size="lg"
                className="btn-glass rounded-full text-lg px-8 py-6 font-bold"
                data-testid="button-discuss-based-on-results"
              >
                <a href="#contact">Обсудить результаты →</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
