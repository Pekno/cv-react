import { useCallback, useMemo, useState, ReactNode } from 'react';
import { Grid, Box } from '@mantine/core';
import {
  IconDownload,
  IconCode,
  IconArrowUpRight,
  IconQuote,
  IconLoader2,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Section from '@components/common/Section/Section';
import classes from './About.module.css';
import EnhancedProfilePicture from './components/EnhancedProfilePicture/EnhancedProfilePicture';
import { getSocialIcon } from '@components/common/SocialLinks/SocialLinks';
import { AboutProps } from './About.types';
import { createRegisteredSection } from '@decorators/section.decorator';
import { useLanguage } from '@hooks/useLanguage';
import { useProfileData } from '@hooks/useProfileData';
import { ExperiencesData, ExperienceItem } from '@components/sections/Experiences/Experiences.types';
import AnimatedCounter from './components/AnimatedCounter/AnimatedCounter';

// Labels for social platforms (shown in card rows)
const socialLabels: Record<string, string> = {
  github: 'GitHub Profile',
  linkedin: 'LinkedIn Network',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  dribbble: 'Dribbble',
  behance: 'Behance',
  medium: 'Medium',
  stackoverflow: 'Stack Overflow',
  website: 'Personal Website',
};

// Build summary paragraphs as React nodes, highlighting company names as links
function buildSummaryNodes(
  text: string,
  experiences: ExperiencesData['experiences'],
  linkClass: string,
): ReactNode[][] {
  // Build a map of company name -> id
  const companyMap = new Map<string, string>();
  experiences.forEach((exp) => {
    if (exp.companyName && exp.id) {
      companyMap.set(exp.companyName, exp.id);
    }
  });

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create regex only if we have companies
  const regex =
    companyMap.size > 0
      ? new RegExp(
          `(${Array.from(companyMap.keys()).map(escapeRegExp).join('|')})`,
          'g',
        )
      : null;

  const buildParagraphNodes = (para: string): ReactNode[] => {
    if (!regex) return [para];

    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    regex.lastIndex = 0;

    while ((match = regex.exec(para)) !== null) {
      const matchedText = match[0];
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        nodes.push(para.substring(lastIndex, matchIndex));
      }

      const companyId = companyMap.get(matchedText) ?? '';
      nodes.push(
        <Link
          key={`${matchedText}-${matchIndex}`}
          to={`#work-${companyId}`}
          className={linkClass}
        >
          {matchedText}
        </Link>,
      );

      lastIndex = matchIndex + matchedText.length;
    }

    if (lastIndex < para.length) {
      nodes.push(para.substring(lastIndex));
    }

    return nodes;
  };

  // Split on double-newline for paragraph breaks, single-newline otherwise
  const paragraphs = text.split(/\n{2,}/).flatMap((chunk) =>
    chunk.split(/\n/).filter((p) => p.trim().length > 0),
  );

  return paragraphs.map((para) => buildParagraphNodes(para));
}

// ─── Component ────────────────────────────────────────────────────────────────

const AboutSectionComponent = ({ data, meta, evenSection = false }: AboutProps) => {
  const { t, getCvPdfPath } = useLanguage();
  const { data: profileData } = useProfileData();
  const [isDownloading, setIsDownloading] = useState(false);

  const experienceSection = profileData.sections.find(
    (x) => x.sectionName === 'experiences',
  )?.data as ExperiencesData | undefined;

  const experiences: ExperienceItem[] = experienceSection?.experiences ?? [];

  const summaryText = t('sections.about.summary');

  const summaryParagraphs = useMemo(
    () => buildSummaryNodes(summaryText, experiences, classes.companyLink ?? ''),
    [summaryText, experiences],
  );

  const hasPdfResume = Object.keys(meta.pdfResume).length > 0;

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    const resumePath = getCvPdfPath();
    if (!resumePath) {
      setIsDownloading(false);
      return;
    }

    const link = document.createElement('a');
    link.href = resumePath;
    link.setAttribute('download', '');
    link.setAttribute('type', 'application/pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 500);
  }, [getCvPdfPath]);

  return (
    <Section id="about" title="" className={classes.aboutSection} evenSection={evenSection}>
      {/* Background decoration */}
      <Box className={`${classes.bgOrb} ${classes.bgOrbLeft}`} aria-hidden />
      <Box className={`${classes.bgOrb} ${classes.bgOrbRight}`} aria-hidden />

      <Grid className={classes.contentGrid} gutter={{ base: 'xl', lg: '3rem' }}>
        {/* ─── LEFT COLUMN ─────────────────────────────────────── */}
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <div className={classes.leftCol}>
            {/* Profile picture with floating code badge */}
            <div className={classes.pictureWrapper}>
              <EnhancedProfilePicture
                images={meta.profilePictures}
                altText={meta.name}
                size={180}
              />
              <span className={classes.codeBadge} aria-hidden>
                <IconCode size={16} stroke={2.5} />
              </span>
            </div>

            {/* Name */}
            <h1 className={classes.name}>
              {meta.name}
            </h1>

            {/* Job title with highlight */}
            <h2 className={classes.jobTitle}>
              {t('sections.about.jobTitle')}{' '}
              <span className={classes.jobTitleHighlight}>
                ({t('sections.about.jobTitleHighlight')})
              </span>
            </h2>

            {/* Experience counter */}
            <div className={classes.counterBlock}>
              <AnimatedCounter
                start={0}
                end={data.yearsOfExperience}
                duration={4000}
                className={classes.counterNumber}
              />
              <span className={classes.counterLabel}>
                <span>{t('sections.about.experienceYears')}</span>
                <span>{t('sections.about.experienceLabel')}</span>
              </span>
            </div>

            {/* Social link cards + download button */}
            <div className={classes.socialCardList}>
              {meta.socials.map((social) => {
                const Icon = getSocialIcon(social.type);
                const label =
                  socialLabels[social.type] ??
                  social.type.charAt(0).toUpperCase() + social.type.slice(1);
                return (
                  <a
                    key={social.type}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialCard}
                  >
                    <span className={classes.socialCardIcon}>
                      <Icon size={17} stroke={1.8} />
                    </span>
                    <span className={classes.socialCardLabel}>{label}</span>
                    <IconArrowUpRight
                      size={15}
                      stroke={2}
                      className={classes.socialCardArrow}
                    />
                  </a>
                );
              })}
              {hasPdfResume && (
                <button
                  className={classes.downloadBtn}
                  onClick={handleDownload}
                  disabled={isDownloading}
                  type="button"
                >
                  {isDownloading ? (
                    <IconLoader2 size={17} stroke={2} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <IconDownload size={17} stroke={2} />
                  )}
                  <span className={classes.downloadLabel}>{t('sections.about.downloadResume')}</span>
                </button>
              )}
            </div>
          </div>
        </Grid.Col>

        {/* ─── RIGHT COLUMN ────────────────────────────────────── */}
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <div className={classes.rightCol}>
            <div className={classes.summaryCard}>
              {/* Decorative quote icon */}
              <span className={classes.quoteIconWrap} aria-hidden>
                <IconQuote size={24} stroke={2} />
              </span>

              {/* Summary paragraphs */}
              <div className={classes.summaryBody}>
                {summaryParagraphs.map((nodes, i) => (
                  <p key={i} className={classes.summaryParagraph}>
                    {nodes}
                  </p>
                ))}
              </div>

              {/* Mini stats bar */}
              <div className={classes.statsBar}>
                {data.stackFocus && (
                  <div className={classes.statItem}>
                    <span className={classes.statLabel}>
                      {t('sections.about.stackFocusLabel')}
                    </span>
                    <span className={classes.statValue}>{data.stackFocus}</span>
                  </div>
                )}

                {data.location && (
                  <div className={classes.statItem}>
                    <span className={classes.statLabel}>
                      {t('sections.about.locationLabel')}
                    </span>
                    <span className={classes.statValue}>{data.location}</span>
                  </div>
                )}

                {meta.lookingForWork && (
                  <div className={classes.statItem}>
                    <span className={classes.statLabel}>
                      {t('sections.about.availabilityLabel')}
                    </span>
                    <span className={classes.statValueAvailability}>
                      <span className={classes.pulsingDot} />
                      {t('sections.about.openForCollaboration')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>

      {/* Inline keyframe for the download spinner (no extra CSS needed) */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Section>
  );
};

export default createRegisteredSection<AboutProps>('about', AboutSectionComponent);
