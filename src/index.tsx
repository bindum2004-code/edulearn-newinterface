import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This should be a simple import
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);