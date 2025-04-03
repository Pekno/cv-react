import React, { useMemo, useCallback } from 'react';
import { Grid, Paper, Text, ThemeIcon } from '@mantine/core';
import { 
  IconCode, 
  IconGitBranch,
  IconUsersGroup,
  IconDeviceDesktop,
  IconBriefcase 
} from '@tabler/icons-react';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import classes from './ProjectStats.module.css';
import { ProjectStatsProps, statKey } from './ProjectStats.types';
import { createRegisteredSection } from '@decorators/section.decorator';

// Map icon strings to actual icon components
const iconMap: Record<string, React.ReactNode> = {
  'code': <IconCode size={24} />,
  'git': <IconGitBranch size={24} />,
  'users': <IconUsersGroup size={24} />,
  'devices': <IconDeviceDesktop size={24} />,
  'projects': <IconBriefcase size={24} />
};

// Create a memoized stat card component
const StatCard = React.memo(({
  icon,
  value,
  unit,
  label
}: {
  icon: React.ReactNode;
  value: number | string;
  unit?: string;
  label: string;
}) => (
  <Paper withBorder radius="md" className={classes.statCard}>
    <ThemeIcon 
      size={60} 
      radius="xl" 
      className={classes.statIcon}
      color="blue"
    >
      {icon}
    </ThemeIcon>
    
    <div className={classes.statValue}>
      {value}
      {unit && <span>{unit}</span>}
    </div>
    
    <Text className={classes.statLabel}>
      {label}
    </Text>
  </Paper>
));

// Create the ProjectStats component as a regular function
const ProjectStatsComponent = ({ data, evenSection = false }: ProjectStatsProps) => {
  const { t } = useLanguage();

  // Memoize the icon getter function
  const getIcon = useCallback((iconName: string): React.ReactNode => {
    return iconMap[iconName] || <IconCode size={24} />;
  }, []);

  // Memoize the stats grid to prevent unnecessary re-renders
  const statsGrid = useMemo(() => (
    <Grid className={classes.statsGrid}>
      {data.stats.map((stat, index) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
          <StatCard
            icon={getIcon(stat.icon)}
            value={stat.value}
            unit={stat.unit}
            label={t(statKey(stat.label))}
          />
        </Grid.Col>
      ))}
    </Grid>
  ), [data.stats, getIcon, t]);

  return (
    <Section id="projectStats" title={t('menu.projectStats')} evenSection={evenSection}>
      {statsGrid}
      
      <div className={classes.summary}>
        <Text size="lg" ta="center">
          {t('sections.projectStats.summary')}
        </Text>
      </div>
    </Section>
  );
};

// Export with section registration
export default createRegisteredSection<ProjectStatsProps>('projectStats', ProjectStatsComponent);