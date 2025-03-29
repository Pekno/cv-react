# Hobbies Section

This section displays your personal interests and activities outside of work, particularly focusing on travel experiences with visual representations and descriptions.

## Component Structure

```
src/components/sections/Hobbies/
├── Hobbies.tsx              # Main component
├── Hobbies.module.css       # Styles
├── Hobbies.types.ts         # Type definitions
└── README.md                # This file
```

## Features

- Grid display of travel/hobby photographs
- Modal image viewer for enlarged photos
- Travel location and date information
- Travel description text
- Responsive grid layout that adapts to different screen sizes
- Introduction text describing general interests

## Data Structure

The `Hobbies` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "hobbies",
  data: {
    travels: [
      {
        id: string;         // Travel ID matching translation key
        image: string;      // Path to travel/hobby image
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
    intro: string;           // Introductory text about hobbies/interests
    travels: {
      [travelId: string]: {
        title: string;       // Travel location and year (e.g., "Japan in 2023")
        desc: string;        // Description of the travel experience
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
    travels: [
      {
        id: "japan",
        image: "./src/assets/hobbies/japan.webp",
      },
      {
        id: "hiking",
        image: "./src/assets/hobbies/hiking.webp",
      },
      {
        id: "skiing",
        image: "./src/assets/hobbies/skiing.webp",
      },
      {
        id: "cooking",
        image: "./src/assets/hobbies/cooking.webp",
      },
      {
        id: "gaming",
        image: "./src/assets/hobbies/gaming.webp",
      },
      {
        id: "photography",
        image: "./src/assets/hobbies/photography.webp",
      }
    ]
  }
}
```

### Translation Example (en.ts)

```typescript
hobbies: {
  intro: "Beyond my professional life, I enjoy a variety of activities that keep me balanced and inspired. I'm particularly passionate about travel, which allows me to experience different cultures and perspectives. I also enjoy outdoor activities, creative pursuits, and continuous learning through various hobbies.",
  travels: {
    japan: {
      title: "Japan in 2023",
      desc: "Exploring the perfect blend of ancient traditions and cutting-edge technology in Tokyo, Kyoto, and Osaka. Highlights included the peaceful temples, vibrant street life, and incredible cuisine."
    },
    hiking: {
      title: "Hiking in the Alps 2022",
      desc: "Challenging myself with multi-day treks through the stunning Alpine landscapes, experiencing breathtaking views, pristine mountain lakes, and the serene beauty of nature at high altitudes."
    },
    skiing: {
      title: "Winter Sports in Canada 2021",
      desc: "Spending two weeks at Whistler Blackcomb, experiencing some of the best powder snow conditions. Days of skiing were complemented by cozy evenings by the fireplace in a mountain cabin."
    },
    cooking: {
      title: "Culinary Explorations",
      desc: "Developing my passion for international cuisine by taking cooking classes and experimenting with recipes collected from my travels. My specialty is fusion dishes that combine techniques from different culinary traditions."
    },
    gaming: {
      title: "Gaming and Virtual Worlds",
      desc: "Enjoying both competitive and cooperative video games as a way to unwind and connect with friends. Particularly interested in strategy games and immersive RPGs with rich storytelling."
    },
    photography: {
      title: "Landscape Photography",
      desc: "Capturing the beauty of natural and urban landscapes during my travels. I focus on composition and natural lighting to convey the feeling and atmosphere of each location."
    }
  }
}
```

### Translation Example (fr.ts)

```typescript
hobbies: {
  intro: "Au-delà de ma vie professionnelle, je pratique diverses activités qui me permettent de rester équilibré et inspiré. Je suis particulièrement passionné par les voyages, qui me permettent de découvrir différentes cultures et perspectives. J'apprécie également les activités de plein air, les poursuites créatives et l'apprentissage continu à travers divers passe-temps.",
  travels: {
    japan: {
      title: "Japon en 2023",
      desc: "Explorer le mélange parfait de traditions anciennes et de technologie de pointe à Tokyo, Kyoto et Osaka. Les moments forts ont inclus les temples paisibles, la vie animée des rues et la cuisine incroyable."
    },
    hiking: {
      title: "Randonnée dans les Alpes 2022",
      desc: "Me mettre au défi avec des randonnées de plusieurs jours à travers les magnifiques paysages alpins, découvrant des vues à couper le souffle, des lacs de montagne immaculés et la beauté sereine de la nature en altitude."
    },
    skiing: {
      title: "Sports d'hiver au Canada 2021",
      desc: "Passer deux semaines à Whistler Blackcomb, profitant de conditions de neige poudreuse exceptionnelles. Les journées de ski étaient complétées par des soirées confortables au coin du feu dans une cabane de montagne."
    },
    cooking: {
      title: "Explorations Culinaires",
      desc: "Développer ma passion pour la cuisine internationale en prenant des cours de cuisine et en expérimentant des recettes collectées lors de mes voyages. Ma spécialité est les plats fusion qui combinent des techniques de différentes traditions culinaires."
    },
    gaming: {
      title: "Jeux Vidéo et Mondes Virtuels",
      desc: "Apprécier les jeux vidéo compétitifs et coopératifs comme moyen de me détendre et de me connecter avec des amis. Particulièrement intéressé par les jeux de stratégie et les RPG immersifs avec une narration riche."
    },
    photography: {
      title: "Photographie de Paysage",
      desc: "Capturer la beauté des paysages naturels et urbains pendant mes voyages. Je me concentre sur la composition et l'éclairage naturel pour transmettre le sentiment et l'atmosphère de chaque lieu."
    }
  }
}
```

## Component Usage

The `Hobbies` component is automatically registered using the `registerSection` decorator:

```typescript
export default registerSection<HobbiesData>({ type: 'hobbies' })(Hobbies);
```

## Implementation Details

### Image Grid

The component generates a responsive grid of images using Mantine's Grid component:

- Images are displayed in a consistent aspect ratio
- Card layout with image and hover overlay
- Modal view for enlarged images on click
- Caption display with location/date and description

### Modal Image Viewer

When a user clicks on an image, it opens in a modal with:

- Enlarged view of the image
- Title and description from translations
- Close button
- Click outside to dismiss

### Responsive Design

The grid adapts to different screen sizes:
- 1 column on mobile devices
- 2 columns on tablets
- 3 columns on desktop screens

## Styling

The component uses CSS modules for styling. The main styles are defined in `Hobbies.module.css`. Key styling features include:

- Image hover effects
- Card styling with consistent spacing
- Modal styling for image viewing
- Typography styling for captions and descriptions
- Responsive spacing adjustments

## Accessibility Considerations

- Images have appropriate alt text based on their titles
- Modal is keyboard navigable
- Focus is properly managed when opening/closing the modal
- Sufficient color contrast for text overlay on images

## Notes for Implementation

1. Travel/hobby images should ideally have a consistent aspect ratio (16:9 or 4:3 recommended) for visual consistency in the grid.

2. For best visual appearance, use high-quality images that clearly represent the hobby or travel experience.

3. The order of entries in the grid matches the order in the `travels` array, so arrange them in your preferred display order.

4. For performance optimization, consider using optimized image formats like WebP and appropriate sizing to reduce page load time.

5. The intro text is a good place to describe general interests beyond what is shown in the specific travel images, providing a more complete picture of your hobbies and personality.