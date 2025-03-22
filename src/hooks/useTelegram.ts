import { useEffect, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';

export function useTelegram() {
  // Инициализируем Telegram WebApp при монтировании компонента
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    
    return () => {
      // Cleanup при размонтировании
      WebApp.MainButton.hide();
    };
  }, []);

  // Функция для навигации по ссылке внутри телеграм
  const openTelegramLink = useCallback((url: string) => {
    WebApp.openTelegramLink(url);
  }, []);

  // Функция для отображения основной кнопки
  const showMainButton = useCallback((text: string, callback: () => void) => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.onClick(callback);
    WebApp.MainButton.show();

    return () => {
      WebApp.MainButton.offClick(callback);
      WebApp.MainButton.hide();
    };
  }, []);

  // Получение данных пользователя
  const getUserData = useCallback(() => {
    if (!WebApp.initDataUnsafe.user) {
      return {
        id: 'unknown',
        name: 'Гость'
      };
    }

    return {
      id: WebApp.initDataUnsafe.user.id.toString(),
      name: WebApp.initDataUnsafe.user.first_name,
      username: WebApp.initDataUnsafe.user.username,
    };
  }, []);

  return {
    showMainButton,
    openTelegramLink,
    getUserData,
    tgWebApp: WebApp
  };
}
