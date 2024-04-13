import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
import 'tailwindcss/base.css';
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);