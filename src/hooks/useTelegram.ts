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
    WebApp.MainButton
