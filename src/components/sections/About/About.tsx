import {
  Grid,
  Text,
  Title,
  Group,
  ActionIcon,
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

export default createRegisteredSection<AboutProps>('about',({ data, meta, evenSection = false }) => {
  const { t, getCvPdfPath } = useLanguage();

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
            {/* Use the new SocialLinks component */}
            <SocialLinks socials={meta.socials} className={classes.actionIcon} />
            
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
});