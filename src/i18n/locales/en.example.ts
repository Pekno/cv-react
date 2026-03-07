import { Translations } from "../../types/translations.types";

/**
 * Example English translations for the CV
 * Replace with your own content
 */
const en: Translations = {
  global: {
    units: {
      months: "months",
      years: "years",
    },
    thanks: "Thank you for taking an interest in my profile!",
    autoplay: {
      active: "Auto-advancing every 15 seconds",
      paused: "Auto-advance paused",
    },
    lookingForWork: "Looking for work",
    present: "Present",
  },
  theme: {
    toggleLight: "Switch to light mode",
    toggleDark: "Switch to dark mode",
  },
  menu: {
    about: "About",
    skills: "Skills",
    education: "Education & Languages",
    experiences: "Experiences",
    projects: "Projects",
    hobbies: "Hobbies",
  },
  sections: {
    about: {
      jobTitle: "Software Engineer",
      jobTitleHighlight: "Full Stack",
      experienceYears: "YEARS OF",
      experienceLabel: "EXPERIENCE",
      summary:
        "I am a dedicated software architect specializing in building robust, high-performance web applications that scale effortlessly. My journey in the tech landscape has been defined by a relentless pursuit of clean code and user-centric design principles, ensuring every line of code serves a meaningful purpose.\n\nThroughout my career, I've had the privilege of leading transformative engineering projects at TechInnovate Solutions and DataSphere Analytics. My expertise spans the entire stack, from reactive frontend interfaces to distributed microservices.\n\nI am currently refining core architecture at CodeCraft Technologies and frequently collaborate with Web Pioneers Inc. on open-source initiatives. My philosophy remains simple: solve complex problems with elegant, maintainable solutions.",
      downloadResume: "Download Curriculum Vitae",
      stackFocusLabel: "Stack Focus",
      locationLabel: "Location",
      availabilityLabel: "Availability",
      openForCollaboration: "Open for Collaboration",
    },
    skills: {
      functional: {
        libraries: "Technologies & Libraries",
        qualities: {
          leadership: {
            title: "Leadership & Team Management",
            desc: "Technical leadership with experience in team coordination, resource allocation, and mentoring junior developers.",
            chips: {
              teamLeading: "Team Leading",
              technicalLeadership: "Technical Leadership",
              mentoring: "Mentoring",
            },
          },
          projectManagement: {
            title: "Project Management",
            desc: "Experience with agile and traditional methodologies, estimation, planning, tracking, and stakeholder coordination.",
            chips: {
              agile: "Agile",
              scrum: "Scrum",
              kanban: "Kanban",
              planning: "Planning",
            },
          },
          analysis: {
            title: "Requirements Analysis",
            desc: "Strong capability in analyzing business needs, drafting technical and functional specifications, and defining development methodologies.",
            chips: {
              requirements: "Requirements",
              technicalSpecs: "Technical Specs",
              architecture: "Architecture",
            },
          },
          quality: {
            title: "Quality Assurance",
            desc: "Skilled in implementing quality processes, conducting code reviews, and managing continuous integration and deployment workflows.",
            chips: {
              codeReviews: "Code Reviews",
              cicd: "CI/CD",
              testing: "Testing",
              devOps: "DevOps",
            },
          },
          clientInteraction: {
            title: "Client Communication",
            desc: "Proficient in direct client interactions, requirement gathering, and providing responsive support and assistance.",
            chips: {
              requirementsGathering: "Requirements Gathering",
              presentations: "Presentations",
              support: "Support",
            },
          },
          adaptability: {
            title: "Adaptability & Learning",
            desc: "Demonstrated ability to quickly adapt to new languages and technologies, with a proactive approach to continuous learning.",
            chips: {
              newTechnologies: "New Technologies",
              selfLearning: "Self-Learning",
              versatility: "Versatility",
            },
          },
        },
        keyCompetencies: {
          title: "Key Professional Competencies",
          competencies: {
            systemArchitecture: {
              title: "System Architecture Design",
              desc: "Designing robust, distributed systems with scalability and high availability.",
            },
            agileScrum: {
              title: "Agile Methodology & Scrum",
              desc: "Proven implementing teams in fast-paced iterative environments.",
            },
            apiIntegration: {
              title: "API Development & Integration",
              desc: "Building secure RESTful and GraphQL APIs for seamless data exchange.",
            },
            uiuxImplementation: {
              title: "UI/UX Implementation",
              desc: "Translating complex designs into responsive, pixel-perfect user interfaces.",
            },
            cicdDevOps: {
              title: "CI/CD & DevOps Practices",
              desc: "Automating deployment pipelines and managing cloud infrastructure.",
            },
          },
        },
      },
      technical: {
        categories: {
          programmingLanguages: "Programming Languages",
          frontend: "Frontend",
          backend: "Backend",
          databases: "Databases",
          devops: "DevOps",
          cloudHomelab: "Cloud & Tools",
        },
      },
    },
    education: {
      studies: {
        title: "Studies",
        history: [
          {
            name: "Master of Science in Computer Science",
            location: "Stanford University",
            description: "Specialized in Distributed Systems and Cloud Architecture. Graduated with honors.",
          },
          {
            name: "Bachelor of Science in Computer Science",
            location: "University of California",
            description: "Core focus on Algorithms, Data Structures, and Software Engineering principles.",
          },
          {
            name: "Associate Degree in Computer Systems",
            location: "De Anza College",
            description: "Fundamental IT operations, networking basics, and hardware troubleshooting.",
          },
          {
            name: "High School Diploma",
            location: "Palo Alto High School",
            description: "",
          },
        ],
      },
      languages: {
        title: "Languages",
        cefrInfo: "Proficiency levels are based on the Common European Framework of Reference for Languages (CEFR).",
        list: {
          english: {
            type: "English",
            mastery: "Native Speaker",
          },
          french: {
            type: "French",
            mastery: "Fluent / Professional",
          },
          spanish: {
            type: "Spanish",
            mastery: "Basic / Elementary",
          },
          german: {
            type: "German",
            mastery: "Basic (A2)",
          },
        },
      },
    },
    experiences: {
      companies: {
        TechInnovate: {
          jobTitle: "Senior Full Stack Developer",
          contexts: [
            "Leading a team of 5 developers in building a cloud-based SaaS platform for enterprise resource planning, resulting in 40% increased efficiency for client operations",
            "Architecting and implementing microservices infrastructure using Node.js, Express, and MongoDB with containerization via Docker and orchestration with Kubernetes",
            "Establishing CI/CD pipelines with GitHub Actions and Terraform for automated testing and deployment, reducing release cycles from weeks to days",
          ],
        },
        DataSphere: {
          jobTitle: "Backend Developer",
          contexts: [
            "Developed and maintained RESTful APIs using Python and FastAPI, processing over 10 million requests daily with 99.9% uptime",
            "Designed and implemented data processing pipelines handling terabytes of information for business intelligence and analytics applications",
          ],
        },
        CodeCraft: {
          jobTitle: "Full Stack Developer",
          contexts: [
            "Created enterprise web applications using .NET Core, C#, and SQL Server with focus on security and scalability",
            "Developed responsive frontends with Angular and TypeScript, implementing real-time communication features with SignalR",
          ],
        },
        WebPioneers: {
          jobTitle: "Junior Web Developer",
          contexts: [
            "Built and maintained dynamic websites for small to medium businesses using JavaScript, jQuery, PHP, and MySQL",
          ],
        },
      },
    },
    projects: {
      intro:
        "Beyond my professional work, I enjoy developing personal projects that allow me to explore new technologies and solve interesting problems. Here are some highlights from my portfolio:",
      items: {
        healthTracker: {
          title: "Health & Fitness Tracker",
          desc: "A mobile-first web application for tracking workouts, nutrition, and health metrics. Built with React Native, Express.js, and MongoDB. Features include customizable workout plans, nutritional analysis, and progress visualization.",
        },
        cryptoDashboard: {
          title: "Cryptocurrency Dashboard",
          desc: "Real-time cryptocurrency monitoring dashboard with portfolio tracking, price alerts, and historical data analysis. Uses React, Node.js, and integrates with multiple cryptocurrency APIs.",
        },
        smartHome: {
          title: "Smart Home Hub",
          desc: "A Raspberry Pi-based smart home controller that integrates with various IoT devices and provides a unified interface. Built with Node.js and React, it supports voice commands and automated routines.",
        },
        aiImageGenerator: {
          title: "AI Image Generator",
          desc: "Web application that generates custom images based on text prompts using AI models. Frontend built with React and Tailwind CSS, backend with Flask and PyTorch.",
        },
        weatherApp: {
          title: "Weather Forecast App",
          desc: "A responsive weather application providing current conditions and 7-day forecasts for any location. Uses Vue.js, Open Weather API, and features geolocation, saved locations, and weather alerts.",
        },
        bookingSystem: {
          title: "Appointment Booking System",
          desc: "A full-featured scheduling and booking system for service providers. Built with React, Node.js, and PostgreSQL. Features include calendar management, automatic reminders, and payment processing.",
        },
      },
      actions: {
        tryIt: "Try it here",
        testIt: "Test it out",
        sourceCodeHere: "View source code",
        dockerHub: "View on Docker Hub",
      },
    },
    hobbies: {
      subtitle:
        "Beyond the screen, I seek out experiences that expand my perspective — from mountain trails to temple gardens, from the kitchen to the darkroom.",
      items: {
        japan: {
          title: "Japan 2023",
          subtitle: "Kyoto, Japan",
          desc: "An immersive journey through the blend of ancient tradition and futuristic innovation — from the quiet temples of Kyoto to the bustling streets of Shibuya. Japan provides endless inspiration for design and mindfulness.",
        },
        hiking: {
          title: "Alpine Trekking",
          subtitle: "Swiss Alps",
          desc: "Multi-day treks through the Swiss and French Alps, crossing glaciers and remote passes. The physical challenge strips everything back to essentials, leaving only the mountain and the moment.",
        },
        cooking: {
          title: "Culinary Arts",
          subtitle: "Culinary Arts",
          desc: "Exploring world cuisines through hands-on cooking classes during travels. From Kyoto ramen workshops to Provençal pastry masterclasses, food is how I decode a culture's identity.",
        },
        photography: {
          title: "Landscape Photography",
          subtitle: "Landscape Photography",
          desc: "Capturing light across natural and urban landscapes — pre-dawn alpine starts, golden-hour coastal cliffs. The pursuit of the perfect frame teaches patience and a deep attention to the world.",
        },
        gaming: {
          title: "Virtual Worlds",
          subtitle: "Metaverse, VR",
          desc: "Exploring immersive game worlds and early VR experiences. I'm particularly drawn to narrative-driven RPGs and simulation games that reward curiosity and strategic thinking.",
        },
        skiing: {
          title: "Winter Sports",
          subtitle: "Whistler, BC",
          desc: "Chasing powder from Whistler to Chamonix, with a few off-piste detours along the way. Winter in the mountains is as much about the silence between runs as the speed on them.",
        },
      },
    },
  },
};

export default en;