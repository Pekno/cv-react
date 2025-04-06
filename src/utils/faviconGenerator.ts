// src/utils/faviconGenerator.ts
import { getLighterColor, getPrimaryColor } from "./colorUtils";

/**
 * Extracts initials from a person's name (up to 2 characters)
 * @param name Full name
 * @returns Initials (1-2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return "CV";

  // Split name by spaces and extract first letter of each part
  const parts = name.split(/\s+/).filter((part) => part.length > 0);

  if (parts.length === 0) return "CV";
  if (parts.length === 1 && parts[0]) return parts[0].charAt(0).toUpperCase();

  // Get first initial and last initial - using optional chaining and providing defaults
  const firstInitial = parts[0]?.charAt(0)?.toUpperCase() || "C";
  const lastInitial = parts[parts.length - 1]?.charAt(0)?.toUpperCase() || "V";

  return `${firstInitial}${lastInitial}`;
}

/**
 * Processes an SVG template string, replacing placeholders with actual values
 * @param template The SVG template with placeholders
 * @param values Object containing values to replace placeholders
 * @returns Processed SVG string
 */
export function processTemplate(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  // Replace each placeholder with its corresponding value
  for (const [key, value] of Object.entries(values)) {
    const placeholder = "${" + key + "}";
    result = result.replaceAll(placeholder, value);
  }

  return result;
}

// Re-exporting these functions so they're available from faviconGenerator
// This helps maintain backward compatibility with existing code
export { getLighterColor, getPrimaryColor };
