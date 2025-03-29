import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './App.css';
import Header from './components/common/Header/Header';
import Navbar from './components/common/Navbar/Navbar';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { useLanguage } from './hooks/useLanguage';
import { useProfileData } from './hooks/useProfileData';
// Import functions from section.decorator instead of section config
import { sectionRegistry, getI18nKey, getSectionOrder } from './decorators/section.decorator';
import Footer from './components/common/Footer/Footer';

// Import components to ensure decorators are applied
import.meta.glob('./components/sections/*/*.tsx', { eager: true });

const App: React.FC = () => {
  const { t } = useLanguage();
  const { data } = useProfileData();
  const [opened, { toggle }] = useDisclosure(false);

  // Get section types in order from profile data
  const sectionOrder = getSectionOrder(data);

  // Filter to only include section types that have registered components
  const validSectionTypes = sectionOrder.filter(type => sectionRegistry[type]);

  // Convert to menu items for navigation
  const menuItems = validSectionTypes.map(type => ({
    key: type,
    label: t(getI18nKey(type))
  }));

  // Function to render components based on section registry and order
  const renderSections = () => {
    return validSectionTypes.map((type, index) => {
      const registryItem = sectionRegistry[type];
      if (!registryItem) return null; // Skip if no component registered for this type
      
      const Component = registryItem.component;
      
      // Find the section data
      const sectionData = data.sections.find(section => section.sectionName === type);
      if (!sectionData) return null;
      
      // Calculate evenSection based on index
      const evenSection = index % 2 === 0;
      
      // Common props for all components
      const commonProps = {
        data: sectionData.data,
        evenSection
      };
      
      // All other components just use common props
      return <Component key={type} {...commonProps} meta={data.meta} />;
    });
  };

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
        {/* Dynamically render sections based on registry */}
        {renderSections()}
        {/* Add the Footer component */}
        <Footer/>
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;