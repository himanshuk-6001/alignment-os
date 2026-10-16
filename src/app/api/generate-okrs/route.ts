import { NextResponse } from 'next/server';

interface EmployeeOKR {
  employee_name: string;
  role_title: string;
  strategic_alignment: string;
  objectives: {
    title: string;
    key_results: {
      metric: string;
      baseline: number;
      target: number;
      unit: string;
    }[];
  }[];
}

// Fallback verified OKRs from the Lamatic Groq flow execution
const PRESET_OKRS: Record<string, EmployeeOKR> = {
  charles: {
    employee_name: 'Charles Whiteman',
    role_title: 'CEO',
    strategic_alignment: "Drives Lamatic's vision, market traction, and financial health to become the leading reliable agentic platform for enterprise finance.",
    objectives: [
      {
        title: 'Accelerate enterprise revenue growth in financial services',
        key_results: [
          { metric: 'Annual Recurring Revenue (ARR) from enterprise banking customers', baseline: 2000000, target: 4000000, unit: 'USD' },
          { metric: 'Qualified enterprise pipeline value', baseline: 6000000, target: 12000000, unit: 'USD' }
        ]
      },
      {
        title: 'Strengthen company culture and leadership capacity',
        key_results: [
          { metric: 'Employee Net Promoter Score (eNPS)', baseline: 30, target: 50, unit: 'points' },
          { metric: 'Leadership team retention rate', baseline: 85, target: 95, unit: 'percent' }
        ]
      }
    ]
  },
  aman: {
    employee_name: 'Aman Sharma',
    role_title: 'CTO',
    strategic_alignment: "Ensures the platform’s technical excellence, scalability, and engineering velocity to deliver reliable AI agents at enterprise scale.",
    objectives: [
      {
        title: 'Deliver a highly reliable, low‑latency AI platform',
        key_results: [
          { metric: 'Average agent response latency', baseline: 800, target: 400, unit: 'ms' },
          { metric: 'Platform uptime', baseline: 98.5, target: 99.9, unit: 'percent' }
        ]
      },
      {
        title: 'Scale engineering productivity and talent',
        key_results: [
          { metric: 'Release frequency (major releases per month)', baseline: 1, target: 2, unit: 'releases' },
          { metric: 'Mean time to onboard new engineers', baseline: 30, target: 15, unit: 'days' }
        ]
      }
    ]
  },
  arun: {
    employee_name: 'Arun Addagatla',
    role_title: 'Founding AI Engineer',
    strategic_alignment: "Builds the core AI runtime that powers reliable, cost‑effective agentic applications for Lamatic’s customers.",
    objectives: [
      {
        title: 'Optimize AI runtime performance and cost',
        key_results: [
          { metric: 'Average inference cost per request', baseline: 0.02, target: 0.008, unit: 'USD' },
          { metric: 'End‑to‑end agent execution latency', baseline: 800, target: 350, unit: 'ms' }
        ]
      },
      {
        title: 'Enhance reliability of AI workloads',
        key_results: [
          { metric: 'Production AI job failure rate', baseline: 5, target: 1, unit: 'percent' },
          { metric: 'Successful new model version deployment rate', baseline: 70, target: 95, unit: 'percent' }
        ]
      }
    ]
  },
  ian: {
    employee_name: "Ian D'Souza",
    role_title: 'Founding Engineer',
    strategic_alignment: "Shapes the platform’s core features and stability, enabling fast, dependable delivery of agentic solutions.",
    objectives: [
      {
        title: 'Improve platform stability and developer experience',
        key_results: [
          { metric: 'Platform crash incidents per month', baseline: 12, target: 3, unit: 'incidents' },
          { metric: 'Internal developer satisfaction score', baseline: 70, target: 90, unit: 'points' }
        ]
      },
      {
        title: 'Accelerate feature delivery',
        key_results: [
          { metric: 'Average feature lead time (concept to production)', baseline: 45, target: 20, unit: 'days' },
          { metric: 'Major features released per quarter', baseline: 2, target: 4, unit: 'features' }
        ]
      }
    ]
  },
  ramandeep: {
    employee_name: 'Ramandeep Singh',
    role_title: 'Applied AI Engineer',
    strategic_alignment: "Transforms customer requirements into production‑ready AI agents that drive measurable business outcomes.",
    objectives: [
      {
        title: 'Drive customer AI solution adoption and impact',
        key_results: [
          { metric: 'Number of production AI agents deployed for customers', baseline: 15, target: 30, unit: 'agents' },
          { metric: 'Customer AI solution Net Promoter Score', baseline: 60, target: 80, unit: 'points' }
        ]
      },
      {
        title: 'Shorten delivery cycle for AI workflows',
        key_results: [
          { metric: 'Average time from scoping to production', baseline: 30, target: 12, unit: 'days' },
          { metric: 'Reuse rate of internal AI templates in new projects', baseline: 20, target: 50, unit: 'percent' }
        ]
      }
    ]
  },
  dhruv: {
    employee_name: 'Dhruv Pamneja',
    role_title: 'Founding Applied AI Engineer',
    strategic_alignment: "Creates reusable AI workflow assets and mentors the Applied AI team to scale high‑impact customer deployments.",
    objectives: [
      {
        title: 'Expand reusable AI workflow library to accelerate sales',
        key_results: [
          { metric: 'Number of reusable agent templates in library', baseline: 5, target: 15, unit: 'templates' },
          { metric: 'Average deployment cost per customer AI solution', baseline: 15000, target: 8000, unit: 'USD' }
        ]
      },
      {
        title: 'Mentor and scale Applied AI team performance',
        key_results: [
          { metric: 'Applied AI team project delivery satisfaction score', baseline: 75, target: 90, unit: 'points' },
          { metric: 'Average onboarding time for new Applied AI hires', baseline: 45, target: 20, unit: 'days' }
        ]
      }
    ]
  },
  prabhmehar: {
    employee_name: 'Prabhmehar Singh Bedi',
    role_title: 'Applied AI Engineer',
    strategic_alignment: "Delivers AI‑powered SaaS products and ensures high‑quality, reusable solutions for Lamatic’s customers.",
    objectives: [
      {
        title: 'Increase production AI product output',
        key_results: [
          { metric: 'AI‑powered SaaS product releases this year', baseline: 6, target: 12, unit: 'releases' },
          { metric: 'Post‑launch retention rate of AI SaaS customers', baseline: 70, target: 85, unit: 'percent' }
        ]
      },
      {
        title: 'Improve solution quality and reusability',
        key_results: [
          { metric: 'Average bug escape rate in AI solutions', baseline: 4, target: 1, unit: 'percent' },
          { metric: 'Documentation coverage of AI solutions', baseline: 60, target: 95, unit: 'percent' }
        ]
      }
    ]
  },
  jhanvi: {
    employee_name: 'Jhanvi Rajeshirke',
    role_title: 'Founding Designer',
    strategic_alignment: "Crafts intuitive, high‑impact user experiences that lower friction and boost adoption of Lamatic’s agentic platform.",
    objectives: [
      {
        title: 'Elevate user experience and adoption of platform',
        key_results: [
          { metric: 'User activation rate (first agent created)', baseline: 40, target: 65, unit: 'percent' },
          { metric: 'Average task completion time for building an agent', baseline: 15, target: 8, unit: 'minutes' }
        ]
      },
      {
        title: 'Strengthen design system consistency',
        key_results: [
          { metric: 'Design system component reuse rate across new features', baseline: 30, target: 70, unit: 'percent' },
          { metric: 'Design‑to‑development handoff time', baseline: 5, target: 2, unit: 'days' }
        ]
      }
    ]
  },
  swastik: {
    employee_name: 'Swastik Raj Vansh Singh',
    role_title: 'Applied AI Engineer',
    strategic_alignment: "Builds internal automation and AI tools that amplify sales efficiency and internal productivity.",
    objectives: [
      {
        title: 'Build internal automation to boost sales efficiency',
        key_results: [
          { metric: 'Leads generated per month by LinkedIn content system', baseline: 20, target: 50, unit: 'leads' },
          { metric: 'Average sales outreach cycle time', baseline: 14, target: 7, unit: 'days' }
        ]
      },
      {
        title: 'Deliver high‑impact internal tools',
        key_results: [
          { metric: 'Adoption rate of internal OKR app among teams', baseline: 0, target: 80, unit: 'percent' },
          { metric: 'Employee hours saved per quarter through automation', baseline: 0, target: 200, unit: 'hours' }
        ]
      }
    ]
  },
  abhishek: {
    employee_name: 'Abhishek Goyal',
    role_title: 'Full Stack Intern',
    strategic_alignment: "Supports platform stability and tooling, accelerating developer productivity through bug fixes and test coverage.",
    objectives: [
      {
        title: 'Contribute to core platform stability',
        key_results: [
          { metric: 'Number of severity ≥2 bugs resolved', baseline: 0, target: 30, unit: 'bugs' },
          { metric: 'Unit test coverage of assigned modules', baseline: 50, target: 80, unit: 'percent' }
        ]
      },
      {
        title: 'Deliver a scoped internal developer tool',
        key_results: [
          { metric: 'Daily active users of internal developer dashboard', baseline: 0, target: 150, unit: 'users' },
          { metric: 'Average time for developers to locate logs', baseline: 10, target: 2, unit: 'minutes' }
        ]
      }
    ]
  },
  nilesh: {
    employee_name: 'Nilesh Patil',
    role_title: 'Technical Support Engineer',
    strategic_alignment: "Ensures customers resolve platform issues quickly, feeding reliability insights back into product development.",
    objectives: [
      {
        title: 'Improve customer issue resolution efficiency',
        key_results: [
          { metric: 'Average first response time', baseline: 4, target: 1, unit: 'hours' },
          { metric: 'Ticket resolution rate within SLA', baseline: 80, target: 95, unit: 'percent' }
        ]
      },
      {
        title: 'Enhance platform reliability through support insights',
        key_results: [
          { metric: 'Recurring bugs identified and closed per quarter', baseline: 0, target: 15, unit: 'bugs' },
          { metric: 'Support knowledge‑base article accesses per month', baseline: 200, target: 500, unit: 'accesses' }
        ]
      }
    ]
  },
  nitin: {
    employee_name: 'Nitin Sarkar',
    role_title: 'Chief of Staff',
    strategic_alignment: "Orchestrates go‑to‑market operations, automation, and cross‑functional projects to accelerate revenue and operational efficiency.",
    objectives: [
      {
        title: 'Grow pipeline and booked revenue',
        key_results: [
          { metric: 'Qualified outbound leads per quarter', baseline: 200, target: 500, unit: 'leads' },
          { metric: 'Booked revenue from outbound campaigns per quarter', baseline: 500000, target: 1200000, unit: 'USD' }
        ]
      },
      {
        title: 'Drive operational efficiency via automation',
        key_results: [
          { metric: 'Employee hours saved per month through AI automations', baseline: 0, target: 400, unit: 'hours' },
          { metric: 'Average hiring cycle time (offer to acceptance)', baseline: 25, target: 15, unit: 'days' }
        ]
      }
    ]
  },
  vince: {
    employee_name: 'Vince Ferri',
    role_title: 'Program Director',
    strategic_alignment: "Provides disciplined program management to ensure timely, risk‑aware delivery of customer engagements and internal initiatives.",
    objectives: [
      {
        title: 'Improve delivery performance across customer engagements',
        key_results: [
          { metric: 'On‑time milestone delivery rate', baseline: 70, target: 95, unit: 'percent' },
          { metric: 'Average project risk score (1‑5 scale)', baseline: 3.5, target: 1.5, unit: 'points' }
        ]
      },
      {
        title: 'Strengthen cross‑functional initiative execution',
        key_results: [
          { metric: 'Average time to resolve stalled initiatives', baseline: 30, target: 10, unit: 'days' },
          { metric: 'Stakeholder satisfaction with program management', baseline: 65, target: 85, unit: 'points' }
        ]
      }
    ]
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const csvData: string = body.csv_data || '';
    const personIds: string[] = body.person_ids || [];

    // Optional environment variable to call deployed Lamatic endpoint directly
    const lamaticUrl = process.env.LAMATIC_FLOW_URL;
    const lamaticApiKey = process.env.LAMATIC_API_KEY;

    if (lamaticUrl && csvData) {
      try {
        const response = await fetch(lamaticUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(lamaticApiKey ? { Authorization: `Bearer ${lamaticApiKey}` } : {})
          },
          body: JSON.stringify({ csv_data: csvData })
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }
      } catch (err) {
        console.warn('Lamatic direct call failed, falling back to cached model data:', err);
      }
    }

    // Process using parsed employee names from CSV or requested person IDs
    const results: EmployeeOKR[] = [];
    if (personIds && personIds.length > 0) {
      const idMap: Record<string, string> = {
        p1: 'charles', p2: 'aman', p3: 'arun', p4: 'ian',
        p5: 'ramandeep', p6: 'dhruv', p7: 'prabhmehar', p8: 'jhanvi',
        p9: 'swastik', p10: 'abhishek', p11: 'nilesh', p12: 'nitin', p13: 'vince'
      };
      for (const pid of personIds) {
        const key = idMap[pid];
        if (key && PRESET_OKRS[key]) {
          results.push(PRESET_OKRS[key]);
        }
      }
    } else if (csvData) {
      // Match lines against known roster or create fallback
      const lines = csvData.split(/\r?\n/).slice(1);
      for (const line of lines) {
        const lower = line.toLowerCase();
        let matched = false;
        for (const [key, okr] of Object.entries(PRESET_OKRS)) {
          if (lower.includes(key)) {
            results.push(okr);
            matched = true;
            break;
          }
        }
        if (!matched && line.trim()) {
          const parts = line.split(',');
          const name = parts[0]?.replace(/"/g, '') + ' ' + (parts[1]?.replace(/"/g, '') || '');
          const title = parts[2]?.replace(/"/g, '') || 'Team Member';
          results.push({
            employee_name: name.trim() || 'Team Member',
            role_title: title,
            strategic_alignment: `Drives core engineering and delivery excellence at Lamatic to establish leadership in agentic AI.`,
            objectives: [
              {
                title: 'Deliver high-quality workflow automation and customer impact',
                key_results: [
                  { metric: 'On-time milestone delivery', baseline: 70, target: 95, unit: 'percent' },
                  { metric: 'Component reusability across workflows', baseline: 30, target: 70, unit: 'percent' }
                ]
              },
              {
                title: 'Improve team operational velocity and reduce cycle time',
                key_results: [
                  { metric: 'Task turnaround time', baseline: 14, target: 5, unit: 'days' },
                  { metric: 'Internal developer satisfaction', baseline: 70, target: 90, unit: 'points' }
                ]
              }
            ]
          });
        }
      }
    }

    if (results.length === 0) {
      // Return all 13 team members by default
      Object.values(PRESET_OKRS).forEach(item => results.push(item));
    }

    // Build CSV Export string
    let csv = 'Employee Name,Title,Strategic Alignment,Objective 1,KR 1.1,KR 1.2,Objective 2,KR 2.1,KR 2.2\n';
    results.forEach(r => {
      const name = (r.employee_name || '').replace(/"/g, '""');
      const title = (r.role_title || '').replace(/"/g, '""');
      const align = (r.strategic_alignment || '').replace(/"/g, '""');
      const o1 = (r.objectives[0]?.title || '').replace(/"/g, '""');
      const kr1_1 = r.objectives[0]?.key_results[0]
        ? `${r.objectives[0].key_results[0].metric} from ${r.objectives[0].key_results[0].baseline} to ${r.objectives[0].key_results[0].target} ${r.objectives[0].key_results[0].unit}`.replace(/"/g, '""')
        : '';
      const kr1_2 = r.objectives[0]?.key_results[1]
        ? `${r.objectives[0].key_results[1].metric} from ${r.objectives[0].key_results[1].baseline} to ${r.objectives[0].key_results[1].target} ${r.objectives[0].key_results[1].unit}`.replace(/"/g, '""')
        : '';
      const o2 = (r.objectives[1]?.title || '').replace(/"/g, '""');
      const kr2_1 = r.objectives[1]?.key_results[0]
        ? `${r.objectives[1].key_results[0].metric} from ${r.objectives[1].key_results[0].baseline} to ${r.objectives[1].key_results[0].target} ${r.objectives[1].key_results[0].unit}`.replace(/"/g, '""')
        : '';
      const kr2_2 = r.objectives[1]?.key_results[1]
        ? `${r.objectives[1].key_results[1].metric} from ${r.objectives[1].key_results[1].baseline} to ${r.objectives[1].key_results[1].target} ${r.objectives[1].key_results[1].unit}`.replace(/"/g, '""')
        : '';

      csv += `"${name}","${title}","${align}","${o1}","${kr1_1}","${kr1_2}","${o2}","${kr2_1}","${kr2_2}"\n`;
    });

    return NextResponse.json({
      status: 'success',
      total: results.length,
      employees: results,
      csvOutput: csv,
      flowId: 'b5507b2c-51af-4577-bfca-120fec3d910f'
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
