export interface Person {
  id: string;
  name: string;
  full: string;
  role: string;
  team: string;
  ini: string;
  mon: 'accepted' | 'edited' | 'pending' | 'not-sent';
  fri: 'confirmed' | 'corrected' | 'pending' | 'not-sent';
  load: number;
  isNew?: boolean;
}

export interface KeyResult {
  id: string;
  o?: string;
  text: string;
  base: number;
  cur: number;
  target: number;
  unit: string;
  count?: boolean;
}

export interface Outcome {
  id: string;
  short: string;
  title: string;
  owner: string;
  conf: number;
  trend: number[];
  read: string;
  krs: KeyResult[];
}

export interface Measure {
  base: number | string;
  cur: number | string;
  target: number | string;
  unit: string;
  count?: boolean;
}

export interface Commitment {
  id: string;
  owner: string;
  o: string;
  kr: string | null;
  text: string;
  m: Measure;
  due: string;
  conf: number | null;
  trend: number[];
  confirmed?: boolean;
  draft?: boolean;
  sent?: boolean;
  corrected?: boolean;
  note?: string;
  ev?: [string, string, string][];
  blockers?: string[];
  deps?: string[];
  next?: string;
}

export interface Proposal {
  key?: string;
  text: string;
  o: string;
  kr: string | null;
  m: Measure;
  due: string;
  why: string;
  work?: boolean;
}

export interface Metric {
  id: string;
  area: string;
  name: string;
  unit: string;
  owner: string;
  op: '>=' | '<=';
  v: number;
  vals: (number | null)[];
  note?: string;
}

export interface Issue {
  id: string;
  title: string;
  src: string;
  o: string | null;
  impact: number;
  age: number;
  owner: string;
  ids: boolean; // queued for Monday's agenda
  detail: string;
  ev: string[];
  rec: string;
}

export interface Todo {
  t: string;
  owner: string;
  due: string;
  ai?: boolean;
}

export interface WorkItem {
  id: string;
  src: 'Linear' | 'GitHub' | 'Pipedrive' | 'Drive' | 'Vanta' | 'Figma' | 'Slack';
  t: string;
  c: string | null; // commitment ID or null if unaligned
}

export type ViewType =
  | 'home'
  | 'people'
  | 'week'
  | 'plan'
  | 'scorecard'
  | 'issues'
  | 'meeting'
  | 'map'
  | 'spec';
