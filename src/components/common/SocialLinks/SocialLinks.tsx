import React from 'react';
import { SocialLink } from '../../../types/profile-data.types';
import SocialIcons from './SocialIcons';

interface SocialLinksProps {
  socials: SocialLink[];
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'transparent';
}

/**
 * A reusable component for rendering social media links
 * Reduces duplication across section components
 * Now uses the extracted SocialIcons component for better reusability
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  socials,
  className = '',
  size = 'lg',
  radius = 'xl',
  variant = 'filled'
}) => {
  return (
    <SocialIcons
      socials={socials}
      className={className}
      size={size}
      radius={radius}
      variant={variant}
    />
  );
};

export default SocialLinks;