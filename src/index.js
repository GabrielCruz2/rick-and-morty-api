import React from 'react';
import ReactDOM from 'react-dom/client';
import './styled/index.css';
import App from './App';
import reportWebVitals from './report/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();