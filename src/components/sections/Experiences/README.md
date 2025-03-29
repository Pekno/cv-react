# Experiences Section

This section displays your professional work experiences in a timeline format, showcasing your career progression, job responsibilities, and technical skills used in each role.

## Component Structure

```
src/components/sections/Experiences/
├── Experiences.tsx           # Main component
├── Experiences.module.css    # Styles
├── Experiences.types.ts      # Type definitions
└── README.md                 # This file
```

## Features

- Chronological timeline of work experiences
- Company logos and job titles
- Duration calculation for each position
- Context/responsibility bullets for each role
- Technologies used in each position
- Current position highlighting
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
        id: string;                 // Company ID matching translation key
        startDate: Date;            // Start date of employment
        endDate?: Date;             // End date (omit for current position)
        companyName: string;        // Company name
        companyLogo: string;        // Path to company logo
        contexts: number[];         // Array of context indices (matching translation keys)
        technologies: string[][];   // Array of technology arrays for each context
        isCurrent?: boolean;        // Flag for current position
      }
    ]
  }
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
          ["React", "TypeScript", "AWS"],
          ["Node.js", "MongoDB", "Docker"]
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
          ["Angular", "JavaScript"],
          ["Express", "MySQL"],
          ["Git", "Jenkins"]
        ]
      },
      {
        id: "CompanyC",
        startDate: new Date("2018-03-01"),
        endDate: new Date("2020-05-31"),
        companyName: "Company C",
        companyLogo: "./src/assets/companies/companyC.png",
        contexts: [1],
        technologies: [
          ["Vue.js", "JavaScript", "PHP", "Laravel"]
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
        "Led the development of a new customer-facing portal using React and TypeScript, improving user engagement by 30%",
        "Architected and implemented a microservices-based backend infrastructure using Node.js and MongoDB"
      ]
    },
    CompanyB: {
      jobTitle: "Full Stack Developer",
      contexts: [
        "Developed and maintained multiple Angular-based web applications for enterprise clients",
        "Built RESTful APIs using Express and MySQL to support frontend applications",
        "Implemented CI/CD pipelines using Jenkins and Git for automated testing and deployment"
      ]
    },
    CompanyC: {
      jobTitle: "Junior Web Developer",
      contexts: [
        "Created responsive web interfaces using Vue.js and integrated them with Laravel backends"
      ]
    }
  }
}
```

### Translation Example (fr.ts)

```typescript
experiences: {
  companies: {
    CompanyA: {
      jobTitle: "Développeur Frontend Senior",
      contexts: [
        "Dirigé le développement d'un nouveau portail client utilisant React et TypeScript, améliorant l'engagement des utilisateurs de 30%",
        "Architecturé et implémenté une infrastructure backend basée sur des microservices utilisant Node.js et MongoDB"
      ]
    },
    CompanyB: {
      jobTitle: "Développeur Full Stack",
      contexts: [
        "Développé et maintenu plusieurs applications web basées sur Angular pour des clients entreprise",
        "Construit des API RESTful utilisant Express et MySQL pour soutenir les applications frontend",
        "Implémenté des pipelines CI/CD utilisant Jenkins et Git pour les tests et déploiements automatisés"
      ]
    },
    CompanyC: {
      jobTitle: "Développeur Web Junior",
      contexts: [
        "Créé des interfaces web responsives utilisant Vue.js et intégré avec des backends Laravel"
      ]
    }
  }
}
```

## Component Usage

The `Experiences` component is automatically registered using the `registerSection` decorator:

```typescript
export default registerSection<ExperiencesData>({ type: 'experiences' })(Experiences);
```

## Implementation Details

### Timeline Generation

The component generates a visual timeline by sorting experiences by start date (newest first) and calculating:

- Duration for each position
- Proper formatting of dates
- Visual indicators for current position

### Context Mapping

Each experience can have multiple contexts (job responsibilities). These are mapped from the `contexts` array in the data to the corresponding entries in the translations.

### Technology Display

Technologies used in each context are displayed as badges/chips, providing a quick visual indication of your technical skills for each responsibility.

## Styling

The component uses CSS modules for styling. The main styles are defined in `Experiences.module.css`. Key styling features include:

- Timeline connecting elements
- Alternating layout for better readability
- Highlighting for current position
- Responsive adjustments for different screen sizes

## Date Formatting

Dates are formatted according to the current locale (determined by the active language) using the `Intl.DateTimeFormat` API. This ensures dates are displayed in a format familiar to users based on their language preference.

## Duration Calculation

The component automatically calculates the duration of each position in years and months, handling:
- Current positions (calculating up to the present date)
- Short durations (displaying in months when less than a year)
- Long durations (displaying in years and months)

## Notes for Implementation

1. The `contexts` array contains indices that correspond to the contexts in the translations. The indices are 1-based in the data but 0-based when accessing the array in the component.

2. Company logos should ideally be square and of similar dimensions for consistent display.

3. For the current position, you can either omit the `endDate` or set `isCurrent: true` (or both).

4. The `technologies` array should have the same length as the `contexts` array, with each sub-array containing the technologies used for the corresponding context.