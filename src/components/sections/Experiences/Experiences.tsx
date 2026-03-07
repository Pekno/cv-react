import React, { useEffect, useState, useMemo } from 'react';
import {
  Accordion,
  Text,
} from '@mantine/core';
import {
  IconChevronDown,
  IconBriefcase,
} from '@tabler/icons-react';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import classes from './Experiences.module.css';
import { useLocation } from 'react-router-dom';
import { createRegisteredSection } from '@decorators/section.decorator';
import { contextKey, experienceKey, ExperiencesProps } from './Experiences.types';
import { type TechItem, TechPillGroup } from '@components/common/TechPill/TechPill';
import { GlobalTranslationKeys, TranslationKey } from '@app-types/translations.types';

// ── Types ──────────────────────────────────────────────────────────

interface ProcessedExperience {
  id: string;
  startDate: Date;
  endDate?: Date;
  companyName: string;
  companyLogo: string;
  technologies: TechItem[][];
  contexts: number[];
  isCurrent?: boolean;
  duration: number;
  durationUnit: GlobalTranslationKeys;
}

// ── Helpers ─────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
}

// ── Sub-components ─────────────────────────────────────────────────

interface ExperienceCardProps {
  exp: ProcessedExperience;
  isOpen: boolean;
  onToggle: (id: string | null) => void;
  t: (key: TranslationKey, options?: unknown) => string;
}

const ExperienceCard = React.memo(({ exp, isOpen, onToggle, t }: ExperienceCardProps) => {
  const isCurrent = !exp.endDate || exp.isCurrent;
  const startStr = formatDate(exp.startDate);
  const endStr = isCurrent ? t('global.present' as TranslationKey) : formatDate(exp.endDate!);

  return (
    <div className={classes.card}>
      <Accordion
        value={isOpen ? exp.id : null}
        onChange={onToggle}
        classNames={{
          item: classes.accordionItem,
          control: classes.accordionControl,
          panel: classes.accordionPanel,
          content: classes.accordionContent,
          chevron: classes.accordionChevron,
        }}
        chevron={<IconChevronDown className={classes.accordionChevronIcon} />}
      >
        <Accordion.Item value={exp.id} id={`accordion-${exp.id}`}>
          <Accordion.Control>
            <div className={classes.cardHeader}>
              <div className={classes.logoFrame}>
                <img
                  src={exp.companyLogo}
                  alt={exp.companyName}
                  className={classes.companyLogo}
                />
              </div>
              <div className={classes.headerContent}>
                <span className={classes.jobTitle}>
                  {t(experienceKey(exp.id, 'jobTitle'))}
                </span>
                <span className={classes.companyName}>{exp.companyName}</span>
                <div className={classes.dateLine}>
                  <span className={classes.dateRange}>
                    {startStr} — {endStr}
                  </span>
                  <span className={classes.durationPill}>
                    {exp.duration}&nbsp;{t(exp.durationUnit)}
                  </span>
                </div>
              </div>
            </div>
          </Accordion.Control>

          <Accordion.Panel>
            <div className={classes.contextWrapper}>
              {exp.contexts.map((_, contextIndex) => (
                <div key={contextIndex} className={classes.contextItem}>
                  <div className={classes.bulletDot} />
                  <Text component="span" className={classes.contextText}>
                    {t(contextKey(exp.id, contextIndex))}
                  </Text>
                </div>
              ))}

              {exp.technologies.flat().length > 0 && (
                <TechPillGroup
                  items={exp.technologies.flat()}
                  className={classes.techGroup}
                />
              )}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

// ── Main component ─────────────────────────────────────────────────

const ExperiencesSectionComponent = ({ data, evenSection = false }: ExperiencesProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);

  // Handle direct navigation to subsections via URL hash
  // Flow: hash changes → open accordion → wait for render → scroll
  useEffect(() => {
    if (location.hash.includes('#work-')) {
      const subsectionId = location.hash.replace('#work-', '');
      setValue(subsectionId);

      const timeoutId = setTimeout(() => {
        const el = document.getElementById(`work-${subsectionId}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [location.hash]);

  const processedExperiences = useMemo((): ProcessedExperience[] => {
    return data.experiences.map((exp) => {
      const currentDate = exp.endDate ?? new Date();
      const months = (currentDate.getFullYear() - exp.startDate.getFullYear()) * 12;
      const diffMonths = months - exp.startDate.getMonth() + currentDate.getMonth() + 1;
      return {
        ...exp,
        duration: diffMonths < 12 ? diffMonths : Math.trunc(diffMonths / 12),
        durationUnit: (diffMonths < 12
          ? 'global.units.months'
          : 'global.units.years') as GlobalTranslationKeys,
      };
    });
  }, [data.experiences]);

  return (
    <Section id="experiences" title={t('menu.experiences')} evenSection={evenSection}>
      <div className={classes.experienceContainer}>
        {/* Center vertical line */}
        <div className={classes.timelineLine} />

        {processedExperiences.map((exp, index) => {
          const isCurrent = !exp.endDate || exp.isCurrent;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={exp.id}
              id={`work-${exp.id}`}
              className={`${classes.entryRow} ${isLeft ? classes.entryRowLeft : classes.entryRowRight}`}
              style={{ scrollMarginTop: 80 }}
            >
              {/* Card side */}
              <div className={classes.cardSide}>
                <ExperienceCard
                  exp={exp}
                  isOpen={value === exp.id}
                  onToggle={setValue}
                  t={t}
                />
              </div>

              {/* Center node */}
              <div className={classes.nodeCenter}>
                <div className={`${classes.nodeIcon} ${isCurrent ? '' : classes.nodeIconInactive}`}>
                  <IconBriefcase className={classes.nodeIconSvg} stroke={1.8} />
                </div>
              </div>

              {/* Spacer side */}
              <div className={classes.spacerSide} />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default createRegisteredSection<ExperiencesProps>('experiences', ExperiencesSectionComponent);
