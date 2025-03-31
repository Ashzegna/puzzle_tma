import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './animations.css';
import './ios-styles.css';
import App from './App';
import WebApp from '@twa-dev/sdk';

// Правильное имя бота для всего приложения
export const BOT_USERNAME = 'knowyourmagic_bot';

// Инициализация Telegram WebApp
WebApp.ready();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
