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
    └── EnhancedProfilePicture/ # Profile image with effects
```

## Features

- Profile picture display with enhanced effects
- Animated counter for years of experience
- Summary text with automatic company-name linking to the Experiences section
- Social media links with platform labels
- CV download button
- Stack focus, location, and availability info cards
- Responsive layout

## Data Structure

The `About` section requires the following data structure:

```typescript
// In profile-data.ts
{
  sectionName: "about",
  data: {
    yearsOfExperience: number;   // Number of years of experience
    stackFocus?: string;         // Optional tech stack focus (e.g. "React / Node.js / Go")
    location?: string;           // Optional location (e.g. "San Francisco, CA")
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
  ];
  lookingForWork?: boolean;    // Whether to show "Looking for work" badge
}
```

## Translation Requirements

The `About` section requires the following translation keys:

```typescript
// In en.ts/fr.ts
sections: {
  about: {
    jobTitle: string;              // Your job title
    jobTitleHighlight: string;     // Highlighted part of your job title (e.g. "Full Stack")
    experienceYears: string;       // Label above years counter (e.g. "YEARS OF")
    experienceLabel: string;       // Label below years counter (e.g. "EXPERIENCE")
    summary: string;               // Your personal/professional summary (supports \n for paragraphs)
    downloadResume: string;        // Text for the download button
    stackFocusLabel: string;       // Label for stack focus card
    locationLabel: string;         // Label for location card
    availabilityLabel: string;     // Label for availability card
    openForCollaboration: string;  // Text shown in availability card
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
  lookingForWork: true,
},
sections: [
  {
    sectionName: "about",
    data: {
      yearsOfExperience: 5,
      stackFocus: "React / Node.js / Go",
      location: "San Francisco, CA",
    },
  },
  // Other sections...
]
```

### Translation Example (en.ts)

```typescript
sections: {
  about: {
    jobTitle: "Software Engineer",
    jobTitleHighlight: "Full Stack",
    experienceYears: "YEARS OF",
    experienceLabel: "EXPERIENCE",
    summary: "I am a dedicated software architect specializing in building robust, high-performance web applications.\n\nThroughout my career, I've had the privilege of leading transformative engineering projects at TechInnovate Solutions and DataSphere Analytics.",
    downloadResume: "Download Curriculum Vitae",
    stackFocusLabel: "Stack Focus",
    locationLabel: "Location",
    availabilityLabel: "Availability",
    openForCollaboration: "Open for Collaboration",
  },
  // Other sections...
}
```

### Translation Example (fr.ts)

```typescript
sections: {
  about: {
    jobTitle: "Ingenieur Logiciel",
    jobTitleHighlight: "Full Stack",
    experienceYears: "ANNEES",
    experienceLabel: "D'EXPERIENCE",
    summary: "Je suis un architecte logiciel dedie, specialise dans la creation d'applications web robustes et performantes.\n\nTout au long de ma carriere, j'ai eu le privilege de diriger des projets d'ingenierie transformateurs.",
    downloadResume: "Telecharger le CV",
    stackFocusLabel: "Stack technique",
    locationLabel: "Localisation",
    availabilityLabel: "Disponibilite",
    openForCollaboration: "Ouvert a la collaboration",
  },
  // Other sections...
}
```

## Component Usage

The `About` component is automatically registered using the `registerSection` decorator and will be rendered by the `App` component based on the order defined in the profile data.

```typescript
export default createRegisteredSection<AboutProps>('about', AboutSectionComponent);
```

## Styling

The component uses CSS modules for styling. The main styles are defined in `About.module.css`. You can customize the appearance by modifying this file.

## Implementation Details

### Company Name Linking

The summary text is parsed to automatically detect company names from the Experiences section data. Matching names are rendered as anchor links that scroll to the corresponding experience entry.

### Sub-components

#### AnimatedCounter

Displays an animated number that counts up to the years of experience.

#### EnhancedProfilePicture

Displays your profile picture with hover effects and animations.
