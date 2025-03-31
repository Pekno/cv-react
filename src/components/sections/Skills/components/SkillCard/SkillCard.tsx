import React, { useMemo } from 'react';
import { Paper, ThemeIcon, Title, Text, Group, Badge } from '@mantine/core';
import { useColorPalette } from '@hooks/useColorPalette';
import classes from './SkillCard.module.css';

export interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
  seed: number;
  mainColor?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon, 
  title, 
  description, 
  badges = [],
  seed,
  mainColor
}) => {
  // Generate a color palette specifically for this skill card
  const { getColorForString, isColorDark, generateColorVariations } = useColorPalette(10, seed);
  
  // Main color for the card based on the provided mainColor or fallback to title-based color
  const cardColor = useMemo(() => 
    mainColor || getColorForString(title),
    [mainColor, title, getColorForString]
  );
  
  // Generate a set of color variations for badges
  const colorVariations = useMemo(() => 
    generateColorVariations(cardColor, badges.length),
    [cardColor, badges.length, generateColorVariations]
  );
  
  // Very light version of main color for card background
  const cardBgColor = useMemo(() => {
    const match = cardColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (!match) return 'transparent';
    
    const h = parseInt(match[1] ?? "");
    const s = parseInt(match[2] ?? "");
    // Very high lightness for subtle background
    return `hsl(${h}, ${s}%, 97%)`;
  }, [cardColor]);
  
  return (
    <Paper 
      p="lg" 
      radius="md" 
      shadow="sm" 
      className={classes.skillCard}
      withBorder
      style={{
        background: `linear-gradient(to bottom right, white, ${cardBgColor})`,
        borderColor: cardColor,
        borderLeftWidth: '3px'
      }}
    >
      <ThemeIcon 
        size={50} 
        radius="md" 
        className={classes.skillIcon}
        style={{ backgroundColor: cardColor }}
      >
        {React.cloneElement(icon as React.ReactElement)}
      </ThemeIcon>

      <Title order={4} mt="md" mb="xs" style={{ color: cardColor }}>
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