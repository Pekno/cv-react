// plugins/load-profile-data.ts
import esbuild, { Plugin as EsbuildPlugin } from "esbuild";
import fs from "fs";
import path from "path";

/** File extensions considered as assets (images, fonts, etc.) */
const ASSET_EXTENSIONS =
  /\.(png|jpe?g|webp|svg|gif|ico|bmp|tiff?|avif|woff2?|ttf|eot|otf|pdf)$/;

/**
 * esbuild plugin that stubs out asset imports (images, fonts, etc.)
 * so the profile-data module can be evaluated without needing actual files.
 * Returns the original import path as the value so plugins can use it if needed.
 */
function stubAssetsPlugin(): EsbuildPlugin {
  return {
    name: "stub-assets",
    setup(build) {
      build.onResolve({ filter: ASSET_EXTENSIONS }, (args) => ({
        path: args.path,
        namespace: "stub-asset",
      }));

      build.onLoad({ filter: /.*/, namespace: "stub-asset" }, (args) => ({
        contents: `module.exports = ${JSON.stringify(args.path)};`,
        loader: "js",
      }));
    },
  };
}

/**
 * Minimal shape of the profile data needed by build plugins.
 * We don't import the full ProfileData type to avoid coupling plugins
 * to the app's type system (which can include declaration-merged interfaces
 * that aren't available at plugin build time).
 */
export interface PluginProfileData {
  meta: {
    name: string;
    defaultLang?: string;
    siteUrl?: string;
    profilePictures?: string[];
    socials?: Array<{ type: string; url: string }>;
    [key: string]: unknown;
  };
  theme?: {
    primaryColor: string;
    accentColor?: string;
  };
  sections: Array<{
    sectionName: string;
    data: unknown;
  }>;
}

/**
 * Minimal shape of a translation file needed by build plugins.
 */
export interface PluginTranslations {
  menu?: Record<string, string>;
  sections?: {
    about?: {
      jobTitle?: string;
      jobTitleHighlight?: string;
      summary?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Bundles and evaluates a TypeScript file at build time using esbuild.
 * Returns the module's exports as a plain object.
 */
async function bundleAndEvaluate(
  filePath: string
): Promise<Record<string, unknown>> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at ${filePath}`);
  }

  const result = await esbuild.build({
    entryPoints: [filePath],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    plugins: [stubAssetsPlugin()],
  });

  const outputFile = result.outputFiles?.[0];
  if (!outputFile) {
    throw new Error(`esbuild produced no output for ${path.basename(filePath)}`);
  }

  const code = outputFile.text;
  const moduleObj: { exports: Record<string, unknown> } = { exports: {} };
  const fn = new Function("module", "exports", "require", code);
  fn(moduleObj, moduleObj.exports, require);

  return moduleObj.exports;
}

/**
 * Loads and evaluates a profile-data TypeScript file at build time using esbuild.
 * Returns the actual ProfileData object instead of relying on fragile regex parsing.
 */
export async function loadProfileData(
  profilePath: string
): Promise<PluginProfileData> {
  const exports = await bundleAndEvaluate(profilePath);

  const profileData = (exports["profileData"] ??
    exports["default"]) as PluginProfileData | undefined;

  if (!profileData) {
    throw new Error(
      "Could not find 'profileData' or default export in the profile data file"
    );
  }

  return profileData;
}

/**
 * Loads and evaluates a translation TypeScript file at build time using esbuild.
 * Returns the translation object.
 */
export async function loadTranslations(
  translationPath: string
): Promise<PluginTranslations> {
  const exports = await bundleAndEvaluate(translationPath);

  const translations = (exports["default"] ??
    Object.values(exports)[0]) as PluginTranslations | undefined;

  if (!translations) {
    throw new Error(
      "Could not find default export in the translation file"
    );
  }

  return translations;
}
