import { TranslationKey } from "types/translations.types";
import { SectionProps } from "../../../types/profile-data.types";

export interface ProjectItem {
  id: string;
  image: string;
  link?: string;
  linkTextKey?: keyof ProjectActionsTranslations;
}

export interface ProjectsData {
  projects: ProjectItem[];
}

export interface ProjectsProps extends SectionProps<ProjectsData> {}

// Define translations for this section
export interface ProjectsTranslations {
  intro: string;
  items: ProjectItemsTranslations;
  actions: ProjectActionsTranslations;
}

export interface ProjectActionsTranslations {
  tryIt: string;
  testIt: string;
  sourceCodeHere: string;
}

export interface ProjectItemsTranslations {
  [projectKey: string]: ProjectItemTranslations;
}

export interface ProjectItemTranslations {
  title: string;
  desc: string;
}

// Helper function for experience translation keys
export function itemKey(
  id: string,
  property: keyof ProjectItemTranslations
): TranslationKey {
  return `sections.projects.items.${id}.${property}` as TranslationKey;
}

// Helper function for experience translation keys
export function actionKey(
  action: keyof ProjectActionsTranslations
): TranslationKey {
  return `sections.projects.actions.${action}` as TranslationKey;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    projects: ProjectsData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    projects: ProjectsTranslations;
  }
}
