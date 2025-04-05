import { TranslationKey } from "@/types/translations.types";
import { SectionProps } from "../../../types/profile-data.types";

export interface TravelItem {
  id: string;
  image: string;
}

export interface HobbiesData {
  travels: TravelItem[];
}

export interface HobbiesProps extends SectionProps<HobbiesData> {}

// Define translations for this section
export interface HobbiesTravelTranslations {
  title: string;
  desc: string;
}

export interface HobbiesTranslations {
  intro: string;
  travels: {
    [destination: string]: HobbiesTravelTranslations;
  };
}

// Helper function for experience translation keys
export function travelKey(
  id: string,
  property: keyof HobbiesTravelTranslations
): TranslationKey {
  return `sections.hobbies.travels.${id}.${property}` as TranslationKey;
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
