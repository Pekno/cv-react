/**
 * Tests for the SEO-metadata Vite plugin and the per-language HTML generation.
 *
 * After `npm run build:demo` the plugin produces:
 *  - dist/index.html          → root language-redirect page
 *  - dist/en/index.html       → English CV page
 *  - dist/fr/index.html       → French CV page
 *  - dist/robots.txt
 *  - dist/sitemap.xml
 *
 * These tests verify the structural correctness and the SEO content of every
 * generated file using the expected values from the example profile / locales.
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

// ---------------------------------------------------------------------------
// Expected values (derived from profile-data.example.ts + en/fr.example.ts)
// ---------------------------------------------------------------------------
const NAME = "Alex Morgan";
const SITE_URL = "https://alexmorgan.dev";
const THEME_COLOR = "#3f51b5";
const DEFAULT_LANG = "en";
const LANGUAGES = ["en", "fr"];

const EN = {
  lang: "en",
  locale: "en_US",
  jobTitle: "Software Engineer",
  highlight: "Full Stack",
  fullTitle: "Alex Morgan | Full Stack — Software Engineer",
  canonical: `${SITE_URL}/en`,
};

const FR = {
  lang: "fr",
  locale: "fr_FR",
  jobTitle: "Ingénieur Logiciel",
  highlight: "Full Stack",
  fullTitle: "Alex Morgan | Full Stack — Ingénieur Logiciel",
  canonical: `${SITE_URL}/fr`,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readHtml(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

function distPath(...segments: string[]): string {
  return path.join(DIST, ...segments);
}

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------

describe("Generated file existence", () => {
  it("dist/index.html (root redirect) exists", () => {
    expect(fs.existsSync(distPath("index.html"))).toBe(true);
  });

  it.each(LANGUAGES)("dist/%s/index.html exists", (lang) => {
    expect(fs.existsSync(distPath(lang, "index.html"))).toBe(true);
  });

  it("dist/robots.txt exists", () => {
    expect(fs.existsSync(distPath("robots.txt"))).toBe(true);
  });

  it("dist/sitemap.xml exists", () => {
    expect(fs.existsSync(distPath("sitemap.xml"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Root redirect page
// ---------------------------------------------------------------------------

describe("Root redirect page (dist/index.html)", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("index.html"));
  });

  it("contains a meta http-equiv refresh tag", () => {
    expect(html).toMatch(/<meta\s+http-equiv="refresh"/i);
  });

  it(`redirects to the default language /${DEFAULT_LANG}`, () => {
    expect(html).toContain(`url=/${DEFAULT_LANG}`);
  });

  it("contains a noindex robots meta tag", () => {
    expect(html).toMatch(/<meta\s+name="robots"\s+content="noindex"/i);
  });

  it("contains a JavaScript language-detection redirect", () => {
    expect(html).toContain("window.location.replace");
  });

  it("lists all supported languages in the JS redirect", () => {
    for (const lang of LANGUAGES) {
      expect(html).toContain(`'${lang}'`);
    }
  });
});

// ---------------------------------------------------------------------------
// English page — structural checks
// ---------------------------------------------------------------------------

describe("English page (dist/en/index.html)", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("en", "index.html"));
  });

  it(`has <html lang="${EN.lang}">`, () => {
    expect(html).toMatch(new RegExp(`<html[^>]*lang="${EN.lang}"`));
  });

  it("contains the correct <title>", () => {
    expect(html).toContain(`<title>${EN.fullTitle}</title>`);
  });

  it("has a non-empty meta description", () => {
    expect(html).toMatch(/<meta\s+name="description"\s+content=".{10,}"/i);
  });

  it("has meta keywords containing the author name", () => {
    expect(html).toMatch(/<meta\s+name="keywords"\s+content="[^"]*Alex Morgan[^"]*"/i);
  });

  it("has meta author", () => {
    expect(html).toMatch(new RegExp(`<meta[^>]*name="author"[^>]*content="${NAME}"`));
  });

  it("has robots index,follow", () => {
    expect(html).toMatch(/<meta\s+name="robots"\s+content="index, follow"/i);
  });

  it("has theme-color meta tag with the profile color", () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*name="theme-color"[^>]*content="${THEME_COLOR}"`)
    );
  });
});

// ---------------------------------------------------------------------------
// English page — Open Graph
// ---------------------------------------------------------------------------

describe("English page Open Graph tags", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("en", "index.html"));
  });

  it(`has og:locale = ${EN.locale}`, () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:locale"[^>]*content="${EN.locale}"`)
    );
  });

  it('has og:type = "profile"', () => {
    expect(html).toMatch(/<meta[^>]*property="og:type"[^>]*content="profile"/);
  });

  it("has og:title matching the full title", () => {
    const escaped = EN.fullTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:title"[^>]*content="${escaped}"`)
    );
  });

  it("has og:description", () => {
    expect(html).toMatch(/<meta[^>]*property="og:description"[^>]*content=".{10,}"/);
  });

  it(`has og:url = ${EN.canonical}`, () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:url"[^>]*content="${EN.canonical}"`)
    );
  });

  it("has og:site_name containing the author name", () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:site_name"[^>]*content="[^"]*${NAME}[^"]*"`)
    );
  });
});

// ---------------------------------------------------------------------------
// English page — Twitter Card
// ---------------------------------------------------------------------------

describe("English page Twitter Card tags", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("en", "index.html"));
  });

  it("has twitter:card meta tag", () => {
    expect(html).toMatch(/<meta[^>]*name="twitter:card"[^>]*content=".+"/);
  });

  it("has twitter:title matching the full title", () => {
    const escaped = EN.fullTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(html).toMatch(
      new RegExp(`<meta[^>]*name="twitter:title"[^>]*content="${escaped}"`)
    );
  });

  it("has twitter:description", () => {
    expect(html).toMatch(
      /<meta[^>]*name="twitter:description"[^>]*content=".{10,}"/
    );
  });
});

// ---------------------------------------------------------------------------
// English page — JSON-LD structured data
// ---------------------------------------------------------------------------

describe("English page JSON-LD structured data", () => {
  let html: string;
  let jsonLd: Record<string, unknown>;

  beforeAll(() => {
    html = readHtml(distPath("en", "index.html"));
    const match = html.match(
      /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/
    );
    if (match?.[1]) {
      jsonLd = JSON.parse(match[1]) as Record<string, unknown>;
    }
  });

  it("contains a JSON-LD script block", () => {
    expect(html).toContain('type="application/ld+json"');
  });

  it("JSON-LD is valid JSON", () => {
    expect(jsonLd).toBeDefined();
  });

  it('has @type = "Person"', () => {
    expect(jsonLd["@type"]).toBe("Person");
  });

  it("has @context = https://schema.org", () => {
    expect(jsonLd["@context"]).toBe("https://schema.org");
  });

  it(`has name = "${NAME}"`, () => {
    expect(jsonLd["name"]).toBe(NAME);
  });

  it("has a non-empty jobTitle", () => {
    expect(typeof jsonLd["jobTitle"]).toBe("string");
    expect((jsonLd["jobTitle"] as string).length).toBeGreaterThan(0);
  });

  it("has a non-empty description", () => {
    expect(typeof jsonLd["description"]).toBe("string");
    expect((jsonLd["description"] as string).length).toBeGreaterThan(0);
  });

  it(`has url = "${EN.canonical}"`, () => {
    expect(jsonLd["url"]).toBe(EN.canonical);
  });

  it("has sameAs social URLs array", () => {
    expect(Array.isArray(jsonLd["sameAs"])).toBe(true);
    expect((jsonLd["sameAs"] as string[]).length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// English page — hreflang links
// ---------------------------------------------------------------------------

describe("English page hreflang alternate links", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("en", "index.html"));
  });

  it.each(LANGUAGES)(`has hreflang="%s" link`, (lang) => {
    expect(html).toMatch(
      new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${lang}"`)
    );
  });

  it("has hreflang=x-default link", () => {
    expect(html).toMatch(
      /<link[^>]*rel="alternate"[^>]*hreflang="x-default"/
    );
  });

  it(`has canonical link pointing to ${EN.canonical}`, () => {
    expect(html).toMatch(
      new RegExp(`<link[^>]*rel="canonical"[^>]*href="${EN.canonical}"`)
    );
  });
});

// ---------------------------------------------------------------------------
// French page — language-specific checks
// ---------------------------------------------------------------------------

describe("French page (dist/fr/index.html)", () => {
  let html: string;

  beforeAll(() => {
    html = readHtml(distPath("fr", "index.html"));
  });

  it(`has <html lang="${FR.lang}">`, () => {
    expect(html).toMatch(new RegExp(`<html[^>]*lang="${FR.lang}"`));
  });

  it("contains the correct French <title>", () => {
    expect(html).toContain(`<title>${FR.fullTitle}</title>`);
  });

  it(`has og:locale = ${FR.locale}`, () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:locale"[^>]*content="${FR.locale}"`)
    );
  });

  it(`has og:url = ${FR.canonical}`, () => {
    expect(html).toMatch(
      new RegExp(`<meta[^>]*property="og:url"[^>]*content="${FR.canonical}"`)
    );
  });

  it(`has canonical link = ${FR.canonical}`, () => {
    expect(html).toMatch(
      new RegExp(`<link[^>]*rel="canonical"[^>]*href="${FR.canonical}"`)
    );
  });

  it("has french meta description (non-empty)", () => {
    expect(html).toMatch(/<meta\s+name="description"\s+content=".{10,}"/i);
  });

  it("JSON-LD uses French job title", () => {
    const match = html.match(
      /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/
    );
    expect(match).not.toBeNull();
    const jsonLd = JSON.parse(match![1]!) as Record<string, unknown>;
    expect(jsonLd["jobTitle"]).toContain(FR.jobTitle);
  });
});

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------

describe("robots.txt", () => {
  let content: string;

  beforeAll(() => {
    content = fs.readFileSync(distPath("robots.txt"), "utf-8");
  });

  it("contains User-agent: *", () => {
    expect(content).toContain("User-agent: *");
  });

  it("contains Allow: /", () => {
    expect(content).toContain("Allow: /");
  });

  it(`contains a Sitemap reference to ${SITE_URL}`, () => {
    expect(content).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------

describe("sitemap.xml", () => {
  let content: string;

  beforeAll(() => {
    content = fs.readFileSync(distPath("sitemap.xml"), "utf-8");
  });

  it("is valid XML (starts with <?xml)", () => {
    expect(content.trim()).toMatch(/^<\?xml/);
  });

  it("uses the sitemaps.org schema namespace", () => {
    expect(content).toContain("http://www.sitemaps.org/schemas/sitemap/0.9");
  });

  it.each(LANGUAGES)(`contains a <loc> entry for /${"%s"}`, (lang) => {
    expect(content).toContain(`<loc>${SITE_URL}/${lang}</loc>`);
  });

  it.each(LANGUAGES)(`contains hreflang alternate for "%s"`, (lang) => {
    expect(content).toMatch(
      new RegExp(`hreflang="${lang}"\\s+href="${SITE_URL}/${lang}"`)
    );
  });

  it("contains hreflang x-default alternate", () => {
    expect(content).toMatch(/hreflang="x-default"/);
  });

  it("contains a lastmod date", () => {
    expect(content).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  });
});
