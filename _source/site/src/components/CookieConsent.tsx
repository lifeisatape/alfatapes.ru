
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
    if (hasConsent) {
      // Включаем метрику если согласие уже есть и метрика еще не инициализирована
      if (window.enableYandexMetrika && !window.ymInitialized) {
        window.enableYandexMetrika();
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
    
    // Включаем метрику
    if (window.enableYandexMetrika) {
      window.enableYandexMetrika();
    }
    
    // Уведомляем о принятии согласия
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="rounded-lg border border-white/10 bg-black/80 p-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-end gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-2.5">
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 cursor-pointer accent-[#c8b97a]"
              />
              <label htmlFor="consent-checkbox" className="cursor-pointer text-[11px] leading-relaxed text-white/78 sm:text-xs">
                Я соглашаюсь на Яндекс.Метрику и принимаю{' '}
                <a
                  href="/privacy-policy"
                  className="text-[#c8b97a] transition-colors hover:text-white"
                >
                  политику конфиденциальности
                </a>
              </label>
            </div>
            <Button
              onClick={handleAccept}
              disabled={!isAccepted}
              size="sm"
              className="h-8 shrink-0 rounded bg-[#c8b97a] px-3 text-xs font-medium text-black hover:bg-[#d4c581] disabled:opacity-45"
            >
              Принять
            </Button>
          </div>
      </div>
    </div>
  );
}
