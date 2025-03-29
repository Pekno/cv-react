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
      jobTitle: "Développeur Full Stack",
      experienceText: "ans d'expérience",
      summary:
        "Je suis Alex Morgan, un développeur full stack passionné avec plus de 8 ans d'expérience dans la création d'applications web et de solutions numériques. Je suis spécialisé dans la création d'applications robustes et évolutives utilisant des technologies modernes comme React, Node.js et AWS. Mon expertise s'étend de la conception d'interfaces conviviales à l'implémentation de systèmes backend sécurisés et à la mise en place de pipelines CI/CD efficaces. Je m'engage à écrire du code propre et maintenable, et j'aime relever des défis techniques complexes. Quand je ne code pas, vous pouvez me trouver en train d'explorer de nouvelles technologies, de contribuer à des projets open-source ou de profiter d'aventures en plein air.",
    },
    skills: {
      functional: {
        libraries: "Technologies / Librairies",
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
            participate:
              "Participation dans des projets en méthodologie agile et traditionnelle",
            estimate:
              "Estimation, planification, suivi, coordination et support technique",
            analysis:
              "Analyse des besoins, conception, rédaction de spécifications techniques et fonctionnelles, définition de la méthodologie",
            quality:
              "Processus qualité, revues de code, intégration et déploiement continus",
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
        title: "Formation",
        history: [
          {
            name: "Master en Informatique",
            location: "Université Stanford (Palo Alto, CA)",
          },
          {
            name: "Licence en Informatique",
            location: "Université de Californie (Berkeley, CA)",
          },
          {
            name: "Diplôme Associé en Systèmes Informatiques",
            location: "De Anza College (Cupertino, CA)",
          },
          {
            name: "Baccalauréat",
            location: "Lycée de Palo Alto (Palo Alto, CA)",
          },
        ],
      },
      languages: {
        title: "Langues",
        list: {
          english: {
            type: "Anglais",
            mastery: "Langue maternelle",
          },
          french: {
            type: "Français",
            mastery: "Avancé (C1)",
          },
          spanish: {
            type: "Espagnol",
            mastery: "Intermédiaire (B1)",
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
      intro:
        "Quand je ne code pas, j'aime explorer le monde et m'adonner à diverses activités qui me maintiennent équilibré et inspiré. Je suis passionné par les aventures en plein air, les expériences culturelles et l'apprentissage continu dans différents domaines.",
      travels: {
        japan: {
          title: "Japon en 2023",
          desc: "Explorer le mélange parfait de traditions anciennes et de technologie de pointe à Tokyo, Kyoto et Osaka. Points forts : temples paisibles, vie urbaine animée et cuisine incroyable.",
        },
        hiking: {
          title: "Randonnée dans les Alpes Suisses",
          desc: "Me défier avec des randonnées de plusieurs jours à travers de magnifiques paysages alpins. Expérience de vues à couper le souffle, de lacs de montagne immaculés et de la beauté sereine de la nature en altitude.",
        },
        scubaDiving: {
          title: "Plongée sous-marine en Thaïlande",
          desc: "Découverte du monde sous-marin vibrant de la mer d'Andaman. Rencontre avec des récifs coralliens colorés, une vie marine diversifiée et appréciation de la tranquillité paisible sous les vagues.",
        },
        norway: {
          title: "Aurores boréales en Norvège",
          desc: "Observation des aurores boréales à couper le souffle à Tromsø, Norvège. Nuits passées à photographier les lumières dansantes tout en apprenant sur ce fascinant phénomène naturel.",
        },
        cooking: {
          title: "Explorations Culinaires",
          desc: "Développement de ma passion pour la cuisine internationale en prenant des cours de cuisine et en expérimentant des recettes collectées lors de mes voyages. Ma spécialité est les plats fusion qui combinent des techniques de différentes traditions culinaires.",
        },
        chess: {
          title: "Échecs Stratégiques",
          desc: "Participation à des tournois d'échecs réguliers et résolution de puzzles pour aiguiser ma pensée stratégique. Appréciation tant de l'aspect compétitif que de l'exercice mental que les échecs procurent.",
        },
        cycling: {
          title: "Cyclisme sur Route",
          desc: "Exploration de routes pittoresques à vélo de route, couvrant de longues distances et des terrains difficiles. Le cyclisme offre à la fois un exercice physique et une opportunité de découvrir de nouveaux paysages.",
        },
        photography: {
          title: "Photographie de Paysage",
          desc: "Capture de la beauté des paysages naturels et urbains lors de mes voyages. Je me concentre sur la composition et l'éclairage naturel pour transmettre le sentiment et l'atmosphère de chaque lieu.",
        },
      },
    },
  },
};

export default fr;
