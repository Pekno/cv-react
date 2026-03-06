# Experiences Section

This section displays your professional work experiences in an accordion format, showcasing your career progression, job responsibilities, and technical skills used in each role.

## Component Structure

```
src/components/sections/Experiences/
├── Experiences.tsx           # Main component
├── Experiences.module.css    # Styles
├── Experiences.types.ts      # Type definitions
└── README.md                 # This file
```

## Features

- Accordion-based display of work experiences
- Company logos and job titles
- Duration calculation for each position
- Context/responsibility bullets for each role
- Technologies displayed as TechPill components (with icons)
- Current position highlighting
- Deep-linking support (e.g. `#work-CompanyA`)
- Responsive layout

## Data Structure

The `Experiences` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "experiences",
  data: {
    experiences: [
      {
        id: string;                    // Company ID matching translation key
        startDate: Date;               // Start date of employment
        endDate?: Date;                // End date (omit for current position)
        companyName: string;           // Company name
        companyLogo: string;           // Path to company logo
        contexts: number[];            // Array of context indices (matching translation keys)
        technologies: TechItem[][];    // Array of TechItem arrays for each context
        isCurrent?: boolean;           // Flag for current position
      }
    ]
  }
}
```

### TechItem

Technologies are now represented as `TechItem` objects (from `@components/common/TechPill/TechPill`):

```typescript
interface TechItem {
  name: string;   // Display name (e.g. "React")
  icon: string;   // Simple Icons slug (e.g. "react")
}
```

## Translation Requirements

The `Experiences` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  experiences: {
    companies: {
      [companyId: string]: {
        jobTitle: string;           // Your job title at this company
        contexts: string[];         // Array of job responsibilities/contexts
      }
    }
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
{
  sectionName: "experiences",
  data: {
    experiences: [
      {
        id: "CompanyA",
        startDate: new Date("2023-01-01"),
        companyName: "Company A",
        companyLogo: "./src/assets/companies/companyA.png",
        contexts: [1, 2],
        technologies: [
          [
            { name: "React", icon: "react" },
            { name: "TypeScript", icon: "typescript" },
            { name: "AWS", icon: "aws" },
          ],
          [
            { name: "Node.js", icon: "nodedotjs" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Docker", icon: "docker" },
          ]
        ],
        isCurrent: true
      },
      {
        id: "CompanyB",
        startDate: new Date("2020-06-01"),
        endDate: new Date("2022-12-31"),
        companyName: "Company B",
        companyLogo: "./src/assets/companies/companyB.png",
        contexts: [1, 2, 3],
        technologies: [
          [
            { name: "Angular", icon: "angular" },
            { name: "JavaScript", icon: "javascript" },
          ],
          [
            { name: "Express", icon: "express" },
            { name: "MySQL", icon: "mysql" },
          ],
          [
            { name: "Git", icon: "git" },
            { name: "Jenkins", icon: "jenkins" },
          ]
        ]
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
experiences: {
  companies: {
    CompanyA: {
      jobTitle: "Senior Frontend Developer",
      contexts: [
        "Led the development of a new customer-facing portal using React and TypeScript",
        "Architected and implemented a microservices-based backend infrastructure"
      ]
    },
    CompanyB: {
      jobTitle: "Full Stack Developer",
      contexts: [
        "Developed and maintained multiple Angular-based web applications",
        "Built RESTful APIs using Express and MySQL",
        "Implemented CI/CD pipelines using Jenkins and Git"
      ]
    }
  }
}
```

## Component Usage

The `Experiences` component is automatically registered using the `registerSection` decorator:

```typescript
export default createRegisteredSection<ExperiencesProps>('experiences', ExperiencesSectionComponent);
```

## Implementation Details

### Accordion Display

The component renders each experience as an accordion card. Clicking a card expands it to show context details and technologies.

### Deep Linking

Each experience card has an `id` anchor (e.g. `work-CompanyA`). The component listens to URL hash changes and auto-opens the matching accordion item when navigating from other sections (e.g. the About section's company name links).

### Duration Calculation

The component automatically calculates the duration of each position in years and months, handling:
- Current positions (calculating up to the present date)
- Short durations (displaying in months when less than a year)
- Long durations (displaying in years and months)

### Technology Display

Technologies used in each context are displayed as `TechPill` components, showing an icon (from Simple Icons) alongside the technology name.

## Styling

The component uses CSS modules for styling. The main styles are defined in `Experiences.module.css`. Key styling features include:

- Accordion card layout
- Highlighting for current position
- Responsive adjustments for different screen sizes

## Date Formatting

Dates are formatted using a short month + year format (e.g. "Jan 2023"). Current positions display a translated "Present" label.

## Notes for Implementation

1. The `contexts` array contains indices that correspond to the contexts in the translations. The indices are 1-based in the data but 0-based when accessing the array in the component.

2. Company logos should ideally be square and of similar dimensions for consistent display.

3. For the current position, you can either omit the `endDate` or set `isCurrent: true` (or both).

4. The `technologies` array should have the same length as the `contexts` array, with each sub-array containing the `TechItem` objects used for the corresponding context.

5. The `icon` field in `TechItem` should be a valid [Simple Icons](https://simpleicons.org/) slug.
