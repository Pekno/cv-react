import React, { useMemo, createElement } from "react";
import { sectionRegistry } from "../decorators/section.decorator";
import { SectionProps, SectionTypeRegistry } from "../types/profile-data.types";
import { RegisteredSectionComponent } from "../types/section-component.types";

/**
 * Custom hook that returns a section component by its type
 * with proper typing and memoization
 */
export function useSectionComponent<K extends keyof SectionTypeRegistry>(
  type: K
): RegisteredSectionComponent<K> | null {
  return useMemo(
    () =>
      (sectionRegistry[type]?.component as RegisteredSectionComponent<K>) ||
      null,
    [type]
  );
}

/**
 * Custom hook that provides both the component and a render function
 * for a given section type
 */
export function useSectionRenderer<K extends keyof SectionTypeRegistry>(
  type: K
) {
  const Component = useSectionComponent(type);

  const renderSection = useMemo(() => {
    if (!Component) return () => null;

    return (
      props: Omit<SectionProps<SectionTypeRegistry[K]>, "key"> & {
        itemKey?: string;
      }
    ) => {
      // Extract itemKey (which isn't part of SectionProps)
      const { itemKey, ...sectionProps } = props;

      // Use createElement to specify key separately from component props
      return createElement(
        Component as React.ComponentType<SectionProps<SectionTypeRegistry[K]>>,
        { ...(sectionProps as any), key: itemKey }
      );
    };
  }, [Component]);

  const renderList = useMemo(() => {
    if (!Component) return () => [];

    return (
      items: Array<
        Omit<SectionProps<SectionTypeRegistry[K]>, "key"> & { id: string }
      >
    ): React.ReactNode[] => {
      return items.map((item) => {
        const { id, ...props } = item;

        // Use createElement to handle key separately
        return createElement(
          // Fixed: Use ComponentType instead of direct Component reference as a type
          Component as React.ComponentType<
            SectionProps<SectionTypeRegistry[K]>
          >,
          { ...(props as any), key: id }
        );
      });
    };
  }, [Component]);

  return {
    component: Component,
    renderSection,
    renderList,
  };
}
