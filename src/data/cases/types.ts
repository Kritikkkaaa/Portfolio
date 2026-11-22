// The shape of a case study. One file per case in this folder; src/pages/work/[slug].astro builds a page from each.
export type Fig = { src: string; cap: string; alt: string; w?: number; h?: number };
export type Part = { label: string; value: number; share: string; color: string };

export type Block =
  | { t: 'p'; text: string }
  | { t: 'label'; text: string }
  | { t: 'fact'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'bullets'; items: string[] }
  | { t: 'qlist'; items: string[] }
  | { t: 'figs'; figs: Fig[] }
  | { t: 'video'; src: string; poster: string; cap: string; w: number; h: number; alt?: string }
  | { t: 'chart'; kind: 'donut' | 'pie'; cap: string; parts: Part[]; centre?: { n: string; l: string }; note?: string }
  | { t: 'compare'; oldH: string; nowH: string; groups: { label: string; old: string[]; now: string[]; msgH: string; msg: string }[] }
  | { t: 'qa'; pairs: [string, string][] }
  | { t: 'shift'; fromLabel: string; from: string; toLabel: string; to: string }
  | { t: 'learnt'; label: string; text: string };

export type CaseStudy = {
  slug: string;                                  // the web address: /work/<slug>
  title: string;
  tldr: { h: string; p: string }[];              // exactly three: Context, What I changed, Impact
  hero: { src: string; alt: string; cap: string };
  lead: Block[];                                 // the opening, before the first section
  sections: { h: string; blocks: Block[] }[];
  closing?: string;                              // an optional last line after the final section
  card: { line: string; img: string; mins: number };   // how it shows on the work page
};
