
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

// Расширяем интерфейс Window для Яндекс.Метрики
declare global {
  interface Window {
    enableYandexMetrika?: () => void;
    disableYandexMetrika?: () => void;
    ymInitialized?: boolean;
  }
}

interface CookieConsentProps {}

interface ConsentData {
  value: string;
  expires: number;
}

export function CookieConsent({}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const checkConsent = (): boolean => {
    const consentData = localStorage.getItem('cookieConsent');
    if (consentData) {
      try {
        const { value, expires }: ConsentData = JSON.parse(consentData);
        if (value === 'accepted' && Date.now() < expires) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const hasConsent = checkConsent();
    console.log('Cookie consent check:', hasConsent);
    if (hasConsent) {
      // Включаем метрику если согласие уже есть и метрика еще не инициализирована
      if (window.enableYandexMetrika && !window.ymInitialized) {
        console.log('Enabling Yandex Metrika');
        window.enableYandexMetrika();
      } else if (window.ymInitialized) {
        console.log('Yandex Metrika already initialized');
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (!isAccepted) return;

    const consentData: ConsentData = {
      value: 'accepted',
      expires: Date.now() + 31536000000 // 1 год
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    console.log('Cookie consent saved:', consentData);
    
    // Включаем метрику
    if (window.enableYandexMetrika) {
      console.log('Activating Yandex Metrika after consent');
      window.enableYandexMetrika();
    }
    
    // Уведомляем о принятии согласия
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="liquid-glass p-6 rounded-3xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer accent-purple-500"
              />
              <label htmlFor="consent-checkbox" className="text-sm text-foreground leading-relaxed cursor-pointer">
                Я соглашаюсь на сбор данных с помощью сервиса Яндекс.Метрика и принимаю{' '}
                <a
                  href="/privacy-policy"
                  className="text-rainbow-cyan hover:underline transition-colors"
                >
                  политику конфиденциальности
                </a>
              </label>
            </div>
            <Button
              onClick={handleAccept}
              disabled={!isAccepted}
              size="sm"
              className="btn-glass rounded-full max-w-40 mx-auto disabled:opacity-50"
            >
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
