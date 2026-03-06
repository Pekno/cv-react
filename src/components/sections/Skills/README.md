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
- Technology pills with white SVG icons from [Simple Icons](https://simpleicons.org/)
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
        items: [
          {
            name: string;     // Display name (e.g., "TypeScript")
            icon: string;     // Simple Icons slug (e.g., "typescript") — find slugs at https://simpleicons.org/
          }
        ]
      }
    ],
    competencies: [
      {
        id: string;           // ID matching translation key (e.g., "participate")
      }
    ]
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
          { name: "TypeScript", icon: "typescript" },
          { name: "JavaScript", icon: "javascript" },
          // More items...
        ],
      },
      {
        id: "frontend",
        items: [
          { name: "React", icon: "react" },
          { name: "Angular", icon: "angular" },
          // More items...
        ],
      },
      // More categories...
    ],
    competencies: [
      { id: "participate" },
      { id: "estimate" },
      { id: "analysis" },
      { id: "quality" },
    ],
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

1. The component uses icons from `@tabler/icons-react` for skill cards. Make sure the icon names in your data match actual icons from this library.

2. Technology pills use icons from `@icons-pack/react-simple-icons`. To find the correct icon slug for a technology, browse [Simple Icons](https://simpleicons.org/) and use the slug shown on the icon's page (e.g., `typescript`, `react`, `nodedotjs`, `docker`). If no matching icon exists, the pill will display the name without an icon.

3. The layout is responsive and will adjust based on screen size, displaying 1, 2, or 3 columns of skills depending on available space.