import { ProfileData } from "../types/profile-data.types";

/**
 * Example profile data for demonstrating the CV structure
 * Replace with your own information
 */
export const profileData: ProfileData = {
  meta: {
    name: "Alex Morgan",
    profilePictures: [
      "./src/assets/profiles/default.jpg",
      // Add more profile pictures if needed
    ],
    pdfResume: {
      en: "./pdf/CV - Alex Morgan - EN.pdf",
      fr: "./pdf/CV - Alex Morgan - FR.pdf",
    },
    socials: [
      {
        type: "github",
        url: "https://github.com/alexmorgan-dev",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/alexmorgan-dev/",
      },
      {
        type: "twitter",
        url: "https://twitter.com/alexmorgan_dev",
      },
      {
        type: "website",
        url: "https://alexmorgan.dev",
      },
    ],
    lookingForWork: true,
  },
  // Theme configuration for the demo version - uses a different color scheme
  theme: {
    // Primary brand color (this will generate a full palette)
    primaryColor: "#3f51b5", // A purple/indigo color for the demo
  },
  sections: [
    // About Section
    {
      sectionName: "about",
      data: {
        yearsOfExperience: 8,
        stackFocus: "React / Node.js / Go",
        location: "San Francisco, CA",
      },
    },

    // Skills Section
    {
      sectionName: "skills",
      data: {
        mainSkills: [
          {
            id: "leadership",
            icon: "IconBriefcase",
            badges: ["teamLeading", "technicalLeadership", "mentoring"],
          },
          {
            id: "projectManagement",
            icon: "IconTarget",
            badges: ["agile", "scrum", "kanban", "planning"],
          },
          {
            id: "analysis",
            icon: "IconBrain",
            badges: ["requirements", "technicalSpecs", "architecture"],
          },
          {
            id: "quality",
            icon: "IconClipboardCheck",
            badges: ["codeReviews", "cicd", "testing", "devOps"],
          },
          {
            id: "clientInteraction",
            icon: "IconUsers",
            badges: ["requirementsGathering", "presentations", "support"],
          },
          {
            id: "adaptability",
            icon: "IconRefresh",
            badges: ["newTechnologies", "selfLearning", "versatility"],
          },
        ],
        categories: [
          {
            id: "programmingLanguages",
            items: [
              { name: "TypeScript", icon: "typescript" },
              { name: "JavaScript", icon: "javascript" },
              { name: "Python", icon: "python" },
              { name: "Go", icon: "go" },
              { name: "C#", icon: "csharp" },
            ],
          },
          {
            id: "frontend",
            items: [
              { name: "React", icon: "react" },
              { name: "Next.js", icon: "nextdotjs" },
              { name: "Vue.js", icon: "vuedotjs" },
              { name: "Tailwind CSS", icon: "tailwindcss" },
              { name: "Redux", icon: "redux" },
            ],
          },
          {
            id: "backend",
            items: [
              { name: "Node.js", icon: "nodedotjs" },
              { name: "Express", icon: "express" },
              { name: "NestJS", icon: "nestjs" },
              { name: "FastAPI", icon: "fastapi" },
              { name: ".NET", icon: "dotnet" },
            ],
          },
          {
            id: "databases",
            items: [
              { name: "MongoDB", icon: "mongodb" },
              { name: "PostgreSQL", icon: "postgresql" },
              { name: "MySQL", icon: "mysql" },
              { name: "Redis", icon: "redis" },
              { name: "SQLite", icon: "sqlite" },
            ],
          },
          {
            id: "devops",
            items: [
              { name: "Docker", icon: "docker" },
              { name: "Kubernetes", icon: "kubernetes" },
              { name: "GitHub Actions", icon: "githubactions" },
              { name: "Jenkins", icon: "jenkins" },
              { name: "Terraform", icon: "terraform" },
            ],
          },
          {
            id: "cloudHomelab",
            items: [
              { name: "AWS", icon: "aws" },
              { name: "Azure", icon: "azure" },
              { name: "Google Cloud", icon: "googlecloud" },
              { name: "DigitalOcean", icon: "digitalocean" },
              { name: "Grafana", icon: "grafana" },
            ],
          },
        ],
        competencies: [
          { id: "systemArchitecture" },
          { id: "agileScrum" },
          { id: "apiIntegration" },
          { id: "uiuxImplementation" },
          { id: "cicdDevOps" },
        ],
      },
    },

    // Education Section
    {
      sectionName: "education",
      data: {
        history: [
          {
            year: "2016",
            icon: "IconSchool",
          },
          {
            year: "2014",
            icon: "IconSchool",
          },
          {
            year: "2010",
            icon: "IconSchool",
          },
          {
            year: "2006",
            icon: "IconSchool",
          },
        ],
        languages: [
          {
            id: "english",
            value: 100,
          },
          {
            id: "french",
            value: 90,
          },
          {
            id: "spanish",
            value: 65,
          },
          {
            id: "german",
            value: 40,
          },
        ],
      },
    },

    // Experiences Section
    {
      sectionName: "experiences",
      data: {
        experiences: [
          {
            id: "TechInnovate",
            startDate: new Date("2022-04-01"),
            companyName: "TechInnovate Solutions",
            companyLogo: "./src/assets/companies/techinnovate.png",
            contexts: [1, 2, 3],
            technologies: [
              [{ name: "React", icon: "react" }, { name: "TypeScript", icon: "typescript" }, { name: "Next.js", icon: "nextdotjs" }, { name: "AWS", icon: "aws" }],
              [{ name: "Node.js", icon: "nodedotjs" }, { name: "Express", icon: "express" }, { name: "MongoDB", icon: "mongodb" }, { name: "Docker", icon: "docker" }],
              [{ name: "GitHub Actions", icon: "githubactions" }, { name: "Terraform", icon: "terraform" }, { name: "Jest", icon: "jest" }],
            ],
            isCurrent: true,
          },
          {
            id: "DataSphere",
            startDate: new Date("2019-08-15"),
            endDate: new Date("2022-03-25"),
            companyName: "DataSphere Analytics",
            companyLogo: "./src/assets/companies/datasphere.png",
            contexts: [1, 2],
            technologies: [
              [{ name: "Python", icon: "python" }, { name: "FastAPI", icon: "fastapi" }, { name: "PostgreSQL", icon: "postgresql" }, { name: "Docker", icon: "docker" }],
              [{ name: "Vue.js", icon: "vuedotjs" }, { name: "JavaScript", icon: "javascript" }, { name: "Azure", icon: "azure" }, { name: "Kubernetes", icon: "kubernetes" }],
            ],
          },
          {
            id: "CodeCraft",
            startDate: new Date("2017-02-01"),
            endDate: new Date("2019-08-01"),
            companyName: "CodeCraft Technologies",
            companyLogo: "./src/assets/companies/codecraft.png",
            contexts: [1, 2],
            technologies: [
              [{ name: ".NET Core", icon: "dotnet" }, { name: "C#", icon: "csharp" }, { name: "SQL Server", icon: "mysql" }, { name: "Azure DevOps", icon: "azuredevops" }],
              [{ name: "Angular", icon: "angular" }, { name: "TypeScript", icon: "typescript" }, { name: "Bootstrap", icon: "bootstrap" }, { name: "SignalR", icon: "signalr" }],
            ],
          },
          {
            id: "WebPioneers",
            startDate: new Date("2015-05-15"),
            endDate: new Date("2017-01-15"),
            companyName: "Web Pioneers Inc.",
            companyLogo: "./src/assets/companies/webpioneers.png",
            contexts: [1],
            technologies: [
              [{ name: "JavaScript", icon: "javascript" }, { name: "jQuery", icon: "jquery" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }, { name: "HTML/CSS", icon: "html5" }],
            ],
          },
        ],
      },
    },

    // Projects Section
    {
      sectionName: "projects",
      data: {
        projects: [
          {
            id: "healthTracker",
            image: "./src/assets/projects/health-tracker.webp",
            link: "https://github.com/alexmorgan-dev/health-tracker",
            linkTextKey: "sourceCodeHere",
          },
          {
            id: "cryptoDashboard",
            image: "./src/assets/projects/crypto-dashboard.webp",
            link: "https://crypto-dashboard.alexmorgan.dev",
            linkTextKey: "tryIt",
          },
          {
            id: "smartHome",
            image: "./src/assets/projects/smart-home.webp",
            link: "https://github.com/alexmorgan-dev/smart-home-hub",
            linkTextKey: "sourceCodeHere",
            live: false,
          },
          {
            id: "aiImageGenerator",
            image: "./src/assets/projects/ai-image-generator.webp",
            link: "https://ai-image-generator.alexmorgan.dev",
            linkTextKey: "tryIt",
          },
          {
            id: "weatherApp",
            image: "./src/assets/projects/weather-app.webp",
            link: "https://weather-app.alexmorgan.dev",
            linkTextKey: "tryIt",
          },
          {
            id: "bookingSystem",
            image: "./src/assets/projects/booking-system.webp",
            link: "https://github.com/alexmorgan-dev/booking-system",
            linkTextKey: "sourceCodeHere",
            live: false,
          },
        ],
      },
    },

    // Hobbies Section
    {
      sectionName: "hobbies",
      data: {
        items: [
          {
            id: "japan",
            image: "./src/assets/hobbies/japan.webp",
            icon: "travel_explore",
            colSpan: 1,
            rowSpan: 2,
          },
          {
            id: "hiking",
            image: "./src/assets/hobbies/hiking.webp",
            icon: "hiking",
            colSpan: 2,
            rowSpan: 1,
          },
          {
            id: "cooking",
            image: "./src/assets/hobbies/cooking.webp",
            icon: "restaurant",
            colSpan: 1,
            rowSpan: 1,
          },
          {
            id: "photography",
            image: "./src/assets/hobbies/photography.webp",
            icon: "photo_camera",
            colSpan: 1,
            rowSpan: 1,
          },
          {
            id: "gaming",
            image: "./src/assets/hobbies/chess.webp",
            icon: "sports_esports",
            colSpan: 1,
            rowSpan: 1,
          },
          {
            id: "skiing",
            image: "./src/assets/hobbies/norway-northern-lights.webp",
            icon: "downhill_skiing",
            colSpan: 2,
            rowSpan: 1,
          },
        ],
      },
    },
  ],
};

export default profileData;
