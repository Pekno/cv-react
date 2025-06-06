import React from 'react';
import { 
  Container, 
  Group, 
  Burger, 
  Title,
  AppShell,
  Badge
} from '@mantine/core';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import classes from './Header.module.css';
import { useScrollSpy } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useProfileData } from '@hooks/useProfileData';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  menuItems: { key: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ opened, toggle, menuItems }) => {
  // Get the isUsingExampleData flag from the useProfileData hook
  const { data, isUsingExampleData } = useProfileData();
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
    }
  };

  return (
    <AppShell.Header style={{ height: "auto", backgroundColor: "var(--bg-tertiary)" }} className={classes.header}>
      <Container size="xl">
        <Group justify="space-between" h="100%">
          <Group>
            <Burger 
              opened={opened} 
              onClick={toggle} 
              size="sm" 
              hiddenFrom="md" 
            />
            <Title order={4}>{data.meta.name}</Title>
            {isUsingExampleData && (
              <Badge color="yellow" variant="outline" ml="sm">
                DEMO MODE - Using Example Data
              </Badge>
            )}
          </Group>
          
          <Group gap={15} visibleFrom="md">
            {menuItems.map((item) => (
              <Link   
                key={item.key} 
                to={`#${item.key}`} 
                className={`${classes.link} ${scrollSpy.data[scrollSpy.active]?.id.startsWith(item.key) ? classes.active : ''}`}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.label}
              </Link >
            ))}
            <Group gap="xs">
              <ThemeToggle />
              <LanguageSwitcher />
            </Group>
          </Group>
          
          {/* On mobile, only show theme toggle and language switcher in header */}
          <Group gap="xs" hiddenFrom="md">
            <ThemeToggle />
            <LanguageSwitcher />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default Header;