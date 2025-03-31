import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Dynamic import of all locale files
const localeModules = import.meta.glob("./locales/*.{ts,js,json}", {
  eager: true,
});

// Extract the language code from the file path and build resources dynamically
const resources: Record<string, { translation: any }> = {};

Object.entries(localeModules).forEach(([path, module]) => {
  // Skip example files
  if (path.includes(".example.")) {
    return;
  }
  // Extract language code from path (e.g., './locales/en.ts' -> 'en')
  const match = path.match(/\.\/locales\/(.+)\.(ts|js|json)$/);

  if (match && match[1]) {
    const langCode = match[1];

    // Add to resources
    resources[langCode] = {
      // The actual content might be in default (for ESM) or directly in the module (for JSON)
      translation: (module as any).default || module,
    };
  }
});

// Derive supported languages directly from the resources object
const supportedLngs = Object.keys(resources);

// Make sure we have at least one language
if (supportedLngs.length === 0) {
  throw new Error("No locale files found in the locales directory");
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: supportedLngs[0],
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
