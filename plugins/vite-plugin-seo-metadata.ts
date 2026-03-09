// plugins/vite-plugin-seo-metadata.ts
import { Plugin, HtmlTagDescriptor } from "vite";
import fs from "fs";
import path from "path";
import {
  loadProfileData,
  loadTranslations,
  PluginProfileData,
  PluginTranslations,
} from "./load-profile-data";

interface SeoMetadataOptions {
  /**
   * Path to profile data file
   */
  profilePath: string;

  /**
   * Directory containing translation files (e.g. "src/i18n/locales").
   * The plugin reads `defaultLang` from profile data and loads the matching file.
   */
  localesDir: string;

  /**
   * Whether to use .example translation files (demo mode).
   */
  isDemo?: boolean;
}

const OG_IMAGE_FILENAME = "og-image.jpg";

const prefix = "[seo-metadata-plugin]";

const logger = {
  info(msg: string): void {
    console.log(`\x1b[36m${prefix}\x1b[0m ${msg}`);
  },
  error(msg: string): void {
    console.error(`\x1b[31m${prefix}\x1b[0m ${msg}`);
  },
};

/**
 * Truncates text to a maximum length at a word boundary.
 */
function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

/**
 * Strips extra whitespace, zero-width spaces, and collapses to single spaces.
 */
function sanitizeText(text: string): string {
  return text
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, "") // zero-width chars
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resolves the first profile picture to a source file path.
 * Profile pictures are imported as ES modules (e.g. `import pp from "../assets/profiles/pp.jpg"`),
 * so after esbuild evaluation with the stub plugin, their value is the original relative import path.
 * This function resolves that relative path against the profile-data file's directory.
 */
function resolveProfilePicturePath(
  profileData: PluginProfileData,
  profilePath: string
): string | null {
  const firstPicture = profileData.meta.profilePictures?.[0];
  if (!firstPicture) return null;

  // Try resolving relative to the profile-data file (for ES module imports
  // processed by the stub plugin, e.g. "../assets/profiles/pp.jpg")
  const profileDir = path.dirname(profilePath);
  const relativeToFile = path.resolve(profileDir, firstPicture);
  if (fs.existsSync(relativeToFile)) return relativeToFile;

  // Try resolving relative to the project root (for string literal paths
  // like "./src/assets/profiles/default.jpg" in example data)
  const relativeToRoot = path.resolve(firstPicture);
  if (fs.existsSync(relativeToRoot)) return relativeToRoot;

  logger.error(`Profile picture not found: ${firstPicture}`);
  return null;
}

/**
 * Builds the JSON-LD structured data for a Person.
 */
function buildJsonLd(
  name: string,
  jobTitle: string,
  description: string,
  siteUrl: string | undefined,
  socialUrls: string[]
): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
  };

  if (siteUrl) {
    jsonLd["url"] = siteUrl;
    jsonLd["image"] = `${siteUrl}/${OG_IMAGE_FILENAME}`;
  }

  if (socialUrls.length > 0) {
    jsonLd["sameAs"] = socialUrls;
  }

  return jsonLd;
}

/**
 * Maps a language code (e.g. "fr") to a full locale (e.g. "fr_FR").
 */
const LANG_TO_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  it: "it_IT",
  pt: "pt_PT",
  nl: "nl_NL",
  ja: "ja_JP",
  zh: "zh_CN",
  ko: "ko_KR",
};

function langToLocale(lang: string): string {
  return LANG_TO_LOCALE[lang] ?? `${lang}_${lang.toUpperCase()}`;
}

/**
 * Extracts SEO values from profile data and translations.
 */
function extractSeoValues(
  profileData: PluginProfileData,
  translations: PluginTranslations,
  defaultLang: string
) {
  const name = profileData.meta.name;
  const themeColor = profileData.theme?.primaryColor ?? "#2b689c";
  const socials = profileData.meta.socials ?? [];
  const socialUrls = socials.map((s) => s.url);
  const locale = langToLocale(defaultLang);

  const jobTitle = translations.sections?.about?.jobTitle ?? "";
  const jobTitleHighlight =
    translations.sections?.about?.jobTitleHighlight ?? "";
  const rawSummary = translations.sections?.about?.summary ?? "";
  const menuItems = Object.values(translations.menu ?? {}).filter(Boolean);

  const fullTitle = jobTitleHighlight
    ? `${name} | ${jobTitleHighlight} ${jobTitle}`
    : `${name} | ${jobTitle}`;

  const fullJobTitle = jobTitleHighlight
    ? `${jobTitleHighlight} ${jobTitle}`
    : jobTitle;

  const cleanSummary = sanitizeText(rawSummary);
  const description = truncate(cleanSummary, 160);
  const keywords = [name, jobTitle, jobTitleHighlight, ...menuItems]
    .filter(Boolean)
    .join(", ");

  return {
    name,
    fullTitle,
    description,
    keywords,
    themeColor,
    socialUrls,
    locale,
    jobTitle: fullJobTitle,
    imageAlt: `${name} - ${fullJobTitle}`,
    cleanSummary,
  };
}

/**
 * Vite plugin that generates SEO metadata from profile data and translations,
 * injecting it into index.html at build time via the transformIndexHtml hook.
 */
export default function seoMetadataPlugin(
  options: SeoMetadataOptions
): Plugin {
  const { profilePath, localesDir, isDemo = false } = options;

  let baseUrl: string | undefined;
  let profilePictureSrcPath: string | null = null;

  /**
   * Resolves the translation file path based on defaultLang from profile data.
   */
  function resolveTranslationPath(defaultLang: string): string {
    const suffix = isDemo ? ".example" : "";
    return path.join(localesDir, `${defaultLang}${suffix}.ts`);
  }

  return {
    name: "vite-plugin-seo-metadata",

    // Resolve siteUrl and profile picture path from profile data
    async buildStart(): Promise<void> {
      try {
        const profileData = await loadProfileData(profilePath);

        // Read siteUrl from profile data, clean trailing slash
        baseUrl = profileData.meta.siteUrl?.replace(/\/+$/, "");

        if (baseUrl) {
          profilePictureSrcPath = resolveProfilePicturePath(
            profileData,
            profilePath
          );
        }
      } catch (err) {
        const error = err as Error;
        logger.error(
          `Error during buildStart: ${error.message}`
        );
      }
    },

    // Copy profile picture to dist output after bundle is written
    writeBundle(outputOptions): void {
      if (!profilePictureSrcPath || !baseUrl) return;

      try {
        const outDir = outputOptions.dir ?? path.resolve("dist");
        const destPath = path.join(outDir, OG_IMAGE_FILENAME);
        fs.copyFileSync(profilePictureSrcPath, destPath);
        logger.info(`Copied profile picture to ${OG_IMAGE_FILENAME}`);
      } catch (err) {
        const error = err as Error;
        logger.error(
          `Error copying profile picture: ${error.message}`
        );
      }
    },

    transformIndexHtml: {
      order: "pre",

      async handler(html): Promise<{
        html: string;
        tags: HtmlTagDescriptor[];
      }> {
        try {
          const profileData = await loadProfileData(profilePath);
          const defaultLang = profileData.meta.defaultLang ?? "en";
          const translationPath = resolveTranslationPath(defaultLang);
          const translations = await loadTranslations(translationPath);

          const seo = extractSeoValues(profileData, translations, defaultLang);
          const hasImage = !!baseUrl && !!profilePictureSrcPath;
          const ogImageUrl = hasImage
            ? `${baseUrl}/${OG_IMAGE_FILENAME}`
            : undefined;

          logger.info(`Using defaultLang: "${defaultLang}" (${seo.locale})`);
          logger.info(`Title: "${seo.fullTitle}"`);
          logger.info(
            `Description: "${seo.description.slice(0, 80)}..."`
          );

          // Replace existing hardcoded tags in the HTML
          let transformedHtml = html
            .replace(
              /<html\s+lang="[^"]*"/,
              `<html lang="${defaultLang}"`
            )
            .replace(
              /<title>.*?<\/title>/,
              `<title>${seo.fullTitle}</title>`
            )
            .replace(
              /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
              `<meta name="description" content="${seo.description}" />`
            )
            .replace(
              /<meta\s+name="theme-color"\s+content="[^"]*"\s*\/?>/,
              `<meta name="theme-color" content="${seo.themeColor}" />`
            );

          // Build new tags to inject
          const tags: HtmlTagDescriptor[] = [
            // General meta
            {
              tag: "meta",
              attrs: { name: "robots", content: "index, follow" },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "author", content: seo.name },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "keywords", content: seo.keywords },
              injectTo: "head",
            },
            // Open Graph
            {
              tag: "meta",
              attrs: { property: "og:locale", content: seo.locale },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { property: "og:type", content: "profile" },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { property: "og:title", content: seo.fullTitle },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: {
                property: "og:description",
                content: seo.description,
              },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: {
                property: "og:site_name",
                content: `${seo.name} - Portfolio`,
              },
              injectTo: "head",
            },
            // Twitter Card (summary_large_image when we have an image, summary otherwise)
            {
              tag: "meta",
              attrs: {
                name: "twitter:card",
                content: hasImage ? "summary_large_image" : "summary",
              },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "twitter:title", content: seo.fullTitle },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: {
                name: "twitter:description",
                content: seo.description,
              },
              injectTo: "head",
            },
          ];

          // URL-dependent tags (only if siteUrl is provided)
          if (baseUrl) {
            tags.push(
              {
                tag: "meta",
                attrs: { property: "og:url", content: baseUrl },
                injectTo: "head",
              },
              {
                tag: "link",
                attrs: { rel: "canonical", href: baseUrl },
                injectTo: "head",
              }
            );

            // og:image + alt from profile picture
            if (ogImageUrl) {
              tags.push(
                {
                  tag: "meta",
                  attrs: { property: "og:image", content: ogImageUrl },
                  injectTo: "head",
                },
                {
                  tag: "meta",
                  attrs: {
                    property: "og:image:alt",
                    content: seo.imageAlt,
                  },
                  injectTo: "head",
                },
                {
                  tag: "meta",
                  attrs: { name: "twitter:image", content: ogImageUrl },
                  injectTo: "head",
                }
              );
            }
          }

          // og:see_also for social profiles
          for (const url of seo.socialUrls) {
            tags.push({
              tag: "meta",
              attrs: { property: "og:see_also", content: url },
              injectTo: "head",
            });
          }

          // JSON-LD structured data
          const jsonLd = buildJsonLd(
            seo.name,
            seo.jobTitle,
            seo.cleanSummary,
            baseUrl,
            seo.socialUrls
          );

          tags.push({
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: JSON.stringify(jsonLd, null, 2),
            injectTo: "head",
          });

          logger.info("Injected SEO metadata into index.html");

          return { html: transformedHtml, tags };
        } catch (err) {
          const error = err as Error;
          logger.error(
            `Error generating SEO metadata: ${error.message}`
          );
          return { html, tags: [] };
        }
      },
    },
  };
}
