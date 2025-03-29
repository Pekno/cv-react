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
      jobTitle: "Full Stack Developer",
      experienceText: "years of experience",
      summary:
        "I'm Alex Morgan, a passionate full stack developer with 8+ years of experience building web applications and digital solutions. I specialize in creating robust, scalable applications using modern technologies like React, Node.js, and AWS. My expertise spans from designing user-friendly interfaces to implementing secure backend systems and setting up efficient CI/CD pipelines. I'm dedicated to writing clean, maintainable code and love tackling complex technical challenges. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor adventures.",
    },
    skills: {
      functional: {
        libraries: "Technologies / Libraries",
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
            participate:
              "Participation in projects using both agile and traditional methodologies",
            estimate:
              "Estimation, planning, monitoring, coordination, and technical support",
            analysis:
              "Requirements analysis, design, specification writing, and methodology definition",
            quality:
              "Quality processes, code reviews, continuous integration and deployment",
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
        title: "Education",
        history: [
          {
            name: "Master of Science in Computer Science",
            location: "Stanford University (Palo Alto, CA)",
          },
          {
            name: "Bachelor of Science in Computer Science",
            location: "University of California (Berkeley, CA)",
          },
          {
            name: "Associate Degree in Computer Systems",
            location: "De Anza College (Cupertino, CA)",
          },
          {
            name: "High School Diploma",
            location: "Palo Alto High School (Palo Alto, CA)",
          },
        ],
      },
      languages: {
        title: "Languages",
        list: {
          english: {
            type: "English",
            mastery: "Native Language",
          },
          french: {
            type: "French",
            mastery: "Advanced (C1)",
          },
          spanish: {
            type: "Spanish",
            mastery: "Intermediate (B1)",
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
      },
    },
    hobbies: {
      intro:
        "When I'm not coding, I enjoy exploring the world and engaging in various activities that keep me balanced and inspired. I'm passionate about outdoor adventures, cultural experiences, and continuous learning in different domains.",
      travels: {
        japan: {
          title: "Japan in 2023",
          desc: "Exploring the perfect blend of ancient traditions and cutting-edge technology in Tokyo, Kyoto, and Osaka. Highlights included peaceful temples, vibrant street life, and incredible cuisine.",
        },
        hiking: {
          title: "Hiking in the Swiss Alps",
          desc: "Challenging myself with multi-day treks through stunning Alpine landscapes. Experiencing breathtaking views, pristine mountain lakes, and the serene beauty of nature at high altitudes.",
        },
        scubaDiving: {
          title: "Scuba Diving in Thailand",
          desc: "Discovering the vibrant underwater world of the Andaman Sea. Encountered colorful coral reefs, diverse marine life, and enjoyed the peaceful tranquility of being beneath the waves.",
        },
        norway: {
          title: "Northern Lights in Norway",
          desc: "Witnessing the breathtaking aurora borealis in Tromsø, Norway. Spent nights photographing the dancing lights while learning about this fascinating natural phenomenon.",
        },
        cooking: {
          title: "Culinary Explorations",
          desc: "Developing my passion for international cuisine by taking cooking classes and experimenting with recipes collected from my travels. My specialty is fusion dishes that combine techniques from different culinary traditions.",
        },
        chess: {
          title: "Strategic Chess",
          desc: "Engaging in regular chess tournaments and puzzles to sharpen my strategic thinking. Enjoying both the competitive aspect and the mental exercise that chess provides.",
        },
        cycling: {
          title: "Road Cycling",
          desc: "Exploring scenic routes on my road bike, covering long distances and challenging terrain. Cycling provides both physical exercise and an opportunity to discover new landscapes.",
        },
        photography: {
          title: "Landscape Photography",
          desc: "Capturing the beauty of natural and urban landscapes during my travels. I focus on composition and natural lighting to convey the feeling and atmosphere of each location.",
        },
      },
    },
  },
};

export default en;
