import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // Check if we're running in demo mode
  const isDemo = mode === "demo";

  return {
    plugins: [
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
  };
});
