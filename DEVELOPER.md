# Developer Documentation

This document provides technical details about the CV React project's architecture, implementation details, and development guidelines. It's intended for developers who want to understand, modify, or extend the codebase.

## Project Structure

```
src/
├── assets/           # Static assets (images, etc.)
├── components/       # React components
│   ├── common/       # Shared components
│   └── sections/     # CV section components
│       ├── About/
│       ├── Education/
│       ├── Experiences/
│       ├── Hobbies/
│       ├── Projects/
│       └── Skills/
├── data/             # Application data
├── decorators/       # TypeScript decorators
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization
│   └── locales/      # Translation files
├── theme/            # Theme configuration
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Architecture Overview

### Core Concepts

1. **Section-Based Architecture**: The CV is divided into distinct sections (About, Skills, Education, etc.), each implemented as a standalone component with its own types, styles, and sub-components.

2. **Type Registry**: A centralized type system connects all components through TypeScript's declaration merging feature, ensuring type safety throughout the application.

3. **Decorator Pattern**: Used to register section components, allowing automatic discovery and rendering without manual imports.

4. **Build-Time Optimization**: A custom Vite plugin analyzes profile data and includes only used sections in the final bundle.

5. **Dynamic i18n**: Automatically loads all available translations using Vite's import.meta.glob feature.

6. **Hooks-Based State Management**: Custom hooks encapsulate business logic and provide a clean API for components.

### Type System

The project uses a sophisticated TypeScript type system to ensure type safety throughout the application:

```typescript
// In types/profile-data.types.ts
export interface SectionTypeRegistry {}

// In types/translations.types.ts
export interface SectionTranslationRegistryMap {}

// Translation key type
export type TranslationKey = string &
  (GlobalTranslationKeys | MenuTranslationKeys | SectionTranslationKeys);

// In Section.types.ts - Declaration merging
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    sectionName: SectionData;
  }
}
```

When adding new functionality, each section component extends the central type registry through declaration merging. This allows TypeScript to maintain type safety across the entire application without manual type imports.

### Section Registration System

Sections register themselves using the decorator pattern:

```typescript
// In a section component
export default createRegisteredSection<SectionProps>('sectionName',({ data, evenSection = false }) => {
```

This system:
1. Automatically registers components in a central registry
2. Handles type safety through generics
3. Enables dynamic rendering in the App component

### Component Composition

The project uses component composition to build complex UIs from simpler components:

1. **Section Wrapper**: A common `Section` component provides consistent styling and layout
2. **Sub-components**: Each section has its own specialized sub-components
3. **Composition over Inheritance**: Component behavior is extended through composition rather than inheritance

## Build Optimization System

### Vite Plugin for Section Analysis

The project includes a custom Vite plugin that optimizes the final bundle by analyzing which sections are actually used in your profile data:

```typescript
// Extract from vite.config.ts
function usedSectionsPlugin(): Plugin {
  // Store sections with proper typing from registry
  let usedSections: Array<keyof SectionTypeRegistry> = [];
  
  return {
    name: 'used-sections-plugin',
    enforce: 'pre' as const,
    
    buildStart() {
      // Analyze profile data to determine used sections
      // ...
      logger.info(`📦 Used sections detected in profile data: ${usedSections.join(', ')}`);
    },
    
    transform(code: string, id: string) {
      // Replace glob imports with specific sections
      // ...
    }
  };
}
```

### How It Works

1. **Analysis Phase**: During build, the plugin scans your profile data files to determine which sections are used
2. **Transformation Phase**: It replaces the wildcard imports in App.tsx with specific imports for only the sections you use
3. **Type Safety**: The entire process is type-safe, using your SectionTypeRegistry

### Benefits

- **Smaller Bundle Size**: Only the sections you actually use are included in the build
- **No Manual Configuration**: Just add or remove sections from your profile data
- **Type-Safe Detection**: The plugin understands your section registry
- **Logging**: Detailed logs show which sections are detected and included

## Internationalization System

### Directory Structure

```
src/i18n/
├── i18n.ts                # i18n initialization and configuration
└── locales/              # Translation files
    ├── en.ts             # English translations
    ├── fr.ts             # French translations
    └── *.ts              # Additional language files
```

### Key Features

- **Dynamic Language Loading**: Automatically loads all language files from the `locales` directory
- **Language Detection**: Detects user's browser language and applies it if supported
- **Language Switching**: Allows runtime language switching with persistent storage
- **Type Safety**: Strongly typed translation keys with IDE autocomplete support
- **Extensible**: Easy to add new languages and translation keys
- **Section-Based**: Translation keys are organized by section for maintainability

### Implementation Details

The i18n system uses Vite's `import.meta.glob` feature to dynamically import all translation files:

```typescript
// Dynamic import of all locale files
const localeModules = import.meta.glob('./locales/*.{ts,js,json}', {
  eager: true,
});

// Extract language code and build resources
const resources: Record<string, { translation: any }> = {};

Object.entries(localeModules).forEach(([path, module]) => {
  const match = path.match(/\.\/locales\/(.+)\.(ts|js|json)$/);
  
  if (match && match[1]) {
    const langCode = match[1];
    resources[langCode] = {
      translation: (module as any).default || module,
    };
  }
});

// Derive supported languages directly from the resources object
const supportedLngs = Object.keys(resources);
```

This approach automatically:
- Detects all language files in the locales directory
- Extracts language codes from filenames
- Builds a resources object for i18next
- Creates a list of supported languages

## Adding a New Section

Adding a new section component to the CV involves several steps:

### 1. Create the Section Component

Create a new directory under `src/components/sections/` with your section name:

```
src/components/sections/NewSection/
├── NewSection.tsx           # Main component
├── NewSection.module.css    # Styles
└── NewSection.types.ts      # Type definitions
```

### 2. Define the Types

In `NewSection.types.ts`:

```typescript
import { SectionProps } from "../../../types/profile-data.types";

// Define the data structure for your section
export interface NewSectionData {
  // Add your properties here
  someProperty: string;
  anotherProperty: number;
}

export interface NewSectionProps extends SectionProps<NewSectionData> {}

// Define translations for this section
export interface NewSectionTranslations {
  title: string;
  subtitle: string;
}

// Extend the section type registry (IMPORTANT!)
declare module "../../../types/profile-data.types" {
  interface SectionTypeRegistry {
    newSection: NewSectionData;
  }
}

// Extend the translation registry map (IMPORTANT!)
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    newSection: NewSectionTranslations;
  }
}
```

### 3. Implement the Component

In `NewSection.tsx`:

```typescript
import React from 'react';
import { Text, Title } from '@mantine/core';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import { NewSectionProps } from './NewSection.types';
import { createRegisteredSection } from '@decorators/section.decorator';
import classes from './NewSection.module.css';

// Define the component as a plain function first
const NewSectionComponent = ({ data, meta, evenSection = false }: NewSectionProps) => {
  const { t } = useLanguage();

  return (
    <Section id="newSection" title={t('menu.newSection')} evenSection={evenSection}>
      <Title order={2}>{t('sections.newSection.title')}</Title>
      <Text>{t('sections.newSection.subtitle')}</Text>
      
      {/* Your section content here */}
      <div>{data.someProperty}</div>
      <div>{data.anotherProperty}</div>
    </Section>
  );
};

// Register the section with the decorator
export default createRegisteredSection<NewSectionProps>('newSection', NewSectionComponent);
```

### 4. Update Profile Data

Add your new section to the profile data in `src/data/profile-data.ts`:

```typescript
sections: [
  // ... existing sections
  {
    sectionName: "newSection",
    data: {
      someProperty: "Value here",
      anotherProperty: 42
    },
  },
]
```

### 5. Add Translations

Add translations for your new section in all language files:

```typescript
// In en.ts
menu: {
  // ... existing menu items
  newSection: "New Section",
},
sections: {
  // ... existing sections
  newSection: {
    title: "Section Title",
    subtitle: "Section subtitle or description",
  },
}
```

## Build Process

The build process has been optimized to automatically include only the sections you use in your profile data:

1. **Development**: During development, all sections are loaded for easy testing and development
2. **Production Build**: During the production build:
   - The Vite plugin analyzes your profile data to find used sections
   - It replaces generic imports with specific imports for only the used sections
   - The final bundle only includes the code needed for your specific CV

### Demo Mode

The project supports a special "demo" mode for using example data:

```bash
# Run development server with example data
npm run dev -- --mode=demo

# Build with example data
npm run build -- --mode=demo
```

This is controlled by the `__USE_EXAMPLE_DATA__` feature flag set in the Vite config.

## Future Development Considerations

When extending the project, consider these best practices:

1. **Maintain Type Safety**: Always extend the type registries when adding new features
2. **Follow the Decorator Pattern**: Register new sections using the existing decorator pattern
3. **Keep Translations Consistent**: Add new translation keys to all language files
4. **Component Isolation**: Each section should be independent and reusable
5. **Responsive Design**: Ensure all new components work well on all screen sizes
6. **Optimize Font Loading**: Use proper Google Fonts loading practices
7. **Follow ESLint Rules**: Keep code consistent with the established patterns

## Developer Notes

1. Always use the `t` function from `useLanguage` hook rather than importing i18next directly
2. Maintain consistent key naming across the application
3. Group translations by feature or section for better organization
4. Use TypeScript's type system to catch missing translations early
5. The build optimization works automatically - no need to manually include or exclude sections