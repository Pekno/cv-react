import { useCallback, useMemo } from "react";
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

/**
 * Custom hook for language management with standard React hooks
 * 
 * @returns Object with language functionality
 */
export const useLanguage = (): UseLanguageReturn => {
  // Use the standard i18n hook
  const { t: originalT, i18n } = useTranslation();
  const { data } = useProfileData();

  // Use i18n.language directly
  const currentLanguage = i18n.language;
  
  // Memoize the supported languages list
  const supportedLanguages = useMemo(() => {
    const allLangs = i18n.options.supportedLngs || [];
    
    // Filter out special values like 'cimode' and development languages
    return allLangs.filter(
      (lang) => lang !== "cimode" && lang !== "dev" && Boolean(lang)
    );
  }, [i18n.options.supportedLngs]);

  // Get CV PDF path based on current language
  const getCvPdfPath = useCallback((): string => {
    // Use optional chaining and nullish coalescing for safety
    return data.meta.pdfResume[currentLanguage] ?? "";
  }, [currentLanguage, data.meta.pdfResume]);

  // Set a specific language
  const setLanguage = useCallback(
    (lang: string): void => {
      // Only change language if it's supported and different from current
      if (
        lang !== currentLanguage && 
        supportedLanguages.includes(lang)
      ) {
        i18n.changeLanguage(lang);
      }
    },
    [i18n, currentLanguage, supportedLanguages]
  );

  // Type-safe translation function
  const t = useCallback(
    (key: TranslationKey, options?: any): string => {
      return originalT(key as string, options) as string;
    },
    [originalT]
  );

  return {
    currentLanguage,
    supportedLanguages,
    setLanguage,
    t,
    getCvPdfPath,
  };
};