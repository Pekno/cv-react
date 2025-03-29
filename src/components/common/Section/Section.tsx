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

/**
 * Reusable Section component for consistent section styling throughout the app
 * 
 * @param {string} id - Section ID for navigation anchor
 * @param {string} title - Section title
 * @param {React.ReactNode} children - Section content
 * @param {string} className - Additional CSS classes
 * @param {boolean} evenSection - Force even section styling (otherwise determined by context)
 */
const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  children, 
  className = '',
  evenSection,
}) => {
  // Use a class-based approach for the component
  const sectionClasses = [
    classes.section,
    'mantine-Section-root',
    className
  ];
  
  // If evenSection is explicitly provided, use that value
  if (evenSection !== undefined) {
    sectionClasses.push(evenSection ? classes.even : classes.odd);
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
          <Title 
            className={classes.sectionTitle} 
          >
            {title}
          </Title>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;