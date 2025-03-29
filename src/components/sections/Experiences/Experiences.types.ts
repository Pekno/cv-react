import { SectionProps } from "../../../types/profile-data.types";
import { TranslationKey } from "../../../types/translations.types";

export interface ExperienceItem {
  id: string;
  startDate: Date;
  endDate?: Date;
  companyName: string;
  companyLogo: string;
  technologies: string[][];
  contexts: number[];
  isCurrent?: boolean;
  // We'll remove jobTitleKey and contexts since they'll be accessed by index
}

export interface ExperiencesData {
  experiences: ExperienceItem[];
}

export interface ExperiencesProps extends SectionProps<ExperiencesData> {}

// Define translations for this section with array-based structure
export interface ExperiencesCompanyTranslations {
  jobTitle: string;
  contexts: string[];
}

export interface ExperiencesTranslations {
  companies: {
    [experience: string]: ExperiencesCompanyTranslations;
  };
}

// Helper function for experience translation keys
export function experienceKey(
  id: string,
  property: keyof ExperiencesCompanyTranslations
): TranslationKey {
  return `sections.experiences.companies.${id}.${property}` as TranslationKey;
}

// Helper function for context translation keys
export function contextKey(id: string, contextIndex: number): TranslationKey {
  return `sections.experiences.companies.${id}.contexts.${contextIndex}` as TranslationKey;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    experiences: ExperiencesData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    experiences: ExperiencesTranslations;
  }
}
