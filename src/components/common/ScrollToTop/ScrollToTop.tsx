import React from 'react';
import { ActionIcon, Transition, Affix } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import classes from './ScrollToTop.module.css';

const ScrollToTop: React.FC = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const isVisible = scroll.y > 100;

  const scrollToTop = (): void => {
    scrollTo({ y: 0 });
  };

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition mounted={isVisible} transition="slide-up" duration={400} timingFunction="ease">
        {(styles) => (
          <ActionIcon
            size="lg"
            radius="xl"
            className={classes.scrollToTop}
            onClick={scrollToTop}
            style={styles}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <IconArrowUp size={16} stroke={2} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;