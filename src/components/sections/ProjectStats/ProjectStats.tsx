import React from 'react';
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

export default createRegisteredSection<ProjectStatsProps>('projectStats',({ data, evenSection = false }) => {
    const { t } = useLanguage();

    const getIcon = (iconName: string): React.ReactNode => {
      return iconMap[iconName] || <IconCode size={24} />;
    };

    return (
      <Section id="projectStats" title={t('menu.projectStats')} evenSection={evenSection}>
        <Grid className={classes.statsGrid}>
          {data.stats.map((stat, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
              <Paper withBorder radius="md" className={classes.statCard}>
                <ThemeIcon 
                  size={60} 
                  radius="xl" 
                  className={classes.statIcon}
                  color="blue"
                >
                  {getIcon(stat.icon)}
                </ThemeIcon>
                
                <div className={classes.statValue}>
                  {stat.value}
                  {stat.unit && <span>{stat.unit}</span>}
                </div>
                
                <Text className={classes.statLabel}>
                  {t(statKey(stat.label))}
                </Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
        
        <div className={classes.summary}>
          <Text size="lg" ta="center">
            {t('sections.projectStats.summary')}
          </Text>
        </div>
      </Section>
    );
  }
);
