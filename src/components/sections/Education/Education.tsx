import { useMemo } from 'react';
import { Grid, Paper, Timeline, Text, Group, RingProgress, Stack, Badge, Title, useMantineTheme, Center, SimpleGrid, SemiCircleProgress } from '@mantine/core';
import { IconSchool, IconLanguage } from '@tabler/icons-react';
import Section from '@components/common/Section/Section';
import classes from './Education.module.css';
import { useLanguage } from '@hooks/useLanguage';
import { EducationProps, historyKey, languageKey } from './Education.types';
import { createRegisteredSection } from '@decorators/section.decorator';
import { useMediaQuery } from '@mantine/hooks';

// Create the Education component as a regular function
const EducationSectionComponent = ({ data, evenSection = false }: EducationProps) => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Convert education data from the centralized store to component format
  // Use useMemo to avoid recalculation on every render
  const renderEducationItems = useMemo(() => {
    return data.history.map((item, index) => ({
      year: item.year,
      title: t(historyKey(index, 'name')),
      location: t(historyKey(index, 'location')),
      icon: <IconSchool stroke={1.5} />,
    }));
  }, [data.history, t]);

  // Convert language data from the centralized store to component format
  // Memoize to prevent unnecessary recalculations
  const renderLanguageItems = useMemo(() => {
    return data.languages.map((lang) => ({
      label: t(languageKey(lang.id, 'type')),
      value: lang.value,
      subtitle: t(languageKey(lang.id, 'mastery')),
    }));
  }, [data.languages, t]);

  // Memoize the education timeline component
  const educationTimeline = useMemo(() => (
    <Timeline active={renderEducationItems.length - 1} bulletSize={24} lineWidth={2} color="brand">
      {renderEducationItems.map((education, index) => (
        <Timeline.Item
          key={index}
          bullet={education.icon}
          title={
            <Group gap="xs">
              <Text fw={700} size="lg">{education.title}</Text>
              <Badge color="brand">{education.year}</Badge>
            </Group>
          }
        >
          <Text c="dimmed" dangerouslySetInnerHTML={{ __html: education.location }} />
        </Timeline.Item>
      ))}
    </Timeline>
  ), [renderEducationItems]);

  // Memoize the languages grid component
  const languagesGrid = useMemo(() => (
    <SimpleGrid cols={{ base: 3 }} spacing="xs">
      {renderLanguageItems.map((language, index) => (
        <Stack key={index} align="center">
          <Center>
          {isMobile ? (
              <SemiCircleProgress
                value={language.value}
                size={70}
                thickness={8}
                color='brand'
                label={
                  <Text className={classes.progressLabel}>
                    {language.value}%
                  </Text>
                }
              />
            ) : (
              <RingProgress
                size={100}
                thickness={10}
                roundCaps
                sections={[{ value: language.value, color: 'brand' }]}
                label={
                  <Text className={classes.progressLabel}>
                    {language.value}%
                  </Text>
                }
              />
            )}
          </Center>
          <Text>{language.label}</Text>
          {language.subtitle && (
            <Text size="xs" c="dimmed" ta="center">{language.subtitle}</Text>
          )}
        </Stack>
      ))}
    </SimpleGrid>
  ), [renderLanguageItems, isMobile]);

  return (
    <Section id="education" title={t('menu.education')} evenSection={evenSection}>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper p="xl" withBorder shadow="md" radius="md" className={classes.card}>
            <Stack>
              <Title order={3} fw={600} ta="center">
                {t('sections.education.studies.title')}
              </Title>
              
              <div className={classes.timeline}>
                {educationTimeline}
              </div>
            </Stack>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper px="xl" py={isMobile ? "md" : "xl"} withBorder shadow="md" radius="md" className={classes.card}>
            <div className={classes.languageContainer}>
              <Group justify="center" gap="xs" mb="md">
                <IconLanguage size={24} />
                <Title order={3} fw={600}>{t('sections.education.languages.title')}</Title>
              </Group>

              {languagesGrid}
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

// Export with section registration
export default createRegisteredSection<EducationProps>('education', EducationSectionComponent);