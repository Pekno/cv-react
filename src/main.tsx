import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineThemeProvider } from './theme/MantineProvider';
import './theme/variables.css';
import './theme/mixins.css';
import './i18n/i18n.ts';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MantineThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineThemeProvider>
  </React.StrictMode>
);