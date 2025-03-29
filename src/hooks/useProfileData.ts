import profileData from "../data/profile-data";

/**
 * A hook that provides access to the profile data along with translation capabilities
 * Uses the existing useLanguage hook
 */
export const useProfileData = () => {
  return {
    data: profileData,
  };
};
