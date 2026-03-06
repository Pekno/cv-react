import { TranslationKey } from "@app-types/translations.types";
import { SectionProps } from "@app-types/profile-data.types";

export interface HobbyItem {
  id: string;
  image: string;
  icon: string; // Material Symbols Outlined icon name e.g. "travel_explore"
  subtitle: string; // Location or category label shown on card (e.g. "KYOTO, JAPAN")
  colSpan?: 1 | 2; // How many columns this card spans (default: 1)
  rowSpan?: 1 | 2; // How many rows this card spans (default: 1)
}

export interface HobbiesData {
  items: HobbyItem[];
}

export interface HobbiesProps extends SectionProps<HobbiesData> { }

// Define translations for this section
export interface HobbyTranslations {
  title: string;
  desc: string;
}

export interface HobbiesTranslations {
  subtitle: string;
  items: {
    [hobbyId: string]: HobbyTranslations;
  };
}

// Helper function for hobby translation keys
export function hobbyKey(
  id: string,
  property: keyof HobbyTranslations
): TranslationKey {
  return `sections.hobbies.items.${id}.${property}` as TranslationKey;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    hobbies: HobbiesData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    hobbies: HobbiesTranslations;
  }
}
