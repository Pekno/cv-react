import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import type reference
import type { SectionTypeRegistry } from './src/types/profile-data.types';

// Get proper __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom plugin to analyze profile data and include only used sections
function usedSectionsPlugin(): Plugin {
  // Store the used sections with proper typing from the registry
  let usedSections: Array<keyof SectionTypeRegistry> = [];
  
  // Create logger functions in closure scope
  const logger = {
    info(msg: string) {
      const prefix = `[used-sections-plugin]`;
      console.log(`\x1b[36m${prefix}\x1b[0m ${msg}`);
    },
    
    debug(msg: string) {
      // Check for debug mode using environment variable
      const isDebugMode = import.meta.env?.DEBUG === true ||
                         import.meta.env?.MODE === 'development';
      
      if (isDebugMode) {
        const prefix = `[used-sections-plugin]`;
        console.log(`\x1b[90m${prefix}\x1b[0m ${msg}`);
      }
    },
    
    error(msg: string) {
      const prefix = `[used-sections-plugin]`;
      console.error(`\x1b[31m${prefix}\x1b[0m ${msg}`);
    }
  };
  
  return {
    name: 'used-sections-plugin',
    enforce: 'pre' as const,
    
    // This runs at the beginning of the build process
    buildStart() {
      try {
        // Read the profile data to determine which sections are used
        const profileDataPath = resolve(__dirname, './src/data/profile-data.ts');
        const profileExamplePath = resolve(__dirname, './src/data/profile-data.example.ts');
        
        // We'll use the actual profile data and example data to determine used sections
        const paths = [profileDataPath, profileExamplePath];
        const sectionsSet = new Set<string>();
        
        // Read each profile data file and extract section names
        paths.forEach(filePath => {
          if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            // Simple regex to extract section names
            const sectionMatches = fileContent.match(/sectionName:\s*["']([^"']+)["']/g) || [];
            
            sectionMatches.forEach(match => {
              const nameMatch = match.match(/["']([^"']+)["']/);
              if (nameMatch && nameMatch[1]) {
                sectionsSet.add(nameMatch[1]);
              }
            });
          }
        });
        
        // Convert Set to Array and store it
        usedSections = Array.from(sectionsSet) as Array<keyof SectionTypeRegistry>;
        
        // Use our logger instead of console.log
        logger.info(`📦 Used sections detected in profile data: ${usedSections.join(', ')}`);
      } catch (error) {
        // Log errors using our logger
        logger.error(`Error analyzing profile data: ${error}`);
        usedSections = []; // Default to empty if there's an error
      }
    },
    
    // This transforms import statements during the build
    transform(code: string, id: string) {
      // Only process the App.tsx file
      if (id.endsWith('App.tsx')) {
        // Replace the glob import with explicit imports for used sections
        if (code.includes('import.meta.glob')) {
          // Generate imports only for used sections
          const sectionImports = usedSections.length > 0 ? 
            usedSections
              .map(section => 
                `import '@/components/sections/${capitalizeFirstLetter(String(section))}/${capitalizeFirstLetter(String(section))}';`
              )
              .join('\n') : 
            '// No sections detected in profile data';
          
          // Replace the glob import with our targeted imports
          code = code.replace(
            /import\.meta\.glob\(['"]\.\/components\/sections\/\*\/\*\.tsx['"], \{ eager: true \}\);/,
            sectionImports
          );
          
          // Log the transformation
          logger.debug(`📄 Generated section imports for ${usedSections.length} sections in App.tsx`);
          
          return code;
        }
      }
      
      return null; // Return null to keep the original code unchanged
    }
  };
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default defineConfig(({ mode }) => {
  // Check if we're running in demo mode
  const isDemo = mode === "demo";

  return {
    plugins: [
      usedSectionsPlugin(),
      react({
        babel: {
          plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
        },
      }),
    ],
    define: {
      // Feature flag for toggling between example and real data
      __USE_EXAMPLE_DATA__: isDemo,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@components": resolve(__dirname, "./src/components"),
        "@hooks": resolve(__dirname, "./src/hooks"),
        "@decorators": resolve(__dirname, "./src/decorators"),
        "@app-types": resolve(__dirname, "./src/types"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            mantine: ["@mantine/core", "@mantine/hooks", "@mantine/carousel"],
            i18n: [
              "i18next",
              "react-i18next",
              "i18next-browser-languagedetector",
            ],
          },
        },
      },
    },
    // Configure logging levels
    logLevel: 'info', // 'info' | 'warn' | 'error' | 'silent'
  };
});