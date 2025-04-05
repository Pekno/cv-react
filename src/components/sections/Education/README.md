# Education Section

This section displays your educational background and language proficiency in a visually organized layout.

## Component Structure

```
src/components/sections/Education/
├── Education.tsx           # Main component
├── Education.module.css    # Styles
├── Education.types.ts      # Type definitions
└── README.md               # This file
```

## Features

- Timeline display of educational history
- Progress bar visualization of language proficiency levels
- Responsive layout that adapts to different screen sizes
- Visual icons for different education stages

## Data Structure

The `Education` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "education",
  data: {
    history: [
      {
        year: string;        // Year of completion (e.g., "2018")
        icon: string;        // Icon name from @tabler/icons-react
      }
    ],
    languages: [
      {
        id: string;          // Language ID matching translation key (e.g., "english")
        value: number;       // Proficiency level (0-100)
      }
    ]
  }
}
```

## Translation Requirements

The `Education` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  education: {
    studies: {
      title: string;            // Section title for education
      history: [
        {
          name: string;         // Degree/education name
          location: string;     // Institution and location
        }
      ]
    },
    languages: {
      title: string;            // Section title for languages
      list: {
        [languageId: string]: {
          type: string;         // Language name
          mastery: string;      // Proficiency description (e.g., "Fluent")
        }
      }
    }
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
{
  sectionName: "education",
  data: {
    history: [
      {
        year: "2018",
        icon: "IconSchool",
      },
      {
        year: "2016",
        icon: "IconSchool",
      },
      {
        year: "2013",
        icon: "IconSchool",
      },
      {
        year: "2011",
        icon: "IconSchool",
      }
    ],
    languages: [
      {
        id: "french",
        value: 100,
      },
      {
        id: "english",
        value: 95,
      },
      {
        id: "spanish",
        value: 20,
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
education: {
  studies: {
    title: "Studies",
    history: [
      {
        name: "Master's in Computer Science",
        location: "University of Example (City)",
      },
      {
        name: "Bachelor's in Computer Science",
        location: "University of Example (City)",
      },
      {
        name: "Associate's Degree in IT",
        location: "Community College (City)",
      },
      {
        name: "High School Diploma",
        location: "Example High School (City)",
      }
    ]
  },
  languages: {
    title: "Languages",
    list: {
      french: {
        type: "French",
        mastery: "Native Language",
      },
      english: {
        type: "English",
        mastery: "Fluent (TOEIC: 975/990)",
      },
      spanish: {
        type: "Spanish",
        mastery: "Basic",
      }
    }
  }
}
```

### Translation Example (fr.ts)

```typescript
education: {
  studies: {
    title: "Études",
    history: [
      {
        name: "Master en Informatique",
        location: "Université d'Exemple (Ville)",
      },
      {
        name: "Licence en Informatique",
        location: "Université d'Exemple (Ville)",
      },
      {
        name: "DUT Informatique",
        location: "IUT (Ville)",
      },
      {
        name: "Baccalauréat Scientifique",
        location: "Lycée Exemple (Ville)",
      }
    ]
  },
  languages: {
    title: "Langues",
    list: {
      french: {
        type: "Français",
        mastery: "Langue maternelle",
      },
      english: {
        type: "Anglais",
        mastery: "Courant (TOEIC: 975/990)",
      },
      spanish: {
        type: "Espagnol",
        mastery: "Notions",
      }
    }
  }
}
```

## Component Usage

The `Education` component is automatically registered using the `registerSection` decorator:

```typescript
export default registerSection<EducationData>({ type: 'education' })(Education);
```

## Implementation Details

### Timeline Generation

The component generates a timeline visualization by mapping through the `history` array and corresponding translation entries. Each entry is displayed with:

- Year of completion
- Appropriate icon
- Degree/education name
- Institution and location

The timeline is laid out vertically with connecting lines between entries.

### Language Proficiency Display

Language proficiency is visualized using progress bars:

- Each language has its own row
- The progress bar width corresponds to the `value` percentage
- The language name and mastery level are displayed alongside the bar

## Styling

The component uses CSS modules for styling. The main styles are defined in `Education.module.css`. Key styling features include:

- Timeline connecting lines
- Progress bar animations
- Responsive grid layout

## Accessibility Considerations

- Progress bars include `aria-valuenow` and `aria-valuemax` attributes
- Icons have appropriate aria-labels
- Education timeline maintains proper reading order

## Notes for Implementation

1. The component uses icons from `@tabler/icons-react`. Make sure the icon names in your data match actual icons from this library.

2. The order of entries in the `history` array should match the order of entries in the translation `history` array.

3. For best visual appearance, language proficiency values should be between 0 and 100, with 100 representing full proficiency.

4. Colors can be specified using Mantine theme values (e.g., `brand.6`) or standard CSS color values.