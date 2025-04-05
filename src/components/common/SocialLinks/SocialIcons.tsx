import React from 'react';
import { Group, ActionIcon } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandDribbble,
  IconBrandBehance,
  IconBrandMedium,
  IconBrandStackoverflow,
  IconWorld,
  IconLink
} from '@tabler/icons-react';
import { SocialLink, SocialPlatform } from '../../../types/profile-data.types';
import classes from './SocialLinks.module.css';

interface SocialIconsProps {
  socials: SocialLink[];
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'transparent';
}

// Get the appropriate icon component with type safety
export const getSocialIcon = (type: SocialPlatform) => {
  // Use lowercase for consistent matching
  const platformType = type.toLowerCase() as SocialPlatform;

  switch (platformType) {
    case 'github':
      return IconBrandGithub;
    case 'linkedin':
      return IconBrandLinkedin;
    case 'twitter':
      return IconBrandTwitter;
    case 'instagram':
      return IconBrandInstagram;
    case 'facebook':
      return IconBrandFacebook;
    case 'youtube':
      return IconBrandYoutube;
    case 'dribbble':
      return IconBrandDribbble;
    case 'behance':
      return IconBrandBehance;
    case 'medium':
      return IconBrandMedium;
    case 'stackoverflow':
      return IconBrandStackoverflow;
    case 'website':
      return IconWorld;
    default:
      return IconLink; // Fallback icon for unknown types
  }
};

/**
 * A reusable component for rendering social media icons
 * Reduces duplication across components
 */
export const SocialIcons: React.FC<SocialIconsProps> = ({
  socials,
  className = '',
  size = 'lg',
  radius = 'xl',
  variant = 'filled'
}) => {
  return (
    <Group gap="sm">
      {socials.map((social: SocialLink) => {
        const SocialIcon = getSocialIcon(social.type);
        return (
          <ActionIcon
            key={social.type}
            size={size}
            radius={radius}
            variant={variant}
            className={`${className} ${classes.socialLink}`}
            component="a"
            href={social.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon size={size === 'lg' ? 18 : 16} />
          </ActionIcon>
        );
      })}
    </Group>
  );
};

export default SocialIcons;