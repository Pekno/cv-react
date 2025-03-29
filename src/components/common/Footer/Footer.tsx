import React from 'react';
import { Text, Anchor, Box } from '@mantine/core';
import classes from './Footer.module.css';

interface FooterProps {
  children?: React.ReactNode;
}

/**
 * A simple footer component that displays attribution or other information
 * at the bottom of the page.
 */
const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <Box component="footer" className={classes.footer}>
      <Text size="sm" className={classes.footerText}>
        {children || (
          <>
            Made with ❤️ by{' '}
            <Anchor href="https://github.com/Pekno/cv-react" target="_blank" rel="noopener noreferrer">
              @Pekno
            </Anchor>
          </>
        )}
      </Text>
    </Box>
  );
};

export default Footer;