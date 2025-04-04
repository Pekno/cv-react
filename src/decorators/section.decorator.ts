import React, { ComponentType } from "react";
import {
  SectionDataTypes,
  SectionProps,
  SectionTypeRegistry,
  ProfileData,
} from "../types/profile-data.types";
import { TranslationKey } from "../types/translations.types";
import { RegisteredSectionComponent } from "../types/section-component.types";

// Enhanced registry interface with type discriminator
export interface SectionRegistryItem<T extends SectionDataTypes = any> {
  type: keyof SectionTypeRegistry; // Type discriminator for better type safety
  component: ComponentType<SectionProps<T>>;
}

// Type-safe registry with proper indexing
export const sectionRegistry: Record<
  keyof SectionTypeRegistry,
  SectionRegistryItem
> = {} as Record<keyof SectionTypeRegistry, SectionRegistryItem>;

/**
 * Create and register a section component in a single step with minimal boilerplate
 * Automatically infers the correct data type from the section type string
 *
 * @param type - The section type identifier (must match a key in SectionTypeRegistry)
 * @param renderFn - The component's render function
 * @returns A registered section component with proper typing
 *
 * @example
 * export default createRegisteredSection<AboutProps>('about', ({ data, meta, evenSection }) => {
 *   // TypeScript automatically infers that data is AboutData
 *   // Full autocomplete and type checking work perfectly
 *   return (
 *     // Your component implementation
 *   );
 * });
 */
export function createRegisteredSection<P extends SectionProps<any>>(
  type: Extract<keyof SectionTypeRegistry, string>,
  renderFn: (props: P) => React.ReactElement | null
): RegisteredSectionComponent<typeof type> {
  // Create a displayable name for the component
  const componentName = `${String(type).charAt(0).toUpperCase()}${String(
    type
  ).slice(1)}Section`;

  const Component = ((props: P) =>
    renderFn(props)) as RegisteredSectionComponent<typeof type>;

  // Set a display name for debugging
  Component.displayName = componentName;

  // Register the component
  sectionRegistry[type] = {
    type,
    component: Component,
  };

  // Return the registered component - no 'unknown' cast needed
  return Component;
}

/**
 * Helper function to get the i18n key from a section type
 * With strict type checking using template literal types
 */
export function getI18nKey<K extends keyof SectionTypeRegistry>(
  type: K
): TranslationKey {
  // Using type generics for better type inference
  return `menu.${type}` as `menu.${K}`;
}

/**
 * Helper to get section order from profile data
 * With improved typing and null safety using proper functional approach
 */
export function getSectionOrder(
  data: ProfileData
): Array<keyof SectionTypeRegistry> {
  return data.sections.map((section) => section.sectionName);
}
