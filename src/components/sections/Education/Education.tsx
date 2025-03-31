import { Grid, Paper, Timeline, Text, Group, RingProgress, Stack, SimpleGrid, Center, Badge, Title } from '@mantine/core';
import { IconSchool, IconLanguage } from '@tabler/icons-react';
import Section from '@components/common/Section/Section';
import classes from './Education.module.css';
import { useLanguage } from '@hooks/useLanguage';
import { EducationProps, historyKey, languageKey } from './Education.types';
import { createRegisteredSection } from '@decorators/section.decorator';

export default createRegisteredSection<EducationProps>('education',({ data, evenSection = false }) => {
  const { t } = useLanguage();

  // Convert education data from the centralized store to component format
  const renderEducationItems = data.history.map((item, index) => ({
    year: item.year,
    title: t(historyKey(index, 'name')),
    location: t(historyKey(index, 'location')),
    icon: <IconSchool stroke={1.5} />,
  }));

  // Convert language data from the centralized store to component format
  const renderLanguageItems = data.languages.map((lang) => ({
    label: t(languageKey(lang.id, 'type')),
    value: lang.value,
    color: lang.color,
    subtitle: t(languageKey(lang.id, 'mastery')),
  }));

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
                <Timeline active={renderEducationItems.length - 1} bulletSize={24} lineWidth={2}>
                  {renderEducationItems.map((education, index) => (
                    <Timeline.Item
                      key={index}
                      bullet={education.icon}
                      title={
                        <Group gap="xs">
                          <Text fw={700} size="lg">{education.title}</Text>
                          <Badge color="brand.6" className={classes.badge}>{education.year}</Badge>
                        </Group>
                      }
                    >
                      <Text c="dimmed" dangerouslySetInnerHTML={{ __html: education.location }} />
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Stack>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="xl" withBorder shadow="md" radius="md" className={classes.card}>
            <div className={classes.languageContainer}>
              <Stack>
                <Group justify="center" gap="xs">
                  <IconLanguage size={24} />
                  <Title order={3} fw={600}>{t('sections.education.languages.title')}</Title>
                </Group>

                <SimpleGrid cols={{ base: 1, xs: 3, md: 1, lg: 3 }} spacing="md">
                  {renderLanguageItems.map((language, index) => (
                    <Stack key={index} align="center">
                      <Center>
                        <RingProgress
                          size={120}
                          thickness={12}
                          roundCaps
                          sections={[{ value: language.value, color: language.color }]}
                          label={
                            <Text fw={700} ta="center" size="lg">
                              {language.value}%
                            </Text>
                          }
                        />
                      </Center>
                      <Text fw={600} mt="sm">{language.label}</Text>
                      {language.subtitle && (
                        <Text size="xs" c="dimmed" ta="center">{language.subtitle}</Text>
                      )}
                    </Stack>
                  ))}
                </SimpleGrid>
              </Stack>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Section>
  );
});