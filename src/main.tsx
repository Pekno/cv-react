import '@fontsource/signika/400.css';
import '@fontsource/signika/500.css';
import '@fontsource/signika/600.css';
import '@fontsource/signika/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LanguageRedirect from './components/LanguageRedirect';
import { MantineThemeProvider } from './theme/MantineProvider';
import './theme/variables.css';
import './theme/mixins.css';
import './theme/global-styles.css';
import './theme/color-transitions.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

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
