import { TranslationKey } from "@app-types/translations.types";
import { SectionProps } from "@app-types/profile-data.types";
import { TechItem } from "@components/common/TechPill/TechPill";

export type { TechItem };

export interface MainSkill {
  id: string;
  icon: string;
  badges: string[];
}

export interface TechCategory {
  id: string;
  items: TechItem[];
}

export interface Competency {
  id: string;
}

export interface SkillsData {
  mainSkills: MainSkill[];
  categories: TechCategory[];
  competencies: Competency[];
}

export interface SkillsProps extends SectionProps<SkillsData> { }

// Define translations for this section
export interface SkillsFunctionalTranslations {
  libraries: string;
  qualities: {
    [projectKey: string]: SkillsFunctionalQualityTranslations;
  };
  keyCompetencies: {
    title: string;
    competencies: {
      [competency: string]: SkillsCompetencyTranslation;
    };
  };
}

export interface SkillsCompetencyTranslation {
  title: string;
  desc: string;
}

export interface SkillsFunctionalQualityTranslations {
  title: string;
  desc: string;
  chips: SkillsFunctionalQualityChipTranslations;
}

export interface SkillsFunctionalQualityChipTranslations {
  [chip: string]: string;
}

export interface SkillsTechnicalTranslations {
  categories: SkillsTechnicalCategoryTranslations;
}

export interface SkillsTechnicalCategoryTranslations {
  [category: string]: string;
}

export interface SkillsTranslations {
  functional: SkillsFunctionalTranslations;
  technical: SkillsTechnicalTranslations;
}

// Helper function for experience translation keys
export function qualityKey(
  id: string,
  property: keyof SkillsFunctionalQualityTranslations
): TranslationKey {
  return `sections.skills.functional.qualities.${id}.${property}` as TranslationKey;
}

export function chipKey(
  id: string,
  chip: keyof SkillsFunctionalQualityChipTranslations
): TranslationKey {
  return `sections.skills.functional.qualities.${id}.chips.${chip}` as TranslationKey;
}

export function categoryKey(id: string): TranslationKey {
  return `sections.skills.technical.categories.${id}` as TranslationKey;
}

export function competencyTitleKey(id: string): TranslationKey {
  return `sections.skills.functional.keyCompetencies.competencies.${id}.title` as TranslationKey;
}

export function competencyDescKey(id: string): TranslationKey {
  return `sections.skills.functional.keyCompetencies.competencies.${id}.desc` as TranslationKey;
}

// Extend the section type registry
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    skills: SkillsData;
  }
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    skills: SkillsTranslations;
  }
}
