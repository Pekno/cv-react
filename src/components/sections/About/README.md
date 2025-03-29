# About Section

This section serves as the introduction to your CV/profile and displays your personal information, job title, years of experience, and summary.

## Component Structure

```
src/components/sections/About/
├── About.tsx                # Main component
├── About.module.css         # Styles
├── About.types.ts           # Type definitions
├── README.md                # This file
└── components/              # Sub-components
    ├── AnimatedCounter/     # Years of experience counter
    ├── ConsoleTypingAnimation/ # Typing effect for summary
    └── EnhancedProfilePicture/ # Profile image with effects
```

## Features

- Profile picture display with enhanced effects
- Animated counter for years of experience
- Console-style typing animation for personal summary
- Social media links
- CV download button
- Responsive layout

## Data Structure

The `About` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "about",
  data: {
    yearsOfExperience: number  // Number of years of experience
  }
}
```

Additionally, it uses the following fields from the global `meta` object:

```typescript
meta: {
  name: string;                // Your full name
  profilePictures: string[];   // Array of profile picture paths
  pdfResume: {                 // PDF resume paths
    en: string;
    fr: string;
  };
  socials: [                   // Social media links
    {
      type: string;            // Platform name (e.g., "github", "linkedin")
      url: string;             // Full URL to your profile
    }
  ]
}
```

## Translation Requirements

The `About` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  about: {
    jobTitle: string;       // Your job title
    experienceText: string; // Text after the years counter (e.g., "years of experience")
    summary: string;        // Your personal/professional summary
  }
}
```

## Example Implementation

### Data Example (profile-data.ts)

```typescript
meta: {
  name: "John Doe",
  profilePictures: [
    "./src/assets/profiles/profile.jpg",
  ],
  pdfResume: {
    en: "./pdf/Resume-JohnDoe-EN.pdf",
    fr: "./pdf/Resume-JohnDoe-FR.pdf",
  },
  socials: [
    {
      type: "github",
      url: "https://github.com/johndoe/",
    },
    {
      type: "linkedin",
      url: "https://www.linkedin.com/in/johndoe/",
    }
  ],
},
sections: [
  {
    sectionName: "about",
    data: {
      yearsOfExperience: 5,
    },
  },
  // Other sections...
]
```

### Translation Example (en.ts)

```typescript
sections: {
  about: {
    jobTitle: "Software Engineer (Full Stack)",
    experienceText: "years of experience",
    summary: "I'm John Doe, a passionate software engineer with expertise in web development. I've worked with various technologies including React, Node.js, and TypeScript. Throughout my career, I've focused on building clean, maintainable, and user-friendly applications...",
  },
  // Other sections...
}
```

### Translation Example (fr.ts)

```typescript
sections: {
  about: {
    jobTitle: "Ingénieur Logiciel (Full Stack)",
    experienceText: "ans d'expérience",
    summary: "Je suis John Doe, un ingénieur logiciel passionné avec une expertise en développement web. J'ai travaillé avec diverses technologies, notamment React, Node.js et TypeScript. Tout au long de ma carrière, je me suis concentré sur la création d'applications propres, maintenables et conviviales...",
  },
  // Other sections...
}
```

## Component Usage

The `About` component is automatically registered using the `registerSection` decorator and will be rendered by the `App` component based on the order defined in the profile data.

```typescript
export default registerSection<AboutData>({ type: 'about' })(About);
```

## Styling

The component uses CSS modules for styling. The main styles are defined in `About.module.css`. You can customize the appearance by modifying this file.

## Sub-components

### AnimatedCounter

Displays an animated number that counts up to the years of experience.

### ConsoleTypingAnimation

Displays your summary with a typewriter effect in a console-like format.

### EnhancedProfilePicture

Displays your profile picture with hover effects and animations.