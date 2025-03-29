import React from 'react';
import { 
  Grid, 
  Text, 
  Title, 
  Group, 
  ActionIcon, 
} from '@mantine/core';
import { 
  IconBrandFacebook,
  IconBrandGithub, 
  IconBrandInstagram, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconBrandYoutube, 
  IconDownload, 
  IconLink
} from '@tabler/icons-react';
import { useLanguage } from '../../../hooks/useLanguage';
import Section from '../../common/Section/Section';
import classes from './About.module.css';
import ConsoleTypingAnimation from './components/ConsoleTypingAnimation/ConsoleTypingAnimation';
import AnimatedCounter from './components/AnimatedCounter/AnimatedCounter';
import EnhancedProfilePicture from './components/EnhancedProfilePicture/EnhancedProfilePicture';
import { SocialLink } from '../../../types/profile-data.types';
import { AboutProps, AboutData } from './About.types';
import { registerSection } from '../../../decorators/section.decorator';

const About: React.FC<AboutProps> = ({ data, meta, evenSection = true }) => {
  const { t, getCvPdfPath } = useLanguage();

  // Helper function to get the appropriate icon component
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return IconBrandGithub;
      case 'linkedin':
        return IconBrandLinkedin;
      case 'twitter':
        return IconBrandTwitter;
      case 'instagram':
        return IconBrandInstagram;
      case 'facebook':
        return IconBrandFacebook;
      case 'youtube':
        return IconBrandYoutube;
      // Add cases for other social platforms
      default:
        return IconLink; // Fallback icon for unknown types
    }
  };

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
          
          {/* Using the statically defined keys with IDE autocomplete */}
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
            {meta.socials.map((social: SocialLink) => {
              const SocialIcon = getSocialIcon(social.type);
              return (
                <ActionIcon
                  key={social.type}
                  size="lg"
                  radius="xl"
                  variant="filled"
                  className={classes.actionIcon}
                  component="a"
                  href={social.url || '#'}
                  target="_blank"
                >
                  <SocialIcon size={18} />
                </ActionIcon>
              );
            })}
            
            <ActionIcon 
              size="lg" 
              radius="xl" 
              variant="filled" 
              className={classes.actionIcon}
              component="a"
              href={getCvPdfPath()}
              download
            >
              <IconDownload size={18} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

export default registerSection<AboutData>({ type: 'about' })(About);