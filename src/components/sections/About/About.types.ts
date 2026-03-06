import { SectionProps } from "@app-types/profile-data.types";

export interface AboutData {
  yearsOfExperience: number;
  stackFocus?: string;
  location?: string;
}

export interface AboutProps extends SectionProps<AboutData> {}

// Define translations for this section
export interface AboutTranslations {
  jobTitle: string;
  jobTitleHighlight: string;
  experienceYears: string;
  experienceLabel: string;
  summary: string;
  downloadResume: string;
  stackFocusLabel: string;
  locationLabel: string;
  availabilityLabel: string;
  openForCollaboration: string;
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
