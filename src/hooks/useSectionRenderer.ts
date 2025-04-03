import { useCallback } from "react";
import React from "react";
import { SectionProps, SectionTypeRegistry } from "../types/profile-data.types";
import useSectionComponent from "./useSectionComponent";

/**
 * Custom hook that provides both the component and optimized render functions
 * for a given section type
 * 
 * @param type - The section type identifier from SectionTypeRegistry
 * @returns Object containing the component and render functions
 */
export function useSectionRenderer<K extends keyof SectionTypeRegistry>(
  type: K
) {
  // Get the component for this section type
  const Component = useSectionComponent(type);

  // Use useCallback for renderSection function
  const renderSection = useCallback(
    (
      props: Omit<SectionProps<SectionTypeRegistry[K]>, "key"> & {
        itemKey?: string;
      }
    ) => {
      if (!Component) return null;

      // Extract itemKey (which isn't part of SectionProps)
      const { itemKey, ...sectionProps } = props;

      // Use createElement instead of JSX to avoid type issues
      return React.createElement(
        Component,
        { 
          ...sectionProps as SectionProps<SectionTypeRegistry[K]>, 
          key: itemKey 
        }
      );
    },
    [Component] // Only depend on Component reference
  );

  // Use useCallback for renderList function
  const renderList = useCallback(
    (
      items: Array<
        Omit<SectionProps<SectionTypeRegistry[K]>, "key"> & { id: string }
      >
    ) => {
      if (!Component) return [];

      return items.map((item) => {
        const { id, ...props } = item;

        // Use createElement instead of JSX
        return React.createElement(
          Component,
          {
            ...props as SectionProps<SectionTypeRegistry[K]>,
            key: id
          }
        );
      });
    },
    [Component] // Only depend on Component reference
  );

  return {
    component: Component,
    renderSection,
    renderList,
  };
}