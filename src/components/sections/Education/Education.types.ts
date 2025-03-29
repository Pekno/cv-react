import { TranslationKey } from "types/translations.types";
import { SectionProps } from "../../../types/profile-data.types";

export interface EducationItem {
  year: string;
  icon: string;
}

export interface LanguageItem {
  id: string;
  value: number;
  color: string;
}

export interface EducationData {
  history: EducationItem[];
  languages: LanguageItem[];
}

export interface EducationProps extends SectionProps<EducationData> {}

// Define translations for this section
export interface EducationTranslations {
  studies: {
    title: string;
    history: EducationHistoryTranslations[];
  };
  languages: {
    title: string;
    list: {
      [language: string]: EducationLanguageTranslations;
    };
  };
}

export interface EducationHistoryTranslations {
  name: string;
  location: string;
}

export interface EducationLanguageTranslations {
  type: string;
  mastery: string;
}

// Helper function for history translation keys
export function historyKey(
  index: number,
  property: keyof EducationHistoryTranslations
): TranslationKey {
  return `sections.education.studies.history.${index}.${property}` as TranslationKey;
}

export function languageKey(
  id: string,
  property: keyof EducationLanguageTranslations
): TranslationKey {
  return `sections.education.languages.list.${id}.${property}` as TranslationKey;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    education: EducationData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    education: EducationTranslations;
  }
}
