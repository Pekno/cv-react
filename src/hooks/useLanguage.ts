import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslationKey } from "../types/translations.types";
import { useProfileData } from "./useProfileData";

// Define the interface for our hook
interface UseLanguageReturn {
  currentLanguage: string;
  supportedLanguages: string[];
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey, options?: any) => string;
  getCvPdfPath: () => string;
}

export const useLanguage = (): UseLanguageReturn => {
  // Use the standard hook
  const { t: originalT, i18n } = useTranslation();
  const { data } = useProfileData();

  // Use i18n.language directly instead of maintaining duplicate state
  const currentLanguage = i18n.language;

  // Update PDF path based on language
  const getCvPdfPath = useCallback((): string => {
    return data.meta.pdfResume[currentLanguage] ?? "";
  }, [currentLanguage, data.meta.pdfResume]);

  // Set a specific language
  const setLanguage = useCallback(
    (lang: string): void => {
      if (
        i18n.options.supportedLngs &&
        i18n.options.supportedLngs.includes(lang)
      ) {
        i18n.changeLanguage(lang);
      }
    },
    [i18n]
  );

  // Get all supported languages from i18n configuration
  const supportedLanguages = i18n.options.supportedLngs || [];

  // Filter out special values like 'cimode' and example files
  const filteredLanguages = supportedLanguages.filter(
    (lang) => lang !== "cimode" && lang !== "dev" && Boolean(lang)
  );

  // Create a wrapper that handles the type checking
  const typedT = useCallback(
    (key: TranslationKey, options?: any): string => {
      // Cast TranslationKey to string to satisfy i18next types
      const stringKey: string = key as string;
      // Force the return value to be string
      return originalT(stringKey, options) as string;
    },
    [originalT]
  );

  return {
    currentLanguage,
    supportedLanguages: filteredLanguages,
    setLanguage,
    t: typedT,
    getCvPdfPath,
  };
};
