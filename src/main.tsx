import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { MantineThemeProvider } from './theme/MantineProvider';
import './theme/variables.css';
import './theme/mixins.css';
import './theme/global-styles.css';
import './theme/color-transitions.css';
import i18n from './i18n/i18n';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

/**
 * Redirects to the user's preferred language based on i18n detection
 * (path > localStorage > navigator fallback).
 */
function LanguageRedirect() {
  return <Navigate to={`/${i18n.language}`} replace />;
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MantineThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<App />} />
          <Route path="*" element={<LanguageRedirect />} />
        </Routes>
      </BrowserRouter>
    </MantineThemeProvider>
  </React.StrictMode>
);
