import { SectionProps } from "../../../types/profile-data.types";

export interface AboutData {
  yearsOfExperience: number;
}

export interface AboutProps extends SectionProps<AboutData> {}

// Define translations for this section
export interface AboutTranslations {
  jobTitle: string;
  experienceText: string;
  summary: string;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    about: AboutData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    about: AboutTranslations;
  }
}
