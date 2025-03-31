// ProjectStats.types.ts
import { SectionProps } from "../../../types/profile-data.types";
import { TranslationKey } from "../../../types/translations.types";

export interface Stat {
  icon: string;
  value: number | string;
  unit?: string;
  label: string;
}

export interface ProjectStatsData {
  stats: Stat[];
}

export interface ProjectStatsProps extends SectionProps<ProjectStatsData> {}

// Helper function to get translation key for stat labels
export function statKey(label: string): TranslationKey {
  return `sections.projectStats.labels.${label}` as TranslationKey;
}

// Extend the registry (this is important!)
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    projectStats: ProjectStatsData;
  }
}

// Extend translations
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    projectStats: {
      summary: string;
      labels: Record<string, string>;
    };
  }
}
