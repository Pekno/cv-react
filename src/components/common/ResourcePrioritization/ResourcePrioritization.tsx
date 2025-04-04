import React, { useEffect, useState } from 'react';
import { useProfileData } from '../../../hooks/useProfileData';

/**
 * A component that preloads critical resources for better performance
 * Resources are loaded with appropriate priorities based on their importance
 */
const ResourcePrioritization: React.FC = () => {
  const { data } = useProfileData();
  const [resourceLinks, setResourceLinks] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const links: React.ReactNode[] = [];
    
    // Preload all profile pictures with high priority
    // The first one gets highest priority since it's the default
    if (data.meta.profilePictures && data.meta.profilePictures.length > 0) {
      // First profile picture gets highest priority (preload)
      links.push(
        <link 
          key="profile-pic-main"
          rel="preload" 
          href={data.meta.profilePictures[0]} 
          as="image"
          fetchPriority="high"
        />
      );
      
      // Additional profile pictures get slightly lower priority (prefetch)
      data.meta.profilePictures.slice(1).forEach((pic, index) => {
        links.push(
          <link 
            key={`profile-pic-${index}`}
            rel="prefetch" 
            href={pic} 
            as="image"
          />
        );
      });
    }
    
    // Preload PDF resumes with medium priority
    Object.values(data.meta.pdfResume).forEach((pdfPath, index) => {
      if (pdfPath) {
        links.push(
          <link 
            key={`resume-${index}`}
            rel="prefetch" 
            href={pdfPath} 
            as="document"
          />
        );
      }
    });
    
    // Set the generated link elements
    setResourceLinks(links);
  }, [data.meta.profilePictures, data.meta.pdfResume]);
  
  // This component doesn't render anything visible
  // but adds the link elements to the document head
  return <>{resourceLinks}</>;
};

export default ResourcePrioritization;