import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconArrowUpRight, IconCode } from '@tabler/icons-react';
import classes from './ProjectCarousel.module.css';

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
  category?: string;
  tags?: string[];
}

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const AUTOPLAY_DELAY = 5000;

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  const featured = projects[selectedIndex];

  const selectProject = useCallback((index: number) => {
    setSelectedIndex(index);
    // Reset autoplay timer on manual interaction
    if (autoplayRef.current !== null) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = window.setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % projects.length);
    }, AUTOPLAY_DELAY);
  }, [projects.length]);

  // Start autoplay on mount
  useEffect(() => {
    if (projects.length <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % projects.length);
    }, AUTOPLAY_DELAY);
    return () => {
      if (autoplayRef.current !== null) clearInterval(autoplayRef.current);
    };
  }, [projects.length]);

  if (!featured) return null;

  return (
    <div className={classes.spotlightContainer}>
      {/* ── Featured card ── */}
      <div className={classes.featuredCard}>
        {/* Left: image */}
        <div className={classes.featuredImageWrapper}>
          <img
            src={featured.image}
            alt={featured.title}
            className={classes.featuredImage}
            draggable={false}
          />
          <div className={classes.imageOverlay} />
        </div>

        {/* Right: content */}
        <div className={classes.featuredContent}>

          <h2 className={classes.featuredTitle}>{featured.title}</h2>
          <p className={classes.featuredDescription}>{featured.description}</p>

          {featured.link && (
            <div className={classes.actionsRow}>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.primaryButton}
              >
                <IconCode size={15} className={classes.buttonIcon} />
                {featured.linkText ?? 'Source Code'}
                <IconArrowUpRight size={14} className={classes.buttonArrow} />
              </a>
              <span className={classes.statusLink}>
                <span className={classes.statusDot} />
                Live Status
              </span>
            </div>
          )}
        </div>

        {/* Corner icon button */}
        <div className={classes.cornerBadge}>
          <span className={classes.cornerIndex}>
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Thumbnail row ── */}
      {projects.length > 1 && (
        <div className={classes.thumbnailRow}>
          {projects.map((project, index) => (
            <button
              key={index}
              className={`${classes.thumbnail} ${index === selectedIndex ? classes.thumbnailActive : ''}`}
              onClick={() => selectProject(index)}
              aria-label={`Select project: ${project.title}`}
              aria-pressed={index === selectedIndex}
            >
              <div className={classes.thumbnailImageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={classes.thumbnailImage}
                  draggable={false}
                />
                {index === selectedIndex && (
                  <div className={classes.thumbnailActiveOverlay} />
                )}
              </div>
              <span className={classes.thumbnailLabel}>{project.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
