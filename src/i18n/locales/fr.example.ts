import { Translations } from "../../types/translations.types";

/**
 * Example French translations for the CV
 * Replace with your own content
 */
const fr: Translations = {
  global: {
    units: {
      months: "mois",
      years: "années",
    },
    thanks: "Merci d'avoir porté de l'intérêt à mon profil !",
    autoplay: {
      active: "Défilement automatique toutes les 15 secondes",
      paused: "Défilement automatique en pause",
    },
    lookingForWork: "En recherche d'emploi",
    present: "Aujourd'hui",
  },
  theme: {
    toggleLight: "Passer au mode clair",
    toggleDark: "Passer au mode sombre",
  },
  menu: {
    about: "À propos",
    skills: "Compétences",
    education: "Formation & Langues",
    experiences: "Expériences",
    projects: "Projets",
    hobbies: "Loisirs",
  },
  sections: {
    about: {
      jobTitle: "Ingénieur Logiciel",
      jobTitleHighlight: "Full Stack",
      experienceYears: "ANS D'",
      experienceLabel: "EXPÉRIENCE",
      summary:
        "Je suis un architecte logiciel dédié, spécialisé dans la création d'applications web robustes et performantes qui évoluent sans effort. Mon parcours dans le paysage technologique a été défini par une quête incessante de code propre et de principes de conception centrés sur l'utilisateur.\n\nTout au long de ma carrière, j'ai eu le privilège de diriger des projets d'ingénierie transformateurs chez TechInnovate Solutions et DataSphere Analytics. Mon expertise couvre l'ensemble du stack, des interfaces frontend réactives aux microservices distribués.\n\nJe perfectionne actuellement l'architecture principale chez CodeCraft Technologies et collabore fréquemment avec Web Pioneers Inc. sur des initiatives open-source. Ma philosophie reste simple : résoudre des problèmes complexes avec des solutions élégantes et maintenables.",
      downloadResume: "Télécharger le Curriculum Vitae",
      stackFocusLabel: "Stack Ciblé",
      locationLabel: "Localisation",
      availabilityLabel: "Disponibilité",
      openForCollaboration: "Ouvert à la Collaboration",
    },
    skills: {
      functional: {
        libraries: "Technologies & Librairies",
        qualities: {
          leadership: {
            title: "Leadership & Gestion d'Équipe",
            desc: "Leadership technique avec expérience en coordination d'équipe, allocation de ressources et mentorat de développeurs juniors.",
            chips: {
              teamLeading: "Direction d'Équipe",
              technicalLeadership: "Leadership Technique",
              mentoring: "Mentorat",
            },
          },
          projectManagement: {
            title: "Gestion de Projet",
            desc: "Expérience avec les méthodologies agiles et traditionnelles, estimation, planification, suivi et coordination des parties prenantes.",
            chips: {
              agile: "Agile",
              scrum: "Scrum",
              kanban: "Kanban",
              planning: "Planification",
            },
          },
          analysis: {
            title: "Analyse des Besoins",
            desc: "Forte capacité à analyser les besoins métier, rédiger des spécifications techniques et fonctionnelles, et définir les méthodologies de développement.",
            chips: {
              requirements: "Exigences",
              technicalSpecs: "Spécifications Techniques",
              architecture: "Architecture",
            },
          },
          quality: {
            title: "Assurance Qualité",
            desc: "Compétent dans la mise en œuvre de processus qualité, la conduite de revues de code et la gestion des workflows d'intégration et de déploiement continus.",
            chips: {
              codeReviews: "Revues de Code",
              cicd: "CI/CD",
              testing: "Tests",
              devOps: "DevOps",
            },
          },
          clientInteraction: {
            title: "Communication Client",
            desc: "Maîtrise des interactions directes avec les clients, collecte des besoins et fourniture d'un support et d'une assistance réactifs.",
            chips: {
              requirementsGathering: "Collecte des Besoins",
              presentations: "Présentations",
              support: "Support",
            },
          },
          adaptability: {
            title: "Adaptabilité & Apprentissage",
            desc: "Capacité démontrée à s'adapter rapidement aux nouveaux langages et technologies, avec une approche proactive de l'apprentissage continu.",
            chips: {
              newTechnologies: "Nouvelles Technologies",
              selfLearning: "Auto-Formation",
              versatility: "Versatilité",
            },
          },
        },
        keyCompetencies: {
          title: "Compétences Professionnelles Clés",
          competencies: {
            systemArchitecture: {
              title: "Conception d'Architecture Système",
              desc: "Conception de systèmes robustes et distribués avec scalabilité et haute disponibilité.",
            },
            agileScrum: {
              title: "Méthodologie Agile & Scrum",
              desc: "Expérience avérée dans des équipes en environnements itératifs et dynamiques.",
            },
            apiIntegration: {
              title: "Développement & Intégration d'API",
              desc: "Construction d'APIs RESTful et GraphQL sécurisées pour des échanges de données fluides.",
            },
            uiuxImplementation: {
              title: "Implémentation UI/UX",
              desc: "Traduction de designs complexes en interfaces utilisateur responsives et pixel-perfect.",
            },
            cicdDevOps: {
              title: "CI/CD & Pratiques DevOps",
              desc: "Automatisation des pipelines de déploiement et gestion de l'infrastructure cloud.",
            },
          },
        },
      },
      technical: {
        categories: {
          programmingLanguages: "Langages de Programmation",
          frontend: "Frontend",
          backend: "Backend",
          databases: "Bases de Données",
          devops: "DevOps",
          cloudHomelab: "Cloud & Outils",
        },
      },
    },
    education: {
      studies: {
        title: "Études",
        history: [
          {
            name: "Master en Informatique",
            location: "Université Stanford",
            description: "Spécialisé en Systèmes Distribués et Architecture Cloud. Diplômé avec mention.",
          },
          {
            name: "Licence en Informatique",
            location: "Université de Californie",
            description: "Accent sur les Algorithmes, Structures de Données et principes de Génie Logiciel.",
          },
          {
            name: "Diplôme Associé en Systèmes Informatiques",
            location: "De Anza College",
            description: "Opérations IT fondamentales, bases de la mise en réseau et dépannage matériel.",
          },
          {
            name: "Baccalauréat",
            location: "Lycée de Palo Alto",
            description: "",
          },
        ],
      },
      languages: {
        title: "Langues",
        cefrInfo: "Les niveaux de compétence sont basés sur le Cadre Européen Commun de Référence pour les Langues (CECRL).",
        list: {
          english: {
            type: "Anglais",
            mastery: "Langue maternelle",
          },
          french: {
            type: "Français",
            mastery: "Courant / Professionnel",
          },
          spanish: {
            type: "Espagnol",
            mastery: "Basique / Élémentaire",
          },
          german: {
            type: "Allemand",
            mastery: "Basique (A2)",
          },
        },
      },
    },
    experiences: {
      companies: {
        TechInnovate: {
          jobTitle: "Développeur Full Stack Senior",
          contexts: [
            "Direction d'une équipe de 5 développeurs dans la création d'une plateforme SaaS basée sur le cloud pour la planification des ressources d'entreprise, résultant en une augmentation de 40% de l'efficacité des opérations client",
            "Conception et implémentation d'une infrastructure de microservices utilisant Node.js, Express et MongoDB avec conteneurisation via Docker et orchestration avec Kubernetes",
            "Établissement de pipelines CI/CD avec GitHub Actions et Terraform pour les tests et déploiements automatisés, réduisant les cycles de publication de semaines à jours",
          ],
        },
        DataSphere: {
          jobTitle: "Développeur Backend",
          contexts: [
            "Développement et maintenance d'APIs RESTful utilisant Python et FastAPI, traitant plus de 10 millions de requêtes quotidiennes avec 99.9% de disponibilité",
            "Conception et implémentation de pipelines de traitement de données gérant des téraoctets d'information pour les applications d'intelligence d'affaires et d'analyse",
          ],
        },
        CodeCraft: {
          jobTitle: "Développeur Full Stack",
          contexts: [
            "Création d'applications web d'entreprise utilisant .NET Core, C# et SQL Server avec un accent sur la sécurité et l'évolutivité",
            "Développement de frontends responsifs avec Angular et TypeScript, implémentation de fonctionnalités de communication en temps réel avec SignalR",
          ],
        },
        WebPioneers: {
          jobTitle: "Développeur Web Junior",
          contexts: [
            "Construction et maintenance de sites web dynamiques pour petites et moyennes entreprises utilisant JavaScript, jQuery, PHP et MySQL",
          ],
        },
      },
    },
    projects: {
      intro:
        "Au-delà de mon travail professionnel, j'aime développer des projets personnels qui me permettent d'explorer de nouvelles technologies et de résoudre des problèmes intéressants. Voici quelques points forts de mon portfolio :",
      items: {
        healthTracker: {
          title: "Suivi de Santé & Fitness",
          desc: "Une application web mobile-first pour suivre les entraînements, la nutrition et les mesures de santé. Construite avec React Native, Express.js et MongoDB. Les fonctionnalités incluent des plans d'entraînement personnalisables, une analyse nutritionnelle et une visualisation des progrès.",
        },
        cryptoDashboard: {
          title: "Tableau de Bord Cryptomonnaie",
          desc: "Tableau de bord de surveillance de cryptomonnaie en temps réel avec suivi de portefeuille, alertes de prix et analyse de données historiques. Utilise React, Node.js et s'intègre avec plusieurs APIs de cryptomonnaie.",
        },
        smartHome: {
          title: "Hub Maison Intelligente",
          desc: "Un contrôleur de maison intelligente basé sur Raspberry Pi qui s'intègre avec divers appareils IoT et fournit une interface unifiée. Construit avec Node.js et React, il prend en charge les commandes vocales et les routines automatisées.",
        },
        aiImageGenerator: {
          title: "Générateur d'Images IA",
          desc: "Application web qui génère des images personnalisées basées sur des invites textuelles en utilisant des modèles d'IA. Frontend construit avec React et Tailwind CSS, backend avec Flask et PyTorch.",
        },
        weatherApp: {
          title: "Application de Prévisions Météo",
          desc: "Une application météo responsive fournissant les conditions actuelles et les prévisions sur 7 jours pour n'importe quel emplacement. Utilise Vue.js, l'API Open Weather et propose la géolocalisation, les emplacements sauvegardés et les alertes météo.",
        },
        bookingSystem: {
          title: "Système de Réservation de Rendez-vous",
          desc: "Un système complet de planification et de réservation pour les prestataires de services. Construit avec React, Node.js et PostgreSQL. Les fonctionnalités comprennent la gestion de calendrier, les rappels automatiques et le traitement des paiements.",
        },
      },
      actions: {
        tryIt: "Essayez ici",
        testIt: "Testez ici",
        sourceCodeHere: "Voir le code source",
      },
    },
    hobbies: {
      subtitle:
        "Au-delà de l'écran, je recherche des expériences qui élargissent ma perspective — des sentiers de montagne aux jardins de temples, de la cuisine à la chambre noire.",
      items: {
        japan: {
          title: "Japon 2023",
          subtitle: "Kyoto, Japon",
          desc: "Un voyage immersif à travers le mélange de tradition ancienne et d'innovation futuriste — des temples silencieux de Kyoto aux rues animées de Shibuya. Le Japon offre une inspiration inépuisable pour le design et la pleine conscience.",
        },
        hiking: {
          title: "Trekking Alpin",
          subtitle: "Alpes Suisses",
          desc: "Randonnées de plusieurs jours dans les Alpes suisses et françaises, traversant glaciers et cols reculés. Le défi physique ramène à l'essentiel, ne laissant que la montagne et l'instant présent.",
        },
        cooking: {
          title: "Arts Culinaires",
          subtitle: "Arts Culinaires",
          desc: "Exploration des cuisines du monde à travers des cours de cuisine lors de mes voyages. Des ateliers ramen à Kyoto aux masterclasses de pâtisserie provençale, la nourriture est ma façon de décoder l'identité d'une culture.",
        },
        photography: {
          title: "Photographie de Paysage",
          subtitle: "Photographie de Paysage",
          desc: "Capturer la lumière à travers des paysages naturels et urbains — départs alpins avant l'aube, falaises côtières à l'heure dorée. La quête du cadre parfait enseigne la patience et une profonde attention au monde.",
        },
        gaming: {
          title: "Mondes Virtuels",
          subtitle: "Métavers, VR",
          desc: "Exploration de mondes de jeux immersifs et d'expériences VR naissantes. Je suis particulièrement attiré par les RPG narratifs et les jeux de simulation qui récompensent la curiosité et la pensée stratégique.",
        },
        skiing: {
          title: "Sports d'Hiver",
          subtitle: "Whistler, BC",
          desc: "À la poursuite de la poudreuse de Whistler à Chamonix, avec quelques détours hors-piste en chemin. L'hiver en montagne tient autant au silence entre les descentes qu'à la vitesse sur les pistes.",
        },
      },
    },
  },
};

export default fr;