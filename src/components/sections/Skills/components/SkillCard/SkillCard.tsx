import React from 'react';
import { Title, Text, Group } from '@mantine/core';
import classes from './SkillCard.module.css';

export interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  title,
  description,
  badges = [],
}) => {
  return (
    <div className={classes.skillCard}>
      <div className={classes.iconBox}>
        {icon}
      </div>

      <Title order={4} mt="md" mb="xs">
        {title}
      </Title>

      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>

      {badges.length > 0 && (
        <Group mt="auto" gap="xs" wrap="wrap">
          {badges.map((badge, index) => (
            <span key={index} className={classes.badge}>
              {badge}
            </span>
          ))}
        </Group>
      )}
    </div>
  );
};

export default SkillCard;
