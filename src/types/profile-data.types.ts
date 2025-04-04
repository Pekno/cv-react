import { TranslationKey } from "./translations.types";

// Create the empty registry that will be extended by each section
export interface SectionTypeRegistry {}

// The dynamic union type - no need to edit this when adding new sections
export type SectionDataTypes = SectionTypeRegistry[keyof SectionTypeRegistry];

// Generic section props interface
export interface SectionProps<T extends SectionDataTypes> {
  meta: MetaData;
  data: T;
  evenSection?: boolean;
}

// Improved type-safe Section interface
export interface Section<K extends keyof SectionTypeRegistry> {
  sectionName: K;
  data: SectionTypeRegistry[K];
}

// Updated ProfileData interface that leverages the improved Section type
export interface ProfileData {
  meta: MetaData;
  sections: Section<keyof SectionTypeRegistry>[];
}

export interface MetaData {
  name: string;
  profilePictures: string[]; // Array of profile pictures (first one is the default)
  pdfResume: {
    [lang: string]: string;
  };
  socials: SocialLink[];
}

// Define a union of supported social platforms for strict type safety
export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube"
  | "dribbble"
  | "behance"
  | "medium"
  | "stackoverflow"
  | "website"; // for personal websites

export interface SocialLink {
  type: SocialPlatform;
  url: string;
}

// Updated for backward compatibility if needed
// In a full implementation, this would be removed or deprecated
export interface LocalizedText {
  i18nKey: TranslationKey;
}

// Type for referencing a section's translation key directly
export type TranslationKeyRef = {
  section: keyof SectionTypeRegistry;
  key: string;
};
