import React from 'react';
import { AppShell, Stack, Text, ScrollArea } from '@mantine/core';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useScrollSpy } from '@mantine/hooks';

interface NavbarProps {
  menuItems: { key: string; label: string }[];
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ menuItems, toggle }) => {
  const scrollSpy = useScrollSpy({
    selector: "section[id]",
  });

  // Handle menu item click
  const handleMenuClick = (key: string) => {
    const element = scrollSpy.data.find((element) => element.id === key);
    if (!element) return;

    if (scrollSpy) {
      // Use the scrollToElement function from scrollSpy hook
      element.getNode().scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Close the mobile menu if needed
      if (window.innerWidth < 768) {
        toggle();
      }
    }
  };

  return (
    <AppShell.Navbar p="md" style={{ backgroundColor: "var(--bg-tertiary)" }} >
      <AppShell.Section grow component={ScrollArea} >
        <Stack>
          <Text fw={700} size="sm">Navigation</Text>
          {menuItems.map((item) => (
            <Link 
              key={item.key} 
              to={`#${item.key}`} 
              className={`${classes.link} ${scrollSpy.data[scrollSpy.active]?.id.startsWith(item.key) ? classes.active : ''}`}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.label}
            </Link>
          ))}
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;