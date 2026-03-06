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

- Timeline display of educational history with descriptions
- Segmented bar visualization of language proficiency levels
- CEFR info tooltip for language proficiency context
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
          description: string;  // Additional description of the degree/program
        }
      ]
    },
    languages: {
      title: string;            // Section title for languages
      cefrInfo: string;         // Tooltip text explaining the CEFR proficiency scale
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
        id: "english",
        value: 100,
      },
      {
        id: "french",
        value: 85,
      },
      {
        id: "spanish",
        value: 40,
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
        name: "Master of Science in Computer Science",
        location: "Stanford University",
        description: "Specialized in Distributed Systems and Cloud Architecture. Graduated with honors.",
      },
      {
        name: "Bachelor of Science in Computer Science",
        location: "University of California",
        description: "Core focus on Algorithms, Data Structures, and Software Engineering principles.",
      },
      {
        name: "Associate Degree in Computer Systems",
        location: "De Anza College",
        description: "Fundamental IT operations, networking basics, and hardware troubleshooting.",
      },
      {
        name: "High School Diploma",
        location: "Palo Alto High School",
        description: "",
      }
    ]
  },
  languages: {
    title: "Languages",
    cefrInfo: "Proficiency levels are based on the Common European Framework of Reference for Languages (CEFR).",
    list: {
      english: {
        type: "English",
        mastery: "Native Speaker",
      },
      french: {
        type: "French",
        mastery: "Fluent / Professional",
      },
      spanish: {
        type: "Spanish",
        mastery: "Basic / Elementary",
      }
    }
  }
}
```

## Component Usage

The `Education` component is automatically registered using the `registerSection` decorator:

```typescript
export default createRegisteredSection<EducationProps>('education', EducationSectionComponent);
```

## Implementation Details

### Timeline Generation

The component generates a timeline visualization by mapping through the `history` array and corresponding translation entries. Each entry is displayed with:

- Year of completion
- Appropriate icon
- Degree/education name
- Institution and location
- Description of the program

The timeline is laid out vertically with connecting lines between entries.

### Language Proficiency Display

Language proficiency is visualized using segmented bars (10 segments per language):

- Each language has its own row
- Segments are filled, partially filled, or empty based on the `value` percentage
- The language name and mastery level are displayed alongside the bar
- A CEFR info icon provides context about the proficiency scale

## Styling

The component uses CSS modules for styling. The main styles are defined in `Education.module.css`. Key styling features include:

- Timeline connecting lines
- Segmented proficiency bar animations
- Responsive layout

## Notes for Implementation

1. The component uses icons from `@tabler/icons-react`. Make sure the icon names in your data match actual icons from this library.

2. The order of entries in the `history` array should match the order of entries in the translation `history` array.

3. For best visual appearance, language proficiency values should be between 0 and 100, with 100 representing full proficiency.
