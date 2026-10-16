import { Outcome, Person, Commitment, Metric, Issue, WorkItem, Proposal } from './types';
import realCommitments from './real_commitments.json';

export const CYCLE = {
  id: 'Q4-2026',
  label: 'Q4 2026',
  start: '2026-10-01',
  end: '2026-12-31',
  week: 3,
  weeks: 13,
  daysLeft: 76,
  today: 'Fri, Oct 16'
};

export const DIRECTION =
  'Lamatic becomes the agent platform regulated financial institutions standardize on.';

export const OUTCOMES: Outcome[] = [
  {
    id: 'O1',
    short: 'Financial services fit',
    title: 'Establish repeatable PMF in financial services',
    owner: 'p1',
    conf: 65,
    trend: [65],
    read: 'Focused on closing enterprise banking customers and deploying repeatable agentic workflow patterns.',
    krs: [
      { id: 'KR1.1', text: 'Annual Recurring Revenue (ARR) from enterprise banking customers', base: 2000000, cur: 2000000, target: 4000000, unit: 'USD' },
      { id: 'KR1.2', text: 'Qualified enterprise pipeline value', base: 6000000, cur: 6000000, target: 12000000, unit: 'USD' }
    ]
  },
  {
    id: 'O2',
    short: 'Platform reliability & velocity',
    title: 'Deliver a hyper-reliable, low-latency AI agent runtime for enterprise workloads',
    owner: 'p2',
    conf: 70,
    trend: [70],
    read: 'Driving down inference latency, improving platform uptime, and scaling engineering release frequency.',
    krs: [
      { id: 'KR2.1', text: 'Average agent response latency', base: 800, cur: 800, target: 400, unit: 'ms' },
      { id: 'KR2.2', text: 'Platform uptime', base: 98.5, cur: 98.5, target: 99.9, unit: '%' }
    ]
  },
  {
    id: 'O3',
    short: 'Developer adoption & product',
    title: 'Expand developer adoption and platform activation',
    owner: 'p8',
    conf: 60,
    trend: [60],
    read: 'Elevating UX research, design system consistency, and onboarding activation.',
    krs: [
      { id: 'KR3.1', text: 'User activation rate (first agent created)', base: 40, cur: 40, target: 65, unit: '%' },
      { id: 'KR3.2', text: 'Average task completion time for building an agent', base: 15, cur: 15, target: 8, unit: 'minutes' }
    ]
  },
  {
    id: 'O4',
    short: 'Company culture & operations',
    title: 'Strengthen company culture, hiring, and operational scale',
    owner: 'p12',
    conf: 75,
    trend: [75],
    read: 'Scaling team operations, hiring cycle efficiency, and team alignment cadence.',
    krs: [
      { id: 'KR4.1', text: 'Employee Net Promoter Score (eNPS)', base: 30, cur: 30, target: 50, unit: 'points' },
      { id: 'KR4.2', text: 'Leadership team retention rate', base: 85, cur: 85, target: 95, unit: '%' }
    ]
  }
];

export const PEOPLE: Person[] = [
  { id: 'p1', name: 'Charles', full: 'Charles Whiteman', role: 'CEO', team: 'Leadership', ini: 'CW', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p2', name: 'Aman', full: 'Aman Sharma', role: 'CTO', team: 'Leadership', ini: 'AS', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p3', name: 'Arun', full: 'Arun Addagatla', role: 'Founding AI Engineer', team: 'Engineering', ini: 'AA', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p4', name: 'Ian', full: "Ian D'Souza", role: 'Founding Engineer', team: 'Engineering', ini: 'ID', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p5', name: 'Ramandeep', full: 'Ramandeep Singh', role: 'Applied AI Engineer', team: 'Applied AI', ini: 'RS', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p6', name: 'Dhruv', full: 'Dhruv Pamneja', role: 'Founding Applied AI Engineer', team: 'Applied AI', ini: 'DP', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p7', name: 'Prabhmehar', full: 'Prabhmehar Singh Bedi', role: 'Applied AI Engineer', team: 'Applied AI', ini: 'PS', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p8', name: 'Jhanvi', full: 'Jhanvi Rajeshirke', role: 'Founding Designer', team: 'Design', ini: 'JR', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p9', name: 'Swastik', full: 'Swastik Raj Vansh Singh', role: 'Applied AI Engineer', team: 'Applied AI', ini: 'SR', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p10', name: 'Abhishek', full: 'Abhishek Goyal', role: 'Full Stack Intern', team: 'Engineering', ini: 'AG', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p11', name: 'Nilesh', full: 'Nilesh Patil', role: 'Technical Support Engineer', team: 'Support', ini: 'NP', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p12', name: 'Nitin', full: 'Nitin Sarkar', role: 'Chief of Staff', team: 'Operations', ini: 'NS', mon: 'pending', fri: 'pending', load: 2 },
  { id: 'p13', name: 'Vince', full: 'Vince Ferri', role: 'Program Director', team: 'Program', ini: 'VF', mon: 'pending', fri: 'pending', load: 2 }
];

// All 26 real commitments generated from Lamatic Flow
export const INITIAL_COMMITMENTS: Commitment[] = realCommitments as unknown as Commitment[];

// Empty until team members submit weekly check-ins
export const PRIORITIES: Record<string, [string, string, 'done' | 'partial' | 'miss' | 'new', string][]> = {};

export const PROPOSALS: Record<string, Proposal[]> = {};

// No fake numbers: empty until metrics integrations are connected
export const SCORECARD: Metric[] = [];

// No fake issues: empty until live issue monitoring is enabled
export const ISSUES: Issue[] = [];

// No fake unlinked tasks: empty until live tool webhooks are connected
export const WORK: WorkItem[] = [];

export const ASKS = [
  {
    q: 'How are employee OKRs aligned with Lamatic company strategy?',
    a: () =>
      '<p>Every team member’s OKRs are generated directly from the Lamatic Company Knowledge base in VectorDB, applying John Doerr’s <i>Measure What Matters</i> and Google re:Work guidelines. Each role has exactly 2 qualitative Objectives and 2 outcome-based Key Results with measurable baseline-to-target units.</p>',
    src: 'Lamatic Company Context VectorDB & AI Flow'
  },
  {
    q: 'What are the main engineering and product priorities?',
    a: () =>
      '<p>1. <b>Platform Reliability & Latency:</b> Aman Sharma & Arun Addagatla are driving inference latency down from 800ms to 400ms and platform uptime from 98.5% to 99.9%.<br>2. <b>Developer & Enterprise Adoption:</b> Jhanvi Rajeshirke & Ian D’Souza are lifting workspace activation to 65% and reducing developer lead time from 45 to 20 days.</p>',
    src: 'Generated Engineering OKRs'
  },
  {
    q: 'What are the enterprise financial services targets?',
    a: () =>
      '<p>Charles Whiteman (CEO) and Nitin Sarkar (Chief of Staff) own the GTM and ARR objectives: growing ARR from enterprise banking customers from $2M to $4M, and increasing booked revenue from outbound campaigns to $1.2M.</p>',
    src: 'Generated Leadership OKRs'
  }
];
