import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import { useMediaQuery } from '@mantine/hooks';

// Memoize the ExperienceLabel component to prevent unnecessary re-renders
const MemoizedExperienceLabel = React.memo(ExperienceLabel);

// Create the Experiences component as a regular function
const ExperiencesSectionComponent = ({ data, evenSection = false }: ExperiencesProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  // Check if screen is mobile
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Handle direct navigation to subsections via URL hash
  useEffect(() => {
    if (location.hash.includes("#work-")) {
      const subsectionId = location.hash.replace("#work-", "");
      setValue(subsectionId);
    }
  }, [location.hash]);

  // Helper function to calculate difference in months
  const calculateMonthDiff = useCallback((startDate: Date, endDate: Date): number => {
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    return months - startDate.getMonth() + endDate.getMonth() + 1;
  }, []);

  // Process experience data, calculating duration for "current" jobs
  // Memoize this computation to prevent recalculation on every render
  const processedExperiences = useMemo(() => {
    return data.experiences.map((exp) => {
      const startDate = exp.startDate;
      const currentDate = exp.endDate ?? new Date();
      const diffMonths = calculateMonthDiff(startDate, currentDate);
      return {
        ...exp,
        duration: diffMonths < 12 ? diffMonths : Math.trunc(diffMonths / 12),
        durationUnit: diffMonths < 12 ? 'global.units.months' : 'global.units.years' as GlobalTranslationKeys 
      };
    });
  }, [data.experiences, calculateMonthDiff]);

  // Handle accordion change
  const handleAccordionChange = useCallback((newValue: string | null) => {
    setValue(newValue);
  }, []);

  // Memoize the timeline component to prevent unnecessary re-renders
  const experiencesTimeline = useMemo(() => (
    <Timeline 
      active={processedExperiences.length - 1} 
      bulletSize={isMobile ? 14 : 34} 
      lineWidth={isMobile ? 1 : 2}
      color="brand"
      className={classes.timeline}
      style={isMobile ? { 
        paddingLeft: '8px',
        paddingBottom: '0', 
        marginBottom: '0',
      } : undefined}
      py={isMobile ? 0 : undefined}
    >
      {processedExperiences.map((exp, companyIndex) => (
        <Timeline.Item
          id={`work-${exp.id}`}
          key={exp.id}
          data-order={1}
          style={{
            scrollMarginTop: 80,
            ...(isMobile ? { paddingBottom: '4px', marginBottom: '0' } : {})
          }}
          bullet={
            <Box className={classes.timelineBullet}>
              {/* Only show icon on desktop */}
              {!isMobile && <IconBriefcase size={16} />}
            </Box>
          }
          title={
            <Box style={isMobile ? { marginBottom: '2px' } : undefined}>
              <Group gap={isMobile ? "4px" : "xs"} className={classes.timelineHeader}>
                <Text fw={700} className={classes.companyYear} span>
                  {exp.startDate.getFullYear()}
                </Text>
                <Badge 
                  size={isMobile ? "xs" : "md"} 
                  radius="xl" 
                  className={classes.durationBadge}
                >
                  <Group gap={5}>
                    <IconClock size={isMobile ? 10 : 12} />
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
            onChange={handleAccordionChange}
            chevron={<IconChevronDown className={classes.accordionChevronIcon} />}
          >
            <Accordion.Item value={exp.id} id={`accordion-${exp.id}`}>
              <Accordion.Control>
                <MemoizedExperienceLabel 
                  companyName={exp.companyName}
                  companyLogo={exp.companyLogo}
                  jobTitle={t(experienceKey(exp.id, 'jobTitle'))}
                />
              </Accordion.Control>
              <Accordion.Panel>
                <div className={classes.contextWrapper}>
                  {exp.contexts.map((_, contextIndex) => (
                    <Box key={contextIndex} className={classes.contextItem}>
                      <Group gap={5} className={classes.contextHeader}>
                        <Title order={5} className={classes.contextTitle}>Mission :</Title>
                        <Text size={isMobile ? "sm" : "md"} span>{t(contextKey(exp.id, contextIndex))}</Text>
                      </Group>
                      
                      {contextIndex < exp.technologies.length && (
                        <Group mt={isMobile ? "4px" : "xs"} gap="xs" className={classes.techGroup}>
                          {exp.technologies[contextIndex] && exp.technologies[contextIndex].map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              size={isMobile ? "xs" : "sm"} 
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
  ), [processedExperiences, value, handleAccordionChange, t, isMobile]);

  return (
    <Section id="experiences" title={t('menu.experiences')} evenSection={evenSection}>
      <div className={classes.experienceContainer}>
        {experiencesTimeline}
      </div>
    </Section>
  );
};

// Export with section registration
export default createRegisteredSection<ExperiencesProps>('experiences', ExperiencesSectionComponent);