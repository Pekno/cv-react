import React, { useState } from 'react';
import { SegmentedControl, ActionIcon, Menu, Button } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useLanguage } from '@hooks/useLanguage';
import classes from './LanguageSwitcher.module.css';

interface LanguageOption {
  value: string;
  label: string;
}

// Create options with nice display names
const buildLang = (langs: string[]): LanguageOption[] => {
  return langs.map(lang => ({
    value: lang,
    // Display language names in their own language
    label: getLanguageNativeName(lang)
  }));
}

// Function to get native language names
const getLanguageNativeName = (code: string): string => {
  const languageNames: Record<string, string> = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어',
    // Add more languages as needed
  };
  
  return languageNames[code] || code.toUpperCase();
};

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, supportedLanguages, setLanguage } = useLanguage();
  const [languageOptions] = useState<LanguageOption[]>(buildLang(supportedLanguages));

  // Handle language change
  const handleLanguageChange = (newLanguage?: string) => {
    if(!newLanguage) return;
    setLanguage(newLanguage);
  };

  // Render different UI based on number of languages
  if (languageOptions.length <= 1) {
    // Don't render anything if there's only one language
    return null;
  } else if (languageOptions.length === 2) {
    // For two languages, render a simple toggle
    return (
      <ActionIcon
        onClick={() => {
          const otherLang = languageOptions.find(
            option => option.value !== currentLanguage
          )?.value || languageOptions[0]?.value;
          handleLanguageChange(otherLang);
        }}
        className={classes.languageToggle}
        variant="subtle"
        color="gray"
        size="md"
        aria-label="Switch language"
      >
        {currentLanguage.toUpperCase()}
      </ActionIcon>
    );
  } else if (languageOptions.length <= 5) {
    // For 3-5 languages, use a segmented control
    return (
      <SegmentedControl
        value={currentLanguage}
        onChange={handleLanguageChange}
        data={languageOptions}
        size="xs"
        className={classes.segmentedControl}
      />
    );
  } else {
    // For many languages, use a dropdown menu
    return (
      <Menu position="bottom-end" withArrow>
        <Menu.Target>
          <Button
            variant="subtle"
            rightSection={<IconLanguage size={16} />}
            size="xs"
            className={classes.languageButton}
          >
            {getLanguageNativeName(currentLanguage)}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {languageOptions.map(option => (
            <Menu.Item
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
              className={
                option.value === currentLanguage
                  ? classes.activeLanguage
                  : undefined
              }
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }
};

export default LanguageSwitcher;