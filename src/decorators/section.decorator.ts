import { ComponentType } from "react";
import {
  SectionDataTypes,
  SectionProps,
  SectionTypeRegistry,
} from "../types/profile-data.types";
import { TranslationKey } from "types/translations.types";

// Registry to store section components
interface SectionRegistryItem<T extends SectionDataTypes = any> {
  component: ComponentType<SectionProps<T> & Record<string, any>>;
}

// Global registry of all available section types
export const sectionRegistry: Record<string, SectionRegistryItem> = {};

// Function-based version (use this with function components)
export function registerSection<T extends SectionDataTypes>(options: {
  type: keyof SectionTypeRegistry;
}) {
  return function <
    C extends ComponentType<SectionProps<T> & Record<string, any>>
  >(component: C): C {
    // Register the component in the registry
    sectionRegistry[options.type] = {
      component,
    };
    return component;
  };
}

// Helper function to get the i18n key from a section type
export function getI18nKey(type: string): TranslationKey {
  return `menu.${type}` as TranslationKey;
}

// Helper to get section order from profile data
export function getSectionOrder(data: any): string[] {
  return data.sections.map((section: any) => section.sectionName);
}
