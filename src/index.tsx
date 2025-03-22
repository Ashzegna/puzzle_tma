import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './animations.css';
import './ios-styles.css'; // Добавлен импорт новых стилей
import App from './App';
import WebApp from '@twa-dev/sdk';

// Инициализация Telegram WebApp
WebApp.ready();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
