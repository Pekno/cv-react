#!/usr/bin/env node
// CV React — Fork Setup
// Run after forking: node scripts/setup-fork.js (or: npm run setup)
//
// This script:
//   1. Copies *.example.ts files to their real names (skips if already present)
//   2. Patches .gitignore so your personal data files CAN be committed to your fork
//   3. Removes test files and test scripts (not needed in a fork deployment)

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const COPIES = [
  ['src/data/profile-data.example.ts', 'src/data/profile-data.ts'],
  ['src/i18n/locales/en.example.ts', 'src/i18n/locales/en.ts'],
  ['src/i18n/locales/fr.example.ts', 'src/i18n/locales/fr.ts'],
]

// Lines in .gitignore that block committing personal data — remove them for forks
const GITIGNORE_LINES_TO_REMOVE = [
  '/src/data/*',
  '!/src/data/*.example.ts',
  '/src/i18n/locales/*',
  '!/src/i18n/locales/*.example.ts',
  '/src/assets/profiles/*',
  '!/src/assets/profiles/default.jpg',
  '/src/assets/companies/*',
  '!/src/assets/companies/.gitkeep',
  '/src/assets/hobbies/*',
  '!/src/assets/hobbies/.gitkeep',
  '/src/assets/projects/*',
  '!/src/assets/projects/.gitkeep',
  '/public/pdf/*',
  '!/public/pdf/.gitkeep',
  '/public/favicon.ico',
  '/public/favicon-*.png',
  '/public/apple-touch-icon.png',
  '/public/android-chrome-*.png',
  '/public/site.webmanifest',
]

// Files and dirs to delete from the fork
const PATHS_TO_DELETE = [
  'tests',
  'vitest.config.ts',
  '.github/workflows',
  '.github/screenshots',
]

// package.json scripts to remove from the fork
const PACKAGE_SCRIPTS_TO_REMOVE = ['test', 'test:watch']

const green = (s) => `\x1b[32m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

console.log(`\n  ${bold('CV React — Fork Setup')}\n`)

// 1. Copy example files
console.log(`  ${bold('Copying example files...')}\n`)
for (const [src, dest] of COPIES) {
  const srcPath = path.join(root, src)
  const destPath = path.join(root, dest)
  if (fs.existsSync(destPath)) {
    console.log(`  ${yellow('~')} ${dest} ${dim('(already exists, skipped)')}`)
  } else if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`  ${green('+')} ${dest} ${dim('(copied from example)')}`)
  } else {
    console.log(`  ${yellow('!')} ${src} ${dim('(source not found, skipped)')}`)
  }
}

// 2. Patch .gitignore
console.log(`\n  ${bold('Patching .gitignore...')}\n`)
const gitignorePath = path.join(root, '.gitignore')
let content = fs.readFileSync(gitignorePath, 'utf8')
const original = content

const toRemoveSet = new Set(GITIGNORE_LINES_TO_REMOVE.map((l) => l.trim()))
const lines = content.split('\n')
const kept = []
let removedCount = 0

for (const line of lines) {
  if (toRemoveSet.has(line.trim())) {
    removedCount++
  } else {
    kept.push(line)
  }
}

// Remove the now-orphaned comments
content = kept
  .join('\n')
  .replace(/# Ignore content of asset directories but keep their structure\r?\n/g, '')
  .replace(/# Ignore actual data files but keep examples\r?\n/g, '')
  .replace(/# Ignore actual translation files but keep examples\r?\n?/g, '')
  // Collapse 3+ blank lines into 2
  .replace(/(\r?\n){3,}/g, '\n\n')

if (content !== original) {
  fs.writeFileSync(gitignorePath, content, 'utf8')
  console.log(`  ${green('✓')} Removed ${removedCount} restrictive line(s) from .gitignore`)
  console.log(
    `  ${dim('Your data, translation, and asset files can now be committed.')}`
  )
} else {
  console.log(`  ${yellow('~')} .gitignore already clean, nothing to remove`)
}

// 3. Remove unneeded files
console.log(`\n  ${bold('Removing unneeded files...')}\n`)
for (const rel of PATHS_TO_DELETE) {
  const target = path.join(root, rel)
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true })
    console.log(`  ${green('-')} ${rel}`)
  } else {
    console.log(`  ${yellow('~')} ${rel} ${dim('(not found, skipped)')}`)
  }
}

// Remove .github/ entirely if it is now empty
const githubDir = path.join(root, '.github')
if (fs.existsSync(githubDir)) {
  const remaining = fs.readdirSync(githubDir)
  if (remaining.length === 0) {
    fs.rmSync(githubDir, { recursive: true, force: true })
    console.log(`  ${green('-')} .github ${dim('(now empty, removed)')}`)
  }
}

// 4. Patch package.json: remove test scripts, reset version
console.log(`\n  ${bold('Patching package.json...')}\n`)
const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
let pkgChanged = false

for (const script of PACKAGE_SCRIPTS_TO_REMOVE) {
  if (pkg.scripts && script in pkg.scripts) {
    delete pkg.scripts[script]
    console.log(`  ${green('-')} scripts.${script}`)
    pkgChanged = true
  }
}

if (pkg.version !== '1.0.0') {
  pkg.version = '1.0.0'
  console.log(`  ${green('✓')} version → 1.0.0`)
  pkgChanged = true
}

if (pkgChanged) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
} else {
  console.log(`  ${yellow('~')} nothing to change`)
}

console.log(`\n  ${bold(green('Done!'))} Next steps:\n`)
console.log(`  1. Edit ${bold('src/data/profile-data.ts')} with your information`)
console.log(`  2. Edit ${bold('src/i18n/locales/en.ts')} and ${bold('fr.ts')} with your translations`)
console.log(`  3. Add your images to ${bold('src/assets/')} subfolders`)
console.log(`  4. git add . && git commit -m "my cv data" && git push`)
console.log(`  5. Connect the repo to Netlify or Vercel and deploy\n`)
