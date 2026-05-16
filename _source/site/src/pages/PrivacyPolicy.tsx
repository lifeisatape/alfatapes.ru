import { useState, useEffect } from "react";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";

// Расширяем интерфейс Window для Яндекс.Метрики
declare global {
  interface Window {
    enableYandexMetrika?: () => void;
    disableYandexMetrika?: () => void;
  }
}

function RevokeConsentButton() {
  const [isRevoked, setIsRevoked] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  // Проверяем статус согласия при загрузке компонента
  useEffect(() => {
    const checkConsentStatus = () => {
      const consentData = localStorage.getItem('cookieConsent');
      if (consentData) {
        try {
          const { value, expires } = JSON.parse(consentData);
          setHasConsent(value === 'accepted' && Date.now() < expires);
        } catch (e) {
          setHasConsent(false);
        }
      } else {
        setHasConsent(false);
      }
    };

    checkConsentStatus();

    // Слушаем изменения согласия
    const handleConsentChange = () => {
      checkConsentStatus();
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange);

    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
    };
  }, []);

  const handleRevokeConsent = () => {
    // Полностью удаляем согласие из localStorage
    localStorage.removeItem('cookieConsent');

    // Отключаем Яндекс.Метрику
    if (window.disableYandexMetrika) {
      window.disableYandexMetrika();
    }

    // Уведомляем компонент CookieConsent об изменении
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));

    setIsRevoked(true);
    setHasConsent(false);

    // Сбрасываем состояние через 3 секунды
    setTimeout(() => {
      setIsRevoked(false);
    }, 3000);
  };

  // Не показываем кнопку если согласие не было дано
  if (!hasConsent && !isRevoked) {
    return null;
  }

  return (
    <Button
      onClick={handleRevokeConsent}
      variant={isRevoked ? "outline" : "default"}
      className={`${isRevoked ? "border-green-500 text-green-500" : "btn-glass"} rounded-full transition-all duration-300`}
      disabled={isRevoked}
    >
      {isRevoked ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Согласие отозвано
        </>
      ) : (
        "Отозвать согласие"
      )}
    </Button>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-foreground">
      <ShaderBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/">
            <div className="text-xl font-bold">
              <span className="shimmer-text-smooth animate-shimmer-smooth">alfatápes</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="icon" className="btn-glass rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="relative pt-32 pb-20 px-6">
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="liquid-glass p-8 md:p-12 rounded-3xl">
            <h1 className="text-1xl md:text-4xl font-bold mb-8 text-center">
              Политика конфиденциальности
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Общие положения</h2>
              <p className="mb-4">1.1. Настоящая Политика определяет порядок обработки данных пользователей сайта alfatapes.ru (далее — «Сайт»).</p>
              <p className="mb-4">1.2. Оператор данных: физическое лицо, зарегистрированное в качестве налогоплательщика налога на профессиональный доход, Белов Дмитрий Владимирович, ИНН: 101502627174 </p>
              <p className="mb-6">1.3. Используя Сайт и подтверждая согласие (например, через всплывающий баннер), вы соглашаетесь с условиями настоящей Политики.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Какие данные мы обрабатываем</h2>
              <p className="mb-4">2.1. Данные, собираемые автоматически с помощью Яндекс.Метрики:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP-адрес пользователя;</li>
                <li>Данные файлов cookie;</li>
                <li>Сведения о браузере и устройстве (тип, версия, разрешение экрана);</li>
                <li>Данные о поведении на сайте (время посещения, просмотренные страницы, клики, прокрутка).</li>
              </ul>
              <p className="mb-6">2.2. Важно: Мы не собираем и не храним на своих серверах персональные данные, такие как ФИО, номер телефона или адрес электронной почты. Вся аналитическая информация предоставляется в обезличенном и агрегированном виде сервисом Яндекс.Метрика.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Цели обработки данных</h2>
              <p className="mb-4">3.1. Анализ трафика и поведения пользователей для улучшения содержания и удобства Сайта.</p>
              <p className="mb-6">3.2. Получение статистики посещаемости.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Правовые основания обработки</h2>
              <p className="mb-4">4.1. Обработка данных осуществляется на следующих основаниях:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Согласие субъекта персональных данных (п. 1 ч. 1 ст. 6 152-ФЗ) — для сбора данных через Яндекс.Метрику.</li>
                <li>Законные интересы оператора (п. 5 ч. 1 ст. 6 152-ФЗ) — для обеспечения технической работоспособности и безопасности Сайта.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Использование сервиса Яндекс.Метрика</h2>
              <p className="mb-4">5.1. На Сайте используется сервис веб-аналитики «Яндекс.Метрика», предоставляемый ООО «ЯНДЕКС».</p>
              <p className="mb-4">5.2. Яндекс обрабатывает данные пользователей в соответствии со своей Политикой конфиденциальности. Мы не имеем доступа к данным, которые позволяют идентифицировать конкретного пользователя вне сервиса Яндекс.Метрика.</p>
              <p className="mb-6">5.3. Для сбора данных используется технология cookie.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Условия передачи данных</h2>
              <p className="mb-4">6.1. Мы не передаем данные пользователей третьим лицам, за исключением:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Сервиса Яндекс.Метрика в обезличенном виде (при вашем согласии).</li>
                <li>В случаях, предусмотренных законодательством Российской Федерации (по требованию уполномоченных государственных органов).</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Хранение данных</h2>
              <p className="mb-6">7.1. Обработанные данные хранятся в соответствии с настройками сервиса Яндекс.Метрика.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Ваши права (права субъекта персональных данных)</h2>
              <p className="mb-4">8.1. Вы имеете право:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Отозвать согласие на сбор данных через Яндекс.Метрику.</li>
                <li>Заблокировать сохранение файлов cookie в настройках вашего браузера.</li>
              </ul>
              <p className="mb-6">8.2. Чтобы отозвать согласие на обработку данных Яндекс.Метрикой необходимо нажать на кнопку "Отозвать согласие".</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Контакты</h2>
              <p className="mb-4">По всем вопросам, связанным с обработкой ваших данных, вы можете обратиться к оператору:</p>
              <p className="mb-6">
                Ссылка для связи в Telegram: <a href="https://t.me/alfatapes" target="_blank" rel="noopener noreferrer" className="text-rainbow-cyan hover:underline">@alfatapes</a>
              </p>
              <p className="mb-6">Срок ответа на обращение: 30 календарных дней с момента его получения.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Заключительные положения</h2>
              <p className="mb-6">10.1. Настоящая Политика может изменяться. Актуальная версия всегда доступна на этой странице.</p>

            
                <h3 className="text-lg font-semibold mb-4">Управление согласием</h3>
                
                <RevokeConsentButton />
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}