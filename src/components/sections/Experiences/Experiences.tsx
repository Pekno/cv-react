import { useEffect, useState } from 'react';
import { 
  Accordion,
  Text, 
  Group, 
  Badge, 
  Box,
  Timeline,
  Title
} from '@mantine/core';
import { 
  IconBriefcase,
  IconClock,
  IconChevronDown
} from '@tabler/icons-react';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import classes from './Experiences.module.css';
import { useLocation } from 'react-router-dom';
import { createRegisteredSection } from '@decorators/section.decorator';
import { contextKey, experienceKey, ExperiencesProps } from './Experiences.types'
import { ExperienceLabel } from './components/ExperienceLabel/ExperienceLabel';
import { GlobalTranslationKeys } from '@app-types/translations.types';

export default createRegisteredSection<ExperiencesProps>('experiences',({ data, evenSection = false }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);

  // Handle direct navigation to subsections via URL hash
  useEffect(() => {
    if (location.hash.includes("#work-")) {
      const subsectionId = location.hash.replace("#work-", "");
      setValue(subsectionId);
    }
  }, [location.hash]);

  // Helper function to calculate difference in months
  function calculateMonthDiff(startDate: Date, endDate: Date): number {
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    return months - startDate.getMonth() + endDate.getMonth() + 1;
  }

  // Process experience data, calculating duration for "current" jobs
  const processedExperiences = data.experiences.map((exp) => {
    const startDate = exp.startDate;
    const currentDate = exp.endDate ?? new Date();
    const diffMonths = calculateMonthDiff(startDate, currentDate);
    return {
      ...exp,
      duration: diffMonths < 12 ? diffMonths : Math.trunc(diffMonths / 12),
      durationUnit: diffMonths < 12 ? 'global.units.months' : 'global.units.years' as GlobalTranslationKeys 
    };
  });

  return (
    <Section id="experiences" title={t('menu.experiences')} evenSection={evenSection}>
      <div className={classes.experienceContainer}>
        <Timeline 
          active={processedExperiences.length - 1} 
          bulletSize={34} 
          lineWidth={2}
          color="brand"
          className={classes.timeline}
        >
          {processedExperiences.map((exp, companyIndex) => (
            <Timeline.Item
              id={`work-${exp.id}`}
              key={exp.id}
              data-order={1}
              style={{scrollMarginTop:80}}
              bullet={
                <Box className={classes.timelineBullet}>
                  <IconBriefcase size={16} />
                </Box>
              }
              title={
                <Box>
                  <Group gap="xs" className={classes.timelineHeader}>
                    <Text fw={700} className={classes.companyYear} span>
                      {exp.startDate.getFullYear()}
                    </Text>
                    <Badge size="md" className={classes.durationBadge}>
                      <Group gap={5}>
                        <IconClock size={12} />
                        <span>{exp.duration} {t(exp.durationUnit)}</span>
                      </Group>
                    </Badge>
                  </Group>
                </Box>
              }
              className={classes.timelineItem}
              lineVariant={companyIndex === processedExperiences.length - 1 ? 'dashed' : 'solid'}
            >
              <Accordion 
                defaultValue={processedExperiences[0]?.id}
                classNames={{
                  chevron: classes.accordionChevron,
                  item: classes.accordionItem,
                  control: classes.accordionControl,
                  panel: classes.accordionPanel,
                  content: classes.accordionContent
                }}
                value={value}
                onChange={setValue}
                chevron={<IconChevronDown className={classes.accordionChevronIcon} />}
              >
                <Accordion.Item value={exp.id} id={`accordion-${exp.id}`}>
                  <Accordion.Control>
                    <ExperienceLabel 
                      companyName={exp.companyName}
                      companyLogo={exp.companyLogo}
                      jobTitle={t(experienceKey(exp.id, 'jobTitle'))}
                    />
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className={classes.contextWrapper}>
                      {exp.contexts.map((context, contextIndex) => (
                        <Box key={contextIndex} className={classes.contextItem}>
                          <Group gap={5} className={classes.contextHeader}>
                            <Title order={5} className={classes.contextTitle}>Mission :</Title>
                            <Text span>{t(contextKey(exp.id, contextIndex))}</Text>
                          </Group>
                          
                          {contextIndex < exp.technologies.length && (
                            <Group mt="xs" gap="xs" className={classes.techGroup}>
                              {exp.technologies[contextIndex] && exp.technologies[contextIndex].map((tech, techIndex) => (
                                <Badge 
                                  key={techIndex} 
                                  size="sm" 
                                  variant="outline"
                                  className={classes.techBadge}
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </Group>
                          )}
                        </Box>
                      ))}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </Section>
  );
});