# Project Stats Section

This section displays statistics about your projects and development experience.

## Features

- Displays multiple statistics in card format
- Uses the new `createRegisteredSection` pattern for less boilerplate
- Fully responsive layout
- Animated hover effects for cards
- Translation support

## Data Structure

```typescript
interface ProjectStat {
  label: string;  // Translation key reference for the stat label
  value: number;  // Numeric value to display
  icon: string;   // Icon identifier (mapped in component)
  unit?: string;  // Optional unit to display after value (%, +, etc.)
}

interface ProjectStatsData {
  stats: ProjectStat[];
  summary: string;
}
```

## Translation Keys

- `menu.projectStats` - Section title in the navigation
- `sections.projectStats.summary` - Summary text below stats
- `sections.projectStats.stats.{label}` - Individual stat labels

## Example Data

```typescript
{
  sectionName: 'projectStats',
  data: {
    stats: [
      { label: 'completedProjects', value: 25, icon: 'projects' },
      { label: 'linesOfCode', value: 50000, icon: 'code', unit: '+' },
      { label: 'teamMembers', value: 15, icon: 'users' },
      { label: 'technologies', value: 12, icon: 'devices' },
      { label: 'commits', value: 1200, icon: 'git', unit: '+' }
    ],
    summary: 'sections.projectStats.summary'
  }
}
```

## Usage Notes

This section uses the new `createRegisteredSection` pattern, which reduces boilerplate by combining component creation and registration into a single step.
