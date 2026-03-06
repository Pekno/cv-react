import React from 'react';
import { Box, Container, Title } from '@mantine/core';
import classes from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  evenSection?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = '',
  evenSection,
}) => {
  const sectionClasses = [
    classes.section,
    'mantine-Section-root',
    className
  ];

  if (evenSection !== undefined) {
    sectionClasses.push(evenSection ? classes.sectionEven : classes.sectionOdd);
  }

  return (
    <Box
      component="section"
      id={id}
      className={sectionClasses.join(' ')}
      data-order={0}
    >
      <Container>
        {title && (
          <div className={classes.headingRow}>
            <div className={classes.headingLeft}>
              <Title className={classes.sectionTitle} order={2}>
                {title}
              </Title>
            </div>
            <div className={classes.accentBar} />
          </div>
        )}
        <div className={classes.fadeIn}>
          {children}
        </div>
      </Container>
    </Box>
  );
};

export default Section;