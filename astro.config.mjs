import { defineConfig } from 'astro/config';

// Redirects for future landing pages go here, e.g.
// redirects: { '/old-page': '/new-page' }
export default defineConfig({
  site: 'https://www.kritikal.work',
  output: 'static',
  redirects: {
    // the first version of the Nexus case study was removed; its old addresses now open the current one
    '/icp-nexus': '/work/who-nexus-is-for',
    '/work/icp-positioning-messaging-nexus': '/work/who-nexus-is-for',
    // the old work wheel and projects page were replaced by the new work page
    '/work': '/work-redo',
    '/jobs': '/work-redo',
    // the revamp's pages moved to their final routes
    '/journey': '/roadmap',
    '/coffee': '/recommendations',
    '/substacks': '/substack'
  }
});
