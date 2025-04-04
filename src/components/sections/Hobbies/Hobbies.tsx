import React, { useState, useCallback, useMemo } from 'react';
import { 
  Text,
  Card,
  Image,
  Grid,
  Box,
  Blockquote
} from '@mantine/core';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import classes from './Hobbies.module.css';
import { HobbiesProps, TravelItem, travelKey } from './Hobbies.types';
import { createRegisteredSection } from '@decorators/section.decorator';
import { TranslationKey } from '@/types/translations.types';

// Interface for the expanded image state
interface ExpandedImageState {
  img: string; 
  title: string; 
  desc: string;
}

// Create a memoized travel card component
const TravelCard = React.memo(({
  travel, 
  index, 
  t, 
  onClick
}: {
  travel: TravelItem;
  index: number;
  t: (key: TranslationKey, options?: any) => string;
  onClick: (travel: TravelItem) => void;
}) => (
  <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      className={classes.card}
      data-aos={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
      onClick={() => onClick(travel)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Section className={classes.imageContainer}>
        <Image
          src={travel.image}
          alt={t(travelKey(travel.id, 'title'))}
          className={classes.image}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </Card.Section>
      <Text fw={500} size="lg" mt="md" style={{ cursor: 'pointer' }}>
        {t(travelKey(travel.id, 'title'))}
      </Text>
    </Card>
  </Grid.Col>
));

// Create the Hobbies component as a regular function
const HobbiesSectionComponent = ({ data, evenSection = false }: HobbiesProps) => {
  const { t } = useLanguage();
  const [expandedImage, setExpandedImage] = useState<ExpandedImageState | null>(null);

  // Memoize the handler to prevent recreation on every render
  const handleImageClick = useCallback((travel: TravelItem) => {
    setExpandedImage({
      img: travel.image,
      title: t(travelKey(travel.id, 'title')),
      desc: t(travelKey(travel.id, 'desc'))
    });
  }, [t]);

  const closeExpandedImage = useCallback(() => {
    setExpandedImage(null);
  }, []);

  // Get hobbies data from props
  const { travels } = data;

  // Memoize the expanded image overlay to prevent unnecessary re-renders
  const expandedImageOverlay = useMemo(() => {
    if (!expandedImage) return null;
    
    return (
      <Box 
        className={classes.expandedImageOverlay} 
        onClick={closeExpandedImage}
        role="button"
        aria-label="Close expanded image"
        style={{ display: 'flex' }}
      >
        <div className={classes.expandedImageWrapper}>
          <img 
            src={expandedImage.img} 
            alt={expandedImage.title} 
            className={classes.expandedImage} 
            onClick={(e) => e.stopPropagation()}
          />
          <div className={classes.blockquoteContainer} onClick={(e) => e.stopPropagation()}>
            <div className={classes.blockquoteTitle}>{expandedImage.title}</div>
            <Blockquote 
              className={classes.blockquote}
              color="brand"
            >
              {expandedImage.desc}
            </Blockquote>
          </div>
        </div>
      </Box>
    );
  }, [expandedImage, closeExpandedImage]);

  // Memoize the travel cards grid to prevent unnecessary re-renders
  const travelCardsGrid = useMemo(() => (
    <Grid gutter="lg">
      {travels.map((travel, index) => (
        <TravelCard 
          key={index}
          travel={travel}
          index={index}
          t={t}
          onClick={handleImageClick}
        />
      ))}
    </Grid>
  ), [travels, t, handleImageClick]);

  return (
    <Section id="hobbies" title={t('menu.hobbies')} evenSection={evenSection}>
      <Text className={classes.introText} mb={30}>
        {t('sections.hobbies.intro')}
      </Text>
      
      {expandedImageOverlay}
      
      {travelCardsGrid}
    </Section>
  );
};

// Export with section registration
export default createRegisteredSection<HobbiesProps>('hobbies', HobbiesSectionComponent);