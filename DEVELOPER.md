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

4. **Dynamic i18n**: Automatically loads all available translations using Vite's import.meta.glob feature.

5. **Hooks-Based State Management**: Custom hooks encapsulate business logic and provide a clean API for components.

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
// In decorators/section.decorator.ts
export function registerSection<T extends SectionDataTypes>(options: {
  type: keyof SectionTypeRegistry;
}) {
  return function <C extends ComponentType<SectionProps<T> & Record<string, any>>>(
    component: C
  ): C {
    // Register the component in the registry
    sectionRegistry[options.type] = {
      component,
    };
    return component;
  };
}

// In a section component
export default registerSection<SectionData>({ type: 'sectionName' })(SectionComponent);
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

### Usage in Components

Components access translations through the `useLanguage` hook:

```typescript
import { useLanguage } from '../hooks/useLanguage';

const MyComponent: React.FC = () => {
  const { t, currentLanguage, toggleLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('sections.about.title')}</h1>
      <p>{t('sections.about.content')}</p>
      <button onClick={toggleLanguage}>
        Switch to {currentLanguage === 'en' ? 'French' : 'English'}
      </button>
    </div>
  );
};
```

### Adding a New Language

To add a new language:

1. Create a new file in the `locales` directory with the language code as the filename (e.g., `es.ts` for Spanish)
2. Copy the structure from an existing language file (e.g., `en.ts`)
3. Translate all content into the new language
4. The system will automatically detect and include the new language

Example for a new Spanish translation file (`es.ts`):

```typescript
import { Translations } from "../../types/translations.types";

const es: Translations = {
  global: {
    units: {
      months: "meses",
      years: "años",
    },
    // ... other translations
  },
  menu: {
    about: "Sobre mí",
    skills: "Habilidades",
    // ... other menu items
  },
  sections: {
    // ... section translations
  }
};

export default es;
```

### Adding New Translation Keys

When adding new translation keys:

1. Add the key to all language files to maintain consistency
2. Extend the appropriate type definition if adding a new section or major feature

For example, when adding a new section:

```typescript
// In YourNewSection.types.ts
export interface YourNewSectionTranslations {
  title: string;
  subtitle: string;
  // ... other translation keys
}

// Extend the translation registry map
declare module "../../../types/translations.types" {
  interface SectionTranslationRegistryMap {
    yourNewSection: YourNewSectionTranslations;
  }
}
```

### Testing Translations

It's recommended to test translations by:

1. Switching languages in the UI to verify all content appears correctly
2. Checking for missing translations using the browser console (i18next will warn about missing keys)
3. Verifying that all sections maintain proper layout in all languages (some languages may have longer text)

### Performance Considerations

- Translation files are loaded eagerly by default for immediate availability
- For larger applications with many languages, consider switching to lazy loading
- The language detector caches the selected language in localStorage to avoid detection on every page load

## Custom Hooks

The project uses several custom hooks to encapsulate logic:

### useLanguage

Provides internationalization functionality:

```typescript
interface UseLanguageReturn {
  currentLanguage: string;
  toggleLanguage: () => void;
  t: (key: TranslationKey, options?: any) => string;
  getCvPdfPath: () => string;
  isEnglish: boolean;
}
```

### useProfileData

Provides access to the CV data with translations:

```typescript
const { 
  data,
  currentLanguage,
  toggleLanguage,
  t,
  getLocalizedText,
  getCvPdfPath,
  getCalculatedExperiences,
  isEnglish
} = useProfileData();
```

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
import { TranslationKey } from "../../../types/translations.types";

// Define the data structure for your section
export interface NewSectionData {
  // Add your properties here
  someProperty: string;
  anotherProperty: number;
  examples: string[];  // Array-type properties
  mappedData: Record<string, string>;  // Object-like mapping
}

export interface NewSectionProps extends SectionProps<NewSectionData> {}

// Define translations for this section
export interface NewSectionTranslations {
  title: string;
  subtitle: string;
  // Support for arrays with numeric indices
  examples: {
    [index: number]: string;
  };
  // Support for object mappings with string keys
  mappedData: {
    [key: string]: string;
  };
}

// Helper function for accessing array item translations with type safety
export function exampleKey(index: number): TranslationKey {
  return `sections.newSection.examples.${index}` as TranslationKey;
}

// Helper function for accessing object mapping translations with type safety
export function mappedDataKey(key: string): TranslationKey {
  return `sections.newSection.mappedData.${key}` as TranslationKey;
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

The type system supports both array indices and object keys in translations:

1. **Array Indices**: For array-like data (e.g., `string[]`), the translation system generates keys like "examples.0", "examples.1", etc. Helper functions like `exampleKey(index)` provide type-safe access to these translations.

2. **Object Mappings**: For record-like data (e.g., `Record<string, string>`), the translation system supports keys like "mappedData.key1", "mappedData.key2", etc. Helper functions like `mappedDataKey(key)` ensure type safety.

Usage example in a component:

```typescript
const { t } = useLanguage();

// Access array item translation
const firstExample = t(exampleKey(0));

// Access object mapping translation
const specificData = t(mappedDataKey("specificKey"));
```

This approach maintains type safety while allowing flexible data structures in both the component data and translations.

### 3. Implement the Component

In `NewSection.tsx`:

```typescript
import React from 'react';
import { Text, Title } from '@mantine/core';
import { useLanguage } from '../../../hooks/useLanguage';
import Section from '../../common/Section/Section';
import { NewSectionProps, NewSectionData } from './NewSection.types';
import { registerSection } from '../../../decorators/section.decorator';
import classes from './NewSection.module.css';

const NewSection: React.FC<NewSectionProps> = ({ data, evenSection = true }) => {
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

// IMPORTANT: Register the section using the decorator
export default registerSection<NewSectionData>({ type: 'newSection' })(NewSection);
```

Note: After creating the component structure, end users will need to add translations in the language files and populate the section data in profile-data.ts. Refer them to the main README for instructions on customizing content.

## Future Development Considerations

When extending the project, consider these best practices:

1. **Maintain Type Safety**: Always extend the type registries when adding new features
2. **Follow the Decorator Pattern**: Register new sections using the existing decorator pattern
3. **Keep Translations Consistent**: Add new translation keys to all language files
4. **Component Isolation**: Each section should be independent and reusable
5. **Responsive Design**: Ensure all new components work well on all screen sizes

### Developer Notes

1. Always use the `t` function from `useLanguage` hook rather than importing i18next directly
2. Maintain consistent key naming across the application
3. Group translations by feature or section for better organization
4. Use TypeScript's type system to catch missing translations early