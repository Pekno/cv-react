# Skills Section

This section displays your professional skills, including functional qualities, technical expertise, and key competencies.

## Component Structure

```
src/components/sections/Skills/
├── Skills.tsx                # Main component
├── Skills.module.css         # Styles
├── Skills.types.ts           # Type definitions
├── README.md                 # This file
└── components/               # Sub-components
    ├── SkillCard/            # Card for displaying functional qualities
    └── TechCategory/         # Technical skills category display
```

## Features

- Functional qualities display with icons and badges
- Technical skills organized by categories
- Key competencies list
- Badge-based display of technologies using shields.io
- Responsive grid layout

## Data Structure

The `Skills` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "skills",
  data: {
    mainSkills: [
      {
        id: string;           // ID matching translation key (e.g., "leadership")
        icon: string;         // Icon name from @tabler/icons-react (e.g., "IconBriefcase")
        badges: string[];     // Array of badge IDs matching translation keys
      }
    ],
    categories: [
      {
        id: string;           // ID matching translation key (e.g., "programmingLanguages")
        items: string[];      // Array of shield.io badge URLs
      }
    ],
    competencies: string[];   // Array of competency IDs matching translation keys
  }
}
```

## Translation Requirements

The `Skills` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  skills: {
    functional: {
      libraries: string;     // Title for technologies/libraries section
      qualities: {
        [qualityId: string]: {   // Each quality (e.g., "leadership")
          title: string;         // Quality title
          desc: string;          // Quality description
          chips: {
            [badgeId: string]: string;  // Badge text for each badge ID
          }
        }
      },
      keyCompetencies: {
        title: string;           // Title for key competencies section
        competencies: {
          [competencyId: string]: string;  // Text for each competency ID
        }
      }
    },
    technical: {
      categories: {
        [categoryId: string]: string;  // Title for each technical category
      }
    }
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
{
  sectionName: "skills",
  data: {
    mainSkills: [
      {
        id: "leadership",
        icon: "IconBriefcase",
        badges: ["teamLeading", "technicalLeadership", "mentoring"],
      },
      {
        id: "projectManagement",
        icon: "IconTarget",
        badges: ["agile", "scrum", "traditional", "planning"],
      },
      // More skills...
    ],
    categories: [
      {
        id: "programmingLanguages",
        items: [
          "https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white",
          "https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E",
          // More items...
        ],
      },
      {
        id: "frontend",
        items: [
          "https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB",
          "https://img.shields.io/badge/angular-%23DD0031.svg?style=flat&logo=angular&logoColor=white",
          // More items...
        ],
      },
      // More categories...
    ],
    competencies: ["participate", "estimate", "analysis", "quality"],
  }
}
```

### Translation Example (en.ts)

```typescript
skills: {
  functional: {
    libraries: "Technologies / Libraries",
    qualities: {
      leadership: {
        title: "Leadership & Team Management",
        desc: "Technical leadership with experience in team coordination, resource allocation, and mentoring junior developers.",
        chips: {
          teamLeading: "Team Leading",
          technicalLeadership: "Technical Leadership",
          mentoring: "Mentoring",
        },
      },
      projectManagement: {
        title: "Project Management",
        desc: "Experience with agile and traditional methodologies, estimation, planning, tracking, and stakeholder coordination.",
        chips: {
          agile: "Agile",
          scrum: "Scrum",
          traditional: "Traditional",
          planning: "Planning",
        },
      },
      // More qualities...
    },
    keyCompetencies: {
      title: "Key Professional Competencies",
      competencies: {
        participate: "Participation in projects using both agile and traditional methodologies",
        estimate: "Estimation, planning, monitoring, coordination, and technical support",
        analysis: "Requirements analysis, design, specification writing, and methodology definition",
        quality: "Quality processes, code reviews, continuous integration and deployment",
      },
    },
  },
  technical: {
    categories: {
      programmingLanguages: "Programming Languages",
      frontend: "Frontend",
      backend: "Backend",
      databases: "Databases",
      devops: "DevOps",
      cloudHomelab: "Cloud & Homelab",
    },
  },
}
```

### Translation Example (fr.ts)

```typescript
skills: {
  functional: {
    libraries: "Technos / Librairies",
    qualities: {
      leadership: {
        title: "Leadership & Gestion d'Équipe",
        desc: "Leadership technique avec expérience en coordination d'équipe, allocation de ressources et mentorat de développeurs juniors.",
        chips: {
          teamLeading: "Team Leading",
          technicalLeadership: "Technical Leadership",
          mentoring: "Mentorat",
        },
      },
      // More qualities...
    },
    keyCompetencies: {
      title: "Compétences Professionnelles Clés",
      competencies: {
        participate: "Participation dans des projets en méthodologie agile et traditionnelle",
        // More competencies...
      },
    },
  },
  technical: {
    categories: {
      programmingLanguages: "Langages de Programmation",
      frontend: "Frontend",
      // More categories...
    },
  },
}
```

## Component Usage

The `Skills` component is automatically registered using the `registerSection` decorator:

```typescript
export default registerSection<SkillsData>({ type: 'skills' })(Skills);
```

## Styling

The component uses CSS modules for styling. The main styles are defined in `Skills.module.css`. 

## Sub-components

### SkillCard

Displays a functional quality with its title, description, and badges.

```typescript
interface SkillCardProps {
  title: string;
  description: string;
  icon: TablerIcon;
  badges: string[];
}
```

### TechCategory

Displays a category of technical skills with shield.io badges.

```typescript
interface TechCategoryProps {
  title: string;
  items: string[];
}
```

## Notes for Implementation

1. The component uses icons from `@tabler/icons-react`. Make sure the icon names in your data match actual icons from this library.

2. For technical skills, the component uses shield.io badges. You can generate these badges from [shields.io](https://shields.io/) or use the preconfigured ones in the example.

3. The layout is responsive and will adjust based on screen size, displaying 1, 2, or 3 columns of skills depending on available space.