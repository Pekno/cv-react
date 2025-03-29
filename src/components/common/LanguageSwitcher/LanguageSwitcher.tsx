import React, { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import { useLanguage } from '../../../hooks/useLanguage';
import classes from './LanguageSwitcher.module.css';


const LanguageSwitcher: React.FC = () => {
  const { toggleLanguage, isEnglish } = useLanguage();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({
    fr: null,
    en: null
  });

  // Update refs when buttons mount
  const setControlRef = (lang: string) => (node: HTMLButtonElement) => {
    controlsRefs[lang] = node;
    setControlsRefs(controlsRefs);
  };

  const handleLanguageChange = (lang: string) => {
    if ((lang === 'en' && !isEnglish) || (lang === 'fr' && isEnglish)) {
      toggleLanguage();
    }
  };

  return (
    <div className={classes.languageContainer} ref={setRootRef}>
      <UnstyledButton
        className={classes.languageButton}
        ref={setControlRef('fr')}
        onClick={() => handleLanguageChange('fr')}
        mod={{ active: !isEnglish }}
      >
        <span className={classes.languageLabel}>FR</span>
      </UnstyledButton>

      <UnstyledButton
        className={classes.languageButton}
        ref={setControlRef('en')}
        onClick={() => handleLanguageChange('en')}
        mod={{ active: isEnglish }}
      >
        <span className={classes.languageLabel}>EN</span>
      </UnstyledButton>

      <FloatingIndicator
        target={controlsRefs[isEnglish ? 'en' : 'fr']}
        parent={rootRef}
        className={classes.floatingIndicator}
        transitionDuration={200}
      />
    </div>
  );
};

export default LanguageSwitcher;