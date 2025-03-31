import React, { useMemo } from 'react';
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
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  IconBriefcase,
  IconTarget,
  IconBrain,
  IconClipboardCheck,
  IconUsers,
  IconRefresh,
  IconCertificate
} from '@tabler/icons-react';
import Section from '../../common/Section/Section';
import classes from './Skills.module.css';
import techCategoryClasses from './components/TechCategory/TechCategory.module.css';
import { createRegisteredSection } from '../../../decorators/section.decorator';
import { useColorPalette } from '../../../hooks/useColorPalette';
import { SkillsProps, MainSkill, keyCompetenciesKey, qualityKey, categoryKey, chipKey } from './Skills.types';
import SkillCard from './components/SkillCard/SkillCard';
import TechCategory from './components/TechCategory/TechCategory';

export default createRegisteredSection<SkillsProps>('skills',({ data, evenSection = false }) => {
  const { t } = useLanguage();
  
  // Theme color from your Mantine theme (your primary brand color)
  const themeColor = '#2b689c';
  
  // Using the enhanced useColorPalette hook
  const { generateAnalogousColors } = useColorPalette();
  
  // Generate analogous colors for skill cards based on the theme color
  const skillColors = useMemo(() => {
    return generateAnalogousColors(themeColor, data.mainSkills.length);
  }, [themeColor, data.mainSkills.length, generateAnalogousColors]);
  
  // Map icon strings to actual icon components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'IconBriefcase': <IconBriefcase size={24} />,
      'IconTarget': <IconTarget size={24} />,
      'IconBrain': <IconBrain size={24} />,
      'IconClipboardCheck': <IconClipboardCheck size={24} />,
      'IconUsers': <IconUsers size={24} />,
      'IconRefresh': <IconRefresh size={24} />
    };
    
    return iconMap[iconName] || <IconBriefcase size={24} />;
  };

  // Convert main skills data to component format
  const renderMainSkills = data.mainSkills.map((skill: MainSkill, skillIndex) => {
    // Use the pre-generated analogous color for this skill
    const skillColor = skillColors[skillIndex];
    
    return {
      icon: getIconComponent(skill.icon),
      title: t(qualityKey(skill.id, 'title')),
      description: t(qualityKey(skill.id, 'desc')),
      badges: skill.badges.map(b => t(chipKey(skill.id, b))),
      seed: skillIndex + 1, // We'll still use index+1 as seed for consistent badge colors
      mainColor: skillColor // Pass the analogous color to the SkillCard
    };
  });

  return (
    <Section id="skills" title={t('menu.skills')} evenSection={evenSection}>
      <Grid gutter={30} mb={50}>
        {renderMainSkills.map((skill, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
            <SkillCard {...skill} />
          </Grid.Col>
        ))}
      </Grid>

      <Divider my={50} label={<Text fw={700} fz="lg">{t('sections.skills.functional.libraries')}</Text>} labelPosition="center" />

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20} mb={40}>
        {data.categories.map((category, categoryIndex) => (
          <TechCategory key={categoryIndex} title={t(categoryKey(category.id))}>
            {category.items.map((url, itemIndex) => (
              <div key={itemIndex} className={techCategoryClasses.shieldBadge}>
                <img src={url} alt={t(categoryKey(category.id))} />
              </div>
            ))}
          </TechCategory>
        ))}
      </SimpleGrid>

      <Paper withBorder p="lg" mt={50} radius="md">
        <Title order={4} mb="md">{t('sections.skills.functional.keyCompetencies.title')}</Title>
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
      </Paper>
    </Section>
  );
});