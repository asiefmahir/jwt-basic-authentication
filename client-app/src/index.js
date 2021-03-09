import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/App.jsx';
import AppProvider from "../src/context";

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();