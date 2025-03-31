import { useMemo } from 'react';
import { SectionTypeRegistry } from '../types/profile-data.types';
import { sectionRegistry } from '../decorators/section.decorator';
import { RegisteredSectionComponent } from '../types/section-component.types';

/**
 * Hook to access a section component by its type
 * Provides memoization to prevent unnecessary rerenders
 * 
 * @param type - The section type identifier
 * @returns The registered component for the specified section type
 * 
 * @example
 * const AboutSection = useSectionComponent('about');
 * return AboutSection ? <AboutSection data={data} meta={meta} /> : null;
 */
export function useSectionComponent<K extends keyof SectionTypeRegistry>(
  type: K
): RegisteredSectionComponent<K> | null {
  return useMemo(() => {
    const component = sectionRegistry[type]?.component as RegisteredSectionComponent<K>;
    return component || null;
  }, [type]);
}

export default useSectionComponent;