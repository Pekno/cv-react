import { useCallback, useState } from 'react';
import {
  Grid,
  Text,
  Title,
  Group,
  ActionIcon,
  Loader
} from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import Section from '@components/common/Section/Section';
import classes from './About.module.css';
import ConsoleTypingAnimation from './components/ConsoleTypingAnimation/ConsoleTypingAnimation';
import AnimatedCounter from './components/AnimatedCounter/AnimatedCounter';
import EnhancedProfilePicture from './components/EnhancedProfilePicture/EnhancedProfilePicture';
import SocialLinks from '@components/common/SocialLinks/SocialLinks';
import { AboutProps } from './About.types';
import { createRegisteredSection } from '@decorators/section.decorator';
import { useLanguage } from '@hooks/useLanguage';

// Define the component as a plain function first, then register it with the decorator
const AboutSectionComponent = ({ data, meta, evenSection = false }: AboutProps) => {
  const { t, getCvPdfPath } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Enhanced download handler with loading state
  const handleDownload = useCallback(() => {
    // Set downloading state
    setIsDownloading(true);
    
    // Get the URL of the resume
    const resumePath = getCvPdfPath();
    if (!resumePath) {
      setIsDownloading(false);
      return;
    }
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumePath;
    link.setAttribute('download', '');
    link.setAttribute('type', 'application/pdf');
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    // Analytics tracking or any other side effects
    console.log('Resume downloaded');
    
    // Reset downloading state after a short delay to show the loading indicator
    setTimeout(() => {
      setIsDownloading(false);
    }, 500);
  }, [getCvPdfPath]);

  return (
    <Section id="about" title="" className={classes.aboutSection} evenSection={evenSection}>
      <Grid align="center">
        <Grid.Col className={classes.textCenter}>
          <EnhancedProfilePicture
            images={meta.profilePictures}
            altText={meta.name}
            size={220}
          />
        </Grid.Col>

        <Grid.Col className={classes.textCenter}>
          <Title order={1} className={classes.name}>{meta.name}</Title>

          <Title order={2} className={classes.title} mt="xs">
            {t('sections.about.jobTitle')}
          </Title>

          <div className={classes.counterWrap} style={{ marginTop: '1rem' }}>
            <AnimatedCounter
              start={0}
              end={data.yearsOfExperience}
              duration={5000}
              className={classes.counter}
            />
            <Text>{t('sections.about.experienceText')}</Text>
          </div>

          <ConsoleTypingAnimation
            content={t('sections.about.summary')}
            authorName={meta.name}
            skipAnimation={true}
          />

          <Group>
            <SocialLinks socials={meta.socials} className={classes.actionIcon} />
            { 
              Object.keys(meta.pdfResume).length > 0 && (
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="filled"
                  className={classes.actionIcon}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <Loader size="xs" color="white" />
                  ) : (
                    <IconDownload size={18} />
                  )}
                </ActionIcon>
              )
            }
          </Group>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

// Export with section registration
export default createRegisteredSection<AboutProps>('about', AboutSectionComponent);