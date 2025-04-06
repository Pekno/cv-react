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

// Theme configuration
export interface ThemeConfig {
  /**
   * Main brand color (hex format). This will be used to generate the full color palette.
   * The value provided here will be shade 6 in the brand palette.
   */
  primaryColor: string;
  
  /**
   * Optional accent color (hex format).
   * If not provided, it will be generated from the primary color.
   */
  accentColor?: string;
}

// Updated ProfileData interface that leverages the improved Section type
export interface ProfileData {
  meta: MetaData;
  /**
   * Theme configuration for the application.
   * Defines brand colors and other theme settings.
   */
  theme?: ThemeConfig;
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