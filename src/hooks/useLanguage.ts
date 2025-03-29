import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslationKey } from "../types/translations.types";
import { useProfileData } from "./useProfileData";

// Define the interface for our hook
interface UseLanguageReturn {
  currentLanguage: string;
  toggleLanguage: () => void;
  t: (key: TranslationKey, options?: any) => string;
  getCvPdfPath: () => string;
  isEnglish: boolean;
}

export const useLanguage = (): UseLanguageReturn => {
  // Use the standard hook
  const { t: originalT, i18n } = useTranslation();
  const { data } = useProfileData();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  // Update PDF path based on language
  const getCvPdfPath = useCallback((): string => {
    return data.meta.pdfResume[currentLanguage] ?? "";
  }, [currentLanguage]);

  // Toggle between FR and EN
  const toggleLanguage = useCallback((): void => {
    const newLanguage = currentLanguage === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  }, [currentLanguage, i18n]);

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

  // Update language state when i18n language changes
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  return {
    currentLanguage,
    toggleLanguage,
    t: typedT,
    getCvPdfPath,
    isEnglish: currentLanguage === "en",
  };
};
