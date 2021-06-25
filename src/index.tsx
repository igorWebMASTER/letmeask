import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  { Toaster } from 'react-hot-toast';


import './services/firebase'

import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#e2e2e2',
      color: '#1d1d1d',
    },
    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }} />
  </React.StrictMode>,
  document.getElementById('root')
);
