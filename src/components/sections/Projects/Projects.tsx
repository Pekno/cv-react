import React from 'react';
import { 
  Text
} from '@mantine/core';
import { useLanguage } from '../../../hooks/useLanguage';
import Section from '../../common/Section/Section';
import ProjectCarousel from './components/ProjectCarousel/ProjectCarousel';
import classes from './Projects.module.css';
import { actionKey, itemKey, ProjectsData, ProjectsProps } from './Projects.types';
import { registerSection } from '../../../decorators/section.decorator';

const Projects: React.FC<ProjectsProps> = ({ data, evenSection = true }) => {
  const { t } = useLanguage();

  // Process projects to add translated descriptions and link texts
  const processedProjects = data.projects.map(project => ({
    title: t(itemKey(project.id, 'title')),
    description: t(itemKey(project.id, 'desc')),
    image: project.image,
    link: project.link,
    linkText: project.linkTextKey ? t(actionKey(project.linkTextKey)) : undefined
  }));

  return (
    <Section id="projects" title={t('menu.projects')} evenSection={evenSection}>
      <Text mb={30} className={classes.introText}>
        {t('sections.projects.intro')}
      </Text>
      
      {/* Project Carousel */}
      <ProjectCarousel projects={processedProjects} />
    </Section>
  );
};

export default registerSection<ProjectsData>({
  type: 'projects',
})(Projects);