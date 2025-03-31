import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { Box, Text, Group, ActionIcon } from '@mantine/core';
import { IconX, IconMinus, IconSquare } from '@tabler/icons-react';
import classes from './ConsoleTypingAnimation.module.css';
import { useProfileData } from '@hooks/useProfileData';
import { Link } from 'react-router-dom';
import { ExperiencesData } from '@components/sections/Experiences/Experiences.types';

interface ConsoleTypingAnimationProps {
  content: string;
  authorName: string;
  typingDelay?: {
    min: number;
    max: number;
  };
  skipAnimation?: boolean;
  onComplete?: () => void;
}

const ConsoleTypingAnimation: React.FC<ConsoleTypingAnimationProps> = ({
  content,
  authorName,
  typingDelay = { min: 5, max: 20 },
  skipAnimation = false,
  onComplete,
}) => {  
  // Initialize with content already displayed if animation is skipped
  const [displayedContent, setDisplayedContent] = useState(skipAnimation ? content : '');
  const [isTyping, setIsTyping] = useState(!skipAnimation);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { data } = useProfileData();
  const experienceSection: ExperiencesData | null = data.sections.find(x => x.sectionName === "experiences")?.data as ExperiencesData;

  // Handle menu item click
  const handleMenuClick = (key: string) => {
    document.getElementById(`work-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  // Parse the content into an array of React elements (text nodes and links)
  const buildContentElements = (text: string): ReactNode[] => {
    try {
      const experiences = experienceSection?.experiences;
      const elements: ReactNode[] = [];
      
      // If there are no experiences, just return the text
      if (experiences.length === 0) {
        return [text];
      }
      
      // Create a map of company names to their IDs for quick lookups
      const companyMap = new Map<string, string>();
      experiences.forEach(exp => {
        if (exp.companyName && exp.id) {
          companyMap.set(exp.companyName, exp.id);
        }
      });
      
      // If we have no company names, just return the text
      if (companyMap.size === 0) {
        return [text];
      }
      
      // Create a regex pattern that matches any of the company names
      // We need to escape special regex characters in company names
      const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
      
      const companyNames = Array.from(companyMap.keys()).map(escapeRegExp);
      const companyPattern = companyNames.join('|');
      const regex = new RegExp(`(${companyPattern})`, 'g');
      
      // Split the text by company names and create elements
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        const matchedText = match[0];
        const matchIndex = match.index;
        
        // Add text before the company name
        if (matchIndex > lastIndex) {
          elements.push(text.substring(lastIndex, matchIndex));
        }
        
        // Add the company name as a link
        const companyId = companyMap.get(matchedText);
        elements.push(
          <Link 
            key={`${matchedText}-${matchIndex}`} 
            to={`#work-${companyId?.replace(' ', '_')}`}
            className={classes.consoleLink}
            onClick={() => handleMenuClick(companyId?? "")}
          >
            {matchedText}
          </Link>
        );
        
        lastIndex = matchIndex + matchedText.length;
      }
      
      // Add any remaining text after the last company name
      if (lastIndex < text.length) {
        elements.push(text.substring(lastIndex));
      }
      
      return elements;
    } catch (error) {
      // If there's any error, return the original content as plain text
      console.error('Error building content elements:', error);
      return [text];
    }
  };
  
  // Build the content elements and memoize the result
  const contentElements = useMemo(() => 
    buildContentElements(content), 
    [content, experienceSection.experiences]
  );

  // Typing animation effect
  useEffect(() => {
    // Skip animation if requested
    if (skipAnimation && isTyping) {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
      return;
    }
    
    if (isTyping && displayedContent.length < content.length) {
      const randomDelay = Math.floor(
        Math.random() * (typingDelay.max - typingDelay.min + 1) + typingDelay.min
      );

      const typingTimeout = setTimeout(() => {
        setDisplayedContent(content.substring(0, displayedContent.length + 1));
      }, randomDelay);

      return () => clearTimeout(typingTimeout);
    } else if (isTyping && displayedContent.length === content.length) {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
    return;
  }, [displayedContent, content, isTyping, typingDelay, onComplete, skipAnimation]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Render content based on whether we're still typing or not
  const renderContent = () => {
    // If we're still typing, show just the plain text with cursor
    if (isTyping) {
      return (
        <>
          {displayedContent}
          <span className={cursorVisible ? classes.cursor : classes.cursorHidden}>_</span>
        </>
      );
    }

    // Once typing is complete, render the built React elements
    return <>{contentElements}</>;
  };

  return (
    <Box className={classes.consoleContainer}>
      <Box className={classes.consoleHeader}>
        <Text size="sm" fw={500} className={classes.consoleTitle}>
          Command Prompt - {authorName}_profile.cmd
        </Text>
        <Group gap="xs" className={classes.windowControls}>
          <ActionIcon size="xs" variant="subtle" className={classes.windowButton}>
            <IconMinus size={12} />
          </ActionIcon>
          <ActionIcon size="xs" variant="subtle" className={classes.windowButton}>
            <IconSquare size={12} />
          </ActionIcon>
          <ActionIcon size="xs" variant="subtle" className={classes.windowButton} color="red">
            <IconX size={12} />
          </ActionIcon>
        </Group>
      </Box>
      <Box className={classes.consoleBody}>
        <Group gap="xs" mb="xs">
          <Text span size="sm" fw={700} className={classes.commandText}>
            C:\Users\{authorName.split(' ')[0]}\{'>'} type about_me.txt
          </Text>
        </Group>
        <Text className={classes.consoleContent}>
          {renderContent()}
        </Text>
        {!isTyping && (
          <Group gap="xs" mt="md">
            <Text span size="sm" fw={700} className={classes.commandPrompt}>
              C:\Users\{authorName.split(' ')[0]}\{'>'} _
            </Text>
          </Group>
        )}
      </Box>
    </Box>
  );
};

export default ConsoleTypingAnimation;