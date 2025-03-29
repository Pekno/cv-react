import { SectionTypeRegistry } from "./profile-data.types";

// Define array indices we want to support
type ArrayIndex = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

// Global translations
export interface GlobalTranslations {
  units: {
    months: string;
    years: string;
  };
  thanks: string;
  autoplay: {
    active: string;
    paused: string;
  };
}

// Menu translations - keys must match the registry
export type MenuTranslations = {
  [K in keyof SectionTypeRegistry]: string;
};

// Create a mapping of section translations
export type SectionTranslations = {
  [K in keyof SectionTypeRegistry]: SectionTranslationRegistryMap[K];
};

// This registry will be extended by each section
export interface SectionTranslationRegistryMap {}

// Complete translations structure
export interface Translations {
  global: GlobalTranslations;
  menu: MenuTranslations;
  sections: SectionTranslations;
}

// Type utility for creating the dot notation paths
type DotPrefix<T extends string, K extends string> = `${T}.${K}`;

// Create keys for global namespace
export type GlobalTranslationKeys =
  | "global.units.months"
  | "global.units.years"
  | "global.thanks"
  | "global.autoplay.active"
  | "global.autoplay.paused";

// Create keys for menu items based on registry
type MenuTranslationKeys = {
  [K in keyof MenuTranslations]: DotPrefix<"menu", K>;
}[keyof MenuTranslations];

// Enhanced recursive key generator that handles arrays with numeric indices
type SectionKeysHelper<T, P extends string> = T extends (infer A)[]
  ? `${P}.${ArrayIndex}` | SectionKeysHelper<A, `${P}.${ArrayIndex}`>
  : T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? SectionKeysHelper<T[K], `${P}.${K}`>
          : `${P}.${K}`
        : never;
    }[keyof T]
  : never;

type SectionTranslationKeys = {
  [K in keyof SectionTranslations]: SectionKeysHelper<
    SectionTranslations[K],
    `sections.${string & K}`
  >;
}[keyof SectionTranslations];

// Complete translation key type
export type TranslationKey = string &
  (GlobalTranslationKeys | MenuTranslationKeys | SectionTranslationKeys);
