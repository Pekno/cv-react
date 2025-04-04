# CV React

A modern, responsive CV/portfolio application built with React, TypeScript, and Vite. This project features multiple language support, a type-safe architecture, and a component-based structure for easy maintenance and extension.

## Features

- 🌐 **Multi-Language Support**: Built-in internationalization with English and French (easily extendable)
- 🧩 **Component-Based Architecture**: Modular sections for easy customization
- 📝 **Type-Safe Development**: Strong TypeScript typing throughout
- 🎨 **Modern UI**: Built with Mantine UI components
- 🧰 **Decorator Pattern**: Simplified registration of new sections
- 📱 **Responsive Design**: Mobile-friendly layout
- 🚀 **Fast Development**: Powered by Vite for quick build and hot module replacement
- 🔍 **Build Optimization**: Automatically includes only the sections you use

## Customizing Your CV

To personalize this CV template with your own information, you'll primarily need to modify two sets of files:

### 1. Customize Profile Data

The main data for your CV is stored in `src/data/profile-data.ts`. This file contains all the structured information that populates the various sections.

```typescript
// Example of modifying the About section data
meta: {
  name: "Your Name",
  profilePictures: [
    "./src/assets/your-profile-picture.jpg",
  ],
  pdfResume: {
    en: "./pdf/Your-Resume-EN.pdf",
    fr: "./pdf/Your-Resume-FR.pdf",
  },
  socials: [
    {
      type: "github",
      url: "https://github.com/yourusername/",
    },
    {
      type: "linkedin",
      url: "https://www.linkedin.com/in/yourprofile/",
    },
  ],
},
sections: [
  {
    sectionName: "about",
    data: {
      yearsOfExperience: 5, // Update with your years of experience
    },
  },
  // Continue updating other sections...
]
```

Each section has its own data structure, and you should refer to the specific section's README file for details on what fields are required.

### 2. Update Translations

Translations are stored in the locale files under `src/i18n/locales/`. You'll need to update both `en.ts` and `fr.ts` (or any other languages you've added) to reflect your personal information.

In `src/i18n/locales/en.ts`:

```typescript
// Example of modifying the About section translations
sections: {
  about: {
    jobTitle: "Your Job Title",
    experienceText: "years of experience",
    summary: "Your professional summary goes here. Describe your background, expertise, and career goals...",
  },
  // Continue updating other sections...
}
```

Make similar changes to `fr.ts` with the French translations of your content.

### 3. Section-Specific Customizations

Each section has its own data structure and requirements. The table below lists all available components with links to their detailed documentation:

| Section      | Purpose                                  | Documentation                                  |
|--------------|------------------------------------------|-----------------------------------------------|
| About        | Personal information and social links    | [About README](src/components/sections/About/README.md) |
| Skills       | Professional and technical skills        | [Skills README](src/components/sections/Skills/README.md) |
| Education    | Educational history and languages        | [Education README](src/components/sections/Education/README.md) |
| Experiences  | Work history and responsibilities        | [Experiences README](src/components/sections/Experiences/README.md) |
| Projects     | Personal or professional projects        | [Projects README](src/components/sections/Projects/README.md) |
| Hobbies      | Personal interests and activities        | [Hobbies README](src/components/sections/Hobbies/README.md) |

Each README contains detailed information on:
- The expected data structure
- Required translation keys
- Example implementations
- Component features and customization options

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd cv-react
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Using Demo Mode

To use example data instead of your personal data during development:

```bash
npm run dev -- --mode=demo
# or
yarn dev --mode=demo
```

To build using example data:

```bash
npm run build -- --mode=demo
# or
yarn build --mode=demo
```

## Performance Optimization

This project includes a custom Vite plugin that automatically analyzes your profile data and only includes the sections you actually use in the final bundle. This means:

1. **Smaller Bundle Size**: Only the components you actually use are included in the build
2. **No Manual Configuration**: Just add or remove sections from your profile data
3. **Type-Safe Detection**: The plugin understands your section registry

This optimization happens automatically during the build process with no additional configuration needed.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](LICENSE.md).
You are free to use, share, and adapt this work for non-commercial purposes, as long as you provide attribution.

## For Developers

If you're interested in understanding the project architecture, extending the codebase with new features, or learning about the technical implementation details, please refer to the [Developer Documentation](DEVELOPER.md).