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
- Optional category labels
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
        live?: boolean;      // Whether the project is actively maintained (default: true)
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
        category?: string;    // Optional per-item category override
      }
    },
    actions: {
      tryIt: string;          // Text for "Try it" action links
      testIt: string;         // Text for "Test it" action links
      sourceCodeHere: string; // Text for "Source code" action links
      // Any other action text keys
    },
    categories?: {            // Optional category labels
      [key: string]: string;
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
        image: "./src/assets/projects/projectD.webp",
        // No link for this project
        live: false // Red dot, no longer maintained
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
projects: {
  intro: "Here are some of my personal and professional projects that showcase my skills and interests.",
  items: {
    projectA: {
      title: "Task Management API",
      desc: "A REST API built with Node.js and Express that provides task management functionality.",
    },
    projectB: {
      title: "Weather Dashboard",
      desc: "A React application that displays current weather and forecasts for multiple locations.",
      category: "Frontend",
    },
    projectC: {
      title: "E-commerce Platform",
      desc: "A full-stack e-commerce solution with a React frontend and Django backend.",
    },
    projectD: {
      title: "Algorithm Visualizer",
      desc: "An educational tool that visualizes sorting and pathfinding algorithms.",
    }
  },
  actions: {
    tryIt: "Try it here",
    testIt: "Test it there",
    sourceCodeHere: "Source code"
  },
  categories: {
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Full Stack"
  }
}
```

## Component Usage

The `Projects` component is automatically registered using the `registerSection` decorator:

```typescript
export default createRegisteredSection<ProjectsProps>('projects', ProjectsSectionComponent);
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

### Helper Functions

- `itemKey(id, property)` — builds translation key for a project item
- `actionKey(action)` — builds translation key for an action label
- `categoryKey(key)` — builds translation key for a category label

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

4. The `categories` translation object and per-item `category` field are optional and can be omitted if not needed.
