import React, { useMemo } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './App.css';
import Header from './components/common/Header/Header';
import Navbar from './components/common/Navbar/Navbar';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { useLanguage } from './hooks/useLanguage';
import { useProfileData } from './hooks/useProfileData';
import { getI18nKey, getSectionOrder } from './decorators/section.decorator';
import Footer from './components/common/Footer/Footer';
import { useSectionRenderer } from './hooks/useSectionRenderer';

// Import components to ensure decorators are applied
import.meta.glob('./components/sections/*/*.tsx', { eager: true });

const App: React.FC = () => {
  const { t } = useLanguage();
  const { data } = useProfileData();
  const [opened, { toggle }] = useDisclosure(false);

  // Get section types in order from profile data
  const sectionOrder = getSectionOrder(data);

  // Create memoized section components
  const sections = sectionOrder.map(type => ({
      type,
      // This returns { component, renderSection, renderList } for each section type
      renderer: useSectionRenderer(type)
    }));

  // Filter to only include section types that have registered components
  const validSections = useMemo(() => {
    return sections.filter(section => section.renderer.component !== null);
  }, [sections]);

  // Convert to menu items for navigation
  const menuItems = useMemo(() => {
    return validSections.map(section => ({
      key: section.type,
      label: t(getI18nKey(section.type))
    }));
  }, [validSections, t]);

  // Render all the sections
  const renderedSections = useMemo(() => {
    return validSections.map((section, index) => {
      const sectionData = data.sections.find(s => s.sectionName === section.type);
      if (!sectionData) return null;

      const evenSection = index % 2 === 0;
      
      // Use the renderSection function from the hook
      return section.renderer.renderSection({
        data: sectionData.data,
        evenSection,
        meta: data.meta,
        itemKey: section.type // Use the section type as the React key
      });
    });
  }, [validSections, data]);

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
        {renderedSections}
        <Footer />
        <ScrollToTop />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;