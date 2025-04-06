import React, { useMemo } from 'react';
import { Paper, ThemeIcon, Title, Text, Group, Badge } from '@mantine/core';
import classes from './SkillCard.module.css';

export interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
  mainColor: string;
  generateVariants: (baseHex: string, count: number) => string[];
  isColorDark: (hex: string) => boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon, 
  title, 
  description, 
  badges = [],
  mainColor,
  generateVariants,
  isColorDark
}) => {
  
  // Generate a set of color variations for badges
  const colorVariations = useMemo(() => 
    generateVariants(mainColor, badges.length),
    [mainColor, badges.length, generateVariants]
  );
  
  // Very light version of main color for card background
  const cardBgColor = useMemo(() => {
    const match = mainColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (!match) return 'transparent';
    
    const h = parseInt(match[1] ?? "");
    const s = parseInt(match[2] ?? "");
    // Very high lightness for subtle background
    return `hsl(${h}, ${s}%, 97%)`;
  }, [mainColor]);
  
  return (
    <Paper 
      p="lg" 
      radius="md" 
      shadow="sm" 
      className={classes.skillCard}
      withBorder
      style={{
        background: `linear-gradient(to bottom right, var(--bg-secondary), ${cardBgColor})`,
        borderColor: mainColor,
        borderLeftWidth: '3px'
      }}
    >
      <ThemeIcon 
        size={50} 
        radius="md" 
        className={classes.skillIcon}
        style={{ backgroundColor: mainColor }}
      >
        {React.cloneElement(icon as React.ReactElement)}
      </ThemeIcon>

      <Title order={4} mt="md" mb="xs" style={{ color: mainColor }}>
        {title}
      </Title>

      <Text size="sm" mb="md">
        {description}
      </Text>

      {badges.length > 0 && (
        <Group mt="auto" gap="xs">
          {badges.map((badge, index) => {
            const badgeColor = colorVariations[index % colorVariations.length];
            const textColor = isColorDark(badgeColor ?? "") ? 'white' : 'black';
            
            return (
              <Badge 
                key={index} 
                variant="filled" 
                styles={{ 
                  root: { 
                    backgroundColor: badgeColor,
                    color: textColor,
                    fontWeight: 500,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    padding: '6px 12px'
                  } 
                }}
              >
                {badge}
              </Badge>
            );
          })}
        </Group>
      )}
    </Paper>
  );
};

export default SkillCard;