import React from 'react';
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
import { SocialPlatform } from '../../../types/profile-data.types';

export const getSocialIcon = (type: SocialPlatform): React.ElementType => {
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
      return IconLink;
  }
};
