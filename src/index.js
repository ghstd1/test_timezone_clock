import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// импортируем глобальное состояние из Redux
import { store } from './store/store';

// импортируем провайдер состояния Provider из react-redux
import { Provider } from'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Оборачиваем приложение в компонент Provider и передаем ему глобальное состояние */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

