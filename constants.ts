import { ExperienceItem, MetricItem, Profile, SkillCategory, ProjectItem } from './types';

export const PROFILE: Profile = {
  name: "Mohammed Kanchwala",
  title: "Software Engineer III",
  location: "Glasgow, United Kingdom",
  phone: "(+44) 7443 211056",
  email: "mohammed.kanchwala@outlook.com",
  linkedin: "https://www.linkedin.com/in/mohammed-kanchwala-94256399",
  github: "https://github.com/mohammed-kanchwala",
  leetcode: "https://leetcode.com/u/mohammed-kanchwala/",
  summary: "Software Engineer III with over 11 years of experience in developing, optimizing, and maintaining complex software solutions, particularly in fintech and cloud computing. Expertise in full-stack development with a strong focus on Java, Spring Boot, Angular, and AWS. Proven track record in leading cross-functional teams, driving scalability improvements, and ensuring system security and performance."
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Core & Frontend",
    skills: ["Java", "JavaScript", "React", "Angular", "HTML/CSS"]
  },
  {
    category: "Backend & Database",
    skills: ["Spring Boot", "Node.js", "MongoDB", "Cassandra", "Redis", "MS-SQL", "PostgreSQL", "Oracle DB", "MySQL"]
  },
  {
    category: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Dynatrace", "Maven", "Gradle"]
  },
  {
    category: "Practices & Tools",
    skills: ["Agile/Scrum", "TDD", "JUnit", "Jira", "Confluence", "Apache Spark", "Microservices", "Data Structures & Algorithms"]
  }
];

export const METRICS: MetricItem[] = [
  {
    id: '1',
    value: "35%",
    description: "Reduction in loading/processing time",
    context: "Optimized online banking platform performance",
    iconName: 'Zap'
  },
  {
    id: '2',
    value: "15%",
    description: "Increase in user engagement",
    context: "Defined technical requirements for new features",
    iconName: 'Users'
  },
  {
    id: '3',
    value: "20%",
    description: "Enhanced customer protection",
    context: "Integrated new security protocols against cyber threats",
    iconName: 'Shield'
  },
  {
    id: '4',
    value: "50k+",
    description: "Clients migrated with zero downtime",
    context: "Spearheaded seamless database migration",
    iconName: 'Server'
  },
  {
    id: '5',
    value: "40%",
    description: "Payment system efficiency boost",
    context: "Integrated Apple Pay & Google Pay",
    iconName: 'CreditCard'
  },
  {
    id: '6',
    value: "65%",
    description: "Increase in platform scalability",
    context: "Developed new solutions (Best Agile Squad award)",
    iconName: 'TrendingUp'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'jp-morgan',
    role: "Software Engineer III",
    company: "JPMorgan Chase",
    location: "Glasgow, UK",
    period: "November 2022 - Present",
    tags: ["Java", "Spring Boot", "AWS", "Security", "Microservices", "React", "Database"],
    achievements: [
      "Led efforts to optimize the performance and scalability of the online banking platform, achieving a 35% reduction in loading / processing time.",
      "Collaborated with product managers and business analysts to define technical requirements for new features, resulting in a 15% increase in user engagement.",
      "Integrated new security protocols and technologies, enhancing customer protection against cyber threats by 20%.",
      "Spearheaded a seamless database migration that maintained business continuity, preventing any downtime during migration for 50000+ clients."
    ]
  },
  {
    id: 'dp-world',
    role: "Software Developer",
    company: "DP World",
    location: "Dubai, UAE",
    period: "April 2020 - November 2022",
    tags: ["Java", "Integration", "Microservices", "Docker", "Agile/Scrum"],
    achievements: [
      "Improved efficiency in port operations by enhancing a terminal operating system, reducing operational delays by 25%.",
      "Developed and deployed a multi-system integration platform that centralized key terminal operations, cutting down on manual inputs by 40%.",
      "Led a team through the end-to-end software delivery process, from requirements gathering to deployment, consistently meeting deadlines.",
      "Implemented key software updates that boosted system reliability and performance, decreasing downtime by 15%."
    ]
  },
  {
    id: 'nagarro',
    role: "Software Developer",
    company: "Nagarro Middle East",
    location: "Dubai, UAE",
    period: "February 2017 - March 2020",
    tags: ["Java", "Spring Boot", "Mobile Payments", "Agile/Scrum", "Support"],
    achievements: [
      "Contributed to the development of major banking features, including Apple Pay and Google Pay, enhancing payment system efficiency by 40%.",
      "Managed the full application lifecycle, including production support, improving overall system stability and reducing support ticket volumes by 30%.",
      "Led a team that developed new solutions, increasing platform scalability by 65%, and was recognized with the Best Agile Squad award."
    ]
  },
  {
    id: 'gatesoft',
    role: "Software Developer",
    company: "Gatesoft Solutions",
    location: "Ahmedabad, India",
    period: "September 2014 - February 2017",
    tags: ["Java", "JavaScript", "HTML/CSS", "Security", "SQL"],
    achievements: [
      "Worked as a full-stack developer, designing and implementing software solutions that enhanced user experience and security.",
      "Managed session control and security features, which resulted in a 20% improvement in system security.",
      "Led the release management process for multiple features, ensuring smooth deployment without disruptions."
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'fintech-gateway',
    title: "Secure Payment Gateway",
    description: "A high-performance microservices-based payment gateway designed for scalability and security. Handled high-concurrency transactions with reduced latency.",
    technologies: ["Java", "Spring Boot", "Redis", "Microservices", "Security"],
    githubUrl: "https://github.com/mohammed-kanchwala",
  },
  {
    id: 'port-logistics',
    title: "Terminal Operations Dashboard",
    description: "Real-time dashboard for monitoring port terminal operations, container movements, and resource allocation. Reduced manual tracking efforts significantly.",
    technologies: ["React", "TypeScript", "WebSocket", "Docker", "Java"],
    githubUrl: "https://github.com/mohammed-kanchwala",
  },
  {
    id: 'cloud-migration',
    title: "Legacy System Cloud Migration",
    description: "Infrastructure as Code (IaC) implementation to migrate on-premise monolithic applications to AWS Cloud using containerization strategies.",
    technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins"],
    githubUrl: "https://github.com/mohammed-kanchwala",
  },
  {
    id: 'banking-auth',
    title: "OAuth2 Authorization Server",
    description: "Centralized identity management system implementing OAuth2 and OpenID Connect for secure authentication across multiple internal banking applications.",
    technologies: ["Java", "Security", "PostgreSQL", "OAuth2", "Spring Boot"],
    githubUrl: "https://github.com/mohammed-kanchwala",
  }
];