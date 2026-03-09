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
 * Escapes HTML special characters for safe injection into attributes.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Resolves the first profile picture to a source file path.
 */
function resolveProfilePicturePath(
  profileData: PluginProfileData,
  profilePath: string
): string | null {
  const firstPicture = profileData.meta.profilePictures?.[0];
  if (!firstPicture) return null;

  const profileDir = path.dirname(profilePath);
  const relativeToFile = path.resolve(profileDir, firstPicture);
  if (fs.existsSync(relativeToFile)) return relativeToFile;

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
    jsonLd["image"] = `${siteUrl.replace(/\/[a-z]{2}\/?$/, "")}/${OG_IMAGE_FILENAME}`;
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

interface SeoValues {
  name: string;
  fullTitle: string;
  description: string;
  keywords: string;
  themeColor: string;
  socialUrls: string[];
  locale: string;
  jobTitle: string;
  imageAlt: string;
  cleanSummary: string;
}

/**
 * Extracts SEO values from profile data and translations.
 */
function extractSeoValues(
  profileData: PluginProfileData,
  translations: PluginTranslations,
  lang: string
): SeoValues {
  const name = profileData.meta.name;
  const themeColor = profileData.theme?.primaryColor ?? "#2b689c";
  const socials = profileData.meta.socials ?? [];
  const socialUrls = socials.map((s) => s.url);
  const locale = langToLocale(lang);

  const jobTitle = translations.sections?.about?.jobTitle ?? "";
  const jobTitleHighlight =
    translations.sections?.about?.jobTitleHighlight ?? "";
  const rawSummary = translations.sections?.about?.summary ?? "";
  const menuItems = Object.values(translations.menu ?? {}).filter(Boolean);

  const fullTitle = jobTitleHighlight
    ? `${name} | ${jobTitleHighlight} — ${jobTitle}`
    : `${name} | ${jobTitle}`;

  const fullJobTitle = jobTitleHighlight
    ? `${jobTitleHighlight} — ${jobTitle}`
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
 * Replaces all language-specific SEO tags in an HTML string.
 */
function replaceLanguageSeo(
  html: string,
  lang: string,
  seo: SeoValues,
  baseUrl: string | undefined,
  _hasImage: boolean
): string {
  const escaped = {
    fullTitle: escapeHtml(seo.fullTitle),
    description: escapeHtml(seo.description),
    keywords: escapeHtml(seo.keywords),
  };

  // Replace html lang attribute
  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escaped.fullTitle}</title>`);

  // Replace inline meta tags
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escaped.description}" />`
  );
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
    `<meta name="keywords" content="${escaped.keywords}" />`
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale" content="${seo.locale}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escaped.fullTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escaped.description}" />`
  );

  // Replace URL-dependent tags
  if (baseUrl) {
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${baseUrl}/${lang}" />`
    );
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${baseUrl}/${lang}" />`
    );
  }

  // Replace Twitter Card tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escaped.fullTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escaped.description}" />`
  );

  // Replace JSON-LD structured data
  const jsonLd = buildJsonLd(
    seo.name,
    seo.jobTitle,
    seo.cleanSummary,
    baseUrl ? `${baseUrl}/${lang}` : undefined,
    seo.socialUrls
  );
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`
  );

  return html;
}

/**
 * Generates hreflang link tags for all languages.
 */
function buildHreflangTags(
  allLangs: string[],
  defaultLang: string,
  baseUrl: string
): string {
  const links = allLangs.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}" />`
  );
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/${defaultLang}" />`
  );
  return links.join("\n    ");
}

/**
 * Generates a root redirect page that sends users to their preferred language.
 */
function generateRedirectPage(
  defaultLang: string,
  allLangs: string[],
  baseUrl: string | undefined
): string {
  const langList = allLangs.map((l) => `'${l}'`).join(", ");
  const canonicalUrl = baseUrl
    ? `${baseUrl}/${defaultLang}`
    : `/${defaultLang}`;

  const hreflangTags = baseUrl
    ? `\n    ${buildHreflangTags(allLangs, defaultLang, baseUrl)}`
    : "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0;url=/${defaultLang}" />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${canonicalUrl}" />${hreflangTags}
    <title>Redirecting...</title>
    <script>
      (function() {
        var supported = [${langList}];
        var stored = localStorage.getItem('i18nextLng');
        var lang = stored && supported.indexOf(stored) !== -1 ? stored : '${defaultLang}';
        window.location.replace('/' + lang + window.location.hash);
      })();
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="/${defaultLang}">/${defaultLang}</a>...</p>
  </body>
</html>`;
}

/**
 * Generates a robots.txt file content.
 */
function generateRobotsTxt(baseUrl: string | undefined): string {
  const lines = ["User-agent: *", "Allow: /"];
  if (baseUrl) {
    lines.push("", `Sitemap: ${baseUrl}/sitemap.xml`);
  }
  return lines.join("\n") + "\n";
}

/**
 * Generates a sitemap.xml with all language URLs and alternate links.
 */
function generateSitemapXml(
  baseUrl: string,
  allLangs: string[],
  defaultLang: string
): string {
  const today = new Date().toISOString().split("T")[0];

  const urls = allLangs.map((lang) => {
    const alternates = allLangs
      .map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}" />`
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/${defaultLang}" />`
      )
      .join("\n");

    return `  <url>
    <loc>${baseUrl}/${lang}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

/**
 * Discovers and loads all translation files from the locales directory.
 */
async function loadAllTranslations(
  localesDir: string,
  isDemo: boolean
): Promise<Map<string, PluginTranslations>> {
  const translations = new Map<string, PluginTranslations>();
  const files = fs.readdirSync(localesDir);

  for (const file of files) {
    const isExample = file.includes(".example.");

    // In demo mode, only load .example files; otherwise, skip them
    if ((isDemo && !isExample) || (!isDemo && isExample)) continue;

    // Extract language code from filename
    const match = file
      .replace(".example", "")
      .match(/^(.+)\.(ts|js|json)$/);

    if (match?.[1]) {
      const lang = match[1];
      const filePath = path.join(localesDir, file);
      try {
        const t = await loadTranslations(filePath);
        translations.set(lang, t);
      } catch (err) {
        const error = err as Error;
        logger.error(`Failed to load translations for "${lang}": ${error.message}`);
      }
    }
  }

  return translations;
}

/**
 * Vite plugin that generates SEO metadata from profile data and translations,
 * injecting it into index.html at build time via the transformIndexHtml hook.
 *
 * In production builds, it also generates per-language HTML files in subdirectories
 * (e.g., dist/en/index.html, dist/fr/index.html) with language-specific SEO tags,
 * hreflang alternate links, and a root redirect page.
 */
export default function seoMetadataPlugin(
  options: SeoMetadataOptions
): Plugin {
  const { profilePath, localesDir, isDemo = false } = options;

  let baseUrl: string | undefined;
  let profilePictureSrcPath: string | null = null;
  let cachedProfileData: PluginProfileData;
  let allTranslationsMap: Map<string, PluginTranslations>;
  let allLangs: string[];

  /**
   * Resolves the translation file path based on a language code.
   */
  function resolveTranslationPath(lang: string): string {
    const suffix = isDemo ? ".example" : "";
    return path.join(localesDir, `${lang}${suffix}.ts`);
  }

  return {
    name: "vite-plugin-seo-metadata",

    async buildStart(): Promise<void> {
      try {
        cachedProfileData = await loadProfileData(profilePath);

        baseUrl = cachedProfileData.meta.siteUrl?.replace(/\/+$/, "");

        if (baseUrl) {
          profilePictureSrcPath = resolveProfilePicturePath(
            cachedProfileData,
            profilePath
          );
        }

        // Load translations for all available languages
        allTranslationsMap = await loadAllTranslations(localesDir, isDemo);
        allLangs = Array.from(allTranslationsMap.keys());

        logger.info(`Loaded translations for: ${allLangs.join(", ")}`);
      } catch (err) {
        const error = err as Error;
        logger.error(`Error during buildStart: ${error.message}`);
      }
    },

    // Copy profile picture and generate per-language HTML files
    writeBundle(outputOptions): void {
      const outDir = outputOptions.dir ?? path.resolve("dist");

      // Copy profile picture to dist output
      if (profilePictureSrcPath && baseUrl) {
        try {
          const destPath = path.join(outDir, OG_IMAGE_FILENAME);
          fs.copyFileSync(profilePictureSrcPath, destPath);
          logger.info(`Copied profile picture to ${OG_IMAGE_FILENAME}`);
        } catch (err) {
          const error = err as Error;
          logger.error(`Error copying profile picture: ${error.message}`);
        }
      }

      // Generate per-language HTML files (production build only)
      if (!allLangs || allLangs.length === 0) return;

      const defaultLang = cachedProfileData.meta.defaultLang ?? "en";
      const hasImage = !!baseUrl && !!profilePictureSrcPath;
      const builtHtmlPath = path.join(outDir, "index.html");

      if (!fs.existsSync(builtHtmlPath)) {
        logger.error("Built index.html not found, skipping language page generation");
        return;
      }

      const builtHtml = fs.readFileSync(builtHtmlPath, "utf-8");

      // Generate a page for each language
      for (const lang of allLangs) {
        const translations = allTranslationsMap.get(lang);
        if (!translations) continue;

        const seo = extractSeoValues(cachedProfileData, translations, lang);

        // Start from the built HTML and replace language-specific content
        let langHtml = replaceLanguageSeo(builtHtml, lang, seo, baseUrl, hasImage);

        // Add hreflang alternate links
        if (baseUrl) {
          const hreflangTags = buildHreflangTags(allLangs, defaultLang, baseUrl);
          langHtml = langHtml.replace("</head>", `    ${hreflangTags}\n  </head>`);
        }

        // Write to {outDir}/{lang}/index.html
        const langDir = path.join(outDir, lang);
        fs.mkdirSync(langDir, { recursive: true });
        fs.writeFileSync(path.join(langDir, "index.html"), langHtml);
        logger.info(`Generated ${lang}/index.html`);
      }

      // Generate robots.txt
      const robotsTxt = generateRobotsTxt(baseUrl);
      fs.writeFileSync(path.join(outDir, "robots.txt"), robotsTxt);
      logger.info("Generated robots.txt");

      // Generate sitemap.xml (only if baseUrl is set)
      if (baseUrl) {
        const sitemapXml = generateSitemapXml(baseUrl, allLangs, defaultLang);
        fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml);
        logger.info("Generated sitemap.xml");
      }

      // Replace root index.html with redirect page
      const redirectHtml = generateRedirectPage(defaultLang, allLangs, baseUrl);
      fs.writeFileSync(builtHtmlPath, redirectHtml);
      logger.info("Generated root redirect page");
    },

    transformIndexHtml: {
      order: "pre",

      async handler(html): Promise<{
        html: string;
        tags: HtmlTagDescriptor[];
      }> {
        try {
          const profileData = cachedProfileData ?? await loadProfileData(profilePath);
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
            // Twitter Card
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

          // URL-dependent tags
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
