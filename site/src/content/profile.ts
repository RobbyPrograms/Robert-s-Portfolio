export const profile = {
  name: "Robert Rolison",
  title: "DevSecOps Engineer",
  tagline:
    "CI/CD, release management, and secure delivery for mission-critical programs.",
  location: "Denver, CO",
  email: "RobertRolison99@gmail.com",
  phone: "(720) 256-3883",
  clearance: "Active Secret (DoD)",
  summary:
    "I am a DevOps Engineer at Deloitte focused on automation, cloud infrastructure, and reliable delivery. Day to day, I build and improve CI/CD pipelines, streamline deployments, and keep systems stable for enterprise and government teams. I have hands-on experience with Azure DevOps, JavaScript, TypeScript, Python, C++, Java, and YAML, and I enjoy turning complex release work into repeatable, scalable workflows.",
  education: {
    degree: "B.S. Applied Computing Technology",
    minor: "Minor in Computing Technology",
    school: "Colorado State University, Fort Collins, CO",
    date: "May 2023",
    gpa: "3.3",
  },
  experience: [
    {
      role: "DevSecOps Engineer (Analyst → Consultant)",
      company: "Deloitte",
      location: "Denver",
      period: "Jul 2023 – Present",
      note: "U.S. Army AIE Program • Promoted to Consultant Apr 2025",
      highlights: [
        "Engineered and maintained 20+ YAML CI/CD pipelines with automated testing, quality gates, security checkpoints, and rollback strategies for a 60+ developer program.",
        "Configured Kubernetes-based self-hosted runner pools with node selector demands; authored custom Dockerfiles for agent tooling.",
        "Managed 10+ releases/week twice-daily lower-environment deployments and biweekly production releases.",
        "Developed Azure DevOps REST API automation to migrate 10,000+ work items across org domains for a secure transition.",
        "Built an internal web app that surfaced Azure DevOps engineering metrics and DORA indicators in one dashboard, giving teams faster visibility into delivery health and bottlenecks.",
        "Release Manager for Salesforce initiatives across dev/test/prod with automated post-deploy validation.",
        "Built real-time Azure DevOps dashboards for deployment health, build success, and sprint metrics.",
        "Authored onboarding documentation, reducing new-hire ramp-up by ~50%.",
      ],
    },
  ],
  previousRoles: [
    "AT&T Software Engineering Extern (2022)",
    "CSU IT/Web Intern (2022)",
    "CSU Coding Teaching Assistant (2022)",
  ],
  skillGroups: [
    {
      title: "Languages",
      items: ["Python 3", "TypeScript", "JavaScript", "Java", "C++", "C#", "YAML"],
    },
    {
      title: "CI/CD & DevOps",
      items: [
        "Azure DevOps Pipelines",
        "GitHub Actions",
        "Git / GitHub",
        "Multi-stage pipelines",
        "Quality gates",
        "Rollback strategies",
      ],
    },
    {
      title: "Containers & Orchestration",
      items: [
        "Docker",
        "Kubernetes",
        "Node selectors & demands",
        "Self-hosted agent pools",
      ],
    },
    {
      title: "Cloud & Platforms",
      items: ["Microsoft Azure", "Salesforce", "ServiceNow", "AWS", "GitHub"]
    },
    {
      title: "Security & Practices",
      items: [
        "CompTIA Security+",
        "Secret clearance",
        "Secure software delivery",
        "Agile / Scrum",
      ],
    },
    {
      title: "Tooling",
      items: [
        "Azure DevOps REST API",
        "Dashboards & reporting",
        "Automation scripting",
        "Documentation",
      ],
    },
  ],
  certifications: [
    "CompTIA Security+",
    "Active Secret Security Clearance (DoD program)",
    "U.S. Citizen",
  ],
} as const;
