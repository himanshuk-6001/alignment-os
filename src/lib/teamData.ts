export interface KeyResult {
  id: string;
  metric: string;
  baseline: number;
  target: number;
  current: number;
  unit: string;
}

export interface Objective {
  id: string;
  title: string;
  pillarId: 'O1' | 'O2' | 'O3' | 'O4';
  pillarTitle: string;
  keyResults: KeyResult[];
}

export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  email: string;
  role: string;
  department: 'Leadership' | 'Engineering' | 'Applied AI' | 'Design' | 'Support' | 'Operations' | 'Program';
  initials: string;
  strategicAlignment: string;
  objectives: Objective[];
}

export interface CompanyPillar {
  id: 'O1' | 'O2' | 'O3' | 'O4';
  shortTitle: string;
  fullTitle: string;
  ownerId: string;
  ownerName: string;
  description: string;
  metrics: {
    label: string;
    target: string;
  }[];
}

export const COMPANY_INFO = {
  name: 'Lamatic',
  tagline: 'Enterprise AI Agentic Workflow Runtime',
  cycle: 'Q4 2026',
  cycleDates: 'Oct 1 – Dec 31, 2026',
  direction: 'Lamatic becomes the agent platform regulated financial institutions standardize on.'
};

export const COMPANY_PILLARS: CompanyPillar[] = [
  {
    id: 'O1',
    shortTitle: 'Financial Services Fit',
    fullTitle: 'Establish repeatable PMF in regulated financial services',
    ownerId: 'p1',
    ownerName: 'Charles Whiteman',
    description: 'Focused on signing enterprise banking customers, deploying production agent patterns, and proving compliance rigor.',
    metrics: [
      { label: 'Enterprise Banking ARR', target: '$4,000,000' },
      { label: 'Qualified Pipeline', target: '$12,000,000' }
    ]
  },
  {
    id: 'O2',
    shortTitle: 'Platform Reliability & Velocity',
    fullTitle: 'Deliver a hyper-reliable, low-latency AI runtime for enterprise workloads',
    ownerId: 'p2',
    ownerName: 'Aman Sharma',
    description: 'Driving down inference latency, guaranteeing 99.9% uptime, lowering inference costs, and accelerating release cadence.',
    metrics: [
      { label: 'Average Runtime Latency', target: '< 400ms' },
      { label: 'Platform Uptime', target: '99.9%' }
    ]
  },
  {
    id: 'O3',
    shortTitle: 'Developer Adoption & Product',
    fullTitle: 'Expand developer activation, onboarding speed, and workflow templates',
    ownerId: 'p8',
    ownerName: 'Jhanvi Rajeshirke',
    description: 'Elevating workspace UX, reducing time-to-first-agent, creating standardized UI design tokens, and expanding template catalog.',
    metrics: [
      { label: 'Workspace Activation Rate', target: '65%' },
      { label: 'Time-to-Build Agent', target: '8 minutes' }
    ]
  },
  {
    id: 'O4',
    shortTitle: 'Company Culture & Scale',
    fullTitle: 'Strengthen company culture, hiring velocity, and operational automation',
    ownerId: 'p12',
    ownerName: 'Nitin Sarkar',
    description: 'Scaling team operations, automating internal workflows, reducing hiring lead time, and elevating team alignment.',
    metrics: [
      { label: 'Team eNPS', target: '50 points' },
      { label: 'Leadership Retention', target: '95%' }
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'p1',
    name: 'Charles',
    fullName: 'Charles Whiteman',
    email: 'charles@lamatic.ai',
    role: 'CEO',
    department: 'Leadership',
    initials: 'CW',
    strategicAlignment: "Drives Lamatic's vision, market traction, and financial health to become the leading reliable agentic platform for enterprise finance.",
    objectives: [
      {
        id: 'p1-o1',
        title: 'Accelerate enterprise revenue growth in financial services',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p1-kr1',
            metric: 'Annual Recurring Revenue (ARR) from enterprise banking customers',
            baseline: 2000000,
            target: 4000000,
            current: 2000000,
            unit: 'USD'
          },
          {
            id: 'p1-kr2',
            metric: 'Qualified enterprise pipeline value',
            baseline: 6000000,
            target: 12000000,
            current: 6000000,
            unit: 'USD'
          }
        ]
      },
      {
        id: 'p1-o2',
        title: 'Strengthen company culture and leadership capacity',
        pillarId: 'O4',
        pillarTitle: 'Company Culture & Scale',
        keyResults: [
          {
            id: 'p1-kr3',
            metric: 'Employee Net Promoter Score (eNPS)',
            baseline: 30,
            target: 50,
            current: 30,
            unit: 'points'
          },
          {
            id: 'p1-kr4',
            metric: 'Leadership team retention rate',
            baseline: 85,
            target: 95,
            current: 85,
            unit: 'percent'
          }
        ]
      }
    ]
  },
  {
    id: 'p2',
    name: 'Aman',
    fullName: 'Aman Sharma',
    email: 'aman@lamatic.ai',
    role: 'CTO',
    department: 'Leadership',
    initials: 'AS',
    strategicAlignment: 'Ensures the platform’s technical excellence, scalability, and engineering velocity to deliver reliable AI agents at enterprise scale.',
    objectives: [
      {
        id: 'p2-o1',
        title: 'Deliver a highly reliable, low‑latency AI platform',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p2-kr1',
            metric: 'Average agent response latency',
            baseline: 800,
            target: 400,
            current: 800,
            unit: 'ms'
          },
          {
            id: 'p2-kr2',
            metric: 'Platform uptime',
            baseline: 98.5,
            target: 99.9,
            current: 98.5,
            unit: 'percent'
          }
        ]
      },
      {
        id: 'p2-o2',
        title: 'Scale engineering productivity and talent',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p2-kr3',
            metric: 'Release frequency (major releases per month)',
            baseline: 1,
            target: 2,
            current: 1,
            unit: 'releases'
          },
          {
            id: 'p2-kr4',
            metric: 'Mean time to onboard new engineers',
            baseline: 30,
            target: 15,
            current: 30,
            unit: 'days'
          }
        ]
      }
    ]
  },
  {
    id: 'p3',
    name: 'Arun',
    fullName: 'Arun Addagatla',
    email: 'arun@lamatic.ai',
    role: 'Founding AI Engineer',
    department: 'Engineering',
    initials: 'AA',
    strategicAlignment: 'Builds the core AI runtime that powers reliable, cost‑effective agentic applications for Lamatic’s customers.',
    objectives: [
      {
        id: 'p3-o1',
        title: 'Optimize AI runtime performance and cost',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p3-kr1',
            metric: 'Average inference cost per request',
            baseline: 0.02,
            target: 0.008,
            current: 0.02,
            unit: 'USD'
          },
          {
            id: 'p3-kr2',
            metric: 'End‑to‑end agent execution latency',
            baseline: 800,
            target: 350,
            current: 800,
            unit: 'ms'
          }
        ]
      },
      {
        id: 'p3-o2',
        title: 'Enhance reliability of AI workloads',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p3-kr3',
            metric: 'Production AI job failure rate',
            baseline: 5,
            target: 1,
            current: 5,
            unit: 'percent'
          },
          {
            id: 'p3-kr4',
            metric: 'Successful new model version deployment rate',
            baseline: 70,
            target: 95,
            current: 70,
            unit: 'percent'
          }
        ]
      }
    ]
  },
  {
    id: 'p4',
    name: 'Ian',
    fullName: "Ian D'Souza",
    email: 'ian@lamatic.ai',
    role: 'Founding Engineer',
    department: 'Engineering',
    initials: 'ID',
    strategicAlignment: 'Shapes the platform’s core features and stability, enabling fast, dependable delivery of agentic solutions.',
    objectives: [
      {
        id: 'p4-o1',
        title: 'Improve platform stability and developer experience',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p4-kr1',
            metric: 'Platform crash incidents per month',
            baseline: 12,
            target: 3,
            current: 12,
            unit: 'incidents'
          },
          {
            id: 'p4-kr2',
            metric: 'Internal developer satisfaction score',
            baseline: 70,
            target: 90,
            current: 70,
            unit: 'points'
          }
        ]
      },
      {
        id: 'p4-o2',
        title: 'Accelerate feature delivery',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p4-kr3',
            metric: 'Average feature lead time (concept to production)',
            baseline: 45,
            target: 20,
            current: 45,
            unit: 'days'
          },
          {
            id: 'p4-kr4',
            metric: 'Major features released per quarter',
            baseline: 2,
            target: 4,
            current: 2,
            unit: 'features'
          }
        ]
      }
    ]
  },
  {
    id: 'p5',
    name: 'Ramandeep',
    fullName: 'Ramandeep Singh',
    email: 'ramandeep@lamatic.ai',
    role: 'Applied AI Engineer',
    department: 'Applied AI',
    initials: 'RS',
    strategicAlignment: 'Transforms customer requirements into production‑ready AI agents that drive measurable business outcomes.',
    objectives: [
      {
        id: 'p5-o1',
        title: 'Drive customer AI solution adoption and impact',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p5-kr1',
            metric: 'Number of production AI agents deployed for customers',
            baseline: 15,
            target: 30,
            current: 15,
            unit: 'agents'
          },
          {
            id: 'p5-kr2',
            metric: 'Customer AI solution Net Promoter Score',
            baseline: 60,
            target: 80,
            current: 60,
            unit: 'points'
          }
        ]
      },
      {
        id: 'p5-o2',
        title: 'Shorten delivery cycle for AI workflows',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p5-kr3',
            metric: 'Average time from scoping to production',
            baseline: 30,
            target: 12,
            current: 30,
            unit: 'days'
          },
          {
            id: 'p5-kr4',
            metric: 'Reuse rate of internal AI templates in new projects',
            baseline: 20,
            target: 50,
            current: 20,
            unit: 'percent'
          }
        ]
      }
    ]
  },
  {
    id: 'p6',
    name: 'Dhruv',
    fullName: 'Dhruv Pamneja',
    email: 'dhruv@lamatic.ai',
    role: 'Founding Applied AI Engineer',
    department: 'Applied AI',
    initials: 'DP',
    strategicAlignment: 'Creates reusable AI workflow assets and mentors the Applied AI team to scale high‑impact customer deployments.',
    objectives: [
      {
        id: 'p6-o1',
        title: 'Expand reusable AI workflow library to accelerate sales',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p6-kr1',
            metric: 'Number of reusable agent templates in library',
            baseline: 5,
            target: 15,
            current: 5,
            unit: 'templates'
          },
          {
            id: 'p6-kr2',
            metric: 'Average deployment cost per customer AI solution',
            baseline: 15000,
            target: 8000,
            current: 15000,
            unit: 'USD'
          }
        ]
      },
      {
        id: 'p6-o2',
        title: 'Mentor and scale Applied AI team performance',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p6-kr3',
            metric: 'Applied AI team project delivery satisfaction score',
            baseline: 75,
            target: 90,
            current: 75,
            unit: 'points'
          },
          {
            id: 'p6-kr4',
            metric: 'Average onboarding time for new Applied AI hires',
            baseline: 45,
            target: 20,
            current: 45,
            unit: 'days'
          }
        ]
      }
    ]
  },
  {
    id: 'p7',
    name: 'Prabhmehar',
    fullName: 'Prabhmehar Singh Bedi',
    email: 'prabhmehar@lamatic.ai',
    role: 'Applied AI Engineer',
    department: 'Applied AI',
    initials: 'PS',
    strategicAlignment: 'Delivers AI‑powered SaaS products and ensures high‑quality, reusable solutions for Lamatic’s customers.',
    objectives: [
      {
        id: 'p7-o1',
        title: 'Increase production AI product output',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p7-kr1',
            metric: 'AI‑powered SaaS product releases this year',
            baseline: 6,
            target: 12,
            current: 6,
            unit: 'releases'
          },
          {
            id: 'p7-kr2',
            metric: 'Post‑launch retention rate of AI SaaS customers',
            baseline: 70,
            target: 85,
            current: 70,
            unit: 'percent'
          }
        ]
      },
      {
        id: 'p7-o2',
        title: 'Improve solution quality and reusability',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p7-kr3',
            metric: 'Average bug escape rate in AI solutions',
            baseline: 4,
            target: 1,
            current: 4,
            unit: 'percent'
          },
          {
            id: 'p7-kr4',
            metric: 'Documentation coverage of AI solutions',
            baseline: 60,
            target: 95,
            current: 60,
            unit: 'percent'
          }
        ]
      }
    ]
  },
  {
    id: 'p8',
    name: 'Jhanvi',
    fullName: 'Jhanvi Rajeshirke',
    email: 'jhanvi@lamatic.ai',
    role: 'Founding Designer',
    department: 'Design',
    initials: 'JR',
    strategicAlignment: 'Crafts intuitive, high‑impact user experiences that lower friction and boost adoption of Lamatic’s agentic platform.',
    objectives: [
      {
        id: 'p8-o1',
        title: 'Elevate user experience and adoption of platform',
        pillarId: 'O3',
        pillarTitle: 'Developer Adoption & Product',
        keyResults: [
          {
            id: 'p8-kr1',
            metric: 'User activation rate (first agent created)',
            baseline: 40,
            target: 65,
            current: 40,
            unit: 'percent'
          },
          {
            id: 'p8-kr2',
            metric: 'Average task completion time for building an agent',
            baseline: 15,
            target: 8,
            current: 15,
            unit: 'minutes'
          }
        ]
      },
      {
        id: 'p8-o2',
        title: 'Strengthen design system consistency',
        pillarId: 'O3',
        pillarTitle: 'Developer Adoption & Product',
        keyResults: [
          {
            id: 'p8-kr3',
            metric: 'Design system component reuse rate across new features',
            baseline: 30,
            target: 70,
            current: 30,
            unit: 'percent'
          },
          {
            id: 'p8-kr4',
            metric: 'Design‑to‑development handoff time',
            baseline: 5,
            target: 2,
            current: 5,
            unit: 'days'
          }
        ]
      }
    ]
  },
  {
    id: 'p9',
    name: 'Swastik',
    fullName: 'Swastik Raj Vansh Singh',
    email: 'swastik@lamatic.ai',
    role: 'Applied AI Engineer',
    department: 'Applied AI',
    initials: 'SR',
    strategicAlignment: 'Builds internal automation and AI tools that amplify sales efficiency and internal productivity.',
    objectives: [
      {
        id: 'p9-o1',
        title: 'Build internal automation to boost sales efficiency',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p9-kr1',
            metric: 'Leads generated per month by LinkedIn content system',
            baseline: 20,
            target: 50,
            current: 20,
            unit: 'leads'
          },
          {
            id: 'p9-kr2',
            metric: 'Average sales outreach cycle time',
            baseline: 14,
            target: 7,
            current: 14,
            unit: 'days'
          }
        ]
      },
      {
        id: 'p9-o2',
        title: 'Deliver high‑impact internal tools',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p9-kr3',
            metric: 'Adoption rate of internal OKR app among teams',
            baseline: 0,
            target: 80,
            current: 0,
            unit: 'percent'
          },
          {
            id: 'p9-kr4',
            metric: 'Employee hours saved per quarter through automation',
            baseline: 0,
            target: 200,
            current: 0,
            unit: 'hours'
          }
        ]
      }
    ]
  },
  {
    id: 'p10',
    name: 'Abhishek',
    fullName: 'Abhishek Goyal',
    email: 'abhishek@lamatic.ai',
    role: 'Full Stack Intern',
    department: 'Engineering',
    initials: 'AG',
    strategicAlignment: 'Supports platform stability and tooling, accelerating developer productivity through bug fixes and test coverage.',
    objectives: [
      {
        id: 'p10-o1',
        title: 'Contribute to core platform stability',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p10-kr1',
            metric: 'Number of severity ≥2 bugs resolved',
            baseline: 0,
            target: 30,
            current: 0,
            unit: 'bugs'
          },
          {
            id: 'p10-kr2',
            metric: 'Unit test coverage of assigned modules',
            baseline: 50,
            target: 80,
            current: 50,
            unit: 'percent'
          }
        ]
      },
      {
        id: 'p10-o2',
        title: 'Deliver a scoped internal developer tool',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p10-kr3',
            metric: 'Daily active users of internal developer dashboard',
            baseline: 0,
            target: 150,
            current: 0,
            unit: 'users'
          },
          {
            id: 'p10-kr4',
            metric: 'Average time for developers to locate logs',
            baseline: 10,
            target: 2,
            current: 10,
            unit: 'minutes'
          }
        ]
      }
    ]
  },
  {
    id: 'p11',
    name: 'Nilesh',
    fullName: 'Nilesh Patil',
    email: 'nilesh@lamatic.ai',
    role: 'Technical Support Engineer',
    department: 'Support',
    initials: 'NP',
    strategicAlignment: 'Ensures customers resolve platform issues quickly, feeding reliability insights back into product development.',
    objectives: [
      {
        id: 'p11-o1',
        title: 'Improve customer issue resolution efficiency',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p11-kr1',
            metric: 'Average first response time',
            baseline: 4,
            target: 1,
            current: 4,
            unit: 'hours'
          },
          {
            id: 'p11-kr2',
            metric: 'Ticket resolution rate within SLA',
            baseline: 80,
            target: 95,
            current: 80,
            unit: 'percent'
          }
        ]
      },
      {
        id: 'p11-o2',
        title: 'Enhance platform reliability through support insights',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p11-kr3',
            metric: 'Recurring bugs identified and closed per quarter',
            baseline: 0,
            target: 15,
            current: 0,
            unit: 'bugs'
          },
          {
            id: 'p11-kr4',
            metric: 'Support knowledge‑base article accesses per month',
            baseline: 200,
            target: 500,
            current: 200,
            unit: 'accesses'
          }
        ]
      }
    ]
  },
  {
    id: 'p12',
    name: 'Nitin',
    fullName: 'Nitin Sarkar',
    email: 'nitin@lamatic.ai',
    role: 'Chief of Staff',
    department: 'Operations',
    initials: 'NS',
    strategicAlignment: 'Orchestrates go‑to‑market operations, automation, and cross‑functional projects to accelerate revenue and operational efficiency.',
    objectives: [
      {
        id: 'p12-o1',
        title: 'Grow pipeline and booked revenue',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p12-kr1',
            metric: 'Qualified outbound leads per quarter',
            baseline: 200,
            target: 500,
            current: 200,
            unit: 'leads'
          },
          {
            id: 'p12-kr2',
            metric: 'Booked revenue from outbound campaigns per quarter',
            baseline: 500000,
            target: 1200000,
            current: 500000,
            unit: 'USD'
          }
        ]
      },
      {
        id: 'p12-o2',
        title: 'Drive operational efficiency via automation',
        pillarId: 'O4',
        pillarTitle: 'Company Culture & Scale',
        keyResults: [
          {
            id: 'p12-kr3',
            metric: 'Employee hours saved per month through AI automations',
            baseline: 0,
            target: 400,
            current: 0,
            unit: 'hours'
          },
          {
            id: 'p12-kr4',
            metric: 'Average hiring cycle time (offer to acceptance)',
            baseline: 25,
            target: 15,
            current: 25,
            unit: 'days'
          }
        ]
      }
    ]
  },
  {
    id: 'p13',
    name: 'Vince',
    fullName: 'Vince Ferri',
    email: 'vince@lamatic.ai',
    role: 'Program Director',
    department: 'Program',
    initials: 'VF',
    strategicAlignment: 'Provides disciplined program management to ensure timely, risk‑aware delivery of customer engagements and internal initiatives.',
    objectives: [
      {
        id: 'p13-o1',
        title: 'Improve delivery performance across customer engagements',
        pillarId: 'O1',
        pillarTitle: 'Financial Services Fit',
        keyResults: [
          {
            id: 'p13-kr1',
            metric: 'On‑time milestone delivery rate',
            baseline: 70,
            target: 95,
            current: 70,
            unit: 'percent'
          },
          {
            id: 'p13-kr2',
            metric: 'Average project risk score (1‑5 scale)',
            baseline: 3.5,
            target: 1.5,
            current: 3.5,
            unit: 'points'
          }
        ]
      },
      {
        id: 'p13-o2',
        title: 'Strengthen cross‑functional initiative execution',
        pillarId: 'O2',
        pillarTitle: 'Platform Reliability & Velocity',
        keyResults: [
          {
            id: 'p13-kr3',
            metric: 'Average time to resolve stalled initiatives',
            baseline: 30,
            target: 10,
            current: 30,
            unit: 'days'
          },
          {
            id: 'p13-kr4',
            metric: 'Stakeholder satisfaction with program management',
            baseline: 65,
            target: 85,
            current: 65,
            unit: 'points'
          }
        ]
      }
    ]
  }
];

export const RAW_ROSTER_CSV = `first_name,last_name,email,title,department,responsibilities
Charles,Whiteman,charles@lamatic.ai,CEO,Leadership,"Overall company vision, fundraising, enterprise banking relationships, and executive recruitment."
Aman,Sharma,aman@lamatic.ai,CTO,Leadership,"Core platform architecture, engineering team leadership, low-latency AI runtime, and system reliability."
Arun,Addagatla,arun@lamatic.ai,Founding AI Engineer,Engineering,"AI engine runtime, vector database integrations, model inference cost reduction, and LLM orchestration."
Ian,D'Souza,ian@lamatic.ai,Founding Engineer,Engineering,"Core backend infrastructure, API design, platform stability, and continuous deployment velocity."
Ramandeep,Singh,ramandeep@lamatic.ai,Applied AI Engineer,Applied AI,"Customer solution architecture, agent workflows, production AI deployments, and client satisfaction."
Dhruv,Pamneja,dhruv@lamatic.ai,Founding Applied AI Engineer,Applied AI,"Reusable AI workflow library, customer solution scoping, and mentoring junior engineers."
Prabhmehar,Singh Bedi,prabhmehar@lamatic.ai,Applied AI Engineer,Applied AI,"AI SaaS product delivery, integration quality, testing automation, and documentation."
Jhanvi,Rajeshirke,jhanvi@lamatic.ai,Founding Designer,Design,"Design system, developer experience UX, onboarding flows, and product research."
Swastik,Raj Vansh Singh,swastik@lamatic.ai,Applied AI Engineer,Applied AI,"Internal sales automation, LinkedIn lead generation agents, and internal tool development."
Abhishek,Goyal,abhishek@lamatic.ai,Full Stack Intern,Engineering,"Bug triage, unit testing, internal developer dashboards, and log investigation tooling."
Nilesh,Patil,nilesh@lamatic.ai,Technical Support Engineer,Support,"Tier-1 & Tier-2 customer support, SLA resolution, recurring incident analysis, and knowledge base."
Nitin,Sarkar,nitin@lamatic.ai,Chief of Staff,Operations,"GTM operations, outbound lead generation, cross-functional automation, and hiring pipeline."
Vince,Ferri,vince@lamatic.ai,Program Director,Program,"Customer engagement delivery, milestone risk tracking, cross-functional project management, and governance."`;

export const STRATEGY_FAQS = [
  {
    q: 'How are employee OKRs aligned with Lamatic company strategy?',
    a: 'Every team member’s OKRs are generated directly from the Lamatic Company Knowledge base in VectorDB, applying John Doerr’s <i>Measure What Matters</i> and Google re:Work guidelines. Each role has exactly 2 qualitative Objectives and 2 outcome-based Key Results with measurable baseline-to-target units.',
    src: 'Lamatic Company Context VectorDB & AI Flow'
  },
  {
    q: 'What are the main platform reliability and velocity targets?',
    a: 'Aman Sharma (CTO) and Arun Addagatla (Founding AI Engineer) are driving average runtime latency down from 800ms to 400ms, targeting 99.9% uptime, and lowering per-request inference cost from $0.02 to $0.008 USD.',
    src: 'Generated Engineering OKRs'
  },
  {
    q: 'What are the enterprise financial services targets?',
    a: 'Charles Whiteman (CEO) and Nitin Sarkar (Chief of Staff) own the GTM and ARR objectives: expanding ARR from enterprise banking customers from $2M to $4M USD, and doubling qualified enterprise pipeline from $6M to $12M USD.',
    src: 'Generated Leadership OKRs'
  },
  {
    q: 'How is developer onboarding and activation measured?',
    a: 'Jhanvi Rajeshirke (Founding Designer) leads developer adoption, driving first-agent workspace activation from 40% to 65% and cutting task completion time for building an agent from 15 minutes to 8 minutes.',
    src: 'Generated Design OKRs'
  }
];

export function calculateProgress(baseline: number, current: number, target: number): number {
  if (target === baseline) return 0;
  if (target > baseline) {
    const p = ((current - baseline) / (target - baseline)) * 100;
    return Math.max(0, Math.min(100, Math.round(p)));
  } else {
    // Decrease is better (latency, bug rate, cost)
    const p = ((baseline - current) / (baseline - target)) * 100;
    return Math.max(0, Math.min(100, Math.round(p)));
  }
}

export function formatMetricValue(val: number, unit: string): string {
  if (unit === 'USD') {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  }
  if (unit === 'percent' || unit === '%') return `${val}%`;
  return `${val.toLocaleString()} ${unit}`;
}
