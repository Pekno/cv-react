import { use } from "react";
import profileData from "../data/profile-data";

// Create a promise that resolves to profile data (initialized once outside components)
const profileDataPromise = Promise.resolve(profileData);

/**
 * A hook that provides access to the profile data
 * Uses React 19's `use` hook for handling the Promise
 */
export const useProfileData = () => {
  return {
    data: use(profileDataPromise),
  };
};
