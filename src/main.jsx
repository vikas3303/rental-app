import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { initMockData } from './utils/localStorageUtils';

initMockData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
