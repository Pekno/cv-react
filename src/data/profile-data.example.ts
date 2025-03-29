import { ProfileData } from "../types/profile-data.types";

/**
 * Example profile data for demonstrating the CV structure
 * Replace with your own information
 */
export const profileData: ProfileData = {
  meta: {
    name: "Alex Morgan",
    profilePictures: [
      "./src/assets/profiles/profile.jpg",
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
  },
  sections: [
    // About Section
    {
      sectionName: "about",
      data: {
        yearsOfExperience: 8,
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
              "https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white",
              "https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E",
              "https://img.shields.io/badge/python-%233776AB.svg?style=flat&logo=python&logoColor=white",
              "https://img.shields.io/badge/go-%2300ADD8.svg?style=flat&logo=go&logoColor=white",
              "https://img.shields.io/badge/c%23-%23239120.svg?style=flat&logo=csharp&logoColor=white",
            ],
          },
          {
            id: "frontend",
            items: [
              "https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB",
              "https://img.shields.io/badge/vue.js-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D",
              "https://img.shields.io/badge/next.js-%23000000.svg?style=flat&logo=nextdotjs&logoColor=white",
              "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white",
              "https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white",
            ],
          },
          {
            id: "backend",
            items: [
              "https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white",
              "https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB",
              "https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white",
              "https://img.shields.io/badge/fastapi-%23009688.svg?style=flat&logo=fastapi&logoColor=white",
              "https://img.shields.io/badge/.NET-5C2D91?style=flat&logo=.net&logoColor=white",
            ],
          },
          {
            id: "databases",
            items: [
              "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white",
              "https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white",
              "https://img.shields.io/badge/mysql-%234479A1.svg?style=flat&logo=mysql&logoColor=white",
              "https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white",
              "https://img.shields.io/badge/sqlite-%23003B57.svg?style=flat&logo=sqlite&logoColor=white",
            ],
          },
          {
            id: "devops",
            items: [
              "https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white",
              "https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white",
              "https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white",
              "https://img.shields.io/badge/jenkins-%232C5263.svg?style=flat&logo=jenkins&logoColor=white",
              "https://img.shields.io/badge/terraform-%235835CC.svg?style=flat&logo=terraform&logoColor=white",
            ],
          },
          {
            id: "cloudHomelab",
            items: [
              "https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white",
              "https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white",
              "https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=flat&logo=google-cloud&logoColor=white",
              "https://img.shields.io/badge/digitalocean-%230080FF.svg?style=flat&logo=digitalocean&logoColor=white",
              "https://img.shields.io/badge/grafana-%23F46800.svg?style=flat&logo=grafana&logoColor=white",
            ],
          },
        ],
        competencies: ["participate", "estimate", "analysis", "quality"],
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
            color: "brand.6",
          },
          {
            id: "french",
            value: 90,
            color: "brand.6",
          },
          {
            id: "spanish",
            value: 65,
            color: "brand.6",
          },
          {
            id: "german",
            value: 40,
            color: "brand.6",
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
              ["React", "TypeScript", "Next.js", "AWS"],
              ["Node.js", "Express", "MongoDB", "Docker"],
              ["GitHub Actions", "Terraform", "Jest"],
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
              ["Python", "FastAPI", "PostgreSQL", "Docker"],
              ["Vue.js", "JavaScript", "Azure", "Kubernetes"],
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
              [".NET Core", "C#", "SQL Server", "Azure DevOps"],
              ["Angular", "TypeScript", "Bootstrap", "SignalR"],
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
              ["JavaScript", "jQuery", "PHP", "MySQL", "HTML/CSS"],
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
          },
        ],
      },
    },

    // Hobbies Section
    {
      sectionName: "hobbies",
      data: {
        travels: [
          {
            id: "japan",
            image: "./src/assets/hobbies/japan.webp",
          },
          {
            id: "hiking",
            image: "./src/assets/hobbies/hiking.webp",
          },
          {
            id: "scubaDiving",
            image: "./src/assets/hobbies/scuba-diving.webp",
          },
          {
            id: "norway",
            image: "./src/assets/hobbies/norway-northern-lights.webp",
          },
          {
            id: "cooking",
            image: "./src/assets/hobbies/cooking.webp",
          },
          {
            id: "chess",
            image: "./src/assets/hobbies/chess.webp",
          },
          {
            id: "cycling",
            image: "./src/assets/hobbies/cycling.webp",
          },
          {
            id: "photography",
            image: "./src/assets/hobbies/photography.webp",
          },
        ],
      },
    },
  ],
};

export default profileData;
