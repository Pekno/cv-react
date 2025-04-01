import { use } from "react";
import realProfileData from "../data/profile-data";
import exampleProfileData from "../data/profile-data.example";

// Declare the global variable for TypeScript
declare const __USE_EXAMPLE_DATA__: boolean;

// Access build-time flag to choose between example and real data
// This flag is set in vite.config.ts based on the build mode
// Run with `npm run dev --mode=demo` to use example data
const profileData = __USE_EXAMPLE_DATA__ ? exampleProfileData : realProfileData;
const profileDataPromise = Promise.resolve(profileData);

/**
 * A hook that provides access to the profile data
 * Uses React 19's `use` hook for handling the Promise
 * Automatically switches between real and example data based on build mode
 */
export const useProfileData = () => {
  return {
    data: use(profileDataPromise),
    // Expose whether we're using example data for debugging purposes
    isUsingExampleData: __USE_EXAMPLE_DATA__ || false
  };
};
