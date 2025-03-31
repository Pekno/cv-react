import { Group, Image, Text } from "@mantine/core";
import classes from './ExperienceLabel.module.css';

interface ExperienceLabelProps {
    companyName: string;
    companyLogo: string;
    jobTitle: string;
  }
  
export const ExperienceLabel: React.FC<ExperienceLabelProps> = ({ companyName, companyLogo, jobTitle }) => {
    return (
      <Group wrap="nowrap" className={classes.accordionLabel}>
        <div className={classes.logoContainer}>
          <Image 
            src={companyLogo} 
            alt={companyName}
            height={40}
            w="auto"
            fit="contain"
            className={classes.companyLogo}
          />
        </div>
        <div className={classes.labelContent}>
          <Text fw={700} className={classes.companyName} span>{companyName}</Text>
          <Group gap="xs">
            <Text size="sm" fw={500} span className={classes.jobTitle}>
              {jobTitle}
            </Text>
          </Group>
        </div>
      </Group>
    );
}