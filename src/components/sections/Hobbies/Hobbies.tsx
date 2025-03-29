import React, { useState } from 'react';
import { 
  Text,
  Card,
  Image,
  Grid,
  Box,
  Blockquote
} from '@mantine/core';
import { useLanguage } from '../../../hooks/useLanguage';
import Section from '../../common/Section/Section';
import classes from './Hobbies.module.css';
import { HobbiesData, HobbiesProps, TravelItem, travelKey } from './Hobbies.types';
import { registerSection } from '../../../decorators/section.decorator';


const Hobbies: React.FC<HobbiesProps> = ({ data, evenSection = false }) => {
  const { t } = useLanguage();
  const [expandedImage, setExpandedImage] = useState<{img: string; title: string; desc: string} | null>(null);

  const handleImageClick = (travel: TravelItem) => {
    setExpandedImage({
      img: travel.image,
      title: t(travelKey(travel.id, 'title')),
      desc: t(travelKey(travel.id, 'desc'))
    });
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  // Get hobbies data from props
  const { travels } = data;

  return (
    <Section id="hobbies" title={t('menu.hobbies')} evenSection={evenSection}>
      <Text className={classes.introText} mb={30}>
        {t('sections.hobbies.intro')}
      </Text>
      
      {expandedImage && (
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
      )}
      
      <Grid gutter="lg">
        {travels.map((travel, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
            <Card 
              shadow="sm" 
              padding="lg" 
              radius="md" 
              withBorder 
              className={classes.card}
              data-aos={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
              onClick={() => handleImageClick(travel)}
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
        ))}
      </Grid>
    </Section>
  );
};

export default registerSection<HobbiesData>({ type: 'hobbies' })(Hobbies);