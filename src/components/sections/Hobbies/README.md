# Hobbies Section

This section displays your personal interests and activities outside of work using a bento-grid layout with images, icons, and descriptions.

## Component Structure

```
src/components/sections/Hobbies/
├── Hobbies.tsx              # Main component
├── Hobbies.module.css       # Styles
├── Hobbies.types.ts         # Type definitions
└── README.md                # This file
```

## Features

- Bento-grid layout with configurable card spans (columns and rows)
- Material Symbols Outlined icons on each card
- Subtitle labels (e.g. location or category)
- Modal viewer for enlarged images with title and description
- Keyboard accessible cards
- Responsive grid layout that adapts to different screen sizes

## Data Structure

The `Hobbies` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "hobbies",
  data: {
    items: [
      {
        id: string;           // Hobby ID matching translation key
        image: string;        // Path to hobby image
        icon: string;         // Material Symbols Outlined icon name (e.g. "travel_explore")
        subtitle: string;     // Location or category label shown on card (e.g. "KYOTO, JAPAN")
        colSpan?: 1 | 2;     // How many columns this card spans (default: 1)
        rowSpan?: 1 | 2;     // How many rows this card spans (default: 1)
      }
    ]
  }
}
```

## Translation Requirements

The `Hobbies` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  hobbies: {
    subtitle: string;          // Introductory subtitle text
    items: {
      [hobbyId: string]: {
        title: string;         // Hobby title (e.g. "Japan 2023")
        desc: string;          // Description of the hobby/experience
      }
    }
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
{
  sectionName: "hobbies",
  data: {
    items: [
      {
        id: "japan",
        image: "./src/assets/hobbies/japan.webp",
        icon: "travel_explore",
        subtitle: "Kyoto, Japan",
        colSpan: 1,
        rowSpan: 2,
      },
      {
        id: "hiking",
        image: "./src/assets/hobbies/hiking.webp",
        icon: "hiking",
        subtitle: "Swiss Alps",
        colSpan: 2,
        rowSpan: 1,
      },
      {
        id: "cooking",
        image: "./src/assets/hobbies/cooking.webp",
        icon: "restaurant",
        subtitle: "World Cuisines",
      },
      {
        id: "photography",
        image: "./src/assets/hobbies/photography.webp",
        icon: "photo_camera",
        subtitle: "Landscapes",
      },
      {
        id: "gaming",
        image: "./src/assets/hobbies/gaming.webp",
        icon: "sports_esports",
        subtitle: "RPGs & Strategy",
      },
      {
        id: "skiing",
        image: "./src/assets/hobbies/skiing.webp",
        icon: "downhill_skiing",
        subtitle: "Whistler & Chamonix",
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
hobbies: {
  subtitle: "Beyond the screen, I seek out experiences that expand my perspective.",
  items: {
    japan: {
      title: "Japan 2023",
      desc: "An immersive journey through the blend of ancient tradition and futuristic innovation.",
    },
    hiking: {
      title: "Alpine Trekking",
      desc: "Multi-day treks through the Swiss and French Alps, crossing glaciers and remote passes.",
    },
    cooking: {
      title: "Culinary Arts",
      desc: "Exploring world cuisines through hands-on cooking classes during travels.",
    },
    photography: {
      title: "Landscape Photography",
      desc: "Capturing light across natural and urban landscapes.",
    },
    gaming: {
      title: "Virtual Worlds",
      desc: "Exploring immersive game worlds and early VR experiences.",
    },
    skiing: {
      title: "Winter Sports",
      desc: "Chasing powder from Whistler to Chamonix.",
    }
  }
}
```

### Translation Example (fr.ts)

```typescript
hobbies: {
  subtitle: "Au-dela de l'ecran, je recherche des experiences qui elargissent ma perspective.",
  items: {
    japan: {
      title: "Japon 2023",
      desc: "Un voyage immersif a travers le melange de tradition ancienne et d'innovation futuriste.",
    },
    hiking: {
      title: "Randonnee Alpine",
      desc: "Randonnees de plusieurs jours a travers les Alpes suisses et francaises.",
    },
    cooking: {
      title: "Arts Culinaires",
      desc: "Explorer les cuisines du monde a travers des cours de cuisine.",
    },
    photography: {
      title: "Photographie de Paysage",
      desc: "Capturer la lumiere a travers les paysages naturels et urbains.",
    },
    gaming: {
      title: "Mondes Virtuels",
      desc: "Explorer des mondes de jeux immersifs et les premieres experiences VR.",
    },
    skiing: {
      title: "Sports d'Hiver",
      desc: "A la recherche de la poudreuse de Whistler a Chamonix.",
    }
  }
}
```

## Component Usage

The `Hobbies` component is automatically registered using the `registerSection` decorator:

```typescript
export default createRegisteredSection<HobbiesProps>('hobbies', HobbiesSectionComponent);
```

## Implementation Details

### Bento Grid

The component renders a CSS Grid where each card can span multiple columns and/or rows via `colSpan` and `rowSpan`. This creates a visually dynamic, magazine-style layout.

### BentoCard

Each hobby is rendered as a `BentoCard` component featuring:

- Background image with overlay gradient
- Material Symbols icon
- Subtitle label
- Title from translations
- Click to open modal with full description

### Modal Viewer

When a user clicks on a card, it opens a modal with:

- Enlarged view of the image
- Title and description from translations
- Close button

### Responsive Design

The grid adapts to different screen sizes, collapsing to fewer columns on smaller viewports.

## Styling

The component uses CSS modules for styling. The main styles are defined in `Hobbies.module.css`. Key styling features include:

- CSS Grid with configurable spans
- Image hover effects and overlay gradients
- Modal styling for image viewing
- Responsive spacing adjustments

## Accessibility Considerations

- Cards have `role="button"` and `tabIndex={0}` for keyboard navigation
- Cards respond to Enter and Space key presses
- Cards have `aria-label` set to the hobby title
- Modal is keyboard navigable

## Notes for Implementation

1. Hobby images should ideally be high quality. Cards with `rowSpan: 2` will display taller images.

2. The `icon` field uses [Material Symbols Outlined](https://fonts.google.com/icons) icon names (e.g. `travel_explore`, `hiking`).

3. The order of entries in the grid matches the order in the `items` array, so arrange them in your preferred display order.

4. For performance optimization, consider using optimized image formats like WebP and appropriate sizing to reduce page load time.

5. The `colSpan` and `rowSpan` default to 1 if omitted. Use `2` to create larger feature cards.
