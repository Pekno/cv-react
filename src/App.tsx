import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './App.css';
import Header from './components/common/Header/Header';
import Navbar from './components/common/Navbar/Navbar';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { useLanguage } from './hooks/useLanguage';
import { useProfileData } from './hooks/useProfileData';
import { getI18nKey, sectionRegistry } from './decorators/section.decorator';
import Footer from './components/common/Footer/Footer';
import i18n from './i18n/i18n';

// The build process will replace this with explicit imports of only the used sections
import.meta.glob('./components/sections/*/*.tsx', { eager: true });

const App: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data } = useProfileData();

  // Sync URL language parameter with i18n
  useEffect(() => {
    const supportedLngs = (i18n.options.supportedLngs || []).filter(
      (l): l is string => typeof l === 'string' && l !== 'cimode' && l !== 'dev'
    );

    if (lang && supportedLngs.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      navigate(`/${i18n.language}`, { replace: true });
    }
  }, [lang, navigate]);
  const [opened, { toggle }] = useDisclosure(false);

  // Get all registered sections in the registry
  const registeredSectionTypes = useMemo(() => {
    return Object.keys(sectionRegistry) as Array<keyof typeof sectionRegistry>;
  }, []);
  
  // Filter to only include section types that are in the profile data
  const sectionsToRender = useMemo(() => {
    return data.sections
      .filter(section => 
        registeredSectionTypes.includes(section.sectionName) && 
        sectionRegistry[section.sectionName]?.component != null
      )
      .map((section, index) => ({
        type: section.sectionName,
        data: section.data,
        evenSection: index % 2 === 0,
        component: sectionRegistry[section.sectionName]?.component
      }));
  }, [data.sections, registeredSectionTypes]);

  // Create menu items for navigation
  const menuItems = useMemo(() => {
    return sectionsToRender.map(section => ({
      key: section.type,
      label: t(getI18nKey(section.type))
    }));
  }, [sectionsToRender, t]);

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: 'md',
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      header={{ height: 60 }}
    >
      <Header opened={opened} toggle={toggle} menuItems={menuItems} />
      <Navbar menuItems={menuItems} toggle={toggle} />

      <AppShell.Main pt={60}>
        {sectionsToRender.map(section => {
          const Component = section.component;
          
          // Skip rendering if no component is registered for this section
          if (!Component) return null;
          
          // Directly render the component with its props
          return (
            <Component
              key={section.type}
              data={section.data}
              meta={data.meta}
              evenSection={section.evenSection}
            />
          );
        })}
        <Footer />
        <ScrollToTop />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;