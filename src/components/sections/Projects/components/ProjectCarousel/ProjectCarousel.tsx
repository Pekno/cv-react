import React, { useState } from 'react';
import { 
  Card, 
  Image, 
  Title, 
  Text, 
  Button, 
  Group,
  Tooltip,
  ActionIcon,
  Box
} from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import { useTranslation } from 'react-i18next';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import useCarouselAutoplay from '../../hooks/useCarouselAutoplay';
import classes from './ProjectCarousel.module.css';

// Import Mantine Carousel styles if they're not already imported elsewhere
import '@mantine/carousel/styles.css';

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
}

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const { t } = useTranslation();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  
  // Use custom hook for autoplay functionality
  const { 
    handleUserInteraction,
    isAutoplayRunning,
    startAutoplay,
    stopAutoplay
  } = useCarouselAutoplay(embla, {
    delay: 1000, // 15 seconds rotation
    idleDelay: 3000, // Reset after 15 seconds of inactivity
  });
  
  const toggleAutoplay = () => {
    if (isAutoplayRunning) {
      stopAutoplay();
      setAutoplayEnabled(false);
    } else {
      startAutoplay();
      setAutoplayEnabled(true);
    }
  };
  
  return (
    <Box className={classes.carouselContainer}>
      {/* Autoplay toggle button */}
      <div className={classes.autoplayControl}>
        <Tooltip 
          label={isAutoplayRunning && autoplayEnabled ? t('autoplay-active') : t('autoplay-paused')} 
          position="top"
        >
          <ActionIcon
            variant="light"
            color={isAutoplayRunning && autoplayEnabled ? "blue" : "gray"}
            onClick={toggleAutoplay}
            className={classes.autoplayButton}
            aria-label={isAutoplayRunning ? t('autoplay-active') : t('autoplay-paused')}
          >
            {isAutoplayRunning ? (
              <IconPlayerPlay size={18} />
            ) : (
              <IconPlayerPause size={18} />
            )}
          </ActionIcon>
        </Tooltip>
      </div>
      
      {/* Carousel */}
      <Carousel
        withIndicators
        withControls
        height="auto"
        slideSize={{ base: '80%', sm: '40%', md: '30%', lg: '25%' }}
        slideGap={{ base: 'md', sm: 'lg' }}
        loop
        align="center"
        getEmblaApi={setEmbla}
        slidesToScroll={1}
        styles={{
          control: {
            zIndex: 15,
          },
          viewport: {
            padding: '10px 0',
          }
        }}
      >
        {projects.map((project, index) => (
          <Carousel.Slide key={index}>
            <div className={classes.cardWrapper}>
              <Card 
                shadow="sm" 
                padding="md" 
                radius="md" 
                withBorder 
                className={classes.card}
                style={{ 
                  cursor: 'default',
                  '--child-button-cursor': 'pointer'
                }}
              >
                <Card.Section>
                  <Image
                    src={project.image}
                    height={150}
                    alt={project.title}
                    fit="cover"
                  />
                </Card.Section>

                <Group mt="md" mb="xs">
                  <Title order={5} fw={700}>{project.title}</Title>
                </Group>

                <Text size="xs" color="dimmed" mb="md" className={classes.description}>
                  {project.description}
                </Text>

                {project.link && (
                  <Button 
                    component="a"
                    href={project.link}
                    target="_blank"
                    variant="filled"
                    fullWidth
                    mt="auto"
                    radius="md"
                    size="xs"
                    style={{ cursor: 'pointer' }}
                    data-clickable="true"
                    className={classes.cardButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserInteraction();
                    }}
                  >
                    {project.linkText || t('personnalProjects-tryIt')}
                  </Button>
                )}
              </Card>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

export default ProjectCarousel;