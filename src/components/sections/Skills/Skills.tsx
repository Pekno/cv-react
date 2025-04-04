import React, { useCallback, useMemo } from 'react';
import { 
  Title, 
  Text, 
  Grid, 
  Paper, 
  Divider,
  ThemeIcon,
  SimpleGrid,
  List
} from '@mantine/core';
import { useLanguage } from '@hooks/useLanguage';
import { 
  IconBriefcase,
  IconTarget,
  IconBrain,
  IconClipboardCheck,
  IconUsers,
  IconRefresh,
  IconCertificate
} from '@tabler/icons-react';
import Section from '@components/common/Section/Section';
import classes from './Skills.module.css';
import techCategoryClasses from './components/TechCategory/TechCategory.module.css';
import { createRegisteredSection } from '@decorators/section.decorator';
import { SkillsProps, MainSkill, keyCompetenciesKey, qualityKey, categoryKey, chipKey } from './Skills.types';
import useColorPalette from '@hooks/useColorPalette';
import TechCategory from './components/TechCategory/TechCategory';
import SkillCard from './components/SkillCard/SkillCard';

// Define icon name type for better type safety
type IconName = 'IconBriefcase' | 'IconTarget' | 'IconBrain' | 'IconClipboardCheck' | 'IconUsers' | 'IconRefresh';

// Create a memoized skill card component - memoize the child components instead
const MemoizedSkillCard = React.memo(SkillCard);
const MemoizedTechCategory = React.memo(TechCategory);

// First define the component as a regular function, which we'll export with the decorator
const SkillsSectionComponent = ({ data, evenSection = false }: SkillsProps) => {
  const { t } = useLanguage();
  
  // Theme color from your Mantine theme (your primary brand color)
  const themeColor = '#2b689c';
  
  // Using the enhanced useColorPalette hook
  const { palette: skillColors, generateVariants, isColorDark } = useColorPalette(themeColor, data.mainSkills.length);
  
  // Map icon strings to actual icon components - memoized function
  const getIconComponent = useCallback((iconName: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      'IconBriefcase': <IconBriefcase size={24} />,
      'IconTarget': <IconTarget size={24} />,
      'IconBrain': <IconBrain size={24} />,
      'IconClipboardCheck': <IconClipboardCheck size={24} />,
      'IconUsers': <IconUsers size={24} />,
      'IconRefresh': <IconRefresh size={24} />
    };
    
    return iconMap[iconName] || <IconBriefcase size={24} />;
  }, []);

  // Convert main skills data to component format - memoized
  const renderMainSkills = useMemo(() => {
    return data.mainSkills.map((skill: MainSkill, skillIndex) => {
      // Use the pre-generated analogous color for this skill
      const skillColor = skillColors[skillIndex] ?? "";
      
      return {
        icon: getIconComponent(skill.icon),
        title: t(qualityKey(skill.id, 'title')),
        description: t(qualityKey(skill.id, 'desc')),
        badges: skill.badges.map(b => t(chipKey(skill.id, b))),
        seed: skillIndex + 1, // We'll still use index+1 as seed for consistent badge colors
        mainColor: skillColor, // Pass the analogous color to the SkillCard
        generateVariants,
        isColorDark
      };
    });
  }, [data.mainSkills, skillColors, getIconComponent, t]);
  
  // Memoize the skills grid to prevent unnecessary re-renders
  const skillsGrid = useMemo(() => (
    <Grid gutter={30} mb={50}>
      {renderMainSkills.map((skill, index) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
          <MemoizedSkillCard {...skill} />
        </Grid.Col>
      ))}
    </Grid>
  ), [renderMainSkills]);
  
  // Memoize the tech categories grid
  const techCategoriesGrid = useMemo(() => (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20} mb={40}>
      {data.categories.map((category, categoryIndex) => (
        <MemoizedTechCategory key={categoryIndex} title={t(categoryKey(category.id))}>
          {category.items.map((url, itemIndex) => (
            <div key={itemIndex} className={techCategoryClasses.shieldBadge}>
              <img src={url} alt={t(categoryKey(category.id))} />
            </div>
          ))}
        </MemoizedTechCategory>
      ))}
    </SimpleGrid>
  ), [data.categories, t]);
  
  // Memoize the competencies list
  const competenciesList = useMemo(() => (
    <List spacing="md">
      {data.competencies.map((competency, competenciesIndex) => (
        <List.Item key={competenciesIndex} icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCertificate size="1rem" />
          </ThemeIcon>
        }>
          {t(keyCompetenciesKey(competency))}
        </List.Item>
      ))}
    </List>
  ), [data.competencies, t]);

  return (
    <Section id="skills" title={t('menu.skills')} evenSection={evenSection}>
      {skillsGrid}

      <Divider my={50} label={<Text fw={700} fz="lg">{t('sections.skills.functional.libraries')}</Text>} labelPosition="center" />

      {techCategoriesGrid}

      <Paper withBorder p="lg" mt={50} radius="md">
        <Title order={4} mb="md">{t('sections.skills.functional.keyCompetencies.title')}</Title>
        {competenciesList}
      </Paper>
    </Section>
  );
};

// Export with section registration - pass the regular function
export default createRegisteredSection<SkillsProps>('skills', SkillsSectionComponent);