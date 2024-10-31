import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure you have an App component
import './components/styles/index.css'; // Optional, for styles
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
