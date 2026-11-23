// Every case study, by web address. Add a case: write its file in this folder, then list it here.
import type { CaseStudy } from './types';
import growPlanesTwitter from './grow-planes-twitter';
import planeOneCampaign from './plane-one-campaign';
// Nexus case study taken down (route /work/who-nexus-is-for). To bring it back, uncomment this import and the entry below.
// import whoNexusIsFor from './who-nexus-is-for';

export const cases: CaseStudy[] = [growPlanesTwitter, planeOneCampaign /*, whoNexusIsFor */];
export const bySlug = Object.fromEntries(cases.map((c) => [c.slug, c])) as Record<string, CaseStudy>;
