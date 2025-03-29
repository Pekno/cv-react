import React from 'react';
import { Card, Title, Group } from '@mantine/core';
import classes from './TechCategory.module.css';

interface TechCategoryProps {
  title: string;
  children: React.ReactNode;
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, children }) => {
  return (
    <Card withBorder shadow="sm" radius="md" className={classes.categoryCard}>
      <Card.Section withBorder inheritPadding py="xs" className={classes.categoryHeader}>
        <Title order={4}>{title}</Title>
      </Card.Section>
      <Card.Section p="md">
        <Group gap="sm" wrap="wrap">
          {children}
        </Group>
      </Card.Section>
    </Card>
  );
};

export default TechCategory;