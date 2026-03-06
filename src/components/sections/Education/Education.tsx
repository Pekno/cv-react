import { useMemo } from 'react';
import { Text } from '@mantine/core';
import { IconSchool, IconLanguage, IconInfoCircle } from '@tabler/icons-react';
import Section from '@components/common/Section/Section';
import classes from './Education.module.css';
import { useLanguage } from '@hooks/useLanguage';
import { EducationProps, historyKey, languageKey } from './Education.types';
import { createRegisteredSection } from '@decorators/section.decorator';

const TOTAL_SEGMENTS = 10;

/**
 * Computes segment states for a 10-segment proficiency bar.
 * Returns an array of 'filled' | 'partial' | 'empty' strings.
 */
function getSegments(value: number): ('filled' | 'partial' | 'empty')[] {
  const ratio = Math.max(0, Math.min(100, value)) / 100;
  const filled = ratio * TOTAL_SEGMENTS;
  const fullSegments = Math.floor(filled);
  const remainder = filled - fullSegments;

  return Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
    if (i < fullSegments) return 'filled';
    if (i === fullSegments && remainder >= 0.25) return 'partial';
    return 'empty';
  });
}

const EducationSectionComponent = ({ data, evenSection = false }: EducationProps) => {
  const { t } = useLanguage();

  const educationItems = useMemo(
    () =>
      data.history.map((item, index) => ({
        year: item.year,
        title: t(historyKey(index, 'name')),
        institution: t(historyKey(index, 'location')),
        description: t(historyKey(index, 'description')),
      })),
    [data.history, t]
  );

  const languageItems = useMemo(
    () =>
      data.languages.map((lang) => ({
        id: lang.id,
        name: t(languageKey(lang.id, 'type')),
        mastery: t(languageKey(lang.id, 'mastery')),
        value: lang.value,
        segments: getSegments(lang.value),
      })),
    [data.languages, t]
  );

  return (
    <Section id="education" title={t('menu.education')} evenSection={evenSection}>
      {/* Two-column layout */}
      <div className={classes.columnsGrid}>
        {/* Left — Studies with dashed timeline */}
        <div className={classes.studiesColumn}>
          <div className={classes.columnHeader}>
            <IconSchool size={20} className={classes.columnHeaderIcon} />
            <p className={classes.columnHeaderTitle}>{t('sections.education.studies.title')}</p>
          </div>

          <div className={classes.timeline}>
            {educationItems.map((item, index) => (
              <div key={index} className={classes.timelineEntry}>
                <span className={classes.entryYear}>{item.year}</span>

                <div className={classes.entryIcon}>
                  <IconSchool className={classes.entryIconSvg} stroke={2} />
                </div>

                <div className={classes.entryCard}>
                  <p className={classes.entryTitle}>{item.title}</p>
                  <p className={classes.entryInstitution}>{item.institution}</p>
                  {item.description && (
                    <p className={classes.entryDescription}>{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Languages card */}
        <div>
          <div className={classes.columnHeader}>
            <IconLanguage size={20} className={classes.columnHeaderIcon} />
            <p className={classes.columnHeaderTitle}>{t('sections.education.languages.title')}</p>
          </div>

          <div className={classes.languagesCard}>
            <div className={classes.languagesList}>
              {languageItems.map((lang, index) => (
                <div key={lang.id}>
                  <div className={classes.languageItem}>
                    <div className={classes.languageTopRow}>
                      <p className={classes.languageName}>{lang.name}</p>
                      <span className={classes.languagePercentage}>{lang.value}%</span>
                    </div>
                    <Text className={classes.languageMastery}>{lang.mastery}</Text>

                    {/* Segmented proficiency bar */}
                    <div className={classes.segmentedBar} role="meter" aria-valuenow={lang.value} aria-valuemin={0} aria-valuemax={100} aria-label={lang.name}>
                      {lang.segments.map((state, si) => {
                        const stateClass =
                          state === 'filled' ? classes.segmentFilled
                          : state === 'partial' ? classes.segmentPartial
                          : classes.segmentEmpty;
                        return (
                          <div
                            key={si}
                            className={`${classes.segment} ${stateClass}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {index < languageItems.length - 1 && (
                    <div className={classes.languageDivider} style={{ marginTop: '1.25rem' }} />
                  )}
                </div>
              ))}
            </div>

            {/* CEFR info box */}
            <div className={classes.cefrBox}>
              <IconInfoCircle size={14} className={classes.cefrIcon} />
              <p className={classes.cefrText}>{t('sections.education.languages.cefrInfo')}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default createRegisteredSection<EducationProps>('education', EducationSectionComponent);
