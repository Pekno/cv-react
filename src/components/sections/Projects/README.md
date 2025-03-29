# Projects Section

This section showcases your personal or professional projects in an interactive carousel format, highlighting your portfolio of work with descriptions and relevant links.

## Component Structure

```
src/components/sections/Projects/
├── Projects.tsx                # Main component
├── Projects.module.css         # Styles
├── Projects.types.ts           # Type definitions
├── README.md                   # This file
└── components/                 # Sub-components
    └── ProjectCarousel/        # Carousel display for projects
└── hooks/                      # Custom hooks
    └── useCarouselAutoplay.ts  # Hook for carousel autoplay functionality
```

## Features

- Interactive carousel display of projects
- Autoplay functionality with pause/resume controls
- Project image showcase
- Project descriptions and titles
- External links to live demos or source code
- Responsive design for all device sizes
- Keyboard navigation support

## Data Structure

The `Projects` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "projects",
  data: {
    projects: [
      {
        id: string;          // Project ID matching translation key
        image: string;       // Path to project image
        link?: string;       // Optional URL to project demo or repository
        linkTextKey?: string; // Translation key for link text (e.g., "tryIt", "sourceCodeHere")
      }
    ]
  }
}
```

## Translation Requirements

The `Projects` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  projects: {
    intro: string;            // Introductory text for projects section
    items: {
      [projectId: string]: {
        title: string;        // Project title
        desc: string;         // Project description
      }
    },
    actions: {
      tryIt: string;          // Text for "Try it" action links
      testIt: string;         // Text for "Test it" action links
      sourceCodeHere: string; // Text for "Source code" action links
      // Any other action text keys
    }
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
{
  sectionName: "projects",
  data: {
    projects: [
      {
        id: "projectA",
        image: "./src/assets/projects/projectA.webp",
        link: "https://github.com/username/projectA",
        linkTextKey: "sourceCodeHere"
      },
      {
        id: "projectB",
        image: "./src/assets/projects/projectB.webp",
        link: "https://demo-link-for-projectb.com",
        linkTextKey: "tryIt"
      },
      {
        id: "projectC",
        image: "./src/assets/projects/projectC.webp",
        link: "https://test-environment-for-projectc.com",
        linkTextKey: "testIt"
      },
      {
        id: "projectD",
        image: "./src/assets/projects/projectD.webp"
        // No link for this project
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
projects: {
  intro: "Here are some of my personal and professional projects that showcase my skills and interests. Each project demonstrates different technologies and approaches to problem-solving.",
  items: {
    projectA: {
      title: "Task Management API",
      desc: "A REST API built with Node.js and Express that provides task management functionality. Features JWT authentication, role-based permissions, and MongoDB integration."
    },
    projectB: {
      title: "Weather Dashboard",
      desc: "A React application that displays current weather and forecasts for multiple locations. Uses the OpenWeather API and features interactive charts with recharts."
    },
    projectC: {
      title: "E-commerce Platform",
      desc: "A full-stack e-commerce solution with a React frontend and Django backend. Includes product catalog, shopping cart, user accounts, and payment processing."
    },
    projectD: {
      title: "Algorithm Visualizer",
      desc: "An educational tool that visualizes sorting and pathfinding algorithms. Built with vanilla JavaScript and HTML Canvas for rendering."
    }
  },
  actions: {
    tryIt: "Try it here",
    testIt: "Test it there",
    sourceCodeHere: "Source code"
  }
}
```

### Translation Example (fr.ts)

```typescript
projects: {
  intro: "Voici quelques-uns de mes projets personnels et professionnels qui mettent en valeur mes compétences et intérêts. Chaque projet démontre différentes technologies et approches de résolution de problèmes.",
  items: {
    projectA: {
      title: "API de Gestion de Tâches",
      desc: "Une API REST développée avec Node.js et Express qui fournit des fonctionnalités de gestion de tâches. Comprend l'authentification JWT, les autorisations basées sur les rôles et l'intégration MongoDB."
    },
    projectB: {
      title: "Tableau de Bord Météo",
      desc: "Une application React qui affiche la météo actuelle et les prévisions pour plusieurs emplacements. Utilise l'API OpenWeather et propose des graphiques interactifs avec recharts."
    },
    projectC: {
      title: "Plateforme E-commerce",
      desc: "Une solution e-commerce complète avec une interface React et un backend Django. Comprend un catalogue de produits, un panier d'achat, des comptes utilisateurs et un traitement des paiements."
    },
    projectD: {
      title: "Visualiseur d'Algorithmes",
      desc: "Un outil éducatif qui visualise les algorithmes de tri et de recherche de chemin. Construit avec JavaScript vanilla et HTML Canvas pour le rendu."
    }
  },
  actions: {
    tryIt: "Essayez-le ici",
    testIt: "Testez-le là",
    sourceCodeHere: "Code source"
  }
}
```

## Component Usage

The `Projects` component is automatically registered using the `registerSection` decorator:

```typescript
export default registerSection<ProjectsData>({ type: 'projects' })(Projects);
```

## Implementation Details

### Project Carousel

The component uses an Embla Carousel (via @mantine/carousel) to display projects in a responsive, swipeable interface:

- Thumbnails are displayed at a consistent aspect ratio
- Navigation controls are provided for previous/next slide
- Autoplay functionality can be toggled by the user
- Keyboard navigation is supported for accessibility

### Custom Hook: useCarouselAutoplay

The section employs a custom hook that manages autoplay functionality:

```typescript
const { isPlaying, toggleAutoplay } = useCarouselAutoplay(carouselRef, {
  delay: 15000, // 15 seconds between slides
  stopOnInteraction: true, // Pause when user interacts with carousel
  initiallyActive: true, // Start with autoplay active
});
```

### Link Handling

The component dynamically renders appropriate link text based on the `linkTextKey` specified in the data:

- `tryIt` for links to live demos
- `testIt` for links to test environments
- `sourceCodeHere` for links to repositories

## Styling

The component uses CSS modules for styling. The main styles are defined in `Projects.module.css`. Key styling features include:

- Carousel controls with proper hover states
- Responsive image containers
- Link button styling
- Intro text formatting

The `ProjectCarousel` sub-component has its own styling for carousel-specific elements.

## Accessibility Considerations

- All carousel controls have proper ARIA labels
- Keyboard navigation support (arrow keys)
- Proper focus management for interactive elements
- Alt text for project images derived from project titles
- Autoplay notification for screen readers

## Notes for Implementation

1. Project images should have a consistent aspect ratio (16:9 recommended) for visual consistency in the carousel.

2. The `linkTextKey` should match one of the defined keys in the `actions` translation object.

3. The autoplay feature is set to 15 seconds by default but can be customized in the `useCarouselAutoplay` hook.

4. If internationalization is important for your project links, consider using relative paths that work regardless of language settings, or provide language-specific links in your data structure.