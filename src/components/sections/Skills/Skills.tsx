import React, { useMemo } from 'react';
import {
  Text,
  Grid,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconTarget,
  IconBrain,
  IconCheck,
  IconClipboardCheck,
  IconUsers,
  IconRefresh,
} from '@tabler/icons-react';
import { useLanguage } from '@hooks/useLanguage';
import { TechPillGroup } from '@components/common/TechPill/TechPill';
import Section from '@components/common/Section/Section';
import { createRegisteredSection } from '@decorators/section.decorator';
import {
  SkillsProps,
  MainSkill,
  TechCategory,
  Competency,
  qualityKey,
  chipKey,
  categoryKey,
  competencyTitleKey,
  competencyDescKey,
} from './Skills.types';
import SkillCard from './components/SkillCard/SkillCard';
import classes from './Skills.module.css';

const MemoizedSkillCard = React.memo(SkillCard);

const TABLER_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  IconBriefcase,
  IconTarget,
  IconBrain,
  IconClipboardCheck,
  IconUsers,
  IconRefresh,
};

function getTablerIcon(iconName: string): React.ReactNode {
  const Icon = TABLER_ICON_MAP[iconName] ?? IconBriefcase;
  return <Icon size={24} />;
}

const SkillsSectionComponent = ({ data, evenSection = false }: SkillsProps) => {
  const { t } = useLanguage();

  const processedMainSkills = useMemo(() => {
    return data.mainSkills.map((skill: MainSkill) => ({
      icon: getTablerIcon(skill.icon),
      title: t(qualityKey(skill.id, 'title')),
      description: t(qualityKey(skill.id, 'desc')),
      badges: skill.badges.map(b => t(chipKey(skill.id, b))),
    }));
  }, [data.mainSkills, t]);

  return (
    <Section id="skills" title={t('menu.skills')} evenSection={evenSection}>
      <Grid gutter={30}>
        {processedMainSkills.map((skill, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
            <MemoizedSkillCard {...skill} />
          </Grid.Col>
        ))}
      </Grid>

      <div className={classes.competenciesWrapper}>
        <div className={classes.competenciesGrid}>
          {/* Key Professional Competencies */}
          <div className={classes.competenciesColumn}>
            <Title order={2} className={classes.columnHeading}>
              {t('sections.skills.functional.keyCompetencies.title')}
            </Title>
            <div className={classes.competencyList}>
              {data.competencies.map((competency: Competency) => (
                <div key={competency.id} className={classes.competencyItem}>
                  <div className={classes.competencyIconBox}>
                    <IconCheck size={18} strokeWidth={2.5} />
                  </div>
                  <div className={classes.competencyText}>
                    <Text className={classes.competencyTitle}>
                      {t(competencyTitleKey(competency.id))}
                    </Text>
                    <Text className={classes.competencyDesc}>
                      {t(competencyDescKey(competency.id))}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Libraries */}
          <div className={classes.technologiesCard}>
            <Title order={2} className={classes.columnHeading}>
              {t('sections.skills.functional.libraries')}
            </Title>
            <div className={classes.categoryList}>
              {data.categories.map((category: TechCategory) => (
                <div key={category.id} className={classes.categoryGroup}>
                  <div className={classes.categoryHeader}>
                    <span className={classes.categoryDot} />
                    <Text className={classes.categoryName}>
                      {t(categoryKey(category.id))}
                    </Text>
                  </div>
                  <TechPillGroup items={category.items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default createRegisteredSection<SkillsProps>('skills', SkillsSectionComponent);
