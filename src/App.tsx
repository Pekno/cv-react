import React, { useMemo } from 'react';
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

// The build process will replace this with explicit imports of only the used sections
import.meta.glob('./components/sections/*/*.tsx', { eager: true });

const App: React.FC = () => {
  const { t } = useLanguage();
  const { data } = useProfileData();
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