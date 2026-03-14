/**
 * Global setup for build output integration tests.
 *
 * 1. Creates a temporary `src/data/profile-data.ts` stub (re-exporting from
 *    the example file) so Vite can resolve the module even without a real
 *    profile file being committed to the repository.
 * 2. Runs `npm run build:demo:notypecheck` to produce the dist/ artefacts.
 * 3. Removes the stub afterwards if it was not already present.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STUB_PATH = path.join(ROOT, "src/data/profile-data.ts");

// Content of the temporary stub — just re-exports the example data so that
// the Vite bundler can resolve the import even in demo mode.
const STUB_CONTENT = `// Auto-generated stub — created by the test setup, do not commit.
import profileData from "./profile-data.example";
export default profileData;
export { profileData };
`;

export default function setup(): void {
  const stubCreated = !fs.existsSync(STUB_PATH);

  if (stubCreated) {
    console.log(
      "\n[test-setup] profile-data.ts not found — creating a temporary stub…"
    );
    fs.writeFileSync(STUB_PATH, STUB_CONTENT, "utf-8");
  }

  try {
    console.log("[test-setup] Running demo build (build:demo:notypecheck)…");

    execSync("npm run build:demo:notypecheck", {
      cwd: ROOT,
      stdio: "inherit",
      timeout: 180_000,
    });

    console.log("[test-setup] Build completed.\n");
  } finally {
    if (stubCreated && fs.existsSync(STUB_PATH)) {
      fs.unlinkSync(STUB_PATH);
      console.log("[test-setup] Removed temporary profile-data.ts stub.\n");
    }
  }
}
