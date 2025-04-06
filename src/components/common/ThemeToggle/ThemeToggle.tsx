import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useTheme } from '../../../hooks/useTheme';
import styles from './ThemeToggle.module.css';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * ThemeToggle component for switching between light and dark mode
 * 
 * Displays a sun icon in dark mode and a moon icon in light mode
 * to indicate the theme that will be switched to when clicked
 */
const ThemeToggle: React.FC = () => {
  const { toggleColorScheme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <Tooltip
      label={isDark ? t('theme.toggleLight') : t('theme.toggleDark')}
      position="bottom"
      withArrow
      transitionProps={{ transition: "pop" }}
    >
      <ActionIcon
        onClick={() => toggleColorScheme()}
        variant="subtle"
        color="gray"
        size="md"
        className={styles.themeToggle}
        aria-label={isDark ? t('theme.toggleLight') : t('theme.toggleDark')}
      >
        {isDark ? (
          <IconSun size="1.2rem" stroke={1.5} />
        ) : (
          <IconMoonStars size="1.2rem" stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;