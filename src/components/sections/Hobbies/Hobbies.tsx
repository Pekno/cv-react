import React, { useState, useCallback } from 'react';
import {
  Text,
  Modal,
  Stack,
  ActionIcon,
  CloseButton,
  Box,
} from '@mantine/core';
import { useLanguage } from '@hooks/useLanguage';
import Section from '@components/common/Section/Section';
import classes from './Hobbies.module.css';
import { HobbiesProps, HobbyItem, hobbyKey } from './Hobbies.types';
import { createRegisteredSection } from '@decorators/section.decorator';

// ── Bento Card ────────────────────────────────────────────────────────────────

const BentoCard = React.memo(({
  item,
  onClick,
  t,
}: {
  item: HobbyItem;
  onClick: (item: HobbyItem) => void;
  t: (key: ReturnType<typeof hobbyKey>) => string;
}) => {
  const colSpan = item.colSpan ?? 1;
  const rowSpan = item.rowSpan ?? 1;

  return (
    <div
      className={classes.card}
      data-col-span={colSpan}
      data-row-span={rowSpan}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      aria-label={t(hobbyKey(item.id, 'title'))}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(item); }}
    >
      {/* Background image */}
      <div
        className={classes.cardImage}
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className={classes.cardOverlay} aria-hidden="true" />

      {/* Card content — slides up on hover */}
      <div className={classes.cardContent}>
        <div className={classes.cardMeta}>
          <span className={classes.cardIcon} aria-hidden="true">
            <span className="material-symbols-outlined">{item.icon}</span>
          </span>
          <span className={classes.cardSubtitle}>{t(hobbyKey(item.id, 'subtitle'))}</span>
        </div>
        <p className={classes.cardTitle}>{t(hobbyKey(item.id, 'title'))}</p>
      </div>
    </div>
  );
});

BentoCard.displayName = 'BentoCard';

// ── Lightbox Modal ────────────────────────────────────────────────────────────

interface LightboxState {
  item: HobbyItem;
  index: number;
}

const HobbiesLightbox = ({
  state,
  items,
  onClose,
  onNavigate,
  t,
}: {
  state: LightboxState;
  items: HobbyItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  t: (key: ReturnType<typeof hobbyKey>) => string;
}) => {
  const { item, index } = state;
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  return (
    <Modal
      opened
      onClose={onClose}
      size="xl"
      padding={0}
      radius="lg"
      classNames={{
        content: classes.modalContent,
        body: classes.modalBody,
        overlay: classes.modalOverlay,
      }}
      withCloseButton={false}
      centered
    >
      <div className={classes.lightbox}>
        {/* Left: image panel (2/3) */}
        <div className={classes.lightboxImage}>
          <img
            src={item.image}
            alt={t(hobbyKey(item.id, 'title'))}
            className={classes.lightboxImg}
          />
        </div>

        {/* Close button — top-right of modal */}
        <CloseButton
          onClick={onClose}
          className={classes.lightboxClose}
          aria-label="Close"
        />

        {/* Right: content panel (1/3) */}
        <div className={classes.lightboxPanel}>
          <Stack gap="md" className={classes.lightboxPanelInner}>
            {/* Location label */}
            <div className={classes.lightboxMeta}>
              <span className={`material-symbols-outlined ${classes.lightboxMetaIcon}`}>
                location_on
              </span>
              <span className={classes.lightboxSubtitle}>{t(hobbyKey(item.id, 'subtitle'))}</span>
            </div>

            {/* Title */}
            <Text className={classes.lightboxTitle} component="h2">
              {t(hobbyKey(item.id, 'title'))}
            </Text>

            {/* Description */}
            <Text className={classes.lightboxDesc}>
              {t(hobbyKey(item.id, 'desc'))}
            </Text>

            {/* Navigation */}
            <div className={classes.lightboxNav}>
              <ActionIcon
                variant="subtle"
                size="lg"
                disabled={!hasPrev}
                onClick={() => onNavigate(index - 1)}
                className={classes.lightboxNavBtn}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </ActionIcon>
              <Text className={classes.lightboxNavLabel} size="sm">
                {index + 1} / {items.length}
              </Text>
              <ActionIcon
                variant="subtle"
                size="lg"
                disabled={!hasNext}
                onClick={() => onNavigate(index + 1)}
                className={classes.lightboxNavBtn}
                aria-label="Next"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </ActionIcon>
            </div>
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────

const HobbiesSectionComponent = ({ data, evenSection = false }: HobbiesProps) => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const handleCardClick = useCallback((item: HobbyItem) => {
    const index = data.items.indexOf(item);
    setLightbox({ item, index });
  }, [data.items]);

  const handleNavigate = useCallback((index: number) => {
    const item = data.items[index];
    if (item) setLightbox({ item, index });
  }, [data.items]);

  const handleClose = useCallback(() => setLightbox(null), []);

  // Cast t to be compatible with hobbyKey return type
  const typedT = t as unknown as (key: ReturnType<typeof hobbyKey>) => string;

  return (
    <Section id="hobbies" title={t('menu.hobbies')} evenSection={evenSection}>
      <Box mb="xl">
        <p className={classes.introText}>
          {t('sections.hobbies.subtitle')}
        </p>
      </Box>

      {/* Bento grid */}
      <div className={classes.bentoGrid}>
        {data.items.map((item) => (
          <BentoCard
            key={item.id}
            item={item}
            onClick={handleCardClick}
            t={typedT}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <HobbiesLightbox
          state={lightbox}
          items={data.items}
          onClose={handleClose}
          onNavigate={handleNavigate}
          t={typedT}
        />
      )}
    </Section>
  );
};

export default createRegisteredSection<HobbiesProps>('hobbies', HobbiesSectionComponent);
