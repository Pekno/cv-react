import React, { ComponentType } from "react";
import { SectionProps, SectionTypeRegistry } from "./profile-data.types";

/**
 * A type representing a registered section component
 * This provides better type inference when working with section components
 */
export type RegisteredSectionComponent<K extends keyof SectionTypeRegistry> =
  ComponentType<SectionProps<SectionTypeRegistry[K]>>;

/**
 * A mapped type that provides a type-safe registry of section components
 * Can be used for enhanced type checking when accessing components
 */
export type SectionComponentRegistry = {
  [K in keyof SectionTypeRegistry]: RegisteredSectionComponent<K>;
};

/**
 * A function that renders a section
 * Useful for when you want to pass section rendering functions around
 */
export type SectionRenderer<K extends keyof SectionTypeRegistry> = (
  props: SectionProps<SectionTypeRegistry[K]>
) => React.JSX.Element | null;

/**
 * Factory function type for creating section components with proper typing
 */
export type SectionComponentFactory<K extends keyof SectionTypeRegistry> = (
  renderFn: SectionRenderer<K>
) => RegisteredSectionComponent<K>;
