import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Import our custom plugins
import usedSectionsPlugin from "./plugins/vite-plugin-used-sections";
import dynamicFavicon from "./plugins/vite-plugin-dynamic-favicon";

// Get proper __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Check if we're running in demo mode
  const isDemo = mode === "demo";

  // Define paths to profile data files
  const mainProfilePath = resolve(__dirname, "./src/data/profile-data.ts");
  const exampleProfilePath = resolve(
    __dirname,
    "./src/data/profile-data.example.ts"
  );

  // Determine which profile data file to use for the current build
  const activeProfilePath = isDemo ? exampleProfilePath : mainProfilePath;

  return {
    plugins: [
      // Used sections plugin gets all profile paths to analyze
      usedSectionsPlugin({
        profilePath: activeProfilePath,
      }),
      // Dynamic favicon plugin gets only the active profile path
      dynamicFavicon({
        profilePath: activeProfilePath,
        templatePath: resolve(
          __dirname,
          "./src/assets/static/favicon-template.svg"
        ),
        outputPath: "favicon.svg",
      }),

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
      // Ensure assets are properly processed and included in the build
      assetsDir: "assets",
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
    logLevel: "info", // 'info' | 'warn' | 'error' | 'silent'
  };
});
